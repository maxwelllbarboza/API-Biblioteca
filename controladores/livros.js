const conexao = require('../conexaoDB')

const listarLivros = async (req, res) => {
    try{
        const query = `select l.Id, l.genero, a.nome as nome_autor, l.nome , l.editora, l.data_publicacao from livros l 
        left join autores a on l.autor_id = a.id`

        const {rows: Livros } = await conexao.query(query);

        if (Livros.rows === 0){
           return res.status(400).json('Não existe registro  na tabela');
        }
        return res.status(201).json(Livros);

    }catch (error){
        return res.status(500).json(error.message);
    }
}

const obterLivros = async (req, res) => {
    const { id } = req.params;
    try{
        const query = 'select * from livros where id = $1'
        const Livro = await conexao.query(query, [id]);

        if (Livro.rowCount === 0){
            return res.status(404).json('O livro não existe.');
        }
        return res.status(201).json(Livro.rows[0]);

    }catch (error){
        return res.status(400).json(error.message);
    }
}

const atualizarLivros = async (req, res) => {
    const { id } = req.params;
    const {autor_id, nome, editora, genero, data_publicacao} = req.body;

    try{
        const consultarLivro = await conexao.query('select * from livros where id = $1', [id]);

        if (consultarLivro.rowCount === 0){
            return res.status(400).json('Livro não encontrado.');
        }
        if (!autor_id){
            return res.status(400).json('O campo Autor é obrigatório.');
        }
        if (!nome){
            return res.status(400).json('O campo Nome é obrigatório.');
        }
        if (!genero){
            return res.status(400).json('O campo Gênero é obrigatório.');
        }
        const query = 'update livros set autor_id = $1, nome = $2, editora = $3, genero = $4, data_publicacao = $5  where id = $6'
        const alterarLivro = await conexao.query(query, [autor_id, nome, editora, genero, data_publicacao, id])

        if (alterarLivro.rowCount === 0){
            return res.status(400).json('Não foi possível atualizar o Livro.');
        }
        return res.status(200).json('Livro atualizado com sucesso.');

    }catch (error){
        return res.status(400).json(error.message);
    }
    

}
const cadastrarLivros = async (req, res) => {
    const {autor_id, nome, editora, genero, data_publicacao } = req.body;

    try{
        const query = 'insert into livros (autor_id, nome, editora, genero, data_publicacao) values($1,$2,$3,$4,$5)'
        const livroCadastrado = await conexao.query(query, [autor_id, nome, editora, genero, data_publicacao]);

        if (livroCadastrado.rowCount === 0){
            return res.status(400).json('Não foi possível cadastrar o livro.');
        }
        return res.status(201).json('Livro cadastrado com sucesso.');


    }catch (error){
        return res.status(500).json(error.message);
    }
}

const deletarLivros = async (req, res) => {
    const { id } = req.params;
    try{
        const livroConsultado = await conexao.query('select * from livros where id = $1', [id]);

        if(livroConsultado.rowCount === 0){
            return res.status(400).json('Livro não localizado.');
        }
        const livroDeletado = await conexao.query('delete from livros where id = $1', [id]);
        
        if(livroDeletado.rowCount === 0){
            return res.status(400).json('Não foi possível deletar o Livro.');
        }
        return res.status(201).json('Livro deletado com sucesso.');

    }catch (error){
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarLivros, 
    obterLivros, 
    atualizarLivros, 
    cadastrarLivros, 
    deletarLivros
}