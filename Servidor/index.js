// // index.js
// const express = require("express");
// const app = express();
// const bodyParser = require('body-parser');

// // const aluno = require("./alunos");
// const { alunos, buscaPorNome, buscaPorMedia } = require("./alunos");

// // var - let - const

// // const nome = valor

// app.use(bodyParser.json());

// Rota GET para /alunos
// app.get("/alunos", (req, res) => {
//     let listaAlunos = alunos;

//     if (req.query.nome) {
//         listaAlunos = buscaPorNome(listaAlunos, req.query.nome);
//     }

//     if (req.query.media) {
//         listaAlunos = buscaPorMedia(listaAlunos, parseFloat(req.query.media));
//     }

//     res.json(listaAlunos);
// });

// Escuta
// app.listen(3000, () => {
//     console.log("Servidor rodando em http://localhost:3000/");
// });