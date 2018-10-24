# About AcceptMyCrypto
*The purpose of the app is for cryptocurrencies holders to check what venues out there are accepting their cryptos.*

## API
*AcceptMyCrypto uses coinmarketcap api to get crypto info shown below*
* Name
* Symple
* Price
* Logo
* Website URL

## Venues
*AcceptMyCrypto doesn't rely on any third party API to get the venues data set. All data regarding venues are manually inserted by the team.*
*Two ways we come up with the venues data*
* Team does marketing research and submit manually
* Users submitting prospective venues to us. We verified and submit manually.

## Run the server and client concurrently
```
npm run dev
```
## Run Schema/ Seeds files:
1. SOURCE schema.sql
2. SOURCE seeds_venues.sql
3. Go to : http://localhost:3001/cryptos after running `nodemon server.js` on command line
4. SOURCE seeds_cryptos-venues.sql
5. SOURCE seeds_deals.sql
6. SOURCE seeds_users.sql
7. SOURCE seeds_crypto_comments.sql
