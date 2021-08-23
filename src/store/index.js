import { createStore } from 'vuex'
import posts from './modules/posts'
import categories from './modules/categories'
import comments from './modules/comments'

export default createStore({
  modules: {
    posts,
    categories,
    comments,
  },
})
