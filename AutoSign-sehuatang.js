const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

//const { promises: { readFile, writeFile, mkdir } } = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
    });
    
    const page = await browser.newPage();

    await page.setCookie({
            "domain": "www.sehuatang.org",
            "expirationDate": 1627697730.267998,
            "hostOnly": true,
            "httpOnly": false,
            "name": "cPNj_2132_atarget",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "1",
            "id": 1
        },
        {
            "domain": "www.sehuatang.org",
            "expirationDate": 1627636117.843151,
            "hostOnly": true,
            "httpOnly": true,
            "name": "cPNj_2132_auth",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "fe36sI6wZ14E7UKqQnb5hIDDJh2vJOSIABnr5USnsPAADXB8tJliuUFXlYGRcHHsiNOowjSbh0Yygbi3D%2BASTPb5984",
            "id": 2
        },
        {
            "domain": "www.sehuatang.org",
            "hostOnly": true,
            "httpOnly": false,
            "name": "cPNj_2132_home_diymode",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": true,
            "storeId": "0",
            "value": "1",
            "id": 3
        },
        {
            "domain": "www.sehuatang.org",
            "expirationDate": 1626447142.407393,
            "hostOnly": true,
            "httpOnly": false,
            "name": "cPNj_2132_lastact",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "1626360742%09index.php%09",
            "id": 4
        },
        {
            "domain": "www.sehuatang.org",
            "expirationDate": 1656580117.84319,
            "hostOnly": true,
            "httpOnly": false,
            "name": "cPNj_2132_lastcheckfeed",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "385963%7C1625044118",
            "id": 5
        },
        {
            "domain": "www.sehuatang.org",
            "hostOnly": true,
            "httpOnly": false,
            "name": "cPNj_2132_lastfp",
            "path": "/",
            "sameSite": "unspecified",
            "secure": false,
            "session": true,
            "storeId": "0",
            "value": "61a0ede85d22e294b59188c2ab8cd83c",
            "id": 6
        },
        {
            "domain": "www.sehuatang.org",
            "expirationDate": 1627636107.570984,
            "hostOnly": true,
            "httpOnly": false,
            "name": "cPNj_2132_lastvisit",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "1625040507",
            "id": 7
        },
        {
            "domain": "www.sehuatang.org",
            "expirationDate": 1656580122.764435,
            "hostOnly": true,
            "httpOnly": false,
            "name": "cPNj_2132_nofavfid",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "1",
            "id": 8
        },
        {
            "domain": "www.sehuatang.org",
            "expirationDate": 1627636107.570934,
            "hostOnly": true,
            "httpOnly": true,
            "name": "cPNj_2132_saltkey",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "kh4VLJrb",
            "id": 9
        },
        {
            "domain": "www.sehuatang.org",
            "expirationDate": 1626361018.471922,
            "hostOnly": true,
            "httpOnly": false,
            "name": "cPNj_2132_sendmail",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "1",
            "id": 10
        },
        {
            "domain": "www.sehuatang.org",
            "expirationDate": 1657210311,
            "hostOnly": true,
            "httpOnly": false,
            "name": "cPNj_2132_smile",
            "path": "/",
            "sameSite": "unspecified",
            "secure": false,
            "session": false,
            "storeId": "0",
            "value": "1D1",
            "id": 11
        },
        {
            "domain": "www.sehuatang.org",
            "expirationDate": 1657896717.286188,
            "hostOnly": true,
            "httpOnly": false,
            "name": "cPNj_2132_ulastactivity",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "1626360717%7C0",
            "id": 12
        },
        {
            "domain": "www.sehuatang.org",
            "expirationDate": 1628004830.8059,
            "hostOnly": true,
            "httpOnly": false,
            "name": "cPNj_2132_visitedfid",
            "path": "/",
            "sameSite": "unspecified",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": "103D75D73",
            "id": 13
        });

    await page.goto('https://www.sehuatang.org/');

    //页面引入jquery
/*     await page.mainFrame().addScriptTag({
        url: 'https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js'
    });  */
        
    await page.waitForTimeout(1000);

    await browser.close();

})();