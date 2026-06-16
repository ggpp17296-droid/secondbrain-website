import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getVaultData } from "@/lib/vault-data";

export default function AboutPage() {
  const vaultData = getVaultData();
  const profile = vaultData.profile;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Hero 区域 */}
      <div className="mb-16 text-center">
        <div className="mb-6 inline-flex items-center gap-3">
          <Badge variant="info" size="md">
            关于我
          </Badge>
          <Badge variant="success" size="md">
            {profile.location}
          </Badge>
        </div>
        <h1 className="mb-4 text-5xl font-bold text-text-primary">
          {profile.name}
        </h1>
        <p className="text-xl text-text-secondary">
          {profile.bio}
        </p>
      </div>

      {/* 转型故事 */}
      <div className="mb-16">
        <h2 className="mb-6 text-3xl font-semibold text-text-primary">
          转型之旅
        </h2>
        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-text-primary">
                <span className="text-2xl">🏢</span>
                从房地产到 AI
              </h3>
              <p className="leading-relaxed text-text-secondary">
                我曾在房地产行业工作多年，但我意识到 AI 浪潮是未来的机会。
                于是在 2026 年 6 月，我开始了这场为期 5 年的转型计划。
              </p>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-text-primary">
                <span className="text-2xl">🎯</span>
                转型目标
              </h3>
              <p className="leading-relaxed text-text-secondary">
                5 年内从房地产行业完全转型到 AI 相关领域，成为能够独立使用 AI 工具
                解决实际问题的实践者。不追求成为算法专家，而是专注于 AI 工具的
                深度应用和多工具协同。
              </p>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-text-primary">
                <span className="text-2xl">📚</span>
                学习方法
              </h3>
              <p className="leading-relaxed text-text-secondary">
                采用「任务驱动 + 案例模仿」的学习方式，先深度掌握单个工具
                （Claude Code、Codex、NotebookLM、Obsidian），再学习工具间的协同。
                从实际应用场景出发，边学边用，把知识沉淀为可复用的结构。
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* 学习路径 */}
      <div className="mb-16">
        <h2 className="mb-6 text-3xl font-semibold text-text-primary">
          学习路径
        </h2>
        <div className="space-y-4">
          {/* 阶段 1 */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Badge variant="success" size="md">
                阶段 1
              </Badge>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  单个工具的深度学习
                </h3>
                <p className="mb-3 text-text-secondary">
                  深入学习 Claude Code、Codex、NotebookLM 和 Obsidian 的使用，
                  通过实例掌握每个工具的核心能力。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="info" size="sm">Claude Code</Badge>
                  <Badge variant="info" size="sm">Codex</Badge>
                  <Badge variant="info" size="sm">NotebookLM</Badge>
                  <Badge variant="info" size="sm">Obsidian</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* 阶段 2 */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Badge variant="warning" size="md">
                阶段 2
              </Badge>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  工具协同
                </h3>
                <p className="mb-3 text-text-secondary">
                  学习多个 AI 工具之间的协同工作模式，建立完整的工作流。
                  例如：Claude Code 做方案 + Codex 写代码 + NotebookLM 做研究 + Obsidian 做沉淀。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="pending" size="sm">多工具协同</Badge>
                  <Badge variant="pending" size="sm">工作流设计</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 当前状态 */}
      <div className="mb-16">
        <h2 className="mb-6 text-3xl font-semibold text-text-primary">
          当前状态
        </h2>
        <Card className="p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-text-primary">
                正在做什么
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-text-secondary">
                  <span className="mt-1">✅</span>
                  <span>完成 30 天 Claude Code 学习计划（进行中）</span>
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <span className="mt-1">✅</span>
                  <span>建立 AI 学习资源库</span>
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <span className="mt-1">✅</span>
                  <span>打造与 Obsidian 打通的个人网站</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-text-primary">
                接下来计划
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-text-secondary">
                  <span className="mt-1">⏳</span>
                  <span>深入学习 Codex 的使用</span>
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <span className="mt-1">⏳</span>
                  <span>探索 NotebookLM 的知识管理能力</span>
                </li>
                <li className="flex items-start gap-2 text-text-secondary">
                  <span className="mt-1">⏳</span>
                  <span>实践多工具协同工作流</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* 联系方式 */}
      <div className="text-center">
        <h2 className="mb-6 text-3xl font-semibold text-text-primary">
          联系我
        </h2>
        <Card className="inline-block p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <span className="text-text-secondary">微信：zg11234</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📍</span>
              <span className="text-text-secondary">{profile.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <span className="text-text-secondary">这个网站每天自动同步我的 Vault</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 底部说明 */}
      <div className="mt-16 text-center text-sm text-text-tertiary">
        <p>本页面内容自动从 Obsidian Vault 同步</p>
        <p className="mt-2">每天自动更新</p>
      </div>
    </div>
  );
}
