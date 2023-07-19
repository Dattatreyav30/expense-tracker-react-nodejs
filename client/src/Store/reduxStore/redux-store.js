import { createSlice, configureStore } from "@reduxjs/toolkit";

const intialExpenseState = { expenses: [] };
const intialAuthState = {
  isLoggedIn: false,
  activatePremium: false,
  isPremiumUser: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: intialExpenseState,
  reducers: {
    updateExpenses(state, action) {
      state.expenses = [action.payload, ...state.expenses];
    },
    fetcExpenses(state, action) {
      state.expenses = [...action.payload, ...state.expenses];
    },
    deleteExpense(state, action) {
      state.expenses = [...action.payload];
    },
    editExpense(state, action) {
      const { editedExpense, filteredArr } = action.payload;
      state.expenses = [editedExpense, ...filteredArr];
    },
    resetExpense(state) {
      state.expenses = [];
    },
  },
});

const authSlice = createSlice({
  name: "auth",
  initialState: intialAuthState,
  reducers: {
    isLogin(state) {
      state.isLoggedIn = true;
    },
    isPremium(state) {
      state.activatePremium = true;
    },
    isPremiumUser(state) {
      state.isPremiumUser = true;
    },
  },
});

const store = configureStore({
  reducer: { expense: expenseSlice.reducer, auth: authSlice.reducer },
});
export default store;
export const expenseActions = expenseSlice.actions;
export const authActions = authSlice.actions;
