import { Request, Response } from "express";
import { ResponseData } from "../types/ResponseData";
import { BadRequest } from "../models/Errors";

const searchBuilder = (req: Request): { [key: string]: any } => {
  const { field, value, orderBy, order, page, limit } = req.query;

  let find: { [key: string]: any } = {};

  if (field) {
    if (!value)
      throw new BadRequest(
        "A search field was provided without a search value.",
        ["value"],
        req.query,
      );

    if (Array.isArray(field) && Array.isArray(value)) {
      find = field.reduce(
        (result: { [key: string]: any }, key: string, index: number) => {
          result[key] = value[index];
          return result;
        },
        {},
      );
    }

    for (const index in find) {
      let tmp = parseFloat(find[index]);
      if (!isNaN(tmp)) find[index] = tmp;
    }
  }

  const sort: { [key: string]: any } = {};
  if (orderBy) {
    sort[orderBy.toString()] = order ?? 1;
  }

  console.log(find);
  return {
    find: find,
    options: { sort: { orderBy, order }, page, limit },
  };
};

function seekParams(
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

  return data;
}

function sendResponse(res: Response, data: ResponseData): void {
  res.status(200).json(data);
}

export default {
  searchBuilder,
  seekParams,
  sendResponse,
};
