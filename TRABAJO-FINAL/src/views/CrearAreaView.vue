<template>
    <div class="row justify-content-center">
        <div class="center"><h1>REGISTRO DE AREAS</h1></div> 
       
        <form action="center" @submit.prevent="guardar()">
            <div class="mb-3" >
                AREA: <input type="text" v-model="area.nomArea" class="form-control">
                ENCARGADO: <input type="text" v-model="area.nomEncargado" class="form-control">
                Cantidad de Funcionarios: <input type="text" v-model="area.cantidad" class="form-control">
            </div>
            <div class="center2"><button type="submit" class="btn btn-primary m-2" >Guardar</button></div>
        </form>
        
        <div class="center"><router-link to="/areas"><button class="btn btn-secondary m-2" >Cancelar</button></router-link></div>
    </div>
</template>

<script>
    export default {
        name: 'crearAreaView',
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
            guardar(){
                if(this.area.nomArea!=null){
                    axios({
                    method: "post",
                    url: process.env.VUE_APP_RUTA_API+"/areas",
                    data: this.area
                })
                .then(response => {
                    this.$store.state.mensaje = {
                        texto: "El area se creo exitosamente",
                        tipo: "exito"
                    };
                    this.$store.dispatch('addMensajeAction');
                    this.$router.push('/areas');
                })
                .catch(e => console.log(e))
                }else{
                    this.$store.state.mensaje = {
                        texto: "Llene el formulario",
                        tipo: "exito"
                    };
                    
                    this.$store.dispatch('addMensajeAction');
                    this.$router.push('/areas/crear');
                }
              
            }  
                    
           
            
        },
        computed: {

        },
        mounted() {
        },
        components: {

        }

    }
</script>
<style scoped>
    form{
        max-width: 400px;
    }
    .dVolver {
  text-align: center;
  background-color: lightblue;
  padding: 5px;
  width: 10px;
}
.acciones{
        border-top: 1px solid black;
        margin-top: 20px;
    }
</style>