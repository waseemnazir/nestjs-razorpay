/*
This a test script to test the end to end flow of payment from client(react).

- Create a react new react app and add this code to app.js 
- Add razorPayKey from your razorpay dashboaed.
- Run react app and make test transaction
*/

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const createOrderUrl = "http://localhost:5000/api/v1/razorpay/orders";
  const verfifyTransactionUrl =
    "http://localhost:5000/api/v1/razorpay/payments/verify";

  const razorPayKey = "YOUR_RAZORPAY_KEY";

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const requestBody = {
      amount: 500,
      currency: "INR",
    };

    const result = await axios.post(`${createOrderUrl}`, requestBody);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data.data;
    const options = {
      key: `${razorPayKey}`,
      amount: amount.toString(),
      currency: currency,
      name: "devwaseem.com",
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        const result = await axios.post(`${verfifyTransactionUrl}`, data);

        alert(result.data.message);
      },
      prefill: {
        name: "Waseem Nazir",
        email: "waseem@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Srinagar , J&K",
      },
      theme: {
        color: "#61dabf",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Buy React now!</p>
        <button className="App-link" onClick={displayRazorpay}>
          Pay ₹500
        </button>
      </header>
    </div>
  );
}

export default App;
