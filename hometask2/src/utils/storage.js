import { v1 } from 'uuid';

class Storage {
  items = new Map();

  getItems(filterParams) {
      let results = [...this.items.values()];
      if (filterParams) {
          results = results.filter((item) => Object.entries(filterParams).some(([key, value]) => item[key] === value));
      }
      return results;
  }

  getItem(itemId, filterParams) {
      const item = this.items.get(itemId);
      if (!item || (filterParams && Object.entries(filterParams).some(([key, value]) => item[key] !== value))) {
          return null;
      }
      return this.items.get(itemId);
  }

  addItem(item) {
      const id = v1();
      this.items.set(id, { ...item, id });
      return { id };
  }

  updateItem(itemId, newItem, filterParams) {
      const item = this.items.get(itemId);
      if (!item || (filterParams && Object.entries(filterParams).some(([key, value]) => item[key] !== value))) {
          return null;
      }
      Object.entries(newItem).forEach(([key, value]) => {
          item[key] = value;
      });
      return item;
  }

  deleteItem(itemId) {
      const item = this.items.get(itemId);
      if (!item) {
          return false;
      }
      item.isDeleted = true;
      return true;
  }
}

export default new Storage();
