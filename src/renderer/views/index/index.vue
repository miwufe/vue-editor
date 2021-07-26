<template>
  <monaco-editor :language="'javascript'" :value="codeStr" @onCodeChange="codechange" />
</template>
<script>
import MonacoEditor from '@/components/MonacoEditor'
export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      codeStr: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n')
    }
  },
  created() {
    let $this = this
    window.ipcOn('menuSave', e => {
      // 发送保存命令，在主线程中完成
      window.ipcSend('saveEditor', { data: this.codeStr, filename: this.$route.query.filename }) // 给主进程发送消息“ping”
    })
    window.ipcOn('savedEditor', (event, data) => {
      // 主线程保存完，保存后的回调
      let route = $this.$route
      $this.$router.replace({ path: route.path, query: { filename: data.filePath } })
    })
  },
  mounted() {
  },
  methods: {
    codechange(val) {
      this.codeStr = val
    }
  }
}
</script>
