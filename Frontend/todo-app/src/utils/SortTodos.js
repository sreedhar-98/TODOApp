export const sortTodosByPriority = (data, reverse) => {
  return data.sort((a, b) => {
    let priorityDiff = parseInt(a.task.priority - b.task.priority);
    if (priorityDiff === 0) return b.createdAt - a.createdAt;
    return reverse ? -priorityDiff : priorityDiff;
  });
};
