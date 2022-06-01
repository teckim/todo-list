import './styles/reset.css';
import './styles/button.css';
import './styles/todo-list.css';

import ToDoList from './modules/todo.js';

const todoList = new ToDoList();

todoList.render();
todoList.initListeners();