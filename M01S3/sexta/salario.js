let sexo = "masculino";
let idade = 70;
let tempoContribuicao = 30;

function podeAposentar(sexo, idade, tempoContribuicao) {
    if sexo == "masculino" && idade >= 64 && tempoContribuicao >= 35
        return "pode aposentar";
    else if sexo == "feminino" && idade >= 59 && tempoContribuicao >= 30
        return "pode aposentar";
    else
        return "ainda não pode aposentar";
}

console.log(podeAposentar(sexo, idade, tempoContribuicao));