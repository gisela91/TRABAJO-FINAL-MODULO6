<template>
    <div class="row align-items-center" style="height:100px; background: #FFE4C4">
        <div class="center"><h3>EDITANDO EL ACTIVO</h3></div>
    </div>
        <div class="abs-center"> 
        <form action="" @submit.prevent="guardar()">
            <div class="mb-3" >
                <input type="text" v-model="activo.tipo" class="form-control">
            </div>
            <textarea style="width: 100%" v-model="activo.marca"></textarea>
            <textarea style="width: 100%" v-model="activo.modelo"></textarea>
            <div class="form-group">
                <label for="exampleFormControlSelect1">ESTADO</label>
                <select class="form-control" id="exampleFormControlSelect1" v-model="activo.estado">
                    <option>Nuevo</option>
                    <option>Usado</option>
                    <option>Desuso</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary m-2">Guardar</button>
            <button class="btn btn-ligth m-2">Cancelar</button>
        </form>
        
    </div>
    
</template>

<script>
    export default {
        name: 'editarActivoView',
        data(){
            return {
                activo: {
                    tipo: null,
                    marca: null,
                    modelo: null,
                    estado: null
                 },
            }
        },
        methods: {
            getActivo(){
                axios({
                    method: "get",
                    url: process.env.VUE_APP_RUTA_API+"/activos/"+this.$route.params.id,
                
                })
                .then(response => {
                    this.activo = response.data;
                    console.log(response);
                })
                .catch(e => console.log(e))

            },
            guardar(){
                axios({
                    method: "patch",
                    url: process.env.VUE_APP_RUTA_API+"/activos/"+this.$route.params.id,
                    data: this.activo
                })
                .then(response => {
                    this.$store.state.mensaje = {
                        texto: "El activo seleccionado se edito exitosamente",
                        tipo: "exito"
                    };
                    this.$store.dispatch('addMensajeAction');
                    this.$router.push('/areas');
                })
                .catch(e => console.log(e))
            }     
        },
        computed: {

        },
        mounted() {
            this.getActivo()
        },
        components: {

        }

    }
</script>
<style scoped>
    form{
        max-width: 400px;
    }
</style>