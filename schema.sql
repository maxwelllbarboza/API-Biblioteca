drop table if exists autores;

create table if no exists autores(
    id serial primary key,
    nome text not null,
    idade smallint
    
);

drop table if exists livros;

create table if no exists livros(
    id serial primary key,
    autor_id integer not null,
    nome text not null,
    editora varchar(100),
    genero varchar(50) not null,
    data_publicacao date,
    foreign key (autor_id) references autores (id)
);