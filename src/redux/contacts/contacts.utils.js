export const contactsDelete = (contacts, id) => {
  return contacts.filter(contact => contact.id != id);
}