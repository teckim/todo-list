const generateTodoListEl = ({ index, description, completed }) => {
  const listItemClasses = [
    'todo__list-item',
    ...(completed ? ['todo__list-item--completed'] : []),
  ].join(' ');

  const li = document.createElement('li');

  li.id = `todo__list-item-${index}`;
  li.classList = listItemClasses;
  li.innerHTML = `
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
    <button class="button todo__drag-btn" type="button">
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </button>
    <button id="todo-remove-btn-${index}" class="button todo__remove-btn" type="button" data-index="${index}">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;

  return li;
};

class TodoDOM {
  static onCheckBoxChange

  static onInputChange

  static onRemoveItemClick

  constructor() {
    this.containerEl = document.querySelector('.todo__list');
    this.inputEl = document.querySelector('.todo__input');
    this.clearButtonEl = document.querySelector('.todo__clear-btn');
  }

  render(items) {
    this.containerEl.innerHTML = '';

    const todoList = items.sort((a, b) => a.index - b.index);

    todoList.forEach((todo) => {
      this.add(todo);
    });
  }

  add(item) {
    const todoListEl = generateTodoListEl(item);

    this.containerEl.appendChild(todoListEl);

    const { index } = item;
    const checkBoxEl = document.querySelector(`#todo-check-input-${index}`);
    const editInputEl = document.querySelector(`input#todo-edit-input-${index}`);
    const removeBtnEl = document.querySelector(`#todo-remove-btn-${index}`);

    checkBoxEl.addEventListener('change', this.onCheckBoxChange);
    editInputEl.addEventListener('change', this.onInputChange);
    removeBtnEl.addEventListener('click', this.onRemoveItemClick);
  }

  remove(index) {
    const todoListEl = this.containerEl.querySelector(`#todo__list-item-${index}`);

    todoListEl.remove();
  }

  on(event, callback) {
    if (event === 'enter') {
      this.inputEl.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          const newTodo = event.target.value;

          this.inputEl.value = '';

          callback(newTodo);
        }
      });
    } else if (event === 'clear-all') {
      this.clearButtonEl.addEventListener('click', () => {
        const checkboxEls = document.querySelectorAll('.todo__checkbox');
        const indexes = [...checkboxEls]
          .filter(({ checked }) => checked)
          .map(({ dataset }) => parseInt(dataset.index, 10));

        callback(indexes);
      });
    }
  }
}

export default TodoDOM;