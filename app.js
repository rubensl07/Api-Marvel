'use strict'


const url = `https://gateway.marvel.com:443/v1/public/characters?ts=1696508785&apikey=749c51225f5310f6522eb6cb0202d601&hash=0856090ec8b75598691ed594688f5f65&limit=100`
const vulgo = document.getElementById('vulgo')
const bio = document.getElementById('bio')
const imagem = document.getElementById('imagem')
const comic = document.getElementById('comic')

let indice = 1

const aleft = document.getElementById('arrowLeft')
const aright = document.getElementById('arrowRight')
const random = document.getElementById('randomizer')

aleft.addEventListener('click', arrowLeft)
aright.addEventListener('click', arrowRight)
random.addEventListener('click',randomizer)

function arrowLeft(){
    diminuirIndice()
}
function arrowRight(){
    aumentarIndice()
}
async function randomizer(){
    indice = Math.floor(Math.random()*101)
    const info = await coletarDados()
    if(verificarImagem(info)){
        preencher()
    } else {
        randomizer()
    }
    console.log("Randomizer ativado.\nValor atual: "+indice)
}

async function coletarDados() {
    const response = await fetch(url)
    const dados = await response.json()
    console.log(dados.data.results[97])
    return dados.data.results;
}

async function diminuirIndice(){
    indice--
    const info = await coletarDados()
    if(verificarImagem(info)){
        preencher()
    } else {
        diminuirIndice()
    }
    console.log("indice reduzido\nIndice Atual: "+indice)
}
async function aumentarIndice(){
    indice++
    const info = await coletarDados()
    if(verificarImagem(info)){
        preencher()
    } else {
        aumentarIndice()
    }
    console.log("indice aumentado\nIndice Atual: "+indice)
}









// fetch(url).then(response=> {
//     return response.json()
// }).then(dados => {
//     console.log(dados);
//     document.getElementById("vulgo").innerHTML=dados.data.results[0].name
//     return dados.data.results;
// })

async function preencher(){
    const info = await coletarDados()
    vulgo.textContent = info[indice].name
    bio.textContent = info[indice].description
    imagem.style.backgroundImage = `url(${info[indice].thumbnail.path}.${info[indice].thumbnail.extension})`;
    comic.classList.remove('desaparecer')
    if (info[indice].urls[1]){
        comic.href = info[indice].urls[1].url
    } else 
    if (info[indice].urls[2]){
        comic.href = info[indice].urls[2].url
    } else 
    if (info[indice].urls[3]){
        comic.href = info[indice].urls[3].url
    } else {
        comic.classList.add('desaparecer')
    }
    console.log(verificarImagem(info))
}   

function verificarImagem(info){
    if(info[indice].thumbnail.path=="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"||info[indice].thumbnail.path=="http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"){
        return false;       
    } else {
        return true;
    }
}

  
preencher()
