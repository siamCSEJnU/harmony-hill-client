import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Lottie from "lottie-react";
import payAnim from "./animation/pay3.json";
// import "./CheckOutForm.css";

import useSelectedClasses from "../../../../hooks/useSelectedClasses";
import Swal from "sweetalert2";
import { useLocation, useParams } from "react-router-dom";
import useAllClasses from "../../../../hooks/useAllClasses";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { ImSpinner4 } from "react-icons/im";

const CheckOutForm = () => {
  const [mySelectedClasses, refetch] = useSelectedClasses();
  const [allClasses] = useAllClasses();
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("false");
  const stripe = useStripe();
  const elements = useElements();
  const { className, classId } = useParams();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const foundClass = allClasses.find((item) => item.name == className);
  const singleClass = {
    enrolledClasses: [foundClass],
    enrolledEmail: user?.email,
    enrolledName: user?.displayName,
    status: foundClass?.status,
  };

  const multipleClasses = {
    enrolledClasses: mySelectedClasses,
    enrolledEmail: user?.email,
    enrolledName: user?.displayName,
  };

  const enrolledClass =
    location.pathname == "/dashboard/payment/all"
      ? multipleClasses
      : singleClass;

  const allPrice = mySelectedClasses?.reduce(
    (sum, item) => sum + item.price,
    0
  );
  const siglePrice = foundClass?.price;
  const total =
    location.pathname == "/dashboard/payment/all" ? allPrice : siglePrice;
  const price = parseFloat(total?.toFixed(2));

  useEffect(() => {
    axiosSecure.post("/cerate-payment-intent", { price }).then((response) => {
      console.log(response.data.clientSecret);
      setClientSecret(response.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleDelete = async () => {
    let response;
    if (location.pathname === "/dashboard/payment/all") {
      response = await axiosSecure.delete(
        `/selectedClasses/all/${user?.email}`
      );
    } else {
      response = await axiosSecure.delete(`/selectedClasses/${classId}`);
    }
    return response?.data?.deletedCount;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (location.pathname === "/dashboard/payment/all") {
      return Swal.fire(
        "PAY ALL?",
        "That thing is yet to do.Please pay single item!",
        "question"
      );
    }

    if (!elements || !stripe) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      toast.error(error.message);
    } else {
      // console.log("payment method", paymentMethod);
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Unknown",
            name: user?.displayName || "Anonymous",
          },
        },
      });
    if (confirmError) {
      toast.error(confirmError.message);
      setProcessing(false);
    }
    // console.log(paymentIntent);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user?.email,
        name: user?.displayName,
        transactionId: paymentIntent.id,
        quantity: mySelectedClasses ? mySelectedClasses.length : 1,
        price,
        date: new Date(),
        status: "service pending",
        items: mySelectedClasses
          ? mySelectedClasses.map((item) => item._id)
          : foundClass._id,
        itemNames: mySelectedClasses
          ? mySelectedClasses.map((item) => item.name)
          : foundClass.name,
      };

      axiosSecure.post("/payments", payment).then((response) => {
        if (response.data.insertedId) {
          axiosSecure
            .post("/enrolledClasses", enrolledClass)
            .then((response) => {
              if (response.data.insertedId) {
                axiosSecure
                  .patch(`/allClasses/${className}`)
                  .then((response) => {
                    if (response.data.modifiedCount) {
                      const allSuccess = handleDelete();
                      if (allSuccess) {
                        refetch();
                        setProcessing(false);
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: " Payment Completed  successfuly!",
                          showConfirmButton: false,
                          timer: 1800,
                        });
                      }
                    }
                  });
              }
            });
        }
      });
    }
  };
  return (
    <div>
      <h2 className="text-3xl text-center mb-7 font-bold">
        Total Amount : ${price}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-emerald-400 pt-5 rounded-xl px-10 w-2/3 mx-auto"
      >
        <div className="flex justify-center items-center  mb-12 border-b-2">
          <Lottie
            className="w-32 "
            animationData={payAnim}
            loop={true}
          ></Lottie>
          <h2 className="text-center  text-3xl font-bold text-blue-800 ">
            Payment here
          </h2>
        </div>
        {/* <h2 className="text-center mb-16 pb-2 text-3xl font-bold text-blue-800 border-b-4">
          Payment here
        </h2> */}
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
            className="btn w-full bg-blue-600 text-slate-100 text-xl font-bold border-sky-500 "
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            {processing ? (
              <ImSpinner4
                className="animate-spin m-auto text-slate-100 font-bold text-base"
                size={32}
              ></ImSpinner4>
            ) : (
              "PAY"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;

// const postResponse = await fetch("http://localhost:5000/enrolledClasses", {
//   method: "POST",
//   headers: {
//     "content-type": "application/json",
//   },
//   body: JSON.stringify(enrolledClass),
// });
// const postData = await postResponse.json();

// const patchResponse = await fetch(
//   `http://localhost:5000/allClasses/${className}`,
//   {
//     method: "PATCH",
//   }
// );
// const patchData = await patchResponse.json();

// // http://localhost:5000//selectedClasses/${classId}
// axiosSecure.delete(`/selectedClasses/${classId}`).then((response) => {
//   const { deletedCount } = response.data;
//   console.log(deletedCount);
//   refetch();
// });

// if (patchData.modifiedCount && postData.insertedId) {
//   Swal.fire({
//     position: "top-end",
//     icon: "success",
//     title: " Payment Completed  successfuly!",
//     showConfirmButton: false,
//     timer: 1800,
//   });
// }
