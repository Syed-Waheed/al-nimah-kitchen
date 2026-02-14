import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useMenu } from './hooks/useMenu';
import { useCart } from './hooks/useCart';
import MenuCard from './components/MenuCard';
import ViewCartBar from './components/ViewCartBar';
import CartModal from './components/CartModal';
import { Phone, Menu, Crown, Utensils } from 'lucide-react';

function App() {
  const { items, specials, isRamadan, storeInfo } = useMenu();
  const { cart, addToCart, removeFromCart, total } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const getCartItem = (id) => cart.find((i) => i.id === id);

  const goldText = 'text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728]';

  const snackItems = specials.filter(
    (item) =>
      item.category === 'Fast Food' ||
      item.name.toLowerCase().includes('burger') ||
      item.name.toLowerCase().includes('fries')
  );

  const todayName = new Date().toLocaleDateString('en-IN', { weekday: 'long' });
  const phoneNumber = "+917013343381"; 

  return (
    <div
      className="min-h-screen text-white relative font-sans selection:bg-emerald-500/30 overflow-x-hidden"
      style={{ backgroundColor: '#03210fff' }}
    >
      {/* ================= BACKGROUND ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[100px]" />
      </div>

      {/* ================= HEADER ================= */}
      <header className="relative z-50 px-6 pt-10 pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <img
                src="/logo.png"
                alt="Logo"
                style={{ width: '100px', height: '70px', objectFit: 'contain' }}
                className="drop-shadow-lg"
                onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <h1 className={`text-2xl font-black tracking-tight leading-none ${goldText}`}>
                {storeInfo.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400/80">
                  {isRamadan ? 'Ramadan Exclusive' : 'Open Now'}
                </p>
              </div>
            </div>
          </div>
          <button className="text-emerald-300/50 active:scale-90 transition-transform outline-none p-2 rounded-full border border-white/5 bg-white/5">
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* ================= CALL ACTION BAR ================= */}
      <div className="relative z-10 px-6 mt-6 mb-12">
        <a 
          href={`tel:${phoneNumber}`}
          className="relative group block no-underline outline-none decoration-transparent select-none border-none ring-0 focus:ring-0 focus:outline-none"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-red-500/20 rounded-2xl blur opacity-20 group-active:opacity-40 transition" />
          
          <div className="relative bg-[#042111] border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-2xl transition-all active:scale-[0.98]">
            <div className="flex items-center gap-4 pl-1">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-emerald-500/60 text-[10px] uppercase tracking-[0.2em] font-black">Fast Delivery</span>
                <span className="text-white text-lg font-bold tracking-tight">Call: {phoneNumber}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[1px] h-8 bg-white/5" />
              <div className="bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
                <Phone size={20} className="text-red-500 fill-red-500 animate-pulse" />
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Main scrollable content: bottom padding = bar height + safe area so last card clears bar without excess empty space */}
      <main className="relative z-10 max-w-lg mx-auto px-6 space-y-16 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]">
        {/* TODAY'S SPECIAL */}
        <section className="animate-fade-in-up">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-500/40 flex items-center gap-2">
              <Utensils size={12} /> Today’s Menu ({todayName})
            </h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
          </div>

          <div className="grid gap-10">
            {items.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                cartItem={getCartItem(item.id)}
                onAdd={addToCart}
                onRemove={removeFromCart}
                goldText={goldText}
              />
            ))}
          </div>
        </section>

        {/* SNACKS SECTION */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col items-center gap-3 mb-10 mt-10">
            <Crown size={32} className="text-amber-500/80 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" strokeWidth={1} />
            <h3 className={`text-4xl font-serif italic ${goldText} text-center`}>
              Snacks &<br/>Fast Food
            </h3>
          </div>

          <div className="grid gap-10">
            {snackItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                cartItem={getCartItem(item.id)}
                onAdd={addToCart}
                onRemove={removeFromCart}
                goldText={goldText}
              />
            ))}
          </div>
        </section>
      </main>

      {/* View Cart bar rendered via portal so it is never clipped by overflow/transform; always viewport-fixed */}
      {cart.length > 0 &&
        createPortal(
          <ViewCartBar
            itemCount={cart.reduce((s, i) => s + i.qty, 0)}
            total={total}
            onViewCart={() => setCartOpen(true)}
          />,
          document.body
        )}

      {/* Cart modal portaled to body so it stacks above View Cart bar and is not clipped by root overflow */}
      {cartOpen &&
        createPortal(
          <CartModal
            cart={cart}
            total={total}
            onClose={() => setCartOpen(false)}
            onAdd={addToCart}
            onRemove={removeFromCart}
            goldText={goldText}
          />,
          document.body
        )}
    </div>
  );
}

export default App;