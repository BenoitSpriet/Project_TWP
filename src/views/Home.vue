<template>
  <v-container class="ma-0 d-flex flex-nowrap">
    <v-card class="d-flex flex-nowrap" color="transparent" flat tile>
      <Posts v-for="category in categories" :key="category.id" :category="category" />
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Posts from "@/components/Posts.vue";

export default {
  name: "Home",
  components: {
    Posts,
  },
  computed: {
    ...mapGetters({
      categories: "categories/SORT_CATEGORIES",
    }),
  },
  methods: {
    ...mapActions({
      fetchCategories: "categories/FETCH_CATEGORIES",
    }),
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>
