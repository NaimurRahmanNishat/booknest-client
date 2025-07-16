/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SlidersVertical } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

const FilterProducts = ({ filters, filtersState, setFiltersState }: any) => {
  const [categoryOpen, setCategoryOpen] = useState<boolean>(true);
    const [priceRangeOpen, setPriceRangeOpen] = useState<boolean>(true);
  const handleCategoryOpen = () => {
    setCategoryOpen(!categoryOpen);
  };


  const handlePriceRangeOpen = () => {
    setPriceRangeOpen(!priceRangeOpen);
  };

  const categories = filters?.[0]?.categories || [];
  const priceRanges = filters?.[1]?.priceRange || [];

  return (
    <div className="w-full">
      <div className="pb-10">
        <h2 className="text-2xl font-bold text-secondaryDark">Filters</h2>
      </div>
      <div className="w-full h-full border px-2 py-1">
        {/* categories section start */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-secondaryDark">category</h3>
            <button className="cursor-pointer" onClick={handleCategoryOpen}>
              <SlidersVertical />
            </button>
          </div>
          {categoryOpen && (
            <div className="w-full h-full px-2 py-1 flex flex-col gap-y-2">
              {categories.map((category: string) => (
                <label key={category} className="cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filtersState.category === category}
                    onChange={(e) =>
                      setFiltersState({
                        ...filtersState,
                        category: e.target.value,
                      })
                    }
                  />
                  <span className="ml-1">{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        {/* categories section end */}

        {/* price range filtering section start */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-secondaryDark">
              Price Range
            </h3>
            <button className="cursor-pointer" onClick={handlePriceRangeOpen}>
              <SlidersVertical />
            </button>
          </div>
          {priceRangeOpen && (
            <div className="w-full h-full px-2 py-1 flex flex-col gap-y-2">
              {priceRanges.map((price: any) => {
                return (
                  <label key={price.label} className="cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      value={price.label} // ✅ value instead of "min - max"
                      checked={filtersState.priceRange === price.label}
                      onChange={(e) =>
                        setFiltersState({
                          ...filtersState,
                          priceRange: e.target.value,
                        })
                      }
                    />
                    <span className="ml-1">{price.label}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
        {/* price range filtering section end */}

        {/* clear all filter start */}
        <div
          onClick={() => setFiltersState({ category: "All", priceRange: "" })}
          className="py-2 mt-9 flex items-center justify-center"
        >
          <InteractiveHoverButton className="hover:bg-primaryLight bg-primaryDark">
            Clear All
          </InteractiveHoverButton>
        </div>
        {/* clear all filter end */}
      </div>
    </div>
  );
};

export default FilterProducts;
