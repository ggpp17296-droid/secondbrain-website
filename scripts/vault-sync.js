#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const matter = loadMatter();
const VAULT_PATH = path.resolve(process.env.VAULT_PATH || "./vault");
const OUTPUT_PATH = path.resolve(process.env.OUTPUT_PATH || "./data");

function loadMatter() {
  try {
    return require("gray-matter");
  } catch {
    return parseFrontmatter;
  }
}

function parseFrontmatter(fileContent) {
  if (!fileContent.startsWith("---")) {
    return { data: {}, content: fileContent };
  }

  const end = fileContent.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, content: fileContent };
  }

  const raw = fileContent.slice(3, end).trim();
  const content = fileContent.slice(end + 4).trimStart();
  const data = {};

  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([^:#]+):\s*(.*)$/);
    if (!match) continue;

    const key = match[1].trim();
    const value = match[2].trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    } else {
      data[key] = value.replace(/^["']|["']$/g, "");
    }
  }

  return { data, content };
}

async function main() {
  console.log("Starting Vault sync");
  console.log(`Vault: ${VAULT_PATH}`);
  console.log(`Output: ${OUTPUT_PATH}`);

  const profile = parseProfile();
  const dailyLogs = parseDailyLogs(30);
  const projects = parseProjects();
  const cards = parseCards();
  const stats = calculateStats(dailyLogs, projects, cards);
  const graph = generateKnowledgeGraph(cards);

  writeJSON("vault-data.json", {
    profile,
    dailyLogs,
    projects,
    cards,
    lastSync: new Date().toISOString(),
  });
  writeJSON("learning-stats.json", stats);
  writeJSON("project-index.json", projects);
  writeJSON("knowledge-graph.json", graph);

  console.log("Vault sync complete");
  console.log(`Daily logs: ${dailyLogs.length}`);
  console.log(`Projects: ${projects.length}`);
  console.log(`Knowledge cards: ${cards.length}`);
}

function parseProfile() {
  const filePath = path.join(VAULT_PATH, "01_Context", "About_Me.md");
  const parsed = readMarkdown(filePath);

  if (!parsed) {
    return {
      name: "未知",
      location: "未知",
      startDate: null,
      bio: "",
      content: "",
    };
  }

  // 从 Frontmatter 或正文中提取信息
  let name = parsed.data.name || "未知";
  let location = parsed.data.location || "未知";
  let bio = parsed.data.bio || "";

  // 如果 Frontmatter 没有数据，尝试从正文提取
  if (name === "未知" && parsed.content) {
    const nameMatch = parsed.content.match(/姓名\s*[/／]\s*网名.*?[:：]\s*(.+)/);
    if (nameMatch) name = nameMatch[1].trim();

    const locationMatch = parsed.content.match(/所在地.*?[:：]\s*(.+)/);
    if (locationMatch) location = locationMatch[1].trim();

    const identityMatch = parsed.content.match(/主要身份.*?[:：]\s*(.+)/);
    if (identityMatch) bio = identityMatch[1].trim();
  }

  return {
    name,
    location,
    startDate: parsed.data.start_date || parsed.data.startDate || "2026-06-01",
    bio,
    content: parsed.content,
  };
}

function parseDailyLogs(daysCount) {
  const dailyDir = path.join(VAULT_PATH, "02_Daily");
  if (!fs.existsSync(dailyDir)) return [];

  return fs
    .readdirSync(dailyDir)
    .filter((filename) => /^\d{4}-\d{2}-\d{2}\.md$/.test(filename))
    .sort()
    .reverse()
    .slice(0, daysCount)
    .map((filename) => {
      const parsed = readMarkdown(path.join(dailyDir, filename));
      const date = filename.replace(/\.md$/, "");

      return {
        date,
        title: parsed?.data.title || `${date} 学习记录`,
        tags: normalizeArray(parsed?.data.tags),
        highlights: normalizeArray(parsed?.data.highlights),
        content: parsed?.content || "",
        tasksCompleted: countCompletedTasks(parsed?.content || ""),
        cardsCreated: Number(parsed?.data.cards_created || 0),
      };
    });
}

function parseProjects() {
  const projectsDir = path.join(VAULT_PATH, "03_Projects");
  if (!fs.existsSync(projectsDir)) return [];

  const statusOrder = { in_progress: 0, completed: 1, planned: 2 };

  return fs
    .readdirSync(projectsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => parseProject(entry.name))
    .filter(Boolean)
    .sort((a, b) => {
      return (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99);
    });
}

function parseProject(projectId) {
  const overviewPath = path.join(
    VAULT_PATH,
    "03_Projects",
    projectId,
    "00_Overview.md",
  );
  const parsed = readMarkdown(overviewPath);
  if (!parsed) return null;

  const tasks = extractTasks(parsed.content);

  return {
    id: projectId,
    name: parsed.data.title || projectId,
    status: parsed.data.status || "planned",
    startDate: parsed.data.start_date || parsed.data.created || null,
    progress: Number(parsed.data.progress || 0),
    tags: normalizeArray(parsed.data.tags),
    description: parsed.data.description || firstParagraph(parsed.content),
    content: parsed.content,
    tasks,
    tasksCompleted: tasks.filter((task) => task.completed).length,
    totalTasks: tasks.length,
  };
}

function parseCards() {
  const cardsDir = path.join(VAULT_PATH, "04_Knowledge", "00_Cards");
  if (!fs.existsSync(cardsDir)) return [];

  return fs
    .readdirSync(cardsDir)
    .filter((filename) => filename.endsWith(".md") && !filename.startsWith("."))
    .map((filename) => {
      const parsed = readMarkdown(path.join(cardsDir, filename));
      const id = filename.replace(/\.md$/, "");
      const content = parsed?.content || "";

      return {
        id,
        type: parsed?.data.type || "note",
        title: parsed?.data.title || id,
        tags: normalizeArray(parsed?.data.tags),
        createdAt: parsed?.data.created || null,
        relatedCards: normalizeArray(parsed?.data.related_cards),
        content,
        summary: firstParagraph(content).slice(0, 200),
      };
    })
    .sort((a, b) => {
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      return String(b.createdAt).localeCompare(String(a.createdAt));
    });
}

function calculateStats(dailyLogs, projects, cards) {
  const learningProject = projects.find((project) =>
    project.id.includes("Claude_Code"),
  );
  const startDate = new Date("2026-06-01T00:00:00+08:00");
  const now = new Date();
  const daysSinceStart = Math.max(
    0,
    Math.floor((now.getTime() - startDate.getTime()) / 86400000),
  );

  return {
    daysSinceStart,
    currentDay: daysSinceStart + 1,
    currentWeek: Math.ceil((daysSinceStart + 1) / 7),
    tasksCompleted: learningProject?.tasksCompleted || 0,
    totalTasks: learningProject?.totalTasks || 0,
    projectsCount: projects.length,
    cardsCount: cards.length,
    totalLearningHours: dailyLogs.length * 1.5,
    notesCount: dailyLogs.length,
  };
}

function generateKnowledgeGraph(cards) {
  return {
    nodes: cards.map((card) => ({
      id: card.id,
      label: card.title,
      type: card.type,
      tags: card.tags,
    })),
    edges: cards.flatMap((card) =>
      card.relatedCards.map((relatedId) => ({
        source: card.id,
        target: relatedId,
        type: "related",
      })),
    ),
  };
}

function readMarkdown(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, "utf8");
  try {
    return matter(fileContent);
  } catch (error) {
    console.warn(`Frontmatter parse warning in ${filePath}: ${error.message}`);
    return parseFrontmatter(fileContent);
  }
}

function normalizeArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function countCompletedTasks(content) {
  return (content.match(/- \[x\]/gi) || []).length;
}

function extractTasks(content) {
  const tasks = [];
  const taskRegex = /- \[([ x])\]\s+(.+)/gi;
  let match;

  while ((match = taskRegex.exec(content)) !== null) {
    tasks.push({
      title: match[2].trim(),
      completed: match[1].toLowerCase() === "x",
    });
  }

  return tasks;
}

function firstParagraph(content) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.replace(/^#+\s*/, "").trim())
    .find(Boolean) || "";
}

function writeJSON(filename, data) {
  fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  fs.writeFileSync(
    path.join(OUTPUT_PATH, filename),
    `${JSON.stringify(data, null, 2)}\n`,
    "utf8",
  );
}

main().catch((error) => {
  console.error("Vault sync failed");
  console.error(error);
  process.exit(1);
});
