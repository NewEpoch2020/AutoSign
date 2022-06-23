autoSign();

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
    var cookies_Sehuatang = eval(process.env.SEHUATANG_COOKIES);
    var cookies_sketchupbar = eval(process.env.SKETCHUPBAR_COOKIES);
    var cookies_pojie52 = eval(process.env.POJIE52_COOKIES);
    var cookies_bisi = eval(process.env.BISI_COOKIES);
    var cookies_javbus = eval(process.env.JAVBUS_COOKIES);
    var cookies_lixiang = eval(process.env.LIXIANG_COOKIES);
    var cookies_xacg = eval(process.env.XACG_COOKIES);
    var a_jq = eval(process.env.JQ_A);
    var p_jq = eval(process.env.JQ_P);
    
    const browser = await puppeteer.launch({
        headless: true,
        ignoreDefaultArgs: ["--enable-automation"]
    });

    await Promise.all([ //没有顺序的概念
        //sketchupbar(),
        //pojie52(),
        //lixiang(),
        //sehuatang(),
        //bisi(),
        //javbus(),
        //xacg()
        joinquant(),
        
        //cunhua(),
        //ugg(),
    ]);
    await browser.close();

    async function lixiang() {
        const sitename = "lixiang";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "https://www.55188.com/plugin.php?id=sign";
        const selector = "#addsign";
        const page = await browser.newPage();
        await logAndGetCookies(page, url, 5000, cookies_lixiang, sitename, name_md5);
        await sign_click(page, sitename, cookies_lixiang, url, 15000, selector);
    }
    
    async function xacg() {
        const sitename = "xacg";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "https://acg.xacg.fun/user?action=vip";
        const selector = "body > div.main > div > div.userside > div.usertitle > div > a";
        const page = await browser.newPage();
        await logAndGetCookies(page, url, 5000, cookies_xacg, sitename, name_md5);
        await sign_click(page, sitename, cookies_xacg, url, 15000, selector);
    }

    async function sehuatang() {
        const sitename = "sehuatang";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "https://www.sehuatang.org/plugin.php?id=dd_sign:index";
        const selector1 = "#wp > div.wp.dd_sign > div.dd_sign_right > div.ddpc_sign_btna > a";
        const selector2 = "#fctrl_pc_click_ddsign";
        const selector3 = "button[name='signsubmit']";
        const page = await browser.newPage();
        await logAndGetCookies(page, url, 5000, cookies_Sehuatang, sitename, name_md5);
        await sign_SeHua(page, sitename, cookies_Sehuatang, url, 15000, selector1, selector2, selector3);
    }

    async function bisi() {
        const sitename = "bisi";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "http://bisi888.cc/forum.php?gid=1";
        const selector1 = "#um > p:nth-child(2) > a:nth-child(14)";
        const selector2 = "#wl";
        const selector3 = "#qiandao > p > button";
        const page = await browser.newPage();
        await logAndGetCookies(page, url, 5000, cookies_bisi, sitename, name_md5);
        await sign_click(page, sitename, cookies_bisi, url, 15000, selector1, selector2, selector3);
    }

    async function javbus() {
        const sitename = "javbus";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "https://www.javbus.com/forum/";
        const page = await browser.newPage();
        await logAndGetCookies(page, url, 10000, cookies_javbus, sitename, name_md5);
    }

    async function sketchupbar() {
        const sitename = "sketchupbar";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "https://www.sketchupbar.com/sign.php?mod=sign";
        const selector1 = "#JD_sign";
        const selector2 = ".turnplate img";
        const page = await browser.newPage();
        await logAndGetCookies(page, url, 5000, cookies_sketchupbar, sitename, name_md5);
        await sign_click(page, sitename, cookies_sketchupbar, url, 15000, selector1, selector2);
    }

    async function pojie52() {
        const sitename = "52pojie";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "https://www.52pojie.cn/";
        const selector = "#um > p:nth-child(3) > a:nth-child(1)";
        const page = await browser.newPage();
        await logAndGetCookies(page, url, 5000, cookies_pojie52, sitename, name_md5);
        await sign_click(page, sitename, cookies_pojie52, url, 15000, selector);
    }

    async function joinquant() {
        const sitename = "joinquant";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url1 = "https://www.joinquant.com/view/community/list?listType=1";
        const url2 = "https://www.joinquant.com/view/user/floor?type=creditsdesc";
        const selector0 = "div.jq-c-list.jq-c-list_community > div:nth-child(5) > div > div.jq-c-list_community__title";
        const selector1 = "form.formPwdLogin";
        const selector2 = "div.jq-user-floor-menu__alias > button";
        const selector3 = "dl > dd:nth-child(2) > div:nth-child(1) > div.el-card__body > div.card-footer > div > a > button";
        const page = await browser.newPage();
        await jq_sign(page, sitename, url1, url2, a_jq, p_jq, 15000, selector0,selector1,selector2,selector3);
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
        await page.goto(url, { timeout: 0 });
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

    async function jq_sign(page, sitename, url1, url2, a_jq,p_jq,timeout, ...selectors) {
        console.log(`Start sign in ${sitename}...`);
        await page.goto(url2, { timeout: 0 });
        await page.waitForTimeout(timeout);
        try {
            await page.waitForSelector(selectors[1], { timeout: 30000 });
            console.log(sitename + ": i = " + 0 + '，Succeed to find selector: ' + selectors[0]);
            await page.waitForTimeout(3000);
            await page.type(`${selectors[1]} > input.phone.pwd-phone`, `${a_jq}`, { delay: 600 });
            await page.type(`${selectors[1]} > input.jq-login__password`, `${p_jq}`, { delay: 600 });
            await page.waitForTimeout(1500);
            await page.click(`${selectors[1]} > button`);
            console.log(`Succeed to sign in ${sitename}!`);
            await page.waitForTimeout(3000);
            await page.click(`${selectors[2]}`);
            await page.waitForTimeout(5000);
            await page.goto(url1, { timeout: 0 });
            await page.waitForSelector(selectors[0], { timeout: 30000 });
            await page.click(`${selectors[0]}`);
            await page.waitForTimeout(5000);
            await page.goto(url2, { timeout: 0 });
            await page.waitForTimeout(3000);
            await page.click(`${selectors[3]}`);
        } catch (err) {
            console.log(`Failed to sign in ${sitename}!\n ` + err);
            axios.post(barkURL + ` [Sign] Failed to sign in ${sitename}!`);
            process.exit(1); 
        }        
    }
        
    async function sign_SeHua(page, sitename, cookies, url, timeout, ...selectors) {
        console.log(`Start sign in ${sitename}...`);
        await page.setCookie(...cookies);
        await page.goto(url, { timeout: 0 });
        await page.waitForTimeout(timeout);
        try {
            await page.waitForSelector(selectors[0], { timeout: 50000 });
            console.log(sitename + ": i = " + 0 + '，Succeed to find selector: ' + selectors[0]);
            await page.waitForTimeout(5000);
            const signBtnText = await page.$eval(`${selectors[0]}`, el => el.innerText);
            if (signBtnText == "今日已签到") {
                process.exit(1);
            }
            await page.click(selectors[0]);
            await page.waitForTimeout(10000);
            await page.waitForSelector(selectors[1]);
            console.log(sitename + ": i = " + 1 + '，Succeed to find selector: ' + selectors[1]);
            await page.waitForTimeout(5000);
            const verifiText = await page.$eval(`${selectors[1]} + form > span > div > table > tbody > tr > td`, el => el.innerText.match(/\d+ [\+\-\*] \d+/));
            const verifyResult = await page.evaluate(`${verifiText[0]}`);
            await page.type(`${selectors[1]} + form > span > div > table > tbody > tr > td > input`, `${verifyResult}`, { delay: 600 });
            /*
            await page.$eval(`${selectors[1]} + form > span > div > table > tbody > tr > td > input`, (el, re) => {
                return el.value = re;
            }, verifyResult); 
            */
            await page.waitForTimeout(3000);
            await page.click(selectors[2]);
            console.log(`Succeed to sign in ${sitename}!`);
        } catch (err) {
            console.log(`Failed to sign in ${sitename}!\n ` + err);
            axios.post(barkURL + ` [Sign] Failed to sign in ${sitename}!`);
            process.exit(1); 
        }
    }
}
