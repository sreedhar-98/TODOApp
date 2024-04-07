const getpriority = (priority_id) => {
  if (priority_id === '1') return "Low Priority";
  else if (priority_id === '2') return "Medium priority";
  else if (priority_id === '3') return "High Priority";
  else return null;
};

export default getpriority;
