import './styles/reset.css';
import './styles/button.css';
import './styles/todo-list.css';

const todoListContainerEl = document.querySelector('.todo__list');

const tasks = [
  {
    index: 2,
    description: 'Buy some food',
    completed: false,
  },
  {
    index: 1,
    description: 'Go to turkey',
    completed: true,
  },
  {
    index: 0,
    description: 'Fix code issues',
    completed: false,
  },
];

const generateTaskElement = ({ index, description, completed }) => `
    <li id="todo__list-item-${index}" class="todo__list-item ${completed ? 'todo__list-item--completed' : ''}">
      <input class="todo__checkbox" type="checkbox" name="todo-${index}" value="${index}">
      <div class="todo__description">${description}</div>
      <button class="button todo__drag-btn" type="button">
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </button>
    </li>
  `;

const render = () => {
  let tasksListEl = '';

  tasks.sort((a, b) => a.index - b.index).forEach((task) => {
    tasksListEl += generateTaskElement(task);
  });

  todoListContainerEl.innerHTML = tasksListEl;
};

render();