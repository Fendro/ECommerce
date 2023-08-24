import appConfig from "../configs/appConfig";
import { ResponseData, User } from "types";

class BadRequest extends Error {
  response: ResponseData;
  status = 400;

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

class FailedDependency extends Error {
  response: ResponseData;
  status = 424;

  constructor(message: string, dependency: any) {
    super();
    this.response = {
      message: message,
      success: false,
    };
    if (appConfig.env === "development") {
      this.response.dev = {
        dependency: dependency,
        stack: this.stack,
      };
    }
  }
}

class ForbiddenRequest extends Error {
  response: ResponseData;
  status = 403;

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
  status = 404;

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
  response: ResponseData;
  status = 503;

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
  response: ResponseData;
  status = 401;

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

export {
  BadRequest,
  FailedDependency,
  ForbiddenRequest,
  NotFound,
  ServiceError,
  Unauthorized,
};
