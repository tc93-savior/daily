<template>
  <div>
    <el-upload action="/a" class="upload">
      <i :class="uploading ? 'el-icon-loading' : 'el-icon-upload'"></i>
      <div class="el-upload__text">
        <span v-if="uploading">商品校验中，预计需要3分钟，请勿离开，耐心等待！</span>
        <span v-if="!uploading" v-html="'将文件拖到此处，或<em>点击上传</em>'"></span>
      </div>
    </el-upload>

    <el-tooltip placement="top" effect="dark" :visible-arrow="false" :manual="true" >
      <div slot="content">多行信息</div>
      <el-button>Top center</el-button>
    </el-tooltip>

    <el-popover effect="dark" :visible-arrow="false">
      <div>shiyishi</div>
      <el-button slot="reference">try it</el-button>
    </el-popover>

    <el-popover
      ref="popover"
      placement="right"
      title="标题"
      width="200"
      trigger="focus"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    ></el-popover>
    <el-button v-popover:popover>focus 激活</el-button>
  </div>
</template>

<script>
export default {
    name: 'ui-test',
    data: function() {
        return {
                uploading: false
            };
        }
}
</script>

<style lang="scss">
.upload {
  border: dotted 1px lightblue;
  height: 100px;
  width: 300px;
}
</style>
