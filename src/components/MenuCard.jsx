import React from 'react';
import { Plus, Minus } from 'lucide-react';

const MenuCard = ({ item, cartItem, onAdd, onRemove, goldText }) => {
  const qty = cartItem ? cartItem.qty : 0;
  
  // Diet Logic
  const isVeg = item.name.toLowerCase().includes('veg') && !item.name.toLowerCase().includes('non');
  const isCustomizable = item.name.includes('Biryani') || item.name.includes('Fries');
  
  // Image Logic
  const imageUrl = item.image || "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=300";

  return (
    <div className="relative flex justify-between items-stretch w-full mb-6 group">
      
      {/* 1. LEFT SIDE: Text Info */}
      <div className="flex-1 pr-3 flex flex-col justify-center py-1 z-10">
        
        {/* Title */}
        <h3 className="text-gray-100 font-bold text-[17px] leading-tight tracking-wide mb-1.5 font-sans">
          {item.name}
        </h3>

        {/* Description - Updated to sound tastier */}
        <p className="text-gray-500 text-[11px] font-medium leading-relaxed line-clamp-2 mb-3 pr-2">
          {item.description || "Slow-cooked perfection infused with aromatic spices and premium ingredients."}
        </p>

        {/* Price & Diet Dot Row */}
        <div className="flex items-center gap-3 mt-auto">
           {/* Price - The Star */}
           <span className={`text-[17px] font-black tracking-tight ${goldText || 'text-amber-400'}`}>
             ₹{item.price}
           </span>
           
           {/* Diet Dot (Subtle Glow) */}
           <div className={`relative w-2 h-2 rounded-full ${isVeg ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.6)]'}`}></div>
        </div>
      </div>

      {/* 2. RIGHT SIDE: Image & Floating Button — pb-4 reserves space for floating button so card fully contains image on mobile */}
      <div className="relative w-[115px] shrink-0 pb-4">
        
        {/* Image Container */}
        <div className="relative w-[115px] h-[115px] rounded-[1.5rem] overflow-hidden bg-[#111] shadow-2xl border border-white/5">
           <img 
             src={imageUrl} 
             alt={item.name} 
             className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
           />
           {/* Dark Overlay at bottom for button contrast */}
           <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        </div>

        {/* THE ROYAL BUTTON - Floating */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] z-20">
           {qty > 0 ? (
            /* Active State: Dark Glass Pill */
            <div className="flex items-center justify-between bg-[#111]/90 backdrop-blur-md rounded-full h-8 p-0.5 border border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              <button 
                onClick={() => onRemove(item.id)} 
                className="w-7 h-full flex items-center justify-center rounded-full text-white hover:bg-white/10 active:scale-90 transition-all"
              >
                <Minus size={12} strokeWidth={3} />
              </button>
              
              <span className="font-bold text-xs text-white px-1">{qty}</span>
              
              <button 
                onClick={() => onAdd(item)} 
                className="w-7 h-full flex items-center justify-center rounded-full text-white hover:bg-white/10 active:scale-90 transition-all"
              >
                <Plus size={12} strokeWidth={3} />
              </button>
            </div>
          ) : (
            /* Default State: Gold/Amber Pill */
            <button 
              onClick={() => onAdd(item)}
              className="w-full h-8 bg-white text-black font-extrabold text-[10px] uppercase tracking-[0.15em] rounded-full shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center gap-1"
            >
              ADD
            </button>
          )}
        </div>
      </div>

      {/* Customizable Indicator (Tiny glowing dot top right) */}
      {isCustomizable && (
         <div className="absolute top-1 right-1 pointer-events-none">
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse shadow-[0_0_8px_#fbbf24]"></div>
         </div>
      )}

    </div>
  );
};

export default MenuCard;