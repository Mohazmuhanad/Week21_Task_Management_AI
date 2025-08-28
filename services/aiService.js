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


  throw new Error(
    "TODO: Complete the generateTaskWithAI function - see instructions above"
  );
}
