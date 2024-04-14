export const FilterBySearch = (data, searchTerm) => {
  return data["todos"].filter((todo) => {
    return (
      todo.task.title.toLowerCase().includes(searchTerm) ||
      todo.task.description.toLowerCase().includes(searchTerm)
    );
  });
};
