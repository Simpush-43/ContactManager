import React, { useState } from "react";
import { createContact } from "../Services/api";
import { toast } from "react-toastify";
const ContactForm = ({ onContactAdded }) => {
  const initialFormState = { name: "", email: "", phone: "", message: "" };
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    const phoneValue = formData.phone.trim();
    const validCharPattern = /^\+?[0-9\s\-\(\)]+$/;
    const digitsOnly = phoneValue.replace(/\D/g, "");
    if (!phoneValue) {
      tempErrors.phone = "Phone is required";
    } else if (!validCharPattern.test(phoneValue)) {
      tempErrors.phone = "Phone contains invalid characters (letters/symbols)";
    } else if (digitsOnly.length < 10) {
      tempErrors.phone = "Phone number is too short (min 10 digits)";
    } else if (digitsOnly.length > 10) {
      tempErrors.phone = "Phone number is too long (max 10 digits)";
    }
    if (!formData.phone) tempErrors.phone = "Phone is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newContact = await createContact(formData);
      onContactAdded(newContact); // Notify Parent
      setFormData(initialFormState); // Reset Form
      toast.success("Contact saved successfully! 🎉");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save contact. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        New Contact
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <InputField
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          type='tel'
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Additional notes..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-md text-white font-semibold transition-all duration-200
            ${
              isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
            }`}
        >
          {isSubmitting ? "Saving..." : "Save Contact"}
        </button>
      </form>
    </div>
  );
};

// Reusable Input Sub-component (Local to this file or extracted further)
const InputField = ({ label, name, value, onChange, error }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border rounded-md outline-none transition
        ${
          error
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-2 focus:ring-blue-500"
        }`}
    />
    {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
  </div>
);

export default ContactForm;
