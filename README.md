<div align="center">

# 🚗 DriveFleet

### Premium Car Rental & Fleet Management Platform

*Bridging cinematic visual storytelling with conversion-optimized car bookings and hosting.*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-drivefleet--eight.vercel.app-2563eb?style=for-the-badge)](https://drivefleet-eight.vercel.app/)
&nbsp;
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
&nbsp;
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
&nbsp;
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📖 Table of Contents

- [✨ Overview](#-overview)
- [🚀 Live Links](#-live-links)
- [❌ The Problem &amp; ✅ The Solution](#-the-problem---the-solution)
- [💡 Business Value &amp; SEO](#-business-value--seo)
- [🚀 Key Features](#-key-features)
- [📦 Tech Stack &amp; Architecture](#-tech-stack--architecture)
- [🛠️ Installation &amp; Setup](#-installation--setup)
- [🚢 Production Deployment](#-production-deployment)
- [🤝 Social &amp; Contributing](#-social--contributing)

---

## ✨ Overview

**DriveFleet** is a high-performance, enterprise-grade car rental and fleet hosting platform. Meticulously designed with **Next.js 16**, **React 19**, and a highly-secure decoupled **Express.js API gateway**, the application establishes the premium standard for modern car rental systems and micro-sharing host economies.

Powered by a dual-repo setup, DriveFleet uses **Better Auth** with a **Google Social OAuth and local Email/Password credentials ecosystem** for seamless sign-ups. At its core, the application connects to a cloud-hosted **MongoDB Atlas** database, securing requests between the client and backend via a custom JSON Web Key Set (JWKS) token validation handler. With an elegant user interface created via **HeroUI (v3)** and **Tailwind CSS v4**, DriveFleet delivers a cinematic, highly-responsive journey that turns browsing into bookings in seconds.

---

## ❌ The Problem & ✅ The Solution

> **Car rental platforms deserve more than generic dashboards.**

Traditional online car rentals are slow, lack robust modern authentication, suffer from cluttered host controls, and compromise on visual fidelity. Customers expect a premium, responsive booking experience, and hosts require seamless inventory tools.

| ❌ The Problem                                               | ✅ DriveFleet's Solution                                                          |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Clunky and slow templates that hurt visual appeal            | Cinematic, dark/light-harmonious UI designed with **HeroUI** and smooth UX        |
| Complex hosting systems preventing users from adding cars     | Simplified host panel offering full CRUD (create, read, update, delete) controls  |
| Insecure backend endpoints vulnerable to API exploits       | JWKS verify-token Express middleware validating JWT signatures securely           |
| Unreliable authentication lacking third-party social options | **Better Auth** ecosystem featuring Google OAuth and secure cookie-caching        |
| Bad mobile layout ruining reservations on the go             | Mobile-first responsive grids, popovers, and interactive modals                   |
| Outdated React/Next versions limits speed and core vitals    | Built on **Next.js 16 (App Router)** and **React 19** for lightning-fast pages    |

---

## 🚀 Live Links

* **Live Client-Side App:** [https://drivefleet-eight.vercel.app](https://drivefleet-eight.vercel.app/)
* **Live API Backend Server:** [https://drivefleet-server-swart.vercel.app](https://drivefleet-server-swart.vercel.app/)

<br/>

<table>
  <tr>
    <td width="50%">
      <img src="./drivefleet-crp/public/assets/screenshot_1.png" alt="DriveFleet Hero Preview" width="100%" style="border-radius:8px;aspect-ratio:16/9;object-fit:cover" />
    </td>
    <td width="50%">
      <img src="./drivefleet-crp/public/assets/screenshot_2.png" alt="DriveFleet Customer Experiences Preview" width="100%" style="border-radius:8px;aspect-ratio:16/9;object-fit:cover" />
    </td>
  </tr>
  <tr>
    <td align="center"><sub>🚗 Immersive Premium Sports Category</sub></td>
    <td align="center"><sub>⚡ High-End Electric Luxury Fleet</sub></td>
  </tr>
</table>

---

## 💡 Business Value & SEO

By balancing beautiful aesthetics with robust security, DriveFleet yields remarkable utility:

| Feature                           | Impact                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------- |
| **Enhanced SEO Auditing**         | Leveraging React Server Components (RSC) and metadata tags for index optimization|
| **Frictionless Booking**          | Clean user workflows convert fleet browsing into reservations under 3 clicks    |
| **Decoupled Security**            | Zero database keys exposed; API routing runs isolated backend middleware verification |
| **Dynamic Host Growth**          | Self-service hosting controls turn drivers into dynamic income-generating hosts |

---

## 🚀 Key Features

* **🚗 Immersive Fleet & Grid Exploration** — A fully-indexed vehicle catalog. Users can filter by categories (Sedans, SUVs, Sports, Trucks), search models dynamically, and sort by daily rates.
* **🔑 Next-Gen Secure Authentication** — Dual-mode login via **Better Auth**, supporting OAuth 2.0 with Google, local Email/Password signup/login, and advanced session caching with JWTs.
* **💼 Comprehensive Host Dashboard (CRUD)** — Empowering car owners to list their fleets with complete controls. Add, modify, preview, or delete vehicle details instantly with smooth React Aria modals.
* **📅 Smart Booking Engine** — Client dashboard to instantly rent vehicles, review total billing, check lease limits, and securely cancel bookings under self-service reservation panels.
* **⚡ Decoupled Cross-Origin Architecture** — High-speed API router built with Express.js that leverages `jose` JWKS token validation directly against the Next.js auth server's signature directory.

---

## 📦 Tech Stack & Architecture

### **Core Frontend Stack (`drivefleet-crp`)**

| Layer                      | Technology                                            |
| -------------------------- | ----------------------------------------------------- |
| **Framework**              | `next@16.2.6` (App Router)                            |
| **UI Framework**           | `@heroui/react@^3.0.5` (NextUI v3)                    |
| **Styling**                | `tailwindcss@^4`, `@tailwindcss/postcss@^4`           |
| **State & Auth**           | `better-auth@^1.6.11` with MongoDB Adapter            |
| **VFX & Carousel**         | `swiper@^12.1.4` (Fleet dynamic cards, touch gesture) |
| **Notifications**          | `react-toastify@^11.1.0`                              |

### **Core Backend Stack (`drivefleet-server`)**

| Layer                      | Technology                                            |
| -------------------------- | ----------------------------------------------------- |
| **Engine & Router**        | `express@^4.19.2` (Node.js runtime)                   |
| **Database Connector**     | `mongodb@^6.6.1` (Atlas integration)                  |
| **JWKS & Cryptography**    | `jose@^4.15.9` (JWT Validation against Client JWKS)   |
| **Session Control**        | `jsonwebtoken@^9.0.2` & `cors@^2.8.5`                 |

---

## 🛠️ Installation & Setup

DriveFleet operates on a modern split monorepo architecture: `drivefleet-crp` (Next.js client) and `drivefleet-server` (Express.js backend).

### **1. Clone the Workspace**
```bash
git clone https://github.com/CoderGUY47/drivefleet-rental-cars.git
cd drivefleet-rental-cars
```

### **2. Setup Backend Server (`drivefleet-server`)**
1. Navigate to the server folder:
   ```bash
   cd drivefleet-server
   npm install
   ```
2. Create a `.env` file inside `drivefleet-server`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CLIENT_URL=http://localhost:3000
   ```
3. Run in local development:
   ```bash
   npm run dev
   ```

### **3. Setup Frontend Client (`drivefleet-crp`)**
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd drivefleet-crp
   npm install --legacy-peer-deps
   ```
2. Create a `.env` file inside `drivefleet-crp`:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_32_character_better_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   NEXT_PUBLIC_SERVER_URL=http://localhost:5000
   ```
3. Boot the Next.js dev server:
   ```bash
   npm run dev
   ```
4. Access the web app at `http://localhost:3000`.

---

## 🚢 Production Deployment

* **Frontend Hosting (Next.js):** Deployed on **Vercel** (`drivefleet-eight.vercel.app`).
* **Backend Hosting (Express):** Deployed on **Vercel Serverless Functions** (`drivefleet-server-swart.vercel.app`) using a custom `vercel.json` rewrite strategy.

---

## 🤝 Social & Contributing

<div align="center">

Produced with absolute dedication and precision by **[CoderGUY47](https://github.com/CoderGUY47)**.

*Join us in engineering the future of mobility!*

[![GitHub](https://img.shields.io/badge/GitHub-CoderGUY47-181717?style=for-the-badge&logo=github)](https://github.com/CoderGUY47)

</div>
