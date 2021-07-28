// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))


var WORDS_LIST = ['Sponge', 'Toaster', 'Telephone', 'Pillow', 'Copyright', 'Fan', 'Zebra', 'Whistle', 'Fireworks', 'Full', 'Hang Glider', 'Drip', 'Life', 'Clue', 'Squiggle', 'Tadpole', 'Boot', 'Number', 'Wall', 'Bleach', 'Commercial', 'France', 'Needle', 'Treasure', 'Avocado', 'Pinwheel', 'Dumbbell', 'Car Accident', 'Market', 'Carat', 'Cooler', 'Drain', 'Half', 'Rhinoceros', 'Motorcycle', 'Bonnet', 'Goblin', 'Back', 'Bed', 'Coat', 'Arrows', 'Campfire', 'Giant', 'Curtain', 'Ditch', 'String Bean', 'Cabin', 'Fireside', 'Basin', 'Lobster', 'Animal', 'Bottle Cap', 'PingPong', 'Tree', 'Calm', 'Bible', 'Root', 'Cockpit', 'Snowball', 'Bat', 'Frog', 'Oyster', 'Garden', 'Eyeball', 'Barn ', 'Yard', 'Elbow', 'Beard', 'Curtain', 'Mailbox', 'Scooter', 'Diving', 'Hoodies', 'Sparrow', 'Bone', 'Woman', 'Button', 'Demanding', 'Passport', 'Girl', 'Fog', 'Dashboard', 'Charger', 'Blush', 'Sugar', 'Mail', 'Clog', 'Computer Monitor', 'Net', 'Decipher', 'Constrictor', 'Bubble Bath', 'Fun House', 'Fox', 'Stitches', 'Playground', 'Apathy', 'Gymnast', 'Bathtub', 'Windmill', 'Radio', 'Owl', 'Cabin', 'Monkey', 'Portugal', 'Brainstorm', 'Fire Man', 'Pantyhose', 'Lipstick', 'Triangle', 'Money', 'Moth', 'Garden', 'Heroes', 'Purse', 'Kiwi', 'Grass', 'Shark', 'Dress Shirt', 'Ceiling', 'Hawaii', 'Milk', 'Animal', 'Hermit Crab', 'Car', 'Dust Bunny', 'Balance Beam', 'Fowl', 'Tent', 'Golden', 'Zombie', 'Clamp', 'Bubble', 'Gondola', 'Friction', 'Evening', 'Toothpaste', 'Bamboo', 'Hole', 'Alert', 'Attic', 'Broccoli', 'Flagpole', 'Sleep', 'Eiffel Tower', 'Full Moon', 'Smiley Face', 'Hot Tub', 'Key', 'Word', 'Confidant', 'Education', 'Wheel', 'Nightmare', 'Quilt', 'Stick', 'Paint Can', 'Sword', 'Food', 'Cheerleader', 'Kettle', 'Picture', 'Banister', 'Ghost', 'Dugout', 'Deodorant', 'Bow Tie', 'Cover', 'Great-grandfather', 'Building', 'Furniture', 'Heart', 'Elope', 'Boxing', 'Ray', 'Dragonfly', 'Centipede', 'Cloak', 'Fur', 'Dress', 'Boa Constrictor', 'Window', 'Hockey', 'Stereo', 'Distraction', 'Forklift', 'Girl', 'Abraham Lincoln', 'Station', 'Umbrella', 'Vulture', 'Giant', 'Point', 'Ox', 'Crust', 'Braces', 'Extension Cord', 'Pen', 'Extension', 'Case', 'Coffee Cup', 'Pants', 'Circus', 'Salesclerk', 'Statue Of Liberty', 'Mom', 'Cheerleader Dust', 'Chain Saw', 'Pacifier', 'Avocado', 'Disease', 'Cable Car', 'Diamond', 'Pencil', 'Golf Club', 'Bulb', 'Darts', 'Crew', 'Zigzag', 'Coach', 'Rainbow', 'Handle', 'Everglades', 'Koala', 'Crop Duster', 'Money', 'Badger', 'Deodorant', 'Restaurant', 'Bowling', 'Flamingo', 'Eel', 'Dryer Sheets', 'Cat', 'Credit', 'Chisel', 'Light', 'Socks', 'Island', 'Classroom', 'Discovery', 'Bride Wig', 'Rope', 'Dictate', 'Umbrella', 'Iron', 'Sushi', 'Energy', 'Fresh Water', 'Cleaning Spray', 'T-shirt', 'Motorbike', 'Diversity', 'Seed', 'Stocking', 'Dust', 'First Class', 'Altitude', 'Cardboard', 'Ticket', 'Chevrolet', 'Toe', 'Cattle', 'Popsicle', 'Crate', 'Fountain', 'Fragment', 'Seagull', 'Tennis Raquet', 'Plane', 'Nature', 'Bug', 'Hay Wagon', 'Cat', 'Thumb', 'Sandwich', 'Table', 'Blade', 'Deep', 'Airport', 'School', 'Bus', 'Banana', 'Monkeys', 'Gravity', 'Eggs', 'Seat', 'Customer', 'Notebook', 'Syringe', 'Deer', 'Belgium', 'Queen', 'Lizard', 'Breakfast', 'Job', 'Baseball', 'Flag', 'Fence', 'Forest', 'Artist', 'Ambulance', 'Pond', 'Van', 'Balloon', 'Creator', 'Bicycle', 'Scrambled', 'Biscuit', 'Coyote', 'Toast', 'Frame', 'Coral', 'Adidas', 'Faucet', 'Lighter', 'Ladybird', 'Eel', 'Yak', 'Shorts', 'Ocean', 'Pillow', 'Aircraft Carrier', 'Worm', 'Screw', 'Glue', 'Battery', 'Stomach', 'Hedgehog', 'Toothpaste', 'Wire', 'Snail', 'Bedbug Hot Tub', 'Eureka', 'Bedbug', 'Mosquito', 'Library', 'Trombone', 'Chain Mail', 'Blackberry', 'Goatee', 'Eyeball', 'Cot', 'Tractor', 'Face', 'Pirate', 'Floor Lamp', 'Avalanche', 'Television', 'Student', 'Grenade', 'Crow', 'Lion', 'Chicken Coop', ' Fluffy', 'Pigtails', 'Home', 'Glasses', 'Branch', 'Island', 'Farm', 'Hurdle', 'Lawyer', 'Enemy', 'Convenience Store', 'Cubit', 'Hospital', 'Sun Burn', 'Shark', 'Starfish', 'Flamingo', 'Castaway', 'Power Outlet', 'Group', 'Hook', 'Hot Air Balloon', 'Cardboard', 'Coconut', 'Crib', 'Lollipop', 'Depth', 'Pig', 'Dice', 'Buzz Lightyear', 'Family Tree', 'Danger', 'Germany', 'Muscle', 'Boots', 'Nigeria', 'Arctic', 'Jump', 'Train', 'Bookstore', 'Frog', 'Watermelon', 'Match', 'Cloak', 'Lightning', 'Spade', 'Toad', 'Nerve', 'Strawberry', 'Mother', 'Zebra', 'Horse', 'Tricycle', 'Drive-through', 'Safe', 'WiFi', 'Swamp', 'Camera', 'Degree', 'Hawk', 'Hang', 'Nut', 'Camel', 'Pot', 'Short Monster', 'Hamburger', 'Cupcake', 'Destruction', 'Truck', 'Owl', 'Octagon', 'Ski', 'Alligator', 'Hearse', 'Pumpkin', 'Mouse', 'Louse', 'Cockroach', 'Bucket', 'Necklace', 'Pole', 'Coil', 'Advertisement', 'Archaeologist', 'Camouflage', 'Urchin', 'Diversity', 'Form', 'Bandage', 'Magazine', 'Scissors', 'Earmuffs', 'Spoon', 'Homework', 'Junk', 'Peach', 'Fake Flowers', 'Bell', 'Finger', 'Trumpet', 'Raven', 'Jelly', 'Crowd', 'Mouse', 'Stairs', 'Diamond', 'Sink', 'Black Hole', 'Grim Reaper', 'The Great Wall Of China', 'Drawer', 'House', 'Greece', 'Hamster', 'Rain', ' Aircraft Carrier', 'Family', 'Hedgehog', 'Doctor', 'Climate', 'Song', 'Envelope', 'Snake', 'Elf', 'Fad', 'Eye', 'Gallon', 'Band', 'Parrot', 'Angel', 'Year', 'Tablecloth', 'Lawnmower', 'Knot', 'Watering Can', 'Dodge Ball', 'Deliver', 'Chess', 'Chain', 'Atlas', 'Bee ', 'Story', 'Ceiling Fan', 'Dust', 'Rat', 'Photograph', 'Exponential', 'Garden Hose', 'Fireman', 'Drift', 'Flying Saucer', 'Carpet', 'Comedian', 'Hair Dryer', 'Blacksmith', 'Chariot', 'Part', 'Arch', 'Rain', 'Bible', 'Coast', 'Flavor', 'Cannon', 'Food Court', 'Penguin', 'Volleyball', 'Stamp', 'Cactus', 'Child', 'Slipper', 'Cello', 'Detail', 'Finding Nemo', 'Work', 'Hat', 'Door', 'Drums', 'Squid', 'Alphabet', 'Airport Security', 'Goose', 'Tourist', 'Sprinkler', 'Teacher', 'Audi', 'Laptop', 'Book', 'Accordion', 'House Plant', 'Painting', 'Swing Set', 'Firefighter', 'Post Office', 'Bumble', 'Snorkel', 'Think', 'Lion', 'Ant', 'Office', 'Panda', 'Lighthouse', 'Doormat', 'Boat', 'Fishing', 'Ambulance', 'Box', 'Deceive', 'Cherub', 'Diving', 'Chord', 'Trousers', 'Cupcake', 'Beach', 'Ceiling', 'Blunt', 'Duck', 'Line', 'Demon', 'Orange', 'Mosquito', 'Traffic Light', 'Robin', 'Tusk', 'Cartoon', 'Skateboard', 'Donut', 'Picture Frame', 'Ginger', 'Steak', 'Solar', 'Fizz', 'Crib', 'Yoga', 'Cruise Ship', 'Computer', 'Donald Trump', 'Traffic', 'Drought', 'Charger', 'Lighter', 'Flower', 'Daughter In Law', 'Rainbow', 'Grill', 'Worm', 'Alcohol', 'Flip Flops', 'Sunburn', 'Mattress', 'Chick-fil-a', 'Birthday', 'Turtle', 'Raincoat', 'Error', 'Flowers', 'Teacher', 'Microwave', 'Kite', 'Hot', 'High', 'Card', 'England', 'Glitter', 'Water', 'Bunny', 'Bear', 'Tail', 'Blueberry', 'Pie', 'Brick', 'Fizz', 'Firetruck', 'People', 'Baguette', 'Trip', 'Piano', 'Foot', 'Month', 'Bee', 'Banana', 'River', 'Tiptoe', 'Bush', 'Answer', 'Descendant', 'Pump', 'Bikini', 'Earache', 'Oar', 'Dove', 'Fireman', 'Area', 'Raccoon', 'Seahorse', 'Refrigerator', 'Boy', 'Space', 'Skyscraper', 'Gas', 'Throat', 'Death', 'Harry Potter', 'Compare', 'Snake', 'Shampoo', 'Cow', 'Ferris', 'Eiffel Tower', 'Branch', 'Lunch', 'Applause', 'Hammer', 'Kiss', 'Acre', 'Dryer Sheet', 'Birthday Cake', 'Angle', 'Shelf', 'Skip', 'Full', 'IPad', 'Tornado', 'Angry', 'Conveyor Belt', 'Kitchen', 'Doghouse', 'Pocket', 'Hare', 'Ocean', 'Bow Tie', 'Screwdriver', 'Pizza', 'Alligator', 'Yacht', 'Cushion', 'Right', 'Brush', 'Light Bulb', 'Fiddle', 'Factory', 'Chaos', 'Sandbox', 'Cheese', 'Park', 'Suitcase', 'Audience', 'Nest', 'Man', 'Compromise', 'Pigeon', 'Drowning', 'Dumbbell', 'Buckle', 'Seal', 'Exhibition', 'Bat', 'Ducks', 'Waterslide', 'Juice', 'Paper Clip', 'Fly', 'Bed', 'Download', 'Detective', 'Saxophone', 'Octopus', 'Cookie', 'Helmet', 'Camera', 'Bee', 'Asteroid', 'Lock', 'Reindeer', 'Light Bulb', 'Peanut', 'Armada', 'Collar', 'Freshwater', 'Oxygen', 'Abraham Lincoln', 'Archer', 'Potato', 'Backbone', 'Computer', 'Xylophone', 'Sun', 'Sea Turtle', 'Fork', 'Needle', 'Cloud', 'Hero', 'Chime', 'Problem', 'Shrimp', 'Vase', 'Angel', 'Fish', 'Gallop', 'Chef', 'Snowflake', 'The Eiffel Tower', 'Feeling', 'Lot', 'Butterfly', 'Soccer Ball', 'Planet', 'Knife', 'Yardstick', 'Dress', 'Century', 'Atlantis', 'Toothbrush', 'Dorsal', 'Dismantle', 'Rabbit', 'Cell', 'Raccoon', 'Bed And Breakfast', 'Front', 'Pharmacist', 'Cream', 'Kangaroo', 'Geologist', 'Drop', 'Tomato', 'Chameleon', 'Crust', 'Elephant', 'Cow', 'Vase', 'Saw', 'Diagonal', 'Leprechaun', 'Author', 'Plank', 'Daughter', 'Honk', 'Cartoonist', 'Bisexual', 'Tiger', 'Woodpecker', 'River', 'Belt', 'Mount', 'Gate', 'Bench', 'Eclipse', 'Mailman', 'Seat', 'Highchair', 'Basket', 'Love', 'Jellyfish', 'Mouth', 'Machine', 'Binoculars', 'Magnet', 'Captain America', 'Mechanic', 'Pineapple', 'Fun', 'America', 'Hamburger', 'Burrito', 'Graveyard', 'Carriage', 'Kitten', 'Football', 'Air Conditioner', 'Buffalo', 'Carpenter', 'Feather', 'Season', 'China', 'System', 'Berry', 'Boy', 'Chemical', 'Comb', 'Candle', 'Default', 'Newspaper', 'Cart', 'Submarine', 'Team', 'Barbershop', 'Economics', 'Grasshopper', 'Bicycle', 'Hedgehong', 'Mermaid', 'Car', 'Fossil', 'Week', 'Head', 'Chicken Nugget', 'Wine Glass', 'Feeder Road', 'Dead End', 'Ankle', 'Puppet', 'Flip Flips', 'Onion', 'Engine', 'Recycle', 'Thread', 'Store', 'Speedboat', 'Ostrich', 'Butterfly', 'Hair', 'Disco', 'Divorce', 'Kangaroo', 'Sailboat', 'Flower', 'Crab', 'Clown', 'Wealth', 'Oil', 'Remote Control', 'Holiday', 'Brain', 'Hoop', 'Tongue', 'Crane', 'Rake', 'Speakers', 'Applause', 'Compass', 'Heater', 'Doubtful', 'Chime', 'Pizza', 'Pool', 'Stop Sign', 'Haircut', 'Knee', 'Catalog', 'Parachute', 'French Fries', 'Award', 'Bottle', 'Extension Cord', 'Snowman', 'Eraser', 'Fries', 'Wristwatch', 'Glue Stick', 'Card Board', 'Salmon', 'Thing', 'Squirrel', 'Cord', 'Rifle', 'Beanstalk', 'Purse', 'Ant', 'Pelican', 'Baseball Bat', 'Mermaid', 'Music', 'Coffee', 'Chandelier', 'Australia', 'Rail', 'Beetle', 'Gladiator', 'Family', 'King', 'Orange', 'Dragon', 'Skirt', 'Lollipop', 'Denmark', 'Ping Pong', 'Scorpion', 'Night', 'State', 'Time Machine', 'Bubble', 'Clams', 'Wig', 'Ice Cream', 'Hand', 'Beach', 'Television', 'Rock', 'Guillotine', 'Cramp', 'Goblin', 'Cowboy', 'Nail', 'Sponge', 'Czar', 'Map', 'Lap', 'Egg', 'Paper', 'Clock', 'Truck', 'Program', 'Hand Soap', 'Coworker', 'Thief', 'Bonnet', 'Hockey', 'Grandmother', 'Light', 'Pliers', 'Ring', 'Knight', 'Firefox', 'Helicopter', 'Accounting', 'Biohazard', 'Exercise', 'Giraffe', 'Captain', 'Game', 'Crayon', 'Brother', 'Cellar', 'Olympics', 'Glue', 'Chandelier', 'Baby', 'Kneel', 'Fire Hydrant', 'School Bus', 'Sweater', 'Bleach', 'Couch', 'Ferris Wheel', 'Guitar', 'Football Player', 'Thailand', 'Password', 'Mushroom', 'Backpack', 'Baseboards', 'Train', 'Rice', 'Circus Tent', 'Guru', 'Goalkeeper', 'Cone', 'Penguin', 'Peacock', 'Candle', 'Day', 'Face', 'Bride', 'Rabbit', 'Lady', 'Paintbrush', 'Attack', 'Barney', 'Highchair', 'Rollerskates', 'Birthday', 'State', 'Snowflake', 'Hexagon', 'Double', 'Town', 'Cake', 'Sun', 'Exam', 'Dab', 'Egg', 'Thread', 'Broom', 'Jail', 'Cartography', 'Night', 'Wax', 'Vegetable', 'Eyeglasses', 'Helmet', 'Dragon', 'Crow Nest', 'Carpet', 'Dinner', 'See Saw', 'Channel', 'Sneeze', 'Boat', 'Fade', 'Swan', 'Ashamed', 'Dentist', 'Correct', 'Boromir', 'Bobsled', 'TV', 'Cousin', 'Tire', 'Sand', 'Earthquake', 'Robot', 'High Tops', 'North', 'Comedian', 'Crayon', 'Groot', 'Match', 'Arm', 'Fly', 'Whale', 'Animal Migration', 'Skull', 'Rushmore', 'Baby-sitter', 'Time', 'Caravan', 'Coronavirus', 'Disgust', 'Castle', 'Champion', 'Newspaper', 'Wire', 'Piano', 'Dream Works', 'Picnic', 'Flu', 'Baseball', 'Rat', 'Joke', 'Back Seat', 'Funnel', 'Fabric', 'Facebook', 'Canoe', 'Cartoon', 'Balloon', 'Washing Machine', 'Engine', 'Handle', 'Mug', 'Otter', 'Sandwich', 'Hail', 'Flock', 'Flowchart', 'Deadpool', 'Fog', 'Axe', 'Bread', 'Soccer', 'Turnip', 'Basketball', 'Corduroy', 'Microphone', 'Bottlecap', 'Pocket', 'Shirt', 'Explore', 'Pig', 'Glove', 'Pin', 'Leather', 'Apparatus', 'Scale', 'Attic', 'Courthouse', 'Room', 'Cd', 'Foil', 'Lamp', 'Stethoscope', 'Glasses', 'Babies', 'Swallow', 'Bridge', 'Biceps', 'Street Light', 'Brunette', 'Teddy-bear', 'Dentist', 'Father', 'Leopard', 'Bumble Bee', 'Edit', 'Raft', 'Microphone', 'Calf', 'Blueprint', 'Hopscotch', 'Spreadsheet', 'Cake', 'Australia', 'Cranium', 'Carnival', 'Berlin Wall', 'Whistle', 'Carrot', 'Dent', 'Flutter', 'Outside', 'Rod', 'Saturation', 'Flat', 'Toilet', 'Honey', 'Edge', 'Sail', 'Wedding Dress', 'Horse', 'Engaged', 'Chimpanzee', 'Confide', 'Bikini', 'Zoo', 'Keyboard', 'Darts', 'Plastic', 'Gavel', 'Shovel', 'Bookend', 'Apple', 'Fireworks', 'Gas Station', 'Giraffe', 'Toddler', 'The Mona Lisa', 'Tutu', 'Grapes', 'Movie', 'Hot Tub', 'Game', 'Sheep', 'Gumball', 'Bruise', 'Photograph', 'Actor', 'Black', 'Stairs', 'Spider', 'Centimetre', 'David', 'Peas', 'Shells', 'Defect', 'Retriever', 'Hopscotch', 'Sleeping Bag', 'Hippopotamus', 'Equation', 'Phone', 'Dishwasher', 'Coach', 'Dumbo', 'Army', 'Beluga Whale', 'Jackal', 'Beans', 'Gun', 'Pencil', 'Hospital', 'Moustache', 'Atmosphere', 'Hockey Puck', 'Shoe', 'Apron', 'Van', 'Shallow', 'Goat', 'Leaf', 'Gratitude', 'Cutlass', 'Hydrogen', 'Electrical Outlet', 'Head', 'Floor', 'Bitcoin', 'Hitler', 'Graduation', 'Toothbrush', 'Doppelganger', 'Baker', 'Cubicle', 'Shrink', 'Telescope', 'Alarm Clock', 'Application', 'Crumbs', 'Austin Powers', 'Expired', 'Dent', 'Luggage', 'Knife', 'Rose', 'Shoe', 'Spoon', 'Gentleman', 'Uganda', 'Back Flip', 'Lantern', 'Hair', 'Insect', 'Dream', 'Hourglass', 'Whip', 'Crown', 'Cup', 'United States', 'Helicopter', 'Asparagus', 'Popsicle', 'Nail', 'Criticize', 'Swan', 'Doubt', 'Easter', 'Napkin', 'Window', 'Manchester', 'Blizzard', 'Telephone', 'Crime', 'Glass', 'Firefighter', 'Chicken', 'Crisp', 'Nose', 'Country', 'Germ', 'Centipede', 'Diver', 'Square', 'Box', 'Finland', 'Chess', 'Garage', 'Ship', 'Bus', 'Company', 'Pineapple', 'Consent', 'Captain', 'Eighteen-wheeler', 'Brake', 'Effect', 'Hang Ten', 'Goldfish', 'Tooth', 'Bowtie', 'Frame', 'Beard', 'Wing', 'Raindrop', 'Deep', 'Mountain', 'Crocodile', 'Duvet', 'Monkey', 'Afternoon', 'Megaphone', 'Sheet', 'Leg', 'Bulldog', 'Dance', 'House', 'Eagle', 'Pilot', 'Gold Medal', 'Bathroom', 'Boulevard', 'Brain', 'Galaxy', 'Cats', 'Angry', 'Bucket', 'Mole', 'Handful', 'Dance', 'Tropical', 'Bedbug', 'Drill', 'Teenager', 'Rug', 'Skin', 'Heel', 'Diving Board', 'Chair', 'Stone', 'Flying', 'Stethoscope', 'Photo', 'Russia', 'Internet', 'Wolf', 'Castle', 'Hockey Stick', 'Pajamas', 'Ice', 'Turtle', 'Headphones', 'Cormorant', 'Alice In Wonderland', 'Electricity', 'Snow', 'Cruise', 'Peanut', 'Cruise', 'Community', 'Hurricane', 'Minister', 'Book', 'Accident', 'Cliff', 'Advertisement', 'Stingray', 'Downpour', 'Dryer', 'Army', 'Boomerang', 'Clique', 'Cowboy', 'Sweater', 'Convertible', 'Blue', 'Cape', 'Fast Food', 'Cliff', 'Baggage', 'Blizzard', 'Florist', 'Goat', 'Ear', 'Megaphone', 'First Mate', 'Pear', 'Bruise', 'Athlete', 'Beehive', 'Insurance', 'Tent', 'China', 'Strawberry', 'Tiger', 'Gasoline', 'Hot Dog', 'Stick', 'Brand', 'Jacket', 'Magician', 'Art Gallery', 'Quill', 'Spider', 'Bunch', 'Room', 'Garfield', 'Plate', 'Flag', 'Postcard', 'Drugstore', 'Boundary', 'Stove', 'Speaker', 'Lace', 'Business', 'Crab', 'Violin', 'Gold', 'Camel', 'Companion', 'Coal', 'Bag', 'Marker', 'Ships', 'Lock', 'Chicken Legs', 'Frying Pan', 'Pickup Truck', 'Anvil', 'Cliff Diving', 'Pipe', 'Bracelet', 'Mascot', 'High Heel', 'Baby', 'Matches', 'Sock', 'Jewellery', 'Eye', 'Stork', 'Plough', 'Fireplace', 'Frost', 'Sweden', 'Wine Bottle', 'Wall', 'Roller Coaster', 'Gown', 'Conversation', 'Calendar', 'Church', 'Cell Phone', 'Moon', 'Star', 'Nurse', 'Walrus', 'Golden Retriever', 'Palm Tree', 'Aunt', 'Fireman Pole', 'Teapot', 'Comfy', 'Hotel', 'Saucer', 'Check', 'Elephant', 'Underwear', 'Guitar', 'Jordan', 'Stomach', 'Pigtails', 'Board', 'Bald', 'Evolution', 'Sheets', 'Drip', 'Darth Vader', 'Dizzy', 'Buckle', 'Bird', 'Gorilla', 'Village', 'Emperor', 'Lipstick', 'Binder', 'Convertible', 'Puppy', 'Salt And Pepper', 'Church', 'Dripping', 'School', 'Businessperson', 'Squirrel', 'Spring', 'Harp', 'Skate', 'Oven', 'Beer Pong', 'Flute', 'Apple', 'Octopus', 'Suitcase', 'Disc Jockey', 'Burrito', 'Parcel', 'Minivan', 'Roof', 'Apple Watch', 'Daffy Duck', 'Bushel', 'Hook', 'Doorbell', 'Receipt', 'World', 'Bugs', 'Bunny', 'Doubloon', 'Golden Retriever', 'Knee', 'Teapot', 'Flotsam', 'Ladder', 'Baker', 'Apathetic', 'Eyes', 'Chalk', 'Street', 'Cheerleader', 'Dog', 'Emigrate', 'Lobster', 'Actor', 'Country', 'Ball', 'Igloo', 'Pool', 'Jewel', 'Hair Dryer', 'Chef', 'Garbage', 'Bomb', 'Chimney', 'Prison', 'Flat', 'Sunlight', 'Airplane', 'Flashlight', 'Groom', 'Horn', 'Study', 'Amusement Park', 'Dog', 'Nose', 'Panda', 'Chin', 'County Fair', 'Rocket', 'Turkey', 'Calculator', 'Flute', 'Fuel', 'Grain', 'Bear', 'Sachin', 'Figment', 'Fish Bone', 'Employee', 'Fish', 'Neck', 'Mushroom', 'Government', 'Potato', 'Chariot Racing', 'Gold', 'Con', 'Gamer', 'Sheep', 'Emotions', 'Police Car', 'Heaven', 'Lip', 'Mr', 'Dolphin', 'Houseboat', 'Fact', 'Egypt', 'Question', 'Watch', 'Cricket', 'Mailbox', 'Bluetooth', 'Whale', 'Dream', 'Flight', 'Guess', 'Leak', 'Stem', 'Good Bye', 'Bulldozer', 'Sea', 'Dolphin', 'London', 'Place', 'Morning', 'Tray', 'Dresser', 'Comparison', 'Circle', 'Border', 'Elk', 'Spring', 'Chain', 'Music', 'Crocodile', 'Forrest Gump', 'Mask', 'Way', 'Bath', 'Geyser', 'Grandpa', 'Eggplant', 'Parrot', 'Hot Dog', 'Biology', 'Raincoat', 'Daughter', 'Lighthouse', 'Grass', 'Birthday Cake'];

