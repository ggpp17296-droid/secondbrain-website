import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getLearningStats, getVaultData } from "@/lib/vault-data";

type TaskStatus = "completed" | "in_progress" | "skipped" | "pending";

const tasks: Array<{
  id: number;
  title: string;
  week: number;
  status: TaskStatus;
}> = [
  { id: 1, title: "Task 1: 补齐 Context", week: 1, status: "completed" },
  { id: 2, title: "Task 2: 提取知识卡片", week: 1, status: "completed" },
  { id: 3, title: "Task 3: 规划小项目", week: 1, status: "completed" },
  { id: 4, title: "Task 4: Bash 实战", week: 2, status: "skipped" },
  { id: 5, title: "Task 5: 设计简单网页", week: 2, status: "completed" },
  { id: 6, title: "Task 6: Codex 初探", week: 2, status: "pending" },
  { id: 7, title: "Task 7: 信息处理流程", week: 3, status: "pending" },
  { id: 8, title: "Task 8: PPT 大纲", week: 4, status: "pending" },
  { id: 9, title: "Task 9: 使用手册", week: 4, status: "pending" },
];

const tasksByWeek = tasks.reduce<Record<number, typeof tasks>>((groups, task) => {
  groups[task.week] = groups[task.week] ?? [];
  groups[task.week].push(task);
  return groups;
}, {});

const statusMeta: Record<
  TaskStatus,
  { icon: string; label: string; badge: "success" | "warning" | "pending" | "info" }
> = {
  completed: { icon: "✅", label: "已完成", badge: "success" },
  in_progress: { icon: "🔄", label: "进行中", badge: "warning" },
  skipped: { icon: "⏭️", label: "已跳过", badge: "pending" },
  pending: { icon: "⏳", label: "待开始", badge: "pending" },
};

function getWeekStatus(weekTasks: typeof tasks) {
  const completedOrSkipped = weekTasks.every(
    (task) => task.status === "completed" || task.status === "skipped",
  );
  const hasStarted = weekTasks.some(
    (task) =>
      task.status === "completed" ||
      task.status === "in_progress" ||
      task.status === "skipped",
  );

  if (completedOrSkipped) {
    return { label: "已完成", icon: "✅", badge: "success" as const };
  }

  if (hasStarted) {
    return { label: "进行中", icon: "🔄", badge: "warning" as const };
  }

  return { label: "未开始", icon: "⏳", badge: "pending" as const };
}

export default function LearningPage() {
  const learningStats = getLearningStats();
  const vaultData = getVaultData();
  const learningProject = vaultData.projects.find(
    (project) => project.name === "学习 Claude Code",
  );
  const handledTasks = tasks.filter(
    (task) => task.status === "completed" || task.status === "skipped",
  ).length;
  const realProjectTasks = learningProject?.totalTasks ?? tasks.length;

  const statCards = [
    {
      label: "累计学习天数",
      value: `${learningStats.currentDay} 天`,
      detail: `已记录 ${learningStats.daysSinceStart} 天`,
      badge: "success" as const,
    },
    {
      label: "完成任务",
      value: `${handledTasks}/${tasks.length}`,
      detail: `${Math.round((handledTasks / tasks.length) * 100)}% 计划进度`,
      badge: "info" as const,
    },
    {
      label: "知识卡片",
      value: `${learningStats.cardsCount} 张`,
      detail: `${learningStats.notesCount} 条系统笔记`,
      badge: "info" as const,
    },
    {
      label: "活跃项目",
      value: `${learningStats.projectsCount} 个`,
      detail: `${vaultData.projects.length} 个 Vault 项目`,
      badge: "warning" as const,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
        <div>
          <Badge variant="info" size="md">
            第 {learningStats.currentDay} 天 · 第 {learningStats.currentWeek} 周
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-text-primary md:text-5xl">
            30 天 Claude Code 学习计划
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-text-secondary md:text-lg">
            通过任务驱动 + 案例模仿的方式，系统化掌握 Claude Code 的使用，并把每次实践沉淀回 Obsidian Vault。
          </p>
        </div>

        <Card className="p-5" hover={false} glass>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-text-secondary">总体进度</p>
              <p className="mt-1 text-2xl font-semibold text-text-primary">
                {handledTasks}/{realProjectTasks} 任务
              </p>
            </div>
            <Badge variant="warning">进行中</Badge>
          </div>
          <ProgressBar value={handledTasks} max={realProjectTasks} size="lg" />
        </Card>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="p-5" hover={false}>
            <p className="text-sm text-text-secondary">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-text-primary">{stat.value}</p>
            <Badge variant={stat.badge} className="mt-4">
              {stat.detail}
            </Badge>
          </Card>
        ))}
      </div>

      <div className="mt-14">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">学习时间线</h2>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              以周为单位跟踪 30 天计划，清楚区分已完成、进行中和待开始任务。
            </p>
          </div>
          <Badge variant="info" size="md">
            {tasks.length} 个实践任务
          </Badge>
        </div>

        <div className="space-y-6">
          {Object.entries(tasksByWeek).map(([week, weekTasks]) => {
            const weekStatus = getWeekStatus(weekTasks);

            return (
              <Card key={week} className="p-5 md:p-6" hover={false}>
                <div className="flex flex-col justify-between gap-3 border-b border-border-default pb-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-default bg-dark-hover text-lg">
                      {weekStatus.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">Week {week}</h3>
                      <p className="text-sm text-text-secondary">
                        {weekTasks.length} 个任务 · {weekStatus.label}
                      </p>
                    </div>
                  </div>
                  <Badge variant={weekStatus.badge}>{weekStatus.label}</Badge>
                </div>

                <div className="mt-5 space-y-3 border-l border-border-default pl-4">
                  {weekTasks.map((task) => {
                    const meta = statusMeta[task.status];

                    return (
                      <div
                        key={task.id}
                        className="relative rounded-lg border border-border-default bg-dark-bg/45 p-4"
                      >
                        <span className="absolute -left-[25px] top-5 h-3 w-3 rounded-full border border-primary bg-primary" />
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="text-xl" aria-hidden="true">
                              {meta.icon}
                            </span>
                            <h4 className="min-w-0 text-sm font-medium text-text-primary sm:text-base">
                              {task.title}
                            </h4>
                          </div>
                          <Badge variant={meta.badge}>{meta.label}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
