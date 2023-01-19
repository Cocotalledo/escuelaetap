
create database ETAP;

use ETAP;


create table cursos(
idCurso int unsigned auto_increment not null,
curso varchar (100) not null,
modalidad varchar (50) not null,
fecha_inicio varchar (15),
primary key (idCurso)
);


create table contactos(
idContacto int unsigned auto_increment not null,
nombre_apellido varchar (200) not null,
email varchar (50) not null,
curso varchar (100) not null,
modalidad varchar (50) not null,
consulta varchar (1000) not null,
idCurso int unsigned null,
primary key (idContacto),
foreign key (idCurso) references cursos(idCurso)
);

DROP table contactos;

insert into cursos values (null, "Piloto con HVI", "Sin definir", "Virtual");
insert into cursos values (null, "Piloto con HVI", "Sin definir", "Presencial");
insert into cursos values (null, "Operador Radiotelefonista Restringido", "Sin definir", "Virtual");
insert into cursos values (null, "Operador Radiotelefonista Restringido", "Sin definir", "Presencial");
insert into cursos values (null, "Tripulante de Cabina de Pasajeros", "Sin definir", "Virtual");
insert into cursos values (null, "Tripulante de Cabina de Pasajeros", "Sin definir", "Presencial");
insert into cursos values (null, "Despachante de Aeronaves", "Sin definir", "Virtual");
insert into cursos values (null, "Despachante de Aeronaves", "Sin definir", "Presencial");
insert into cursos values (null, "Instructor de Aviones", "Sin definir", "Presencial");
insert into cursos values (null, "Instructor de Aviones", "Sin definir", "Virtual");
insert into cursos values (null, "Instructor de Helicóptero", "15-03-2023", "Presencial");










