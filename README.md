# Pokemon Project

Server adjustment is still to come, now the links in the project does not work correctly
https://pokedex-frieder.netlify.app

This is a web page that displays information about different Pokemon species. The data for this project is sourced from the PokeAPI.

## Usage

To use this project, simply open the `(https://pokedex-frieder.netlify.app)` in a web browser. On the start page, you will see a Pokemon-themed GIF and a button that says "Join the Adventure!" Clicking the button will take you to the main page of the project, where you can view information about different Pokemon species.

Each Pokemon card on the main page displays the Pokemon's name, ID number, types, and an image. Clicking on a card will display additional information about that Pokemon, such as its height, weight, and base stats.

## Code

The main logic of this project is implemented in JavaScript. The code is split into multiple functions, each with a specific purpose. The `loadFromNet` function makes an asynchronous request to the PokeAPI to retrieve data about a specific Pokemon. The `pokeInfo` function extracts relevant information from the retrieved data and passes it to the `renderPokemon` function, which generates HTML code to display the Pokemon's information on the page.

There are also several helper functions, such as `typeIsVoid`, which checks whether a Pokemon has a second type, and `pokedexHTML`, which generates the HTML code for a Pokemon card.

## License

This project is licensed under the MIT License.
