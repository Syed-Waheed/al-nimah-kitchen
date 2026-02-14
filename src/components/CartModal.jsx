import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Minus, ChevronRight, MessageCircle } from 'lucide-react';
import config from '../config/menu.config.json';

const CartModal = ({ cart, total, onClose, onAdd, onRemove }) => {
  const [showRedirectNote, setShowRedirectNote] = useState(false);

  const handlePlaceOrder = () => {
    setShowRedirectNote(true);
    const phoneNumber = config.storeInfo.whatsappNumber;
    // Build plain text first (newlines, •, ₹), then encode once to avoid broken characters
    let message = `New Order\n\n`;
    cart.forEach(item => {
      message += `• ${item.qty} x ${item.name} (₹${item.price * item.qty})\n`;
    });
    message += `\nTotal to Pay: ₹${total}\nPlease confirm order & delivery time.`;
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    setTimeout(() => {
      window.open(url, '_blank');
      onClose();
    }, 1500);
  };

  return createPortal(
    <div
      className="flex items-end justify-center isolate outline-none focus:outline-none focus-visible:outline-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        minHeight: '100dvh',
        zIndex: 10000,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        transform: 'translateZ(0)',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <div
        className="bg-black/80 backdrop-blur-sm transition-opacity outline-none focus:outline-none focus-visible:outline-none"
        onClick={onClose}
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          WebkitTapHighlightColor: 'transparent',
        }}
      />

      {/* Sheet: lighter than page for clear separation */}
      <div className="relative w-full max-w-md rounded-t-3xl border-t border-white/10 shadow-2xl p-6 animate-slide-up max-h-[85vh] overflow-y-auto bg-[#0f1419] outline-none focus:outline-none focus-visible:outline-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />

        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-white tracking-wide">Your Order</h2>
          <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors outline-none focus:outline-none focus-visible:outline-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        <p className="text-gray-500 text-xs mb-3">Review items and total — tap Place Order to open WhatsApp</p>

        {/* Info line: neutral, no blue — subtle bg only */}
        <div className="rounded-lg bg-white/5 px-3 py-2 mb-5">
          <span className="text-gray-500 text-xs">Free delivery · Confirm your order on WhatsApp</span>
        </div>

        {/* Item rows: compact, Swiggy-like density */}
        <div className="space-y-2.5 mb-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-2 py-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-2.5 h-2.5 rounded-sm border flex-shrink-0 flex items-center justify-center p-[1px] ${item.name.toLowerCase().includes('veg') && !item.name.toLowerCase().includes('non') ? 'border-green-500' : 'border-red-500'}`}>
                  <div className={`w-full h-full rounded-full ${item.name.toLowerCase().includes('veg') && !item.name.toLowerCase().includes('non') ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-gray-100 font-medium text-[13px] leading-tight truncate">{item.name}</h4>
                  <p className="text-gray-500 text-[11px] leading-tight">₹{item.price} × {item.qty} = ₹{item.price * item.qty}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <button onClick={() => onRemove(item.id)} className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-colors outline-none focus:outline-none focus-visible:outline-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
                  <Minus size={12} strokeWidth={2.5} />
                </button>
                <span className="text-white text-xs font-medium w-5 text-center tabular-nums">{item.qty}</span>
                <button onClick={() => onAdd(item)} className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-colors outline-none focus:outline-none focus-visible:outline-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
                  <Plus size={12} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill details */}
        <div className="bg-white/5 rounded-xl p-5 mb-24">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Bill Details</h3>
          <div className="flex justify-between text-sm text-gray-300 mb-2.5">
            <span>Item Total</span>
            <span className="tabular-nums">₹{total}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-300 mb-3 border-b border-white/5 pb-3">
            <span>Delivery</span>
            <span className="text-emerald-400">Free</span>
          </div>
          <div className="flex justify-between text-base font-bold text-white pt-1">
            <span>To Pay</span>
            <span className="tabular-nums">₹{total}</span>
          </div>
          <p className="text-gray-500 text-xs mt-3">Free delivery for orders within 2 km</p>
        </div>

        {/* Place Order: primary CTA focus */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-[#0f1419] border-t border-white/10" style={{ paddingBottom: 'max(1rem, calc(1rem + env(safe-area-inset-bottom, 0px)))' }}>
          {showRedirectNote ? (
            <p className="text-center text-sm text-emerald-400/90 py-2 flex items-center justify-center gap-2">
              <MessageCircle size={16} /> You'll be redirected to WhatsApp — tap Send there to confirm.
            </p>
          ) : (
            <>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-between px-6 shadow-lg shadow-emerald-900/30 active:scale-[0.98] transition-all outline-none focus:outline-none focus-visible:outline-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <span className="text-sm opacity-90">Total · ₹{total}</span>
                <span className="flex items-center gap-2">
                  Place Order
                  <ChevronRight size={20} strokeWidth={2.5} />
                </span>
              </button>
              <p className="text-center text-[10px] text-gray-500 mt-2.5">
                Opens WhatsApp with your order — tap Send to confirm
              </p>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CartModal;
