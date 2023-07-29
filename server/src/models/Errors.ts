import appConfig from "../configs/appConfig";
import { User } from "../types";

class BadRequest extends Error {
  response: { [key: string]: any };

  constructor(
    message: string,
    needed: string[],
    obtained: { [key: string]: any },
  ) {
    super();
    this.response = {
      message: message,
      success: false,
    };
    if (appConfig.env === "development") {
      this.response.needed = needed;
      this.response.obtained = obtained;
      this.response.stack = this.stack;
    }
  }
}

class ForbiddenRequest extends Error {
  response: { [key: string]: any };

  constructor(message: string, user: User) {
    super();
    this.response = {
      message: message,
      success: false,
    };
    if (appConfig.env === "development") {
      this.response.user = user;
      this.response.stack = this.stack;
    }
  }
}

class ServiceError extends Error {
  response: { [key: string]: any };

  constructor(message: string, error: unknown) {
    super();
    this.response = {
      message: message,
      success: false,
    };
    if (appConfig.env === "development") {
      this.response.error = error;
      this.response.stack = this.stack;
    }
  }
}

class Unauthorized extends Error {
  response: { [key: string]: any };

  constructor(message: string) {
    super();
    this.response = {
      message: message,
      success: false,
    };
    if (appConfig.env === "development") {
      this.response.stack = this.stack;
    }
  }
}

export { BadRequest, ForbiddenRequest, ServiceError, Unauthorized };
