import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, Trash2, CheckCircle, ArrowRight, Server, Play, 
  MapPin, Check, Plus, Minus, CreditCard, ChevronRight, BarChart3, TrendingUp, Package, Users
} from "lucide-react";
import { StoreConfig, Product, Order } from "../types";

interface StorePreviewProps {
  config: StoreConfig;
}

export default function StorePreview({ config }: StorePreviewProps) {
  const [activeView, setActiveView] = useState<"front" | "admin">("front");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Checkout & order states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"details" | "payment" | "success">("details");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"esewa" | "khalti" | "cod">("esewa");
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Admin states
  const [adminOrders, setAdminOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  // Fetch admin orders from server
  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      if (data.success) {
        setAdminOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (activeView === "admin") {
      fetchOrders();
    }
  }, [activeView]);

  const handleAddToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const handleUpdateCartQuantity = (productId: string, diff: number) => {
    const existing = cart.find(item => item.product.id === productId);
    if (!existing) return;
    const newQty = existing.quantity + diff;
    if (newQty <= 0) {
      setCart(cart.filter(item => item.product.id !== productId));
    } else {
      setCart(cart.map(item => item.product.id === productId ? { ...item, quantity: newQty } : item));
    }
  };

  const handleClearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const submitOrder = async () => {
    if (!customerName || !customerPhone) return;

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          items: cart,
          totalAmount: getCartTotal(),
          paymentMethod
        })
      });
      const data = await response.json();
      if (data.success) {
        setPlacedOrder(data.order);
        setCheckoutStep("success");
        setCart([]); // Reset Cart
      }
    } catch (err) {
      console.error(err);
      alert("Checkout error occurred. Placed in sandbox successfully.");
    }
  };

  const handleFulfillOrder = async (orderId: string, nextStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await response.json();
      if (data.success) {
        setAdminOrders(adminOrders.map(o => o.id === orderId ? { ...o, status: nextStatus as any } : o));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Pre-calculated stats for the admin metrics dashboard
  const revenueStat = adminOrders.reduce((sum, order) => sum + (order.status === "completed" ? order.totalAmount : 0), 0);
  const totalVolume = adminOrders.length;
  const pendingOrders = adminOrders.filter(o => o.status !== "completed").length;

  return (
    <div className="w-full bg-brand-paper border border-brand-ink/10 rounded-[36px] overflow-hidden shadow-xl ambient-shadow flex flex-col font-sans">
      {/* Visual Workspace Top Frame Bar */}
      <div className="bg-brand-ink text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="text-[11px] font-mono text-white/50 tracking-wider font-semibold uppercase sm:ml-4">
            Sandbox Store Frame: {config.name || "My Himalayan Spices"} Studio Workspace
          </span>
        </div>
        
        {/* Toggle between Storefront Page and Fulfillment Dashboard */}
        <div className="flex bg-white/10 p-1 rounded-full items-center">
          <button
            onClick={() => setActiveView("front")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${activeView === "front" ? "bg-white text-brand-ink shadow-sm" : "text-white/80 hover:text-white"}`}
          >
            Live Storefront Client View
          </button>
          <button
            onClick={() => setActiveView("admin")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${activeView === "admin" ? "bg-white text-brand-ink shadow-sm" : "text-white/80 hover:text-white"}`}
          >
            SME Fulfillment Admin Desk
          </button>
        </div>
      </div>

      <div className="p-6 md:p-10 min-h-[500px] flex-1">
        {activeView === "front" ? (
          <div>
            {/* Dynamic Store Header Title / Banner */}
            <div className="text-center py-12 px-6 rounded-[28px] bg-white border border-brand-ink/5 mb-8 relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundColor: config.accentColor }}
              ></div>
              <span 
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full font-serif block w-fit mx-auto mb-4 border border-brand-ink/10"
                style={{ color: config.accentColor }}
              >
                {config.category}
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-ink tracking-tight mb-4 select-none">
                {config.name}
              </h2>
              <p className="font-sans text-sm text-brand-ink/60 max-w-xl mx-auto italic leading-relaxed">
                "{config.tagline || 'Bringing pure tradition right to your door.'}"
              </p>
              <p className="font-sans text-xs text-brand-ink/50 max-w-xl mx-auto mt-3">
                {config.description}
              </p>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-2 border px-5 py-2.5 rounded-full text-xs font-semibold text-white/90 shadow-md cursor-pointer transition-all hover:opacity-90"
                  style={{ backgroundColor: config.accentColor }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})</span>
                </button>
              </div>
            </div>

            {/* Catalog Grid */}
            <div>
              <h3 className="font-serif text-xl font-bold text-brand-ink mb-6">Our Sourced Catalog</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {config.products && config.products.map((prod) => (
                  <div key={prod.id} className="bg-white border border-brand-ink/5 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between">
                    <div>
                      <div className="aspect-square bg-brand-paper relative overflow-hidden">
                        <img 
                          src={prod.image} 
                          alt={prod.name}
                          className="w-full h-full object-cover select-none"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase border border-brand-ink/10 text-brand-ink/60">
                          Authentic Nepal
                        </div>
                      </div>
                      <div className="p-5">
                        <span className="text-[10px] uppercase font-bold text-brand-ink/40 tracking-wider mb-1 block">
                          {prod.category}
                        </span>
                        <h4 className="font-serif font-bold text-base text-brand-ink mb-1.5 leading-tight">
                          {prod.name}
                        </h4>
                        <p className="text-brand-ink/60 text-xs line-clamp-2 leading-relaxed">
                          {prod.description}
                        </p>
                      </div>
                    </div>
                    <div className="p-5 pt-0 border-t border-brand-ink/5 mt-4 flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-brand-ink">
                        NPR {prod.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleAddToCart(prod)}
                        className="text-xs px-3.5 py-2 rounded-full font-semibold font-sans text-white hover:opacity-90 transition-all cursor-pointer flex items-center gap-1.5"
                        style={{ backgroundColor: config.accentColor }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Direct Shipping & Security banner */}
            <div className="mt-12 bg-white/50 border border-brand-ink/10 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-brand-primary/10 p-2 rounded-xl text-brand-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-ink">Automated Pathao Deliveries</h4>
                  <p className="text-[11px] text-brand-ink/40">Ready to fetch and ship orders directly from Kathmandu, Lalitpur & Pokhara.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="bg-brand-secondary/10 text-brand-secondary text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  ✓ Esewa Instant
                </span>
                <span className="bg-brand-secondary/10 text-brand-secondary text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  ✓ Khalti Gateway
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Merchant Administration Dashboard View */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* Stats Card */}
              <div className="bg-white p-5 border border-brand-ink/5 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-brand-ink/40 uppercase tracking-wider font-bold">Total Sales Revenue</span>
                  <TrendingUp className="w-4 h-4 text-brand-secondary" />
                </div>
                <h4 className="font-mono text-2xl font-bold text-brand-ink">
                  NPR {revenueStat.toLocaleString()}
                </h4>
                <p className="text-[10px] text-brand-secondary font-medium mt-1">✓ Logged completed orders</p>
              </div>

              {/* Volume Card */}
              <div className="bg-white p-5 border border-brand-ink/5 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-brand-ink/40 uppercase tracking-wider font-bold">Store Total Orders</span>
                  <Package className="w-4 h-4 text-brand-primary" />
                </div>
                <h4 className="font-mono text-2xl font-bold text-brand-ink">{totalVolume}</h4>
                <p className="text-[10px] text-brand-ink/40 mt-1">Including pending sandbox checkouts</p>
              </div>

              {/* Pending deliveries */}
              <div className="bg-white p-5 border border-brand-ink/5 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-brand-ink/40 uppercase tracking-wider font-bold">Needs Pathao Shipping</span>
                  <MapPin className="w-4 h-4 text-brand-ochre" />
                </div>
                <h4 className="font-mono text-2xl font-bold text-brand-ink">{pendingOrders}</h4>
                <p className="text-[10px] text-brand-ochre font-medium mt-1">Pending pick-ups right now</p>
              </div>

              {/* Status Gateway */}
              <div className="bg-white p-5 border border-brand-ink/5 rounded-2xl flex flex-col justify-between">
                <span className="text-xs text-brand-ink/40 uppercase tracking-wider font-semibold">Nepal Payment API</span>
                <div className="flex items-center gap-1.5 text-brand-secondary font-semibold text-xs mt-3">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-secondary" />
                  <span>Esewa + Khalti Sandbox Live</span>
                </div>
                <div className="text-[9px] text-brand-ink/40 mt-1">Simulated callbacks operate perfectly.</div>
              </div>
            </div>

            {/* Inbound Orders List */}
            <div className="bg-white border border-brand-ink/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-ink">Active Inbound Orders</h3>
                  <p className="text-xs text-brand-ink/40">Verify receipts and dispatch couriers</p>
                </div>
                <button
                  onClick={fetchOrders}
                  className="text-xs font-semibold text-brand-primary hover:underline cursor-pointer"
                >
                  Refresh Feed
                </button>
              </div>

              {isLoadingOrders ? (
                <div className="py-12 flex justify-center items-center gap-2 text-brand-ink/40">
                  <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>Pulling server orders store...</span>
                </div>
              ) : adminOrders.length === 0 ? (
                <div className="py-12 text-center text-brand-ink/40">
                  <p className="text-xs font-medium">No sales recorded yet. Place a test order in client storefront view!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-brand-ink">
                    <thead>
                      <tr className="border-b border-brand-ink/5 text-brand-ink/40 uppercase tracking-wider font-bold text-[10px]">
                        <th className="py-3 px-2">Order ID</th>
                        <th className="py-3 px-2">Client Details</th>
                        <th className="py-3 px-2">Purchased Items</th>
                        <th className="py-3 px-2">Method</th>
                        <th className="py-3 px-2">Total Amount</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-ink/5">
                      {adminOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-brand-paper/50 transition-colors">
                          <td className="py-4 px-2 font-mono font-bold text-brand-primary">{ord.id}</td>
                          <td className="py-4 px-2">
                            <p className="font-semibold">{ord.customerName}</p>
                            <p className="text-[10px] text-brand-ink/40">{ord.customerPhone} / {ord.customerEmail}</p>
                          </td>
                          <td className="py-4 px-2 font-sans max-w-xs">
                            {ord.items.map((it: any, index: number) => (
                              <p key={index} className="line-clamp-1">
                                {it.product.name} <span className="font-semibold text-brand-primary">x{it.quantity}</span>
                              </p>
                            ))}
                          </td>
                          <td className="py-4 px-2 uppercase font-semibold text-[10px] text-brand-ink/60">
                            {ord.paymentMethod}
                          </td>
                          <td className="py-4 px-2 font-mono font-bold">NPR {ord.totalAmount.toLocaleString()}</td>
                          <td className="py-4 px-2">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              ord.status === "completed" 
                                ? "bg-brand-secondary/10 text-brand-secondary" 
                                : ord.status === "processing" 
                                  ? "bg-brand-ochre/10 text-brand-ochre" 
                                  : "bg-blue-100 text-blue-700"
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-4 px-2 text-right space-x-1 shrink-0">
                            {ord.status === "pending" && (
                              <button
                                onClick={() => handleFulfillOrder(ord.id, "processing")}
                                className="bg-brand-ochre text-white px-2 py-1 rounded text-[10px] font-bold hover:bg-brand-ochre/90 cursor-pointer"
                              >
                                Dispatch Post
                              </button>
                            )}
                            {ord.status === "processing" && (
                              <button
                                onClick={() => handleFulfillOrder(ord.id, "completed")}
                                className="bg-brand-secondary text-white px-2 py-1 rounded text-[10px] font-bold hover:bg-brand-secondary/90 cursor-pointer"
                              >
                                Mark Fulfilled
                              </button>
                            )}
                            {ord.status === "completed" && (
                              <span className="text-[10px] text-brand-secondary font-bold">✓ Complete</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cart Modal Slide-Over */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            <div className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
              >
                {/* Header */}
                <div className="p-6 border-b border-brand-ink/5 flex justify-between items-center bg-brand-paper">
                  <h3 className="font-serif text-lg font-bold text-brand-ink">Merchant Shopping Cart</h3>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-brand-ink/45 hover:text-brand-ink transition-colors cursor-pointer text-xs uppercase tracking-wider font-bold"
                  >
                    Close
                  </button>
                </div>

                {/* Cart list */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="py-20 text-center text-brand-ink/40">
                      <ShoppingBag className="w-12 h-12 mx-auto mb-4 stroke-1" />
                      <p className="text-xs">Your shopping cart is empty. Tap 'Add' on the catalog items below!</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4 p-4 border border-brand-ink/5 rounded-2xl bg-brand-paper/30">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1">
                          <h4 className="font-serif text-xs font-bold leading-tight line-clamp-1">{item.product.name}</h4>
                          <span className="text-[10px] font-mono text-brand-ink/40 block mt-1">NPR {item.product.price.toLocaleString()}</span>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => handleUpdateCartQuantity(item.product.id, -1)}
                              className="p-1 rounded bg-brand-paper hover:bg-brand-ink/5 border cursor-pointer"
                            >
                              <Minus className="w-3 h-3 text-brand-ink/60" />
                            </button>
                            <span className="text-xs font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateCartQuantity(item.product.id, 1)}
                              className="p-1 rounded bg-brand-paper hover:bg-brand-ink/5 border cursor-pointer"
                            >
                              <Plus className="w-3 h-3 text-brand-ink/60" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer totals */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-brand-ink/5 bg-brand-paper">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs text-brand-ink/50 font-bold uppercase tracking-wider">Subtotal</span>
                      <span className="font-mono text-lg font-bold text-brand-primary">NPR {getCartTotal().toLocaleString()}</span>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          setIsCheckoutOpen(true);
                          setCheckoutStep("details");
                        }}
                        className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-bold text-xs hover:opacity-90 transition-colors shadow-md cursor-pointer text-center block"
                      >
                        Proceed to Checkout
                      </button>
                      <button
                        onClick={handleClearCart}
                        className="w-full text-center py-2 text-[10px] font-bold text-brand-ink/35 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        Empty Entire Cart
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Flow Dialog Popups */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden font-sans">
            <div className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm" onClick={() => setIsCheckoutOpen(false)}></div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-ink/10 flex flex-col"
            >
              {checkoutStep === "details" && (
                <div className="p-6 space-y-4">
                  <div className="border-b pb-3">
                    <h3 className="font-serif text-lg font-bold">Delivery Registration</h3>
                    <p className="text-[11px] text-brand-ink/40">Enter checkout ship location & path details</p>
                  </div>

                  <div className="space-y-3 text-left">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-brand-ink/40 mb-1">Customer Full Name</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g., Niranjan Thapa"
                        className="w-full border border-brand-ink/10 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-brand-ink/40 mb-1">Mobile Contact No</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g., 984XXXXXXXX"
                        className="w-full border border-brand-ink/10 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-brand-ink/40 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="e.g., niranjan@gmail.com"
                        className="w-full border border-brand-ink/10 rounded-xl px-3.5 py-2.5 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <button
                      onClick={() => setIsCheckoutOpen(false)}
                      className="text-xs font-bold text-brand-ink/50"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={!customerName || !customerPhone}
                      onClick={() => setCheckoutStep("payment")}
                      className={`px-6 py-2.5 rounded-full text-xs font-bold text-white shadow transition-all ${
                        customerName && customerPhone ? "bg-brand-primary hover:bg-brand-primary/90" : "bg-brand-ink/20 cursor-not-allowed"
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === "payment" && (
                <div className="p-6 space-y-4">
                  <div className="border-b pb-3">
                    <h3 className="font-serif text-lg font-bold">Local Payment Gateways</h3>
                    <p className="text-[11px] text-brand-ink/40">Select simulated Nepali transaction portal</p>
                  </div>

                  <div className="space-y-2.5">
                    {/* Esewa */}
                    <button
                      onClick={() => setPaymentMethod("esewa")}
                      className={`w-full text-left p-4 rounded-2xl border flex items-center justify-between transition-all ${
                        paymentMethod === "esewa" ? "border-green-600 bg-green-50/50" : "border-brand-ink/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold text-xs flex items-center justify-center">
                          eS
                        </div>
                        <div>
                          <p className="text-xs font-bold text-green-900">Esewa Sandboxed Wallet</p>
                          <p className="text-[10px] text-green-700">Receive instant online notification</p>
                        </div>
                      </div>
                      {paymentMethod === "esewa" && <Check className="w-4 h-4 text-green-600" />}
                    </button>

                    {/* Khalti */}
                    <button
                      onClick={() => setPaymentMethod("khalti")}
                      className={`w-full text-left p-4 rounded-2xl border flex items-center justify-between transition-all ${
                        paymentMethod === "khalti" ? "border-purple-600 bg-purple-50/50" : "border-brand-ink/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                          Kh
                        </div>
                        <div>
                          <p className="text-xs font-bold text-purple-900">Khalti Portal</p>
                          <p className="text-[10px] text-purple-700">Simulate secure mobile checkout</p>
                        </div>
                      </div>
                      {paymentMethod === "khalti" && <Check className="w-4 h-4 text-purple-600" />}
                    </button>

                    {/* Cash on Delivery */}
                    <button
                      onClick={() => setPaymentMethod("cod")}
                      className={`w-full text-left p-4 rounded-2xl border flex items-center justify-between transition-all ${
                        paymentMethod === "cod" ? "border-brand-ochre bg-amber-50/50" : "border-brand-ink/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-ochre text-white font-bold text-xs flex items-center justify-center">
                          COD
                        </div>
                        <div>
                          <p className="text-xs font-bold text-amber-900">Cash on Delivery (COD)</p>
                          <p className="text-[10px] text-amber-700">Fulfill during Pathao transit dropoff</p>
                        </div>
                      </div>
                      {paymentMethod === "cod" && <Check className="w-4 h-4 text-brand-ochre" />}
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <button
                      onClick={() => setCheckoutStep("details")}
                      className="text-xs font-bold text-brand-ink/50"
                    >
                      Back
                    </button>
                    <button
                      onClick={submitOrder}
                      className="bg-brand-primary text-white px-6 py-2.5 rounded-full text-xs font-bold shadow hover:bg-brand-primary/95"
                    >
                      Authorize Transaction (NPR {getCartTotal().toLocaleString()})
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === "success" && placedOrder && (
                <div className="p-6 text-center space-y-4">
                  <div className="w-14 h-14 bg-brand-secondary/10 text-brand-secondary rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-ink">Store Order Synced!</h3>
                    <p className="text-xs text-brand-ink/60 mt-1">Transaction verified on WebMitra Sandbox database.</p>
                  </div>

                  {/* Summary receipt details */}
                  <div className="bg-brand-paper p-4 rounded-2xl text-[11px] font-sans text-left space-y-2 border">
                    <p className="flex justify-between">
                      <span className="text-brand-ink/40 font-bold">Order ID:</span>
                      <span className="font-mono font-bold text-brand-primary">{placedOrder.id}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-brand-ink/40 font-bold">Gateway method:</span>
                      <span className="uppercase font-semibold">{placedOrder.paymentMethod} Callback Verified</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-brand-ink/40 font-bold">Shipping partner:</span>
                      <span className="font-semibold text-brand-primary">Pathao Logistics Pending</span>
                    </p>
                    <div className="border-t pt-2 mt-2">
                      <p className="flex justify-between font-bold text-brand-ink">
                        <span>Paid Total NPR:</span>
                        <span className="font-mono text-xs">NPR {placedOrder.totalAmount.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setCheckoutStep("details");
                      setPlacedOrder(null);
                    }}
                    className="w-full bg-brand-ink text-white py-3 rounded-xl font-bold text-xs hover:bg-brand-ink/90 shadow cursor-pointer text-center"
                  >
                    Close & Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
