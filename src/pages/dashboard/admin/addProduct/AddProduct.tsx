import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useSelector } from 'react-redux';
import Loading from '@/components/shared/Loading';
import { useAddProductMutation } from '@/redux/features/products/productApi';
import TextInput from '@/components/shared/TextInput';
import SelectInput from '@/components/shared/SelectInput';
import UploadImage from '@/components/shared/UploadImage';
import type { RootState } from '@/redux/store'; 


const categories: { label: string; value: string }[] = [
  { label: "Select Category", value: "" },
  { label: "Software", value: "software" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "Artificial Intelligence", value: "artificial-intelligence" },
  { label: "Cyber Security", value: "cyber-security" },
  { label: "Data Science", value: "data-science" },
  { label: "Robotics", value: "robotics" },
];

interface ProductFormState {
  name: string;
  writer: string;
  category: string;
  description: string;
  image: string;
  price: string;
  rating: number;
}

const AddProduct: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [product, setProduct] = useState<ProductFormState>({
    name: '',
    writer: '',
    category: '',
    description: '',
    image: '',
    price: '',
    rating: 0
  });

  const [image, setImage] = useState<string>('');

  const [addProduct, { isLoading, error }] = useAddProductMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!product.name || !product.writer || !product.category || !product.price || !product.rating || !product.description) {
    alert('Please fill in all fields.');
    return;
  }

  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("writer", product.writer);
  formData.append("category", product.category);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("rating", product.rating.toString());
  formData.append("image", image);
  formData.append("author", user?._id || "");

  try {
    await addProduct(formData).unwrap();
    alert('Product added successfully!');
    setProduct({ name: '', writer: '', category: '', description: '', image: '', price: '', rating: 0 });
    setImage('');
  } catch (err) {
    console.error('Failed to add product:', err);
  }
};

  if (isLoading) return <Loading />;
  if (error) return <div>Failed to add product</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          type="text"
          label="Product Name"
          name="name"
          placeholder="Ex: clean code book"
          value={product.name}
          onChange={handleChange}
        />

        <TextInput
          type="text"
          label="writer"
          name="writer"
          placeholder="Writer Name"
          value={product.writer}
          onChange={handleChange}
        />

        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        <TextInput
          type="number"
          label="Price"
          name="price"
          placeholder="00"
          value={product.price}
          onChange={handleChange}
        />

        <TextInput
          type="number"
          label="Rating"
          name="rating"
          placeholder="0"
          value={product.rating.toString()}
          onChange={handleChange}
        />

        {/* Upload Image */}
<UploadImage
  label="Image"
  name="image"
  id="product-image"
  value={image}
  setImage={setImage}
/>


        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            name="description"
            id="description"
            rows={6}
            value={product.description}
            onChange={handleChange}
            className="mt-1 block py-2.5 px-4 w-full rounded-md bg-background border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md cursor-pointer text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
