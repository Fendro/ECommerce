const sha1 = require("sha1");

function isLoginValid(login: string): boolean {
  return login.length >= 5 && login.length <= 20;
}

function isEmailValid(email: string): boolean {
  const regexValidator = new RegExp("^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  return regexValidator.test(email);
}

function doPasswordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

function passwordHashing(password: string): string {
  return sha1(password);
}

export { isLoginValid, isEmailValid, doPasswordsMatch, passwordHashing };
