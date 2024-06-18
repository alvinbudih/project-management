module.exports = class CustomError extends Error {
  name;

  constructor(name, message) {
    super(message);
    this.name = name;
  }
}