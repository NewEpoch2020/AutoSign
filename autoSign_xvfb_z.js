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

    const browser = await puppeteer.launch({
        headless: false,
        ignoreDefaultArgs: ["--enable-automation"]
    });

    await Promise.all([ //没有顺序的概念
        zodgame(),
    ]);
    await browser.close();


    async function zodgame() {
        const sitename = "zodgame";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "https://zodgame.xyz/plugin.php?id=dsu_paulsign:sign";
        const url_BUX = "https://zodgame.xyz/plugin.php?id=jnbux";
        const selector1 = '#wl';
        const selector2 = '#qiandao > table > tbody > tr > td > div > a';
        const selector3 = '#wp > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(1) > div:nth-child(4) tr:nth-child(3) > td:nth-child(6) > a';
        const selector4 = '#fwin_dialog_submit';
        const page = await browser.newPage();
        await logAndGetCookies(page, url, 15000, cookies_zodgame, sitename, name_md5);
        //await sign_click(page, sitename, cookies_zodgame, url, 40000, selector1, selector2);
        await zod_bux(page, sitename, cookies_zodgame, url_BUX, 50000, selector3, selector4);   
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

    async function zod_bux(page, sitename, cookies, url, timeout, ...selectors) {
            await page.setCookie(...cookies);
            await page.goto(url);
            await page.waitForTimeout(timeout);
            let i = 0;
            while (await page.$(selectors[0])) { 
                i++;
                await page.waitForSelector(selectors[0]);
                await page.click(selectors[0]);
                await page.waitForTimeout(timeout);
                await page.waitForSelector(selectors[1]);
                let time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                console.log(time + " " + sitename + ": i = " + i + "，Succeed to find selector: " + selectors[1]);
                await page.click(selectors[1]);
                await page.waitForTimeout(timeout);
            }
            console.log(`No more selector found!`);
    }

}
