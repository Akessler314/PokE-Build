/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
class Pokemon {
  constructor(name, stats, moves, type1, type2, sprite, x, y) {
    this.name = name;
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
    this.xPos = x;
    this.yPos = y;

    // Make api calls to pokeapi.co
    $.ajax({
      url: 'https://pokeapi.co/api/v2/move/' + moves.move1,
      method: 'GET'
    }).then(results => {
      this.move1 = results;
      this.move1.ppLeft = results.pp;
    });
    $.ajax({
      url: 'https://pokeapi.co/api/v2/move/' + moves.move2,
      method: 'GET'
    }).then(results => {
      this.move2 = results;
      this.move2.ppLeft = results.pp;
    });
    $.ajax({
      url: 'https://pokeapi.co/api/v2/move/' + moves.move3,
      method: 'GET'
    }).then(results => {
      this.move3 = results;
      this.move3.ppLeft = results.pp;
    });
    $.ajax({
      url: 'https://pokeapi.co/api/v2/move/' + moves.move4,
      method: 'GET'
    }).then(results => {
      this.move4 = results;
      this.move4.ppLeft = results.pp;
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

  draw(context) {
    context.drawImage(
      this.sprite,
      this.xPos,
      this.yPos,
      this.sprite.width * 4,
      this.sprite.height * 4
    );
  }

  attackPokemon(move, pokemon) {
    console.log('attacking' + pokemon.name);

    // Assume all Pokemon are level 100

    const moveInfo = this['move' + move];
    let amount = 42 * moveInfo.power;

    if (moveInfo.damage_class.name === 'physical') {
      amount *= this.attack;
      amount /= pokemon.defense;
    } else if (moveInfo.damage_class.name === 'special') {
      amount *= this.spAttack;
      amount /= pokemon.spDefense;
    }

    amount /= 50;
    amount += 2;

    let modifier = 1;

    if (moveInfo.meta && moveInfo.meta.crit_rate) {
      // TODO: check if critting, multiply by 2 if so
      modifier *= 1;
    }

    // TODO: random value between 0.85 and 1
    modifier *= 1;

    // TODO: Check for STAB
    modifier *= 1;

    // TODO: Type modifier
    modifier *= 1;

    // return damage amount
    return amount;
  }
}

class MessageBox {
  constructor(sprite, x, y) {
    this.message = '';
    this.sprite = new Image();
    this.sprite.src = sprite;
    this.xPos = x;
    this.yPos = y;
  }

  draw(context) {
    // Draw the messagebox
    context.drawImage(
      this.sprite,
      this.xPos,
      this.yPos,
      this.sprite.width * 4,
      this.sprite.height * 4
    );

    // Draw the text
    context.font = '22px monospace';
    context.fillStyle = 'black';
    const lines = this.message.split('\n');
    for (let i = 0; i < lines.length; i++) {
      context.fillText(lines[i], this.xPos + 12, this.yPos + 27 * (i + 1));
    }
  }

  setMessage(text) {
    this.message = text;
  }
}

class OptionsBox {
  constructor(sprite, x, y) {
    this.options = DATA.battleOptions;
    this.currentOption = 0;
    this.moveContext = null;
    this.sprite = new Image();
    this.sprite.src = sprite;
    this.xPos = x;
    this.yPos = y;
  }

  draw(context) {
    context.drawImage(
      this.sprite,
      this.xPos,
      this.yPos,
      this.sprite.width * 4,
      this.sprite.height * 4
    );

    for (let i = 0; i < this.options.length; i++) {
      context.font = '22px monospace';
      context.fillStyle = 'black';
      context.fillText(
        (i === this.currentOption ? '>' : '') + this.options[i],
        this.xPos + 12,
        this.yPos + 27 * (i + 1)
      );
    }
  }

  keyDown() {
    this.currentOption = (this.currentOption + 1) % this.options.length;
  }

  keyUp() {
    this.currentOption = (this.currentOption - 1) % this.options.length;

    // Modulo doesn't work against negatives in Javascript -_-
    if (this.currentOption < 0) {
      this.currentOption = this.options.length - 1;
    }
  }

  chooseOption(pokemon, messageBox) {
    const option = this.options[this.currentOption];
    if (DATA.battleOptions.includes(option)) {
      this.moveContext = option;

      // Draw the move options
      this.options = [
        formatMoveName(pokemon.move1.name),
        formatMoveName(pokemon.move2.name),
        formatMoveName(pokemon.move3.name),
        formatMoveName(pokemon.move4.name)
      ];

      this.currentOption = 0;
    } else {
      // Get the current move context (should we show info, or attack?)
      const move = pokemon['move' + (this.currentOption + 1)];
      let returnVal = null;
      if (this.moveContext === 'Info') {
        let message = 'Type: ' + formatMoveName(move.type.name) + '   PP: ' + move.ppLeft + '/' + move.pp;
        message += '\nAccuracy: ' + move.accuracy + '   ' + 'Power: ' + move.power;
        message += '\n' + move.flavor_text_entries[0].flavor_text;
        messageBox.setMessage(message);
      }
      else if (this.moveContext === 'Attack')
      {
        returnVal = this.currentOption + 1;
      }

      // Draw the attack/info options
      this.options = DATA.battleOptions;

      this.currentOption = 0;
      this.moveContext = null;

      return returnVal;
    }
  }
}
