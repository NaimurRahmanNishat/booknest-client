/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import SectionHeader from "../shared/SectionHeader";
import { RainbowButton } from "../ui/RainbowButton";
import { useFetchAllProductsQuery } from "@/redux/features/products/productApi";
import ProductCard from "@/pages/all-products/productCard";

const RecomendedProducts = () => {
  const { data } = useFetchAllProductsQuery<any>({});
  const products = data?.data?.products?.slice(0, 10) || [];

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <SectionHeader
          highlight="Recommended Products"
          subtitle="Explore your Recommended Products"
          className="text-center mb-8"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/all-products">
            <RainbowButton className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              All Books
            </RainbowButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecomendedProducts;
