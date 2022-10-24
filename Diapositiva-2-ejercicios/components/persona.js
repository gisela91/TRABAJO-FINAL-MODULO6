Vue.component(
    'persona',
    {
        template:
        `
            <div>
                <p>nombre: {{persona.id}}</p>
                <p>nombre: {{persona.nombre}}</p>
                <p>nombre: {{persona.direccion}}</p>
            </div>
        `,
        props:["persona"]
    }
);