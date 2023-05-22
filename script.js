const json = {
  data: [
    {
      type: "articles",
      id: "1",
      attributes: {
        title: "JSON:API paints my bikeshed!",
        body: "The shortest article. Ever.",
      },
      relationships: {
        author: {
          data: { id: "42", type: "people" },
        },
      },
    },
  ],
  included: [
    {
      type: "people",
      id: "42",
      attributes: {
        name: "John",
      },
    },
  ],
};
const convertItem = (value) => {
  //[name,value] || pr[]

  if (isPrimitive(value[1]))
    return { type: typeof value[1], example: value[1] };
  if (value[1] instanceof Array)
    return { type: "array", items: convertObject(value[1], {}) };
  myObject = {};
  return {
    type: typeof value[1],
    properities: convertObject(value[1], myObject),
  };
};

const isPrimitive = (inputValue) => {
  return !(inputValue === Object(inputValue));
};
const convertObject = (object, result) => {
  const propereties = Object.entries(object);
  propereties.forEach((p) => {
    propConverted = convertItem(p);
    object instanceof Array
      ? Object.assign(result, propConverted)
      : (result[p[0]] = propConverted);
  });
  return result;
};

const swagger = {};
convertObject(json, swagger);

console.log("You entered this json response :", json);
console.log("\nConverting to Swagger\n");
console.log("Result is :-\n");
console.log(JSON.stringify(swagger, null, 2));
