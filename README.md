New Bodies Gym Web Application
A high-performance, full-stack web application built for New Bodies Gym in Buxton. This platform manages class timetables, facility showcasing, member authentication, and class bookings.

Built with Next.js 15+, Tailwind CSS v4, Supabase, and Shadcn UI.

🚀 Features
Public Landing Page: High-impact "Dark & Lime" aesthetic with fully responsive design.

Dynamic Timetable: Real-time weekly class schedule fetched from the database.

Facilities Showcase: Interactive grid displaying gym equipment and zones.

User Authentication: Secure Sign Up / Login / Sign Out flows (Supabase Auth).

Booking System: Members can book classes directly from the timetable.

Admin Dashboard: Protected route for owners to:

Add/Remove classes from the live schedule.

View all active bookings and attendee lists.

Cancel bookings.

Responsive Navigation: Mobile-friendly menu and sticky header.

🛠️ Tech Stack
Framework: Next.js 15 (App Router, Server Actions)

Language: TypeScript

Styling: Tailwind CSS v4

UI Components: Shadcn/ui

Database & Auth: Supabase (PostgreSQL)

Icons: Lucide React

🏁 Getting Started
1. Prerequisites
Ensure you have the following installed:

Node.js (v18 or higher)

npm or pnpm

2. Clone the Repository
Bash

git clone https://github.com/your-username/new-bodies-gym.git
cd new-bodies-gym
3. Install Dependencies
Bash

npm install
# or
pnpm install
4. Environment Variables
Create a file named .env.local in the root directory. You need your Supabase project credentials.

Bash

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
5. Database Setup (Supabase)
Go to your Supabase Dashboard.

Navigate to the SQL Editor.

Execute the initialization script to create tables (profiles, classes, weekly_schedule, bookings) and security policies.

(Refer to db_schema.sql if you saved the SQL from Phase 2, or see the project documentation).

6. Run the Development Server
Bash

npm run dev
Open http://localhost:3000 with your browser to see the result.

🔐 Admin Setup
By default, all new users are "Members". To access the Admin Dashboard, you must manually promote your account.

Sign up for an account on your running local app (http://localhost:3000/login).

Go to your Supabase Dashboard -> SQL Editor.

Run the following query:

SQL

UPDATE public.profiles
SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'your_email@example.com');
Logout and Login again. You can now access /admin.

📂 Project Structure
├── app/
│   ├── admin/         # Admin Dashboard & Actions
│   ├── auth/          # Login/Signup Logic
│   ├── dashboard/     # User Booking View
│   ├── layout.tsx     # Root Layout (Fonts, Global CSS)
│   └── page.tsx       # Landing Page
├── components/
│   ├── home/          # Hero, Timetable, Facilities sections
│   ├── layout/        # Navbar, Footer
│   └── ui/            # Shadcn Reusable Components
├── lib/
│   ├── site-config.ts # Static content (Address, Prices, Opening Hours)
│   └── supabase/      # Database Clients (Server & Client)
└── middleware.ts      # Route Protection
🚢 Deployment
The easiest way to deploy is using Vercel.

Push your code to GitHub.

Import the project into Vercel.

In Vercel Project Settings, add your Environment Variables (NEXT_PUBLIC_SUPABASE_URL, etc).

Click Deploy.

License This project is private and proprietary to New Bodies Gym.