export class RegistryValidationError extends Error {
  constructor(code, message, details = undefined) {
    super(message);
    this.name = 'RegistryValidationError';
    this.code = code;
    this.details = details;
  }
}

export function invariant(condition, code, message, details) {
  if (!condition) throw new RegistryValidationError(code, message, details);
}
