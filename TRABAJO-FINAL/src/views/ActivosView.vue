<template>
    <div>
        <div class="row align-items-center" style="height:100px; width:86em; background: #FFE4C4">
            <h3>AREA DE {{nomArea}}</h3>

        </div>
       
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    AGREGAR UN ACTIVO
                </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">               
                    <form action="center" @submit.prevent="guardar()">
                        <div class="mb-3" >
                            TIPO: <input type="text" v-model="activo.tipo" class="form-control" >
                            MARCA: <input type="text" v-model="activo.marca" class="form-control">
                            MODELO: <input type="text" v-model="activo.modelo" class="form-control">
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">ESTADO</label>
                                <select class="form-control" id="exampleFormControlSelect1" v-model="activo.estado">
                                    <option>Nuevo</option>
                                    <option>Usado</option>
                                    <option>Desuso</option>
                                </select>
                            </div>
                        </div>
                        <div class="center2">
                            <button type="submit" class="btn btn-primary m-2" >Guardar</button></div>
                    </form>
                </div>
                </div>
            </div>
        </div>
        <h5>Buscador activo {{textoABuscar}}</h5>
        <form action="">
            <div class="input-group mb-3">
                <input type="text" v-model="textoABuscar" class="form-control"  placehoder="Buscar activo" >
                <button class="btn btn-outline-secondary" @click.prevent="getActivos()">Buscar</button>
            </div>
        </form>       
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
        </div>
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
        </div>
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
        </div>

        <div class="accordion" id="accordionExample">
            <div class="accordion-item" v-for="(value, index) in lista">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" :data-bs-target="`#collapseTwo${index}`" aria-expanded="false" :aria-controls="`collapseTwo${index}`">
                        <div class="container text-center">
                            <div class="row row-cols-4">
                                <div class="col">TIPO: {{value.tipo}}</div>
                                <div class="col">MARCA: {{value.marca}}</div>
                                <div class="col">MODELO: {{value.modelo}}</div>
                                <div class="col">ESTADO: {{value.estado}}</div>
                            </div>
                        </div>
                    </button>
                </h2>
                <div :id="`collapseTwo${index}`" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                       <AppAccionesActivos  @on-accion="irA($event, value.id)"></AppAccionesActivos>
                    </div>
                </div>
            </div>  
        </div>
    </div>
    
</template>

<script>
import AppAlert from '@/components/AppAlert.vue';
import AppAccionesActivos from '../components/AppAccionesActivos.vue';
    export default {
        name: 'activosView',
        data(){
            return {
                textoABuscar: '',
                activo: {
                    tipo: null,
                    marca: null,
                    modelo: null,
                    estado: null,
                    areaId: null
                 },
                 activos: [],
                 nomArea: null
            }
        },
        methods: {
           
            getNomArea(){
                axios({
                    method: "get",
                    url: process.env.VUE_APP_RUTA_API+"/areas/"+this.$route.params.id,
                })
                .then(response => {
                    this.nomArea = response.data.nomArea;
                    console.log(response);
                })
                .catch(e =>console.log(e));
            },
            guardar(){
                if(this.activo.tipo!=null){
                    this.activo.areaId = this.$route.params.id,     
                    axios({
                    method: "post",
                    url: process.env.VUE_APP_RUTA_API+"/activos",
                    data: this.activo 

                    })
                    .then(response => {
                        this.activo.tipo = null;
                        this.activo.marca = null;
                        this.activo.modelo = null;
                        this.activo.estado = null;
                        this.activo.areaId = null;
                        this.$store.state.mensaje = {
                            texto: "El area se creo exitosamente",
                            tipo: "exito"
                        };
                        this.$store.dispatch('addMensajeAction');
                        this.$router.push({name: 'verActivos', params: {id: this.$route.params.id}});
                    })
                    .catch(e => console.log(e))
                    }else{
                        this.$store.state.mensaje = {
                            texto: "El formulario para crear un activo se encuentra vacio",
                            tipo: "exito"
                        };
                        
                        this.$store.dispatch('addMensajeAction');
                        this.$router.push({name: 'verActivos', params: {id: this.$route.params.id}});
                }
            },
            getActivos(){
                axios({
                    method: "get",
                    url: process.env.VUE_APP_RUTA_API+"/activos/?q="+this.textoABuscar,
                })
                .then(response => {
                    this.activos = response.data;
                    console.log(response);
                })
                .catch(e =>console.log(e));
            },
           
            irA(opcion, area_id){
                if(opcion == 'editar'){
                    this.$router.push({name: 'editarActivo', params: {id: area_id}});
                }
                else{
                    if(confirm("Esta seguro de eliminar el activo")){
                        axios({
                            method: "delete",
                            url: process.env.VUE_APP_RUTA_API+"/activos/"+area_id,
                            
                        })
                        .then(response => {
                            this.getActivos();
                        })
                        .catch(e => console.log(e))
                    }
                    this.getActivos();
                }
                
            },
            lista(){
                if(this.$store.state.soloTerminado){
                    return this.activos.filter(item =>{
                        return item.terminado;
                    });
                }
                return this.activos;
            }
        },
        computed: {
            lista(){
                if(this.$store.state.soloTerminado){
                    return this.activos.filter(item =>{
                        return item.terminado;
                    });
                }
                return this.activos;
            }
        },
        mounted() {
            this.getNomArea(),
            this.guardar(),
            this.getActivos()
        },
        components: {
            AppAlert,
            AppAccionesActivos
        }

    }
</script>
<style>
.right{
    float:right
}
</style>