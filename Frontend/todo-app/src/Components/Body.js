import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignup from "./LoginSignup";
import TODOPage from "./TODOPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../RTKFiles/userSlice";
import Protected from "./Protected";

const Body = () => {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <LoginSignup />,
    },
    {
      path: "/todo",
      element: (
        <Protected>
          <TODOPage />
        </Protected>
      ),
    },
  ]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName } = user;
        dispatch(addUser({ isLoading: false, data: { uid, displayName } }));
      } else {
        dispatch(removeUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
