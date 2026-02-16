import { useState, useEffect } from 'react';
import config from '../config/menu.config.json';
import { ramzanMenu } from '../data/ramzan.menu';
import { weeklyMenu } from '../data/weekly.menu';
import { staples } from '../data/staples.menu';

export const useMenu = () => {
  const [menuState, setMenuState] = useState({
    title: "Loading...",
    items: [],
    staples: [], // Always available items
    isRamadan: false,
    storeInfo: config.storeInfo
  });

  useEffect(() => {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const rStart = new Date(config.ramadan.startDate);
    const rEnd = new Date(config.ramadan.endDate);
    rStart.setHours(0, 0, 0, 0);
    rEnd.setHours(0, 0, 0, 0);

    const dayIndex = now.getDay();
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayName = days[dayIndex];

    let activeItems = [];
    let activeTitle = "";
    let isRamadanActive = false;

    // 🌙 RAMZAN LOGIC
    if (config.ramadan.isEnabled && today >= rStart && today <= rEnd) {
      isRamadanActive = true;

      activeTitle = `🌙 Ramzan Sehri (${dayName.charAt(0).toUpperCase() + dayName.slice(1)})`;

      // Group A: Mon, Wed, Sat
      if ([1, 3, 6].includes(dayIndex)) {
        activeItems = ramzanMenu.groupA;
      } else {
        activeItems = ramzanMenu.groupB;
      }
    } 
    // 📅 WEEKLY MENU
    else {
      activeTitle = `Today's Menu (${dayName.charAt(0).toUpperCase() + dayName.slice(1)})`;
      activeItems = weeklyMenu[dayName] || [];
    }

    setMenuState({
      title: activeTitle,
      items: activeItems,
      staples: staples, // Always available
      isRamadan: isRamadanActive,
      storeInfo: config.storeInfo
    });

  }, []);

  return menuState;
};
