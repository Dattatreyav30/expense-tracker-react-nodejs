import React from "react";

const ExpenseContext = React.createContext({
  addExpense: (item) => {},
  deleteExpense: (item) => {},
  editExpense : (item)=>{},
  expenses: [],
});

export default ExpenseContext;
