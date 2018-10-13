INSERT INTO users (username, first_name, last_name, phone_number, email, password) VALUES
("ym","yanan","meng","1234567890","ym@ym.com","ym"),
("ak","avanika","k","1234567890","ak@ak.com","ak"),
("jn","jason","neitro","1234567890","jn@jn.com","jn"),
("sn","simon","nguyen","1234567890","sn@sn.com","sn"),
("hf","hooman","f","1234567890","hf@hf.com","hf"),
("pk","pavan","katapali","1234567890","pk@pk.com","pk");


INSERT INTO users_profiles (user_id, bio, user_location) VALUES
(1,"Hi! I am Yanan","San Francisco"),
(2,"Hey I'm Avanika","San Francisco"),
(3,"Hello I'm Jason!","San Francisco"),
(4,"Hey it's Simon","San Francisco"),
(5,"This is Hooman","San Francisco"),
(6,"Hey I am Pavan!","San Francisco");

INSERT INTO users_cryptos (user_id, crypto_id) VALUES
(1,2),
(1,6),
(1,7),
(2,1),
(2,8),
(2,6),
(3,4),
(3,3),
(4,1),
(4,2),
(4,3),
(4,6),
(5,8),
(5,5),
(5,4),
(6,7),
(6,1),
(6,8),
(6,5),
(6,4),
(6,3);


INSERT INTO users_purchases (user_id, deal_id, crypto_id, amount) VALUES
(1, 1, 6, 0.076),
(2, 1, 6, 0.076);

INSERT INTO users_matched_friends (user_id, matched_friend_id) VALUES
(1, 2),
(2, 1);