# 💸 DailySpend - Expense Tracker (PERN Stack) Project Report

---

## 📌 Project Purpose

This project was built to manage and track family-level daily spending, including both **cash and debit card expenses**. It was developed using the **PERN stack**:

- **PostgreSQL** (Relational Database)
- **Express.js** (Backend server framework)
- **React.js** (Frontend UI framework)
- **Node.js** (Runtime environment)

Additionally, **Appwrite** was used for authentication to solve problems faced in the previous project with token/session management.

> "This is a practical project inspired by how my families maintain manual diaries of expenses."
> 

---

## 🧠 Tech Stack and Libraries

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL (hosted via NeonDB)
- **Authentication**: Appwrite
- **Deployment**: Cloudflare Pages (Frontend), Render.com (Backend)
- **Dev Tools**: GitHub (with dev/main branches), UptimeRobot (for backend ping)

**Libraries Used**:

- `react-router-dom` for routing
- `dayjs` for date formatting
- `react-icons`, `react-hook-form` for UI and validation

---

## 🔐 Why Appwrite?

Appwrite was integrated for authentication instead of building a custom JWT system because:

- It solved previous cookie/session handling problems.
- Easier token refresh and login state management.
- Great developer experience with easy-to-use SDK.

---

## ⚙️ Features

### ✅ Completed Features

- 🔐 Phone + Password Login (simulated as email)
- 💰 Add and view expenses (Cash or Card)
- 🔍 Filters for:
    - Expense Type
    - Bank (for Card)
    - Category
- 📊 Daily Summary starting from custom diary date (configurable)
- ⚡ Instant UI updates after adding expense
- 🔒 React Context for user session and family data

### 🚧 Work in Progress

- Family Management UI
    - Invite/Join family (admin-only)
    - Show members list with role
- UI updates for better **mobile experience** (90% users are phone-based)

### 🔜 Upcoming Features

- 📈 Analytics Dashboard (Graph + Charts)
- 🗣️ Voice-Based Expense Input (Planned via **Inngest** or custom NLP integration)
- 📄 PDF export (like PhonePe/Paytm statements)

> Going to integrate Inngest for event-driven processing and serverless background jobs like parsing voice inputs or batch data exports. This tool offers simple, scalable workflows ideal for expense parsing and analytics automation.
> 

**🗺️ Roadmap** of upcoming Features to the project :- [https://www.notion.so/DailySpends-App-Roadmap-20f6a508bb52800ab06cd11273ce1c06?source=copy_link](https://www.notion.so/DailySpends-App-Roadmap-20f6a508bb52800ab06cd11273ce1c06?pvs=21)

---

### 🌐 UI Pages

![DailySpend.png](%F0%9F%92%B8%20DailySpend%20-%20Expense%20Tracker%20(PERN%20Stack)%20Projec%202116a508bb528002b838ddf416ac6ff6/DailySpend.png)

---

## 📚 Learning Outcome

- Proper Git workflow with `main` and `dev` branches
- Working with relational databases using raw SQL and PostgreSQL
- Handling real-world problems like authentication, UI state, and filters
- API versioning and modular Express architecture

---

## 📖 Learning Sources

- **SQL**: Apna College (YouTube)
- **PostgreSQL**: Official docs
- **Appwrite**: Hitesh Choudhary (Youtube)

---

## 🧠 How AI Tools Helped

- **Readdy UI**: Used to create basic UI template (only starter pages)
- **ChatGPT**: Helped understand `zod`, `react-hook-form`, PostgreSQL queries, and structuring schema
- **Cursor IDE**: Faster coding with smart AI completions

> “AI helped reduce boilerplate coding and improved focus on logic”
> 

---

## 🌍 Deployment Strategy

- **Frontend**: Cloudflare Pages for global CDN and fast performance
- **Backend**: Render for Express + PostgreSQL connection
- **Why not full hosting on Render?**
    - Render backend **sleeps on inactivity** → slow start
    - Cloudflare handles static delivery better
    - Now using **UptimeRobot** to keep backend alive
- **Why not full hosting on Cloudflare?**
    - Cloudflare Workers doesn't allow proper integration of Node and Express.js.

---

## ✅ Mobile-First Focus

Unlike the Snake & Ladder game, **DailySpend was designed for mobile screens** from the start:

- UI optimized for vertical layout
- Quick Add modal accessible at top
- Tabular views compressed for mobile usage

---

## 🚫 Current Issues

- No reminder system yet
- Needs mobile-native experience (planned PWA/React Native app)
- Voice-to-expense still under R&D

---

## 📎 Summary

This project evolved from lessons learned in the Snake & Ladder MERN app. It added:

- Scalable SQL structure
- Better auth system
- Modular backend
- Smarter frontend logic

It’s a meaningful real-world application to help families go digital with daily expenses.

> “Built from scratch, improved with experience, powered by AI”
> 

---

## **Developed By - Rohit H.**

LinkedIn :- http://www.linkedin.com/in/rohit-huge-03705832b