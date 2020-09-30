import React, { Component } from "react";
import Axios from "axios";

import { MDBBtn, MDBInput } from "mdbreact";
import Modal from "../Modal/Modal.js";

class EditExpenseForm extends Component {
  state = {
    name: "",
    type: "",
    price: null,
    id: null,
    showModal: false,
  };

  show = () => {
    this.setState({
      showModal: true,
    });
  };
  hide = () => {
    this.setState({
      showModal: false,
    });
  };
  changeHandler = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  autofill = () => {
    const { id } = this.state;
    Axios.get(`http://localhost:3000/expenses/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.name);
        const { id, name, type, price } = res.data;
        this.setState({
          id,
          name,
          type,
          price,
        });
        console.log("this is state", this.state);
      })
      .catch((err) => {
        console.log("err, ", err);
      });
  };
  editExpense = () => {
    const { name, type, price, id } = this.state;
    const payload = { name, type, price, id };

    Axios.put("http://localhost:3000/expenses", payload)
      .then((response) => {
        this.props.updateExpenses(response.data);
      })
      .catch((err) => {
        console.log("err, ", err);
      });
  };

  deleteExpense = () => {
    const { id } = this.state;

    if (!id) {
      alert("please enter an id");
    } else {
      Axios.delete(`http://localhost:3000/expenses/${id}`)
        .then((res) => {
          window.location.reload(true);
        })
        .catch((err) => {
          console.log("err, ", err);
        });
    }
  };
  selectChangeHandler = (evt) => {
    evt.preventDefault();
    this.setState({
      type: evt.target.value,
    });
  };
  render() {
    return (
      <div>
        <div>
          <p>
            you can use this form to edit / delete{" "}
            <i
              class="fas fa-info-circle"
              onClick={this.show}
              onMouseEnter={this.show}
              onMouseLeave={this.hide}
            />{" "}
            your current expenses
          </p>
        </div>
        <form onSubmit={this.editExpense}>
          <div className="d-flex justify-content-between">
            <MDBInput
              label="Expense ID"
              type="number"
              name="id"
              value={this.state.id}
              onChange={this.changeHandler}
              style={{ width: "50%" }}
            />

            <span>
              <MDBBtn onClick={this.autofill}>find expense</MDBBtn>
            </span>
          </div>
          <MDBInput
            label="Expense Name"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.changeHandler}
          />
          <div>
            <select value={this.state.type} onChange={this.selectChangeHandler}>
              <option defaultValue="">Please select a type</option>
              <option value="Groceries">Groceries</option>
              <option value="Automotive">Automotve</option>
              <option value="Bills">Bills</option>
            </select>
          </div>
          <MDBInput
            label="Price"
            name="price"
            type="text"
            value={this.state.price}
            onChange={this.changeHandler}
          />
          <MDBBtn type="submit">Save Changes</MDBBtn>
          <MDBBtn onClick={this.deleteExpense}>Delete Expense</MDBBtn>
        </form>

        <Modal show={this.state.showModal} close={this.hide} />
      </div>
    );
  }
}

export default EditExpenseForm;
