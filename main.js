// Initializations
let typesArray1 = [];
let typesArray2 = [];

// Functions
const getAllPokemon = () => {
  
  let prom = fetch("https://pokeapi.co/api/v2/generation/1");
  let data = prom.then(function(res) {
    return res.json();
  });

  data.then(function(json) {
    let pokeSelects = document.getElementsByClassName("all-pokemon");
    for (let i = 0; i < pokeSelects.length; i++) {
      let allPoke = json.pokemon_species;
      allPoke.forEach(function(poke) {
        let pokeName = poke.name;
        let option = document.createElement("option");
        option.innerText = pokeName;
        pokeSelects[i].appendChild(option);
      });
    }
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
    let pokeImgs = document.querySelector(`${selector} .poke-img`);
    pokeImgs.src = pokeImgURL;

    // get and display typing
    if (selector === ".first") {
      typesArray1 = [];
    } else {
      typesArray2 = [];
    }

    let pokeTypes = json.types;
    document.querySelector(`${selector} .types`).innerHTML = "";
    pokeTypes.forEach(function(types) {
      let type = types.type.name;
      if (selector === ".first") {
        typesArray1.push(type);
      } else {
        typesArray2.push(type);
      }

      let li = document.createElement("li");
      li.innerText = type;
      li.className = `type ${type}`;
      document.querySelector(`${selector} .types`).appendChild(li);
    });
  });
}

const compareTypes = () => {
  console.log(typesArray1, typesArray2)
}

// Usage
getAllPokemon();

let firstPokeSelect = document.querySelector(".first .all-pokemon");
let secondPokeSelect = document.querySelector(".second .all-pokemon");

firstPokeSelect.addEventListener("change", function() {
  pokeDisplay(".first", this.value);
  compareTypes();
});

secondPokeSelect.addEventListener("change", function() {
  pokeDisplay(".second", this.value);
  compareTypes();
});

