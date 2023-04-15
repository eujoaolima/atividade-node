// Criação da lista de alunos

// Importação dos módulos
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');

const alunos = [
    {
        nome: "João Lima",
        media: 7,
    },

    {
        nome: "Pedro",
        media: 6.5,
    },

    {
        nome: "Lucas",
        media: 8.5,
    },

    {
        nome: "Augusto",
        media: 9,
    },
];

// Criação da função de filtragem por nome

function buscaPorNome(alunos, nome) {
    return alunos.filter(aluno => {
        return aluno.nome.toLowerCase().includes(nome.toLowerCase()); 
    });
}

// Criação da função de filtragem por média

function buscaPorMedia(alunos, media) {
    if (media >= 7) {
        return alunos.filter(aluno => aluno.media >= media);
    }
}

// Função para deletar um aluno da lista

function deletarAluno(index) {
    if (index < 0 || index >= alunos.length) {
        return false;
    }

    alunos.splice(index, 1);
        return true;
}

// Função para atualizar os dados dos alunos dentro do array

function atualizarLista(index, nome, media) {
    if (index < 0 || index >= alunos.length) {
        throw "Aluno não encontrado";
    }
    
    alunos[index].nome = nome;
    alunos[index].media = media;
}

app.use(bodyParser.json());

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

    const novoAluno = { 
        nome: nome, 
        media: media, 
        matricula: matricula 
    };
    alunos.push(novoAluno);

    if (novoAluno) {
        fs.writeFileSync("db.json", JSON.stringify(alunos));
        res.status(201).json({ message: "Usuário adicionado" });
    } else {
        res.status(400).json({ message: "Aluno não encontrado" });
    }

    res.json(alunos);
});


// Rota para deletar aluno

app.delete("/alunos/deletar/:index", (req, res) => {
    const index = parseInt(req.params.index);

    try {
        deletarAluno(index);
        fs.writeFileSync("db.json", JSON.stringify(alunos));
        res.json({ message: "Aluno removido com sucesso" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Rota para atualizar a lista de alunos

app.put("/alunos/atualizar/:index", (req, res) => {
    const index = req.params.index;
    const { nome, media } = req.query;

  console.log(req.query); // Imprime o objeto req.query no console

    if (!alunos[index]) {
        res.status(404).json({ error: 'Aluno não encontrado' });
        return;
    }
    
    alunos[index].nome = nome; // Atualiza o nome do aluno
    alunos[index].media = Number(media); // Atualiza a média do aluno

    if (alunos.length === 0) {
        res.status(404).send('Aluno não encontrado');
    } else {
        res.status(200).send('Aluno atualizado com sucesso');
        
        fs.writeFileSync("db.json", JSON.stringify(alunos));
        res.json(alunos);
    }
});

// Escuta
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});