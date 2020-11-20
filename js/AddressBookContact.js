class Contact {

  get id() {
    return this._id;
  }
  set id(id) {
    let idRegex = RegExp('^[1-9]{1}[0-9]{0,}');
    if (idRegex.test(id)) {
      this._id = id;
    } else throw "Invalid Id!"
  }

  get name() {
    return this._name;
  }
  set name(name) {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}([\\s][A-Z]{1}[a-z]{2,}){0,2}$');
    if (nameRegex.test(name)) {
      this._name = name;
    }
    else throw 'Invalid Name!';
  }

  get address() {
    return this._address;
  }
  set address(address) {
    let addressRegex = RegExp('^[A-Za-z0-9,\\.]{3,}([\\s][A-Za-z0-9,\\.]{3,}){0,}$');
    if (addressRegex.test(address)) {
      this._address = address;
    }
    else throw "Invalid Address!";
  }

  get city() {
    return this._city;
  }
  set city(city) {
    this._city = city;
  }

  get state() {
    return this._state;
  }
  set state(state) {
    this._state = state;
  }

  get zip() {
    return this._zip;
  }
  set zip(zip) {
    let zipRegex = RegExp('^[1-9]{1}[0-9]{5}$');
    if (zipRegex.test(zip)) {
      this._zip = zip;
    }
    else throw "Invalid Zip!";
  }

  get phoneNumber() {
    return this._phoneNumber;
  }
  set phoneNumber(phoneNumber) {
    let phoneNumberRegex = RegExp('^(([+])?[0-9]{2}[\\s]){0,1}[1-9]{1}[0-9]{9}$');
    if (phoneNumberRegex.test(phoneNumber)) {
      this._phoneNumber = phoneNumber;
    }
    else throw "Invalid Phone Number!";
  }

  get email() {
    return this._email;
  }
  set email(email) {
    let emailRegex = RegExp("^[a-z0-9]+(([\\.+-][a-z0-9]{1,})?)+@[a-z0-9]+\\.([a-z]{2,4})+((\\.[a-z]{2,4})?)$");
    if (emailRegex.test(email)) {
      this._email = email;
    }
    else throw "Invalid Email!";
  }

  toString() {
    return  "ID = " + this._id + ", Name = " + this.name + ", Address = " + this.address +
      ", City = " + this.city + ", State = " + this.state + ", Zip = " + this.zip + ", Phone Number = " +
      this.phoneNumber + ", Email = " + this.email;
  }
}