import { BadRequest } from "../models";
import { Request, Response } from "express";
import { ResponseData } from "../types";

const searchBuilder = (req: Request): { [key: string]: any } => {
  const { field, value, orderBy, order, page, limit } = req.query;

  let find: { [key: string]: any } = {};
  let options: { [key: string]: any } = {};
  let sort: { [key: string]: any } = {};
  let skip: number = 0;

  if (field) {
    if (!value) return {};

    if (Array.isArray(field)) {
      if (!Array.isArray(value) || field.length !== value.length) return {};

      for (const index in field) {
        let tmp = parseFloat(value[index].toString());
        find[field[index].toString()] = isNaN(tmp) ? value[index] : tmp;
      }
    } else {
      let tmp = parseFloat(value.toString());
      find[field.toString()] = isNaN(tmp) ? value : tmp;
    }
  }

  if (orderBy) {
    if (!order) return {};

    if (Array.isArray(orderBy)) {
      if (!Array.isArray(order) || orderBy.length !== order.length) return {};

      for (const index in orderBy) {
        let tmp = parseFloat(order[index].toString());
        sort[orderBy[index].toString()] = isNaN(tmp) ? order[index] : tmp;
      }
    } else {
      let tmp = parseFloat(order.toString());
      sort[orderBy.toString()] = isNaN(tmp) ? order : tmp;
    }

    options["sort"] = sort;
  }

  if (page && limit) {
    skip = parseInt(page.toString()) * parseInt(limit.toString());
    options["skip"] = skip;
  }

  if (limit) {
    options["limit"] = parseInt(limit.toString());
  }

  return {
    find: find,
    options: options,
  };
};

/**
 * Takes an array of strings and parses the provided param
 * object to return its attribute which match each string.
 * @param soughtParams The array of parameters to look for.
 * @param params The object in which to look through.
 * @param strict Optional boolean to throw a BadRequest error
 * as soon as a sought parameter is missing from the provided
 * object. Defaults to true.
 * @returns An object containing the sought parameters
 * as attributes and their retrieved matches as values.
 */
function fetchParams(
  soughtParams: string[],
  params: { [key: string]: any },
  strict: boolean = true,
): { [key: string]: any } {
  const data: { [key: string]: any } = {};
  for (const soughtParam of soughtParams) {
    if (soughtParam in params) {
      data[soughtParam] = params[soughtParam];
    } else if (strict) {
      throw new BadRequest("Missing parameters.", soughtParams, params);
    }
  }

  if (!Object.keys(data).length)
    throw new BadRequest(
      "No fields to update where provided.",
      soughtParams,
      params,
    );

  return data;
}

/**
 * Standardized response handler to send successful responses,
 * enforcing the response format.
 * @param res
 * @param data
 */
function sendResponse(res: Response, data: ResponseData): void {
  res.status(200).json(data);
}

export default {
  searchBuilder,
  fetchParams,
  sendResponse,
};
