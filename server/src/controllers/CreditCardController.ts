import requestHandler from "../services/requestHandler";
import { getCollection } from "services";
import { CreditCardModel, NotFound, ServiceError } from "models";
import { Request, Response } from "express";

const editableFields = ["country", "number", "expirationDate"];
let model: CreditCardModel;
(async () => {
  model = new CreditCardModel(
    await getCollection("creditCards"),
    await getCollection("users"),
  );
})();

const addCreditCard = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = requestHandler.fetchParams(["user_id"], req.params);
  const data = requestHandler.fetchParams(editableFields, req.body);

  const { insertedId } = await model.addCreditCard(user_id, data);

  requestHandler.sendResponse(res, {
    data: { _id: insertedId },
    message: "Credit card saved.",
    success: true,
  });
};

const deleteCreditCard = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  if (!(await model.deleteCreditCard(_id)))
    throw new NotFound("No address found with the provided id.");

  requestHandler.sendResponse(res, {
    message: "Credit card deleted.",
    success: true,
  });
};

const editCreditCard = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    req.body,
    false,
  );

  const creditCard = await model.editCreditCard(_id, fieldsToUpdate);
  if (!creditCard.value) throw new ServiceError("Database error.", creditCard);

  requestHandler.sendResponse(res, {
    data: creditCard.value,
    message: "Credit card edited.",
    success: true,
  });
};

const getCreditCard = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const creditCard = await model.getCreditCard(_id);
  if (!creditCard)
    throw new NotFound("No credit card found with the provided id.");

  requestHandler.sendResponse(res, {
    data: creditCard,
    message: "Credit card retrieved.",
    success: true,
  });
};

const getCreditCards = async (req: Request, res: Response): Promise<void> => {
  // @ts-ignore
  const creditCards = await model.getCreditCards(req.session.user._id);
  if (!creditCards.length) throw new NotFound("No credit cards found.");

  requestHandler.sendResponse(res, {
    data: creditCards,
    message: "Credit cards retrieved.",
    success: true,
  });
};

export {
  addCreditCard,
  deleteCreditCard,
  editCreditCard,
  getCreditCard,
  getCreditCards,
};
