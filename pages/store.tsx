import Head from 'next/head'
import { useState } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

const categories = [
  { id: 'all', name: '🌐 All Items' },
  { id: 'vip', name: '👑 VIP Packages' },
  { id: 'credits', name: '💰 Credits' },
  { id: 'vehicles', name: '🚗 Vehicle Packs' },
  { id: 'property', name: '🏠 Property' },
  { id: 'unlocks', name: '🔓 Unlocks' },
  { id: 'starter', name: '📦 Starter Packs' },
  { id: 'exclusive', name: '⭐ Exclusive' },
]

const products = [
  // VIP PACKAGES
  { id: 'bronze-vip', name: 'Ghostline Bronze VIP', price: 9.99, category: 'vip', icon: '🥉', color: 'from-orange-900 to-orange-700', features: ['Priority Queue Access', '5% Salary Bonus', 'Bronze Chat Tag', 'Basic Perks'] },
  { id: 'silver-vip', name: 'Ghostline Silver VIP', price: 19.99, category: 'vip', icon: '🥈', color: 'from-gray-700 to-gray-500', features: ['Priority Queue Access', '10% Salary Bonus', 'Silver Chat Tag', '3 Vehicle Slots', 'Exclusive Pistol + Ammo'] },
  { id: 'elite-vip', name: 'Ghostline Elite VIP', price: 39.99, category: 'vip', icon: '💎', color: 'from-blue-900 to-blue-600', features: ['Priority Queue Access', '20% Salary Bonus', 'Elite Chat Tag', '5 Vehicle Slots', 'Custom House Access', 'Exclusive Weapons', 'VIP Vehicle Pack'] },
  { id: 'shadow-vip', name: 'Ghostline Shadow VIP', price: 79.99, category: 'vip', icon: '👁️', color: 'from-purple-900 to-purple-600', features: ['All Elite Perks', '30% Salary Bonus', 'Shadow Chat Tag', '10 Vehicle Slots', 'Custom House', 'All Exclusive Items', 'Priority Support', 'Shadow Vehicle Pack'] },

  // CREDITS
  { id: 'credits-100', name: '100 Ghost Credits', price: 4.99, category: 'credits', icon: '💰', color: 'from-green-900 to-green-600', features: ['100 In-Game Credits', 'Buy Vehicles & Items', 'Instant Delivery'] },
  { id: 'credits-500', name: '500 Ghost Credits', price: 19.99, category: 'credits', icon: '💰', color: 'from-green-900 to-green-600', features: ['500 In-Game Credits', 'Buy Vehicles & Items', 'Instant Delivery', 'Save 20%'] },
  { id: 'credits-1000', name: '1000 Ghost Credits', price: 34.99, category: 'credits', icon: '💰', color: 'from-green-900 to-green-600', features: ['1,000 In-Game Credits', 'Buy Vehicles & Items', 'Instant Delivery', 'Save 30%'] },
  { id: 'credits-5000', name: '5000 Ghost Credits', price: 149.99, category: 'credits', icon: '💰', color: 'from-green-900 to-green-600', features: ['5,000 In-Game Credits', 'Buy Anything In-Game', 'Instant Delivery', 'Best Value — Save 40%'] },

  // VEHICLE PACKS
  { id: 'civilian-pack', name: 'Civilian Car Pack', price: 24.99, category: 'vehicles', icon: '🚗', color: 'from-slate-800 to-slate-600', features: ['Rolls Royce Wraith 2019', 'Bentley 2017', 'Mercedes Brabus', 'Toyota Hiace', 'Lexus LX 2018', '5 Vehicles Total'] },
  { id: 'import-pack', name: 'Import Car Pack', price: 34.99, category: 'vehicles', icon: '🏎️', color: 'from-red-900 to-red-600', features: ['McLaren P1', 'McLaren GT', 'Porsche 911 GT3', 'Lamborghini LP770', 'Nissan GTR Nismo', 'Toyota Supra A90', '10+ Vehicles'] },
  { id: 'emergency-pack', name: 'Emergency Vehicle Pack', price: 29.99, category: 'vehicles', icon: '🚔', color: 'from-blue-900 to-blue-600', features: ['Police Interceptors', 'Ambulance Units', 'Fire Trucks', 'SWAT Vehicles', '20+ Emergency Vehicles'] },
  { id: 'ghostline-vehicles', name: 'Ghostline Exclusive Pack', price: 49.99, category: 'vehicles', icon: '✨', color: 'from-purple-900 to-purple-600', features: ['2026 BMW M3', 'BMW M2 CS', 'Lamborghini Autentica', 'Ferrari 812', 'Hellfire', 'Nissan 74SX', '6 VIP Exclusives'] },

  // PROPERTY
  { id: 'custom-house', name: 'Custom House', price: 39.99, category: 'property', icon: '🏠', color: 'from-amber-900 to-amber-600', features: ['Custom Interior', 'Furniture System', 'Storage Safe', 'Garage Access', 'GPS Location'] },
  { id: 'business', name: 'Player-Owned Business', price: 49.99, category: 'property', icon: '🏢', color: 'from-teal-900 to-teal-600', features: ['Own a Business', 'Set Prices', 'Hire Employees', 'Stock Management', 'Revenue System'] },
  { id: 'dealership', name: 'Dealership Ownership', price: 79.99, category: 'property', icon: '🏪', color: 'from-cyan-900 to-cyan-600', features: ['Sell Vehicles', 'Set Markups', 'Custom Branding', 'Showroom Floor', 'Employee Access'] },
  { id: 'nightclub', name: 'Nightclub / Warehouse', price: 59.99, category: 'property', icon: '🎵', color: 'from-pink-900 to-pink-600', features: ['DJ Booth', 'Bar System', 'VIP Section', 'Underground Storage', 'Passive Income'] },

  // UNLOCKS
  { id: 'job-boost', name: 'Job Boost Pack', price: 14.99, category: 'unlocks', icon: '⚡', color: 'from-yellow-900 to-yellow-600', features: ['2x Job XP', 'Unlock All Jobs', 'Higher Starting Pay', 'Special Assignments'] },
  { id: 'gang-access', name: 'Gang System Access', price: 24.99, category: 'unlocks', icon: '🔫', color: 'from-red-900 to-red-700', features: ['Create a Gang', 'Territory Control', 'Gang Wars', 'Drug Operations', 'Arms Dealing'] },
  { id: 'heist-access', name: 'Heist Access Pack', price: 29.99, category: 'unlocks', icon: '🏦', color: 'from-orange-900 to-orange-700', features: ['Bank Heists', 'Jewelry Store', 'Club Heist', 'Fleeca Jobs', 'Pacific Standard'] },
  { id: 'crafting-upgrade', name: 'Crafting System Upgrade', price: 19.99, category: 'unlocks', icon: '🔧', color: 'from-gray-800 to-gray-600', features: ['Craft Weapons', 'Craft Ammo', 'Craft Items', 'Blueprints', 'Workbench Access'] },

  // STARTER PACKS
  { id: 'beginner-bundle', name: 'Beginner Bundle', price: 9.99, category: 'starter', icon: '🎁', color: 'from-green-900 to-green-700', features: ['$50,000 In-Game Cash', 'Starter Vehicle', 'Phone + ID', 'Basic Apartment', 'Job Access'] },
  { id: 'criminal-starter', name: 'Criminal Starter Kit', price: 14.99, category: 'starter', icon: '🔫', color: 'from-red-900 to-red-700', features: ['$100,000 Dirty Money', 'Lockpick Set', 'Weapon', 'Gang Access', 'Hideout Location'] },
  { id: 'civilian-starter', name: 'Civilian Starter Kit', price: 12.99, category: 'starter', icon: '👤', color: 'from-blue-900 to-blue-700', features: ['$75,000 In-Game Cash', 'Starter Car', 'Business License', 'Job Priority', 'Starter Apartment'] },
  { id: 'leo-pack', name: 'Law Enforcement Pack', price: 19.99, category: 'starter', icon: '🛡️', color: 'from-blue-800 to-blue-500', features: ['Police Job Access', 'Patrol Vehicle', 'Equipment Loadout', 'Radio + Badge', 'Evidence Kit'] },

  // EXCLUSIVE
  { id: 'custom-clothing', name: 'Custom Clothing Bundle', price: 9.99, category: 'exclusive', icon: '👕', color: 'from-purple-900 to-purple-600', features: ['50+ Custom Clothing Items', 'Designer Brands', 'Exclusive Accessories', 'Custom Outfits', 'No Dupes'] },
]

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory)

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    if (cart.length === 0) return
    setIsCheckingOut(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Checkout failed. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <>
      <Head>
        <title>Store — Ghostline RP</title>
        <meta name="description" content="Ghostline RP Store — VIP Packages, Credits, Vehicles, Properties & More" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main
        className="min-h-screen text-white relative"
        style={{
          backgroundImage: 'url(/store_background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        <div className="relative z-10 container mx-auto px-4 py-8">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/store_logo.png"
              alt="Ghostline RP Store"
              className="object-contain max-w-[400px] w-full h-auto drop-shadow-[0_0_30px_rgba(138,43,226,0.5)]"
            />
          </div>

          {/* Tagline */}
          <p className="text-center text-gray-400 mb-8 text-lg">
            👑 Premium FiveM Server Store — VIP • Credits • Vehicles • Properties • More
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-gray-700/80 text-gray-300 hover:bg-gray-600/80'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Products Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className={`bg-gradient-to-br ${product.color} backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02] cursor-pointer`}
                  onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{product.icon}</div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">${product.price}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>

                  {expandedProduct === product.id && product.features && (
                    <ul className="mt-3 space-y-1 mb-3">
                      {product.features.map((feat, i) => (
                        <li key={i} className="text-sm text-white/80 flex items-center gap-2">
                          <span className="text-green-400">✓</span> {feat}
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(product) }}
                    className="w-full mt-3 bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-lg transition-colors border border-white/10"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Sidebar */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 h-fit sticky top-4">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                🛒 Cart <span className="text-purple-400">({cart.length})</span>
              </h2>

              {cart.length === 0 ? (
                <p className="text-gray-400">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-[400px] overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg">
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 font-bold px-2">✕</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-4 mb-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-green-400">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-green-800 disabled:to-green-800 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg shadow-green-600/20"
                  >
                    {isCheckingOut ? '⏳ Processing...' : '💳 Checkout with Stripe'}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>© 2026 Ghostline RP — All purchases are final. Items delivered in-game automatically.</p>
            <p className="mt-1">Need help? Join our Discord for support.</p>
          </div>
        </div>
      </main>
    </>
  )
}
