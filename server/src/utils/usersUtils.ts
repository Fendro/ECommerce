const sha1 = require("sha1");

/**
 * Takes a password and hashes it with sha1 algorithm.
 * @param password The password.
 * @returns The hashed password.
 */
function passwordHashing(password: string): string {
  return sha1(password);
}

export { passwordHashing };
