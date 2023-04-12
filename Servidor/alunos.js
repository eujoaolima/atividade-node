// Criação da lista de alunos

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

function atualizarLista(index) {
    if (index < 0 || index >= alunos.length) {
        throw "Aluno não encontrado";
    }
    
    alunos[index].nome = nome;
    alunos[index].media = media;
}
// Exportação do array e das funções 

module.exports = { alunos, buscaPorMedia, buscaPorNome, deletarAluno, atualizarLista };