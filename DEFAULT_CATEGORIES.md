# 默认分类初始化说明

## 概述

本项目已预置了 **24 个默认分类**（18 个支出分类 + 7 个收入分类），包含：
- 分类名称（英文）
- Bootstrap Icons 图标
- 预设颜色
- 默认分类标记（不可删除/编辑）

## 自动初始化

### 新用户注册
新用户注册时会**自动创建**所有默认分类，无需手动操作。

### 现有用户
对于已经注册的用户，有三种方式初始化默认分类：

---

## 方法 1：通过 UI 界面初始化（推荐）

1. 访问 **Categories** 页面 (`http://localhost:5173/categories`)
2. 如果没有分类，会显示空状态
3. 点击 **"Initialize Default Categories"** 按钮
4. 系统会自动创建 24 个默认分类

---

## 方法 2：运行后端脚本

```bash
cd backend
npm run init-categories
```

该脚本会：
- 查找所有没有分类的用户
- 为这些用户创建默认分类
- 跳过已有分类的用户

---

## 方法 3：API 调用

```javascript
// 前端调用
import { initializeCategories } from '@/api/categories'

const result = await initializeCategories()
console.log(result)
```

```bash
# cURL
curl -X POST http://localhost:3000/api/categories/init \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 预置分类列表

### 支出分类 (18 个)

| 中文名称 | 英文名称 | 图标 | 颜色 |
|---------|---------|------|------|
| 餐饮 | Food | bi-egg-fried | #E68A5E |
| 交通 | Transportation | bi-car-front | #9CAF9A |
| 购物 | Shopping | bi-bag | #C9A9A6 |
| 娱乐 | Entertainment | bi-controller | #A8BFCC |
| 住房 | Housing | bi-house-door | #7C9A7A |
| 水电燃气 | Utilities | bi-lightbulb | #D4CDC3 |
| 通讯 | Communication | bi-phone | #B7A99A |
| 医疗 | Healthcare | bi-heart-pulse | #C9A9A6 |
| 教育 | Education | bi-book | #8FBCAA |
| 旅游 | Travel | bi-airplane | #A8BFCC |
| 社交 | Social | bi-people | #9CAF9A |
| 健身 | Fitness | bi-person-walking | #7C9A7A |
| 宠物 | Pets | bi-dog | #C0BAB2 |
| 服饰 | Clothing | bi-person-standing-dress | #D4CDC3 |
| 美妆 | Beauty | bi-brush | #C9A9A6 |
| 数码 | Electronics | bi-laptop | #A8BFCC |
| 家居 | Home | bi-sofa | #9CAF9A |
| 其他 | Other | bi-tag | #B7A99A |

### 收入分类 (7 个)

| 中文名称 | 英文名称 | 图标 | 颜色 |
|---------|---------|------|------|
| 工资 | Salary | bi-briefcase | #7C9A7A |
| 奖金 | Bonus | bi-trophy | #E68A5E |
| 投资回报 | Investment | bi-graph-up | #9CAF9A |
| 礼金 | Gift | bi-gift-fill | #C9A9A6 |
| 退款 | Refund | bi-arrow-return-left | #7C9A7A |
| 报销 | Reimbursement | bi-calculator | #A8BFCC |
| 其他收入 | Other Income | bi-cash-stack | #8FBCAA |

---

## 使用说明

### 添加交易
在 **Transactions** 页面添加交易时：
- 选择"支出"类型，只显示支出分类
- 选择"收入"类型，只显示收入分类
- 选中分类后会显示对应的图标和颜色

### 自定义分类
用户可以：
1. 创建自定义分类（选择不同的图标和颜色）
2. 编辑默认分类的名称、图标和颜色（但不可删除）
3. 删除自定义分类（如果该分类下无关联交易）

### 默认分类保护
- 默认分类（`isDefault: true`）不可删除
- 可以修改默认分类的名称、图标和颜色

---

## 技术实现

### 后端文件
- `backend/seed/defaultCategories.js` - 默认分类数据
- `backend/seed/initCategories.js` - 初始化脚本
- `backend/services/authService.js` - 注册时自动创建分类
- `backend/controllers/categoryInitController.js` - 初始化 API 控制器

### 前端文件
- `frontend/src/api/categories.js` - API 接口
- `frontend/src/views/Categories.vue` - 分类管理页面
- `frontend/src/views/Transactions.vue` - 交易页面（显示分类图标和颜色）

---

## 测试步骤

1. **重启后端**（重要！）
   ```bash
   cd backend
   npm run dev
   ```

2. **注册新用户测试**
   - 注册一个新账号
   - 登录后访问 Categories 页面
   - 应该自动看到 24 个默认分类

3. **现有用户测试**
   - 访问 Categories 页面
   - 点击"Initialize Default Categories"按钮
   - 应该创建所有默认分类

4. **测试交易功能**
   - 访问 Transactions 页面
   - 添加新交易
   - 确认分类下拉框显示图标和颜色
   - 确认列表中的分类显示图标和颜色

---

## 故障排除

### 问题：新用户没有自动创建分类
**解决方案**：
- 确保后端已重启
- 检查 `authService.js` 中的导入路径是否正确
- 查看后端日志是否有错误

### 问题：初始化按钮没有反应
**解决方案**：
- 打开浏览器控制台（F12）查看错误
- 确保前端已正确导入 `initializeCategories` API
- 检查后端是否正常运行

### 问题：图标不显示
**解决方案**：
- 确保前端 `index.html` 中已引入 Bootstrap Icons
- 检查图标的 class 名称是否正确
