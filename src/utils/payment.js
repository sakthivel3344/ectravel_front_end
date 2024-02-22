import { KEY_ID, SECRET_KEY } from "../constants/razorpayConstants";

export const handlePayment = (amount, callback) => {
  console.log("Entered ::");
  let options = {
    // key: "rzp_test_qLFdnexTR0pJ1k",
    // key_secret: "T7y1rzJLwBLVWfx0vyx1rF27",
    key: KEY_ID,
    key_secret: SECRET_KEY,
    amount: amount * 100,
    currency: "INR",
    name: "ECTravel",
    description: "Payment testing",
    handler: function (response) {
      callback(response);
    },
    prefill: {
      name: "Sakthivel",
      email: "asakthivel417@gmail.com",
      contact: "9344229677",
      // contact: formData.phoneNo,
    },
    notes: {
      address: "Razorpay Corporations",
    },
    theme: {
      color: "#00b894",
    },
  };
  try {
    let pay = new window.Razorpay(options);
    pay.open();
  } catch (error) {
    alert("ERROR WHILE OPENING PAYMENT GATEWAY");
  }
};
