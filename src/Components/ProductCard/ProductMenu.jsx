import React, { useState } from "react";
import { products } from "./Products";
import './productMenu.css';


const ProductMenu = ({ handleAdd }) => { //Accept handleAdd here
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...new Set(products.map((product) => product.category))];

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter((item) => item.category === selectedCategory);

    return (
        <>

            <div className="category-buttons">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={selectedCategory === cat ? "active" : ""}
                    >
                        {cat}
                    </button>
                ))}
            </div>


            <div className="productmenu-container">
                {filteredProducts.map((item) => (
                    <div key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <div className="price-btn">
                            <p className="price">${item.price}</p>
                            <button className="btn" onClick={() => handleAdd(item)}>+ Add</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductMenu;
