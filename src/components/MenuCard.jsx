import React from 'react';
import { Plus, Minus } from 'lucide-react';

const MenuCard = ({ item, cartItem, onAdd, onRemove, goldText }) => {
  const qty = cartItem ? cartItem.qty : 0;

  const imageUrl =
    item.image ||
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=300";

  return (
    <div className="relative w-full py-6">
      <div className="flex justify-between items-start gap-4">

        {/* LEFT */}
        <div className="flex-1 pr-4 flex flex-col">
          <h3 className="text-white font-semibold text-[17px] leading-snug mb-1">
            {item.name}
          </h3>

          <p className="text-gray-400 text-[12px] leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>

          {/* GOLD PRICE */}
          <span
            className={`text-[16px] font-semibold ${
              goldText || 'text-amber-400'
            }`}
          >
            ₹{item.price}
          </span>
        </div>

        {/* RIGHT */}
        <div className="w-[130px] flex flex-col items-center shrink-0">
          {/* IMAGE WITH CURVE */}
          <div
            className="w-[130px] h-[130px] overflow-hidden shadow-lg"
            style={{ borderRadius: '20px 20px 45px 20px' }}
          >
            <img
              src={imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* BUTTON */}
          <div className="mt-3 w-[110px]">
            {qty > 0 ? (
              <div className="flex items-center justify-between bg-[#0f172a] border border-amber-500/40 rounded-lg h-9 px-2 shadow-md">
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-amber-400"
                >
                  <Minus size={16} strokeWidth={2.5} />
                </button>

                <span className="text-amber-400 text-sm font-semibold tabular-nums">
                  {qty}
                </span>

                <button
                  onClick={() => onAdd(item)}
                  className="text-amber-400"
                >
                  <Plus size={16} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAdd(item)}
                className="w-full h-9 bg-white text-black text-sm font-semibold rounded-lg shadow-md"
              >
                ADD
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MenuCard;
