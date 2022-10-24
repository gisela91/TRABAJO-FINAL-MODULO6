<template>
    <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">{{titulo}} ({{mode}})</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="nav nav-tabs card-header-tabs">
        <li>
          <a class="nav-item"><router-link to="/">Home</router-link> </a>
        </li>
        <li>
          <a class="nav-item"><router-link to="/about">About</router-link></a>
        </li>
        <li>
          <a class="nav-item"><router-link to="/areas">Inventarios</router-link></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<app-alert></app-alert>
</template>

<script>
  import AppAlert from '@/components/AppAlert.vue'
    export default {
        name: 'appMenu',
        data(){
            return {
              mode: null
            }
        },
        methods: {             
        },
        props: ["titulo"],
        computed: {
        },
        mounted() {
          this.mode = process.env.VUE_APP_MODE
        },
        components: {
          AppAlert
        }
    }
</script>
<style></style>