let nome = 'João';
let idade = 13;
let valorBase = 10;

if (idade <= 5){
    console.log(`${nome} pode entrar gratis na excursao.`);
}
else if (idade <= 12){
    console.log(`${nome} vai pagar ${valorBase} reais.`);
}
else if (idade < 18){
    console.log(`${nome} vai pagar ${valorBase + (idade/2)}  reais.`);
}
else {
    console.log(`${nome} vai pagar ${valorBase + (idade)} reais.`);
}