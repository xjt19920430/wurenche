<template>
  <div id="app">
    <el-container>
      <el-header>
        <vue-header></vue-header>
      </el-header>
      <el-container>
        <el-aside width="150px">
          <vue-silde></vue-silde>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import vueHeader from './components/heard/heard'
  import vueSilde from './components/slide/slide'
export default {
  components:{
      vueHeader,
      vueSilde
  }
}
</script>

<style>
 *{
   padding: 0;
   margin: 0;
 }
 html,body {
   height: 100%;
 }
 #app {
   height: 100%;
 }
  header {
    height: 50px !important;
    background: #ccc;
  }
  aside {
    background: #ccc;
    height: 100%;
  }
 section {
   height: 100%;
 }

</style>
