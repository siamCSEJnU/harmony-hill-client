import { Helmet } from "react-helmet-async";
import SectionTItle from "../../../Components/Shared/SectionTitle/SectionTItle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
const Payment = () => {
  return (
    <div className="mt-40">
      <Helmet>
        <title>Harmony Hill | Dashboard|Payment</title>
      </Helmet>

      <Elements stripe={stripePromise}>
        <CheckOutForm></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Payment;
