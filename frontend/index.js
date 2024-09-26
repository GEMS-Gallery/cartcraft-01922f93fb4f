import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const shoppingList = document.getElementById('shopping-list');
  const addItemForm = document.getElementById('add-item-form');
  const newItemInput = document.getElementById('new-item');

  // Function to render the shopping list
  async function renderShoppingList() {
    const items = await backend.getItems();
    shoppingList.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="${item.completed ? 'completed' : ''}">${item.description}</span>
        <button class="toggle-btn"><i class="fas fa-check"></i></button>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
      `;
      li.dataset.id = item.id;
      shoppingList.appendChild(li);
    });
  }

  // Add a new item
  addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = newItemInput.value.trim();
    if (description) {
      await backend.addItem(description);
      newItemInput.value = '';
      await renderShoppingList();
    }
  });

  // Toggle item completion
  shoppingList.addEventListener('click', async (e) => {
    if (e.target.closest('.toggle-btn')) {
      const li = e.target.closest('li');
      const id = parseInt(li.dataset.id);
      const completed = !li.querySelector('span').classList.contains('completed');
      await backend.updateItem(id, completed);
      await renderShoppingList();
    }
  });

  // Delete item
  shoppingList.addEventListener('click', async (e) => {
    if (e.target.closest('.delete-btn')) {
      const li = e.target.closest('li');
      const id = parseInt(li.dataset.id);
      await backend.deleteItem(id);
      await renderShoppingList();
    }
  });

  // Initial render
  await renderShoppingList();
});
