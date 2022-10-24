Vue.component(
    'contador',
    {
        template:"<button v-on:click='iniciocontador++'>Cuenta: {{iniciocontador}}</button>",
        data: function(){
            return{
                contador: 0
            }
        },
        props:["iniciocontador"],
        mounted: function(){
            // alert("contador iniciado");
            console.log("contador iniciado");
        }
    }
);
