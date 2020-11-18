DROP table if EXISTS dragon;
DROP table if EXISTS location;

create table dragon (
    id serial PRIMARY KEY,
    dragon_name VARCHAR(250),
    food VARCHAR(250),
    age DEC,
    location_name VARCHAR(250)
);

CREATE table location (
    id serial PRIMARY KEY,
    location_name VARCHAR(250)
);

INSERT into dragon(dragon_name, food, age) VALUES('waleed', 'Everthing', 30);

INSERT into location(location_name) VALUES('location 1');
INSERT into location(location_name) VALUES('location 2');
INSERT into location(location_name) VALUES('location 3');
INSERT into location(location_name) VALUES('location 4');
INSERT into location(location_name) VALUES('location 5');
INSERT into location(location_name) VALUES('location 6');
INSERT into location(location_name) VALUES('location 7');
INSERT into location(location_name) VALUES('location 8');