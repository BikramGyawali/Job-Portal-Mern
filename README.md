# React + Vite + Flowbite + Tailwind CSS v4

This template provides a minimal setup to get React working in Vite with HMR and ESLint rules.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Tailwind CSS v4 Configuration](#tailwind-css-v4-configuration)
4. [Flowbite Installation](#flowbite-installation)
5. [React Compiler](#react-compiler)
6. [ESLint Configuration](#eslint-configuration)
7. [Usage](#usage)

---

## Prerequisites

- Node.js and npm installed
- A new or existing React project (created with Vite)

---

## Project Setup

Create a new Vite project:

```bash
npm create vite@latest my-app
cd my-app
```

Select React and your preferred language (JavaScript/TypeScript).
Install dependencies:

npm install

Tailwind CSS v4 Configuration

Install Tailwind CSS and Vite plugin:

npm install -D tailwindcss @tailwindcss/vite postcss

Configure Vite in vite.config.js:

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
plugins: [react(), tailwindcss()],
});

Import Tailwind in src/index.css:

@import "tailwindcss";
/_ Remove old directives like @tailwind base, etc. _/

Flowbite Installation
Method 1: Using Flowbite React CLI (Recommended)

# New Project

npx create-flowbite-react@latest

# Existing Project

cd your-project
npx flowbite-react@latest init

This sets up Tailwind v4, Flowbite, and dependencies automatically.

Method 2: Manual Installation

Install Flowbite:

npm install flowbite

Add Flowbite CSS in src/index.css:

@import "tailwindcss";
@import "flowbite/dist/flowbite.css";

Include Flowbite JavaScript in public/index.html before </body>:

<script src="./node_modules/flowbite/dist/flowbite.min.js"></script>

React Compiler

Two official plugins are available:

@vitejs/plugin-react
— Babel-based Fast Refresh

@vitejs/plugin-react-swc
— SWC-based Fast Refresh

React Compiler is not enabled by default due to dev/build performance.
To enable, see React Compiler Documentation
.

ESLint Configuration

For production, TypeScript with type-aware lint rules is recommended.
Check out typescript-eslint
and the TS template
.

Usage

Example usage of Flowbite components in React:

import { Button, Modal } from 'flowbite-react';

function App() {
return (
<div className="p-4">
<Button>Click Me</Button>
<Modal>
<p>This is a Flowbite Modal!</p>
</Modal>
</div>
);
}

export default App;

npm install react-toastify
