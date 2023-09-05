export const currencies = {
  $jsonSchema: {
    bsonType: "object",
    title: "Currency Object Validation",
    required: ["name", "rate", "manuallySet"],
    properties: {
      name: {
        bsonType: "string",
        description: "must be a unique string and is required.",
      },
      description: {
        bsonType: "string",
        description: "must be a string.",
      },
      rate: {
        bsonType: ["double", "int", "long"],
        description: "must be a number and is required.",
      },
      manuallySet: {
        bsonType: "bool",
        description: "must be a boolean and is required.",
      },
    },
  },
};
