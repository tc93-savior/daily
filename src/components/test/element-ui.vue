<template>
   <div>
       <el-upload>
           <i :class="uploading ? 'el-icon-loading' : 'el-icon-upload'"></i>
            <div class="el-upload__text">
                <span v-if="uploading">商品校验中，预计需要3分钟，请勿离开，耐心等待！</span>
                <span
                v-if="!uploading"
                v-html="
                    formData.infoId ? '如需重新上传，请点击或将文件拖拽到这里' : '将文件拖到此处，或<em>点击上传</em>'
                "
                >
                </span>
            </div>
       </el-upload>
   </div>
</template>

<script>
export default {
    name:'element-ui'
}
</script>

<style>

</style>