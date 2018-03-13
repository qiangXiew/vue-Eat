<template>
  <div id="app">
    <h1>school</h1>
    <router-link to="/foo/11">home</router-link>
    <router-link to="/foo/22">home</router-link>
    
    <div @click="goBack">goBack</div>
    <img src="../../assets/logo.png">
    <router-view class="view one"></router-view>
  

    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from '../../components/HelloWorld'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>
