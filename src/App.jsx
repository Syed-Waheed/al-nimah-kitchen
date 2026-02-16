import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useMenu } from './hooks/useMenu';
import { useCart } from './hooks/useCart';
import MenuCard from './components/MenuCard';
import ViewCartBar from './components/ViewCartBar';
import CartModal from './components/CartModal';
import { Phone } from 'lucide-react';

function App() {
  const { items, staples, isRamadan, storeInfo } = useMenu();
  const { cart, addToCart, removeFromCart, total } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const getCartItem = (id) => cart.find((i) => i.id === id);

  const goldText =
    'text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728]';

  // STORE OPEN / CLOSE LOGIC
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHour + currentMinutes / 60;

  let isOpenNow = false;

  if (isRamadan) {
    if (currentTime >= 22 || currentTime < 3) {
      isOpenNow = true;
    }
  } else {
    if (currentTime >= 10 && currentTime < 24) {
      isOpenNow = true;
    }
  }

  // CATEGORIZATION LOGIC
  const isEssential = (item) => {
    const name = item.name.toLowerCase();
    return (
      name.includes('soroti') ||
      name.includes('shami') ||
      name.includes('rice') ||
      name.includes('dal') ||
      name.includes('chapati') ||
      name.includes('roti') ||
      name.includes('phulka') ||
      name.includes('paratha') ||
      name.includes('bhaji')
    );
  };

  const rawEssentials = [...items, ...staples].filter(isEssential);
  const dailyEssentials = Array.from(
    new Map(rawEssentials.map(item => [item.id, item])).values()
  );

  // Added back to prevent errors
  const mainCourse = items.filter((item) => !isEssential(item));
  const snackItems = staples.filter((item) => !isEssential(item));

  const todayName = new Date().toLocaleDateString('en-IN', { weekday: 'long' });
  const phoneNumber = "+919347025134";

  return (
    <div
      className="min-h-screen text-white relative font-sans selection:bg-emerald-500/30 overflow-x-hidden"
      style={{ backgroundColor: '#03210fff' }}
    >
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[100px]" />
      </div>

      {/* HEADER - RESTORED TO YOUR LAYOUT */}
      <header className="relative z-50 px-6 pt-10 pb-4">
        <div className="flex justify-end">
          <div className="flex items-start gap-4">

            {/* TEXT BLOCK */}
            <div className="flex flex-col items-end">
              <h1 className={`text-2xl font-black tracking-tight leading-none ${goldText}`}>
                {storeInfo.name}
              </h1>

              {/* RESTORED: LEFT ALIGNED UNDER NAME */}
              <p
                className={`text-[10px] font-bold uppercase tracking-[0.25em] mt-1 self-start ${
                  isOpenNow ? 'text-emerald-400/80' : 'text-red-400/80'
                }`}
              >
                {isOpenNow
                  ? isRamadan
                    ? 'OPEN • 10PM – 3AM'
                    : 'OPEN • 10AM – 12AM'
                  : 'CLOSED NOW'}
              </p>
            </div>

            {/* LOGO */}
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: '130px', height: '100px', objectFit: 'contain' }}
              className="drop-shadow-lg"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>
      </header>

      {/* PHONE & TITLE */}
      <div className="relative z-10 px-6 mt-8 mb-10 text-center">
        <div className="flex flex-col items-center gap-1">
          <h2 className={`text-sm font-black tracking-[0.2em] ${goldText} drop-shadow-md`}>
            | HYGIENIC HOME FOOD |
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#bf953f] to-transparent my-2 opacity-50" />
          <a
            href={`tel:${phoneNumber}`}
            className={`text-xl font-bold tracking-wider ${goldText} flex items-center gap-2 hover:scale-105 transition-all duration-300`}
          >
            <Phone size={16} className="text-[#fcf6ba] fill-[#fcf6ba]" />
            {phoneNumber}
          </a>
        </div>
      </div>

      {/* MAIN CONTENT - Kept the better spacing gap-12 and gap-20 */}
      <main className="relative z-10 max-w-lg mx-auto px-6 space-y-20 pb-[calc(7rem+env(safe-area-inset-bottom,0px))]">

        {/* TODAY SPECIAL */}
        {mainCourse.length > 0 && (
          <section>
            <div className="flex flex-col items-start gap-1 mb-8">
              <h3 className={`text-3xl font-serif italic ${goldText}`}>
                TODAY'S SPECIAL
              </h3>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500/50 mt-1">
                {todayName}
              </p>
            </div>

            <div className="grid gap-12">
              {mainCourse.map((item) => (
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
        )}

        {/* SNACKS & FAST FOOD */}
        {snackItems.length > 0 && (
          <section>
            <div className="flex flex-col items-start gap-1 mb-8 mt-4">
              <h3 className={`text-3xl font-serif italic ${goldText}`}>
                SNACKS & FAST FOOD
              </h3>
            </div>

            <div className="grid gap-12">
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
        )}

        {/* DAILY ESSENTIALS */}
        {dailyEssentials.length > 0 && (
          <section>
            <div className="flex flex-col items-start gap-1 mb-8 mt-4">
              <h3 className={`text-3xl font-serif italic ${goldText}`}>
                DAILY ESSENTIALS
              </h3>
            </div>

            <div className="grid gap-12">
              {dailyEssentials.map((item) => (
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
        )}
      </main>

      {/* VIEW CART BAR */}
      {cart.length > 0 &&
        createPortal(
          <ViewCartBar
            itemCount={cart.reduce((s, i) => s + i.qty, 0)}
            total={total}
            onViewCart={() => setCartOpen(true)}
          />,
          document.body
        )}

      {/* CART MODAL */}
      {cartOpen &&
        createPortal(
          <CartModal
            cart={cart}
            total={total}
            onClose={() => setCartOpen(false)}
            onAdd={addToCart}
            onRemove={removeFromCart}
          />,
          document.body
        )}
    </div>
  );
}

export default App;