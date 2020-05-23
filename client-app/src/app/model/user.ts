export class User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  initial: string;

  constructor(
    id?: string,
    firstName?: string,
    lastName?: string,
    fullName?: string,
    initial?: string
  ) {
    this.id = id ? id : '';
    this.firstName = firstName ? firstName : '';
    this.lastName = lastName ? lastName : '';
    this.fullName = fullName ? fullName : this.firstName + ' ' + this.lastName;
    this.initial = initial ? initial : this.firstName.slice(0, 1);
  }
  deserialize() {
    return Object.assign({}, this);
  }
}
