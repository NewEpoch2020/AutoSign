const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

//const { promises: { readFile, writeFile, mkdir } } = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    
    const page = await browser.newPage();

    await page.setCookie({
                "domain": ".sketchupbar.com",
                "expirationDate": 1686628234.247527,
                "hostOnly": false,
                "httpOnly": true,
                "name": "__yjs_duid",
                "path": "/",
                "sameSite": "unspecified",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "1_b411e5d6fa2ecf7bf58139c93f9d5d301623556233787",
                "id": 1
            },
            {
                "domain": ".sketchupbar.com",
                "expirationDate": 1657434417,
                "hostOnly": false,
                "httpOnly": false,
                "name": "_fmdata",
                "path": "/",
                "sameSite": "unspecified",
                "secure": false,
                "session": false,
                "storeId": "0",
                "value": "MqwTgp5mUufOgOrJD7m10%2Fdkz7Q9dZ3o19TdYXwO0FOSSlzkOeU9Mh6Gk%2FGmckOgNXiFRhgvUp94ZthVppqyzfqH6Du9HG8sUk69UD00PWw%3D",
                "id": 2
            },
            {
                "domain": ".sketchupbar.com",
                "expirationDate": 1657434417,
                "hostOnly": false,
                "httpOnly": false,
                "name": "_xid",
                "path": "/",
                "sameSite": "unspecified",
                "secure": false,
                "session": false,
                "storeId": "0",
                "value": "%2F5MnpS%2BSjiv%2BeFFAZ0QXZyL06b4M2S9DBzkE0dcGezf6JVfEriFoA2fTKOSYclcVGc%2BSLF69iMywz%2BVqv4lBmg%3D%3D",
                "id": 3
            },
            {
                "domain": ".sketchupbar.com",
                "expirationDate": 1657434417,
                "hostOnly": false,
                "httpOnly": false,
                "name": "c",
                "path": "/",
                "sameSite": "unspecified",
                "secure": false,
                "session": false,
                "storeId": "0",
                "value": "8ghME5Jw-1623556235680-5fc55dffc1548-367022664",
                "id": 4
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1626021701.459456,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_1500807",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "1",
                "id": 5
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1626335463.291101,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_atarget",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "1",
                "id": 6
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1655390141.618896,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_auth",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "bfc3yJe+II7LJ8On+n4s/Jq9VuWNkbbll+g2Q7QK0dsAfl4q14XhcePBL3Ok64B/Q6JueXv77naYytGA4FTqRHs2eXx9",
                "id": 7
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1655279697.567117,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_auth_code",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "869035036",
                "id": 8
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1625978531.964378,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_checkpm",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "1",
                "id": 9
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1657520815.14862,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_connect_is_bind",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "0",
                "id": 10
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1625984815.148565,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_lastact",
                "path": "/",
                "sameSite": "unspecified",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "1625898415%09misc.php%09patch",
                "id": 11
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1626234634.247644,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_lastvisit",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "1623552633",
                "id": 12
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1625984810.150426,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_lip",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "115.49.137.161,1625892101",
                "id": 13
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1656937963.82296,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_promptstate_1500807",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "Array",
                "id": 14
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1626234634.247586,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_saltkey",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "grrczfHc",
                "id": 15
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1625978801.901565,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_sendmail",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "1",
                "id": 16
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 2623743322.784353,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_shenlan_area_title",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "中国",
                "id": 17
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1626071210.150511,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_sid",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "BQgGgB",
                "id": 18
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1656121294,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_smile",
                "path": "/",
                "sameSite": "unspecified",
                "secure": false,
                "session": false,
                "storeId": "0",
                "value": "5D1",
                "id": 19
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1625978502.216502,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_synlogin_times",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "1",
                "id": 20
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1625978502.216456,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_synlogin_uid",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "fd76f990057912a1633fc443dbe5d975",
                "id": 21
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1657428101.459543,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_ulastactivity",
                "path": "/",
                "sameSite": "unspecified",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "a3523yzRYXcjCZoVxYsgeETFGkkFIoDp1RB56JmC65nRhPULLHrR",
                "id": 22
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1649401308.947785,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_vgallery_list",
                "path": "/",
                "sameSite": "unspecified",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "a%3A1%3A%7Bi%3A0%3Ba%3A5%3A%7Bs%3A2%3A%22id%22%3Bs%3A4%3A%221005%22%3Bs%3A8%3A%22dataline%22%3Bi%3A1617865309%3Bs%3A4%3A%22istv%22%3Bi%3A0%3Bs%3A3%3A%22sup%22%3Bi%3A0%3Bs%3A7%3A%22subject%22%3Bs%3A29%3A%22%5B241%5D%E5%BF%AB%E9%80%9F%E5%AF%B9%E9%BD%90+%28AlignTool%29%22%3B%7D%7D",
                "id": 23
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1627263655.210558,
                "hostOnly": true,
                "httpOnly": false,
                "name": "8NAo_2132_visitedfid",
                "path": "/",
                "sameSite": "no_restriction",
                "secure": true,
                "session": false,
                "storeId": "0",
                "value": "393D27D4D260D2D3D240D13D297D16",
                "id": 24
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 1939017307.846718,
                "hostOnly": true,
                "httpOnly": false,
                "name": "groupid1500807",
                "path": "/",
                "sameSite": "unspecified",
                "secure": false,
                "session": false,
                "storeId": "0",
                "value": "10",
                "id": 25
            },
            {
                "domain": "www.sketchupbar.com",
                "hostOnly": true,
                "httpOnly": true,
                "name": "PHPSESSID",
                "path": "/",
                "sameSite": "unspecified",
                "secure": false,
                "session": true,
                "storeId": "0",
                "value": "dfc3f794fec9aa0723b85ecb7fc567e5",
                "id": 26
            },
            {
                "domain": "www.sketchupbar.com",
                "expirationDate": 2489812010,
                "hostOnly": true,
                "httpOnly": false,
                "name": "TSCvalue",
                "path": "/",
                "sameSite": "unspecified",
                "secure": false,
                "session": false,
                "storeId": "0",
                "value": "gb",
                "id": 27
    });

    await page.goto('https://www.sketchupbar.com/sign.php?mod=sign');

    //页面引入jquery
/*     await page.mainFrame().addScriptTag({
        url: 'https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js'
    });  */
        
/*     await page.screenshot({
        path: './headLess.png',
        fullPage: true, 
    });  */
    await page.waitForTimeout(1000);
    await page.click('#JD_sign');
    //await page.waitForTimeout(1000);
    //await page.click('#wheelcanvas+img');
    await browser.close();

})();