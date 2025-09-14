import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Extract and parse task data from AI response
 * @param {string} responseContent - Raw response from OpenAI
 * @returns {Object} Parsed task data with validation
 */
export function extractTaskFromAIResponse(responseContent) {
  try {
    if (!responseContent) {
      throw new Error("No response content provided");
    }

    // Extract JSON from the response (in case there's extra text)
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid JSON response from AI");
    }

    // Parse the JSON response
    const taskData = JSON.parse(jsonMatch[0]);

    // Validate the required fields
    if (!taskData.title || !taskData.description) {
      throw new Error(
        "AI response missing required fields (title or description)"
      );
    }

    // Set default values if not provided
    const validatedTaskData = {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority || "medium",
      status: taskData.status || "pending",
      subtasks: taskData.subtasks || [],
    };

    // Validate subtasks if they exist
    if (validatedTaskData.subtasks.length > 0) {
      validatedTaskData.subtasks = validatedTaskData.subtasks.map(
        (subtask, index) => {
          if (!subtask.title) {
            throw new Error(`Subtask ${index + 1} missing title`);
          }
          return {
            title: subtask.title,
            description: subtask.description || "",
            completed: subtask.completed || false,
          };
        }
      );
    }

    return validatedTaskData;
  } catch (error) {
    throw new Error(
      `Failed to extract task from AI response: ${error.message}`
    );
  }
}

/**
 * Generate task using OpenAI API
 * @param {string} prompt - User's task description
 * @returns {Object} Parsed and validated task data
 */
export async function generateTaskWithAI(prompt) {
  // TODO: STUDENT TASK - Complete this function to generate tasks using AI
  //
  // Instructions:
  // 1. Check if the OpenAI API key is configured in environment variables
  //    - Use process.env.OPENAI_API_KEY
  //    - Throw an error if not configured
  //
  // 2. Create a system prompt that tells the AI what to do:
  //    - Explain that it's a task management assistant
  //    - Ask it to create a task with subtasks based on the user's description
  //    - Specify the JSON format it should respond with
  //    - Include guidelines for creating good tasks and subtasks
  //
  // 3. Create a user prompt that includes the user's task description
  //    - Use the 'prompt' parameter passed to this function
  //
  // 4. Call the OpenAI API using the openai client:
  //    - Use model: "gpt-3.5-turbo"
  //    - Include both system and user messages
  //    - Set temperature to 0.7 for balanced creativity
  //    - Set max_tokens to 1000
  //
  // 5. Extract the response content from the API call
  //    - Access completion.choices[0]?.message?.content
  //    - Check if response exists, throw error if not
  //
  // 6. Use the extractTaskFromAIResponse function to parse and validate the response
  //    - This function is already implemented for you
  //    - Pass the responseContent to it
  //
  // 7. Return the parsed task data
  //
  // 8. Handle errors appropriately
  //    - Wrap everything in a try-catch block
  //    - Throw meaningful error messages
  //
// 1. Check if the OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured. Please set process.env.OPENAI_API_KEY");
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 2. Create a system prompt that tells the AI what to do
    const systemPrompt = `
      You are a task management assistant. 
      Your job is to take a user’s description of a task and break it down into tasks and subtasks. 
      Always respond in strict JSON format.

      JSON format:
      {
        "task": "Main task description",
        "subtasks": [
          { "title": "Subtask 1", "type": "Mandatory" },
          { "title": "Subtask 2", "type": "Optional" },
          { "title": "Subtask 3", "type": "Preparation" }
        ]
      }

      Guidelines:
      - Each task should be clear and actionable.
      - Subtasks should break down the main task into smaller steps.
      - Always include at least 2–4 subtasks.
    `;

    // 3. Create a user prompt that includes the user's task description
    const userPrompt = `User Task: ${prompt}`;

    // 4. Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.7,       // Balanced creativity
      max_tokens: 1000,       // Limit output length
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    });

    // 5. Extract the response content
    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No response from OpenAI API");
    }

    // 6. Use the extractTaskFromAIResponse function to parse & validate
    const parsedTask = extractTaskFromAIResponse(responseContent);

    // 7. Return the parsed task data
    return parsedTask;

  
    // 8. Handle errors appropriately
    console.error("Error generating tasks with AI:", error.message);
    throw new Error("Failed to generate tasks: " + error.message);


  throw new Error(
    "TODO: Complete the generateTaskWithAI function - see instructions above"
  );
}
  
//Add Password Reset Functionality

//*Objective:* Implement password reset with email verification.

//*Requirements:*

// 1. Create password reset endpoint that generates a reset token
// 2. Send reset email with reset link (simulate with console.log)
// 3. Create reset password endpoint that validates reset token
// 4. Update user password in database

//Create password reset endpoint that generates a reset token
   const passwordResetToken = crypto.randomBytes(32).toString("hex");
   await User.updateOne({ email }, { passwordResetToken });

   // 2. Send reset email with reset link (simulate with console.log)
   console.log(`Password reset link: https://yourapp.com/reset-password?token=${passwordResetToken}`);

   // 3. Create reset password endpoint that validates reset token
   app.post("/api/auth/reset-password", async (req, res) => {
     const { token, newPassword } = req.body;
     const user = await User.findOne({ passwordResetToken: token });
     if (!user) {
       return res.status(400).send("Invalid or expired reset token");
     }
     user.password = newPassword;
     user.passwordResetToken = undefined;
     await user.save();
     res.send("Password has been reset");
   });

   // 4. Update user password in database
    user.password = newPassword;
    user.passwordResetToken = undefined;
    await user.save();
// Add Email Verification

// *Objective:* Implement email verification for new registrations.

// *Requirements:*

// 1. Add email verification field to User model
// 2. Generate verification token during registration
// 3. Send verification email (simulate with console.log)
// 4. Create verification endpoint to confirm email
// 5. Update user verification status

//Add email verification field to User model
    const verificationToken = crypto.randomBytes(32).toString("hex");
    await User.updateOne({ email }, { verificationToken });

   // 2. Generate verification token during registration
   await User.updateOne({ email }, { verificationToken });

   // 3. Send verification email (simulate with console.log)
   console.log(`Verification link: https://yourapp.com/verify-email?token=${verificationToken}`);

   // 4. Create verification endpoint to confirm email
   app.get("/api/auth/verify-email", async (req, res) => {
     const { token } = req.query;
     const user = await User.findOne({ verificationToken: token });
     if (!user) {
       return res.status(400).send("Invalid or expired verification token");
     }
     user.isVerified = true;
     user.verificationToken = undefined;
     await user.save();
     res.send("Email has been verified");
   });

   // 5. Update user verification status
    user.isVerified = true;
    await user.save();