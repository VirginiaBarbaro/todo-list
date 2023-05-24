import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addList } from "../slice/listReducer";
import ListCard from "./ListCard";
import Modal from "react-bootstrap/Modal";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

function Home(props) {
  const [listName, setListName] = useState("");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveList = (e) => {
    e.preventDefault();
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    dispatch(
      addList({ listName, day, month, year, products: [], completed: false })
    );
    setListName("");
    handleClose();
  };

  return (
    <>
      <div>
        <div className="row row-flex-general">
          <div className="col-6 col-left-img">
            <img className="hero-image"></img>
          </div>
          <h1 className="hero-title">Welcome to hacklist</h1>
          <div className="col-6 col-right">
            <div className="mt-4 text-center">
              <Button
                className="btn-add-list fs-4"
                variant="ghost"
                onClick={() => {
                  handleShow();
                }}
              >
                <i className="bi bi-file-earmark-plus me-2"></i> Add new List
              </Button>
            </div>
          </div>
        </div>
        <ListCard />
        <Modal
          show={show}
          onHide={handleClose}
          className="modal-container"
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Title list</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div className="modal-form">
              <form onSubmit={(e) => handleSaveList(e)}>
                <label htmlFor="title-list" id="title-list"></label>
                <Input
                  variant="flushed"
                  placeholder="Type your title list.."
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  type="text"
                  name="listName"
                  className="add-list-input"
                />

                <div className="btn-modal">
                  <Button
                    className="btn-back-modal"
                    variant="ghost"
                    onClick={handleClose}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back home
                  </Button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Home;
