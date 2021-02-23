import { useShoppingCart } from "use-shopping-cart";
import axios from "axios";
import toast from "react-hot-toast";

export default function useCheckout() {
  const { redirectToCheckout, cartDetails } = useShoppingCart();

  async function handleCheckout() {
    const session = await axios
      .post("/api/checkout-sessions", cartDetails)
      .then((res) => res.data)
      .catch((error) => {
        toast.error("Checkout failed!");
        console.log("Error during checkoiut: ", error);
      });

    if (session) {
      redirectToCheckout({ sessionId: session.id });
    }
  }
  return handleCheckout;
}
