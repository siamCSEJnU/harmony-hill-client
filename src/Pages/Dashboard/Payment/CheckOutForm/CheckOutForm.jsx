import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckOutForm.css";
const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
  };
  return (
    <div>
      <form className="bg-emerald-400 pt-7 rounded-xl px-10 w-2/3 mx-auto">
        <h2 className="text-center mb-16 pb-2 text-3xl font-bold text-blue-800 border-blue-700 border-b-4">
          Payment here
        </h2>
        <CardElement
          className=" card-element"
          options={{
            style: {
              base: {
                fontSize: "30px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                  backgroundColor: "white",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>
        <div className="text-center pt-7 pb-16">
          <button
            className="btn w-full bg-sky-500 text-xl border-sky-500 "
            onSubmit={handleSubmit}
            type="submit"
            disabled={!stripe}
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
