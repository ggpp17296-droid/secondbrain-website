import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

const stats = [
  { label: "完成任务", value: "5/9", status: "55.6%", variant: "success" as const },
  { label: "知识卡片", value: "8", status: "持续增长", variant: "info" as const },
  { label: "活跃项目", value: "2", status: "进行中", variant: "warning" as const },
  { label: "学习天数", value: "15", status: "坚持中", variant: "success" as const },
];

const activities = [
  {
    title: "技术架构搭建",
    body: "Next.js、TypeScript、Tailwind 和 Vault 同步脚本已完成第一阶段骨架。",
  },
  {
    title: "知识系统沉淀",
    body: "从 Obsidian 的项目、每日记录和知识卡片中生成结构化展示数据。",
  },
  {
    title: "学习进度可视化",
    body: "用进度条、状态徽章和卡片布局展示 30 天学习计划。",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border-default">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-elevated to-dark-bg" />
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info" size="md">
              第二大脑展示页
            </Badge>
            <h1 className="mt-6 text-5xl font-bold leading-tight text-text-primary sm:text-6xl">
              <span className="text-gradient">从房地产到 AI</span>
              <br />
              的 5 年转型之旅
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl">
              这里记录我的学习历程、项目进展和知识沉淀，并从 Obsidian Vault 自动同步成可浏览的个人网站。
            </p>

            <div className="mx-auto mt-9 max-w-md">
              <ProgressBar value={5} max={9} label="30 天学习计划" size="lg" />
            </div>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/learning"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light px-8 py-4 text-lg font-medium text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-primary"
              >
                查看学习进度
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg border border-border-default bg-dark-elevated px-8 py-4 text-lg font-medium text-text-primary transition-all duration-200 ease-out hover:border-border-strong hover:bg-dark-hover"
              >
                浏览项目
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {stats.map((item) => (
            <Card key={item.label} className="p-6">
              <div className="text-sm text-text-secondary">{item.label}</div>
              <div className="mt-2 text-4xl font-bold text-text-primary">
                {item.value}
              </div>
              <Badge variant={item.variant} className="mt-3">
                {item.status}
              </Badge>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">最新动态</h2>
            <p className="mt-2 text-text-secondary">
              从 Vault 同步到网站的数据会优先呈现在这里。
            </p>
          </div>
          <Badge variant="pending" size="md">
            Daily Sync
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {activities.map((activity) => (
            <Card key={activity.title} glass className="p-6">
              <h3 className="text-lg font-semibold text-text-primary">
                {activity.title}
              </h3>
              <p className="mt-3 leading-7 text-text-secondary">{activity.body}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
