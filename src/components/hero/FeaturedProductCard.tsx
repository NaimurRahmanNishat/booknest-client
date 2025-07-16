/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import type { productTypes } from "./FeaturedProducts";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";

interface ProductCardProps {
  product: productTypes;
}

const FeaturedProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleToCart = (product: any) => {
    dispatch(addToCart(product));
  }
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer h-[400px] max-w-xs mx-auto flex flex-col group border border-border bg-card rounded-xl">
      {/* Image Section */}
      <CardHeader className="p-0 relative overflow-hidden rounded-t-xl h-[200px]">
        <img
          src={product?.image || "/placeholder.svg"}
          alt={product?.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Category Badge */}
        <Badge
          variant="default"
          className="absolute top-3 right-3 text-xs py-1 px-3 rounded-full font-medium bg-secondary text-secondary-foreground shadow-md"
        >
          {product?.category}
        </Badge>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="flex flex-col px-4 flex-grow">
        <CardTitle className="text-base font-semibold mb-1 line-clamp-2 text-primary">
          {product?.name}
        </CardTitle>
        <CardDescription className="text-xs flex justify-between items-center text-muted-foreground">
          <p className="line-clamp-1">{product?.writer}</p>
          <Button variant="ghost" size="icon" className="p-1 rounded-full">
            <Heart
              onClick={() => {
                setIsLiked(!isLiked);
              }}
              className="h-5 w-5"
            />
          </Button>
        </CardDescription>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-bold text-primary">
            $ {product?.price?.toFixed(2)}
          </p>
        </div>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="px-4 flex justify-between items-center gap-2 border-t border-border">
        {/* View More Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="p-1">
              <Eye className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[320px] rounded-lg bg-card">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-primary">
                {product?.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">by author</p>
            </DialogHeader>
            <DialogFooter className="grid gap-3 py-4">
              <img
                src={product?.image || "/placeholder.svg"}
                alt={product?.name}
                className="w-32 h-32 object-cover mx-auto rounded-lg"
              />
              <p className="text-sm text-muted-foreground">description</p>
              <div className="space-y-1 text-muted-foreground">
                <p>
                  <strong>Category:</strong> {product?.category}
                </p>
                <p>
                  <strong>Published:</strong> {/* Optional Date Field */}
                </p>
              </div>
              <Link to={`/all-products/${product._id}`}>
                <Button className="w-full text-sm font-bold">View More</Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add to Cart Button */}
          <Button
            variant="default"
            size="sm"
            onClick={() => handleToCart(product)}
            className="p-2 text-sm flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </Button>
      </CardFooter>
    </Card>
  );
};

export default FeaturedProductCard;
