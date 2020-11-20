let isUpdate = false;
let contactObject = {};
window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const nameError = document.querySelector('.name-error');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      setTextValue('.name-error', "");
      return;
    }
    try {
      (new Contact()).name = name.value;
      setTextValue('.name-error', "");
    } catch (error) {
      setTextValue('.name-error', error);
    }
  });

  const address = document.querySelector('#address');
  const addressError = document.querySelector('.address-error');
  address.addEventListener('input', function () {
    if (address.value.length == 0) {
      setTextValue('.address-error', "");
      return;
    }
    try {
      (new Contact()).address = address.value;
      setTextValue('.address-error', "");
    } catch (error) {
      setTextValue('.address-error', error);
    }
  });

  const zip = document.querySelector('#zip');
  const zipError = document.querySelector('.zip-error');
  zip.addEventListener('input', function () {
    if (zip.value.length == 0) {
      setTextValue('.zip-error', "");
      return;
    }
    try {
      (new Contact()).zip = zip.value;
      setTextValue('.zip-error', "");
    } catch (error) {
      setTextValue('.zip-error', error);
    }
  });

  const phoneNumber = document.querySelector('#phoneNumber');
  const phoneNumberError = document.querySelector('.phoneNumber-error');
  phoneNumber.addEventListener('input', function () {
    if (phoneNumber.value.length == 0) {
      setTextValue('.phoneNumber-error', "");
      return;
    }
    try {
      (new Contact()).phoneNumber = phoneNumber.value;
      setTextValue('.phoneNumber-error', "");
    } catch (error) {
      setTextValue('.phoneNumber-error', error);
    }
  });
  checkForUpdate();
});

const checkForUpdate = () => {
  const contact = localStorage.getItem('editPerson');
  isUpdate = contact ? true : false;
  if (!isUpdate) {
    return;
  }
  contactObject = JSON.parse(contact);
  setForm();
}

const save = (event) => {
  if (anyError()) {
    alert("Cannot submit the form!");
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  try {
    setContactObject();
    createAndupdateStorage();
    resetForm();
    window.location.replace(site_properties.home_page);
  } catch (error) {
    alert(error);
  }
};

const setForm = () => {
  setValue('#name', contactObject._name);
  setValue('#address', contactObject._address);
  setValue('#city', contactObject._city);
  setValue('#state', contactObject._state);
  setValue('#zip', contactObject._zip);
  setValue('#phoneNumber', contactObject._phoneNumber);
  setValue('#email', contactObject._email);
}

const resetForm = () => {
  setValue('#name', '');
  setTextValue('.name-error', "");
  setValue('#address', '');
  setTextValue('.address-error', "");
  setSelectedIndex('#city', 0);
  setSelectedIndex('#state', 0);
  setValue('#zip', '');
  setTextValue('.zip-error', "");
  setValue('#phoneNumber', '');
  setTextValue('.phoneNumber-error', "");
  setValue('#email', '');
}

const setContactObject = () => {
  contactObject._name = getInputValueById('#name');
  contactObject._address = getInputValueById('#address');
  contactObject._city = getInputValueById('#city');
  contactObject._state = getInputValueById('#state');
  contactObject._zip = getInputValueById('#zip');
  contactObject._phoneNumber = getInputValueById('#phoneNumber');
  contactObject._email = getInputValueById('#email');
}

const createAndupdateStorage = () => {
  let addressBook = JSON.parse(localStorage.getItem("AddressBook"));
  if (!addressBook) {
    addressBook = [createContact()];
  } else {
    let contact = addressBook.find(contactObj => contactObj._id == contactObject._id);
    if (!contact) {
      addressBook.push(createContact());
    } else {
      const index = addressBook.map(contactObj => contactObj._id)
                               .indexOf(contact._id);
      addressBook.splice(index, 1, createContact(contact._id));
    }
  }
  localStorage.setItem("AddressBook", JSON.stringify(addressBook));
}

const createContact = (id) => {
  let contact = new Contact();
  if (!id) contact.id = createNewContactID();
  else contact.id = id;
  setContactData(contact);
  return contact;
}

const setContactData = (contact) => {
  try {
    contact.name = contactObject._name;
  } catch (error) {
    setTextValue('.name-error', error);
    throw error;
  }

  try {
    contact.address = contactObject._address;
  } catch (error) {
    setTextValue('.address-error', error);
    throw error;
  }

  contact.city = contactObject._city;
  contact.state = contactObject._state;

  try {
    contact.zip = contactObject._zip;
  } catch (error) {
    setTextValue('.zip-error', error);
    throw error;
  }
  try {
    contact.phoneNumber = contactObject._phoneNumber;
  } catch (error) {
    setTextValue('.phoneNumber-error', error);
    throw error;
  }
  contact.email = contactObject._email;
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
}

const createNewContactID = () => {
  let contactID = localStorage.getItem("ContactID");
  contactID = !contactID ? 1 : (parseInt(contactID) + 1).toString();
  localStorage.setItem("ContactID", contactID);
  return contactID;
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}

const setSelectedIndex = (id, index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
}

const anyError = () => {
 if (document.querySelector('.name-error').textContent == '' || 
     document.querySelector('.name-error').textContent == '' || 
     document.querySelector('.name-error').textContent == '' || 
     document.querySelector('.name-error').textContent == '') {
   return false;
  } else return true;
}