import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * View Cart bar: viewport-fixed, safe-area aware, rendered via portal from App.
 * Swiggy/Zomato-style: strong contrast, rounded, clear hierarchy, premium elevation.
 */
const ViewCartBar = ({ itemCount, total, onViewCart }) => {
  return (
    <button
      type="button"
      onClick={onViewCart}
      className="flex items-center justify-between gap-3 rounded-t-2xl px-4 py-3 outline-none active:scale-[0.98] transition-transform w-full border-t border-x border-white/10 bg-[#e11d48] text-white cursor-pointer touch-manipulation shadow-[0_-8px_32px_rgba(0,0,0,0.35)]"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        paddingLeft: 'max(1rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(1rem, env(safe-area-inset-right, 0px))',
        paddingTop: '0.75rem',
        paddingBottom: 'max(0.75rem, calc(0.75rem + env(safe-area-inset-bottom, 0px)))',
      }}
    >
      {/* Hierarchy: count → total → CTA — compact, premium */}
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-white/90 text-xs font-medium tabular-nums shrink-0">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
        <span className="text-base font-bold text-white tabular-nums shrink-0">₹{total}</span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="font-semibold text-sm text-white">View Cart</span>
        <ChevronRight size={18} strokeWidth={2.5} className="text-white/90" />
      </div>
    </button>
  );
};

export default ViewCartBar;
