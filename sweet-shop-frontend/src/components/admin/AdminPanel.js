import React, { useState, useEffect } from 'react';
import sweetService from '../../services/sweetService';
import './AdminPanel.css';

function AdminPanel({ user }) {
    const [sweets, setSweets] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantityInStock: '',
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadSweets();
    }, []);

    const loadSweets = async () => {
        try {
            const data = await sweetService.getAllSweets();
            setSweets(data);
        } catch (err) {
            console.error('Failed to load sweets', err);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await sweetService.updateSweet(editingId, formData);
                alert('Sweet updated successfully!');
            } else {
                await sweetService.createSweet(formData);
                alert('Sweet added successfully!');
            }
            setFormData({ name: '', category: '', price: '', quantityInStock: '' });
            setEditingId(null);
            loadSweets();
        } catch (err) {
            alert('Operation failed: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleEdit = (sweet) => {
        setFormData({
            name: sweet.name,
            category: sweet.category,
            price: sweet.price,
            quantityInStock: sweet.quantityInStock,
        });
        setEditingId(sweet.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this sweet?')) {
            try {
                await sweetService.deleteSweet(id);
                alert('Sweet deleted successfully!');
                loadSweets();
            } catch (err) {
                alert('Delete failed: ' + (err.response?.data?.error || err.message));
            }
        }
    };

    const handleRestock = async (id) => {
        const quantity = prompt('Enter quantity to add:');
        if (quantity && !isNaN(quantity) && parseInt(quantity) > 0) {
            try {
                await sweetService.restockSweet(id, parseInt(quantity));
                alert('Restock successful!');
                loadSweets();
            } catch (err) {
                alert('Restock failed: ' + (err.response?.data?.error || err.message));
            }
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>

            <div className="admin-form">
                <h2>{editingId ? 'Edit Sweet' : 'Add New Sweet'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Sweet Name"
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        step="0.01"
                        required
                    />
                    <input
                        type="number"
                        name="quantityInStock"
                        value={formData.quantityInStock}
                        onChange={handleChange}
                        placeholder="Quantity"
                        required
                    />
                    <div className="form-buttons">
                        <button type="submit" className="btn-submit">
                            {editingId ? 'Update' : 'Add'} Sweet
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => {
                                    setEditingId(null);
                                    setFormData({ name: '', category: '', price: '', quantityInStock: '' });
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="sweets-table">
                <h2>All Sweets</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sweets.map((sweet) => (
                            <tr key={sweet.id}>
                                <td>{sweet.id}</td>
                                <td>{sweet.name}</td>
                                <td>{sweet.category}</td>
                                <td>${sweet.price.toFixed(2)}</td>
                                <td>{sweet.quantityInStock}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => handleEdit(sweet)}>
                                        Edit
                                    </button>
                                    <button className="btn-restock" onClick={() => handleRestock(sweet.id)}>
                                        Restock
                                    </button>
                                    <button className="btn-delete" onClick={() => handleDelete(sweet.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminPanel;
