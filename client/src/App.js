import { ToastContainer } from "react-toastify";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/User/Login/Login";
import SignUp from "./components/User/SignUp/SignUp";
import Profile from "./components/User/Profile/Profile";
import UserDetails from "./components/User/UserDetails/UserDetails";
import Greeting from "./components/User/Greeting";
import ForgotPassword from "./components/User/Login/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/User/Login/ResetPassword";
import ExpenseForm from "./components/Expenses/ExpenseForm/ExpenseForm";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/complete-profile",
    element: <Profile />,
  },
  {
    path: "/enter-details",
    element: <UserDetails />,
  },
  {
    path: "/verify-email/:id",
    element: <Greeting />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/user/resetPassword/:id",
    element: <ResetPassword />,
  },
  {
    path: "/expense-form",
    element: <ExpenseForm />,
  },
]);

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
