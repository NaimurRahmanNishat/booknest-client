/* eslint-disable @typescript-eslint/no-explicit-any */
import RatingStars from "@/components/shared/RagingStars";
import { Badge } from "@/components/ui/badge";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { Eye, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// ✅ Fix name and props
interface ProductCardProps {
  product: any; // Single product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state: any) => state.cart.products);

  const handleAddToCart = (product: any) => {
    const isAlreadyAdded = cartProducts.find((item: any) => item._id === product._id);
    if (isAlreadyAdded) {
      toast.warning("Product already added!");
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  return (
    <div
      key={product._id}
      className="bg-background shadow-lg rounded-sm overflow-hidden hover:shadow-xl hover:scale-105 duration-500 transition-transform group"
    >
      {/* image section */}
      {product.image ? (
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-[100px] md:h-48 lg:h-64 rounded-t-xl border-l-2 border-r-2 transition-all hover:scale-105 duration-500"
          />
          <Badge className="absolute top-4 right-3 text-xs bg-primaryLight text-primary">
            {product.category}
          </Badge>
          <div className="absolute bottom-6 right-4 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-3">
              <Link
                to={`/all-products/${product._id}`}
                className="w-8 h-8 rounded-full bg-white dark:bg-black hover:bg-primaryLight hover:text-white flex items-center justify-center"
              >
                <Eye className="w-5 h-5" />
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-8 h-8 rounded-full bg-white dark:bg-black flex items-center cursor-pointer hover:bg-primaryDark hover:text-pink-500 font-semibold justify-center"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <span>No Image</span>
        </div>
      )}

      {/* content */}
      <div className="p-4">
        <h3 className="text-lg text-black dark:text-white/80 font-semibold mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-400 mb-1 italic">
          Writer: {product.writer}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-green-600">
            <RatingStars rating={product.rating || 0} />
          </div>
          <span className="text-black font-semibold dark:text-white/80">
            ${product.price || "0.00"}
          </span>
        </div>
        <Badge className="mt-2 bg-primaryLight text-primary">
          In Stock
        </Badge>
      </div>
    </div>
  );
};

export default ProductCard;

