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
  const now = new Date();
  const currentDay = now.toLocaleString("en-US", { weekday: "short" });
  const currentTime = now.getTime();
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
    const date = new Date();
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
