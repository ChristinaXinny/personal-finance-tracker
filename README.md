# Personal Finance Tracker - 个人收支记账工具

## 项目简介
一个基于 Vue.js + Node.js + MongoDB 的全栈个人收支管理应用。

## 技术栈
- **前端**: Vue 3 + Vite + Bootstrap 5 + Vue Router
- **后端**: Node.js + Express.js + Mongoose
- **数据库**: MongoDB
- **认证**: JWT (JSON Web Token)

## 功能模块
- 用户注册/登录
- 收支记录管理 (CRUD)
- 分类管理 (CRUD)
- 仪表盘数据展示
- 个人中心

## 项目结构

```
personal-finance-tracker/
├── frontend/                    # 前端项目 (Vue 3)
│   ├── src/
│   │   ├── api/                # API 接口封装
│   │   │   ├── auth.js         # 认证接口
│   │   │   ├── transactions.js # 交易接口
│   │   │   └── categories.js   # 分类接口
│   │   ├── assets/             # 静态资源
│   │   │   └── css/            # 样式文件
│   │   ├── components/         # 公共组件
│   │   │   ├── Navbar.vue      # 导航栏
│   │   │   ├── Sidebar.vue     # 侧边栏
│   │   │   ├── TransactionForm.vue    # 交易表单
│   │   │   ├── TransactionList.vue    # 交易列表
│   │   │   └── CategoryForm.vue      # 分类表单
│   │   ├── router/             # 路由配置
│   │   │   └── index.js
│   │   ├── store/              # 状态管理 (可选)
│   │   ├── utils/              # 工具函数
│   │   │   └── auth.js         # 认证工具
│   │   ├── views/              # 页面组件
│   │   │   ├── Login.vue       # 登录页
│   │   │   ├── Register.vue    # 注册页
│   │   │   ├── Dashboard.vue   # 仪表盘
│   │   │   ├── Transactions.vue # 交易管理页
│   │   │   ├── Categories.vue   # 分类管理页
│   │   │   └── Profile.vue     # 个人中心
│   │   ├── App.vue             # 根组件
│   │   └── main.js             # 入口文件
│   ├── public/                 # 公共资源
│   ├── index.html              # HTML 模板
│   ├── vite.config.js          # Vite 配置
│   └── package.json            # 依赖配置
│
├── backend/                    # 后端项目 (Node.js + Express)
│   ├── src/
│   │   ├── config/             # 配置文件
│   │   │   └── db.js           # 数据库配置
│   │   ├── controllers/        # 控制器
│   │   │   ├── authController.js
│   │   │   ├── transactionController.js
│   │   │   └── categoryController.js
│   │   ├── middleware/         # 中间件
│   │   │   ├── auth.js         # 认证中间件
│   │   │   └── errorHandler.js # 错误处理
│   │   ├── models/             # 数据模型
│   │   │   ├── User.js         # 用户模型
│   │   │   ├── Transaction.js  # 交易模型
│   │   │   └── Category.js     # 分类模型
│   │   ├── routes/             # 路由定义
│   │   │   ├── auth.js
│   │   │   ├── transactions.js
│   │   │   └── categories.js
│   │   ├── utils/              # 工具函数
│   │   │   └── validators.js   # 数据验证
│   │   └── server.js           # 服务器入口
│   ├── logs/                   # 日志目录
│   ├── tests/                  # 测试文件
│   │   ├── auth.test.js
│   │   ├── transactions.test.js
│   │   └── categories.test.js
│   ├── .env.example            # 环境变量示例
│   └── package.json            # 依赖配置
│
├── docs/                       # 项目文档
├── .gitignore                  # Git 忽略文件
└── README.md                   # 项目说明
```

## 快速开始

### 前置要求
- Node.js >= 16.x
- MongoDB >= 4.x
- npm 或 yarn

### 后端启动
```bash
cd backend
npm install
npm run dev
```

### 前端启动
```bash
cd frontend
npm install
npm run dev
```

## API 接口说明

### 认证接口
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

### 交易接口
- `GET /api/transactions` - 获取交易列表
- `POST /api/transactions` - 创建交易
- `GET /api/transactions/:id` - 获取单个交易
- `PUT /api/transactions/:id` - 更新交易
- `DELETE /api/transactions/:id` - 删除交易

### 分类接口
- `GET /api/categories` - 获取分类列表
- `POST /api/categories` - 创建分类
- `GET /api/categories/:id` - 获取单个分类
- `PUT /api/categories/:id` - 更新分类
- `DELETE /api/categories/:id` - 删除分类

## 作业要求对照

| 要求项 | 状态 | 说明 |
|--------|------|------|
| 前端: Vue.js + Bootstrap | ✅ | Vue 3 + Bootstrap 5 |
| 后端: Node.js (Express.js) | ✅ | Express.js 框架 |
| 数据库: MongoDB | ✅ | 使用 Mongoose |
| 两个相关数据集合 | ✅ | Transaction + Category (关联 User) |
| CRUD 操作 | ✅ | 完整增删改查 |
| Token-based 认证 | ✅ | JWT 实现 |
| 响应式设计 | 🚧 | Bootstrap 5 响应式 |
| 数据可视化 | 🚧 | 待实现 |
| AI 消费分析 | 🚧 | 待实现 |

## 开发团队
- 2人小组项目

## 更新日志
- 2026-03-20: 项目初始化，创建目录结构
