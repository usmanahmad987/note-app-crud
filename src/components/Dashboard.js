// src/components/Dashboard.js

import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { createItem, fetchItemsByUserId, updateItem, deleteItem } from "../services/crudService";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);

  useEffect(() => {
    if (currentUser) {
      loadItems();
    }
  }, [currentUser]);

  const loadItems = async () => {
    const userItems = await fetchItemsByUserId(currentUser.uid);
    setItems(userItems);
  };

  const handleCreateOrUpdate = async () => {
    if (isEditing) {
      await updateItem(currentItemId, { name: newItem, imageUrl: currentImageUrl }, newImage);
      setIsEditing(false);
      setCurrentItemId(null);
      setCurrentImageUrl(null);
    } else {
      await createItem(currentUser.uid, { name: newItem }, newImage);
    }

    setNewItem("");
    setNewImage(null);
    loadItems();
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentItemId(item.id);
    setNewItem(item.name);
    setCurrentImageUrl(item.imageUrl);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteItem(id);
      loadItems();
    }
  };

  return (
    <div>
      <h2>Welcome, {currentUser?.email}</h2>
      <button onClick={logout}>Logout</button>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
        />
        <input
          type="file"
          onChange={(e) => setNewImage(e.target.files[0])}
        />
        <button onClick={handleCreateOrUpdate}>
          {isEditing ? "Update Item" : "Add Item"}
        </button>
        {isEditing && <button onClick={() => {
          setIsEditing(false);
          setNewItem("");
          setNewImage(null);
          setCurrentItemId(null);
          setCurrentImageUrl(null);
        }}>Cancel Edit</button>}
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} width="50" />}
            {item.name}{" "}
            <button onClick={() => handleEdit(item)}>Edit</button>{" "}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
