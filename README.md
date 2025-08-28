# Week 21: Task Management with AI

## RESTful API Development and Authentication Implementation

## Introduction

- You have learned the basics of Node.js and Express.js, now let's test your knowledge of how to integrate AI into your application by prompting OpenAI api endpoint.

### Task 1: Project Setup

1. Fork and Clone this project repository in your terminal 2. CD into the project base directory `cd Week21_Task_Management_AI`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your database URL and JWT secret
4. Complete the authentication middleware and routes (see tasks below)
5. Generate Prisma client and push schema to database:
   ```bash
   npm run db:generate
   npm run db:push
   ```
6. Start the server:
   ```bash
   npm run dev
   ```
7. The server will run on `http://localhost:3000`

## MVP Tasks

#### 1. Configure Environment Variables - `.env`

**Location:** `.env`

Create a `.env` file with:

```env
DATABASE_URL="your-supabase-database-connection-url"
JWT_SECRET="your-super-secret-jwt-key"
OPENAI_API_KEY="your-openai-api-key"
PORT=3000
```

### Task 2: Finish `aiService.js` file

**Location:** `services/aiService.js`

**Objective:** Complete the AI task generation functionality by implementing the `generateTaskWithAI` function.

**What you need to do:**

1. **Open the file** `services/aiService.js`
2. **Find the function** `generateTaskWithAI(prompt)`
3. **Follow the detailed instructions** in the TODO comments
4. **Implement the AI integration** step by step

## Task 3: Stretch Goals

### Add Password Reset Functionality

**Objective:** Implement password reset with email verification.

**Requirements:**

1. **Create password reset endpoint** that generates a reset token
2. **Send reset email** with reset link (simulate with console.log)
3. **Create reset password endpoint** that validates reset token
4. **Update user password** in database

### Add Email Verification

**Objective:** Implement email verification for new registrations.

**Requirements:**

1. **Add email verification field** to User model
2. **Generate verification token** during registration
3. **Send verification email** (simulate with console.log)
4. **Create verification endpoint** to confirm email
5. **Update user verification status**

### Add AI Task Generation

**Objective:** Implement AI-powered task generation using OpenAI.

**Requirements:**

1. **Install OpenAI dependency** and configure API key
2. **Complete the AI task generation function** in `services/aiService.js`
3. **Add AI generation endpoint** at POST /api/tasks/generate
4. **Save generated tasks** to database with subtasks
5. **Handle AI response parsing** and validation

**IMPORTANT:** You need to complete the `generateTaskWithAI` function in `services/aiService.js`.
The function has been prepared with detailed instructions and TODO comments to guide you through the implementation.

Good luck with your implementation! 🚀
