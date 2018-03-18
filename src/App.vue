<template>
  <div id="app">
    <Header v-on:openAdminMode="switchAdminMode"/>
    <div class="main-container">
      <Main/>
      <Map/>
      <Info/>
    </div>
    <Footer/>
    <Admin v-on:closeAdminMode="switchAdminMode" :admin="admin"/>
    <notifications  position="top center" group="foo" />
  </div>
</template>

<script>
import Header from './components/Header';
import Main from './components/Main';
import Map from './components/Map';
import Info from './components/Info';
import Footer from './components/Footer';
import Admin from './components/Admin';

export default {
  name: 'App',
  data() {
    return { admin: false };
  },
  methods:{
    switchAdminMode(){
      this.admin =!this.admin;
    },
  },
  components: {
    Header,
    Main,
    Map,
    Info,
    Footer,
    Admin,
  },
};
</script>

<style>

</style>
