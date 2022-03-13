// 目前无头模式利用 StealthPlugin() 无法通过 Cloudflare 安全检查，利用 xvfb 实现有头模式。 
const Xvfb = require('xvfb');
var xvfb = new Xvfb();
xvfb.startSync();
autoSign();
xvfb.stopSync();

async function autoSign() {
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());
    const path = require("path");
    const fs = require("fs");
    const crypto = require('crypto');
    const axios = require('axios');

    //别忘了workflow里设置环境变量
    const barkURL = process.env.BARK_URL;
    var cookies_zodgame = eval(process.env.ZODGAME_COOKIES);
    var cookies_acghh = eval(process.env.ACGHH_COOKIES);

    const browser = await puppeteer.launch({
        headless: false,
        ignoreDefaultArgs: ["--enable-automation"]
    });

    await Promise.all([ //没有顺序的概念
        zodgame(),
        acghh(),
    ]);
    await browser.close();

    async function acghh() {
        const sitename = "acghh";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url1 = "https://acgg18.cc/mission/today";
        const url2 = "https://acgg18.cc/circle";
        const selector1 = ".custom-page-row.gold-row.mg-t button";
        const selector2 = ".circle-topic-list div:nth-child(2) section:nth-child(1) .topic-footer .topic-footer-right button";
        const selector3 = ".circle-topic-list div:nth-child(2) section:nth-child(1) .topic-comment-left textarea";
        const selector4 = ".circle-topic-list div:nth-child(2) section:nth-child(1) .topic-comment-right button:nth-child(2)";
        const page = await browser.newPage();
        await logAndGetCookies(page, url1, 5000, cookies_acghh, sitename, name_md5);
        await sign_click(page, sitename, cookies_acghh, url1, 15000, selector1);
        await comment_acghh(page, sitename, cookies_acghh, url2, 15000, selector2, selector3, selector4);
    }

    async function zodgame() {
        const sitename = "zodgame";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "https://zodgame.xyz/plugin.php?id=dsu_paulsign:sign";
        const url_BUX = "https://zodgame.xyz/plugin.php?id=jnbux";
        const selector1 = '#wl';
        const selector2 = '#qiandao > table > tbody > tr > td > div > a > img';
        const selector_BUX = '#wp > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(1) > div:nth-child(4) tr:nth-child(3) > td:nth-child(6) > a';
        const page = await browser.newPage();
        await logAndGetCookies(page, url, 5000, cookies_zodgame, sitename, name_md5);
        await sign_click(page, sitename, cookies_zodgame, url, 30000, selector1, selector2);
        await sign_wait(page, sitename, cookies_zodgame, url_BUX, 40000, selector_BUX);
    }

    //--------------------------------------------------------------------------------------------------//


    async function logAndGetCookies(page, url, timeout, cookies, sitename, name_md5) {
        try {
            cookies = await JSON.parse(fs.readFileSync(
                path.resolve(__dirname, ".cache/" + name_md5 + "_cache.json")
            ));
            console.log(`Succeed to load ${sitename} cookies.`);
        } catch (err) {
            console.log(`Failed to load ${sitename} cookies.` + err);
        }
        await page.setCookie(...cookies);
        await page.goto(url, { waitUntil: "networkidle2" });
        await page.waitForTimeout(timeout);
        try {
            fs.writeFileSync(
                path.resolve(__dirname, ".cache/" + name_md5 + "_cache.json"),
                JSON.stringify(await page.cookies())
            );
            console.log(`Succeed to save ${sitename} cookies.`);
        } catch (err) {
            console.log(`Failed to save ${sitename} cookies.` + err);
            process.exit(1);
        }
    }

    async function sign_click(page, sitename, cookies, url, timeout, ...selectors) {
        console.log(`Start sign in ${sitename}...`);
        await page.setCookie(...cookies);
        await page.goto(url);
        await page.waitForTimeout(timeout);
        try {
            for (let i = 0; i < selectors.length; i++) {
                await page.waitForSelector(selectors[i]);
                console.log(sitename + ": i = " + i + '，Succeed to find selector: ' + selectors[i]);
                await page.waitForTimeout(5000);
                await page.click(selectors[i]);
            }
            await page.waitForTimeout(5000);
            console.log(`Succeed to sign in ${sitename}!`);
        } catch (err) {
            console.log(`Failed to sign in ${sitename}!\n` + err);
            axios.post(barkURL + `[Sign] Failed to sign in ${sitename}!`);
            process.exit(1);
        }
    }

    async function sign_wait(page, sitename, cookies, url, timeout, selector) {
        await page.setCookie(...cookies);
        await page.goto(url);
        await page.waitForTimeout(timeout);
        try {
            for (var i = 1; i <= 3; i++) {
                if (await page.$(selector) !== null) {
                    await page.waitForSelector(selector);
                    console.log(sitename + ": i = " + i + "，Succeed to find selector: " + selector);
                    await page.click(selector);
                    await page.waitForTimeout(timeout);
                    await page.evaluate(() => {
                       location.reload(true);
                    })
                    await page.waitForTimeout(timeout);
                } else {
                    console.log(`No more selector found!`);
                    return;
                }  
           }
        } catch (err) {
            console.log(`Failed to sign in ${sitename}!\n` + err);
            axios.post(barkURL + `[Sign] Failed to sign in ${sitename}!`);
            process.exit(1);
        }

    }

    async function comment_acghh(page, sitename, cookies, url, timeout, ...selectors) {
        console.log(`Start comment on ${sitename}...`);
        await page.setCookie(...cookies);
        await page.goto(url, { timeout: 0 });
        await page.waitForTimeout(timeout);
        try {
            await page.waitForSelector(selectors[0], { timeout: 60000 });
            console.log(sitename + ": i = " + 0 + '，Succeed to find selector: ' + selectors[0]);
            await page.waitForTimeout(1000);
            await page.click(selectors[0]);
            await page.waitForTimeout(10000);
            await page.waitForSelector(selectors[1], { timeout: 60000 });
            console.log(sitename + ": i = " + 1 + '，Succeed to find selector: ' + selectors[1]);
            await page.$eval(`${selectors[1]}`, (el, re) => {
                return el.value = re;
            }, "666");
            await page.waitForSelector(selectors[2], { timeout: 60000 });
            console.log(sitename + ": i = " + 2 + '，Succeed to find selector: ' + selectors[2]);
            await page.click(selectors[2]);
            await page.waitForTimeout(10000);
            console.log(`Succeed to comment on ${sitename}!`);
        } catch (err) {
            console.log(`Failed to comment on ${sitename}!\n` + err);
            axios.post(barkURL + `[Sign] Failed to sign in ${sitename}!`);
            process.exit(1);
        }
    }

}
