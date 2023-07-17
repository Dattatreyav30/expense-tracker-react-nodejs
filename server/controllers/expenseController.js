const Expense = require("../models/expenseModel");

exports.addExpense = async (req, res, next) => {
  try {
    const { money, description, category } = req.body;
    await Expense.create({
      money: money,
      description: description,
      category: category,
      userId: req.userId,
    });
    res.status(200).json({ message: "expense added" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

exports.fecthExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.userId } });
    if (!expenses) {
      throw new Error("login and try again");
    }
    console.log(expenses)
    res.status(200).json({ message: "successfull", expenses: expenses });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err)
  }
};
