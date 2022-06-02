import status from './status.js';

const template = ({ index, description, completed }) => {
  const listItemClasses = [
    'todo__list-item',
    ...(completed ? ['todo__list-item--completed'] : []),
  ].join(' ');

  return `
    <li
      id="todo__list-item-${index}"
      class="${listItemClasses}"
    >
      <input
        id="todo-check-input-${index}"
        class="todo__checkbox"
        type="checkbox"
        name="todo-checkbox"
        data-index="${index}"
        ${completed ? 'checked' : ''}
      >
      <input
        id="todo-edit-input-${index}"
        class="todo__label todo__edit-input"
        type="text"
        name="todo-edit-input-${index}"
        value="${description}"
        data-index="${index}"
      >
      <button class="button todo__drag-btn" type="button" data-index="${index}">
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </button>
      <button class="button todo__remove-btn" type="button" data-index="${index}">
        <i class="fa-solid fa-trash"></i>
      </button>
    </li>
  `;
};

export default class ToDoList {
  STORE_KEY = 'todo-list';

  constructor() {
    this.items = this.fetchItems();
    this.containerEl = document.querySelector('.todo__list');
    this.inputEl = document.querySelector('.todo__input');
    this.clearButtonEl = document.querySelector('.todo__clear-btn');
  }

  render() {
    const todoList = this.items.sort((a, b) => a.index - b.index);
    const todoListEls = todoList.map(template);

    this.containerEl.innerHTML = todoListEls.join('');
  }

  initListeners(refresh) {
    const editInputEls = document.querySelectorAll('.todo__edit-input');
    const checkboxEls = document.querySelectorAll('.todo__checkbox');
    const removeBtnEls = document.querySelectorAll('.todo__remove-btn');

    editInputEls.forEach((element) => {
      element.addEventListener('change', (event) => {
        const index = parseInt(event.target.dataset.index, 10);
        const newTodo = event.target.value;

        this.edit(index, newTodo);
      });

      element.addEventListener('click', (event) => {
        const { index } = event.target.dataset;
        const todoEl = document.querySelector(`#todo__list-item-${index}`);

        todoEl.classList.toggle('todo__list-item--focus');
      });
    });

    checkboxEls.forEach((element) => {
      element.addEventListener('change', (event) => {
        const index = parseInt(event.target.dataset.index, 10);
        const { checked } = event.currentTarget;

        status.updateStatus(index, checked, this);
      });
    });

    removeBtnEls.forEach((element) => {
      element.addEventListener('click', (event) => {
        const index = parseInt(event.currentTarget.dataset.index, 10);

        this.delete(index);
        this.sort();
      });
    });

    if (refresh) return;

    this.inputEl.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        const newTodo = event.target.value;

        this.add(newTodo);
        this.inputEl.value = '';
      }
    });

    this.clearButtonEl.addEventListener('click', () => {
      const checkboxEls = document.querySelectorAll('.todo__checkbox');
      const indexes = [...checkboxEls]
        .filter(({ checked }) => checked)
        .map(({ dataset }) => parseInt(dataset.index, 10));

      this.bulkDelete(indexes);
      this.sort();
    });
  }

  add(description) {
    const newIndex = this.getNewIndex();
    const newTodo = {
      index: newIndex,
      completed: false,
      description,
    };

    this.items.push(newTodo);
    this.render();
    this.initListeners(true);
    this.store();
  }

  delete(idx) {
    const deleteIndex = this.items.findIndex(({ index }) => index === idx);

    if (deleteIndex > -1) this.items.splice(deleteIndex, 1);
  }

  bulkDelete(indexes) {
    indexes.forEach((idx) => {
      this.delete(idx);
    });
  }

  edit(idx, newTodo) {
    const index = this.items.findIndex(({ index }) => index === idx);

    this.items[index].description = newTodo;
    this.store();
  }

  // check(idx, completed) {
  //   const index = this.items.findIndex(({ index }) => index === idx);

  //   this.items[index].completed = completed;
  //   this.render();
  //   this.initListeners(true);
  //   this.store();
  // }

  store() {
    const data = JSON.stringify(this.items);
    localStorage.setItem(this.STORE_KEY, data);
  }

  fetchItems() {
    const items = localStorage.getItem(this.STORE_KEY);

    return items ? JSON.parse(items) : [];
  }

  sort() {
    this.items = this.items.sort((a, b) => a.index - b.index);
    this.items.forEach((item, idx) => {
      item.index = idx + 1;
    });

    this.render();
    this.initListeners(true);
    this.store();
  }

  getNewIndex() {
    let index = this.items.length + 1;

    this.items.forEach(({ index: currentIndex }) => {
      if (currentIndex >= index) index = currentIndex + 1;
    });

    return index;
  }
}
