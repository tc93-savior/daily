<template>
  <article>
    <section>
      <image-field
        :disabled="view"
        :image-upload-url="imageUploadurl"
        :image-list="formData.productDetailImages"
        :update-list="updateImageList('productDetailImages')"
        :max="20"
        :limitWidth="710"
        @preview="previewImage"
        @uploadSuccess="handleUploadSuccess"
      />
    </section>
  </article>
</template>

<script>
import { imageField } from './_component/image-field';
export default {
  components: [imageField],
  data() {
    return {
      view: false,
      imageUploadurl: '23',
      formData: {
        productDetailImages: []
      }
    };
  },
  methods: {
    updateImageList() {},
    handleUploadSuccess() {},
    previewImage() {}
  }
};
</script>

<style>
</style>
