import React, { Component } from "react";
import Expense from "./Expense.js";

import "./expense.css";

class ExpenseList extends Component {
  state = {
    current_page: 1,
    items_per_page: 5,
  };

  // function allows a page to be selected when clicking
  pageSelector = (evt) => {
    this.setState({
      current_page: Number(evt.target.id),
    });
  };

  render() {
    let { current_page, items_per_page } = this.state;

    const last_item = current_page * items_per_page;
    const first_item = last_item - items_per_page;
    const current_expenses = this.props.expenses.slice(first_item, last_item);

    // displays items expenses to show in list for pagination
    const display_expenses = current_expenses.map((expense) => {
      return <Expense key={expense.id} expense={expense} />;
    });

    // creates page numbers for pagination
    const page_numbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.expenses.length / items_per_page);
      i++
    ) {
      page_numbers.push(i);
    }
    const display_page_numbers = page_numbers.map((number) => {
      return (
        <div key={number}>
          <ol key={number} id={number} onClick={this.pageSelector}>
            {number}
          </ol>
        </div>
      );
    });

    return (
      <div>
        <div style={{ height: "175px" }} className="list">
          {display_expenses}
          <div className="expense-list-numbers">{display_page_numbers}</div>
        </div>
      </div>
    );
  }
}
export default ExpenseList;
