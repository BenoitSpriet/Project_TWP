<template>
  <v-container>
    <v-card>
      <v-card-title>Create a new Post</v-card-title>
      <form @submit.prevent="submitForm" id="createPost">
        <v-card-text>
          <label for="name">Title</label>
          <br />
          <br />
          <p v-if="errortitle">Please input a Title for your Post</p>
          <input form="createPost" placeholder="Title" type="text" id="title" name="title" v-model="title" required />
        </v-card-text>
        <v-card-text>
          <label for="story">Description:</label>
          <br />
          <br />
          <textarea form="createPost" placeholder="Description" id="description" name="description" rows="5" cols="90" v-model="content"></textarea>
        </v-card-text>
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
export default {
  name: "CreatePost",
  data() {
    return {
      id: this.$route.params.id,
      title: "",
      content: "",
      errortitle: false,
    };
  },
  methods: {
    submitForm() {
      if (this.title === null || this.title === "") {
        this.errortitle = true;
      } else {
        let form = {
          title: this.title,
          content: this.content,
          categories: [this.id],
          status: "publish",
        };
        this.$store.dispatch("posts/CREATE_POST", form);
        this.$router.push("/");
      }
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
