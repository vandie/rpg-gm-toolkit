<template>
  <div>
    <!-- Begin header bar content -->
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item" id="PageTitle"> The Modern GM Toolkit </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link v-for="route in this.$router.options.routes" v-bind:key="route.path" v-bind:to="route.path"  v-bind:class="{'navbar-item':true, 'is-active': route.name == pageName}">{{ route.name }}</router-link>
        </div>
      </div>
    </nav>
    <!-- End header bar content -->
    <!-- Begin Page Header -->
    <section class="hero is-primary is-bold" v-bind:class="{ 'is-medium': 'Home' == pageName, 'is-info':'Home' != pageName}">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{pageName}}
          </h1>
          <h2 class="subtitle">
            {{pageDesc}}
          </h2>
        </div>
      </div>
    </section>
    <!-- End Page Header -->
    <!-- VueJS page Router -->
    <router-view></router-view>
  </div>
</template>

<script>
import pathDesc from './assets/data/pageDescriptions.json'

export default {
  name: 'App',
  data : function(){
    return{
    }
  },
  computed: {
    pageName: function() { return this.$route.name },
    pageDesc: function() { return pathDesc[this.$route.name] }
  }
}
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Sets the colors
$primary: #00a8ff;
$primary-invert: findColorInvert($primary);
$info: #9c88ff;
$info-invert: findColorInvert($info);
$success: #4cd137;
$success-invert: findColorInvert($success);
$warning: #fbc531;
$warning-invert: findColorInvert($warning);
$danger: #e84118;
$danger-invert: findColorInvert($danger);
$dark: #273c75;
$dark-invert: findColorInvert($dark);
$light: #7f8fa6;
$light-invert: findColorInvert($light);
$black: #353b48; //Using a dark grey instead of a black
$white: #f5f6fa; //Using a light grey instead of white


// Setup $colors to use as bulma classes
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

// Import fonts
@import url('https://fonts.googleapis.com/css?family=Merienda');

//Other scss
.navbar-item{
  &#PageTitle{
    font-weight: bold;
  }
}
</style>
