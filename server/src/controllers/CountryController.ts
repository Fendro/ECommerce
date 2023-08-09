import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import { NotFound, CountryModel, ServiceError } from "../models";
import { Request, Response } from "express";

const editableFields = ["name"];
let model: CountryModel;
(async () => {
  model = new CountryModel(await getCollection("countries"));
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
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  if (!(await model.deleteCountry(_id)))
    throw new NotFound("No country found with the provided id.");

  requestHandler.sendResponse(res, {
    message: "Country deleted.",
    success: true,
  });
};

const editCountry = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    req.body,
    false,
  );

  const country = await model.editCountry(_id, fieldsToUpdate);
  if (!country.value) throw new ServiceError("Database error.", country);

  requestHandler.sendResponse(res, {
    data: country.value,
    message: "Country edited.",
    success: true,
  });
};

const getCountry = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const country = await model.getCountry(_id);
  if (!country) throw new NotFound("No country found with the provided id.");

  requestHandler.sendResponse(res, {
    data: country,
    message: "Country retrieved.",
    success: true,
  });
};

const getCountries = async (req: Request, res: Response): Promise<void> => {
  // @ts-ignore
  const countries = await model.getCountries(req.session.user._id);
  if (!countries.length) throw new NotFound("No countries found.");

  requestHandler.sendResponse(res, {
    data: countries,
    message: "Countries retrieved.",
    success: true,
  });
};

export { addCountry, deleteCountry, editCountry, getCountry, getCountries };
