# 设计系统 - Linear 风格

## 项目：第二大脑展示页

**设计参考**：Linear.app  
**创建日期**：2026-06-15  
**风格定位**：现代科技感 + 学习进度可视化

---

## 🎨 配色系统

### 主色调（Primary Colors）

```css
/* 主色 - 紫蓝渐变（用于按钮、链接、强调） */
--primary: #5E6AD2;
--primary-light: #8B5CF6;
--primary-dark: #4C51BF;
--primary-gradient: linear-gradient(135deg, #5E6AD2 0%, #8B5CF6 100%);

/* 次要色 - 青色（用于进度、状态） */
--accent: #06B6D4;
--accent-light: #22D3EE;
```

### 中性色（Neutral Colors）

```css
/* 深色模式（主要使用） */
--bg-dark: #0A0B0F;           /* 页面背景 */
--bg-dark-elevated: #16171D;  /* 卡片背景 */
--bg-dark-hover: #1F2028;     /* Hover 状态 */

/* 浅色模式（可选） */
--bg-light: #FFFFFF;          /* 页面背景 */
--bg-light-elevated: #F9FAFB; /* 卡片背景 */
--bg-light-hover: #F3F4F6;    /* Hover 状态 */
```

### 文字颜色（Text Colors）

```css
/* 深色模式 */
--text-primary-dark: #FFFFFF;      /* 主标题 */
--text-secondary-dark: #A1A1AA;    /* 副标题 */
--text-tertiary-dark: #71717A;     /* 辅助文字 */

/* 浅色模式 */
--text-primary-light: #18181B;     /* 主标题 */
--text-secondary-light: #52525B;   /* 副标题 */
--text-tertiary-light: #A1A1AA;    /* 辅助文字 */
```

### 状态色（Status Colors）

```css
--success: #10B981;    /* 已完成 */
--warning: #F59E0B;    /* 进行中 */
--error: #EF4444;      /* 错误/失败 */
--info: #3B82F6;       /* 信息 */
--pending: #71717A;    /* 待开始 */
```

### 边框和分割线（Borders）

```css
/* 深色模式 */
--border-dark: rgba(255, 255, 255, 0.1);
--border-dark-strong: rgba(255, 255, 255, 0.2);

/* 浅色模式 */
--border-light: rgba(0, 0, 0, 0.1);
--border-light-strong: rgba(0, 0, 0, 0.2);
```

---

## 📐 间距系统

### 间距标准（Spacing Scale）

```css
--space-1: 4px;    /* xs */
--space-2: 8px;    /* sm */
--space-3: 12px;   /* md */
--space-4: 16px;   /* lg */
--space-5: 20px;   /* xl */
--space-6: 24px;   /* 2xl */
--space-8: 32px;   /* 3xl */
--space-10: 40px;  /* 4xl */
--space-12: 48px;  /* 5xl */
--space-16: 64px;  /* 6xl */
```

### 容器宽度（Container Widths）

```css
--container-sm: 640px;   /* 小屏内容 */
--container-md: 768px;   /* 中屏内容 */
--container-lg: 1024px;  /* 大屏内容 */
--container-xl: 1280px;  /* 超大屏内容 */
--container-2xl: 1536px; /* 最大宽度 */
```

---

## 🔤 字体系统

### 字体族（Font Families）

```css
/* 主字体 - Inter（需要引入 Google Fonts） */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* 等宽字体（代码展示） */
--font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;

/* 中文优化 */
--font-sans-zh: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
```

### 字体大小（Font Sizes）

```css
--text-xs: 12px;     /* 辅助信息 */
--text-sm: 14px;     /* 正文小字 */
--text-base: 16px;   /* 正文 */
--text-lg: 18px;     /* 大正文 */
--text-xl: 20px;     /* 小标题 */
--text-2xl: 24px;    /* 卡片标题 */
--text-3xl: 30px;    /* 页面标题 */
--text-4xl: 36px;    /* 大标题 */
--text-5xl: 48px;    /* Hero 标题 */
```

### 字重（Font Weights）

