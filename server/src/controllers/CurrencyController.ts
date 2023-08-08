import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import { NotFound, CurrencyModel, ServiceError } from "../models";
import { Request, Response } from "express";

const editableFields = ["name"];
let model: CurrencyModel;
(async () => {
  model = new CurrencyModel(await getCollection("currencies"));
})();

const deleteCurrency = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  if (!(await model.deleteCurrency(_id)))
    throw new NotFound("No currency found with the provided id.");

  requestHandler.sendResponse(res, {
    message: "Currency deleted.",
    success: true,
  });
};

const addCurrency = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(editableFields, req.body);

  await model.addCurrency(data);

  requestHandler.sendResponse(res, {
    message: "Currency saved.",
    success: true,
  });
};

const editCurrency = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    req.body,
    false,
  );

  const currency = await model.editCurrency(_id, fieldsToUpdate);
  if (!currency.value) throw new ServiceError("Database error.", currency);

  requestHandler.sendResponse(res, {
    data: currency.value,
    message: "Currency edited.",
    success: true,
  });
};

const getCurrency = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const currency = await model.getCurrency(_id);
  if (!currency) throw new NotFound("No currency found with the provided id.");

  requestHandler.sendResponse(res, {
    data: currency,
    message: "Currency retrieved.",
    success: true,
  });
};

const getCurrencies = async (req: Request, res: Response): Promise<void> => {
  // @ts-ignore
  const currencies = await model.getCurrencies(req.session.user._id);
  if (!currencies.length) throw new NotFound("No currencies found.");

  requestHandler.sendResponse(res, {
    data: currencies,
    message: "Currencies retrieved.",
    success: true,
  });
};

export {
  addCurrency,
  deleteCurrency,
  editCurrency,
  getCurrency,
  getCurrencies,
};
