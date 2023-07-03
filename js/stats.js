/**
 * An array of background color configurations.
 * @type {string[]}
 */
const CONFIG_BG_COLOR = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(255, 0, 0, 0.2)",
  "rgba(0, 72, 255, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 255, 0, 0.2)",
];

/**
 * An array of border color configurations.
 * @type {string[]}
 */
const CONFIG_BORDER_COLOR = [
  "rgba(255, 99, 132, 1)",
  "rgba(255, 0, 0, 1)",
  "rgba(0, 72, 255, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 255, 0, 1)",
];

/**
 * Audio element for click sound.
 * @type {HTMLAudioElement}
 */
const AUDIO_CLICK = new Audio("audio/pokemon-found.mp3");

/**
 * Shows the stats for a Pokemon based on its ID.
 * @param {number} id - The ID of the Pokemon.
 */
function showStats(id) {
  AUDIO_CLICK.volume = 0.08;
  AUDIO_CLICK.play();
  const currentPokemon = allPokemon[id - 1];
  const previousPokemon = allPokemon[id - 2];
  const nextPokemon = allPokemon[id];
  bluryBackground();
  renderStatsContainer(id);
  currentStats(currentPokemon);
  setChangeImages(previousPokemon, nextPokemon);
  toggleActiveTab("aboutTab");
}

/**
 * Blurs the background and prevents scrolling.
 */
function bluryBackground() {
  const statsBackground = document.getElementById("bluryBackground");
  statsBackground.innerHTML = bluryBackgroundHTML();
  document.getElementById("body").style.overflow = "hidden";
}

/**
 * Generates the HTML for the blury background.
 * @returns {string} The HTML string for the blury background.
 */
function bluryBackgroundHTML() {
  return /*html*/ `
    <div id="statsBackground" class="statsBackground" onclick="showAll()"></div>
  `;
}

/**
 * Renders the stats container for the Pokemon.
 * @param {number} id - The ID of the Pokemon.
 */
function renderStatsContainer(id) {
  const colorClass =
    allPokemon[id - 1]["types"]["0"]["type"]["name"].charAt(0).toUpperCase() +
    allPokemon[id - 1]["types"]["0"]["type"]["name"].slice(1);
  const statsContainer = document.getElementById("statsContainer");
  statsContainer.innerHTML = statsContainerHTML(id);
  document.getElementById("statsContainer").classList.remove("statsHidden");
  document.getElementById("statsTop").classList.add(colorClass + "Clicked");
}

/**
 * Shows the current stats for the Pokemon.
 * @param {Object} currentPokemon - The current Pokemon object.
 */
function currentStats(currentPokemon) {
  const id = currentPokemon["id"];
  const name =
    currentPokemon["name"].charAt(0).toUpperCase() +
    currentPokemon["name"].slice(1);
  const image =
    currentPokemon["sprites"]["other"]["dream_world"]["front_default"];
  const height = (currentPokemon["height"] / 10).toFixed(2);
  const weight = (currentPokemon["weight"] / 10).toFixed(1);
  const heldItems = currentPokemon["held_items"];
  const abilities = currentPokemon["abilities"];
  currentTypes(currentPokemon, name, id);
  controlItems(height, weight, heldItems, abilities);
  setBottomSection(image);
}

/**
 * Controls the display of held items and abilities.
 * @param {string} height - The height of the Pokemon.
 * @param {string} weight - The weight of the Pokemon.
 * @param {Object[]} heldItems - An array of held items.
 * @param {Object[]} abilities - An array of abilities.
 */
function controlItems(height, weight, heldItems, abilities) {
  const heldItemsElement = document.getElementById("heldItems");
  if (heldItems.length > 0) {
    for (let i = 0; i < heldItems.length; i++) {
      const heldItem = heldItems[i]["item"]["name"];
      if (i > 0) {
        heldItemsElement.innerHTML += ",<br>";
      }
      heldItemsElement.innerHTML += heldItem;
    }
  } else {
    heldItemsElement.innerHTML = "-/-";
  }
  controlAbilities(height, weight, abilities);
}

/**
 * Controls the display of abilities.
 * @param {string} height - The height of the Pokemon.
 * @param {string} weight - The weight of the Pokemon.
 * @param {Object[]} abilities - An array of abilities.
 */
function controlAbilities(height, weight, abilities) {
  for (let i = 0; i < abilities.length; i++) {
    const ability = abilities[i]["ability"]["name"];
    if (i > 0) {
      document.getElementById("abilities").innerHTML += ",<br>";
    }
    document.getElementById("abilities").innerHTML += ability;
  }
  setOthers(height, weight);
}

