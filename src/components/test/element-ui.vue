<template>
  <div>
    <el-upload action="/a" class="upload">
      <i :class="uploading ? 'el-icon-loading' : 'el-icon-upload'"></i>
      <div class="el-upload__text">
        <span v-if="uploading">商品校验中，预计需要3分钟，请勿离开，耐心等待！</span>
        <span v-if="!uploading" v-html="'将文件拖到此处，或<em>点击上传</em>'"></span>
      </div>
    </el-upload>
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
