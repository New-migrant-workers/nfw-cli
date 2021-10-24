<template>
    <div class="home">
        {{ data }}
        {{ data2 }}
        <!-- {{ token }} -->
        <!-- <img alt="Vue logo" src="../assets/imgs/logo.png" /> -->
        <HelloWorld msg="Welcome" />
    </div>
</template>

<script lang="ts">
import {
    ref,
    defineComponent
    //  computed, onMounted
} from 'vue'
import { square, cube } from '../utils/common'
// import { useStore } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default defineComponent({
    name: 'Home',
    components: {
        HelloWorld
    },
    setup() {
        // const store = useStore()
        // onMounted(() => {
        //   store.dispatch('getUser')
        // })
        // const token = computed(() => store.state.token)
        // return { token }
        console.log('process.env.NODE_ENV: ', process.env.TEST)
        if (process.env.NODE_ENV !== 'production') {
            console.log('Looks like we are in development mode!')
        }
        const data = ref(square(5))
        const data2 = ref(cube(6))
        return { data, data2 }
    }
})
</script>
