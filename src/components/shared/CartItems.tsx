/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "@/redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { getBaseUrl } from "@/utils/getBaseUrl ";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  products: CartItem[];
  selectedItems: number;
  totalPrice: number;
}

const CartItems = () => {
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const { products, selectedItems, totalPrice } = useSelector(
    (state: { cart: CartState }) => state.cart
  );

  const handleOpenCart = () => {
    setIsOpenCart(!isOpenCart);
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id: string) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrease = (id: string) => {
    dispatch(decrementQuantity(id));
  };

  // handle make payment
  const makePayment = async () => {
    if (!user || !user._id) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PK);
    const body = { products: products, userId: user._id };
    try {
      const response = await fetch(
        `${getBaseUrl()}/api/orders/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.id });
    } catch (error: any) {
      console.error("Error create checkout session ", error);
    }
  };

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={handleOpenCart}
        className="relative bg-background/10 p-2 cursor-pointer rounded-md hover:bg-background/20 transition"
      >
        <ShoppingCart className="text-2xl text-pink-600" />
        {products.length > 0 && (
          <span className="absolute -top-0 -right-0 text-xs bg-gray-600 text-white h-5 w-5 flex items-center justify-center rounded-full">
            {selectedItems}
          </span>
        )}
      </button>

      {/* Overlay + Cart Drawer */}
      {isOpenCart && (
        <div className="fixed inset-0 z-50 flex -right-2">
          <div
            className="absolute inset-0 h-screen bg-black/80 dark:bg-black/90 backdrop-blur-sm"
            onClick={handleOpenCart}
          ></div>

          <div
            className={`ml-auto h-screen w-full sm:w-[400px] bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg z-50 p-5 flex flex-col duration-500 ease-in-out transition-transform ${
              isOpenCart ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button
                onClick={handleOpenCart}
                className="p-1 hover:text-red-500 cursor-pointer transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {products.length === 0 ? (
                <p className="text-center text-gray-500">
                  🛒 Your cart is empty
                </p>
              ) : (
                products.map((item: CartItem) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border p-2 rounded-md bg-background"
                  >
                    <img
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ${item.price}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleDecrease(item._id)}
                          className="p-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-800"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item._id)}
                          className="p-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-800"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-green-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-xs text-red-600 hover:underline mt-1 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {products.length > 0 && (
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-3">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-lg text-green-700">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    makePayment();
                  }}
                  className="w-full bg-primaryLight text-white py-2 cursor-pointer rounded-md font-semibold hover:bg-pink-700 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartItems;
