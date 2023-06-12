# WoW Classic WotLK Auction House Search

A web app that calls TSM API and Blizzard API to generate a table of items from WoW WotLK Classic and the prices of those items in specific realms
and factions. This uses a microservice created by my group project partner Jena Brown. 

Setup before using web app:
1. Have node v.16+ installed and run `npm install` in both project-api and project-ui directories to get all packages used.
2. Download [PriceCheckerMicroservice.zip](https://drive.google.com/file/d/10pM9cWPDHBolyoPmPgnnfPciCm5Ouufn/view?usp=sharing)
3. Follow README in folder.
4. Create a free [tradeskillmaster](https://www.tradeskillmaster.com/) and [battle.net](https://battle.net) account.
5. Get API credentials from [tradeskillmaster](https://www.tradeskillmaster.com/user) and [battle.net](https://develop.battle.net/documentation/guides/getting-started).
6. Create .env files for both project-ui and project-api.
7. In project-api's .env file, create the variables BATTLE_NET_CLIENT_ID, BATTLE_NET_CLIENT_SECRET, TSM_CLIENT_ID, and PORT.
8. Use the battle.net client ID and secret for the first 2 variables, the tradeskillmaster ID for the TSM_CLIENT_ID variable, and a port number for PORT.
9. In project-ui's .env file, create PORT variable and assign a different port.
10. Run `npm start` in all three folders project-ui, project-api, and PriceCheckerMicroservice.
