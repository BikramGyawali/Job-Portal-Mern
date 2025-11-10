# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

To install Flowbite with React and Tailwind CSS v4, the most straightforward method is to use the flowbite-react library and its dedicated CLI tool, as Tailwind v4 changes the configuration process significantly.
Prerequisites
Node.js and npm installed.
A new or existing React project (created, for example, with Vite).
Method 1: Using the Flowbite React CLI (Recommended)
The official CLI will handle all the configuration for you, including setting up Tailwind v4 and Flowbite.
For a new project: Run the following command in your terminal. This scaffolds a new React project with everything pre-configured:
bash
npx create-flowbite-react@latest
For an existing project: Navigate to your project directory and run the init command:
bash
npx flowbite-react@latest init
This command automatically installs the necessary dependencies and configures Tailwind CSS to include the Flowbite plugin.
Method 2: Manual Installation
If you prefer to configure everything manually (e.g., in a Vite project):

1. Set up a React Project
   Create a new Vite project if you don't have one:
   bash
   npm create vite@latest my-app
   cd my-app

# Select "React" and your preferred language (JavaScript/TypeScript)

npm install 2. Install and Configure Tailwind CSS v4
Install Tailwind CSS and its Vite plugin (or the PostCSS plugin if not using Vite):
bash
npm install -D tailwindcss @tailwindcss/vite postcss
Configure the Vite Plugin in vite.config.js (or vite.config.ts):
javascript
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
plugins: [react(), tailwindcss()],
});
Import Tailwind CSS in your main CSS file (e.g., src/index.css):
css
@import "tailwindcss";
/_ Remove old directives like @tailwind base, etc. _/

3. Install Flowbite
   Install the core Flowbite library:
   bash
   npm install flowbite
4. Configure Flowbite
   Unlike older versions, Tailwind v4 configuration moves to your main CSS file.
   Add Flowbite as a plugin to your main CSS file (src/index.css):
   css
   @import "tailwindcss";
   @import "flowbite/dist/flowbite.css"; /_ Import Flowbite styles _/
   /_ Add any other configurations as needed _/
   Include Flowbite JavaScript for interactive components (like dropdowns, modals). The easiest way in a standard React application is often to add a script tag to your index.html file, referencing the minified file within node_modules:
   html
   <!-- in public/index.html, just before the closing </body> tag -->
   <script src="./node_modules/flowbite/dist/flowbite.min.js"></script>
# frontend-react
