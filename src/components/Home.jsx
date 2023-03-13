import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addList } from "../slice/listReducer";
import ListCard from "./ListCard";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Home(props) {
  const [listName, setListName] = useState("");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => setUser(null);

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

  const handleInputValue = (event) => {
    event.preventDefault();
    setListName(event.target.value);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>ToBuy</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/settings" className="linkHome mx-2">
              Settings
            </Link>
            <Link to="/home" className="linkHome mx-2">
              Home
            </Link>
            {user && (
              <button onClick={handleLogout} to="/logout" className="logout mx-2">
                Logout
              </button>
            )}
          </Nav>
        </Container>
      </Navbar>
      <div className="main-container">
        <h1>Hacklist</h1>
        <button
          className="btn btn-primary m-1"
          onClick={() => {
            handleShow();
          }}
        >
          {" "}
          Add new List
        </button>
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
            <Modal.Title className="title">Title list</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-form">
              <form onSubmit={(e) => handleSaveList(e)}>
                <label htmlFor="title-list" id="title-list"></label>
                <input
                  className="input-modal"
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  placeholder="Type your title list.."
                />
              </form>
            </div>
            <div className="btn-modal">
              <Button variant="secondary" onClick={handleClose}>
                Back home
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleClose();
                  handleSaveList();
                }}
              >
                Add list
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Home;
