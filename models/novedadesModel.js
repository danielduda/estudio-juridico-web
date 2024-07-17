const { isAsyncFunction } = require('util/types');
var pool = require ('./bd');


//sirve para listar novedades
async function getNovedades(){


        var query = 'select * from novedades';
        var rows = await pool.query (query);
        return rows;
    
   

}

//sirve para eliminar novedades
async function deleteNovedadesById(id){

        var query = 'delete from novedades where id = ?';
        var rows = await pool.query (query, [id]);
        return rows;
    


}

//sirve para agregar

async function insertNovedad(obj) {
        try {
                var query = 'insert into novedades set ?';
                var rows = await pool.query(query, [obj]);
                return rows;       
        }
        catch{
                console.log(error);
                throw (error);
        }
        
    
}

//funciòn que nos permitirá obtener una noticia única de la base de datos utilizando el id de la misma para seleccionarla.

async function getNovedadById(id) {


        var query = 'select * from novedades where id = ?';
        var rows = await pool.query(query, [id]);
        return rows[0];
}


async function modificarNovedadById(obj, id) {
        try {
                var query = 'update novedades set ? where id= ?';
                var rows = await pool.query(query, [obj, id]);
                return rows;       
        }
        catch{
                throw (error);
        }
        
    
}
//funcion para buscar novedades

async function buscarNovedades (busqueda) {


        var query = "select * from novedades where titulo like ? OR subtitulo like ? OR cuerpo like ? ";
        
        var rows = await pool.query (query, ['%' + busqueda + '%',  '%' + busqueda + '%',  '%' + busqueda + '%']);
        
        return rows;
        
        
        }
        
        
        module.exports = { getNovedades, deleteNovedadesById,  insertNovedad, getNovedadById, modificarNovedadById, buscarNovedades}