const express = require("express");
const chatRouter = express.Router();
const { saveChatMessage } = require("../controller/chat");

// Route to handle saving chat messages
chatRouter.post("/", async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  try {
    const savedMessage = await saveChatMessage(senderId, receiverId, message);
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { chatRouter };
