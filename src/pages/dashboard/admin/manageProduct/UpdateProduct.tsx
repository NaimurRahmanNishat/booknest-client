/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/shared/Loading";
import SelectInput from "@/components/shared/SelectInput";
import TextInput from "@/components/shared/TextInput";
import UploadImage from "@/components/shared/UploadImage";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/features/products/productApi";
import type { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// Constants
const categories: { label: string; value: string }[] = [
  { label: "Select Category", value: "" },
  { label: "Software", value: "software" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "Artificial Intelligence", value: "artificial-intelligence" },
  { label: "Cyber Security", value: "cyber-security" },
  { label: "Data Science", value: "data-science" },
  { label: "Robotics", value: "robotics" },
];

const UpdateProduct: React.FC = () => {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [newImage, setNewImage] = useState<string | null>(null);

  const [product, setProduct] = useState({
    name: "",
    writer: "",
    category: "",
    description: "",
    price: 0,
    image: "",
  });

  const {
    data,
    isLoading: isProductLoading,
    error,
    refetch,
  } = useFetchProductByIdQuery<any>(id as string);
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (data?.data?.product) {
      const { name, writer, category, description, price, image } =
        data.data.product;
      setProduct({
        name: name || "",
        writer: writer || "",
        category: category || "",
        description: description || "",
        price: price || 0,
        image: image || "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (image: string) => {
    setNewImage(image);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.writer ||
      !product.category ||
      !product.price ||
      !product.description
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("writer", product.writer);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    formData.append("image", newImage ? newImage : product.image);
    formData.append("author", user?._id || "");

    try {
      await updateProduct({ id: id as string, data: formData }).unwrap();
      alert("Product updated successfully!");
      await refetch();
      navigate("/dashboard/manage-products");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product!");
    }
  };

  if (isProductLoading) return <Loading />;
  if (error) {
    console.error("Error loading product:", error);
    return <p className="text-red-500">Failed to load product!</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <TextInput
          label="Product Name"
          name="name"
          placeholder="Ex: Diamond Earrings"
          value={product.name}
          onChange={handleChange}
        />

        {/* Writer */}
        <TextInput
          label="Writer Name"
          name="writer"
          placeholder="Ex: John Doe"
          value={product.writer}
          onChange={handleChange}
        />

        {/* Category */}
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleSelectChange}
          options={categories}
        />

        {/* Price */}
        <TextInput
          label="Price"
          name="price"
          type="number"
          placeholder="50"
          value={product.price}
          onChange={handleChange}
        />

        {/* Image */}
        <UploadImage
          name="image"
          id="image"
          value={newImage || product.image}
          setImage={handleImageChange}
          placeholder="Upload a product image"
        />

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            rows={6}
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Write a product description"
            className="mt-1 block py-2.5 px-4 w-full rounded-md bg-background border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            className="mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md cursor-pointer text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
