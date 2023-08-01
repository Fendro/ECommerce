module.exports = {
  $jsonSchema: {
    bsonType: "object",
    title: "Article Object Validation",
    required: ["name", "price", "description", "images", "specs"],
    properties: {
      name: {
        bsonType: "string",
        description: "'name' must be a unique string and is required.",
      },
      price: {
        bsonType: "double",
        description: "'price' must be a double and is required.",
      },
      description: {
        bsonType: "string",
        description: "'description' must be a string and is required.",
      },
      images: {
        bsonType: "array",
        description: "'images' must be a unique string and is required.",
      },
      specs: {
        bsonType: "array",
        description: "'specs' must be an array and is required.",
      },
      views: {
        bsonType: "long",
        description: "'views' must be an integer and is required.",
      },
    },
  },
};
