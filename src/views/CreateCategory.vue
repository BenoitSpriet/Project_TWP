<template>
  <v-container>
    <v-card>
      <v-card-title>Create a new Category</v-card-title>
      <form @submit.prevent="submitForm" id="createCategory">
        <v-card-text>
          <p v-if="errorcategory">Please input a Category</p>
          <input
            form="createCategory"
            placeholder="Category"
            type="text"
            id="category"
            name="category"
            v-model="category"
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" color="success">Confirm</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'CreateCategory',
  data() {
    return {
      category: '',
      errorcategory: false,
      name:'',

    }
  },
  methods: {
    submitForm() {
      if (this.category === null || this.category === '') {
        this.errorcategory = true
      } else {
        let form = {
          name: this.category,
        }
        this.$store.dispatch("categories/CREATE_CATEGORY", form)
        this.$router.push('/')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
input,
textarea {
  border: 1px solid black;
}
</style>
