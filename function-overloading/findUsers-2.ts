import mockData from "./MOCK_DATA.json";

type Data = typeof mockData;

type Query = Partial<Data[number]>;

type Select = (keyof Data[number])[];

type Result = Data | Partial<Data>;

type Options = {
  limit: number;
};

function findUsers(query: Query): Result;
function findUsers(
  query: Query,
  selectInput?: Select,
  options?: Options
): Result;
function findUsers(query: Query, selectInput: Select): Result;
function findUsers(query: Query, options: Options): Result;

function findUsers(
  query: Query,
  selectInput?: unknown,
  optionsInput?: unknown
) {
  if (!query) {
    return mockData;
  }

  let select: Select;
  let options: Options;

  if (Array.isArray(selectInput)) {
    select = selectInput as unknown as Select;
    options = optionsInput as unknown as Options;
  } else {
    select = [] as unknown as Select;
    options = selectInput as Options;
  }

  const result = mockData
    .filter((item) => {
      const iKeys = Object.keys(item) as (keyof Data[number])[];

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
    return result.slice(0, options.limit) as Result;
  }

  return result;
}

const query = {
  gender: "Male",
};

const select: Select = ["id", "first_name"];

const options: Options = {
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
