import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory sessions store for demo orders
let nextOrderId = 1;
const mockOrdersStore: any[] = [
  {
    id: "ord-101",
    customerName: "Ramesh Adhikari",
    customerEmail: "ramesh@example.com",
    customerPhone: "9841234567",
    items: [
      {
        product: {
          id: "prod-1",
          name: "Premium Himalayan Pashmina Shawl",
          description: "100% cashmere, hand-loomed in Kathmandu. Ultra-soft and warm.",
          price: 4500,
          category: "Textiles",
          image: "https://picsum.photos/seed/pashmina/400/400"
        },
        quantity: 1
      }
    ],
    totalAmount: 4500,
    paymentMethod: "esewa",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4h ago
    status: "completed"
  },
  {
    id: "ord-102",
    customerName: "Sita Shrestha",
    customerEmail: "sita@example.com",
    customerPhone: "9809876543",
    items: [
      {
        product: {
          id: "prod-2",
          name: "Organic Himalayan Timur Peppercorn",
          description: "Wild harvested Sichuan peppercorns from the remote hills of Mustang. Wildly aromatic.",
          price: 650,
          category: "Spices",
          image: "https://picsum.photos/seed/pepper/400/400"
        },
        quantity: 2
      }
    ],
    totalAmount: 1300,
    paymentMethod: "cod",
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(), // 20h ago
    status: "processing"
  }
];

// Helper to initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey !== "") {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
    }
  }
  return aiClient;
}

// 1. API route: List or place mock orders
app.get("/api/orders", (req, res) => {
  res.json({ success: true, orders: mockOrdersStore });
});

app.post("/api/orders", (req, res) => {
  const { customerName, customerEmail, customerPhone, items, totalAmount, paymentMethod } = req.body;
  
  if (!customerName || !items || items.length === 0) {
    return res.status(400).json({ success: false, error: "Missing customer name or cart items." });
  }

  const newOrder = {
    id: `ord-${Date.now().toString().slice(-4)}-${nextOrderId++}`,
    customerName,
    customerEmail: customerEmail || "walkin@webmitra.com",
    customerPhone: customerPhone || "98XXXXXXXX",
    items,
    totalAmount,
    paymentMethod,
    createdAt: new Date().toISOString(),
    status: "pending"
  };

  mockOrdersStore.unshift(newOrder);
  res.json({ success: true, order: newOrder });
});

// Update order status
app.post("/api/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = mockOrdersStore.find(o => o.id === id);
  if (order) {
    order.status = status;
    return res.json({ success: true, order });
  }
  res.status(404).json({ success: false, error: "Order not found" });
});

