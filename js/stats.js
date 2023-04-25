const CONFIG_BG_COLOR = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(255, 0, 0, 0.2)",
  "rgba(0, 72, 255, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 255, 0, 0.2)",
];

const CONFIG_BORDER_COLOR = [
  "rgba(255, 99, 132, 1)",
  "rgba(255, 0, 0, 1)",
  "rgba(0, 72, 255, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 255, 0, 1)",
];

let AUDIO_CLICK = new Audio("audio/pokemon-found.mp3");

function showStats(id) {
  AUDIO_CLICK.volume = 0.08;
  AUDIO_CLICK.play();
  let currentPokemon = allPokemon[id - 1];
  let previousPokemon = allPokemon[id - 2];
  let nextPokemon = allPokemon[id];
  bluryBackground(); // Show the blurry background
  renderStatsContainer(id); // Render the stats container
  currentStats(currentPokemon); // Display the stats for the current Pokemon
  setChangeImages(previousPokemon, nextPokemon); // Set the previous and next Pokemon images
  toggleActiveTab("aboutTab"); // Toggle the "about" tab as active
}

// Shows the blurry background
function bluryBackground() {
  let statsBackground = document.getElementById("bluryBackground");
  statsBackground.innerHTML = bluryBackgroundHTML();
  document.getElementById("body").style.overflow = "hidden";
}

// Returns the HTML for the blurry background
function bluryBackgroundHTML() {
  return /*html*/ `
            <div id="statsBackground" class="statsBackground" onclick="showAll()">
    
            </div>
        `;
}

// Renders the stats container for the current Pokemon
function renderStatsContainer(id) {
  let colorClass =
    allPokemon[id - 1]["types"]["0"]["type"]["name"].charAt(0).toUpperCase() +
    allPokemon[id - 1]["types"]["0"]["type"]["name"].slice(1);
  let statsContainer = document.getElementById("statsContainer");
  statsContainer.innerHTML = statsContainerHTML(id);
  document.getElementById("statsContainer").classList.remove("statsHidden");
  document.getElementById("statsTop").classList.add(colorClass + "Clicked");
}

// Displays the stats for the current Pokemon
function currentStats(currentPokemon) {
  let id = currentPokemon["id"];
  let name =
    currentPokemon["name"].charAt(0).toUpperCase() +
    currentPokemon["name"].slice(1);
  let image =
    currentPokemon["sprites"]["other"]["dream_world"]["front_default"];
  let height = (currentPokemon["height"] / 10).toFixed(2);
  let weight = (currentPokemon["weight"] / 10).toFixed(1);
  let heldItems = currentPokemon["held_items"];
  let abilities = currentPokemon["abilities"];
  currentTypes(currentPokemon, name, id);
  controlItems(height, weight, heldItems, abilities);
  setBottomSection(image);
}

// Controls the display of the held items and abilities for the current Pokemon
function controlItems(height, weight, heldItems, abilities) {
  if (heldItems.length > 0) {
    for (let i = 0; i < heldItems.length; i++) {
      const heldItem = heldItems[i]["item"]["name"];
      if (i > 0) {
        document.getElementById("heldItems").innerHTML += ",<br>";
      }
      document.getElementById("heldItems").innerHTML += heldItem;
    }
  } else {
    document.getElementById("heldItems").innerHTML = "-/-";
  }
  controlAbilities(height, weight, abilities);
}

// This function takes in the height, weight, and abilities of a Pokemon and displays them on the page
function controlAbilities(height, weight, abilities) {
  for (let i = 0; i < abilities.length; i++) {
    const ability = abilities[i]["ability"]["name"];
    // If this is not the first ability, add a comma and line break
    if (i > 0) {
      document.getElementById("abilities").innerHTML += ",<br>";
    }
    document.getElementById("abilities").innerHTML += ability;
  }
  setOthers(height, weight);
}

// This function displays the height and weight of a Pokemon on the page
function setOthers(height, weight) {
  document.getElementById("height").innerHTML = `${height} m`;
  document.getElementById("weight").innerHTML = `${weight} kg`;
}

/**
 * Sets the current Pokemon's types and calls setTopSection and clickedTypeIsVoid functions.
 * @param {Object} currentPokemon - The current Pokemon object.
 * @param {string} name - The name of the current Pokemon.
 * @param {number} id - The ID of the current Pokemon.
 */
function currentTypes(currentPokemon, name, id) {
  // Get the first type of the current Pokemon
  let typeOne =
    currentPokemon["types"]["0"]["type"]["name"].charAt(0).toUpperCase() +
    currentPokemon["types"]["0"]["type"]["name"].slice(1);
  let typeTwo;
  let types = currentPokemon["types"];
  if (types.length > 1) {
    // If the current Pokemon has two types
    // Get the second type of the current Pokemon
    typeTwo =
      currentPokemon["types"]["1"]["type"]["name"].charAt(0).toUpperCase() +
      currentPokemon["types"]["1"]["type"]["name"].slice(1);
    setTopSection(name, id, typeOne, typeTwo); // Set the top section with both types
  } else {
    typeTwo = "";
    setTopSection(name, id, typeOne, typeTwo); // Set the top section with the first type only
  }
  clickedTypeIsVoid(typeTwo); // Check if the second type is empty and hide the element if so
}

// This function sets the top section of the stats container, including the name, ID, and types of the clicked Pokemon
function setTopSection(name, id, typeOne, typeTwo) {
  document.getElementById("clickedName").innerHTML = name;
  document.getElementById("clickedId").innerHTML += id;
  document.getElementById("clickedTypeOne").innerHTML = typeOne;
  document.getElementById("clickedTypeTwo").innerHTML = typeTwo;
}

function setBottomSection(image) {
  document.getElementById("clickedImage").src = image;
}

function clickedTypeIsVoid(typeTwo) {
  if (typeTwo == "") {
    document.getElementById("clickedTypeTwo").classList.add("d-none");
  }
}

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
                  <img class=clickedImage id="clickedImage">
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

function showAll() {
  document.getElementById("statsBackground").classList.add("d-none");
  document.getElementById("body").style.overflow = "";
  document.getElementById("statsContainer").classList.add("statsHidden");
}

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
