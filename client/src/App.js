import { ToastContainer } from "react-toastify";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/User/Login/Login";
import SignUp from "./components/User/SignUp/SignUp";
import Profile from "./components/User/Profile/Profile";
import UserDetails from "./components/User/UserDetails/UserDetails";
import Greeting from "./components/User/Greeting";

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
