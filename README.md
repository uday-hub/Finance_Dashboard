# 💰 Finance Dashboard UI

A clean and interactive finance dashboard built as part of a Frontend Developer Internship assignment.

---

## 🚀 Overview

This project demonstrates a simple finance dashboard that helps users:

- View financial summary (balance, income, expenses)
- Explore transactions with filtering and search
- Understand spending patterns through charts and insights
- Experience role-based UI behavior (Admin vs Viewer)

---

## 🛠️ Tech Stack

- React (Vite)
- Tailwind CSS (v4)
- Recharts (for charts)
- Lucide React (icons)

---

## ✨ Features

### 📊 Dashboard Overview
- Summary cards (Balance, Income, Expenses)
- Time-based chart (trend visualization)
- Category-based chart (spending breakdown)

### 📋 Transactions
- Transaction table with:
  - Date
  - Category
  - Amount
  - Type (income/expense)
- Search by category/type
- Filter by income/expense
- Responsive table with empty state handling

### 👤 Role-Based UI
- Viewer → read-only access
- Admin → can add and delete transactions
- Role switcher in UI (simulated RBAC)

### 📈 Insights
- Highest spending category
- Monthly comparison (this month vs last month)
- Spending trend observation

### 💾 State Management
- Managed using React hooks (`useState`, `useEffect`)
- Data persisted using LocalStorage

---

## 🌙 Optional Enhancements (Implemented)

- Dark Mode toggle
- LocalStorage persistence
- Add Transaction Modal
- Responsive layout
- Smooth UI transitions

---

## 📦 Installation & Setup

```bash
git clone <your-repo-link>
cd finance-dashboard
npm install
npm run dev