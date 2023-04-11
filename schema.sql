drop table if exists autores;

create table if not exists autores(
    id serial primary key,
    nome text not null,
    idade smallint
    
);

drop table if exists livros;

create table if not exists livros(
    id serial primary key,
    autor_id integer not null,
    nome text not null,
    editora varchar(100),
    genero varchar(50) not null,
    data_publicacao date,
    foreign key (autor_id) references autores (id)
);

drop table if exists usuarios;

create table if not  exists usuarios(
    id serial primary key,
    nome text not null,
    email text not null,
    senha text not null

);