export class UserAlreadyActiveError extends Error {
  constructor() {
    super("User already active.");
  }
}
