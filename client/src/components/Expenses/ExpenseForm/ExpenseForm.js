import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  expenseActions,
  authActions,
} from "../../../Store/reduxStore/redux-store";

import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import "./ExpenseForm.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../UI/Button";

const ExpenseForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = (message) => toast(message);
  const expenses = useSelector((state) => state.expense.expenses);
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const isPremium = useSelector((state) => state.auth.activatePremium);
  const isPremiumUser = useSelector((state) => state.auth.isPremiumUser);

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
      addExpense(newExpense);
    } else {
      editExpense(expenseData, editId);
    }
    setExpenseData({ money: "", description: "", category: "" });
  };

  const deleteHandler = (expense) => {
    deleteExpense(expense);
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

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
    dispatch(expenseActions.resetExpense());
  };

  useEffect(() => {
    fetchExpenses();
    dispatch(authActions.isLogin());
  }, []);

  const fetchExpenses = async () => {
    const response = await fetch(
      "http://localhost:5000/expenses/fetch-expenses",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    const fecthedResponse = await response.json();
    dispatch(expenseActions.fetcExpenses(fecthedResponse.expenses));
  };

  const addExpense = async (expense) => {
    const response = await fetch("http://localhost:5000/expenses/add-expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(expense),
    });

    const fetchData = await response.json();

    notify(fetchData.message);
    dispatch(expenseActions.updateExpenses(expense));
  };

  const deleteExpense = async (expense) => {
    const response = await fetch(
      `http://localhost:5000/expenses/delete-expense/${expense.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    const fecthedResponse = await response.json();
    if (response.ok) {
      const filteredExpense = expenses.filter((item) => item.id !== expense.id);
      dispatch(expenseActions.deleteExpense(filteredExpense));
    }
    notify(fecthedResponse.message);
  };

  const editExpense = async (expense, id) => {
    const response = await fetch(
      `http://localhost:5000/expenses/edit-expense/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(expense),
      }
    );
    const fetchData = await response.json();
    console.log(fetchData);
    if (response.ok) {
      const filteredExpense = expenses.filter((item) => {
        return item.id !== id;
      });
      dispatch(
        expenseActions.editExpense({
          editedExpense: fetchData.expense,
          filteredArr: filteredExpense,
        })
      );
    }
    notify(fetchData.message);
  };

  useEffect(() => {
    const totalAmount = expenses.reduce((acc, ele) => {
      acc = acc + ele.money;
      return acc;
    }, 0);
    if (totalAmount >= 10000) {
      dispatch(authActions.isPremium());
    }
    console.log(totalAmount);
  }, [expenses, dispatch]);

  const premiumHandler = async () => {
    dispatch(authActions.isPremiumUser());
  };

  const downloadHandler = async () => {
    const data = JSON.stringify(expenses);
    const link = document.getElementById("expense-downloader");
    const blob = new Blob([data], { type: "text/plain" });
    link.href = URL.createObjectURL(blob);
  };
  return (
    <>
      {isLogin && (
        <div>
          <header className="expense-header">
            <h1>Expense Tracker</h1>
            <button onClick={logoutHandler}>Log Out</button>
            {isPremium && (
              <Button onClick={premiumHandler} value="Buy premium" />
            )}
            {isPremiumUser && (
              <a
                download="myfile.txt"
                onClick={downloadHandler}
                id="expense-downloader"
                className="downloadexpense"
              >
                Download Expenses
              </a>
            )}
          </header>
          <div className="container">
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
                {expenses.map((expense) => (
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
        </div>
      )}
    </>
  );
};

export default ExpenseForm;
