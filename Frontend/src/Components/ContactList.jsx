import React from "react";
import ContactCard from "./ContactCard";
import {AnimatePresence,motion} from 'framer-motion'
const ContactList = ({ contacts, onDelete, loading }) => {
  const SkeletonCard = () => (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map((n) => (
          <SkeletonCard key={n} />
        ))}
      </div>
    );
  }
  if (contacts.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500 text-lg">No contacts found.</p>
        <p className="text-gray-400 text-sm">Fill out the form to add one.</p>
      </div>
    );
  }

  return (
<div className="flex flex-col gap-3 custom-scrollbar overflow-y-auto max-h-[80vh] p-1">
      <AnimatePresence>
        {contacts.map((contact) => (
          <motion.div
            key={contact._id}
            initial={{ opacity: 0, y: 20 }}  
            animate={{ opacity: 1, y: 0 }}     
            exit={{ opacity: 0, x: -100 }}     
            transition={{ duration: 0.2 }}
            layout // Magic prop: Makes other items slide up smoothly when one is removed
          >
            <ContactCard contact={contact} onDelete={onDelete} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ContactList;
