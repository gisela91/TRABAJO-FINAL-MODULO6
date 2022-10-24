<template>
    <div class="row align-items-center" style="height:100px; background: #FFE4C4">
        <div class="center"><h3>EDITANDO EL AREA</h3></div>
    </div>
        <div class="abs-center"> 
        <form action="" @submit.prevent="guardar()">
            <div class="mb-3" >
                <input type="text" v-model="area.nomArea" class="form-control">
            </div>
            <textarea style="width: 100%" v-model="area.nomEncargado"></textarea>
            <textarea style="width: 100%" v-model="area.cantidad"></textarea>
            
            <button type="submit" class="btn btn-primary m-2">Guardar</button>
            <button class="btn btn-ligth m-2">Cancelar</button>
        </form>
        
    </div>
    
</template>

<script>
    export default {
        name: 'editarAreaView',
        data(){
            return {
                area:{
                    nomArea: null,
                    nomEncargado: null,
                    cantidad: null
                }
            }
        },
        methods: {
            getArea(){
                axios({
                    method: "get",
                    url: process.env.VUE_APP_RUTA_API+"/areas/"+this.$route.params.id,
                
                })
                .then(response => {
                    this.area = response.data;
                    console.log(response);
                })
                .catch(e => console.log(e))

            },
            guardar(){
                axios({
                    method: "patch",
                    url: process.env.VUE_APP_RUTA_API+"/areas/"+this.$route.params.id,
                    data: this.area
                })
                .then(response => {
                    this.$store.state.mensaje = {
                        texto: "El area se edito exitosamente",
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
            this.getArea()
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