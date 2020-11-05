// Initilization
let firstPokeSelect = document.querySelector(".first .all-pokemon");
let secondPokeSelect = document.querySelector(".second .all-pokemon");

// Functions
const getAllPokemon = (selector) => {
  
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

      document.querySelector(selector + " .all-pokemon").appendChild(option);
    });
  });

}

const pokeDisplay = (selector, value) => {
  let API = "https://pokeapi.co/api/v2/pokemon/" + value;

  let prom = fetch(API);
  let data = prom.then(function(res) {
    return res.json();
  });

  data.then(function(json) {

    // Get and display sprite
    let pokeImgURL = json.sprites.front_default;
    document.querySelector(selector + " .poke-img").src = pokeImgURL;

    // get and display typing
    let pokeTypes = json.types;
    document.querySelector(selector + " .types").innerHTML = "";
    pokeTypes.forEach(function(types) {
      let type = types.type.name;
      let li = document.createElement("li");
      li.innerText = type;
      li.className = "type " + type;
      document.querySelector(selector + " .types").appendChild(li);
    });
  });
}

const compareTypes = () => {
  let poke1TypesArray = [];
  let poke2TypesArray = [];

  let poke1Types = document.querySelector(".first .types").childNodes;
  poke1Types.forEach(function(type) {
    poke1TypesArray.push(type.innerText);
  });

  let poke2Types = document.querySelector(".second .types").childNodes;
  poke2Types.forEach(function(type) {
    poke2TypesArray.push(type.innerText);
  });

  console.log(poke1TypesArray);
  console.log(poke2TypesArray);
}

// Usage
getAllPokemon(".first");
getAllPokemon(".second");

firstPokeSelect.addEventListener("change", function() {
  let val = firstPokeSelect.value;
  pokeDisplay(".first", val);
  setTimeout(function(){ compareTypes(); }, 1000);
});

secondPokeSelect.addEventListener("change", function() {
  let val = secondPokeSelect.value;
  pokeDisplay(".second", val);
  setTimeout(function(){ compareTypes(); }, 1000);
});

