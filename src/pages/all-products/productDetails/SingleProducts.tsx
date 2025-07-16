/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useParams } from "react-router-dom";
import Loading from "@/components/shared/Loading";
import { toast } from "react-toastify";
import { AuroraText } from "@/components/ui/AuroraText";
import { RainbowButton } from "@/components/ui/RainbowButton";
import { SparklesText } from "@/components/ui/SparklesText";
import { useFetchProductByIdQuery } from "@/redux/features/products/productApi";
import ReviewCard from "../reviews/ReviewCard";



const Singlepage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.products);
  const productId = typeof id === "string" ? id : "";

  const {
    data: { data: productDetails } = {},
    isLoading,
    isError,
  } = useFetchProductByIdQuery<any>(productId);

  const { product, reviews } = productDetails || {};

  const handleAddToCart = (product: any) => {
    const alreadyExists = cartItems.find(
      (item: any) => item._id === product._id
    );
    if (alreadyExists) {
      toast.warning("Product already selected!");
    } else {
      dispatch(addToCart(product));
    }
  };

  if (isLoading) return <Loading/>;
  if (isError || !product) return <div className="text-red-500">Error loading product.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Product Image */}
        <div className="w-full border rounded-lg overflow-hidden shadow">
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            width={600}
            height={600}
            className="w-full object-cover h-[400px] hover:scale-105 transition duration-300 ease-in-out"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            <AuroraText>{product.name}</AuroraText>
          </h1>
          <h2 className=" text-gray-600 dark:text-white">
            <SparklesText className="text-2xl">{product.writer}</SparklesText>
          </h2>

          <div className="space-y-1">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> ⭐ {product.rating}
            </p>
            <p>
              <span className="font-semibold">Price:</span>{" "}
              <span className="text-xl font-bold text-green-600">
                ${product.price}
              </span>
            </p>
          </div>

          {/* Add to Cart Button */}
          <RainbowButton
            onClick={(e: any) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            className="mt-4 w-full md:w-auto bg-background"
          >
            🛒 Add to Cart
          </RainbowButton>
        </div>
      </div>
      {/* product description */}
      <div className="my-12 dark:text-white">
        <p className="text-gray-700 text-base dark:text-white">
          {product.description}
        </p>
      </div>
      {/* Reviews Section */}
      <ReviewCard reviews={reviews} />
    </div>
  );
};

export default Singlepage;

