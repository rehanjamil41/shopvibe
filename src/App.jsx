import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Star, Trash2, Plus, Minus, ArrowRight, CheckCircle, CreditCard, MapPin, Phone, Mail, BookOpen, MessageCircle } from 'lucide-react';

// --- Mock Data ---
const PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 129.99,
    category: "Electronics",
    rating: 4.8,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Noise cancelling, 40h battery life, and premium sound quality."
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 89.99,
    category: "Electronics",
    rating: 4.5,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Track your heart rate, steps, and sleep with this sleek device."
  },
  {
    id: 3,
    name: "Men's Classic Sneakers",
    price: 59.99,
    category: "Fashion",
    rating: 4.2,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1527010154944-f2241763d806?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Comfortable, durable, and stylish for everyday wear."
  },
  {
    id: 4,
    name: "Leather Messenger Bag",
    price: 149.50,
    category: "Fashion",
    rating: 4.9,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Genuine leather, fits 15-inch laptops, perfect for work."
  },
  {
    id: 5,
    name: "Modern Coffee Maker",
    price: 79.99,
    category: "Home",
    rating: 4.6,
    reviews: 300,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Brew the perfect cup every morning with programmable settings."
  },
  {
    id: 6,
    name: "Minimalist Desk Lamp",
    price: 34.99,
    category: "Home",
    rating: 4.3,
    reviews: 150,
    image: "https://images.unsplash.com/photo-1507473888900-52e1adad54cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Adjustable brightness and color temperature for focused work."
  },
  {
    id: 7,
    name: "4K Action Camera",
    price: 199.99,
    category: "Electronics",
    rating: 4.7,
    reviews: 90,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Capture your adventures in stunning ultra-high definition."
  },
  {
    id: 8,
    name: "Denim Jacket",
    price: 65.00,
    category: "Fashion",
    rating: 4.4,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1551537482-f2096327e0b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Classic vintage style denim jacket for all seasons."
  }
];

const CATEGORIES = ["All", "Electronics", "Fashion", "Home"];

// --- Components ---

const Button = ({ children, onClick, variant = "primary", className = "", disabled = false }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 active:scale-95",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
  };
  return (
    <button disabled={disabled} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const ProductCard = ({ product, onAddToCart }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group flex flex-col h-full border border-gray-100">
    <div className="relative h-48 overflow-hidden bg-gray-100">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700">
        {product.category}
      </div>
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-800 line-clamp-1 text-lg">{product.name}</h3>
        <span className="font-bold text-indigo-600">${product.price}</span>
      </div>
      <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
        ))}
        <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
      </div>
      <Button onClick={() => onAddToCart(product)} className="w-full">
        Add to Cart
      </Button>
    </div>
  </div>
);

const CartItem = ({ item, onUpdateQty, onRemove }) => (
  <div className="flex gap-4 p-4 border-b border-gray-100">
    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md bg-gray-100" />
    <div className="flex-1">
      <div className="flex justify-between mb-1">
        <h4 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h4>
        <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
          <Trash2 size={18} />
        </button>
      </div>
      <p className="text-indigo-600 font-medium mb-2">${item.price}</p>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"
        >
          <Minus size={14} />
        </button>
        <span className="w-4 text-center font-medium">{item.quantity}</span>
        <button 
          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  </div>
);

