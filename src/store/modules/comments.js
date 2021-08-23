import axios from "@/common/api";

export default {
  namespaced: true,
  state: {
    comments: [],
  },
  mutations: {
    SET_COMMENTS: (state, comments) => (state.comments = comments),
    CREATE_COMMENT: (state, comment) => state.comments.push(comment),
    DELETE_COMMENT(state, id) {
      let index = state.comments.findIndex((elem) => elem.id === id);
      state.comments.splice(index, 1);
    },
    UPDATE_COMMENT(state, comment) {
      let index = state.comments.findIndex((elem) => elem.id === comment.id);
      state.comments.splice(index, 1, comment);
    },
  },
  actions: {
    async FETCH_COMMENTS({ commit }) {
      const { data } = await axios.get("/comments").catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(JSON.stringify(error.message));
        }
      });
      commit("SET_COMMENTS", data);
    },

    async CREATE_COMMENT({ commit }, body) {
      const { data } = await axios.post("/comments", body).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(JSON.stringify(error.message));
        }
      });
      commit("CREATE_COMMENT", data);
    },

    async DELETE_COMMENT({ dispatch }, datas) {
      if (!datas.force) {
        datas.force = false;
      }
      let body = { force: datas.force };
      const response = await axios.delete(`/comments/${datas.id}`, { data: body }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(JSON.stringify(error.message));
        }
      });
      if (response) {
        dispatch("FETCH_COMMENTS");
      }
    },

    async UPDATE_COMMENT({ commit }, datas) {
      const { data } = await axios.put(`/comments/${datas.id}`, datas.body).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(JSON.stringify(error.message));
        }
      });
      commit("UPDATE_COMMENT", data);
    },
  },
  getters: {
    FILTER_COMMENTS: (state) => {
      return state.comments.sort((a, b) => {
        return a.id - b.id;
      });
    },
  },
};
