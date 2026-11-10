
 // Import Express to create API routes.
const express = require("express");

// Import the AI controller that communicates with Groq.
const { chatWithAI } = require("../controllers/aiController");

// Create an Express router.
const router = express.Router();

// POST /api/ai/chat
// The frontend sends the user's question here.
//
// Example request:
// {
//   "message": "What should I do if I am arrested?"
// }

// Send the question to the AI controller.
router.post("/chat", chatWithAI);

// Export the router so server.js can use it.
module.exports = router;
