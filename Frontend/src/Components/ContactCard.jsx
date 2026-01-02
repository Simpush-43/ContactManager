import React from "react";

const ContactCard = ({ contact, onDelete }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${contact.name}&background=random&color=fff&bold=true`;
  return (
    // Avatar url
    <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-600 relative group transition hover:shadow-lg">
      <img 
        src={avatarUrl} 
        alt={contact.name} 
        className="w-12 h-12 rounded-full shadow-sm"
      />
      <div className="flex-1">
        <h3 className="font-bold text-xl text-gray-800">{contact.name}</h3>
        <p className="text-sm text-gray-600 font-medium">{contact.email}</p>
        <p className="text-sm text-gray-500 mb-2">{contact.phone}</p>

        {contact.message && (
          <div className="bg-gray-50 p-2 rounded text-sm text-gray-600 italic border border-gray-100">
            "{contact.message}"
          </div>
        )}
      </div>

      <button
        onClick={() => onDelete(contact._id)}
        className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors duration-200"
        title="Delete Contact"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default ContactCard;
