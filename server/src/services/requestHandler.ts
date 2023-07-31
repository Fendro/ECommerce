import { Request, Response } from "express";
import { ResponseData } from "../types/ResponseData";
import { BadRequest } from "../models/Errors";

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

const searchBuilder = (req: Request): { [key: string]: any } => {
  const { field, value, sortBy, sortField, order, skip, limit } = req.query;

  const find: { [key: string]: any } = {};
  if (field) {
    if (!value)
      throw new BadRequest(
        "A search field was provided without a search value.",
        ["value"],
        req.query,
      );

    find[field.toString()] = value;
  }

  const sort: { [key: string]: any } = {};
  if (sortBy) {
    sort[sortBy.toString()] = order ?? 1;
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
