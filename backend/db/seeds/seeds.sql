\c triphikers_db;

INSERT INTO users (id, full_name, email, age, gender, bio, country_of_origin)
VALUES 
(1, 'Isaiah Collazo', 'test@test.com', 20, 'Male', 'Hello', 'USA'),
(2, 'Kahoelani Taylor', 'test2@test.com', 21, 'Female', 'Hello', 'USA'),
(3, 'Carmen Rivera', 'test3@test.com', 45, 'Female', 'Hello', 'USA');

INSERT INTO trips (
    planner_id, destination, date_from, date_to, group_type, language, before_trip_meetup, 
    trip_type, trip_title, first_time, accommodation, budget, split_costs, itinerary, 
    description
)
VALUES
(
    1, 'England', '10/01/2020', '10/10/2020', 'Any', 'English', 'Video Call', 
    'Explore Cities', 'Exploring England', 'Yes', 'Hotel', 1000, 'Yes', 'None',
    'Just want to explore around cities with my friends and some new people'
),
(
    2, 'Australia', '10/01/2020', '10/10/2020', 'Any', 'English', 'Video Call', 
    'Explore Cities', 'Exploring Australia', 'Yes', 'Hotel', 1000, 'Yes', 'None',
    'Just want to explore around cities with my friends and some new people'
),
(
    3, 'Japan', '10/01/2020', '10/10/2020', 'Any', 'English', 'Video Call', 
    'Explore Cities', 'Exploring Japan', 'Yes', 'Hotel', 1000, 'Yes', 'None',
    'Just want to explore around cities with my friends and some new people'
),
(
    1, 'Puerto Rico', '10/01/2020', '10/10/2020', 'Any', 'English', 'Video Call', 
    'Explore Cities', 'Exploring Puerto Rico', 'Yes', 'Hotel', 1000, 'Yes', 'None',
    'Just want to explore around cities with my friends and some new people'
);

-- INSERT INTO locations (id, image, latitude, longitude, location_name, emergency_services, poster_id)
-- VALUES (1, 'https://cdn.londonandpartners.com/visit/general-london/areas/river/76709-640x360-houses-of-parliament-and-london-eye-on-thames-from-above-640.jpg', 51, 00, 'London', 999, 1);