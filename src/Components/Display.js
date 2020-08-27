import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useAlert } from "react-alert";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPercent,
  faReply,
  faCalendarAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

function Display() {
  const [coupons, setCoupons] = useState([]);

  const alert = useAlert();

  const couponList = () => {
    return coupons.map((coupon, index) => {
      const {
        id,
        amount_off,
        created,
        currency,
        duration,
        duration_in_months,
        name,
        percent_off,
        valid,
        times_redeemed,
      } = coupon;
      return (
        <div className="singleCoupon row" key={id}>
          <div className="col-6 col-md-9">
            <h3 className="coupon-name">
              <b>{name != null ? name : percent_off + " % Off"}</b>
            </h3>
            <hr></hr>
            <p className="percent-off">
              <FontAwesomeIcon icon={faPercent} className="fa-icon" />
              Percent Off: {percent_off}
            </p>
            <p className="duration">
              <FontAwesomeIcon icon={faReply} className="fa-icon" />
              Repeating: {duration}
            </p>
            <p className="created-on">
              <FontAwesomeIcon icon={faCalendarAlt} className="fa-icon" />
              Created On: {new Date(created * 1000).toLocaleString()}
            </p>
          </div>
          <div className="delete-div col-6 col-md-3">
            <Button
              onClick={() => {
                deleteCoupon(id);
              }}
              variant="danger"
              id="delete-button"
            >
              Delete
            </Button>
          </div>
        </div>
      );
    });
  };

  const deleteCoupon = (id) => {
    var data = new FormData();

    data.append("id", id);

    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    Axios.delete("https://stripe-express-cloudtek.herokuapp.com/coupons/" + id)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 1) {
          alert.show("Coupon Deleted Successfully");
        }
      })
      .catch((error) => {
        alert.show("Some Error Occured. Coupon not Deleted");
        console.log(error);
      });
  };

  useEffect(() => {
    Axios.get("https://stripe-express-cloudtek.herokuapp.com/coupons/")
      .then((response) => {
        setCoupons(response.data.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return <div className="container main-display-div">{couponList()}</div>;
}

export default Display;
