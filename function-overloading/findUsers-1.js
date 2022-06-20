const mockData = require("./MOCK_DATA.json");

function findUsers({ query, selectInput = [], optionsInput = {} }) {
  if (!query) {
    return mockData;
  }

  let select;
  let options;

  // query, select & options
  // query, select
  if (Array.isArray(selectInput)) {
    select = selectInput;
    options = optionsInput;
  }
  // query & options
  else {
    select = [];
    options = selectInput;
  }

  const result = mockData
    .filter((item) => {
      const iKeys = Object.keys(item);

      for (let i = 0; i < iKeys.length; i++) {
        const key = iKeys[i];

        if (query[key] && query[key] !== item[key]) {
          return false;
        }
      }

      return true;
    })
    .map((item) => {
      if (!select.length) return item;

      return Object.fromEntries(
        select.filter((key) => key in item).map((key) => [key, item[key]])
      );
    });

  if (options && options.limit) {
    return result.slice(0, options.limit);
  }

  return result;
}

const query = {
  gender: "Male",
};

const select = ["id", "first_name"];

const options = {
  limit: 1,
};

const result1 = findUsers(query);
const result2 = findUsers(query, select);
const result3 = findUsers(query, options);
const result4 = findUsers(query, select, options);

console.log("Just query");
console.table(result1);
console.log("Query & id, name");
console.table(result2);
console.log("Query & limit: 1");
console.table(result3);
console.log("Query, id, name & limit 1");
console.table(result4);
