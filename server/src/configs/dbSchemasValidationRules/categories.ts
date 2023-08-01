module.exports = {
  $jsonSchema: {
    bsonType: "object",
    title: "Category Object Validation",
    required: ["name"],
    properties: {
      name: {
        bsonType: "string",
        description: "'name' must be a unique string and is required.",
      },
    },
  },
};
