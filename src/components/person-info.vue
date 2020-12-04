<template>
  <div class="person-info">
    <div class="item1">1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div class="item5">5</div>
  </div>
</template>

<script>
export default {
  name: 'personInfo',
  components: {},
  data() {
    return {};
  }
};
</script>

<style>
.person-info {
  border: 1px solid black;
  display: grid;
  grid-template-columns: 100px 200px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-template-areas:
    "a b"
    "a c"
    "a d"
    "e e";
}
.item1 {
  grid-area: a;
}
.item5{
  grid-area: e;
}
</style>
