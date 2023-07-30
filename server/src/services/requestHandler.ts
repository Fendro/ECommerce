import { Request, Response } from "express";
import { ResponseData } from "../types";

function seekParams(
  soughtParams: string[],
  params: { [key: string]: any },
  strict: boolean = true,
): { [key: string]: any } | false {
  const data: { [key: string]: any } = {};
  for (const soughtParam of soughtParams) {
    if (soughtParam in params) {
      data[soughtParam] = params[soughtParam];
    } else if (strict) {
      return false;
    }
  }

  return data;
}

const searchBuilder = (req: Request): { [key: string]: any } => {
  const { searchField, searchValue, sortBy, order, skip, limit } = req.query;

  const find: { [key: string]: any } = {};
  if (searchField) {
    find[searchField.toString()] = searchValue;
  }

  const sort: { [key: string]: any } = {};
  if (sortBy) {
    sort[sortBy.toString()] = order;
  }

  return {
    find: find,
    options: { sort: { sortBy, order }, skip, limit },
  };
};

function sendResponse(res: Response, data: ResponseData): void {
  res.status(200).json(data);
}

export default {
  searchBuilder,
  seekParams,
  sendResponse,
};
