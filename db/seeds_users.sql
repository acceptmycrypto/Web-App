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


INSERT INTO users_purchases (user_id, deal_id, crypto_id, crypto_name, amount, txn_id, address, confirms_needed, timeout, qrcode_url, payment_received) VALUES
(1, 1, 6, "ETH", 0.076, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 3, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(2, 1, 6, "ETH", 0.076, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 2, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(3, 1, 4, "DOGE", 2218.763, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 4, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(4, 1, 2, "BTC", 0.0015, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 3, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(5, 1, 8, "XMR", 0.0969, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 2, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(1, 2, 2, "BTC", 0.011, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 5, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(5, 2, 4, "DOGE", 15651.87, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 2, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(4, 2, 2, "BTC", 0.0109, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 3, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(6, 2, 7, "LTC", 1.3298, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 4, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(6, 3, 5, "ETC", 27.8323, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 3, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(3, 3, 4, "DOGE", 59373.11, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 1, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(2, 3, 6, "ETH", 1.3103, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 2, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(5, 3, 5, "ETC", 27.9459, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 3, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(1, 4, 7, "LTC", 0.309, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 4, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(6, 4, 7, "LTC", 0.308, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 3, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(1, 4, 3, "DASH", 0.1069, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 5, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", true),
(4, 4, 2, "BTC", 0.0025, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 5, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", false),
(5, 4, 4, "DOGE", 3635.976, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 2, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", false),
(3, 4, 3, "DASH", 0.1266, "CPCJ5AWJ9GDYLQZWO9MOUT914M", "35gu2EBHgUJnPt9k4Epo8HaUam2gpNEMut", 2, 10000, "https://www.coinpayments.net/qrgen.php?id=CPCJ6PXR21YHHN2RMPXUURM3L7&key=20761fa87d3fc20b6564098b356c562f", false);


INSERT INTO users_matched_friends (user_id, matched_friend_id) VALUES
(1, 2),
(2, 1);


INSERT INTO users_cryptos(user_id, crypto_id, crypto_address) VALUES
(1,1, "15wFc6QAAJqRnwAdtaYMydGJHFrQrDZkPA"),
(1,3, "XshzoU2HrRdki4T78YV9vpeXAVuPZnnBaF");
