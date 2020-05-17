export class User {
  id: string;
  firstName: string;
  lastName: string;

  constructor(id: string, firstName?: string, lastName?: string) {
    this.id = id ? id : '';
    this.firstName = firstName ? firstName : '';
    this.lastName = lastName ? lastName : '';
  }
  deserialize() {
    return Object.assign({}, this);
  }
}