/**
 * Sets the height and weight of the Pokemon.
 * @param {string} height - The height of the Pokemon.
 * @param {string} weight - The weight of the Pokemon.
 */
function setOthers(height, weight) {
  document.getElementById("height").innerHTML = `${height} m`;
  document.getElementById("weight").innerHTML = `${weight} kg`;
}

/**
 * Shows the current types for the Pokemon.
 * @param {Object} currentPokemon - The current Pokemon object.
 * @param {string} name - The name of the Pokemon.
 * @param {number} id - The ID of the Pokemon.
 */
function currentTypes(currentPokemon, name, id) {
  let typeOne =
    currentPokemon["types"]["0"]["type"]["name"].charAt(0).toUpperCase() +
    currentPokemon["types"]["0"]["type"]["name"].slice(1);
  let typeTwo;
  let types = currentPokemon["types"];
  if (types.length > 1) {
    typeTwo =
      currentPokemon["types"]["1"]["type"]["name"].charAt(0).toUpperCase() +
      currentPokemon["types"]["1"]["type"]["name"].slice(1);
    setTopSection(name, id, typeOne, typeTwo);
  } else {
    typeTwo = "";
    setTopSection(name, id, typeOne, typeTwo);
  }
  clickedTypeIsVoid(typeTwo);
}

/**
 * Sets the top section of the stats container.
 * @param {string} name - The name of the Pokemon.
 * @param {number} id - The ID of the Pokemon.
 * @param {string} typeOne - The primary type of the Pokemon.
 * @param {string} typeTwo - The secondary type of the Pokemon.
 */
function setTopSection(name, id, typeOne, typeTwo) {
  document.getElementById("clickedName").innerHTML = name;
  document.getElementById("clickedId").innerHTML += id;
  document.getElementById("clickedTypeOne").innerHTML = typeOne;
  document.getElementById("clickedTypeTwo").innerHTML = typeTwo;
}

/**
 * Sets the bottom section of the stats container.
 * @param {string} image - The URL of the Pokemon's image.
 */
function setBottomSection(image) {
  document.getElementById("clickedImage").src = image;
}

/**
 * Checks if the secondary type is void and hides it if necessary.
 * @param {string} typeTwo - The secondary type of the Pokemon.
 */
function clickedTypeIsVoid(typeTwo) {
  if (typeTwo == "") {
    document.getElementById("clickedTypeTwo").classList.add("d-none");
  }
}

/**
 * Generates the HTML code for the stats container.
 * @param {number} id - The ID of the Pokemon.
 * @returns {string} The HTML code for the stats container.
 */
function statsContainerHTML(id) {
  return /*html*/ `
    <div>
      <div id="statsTop" class="statsTop">
        <div class="nameIdArea">
          <h2 id="clickedName"></h2>
          <h4 id="clickedId">#</h4>
        </div>
        <div class="typeArea">
          <h4 id="clickedTypeOne"></h4>
          <h4 id="clickedTypeTwo"></h4>
        </div>
      </div>
      <div id="statsBottom" class="statsBottom">
        <div class="imageToCenter">
          <img class="clickedImage" id="clickedImage">
        </div>
        <div class="changeStatsArea">
          <img id="previousImage" class="smallPNG left" onclick="showStats(${
            id - 1
          })">
          <div class="navArea">
            <p onclick="showStats(${id})" id="aboutTab">ABOUT</p>
            <p onclick="statsSection(${id})" id="statsTab">BASE STATS</p>
            <p onclick="movesSection(${id})" id="movesTab">MOVES</p>
          </div>
          <img id="nextImage" class="smallPNG right" onclick="showStats(${
            id + 1
          })">
        </div>
        <div id="section">
          <table>
            <tr>
              <th>Height:</th>
              <td id="height"></td>
            </tr>
            <tr>
              <th>Weight:</th>
              <td id="weight"></td>
            </tr>
            <tr>
              <th>Held Items:</th>
              <td id="heldItems"></td>
            </tr>
            <tr>
              <th>Abilities:</th>
              <td id="abilities"></td>
            </tr>
          </table>
        </div>
        <div class="closeButton">
          <button class="btn btn-secondary" type="submit" onclick="showAll()">Close</button>
        </div>
      </div>
    </div>
  `;
}
/**
 * Hides the stats container and restores the page scrollability.
 */
function showAll() {
  document.getElementById("statsBackground").classList.add("d-none");
  document.getElementById("body").style.overflow = "";
  document.getElementById("statsContainer").classList.add("statsHidden");
}

/**
 * Sets the previous and next Pokemon images in the stats container.
 * @param {Object} previousPokemon - The previous Pokemon object.
 * @param {Object} nextPokemon - The next Pokemon object.
 */
