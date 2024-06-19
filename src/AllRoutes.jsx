import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import BuyPremiumPage from "./components/payment/BuyPremiumPage";
import CreateTest from "./components/CreateTest";
import AllTestDetails from "./components/AllTestDetails";
import AddQuestions from "./components/AddQuestions";
import Success from "./components/payment/Success";
import Failure from "./components/payment/Failure";
import GiveTest from "./components/GiveTest";
import StartTest from "./components/StartTest";
import AllTests from "./components/AllTests";
import ContactUs from "./components/ContactUs";
import AllPayments from "./components/AllPayments";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/buyPremium" element={<BuyPremiumPage />} />
      <Route path="/createTest" element={<CreateTest />} />
      <Route path="/viewAllTest" element={<AllTestDetails />} />
      <Route path="/addQuestion" element={<AddQuestions />} />
      <Route path="/paymentsuccess" element={<Success />} />
      <Route exact path="/cancel" element={<Failure />} />
      <Route exact path="/giveTest" element={<GiveTest />} />
      <Route exact path="/startTest" element={<StartTest />} />
      <Route exact path="/allTests" element={<AllTests />} />
      <Route exact path="/customer-support" element={<ContactUs />} />
      <Route exact path="/AllPayments" element={<AllPayments />} />
    </Routes>
  );
};

export default AllRoutes;
