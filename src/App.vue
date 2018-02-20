<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"> RPG Lore Builder </router-link>
      </div>
      <div class="navbar-menu">
        <router-link v-for="route in this.$router.options.routes" v-bind:key="route.path" v-bind:to="route.path"  v-bind:class="{'navbar-item':true, 'is-active': route.name == pageName}"> {{ route.name }} </router-link>
      </div>
    </nav>
    <section class="hero is-primary">
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
    <router-view>
    </router-view>
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

// Set your colors
$primary: #8c67ef;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
