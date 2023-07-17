const express = require("express");

const router = express.Router();

const authrizattion = require("../middleware/authrizattion");
const expenseController = require("../controllers/expenseController");

router.post(
  "/add-expense",
  authrizattion.authrozation,
  expenseController.addExpense
);

router.get(
  "/fetch-expenses",
  authrizattion.authrozation,
  expenseController.fecthExpenses
);

router.delete(
  "/delete-expense/:id",
  authrizattion.authrozation,
  expenseController.deleteExpense
);

router.put(
  "/edit-expense/:id",
  authrizattion.authrozation,
  expenseController.editExpense
);
module.exports = router;
