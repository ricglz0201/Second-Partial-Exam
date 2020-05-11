(() => {
  const results = document.querySelector('main#results');

  function createMovesElement(moves) {
    const el = document.createElement('ul');
    moves.forEach(({ move }) => {
      el.innerHTML += `<li>${move.name}</li>`
    })
    return el;
  }

  function createStatsElement(stats) {
    const el = document.createElement('ul');
    stats.forEach(({ base_stat, stat }) => {
      el.innerHTML += `<li>${stat.name} - ${base_stat}</li>`
    })
    return el;
  }

  function createPokemonElement({ name, sprites, moves, stats }) {
    const pokemon = document.createElement('div');
    pokemon.innerHTML = `
      <h1>${name}</h1>
      <img src="${sprites.front_shiny}" alt="An image of ${name}"/>
    `
    pokemon.innerHTML += '<h4>Moves</h4>'
    pokemon.append(createMovesElement(moves));
    pokemon.innerHTML += '<h4>Stats</h4>'
    pokemon.append(createStatsElement(stats));
    return pokemon;
  }

  async function search(query) {
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
    const config = {
      method: 'GET'
    };
    try {
      const response = await fetch(url, config);
      if(!response.ok) {
        throw Error('Pokémon not found');
      }
      const jsonResults = await response.json();
      console.log(jsonResults);
      results.append(createPokemonElement(jsonResults))
    } catch (err) {
      console.log();
      results.innerHTML = err;
    }
  }

  function init() {
    const form = document.querySelector('form#search-form');
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const query = this.querySelector('input#query').value;
      search(query);
    });
  }

  init();
})();
