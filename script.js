const json = `{
    "id": 10,
    "name": "doggie",
    "category": {
      "id": 1,
      "name": "Dogs"
    },
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "available"
  }`;
const convertItem = (value) => {
  //[name,value] || pr

  if (isPrimitive(value[1]) || value.length === 1)
    return value[1]
      ? { type: typeof value[1], example: value[1] }
      : { type: typeof value, example: value };
  if (Array.isArray(value[1]))
    return { type: "list", items: converArray(value[1]) };
  myObject = {};
  return {
    type: typeof value[1],
    properities: convertObject(value[1], myObject),
  };
};

const isPrimitive = (inputValue) => {
  return !(inputValue === Object(inputValue));
};
const converArray = (arr) => {
  items = [];
  arr.forEach((a) => {
    // console.log("itemmm>>",a)
    items.push(convertItem(a));
  });
  return items;
};
const convertObject = (object, result) => {
  const propereties = Object.entries(object);
  propereties.forEach((p) => {
    propConverted = convertItem(p);
    result[p[0]] = propConverted;
    // console.log("result>>>",result)
  });
  return result;
};
const jsonAsOject = JSON.parse(json);
// console.log(jsonAsOject);
const swagger = {};
convertObject(jsonAsOject, swagger);
// console.log("Swagger converted to json = ", swagger);
// console.log("Swagger as json : ", JSON.stringify(swagger));
console.log("You entered this json response :",json);
console.log("\nConverting to Swagger\n");
console.log("Result is :-\n");
console.log(JSON.stringify(swagger, null, 2));