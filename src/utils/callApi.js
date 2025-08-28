// // utils/callApi.js
// import { generateJWTToken } from "./generateJWTToken";

// export const callApi = async (url, method = "GET", bodyOrParams = {}) => {
//   const token = generateJWTToken();

//   let fullUrl = url;
//   let options = {
//     method,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };

//   if (method === "GET") {
//     const queryString = new URLSearchParams(bodyOrParams).toString();
//     if (queryString) {
//       fullUrl = `${url}?${queryString}`;
//     }
//   } else {
//     options.body = JSON.stringify(bodyOrParams); // 👈 send proper JSON body
//   }

//   try {
//     const response = await fetch(fullUrl, options);

//     if (!response.ok) {
//       const error = await response.text();
//       throw new Error(error || "Something went wrong");
//     }

//     return await response.json();
//   } catch (error) {
//     throw new Error(error.message || "API Error");
//   }
// };



// params

// utils/callApi.js
import { generateJWTToken } from "./generateJWTToken";

export const callApi = async (url, method = "GET", params = {}) => {
  const token = generateJWTToken();

  // build query string (not encoding @ into %40)
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value ?? ""}`)
    .join("&");

  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const options = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "API Error");
  }
};
