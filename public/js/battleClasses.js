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
    this.critRate = 0;
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
      this.type1 = results;
    });
    $.ajax({
      url: 'https://pokeapi.co/api/v2/type/' + type2,
      method: 'GET'
    }).then(results => {
      this.type2 = results;
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

    // Check if we're critting
    if (Math.random() < DATA.critRates[this.critRate]) {
      modifier *= 1.5;
    }

    // Random modifier
    modifier *= (Math.random() * .15 + .85);

    // Check for STAB
    const moveId = DATA.pokeTypes.indexOf(moveInfo.type.name);
    if (moveId === this.type1.id || (this.type2 && moveId === this.type2.id)) {
      modifier *= 1.5;
    }

    let effectiveness = 1; // 0 is 'doesn't affect', .25 or .5 is ineffective, 1 effective, 2 or 4 is super effective

    // ---- DOUBLE DAMAGE FROM ----
    const doubleDamageFrom = pokemon.type1.damage_relations.double_damage_from;
    
    if (pokemon.type2.damage_relations) {
      doubleDamageFrom.push(...pokemon.type2.damage_relations.double_damage_from);
    }

    for (let i = 0; i < doubleDamageFrom.length; i++) {
      if (moveInfo.type.name === doubleDamageFrom[i].name) {
        modifier *= 2;
        effectiveness *= 2;
      }
    }

    // ---- HALF DAMAGE FROM ----
    const halfDamageFrom = pokemon.type1.damage_relations.half_damage_from;
    
    if (pokemon.type2.damage_relations) {
      halfDamageFrom.push(...pokemon.type2.damage_relations.half_damage_from);
    }

    for (let i = 0; i < halfDamageFrom.length; i++) {
      if (moveInfo.type.name === halfDamageFrom[i].name) {
        modifier *= .5;
        effectiveness *= .5;
      }
    }

    // ---- NO DAMAGE FROM ----
    const noDamageFrom = pokemon.type1.damage_relations.no_damage_from;
    
    if (pokemon.type2.damage_relations) {
      noDamageFrom.push(...pokemon.type2.damage_relations.no_damage_from);
    }

    for (let i = 0; i < noDamageFrom.length; i++) {
      if (moveInfo.type.name === noDamageFrom[i].name) {
        modifier *= 0;
        effectiveness *= 0;
        break;
      }
    }

    amount *= modifier;

    // Check if we missed, if so set the effectiveness to -1 so we can tell
    if (Math.random() * 100 > moveInfo.accuracy) {
      effectiveness = -1;
      amount *= 0;
    }

    // return damage amount
    const attackResult = {
      damage: amount,
      effective: effectiveness,
      minTimesToAttack: moveInfo.meta.min_hits || 1,
      maxTimesToAttack: moveInfo.meta.max_hits || 1
    };
    return attackResult;
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp < 0) {
      this.hp = 0;
    }
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

class HealthBox {
  constructor(maxHealth, pokemonName, x, y, sprite) {
    this.health = this.maxHealth = maxHealth;
    this.pokemonName = pokemonName;
    this.posX = x;
    this.posY = y;
    this.sprite = new Image();
    this.sprite.src = sprite;
  }

  setHealth(health) {
    this.health = health;
  }

  draw(context) {
    context.drawImage(this.sprite, this.posX, this.posY, this.sprite.width * 4, this.sprite.height * 4);
    // Draw pokemon name
    context.font = '22px monospace';
    context.fillStyle = 'black';
    context.fillText(this.pokemonName, this.posX + 12, this.posY + 27);
    
    // Draw health
    context.font = '22px monospace';
    context.fillStyle = 'black';
    context.fillText(this.health + '/' + this.maxHealth + ' HP', this.posX + 12, this.posY + 78);

    // Draw healthbar
    if (this.health / this.maxHealth > 0.5) {
      context.fillStyle = 'green';
    } else if (this.health / this.maxHealth > .33) {
      context.fillStyle = 'yellow';
    } else if (this.health === 0) {
      return;
    } else {
      context.fillStyle = 'red';
    }
    
    context.fillRect(this.posX + 12, this.posY + 40, (this.health / this.maxHealth) * 232, 12);
  }
}