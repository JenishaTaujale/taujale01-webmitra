import { Router } from "express";
import { getOrders, createOrder, updateOrderStatus } from "../controllers/orderController";
import { generateStore, conversationalArchitect } from "../controllers/storeController";
import { chatSupport } from "../controllers/chatController";

const router = Router();

// Order Endpoints
router.get("/orders", getOrders);
router.post("/orders", createOrder);
router.post("/orders/:id/status", updateOrderStatus);

// Store Builder Engine
router.post("/generate-store", generateStore);
router.post("/conversational-architect", conversationalArchitect);

// Chatbot Assistant Engine
router.post("/chat-support", chatSupport);

export default router;
