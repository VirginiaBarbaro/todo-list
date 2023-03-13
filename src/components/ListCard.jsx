import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeList } from "../slice/listReducer";
import { useDispatch } from "react-redux";

function ListCard() {
  const lists = useSelector((state) => state.productList);
  //   const completedProducts = lists.products.filter((product) => product.completed)

  const dispatch = useDispatch();

  const handleRemoveList = (listId) => {
    dispatch(removeList({listId}));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {lists.map((list) => (
            <div key={list.id} className="p-4 shadow my-4 col-12 rounded bg-light">
              <Link to={`/list/${list.id}`} className="link-to-details">
                <div className="element col-8">
                  <div className="title-card col-8">
                    <h2 className="list-card-title">
                      {list.listName} (
                      {
                        list.products.filter((product) => product.completed)
                          .length
                      }
                      /{list.products.length})
                    </h2>
                    <small className="small-cardList">
                      Created At: {list.day}-{list.month + 1}-{list.year}{" "}
                    </small>
                  </div>
                  <p className="list-card-description"></p>
                </div>
              </Link>
              <i
                className="bi bi-trash3 delete"
                onClick={() => handleRemoveList(list.id)}
              ></i>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListCard;
