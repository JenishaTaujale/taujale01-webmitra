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
