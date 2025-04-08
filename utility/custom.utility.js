const getLocalTimestamp = () => {
  const now = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return Intl.DateTimeFormat("en-IN", options).format(now);
};

const customUtility = {
  getLocalTimestamp,
};

export default customUtility;
