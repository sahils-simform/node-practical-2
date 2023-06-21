/* eslint-disable no-console */
// process.env.TZ = "UTC";
// "2023-06-23T14:55:00"
const shopSchedule = require("./shop_schedule.json");

const isShopOpen = (day) => {
  const currentTime = new Date();
  const currentDay = currentTime.toLocaleString("en-US", {
    weekday: "short",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  console.log(currentDay);

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
  const currentTime = new Date();
  // console.log("---------", currentTime);
  const currentDay = currentTime.toLocaleString("en-US", {
    weekday: "short",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  console.log(currentDay);
  const isOpen = isShopOpen(currentDay);

  return isOpen ? "Open!" : "Closed!";
};

console.log("Shop Status:", getShopStatus());
