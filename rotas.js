const express = require("express");
const autores = require('./controladores/autores.js');
const livros =  require('./controladores/livros.js');

const rotas = express();


//autores
rotas.get('/autores', autores.listarAutores);
rotas.get('/autores/:id', autores.obterAutor);
rotas.post('/autores', autores.cadastrarAutor);
rotas.put('/autores/:id', autores.atualizarAutor);
rotas.delete('/autores/:id', autores.deletarAutor);

//livros
rotas.get('/livros', livros.listarLivros);
rotas.get('/livros/:id', livros.obterLivros);
rotas.post('/livros', livros.cadastrarLivros);
rotas.put('/livros/:id', livros.atualizarLivros);
rotas.delete('/livros/:id', livros.deletarLivros);

module.exports = rotas;
