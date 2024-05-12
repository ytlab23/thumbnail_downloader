import React, { useState, useEffect } from "react";
import Topbar from "../Topbar/Topbar";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";

const App = ({ channelDetail }) => {
  // useEffect(() => {
  //   getChannel();
  // }, []);
  return (
    <div className={`overflow-auto overflow-x-hidden bg-white text-black`}>
      <Topbar />
      <div className="pt-2">
        <Outlet />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // ...state.channel,
  };
};

const mapDispatchToProps = {
  // getChannel: getChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