//Drawer Events
var DRAWER_CLEAR = "DrawerClear";
var DRAWER_UNDO = "DrawerUndo";
var DRAWER_HEIGHT = "DrawerHeight";
var DRAWER_WIDTH = "DrawerWidth";
var DRAWER_CURRENT_SEG_VALUES = "DrawerCurrentSegValues";
var DRAWER_CURRENT_SEG_POINTS = "DrawerCurrentSegPoints";
var DRAWER_SEGMENTS = "DrawerSegments";
var DRAWER_CLEAR_CURRENT_POINTS = "DrawerClearCurrentPoints";

``
//Receiver Events
var RECEIVER_CLEAR = "ReceiverClear";
var RECEIVER_UNDO = "ReceiverUndo";
var RECEIVER_HEIGHT = "ReceiverHeight";
var RECEIVER_WIDTH = "ReceiverWidth";
var RECEIVER_CURRENT_SEG_VALUES = "ReceiverCurrentSegValues";
var RECEIVER_CURRENT_SEG_POINTS = "ReceiverCurrentSegPoints";
var RECEIVER_SEGMENTS = "ReceiverSegments";
var RECEIVER_CLEAR_CURRENT_POINTS = "ReceiverClearCurrentPoints";

var RENEW_BOARD = "RenewBoard";

