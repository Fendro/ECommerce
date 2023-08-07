module.exports = {
  $jsonSchema: {
    bsonType: "object",
    title: "Orders Object Validation",
    required: ["user", "articles", "orderDate"],
    properties: {
      user: {
        bsonType: ["objectId", "object"],
        description:
          "must be an existing user's id or an object containing a guest's information.",
      },
      articles: {
        bsonType: "array",
        description: "must be an array of objects and is required.",
        items: {
          bsonType: "object",
          description: "must be an object and is required.",
          required: ["article", "quantity", "unitPriceOnOrder"],
          properties: {
            article: {
              bsonType: "objectId",
              description: "must be an existing article's id and is required.",
            },
            quantity: {
              bsonType: ["int", "long"],
              description: "must be an integer and is required.",
            },
            unitPriceOnOrder: {
              bsonType: ["double", "int", "long"],
              description: "must be an integer and is required.",
            },
          },
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
