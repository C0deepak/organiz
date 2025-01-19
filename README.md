# Task Management App

A modern task management application that allows users to create, update, delete, and organize tasks with various features and task status management.

## Features

- **Task Creation**: Users can create tasks with a title, description, due date, and status.
- **Task Status Toggle**: Tasks can be toggled between "Incomplete" and "Complete" states.
- **Task Editing**: Users can edit the task's details.
- **Task Deletion**: Users can delete tasks.
- **Task Priority**: Tasks are organized based on their priority, and users can modify the priority through the interface.
- **Task List Display**: Tasks are displayed in a clean, user-friendly list format with detailed information.
- **Task Detail View**: Each Tasks has a detail page for seeing everything about task, the user who assigned the task and threads related to it.

## Screenshots


### Light Mode

![Home Page](./public/img/l1.png)
![Edit Form](./public/img/l2.png)
![Task Detail Page](./public/img/l3.png)

### Dark Mode

![Home Page](./public/img/d1.png)
![Task Management Page](./public/img/d2.png)
![Task Detail Page](./public/img/d3.png)

## Technologies Used

- **Next.js**: Frontend framework for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling the app.
- **Shadcn UI**: For using reusable components.
- **TypeScript**: For type safety and better developer experience.
- **Lucide Icons**: For incorporating vector icons into the interface.
- **@dnd-kit/core**: A drag-and-drop library (Note: this feature is in testing phase you can see the code inside components/TaskViewer.tsx).

## Installation

### Prerequisites

- **Node.js**: Install the latest version of Node.js from [here](https://nodejs.org/).

### Step 1: Clone the Repository

Clone this repository to your local machine using:

````bash
git clone https://github.com/C0deepak/organiz.git
````

### Step 2: Install Necessary packages

Install the packages using:

````bash
npm i
````

### Step 3: Run the application

Run the development server, using:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

