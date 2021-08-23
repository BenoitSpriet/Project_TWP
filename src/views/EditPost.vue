<template>
  <v-container>
    <v-card>
      <v-card-title>Edit a Post</v-card-title>
      <form @submit.prevent="submitForm" id="editPost">
        <v-card-text>
          <label for="title" form="editPost">Title:</label>
          <br />
          <div v-html="oldtitle" v-if="editTitle == false" @click="edit_title()"></div>
          <input
            form="editPost"
            type="text"
            id="title"
            name="title"
            v-model="title"
            v-if="editTitle == true"
            required
            @keydown.enter="updateTitle($event)"
          />
          <span>
            &nbsp;
            <v-btn type="button" color="success" v-if="editTitle == true" @click="updateTitle($event)">Validate</v-btn>
            &nbsp;
            <v-btn type="button" color="error" v-if="editTitle == true" @click="annulTitle()">Annul</v-btn>
          </span>
        </v-card-text>
        <v-card-text>
          <label for="description" form="editPost">Description:</label>
          <br />
          <div id="olcontent" v-html="oldcontent" v-if="editContent == false" @click="edit_content()"></div>
          <textarea
            form="editPost"
            id="description"
            name="description"
            rows="5"
            cols="90"
            v-model="content"
            v-if="editContent == true"
            @keydown.enter="updateContent($event)"
          ></textarea>
          <span>
            &nbsp;
            <v-btn type="button" color="success" v-if="editContent == true" @click="updateContent($event)">Validate</v-btn>
            &nbsp;
            <v-btn type="button" color="error" v-if="editContent == true" @click="annulContent()">Annul</v-btn>
          </span>
        </v-card-text>
        <br />
        <v-card-item>
          <label for="category" form="editPost">Choose a Category:</label>
          <br />
          <select name="category" id="category">
            <OptionsEditPost v-for="category in categories" :key="category.id" :category="category" :postCategory="postCategory" />
          </select>
        </v-card-item>
        <br />
        <v-card-actions>
          <v-btn type="submit" color="success">Confirm</v-btn>
        </v-card-actions>
      </form>
    </v-card>
    <router-link to="/">
      <v-icon class="icon close-icon pa-5" dark> mdi-close </v-icon>
    </router-link>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "@/common/api";
import OptionsEditPost from "@/components/OptionsEditPost";

export default {
  name: "EditPost",
  components: {
    OptionsEditPost,
  },
  data() {
    return {
      id: this.$route.params.id,
      title: "",
      oldtitle: "",
      oldcontent: "",
      content: "",
      postCategory: 0,
      editTitle: false,
      editContent: false,
    };
  },
  computed: {
    ...mapGetters({
      categories: "categories/SORT_CATEGORIES",
    }),
  },
  async mounted() {
    let id = this.$route.params.id;
    const { data } = await axios.get(`/posts/${id}`).catch((error) => console.log(JSON.stringify(error.message)));
    let post = data;
    this.oldtitle = post.title.rendered;
    this.oldcontent = post.content.rendered;
    this.postCategory = post.categories[0];
    this.fetchCategorie();
  },
  methods: {
    ...mapActions({
      fetchCategorie: "categories/FETCH_CATEGORIES",
      updatePost: "posts/UPDATE_POST",
    }),
    annulTitle() {
      this.editTitle = false;
      this.title = "";
    },
    annulContent() {
      this.editContent = false;
      this.content = "";
    },
    edit_title() {
      this.editTitle = true;
      this.title = "";
    },
    edit_content() {
      this.editContent = true;
      this.content = "";
    },
    updateTitle(event) {
      event.preventDefault();
      event.stopPropagation();
      this.oldtitle = this.title;
      this.editTitle = false;
    },
    updateContent(event) {
      event.preventDefault();
      event.stopPropagation();
      this.oldcontent = this.content;
      this.editContent = false;
    },
    submitForm() {
      let category = document.getElementById("category");

      if (this.title === null || this.title === "") {
        this.title = this.oldtitle;
      }

      if (this.content === null || this.content === "") {
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(this.oldcontent, "text/html");
        this.content = htmlDoc.body.firstChild.textContent;
      }

      let form = {
        id: this.id,
        body: {
          title: this.title,
          content: this.content,
          categories: [category.value],
          status: "publish",
        },
      };

      // this.$store.dispatch("posts/UPDATE_POST", form);
      this.updatePost(form);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
input,
textarea {
  border: 1px solid black;
}

.close-icon {
  position: absolute;
  top: 1rem;
  right: 21rem;
  color: black;
}

.icon {
  font-size: 2rem;
  cursor: pointer;
  border-radius: 50%;
  transition: 0.25s;
  margin-top: 0.8rem;
  margin-right: 1rem;
}

.icon:hover {
  background-color: rgb(0, 0, 0, 0.1);
}
</style>
