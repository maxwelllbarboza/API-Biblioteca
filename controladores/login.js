const conexao = require('../conexaoDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret.js');


const login = async(req, res) => {
    const {email, senha} = req.body;

    if(!email){
        return res.status(400).json("O campo email é obrigatório.")
    }
    if(!senha){
        return res.status(400).json("O campo senha é obrigatório.")
    }

    try{
        const query = `select * from usuarios where email = $1`;
        const usuarios = await conexao.query(query, [email]);
       
        if (usuarios.rowCount === 0){
            return res.status(400).json('E-mail e senha incorretos.');
        }
        const usuarioLogado = usuarios.rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuarioLogado.senha);       
        
        if (!senhaCorreta){
            return res.status(400).json(`Login inválido.`);

        }
        const token = jwt.sign({
            id: usuarioLogado.id,
            nome: usuarioLogado.nome,
            email: usuarioLogado.email

        }, jwtSecret, {
            expiresIn: "2h"
        });

        return res.send(token);       

    }catch (error){
        return res.status(400).json(error.message);
    }
}

module.exports =  {login};