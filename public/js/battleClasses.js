/* eslint-disable no-unused-vars */
class Pokemon {
  constructor(stats, moves, type1, type2, sprite) {
    this.maxHP = this.hp = stats.hp;
    this.maxSpeed = this.speed = stats.speed;
    this.maxAttack = this.attack = stats.attack;
    this.maxSpAttack = this.spAttack = stats.spAttack;
    this.maxDefense = this.defense = stats.defense;
    this.maxSpDefense = this.spDefense = stats.spDefense;
    this.move1 = this.move2 = this.move3 = this.move4 = null;
    this.type1 = this.type2 = null;
    this.sprite = new Image();
    this.sprite.src = sprite;

    // Make api calls to pokeapi.co
    $.ajax({
      url: 'https://pokeapi.co/api/v2/move/' + moves.move1,
      method: 'GET'
    }).then(results => {
      this.move1 = results;
    });
    $.ajax({
      url: 'https://pokeapi.co/api/v2/move/' + moves.move2,
      method: 'GET'
    }).then(results => {
      this.move2 = results;
    });
    $.ajax({
      url: 'https://pokeapi.co/api/v2/move/' + moves.move3,
      method: 'GET'
    }).then(results => {
      this.move3 = results;
    });
    $.ajax({
      url: 'https://pokeapi.co/api/v2/move/' + moves.move4,
      method: 'GET'
    }).then(results => {
      this.move4 = results;
    });
    $.ajax({
      url: 'https://pokeapi.co/api/v2/type/' + type1,
      method: 'GET'
    }).then(results => {
      this.type1 = type1;
    });
    $.ajax({
      url: 'https://pokeapi.co/api/v2/type/' + type2,
      method: 'GET'
    }).then(results => {
      this.type2 = type2;
    });
  }
}

class MessageBox {
  constructor(sprite) {
    this.message = '';
    this.sprite = new Image();
    this.sprite.src = sprite;
  }
}

class OptionsBox {
  constructor(sprite) {
    this.option1 = null;
    this.option2 = null;
    this.option3 = null;
    this.option4 = null;
    this.sprite = new Image();
    this.sprite.src = sprite;
  }
}
