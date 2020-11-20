let addressBook;
window.addEventListener('DOMContentLoaded', (event) => {
  addressBook = getContactsFromLocalStorage();
  document.querySelector(".person-count").textContent = addressBook.length;
  createInnerHTML();
  localStorage.removeItem('editPerson');
});

const createInnerHTML = () => {
  const headerHtml = `
    <th>Fullname</th>
        <th>Address</th>
        <th>City</th>
        <th>State</th>
        <th>Zip</th>
        <th>Phonenumber</th>
        <th>Email</th>
        <th></th>`;
  let innerHtml = `${headerHtml}`;
  if (addressBook.length != 0) {
    for (const contact of addressBook) {
      innerHtml = `${innerHtml}
      <tr>
        <td>${contact._name}</td>
        <td>${contact._address}</td>
        <td>${contact._city}</td>
        <td>${contact._state}</td>
        <td>${contact._zip}</td>
        <td>${contact._phoneNumber}</td>
        <td>${contact._email}</td>
        <td class="action-items">
          <img id="${contact._id}" onclick="remove(this)" alt="delete" 
                    src="../assets/delete-black-18dp.svg">
          <img id="${contact._id}" onclick="update(this)" alt="edit" 
                    src="../assets/create-black-18dp.svg">
        </td>
      </tr>`;
    }
  }
  document.querySelector('#table-display').innerHTML = innerHtml;
};

const getContactsFromLocalStorage = () => {
  return localStorage.getItem('AddressBook') ? JSON.parse(localStorage.getItem('AddressBook')) : [];
}

const remove = (node) => {
  let contact = addressBook.find(contactObj => contactObj._id == node.id);
  if (!contact) {
    return;
  }
  const index = addressBook
                .map(contactObj => contactObj._id)
                .indexOf(contact._id);
  addressBook.splice(index, 1);
  localStorage.setItem("AddressBook", JSON.stringify(addressBook));
  document.querySelector(".person-count").textContent = addressBook.length;
  createInnerHTML();
}

const update = (node) => {
  let contact = addressBook.find(contactObj => contactObj._id == node.id);
  if (!contact) {
    return;
  }
  localStorage.setItem("editPerson", JSON.stringify(contact));
  window.location.replace(site_properties.addContact_page);
}