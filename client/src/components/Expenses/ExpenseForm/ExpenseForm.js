import React, { useContext, useState } from "react";
import ExpenseContext from "../../../Store/ExpenseContext/expense-context";
import { v4 as uuidv4 } from "uuid";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  const expenseCtx = useContext(ExpenseContext);

  const [expenseData, setExpenseData] = useState({
    money: "",
    description: "",
    category: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");

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
    const newExpense = {
      ...expenseData,
      id: uuidv4(),
    };
    if (!isEdit) {
      expenseCtx.addExpense(newExpense);
    } else {
      expenseCtx.editExpense(expenseData, editId);
    }
    setExpenseData({ money: "", description: "", category: "" });
  };

  const deleteHandler = (expense) => {
    expenseCtx.deleteExpense(expense);
    setIsEdit(false);
  };

  const editHandler = (expense) => {
    setIsEdit(true);
    setEditId(expense.id);
    setExpenseData({
      money: expense.money,
      description: expense.description,
      category: expense.category,
    });
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
            value={expenseData.money}
            onChange={moneyHandler}
            required
          />

          <label htmlFor="description">Expense Description:</label>
          <input
            type="text"
            id="description"
            value={expenseData.description}
            onChange={descHandler}
            required
          />

          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={expenseData.category}
            onChange={categoryHandler}
            required
          >
            <option defaultValue="Select a category" value="">
              Select a category
            </option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Salary">Travel</option>
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
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {expenseCtx.expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.money}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteHandler(expense);
                    }}
                    className="delete-expense-button"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      editHandler(expense);
                    }}
                    className="edit-expense-button"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExpenseForm;
