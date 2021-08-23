<template>
  <v-app>
    <v-main class="text-white">
      <v-app-bar color="rgb(0, 0, 0, 0.5)" class="text-white text-center" shrink-on-scroll>
        <router-link to="/">
          <v-btn class="mr-5" color="transparent" icon>
            <v-icon color="blue-grey-lighten-4"> mdi-home-outline </v-icon>
          </v-btn>
        </router-link>

        <v-spacer></v-spacer>

        <v-app-bar-title class="text-uppercase font-weight-bold text-blue-grey-lighten-4">Trello</v-app-bar-title>

        <v-spacer></v-spacer>

        <router-link to="/create_category">
          <v-btn class="mr-5" color="transparent" icon>
            <v-icon color="blue-grey-lighten-4"> mdi-plus </v-icon>
          </v-btn>
        </router-link>
      </v-app-bar>

      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
* {
  text-decoration: none;
}

div[data-app="true"] {
  background: url("https://i.picsum.photos/id/903/1920/1080.jpg?hmac=wFvTNNB0k5iwZCSBhYdh45afjeq00AhM_DPkzjp7Slk") no-repeat center center fixed !important;
  background-size: cover;
  color: rgb(228, 228, 228);
}
</style>
