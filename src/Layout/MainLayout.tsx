import React from "react";
import SignUp from "../pages/SignUp";
import { Toaster } from "react-hot-toast";

const MainLayout: React.FC = () => {
  return (
    <div>
      <Toaster></Toaster>
      <SignUp></SignUp>
    </div>
  );
};

export default MainLayout;
