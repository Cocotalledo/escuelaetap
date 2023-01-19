

const express = require('express');
const app = express();
const mysql = require('mysql2');


//Motor de plantilla
const hbs = require('hbs');


//Encontrar archivos
const path = require('path');


//Para enviar mails
const nodemailer = require('nodemailer');
const { appendFile, read } = require('fs');
const { log } = require('console');


//Variables de entorno
require('dotenv').config();


//Configuramos el Puerto
const PORT = process.env.PORT;


// Middelware: Funciones que dan info a json
app.use(express.json());     //para que detecte json
app.use(express.urlencoded({extended: true}));  //para q decodifique y entienda los datos que van a ser ingrsados en un formulario
app.use(express.static(path.join(__dirname, 'public'))); //para que lea lo que se va a poner en la carpeta "public" que seria html, ccs.


// Configuramos el motor de plantillas de hbs(habndlebars)
app.set('view engine', 'hbs');


// Configuramos la ubicacion de las plantillas
app.set('views', path.join(__dirname, 'views'));


// Configuramos los parciales de los motores de plantillas
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// // Conexion a la BD
// const conexion = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     port: process.env.MYSQL_DBPORT
// })


// conexion.connect((err) =>{
//     if(err) throw err;
//     console.log(`Conectado a la BD ${process.env.MYSQL_DATABASE}`);
// })


// Rutas de la App
app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Inicio'
    })
})


app.get('/addcursos', (req, res) => {
    res.render('addcursos', {
        titulo: 'Agregar cursos'
    })
})


app.get('/contacto', (req, res) => {
    res.render('contacto', {
        titulo: 'Contacto'
    })
})


app.get('/cursos', (req, res) => {

//     let sql = "select * from cursos";
//         conexion.query(sql, function(err, result){
//             if (err) throw err;
//                 console.log(result);
//                 res.render('cursos', {
//                     titulo: 'Cursos',
//                     datos: result
//                 })
//         })
// })


app.post('/addcursos', (req, res) => {

    const curso = req.body.curso;
    const modalidad = req.body.modalidad;
    const fecha_inicio = req.body.fecha_inicio;


    let datos = {
         curso: curso,
         modalidad: modalidad,
         fecha_inicio: fecha_inicio
    }


//     let sql = "INSERT INTO cursos set ?";

//          conexion.query (sql, datos, function(err){
//              if (err) throw err;
//                  console.log(`1 Registro insertado`);
//                  res.render('enviado')
//             })    
// })


// ------------------------


app.post('/contacto', (req, res) =>{
    const nombre_apellido = req.body.nombre_apellido;
    const email = req.body.email;
    const curso = req.body.curso;
    const modalidad = req.body.modalidad;
    const consulta = req.body.consulta;


// Creamos funcion para mandar email al cliente 
    async function envioMail(){

    // Configuramos la cuenta del envio
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD  
            },

        tls: {rejectUnauthorized: false}

        });
    

    // Envio de email
    let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: `${email}`,
        subject: "Gracias por suscribirte a nuestra app",
        html: `Muchas gracias por visitar nuestra pagina. <br>
        Nos comunicaremos contigo a la mayor brevedad posible.`
        })

    }


    let datos = {
        nombre_apellido: nombre_apellido,
        email: email,
        curso: curso,
        modalidad: modalidad,
        consulta: consulta
    };


    // let sql = "insert into contactos set ?";

    //     conexion.query(sql, datos, function(err){
    //         if (err) throw err;
    //             console.log(`1 Registro insertado`);
    //             // Llamo a la funcion para enviar mail
    //             envioMail().catch(console.error);
    //             res.render('enviado')
    //         })
  
})


// ---------------------------

//Funcion del boton "Eliminar"
app.post('/delete', (req,res) => {

    // let sql = "delete from cursos where idCurso = " + req.body.idCurso + "";
    //     console.log(sql);
    //     conexion.query (sql, function(err, result){
    //         if (err) throw err;
    //             console.log('Dato eliminado: ' + result.affectedRows);
    //             res.render('cursos')
    //     })
})
    

//Funcion del boton "Editar"
app.post('/update', (req,res) => {

    const curso = req.body.curso;
    const modalidad = req.body.modalidad;
    const fecha_inicio = req.body.fecha_inicio;
    const idCurso = req.body.idCurso;


        // let sql = "update cursos set curso = '"
        // + curso
        // + "', modalidad = '" 
        // + modalidad 
        // + "', fecha_inicio = '" 
        // + fecha_inicio
        // + "' where idCurso = "
        // + idCurso;
    
        
        // console.log(sql);


        // conexion.query (sql, function(err, result){
        //     if (err) throw err;
        //         console.log('Dato Actualizado: ' + result.affectedRows);
        //         res.render('cursos')
        // })

})



// Servidor a la escucha de las peticiones
app.listen(PORT, () => {
    console.log(`Servidor trabajando en el Puerto: ${PORT}`);
})
