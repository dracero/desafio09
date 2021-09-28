const fs = require('fs')
const productos = require('../api/productos')

class Cart {
    constructor(){
        try {
            fs.readFileSync('./data/carrito.json');
        } catch (error) {
            fs.writeFileSync('./data/carrito.json', JSON.stringify([]));
        }
    }
    
    //se crea un carrito vacio
    addcart(){
      try{  
        let cart = JSON.parse(fs.readFileSync('./data/carrito.json'))
        let newCart = {
            id: cart.length + 1,
            timestamp: Date.now(),
            productos:[]
        }
        cart.push(newCart)
        fs.writeFileSync('./data/carrito.json', JSON.stringify(cart));
      }catch{
        throw new Error('Hay un error al guardar') 
      } 
    }

    addproduct(id,id_prod){
     try {
        let newProduct = productos.getById(id_prod)
        let cart = JSON.parse(fs.readFileSync('./data/carrito.json'))
        let indcar = cart.findIndex(x => x.id == id)//busco el ídice de ese id
        if (cart[indcar].productos.length > 0){
               let index =  cart[indcar].productos.findIndex(x => x.id == id_prod);
               console.log(newProduct)
                if(newProduct && index === -1){ //me fijo si el producto existe y si no está en el carrito
                   console.log(cart)
                   cart[indcar].productos.push(newProduct)
                   fs.writeFileSync('./data/carrito.json', JSON.stringify(cart));
                }
        }else{
            console.log(cart)
            cart[indcar].productos.push(newProduct)
            fs.writeFileSync('./data/carrito.json', JSON.stringify(cart));
        }        
        return newProduct;
      } catch{
        throw new Error('Primero hay que crear un carrito') 
      } 
    }

    showproducts(id){
     try{   
        let cart = JSON.parse(fs.readFileSync('./data/carrito.json'))
        let findCart = cart.filter(cart => cart.id == id)
        return findCart[0].productos
     }catch{
        throw new Error('No hay carritos') 
     }
    }

    delproduct(id,id_prod){
       try{ 
        let cart = JSON.parse(fs.readFileSync('./data/carrito.json'))
        let indcar = cart.findIndex(x => x.id == id)//busco el ídice de ese id
        let index =  cart[indcar].productos.findIndex(x => x.id == id_prod);
        let erase = cart[indcar].productos[index]//guardo el producto borrado
        cart[indcar].productos.splice(index,1);
        index !== -1 ? fs.writeFileSync('./data/carrito.json', JSON.stringify(cart)) : erase = undefined
        return erase
       } catch{
        throw new Error('producto no encontrado o carrito no encontrado') 
       }      
    }
    
    delcart(id){
        try{ 
         let cart = JSON.parse(fs.readFileSync('./data/carrito.json'))
         let indcar = cart.findIndex(x => x.id == id)//busco el ídice de ese id
         let erase = cart[indcar]//guardo el carrito borrado
         cart.splice(indcar,1);
         indcar !== -1 ? fs.writeFileSync('./data/carrito.json', JSON.stringify(cart)) : erase = undefined
         return erase
        } catch{
         throw new Error('producto no encontrado o carrito no encontrado') 
        }      
     }

}

 module.exports = new Cart();