<template>
  <!-- card all the width -->
  <!-- each card -->
  <v-card class="pa-2 ma-2 rounded-lg" color="rgb(230, 230, 240)" min-width="250">
    <!-- card with the tasks -->
    <v-card class="drop-zone block" color="transparent" flat tile @drop="onDrop($event, category.id)" @dragover.prevent @dragenter.prevent>
      <v-list-item style="position: relative">
        <v-list-item-title :id="'categoryName' + category.id" class="text-h6 mb-1 text-capitalize">
          {{ category.name }}
        </v-list-item-title>
        <v-spacer></v-spacer>
        <!--  -->
        <v-icon class="pa-5 icon menu-icon" :id="'menu-icon' + category.id" v-on:click="getCategoryOption(category.id)"> mdi-dots-horizontal </v-icon>
        <button
          class="icon okcat-icon"
          :id="'ok-button' + category.id"
          style="cursor: pointer; display: none; font-size: 1rem; padding: 1rem"
          v-on:click="valCat(category.id)"
        >
          OK
        </button>
        <div class="category-menu" :id="'cat' + category.id">
          <p v-on:click="editCat(category.id, category.name)">Edit</p>
          <p v-on:click="deleteCat(category.id)">Delete</p>
        </div>
      </v-list-item>
      <v-card
        class="drag-el pa-0 ma-2 task"
        v-for="post in posts"
        :key="post.id"
        draggable="true"
        @dragstart="startDrag($event, post)"
        @dragend="endDrag($event)"
      >
        <Post :post="post" v-if="category.id == post.categories[0]" :catId="category.id" :catName="category.name" />
      </v-card>
    </v-card>
    <!-- button -->
    <v-card-actions>
      <router-link :to="'/create_post/' + category.id">
        <v-btn icon fab dark color="transparent">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </router-link>
    </v-card-actions>
    <!-- end button -->
  </v-card>
  <!-- end card -->
  <!-- end card all the width -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Post from "@/components/Post.vue";

export default {
  name: "Posts",
  components: {
    Post,
  },
  data() {
    return {
      absolute: true,
      opacity: 1,
      overlay: false,
    };
  },
  props: {
    category: Object,
  },
  computed: {
    ...mapGetters({
      posts: "posts/SORT_POSTS",
    }),
  },
  methods: {
    ...mapActions({
      fetchPosts: "posts/FETCH_POSTS",
      updatePost: "posts/UPDATE_POST",
      updateCategories: "categories/UPDATE_CATEGORY",
      deleteCategories: "categories/DELETE_CATEGORY",
    }),
    startDrag: (evt, post) => {
      let draggin = evt.target;
      draggin.classList.add("dragging");
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", post.id);
    },
    endDrag: (evt) => {
      let draggin = evt.target;
      draggin.classList.remove("dragging");
    },
    onDrop(evt, list) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.posts.find((post) => post.id == itemID);
      item.categories[0] = list;
      this.updatePost({
        id: itemID,
        body: {
          categories: [list],
        },
      });
    },
    getCategoryOption(catId) {
      let div = document.querySelector(`#cat${catId}`);
      div.classList.toggle("menu-display");
    },
    editCat(catId, catName) {
      let category = document.querySelector(`#categoryName${catId}`);
      category.innerHTML = `<input type="text" id="catval${catId}" value="${catName}" style="background-color:white;">`;
      document.querySelector(`#ok-button${catId}`).style.display = "flex";
      document.querySelector(`#menu-icon${catId}`).style.display = "none";
      document.querySelector(`#cat${catId}`).style.display = "none";
    },
    valCat(catId) {
      let input = document.querySelector(`#catval${catId}`).value;
      this.updateCategories({ id: catId, body: { name: input, slug: input } });
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    },
    deleteCat(catId) {
      let verifPost = false;
      this.posts.forEach((post) => {
        if (post.categories[0] === catId) {
          verifPost = true;
        }
      });
      if (verifPost === true) {
        if (!confirm(`This Category contains posts. Are you sure you want to delete this Category?`)) {
          this.getCategoryOption(catId);
          return;
        }
      }
      this.deleteCategories(catId);
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
* {
  font-size: 1rem;
}

.task {
  background-color: white;
  cursor: pointer;
}

.dragging {
  background-color: rgb(0, 0, 0, 0.05);
}

.task-item {
  display: flex;
  justify-content: space-between;
}

.task-sub-item {
  margin: auto;
  margin-left: 0;
}

.button-more {
  border-radius: 50%;
  transition: 0.25s;
}

.button-more:hover {
  background-color: rgb(0, 0, 0, 0.1);
}

.block-description {
  /* visibility: hidden; */
  display: none;
  border-radius: 0.5rem;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.9);
  padding: 5% 30%;
}

.task-description {
  background-color: white;
  height: 25rem;
  padding: 2rem;
}

.task-description .header {
  display: flex;
  justify-content: space-between;

  margin-bottom: 1rem;
}

.icon {
  font-size: 2rem;
  margin: auto;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0.1rem;
}

.header .left {
  display: flex;
}

.descriptionTask {
  display: flex;
}

.contentdescription {
  margin-left: 1rem;
}

.noicon {
  margin-left: 1rem;
}

.noicon h1 {
  font-size: 1.5rem;
}

.noicon p {
  color: rgb(0, 0, 0, 0.5);
}

.contentdescription p {
  text-align: justify;
  width: 70%;
}

.icon {
  cursor: pointer;
  border-radius: 50%;
  transition: 0.25s;
}
.icon:hover {
  background-color: rgb(0, 0, 0, 0.1);
}
.category-menu {
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  padding: 1rem;
  z-index: 200;
  border: 1px grey solid;
  border-radius: 0.5rem;
  transform: translateY(-6rem);
  transition: 0.25s;
  visibility: hidden;
}

.category-menu p {
  font-size: 0.8rem;
  text-transform: uppercase;
  padding: 0.5rem;
  cursor: pointer;
}

.category-menu p:hover {
  background-color: rgb(0, 0, 0, 0.1);
}

.menu-display {
  transform: translateY(3rem);
  visibility: visible;
}

/* .menu-icon:hover div {
  transform: translateY(3rem);
} */
</style>
