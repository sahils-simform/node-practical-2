/* eslint-disable no-console */

const shopSchedule = require("./shop_schedule.json");

const currentTime = new Date("2023-06-24T19:55:00");
const isShopOpen = (day) => {
  const currentDay = currentTime.toLocaleString("en-US", {
    weekday: "short",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  if (currentDay !== day) {
    return false;
  }

  const openTime = new Date();
  const closeTime = new Date();

  shopSchedule.forEach((entry) => {
    if (entry.day === day) {
      const [openHour, openMinutes] = entry.open.split(":");
      const [closeHour, closeMinutes] = entry.close.split(":");

      openTime.setHours(Number(openHour), Number(openMinutes), 0);
      closeTime.setHours(Number(closeHour), Number(closeMinutes), 0);
    }
  });

  return currentTime >= openTime && currentTime <= closeTime;
};

const getShopStatus = () => {
  const currentDay = currentTime.toLocaleString("en-US", {
    weekday: "short",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  const isOpen = isShopOpen(currentDay);

  return isOpen ? "Open!" : "Closed!";
};

console.log("Shop Status:", getShopStatus());

// const shopSchedule = require("./shop_schedule.json");
// // "2023-06-22T19:55:00"
// const currentTime = new Date("2023-06-22T19:55:00");

// const isShopOpen = () => {
//   const currentDay = currentTime.toLocaleString("en-US", {
//     weekday: "short",
//     hour12: true,
//     hour: "numeric",
//     minute: "numeric",
//   });
//   console.log(currentDay);

//   // if (currentDay !== day) {
//   //   console.log("Current Day is not same");
//   //   return false;
//   // }

//   const openTime = new Date(currentTime);
//   const closeTime = new Date(currentTime);

//   shopSchedule.forEach((entry) => {
//     const day1 = currentTime.toDateString().split(" ")[0];
//     if (entry.day === day1) {
//       const [openHour, openMinutes] = entry.open.split(":");
//       const [closeHour, closeMinutes] = entry.close.split(":");
//       console.log(openHour, closeHour);
//       openTime.setHours(Number(openHour), Number(openMinutes.split(" ")[0]));
//       closeTime.setHours(Number(closeHour), Number(closeMinutes.split(" ")[0]));
//     }
//   });

//   console.log(openTime, closeTime);
//   return currentTime >= openTime && currentTime <= closeTime;
// };

// const getShopStatus = () => {
//   const currentDay = currentTime.toLocaleString("en-US", {
//     weekday: "short",
//     hour12: true,
//     hour: "numeric",
//     minute: "numeric",
//   });
//   console.log(currentDay, "0---------------------");
//   const isOpen = isShopOpen(currentDay);

//   return isOpen ? "Open!" : "Closed!";
// };

// console.log("Shop Status:", getShopStatus());
