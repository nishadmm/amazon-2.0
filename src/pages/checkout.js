import Image from "next/image";
import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckOutProduct from "../components/CheckOutProduct";

const stripePromise = loadStripe(process.env.stripe_public_key);

const CheckOut = () => {
  const items = useSelector(selectItems);

  const [session] = useSession();

  const totalPrice = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session...
    const checkoutSession = await axios.post("/api/stripe-checkout-page", {
      items,
      email: session.user.email,
    });

    // Redirect user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    result.error && alert(result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left side */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Shopping Basket is Empty"
                : "Your Shopping Basket"}
            </h1>

            {items.map((item) => (
              <CheckOutProduct key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Right side */}
        {items.length && (
          <div className="flex flex-col  bg-white p-10 shadow-md">
            <h2 className="whitespace-nowrap">
              Subtotal ({items.length} items):{" "}
              <span className="font-bold">
                {" "}
                <Currency quantity={totalPrice} currency="INR" />{" "}
              </span>{" "}
            </h2>

            <button
              role="link"
              onClick={createCheckoutSession}
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
              } `}
            >
              {session ? "proceed to checkout" : "Sign In to checkout"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CheckOut;
