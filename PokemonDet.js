const query = window.location.search;
const params = new URLSearchParams(query);
const id = params.get('id');

async function details() {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = await res.json();
        return data;
    } catch (error) {
        document.getElementById("h3").textContent = "Error fetching data!";
    }
}

function Display() {
    details().then(data => {
        const divImg = document.getElementById("img");
        const features = document.getElementById("features");
        const move = document.getElementById("move");
        const abilitiesBox = document.getElementById("abilities");
        const soundBox = document.getElementById("sound");
        const statsBox = document.getElementById("stats");

        let img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        divImg.appendChild(img);

        let abilities = data.abilities.map(a => a.ability.name).join(', ');
        features.innerHTML = `<p><b>ID - </b> ${data.id}</p>
            <p><b>Name - </b> ${data.name}</p>
            <p><b>Species - </b> ${data.species.name}</p>
            <p><b>Height - </b> ${data.height}</p>
            <p><b>Weight - </b> ${data.weight}</p>
            <p><b>Base Experience - </b> ${data.base_experience}</p>
            <p><B>Abilities - </B > ${abilities}</p>`;

        soundBox.innerHTML = `<a href="${data.cries.latest}" target="_blank">Download Sound</a>`;

        let movesList = document.getElementById("moves-list");
        data.moves.forEach(m => {
            let span = document.createElement("span");
            span.textContent = m.move.name;
            movesList.appendChild(span);
        });

        const stats = data.stats;
        statsBox.innerHTML = `<h3 style='text-align:center;'>Key Statistics</h3>`;
        stats.forEach(stat => {
            const name = stat.stat.name;
            const value = stat.base_stat;
            statsBox.innerHTML += `<div class="stat-item">
                    <span class="stat-label">${name}</span>
                    <div class="stat-bar"><div class="stat-fill" style="width: ${value > 100 ? 100 : value}%"></div></div>
                </div>`;
        });
    });
}

Display();
