/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "@/components/shared/Loading";
import { AuroraText } from "@/components/ui/AuroraText";
import FilterProducts from "./FilterProducts";
import ProductCard from "./productCard";
import { useFetchAllProductsQuery } from "@/redux/features/products/productApi";

const filters = [
  {
    categories: [
      "All",
      "Software",
      "Machine Learning",
      "Artificial Intelligence",
      "Cyber Security",
      "Data Science",
      "Robotics",
    ],
  },
  {
    priceRange: [
      { label: "Under $20", min: 0, max: 20 },
      { label: "$20 - $50", min: 20, max: 50 },
      { label: "$50 - $100", min: 50, max: 100 },
      { label: "$100 and above", min: 100, max: Infinity },
    ],
  },
];

type PriceRange = {
  label: string;
  min: number;
  max: number;
};

type FilterState = {
  category: string;
  priceRange: string;
};

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterState, setFilterState] = useState<FilterState>({
    category: "All",
    priceRange: "",
  });
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const selectedPriceRange: PriceRange | undefined =
    filters[1]?.priceRange?.find((range) => range.label === filterState.priceRange);

  const productPerPage = 12;

  const {
    data: productData = {},
    isLoading,
    isError,
  } = useFetchAllProductsQuery<any>({
    category: filterState.category === "All" ? "" : filterState.category,
    ...(selectedPriceRange && {
      minPrice: selectedPriceRange.min,
      maxPrice: selectedPriceRange.max,
    }),
    page: currentPage,
    limit: productPerPage,
    sort: sortOption,
    ...(searchTerm && { search: searchTerm }),
  });

  const products = productData?.data?.products || [];
  const totalPage = productData?.data?.totalPage || 1;
  const totalProducts = productData?.data?.totalProducts || 0;
  const startPage = (currentPage - 1) * productPerPage + 1;
  const endPage = startPage + products.length - 1;

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPage) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-500">Error loading products</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8 mt-8">
        <AuroraText>Explore your Recommended Products</AuroraText>
      </h2>

      <div className="flex flex-col md:flex-row">
        {/* Filter Sidebar */}
        <div className="md:w-[20%] w-full mb-6 md:mb-0">
          <FilterProducts
            filters={filters}
            filtersState={filterState}
            setFiltersState={setFilterState}
          />
        </div>

        {/* Product Section */}
        <div className="md:w-[80%] w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4">
            <h3 className="text-lg font-medium">
              Showing {startPage} to {endPage} of {totalProducts} products
            </h3>

            {/* Search + Sort */}
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md w-60"
              />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md"
              >
                <option value="">Default</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 px-4">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">No products found</div>
          )}

          {/* Pagination */}
          {totalPage > 1 && (
            <div className="mt-8 flex justify-center gap-2 items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                <ChevronLeft className="inline w-4 h-4" />
              </button>

              {[...Array(totalPage)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === idx + 1
                      ? "bg-primary text-white font-semibold"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                <ChevronRight className="inline w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
