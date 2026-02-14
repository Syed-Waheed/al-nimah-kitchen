// import React from 'react';
// import { ChevronRight, Percent } from 'lucide-react';
// import config from '../config/menu.config.json';

// const WhatsAppButton = ({ cart, total }) => {
//   const handleOrder = () => {
//     const phoneNumber = config.storeInfo.whatsappNumber;
//     let message = `*New Order* 🛒%0A%0A`;
//     cart.forEach(item => {
//       message += `▪️ ${item.qty} x ${item.name} (₹${item.price * item.qty})%0A`;
//     });
//     message += `%0A*Total: ₹${total}*%0A`;
//     const url = `https://wa.me/${phoneNumber}?text=${message}`;
//     window.open(url, '_blank');
//   };

//   const lastItem = cart[cart.length - 1];
//   const imageUrl = lastItem?.image || `https://source.unsplash.com/100x100/?food`;

//   return (
//     // FIXED POSITION: Forces it to float at the bottom with high Z-Index
//     <div className="fixed bottom-6 left-4 right-4 z-[9999] flex flex-col shadow-2xl filter drop-shadow-2xl">
      
//       {/* 1. BLUE BANNER (Free Delivery) */}
//       <div className="bg-[#1e293b] text-blue-200 text-[10px] font-bold py-1.5 px-4 rounded-t-xl flex items-center gap-2 border-x border-t border-white/10 shadow-lg">
//         <div className="bg-blue-500 p-0.5 rounded-full">
//             <Percent size={8} className="text-white" strokeWidth={4} />
//         </div>
//         <span>You've unlocked Free delivery with Gold</span>
//       </div>

//       {/* 2. RED CART BUTTON */}
//       <button 
//         onClick={handleOrder}
//         className="bg-[#e11d48] hover:bg-[#be123c] text-white p-3 rounded-b-xl flex items-center justify-between transition-transform active:scale-[0.99] border-x border-b border-white/10 shadow-lg"
//       >
//         {/* Left: Image + Text */}
//         <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-full border border-white/20 overflow-hidden bg-black flex-shrink-0">
//                 <img 
//                     src={imageUrl} 
//                     alt="item" 
//                     className="w-full h-full object-cover"
//                     onError={(e) => {e.target.src = "https://source.unsplash.com/100x100/?food"}} 
//                 />
//             </div>
            
//             <div className="flex flex-col items-start leading-none">
//                 <span className="text-xs font-bold">{cart.length} {cart.length === 1 ? 'item' : 'items'} added</span>
//                 <span className="text-[10px] opacity-90 mt-1 font-medium">Total: ₹{total}</span>
//             </div>
//         </div>

//         {/* Right: View Cart */}
//         <div className="flex items-center gap-1 font-bold text-sm bg-black/10 px-3 py-1.5 rounded-lg">
//             <span>View cart</span>
//             <ChevronRight size={16} strokeWidth={3} />
//         </div>
//       </button>
//     </div>
//   );
// };

// export default WhatsAppButton;