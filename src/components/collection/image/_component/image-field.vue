<template>
  <div>
    <el-card
      v-if="!disabled || imageList.length"
      :class="{ dragging: dragging }"
      class="image-field"
      style="display: inline-block;"
      shadow="never"
    >
      <transition-group name="breadcrumb">
        <li
          v-for="(item, index) in imageList"
          :key="item.uid || item.imageUrl || index"
          :class="{
            dragged: index === startIndex,
            targeted: index === targetPosition,
          }"
          @dragenter="(e) => dragenter(index, e)"
        >
          <span
            :draggable="!disabled"
            @dragstart="(e) => dragstarthandler(index, e)"
            @dragend="(e) => dragendhandler(index, e)"
            @dragover="(e) => e.preventDefault()"
            @drop="drophandler"
          >
            <image-block
              :position="index + 1"
              :disabled="disabled"
              :image-info="item.imageUrl || item.response.result"
              @last="moveLast(index)"
              @next="moveNext(index)"
              @on-remove="removeImage(index)"
              @on-preview="previewImage(item)"
            />
          </span>
        </li>
      </transition-group>
      <el-upload
        v-if="(!imageList || imageList.length < max) && !disabled"
        class="image-uploading"
        list-type="picture-card"
        accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"
        name="image"
        :action="imageUploadUrl"
        :before-upload="beforeAvatarUpload"
        :on-success="handlePictureSuccess"
        :on-error="handlePictureFail"
        :on-progress="handlePictureUploading"
        :show-file-list="false"
      >
        <i :class="imageUploading ? 'el-icon-loading' : 'el-icon-plus'"></i>
      </el-upload>
    </el-card>
    <span v-if="disabled && !imageList.length" style="color: red; font-weight: 900;">暂无上传图片</span>
  </div>
</template>
<script>
import ImageBlock from './image-block';
export default {
  components: {
    ImageBlock
  },
  props: {
    imageList: {
      type: Array,
      default: () => []
    },
    updateList: {
      type: Function,
      default: null
    },
    imageUploadUrl: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: Infinity
    },
    limitWidth: {
      type: Number
    },
    limitHeight: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imageUploading: false,
      dragging: false,
      startIndex: NaN,
      targetPosition: NaN
    };
  },
  methods: {
    dragstarthandler(index) {
      this.dragging = true;
      this.startIndex = index;
    },
    dragendhandler(index, ev) {
      if (!this.dragging) return;
      console.log('拖拽结束', index, ev.target);
      // 当index === startIndex时，代表最终拖拽位置不在目标元素上，无法触发 drop 事件，所以有以下逻辑兼容处理
      // 有目标位置，但结束时鼠标移出
      if (index === this.startIndex && !Number.isNaN(this.targetPosition) && this.targetPosition !== this.startIndex) {
        this.updateList(this.insertPosition(this.targetPosition, this.startIndex, this.imageList));
      }
      this.dragging = false;
      this.targetPosition = NaN;
      this.startIndex = NaN;
    },
    drophandler(ev) {
      if (!this.dragging) return;
      console.log('松手了', ev);
      // 此事件不一定触发，必须拖到目标位置（元素）上才会触发，所以后面有 dragend事件再次判断处理
      // 目标位置和起始位置不一致，交换位置
      if (!Number.isNaN(this.targetPosition) && this.targetPosition !== this.startIndex) {
        this.updateList(this.insertPosition(this.targetPosition, this.startIndex, this.imageList));
      }
    },
    dragenter(index) {
      console.log('target', index);
      if (!this.dragging) return;
      this.targetPosition = index;
    },
    insertPosition(target, origin, arr) {
      if (!arr[target] || !arr[origin]) return arr;
      const newArr = [...arr];
      if (origin > target) {
        const originEle = newArr.splice(origin, 1)[0];
        newArr.splice(target, 0, originEle);
        return newArr;
      } else {
        const originEle = newArr.splice(origin, 1)[0];
        newArr.splice(target, 0, originEle);
        return newArr;
      }
    },
    handlePictureSuccess(res, file, fileList) {
      this.$emit('uploadSuccess');
      this.stopLoadingStatus();
      if (res.success || res.code === 0) {
        const imageList = [...this.imageList];
        imageList.push(file);
        this.updateList(imageList);
      } else {
        this.$message.error(res.msg || '上传失败，请重试');
      }
      fileList.pop();
    },
    handlePictureFail(error, file, fileList) {
      this.stopLoadingStatus();
      this.$message.error(error.msg || '上传失败，请重试');
      fileList.pop();
    },
    handlePictureUploading() {
      this.imageUploading = true;
    },
    stopLoadingStatus() {
      if (this.imageUploading === true) this.imageUploading = false;
    },
    beforeAvatarUpload(file) {
      return new Promise((resolve, reject) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          reject(new Error('图片大小请不要超过2M'));
        }
        const image = new Image();
        const imageURL = URL.createObjectURL(file);
        image.onload = () => {
          URL.revokeObjectURL(imageURL);
          const { naturalWidth: width, naturalHeight: height } = image;
          if (this.limitWidth && this.limitHeight && (width !== this.limitWidth || height !== this.limitHeight)) {
            reject(new Error(`请上传分辨率为${this.limitWidth}*${this.limitHeight}的图片`));
          } else if (this.limitHeight && height !== this.limitHeight) {
            reject(new Error(`图片高度不符${this.limitHeight}`));
          } else if (this.limitWidth && width !== this.limitWidth) {
            reject(new Error(`图片宽度不符${this.limitWidth}`));
          } else {
            resolve();
          }
        };
        image.src = imageURL;
      }).catch((err) => {
        // 统一处理错误信息
        this.$message.error(err.message);
        // catch后则需要重新抛出reject，以阻止后续流程
        return Promise.reject(new Error());
      });
    },
    moveLast(currentPoi) {
      if (currentPoi === 0) {
        this.$message.info('已经是第一张了哦～');
        return;
      }
      const imageList = [...this.imageList];
      // 交换位置
      imageList[currentPoi - 1] = this.imageList[currentPoi];
      imageList[currentPoi] = this.imageList[currentPoi - 1];
      this.updateList(imageList);
    },
    moveNext(currentPoi) {
      if (currentPoi === this.imageList.length - 1) {
        this.$message.info('已经是最后一张了哦～');
        return;
      }
      const imageList = [...this.imageList];
      // 交换位置
      imageList[currentPoi + 1] = this.imageList[currentPoi];
      imageList[currentPoi] = this.imageList[currentPoi + 1];
      this.updateList(imageList);
    },
    removeImage(index) {
      const imageList = [...this.imageList];
      imageList.splice(index, 1);
      this.updateList(imageList);
    },
    previewImage(img) {
      this.$emit('preview', img.imageUrl || (img.response && (img.response.data || img.response.result)));
    }
  }
};
</script>
<style>

</style>
