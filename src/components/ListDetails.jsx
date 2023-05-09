import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addProduct, removeProduct, toggleProduct } from "../slice/listReducer";
import { Input } from "@chakra-ui/react";
const { v4: uuidv4 } = require("uuid");

function ListDetails() {
  const { id } = useParams();
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

  const handleToggleProduct = (productId) => {
    dispatch(toggleProduct({ productId, listId: id }));
  };

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="p-4 col-8 m-auto box-list-details">
            <div className="d-flex justify-content-around">
              <Link to={"/"}>
                <button className="btn-back">
                  <i className="bi bi-arrow-left"></i>Back
                </button>
              </Link>
              <h2 className="text-center mb-3 m-auto">{list.listName}</h2>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="form-add-product">
                <Input
                  variant="flushed"
                  placeholder="Type a task.."
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  type="text"
                  name="inputValue"
                  className="add-list-input"
                />
              </div>
            </form>{" "}
            <ul className="list-group">
              {list.products.map((product) => (
                <li key={product.id} className="li my-2">
                  <div className="details">
                    <div className="col-4 col1">
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={() => handleToggleProduct(product.productId)}
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
    </>
  );
}

export default ListDetails;
