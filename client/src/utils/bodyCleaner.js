export const bodyCleaner = (body) => {
  for (const index in body) {
    if (typeof body[index] === "string" && !body[index].length)
      delete body[index];
    if (typeof body[index] === "object" && !Object.keys(body[index]).length)
      delete body[index];
  }

  return body;
};
