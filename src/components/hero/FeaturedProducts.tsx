
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SectionHeader from "../shared/SectionHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { RainbowButton } from "../ui/RainbowButton";
import { useGetCategoryFeaturedProductsQuery } from "@/redux/features/products/productApi";
import FeaturedProductCard from "./FeaturedProductCard";
import Loading from "../shared/Loading";

export interface productTypes {
  _id: string;
  name: string;
  author: string;
  writer: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
}

const FeaturedProducts = () => {
  const {
    data,
    isLoading,
    isError,
  } = useGetCategoryFeaturedProductsQuery();

  const products: productTypes[] = data?.products || [];

  if (isLoading) return <Loading/>;
  if (isError) return <h1 className="text-center text-lg text-red-500">Error loading products</h1>;

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <SectionHeader
          highlight="Featured Books"
          subtitle="Discover one book from each popular category."
          className="text-center mb-8"
        />

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative w-full mx-auto"
        >
          <CarouselContent className="flex gap-2">
            {products.map((product) => (
              <CarouselItem
                key={product._id}
                className="flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <div className="p-2">
                  <FeaturedProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </CarouselPrevious>

          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CarouselNext>
        </Carousel>

        <div className="text-center mt-8">
          <Link to="/all-products">
            <RainbowButton className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
              Explore All Books
            </RainbowButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
