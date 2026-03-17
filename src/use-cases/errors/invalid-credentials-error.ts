export class InvalidCretentialsError extends Error {
  constructor() {
    super("Invalid credentials.");
  }
}
