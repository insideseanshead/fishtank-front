const URL_PREFIX = "http://localhost:8080";
// const URL_PREFIX = 'https://seanfish-api.herokuapp.com'

const API = {
  login: function (userData) {
    console.log(userData);
    return fetch(`${URL_PREFIX}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },

  getProfile: function (token) {
    return fetch(`${URL_PREFIX}/api/users/secretProfile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => null);
  },
  getAllTanks: function () {
    return fetch(`${URL_PREFIX}/api/tanks`, {})
      .then((res) => res.json())
      .catch((err) => null);
  },
  getOneTank: function (tankId) {
    return fetch(`${URL_PREFIX}/api/tanks/${tankId}`, {})
      .then((res) => res.json())
      .catch((err) => null);
  },
  createTank: function (token, tankData) {
    return fetch(`${URL_PREFIX}/api/tanks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tankData),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  deleteTank: function (token, tankId) {
    return fetch(`${URL_PREFIX}/api/tanks/${tankId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  getOneFish: function (fishId) {
    return fetch(`${URL_PREFIX}/api/fish/${fishId}`, {})
      .then((res) => res.json())
      .catch((err) => null);
  },
  createFish: function (token, fishData) {
    return fetch(`${URL_PREFIX}/api/fish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fishData),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },
  deleteFish: function (token, fishId) {
    return fetch(`${URL_PREFIX}/api/fish/${fishId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => null);
  },
};

module.exports = API;
