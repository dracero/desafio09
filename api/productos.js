const fs = require('fs')

class Producto {   
  constructor(){
        try {
            fs.readFileSync('./data/productos.json');
        } catch (error) {
            fs.writeFileSync('./data/productos.json', JSON.stringify([]));
        }
    }
  
    save(nombre, descripcion, codigo, foto, precio, stock){
     try{ 
        let db = JSON.parse(fs.readFileSync('./data/productos.json'))
        let nuevoProducto= {
            id: db.length + 1,
            timestamp: Date.now(),
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo,
            foto: foto,
            precio: precio,
            stock: stock
        }
        db.push(nuevoProducto);
        fs.writeFileSync('./data/productos.json', JSON.stringify(db));
        return(nuevoProducto);
      }catch{
        throw new Error('Hubo un error al guardar') 
      } 
    }

    update(ind, nombre, descripcion, codigo, foto, precio, stock){
       try{ 
        let updb = JSON.parse(fs.readFileSync('./data/productos.json'))
        let index = updb.findIndex(x => x.id == ind);
        updb[index].id = ind;
        timestamp: Date.now(),
        updb[index].nombre = nombre;
        updb[index].descripcion = descripcion;
        updb[index].codigo = codigo;
        updb[index].foto = foto;
        updb[index].precio = precio;
        updb[index].stock = stock;
        fs.writeFileSync('./data/productos.json', JSON.stringify(updb));
        return updb[index];
        } catch{
            throw new Error('producto no encontrado') 
        }
    }     

    getAll(){
        let db = JSON.parse(fs.readFileSync('./data/productos.json'))
        return db
    }

    getById(ind){
      try{  
        let db = JSON.parse(fs.readFileSync('./data/productos.json'))
        let index = db.findIndex(x => x.id == ind);
        return db[index];
      }catch{
        throw new Error('producto no encontrado') 
      } 
    }

    delById(ind){
      try{  
        let db = JSON.parse(fs.readFileSync('./data/productos.json'))
        let index = db.findIndex(x => x.id == ind);
        let erase = db[index]
        db.splice(index,1);
        fs.writeFileSync('./data/productos.json', JSON.stringify(db));
        return erase;
        } catch{
        throw new Error('producto no encontrado') 
        } 
    }

}

module.exports = new Producto()