var rounds = [3, 4, 5, 6, 7, 8, 9, 10];
var time = [80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150];

const express = require('express');
const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

var chooseWordTimer;
var gameTimer;

var answered = {};
var allPlayers = {};
var socketPlusRooms = {};
var gameInformations = {};
var numberOfPlayers = {};
var playerTurns = {};
var numOfReady = {};
var gameState = {};


const createGameState = (round, turn, ready, drawerName, drawerId, chosenWord) => {
  let tempGameState = {};
  tempGameState.round = round;
  tempGameState.turn = turn;
  tempGameState.ready = ready;
  tempGameState.drawerName = drawerName;
  tempGameState.drawerId = drawerId;
  tempGameState.chosenWord = chosenWord;
  tempGameState.hintsShown = 0;
  tempGameState.dottedWord = -1;
  return tempGameState;
}


function startChooseWordTimer(id) {
  remainingTime = 15;
  chooseWordTimer = setInterval(() => {
    remainingTime -= 1;
    io.to(id).emit("chooseWordTimer", remainingTime);
    if (remainingTime <= 0) {
      clearInterval(chooseWordTimer);
      io.to(id).emit("timeFinished");

    }
  }, 1000);
}

function dottedWord(word, dashedWord) {
  ans = ''
  if (dashedWord == '-1') {
    for (i = 0; i < word.length; i++) {
      if (word.charAt(i) != ' ') {
        ans += '_ ';
      } else {

        ans += '  ';
      }
    }
  } else {

    randomIndex = Math.floor(Math.random() * word.length) * 2;

    while (dashedWord.charAt(randomIndex) != '_') {
      randomIndex = Math.floor(Math.random() * word.length) * 2;
    }
    for (i = 0; i < dashedWord.length; i++) {
      if (i != randomIndex) {
        ans += dashedWord.charAt(i);
      } else {
        ans += word.charAt(i / 2);
      }
    }
  }
  return ans;
}



