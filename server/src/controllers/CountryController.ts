import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import { CountryModel, NotFound, ServiceError } from "../models";
import { Request, Response } from "express";

const editableFields = ["name", "currency"];
let model: CountryModel;
(async () => {
  model = new CountryModel(
    await getCollection("countries"),
    await getCollection("currencies"),
  );
})();

const addCountry = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(editableFields, req.body);

  const { insertedId } = await model.addCountry(data);

  requestHandler.sendResponse(res, {
    data: { _id: insertedId },
    message: "Country saved.",
    success: true,
  });
};

const deleteCountry = async (req: Request, res: Response): Promise<void> => {
  const { name } = requestHandler.fetchParams(["name"], req.params);

  if (!(await model.deleteCountry(name)))
    throw new NotFound("No country found with the provided name.");

  requestHandler.sendResponse(res, {
    message: "Country deleted.",
    success: true,
  });
};

const editCountry = async (req: Request, res: Response): Promise<void> => {
  const { name } = requestHandler.fetchParams(["name"], req.params);

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    req.body,
    false,
  );

  const country = await model.editCountry(name, fieldsToUpdate);
  if (!country.value) throw new ServiceError("Database error.", country);

  requestHandler.sendResponse(res, {
    data: country.value,
    message: "Country edited.",
    success: true,
  });
};

const getCountry = async (req: Request, res: Response): Promise<void> => {
  const { name } = requestHandler.fetchParams(["name"], req.params);

  const country = await model.getCountry(name);
  if (!country) throw new NotFound("No country found with the provided name.");

  requestHandler.sendResponse(res, {
    data: country,
    message: "Country retrieved.",
    success: true,
  });
};

const getCountries = async (req: Request, res: Response): Promise<void> => {
  // @ts-ignore
  const countries = await model.getCountries();
  if (!countries.length) throw new NotFound("No countries found.");

  requestHandler.sendResponse(res, {
    data: countries,
    message: "Countries retrieved.",
    success: true,
  });
};

export { addCountry, deleteCountry, editCountry, getCountry, getCountries };
