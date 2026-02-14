import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import config from '../config/menu.config.json';

const CartSheet = ({ cart, total, onAdd, onRemove, onClose }) => {
  const placeOrder = () => {
    const phone = config.storeInfo.whatsappNumber;
    let message = `New Order\n\n`;
    cart.forEach(i => {
      message += `• ${i.qty} x ${i.name} (₹${i.qty * i.price})\n`;
    });
    message += `\nTotal to Pay: ₹${total}\nPlease confirm order & delivery time.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute bottom-0 left-0 right-0 bg-[#021208] rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Your Order</h3>
          <button onClick={onClose}><X /></button>
        </div>

        <div className="space-y-4 mb-6">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm opacity-70">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => onRemove(item.id)}><Minus size={14} /></button>
                <span>{item.qty}</span>
                <button onClick={() => onAdd(item)}><Plus size={14} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={placeOrder}
          className="w-full bg-green-600 py-4 rounded-xl font-bold"
        >
          Place Order on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default CartSheet;
