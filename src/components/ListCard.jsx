import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeList } from "../slice/listReducer";
import { useDispatch } from "react-redux";

function ListCard() {
  const lists = useSelector((state) => state.productList);
  const dispatch = useDispatch();

  const handleRemoveList = (listId) => {
    dispatch(removeList({ listId }));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="d-flex">
            <div className="col-8 mt-4 p-2 m-auto general-card">
              <div>
                {lists.map((list) => (
                  <>
                    <div key={list.id} className="link-header-card">
                      <Link
                        to={`/list/${list.id}`}
                        className="d-flex justify-content-between link-header-card p-3"
                      >
                        <h4 className="card-title">
                          <strong>{list.listName}</strong>
                        </h4>
                        <strong className="fs-5">
                          (
                          {
                            list.products.filter((product) => product.completed)
                              .length
                          }
                          /{list.products.length})
                        </strong>
                      </Link>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mt-4">
                      <p className="card-text fs-5">
                        Created At: {list.day}-{list.month + 1}-{list.year}{" "}
                      </p>
                      <div>
                        <i
                          className="bi bi-trash3 delete-list fs-4"
                          onClick={() => handleRemoveList(list.id)}
                        ></i>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListCard;
