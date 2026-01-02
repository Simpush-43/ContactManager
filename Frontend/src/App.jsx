import React, { useState, useEffect } from "react";
import ContactForm from "./Components/ContactForm";
import ContactList from "./Components/ContactList";
import { getContacts, deleteContact } from "./Services/api";
import { toast, ToastContainer } from "react-toastify";
import SearchBar from "./Components/SearchBar";

// delete toast confirmation
// This component receives `closeToast` automatically from React-Toastify
const DeleteConfirmation = ({ closeToast, onConfirm }) => (
  <div>
    <p className="text-sm font-bold text-gray-800 mb-3">
      Are you sure you want to delete this?
    </p>
    <div className="flex gap-2 justify-end">
      <button
        onClick={closeToast} // Just close the toast (Cancel)
        className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
      >
        Cancel
      </button>
      <button
        onClick={() => {
          onConfirm(); // Run the delete logic
          closeToast(); // Close the toast
        }}
        className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  </div>
);
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // 1. Fetch Data on Mount
  useEffect(() => {
    loadContacts();
  }, []);
  // filter contact
  useEffect(() => {
    const results = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(results);
  }, [searchTerm, contacts]);
  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch contacts.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handler: Add Contact (Passed to Form)
  const handleContactAdded = (newContact) => {
    setContacts([newContact, ...contacts]); // Optimistic UI update (or re-fetch)
  };

  // 3. Handler: Delete Contact (Passed to List -> Card)
  const handleDelete = async (id) => {
    toast(<DeleteConfirmation onConfirm={() => DeleteContact(id)} />, {
      position: "top-center",
      autoClose: false, // Important: Forces user to interact
    });
  };
  const DeleteContact = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter((c) => c._id !== id));
      toast.info("Contact deleted.");
    } catch (err) {
      // revert if api fails
      setContacts(originalContacts);
      toast.error("Could not delete contact.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      {/* Header */}
      <header className="bg-blue-700 text-white py-6 shadow-md mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold">Contact Manager</h1>
          <p className="text-blue-100 text-sm mt-1">
            Manage your personal and business contacts efficiently
          </p>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Form (4 cols) */}
        <section className="lg:col-span-5 order-2 lg:order-1">
          <ContactForm onContactAdded={handleContactAdded} />
        </section>

        {/* Right: List (8 cols) */}
        <section className="lg:col-span-7 order-1 lg:order-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Contacts</h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {contacts.length} Total
            </span>
          </div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ContactList
            contacts={filteredContacts}
            onDelete={handleDelete}
            loading={loading}
          />
        </section>
      </main>
    </div>
  );
};

export default App;
