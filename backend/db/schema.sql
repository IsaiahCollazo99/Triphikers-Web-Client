DROP DATABASE IF EXISTS triphikers_db;
CREATE DATABASE triphikers_db;

\c triphikers_db;

DROP TABLE IF EXISTS friends_lists;
DROP TABLE IF EXISTS friend_requests;
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS travelers;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS hotspots;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id VARCHAR UNIQUE NOT NULL PRIMARY KEY,
    full_name VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR,
    age INTEGER,
    profile_picture VARCHAR,
    gender VARCHAR,
    bio VARCHAR,
    country_of_origin VARCHAR,
    language VARCHAR
);

CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    planner_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    destination VARCHAR,
    date_from VARCHAR,
    date_to VARCHAR,
    group_type VARCHAR,
    language VARCHAR,
    trip_type VARCHAR,
    trip_title VARCHAR,
    first_time VARCHAR,
    accommodation VARCHAR,
    budget VARCHAR,
    split_costs VARCHAR,
    itinerary VARCHAR,
    description VARCHAR,
    is_completed BOOLEAN DEFAULT 'false'
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    image VARCHAR,
    lat VARCHAR,
    lng VARCHAR,
    location_name VARCHAR,
    emergency_services VARCHAR,
    poster_id VARCHAR REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE hotspots (
    id SERIAL PRIMARY KEY,
    lat VARCHAR,
    lng VARCHAR,
    hotspot_title VARCHAR,
    body VARCHAR,
    image VARCHAR,
    poster_id VARCHAR REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    requester_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    trip_id INT REFERENCES trips(id) ON DELETE CASCADE
);

CREATE TABLE travelers (
    id SERIAL PRIMARY KEY,
    traveler_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    trip_id INT REFERENCES trips(id) ON DELETE CASCADE
);

CREATE TABLE friend_requests (
    id SERIAL PRIMARY KEY,
    requester_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    requested_id VARCHAR REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE friends_lists (
    id SERIAL PRIMARY KEY,
    user_1 VARCHAR REFERENCES users(id) ON DELETE CASCADE,
    user_2 VARCHAR REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE users
ADD COLUMN facebook_link VARCHAR,
ADD COLUMN twitter_username VARCHAR,
ADD COLUMN instagram_username VARCHAR,
ADD COLUMN username VARCHAR;