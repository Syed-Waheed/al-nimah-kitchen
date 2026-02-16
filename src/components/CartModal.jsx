import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Minus, ChevronRight, MessageCircle } from 'lucide-react';
import config from '../config/menu.config.json';

const CartModal = ({ cart, total, onClose, onAdd, onRemove }) => {
  const [showRedirectNote, setShowRedirectNote] = useState(false);

  const handlePlaceOrder = () => {
    setShowRedirectNote(true);
    const phoneNumber = config.storeInfo.whatsappNumber;

    let message = `New Order\n\n`;
    cart.forEach((item) => {
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
      className="flex items-end justify-center isolate"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        minHeight: '100dvh',
        zIndex: 10000,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        transform: 'translateZ(0)',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* OVERLAY - Tap here to close */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Container */}
      <div 
        className="relative w-full max-w-md rounded-t-3xl border-t border-white/10 shadow-2xl bg-[#0f1419] flex flex-col max-h-[85vh] animate-slide-up overflow-hidden"
        onClick={(e) => e.stopPropagation()} 
      >

        {/* --- STICKY HEADER SECTION --- */}
        <div className="bg-[#0f1419] px-6 pt-3 pb-4 border-b border-white/5">
          {/* Drag Handle Area */}
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4" />

          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-white tracking-wide">
              Your Order
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors active:scale-90"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
          <p className="text-gray-500 text-xs">
            Review items and total — tap Place Order to open WhatsApp
          </p>
        </div>

        {/* --- SCROLLABLE CONTENT (Items & Bill) --- */}
        <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
          {/* Items List */}
          <div className="space-y-5 mb-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-100 font-medium text-base truncate">
                    {item.name}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                  </p>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 h-10 w-[100px] shadow-sm flex-shrink-0">
                  <button
                    onClick={() => onRemove(item.id)}
                    className="w-9 h-full flex items-center justify-center text-emerald-700 hover:bg-emerald-50 rounded-l-xl active:scale-90 transition-all"
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <span className="text-emerald-700 text-sm font-extrabold tabular-nums">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => onAdd(item)}
                    className="w-9 h-full flex items-center justify-center text-emerald-700 hover:bg-emerald-50 rounded-r-xl active:scale-90 transition-all"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bill Details Block */}
          <div className="bg-white/5 rounded-2xl p-5 mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Bill Details
            </h3>
            <div className="flex justify-between text-sm text-gray-300 mb-2.5">
              <span>Item Total</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-300 mb-3 border-b border-white/5 pb-3">
              <span>Delivery</span>
              <span className={total >= 199 ? "text-emerald-400" : "text-gray-400"}>
                {total >= 199 ? "Free" : "Calculated at confirmation"}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold text-white pt-2">
              <span>To Pay</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        {/* --- STICKY BOTTOM SECTION --- */}
        <div
          className="w-full px-6 pt-4 pb-6 bg-[#0f1419] border-t border-white/5"
          style={{
            paddingBottom:
              'max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom, 0px)))',
          }}
        >
          {showRedirectNote ? (
            <p className="text-center text-base text-emerald-400 py-3 flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              Redirecting to WhatsApp...
            </p>
          ) : (
            <>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full relative overflow-hidden
                           bg-gradient-to-b from-emerald-500 to-emerald-600
                           text-white font-semibold
                           py-6
                           rounded-[36px]
                           flex items-center justify-between px-8
                           shadow-[0_16px_45px_rgba(16,185,129,0.45)]
                           active:scale-[0.96]
                           transition-all duration-200 ease-out"
              >
                <div className="flex flex-col items-start relative z-10">
                  <span className="text-[11px] uppercase tracking-wider opacity-80">
                    Total
                  </span>
                  <span className="text-2xl leading-none mt-1 font-bold">
                    ₹{total}
                  </span>
                </div>

                <span className="flex items-center gap-3 text-lg relative z-10 font-semibold">
                  Place Order
                  <ChevronRight size={22} strokeWidth={2.8} />
                </span>
              </button>

              <p className="text-center text-[10px] text-gray-500 mt-4 font-medium italic">
                Opens WhatsApp — tap Send to confirm order
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