const CheckoutForm = ({ cartTotal, onPlaceOrder, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onPlaceOrder(formData);
    }, 2000);
  };

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-indigo-600 mb-6">
        <ArrowRight className="rotate-180 mr-2" size={20} /> Back to Shopping
      </button>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-indigo-600 text-white">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <p className="text-indigo-100 opacity-90">Complete your purchase securely.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><CreditCard size={16}/> Full Name</label>
              <input required name="name" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Mail size={16}/> Email</label>
              <input required type="email" name="email" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="john@example.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><MapPin size={16}/> Address</label>
            <input required name="address" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="123 Main St, Apt 4B" />
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">City</label>
              <input required name="city" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="New York" />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Zip Code</label>
              <input required name="zip" onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="10001" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-indigo-600">${cartTotal.toFixed(2)}</p>
            </div>
            <Button disabled={loading} type="submit" className="px-8">
              {loading ? "Processing..." : "Confirm Order"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SuccessScreen = ({ onHome }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4 animate-in fade-in zoom-in duration-300">
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
      <CheckCircle size={40} />
    </div>
    <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
    <p className="text-gray-500 max-w-md mb-8">Thank you for your purchase. Your order has been received and will be shipped shortly. Check your email for details.</p>
    <Button onClick={onHome}>Continue Shopping</Button>
  </div>
);

// ---Blog & Contact ---

const BLOG_POSTS = [
  { 
    id: 1, 
    title: "Top 10 Fashion Trends for 2025", 
    date: "Nov 25, 2025", 
    excerpt: "Discover what's trending this season with our comprehensive guide to style.", 
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop",
    content: `
      Fashion in 2025 is all about combining comfort with bold statements. Here are the top trends you need to know:
      
      1. Sustainable Fabrics: Eco-friendly materials are no longer niche; they are the standard. Look for organic cotton and recycled polyester.
      2. Oversized Silhouettes: Tight fits are out. Baggy jeans, oversized blazers, and loose shirts are dominating the streets.
      3. Digital Lavender: This color is everywhere. It's calming yet futuristic and works well for both casual and formal wear.
      4. Retro Tech: Styles inspired by the early 2000s (Y2K) are making a huge comeback with a modern twist.
      
      Remember, the best trend is the one that makes you feel confident!`
  },
  { 
    id: 2, 
    title: "How to Choose the Perfect Headphones", 
    date: "Nov 20, 2025", 
    excerpt: "Noise-cancelling or wireless? We break down the specs you need to know.", 
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
    content: `
      Choosing the right headphones can be overwhelming with so many options. Here is a simple guide to help you decide:

      1. Over-Ear vs. In-Ear: 
      Over-ear headphones offer better soundstage and comfort for long sessions, while in-ear earbuds are perfect for gym and commute due to their portability.

      2. Noise Cancellation (ANC):
      If you travel often or work in a noisy environment, Active Noise Cancellation is a must-have feature. It uses microphones to cancel out ambient noise.

      3. Battery Life:
      Look for headphones that offer at least 20 hours of playback. Fast charging is also a game-changer – 10 minutes of charge for 2 hours of play is standard now.

      4. Sound Profile:
      Do you like heavy bass? Or do you prefer crystal clear vocals? Check reviews to see if the sound signature matches your taste.`
  },
  { 
    id: 3, 
    title: "Minimalist Home Decor Ideas", 
    date: "Nov 15, 2025", 
    excerpt: "Transform your living space with these simple yet elegant tips.", 
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop",
    content: `
      Minimalism isn't just about having less; it's about making room for what matters. Here is how to achieve the look:

      1. Declutter First: Before buying anything, remove items you haven't used in a year. Open space is the key to minimalism.
      2. Neutral Color Palette: Stick to whites, beiges, and soft greys. You can add a pop of color with a single piece of art or a plant.
      3. Quality over Quantity: Instead of 5 cheap decorative items, invest in one high-quality vase or lamp that stands out.
      4. Let in the Light: Use sheer curtains or no curtains at all to maximize natural light. It makes the space look bigger and cleaner.`
  }
];

// --- Blog Screen Component ---
const BlogScreen = ({ onBack }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  // Agar koi blog select hua hai to uski details dikhao
  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in zoom-in duration-300">
        <button 
          onClick={() => setSelectedPost(null)} 
          className="flex items-center text-indigo-600 font-medium mb-6 hover:underline"
        >
          <ArrowRight className="rotate-180 mr-2" size={20} /> Back to Articles
        </button>
        
        <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg mb-8"/>
        
        <div className="prose max-w-none">
          <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{selectedPost.date}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">{selectedPost.title}</h1>
          
          <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {selectedPost.content}
          </div>
        </div>
             </div>
    );
  }

  // Agar koi select nahi hai to List dikhao
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-indigo-600 mb-6">
        <ArrowRight className="rotate-180 mr-2" size={20} /> Back to Home
      </button>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest from Our Blog</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {BLOG_POSTS.map(post => (
          <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover"/>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs font-semibold text-indigo-600">{post.date}</span>
              <h3 className="font-bold text-lg mt-2 mb-2 leading-tight">{post.title}</h3>
              <p className="text-gray-500 text-sm mb-4 flex-grow">{post.excerpt}</p>
              <button 
                onClick={() => { setSelectedPost(post); window.scrollTo(0,0); }}
                className="text-indigo-600 font-medium text-sm flex items-center hover:underline mt-auto"
              >
                Read More <ArrowRight size={16} className="ml-1"/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactScreen = ({ onBack }) => (
  <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
    <button onClick={onBack} className="flex items-center text-gray-500 hover:text-indigo-600 mb-6">
      <ArrowRight className="rotate-180 mr-2" size={20} /> Back to Home
    </button>
    
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 bg-indigo-900 text-white text-center">
            <MessageCircle size={48} className="mx-auto mb-4 opacity-80"/>
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-indigo-200 mt-2">We'd love to hear from you. Send us a message!</p>
        </div>
        
        <div className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Your Name"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="your@email.com"/>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="How can we help you?"></textarea>
            </div>
            <Button className="w-full py-3 text-lg">Send Message</Button>
        </div>
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [view, setView] = useState('home'); // home, checkout, success, blogs, contact
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart Logic
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
      }
      return [...prev, {...product, quantity: 1}];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
  const updateQty = (id, newQty) => {
    if (newQty < 1) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? {...item, quantity: newQty} : item));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filtering
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleCheckout = () => {
    setCartOpen(false);
    setView('checkout');
  };

  const handlePlaceOrder = (data) => {
    console.log("Order Data:", data);
    setCart([]);
    setView('success');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center cursor-pointer group" onClick={() => { 
                setView('home'); 
                setCategory('All'); 
                setSearch(''); 
                window.scrollTo(0,0); 
              }}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2">S</div>
              <span className="font-bold text-xl tracking-tight text-gray-900">ShopVibe</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => { setCategory(cat); setView('home'); window.scrollTo(0,0); }}
                  className={`${category === cat && view === 'home' ? 'text-indigo-600 font-semibold' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex relative">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-9 pr-4 py-1.5 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-indigo-500 text-sm w-48 transition-all focus:w-64"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setView('home'); }}
                />
                <Search size={16} className="absolute left-3 top-2 text-gray-400" />
              </div>
              
              <button onClick={() => setCartOpen(true)} className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Search & Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 bg-white border-b border-gray-200">
             <div className="mb-4 relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-100 border-none"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setView('home'); }}
                />
                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
             </div>
             <div className="flex flex-col space-y-2">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setCategory(cat); setView('home'); setMobileMenuOpen(false); }}
                    className="text-left py-2 px-2 hover:bg-gray-50 rounded-lg text-gray-700 font-medium"
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {view === 'home' && (
          <>
            {/* Hero Section (Only show on 'All' and no search) */}
            {category === 'All' && !search && (
              <div className="mb-12 rounded-3xl overflow-hidden relative bg-indigo-900 text-white shadow-xl h-80 md:h-96 flex items-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
                <div className="relative z-10 px-8 md:px-16 max-w-2xl">
                  <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/30 backdrop-blur-sm border border-indigo-400/30 text-sm font-semibold mb-4">New Season Arrivals</span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Upgrade Your Style With Our Latest Collection</h1>
                  <p className="text-lg text-gray-200 mb-8">Discover premium electronics, trendy fashion, and home essentials all in one place.</p>
                  <Button onClick={() => setCategory('Fashion')} className="px-8 py-3 text-lg bg-white text-indigo-900 hover:bg-gray-100 border-none">
                    Shop Now <ArrowRight size={20}/>
                  </Button>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{search ? `Results for "${search}"` : `${category} Products`}</h2>
              <span className="text-gray-500 text-sm">{filteredProducts.length} items found</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Search size={40} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or category filter.</p>
                <Button variant="outline" onClick={() => {setSearch(''); setCategory('All');}} className="mt-6 mx-auto">Clear Filters</Button>
              </div>
            )}

            {/* --- Extra Info Cards for Home View --- */}
            {!search && category === 'All' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pb-8">
                {/* Blog Card */}
                <div 
                  onClick={() => { setView('blogs'); window.scrollTo(0,0); }}
                  className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499750310159-5298019773dd?w=800')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4">
                      <BookOpen size={24} className="text-white"/>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Read Our Blog</h3>
                    <p className="text-gray-200 text-sm mb-4">Latest trends, guides, and lifestyle tips.</p>
                    <span className="flex items-center text-sm font-bold text-indigo-300 group-hover:text-white transition-colors">
                      Explore Articles <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                    </span>
                  </div>
                </div>

                {/* Contact Card */}
                <div 
                  onClick={() => { setView('contact'); window.scrollTo(0,0); }}
                  className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-indigo-600/30"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4">
                      <MessageCircle size={24} className="text-white"/>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
                    <p className="text-indigo-100 text-sm mb-4">Have questions? We are here to assist you 24/7.</p>
                    <span className="flex items-center text-sm font-bold text-indigo-300 group-hover:text-white transition-colors">
                      Contact Support <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {view === 'checkout' && (
          <CheckoutForm cartTotal={cartTotal} onPlaceOrder={handlePlaceOrder} onBack={() => setView('home')} />
        )}

        {view === 'success' && (
          <SuccessScreen onHome={() => setView('home')} />
        )}

        {view === 'blogs' && <BlogScreen onBack={() => setView('home')} />}
        
        {view === 'contact' && <ContactScreen onBack={() => setView('home')} />}

      </main>

      {/* Cart Drawer Overlay */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setCartOpen(false)} />
          
          <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
            <div className="h-full w-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right">
              
              {/* Cart Header */}
              <div className="px-4 py-6 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart size={24} className="text-indigo-600"/> Your Cart ({cartCount})
                </h2>
                <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-all">
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-500 space-y-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                      <ShoppingCart size={40} />
                    </div>
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <p className="text-sm">Looks like you haven't added anything yet.</p>
                    <Button variant="outline" onClick={() => setCartOpen(false)}>Start Shopping</Button>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {cart.map(item => (
                      <CartItem key={item.id} item={item} onUpdateQty={updateQty} onRemove={removeFromCart} />
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-gray-50 space-y-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${cartTotal.toFixed(2)}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Shipping and taxes calculated at checkout.</p>
                  <Button onClick={handleCheckout} className="w-full py-3 text-lg shadow-lg shadow-indigo-200">
                    Checkout Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
           <div>
             <div className="flex items-center mb-4 cursor-pointer group" onClick={() => { 
                  setView('home'); 
                  setCategory('All'); 
                  setSearch(''); 
                  window.scrollTo(0,0); 
                }}>
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2">S</div>
                <span className="font-bold text-xl tracking-tight text-gray-900">ShopVibe</span>
             </div>
             <p className="text-gray-500 text-sm">Your one-stop destination for premium products. Quality guaranteed.</p>
           </div>
           
          <div>
              <h3 className="font-bold text-gray-900 mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-500 text-sm flex flex-col items-start">
                <li>
                  <button 
                    onClick={() => { setCategory('Electronics'); setView('home'); window.scrollTo(0,0); }} 
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Electronics
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCategory('Fashion'); setView('home'); window.scrollTo(0,0); }} 
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Fashion
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCategory('Home'); setView('home'); window.scrollTo(0,0); }} 
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Home & Living
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCategory('All'); setView('home'); window.scrollTo(0,0); }} 
                    className="hover:text-indigo-600 transition-colors"
                  >
                    New Arrivals
                  </button>
                </li>
              </ul>
            </div>

           <div>
             <h3 className="font-bold text-gray-900 mb-4">Support</h3>
             <ul className="space-y-2 text-gray-500 text-sm">
               <li><button onClick={() => { setView('contact'); window.scrollTo(0,0); }} className="hover:text-indigo-600">Contact Us</button></li>
               
                <li><button onClick={() => { setView('blogs'); window.scrollTo(0,0); }} className="hover:text-indigo-600">FAQs</button></li>
             </ul>
           </div>

           <div>
             <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
             <ul className="space-y-2 text-gray-500 text-sm">
               <li className="flex items-center gap-2"><MapPin size={16}/>  Lahore</li>
              
               <li className="flex items-center gap-2"><Mail size={16}/> support@shopvibe41.com</li>
             </ul>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
          © 2025 ShopVibe. All rights reserved.
        </div>
      </footer>
    </div>
  );
}