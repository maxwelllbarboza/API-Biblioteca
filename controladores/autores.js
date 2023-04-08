const conexao = require('../conexaoDB')

const listarAutores = async (req, res) => {
    const livros = await conexao.query('select * from livros');

    res.status(201).json(livros);

}

const obterAutor = async (req, res) => {

}

const atualizarAutor = async (req, res) => {

}
const cadastrarAutor = async (req, res) => {

}
const deletarAutor = async (req, res) => {

}

module.exports = {
    listarAutores, 
    obterAutor, 
    atualizarAutor, 
    cadastrarAutor, 
    deletarAutor
}