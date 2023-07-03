/**
 * An array of objects representing blocks of Pokemon.
 * Each block has a start and end index.
 * @type {Array<Object>}
 */
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

/**
 * A counter to keep track of the current block being loaded.
 * @type {number}
 */
let counter = 0;

/**
 * An array to store all the loaded Pokemon data.
 * @type {Array<Object>}
 */
let allPokemon = [];

/**
 * The audio object for playing the Pikachu sound.
 * @type {Audio}
 */
let AUDIO_PIKA = new Audio("audio/pokemon.mp3");

/**
 * Plays the Pikachu sound and hides the start button.
 */
function join() {
  AUDIO_PIKA.volume = 0.08;
  AUDIO_PIKA.play();
  let start = document.getElementById("start");
  start.style.opacity = "0";
  start.style.zIndex = "0";
  document.getElementById("body").style.overflow = "";
}

/**
 * Loads the Pokemon data for the current block.
 * Fetches data for each Pokemon in the block sequentially.
 * @returns {Promise<void>}
 */
async function loadPokemon() {
  let blockStart = blocks[counter]["start"];
  let blockEnd = blocks[counter]["end"];
  for (let i = blockStart; i < blockEnd; i++) {
    await loadFromNet(i).catch(errorFunction);
  }
}

/**
 * Loads Pokemon data from the PokeAPI for the given index.
 * @param {number} i - The index of the Pokemon to load.
 * @returns {Promise<void>}
 */
async function loadFromNet(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  let response = await fetch(url).catch(errorFunction);
  let currentPokemon = await response.json().catch(errorFunction);
  allPokemon.push(currentPokemon);
  pokeInfo(currentPokemon, i);
  input();
}

/**
 * Processes the Pokemon data and renders it on the page.
 * @param {Object} currentPokemon - The data of the current Pokemon.
 */
function pokeInfo(currentPokemon) {
  let id = currentPokemon["id"];
  let name =
    currentPokemon["name"].charAt(0).toUpperCase() +
    currentPokemon["name"].slice(1);
  let typeOne =
    currentPokemon["types"]["0"]["type"]["name"].charAt(0).toUpperCase() +
    currentPokemon["types"]["0"]["type"]["name"].slice(1);
  let typeTwo;
  let typesLength = currentPokemon["types"].length;
  if (typesLength > 1) {
    typeTwo =
      currentPokemon["types"]["1"]["type"]["name"].charAt(0).toUpperCase() +
      currentPokemon["types"]["1"]["type"]["name"].slice(1);
  } else {
    typeTwo = "";
  }
  let img =
    currentPokemon["sprites"]["other"]["official-artwork"]["front_default"];
  renderPokemon(name, typeOne, typeTwo, img, id);
}

/**
 * Renders the Pokemon information on the page.
 * @param {string} name - The name of the Pokemon.
 * @param {string} typeOne - The primary type of the Pokemon.
 * @param {string} typeTwo - The secondary type of the Pokemon.
 * @param {string} img - The URL of the Pokemon's image.
 * @param {number} id - The ID of the Pokemon.
 */
function renderPokemon(name, typeOne, typeTwo, img, id) {
  let pokedex = document.getElementById("pokedex");
  pokedex.innerHTML += pokedexHTML(name, typeOne, typeTwo, img, id);
  typeIsVoid(typeTwo, id);
  let pokemon = document.getElementById(name);
  pokemon.classList.add(typeOne);
}

/**
 * Checks if the secondary type is void and hides the corresponding element.
 * @param {string} typeTwo - The secondary type of the Pokemon.
 * @param {number} id - The ID of the Pokemon.
 */
function typeIsVoid(typeTwo, id) {
  if (typeTwo == "") {
    document.getElementById(id).classList.add("d-none");
  }
}

/**
 * Generates the HTML markup for displaying a Pokemon in the Pokedex.
 * @param {string} name - The name of the Pokemon.
 * @param {string} typeOne - The primary type of the Pokemon.
 * @param {string} typeTwo - The secondary type of the Pokemon.
 * @param {string} img - The URL of the Pokemon's image.
 * @param {number} id - The ID of the Pokemon.
 * @returns {string} The HTML markup for displaying the Pokemon.
 */
function pokedexHTML(name, typeOne, typeTwo, img, id) {
  return /*html*/ `
          <div id="${name}" class="pokemon" onclick="showStats(${id})">
              <div class="flexing">
                  <h2>${name}</h2>
                  <div>
                      <h4 class="${typeOne}">${typeOne}</h4>
                      <h4 id="${id}" class="${typeOne}">${typeTwo}</h4>
                  </div>
              </div>
              <div class="imageContainer">
                  <h4><b>#${id}</b></h4>
                  <img class="pokemonImage" src="${img}">
              </div>
          </div>
      `;
}

/**
 * The audio object for playing the next sound.
 * @type {Audio}
 */
let AUDIO_NEXT = new Audio("audio/next.mp3");

/**
 * Loads the next block of Pokemon data.
 * Plays the next sound effect and updates the counter.
 */
function loadNext() {
  AUDIO_NEXT.volume = 0.08;
  AUDIO_NEXT.play();
  if (counter < 3) {
    counter++;
    loadPokemon();
  } else if (counter == 3) {
    counter++;
    hideButton();
    loadPokemon();
  }
}

/**
 * Hides the "Load More" button.
 */
function hideButton() {
  document.getElementById("hide").classList.add("d-none");
}

/**
 * Handles the search input and filters the displayed Pokemon accordingly.
 */
function input() {
  let search = document.getElementById("search").value;
  search = search.toUpperCase();
  document.getElementById("pokedex").innerHTML = "";
  for (let i = 0; i < allPokemon.length; i++) {
    const pokemon = allPokemon[i];
    if (pokemon["name"].toUpperCase().includes(search)) {
      pokeInfo(pokemon);
    }
  }
}

/**
 * Filters the displayed Pokemon based on the selected type.
 * @param {string} type - The selected type.
 */
function selectedType(type) {
  document.getElementById("pokedex").innerHTML = "";
  for (let i = 0; i < allPokemon.length; i++) {
    let pokemon = allPokemon[i];
    if (pokemon["types"]["0"]["type"]["name"].includes(type)) {
      pokeInfo(pokemon);
    } else if (
      pokemon["types"].length > 1 &&
      pokemon["types"]["1"]["type"]["name"].includes(type)
    ) {
      pokeInfo(pokemon);
    } else if (type == "all") {
      pokeInfo(pokemon);
    }
  }
}

/**
 * An error handling function.
 */
function errorFunction() {
  console.log("An error occurred");
}
