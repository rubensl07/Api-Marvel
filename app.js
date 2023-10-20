'use strict'


const search = document.getElementById('')


// const timeStamp = '1696508785'
// const apiKey = '749c51225f5310f6522eb6cb0202d601'
// const md5 = '0856090ec8b75598691ed594688f5f65'
// const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`;
const url = `https://gateway.marvel.com:443/v1/public/characters?ts=1696508785&apikey=749c51225f5310f6522eb6cb0202d601&hash=0856090ec8b75598691ed594688f5f65&limit=100`

// fetch(url).then(response=> {
//     return response.json()
// }).then(dados => {
//     console.log(dados);
//     document.getElementById("vulgo").innerHTML=dados.data.results[0].name
//     return dados.data.results;
// })
console.log(url)



const indice = 10

async function coletarDados() {
    const response = await fetch(url)
    const dados = await response.json()
    console.log(dados.data)
    return dados.data.results;
}

async function preencher(){
    const vulgo = document.getElementById('vulgo')
    const bio = document.getElementById('bio')
    const imagem = document.getElementById('imagem')
    const comic = document.getElementById('comic')

    const info = await coletarDados()
    vulgo.textContent = info[indice].name
    bio.textContent = info[indice].description
    imagem.style.backgroundImage = `url(${info[indice].thumbnail.path}.${info[indice].thumbnail.extension})`;
    comic.href = info[indice].urls[2].url

}   
preencher()
