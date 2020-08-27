import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useAlert } from "react-alert";
import "./styles.css";

function AddCoupon(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("percent");
  const [duration, setDuration] = useState("once");
  const [amount_off, setAmountOff] = useState(10);
  const [show, setShow] = useState(true);

  const alert = useAlert();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    console.log("Name: " + name);
    console.log("Type: " + type);
    console.log("Duration: " + duration);
    console.log("Amount: " + amount_off);

    data.append("name", name);
    data.append("duration", duration);
    data.append("type", type);
    if (type === "percent") {
      data.append("per_off", amount_off);
    } else {
      data.append("amount_off", amount_off);
    }

    console.log(data);

    axios
      .post("https://stripe-express-cloudtek.herokuapp.com/coupons", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 1) {
          alert.show("Coupon Added Successfully");
        }
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Add Coupon</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-div">
          <Form>
            <div className="form-group input-div">
              <label for="coupon-name">Coupon Name</label>
              <input
                type="text"
                name="coupon-name"
                id="coupon-name"
                className="form-control input-item"
                onChange={(evt) => {
                  setName(evt.target.value);
                }}
              />
            </div>

            <div className="form-group input-div">
              <label for="amount-off">Amount Off</label>
              <input
                type="number"
                name="amount-off"
                id="amount-off"
                className="input-item form-control"
                onChange={(evt) => {
                  setAmountOff(evt.target.value);
                }}
              />
            </div>

            <div className="form-group input-div">
              <label for="coupon-type">Coupon Type</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  onSelect={() => {
                    setType("percent");
                  }}
                />
                <label className="form-check-label" for="inlineRadio1">
                  Percent Off
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  onSelect={() => {
                    setType("amount");
                  }}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Amount Off
                </label>
              </div>
            </div>

            <div className="form-group input-div">
              <label for="coupon-duration">Coupon Duration</label>
              <select
                className="input-item form-control"
                name="coupon-duration"
                id="coupon-duration"
              >
                <option
                  selected
                  onSelect={() => {
                    setDuration("once");
                  }}
                >
                  Once
                </option>
                <option
                  onSelect={() => {
                    setDuration("repeating");
                  }}
                >
                  Monthly
                </option>
                <option
                  onSelect={() => {
                    setDuration("forever");
                  }}
                >
                  Forever
                </option>
              </select>
            </div>

            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.onHide();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCoupon;
