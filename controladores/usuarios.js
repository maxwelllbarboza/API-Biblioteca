const conexao = require('../conexaoDB');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) =>{
    const {nome, email, senha} = req.body;

    if(!nome){return res.status(400).json("O campo nome é obrigatório.");}
    if(!email){return res.status(400).json("O campo email é obrigatório.");}
    if(!senha){return res.status(400).json("O campo senha é obrigatório.");}
    
    try{
        const query = 'select * from usuarios where email = $1';
        const usuario = await conexao.query(query, [email]);
        if (usuario.rowCount > 0){return res.status(400).json('Este e-mail já foi cadastrado.');}
    }catch (error){
        return res.status(400).json(error.message);
    }
    try{
        const hash = await bcrypt.hash(senha, 10);         
        const query = `insert into usuarios(nome, email, senha) values($1,$2,$3)`       
        const cadastrarUsuario = await conexao.query( query, [nome, email, hash]);

        if (cadastrarUsuario.rowCount === 0){
            return res.status(400).json('Não foi possível inserir o registro.')
        }
        return res.status(200).json('Usuário inserido com sucesso.')

    }catch (error){
        return res.status(400).json(error.message);
    }
}
module.exports =  {cadastrarUsuario};