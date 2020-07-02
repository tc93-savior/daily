<template>
  <div>
      <markdown-it-vue :content="content"></markdown-it-vue>
      <textarea class="markdown-input" v-model="content" rows="10"/>
      <button class="cancel">取消</button>
      <button class="save">保存</button>
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
    }
}
</script>

<style lang="scss">
    .markdown-input{
        width: 100%;
        border: dashed 1px lightgray;
        background-color:transparent;
        scrollbar-arrow-color:yellow;
        scrollbar-base-color:lightsalmon;
        overflow: hidden;
        color: #666464;
        height: auto;
        outline: none;
        margin-top:20px
    }
    .cancel{

    }
    .save{

    }
</style>
