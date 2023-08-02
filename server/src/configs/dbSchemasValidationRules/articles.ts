module.exports = {
  $jsonSchema: {
    bsonType: "object",
    title: "Article Object Validation",
    required: [
      "categories",
      "description",
      "images",
      "name",
      "price",
      "quantity",
      "searches",
      "specs",
      "views",
    ],
    properties: {
      categories: {
        bsonType: "array",
        description: "must be an array of strings",
        items: {
          bsonType: "string",
        },
        minItems: 1,
      },
      description: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      images: {
        bsonType: "array",
        description: "must be an array of strings and is required",
        items: {
          bsonType: "string",
        },
        minItems: 1,
      },
      name: {
        bsonType: "string",
        description: "must be a string and is required",
      },
      price: {
        bsonType: ["double", "int", "long"],
        description: "must be a number and is required",
      },
      quantity: {
        bsonType: ["double", "int", "long"],
        description: "must be a number and is required",
      },
      searches: {
        bsonType: ["double", "int", "long"],
        description: "must be a number and is required",
      },
      specs: {
        bsonType: "array",
        description: "must be an array of strings and is required",
        items: {
          bsonType: "string",
        },
        minItems: 0,
      },
      views: {
        bsonType: ["double", "int", "long"],
        description: "must be a number and is required",
      },
    },
  },
};
