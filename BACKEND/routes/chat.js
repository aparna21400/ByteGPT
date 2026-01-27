import express from "express";
import Thread from "../models/Threads.js"
import getOpenAPIResponse from "../utils/openai.js";

const router = express.Router();

// TEST
router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "abd",
            title: "testing new thread"
        });

        const response = await thread.save();
        res.status(201).json(response);

    } catch (err) {
        console.log("error");
        res.status(500).json({ error: "Failed to save" });
    }
});

// GET ALL THREADS
router.get("/thread", async (req, res) => {
    try {
        const Threads = await Thread.find({}).sort({ updatedAt: -1 });
        res.json(Threads);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch threads" });
    }
});

//GET ROUTE FOR THREAD_ID

router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;

    try {
        const thread = await Thread.findOne({ threadId }); //seqhence of thread
        if (!thread) {
            return res.status(404).json({ error: "thread not found!" });
        }
        res.json(thread.messages);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch chat" });
    }
});

// DELETE ROUTE

router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;

    try {
        const thread = await Thread.findOneAndDelete({ threadId });
        if (!thread) {
            res.status(404).json({ error: "Thread could not be deleted" });
        }
        res.status(200).json({ success: "Thread deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete chat" });
    }

});

// CHAT THREAD
router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        res.status(400).json({ error: "Missing information" });
    }

    try {
        let thread = await Thread.findOne({ threadId });

        // creates a new thread
        if (!thread) {
            thread = new Thread(
                {
                    threadId,
                    title: message,
                    messages: [{ role: "user", content: message }]
                });
        } else {
            thread.messages.push({ role: "user", content: message });
        }

        const assistantReply = await getOpenAPIResponse(message);
        thread.messages.push({ role: "assistant", content: assistantReply });
        thread.updatedAt = new Date();

        await thread.save();
        res.json({ reply: assistantReply });


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Chat not Found!" });
    }
});

export default router;