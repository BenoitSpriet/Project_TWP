import axios from "@/common/api";

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  mutations: {
    SET_CATEGORIES: (state, categories) => (state.categories = categories),
    CREATE_CATEGORY: (state, category) => state.categories.push(category),
    DELETE_CATEGORY(state, id) {
      let index = state.categories.findIndex((elem) => elem.id === id);
      state.categories.splice(index, 1);
    },
    UPDATE_CATEGORY(state, category) {
      let index = state.categories.findIndex((elem) => elem.id === category.id);
      state.categories.splice(index, 1, category);
    },
  },
  actions: {
    async FETCH_CATEGORIES({ commit }) {
      const { data } = await axios.get("/categories").catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(JSON.stringify(error.message));
        }
      });
      commit("SET_CATEGORIES", data);
    },

    async CREATE_CATEGORY({ commit }, body) {
      const { data } = await axios.post("/categories", body).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(JSON.stringify(error.message));
        }
      });
      commit("CREATE_CATEGORY", data);
    },

    async DELETE_CATEGORY({ dispatch }, id) {
      let body = { force: true };
      const response = await axios.delete(`/categories/${id}`, { data: body }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(JSON.stringify(error.message));
        }
      });
      if (response) {
        dispatch("FETCH_CATEGORIES");
      }
    },

    async UPDATE_CATEGORY({ commit }, datas) {
      const { data } = await axios.put(`/categories/${datas.id}`, datas.body).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(JSON.stringify(error.message));
        }
      });
      commit("UPDATE_CATEGORY", data);
    },
  },
  getters: {
    SORT_CATEGORIES: (state) => {
      return state.categories
        .filter((category) => category.name !== "Non classé")
        .sort((a, b) => {
          return a.id - b.id;
        });
    },
  },
};
