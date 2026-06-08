import { Request, Response } from "express";

let nextOrderId = 1;

interface OrderItem {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
  };
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  createdAt: string;
  status: "pending" | "processing" | "completed" | "cancelled" | string;
}

export const mockOrdersStore: Order[] = [
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

// GET /api/orders
export const getOrders = (req: Request, res: Response) => {
  res.json({ success: true, orders: mockOrdersStore });
};

// POST /api/orders
export const createOrder = (req: Request, res: Response) => {
  const { customerName, customerEmail, customerPhone, items, totalAmount, paymentMethod } = req.body;
  
  if (!customerName || !items || items.length === 0) {
    return res.status(400).json({ success: false, error: "Missing customer name or cart items." });
  }

  const newOrder: Order = {
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
};

// POST /api/orders/:id/status
export const updateOrderStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = mockOrdersStore.find(o => o.id === id);
  if (order) {
    order.status = status;
    return res.json({ success: true, order });
  }
  res.status(404).json({ success: false, error: "Order not found" });
};
