module.exports = {
  $jsonSchema: {
    bsonType: "object",
    title: "User Object Validation",
    required: ["id", "login", "email", "password", "admin"],
    properties: {
      id: {
        bsonType: "int",
        description: "'id' must be an int and is required",
      },
      login: {
        bsonType: "string",
        minLength: 5,
        maxLength: 20,
        description: "'login' must be a unique string and is required",
      },
      email: {
        bsonType: "string",
        pattern: "^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
        description:
          "'email' must be a regex ('^[w-.]+@([w-]+.)+[w-]{2,4}$') validated string and is required",
      },
      password: {
        bsonType: "string",
        minLength: 8,
        maxLength: 20,
        description: "'password' must be a string and is required",
      },
      admin: {
        bsonType: "bool",
        description: "'admin' must be a boolean and is required",
      },
    },
  },
};
