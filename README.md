# Life Alchemy - 人生炼金术

把日常小事炼成宝石的治愈系成长记录 H5 Web App。

## 项目结构

```
life-alchemy/
├── frontend/          # Next.js H5 前端
│   ├── app/           # 页面路由
│   ├── components/    # UI 组件
│   ├── lib/           # 工具和 API 封装
│   ├── types/         # TypeScript 类型
│   └── public/        # 静态资源
├── backend/           # FastAPI 后端服务
│   ├── app/
│   │   ├── api/       # 接口路由
│   │   ├── services/  # 业务服务层
│   │   ├── repositories/ # 数据库访问层
│   │   ├── domain/    # 纯业务规则
│   │   ├── ai/        # AI 调用与 Prompt
│   │   ├── models/    # SQLAlchemy 模型
│   │   ├── schemas/   # Pydantic 请求/响应
│   │   ├── core/      # 配置、安全、CORS
│   │   └── db/        # 数据库连接
│   └── alembic/       # 数据库迁移
├── supabase/          # Supabase 迁移和种子数据
└── docs/              # 开发文档
```

## 技术栈

- **前端**: Next.js + React + TypeScript + Tailwind CSS + Framer Motion
- **后端**: Python 3.11+ + FastAPI + Pydantic + SQLAlchemy + Alembic
- **数据**: Supabase PostgreSQL + Auth + Storage
- **部署**: 前端 Vercel / 后端 Render / Railway

## 快速开始

### 前端

```bash
cd frontend
pnpm install
pnpm dev
```

### 后端

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
cp .env.example .env  # 配置环境变量
uvicorn app.main:app --reload
```
