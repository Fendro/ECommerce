import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import { AddressModel, NotFound, ServiceError } from "../models";
import { Request, Response } from "express";

const editableFields = [
  "firstname",
  "lastname",
  "address",
  "zip",
  "city",
  "country",
  "phone",
];
let model: AddressModel;
(async () => {
  model = new AddressModel(
    await getCollection("addresses"),
    await getCollection("users"),
  );
})();

const addAddress = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = requestHandler.fetchParams(["user_id"], req.params);
  const data = requestHandler.fetchParams(editableFields, req.body);

  const { insertedId } = await model.addAddress(user_id, data);

  requestHandler.sendResponse(res, {
    data: { _id: insertedId },
    message: "Address saved.",
    success: true,
  });
};

const deleteAddress = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  if (!(await model.deleteAddress(_id)))
    throw new NotFound("No address found with the provided id.");

  requestHandler.sendResponse(res, {
    message: "Address deleted.",
    success: true,
  });
};

const editAddress = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    req.body,
    false,
  );

  const address = await model.editAddress(_id, fieldsToUpdate);
  if (!address.value) throw new ServiceError("Database error.", address);

  requestHandler.sendResponse(res, {
    data: address.value,
    message: "Address edited.",
    success: true,
  });
};

const getAddress = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const address = await model.getAddress(_id);
  if (!address) throw new NotFound("No address found with the provided id.");

  requestHandler.sendResponse(res, {
    data: address,
    message: "Address retrieved.",
    success: true,
  });
};

const getAddresses = async (req: Request, res: Response): Promise<void> => {
  // @ts-ignore
  const addresses = await model.getAddresses(req.session.user._id);
  if (!addresses.length) throw new NotFound("No addresses found.");

  requestHandler.sendResponse(res, {
    data: addresses,
    message: "Addresses retrieved.",
    success: true,
  });
};

export { addAddress, deleteAddress, editAddress, getAddress, getAddresses };
