// script.js - Handles user interaction and updates the UI

document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addBtn = document.getElementById('addBtn');
    const itemList = document.getElementById('itemList');

    // Function to render data from the database onto the HTML page
    function render() {
        const items = Database.getData();
        itemList.innerHTML = '';

        if (items.length === 0) {
            itemList.innerHTML = '<p class="text-slate-400 text-center py-4">No data in the database yet.</p>';
            return;
        }

        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center bg-slate-50 border border-slate-200 p-3 rounded-lg';
            
            const span = document.createElement('span');
            span.className = 'text-slate-700';
            span.textContent = item.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'text-red-500 hover:text-red-700 text-sm font-medium';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => {
                Database.deleteItem(item.id);
                render();
            };

            li.appendChild(span);
            li.appendChild(deleteBtn);
            itemList.appendChild(li);
        });
    }

    // Event listener for the Add button
    addBtn.addEventListener('click', () => {
        const text = itemInput.value.trim();
        if (text) {
            Database.addItem(text);
            itemInput.value = '';
            render();
        }
    });

    // Allow pressing "Enter" to add items
    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });

    // Initial render when page loads
    render();
});