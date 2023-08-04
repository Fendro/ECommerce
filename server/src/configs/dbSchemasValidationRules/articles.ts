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
        description: "must be an array of strings.",
        items: {
          bsonType: "string",
          description: "must be a unique string.",
        },
        uniqueItems: true,
        minItems: 0,
      },
      description: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      featured: {
        bsonType: "bool",
        description: "must be a boolean",
      },
      images: {
        bsonType: "array",
        description: "must be an array of strings and is required.",
        items: {
          bsonType: "string",
          description: "must be a string.",
        },
        minItems: 0,
      },
      name: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      price: {
        bsonType: ["double", "int", "long"],
        description: "must be a number and is required.",
      },
      quantity: {
        bsonType: ["double", "int", "long"],
        description: "must be a number and is required.",
      },
      searches: {
        bsonType: ["double", "int", "long"],
        description: "must be a number and is required.",
      },
      specs: {
        bsonType: "array",
        description: "must be an array of strings and is required.",
        items: {
          bsonType: "string",
          description: "must be a string.",
        },
        minItems: 0,
      },
      views: {
        bsonType: ["double", "int", "long"],
        description: "must be a number and is required.",
      },
    },
  },
};
