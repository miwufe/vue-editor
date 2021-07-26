<template>
  <div id="app" :class="{[$route.name]:true}">
    <div class="title-bar align-center">vue-editor</div>
    <router-view class="editor-main" />
    <div class="status-bar">status-bar</div>
  </div>
</template>
<script>
import './assets/style.less'
export default {
  name: 'app',
  components: {}
}
</script>
<style>
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 12px;
}
.editor-main {
  flex: 1;
  flex-grow: 1;
}
.title-bar {
  -webkit-app-region: drag;
  user-select: none;
  cursor: default;
  height: 22px;
  line-height: 22px;
}
.status-bar {
  background-color: rgb(0, 122, 204);
  height: 22px;
  line-height: 22px;
  padding: 0 10px;
  color: #fff;
}
</style>
