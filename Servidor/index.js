// index.js
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const { alunos, buscaPorNome, buscaPorMedia, deletarAluno, atualizarLista } = require("./alunos");

app.use(bodyParser.json());

// Rota GET para /alunos
app.get("/alunos", (req, res) => {
    let listaAlunos = alunos;

    if (req.query.nome) {
        listaAlunos = buscaPorNome(listaAlunos, req.query.nome);
    }

    if (req.query.media) {
        listaAlunos = buscaPorMedia(listaAlunos, parseFloat(req.query.media));
    }

    res.json(listaAlunos);
});

// Rota POST para novo aluno

app.post("/alunos/novo", (req, res) => {
    const { nome, matricula, media } = req.query;

    const novoAluno = { nome: nome, media: media, matricula: matricula };
    alunos.push(novoAluno);

    if (novoAluno) {
        res.status(201).json({ message: "Usuário adicionado" });
    } else {
        res.status(400).json({ message: "Aluno não encontrado" });
    }
});

// Rota para deletar aluno

app.post("/alunos/deletar/:index", (req, res) => {
    const index = parseInt(req.params.index);

    try {
        deletarAluno(index);
        res.json({ message: "Aluno removido com sucesso" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Rota para atualizar a lista de alunos

app.post("/alunos/atualizar/:index", (req, res) => {
    const index = req.params.index;
  const { nome, media } = req.query;

  console.log(req.query); // Imprime o objeto req.query no console

    if (!alunos[index]) {
        res.status(404).json({ error: 'Aluno não encontrado' });
        return;
    }
    
      alunos[index].nome = nome; // Atualiza o nome do aluno
      alunos[index].media = Number(media); // Atualiza a média do aluno
    
    res.json(alunos);
})


// Escuta
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});