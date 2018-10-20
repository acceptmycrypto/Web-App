INSERT INTO users (username, first_name, last_name, phone_number, email, password, email_verification_token) VALUES
("ym","yanan","meng","1234567890","ym@ym.com","ym", uuid()),
("ak","avanika","k","1234567890","ak@ak.com","ak", uuid()),
("jn","jason","neitro","1234567890","jn@jn.com","jn", uuid()),
("sn","simon","nguyen","1234567890","sn@sn.com","sn", uuid()),
("hf","hooman","f","1234567890","hf@hf.com","hf", uuid()),
("pk","pavan","katapali","1234567890","pk@pk.com","pk", uuid());


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
(2, 1, 6, 0.076),
(3, 1, 4, 2218.763)
(4, 1, 2, 0.0015)
(5, 1, 8, 0.0969)
(1, 2, 2, 0.011),
(5, 2, 4, 15651.87),
(4, 2, 2, 0.0109),
(6, 2, 7, 1.3298),
(6, 3, 5, 27.8323),
(3, 3, 4, 59373.11),
(2, 3, 6, 1.3103),
(5, 3, 5, 27.9459),
(1, 4, 7, 0.309),
(6, 4, 7, 0.308),
(1, 4, 3, 0.1069),
(4, 4, 2, 0.0025),
(5, 4, 4, 3635.976),
(3, 4, 3, 0.1266);


INSERT INTO users_matched_friends (user_id, matched_friend_id) VALUES
(1, 2),
(2, 1);


INSERT INTO users_cryptos(user_id, crypto_id, crypto_address) VALUES
(1,1, "15wFc6QAAJqRnwAdtaYMydGJHFrQrDZkPA"),
(1,3, "XshzoU2HrRdki4T78YV9vpeXAVuPZnnBaF");