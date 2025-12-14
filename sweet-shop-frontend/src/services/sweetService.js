import api from './api';

const sweetService = {
    getAllSweets: async () => {
        const response = await api.get('/sweets');
        return response.data;
    },

    getSweetById: async (id) => {
        const response = await api.get(`/sweets/${id}`);
        return response.data;
    },

    createSweet: async (sweetData) => {
        const response = await api.post('/sweets', sweetData);
        return response.data;
    },

    updateSweet: async (id, sweetData) => {
        const response = await api.put(`/sweets/${id}`, sweetData);
        return response.data;
    },

    deleteSweet: async (id) => {
        const response = await api.delete(`/sweets/${id}`);
        return response.data;
    },

    searchSweets: async (params) => {
        const query = new URLSearchParams(params).toString();
        const response = await api.get(`/sweets/search?${query}`);
        return response.data;
    },

    purchaseSweet: async (id, quantity) => {
        const response = await api.post(`/sweets/${id}/purchase`, { quantity });
        return response.data;
    },

    restockSweet: async (id, quantity) => {
        const response = await api.post(`/sweets/${id}/restock`, { quantity });
        return response.data;
    },
};

export default sweetService;
