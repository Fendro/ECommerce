import requestHandler from "../services/requestHandler";
import { getCollection } from "services";
import { NotFound, CurrencyModel, ServiceError } from "models";
import { Request, Response } from "express";

const editableFields = ["name", "description", "rate", "manuallySet"];
let model: CurrencyModel;
(async () => {
  model = new CurrencyModel(await getCollection("currencies"));
})();

const addCurrency = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["name", "rate"], req.body);

  const { insertedId } = await model.addCurrency(data);

  requestHandler.sendResponse(res, {
    data: { _id: insertedId },
    message: "Currency saved.",
    success: true,
  });
};

const deleteCurrency = async (req: Request, res: Response): Promise<void> => {
  const { name } = requestHandler.fetchParams(["name"], req.params);

  if (!(await model.deleteCurrency(name)))
    throw new NotFound("No currency found with the provided name.");

  requestHandler.sendResponse(res, {
    message: "Currency deleted.",
    success: true,
  });
};

const editCurrency = async (req: Request, res: Response): Promise<void> => {
  const { name } = requestHandler.fetchParams(["name"], req.params);

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    req.body,
    false,
  );

  const currency = await model.editCurrency(name, fieldsToUpdate);
  if (!currency.value) throw new ServiceError("Database error.", currency);

  requestHandler.sendResponse(res, {
    data: currency.value,
    message: "Currency edited.",
    success: true,
  });
};

const getCurrency = async (req: Request, res: Response): Promise<void> => {
  const { name } = requestHandler.fetchParams(["name"], req.params);

  const currency = await model.getCurrency(name);
  if (!currency)
    throw new NotFound("No currency found with the provided name.");

  requestHandler.sendResponse(res, {
    data: currency,
    message: "Currency retrieved.",
    success: true,
  });
};

const getCurrencies = async (req: Request, res: Response): Promise<void> => {
  // @ts-ignore
  const currencies = await model.getCurrencies();
  if (!currencies.length) throw new NotFound("No currencies found.");

  requestHandler.sendResponse(res, {
    data: currencies,
    message: "Currencies.json retrieved.",
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
