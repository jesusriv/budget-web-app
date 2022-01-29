import http from '../../../http-common';

const CategoryService = {
    getAll: () => {
        return http.get("/api/v1/categories");
    },

    get: id => {
        return http.get("/api/v1/categories/" + id);
    },
    
    create: data => {
        return http.post("/api/v1/categories/add", data);
    },

    update: (id, data, field) => {
        return http.put("/api/v1/categories/" + id, { data, field })
    },

    delete: id => {
        return http.delete("/api/v1/categories/" + id);
    },

    transaction: (id, amount) => {
        return http.put(`/api/v1/categories/${id}/transaction`, { amount: amount });
    },

    transactionDelete: (id, amount) => {
        return http.put(`/api/v1/categories/${id}/transaction/delete`, { amount: amount});
    }
};

export default CategoryService;