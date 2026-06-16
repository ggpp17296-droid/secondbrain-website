# Project 004: Second Brain Demo Page

## 项目简介

**项目名称**：第二大脑展示页  
**项目编号**：004  
**创建日期**：2026-06-15  
**项目状态**：启动阶段

---

## 项目定位

这是一个与 Obsidian Vault 深度集成的动态个人网站，用于：
- 实时展示 AI 学习旅程
- 可视化学习进度和成果
- 作为"第二大脑"的对外展示窗口

---

## 技术栈

- **前端框架**：Next.js 14+ (React 19, TypeScript)
- **样式方案**：CSS Modules / Tailwind CSS
- **数据同步**：Node.js 脚本（解析 Markdown）
- **可视化**：Markmap（思维导图）
- **部署平台**：Vercel
- **自动化**：GitHub Actions

---

## 目录结构

```
project-004-secondbrain-demopage/
├── docs/                    # 文档目录
│   ├── 01_技术方案.md
│   ├── 02_开发指南.md
│   ├── 03_部署手册.md
│   └── 04_数据同步说明.md
│
├── src/                     # 源代码（Next.js 项目将创建在这里）
│   ├── pages/              # 页面路由
│   ├── components/         # 组件
│   ├── lib/                # 工具函数
│   ├── styles/             # 样式文件
│   └── types/              # TypeScript 类型定义
│
├── scripts/                 # 脚本目录
│   ├── vault-sync.js       # Vault 数据同步脚本
│   ├── data-generator.js   # 数据生成脚本
│   └── deploy.sh           # 部署脚本
│
├── data/                    # 数据目录
│   └── vault-data.json     # 从 Vault 同步的数据
│
├── .github/                 # GitHub Actions 配置
│   └── workflows/
│       └── daily-sync.yml
│
└── README.md               # 项目说明
```

---

## 核心功能

### 1. 多页面架构
- 首页：个人简介 + 最新动态
- 学习仪表盘：30 天计划进度可视化
- 项目展示：所有项目卡片
- 知识网络：卡片墙 + 思维导图
- 关于我：完整转型故事

### 2. Vault 数据同步
- 自动读取 Obsidian Vault 内容
- 解析 Markdown + Frontmatter
- 生成结构化 JSON 数据
- 支持每日自动同步

### 3. 可视化展示
- 学习进度条和统计
- 时间线视图
- 知识卡片网络
- 思维导图

### 4. 自动化部署
- GitHub Actions 定时同步
- Vercel 自动部署
- CI/CD 完整流程

---

## 协作模式

**Claude Code**：
- 整体方案设计
- 组件结构规划
- 数据转换逻辑
- 技术决策

**Codex**：
- 实际代码编写
- 功能实现
- 调试测试
- 部署配置

---

## 相关链接

- Vault 项目文档：`~/.claude/workspace/my-brain/03_Projects/个人网站改版/`
- 改进方案：`~/.claude/workspace/my-brain/03_Projects/个人网站改版/00_改进方案.md`
- 旧版项目：`~/Desktop/codex_workspace/projects/project-003-todul-lise/`

---

## 开发阶段

- [ ] 阶段 1：技术架构搭建（3-5 天）
- [ ] 阶段 2：核心功能开发（5-7 天）
- [ ] 阶段 3：高级功能与优化（5-7 天）
- [ ] 阶段 4：部署与自动化（2-3 天）

---

**负责人**：努力学习的勇者  
**最后更新**：2026-06-15
