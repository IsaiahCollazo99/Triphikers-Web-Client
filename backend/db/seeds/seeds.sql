\c triphikers_db;

INSERT INTO users (id, full_name, email, age, profile_picture, gender, bio, country_of_origin)
VALUES 
(1, 'Isaiah Collazo', 'test@test.com', 20, 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 'Male', 'Hello', 'USA'),
(2, 'Kahoelani Taylor', 'test2@test.com', 21, 'https://images.unsplash.com/photo-1518707606293-6274eadcf07d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 'Female', 'Hello', 'USA'),
(3, 'Carmen Rivera', 'test3@test.com', 45, 'https://images.unsplash.com/photo-1521834029104-b056ecebbb05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 'Female', 'Hello', 'USA');

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

INSERT INTO locations (id, image, lat, lng, location_name, emergency_services, poster_id)
VALUES (1, 'https://cdn.londonandpartners.com/visit/general-london/areas/river/76709-640x360-houses-of-parliament-and-london-eye-on-thames-from-above-640.jpg', '51.5007286626542', '-0.12462615966796875', 'London', 999, 1),
(2, 'https://static01.nyt.com/images/2019/05/29/realestate/00skyline-south4/88ce0191bfc249b6aae1b472158cccc4-superJumbo.jpg', '40.7580', '-73.9855', 'New York City', 911, 2);

INSERT INTO hotspots (id, lat, lng, hotspot_title, body, image, poster_id)
VALUES (1, '40.7580', '-73.9855', 'Times Square', 'I love Times Square, its so busy', 'https://cdn.britannica.com/66/154566-050-36E73C15/Times-Square-New-York-City.jpg', 1),
(2, '38.8977', '-77.0365', 'The White House', 'So presidential', 'https://www.keranews.org/sites/kera/files/styles/x_large/public/202003/whitehouse-photo_wide.jpg', 2);

INSERT INTO requests(requester_id, trip_id)
VALUES (1, 2),
(1, 3),
(2, 1),
(2, 4),
(2, 3),
(3, 1)