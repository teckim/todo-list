const updateStatus = (idx, status, todoList) => {
  const index = todoList.items.findIndex(({ index }) => index === idx);

  todoList.items[index].completed = status;
  todoList.render();
  todoList.initListeners(true);
  todoList.store();
};

export default {
  updateStatus,
};