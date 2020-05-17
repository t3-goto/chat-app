export class DecodedToken {
  userId: string;
  firstName: string;
  lastName: string;
  exp: number;

  constructor() {
    this.userId = null;
    this.firstName = null;
    this.lastName = null;
    this.exp = 0;
  }
}
