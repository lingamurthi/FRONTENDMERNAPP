import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, getProduct, updateProduct, getCategory, updatecategory } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper";

const UpdateCategory = ({ match }) => {
    const { user, token } = isAutheticated();

    const [values, setValues] = useState({
        name: ""
    });
   

    const { name } = values;


  
    const preload = (categoryId) => {

        console.log("MY CATEGORY", categoryId);
        getCategory(categoryId).then((data) => {
            console.log("MY CATEGORY DATA",data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    
                    
            
                });
            
            }
        });
    };

  

    useEffect(() => {
        preload(match.params.categoryId);
    }, []);

    const onSubmit = event => {
        event.preventDefault();
        console.log("BEFORE UPDATE" ,values);
        console.log(JSON.stringify(values));
        updatecategory(match.params.categoryId, user._id, token,JSON.stringify(values)).then(
            data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
             console.log("UPDATED CATEGORY DATA", data);
                setValues({
                    ...values,
                    name: ""
                });

                console.log("DATA IS",data);
            }
        });
    };

    const handleChange = name => event => {
        const value = event.target.value;
        setValues({ ...values, [name]: value });
    };

    const successMessage=()=>(
        <div
        className="alert alert-success mt-3"
        style={{ display: values.name ? "" : "none" }}
      >
        <h4>{values.name} updated successfully</h4>
      </div>
    )

    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter the Category</p>
                {console.log(values.name)}
                <input type="text" className="form-control mb-3" onChange={handleChange("name")} name="name" value={name} autoFocus required />
                
            </div>
            <button className="btn btn-outline-info" onClick={onSubmit}>
                    Update Category
                </button>
        </form>
    );

  

    return (
        <Base title="Create a Category Here" description="Add a new category for new T-Shirts" className="container bg-info p-4">
            <Link to="/admin/dashboard" className="btn btn-md bg-danger mb-3">
                Admin Home
            </Link>
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                {successMessage()}
                {myCategoryForm()}
               </div>
            </div>
        </Base>
    );
};

export default UpdateCategory;
