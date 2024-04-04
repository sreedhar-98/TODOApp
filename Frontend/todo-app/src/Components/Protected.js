import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const location = useLocation();
  const user = useSelector((store) => store.user);

  if(!user.isLoading && !user.data) return <Navigate to="/" state={{from:location}} replace/>
  else if(user.isLoading) return <div>Loading....</div>;
  else return children;

};

export default Protected;