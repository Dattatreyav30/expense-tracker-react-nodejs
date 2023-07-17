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

  useEffect(() => {
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
      setExpenses((prevExpenses) => [...fecthedResponse.expenses, ...prevExpenses]);
      console.log(expenses)
    };
    fetchExpenses();
  }, []);
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
