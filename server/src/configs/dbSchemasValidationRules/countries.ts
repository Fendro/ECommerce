module.exports = {
  $jsonSchema: {
    bsonType: "object",
    title: "Category Object Validation",
    required: ["name", "currency"],
    properties: {
      name: {
        bsonType: "string",
        description: "must be a unique string and is required.",
      },
      currency: {
        bsonType: "string",
        description: "must reference a currencies document and is required.",
      },
    },
  },
};
