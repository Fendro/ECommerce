import appConfig from "../configs/appConfig";
import { ResponseData } from "../types/ResponseData";
import User from "./User";

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
      this.response.dev = {
        needed: needed,
        obtained: obtained,
        stack: this.stack,
      };
    }
  }
}

class ForbiddenRequest extends Error {
  response: ResponseData;

  constructor(message: string, user: User) {
    super();
    this.response = {
      message: message,
      success: false,
    };
    if (appConfig.env === "development") {
      this.response.dev = {
        user: user,
        stack: this.stack,
      };
    }
  }
}

class NotFound extends Error {
  response: ResponseData;

  constructor(message: string) {
    super();
    this.response = {
      message: message,
      success: false,
    };
    if (appConfig.env === "development") {
      this.response.dev = {
        stack: this.stack,
      };
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
      this.response.dev = {
        error: error,
        stack: this.stack,
      };
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
      this.response.dev = {
        stack: this.stack,
      };
    }
  }
}

export { BadRequest, ForbiddenRequest, NotFound, ServiceError, Unauthorized };
