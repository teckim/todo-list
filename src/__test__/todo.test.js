import ToDoList from '../modules/todo.js';

describe('todo list tests:', () => {
  const todoList = new ToDoList([]);

  test('todo task added:', () => {
    const newTodo = 'new todo list item';

    todoList.add(newTodo);

    const { description } = todoList.items[todoList.items.length - 1];
    expect(newTodo).toBe(description);
  });

  test('todo task deleted:', () => {
    todoList.add('hi');
    const tdlLength = todoList.items.length;
    todoList.delete(todoList.items[0].index);
    expect(todoList.items.length).toBe(tdlLength - 1);
  });

  test('edit todo task:', () => {
    const newTask = 'hello';
    todoList.add(newTask);
    const editedTask = 'marhaba';
    const editedTaskIndex = todoList.items[todoList.items.length - 1].index;
    todoList.edit(editedTaskIndex, editedTask);
    expect(todoList.items[todoList.items.length - 1].description).toBe(editedTask);
  });
});
