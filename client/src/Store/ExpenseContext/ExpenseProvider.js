import { useState } from "react";
import ExpenseContext from "./expense-context";

const ExpenseProvider = (props) => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };
  const deleteExpense = () => {};

  const expenseContext = {
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    expenses: expenses,
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
