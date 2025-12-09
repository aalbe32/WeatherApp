import React from "react";


export function getTimeOfDay(localTime){
  
    const currentHour = new Date(localTime.localTime).getHours();
    if (currentHour >= 19 || currentHour <= 6)return 'night';
    if (currentHour >= 6 && currentHour < 8)  return 'dawn';
    if (currentHour >= 17 && currentHour < 19) return 'dusk';
    return 'day';
};
