const API_URL = 'https://contactmanager-7br9.onrender.com/api/contacts';

export const getContacts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch contacts');
  return res.json();
};

export const createContact = async (contactData) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  });
  if (!res.ok) throw new Error('Failed to create contact');
  return res.json();
};

export const deleteContact = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete contact');
  return res.json();
};