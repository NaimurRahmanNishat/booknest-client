import React, { useState } from "react";

interface UploadImageProps {
  name: string;
  id: string;
  value: string;
  setImage: (image: string) => void;
  placeholder?: string;
  label?: string; // ✅ added
}


const UploadImage: React.FC<UploadImageProps> = ({
  name,
  id,
  value,
  setImage,
  placeholder,
}) => {
  const [loading, setLoading] = useState(false);

  const convertBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const base64 = await convertBase64(file);
      setImage(base64);
    } catch (error) {
      console.error("Error converting image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">
        Upload Image
      </label>
      <input
        type="file"
        id={id}
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        className="mt-1 block w-full text-sm text-gray-500 bg-background border border-gray-300 rounded-md shadow-sm cursor-pointer"
      />
      {loading ? (
        <p className="text-sm text-blue-500 mt-2">Uploading...</p>
      ) : value ? (
        <img src={value} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-md" />
      ) : placeholder ? (
        <p className="text-sm text-gray-400 mt-2">{placeholder}</p>
      ) : null}
    </div>
  );
};

export default UploadImage;
