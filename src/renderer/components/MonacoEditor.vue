<template>
  <div ref="container" class="monaco-editor-wrap"></div>
</template>
<script>
import * as monaco from 'monaco-editor'
export default {
  name: 'MonacoEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    language: { type: String, default: 'javascript' }
  },
  watch: {
    language: function () {

    }
  },
  data() {
    return {
      editor: null
    }
  },
  methods: {
    initEditor() {
      let self = this
      self.$refs.container.innerHTML = ''
      global.MonacoEnvironment = {
        getWorkerUrl: function (moduleId, label) {
          if (label === 'json') {
            return 'json.worker.js'
          }
          if (label === 'css' || label === 'scss' || label === 'less') {
            return 'css.worker.js'
          }
          if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return 'html.worker.js'
          }
          if (label === 'typescript' || label === 'javascript') {
            return 'ts.worker.js'
          }
          return 'editor.worker.js'
        }
      }
      this.editor = monaco.editor.create(self.$refs.container, {
        theme: 'vs-dark',
        automaticLayout: true,
        language: this.language,
        value: this.value
      })
      self.$emit('onMounted', self.editor, monaco.editor) // 编辑器创建完成回调
      self.editor.onDidChangeModelContent(function (event) {
        // 编辑器内容change事件
        self.codesCopy = self.editor.getValue()
        self.$emit('onCodeChange', self.editor.getValue(), event)
      })
      // 编辑器随窗口自适应
      window.addEventListener('resize', function () {
        self.editor.layout()
      })
    }
    // getValue() {
    //   console.log(this.monacoEditor.getValue())
    // },
    // themeChange(val) {
    //   console.log(val)
    //   this.initEditor()
    // }
  },
  mounted() {
    this.initEditor()
  }
}
</script>
