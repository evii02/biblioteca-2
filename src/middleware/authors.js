import { envs } from "../config/envs.js";

const api = envs.API;

export const getAuthors = async () => {
  try {
    const response = await fetch(`${api}/author`, {
      method: "GET",
      "Content-type": "application/json",
    });

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getByName = async (name) => {
  try {
    const response = await fetch(`${api}/author/${name}`, {
      method: "GET",
      "Content-Type": "application/json",
    });

    const { data } = await response.json();
    return data;
  } catch (error) {
    return false;
  }
};
