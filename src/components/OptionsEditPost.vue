<template>
  <option :value="category.id" v-if="postCategory === category.id" selected>
    {{ category.name }}
  </option>
  <option :value="category.id" v-else>
    {{ category.name }}
  </option>
</template>

<script>
export default {
  name: "OptionsEditPost",
  props: {
    category: Object,
    postCategory: Number,
  },
};
</script>
