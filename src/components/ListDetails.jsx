import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addProduct, removeProduct, toggleProduct } from "../slice/listReducer";
const { v4: uuidv4 } = require("uuid");

function ListDetails() {
  const { id } = useParams();
  const products = useSelector((state) => state.productList);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const list = useSelector((state) =>
    state.productList.find((list) => list.id === id)
  );

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct({ productId, listId: list.id }));
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    dispatch(
      addProduct({
        productId: uuidv4(),
        name: inputValue,
        completed: false,
        listId: list.id,
      })
    );
    setInputValue("");
  };

  // const handleToggleProduct = (productId) => {
  //   dispatch(toggleProduct(productId));
  //   console.log(productId);
  // };

  const handleToggleProduct = (productId) => {
    dispatch(toggleProduct({productId, listId: id}))
  }

  return (
    <>
      <div className="container">
        <div className="p-4 shadow row mt-4 rounded bg-light">
          <div className="col-12">
            <Link to={"/home"}>
              <button className="btn btn-warning back-button">↼ Back</button>
            </Link>
            <h2 className="h2">{list.listName}</h2>
          </div>
          <form onSubmit={handleAddProduct}>
            <div className="form-add-product">
              <input
                type="text"
                onChange={(event) => setInputValue(event.target.value)}
                value={inputValue}
                className="inputText"
              />
              <button className="btn btn-outline-success button-add">
                Add
              </button>
            </div>
          </form>{" "}
          <div className="container">
            <div className="row">
              <ul className="list-group">
                {list.products.map((product) => (
                  <li key={product.id} className="li my-2">
                    <div className="details">
                      <div className="col-4 col1">
                        <input
                          type="checkbox"
                          className="checkbox"
                          onChange={() =>
                            handleToggleProduct(product.productId)
                          }
                          checked={product.completed}
                        />
                      </div>
                      <div className="col-4 col2">
                        <p
                        className="product"
                          style={{
                            textDecoration: product.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {product.name}
                        </p>
                      </div>
                      <div className="col-4 col3">
                        <i
                          className="bi bi-trash3 delete"
                          onClick={() => handleRemoveProduct(product.productId)}
                        ></i>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListDetails;
