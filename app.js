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
                <button class="btn btn-danger">Eliminar</button>
            </div>
            `;
            listaTareas.appendChild(elemento);
        }
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