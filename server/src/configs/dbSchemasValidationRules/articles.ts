export const articles = {
  $jsonSchema: {
    bsonType: "object",
    title: "Article Object Validation",
    required: ["name", "price", "specs"],
    properties: {
      categories: {
        bsonType: "array",
        description: "must be an array of references to categories documents.",
        items: {
          bsonType: "objectId",
          description: "must be a unique reference.",
        },
        uniqueItems: true,
        minItems: 0,
      },
      description: {
        bsonType: "string",
        description: "must be a string.",
      },
      featured: {
        bsonType: "bool",
        description: "must be a boolean.",
      },
      images: {
        bsonType: "array",
        description: "must be an array of strings.",
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
        description: "must be a number (EUR) and is required.",
      },
      quantity: {
        bsonType: ["double", "int", "long"],
        description: "must be a number.",
      },
      searches: {
        bsonType: ["double", "int", "long"],
        description: "must be a number.",
      },
      specs: {
        bsonType: "object",
        description: "must be an object and is required.",
        required: ["height", "length", "width"],
        properties: {
          height: {
            bsonType: ["double", "int", "long"],
            description: "must be a number and is required.",
          },
          length: {
            bsonType: ["double", "int", "long"],
            description: "must be a number and is required.",
          },
          width: {
            bsonType: ["double", "int", "long"],
            description: "must be a number and is required.",
          },
        },
        additionalProperties: true,
      },
      views: {
        bsonType: ["double", "int", "long"],
        description: "must be a number and is required.",
      },
    },
  },
};
