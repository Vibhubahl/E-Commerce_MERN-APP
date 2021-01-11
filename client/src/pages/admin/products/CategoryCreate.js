import React from 'react';
import AdminNav from '../../../components/nav/adminNav.js'
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {createProduct,getProducts,removeProduct} from '../../../functions/product.js'

const CategoryCreate = () => {

    const {user} = useSelector((state) => ({...state}));
    const [cat,setCat] = React.useState("");
    const [cate,setCate] = React.useState([]);

    const categoryForm = () => {
        return(
            <div>
                <form onSubmit={handleSubmit} className="form">
                     <div className="form-group">
                        <label for="email">Category</label>
                        <input name="category" type="text" className="form-control" value={cat} onChange={(e)=>setCat(e.target.value)} autoFocus required></input>
                    </div>
                    <button type="submit" className="btn btn-outline-primary">Create</button>
                </form>
                <button onClick={deleteCat} className="btn btn-outline-primary">Delete</button>
            </div>
        )};

        const handleSubmit = (e) => {
            e.preventDefault();
            createProduct({cat}, user.token)
            .then(res=>{
                getProducts().then((c) => {
                    setCate(c.data)
                });
                setCat("");
                toast.success(`"${res.data.name}" Created`);
            })
            .catch((err)=>{
                if(err.response.status===400){
                    toast.error(err.response.data);
                }
            })
        }

        const deleteCat = () => {
            getProducts().then((c) => {
                setCate(c.data)
            });
        }

        const handleDelete = (slug) =>{
            removeProduct(slug);
        }

        const handleEdit = () =>{
            
        }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNav></AdminNav>
                </div>
                <div className="col-1"></div>
                <div className="col-6 p-5">
                    <h4>Create Category</h4>
                    {categoryForm()}
                    <hr></hr>
                    {cate.map((c)=>(<div className="alert alert-primary">{c.name}
                    <span className="btn btn-dander float-right" onClick={handleDelete(c.slug)}>Delete</span>
                    <span className="btn btn-dander float-right" onClick={handleEdit(c.slug)}>Edit</span>
                    </div>))}
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate;