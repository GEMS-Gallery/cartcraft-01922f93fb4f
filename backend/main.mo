import Bool "mo:base/Bool";
import List "mo:base/List";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor ShoppingList {
  // Define the structure of a shopping list item
  public type Item = {
    id: Nat;
    description: Text;
    completed: Bool;
  };

  // Store the shopping list items
  stable var items : [Item] = [];
  stable var nextId : Nat = 0;

  // Add a new item to the shopping list
  public func addItem(description : Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let newItem : Item = {
      id;
      description;
      completed = false;
    };
    items := Array.append(items, [newItem]);
    id
  };

  // Get all items in the shopping list
  public query func getItems() : async [Item] {
    items
  };

  // Update an item's completed status
  public func updateItem(id : Nat, completed : Bool) : async Bool {
    let updatedItems = Array.map<Item, Item>(items, func (item) {
      if (item.id == id) {
        {
          id = item.id;
          description = item.description;
          completed;
        }
      } else {
        item
      }
    });
    
    if (updatedItems != items) {
      items := updatedItems;
      true
    } else {
      false
    }
  };

  // Delete an item from the shopping list
  public func deleteItem(id : Nat) : async Bool {
    let remainingItems = Array.filter<Item>(items, func(item) {
      item.id != id
    });
    
    if (remainingItems.size() < items.size()) {
      items := remainingItems;
      true
    } else {
      false
    }
  };
}
