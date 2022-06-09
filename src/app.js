import './styles/reset.css';
import './styles/button.css';
import './styles/todo-list.css';

import ToDoList from './modules/todo.js';
import TodoDOM from './modules/todoDOM.js';
import TodoStore from './modules/todoStore.js';

const todoStore = new TodoStore();
const todoList = new ToDoList(todoStore.items);
const todoDOM = new TodoDOM();

todoDOM.onCheckBoxChange = (event) => {
  const index = parseInt(event.target.dataset.index, 10);
  const { checked } = event.currentTarget;

  todoList.updateStatus(index, checked);
  todoStore.updateStatus(index, checked);
};

todoDOM.onInputChange = (event) => {
  const index = parseInt(event.target.dataset.index, 10);
  const newTodo = event.target.value;

  todoList.edit(index, newTodo);
  todoStore.edit(index, newTodo);
};

todoDOM.onRemoveItemClick = (event) => {
  const index = parseInt(event.currentTarget.dataset.index, 10);

  todoList.delete(index);
  todoStore.delete(index);
  todoDOM.remove(index);
};

todoDOM.render(todoList.items);

todoDOM.on('enter', (todo) => {
  const newTodo = todoList.add(todo);
  todoStore.add(newTodo);
  todoDOM.add(newTodo);
});

todoDOM.on('clear-all', (indexes) => {
  todoList.bulkDelete(indexes);
  todoStore.store(todoList.items);
  todoDOM.render(todoList.items);
});
