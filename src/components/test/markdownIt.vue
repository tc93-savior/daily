<template>
  <div class="markdown-block">
    <div class="markdown-layout">
      <el-input type="textarea" autosize placeholder="请输入内容.." v-model="content"></el-input>
      <markdown-it-vue :content="content"></markdown-it-vue>
    </div>
    <div class="toolbar">
      <el-button size="mini" class="cancel">取消</el-button>
      <el-button size="mini" class="save" @click="showDialog">保存</el-button>
    </div>
  </div>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
export default {
    components: {
        MarkdownItVue
    },
    data() {
        return {
            content: '# markdown'
        }
    },
    methods: {
        showDialog() {
            // console.log(this.$prompt);
            this.$prompt('请输入文件名.md：', 'Save').then(({value}) => {
                value = value || new Date() + '.md'
                this.download(value)
            }).catch(() => {
                console.log('cancel');
            })
        },
        download(filename = 'main.md') {
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.content))
            element.setAttribute('download', filename)

            document.body.appendChild(element)
            element.click();
            document.body.removeChild(element)
        }
    }
}
</script>

<style lang="scss">
.markdown-block {
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
  .markdown-layout {
    display: flex;
    & > * {
      flex: 1;
      padding: 0 20px;
    }
  }

  & > * {
    margin-top: 20px;
  }

  .toolbar {
    position: absolute;
    bottom: 40px;
    left: 20px;
  }
}
</style>
