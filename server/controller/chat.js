const { Chat } = require("../model/chatSch");

const saveChatMessage = async (senderId, receiverId, message) => {
  try {
    const chat = new Chat({
      sender: senderId,
      receiver: receiverId,
      message: message
    });
    await chat.save();
    return chat;
  } catch (error) {
    throw error;
  }
};

module.exports = { saveChatMessage };
