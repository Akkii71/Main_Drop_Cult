import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ apiKey }) : null;

// @desc    Chat with AI Stylist
// @route   POST /api/chat
// @access  Public
const chatWithAI = asyncHandler(async (req: Request, res: Response) => {
    const { message, history } = req.body;

    const systemPrompt = `
        You are 'VIBE_CHECK', a Gen-Z personal fashion stylist bot for the brand 'DROP_CULT'.
        Your tone is chill, street, and uses slight Gen-Z slang (but not cringe).
        You help users pick outfits based on their vibe (Cyber, Goth, Street, Y2K).
        You suggest products from our catalog (assume we have hoodies, cargo pants, oversized tees).
        Keep responses short and punchy.
    `;

    if (!openai) {
        res.json({ reply: "Yo, the Vibe Check AI is currently offline (Missing API Key). Tell the dev to check the .env file!" });
        return;
    }

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: systemPrompt },
            ...(history || []),
            { role: "user", content: message }
        ],
    });

    res.json({ reply: response.choices[0].message.content });
});

export { chatWithAI };
