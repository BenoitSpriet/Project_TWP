import axios from "@/common/api";

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  mutations: {
    SET_POSTS: (state, posts) => (state.posts = posts),
    CREATE_POST: (state, post) => state.posts.push(post),
    DELETE_POST(state, id) {
      let index = state.posts.findIndex((elem) => elem.id === id);
      state.posts.splice(index, 1);
    },
    UPDATE_POST(state, post) {
      let index = state.posts.findIndex((elem) => elem.id === post.id);
      state.posts.splice(index, 1, post);
    },
  },
  actions: {
    async FETCH_POSTS({ commit }) {
      const { data } = await axios.get("/posts").catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(JSON.stringify(error.message));
        }
      });
      commit("SET_POSTS", data);
    },

    async CREATE_POST({ commit }, body) {
      const { data } = await axios.post("/posts", body).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(JSON.stringify(error.message));
        }
      });
      commit("CREATE_POST", data);
    },

    async DELETE_POST({ dispatch }, datas) {
      if (!datas.force) {
        datas.force = false;
      }
      let body = { force: datas.force };
      const response = await axios.delete(`/posts/${datas.id}`, { data: body }).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(JSON.stringify(error.message));
        }
      });
      if (response) {
        dispatch("FETCH_POSTS");
      }
    },

    async UPDATE_POST({ commit }, datas) {
      const { data } = await axios.put(`/posts/${datas.id}`, datas.body).catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(JSON.stringify(error.message));
        }
      });
      commit("UPDATE_POST", data);
    },
  },
  getters: {
    SORT_POSTS: (state) => {
      return state.posts.sort((a, b) => {
        return a.id - b.id;
      });
    },
  },
};
