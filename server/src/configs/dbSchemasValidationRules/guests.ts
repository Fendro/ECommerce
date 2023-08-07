module.exports = {
  $jsonSchema: {
    bsonType: "object",
    title: "User Object Validation",
    required: [
      "address",
      "city",
      "country",
      "email",
      "firstname",
      "lastname",
      "phone",
      "zip",
    ],
    properties: {
      address: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      city: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      country: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      email: {
        bsonType: "string",
        pattern: "^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
        description: "must be a regex validated string and is required.",
      },
      firstname: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      lastname: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      phone: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      zip: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
    },
  },
};
