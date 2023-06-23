/* eslint-disable no-console */
const schedule = [
  {
    day: "Mon",
    open: "07:00 AM",
    close: "07:00 PM",
  },
  {
    day: "Tue",
    open: "07:00 AM",
    close: "07:00 PM",
  },
  {
    day: "Thu",
    open: "07:00 AM",
    close: "07:00 PM",
  },
  {
    day: "Fri",
    open: "07:00 AM",
    close: "07:00 PM",
  },
];

const isShopOpen = () => {
  const now = new Date("2023-06-24T13:00");
  console.log(now, "------------------");
  const currentDay = now.toLocaleString("en-US", { weekday: "short" });
  const currentTime = now.getTime();
  console.log(currentTime, "+++++++");
  const shopSchedule = schedule.find((entry) => entry.day === currentDay);
  if (!shopSchedule) {
    return "Closed";
  }

  const getTimeFromString = (timeString) => {
    const [hours, minutes, meridian] = timeString.split(/:| /);
    let hours24 = Number(hours);
    if (meridian === "PM" && hours24 < 12) {
      hours24 += 12;
    } else if (meridian === "AM" && hours24 === 12) {
      hours24 = 0;
    }
    const date = new Date("2023-06-24T13:00");
    console.log(date, "**********");
    date.setHours(hours24, Number(minutes), 0, 0);
    return date.getTime();
  };
  const shopOpenTime = getTimeFromString(shopSchedule.open);
  const shopCloseTime = getTimeFromString(shopSchedule.close);

  if (currentTime >= shopOpenTime && currentTime <= shopCloseTime) {
    return "Open";
  }
  return "Closed";
};

console.log("Shop Status:", isShopOpen());

// const shopSchedule = require("./shop_schedule.json");

// const currentTime = new Date("2023-06-24T19:55:00");
// const isShopOpen = (day) => {
//   const currentDay = currentTime.toLocaleString("en-US", {
//     weekday: "short",
//     hour12: true,
//     hour: "numeric",
//     minute: "numeric",
//   });

//   if (currentDay !== day) {
//     return false;
//   }

//   const openTime = new Date();
//   const closeTime = new Date();

//   shopSchedule.forEach((entry) => {
//     if (entry.day === day) {
//       const [openHour, openMinutes] = entry.open.split(":");
//       const [closeHour, closeMinutes] = entry.close.split(":");

//       openTime.setHours(Number(openHour), Number(openMinutes), 0);
//       closeTime.setHours(Number(closeHour), Number(closeMinutes), 0);
//     }
//   });const shopSchedule = require("./shop_schedule.json");

// const currentTime = new Date("2023-06-24T19:55:00");
// const isShopOpen = (day) => {
//   const currentDay = currentTime.toLocaleString("en-US", {
//     weekday: "short",
//     hour12: true,
//     hour: "numeric",
//     minute: "numeric",
//   });

//   if (currentDay !== day) {
//     return false;
//   }

//   const openTime = new Date();
//   const closeTime = new Date();

//   shopSchedule.forEach((entry) => {
//     if (entry.day === day) {
//       const [openHour, openMinutes] = entry.open.split(":");
//       const [closeHour, closeMinutes] = entry.close.split(":");

//       openTime.setHours(Number(openHour), Number(openMinutes), 0);
//       closeTime.setHours(Number(closeHour), Number(closeMinutes), 0);
//     }
//   });

//   return currentTime >= openTime && currentTime <= closeTime;
// };

// const getShopStatus = () => {
//   const currentDay = currentTime.toLocaleString("en-US", {
//     weekday: "short",
//     hour12: true,
//     hour: "numeric",
//     minute: "numeric",
//   });

//   const isOpen = isShopOpen(currentDay);

//   return isOpen ? "Open!" : "Closed!";
// };

// console.log("Shop Status:", getShopStatus());

//   return currentTime >= openTime && currentTime <= closeTime;
// };

// const getShopStatus = () => {
//   const currentDay = currentTime.toLocaleString("en-US", {
//     weekday: "short",
//     hour12: true,
//     hour: "numeric",
//     minute: "numeric",
//   });

//   const isOpen = isShopOpen(currentDay);

//   return isOpen ? "Open!" : "Closed!";
// };

// console.log("Shop Status:", getShopStatus());
