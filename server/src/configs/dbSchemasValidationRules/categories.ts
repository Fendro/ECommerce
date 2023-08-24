export const categories = {
  $jsonSchema: {
    bsonType: "object",
    title: "Category Object Validation",
    required: ["name"],
    properties: {
      name: {
        bsonType: "string",
        minLength: 2,
        maxLength: 20,
        description:
          "must be a unique string from 2 to 20 characters and is required.",
      },
      promotion: {
        bsonType: ["double", "int", "long"],
        description: "must be a number.",
      },
    },
  },
};
