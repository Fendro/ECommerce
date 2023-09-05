export const orders = {
  $jsonSchema: {
    bsonType: "object",
    title: "Order Object Validation",
    required: ["user_id", "packages_id", "orderDate"],
    properties: {
      user_id: {
        bsonType: "objectId",
        description: "must reference a users document and is required.",
      },
      packages_id: {
        bsonType: "array",
        description:
          "must be an array of packages' id containing at least one item.",
        items: {
          bsonType: "objectId",
          description: "must reference a packages document.",
        },
        minItems: 1,
      },
      orderDate: {
        bsonType: "date",
        description: "must be a date and is required.",
      },
      state: {
        bsonType: "string",
        enum: ["failed", "pending", "confirmed", "paid"],
        description: "must be a string out of the enumerated values.",
      },
    },
  },
};
