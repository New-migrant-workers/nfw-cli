<template>
  <div class="home">
    {{ token }}
    <img alt="Vue logo" src="../assets/imgs/logo.png" />
    <HelloWorld msg="Welcome" />
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent, computed } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  setup() {
    const store = useStore()
    const token = computed(() => store.state.token)
    return { token }
  }
});
</script>
