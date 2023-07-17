const Expense = require("../models/expenseModel");

exports.addExpense = async (req, res, next) => {
  try {
    const { id, money, description, category } = req.body;
    await Expense.create({
      id: id,
      money: money,
      description: description,
      category: category,
      userId: req.userId,
    });
    res.status(200).json({ message: "expense added" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "internal server error" });
  }
};

exports.fecthExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.userId } });
    if (!expenses) {
      throw new Error("login and try again");
    }
    res.status(200).json({ message: "successfull", expenses: expenses });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findByPk(id);
    await expense.destroy();
    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

exports.editExpense = async (req, res) => {
  try {
    const { money, description, category } = req.body;
    const id = req.params.id;
    await Expense.update(
      { money: money, description: description, category: category },
      { where: { id: id } }
    );
    const updatedExpense = await Expense.findByPk(id);
    res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
    console.log(updatedExpense);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
