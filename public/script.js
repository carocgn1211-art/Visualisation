const STORAGE_KEY = 'vercel-todo-list';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const tasksLeft = document.getElementById('tasks-left');
const tasksDone = document.getElementById('tasks-done');
const clearCompletedButton = document.getElementById('clear-completed');
const filterButtons = Array.from(document.querySelectorAll('.filter'));
const emptyStateTemplate = document.getElementById('empty-state-template');

let todos = loadTodos();
let currentFilter = 'all';

function loadTodos() {
  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [
      {
        id: crypto.randomUUID(),
        text: 'Créer ma première tâche',
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        text: 'Déployer cette app sur Vercel',
        completed: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

function getFilteredTodos() {
  switch (currentFilter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

function updateStats() {
  const done = todos.filter((todo) => todo.completed).length;
  tasksDone.textContent = String(done);
  tasksLeft.textContent = String(todos.length - done);
}

function createTodoElement(todo) {
  const item = document.createElement('li');
  item.className = `todo-item${todo.completed ? ' completed' : ''}`;
  item.dataset.id = todo.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-checkbox';
  checkbox.checked = todo.completed;
  checkbox.setAttribute('aria-label', `Marquer \"${todo.text}\" comme terminée`);
  checkbox.addEventListener('change', () => {
    todos = todos.map((entry) =>
      entry.id === todo.id ? { ...entry, completed: checkbox.checked } : entry,
    );
    saveTodos();
    render();
  });

  const content = document.createElement('div');
  content.className = 'todo-content';

  const title = document.createElement('p');
  title.className = 'todo-title';
  title.textContent = todo.text;

  const meta = document.createElement('p');
  meta.className = 'todo-meta';
  meta.textContent = `Créée le ${formatDate(todo.createdAt)}`;

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = 'Supprimer';
  deleteButton.setAttribute('aria-label', `Supprimer la tâche \"${todo.text}\"`);
  deleteButton.addEventListener('click', () => {
    todos = todos.filter((entry) => entry.id !== todo.id);
    saveTodos();
    render();
  });

  content.append(title, meta);
  item.append(checkbox, content, deleteButton);
  return item;
}

function render() {
  list.innerHTML = '';
  const visibleTodos = getFilteredTodos();

  if (visibleTodos.length === 0) {
    const emptyState = emptyStateTemplate.content.firstElementChild.cloneNode(true);
    list.append(emptyState);
  } else {
    visibleTodos.forEach((todo) => {
      list.append(createTodoElement(todo));
    });
  }

  filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === currentFilter);
  });

  clearCompletedButton.disabled = !todos.some((todo) => todo.completed);
  updateStats();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  todos = [
    {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    },
    ...todos,
  ];

  input.value = '';
  saveTodos();
  render();
  input.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter || 'all';
    render();
  });
});

clearCompletedButton.addEventListener('click', () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  render();
});

render();
