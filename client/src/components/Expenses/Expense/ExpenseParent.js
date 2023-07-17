import ExpenseProvider from "../../../Store/ExpenseContext/ExpenseProvider";
import ExpenseForm from "../ExpenseForm/ExpenseForm";

const ExpenseParent = () => {
  return (
    <ExpenseProvider>
      <ExpenseForm />
    </ExpenseProvider>
  );
};
export default ExpenseParent;
