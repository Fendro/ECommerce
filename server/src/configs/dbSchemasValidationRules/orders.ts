module.exports = {
  $jsonSchema: {
    bsonType: "object",
    title: "Order Object Validation",
    required: ["user_id", "packages_id", "orderDate"],
    properties: {
      user_id: {
        bsonType: "objectId",
        description: "must be an existing user's id and is required.",
      },
      packages_id: {
        bsonType: "array",
        description: "must be an array of packages' id and is required.",
        items: {
          bsonType: "objectId",
          description: "must be a package id.",
        },
        minItems: 1,
      },
      orderDate: {
        bsonType: "date",
        description: "must be a date and is required.",
      },
      state: {
        bsonType: "string",
        enum: ["failed", "pending", "accepted"],
        description: "must be a string out of the enumerated values.",
      },
    },
  },
};
