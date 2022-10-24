<template>
    <div>
        <div class="row align-items-center" style="height:100px; width:86em; background: #FFE4C4">
            <h3>AREA DE INVENTARIO</h3>
        </div>
        <div class="right p-2 flex-shrink-1 bd-highlight">
            <router-link to="/areas/crear">
            <button class="btn btn-outline-secondary" type="submit" >Agregar Area</button>
            </router-link>
        </div>
        <h5>Buscador de areas {{textoABuscar}}</h5>
        <form action="">
            <div class="input-group mb-3">
                <input type="text" v-model="textoABuscar" class="form-control"  placehoder="Buscar area" >
                <button class="btn btn-outline-secondary" @click.prevent="getAreas()">Buscar</button>
            </div>
        </form>
  
      
        <div class="accordion" id="accordionExample">
            <div class="accordion-item" v-for="(value, index) in lista">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" :data-bs-target="`#collapseTwo${index}`" aria-expanded="false" :aria-controls="`collapseTwo${index}`">
                       {{value.nomArea}}
                    </button>
                </h2>
                <div :id="`collapseTwo${index}`" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <div> {{value.nomEncargado}} = (Encargado del Area)</div>
                       {{value.cantidad}} = (Funcionarios en el Area)
                        <AppAcciones @on-accion="irA($event, value.id)"></AppAcciones>
                       
                    </div>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
    import AppAcciones from '@/components/AppAcciones.vue';
    export default {
        name: 'areas',
        data(){
            return {
                soloTerminado: false,
                textoABuscar: '',
                area: {
                    nomArea: null,
                    nomEncargado: null,
                    cantidad: null,
                    terminado: false
                 },
                 areas: []
            }
        },
        methods: {
            getAreas(){
                axios({
                    method: "get",
                    url: process.env.VUE_APP_RUTA_API+"/areas/?q="+this.textoABuscar,
                })
                .then(response => {
                    this.areas = response.data;
                    console.log(response);
                })
                .catch(e =>console.log(e));
            },
           
            setearCheckbox(terminado, id){
                axios({
                    method: "patch",
                    url: process.env.VUE_APP_RUTA_API+"/areas/"+id,
                    data: {
                        terminado: !terminado
                    }
                })
                .then(response => {
                    this.areas = response.data;
                    console.log(response);
                })
                .catch(e =>console.log(e));
            },
            irA(opcion, area_id){
                if(opcion == 'editar'){
                    this.$router.push({name: 'editarArea', params: {id: area_id}});
                }else{
                    if(opcion == 'ver'){
                        this.$router.push({name: 'verActivos', params: {id: area_id}});
                    }else{
                        if(confirm("Esta seguro de eliminar tarea")){
                            axios({
                                method: "delete",
                                url: process.env.VUE_APP_RUTA_API+"/areas/"+area_id,
                            })
                            .then(response => {
                                this.getAreas();
                            })
                            .catch(e => console.log(e))
                        }
                    }
                }
            },
            lista(){
                if(this.$store.state.soloTerminado){
                    return this.areas.filter(item =>{
                        return item.terminado;
                    });
                }
                return this.areas;
            }
        },
        computed: {
            lista(){
                if(this.$store.state.soloTerminado){
                    return this.areas.filter(item =>{
                        return item.terminado;
                    });
                }
                return this.areas;
            }
        },
        mounted() {
            this.getAreas()
        },
        components: {
            AppAcciones
        }

    }
</script>
<style>
.right{
    float:right
}
</style>