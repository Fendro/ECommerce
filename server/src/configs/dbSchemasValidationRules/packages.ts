export const packages = {
  $jsonSchema: {
    bsonType: "object",
    title: "Package Object Validation",
    required: ["articles", "shippingMethod", "shippingStatus"],
    properties: {
      articles: {
        bsonType: "array",
        description: "must be an array and is required.",
        required: ["article", "quantity", "unitPriceOnOrder"],
        properties: {
          article: {
            bsonType: "objectId",
            description: "must reference an articles document and is required.",
          },
          quantity: {
            bsonType: ["int", "long"],
            description: "must be an integer and is required.",
          },
          unitPriceOnOrder: {
            bsonType: ["double", "int", "long"],
            description: "must be a number and is required.",
          },
        },
      },
      shippingMethod: {
        bsonType: "string",
        enum: ["standard", "express"],
        description:
          "must a string out of the enumerated values and is required.",
      },
      shippingStatus: {
        bsonType: "string",
        enum: [
          "waiting for payment",
          "in preparation",
          "ready for shipping",
          "in transit",
          "delayed",
          "delivered",
        ],
        description:
          "must be a string out of the enumerated values and is required.",
      },
    },
  },
};
