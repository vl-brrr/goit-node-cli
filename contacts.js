import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const contactsResult = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsResult);
    return contacts;
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const contactsResult = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsResult);
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const contactsResult = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsResult);
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex !== -1) {
      const contact = contacts[contactIndex];
      contacts.splice(contactIndex, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return contact;
    }
    return null;
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  try {
    const contactsResult = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsResult);
    const contactIndex = contacts.findIndex(
      (contact) => contact.phone === phone
    );
    if (contactIndex === -1) {
      const newContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
      };
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return newContact;
    }
    return "There is already a contact with such a phone number.";
  } catch (err) {
    console.log(err);
  }
}

export { listContacts, getContactById, removeContact, addContact };
