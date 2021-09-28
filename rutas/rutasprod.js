const express = require('express')

const router = express.Router()
const productos = require('../api/productos')

router.get('/', (req, res, next) => {
  const prods = productos.getAll()
  if (prods.length === 0) {
    next({ code: 404, message: 'No hay productos cargados' })
  }
  res.json(prods)
})

router.get('/:id', (req, res, next) => {
if (res.locals.authenticated) { 
  const { id } = req.params
  const producto = productos.getById(id)
  if (producto === undefined)
    next({ code: 404, message: 'No se encontro el producto' })
  res.json(producto)
}else res.json({
  error: {
    'status': -1,
    'ruta': req.path,
    'implementada': 'No implementada',
    'metodo': 'No implementados'
  }
}); 
})

router.post('/', (req, res, next) => {
 if (res.locals.authenticated) {  
  const producto = productos.save(
    req.query.nombre,
		req.query.descripcion,
		req.query.codigo,
    req.query.foto,
		req.query.precio,
		req.query.stock
  )
  res.json(producto)
 }else res.json({
  error: {
    'status': -1,
    'ruta': req.path,
    'implementada': 'No implementada',
    'metodo': 'No implementados'
  }
});
})

router.put('/:id', (req, res, next) => {
  if (res.locals.authenticated) {  
    const { id } = req.params
    console.log(id)
	  const producto = productos.update(
		id,
		req.query.nombre,
		req.query.descripcion,
		req.query.codigo,
    req.query.foto,
		req.query.precio,
		req.query.stock
	  )
	  if (producto === undefined) throw new Error('producto no encontrado')
	  res.json(producto)
  }else res.json({
    error: {
      'status': -1,
      'ruta': req.path,
      'implementada': 'No implementada',
      'metodo': 'No implementados'
    }
  });  
})

router.delete('/:id', (req, res, next) => {
if (res.locals.authenticated) {   
  const { id } = req.params
	const prods = productos.delById(id)
	if (prods === undefined) throw new Error('producto no encontrado')
	res.json(prods)
}else res.json({
  error: {
    'status': -1,
    'ruta': req.path,
    'implementada': 'No implementada',
    'metodo': 'No implementados'
  }
}); 
})

module.exports = router
