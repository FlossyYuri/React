import axios from "axios";
const baseUrl = "http://localhost:3002";

// const getUser = () => {
//   return axios.defaults.headers.common["Authorization"];
// };
const getClients = (callBack, showError) => {
  axios(`${baseUrl}/clients`).then(callBack).catch(showError);
};
const getClient = (id, callBack, showError) => {
  axios(`${baseUrl}/client/${id}`).then(callBack).catch(showError);
};
const deleteClient = (id, callBack, showError) => {
  axios.delete(`${baseUrl}/client/${id}`).then(callBack).catch(showError);
};
const saveClient = (client, callBack, showError) => {
  const method = client.id ? "put" : "post";
  const url = client.id
    ? `${baseUrl}/client/${client.id}`
    : `${baseUrl}/clients`;
  delete client.id;
  axios[method](url, client).then(callBack).catch(showError);
};
const signIn = (user, callBack, showError) => {
  axios.post(`${baseUrl}/signin`, user).then(callBack).catch(showError);
};
const setUserToken = (user) => {
  if (user.token)
    axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
  else delete axios.defaults.headers.common["Authorization"];
};

export default {
  getClient,
  getClients,
  saveClient,
  deleteClient,
  signIn,
  setUserToken,
};
