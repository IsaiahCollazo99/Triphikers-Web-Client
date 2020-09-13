\c triphikers_db;

INSERT INTO users (id, full_name, email, age, profile_picture, gender, bio, country_of_origin, language, username )
VALUES 
(1, 'Isaiah Collazo', 'test@test.com', 20, 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 'Male', 'Hello', 'USA','English', 'IC99'),
(2, 'Kahoelani Taylor', 'test2@test.com', 21, 'https://images.unsplash.com/photo-1518707606293-6274eadcf07d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 'Female', 'Hello', 'USA','English', 'KH99'),
(3, 'Carmen Rivera', 'test3@test.com', 45, 'https://images.unsplash.com/photo-1521834029104-b056ecebbb05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 'Female', 'Hello', 'USA','Spanish', 'CR74');

INSERT INTO trips (
    planner_id, destination, date_from, date_to, group_type, language, 
    trip_type, trip_title, first_time, accommodation, budget, split_costs, itinerary, 
    description
)
VALUES
(
    1, 'England', '10/01/2020', '10/10/2020', 'Any', 'English',
    'Explore Cities', 'Exploring England', 'Yes', 'Hotel', 1000, 'Yes', 'None',
    'Just want to explore around cities with my friends and some new people'
),
(
    2, 'Australia', '10/01/2020', '10/10/2020', 'Any', 'English',
    'Explore Cities', 'Exploring Australia', 'Yes', 'Hotel', 1000, 'Yes', 'None',
    'Just want to explore around cities with my friends and some new people'
),
(
    3, 'Japan', '10/01/2020', '10/10/2020', 'Any', 'English',
    'Explore Cities', 'Exploring Japan', 'Yes', 'Hotel', 1000, 'Yes', 'None',
    'Just want to explore around cities with my friends and some new people'
),
(
    1, 'Puerto Rico', '10/01/2020', '10/10/2020', 'Any', 'English', 
    'Explore Cities', 'Exploring Puerto Rico', 'Yes', 'Hotel', 1000, 'Yes', 'None',
    'Just want to explore around cities with my friends and some new people'
);

INSERT INTO hotspots (id, lat, lng, hotspot_title, body, image, poster_id)
VALUES (1, '40.7580', '-73.9855', 'Times Square', 'I love Times Square, its so busy', 'https://cdn.britannica.com/66/154566-050-36E73C15/Times-Square-New-York-City.jpg', 1),
(2, '38.8977', '-77.0365', 'The White House', 'So presidential', 'https://www.keranews.org/sites/kera/files/styles/x_large/public/202003/whitehouse-photo_wide.jpg', 2);


-- INSERT INTO trips (planner_id, destination, date_from, date_to, group_type, language, 
--                 trip_type, trip_title, accommodation,
--                 budget, split_costs, itinerary, description)
-- VALUES (
--     '2bdNeCmfZjOeVtDTcN33GdxEDGE3', 'Rome, Italy', '2019-03-15', '2019-03-19', 'Any', 'English',
--     'Explore Cities', 'Next up Rome with friends!', 'Hotel', 'Average ($1000 - $1999)', 'Yes',
--     'Flexible', 'We will be leaving Paris and heading to Rome. Feel free to request a join, looking to experience Rome in all its glory! Grazie!' 
-- ),
-- (
--     '2bdNeCmfZjOeVtDTcN33GdxEDGE3', 'Mexico City, Mexico', '2019-08-23', '2019-08-31', 'Any', 'Spanish',
--     'Explore Cities', 'Visiting Mexico City!', 'Home', 'Average ($1000 - $1999)', 'Yes',
--     'Set', 'Visiting family in Mexico, I have some free time to travel around and explore. Really want to go to places I have not visited yet. Willing to meet up in the city' 
-- ),
-- (
--     '2bdNeCmfZjOeVtDTcN33GdxEDGE3', 'Miami, United States of America', '2018-12-13', '2018-12-17', 'Any', 'English',
--     'Explore Cities', 'Otra noche en Miami', 'Hotel', 'Budget ($0 - $999)', 'Yes',
--     'Set', 'Back in the 305, looking to hang out in downtown Miami or the beach. Looking for clubbing, drinks, and fun!' 
-- ),
-- (
--     '2bdNeCmfZjOeVtDTcN33GdxEDGE3', 'New York, United States of America', '2018-11-08', '2018-11-12', 'Any', 'English',
--     'Explore Cities', 'Weekend in NYC', 'Home', 'Budget ($0 - $999)', 'Yes',
--     'Flexible', 'I have some free time this weekend to explore NYC. I live here already but would be fun to show any tourist around the city and there are some spots I wanted to check out' 
-- ),
-- (
--     '2bdNeCmfZjOeVtDTcN33GdxEDGE3', 'Miami, United States of America', '2018-11-20', '2018-11-24', 'Any', 'English',
--     'Explore Cities', 'Weekend in Miami', 'Hotel', 'Budget ($0 - $999)', 'Yes',
--     'Set', 'Exploring Miami for the first time. Trying to check out what makes Miami makes Miami, so let me know if you are a local or want to meet up and explore' 
-- ),
-- (
--     '2bdNeCmfZjOeVtDTcN33GdxEDGE3', 'San Francisco, United States of America', '2018-08-20', '2018-08-28', 'Any', 'English',
--     'Explore Cities', 'San Fran', 'Hotel', 'Average ($1000 - $1999)', 'Yes',
--     'Set', 'Have not been to California in a long time. Visting family in the Bay area and was looking to also check out the local area. There is so much to do and need someone to come to the Golden Gate with me.' 
-- ),
-- (
--     '2bdNeCmfZjOeVtDTcN33GdxEDGE3', 'Mexico City, Mexico', '2017-07-13', '2017-07-20', 'Any', 'Spanish',
--     'Explore Cities', 'Mexico City travel!', 'Home', 'Budget ($0 - $999)', 'Yes',
--     'Set', 'Coming back to Mexico City, its been a while. Si usted habla espanol, mejor! Looking to check out a couple of museums and try new cuisine.' 
-- ),
-- (
--     '2bdNeCmfZjOeVtDTcN33GdxEDGE3', 'Philadelphia, United States of America', '2017-02-17', '2017-02-20', 'Any', 'English',
--     'Explore Cities', 'First time in Philly', 'Hotel', 'Budget ($0 - $999)', 'Yes',
--     'Set', 'First time in Philly, going to explore the historic area, the Rocky steps, and South Street. Really looking forward to trying a real Philly cheesesteak.' 
-- ),
-- (
--     '2bdNeCmfZjOeVtDTcN33GdxEDGE3', 'Mexico City, Mexico', '2016-03-09', '2016-03-15', 'Any', 'English',
--     'Explore Cities', 'Great week in Mexico City', 'Home', 'Budget ($0 - $999)', 'Yes',
--     'Set', 'Another year, another trip, visiting Mexico and family. First time using triphikers and looking forward to meeting people who want to explore the city with me. I will be staying with family but can move around the city to meet you. I have general ideas of where I want to go but I am open to ideas. So excited to see who wants to join.' 
-- );