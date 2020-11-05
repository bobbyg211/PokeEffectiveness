const getAllPokemon = () => {
  
  let prom = fetch("https://pokeapi.co/api/v2/generation/1");
  let data = prom.then(function(res) {
    return res.json();
  });

  data.then(function(json) {
    let allPoke = json.pokemon_species;
    allPoke.forEach(function(poke) {
      let pokeName = poke.name;

      let option = document.createElement("option");
      option.innerText = pokeName;

      document.getElementById("all-pokemon").appendChild(option);
    });
  });

}

getAllPokemon();

let pokeSelect = document.getElementById("all-pokemon");

pokeSelect.addEventListener("change", function() {
  pokeDisplay();
});

const pokeDisplay = () => {
  let API = "https://pokeapi.co/api/v2/pokemon/" + pokeSelect.value;

  let prom = fetch(API);
  let data = prom.then(function(res) {
    return res.json();
  });

  data.then(function(json) {

    // Get and display sprite
    let pokeImgURL = json.sprites.front_default;
    document.getElementById("poke-img").src = pokeImgURL;

    // get and display typing
    let pokeTypes = json.types;
    document.getElementById("types").innerHTML = "";
    pokeTypes.forEach(function(types) {
      let type = types.type.name;
      let li = document.createElement("li");
      li.innerText = type;
      li.className = "type " + type;
      document.getElementById("types").appendChild(li);
    });
  });
}
