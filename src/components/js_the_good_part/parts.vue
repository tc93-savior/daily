<template>
  <div class="parts">
    第五章 继承部件
  </div>
</template>

<script>
  /**
   *  第五章 继承部件
   *
   *  @author      jiangtao
   *  @date
   */
  export default {
    name: "parts",
    data() {
      return {};
    },
    methods: {
      eventuality(that) {
        let registry = {};
        that.fire = (event) => {
          let array, func, handler, i, type = typeof event === 'string' ? event : event.type;

          if (registry.hasOwnProperty(type)) {
            array = registry[type];
            for (i = 0; i < array.length; i++) {
              handler = array[i];
              func = handler.method;
              if (typeof func === 'string') {
                func = this[func];
              }

              func.apply(this, handler.parameters || [event]);
            }
          }

          return this
        };

        that.on = (type, method, parameters) => {
          let handler = {
            method: method,
            parameters: parameters,
          }

          if (registry.hasOwnProperty(type)) {
            registry[type].push(handler)
          } else {
            registry[type] = [handler]
          }
          return this
        }

        return that
      },
    },
  };
</script>

<style scoped></style>
