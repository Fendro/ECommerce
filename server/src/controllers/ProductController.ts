import { Request, Response } from "express";
import dbCRUD from "../services/dbCRUD";
import requestHandler from "../services/requestHandler";

const collection: string = "products";

const addProduct = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, [
    "name",
    "price",
    "description",
  ]);
  if (!data) return;

  const product = await dbCRUD.find(collection, { name: data.name });
  if (product.length) {
    requestHandler.sendResponse(res, {
      message: "A product with this name already exists.",
      statusCode: 400,
    });
    return;
  }

  (await dbCRUD.insert(collection, data))
    ? requestHandler.sendResponse(res, {
        message: "Product registered.",
        statusCode: 200,
      })
    : requestHandler.sendResponse(res, {
        message: "Product registration failed.",
        statusCode: 400,
      });
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, ["name"]);
  if (!data) return;

  if (!(await dbCRUD.find(collection, data))) {
    requestHandler.sendResponse(res, {
      message: "No product found matching the provided parameters.",
      statusCode: 400,
    });
  }

  (await dbCRUD.remove(collection, data))
    ? requestHandler.sendResponse(res, {
        message: "Product deletion succeeded.",
        statusCode: 200,
      })
    : requestHandler.sendResponse(res, {
        message: "Product deletion failed.",
        statusCode: 400,
      });
};

const editProduct = () => {};

const getProduct = async (req: Request, res: Response): Promise<void> => {
  const data = requestHandler.fetchParams(req, res, ["name"]);
  if (!data) return;

  const products = await dbCRUD.find(collection, data);
  products.length
    ? requestHandler.sendResponse(res, {
        data: products,
        message: "Product retrieved.",
        statusCode: 200,
      })
    : requestHandler.sendResponse(res, {
        message: "No product matches the requested id.",
        statusCode: 400,
      });
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  console.log("hello");
  const products = await dbCRUD.getCollection(collection);
  products.length
    ? requestHandler.sendResponse(res, {
        data: products,
        message: "Products retrieved.",
        statusCode: 200,
      })
    : requestHandler.sendResponse(res, {
        message: "No products found.",
        statusCode: 400,
      });
};

export { addProduct, deleteProduct, editProduct, getProduct, getProducts };
