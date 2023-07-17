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
module.exports = router;
