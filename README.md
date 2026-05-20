# KOF Chitradurga - Website & Employee Management System

**Regional Oilseeds Growers' Co-operative Society Union Ltd.**

A complete modern web application for KOF Chitradurga built with Next.js 16, featuring a public-facing corporate website and an internal employee management portal.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** SQLite (better-sqlite3)
- **Auth:** JWT-based with httpOnly cookies
- **Icons:** Lucide React
- **Language:** TypeScript

## Features

### Public Website
- Modern responsive homepage with hero section
- About Us page with company history and structure
- Products catalog (Sungold Sunflower, Safal Groundnut, Palmolein, Soyabean, Rice Bran oils)
- Activities page (procurement, processing, marketing, R&D)
- Contact page with form, map, and social media links

### Admin Portal
- **Dashboard:** Overview of employees, orders, revenue, pending leaves
- **Employee Management:** Create/edit/deactivate employees, reset passwords
- **Payslip Generation:** Generate monthly salary slips with full breakdown
- **Leave Management:** Approve/reject employee leave requests
- **Order Management:** Create and track product orders across districts

### Employee Portal
- **Dashboard:** Welcome screen with quick stats and actions
- **Payslips:** View detailed monthly salary slips
- **Leaves:** Apply for leave, view balance, track history
- **Profile:** Personal details, designation, service rules

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Login Credentials

### Admin
- **Email:** admin@kofchitradurga.com
- **Password:** admin@kof2024

### Employee (Sample)
- **Email:** ashwini@kofchitradurga.com
- **Password:** kof@2024

## Project Structure

```
src/
├── app/
│   ├── (public)/        # Public website pages
│   ├── (portal)/        # Admin & Employee portal pages
│   ├── api/             # API routes (auth, admin, employee)
│   └── login/           # Login page
├── components/
│   └── layout/          # Navbar, Footer
└── lib/
    ├── auth.ts          # JWT authentication
    ├── db.ts            # SQLite database setup & seeding
    └── constants.ts     # Products, departments, company info
```

## About KOF

The Karnataka Co-operative Oilseeds Growers' Federation Limited was registered on 26th October, 1984. The Chitradurga unit (ROGCSU) operates across 4 districts with a modern packing unit processing groundnut, sunflower, palmolein, soyabean, and rice bran oils under the Sungold and Safal brands.

## Contact

- **Phone:** +91 6366975382
- **Email:** kofcta2@gmail.com
- **Location:** KOF Complex, Chitradurga, Karnataka - 577501
