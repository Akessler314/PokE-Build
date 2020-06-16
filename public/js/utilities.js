/* eslint-disable no-unused-vars */

// Constant data used throughout the site
const DATA = {
  pokeTypes: [
    'none',
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy'
  ],
  battleOptions: ['Attack', 'Info'],
  critRates: [1 / 24, 1 / 8, 1 / 2, 1]
};

function formatMoveName(move) {
  const words = move.split('-');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
  }

  return words.join(' ');
}