```css
--font-normal: 400;   /* 正文 */
--font-medium: 500;   /* 强调 */
--font-semibold: 600; /* 标题 */
--font-bold: 700;     /* 重要标题 */
```

### 行高（Line Heights）

```css
--leading-tight: 1.25;   /* 标题 */
--leading-snug: 1.375;   /* 副标题 */
--leading-normal: 1.5;   /* 正文 */
--leading-relaxed: 1.625; /* 长文本 */
```

---

## 🎭 视觉效果

### 圆角（Border Radius）

```css
--radius-sm: 4px;    /* 小元素（标签、徽章） */
--radius-md: 8px;    /* 卡片、按钮 */
--radius-lg: 12px;   /* 大卡片 */
--radius-xl: 16px;   /* 模态框 */
--radius-full: 9999px; /* 圆形 */
```

### 阴影（Shadows）

```css
/* 深色模式 */
--shadow-sm-dark: 0 1px 2px rgba(0, 0, 0, 0.5);
--shadow-md-dark: 0 4px 12px rgba(0, 0, 0, 0.4);
--shadow-lg-dark: 0 8px 24px rgba(0, 0, 0, 0.3);

/* 浅色模式 */
--shadow-sm-light: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-md-light: 0 4px 12px rgba(0, 0, 0, 0.08);
--shadow-lg-light: 0 8px 24px rgba(0, 0, 0, 0.06);

/* 彩色阴影（用于悬浮状态） */
--shadow-primary: 0 8px 24px rgba(94, 106, 210, 0.3);
--shadow-success: 0 8px 24px rgba(16, 185, 129, 0.3);
```

### 模糊效果（Blur）

```css
--blur-sm: 4px;   /* 轻微模糊 */
--blur-md: 8px;   /* 中等模糊 */
--blur-lg: 16px;  /* 强烈模糊 */

/* 毛玻璃效果 */
--glass-bg: rgba(22, 23, 29, 0.7);
--glass-border: rgba(255, 255, 255, 0.1);
```

### 动画（Animations）

```css
/* 过渡时长 */
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;

/* 缓动函数 */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

---

## 🧱 组件样式

### 按钮（Button）

```css
/* 主按钮 */
.btn-primary {
  background: var(--primary-gradient);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: all var(--duration-normal) var(--ease-out);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-primary);
}

/* 次要按钮 */
.btn-secondary {
  background: var(--bg-dark-elevated);
  color: var(--text-primary-dark);
  border: 1px solid var(--border-dark);
}

.btn-secondary:hover {
  background: var(--bg-dark-hover);
  border-color: var(--border-dark-strong);
}
```

### 卡片（Card）

```css
.card {
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--duration-normal) var(--ease-out);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg-dark);
  border-color: var(--border-dark-strong);
}

/* 毛玻璃卡片 */
.card-glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--blur-lg));
  border: 1px solid var(--glass-border);
}
```

### 输入框（Input）

```css
.input {
  background: var(--bg-dark);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  color: var(--text-primary-dark);
  font-size: var(--text-base);
  transition: all var(--duration-fast) var(--ease-out);
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(94, 106, 210, 0.1);
}
```

### 进度条（Progress）

```css
.progress {
  height: 8px;
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--primary-gradient);
  border-radius: var(--radius-full);
  transition: width var(--duration-slow) var(--ease-out);
}