function startGameTimer(room) {

  remainingTime = time[gameInformations[room].time];
  gameTimer = setInterval(() => {
    remainingTime -= 1;
    io.to(room).emit("gameTimer", remainingTime);
    if (gameState[room].hintsShown == 0) {
      hint = dottedWord(gameState[room].chosenWord, gameState[room].dottedWord);
      io.to(room).emit("yourHint", hint, gameState[room].drawerId);
      gameState[room].dottedWord = hint;
      gameState[room].hintsShown += 1

    }
    if (remainingTime <= 50 && gameState[room].hintsShown == 1) {
      hint = dottedWord(
        gameState[room].chosenWord, gameState[room].dottedWord
      );
      io.to(room).emit("yourHint", hint, gameState[room].drawerId);
      gameState[room].dottedWord = hint;
      gameState[room].hintsShown += 1;
    }
    if (remainingTime <= 20 && gameState[room].hintsShown == 2 && gameState[room].chosenWord.length > 3) {
      hint = dottedWord(gameState[room].chosenWord, gameState[room].dottedWord);
      io.to(room).emit("yourHint", hint, gameState[room].drawerId);
      gameState[room].dottedWord = hint;
      gameState[room].hintsShown += 1;
    }
    if (remainingTime <= 0) {
      console.log(room);
      showScore(room);

    }
  }, 1000);
}

