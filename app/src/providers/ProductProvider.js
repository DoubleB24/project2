import { API_POST } from "../api";

export const ProductProvider = {
    createProduct: async (productName, productTypeId, price, stock) => {
        let json = await API_POST("product/add", {
            product_name: productName,
            product_type_id: productTypeId,
            price: price,
            stock: stock
        });

        return json;
    },

    updateProduct: async (productId, productName,productTypeId, price, stock) => {
        let json = await API_POST("product/update", {
            product_id: productId,
            product_name: productName,
            product_type_id: productTypeId,
            price: price,
            stock: stock
        });

        return json;
    },

    deleteProduct: async (productId) => {
        let json = await API_POST("product/delete", {
            product_id: productId
        });

        return json;
    }
}