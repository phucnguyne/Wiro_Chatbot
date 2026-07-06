import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSession, addMessage } from "../memory/sessionStore.js";
import fs from "fs";

const router = express.Router();

const knowledge = fs.readFileSync("./knowledge/knowledge.txt", "utf8");

router.post("/chat", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const history = getSession(sessionId);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const historyText = history.map(m => `${m.role}: ${m.content}`).join("\n");
    const fullPrompt = `You are a helpful chatbot.\nUse this knowledge if relevant:\n${knowledge}\n\n${historyText}\nuser: ${message}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const reply = response.text();

    addMessage(sessionId, "user", message);
    addMessage(sessionId, "assistant", reply);

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "AI error" });
  }
});

export default router;