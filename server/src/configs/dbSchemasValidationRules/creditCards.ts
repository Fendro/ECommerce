export const creditCards = {
  $jsonSchema: {
    bsonType: "object",
    title: "Credit Card Object Validation",
    required: ["user_id", "country", "number", "expirationDate", "token"],
    properties: {
      user_id: {
        bsonType: "objectId",
        description: "must reference a users document and is required.",
      },
      country: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      number: {
        bsonType: "string",
        pattern: "^\\d{4}$",
        description: "must be a regex validated string and is required.",
      },
      expirationDate: {
        bsonType: "string",
        pattern: "^\\d{2}/\\d{2}$",
        description: "must be a regex validated string and is required.",
      },
      token: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
    },
  },
};