// 2. API route: Generate customized online store config (AI-powered via Gemini)
app.post("/api/generate-store", async (req, res) => {
  const { businessName, category, description, brandTone } = req.body;

  if (!businessName || !category) {
    return res.status(400).json({ success: false, error: "Business name and category are required." });
  }

  const client = getGeminiClient();

  // If no API key or client is unavailable, serve highly relevant localized fallback mock data gracefully
  if (!client) {
    console.warn("GEMINI_API_KEY is not defined. Serving customized local mocks.");
    // Generate tailored local mock depending on category
    let mockTagline = "Authentic Nepal, Delivered Globally";
    let mockDesc = `Welcome to ${businessName}. We specialize in high quality ${category} sourced from local communities.`;
    let mockAccent = "#366272"; // Default steel blue
    let mockProducts = [];

    if (category.toLowerCase().includes("spice") || category.toLowerCase().includes("food")) {
      mockTagline = "Pure Flavors From The Himalayan Soil";
      mockDesc = `Bringing raw, organic, and hand-processed Himalayan tastes directly from small farms in Mustang and Pokhara to your table.`;
      mockAccent = "#55642b"; // Sage green
      mockProducts = [
        { id: "p-1", name: "Premium Mustang Timur Peppercorn", description: "Wild-harvested pepper with a strong, zesty, and electric tingling citrus burst.", price: 750, category: "Spices", image: "https://picsum.photos/seed/timur/400/400" },
        { id: "p-2", name: "Hand-Crushed Himalayan Pink Salt", description: "Rich in mineral content, sourced directly from the highest mountain range grids.", price: 350, category: "Seasoning", image: "https://picsum.photos/seed/pinksalt/400/400" },
        { id: "p-3", name: "Organic Ghandruk Green Tea", description: "Freshly hand-plucked tea leaves from the micro-farms of Ghandruk village.", price: 900, category: "Beverages", image: "https://picsum.photos/seed/tea/400/400" }
      ];
    } else if (category.toLowerCase().includes("textile") || category.toLowerCase().includes("cloth") || category.toLowerCase().includes("pashmina")) {
      mockTagline = "Weaving Warmth & Tradition Since Generations";
      mockDesc = `Luxury handmade cashmere shawl blankets, knit wear, and traditional handloom fabrics crafted with love by mountain artisans.`;
      mockAccent = "#6d5d29"; // Ochre
      mockProducts = [
        { id: "p-1", name: "Pure Cashmere Pashmina Shawl", description: "Sourced from high-altitude Chyangra goats. Whispering soft, double-layered warmth.", price: 4800, category: "Apparel", image: "https://picsum.photos/seed/shawl/400/400" },
        { id: "p-2", name: "Handwoven Dhaka Muffler", description: "Stitched with vibrant, geometric traditional Palpali and Purpeli design signatures.", price: 1200, category: "Apparel", image: "https://picsum.photos/seed/dhaka/400/400" },
        { id: "p-3", name: "Organic Hemp Shoulder Bag", description: "Extremely durable, biodegradable multi-pocket daypack crafted from wild western Nepal hemp.", price: 1850, category: "Accessories", image: "https://picsum.photos/seed/hemp/400/400" }
      ];
    } else {
      mockProducts = [
        { id: "p-1", name: "Artisanal Wooden Carving Plate", description: "Traditional Newari craft design handcarved by local woodworkers.", price: 2400, category: "Handicrafts", image: "https://picsum.photos/seed/wood/400/400" },
        { id: "p-2", name: "Handmade Nepali Lokta Paper Journal", description: "Textured, insect-resistant premium journal cards crafted from wild daphne barks.", price: 850, category: "Stationery", image: "https://picsum.photos/seed/lokta/400/400" },
        { id: "p-3", name: "Bronze Acoustic Singing Bowl", description: "Hand-hammered 7-metal bowl yielding meditative resonance and sound healing vibrations.", price: 3200, category: "Spiritual", image: "https://picsum.photos/seed/bowl/400/400" }
      ];
    }

    return res.json({
      success: true,
      storeConfig: {
        name: businessName,
        slug: businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        tagline: mockTagline,
        description: mockDesc,
        category: category,
        accentColor: mockAccent,
        products: mockProducts,
        paymentGateways: ["esewa", "khalti", "cod"],
        courierService: "pathao"
      },
      source: "local-simulation"
    });
  }

  try {
    const prompt = `
      You are the engine of WebMitra, Nepal's e-commerce enabler. 
      Generate a professional e-commerce store profile configuration for a local business with:
      Name: "${businessName}"
      Category/Niche: "${category}"
      Seller Description: "${description || 'None provided'}"
      Brand Tone: "${brandTone || 'friendly & professional'}"

      Respond with a JSON object containing tagline, matching description, a recommended accent hex color (choose from solid authentic shades matching the aesthetic of Nepal e.g., deep terracotta '#8c4f4f', forest moss green '#55642b', slate teal '#366272', rich ochre '#6d5d29', high-altitude indigo '#2e4359'), and 3 beautifully written mock products representing what they'd sell. Make the product prices in Nepalese Rupees (NPR), usually ranging from 300 to 6000. Give each product a unique ID and category.
    `;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tagline: { type: Type.STRING, description: "A catchy, short, and inspiring brand tagline for the homepage." },
            description: { type: Type.STRING, description: "A warm, high-converting 2-sentence brand description introducing the local craftsmanship or products." },
            accentColor: { type: Type.STRING, description: "Solid hex color string that fits the category (must be a valid hex starting with #)." },
            products: {
              type: Type.ARRAY,
              description: "Array of exactly 3 relevant products for this e-commerce category.",
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING, description: "Beautiful name of the item. Focus on Nepal-specific sourcing or heritage names." },
                  description: { type: Type.STRING, description: "Appealing features of the product, including dimensions or materials (cashmere, wood, copper, timur)." },
                  price: { type: Type.NUMBER, description: "Price in NPR (Nepali Rupees) as a solid integer." },
                  category: { type: Type.STRING, description: "Sub-category inside the store." }
                },
                required: ["id", "name", "description", "price", "category"]
              }
            }
          },
          required: ["tagline", "description", "accentColor", "products"]
        }
      }
    });

    const configText = response.text ? response.text.trim() : "";
    const parsedConfig = JSON.parse(configText);

    // Add visual placeholders to products
    const visualSeeds = ["craft", "nepal", "nature", "herbs", "wool", "metal", "organic", "stone"];
    parsedConfig.products = parsedConfig.products.map((p: any, index: number) => {
      const seed = visualSeeds[index % visualSeeds.length];
      return {
        ...p,
        image: `https://picsum.photos/seed/${seed}-${p.id}/400/400`
      };
    });

    const storeConfig = {
      name: businessName,
      slug: businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      ...parsedConfig,
      paymentGateways: ["esewa", "khalti", "cod"],
      courierService: "pathao"
    };

    res.json({ success: true, storeConfig, source: "gemini-ai" });
  } catch (error: any) {
    console.error("Gemini Store Builder Error:", error);
    res.status(500).json({ success: false, error: "Failed to generate store config using Gemini.", details: error.message });
  }
});

// 3. API route: AI Customer Care Chatbot (grounded in WebMitra context)
app.post("/api/chat-support", async (req, res) => {
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

    // Send history context if there are entries, or just normal generation
    let response;
    if (chatHistory.length > 0) {
      // Re-populate the chat object parts or use sendMessage directly
      // Let's just pass the message stream or context simply as a clean query with context history stitched:
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
});


// Vite or Production Static serving configurations wrapper to support CJS esbuild compilation (eliminates top-level await error)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind to port 3000
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WebMitra backend server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start WebMitra server:", err);
});