function showScore(room) {
  clearInterval(gameTimer);
  word = gameState[room].chosenWord;
  gameState[room].chosenWord = null;

  allIds = Object.keys(allPlayers[room]);
  totalPlayers = allIds.length;
  count = 0
  allIds.forEach((id) => {
    if (!(id in answered[room])) {
      answered[room][id] = 0;
      count += 1;
    }
  });
  numOfAnswers = totalPlayers - count - 1;

  finalScore = {
    nameList: [],
    scoreList: []
  };
  totalTime = time[gameInformations[room].time];

  idArray = Object.keys(answered[room]);
  sumOfTime = 0;
  console.log(answered[room]);

  for (i = 1; i < idArray.length; i++) {
    if (answered[room][idArray[i]] == 0) {
      finalScore.nameList.push(allPlayers[room][idArray[i]].name);
      finalScore.scoreList.push(0);
    } else {
      finalScore.nameList.push(allPlayers[room][idArray[i]].name);
      finalScore.scoreList.push(Math.round(((answered[room][idArray[i]] + (totalTime / 2)) / totalTime) * 350 - (i * 25)));
    }
    sumOfTime += answered[room][idArray[i]];
  }
  finalScore.nameList.push(allPlayers[room][idArray[0]].name);
  finalScore.scoreList.push(Math.round(sumOfTime / (totalPlayers * totalTime) * finalScore.scoreList[0]));

  console.log(finalScore);
  console.log(JSON.stringify(finalScore));
  io.to(room).emit("showScore", JSON.stringify(finalScore), word);
  answered[room] = {};
  setTimeout(() => {
    io.to(room).emit("hideScore");
    totalRounds = rounds[gameInformations[room].rounds];
    totalPlayer = numberOfPlayers[room];
    initialTurn = gameState[room].turn;
    initialRound = gameState[room].round;
    if (initialTurn >= totalPlayers - 1) {
      finalTurn = 0;
      finalRound = initialRound + 1;
    } else {
      finalTurn = initialTurn + 1;
      finalRound = initialRound;
    }
    io.to(room).emit(RENEW_BOARD);
    if (finalRound == totalRounds + 1) {
      io.to(room).emit("gameFinished");
    } else {
      gameState[room] = createGameState(
        finalRound,
        finalTurn,
        true,
        allPlayers[room][playerTurns[room][finalTurn]].name,
        playerTurns[room][finalTurn],
        null
      )
      chooseWord(room);
    }

  }, 5000);

}