/* 带数字的进度条 */
.progress-with-label {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
```

### 徽章（Badge）

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.badge-success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success);
}

.badge-warning {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning);
}

.badge-pending {
  background: rgba(113, 113, 122, 0.1);
  color: var(--pending);
}
```

---

## 📱 响应式设计

### 断点（Breakpoints）

```css
--breakpoint-sm: 640px;   /* 手机横屏 */
--breakpoint-md: 768px;   /* 平板竖屏 */
--breakpoint-lg: 1024px;  /* 平板横屏 */
--breakpoint-xl: 1280px;  /* 桌面 */
--breakpoint-2xl: 1536px; /* 大桌面 */
```

### 移动端优化

- 导航栏折叠为汉堡菜单
- 卡片单列布局
- 字体稍微放大（16px → 17px）
- 减少动画效果（节省性能）
- 简化毛玻璃效果

---

## 🌓 深色/浅色模式切换

### 实现方式

使用 CSS 变量 + `[data-theme]` 属性：

```html
<html data-theme="dark">
  <!-- 深色模式 -->
</html>

<html data-theme="light">
  <!-- 浅色模式 -->
</html>
```

### 切换逻辑

```typescript
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme')
  const next = current === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  localStorage.setItem('theme', next)
}
```

---

## 🎯 页面级设计

### 首页（Home）

**布局**：
```
┌────────────────────────────────────────┐
│ [导航栏 - 半透明毛玻璃]                 │
├────────────────────────────────────────┤
│                                        │
│   [Hero 区域]                          │
│   - 渐变背景                           │
│   - 大标题                             │
│   - 转型进度环形图                     │
│                                        │
├────────────────────────────────────────┤
│ [最新动态 - 3 张卡片横排]              │
├────────────────────────────────────────┤
│ [快速统计 - 4 个数字卡片]              │
└────────────────────────────────────────┘
```

**关键元素**：
- Hero 区使用渐变背景 + 大字号
- 进度环形图（用 Recharts）
- 卡片使用悬浮效果

---

### 学习仪表盘（Learning）

**布局**：
```
┌────────────────────────────────────────┐
│ [总体进度 - 大进度条 + 百分比]          │
├────────────────────────────────────────┤
│ [时间线 - 按周展示]                    │
│   Week 1 ✅                            │
│   │─ Task 1 ✅                         │
│   │─ Task 2 ✅                         │
│   Week 2 🔄                            │
│   │─ Task 5 🔄                         │
│   │─ Task 6 ⏳                         │
├────────────────────────────────────────┤
│ [学习统计 - 卡片网格]                  │
└────────────────────────────────────────┘
```

**关键元素**：
- 大进度条（带渐变）
- 状态图标（✅ 🔄 ⏳）
- 时间线竖线（用渐变色）

---

### 知识网络（Knowledge）

**布局**：
```
┌────────────────────────────────────────┐
│ [视图切换按钮] 卡片墙 | 思维导图 | 列表 │
├────────────────────────────────────────┤
│ ┌───────┐ ┌───────┐ ┌───────┐         │
│ │ 💡    │ │ 📌    │ │ 🔄    │         │
│ │ Card1 │ │ Card2 │ │ Card3 │         │
│ └───────┘ └───────┘ └───────┘         │
│ ┌───────┐ ┌───────┐                   │
│ │ 🎯    │ │ 📖    │                   │
│ │ Card4 │ │ Card5 │                   │
│ └───────┘ └───────┘                   │
└────────────────────────────────────────┘
```

**关键元素**：
- 瀑布流布局（Masonry）
- 彩色类型标签
- 悬浮展开预览

---

## 📦 Tailwind 配置

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5E6AD2',
          light: '#8B5CF6',
          dark: '#4C51BF',
        },
        accent: {
          DEFAULT: '#06B6D4',
          light: '#22D3EE',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        dark: {
          bg: '#0A0B0F',
          elevated: '#16171D',
          hover: '#1F2028',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.3)',
        'primary': '0 8px 24px rgba(94, 106, 210, 0.3)',
      },
    },
  },
  plugins: [],
}
```

---

## 🚀 实施清单

**阶段 1：基础设置**（30 分钟）
- [ ] 引入 Inter 字体（Google Fonts）
- [ ] 更新 `globals.css`（CSS 变量）
- [ ] 更新 `tailwind.config.js`（颜色、字体）
- [ ] 设置深色模式切换

**阶段 2：组件样式**（1 小时）
- [ ] 更新按钮样式
- [ ] 更新卡片样式
- [ ] 创建进度条组件
- [ ] 创建徽章组件

**阶段 3：页面应用**（1 小时）
- [ ] 首页应用新风格
- [ ] 导航栏毛玻璃效果
- [ ] Hero 区渐变背景
- [ ] 所有页面统一风格

**总计时间**：约 2.5 小时

---

**文档维护**：Claude Code  
**最后更新**：2026-06-15
