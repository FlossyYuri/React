import axios from "axios";
const baseUrl = "http://localhost:3000";

const getClients = () => {
  return axios(`${baseUrl}/clients`)
    .then((resp) => resp.data)
    .catch((_) => null);
};
const getClient = (id) => {
  axios(`${baseUrl}/client/${id}`).then((resp) => resp.data);
};
const deleteClient = (id) => {
  axios
    .delete(`${baseUrl}/client/${id}`)
    .then((resp) => resp && 1)
    .catch((_) => null);
};
const saveClient = (client) => {
  const method = client.id ? "put" : "post";
  const url = client.id
    ? `${baseUrl}/client/${client.id}`
    : `${baseUrl}/clients`;

  axios[method](url, client)
    .then((resp) => {
      return resp.data;
    })
    .catch((_) => null);
};
