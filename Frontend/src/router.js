import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./containers/App/App";
import Home from "./containers/Home/home";
import { connect } from "react-redux";

const PublicRoutes = ({ isLoggedIn }) => {
  return (
    <Router basename="">
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(PublicRoutes);
