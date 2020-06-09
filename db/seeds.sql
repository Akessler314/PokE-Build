USE dreamteam_db;

INSERT INTO creators(username, createdAt, updatedAt) VALUES ("Ash", "2000-01-01 12:12:12", "2000-01-01 12:12:12");

INSERT INTO pokemons(name, hp, speed, defense, spdefense, attack, spattack, moveid1, moveid2, moveid3, moveid4, createdAt, updatedAt, CreatorId) VALUES ("Pikachu", 50, 50, 50, 50, 50, 50, 1, 2, 3, 4, "2000-01-01 12:12:12", "2000-01-01 12:12:12", 1);