import { createSlice, configureStore } from "@reduxjs/toolkit";

const intialExpenseState = { expenses: [] };

const expenseSlice = createSlice({
  name: "expense",
  initialState: intialExpenseState,
  reducers: {
    updateExpenses(state, action) {
      state.expenses = [action.payload, ...state.expenses];
    },
  },
});

const store = configureStore({
  reducer: { expense: expenseSlice.reducer },
});
export default store;
export const expenseActions = expenseSlice.actions;
