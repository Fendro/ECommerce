export const users = {
  $jsonSchema: {
    bsonType: "object",
    title: "User Object Validation",
    required: ["email", "password", "username"],
    properties: {
      admin: {
        bsonType: "bool",
        description: "must be a boolean.",
      },
      email: {
        bsonType: "string",
        pattern: "^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
        description:
          "must be a regex ('^[w-.]+@([w-]+.)+[w-]{2,4}$') validated string and is required.",
      },
      password: {
        bsonType: "string",
        description: "must be a string and is required.",
      },
      username: {
        bsonType: "string",
        minLength: 2,
        maxLength: 20,
        description:
          "must be a string from 2 to 20 characters and is required.",
      },
    },
  },
};
