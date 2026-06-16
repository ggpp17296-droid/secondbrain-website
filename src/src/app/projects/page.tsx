import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getVaultData, type VaultProject } from "@/lib/vault-data";

const statusMap: Record<
  string,
  { label: string; variant: "success" | "warning" | "pending" | "info"; icon: string }
> = {
  in_progress: { label: "进行中", variant: "warning", icon: "🟢" },
  active: { label: "活跃", variant: "success", icon: "🟢" },
  completed: { label: "已完成", variant: "success", icon: "✅" },
  planned: { label: "计划中", variant: "pending", icon: "📋" },
  planning: { label: "规划中", variant: "pending", icon: "📋" },
  paused: { label: "暂停", variant: "pending", icon: "⏸️" },
};

function isRealProject(project: VaultProject) {
  const normalizedName = project.name.toLowerCase();
  const normalizedId = project.id.toLowerCase();

  return (
    !project.name.includes("{{") &&
    !project.id.startsWith(".") &&
    !normalizedId.includes("example") &&
    !normalizedName.includes("example")
  );
}

function getProjectProgress(project: VaultProject) {
  if (project.totalTasks > 0) {
    return {
      value: project.tasksCompleted,
      max: project.totalTasks,
      label: `${project.tasksCompleted}/${project.totalTasks} 任务`,
    };
  }

  return {
    value: project.progress ?? 0,
    max: 100,
    label: `${project.progress ?? 0}% 阶段进度`,
  };
}

export default function ProjectsPage() {
  const vaultData = getVaultData();
  const projects = vaultData.projects.filter(isRealProject);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge variant="warning" size="md">
            Projects
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-text-primary md:text-5xl">
            我的项目
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary md:text-lg">
            从 Obsidian Vault 自动同步项目状态、任务进度和实践方向，过滤模板后只展示真实推进中的项目。
          </p>
        </div>
        <Card className="w-full p-5 md:w-[280px]" hover={false} glass>
          <p className="text-sm text-text-secondary">真实项目</p>
          <p className="mt-2 text-3xl font-semibold text-text-primary">{projects.length} 个</p>
          <p className="mt-3 text-sm text-text-tertiary">
            已隐藏 {vaultData.projects.length - projects.length} 个模板/示例
          </p>
        </Card>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const statusInfo = statusMap[project.status] ?? {
              label: project.status,
              variant: "info" as const,
              icon: "📋",
            };
            const progress = getProjectProgress(project);
            const completion = Math.round((progress.value / Math.max(progress.max, 1)) * 100);

            return (
              <Card key={project.id} className="flex h-full flex-col p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="min-w-0">
                    <Badge variant={statusInfo.variant}>
                      {statusInfo.icon} {statusInfo.label}
                    </Badge>
                    <h2 className="mt-4 text-xl font-semibold leading-snug text-text-primary">
                      {project.name}
                    </h2>
                  </div>
                  {project.startDate ? (
                    <span className="shrink-0 text-sm text-text-tertiary">
                      {project.startDate}
                    </span>
                  ) : null}
                </div>

                {project.description ? (
                  <p className="mt-4 min-h-[56px] text-sm leading-7 text-text-secondary">
                    {project.description}
                  </p>
                ) : null}

                <div className="mt-6 rounded-lg border border-border-default bg-dark-bg/45 p-4">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-text-secondary">任务进度</span>
                    <span className="font-medium text-text-primary">
                      {progress.label} · {completion}%
                    </span>
                  </div>
                  <ProgressBar
                    value={progress.value}
                    max={progress.max}
                    showPercentage={false}
                    size="md"
                  />
                </div>

                {project.tags && project.tags.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border-default bg-dark-hover px-2.5 py-1 text-xs font-medium text-text-secondary"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-10 text-center" hover={false}>
          <p className="text-text-secondary">暂无真实项目</p>
        </Card>
      )}
    </section>
  );
}
