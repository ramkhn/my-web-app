// database.js - Handles data storage and retrieval
const Database = {
    // Fetch all records from the database
    getData() {
        const data = localStorage.getItem('app_database');
        return data ? JSON.parse(data) : [];
    },

    // Save a new record to the database
    saveData(items) {
        localStorage.setItem('app_database', JSON.stringify(items));
    },

    // Add a single item
    addItem(itemText) {
        const items = this.getData();
        items.push({ id: Date.now(), text: itemText });
        this.saveData(items);
        return items;
    },

    // Delete an item by ID
    deleteItem(id) {
        let items = this.getData();
        items = items.filter(item => item.id !== id);
        this.saveData(items);
        return items;
    }
};