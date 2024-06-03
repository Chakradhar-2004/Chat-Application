// messageController.js
const messageModel = require("../Models/messageModel");

module.exports.addMessages = async (req, res, next) => {
    const { from, to, message } = req.body;
    
    try {
        const data = await messageModel.create({
            messages: { text: message },
            users: [from, to], // Ensure users field is an array
            sender: from,
        });
        if (data) return res.json({ msg: "Message added successfully" });
        return res.json({ msg: "Failed to add message" });
    } catch (error) {
        next(error);
    }
};

module.exports.getAllMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        console.log("Received request with from:", from, "to:", to); 
        const messages = await messageModel.find({
            users: {
                $all: [from, to]
            }
        }).sort({ updatedAt: 1 });

        console.log("Fetched messages from DB:", messages);

        const projectMessages = messages.map((msg) => {
            console.log("Processing message:", msg); // Log each message being processed
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.messages.text,
            };
        });

        console.log("Processed messages:", projectMessages); // Log the final processed messages

        res.json(projectMessages);
    } catch (error) {
        console.error("Error fetching messages:", error); // Log any errors that occur
        next(error);
    }
};
