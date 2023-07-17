import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpenseContext from "./expense-context";

const ExpenseProvider = (props) => {
  const notify = (message) => toast(message);
  const [expenses, setExpenses] = useState([]);

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
    setExpenses([expense, ...expenses]);
  };

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
    setExpenses((prevExpenses) => [
      ...fecthedResponse.expenses,
      ...prevExpenses,
    ]);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

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
      setExpenses(filteredExpense);
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
      setExpenses([fetchData.expense, ...filteredExpense]);
      console.log(filteredExpense);
    }
    notify(fetchData.message);
  };

  const expenseContext = {
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    editExpense: editExpense,
    expenses: expenses,
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
