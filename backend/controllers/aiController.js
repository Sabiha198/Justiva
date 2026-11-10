// Load variables from backend/.env.
// The path goes one level up because this file
// is inside the controllers folder.
require("dotenv").config({
  path: require("path").join(__dirname, "../.env"),
});

// Import the Groq SDK.
const Groq = require("groq-sdk");

// Import our Bangladesh legal knowledge base.
const { findRelevantLaws } = require("../data/bangladeshLaws");

// Create the Groq client using the API key
// stored inside backend/.env.
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


// =====================================================
// CHAT WITH AI
// =====================================================

const chatWithAI = async (req, res) => {
  try {

    // Get the user's question from the request body.
    //
    // Example:
    // {
    //   "message": "What is bail in Bangladesh?"
    // }
    const { message } = req.body;


    // -------------------------------------------------
    // Check whether the user actually sent a message.
    // -------------------------------------------------

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Please provide a message.",
      });
    }


    // -------------------------------------------------
    // Find relevant Bangladesh laws.
    // -------------------------------------------------

    // Our findRelevantLaws() function checks the
    // user's question against the keywords in
    // bangladeshLaws.js.
    //
    // Example:
    //
    // User asks:
    // "What is bail?"
    //
    // It may find:
    // "The Code of Criminal Procedure, 1898"
    const relevantLaws = findRelevantLaws(message);


    // -------------------------------------------------
    // Convert the relevant laws into text.
    // -------------------------------------------------

    // Groq needs the legal information as text
    // inside the prompt.
    const legalContext = relevantLaws
      .map(
        (law) =>
          `Title: ${law.title}\n` +
          `Act: ${law.actNumber}\n` +
          `Topic: ${law.topic}\n` +
          `Summary: ${law.summary}\n` +
          `Official source: ${law.sourceUrl}`
      )
      .join("\n\n");


    // -------------------------------------------------
    // If no relevant law was found.
    // -------------------------------------------------

    // We still allow Groq to answer, but we clearly
    // tell it that our legal knowledge base did not
    // find a matching source.
    const finalLegalContext =
      legalContext ||
      "No directly relevant Bangladesh law was found in the current Justiva legal knowledge base.";


    // -------------------------------------------------
    // Send the question + legal context to Groq.
    // -------------------------------------------------

    const completion = await groq.chat.completions.create({

      // Groq model.
      model: "openai/gpt-oss-20b",

      // Messages tell Groq how it should behave
      // and what information it should use.
      messages: [

        // =================================================
        // SYSTEM MESSAGE
        // =================================================

        {
          role: "system",

          content:
            "You are Justiva AI, a Bangladesh-focused legal information assistant.\n\n" +

            "Your job is to explain Bangladesh legal information " +
            "in simple and understandable language.\n\n" +

            "Use the Bangladesh legal information provided below " +
            "as your primary source.\n\n" +

            "IMPORTANT RULES:\n" +

            "1. Do not invent laws, sections, articles, cases, " +
            "punishments, procedures, or legal rights.\n\n" +

            "2. When the provided source contains the relevant " +
            "Act or section, mention it in your answer.\n\n" +

            "3. If the provided legal information is not enough " +
            "to answer the question, clearly say that the available " +
            "Justiva sources are insufficient instead of guessing.\n\n" +

            "4. Do not pretend to be a lawyer.\n\n" +

            "5. Explain complicated legal concepts in simple language.\n\n" +

            "6. Do not present general information as guaranteed " +
            "legal advice for a specific person's situation.\n\n" +

            "7. For serious or urgent legal situations, recommend " +
            "consulting a qualified advocate or appropriate authority.\n\n" +

            "8. Always keep the jurisdiction in mind: " +
            "Bangladesh.\n\n" +

            "CURRENT BANGLADESH LEGAL SOURCES:\n\n" +

            finalLegalContext,
        },


        // =================================================
        // USER MESSAGE
        // =================================================

        {
          role: "user",

          // This is the actual question asked by the user.
          content: message,
        },
      ],
    });


    // -------------------------------------------------
    // Get the answer generated by Groq.
    // -------------------------------------------------

    const answer =
      completion.choices[0]?.message?.content || "";


    // -------------------------------------------------
    // Send answer + sources back to React.
    // -------------------------------------------------

    res.status(200).json({

      // AI-generated explanation.
      answer: answer,

      // Send the legal sources that were actually
      // used to build the context.
      sources: relevantLaws.map((law) => ({
        title: law.title,
        section: law.actNumber,
        topic: law.topic,
        url: law.sourceUrl,
      })),
    });

  } catch (error) {

    // Print the complete error in the backend terminal.
    console.error("Groq AI error:", error);

    // Send a safe error message to the frontend.
    res.status(500).json({
      message: "Failed to get a response from AI.",
    });
  }
};


// Export the controller so aiRoutes.js can use it.
module.exports = {
  chatWithAI,
};