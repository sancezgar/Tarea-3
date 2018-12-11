class Tareas
{
    constructor(titulo,descripcion)
    {
        this.titulo = titulo;
        this.descripcion = descripcion;
    }
}

class UI
{
    agregarTarea(tarea)
    {
        if(localStorage.getItem('tareas') === null)
        {
            var tareas = [];
            tareas.push(tarea);
            localStorage.setItem('tareas',JSON.stringify(tareas));
        }
        else
        {
            var tareas = JSON.parse(localStorage.getItem('tareas'));
            tareas.push(tarea);
            localStorage.setItem('tareas',JSON.stringify(tareas));
        }
        this.mostrarMensaje('Se agrego exitosamente la tárea','success');
        this.obtenerTareas();
        this.limpiarForm();
    }

    limpiarForm()
    {
        document.getElementById('formTarea').reset();
    }

    obtenerTareas()
    {
        var tareas = JSON.parse(localStorage.getItem('tareas'));
        var listaTareas = document.getElementById('listaTareas');

        listaTareas.innerHTML = "";

        for(var i=0;i<tareas.length;i++)
        {
            var elemento = document.createElement('div');
            elemento.className = 'card mt-2';
            elemento.innerHTML = `
            <div class="card-header">
            <h4>${tareas[i].titulo}</h4>
            </div>
            <div class="card-body">
                <p>${tareas[i].descripcion}</p>
            </div>
            <div class="card-footer">
                <button class="btn btn-danger" onclick="ui.eliminarTarea('${tareas[i].titulo}')">Eliminar</button>
            </div>
            `;
            listaTareas.appendChild(elemento);
        }
    }

    eliminarTarea(titulo)
    {
        if(confirm('¿Deseas ELIMINAR la tarea?'))
        {
            var tareas = JSON.parse(localStorage.getItem('tareas'));
            for(var i=0;i<tareas.length;i++)
            {
                if(tareas[i].titulo == titulo)
                {
                    tareas.splice(i,1);
                }
            } 
            localStorage.setItem('tareas',JSON.stringify(tareas));
            this.mostrarMensaje('Se Eliminó exitosanente la tarea','primary');
            this.obtenerTareas();
        }
    }

    mostrarMensaje(mensaje,clase)
    {
        var cuerpo = document.querySelector('#cuerpo');
        var app = document.querySelector('#app');

        var div = document.createElement('div');
        div.className = `alert alert-${clase} fixed-top`;
        div.appendChild(document.createTextNode(mensaje));

        cuerpo.insertBefore(div,app);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        },2000);

    }
}

//Eventos del DOM
document.getElementById('formTarea').addEventListener('submit',function(e){
    e.preventDefault();

    var titulo = document.getElementById('titulo').value;
    var descripcion = document.getElementById('descripcion').value;

    var tareas = new Tareas(titulo,descripcion);
    var ui = new UI();

    ui.agregarTarea(tareas);

})

const ui = new UI();
ui.obtenerTareas();