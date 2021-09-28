const express = require('express')
const carritoRouter = express.Router()
let cart = require('../api/carrito')

carritoRouter.post('/', (req,res, next)=>{
if (res.locals.authenticated) {
    cart.addcart()
    res.json(cart)
  }else res.json({
    error: {
      'status': -1,
      'ruta': req.path,
      'implementada': 'No implementada',
      'metodo': 'No implementados'
    }
  });
})

carritoRouter.get('/:id/productos', (req,res, next)=>{
    if (res.locals.authenticated) {
      let prodcart = cart.showproducts(req.params.id);
      if (prodcart.length === 0){
         return res.json({error : 'carrito vacío'})
      }
     res.json(prodcart)
    }else res.json({
        error: {
          'status': -1,
          'ruta': req.path,
          'implementada': 'No implementada',
          'metodo': 'No implementados'
        }
      });
})

carritoRouter.post('/:id/productos', (req,res, next)=>{
  if (res.locals.authenticated) {  
    cart.addproduct(parseInt(req.params.id ),parseInt(req.query.codigo))
    res.json(cart.showproducts(parseInt(req.params.id)))
  } else res.json({
    error: {
      'status': -1,
      'ruta': req.path,
      'implementada': 'No implementada',
      'metodo': 'No implementados'
    }
  });  
})

carritoRouter.delete('/:id/productos/:id_prod', (req,res, next)=>{
if (res.locals.authenticated) {   
    borrado = cart.delproduct(parseInt(req.params.id ),parseInt(req.params.id_prod))
    borrado !== undefined ? res.json("borrado") : res.json("No encontrado")
  } else res.json({
    error: {
      'status': -1,
      'ruta': req.path,
      'implementada': 'No implementada',
      'metodo': 'No implementados'
    }
  });   
})

carritoRouter.delete('/:id', (req,res, next)=>{
  if (res.locals.authenticated) {    
    borrado = cart.delcart(parseInt(req.params.id ))
    borrado !== undefined ? res.json("borrado") : res.json("No encontrado")
  } else res.json({
    error: {
      'status': -1,
      'ruta': req.path,
      'implementada': 'No implementada',
      'metodo': 'No implementados'
    }
  });   
})

module.exports = carritoRouter;