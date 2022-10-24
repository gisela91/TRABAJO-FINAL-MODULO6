<template>
  <app-menu titulo="F & F"></app-menu>
  <router-view/>
</template>

<script>
  import AppMenu from '@/components/AppMenu.vue';
  export default {
    name: 'app',
    data(){
      return {
      }
    },
    methods: {             
    },
    computed: {
    },
    mounted() {
    },
    components: {
      AppMenu
    }
  }
</script>
<style>

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: s;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.abs-center{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.center{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 20vh;
}
.center2{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 10vh;
}
</style>
