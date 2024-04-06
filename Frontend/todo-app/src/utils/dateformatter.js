const dateformatter = (date) => {
  const dateTime = new Date(date * 1000);
  const ans = dateTime.toDateString() +" "+ dateTime.toLocaleTimeString();
  return ans;
};

export default dateformatter;
