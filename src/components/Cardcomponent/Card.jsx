import React from "react";
import "./Card.css";
import { MdAddShoppingCart } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const Card = ({ img, price, name, category, onAdd, quantity, onRemove }) => {
  return (
    <div className="card">
      <div className="img-product">
        <img src={img} alt={name} />
        {quantity === 0 ? (
          <button className="add-cart" onClick={onAdd}>
            <MdAddShoppingCart className="cart-shop" /> Add To Cart
          </button>
        ) : (
          <div className=" btn-quantity">
            <CiCircleMinus className="remove" onClick={onRemove} />
            <span className="quantity">{quantity}</span>
            <CiCirclePlus className="plus" onClick={onAdd} />
          </div>
        )}
      </div>
      <div className="detalis">
        <p className="category">{category}</p>
        <p className="name">{name}</p>
        <p className="price">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Card;
