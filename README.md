# 🚀 Capacitación y Apoyo al Bienestar Docente Portfolio

**Live Site:** [https://marentes-cabd.vercel.app/](https://marentes-cabd.vercel.app/)

---

## 🌟 Overview & Key Features

This project is a modern, production-ready landing page built for **Capacitación y Apoyo al Bienestar Docente**. It is designed with enterprise-level best practices, focusing on performance, accessibility, and content management scalability.

The application serves as a personal portfolio, featuring a slice-based content architecture powered by Prismic Headless CMS, making content updates simple for non-technical users.

### 🎯 Core Goals & Value

* **Fast Performance:** Achieves high Lighthouse scores (90+) through advanced Next.js optimizations.
* **Scalability:** Utilizes an Atomic Design component structure and Prismic Slices for easy feature extension.
* **Maintainability:** Built with TypeScript strict mode, clean code, and comprehensive linting rules.
* **Content Autonomy:** Content is fully managed via Prismic CMS, supporting real-time updates via ISR.

---

## 🛠️ Technical Stack

| Category | Technology | Version / Pattern | Notes |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js | 16.0.10 (App Router) | Latest stable version for performance. |
| **Language** | TypeScript | 5+ (Strict Mode) | Ensures type safety and reduces runtime errors. |
| **Styling** | Tailwind CSS | 4 | Utility-first approach for fast styling. |
| **CMS** | Prismic | Client, Next, React | Headless CMS for content management. |
| **Animations** | Motion | v12.23.24 | Lightweight alternative to Framer Motion. |
| **Components** | Radix UI & Shad cn | Primitives | Accessible UI foundations (Tooltips, Hover Cards). |
| **Testing** | Vitest & JSDOM | Unit/Component | Fast testing environment. |

---

## 📂 Project Architecture (For Developers)

The codebase follows a modular structure focused on scalability and maintainability:

### 1. Next.js App Router Structure
* `app/`: Contains all main routes (pages) and serverless functions (API routes).
    * `app/page.tsx`: The main home page view.
    * `app/layout.tsx`: Root layout, global providers (Theme, Motion), and global structure.
    * `app/api/*/route.ts`: API routes for content control (`preview`, `exit-preview`, `revalidate`).
* `src/`: Primary source directory.

### 2. Component & Content Organization
* `src/components/`: Reusable, structural components.
    * `src/components/ui/`: Design system primitives (Button, Card, Badge, Tooltip) built with Radix UI and Shadcn conventions.
    * `src/components/navbar/` & `src/components/footer/`: Site header and footer implementations.
    * `src/components/providers/`: Context providers (Theme, Motion).
* `src/slices/`: **Prismic Slice Components.** Each folder contains:
    * React component (`index.tsx`)
    * Mock data (`mocks.json`) for local testing.
    * Prismic model definition (`model.json`).
* `src/lib/`: Utility code, including Prismic configuration (`src/prismicio.ts`), icons (`src/lib/icons.ts`), and animation presets (`src/lib/motion-variants.ts`).

---

## ⚡ Performance & Optimization Details

The project has been configured for top-tier performance:

* **React Compiler:** Enabled in `next.config.js` for automatic, memoization-based component rendering optimization.
* **Next.js Image Optimization:** Configured for AVIF/WebP formats, responsive device sizes, and a 30-day cache TTL for remote assets.
* **Font Optimization:** Utilizes the Next.js Font module with `display: "swap"` and preloading to eliminate FOUT (Flash of Unstyled Text).
* **SEO & Metadata:** Dynamic metadata generation from Prismic CMS, Open Graph images, and full ARIA support in interactive components.

---

## 🧑‍💻 Getting Started (Developer Setup)

### Prerequisites

* Node.js 18+ (LTS recommended)
* npm (used for all scripts)

### Local Development

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Set Environment Variables:**
    Create a `.env.local` file with your Prismic credentials:
    ```
    PRISMIC_API_TOKEN=<your-prismic-token>
    PRISMIC_REPOSITORY=<your-repo-name>
    ```

3.  **Run Dev Server:**
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

### Common Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the development server (with HMR). |
| `npm run build` | Creates a production-ready build. |
| `npm run start` | Serves the production build locally (after `npm run build`). |
| `npm run lint` | Executes ESLint for code quality and style checks. |
| `npm run test` | Runs unit and component tests (Vitest). |

---

## ✍️ Content Management (Non-Technical Guide)

This site is powered by Prismic, a Headless CMS, which separates the content from the code.

1.  **To Edit Content:** Log into your Prismic dashboard and find the relevant document (e.g., "Home Page").
2.  **Make Changes:** Edit the text, images, or structure using the Slice editor.
3.  **Publish:** Save and publish the document. If the site is deployed (e.g., on Vercel), the new content will appear automatically shortly after publishing due to Incremental Static Regeneration (ISR).

---

## 🛡️ License

Please state the chosen license for this open-source project here (e.g., **MIT**).

> **Note:** The MIT License is recommended for maximum flexibility for professional use.

---

**Status:** ✅ **PRODUCTION READY**
**Version:** 0.1.0
**Last Updated:** December 16, 2025
