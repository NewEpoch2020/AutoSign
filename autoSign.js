autoSign();

async function autoSign(){
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());
    const axios = require('axios');
    const barkURL = "https://www.hidjnuiot78945huoridfngjkfnhf.xyz/J8AAL9oQYfySSKjgUSNQ9i/"
    
    const cookies_Sehuatang = [
{
    "domain": "www.sehuatang.org",
    "expirationDate": 1631554444.193175,
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
    "expirationDate": 1631342769.720282,
    "hostOnly": true,
    "httpOnly": true,
    "name": "cPNj_2132_auth",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "79b0ENBSr2X4jUsQiuB4zwkueEHEcJ5fOkyEo80w75nwFZJMQ7PGS4suR5iUkHCs%2BvOyo1Hi1GPM2zFe3rF%2BnBnz4eA",
    "id": 2
},
{
    "domain": "www.sehuatang.org",
    "expirationDate": 1629567248.050058,
    "hostOnly": true,
    "httpOnly": false,
    "name": "cPNj_2132_forum_lastvisit",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "D_2_1628962447D_103_1628962448",
    "id": 3
},
{
    "domain": "www.sehuatang.org",
    "expirationDate": 1629452277.404892,
    "hostOnly": true,
    "httpOnly": false,
    "name": "cPNj_2132_lastact",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "1629365878%09index.php%09",
    "id": 4
},
{
    "domain": "www.sehuatang.org",
    "expirationDate": 1660286769.720355,
    "hostOnly": true,
    "httpOnly": false,
    "name": "cPNj_2132_lastcheckfeed",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "385963%7C1628750771",
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
    "value": "83919e2668cdb6a69144ba9a0af2f8dc",
    "id": 6
},
{
    "domain": "www.sehuatang.org",
    "expirationDate": 1630643902.192731,
    "hostOnly": true,
    "httpOnly": false,
    "name": "cPNj_2132_lastvisit",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "1628048303",
    "id": 7
},
{
    "domain": "www.sehuatang.org",
    "expirationDate": 1660286772.384181,
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
    "expirationDate": 1630643902.192664,
    "hostOnly": true,
    "httpOnly": true,
    "name": "cPNj_2132_saltkey",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "O3D5dirE",
    "id": 9
},
{
    "domain": "www.sehuatang.org",
    "expirationDate": 1629452277.404821,
    "hostOnly": true,
    "httpOnly": false,
    "name": "cPNj_2132_sid",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "0",
    "id": 10
},
{
    "domain": "www.sehuatang.org",
    "expirationDate": 1660498564,
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
    "expirationDate": 1660901877.404918,
    "hostOnly": true,
    "httpOnly": false,
    "name": "cPNj_2132_ulastactivity",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "1629365878%7C0",
    "id": 12
},
{
    "domain": "www.sehuatang.org",
    "expirationDate": 1631554500.924217,
    "hostOnly": true,
    "httpOnly": false,
    "name": "cPNj_2132_visitedfid",
    "path": "/",
    "sameSite": "unspecified",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "2D103",
    "id": 13
}
];

    const browser = await puppeteer.launch({
        headless: true //必须设置为无头模式
    });

     await Promise.all([ //没有顺序的概念
        sehuatang(),
        //bing(),
        //google()
    ]);
 
    async function sehuatang(){
        console.log("Start sehuatang sign in...");
        const page_sehuatang = await browser.newPage();
        
        await page_sehuatang.setCookie(...cookies_Sehuatang); //可变长度参数就是一个数组
        
        await page_sehuatang.goto('https://www.sehuatang.org/');

        try {
            await page_sehuatang.waitForSelector('#um > p:nth-child(2) > strong > a',{ timeout: 5000 })
            console.log("Succeed to sign in sehuatang!");
        }catch (err){
            console.log("Failed to sign in sehuatang!");
            axios.post(barkURL + '[Sign] Failed to sign in sehuatang!');
        } 
        
    }
}
