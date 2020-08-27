import React from "react";
import { Layout, Header, Navigation, Content, Footer } from "react-mdl";
import { Link } from "react-router-dom";
import "./App.css";
import "./Components/styles.css";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

import Display from "./Components/Display";
import AddCoupon from "./Components/AddCoupon";

// ReactModal.setAppElement("#root");

function App() {
  const [showModal, setShowModal] = useState(false);

  const header = () => {
    return (
      <Navigation>
        <Link
          onClick={() => {
            if (showModal === false) {
              console.log("Opening Modal");
              setShowModal(true);
            }
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle}  className= "fa-icon"/>
          Add a Coupon
        </Link>
      </Navigation>
    );
  };

  return (
    <div className="app-div">
      <Layout>
        <Header
          className="header-color"
          title={
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              CloudTek
            </Link>
          }
          scroll
        >
          {header()}
        </Header>
        <Content>
          <Display />
          <AddCoupon
            show={showModal}
            onHide={() => {
              setShowModal(false);
            }}
          />
        </Content>
        <Footer className="footer">
          <div className="footer-div">
            <p>© 2020 - Stripe Coupon API</p>
          </div>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
