import React, { Component } from "react";
import "./expense.css";
class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    return (
      <div
        style={{
          // border: "1px solid black",
          // borderBottom: "1px solid black",
          // borderRight: "1px solid black",
          // width: "47%",
          width: "100%",
          paddingLeft: "1%",
        }}
        className="expense"
      >
        ID: {this.props.expense.id}, Expense Name: {this.props.expense.name},
        Expense Type: {this.props.expense.type}, Price:{" "}
        {this.props.expense.price}
      </div>
    );
  }
}

export default Expense;
