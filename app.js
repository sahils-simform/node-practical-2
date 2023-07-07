/* eslint-disable no-console */
const schedule = require("./shop_schedule.json");

const getTimeFromString = (timeString) => {
  const [hours, minutes, meridian] = timeString.split(/:| /);
  let hours24 = Number(hours);
  if (meridian === "PM" && hours24 < 12) {
    hours24 += 12;
  } else if (meridian === "AM" && hours24 === 12) {
    hours24 = 0;
  }
  const date = new Date();
  date.setHours(hours24, Number(minutes), 0, 0);
  return date.getTime();
};

const getNextOpenTime = (currentDay) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDayIndex = daysOfWeek.indexOf(currentDay);
  const nextDayIndex = (currentDayIndex + 1) % 7;

  const nextOpenTime = getTimeFromString(schedule[nextDayIndex].open);
  const nextOpenDateTime = new Date();
  nextOpenDateTime.setDate(
    nextOpenDateTime.getDate() + ((nextDayIndex - currentDayIndex + 7) % 7)
  );
  nextOpenDateTime.setHours(0, 0, 0, 0);
  nextOpenDateTime.setTime(nextOpenDateTime.getTime() + nextOpenTime);

  return nextOpenDateTime.getTime();
};

const isShopOpen = () => {
  const now = new Date();
  const currentDay = now.toLocaleString("en-US", { weekday: "short" });
  const currentTime = now.getTime();

  const shopSchedule = schedule.find((entry) => entry.day === currentDay);
  if (!shopSchedule) {
    const nextOpenTime = getNextOpenTime(currentDay);
    const timeUntilOpen = Math.ceil(
      (nextOpenTime - currentTime) / (1000 * 60 * 60)
    );
    return `Closed. The shop will be open after ${timeUntilOpen} Hrs`;
  }

  const shopOpenTime = getTimeFromString(shopSchedule.open);
  const shopCloseTime = getTimeFromString(shopSchedule.close);

  if (currentTime >= shopOpenTime && currentTime <= shopCloseTime) {
    const timeUntilClose = Math.ceil(
      (shopCloseTime - currentTime) / (1000 * 60 * 60)
    );
    return `Open. The shop will be closed within ${timeUntilClose} Hrs`;
  }
  const nextOpenTime = getNextOpenTime(currentDay);
  const timeUntilOpen = Math.ceil(
    (nextOpenTime - currentTime) / (1000 * 60 * 60)
  );
  return `Closed. The shop will be open after ${timeUntilOpen} Hrs`;
};
console.log("Shop Status:", isShopOpen());
