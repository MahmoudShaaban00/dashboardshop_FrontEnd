🛍️ Shop Management Dashboard

A full-stack freelance project to manage a clothing shop, built with Next.js, NestJS, and TanStack Query. The system provides a dashboard to manage employees, products, and sales efficiently.

🧰 Tech Stack
Frontend: Next.js 13 (App Router, TypeScript, Tailwind CSS)
Backend: NestJS (TypeScript, REST API, PostgreSQL/MongoDB optional)
State Management & Data Fetching: Custom React Hooks + TanStack Query (React Query v5)
Authentication: JWT-based login
Styling: Tailwind CSS
Version Control: Git + GitHub

🚀 Features
Dashboard
Manage employees: create, update, delete, and view employees.
Manage products: create, update, delete, and view products in stock.
Track daily sales: record sales, calculate total revenue, and number of sales.
Search and filter: easily filter products or employees by name, ID, or stock.
Responsive UI: works on desktop and mobile screens.

Custom Hooks
All API interactions are abstracted into custom hooks for cleaner and reusable code.
Hooks use TanStack Query for efficient data fetching, caching, and mutations.
Example hooks:
useProducts – fetch, update, delete products
useEmployees – fetch, update, delete employees
useSales – track daily sales and total revenue

Freelance-ready
Easy to deploy and extend for other shop types.
/app                # Next.js frontend pages
/components         # React components (Tables, Forms, Dashboard)
/context            # React context for global state
/hooks              # Custom hooks for API calls
/api                # NestJS backend endpoints
/types              # TypeScript types for frontend and backend

🔧 Installation
Frontend (Next.js)
git clone <your-repo-url>
cd frontend
npm install
npm run dev

Backend (NestJS)
cd backend
npm install
npm run start:dev

📈 Roadmap / Future Improvements
Add role-based access (admin, manager, staff)
Add analytics charts for sales trends
Support multi-shop management
Add Stripe integration for online payments
Implement real-time notifications for stock updates

⚡ License
This project is free to use for learning and freelance projects.
Fully modular and maintainable.
Can be adapted for multiple shops or different business domains.
📁 Project Structure
