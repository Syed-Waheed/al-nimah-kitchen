import { useState, useEffect } from 'react';
import config from '../config/menu.config.json';
import { ramzanMenu } from '../data/ramzan.menu';
import { weeklyMenu } from '../data/weekly.menu';
import { staples } from '../data/staples.menu';

export const useMenu = () => {
  const [menuState, setMenuState] = useState({
    title: "Loading...",
    items: [],
    specials: staples, // Always available (Burgers/Fries)
    isRamadan: false,
    storeInfo: config.storeInfo
  });

  useEffect(() => {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    const rStart = new Date(config.ramadan.startDate);
    const rEnd = new Date(config.ramadan.endDate);
    rStart.setHours(0,0,0,0);
    rEnd.setHours(0,0,0,0);

    // Get Day Index (0=Sun, 1=Mon, ..., 6=Sat)
    const dayIndex = now.getDay(); 
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayName = days[dayIndex];

    let activeItems = [];
    let activeTitle = "";
    let isRamadanActive = false;

    // --- LOGIC START ---
    
    // 1. IS IT RAMZAN?
    if (config.ramadan.isEnabled && today >= rStart && today <= rEnd) {
      isRamadanActive = true;
      activeTitle = `🌙 Ramzan Sehri (${dayName.charAt(0).toUpperCase() + dayName.slice(1)})`;

      // Ramzan Rotation Logic
      // Group A: Mon (1), Wed (3), Sat (6)
      if ([1, 3, 6].includes(dayIndex)) {
        activeItems = ramzanMenu.groupA;
      } 
      // Group B: Tue (2), Thu (4), Sun (0) (Adding Friday here for now as fallback)
      else {
        activeItems = ramzanMenu.groupB;
      }
    } 
    // 2. REGULAR WEEKLY MENU
    else {
      isRamadanActive = false;
      activeTitle = `Today's Menu (${dayName.charAt(0).toUpperCase() + dayName.slice(1)})`;
      activeItems = weeklyMenu[dayName] || [];
    }

    setMenuState({
      title: activeTitle,
      items: activeItems, // This is the Main Course list
      specials: staples,  // This is the Fast Food / Everyday list
      isRamadan: isRamadanActive,
      storeInfo: config.storeInfo
    });

  }, []);

  return menuState;
};