function setChangeImages(previousPokemon, nextPokemon) {
  if (previousPokemon == undefined) {
    document.getElementById("previousImage").classList.add("d-none");
  } else {
    let previousImage =
      previousPokemon["sprites"]["other"]["home"]["front_default"];
    document.getElementById("previousImage").src = previousImage;
  }
  if (nextPokemon == undefined) {
    document.getElementById("nextImage").classList.add("d-none");
  } else {
    let nextImage = nextPokemon["sprites"]["other"]["home"]["front_default"];
    document.getElementById("nextImage").src = nextImage;
  }
}

/**
 * Displays the stats section for a given Pokemon ID.
 * @param {number} id - The ID of the Pokemon.
 */
function statsSection(id) {
  let hpValue = allPokemon[id - 1]["stats"]["0"]["base_stat"];
  let hpName = allPokemon[id - 1]["stats"]["0"]["stat"]["name"];
  let attackValue = allPokemon[id - 1]["stats"]["1"]["base_stat"];
  let attackName = allPokemon[id - 1]["stats"]["1"]["stat"]["name"];
  let defenseValue = allPokemon[id - 1]["stats"]["2"]["base_stat"];
  let defenseName = allPokemon[id - 1]["stats"]["2"]["stat"]["name"];
  let spAttackValue = allPokemon[id - 1]["stats"]["3"]["base_stat"];
  let spAttackName = allPokemon[id - 1]["stats"]["3"]["stat"]["name"];
  let spDefenseValue = allPokemon[id - 1]["stats"]["4"]["base_stat"];
  let spDefenseName = allPokemon[id - 1]["stats"]["4"]["stat"]["name"];
  let speedValue = allPokemon[id - 1]["stats"]["5"]["base_stat"];
  let speedName = allPokemon[id - 1]["stats"]["5"]["stat"]["name"];
  statsHTML(
    hpValue,
    hpName,
    attackValue,
    attackName,
    defenseValue,
    defenseName,
    spAttackValue,
    spAttackName,
    spDefenseValue,
    spDefenseName,
    speedValue,
    speedName
  );
  toggleActiveTab("statsTab");
}

/**
 * Renders the HTML for the stats section.
 * @param {number} hpValue - The HP stat value.
 * @param {string} hpName - The HP stat name.
 * @param {number} attackValue - The Attack stat value.
 * @param {string} attackName - The Attack stat name.
 * @param {number} defenseValue - The Defense stat value.
 * @param {string} defenseName - The Defense stat name.
 * @param {number} spAttackValue - The Special Attack stat value.
 * @param {string} spAttackName - The Special Attack stat name.
 * @param {number} spDefenseValue - The Special Defense stat value.
 * @param {string} spDefenseName - The Special Defense stat name.
 * @param {number} speedValue - The Speed stat value.
 * @param {string} speedName - The Speed stat name.
 */
function statsHTML(
  hpValue,
  hpName,
  attackValue,
  attackName,
  defenseValue,
  defenseName,
  spAttackValue,
  spAttackName,
  spDefenseValue,
  spDefenseName,
  speedValue,
  speedName
) {
  document.getElementById("section").innerHTML =
    '<canvas id="myChart" width="100%" height="100%"></canvas>';
  document.getElementById("section").classList.remove("addedScrollbar");
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        hpName,
        attackName,
        defenseName,
        spAttackName,
        spDefenseName,
        speedName,
      ],
      datasets: [
        {
          label: "",
          data: [
            hpValue,
            attackValue,
            defenseValue,
            spAttackValue,
            spDefenseValue,
            speedValue,
          ],
          backgroundColor: CONFIG_BG_COLOR,
          borderColor: CONFIG_BORDER_COLOR,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 120,
        },
      },
    },
  });
}

/**
 * Displays the moves section for a given Pokemon ID.
 * @param {number} id - The ID of the Pokemon.
 */
function movesSection(id) {
  let allMoves = allPokemon[id - 1]["moves"];
  document.getElementById("section").innerHTML = "";
  document.getElementById("section").classList.add("addedScrollbar");
  for (let i = 0; i < allMoves.length; i++) {
    const move = allMoves[i]["move"]["name"].toUpperCase();
    if (i > 0) {
      document.getElementById("section").innerHTML += ",<br>";
    }
    document.getElementById("section").innerHTML += move;
  }
  toggleActiveTab("movesTab");
}

/**
 * Toggles the active tab.
 * @param {string} tabId - The ID of the tab to activate.
 */
function toggleActiveTab(tabId) {
  const tabs = document.querySelectorAll(".navArea p");
  tabs.forEach((tab) => {
    if (tab.id === tabId) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
}
