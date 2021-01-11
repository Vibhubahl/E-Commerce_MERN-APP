import axios from 'axios';

export const getProducts = async () =>{
    return await axios.get('http://localhost:4000/products');
}

export const getProduct = async (slug) =>{
    return await axios.get(`http://localhost:4000/product/${slug}`);
}

export const removeProduct = async (slug,authtoken) =>{
    return await axios.delete(`http://localhost:4000/product/${slug}`, {
        headers:{
            authtoken,
        }
    });
}

export const updateProduct = async (slug,product,authtoken) =>{
    return await axios.put(`http://localhost:4000/product/${slug}`, {
        headers:{
            authtoken,
        }
    });
}

export const createProduct = async (product,authtoken) =>{
    return await axios.post(`http://localhost:4000/product`, product, {
        headers:{
            authtoken,
        }
    });
}