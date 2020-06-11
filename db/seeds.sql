USE dreamteam_db;

INSERT INTO creators(username, createdAt, updatedAt) VALUES ("Ash", "2000-01-01 12:12:12", "2000-01-01 12:12:12");

INSERT INTO pokemons(name, searchableName, stats, moves, type1, type2, createdAt, updatedAt, CreatorId) VALUES ('Pikachu', 'pikachu', '{"hp":50,"speed":50,"attack":50,"spAttack":50,"defense":50,"spDefense":50}', '{"move1":1,"move2":2,"move3":3,"move4":4}', 1, 2, "2000-01-01 12:12:12", "2000-01-01 12:12:12", 1);