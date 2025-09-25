# Basic ERP Frontend
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/kauehenrick/basic-erp-frontend)

This is the frontend for a basic Enterprise Resource Planning (ERP) application, built with a modern web stack. It provides functionalities for managing people (customers/suppliers), products, and issuing invoices (NF-e).

The application features a clean user interface built with React and Tailwind CSS, leveraging Shadcn/ui for a polished component library. State is managed globally using Zustand, and data is persisted through a Supabase backend.

## ✨ Features

-   **Dashboard**: A home screen with key metrics like monthly sales, rejected invoices, and products with low stock, plus quick action buttons.
-   **People Management**: Full CRUD (Create, Read, Update, Disable) functionality for managing people (customers or suppliers), distinguishing between individuals (Física) and companies (Jurídica).
-   **Product Management**: Comprehensive module for creating, viewing, updating, and disabling products, including fiscal information and stock control.
-   **Invoice (NF-e) Issuance**: A dedicated module for creating and managing electronic invoices, linking clients and products.
-   **Intelligent Forms**:
    -   Seamless integration with **BrasilAPI** to auto-populate address data from a CEP (Postal Code).
    -   Auto-fills company data by looking up a CNPJ.
    -   Input masks and validation for fields like CPF, CNPJ, phone numbers, and currency.
-   **Data Tables**: Interactive and sortable tables for displaying lists of people, products, and invoices, complete with pagination and search functionality.
-   **Persistent State**: User session and UI state (like the selected sidebar option) are persisted across page reloads using `zustand/middleware/persist`.

## 🛠️ Tech Stack

-   **Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/ui](https://ui.shadcn.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Routing**: [React Router](https://reactrouter.com/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation
-   **Backend as a Service**: [Supabase](https://supabase.io/)
-   **API Client**: [Axios](https://axios-http.com/)
-   **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
-   **Linting & Formatting**: [Biome](https://biomejs.dev/)

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   Node.js (v18 or higher)
-   [pnpm](https://pnpm.io/installation) (recommended package manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kauehenrick/basic-erp-frontend.git
    cd basic-erp-frontend
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your Supabase credentials. You can get these from your Supabase project settings.

    ```env
    VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:5173`.

## 📜 Available Scripts

The `package.json` file contains several scripts for development:

-   `pnpm dev`: Starts the development server with Hot Module Replacement (HMR).
-   `pnpm build`: Compiles and bundles the application for production.
-   `pnpm preview`: Serves the production build locally to preview it.
-   `pnpm test`: Runs the test suite using Vitest.
-   `pnpm check`: Runs Biome to check for linter and formatter issues and applies fixes.
-   `pnpm format`: Formats the entire codebase using Biome.
