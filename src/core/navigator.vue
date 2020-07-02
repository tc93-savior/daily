<template>
  <div class="nav">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'navigator',
    data() {
        return {
            stack: []
        }
    },
    methods: {

    },
    mounted() {
        console.log(this)
    }
}
</script>

<style lang="scss">
    .nav{
        padding:20px
    }
</style>
