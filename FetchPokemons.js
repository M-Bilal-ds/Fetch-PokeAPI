async function pokemon(){
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
        const data = await res.json()
        //console.log(JSON.stringify(data))
        return data
    } 
    catch (error) {
        document.getElementById("output").textContent = "Error fetching data!"}
    }

let Index = 0;
let pokemons = [];
const div = document.getElementById("pokemon-container");

function Displayer(){ pokemon().then(data => {
    pokemons = [];
    Index = 0;
    div.innerHTML = '';
    document.getElementById("listing").style.display = 'Inline'

    for (i in data.results){
        let name =  data.results[i].name;
        let url =  data.results[i].url;
        let id = Number(url.trim().split('/')[6]);

        let card = document.createElement("div");
        card.className = "pokemon-card";
        let img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        img.alt = name;
        const n = document.createElement('p');
        n.innerHTML = `<b>${name.toUpperCase()}<b>`;
        card.addEventListener('click', ()=>{
            window.location.href = `PokemonDetails.html?id=${id}`
        })
        card.appendChild(n);
        card.appendChild(img);
        pokemons.push(card)
    }   
    //console.log(pokemons)
    list()
    });
}

function list() {
    div.innerHTML = '';
    let num = parseInt(document.getElementById("num").value);
    let end = Index + num;
    if (end > pokemons.length) {
        end = pokemons.length;
    }
    for (let i = Index; i < end; i++) {
        div.appendChild(pokemons[i]);
    }
    Index = end;
    if (Index >= pokemons.length) {
        Index = 0;
    }
}
function prev(){
    div.innerHTML = '';
    let num = parseInt(document.getElementById("num").value);
    let end = Index - num;
    if (end < 0){
        end = 0;
    }
    for (let i = end; i < Index; i++) {
        div.appendChild(pokemons[i]);
    }
    Index = end;
    if (Index < 0) {
        Index = 0;
    }
}
Displayer()

document.getElementById("list").addEventListener("click", list)
document.getElementById("prev").addEventListener("click", prev)
    

