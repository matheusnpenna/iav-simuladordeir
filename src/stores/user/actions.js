import { setToken, removeToken } from "../../setup/api";

export default {
  login(data) {
    return new Promise((resolve, reject) => {
      window.axios
        .post("/accounts/signin", data)
        .then((response) => {
          setToken(response.data.access_token);
          this.user = response.data;
          this.logged = true;
          resolve();
        })
        .catch(reject);
    });
  },

  get() {
    return new Promise((resolve, reject) => {
      window.axios
        .get("/accounts/my-profile")
        .then((response) => {
          this.user = response.data;
          if (window.FS) {
            window.FS.identify(response.data.id, {
              displayName: response.data.name,
              email: response.data.email,
            });
          }
          resolve();
        })
        .catch(function (error) {
          // if (
          //   error.response.status === 401 ||
          //   error.response.data.code === "token_not_valid"
          // ) {
          // }
          removeToken();
          reject(error);
        });
    });
  },

  postLogin() {
    return new Promise((resolve, reject) => {
      this.loading = true;
      Promise.all([this.get()])
        .then(() => {
          this.logged = true;
        })
        .catch(reject)
        .finally(() => {
          this.loading = false;
        });
    });
  },

  logout() {
    return new Promise((resolve) => {
      removeToken();
      this.user = {};
      this.isLogged = false;
      resolve();
    });
  },

  getCreatedUsers() {
    return new Promise((resolve, reject) => {
      return window.axios
        .get(`accounts/users`)
        .then(({ data: { next, previous, count, results } }) => {
          this.createdUsers = results;
          this.pagination = { next, previous, count };
          resolve(results);
        })
        .catch(reject);
    });
  },
  createUser(data) {
    return new Promise((resolve, reject) => {
      return window.axios
        .post(`accounts/users`, data)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(reject);
    });
  },
  updateUser(data) {
    const id = data.id;
    delete data.id;
    return new Promise((resolve, reject) => {
      return window.axios
        .put(`accounts/users/${id}`, data)
        .then(resolve)
        .catch(reject);
    });
  },
  deleteUser(id) {
    return new Promise((resolve, reject) => {
      return window.axios
        .delete(`accounts/users/${id}`)
        .then(resolve)
        .catch(reject);
    });
  },
  getUserById(id) {
    return new Promise((resolve, reject) => {
      return window.axios
        .get(`accounts/users/${id}`)
        .then(({ data }) => resolve(data))
        .catch(reject);
    });
  },
};
