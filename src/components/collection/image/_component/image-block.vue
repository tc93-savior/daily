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
<style lang="less">
.image-block {
  display: inline-block;
  vertical-align: top;
  width: 100px;
  height: 100px;
  background-color: rgba(194, 194, 194, 0.262);
  border-radius: 10px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.146);
  transition: 100ms;
  position: relative;
  .position-num {
    display: inline-block;
    background: #464646;
    color: white;
    width: 20px;
    height: 20px;
    line-height: 18px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    position: absolute;
    opacity: 0.7;
    top: 1px;
    left: 1px;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
  }
  &:hover {
    transition: 300ms;
    transform: scale(1.1);
    z-index: 1000;
    cursor: pointer;
    // .position-num {
    //   transition: 300ms;
    //   opacity: 0;
    // }
    .operate-area {
      opacity: 0.9;
      top: 30%;
    }
    .move-icon-area {
      z-index: 1000;
      bottom: 13%;
    }
    .remove,
    .preview,
    .last,
    .next {
      background: rgba(14, 14, 14, 0.219);
      font-weight: 900;
      &:hover {
        color: #fff;
        background: #000;
        transition: 500ms;
        // transform: scale(1.1);
      }
    }
  }
  .operate-area {
    opacity: 0;
    width: 100%;
    position: absolute;
    top: 0%;
    margin-top: -10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    transition: 300ms ease-out;
    .remove,
    .preview {
      width: 20px;
      height: 20px;
      color: rgba(255, 255, 255, 0.616);
      background: rgba(0, 0, 0, 0.536);
      border-radius: 50%;
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.527);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .remove {
      &:hover {
        color: rgb(172, 5, 5);
      }
    }
  }
  .move-icon-area {
    width: 100%;
    transition: 300ms;
    position: absolute;
    bottom: 0%;
    left: 0;
    display: flex;
    justify-content: space-between;
    .last,
    .next {
      font-size: 30px;
      border-radius: 50%;
      color: rgba(255, 255, 255, 0.536);
    }
  }
  img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}
</style>