const playerCreator = (name, host, socketId) => {
  var player = {};
  player.name = name;
  player.score = 0;
  player.answered = false;
  player.host = host;
  player.socketId = socketId;
  return player;
};

const getRandomWord = () => {
  num = Math.random();
  index = Math.floor(num * WORDS_LIST.length);
  return WORDS_LIST[index];
}


const chooseWord = (room) => {
  io.to(room).emit("chooseWord",
    gameState[room].drawerId,
    getRandomWord(),
    getRandomWord(),
    getRandomWord()
  )
  startChooseWordTimer(gameState[room].drawerId);


}

const createMessage = (name, message, correctAnswer, firstTimeAnswer, alreadyAnswered) => {
  let tempMessage = {}
  tempMessage.name = name;
  tempMessage.message = message;
  tempMessage.correctAnswer = correctAnswer;
  tempMessage.firstTimeAnswer = firstTimeAnswer;
  tempMessage.alreadyAnswered = alreadyAnswered;
  return tempMessage;
}

server.listen(3035, () => {
  console.log("Server is listening on port 3035");
});


io.on("connection", (socket) => {


  console.log("Connected");

  socket.on("message", (message, time) => {

    let room = socketPlusRooms[socket.id];
    let name = allPlayers[room][socket.id].name;
    let chosenWord = gameState[room].chosenWord;
    if (chosenWord != null) {
      if (answered[room].hasOwnProperty(socket.id)) {
        if (message.toLowerCase().includes(chosenWord.toLowerCase())) {
          message = createMessage(name, "Your message contains answer.", true, false, true);
          io.to(socket.id).emit("yourMessage", JSON.stringify(message));
        } else {
          message = createMessage(name, message, false, true, true);
          io.to(room).emit("yourMessage", JSON.stringify(message));
        }
      }
      else {
        if (message.toLowerCase() == chosenWord.toLowerCase()) {
          message = createMessage(name, " guessed the word.", true, true, true);
          io.to(room).emit("yourMessage", JSON.stringify(message));
          answered[room][socket.id] = parseInt(time);
          if (Object.keys(answered[room]).length == numberOfPlayers[room]) {
            showScore(room);

          }
        }
        else {
          message = createMessage(name, message, false, false, false);
          io.to(room).emit("yourMessage", JSON.stringify(message));
        }

      }
    }
    else {
      message = createMessage(name, message, false, false, false);
      io.to(room).emit("yourMessage", JSON.stringify(message));
    }
  })

  socket.on(DRAWER_CLEAR, () => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_CLEAR);
  })


  socket.on(DRAWER_UNDO, () => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_UNDO);
  })

  socket.on(DRAWER_CURRENT_SEG_VALUES, (currentSegmentValues) => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_CURRENT_SEG_VALUES,
      currentSegmentValues);
  })

  socket.on(DRAWER_CURRENT_SEG_POINTS, (currentSegmentPoints) => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_CURRENT_SEG_POINTS,
      currentSegmentPoints);
  })

  socket.on(DRAWER_CLEAR_CURRENT_POINTS, () => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_CLEAR_CURRENT_POINTS);
  }
  )


  socket.on(DRAWER_HEIGHT, (height) => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_HEIGHT, height);
  })
  socket.on(DRAWER_WIDTH, (width) => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_WIDTH, width);
  });

  socket.on(DRAWER_SEGMENTS, currentSegment => {
    socket.to(socketPlusRooms[socket.id]).emit(RECEIVER_SEGMENTS, currentSegment);
  })

  socket.on("ready", () => {
    numOfReady[socketPlusRooms[socket.id]] += 1;
    if (gameState[socketPlusRooms[socket.id]].ready == false) {
      if (numOfReady[socketPlusRooms[socket.id]] == numberOfPlayers[socketPlusRooms[socket.id]]) {
        chooseWord(socketPlusRooms[socket.id]);
        gameState[socketPlusRooms[socket.id]].ready = true;
      }

    }

  })

  socket.on("wordChosen", (word) => {
    clearInterval(chooseWordTimer);
    io.to(socketPlusRooms[socket.id]).
      emit("gameStarted", socket.id);
    gameState[socketPlusRooms[socket.id]].chosenWord = word;
    answered[socketPlusRooms[socket.id]][socket.id] = -1;
    startGameTimer(socketPlusRooms[socket.id]);

  })

  socket.on("getGameState", () => {
    socket.emit("gameState", JSON.stringify(gameState[socketPlusRooms[socket.id]]));
  })


  socket.on("newCode", (room, host, callback) => {
    if (io.sockets.adapter.rooms.get(room)) {
      callback(true);
    } else {
      if (host) {
        allPlayers[room] = {};
        numberOfPlayers[room] = 0;
        playerTurns[room] = [];
        numOfReady[room] = 0;
        gameState[room] = {};
        answered[room] = {};
      }
      callback(false);
    }
  });

  socket.on("createPlayer", (name, host, room, callback) => {
    let p = playerCreator(
      name,
      host,
      socket.id
    );

    socketPlusRooms[socket.id] = room;
    allPlayers[room][socket.id] = p;
    numberOfPlayers[room] += 1;
    playerTurns[room].push(socket.id);
    console.log(room);

    socket.join(room);
    callback(JSON.stringify(p));
    io.to(room).emit("allPlayers", allPlayers[room]);
  });

  socket.on("setGameInformation", (gameInfo) => {
    gameInformations[socketPlusRooms[socket.id]] = JSON.parse(gameInfo);
  });

  socket.on("getGameInformation", (callback) => {
    callback(JSON.stringify(gameInformations[socketPlusRooms[socket.id]]));
  });
  socket.on("rounds", (position) => {
    gameInformations[socketPlusRooms[socket.id]].rounds = position;
    gameInformations[socketPlusRooms[socket.id]].started = false;

    io.to(socketPlusRooms[socket.id]).emit("roundsChanged", position);
  });

  socket.on("time", (position) => {


    gameInformations[socketPlusRooms[socket.id]].time = position;
    gameInformations[socketPlusRooms[socket.id]].started = false;

    io.to(socketPlusRooms[socket.id]).emit("timeChanged", position);
  });

  socket.on("startGame", (start) => {

    gameInformations[socketPlusRooms[socket.id]].started = start;
    io.to(socketPlusRooms[socket.id]).emit("startChanged", start);
    gameState[socketPlusRooms[socket.id]] = createGameState(
      0,
      0,
      false,
      allPlayers[socketPlusRooms[socket.id]]
      [playerTurns[socketPlusRooms[socket.id]][0]].name,
      playerTurns[socketPlusRooms[socket.id]][0],
      null
    );

  });

  socket.on("disconnect", (reason) => {

    if (socketPlusRooms[socket.id]) {
      delete allPlayers[socketPlusRooms[socket.id]][socket.id];
      playerTurns[socketPlusRooms[socket.id]].splice(playerTurns[socketPlusRooms[socket.id]].indexOf(socket.id), 1);
      numOfReady[socketPlusRooms[socket.id]] -= 1;
      numberOfPlayers[socketPlusRooms[socket.id]] -= 1;
      if (numberOfPlayers[socketPlusRooms[socket.id]] == 0) {
        delete allPlayers[socketPlusRooms[socket.id]];
        delete gameInformations[socketPlusRooms[socket.id]];
        delete playerTurns[socketPlusRooms[socket.id]];
        delete numberOfPlayers[socketPlusRooms[socket.id]];
        delete numOfReady[socketPlusRooms[socket.id]];
        delete gameState[socketPlusRooms[socket.id]];
      }
      io.to(socketPlusRooms[socket.id]).emit("allPlayers", allPlayers[socketPlusRooms[socket.id]]);
      delete socketPlusRooms[socket.id];
    }
    console.log(reason);
  });


})

