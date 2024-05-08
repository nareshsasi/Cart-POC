import Axios from "axios";

export const getApi = async (url, headers) => {
  const response = await Axios.get(url, headers);

  return response;
};
export const postApi = async (url, data) => {
  const response = await Axios.post(url, data);
  console.log(response, "response");

  return response?.data;
};
