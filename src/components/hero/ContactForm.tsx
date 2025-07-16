/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { useCreateContactMutation } from "@/redux/features/contact/contactApi";

const ContactForm = () => {
  const [formData, setFormData] = useState<string | any>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<string | any>({ name: "", email: "", subject: "", message: "", general: "" });
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [createContact, { isLoading, isSuccess }] = useCreateContactMutation();

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({
        name: "",
        email: "",
        subject: "",
        message: "",
        general: "",
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000); 
    }
  }, [isSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContact(formData).unwrap();
    } catch (err: any) {
      const message = err?.data?.message || "Something went wrong!";
      const updatedErrors = { ...errors };

      if (message.includes("Name")) updatedErrors.name = message;
      else if (message.includes("email")) updatedErrors.email = message;
      else if (message.includes("Subject")) updatedErrors.subject = message;
      else if (message.includes("Message")) updatedErrors.message = message;
      else updatedErrors.general = message;
      setErrors(updatedErrors);
    }
  };

  return (
    <div>
      <Card className="rounded-sm h-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Send Us a Message</CardTitle>
          <CardDescription>
            Fill out the form below and we'll get back to you as soon as
            possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name..."
                className="px-4 py-2 rounded-sm border-2 outline-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email..."
                className="px-4 py-2 rounded-sm border-2 outline-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              
            {/* General Error */}
            {errors.general && (
              <p className="text-red-500 text-sm">{errors.general}</p>
            )}
            </div>

            {/* Subject */}
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="subject">Subject</Label>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Message subject..."
                className="px-4 py-2 rounded-sm border-2 outline-blue-500"
              />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className={`px-4 py-2 border rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
                  errors.message ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            {/* ✅ Success Alert */}
            {showSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm font-medium">
                ✅ Message sent successfully!
              </div>
            )}

            <div className="pt-5">
              <button
                type="submit"
                className="bg-primaryLight w-full text-white rounded-sm py-2 text-xl cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
