module.exports = {
  $jsonSchema: {
    bsonType: "object",
    title: "Article Object Validation",
    required: [
      "user_id",
      "firstname",
      "lastname",
      "address",
      "zip",
      "city",
      "country",
      "phone",
    ],
    properties: {
      user_id: {
        bsonType: "objectId",
        description: "must reference a users document and is required.",
      },
      firstname: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      lastname: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      address: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      zip: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      country: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      phone: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
    },
  },
};
