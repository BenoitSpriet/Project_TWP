<template>
  <!-- <v-card> -->
  <v-list-item class="task-item">
    <p class="task-sub-item">{{ post.title.rendered }}</p>
    <!-- <div class="button-more" v-on:click="getComments()"> -->
    <div class="button-more" v-on:click="openTask(post.id, catId)">
      <v-icon> mdi-page-next-outline </v-icon>
    </div>
  </v-list-item>
  <!-- card description task display none -->
  <v-card class="block-description" :id="'task' + post.id + 'cat' + catId">
    <div class="content">
      <div class="left">
        <div class="little-block mb-5">
          <v-icon class="icon" dark> mdi-desktop-classic </v-icon>
          <div class="noicon">
            <h1 class="text-capitalize">{{ post.title.rendered }}</h1>
            <p class="text-capitalize">In list {{ catName }}</p>
          </div>
        </div>
        <div class="little-block mb-5">
          <v-icon class="icon"> mdi-text </v-icon>
          <div class="contentdescription">
            <h2>Description</h2>
            <p v-html="post.content.rendered"></p>
          </div>
        </div>
        <div class="little-block">
          <v-icon class="icon"> mdi-comment-text-outline </v-icon>
          <div class="contentdescription">
            <h2>Comments</h2>
            <div v-for="comment in comments" :key="comment.id" :comment="comment">
              <div :id="'comment-' + comment.id" class="comment" v-if="comment.post == post.id" v-bind:havecomments="(havecomments = true)">
                <p v-html="comment.content.rendered"></p>
                <div class="icons-little">
                  <v-icon class="icon-little" v-on:click="display_edit_comment(comment.id)"> mdi-pencil-outline </v-icon>
                  <v-icon class="icon-little" @click="delete_comment(comment.id)"> mdi-delete-outline </v-icon>
                </div>
              </div>
              <div
                class="comment"
                style="display: none"
                :id="'comment-input-' + comment.id"
                v-if="comment.post == post.id"
                v-bind:havecomments="(havecomments = true)"
              >
                <input style="border: 1px solid grey" type="text" :value="comment.content.rendered.replace('<p>', '').replace('</p>', '')" />
                <v-icon class="icon-little" v-on:click="edit_comment(comment.id)"> mdi-check </v-icon>
              </div>
            </div>

            <div class="comment" v-if="havecomments == false && addComment === false">No comments</div>
            <textarea
              placeholder="Comment"
              id="comment"
              name="comment"
              rows="4"
              cols="50"
              v-model="newComment"
              v-if="addComment === true"
              @keydown.enter="add_comment(post.id), (pluscomment = true)"
            >
            </textarea>
            <v-icon
              class="icon-little close-comment pa-5"
              dark
              v-on:click="close_add_comment()"
              v-if="addComment === true"
              @click="pluscomment = true"
            >
              mdi-close
            </v-icon>

            <v-icon class="icon-little" @click="(addComment = true), (pluscomment = false)" v-if="pluscomment == true"> mdi-plus </v-icon>
          </div>
        </div>
      </div>
      <div class="right">
        <h3>Actions</h3>
        <router-link :to="`/edit_post/${post.id}`">
          <v-icon class="icon pa-5">mdi-book-edit-outline</v-icon>
        </router-link>
        <v-icon class="icon pa-5" color="error" @click="deletePost({ id: post.id })">mdi-delete-alert-outline</v-icon>
      </div>

      <v-icon class="icon close-icon pa-5" dark v-on:click="closeTask(post.id, catId)"> mdi-close </v-icon>
    </div>
  </v-card>
  <!-- end card description task display none -->
  <!-- </v-card> -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Post",
  data() {
    return {
      havecomments: false,
      addComment: false,
      newComment: "",
      pluscomment: true,
    };
  },
  props: {
    post: Object,
    catId: Number,
    catName: String,
    category: Object,
    comment: Object,
  },
  computed: {
    ...mapGetters({
      comments: "comments/FILTER_COMMENTS",
    }),
  },
  methods: {
    ...mapActions({
      deletePost: "posts/DELETE_POST",
      fetchComments: "comments/FETCH_COMMENTS",
      createComment: "comments/CREATE_COMMENT",
      deleteComment: "comments/DELETE_COMMENT",
      updateComment: "comments/UPDATE_COMMENT",
    }),
    openTask: function (task_id, cat_id) {
      document.querySelector(`#task${task_id}cat${cat_id}`).style.display = "block";
    },
    closeTask: function (task_id, cat_id) {
      document.querySelector(`#task${task_id}cat${cat_id}`).style.display = "none";
    },
    add_comment(id) {
      let body = {
        post: id,
        content: this.newComment,
      };
      this.createComment(body);
      this.close_add_comment();
    },
    display_edit_comment(id) {
      let p = document.querySelector(`#comment-${id}`);
      p.style.display = "none";
      let input = document.querySelector(`#comment-input-${id}`);
      input.style.display = "block";
    },
    edit_comment(comment_id) {
      let input = document.querySelector(`#comment-input-${comment_id}`).querySelector("input").value;
      this.updateComment({ id: comment_id, body: { content: { raw: input }, status: "approved" } });
      document.querySelector(`#comment-input-${comment_id}`).style.display = "none";
      let p = document.querySelector(`#comment-${comment_id}`);
      p.style.display = "grid";
    },
    delete_comment(id) {
      if (confirm("Are you sure you want to delete this comment ?")) {
        this.deleteComment({ id: id, force: false });
      }
    },
    close_add_comment() {
      this.addComment = false;
      this.newComment = "";
    },
  },
  mounted() {
    this.fetchComments();
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
  cursor: default;
}

.content {
  background-color: white;
  min-height: 25rem;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  /* display: grid;
  grid-template-columns: repeat(2, 1fr); */
  position: relative;
}

.close-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.little-block {
  display: flex;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.5rem;
}

h3 {
  font-size: 1.25rem;
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

.right {
  margin-top: 3rem;
  text-align: center;
}

.right p {
  cursor: pointer;
  transition: 0.25s;
}

.right p:hover {
  text-decoration: underline;
}

.comment {
  display: grid;
  grid-template-columns: 90% 10%;
}

.icons-little {
  margin: auto;
  display: flex;
}

.icon-little {
  cursor: pointer;
  font-size: 1.25rem;
  margin-right: 0.8rem;
}

.close-comment {
  position: absolute;
  right: 6rem;
}

textarea {
  border: 1px solid black;
}
</style>
