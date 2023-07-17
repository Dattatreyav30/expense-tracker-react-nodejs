import React, { useContext, useState } from "react";
import ExpenseContext from "../../../Store/ExpenseContext/expense-context";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  const expenseCtx = useContext(ExpenseContext);

  const [expenseData, setExpenseData] = useState({
    money: "",
    description: "",
    category: "",
  });

  const moneyHandler = (e) => {
    setExpenseData({ ...expenseData, money: e.target.value });
  };

  const descHandler = (e) => {
    setExpenseData({ ...expenseData, description: e.target.value });
  };

  const categoryHandler = (e) => {
    setExpenseData({ ...expenseData, category: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    expenseCtx.addExpense(expenseData);
    console.log(expenseCtx.expenses);
  };
  return (
    <>
      <div className="container">
        <h1>Expense Form</h1>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="money">Money Spent:</label>
          <input
            type="number"
            id="money"
            // value={}
            onChange={moneyHandler}
            required
          />

          <label htmlFor="description">Expense Description:</label>
          <input
            type="text"
            id="description"
            // value={description}
            onChange={descHandler}
            required
          />

          <label htmlFor="category">Category:</label>
          <select
            id="category"
            // value={}
            onChange={categoryHandler}
            required
          >
            <option defaultValue="Select a category" value="">
              Select a category
            </option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Money Spent</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {expenseCtx.expenses.map((expense) => (
              <tr key={Math.random()}>
                <td>{expense.money}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExpenseForm;
