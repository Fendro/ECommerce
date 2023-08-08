import requestHandler from "../services/requestHandler";
import { getCollection } from "../services";
import { NotFound, OrderModel, ServiceError, Unauthorized } from "../models";
import { Request, Response } from "express";

const editableFields = ["state"];
let model: OrderModel;
(async () => {
  model = new OrderModel(
    await getCollection("orders"),
    await getCollection("articles"),
    await getCollection("packages"),
  );
})();

const addOrder = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(["user_id", "packages"], req.body);

  const { insertedId } = await model.addOrder(data);

  requestHandler.sendResponse(res, {
    data: { _id: insertedId },
    message: "Order saved.",
    success: true,
  });
};

const editOrder = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const fieldsToUpdate = requestHandler.fetchParams(
    editableFields,
    req.body,
    false,
  );

  const order = await model.editOrder(_id, fieldsToUpdate);
  if (!order.value) throw new ServiceError("Database error.", order);

  requestHandler.sendResponse(res, {
    data: order.value,
    message: "Order edited.",
    success: true,
  });
};

const getOrder = async (req: Request, res: Response): Promise<void> => {
  const { _id } = requestHandler.fetchParams(["_id"], req.params);

  const order = await model.getOrder(_id);
  if (!order) throw new NotFound("No order found with the provided id.");

  // @ts-ignore
  if (order._id !== req.session.user._id && !req.session.user.admin)
    throw new Unauthorized("A user can only access their own orders.");

  requestHandler.sendResponse(res, {
    data: order,
    message: "Order retrieved.",
    success: true,
  });
};

const getOrders = async (req: Request, res: Response): Promise<void> => {
  // @ts-ignore
  const orders = await model.getOrders(req.session.user._id);
  if (!orders.length) throw new NotFound("No orders found.");

  requestHandler.sendResponse(res, {
    data: orders,
    message: "Orders retrieved.",
    success: true,
  });
};

export { addOrder, editOrder, getOrder, getOrders };
