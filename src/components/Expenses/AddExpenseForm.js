import React, { Component } from "react";
import Axios from "axios";

import { MDBBtn, MDBInput } from "mdbreact";

class AddExpenseForm extends Component {
  state = {
    name: "",
    type: "",
    price: null,
    error: null,
  };
  changeHandler = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  addExpense = (evt) => {
    const { name, type, price } = this.state;
    const payload = { name, type, price };

    if (type === "") {
      alert("please select a type to continue");
      return;
    } else {
      Axios.post("http://localhost:3000/expenses", payload)
        .then((response) => {
          this.setState({
            error: null,
          });
          this.props.updateExpenses(response.data);
        })
        .catch((err) => {
          console.log("this is err", err);
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
          <p>use this form to add a new expense to the list</p>
        </div>
        <form onSubmit={this.addExpense}>
          <MDBInput
            label="Expense Name"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.changeHandler}
            required
          />
          <div>
            <select
              value={this.state.type}
              onChange={this.selectChangeHandler}
              required
            >
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
            required
          />
          <MDBBtn type="submit">Add Expense</MDBBtn>
        </form>
      </div>
    );
  }
}

export default AddExpenseForm;
