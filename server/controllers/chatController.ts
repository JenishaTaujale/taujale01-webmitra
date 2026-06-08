import { Request, Response } from "express";
import { getGeminiClient } from "../config/gemini";

export const chatSupport = async (req: Request, res: Response) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: "Message is required." });
  }

  const client = getGeminiClient();

  // WebMitra knowledge fallback if no AI API key is configured
  if (!client) {
    const lowerMsg = message.toLowerCase();
    let reply = "Namaste! I'm WebMitra's AI assistant. To connect your real store with Esewa or Khalti, you'll need to configure your API keys or generate merchant test profiles. How else can I assist your business today?";
    
    if (lowerMsg.includes("esewa") || lowerMsg.includes("khalti") || lowerMsg.includes("payment")) {
      reply = "To receive online payments in your WebMitra store, we provide easy integration. For **Esewa**, you get a sandbox merchant ID to verify payments safely. For **Khalti**, you configure the public key in your admin settings. In-store local customers can also choose **Cash on Delivery (COD)** or bank transfers.";
    } else if (lowerMsg.includes("pathao") || lowerMsg.includes("delivery") || lowerMsg.includes("shipping")) {
      reply = "WebMitra offers automatic integrations with local logistics leaders like **Pathao Courier** and **Upaya CityCargo**. Once an order is marked as 'Processing' on your admin dashboard, our API pings Pathao to schedule a pickup from your location. This completely eliminates manual booking!";
    } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("free")) {
      reply = "We offer a fully functional **Free Plan** which lets you list up to 5 products and accept Cash on Delivery. Our **Growth Plan** is 1,200 NPR/month (billed annually) for unlimited products, integrated local payment gateways, and shipping setup!";
    } else if (lowerMsg.includes("code") || lowerMsg.includes("admin")) {
      reply = "Our admin panel allows you to check incoming orders from customers, verify fulfillment statuses, view interactive graphs of your local revenue metrics, and change themes with a single tap!";
    }

    return res.json({ success: true, text: reply, source: "local-simulation" });
  }

  try {
    const systemInstruction = `
      You are the primary AI Onboarding and Support Assistant for WebMitra (https://webmitra.org).
      WebMitra is a revolutionary code-free e-commerce platform designed specially for small and medium businesses (SMEs) in Nepal.
      It helps traditional retailers (Pashmina weavers, spice grinding shops, local thangka artists, shoe markers, cafes) transition into digitization.
      
      Your goals:
      1. Provide extremely clear, helpful, and localized support.
      2. Keep answers concise, direct, helpful, and free from excessive jargon.
      3. Know technical details about local setups:
         - Payments: Esewa, Khalti, IME Pay, Cash on Delivery (COD), local bank QR code scans.
         - Logistics: Partnered with Pathao Courier, Upaya CityCargo, and Nepal Post.
         - Unicode: Support both standard English and Unicode Nepali inputs.
         - Pricing: Free tier (up to 5 products), Growth tier (1,200 NPR / month billed annually) with unlimited products, payment integration, and custom domain.
      4. Avoid technical pretense. Be warm (use 'Namaste' where natural) and focus on small business owners.
    `;

    const chatHistory = (history || []).map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // Start Chat API session
    const chat = client.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    let response;
    if (chatHistory.length > 0) {
      const contextPrompt = [
        ...chatHistory,
        { role: "user", parts: [{ text: message }] }
      ];
      const genResult = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contextPrompt,
        config: { systemInstruction }
      });
      response = genResult;
    } else {
      const genResult = await chat.sendMessage({ message });
      response = genResult;
    }

    res.json({ success: true, text: response.text, source: "gemini-ai" });
  } catch (error: any) {
    console.error("Gemini Support Chatbot Error:", error);
    res.status(500).json({ success: false, error: "Support chatbot failed to respond.", details: error.message });
  }
};
