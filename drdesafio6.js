const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

//Rutas
app.use('/api/productos', require('./rutas/rutas'))

// Middleware para manejar errores
app.use((error, req, res, next) => {
  res.status(error.code || 500).json({ error : error.message })
})

const puerto = 8080

const server = app.listen(puerto, () => {
  console.log(`servidor escuchando en http://localhost:${puerto}`)
})

server.on('error', error => {
  console.log('error en el servidor:', error)
})
