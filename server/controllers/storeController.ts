import { Request, Response } from "express";
import { getGeminiClient } from "../config/gemini";
import { Type } from "@google/genai";

export const generateStore = async (req: Request, res: Response) => {
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
    let mockProducts: any[] = [];

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
};

export const conversationalArchitect = async (req: Request, res: Response) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: "Message is required." });
  }

  const client = getGeminiClient();

  // If no Gemini client is available, simulate a rich local conversational onboarding
  if (!client) {
    console.warn("GEMINI_API_KEY is not defined. Using local conversational builder simulation.");
    const lowerMessage = message.toLowerCase();
    
    // Heuristic checking for store name and products
    const words = message.split(/\s+/);
    if (words.length > 3) {
      // Generate a nice simulated store
      const nameGuess = words.slice(0, 3).join(" ").replace(/[^a-zA-Z\s]/g, "");
      const finalName = nameGuess.length > 5 ? nameGuess : "Himalayan Treasures";
      
      const config = {
        name: finalName,
        slug: finalName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        tagline: "Preserving Mountain Traditions",
        description: `Experience authenticity with ${finalName}. We bring artisanal quality goods sourced from local Nepalese cooperatives directly to you.`,
        accentColor: "#366272",
        products: [
          { id: "p-1", name: "Premium Wild Timur Peppercorn", description: "Wild-harvested pepper with a zesty, citrus-tinged authentic Nepalese timber aroma.", price: 650, category: "Spices", image: "https://picsum.photos/seed/timur/400/400" },
          { id: "p-2", name: "Original Meditational Singing Bowl", description: "Hand-hammered 7-metal alloy acoustic singing bowl for yoga and sound healing.", price: 2900, category: "Spiritual", image: "https://picsum.photos/seed/bowl/400/400" },
          { id: "p-3", name: "Hand-Spun Pure Wool Pashmina", description: "Incredibly cozy lightweight pashmina muffler, woven by master weavers in Lalitpur.", price: 3500, category: "Apparel", image: "https://picsum.photos/seed/shawl/400/400" }
        ],
        paymentGateways: ["esewa", "khalti", "cod"],
        courierService: "pathao"
      };

      return res.json({
        success: true,
        reply: `Namaste! That sounds like an incredible vision. I have automatically designed and launched **${finalName}** for you with professional product listings, online payment gateways, and Pathao shipping. Let's look at your brand storefront!`,
        hasConfig: true,
        storeConfig: config,
        source: "local-simulation"
      });
    } else {
      return res.json({
        success: true,
        reply: `Namaste! That's a great start. Could you tell me a bit more about your business? For example, what is the exact name of your shop and what specific products will you be listing for sale?`,
        hasConfig: false,
        storeConfig: null,
        source: "local-simulation"
      });
    }
  }

  try {
    const prompt = `
      You are WebMitra's AI Website Architect. Your objective is to help Nepalese small business owners launch a finished e-commerce website.
      You are conducting an onboarding chat. 
      The initial system onboarding greeting was: "Welcome to the Website Architect! I'm here to build your professional e-commerce site. To start, what is your business name and what products will you be selling?"
      
      User's latest reply: "${message}"
      Prior Conversation History: ${JSON.stringify(history || [])}

      Your task:
      1. Assess whether the user has provided a reasonable business name and some description of their products.
      2. If they have sufficient details (like a business name and products they sell), write a enthusiastic, warm, congratulatory reply, and generate a fully custom, high-quality, professional 'storeConfig' object.
         The storeConfig MUST contain:
         - name: The user's store/business name.
         - tagline: A brief, poetic tagline (e.g., "Handwoven warmth from Everest valleys").
         - description: A beautiful 2-sentence brand statement describing their quality or local growers.
         - accentColor: A solid custom hex color matching the category (choose from solid authentic shades matching the aesthetic of Nepal e.g., deep terracotta '#8c4f4f', forest moss green '#55642b', slate teal '#366272', rich ochre '#6d5d29', high-altitude indigo '#2e4359').
         - products: Exactly 3 high-quality products matching this business (NPR pricing between 300 and 10000, unique IDs, name, description, category).
         Sets "hasConfig" to true.

      3. If they have NOT given enough info (e.g. they just said "hi", or only gave a name but didn't say what they sell), write a polite, helpful follow-up question asking for the missing details (be concise and focused).
         Sets "hasConfig" to false, and "storeConfig" to null.

      You MUST respond with a strict, properly formatted JSON object matching this schema:
      {
        "reply": "Your friendly text message to the user, announcing congratulations of store launch (if hasConfig is true) or asking clarifying questions (if hasConfig is false). Use 'Namaste' cleanly and friendly.",
        "hasConfig": true or false,
        "storeConfig": {
           "name": "Store Name",
           "tagline": "Brand tagline",
           "description": "Short bio",
           "accentColor": "#hexColor",
           "products": [
             { "id": "prod-1", "name": "Product 1 Name", "description": "Product 1 details", "price": 1200, "category": "Category" },
             { "id": "prod-2", "name": "Product 2 Name", "description": "Product 2 details", "price": 450, "category": "Category" },
             { "id": "prod-3", "name": "Product 3 Name", "description": "Product 3 details", "price": 3200, "category": "Category" }
           ]
        } (or null if hasConfig is false)
      }
    `;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING },
            hasConfig: { type: Type.BOOLEAN },
            storeConfig: {
              type: Type.OBJECT,
              nullable: true,
              properties: {
                name: { type: Type.STRING },
                tagline: { type: Type.STRING },
                description: { type: Type.STRING },
                accentColor: { type: Type.STRING },
                products: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      price: { type: Type.NUMBER },
                      category: { type: Type.STRING }
                    },
                    required: ["id", "name", "description", "price", "category"]
                  }
                }
              },
              required: ["name", "tagline", "description", "accentColor", "products"]
            }
          },
          required: ["reply", "hasConfig"]
        }
      }
    });

    const bodyText = response.text ? response.text.trim() : "";
    const responseJson = JSON.parse(bodyText);

    if (responseJson.hasConfig && responseJson.storeConfig) {
      // Add visual placeholders to products
      const visualSeeds = ["craft", "nepal", "nature", "herbs", "wool", "metal", "organic", "stone"];
      responseJson.storeConfig.products = responseJson.storeConfig.products.map((p: any, index: number) => {
        const seed = visualSeeds[index % visualSeeds.length];
        return {
          ...p,
          image: `https://picsum.photos/seed/${seed}-${p.id}/400/400`
        };
      });

      responseJson.storeConfig.slug = responseJson.storeConfig.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      responseJson.storeConfig.paymentGateways = ["esewa", "khalti", "cod"];
      responseJson.storeConfig.courierService = "pathao";
    }

    res.json({
      success: true,
      reply: responseJson.reply,
      hasConfig: responseJson.hasConfig,
      storeConfig: responseJson.storeConfig,
      source: "gemini-ai"
    });

  } catch (error: any) {
    console.error("Gemini Conversational Architect Failed:", error);
    res.status(500).json({ success: false, error: "Failed to process Conversational Architect query using Gemini.", details: error.message });
  }
};

