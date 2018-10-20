import React from "react";
import "./Layout.css";
import Navbar from "../Navigation/Navbar/Navbar";

const Layout = props => {
  return (
    <div>
      <Navbar />
      <main className="Content">
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
