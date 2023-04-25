let blocks = [
  {
    start: 1,
    end: 31,
  },
  {
    start: 31,
    end: 61,
  },
  {
    start: 61,
    end: 91,
  },
  {
    start: 91,
    end: 121,
  },
  {
    start: 121,
    end: 151,
  },
];

let counter = 0;
let allPokemon = [];
let AUDIO_PIKA = new Audio("audio/pokemon.mp3");

function join() {
  AUDIO_PIKA.volume = 0.08;
  AUDIO_PIKA.play();
  let start = document.getElementById("start");
  start.style.opacity = "0";
  start.style.zIndex = "0";
  document.getElementById("body").style.overflow = "";
}

async function loadPokemon() {
  let blockStart = blocks[counter]["start"];
  let blockEnd = blocks[counter]["end"];
  for (let i = blockStart; i < blockEnd; i++) {
    await loadFromNet(i).catch(errorFunction);
  }
}

// This is an asynchronous function that loads data about a Pokemon from the PokeAPI based on its ID.
async function loadFromNet(i) {
  // Construct a URL string to access the PokeAPI for the given Pokemon ID.
  let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  // Make a request to the PokeAPI using the URL and await the response.
  let response = await fetch(url).catch(errorFunction);
  // Extract the JSON data from the response and await its parsing.
  let currentPokemon = await response.json().catch(errorFunction);
  // Add the current Pokemon object to an array of all Pokemon.
  allPokemon.push(currentPokemon);
  // Call the pokeInfo function with the current Pokemon object and ID.
  pokeInfo(currentPokemon, i);
  // Call the input function to continue the program.
  input();
}

// This is a function called pokeInfo that takes in a Pokemon object as its argument.
function pokeInfo(currentPokemon) {
  // Extract the ID of the current Pokemon object and store it in a variable.
  let id = currentPokemon["id"];
  // Extract the name of the current Pokemon object, capitalize the first letter, and store it in a variable.
  let name =
    currentPokemon["name"].charAt(0).toUpperCase() +
    currentPokemon["name"].slice(1);
  // Extract the first type of the current Pokemon object, capitalize the first letter, and store it in a variable.
  let typeOne =
    currentPokemon["types"]["0"]["type"]["name"].charAt(0).toUpperCase() +
    currentPokemon["types"]["0"]["type"]["name"].slice(1);
  // Declare a variable to hold the second type of the current Pokemon object.
  let typeTwo;
  // Check if the current Pokemon has a second type.
  let typesLength = currentPokemon["types"].length;
  if (typesLength > 1) {
    // If the Pokemon has a second type, extract it, capitalize the first letter, and store it in the typeTwo variable.
    typeTwo =
      currentPokemon["types"]["1"]["type"]["name"].charAt(0).toUpperCase() +
      currentPokemon["types"]["1"]["type"]["name"].slice(1);
  } else {
    // If the Pokemon does not have a second type, set typeTwo to an empty string.
    typeTwo = "";
  }
  // Extract the URL for the official artwork of the current Pokemon object and store it in a variable called img.
  let img =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
  // Call the renderPokemon function with the name, types, image, and ID of the current Pokemon object.
  renderPokemon(name, typeOne, typeTwo, img, id);
}

// This is a function called renderPokemon that takes in various data about a Pokemon as arguments.
function renderPokemon(name, typeOne, typeTwo, img, id) {
  // Get the DOM element for the Pokedex container and append the HTML for the current Pokemon to it.
  let pokedex = document.getElementById("pokedex");
  pokedex.innerHTML += pokedexHTML(name, typeOne, typeTwo, img, id);
  // Check if the second type of the current Pokemon is null or undefined and add the 'void' class to the corresponding element in the HTML.
  typeIsVoid(typeTwo, id);
  // Get the DOM element for the current Pokemon and add the class for its primary type.
  let pokemon = document.getElementById(name);
  pokemon.classList.add(typeOne);
}
