<template>
  <div class="image-block">
    <span class="position-num">{{ position }}</span>
    <div class="operate-area">
      <i class="el-icon-zoom-in preview" @click="$emit('on-preview')"></i>
      <el-tooltip v-if="!disabled" class="item" effect="light" content="移除当前图片" placement="top">
        <i class="el-icon-delete remove" @click="$emit('on-remove')"></i>
      </el-tooltip>
    </div>
    <div v-if="!disabled" class="move-icon-area">
      <el-tooltip class="item" effect="light" content="移动到上一个位置" placement="top-end">
        <i class="el-icon-caret-left last" @click="$emit('last')"></i>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="移动到下一个位置" placement="top-start">
        <i class="el-icon-caret-right next" @click="$emit('next')"></i>
      </el-tooltip>
    </div>
    <img draggable="false" :src="imageInfo" />
  </div>
</template>
<script>
export default {
  props: ['imageInfo', 'position', 'disabled']
};
</script>
<style >

</style>
