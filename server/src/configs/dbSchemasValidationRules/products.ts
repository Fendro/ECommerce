module.exports = {
  $jsonSchema: {
    bsonType: "object",
    title: "User Object Validation",
    required: ["name", "price", "string"],
    properties: {
      name: {
        bsonType: "string",
        description: "'name' must be a unique string and is required",
      },
      price: {
        bsonType: "double",
        description: "'price' must be a double and is required",
      },
      string: {
        bsonType: "string",
        description: "'description' must be a string and is required",
      },
    },
  },
};
