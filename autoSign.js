autoSign();

async function autoSign(){
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
    var cookies_zodgame = eval(process.env.ZODGAME_COOKIES);
    var cookies_sketchupbar = eval(process.env.SKETCHUPBAR_COOKIES);
    var cookies_pojie52 = eval(process.env.POJIE52_COOKIES);
    var cookies_bisi = eval(process.env.BISI_COOKIES); 

    const browser = await puppeteer.launch({
        headless: true,
 /*       args: [
            `--window-size=1920,1080`,  
        ]*/
    });

    await Promise.all([ //没有顺序的概念
        //sketchupbar(),
        //pojie52(),
        sehuatang(),
        //zodgame(), 
        //zodgame_BUX(),
        bisi(),
    ]);
    await browser.close();
    
    async function sehuatang(){
        const sitename = "sehuatang";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "https://www.sehuatang.org/plugin.php?id=dd_sign:index";
        const selector1 = "#wp > div.wp.dd_sign > div.dd_sign_right > div.ddpc_sign_btna > a";
        const selector2 = "#fctrl_pc_click_ddsign";
        const selector3 = "button[name='signsubmit']";
        const page = await browser.newPage();
        await logAndGetCookies(page,url,cookies_Sehuatang,sitename,name_md5);
        await sign_SeHua(page, sitename, cookies_Sehuatang, url, selector1, selector2, selector3);
    }
    
    async function sketchupbar(){
        const sitename = "sketchupbar";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "https://www.sketchupbar.com/sign.php?mod=sign";
        const selector = "#JD_sign";
        //const selector2 = "#nv_plugin > div.Footer > div.DDIY > div.dzpBox > div > div.banner > div > img";
        const page = await browser.newPage();
        await logAndGetCookies(page,url,cookies_sketchupbar,sitename,name_md5);
        await sign_click(page,sitename,cookies_sketchupbar,url,5000,selector);
    }

    async function pojie52(){
        const sitename = "52pojie";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "https://www.52pojie.cn/";
        const selector = "#um > p:nth-child(3) > a:nth-child(1)";
        const page = await browser.newPage();
        await logAndGetCookies(page,url,cookies_pojie52,sitename,name_md5);
        await sign_click(page,sitename,cookies_pojie52,url,5000,selector);
    }

    async function zodgame(){
        const sitename = "zodgame";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "https://zodgame.xyz/plugin.php?id=dsu_paulsign:sign";
        const selector1 = '#wl > center > img';
        const selector2 = '#qiandao > table > tbody > tr > td > div > a';    
        const page = await browser.newPage();
        await logAndGetCookies(page,url,cookies_zodgame,sitename,name_md5);
        await sign_click(page,sitename,cookies_zodgame,url,10000,selector1,selector2); 
    }

    async function zodgame_BUX(){
        const sitename = "zodgame";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "https://zodgame.xyz/plugin.php?id=jnbux";
        const selector = '#wp > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(1) > div:nth-child(4) > div > div.bm_c > table > tbody > tr:nth-child(3) > td:nth-child(6) > a';
        const page = await browser.newPage();
        await getCookies(cookies_zodgame,sitename,name_md5)
        //await logAndGetCookies(page,url,cookies_zodgame,sitename,name_md5);       
        await sign_wait(page,sitename,cookies_zodgame,url,10000,selector);
    } 
    
    async function bisi(){
        const sitename = "bisi";
        const name_md5 = crypto.createHash('md5').update(sitename).digest('hex');
        const url = "http://bisi777.xyz/forum.php?gid=1";
        const selector1 = "#um > p:nth-child(2) > a:nth-child(13)";
        const selector2 = "#wl";    
        const selector3 = "#qiandao > p > button"; 
        const page = await browser.newPage();
        await logAndGetCookies(page,url,cookies_zodgame,sitename,name_md5);       
        await sign_click(page,sitename,cookies_bisi,url,10000,selector1,selector2,selector3);
    }

//--------------------------------------------------------------------------------------------------//
    async function logAndGetCookies(page,url,cookies,sitename,name_md5){
        try{    
            //console.log("1");
            cookies = await JSON.parse(fs.readFileSync(
                path.resolve(__dirname, ".cache/" + name_md5 + "_cache.json")
            ));
            console.log(`Succeed to load ${sitename} cookies.`); 
        }catch (err){
            //console.log("2");
            console.log(`Failed to load ${sitename} cookies.` + err); 
        }    
        //console.log("3");
        await page.setCookie(...cookies); 
        await page.goto(url,{waitUntil: "networkidle0"});
        try{         
            fs.writeFileSync(
                path.resolve(__dirname, ".cache/" + name_md5 + "_cache.json"),
                JSON.stringify(await page.cookies())
            ); 
            console.log(`Succeed to save ${sitename} cookies.`);
        }catch (err){
            console.log(`Failed to save ${sitename} cookies.` + err); 
            process.exit(1);
        }
    }

    async function getCookies(cookies,sitename,name_md5){
        try{    
            //console.log("1");
            cookies = await JSON.parse(fs.readFileSync(
                path.resolve(__dirname, ".cache/" + name_md5 + "_cache.json")
            ));
            console.log(`Succeed to load ${sitename} cookies.`); 
        }catch (err){
            //console.log("2");
            console.log(`Failed to load ${sitename} cookies.` + err); 
        }    
    }
    
    async function sign_justlogin(page,sitename,cookies,url){
        console.log(`Start sign in ${sitename}...`);
        await page.setCookie(...cookies); 
        await page.goto(url,{waitUntil: "networkidle2"});
        await page.waitForTimeout(3000);
        console.log(`Succeed to sign in ${sitename}!`);
/*      try {
            //await page.waitForSelector(selector);
            await page.waitForTimeout(5000);
            console.log(`Succeed to sign in ${sitename}!`);
        }catch (err){
            console.log(`Failed to sign in ${sitename}!\n` + err);
            axios.post(barkURL + `[Sign] Failed to sign in ${sitename}!?isArchive=1`);
            process.exit(1);
        }
*/
    } 

    async function sign_click(page,sitename,cookies,url,timeout,...selectors){ 
        console.log(`Start sign in ${sitename}...`);
        await page.setCookie(...cookies); 
        await page.goto(url,{waitUntil: "networkidle0"});
        //await page.waitForTimeout(timeout);
        try {
            for(let i = 0;i < selectors.length;i++){
                //await page.waitForFunction(`document.querySelector("${selectors[i]}")`);
                await page.waitForSelector(selectors[i]);
                console.log(sitename +  ": i = " + i + '，Succeed to find selector: ' +  selectors[i]);
                await page.waitForTimeout(1000);
                await page.click(selectors[i]);
                await page.waitForTimeout(5000);
            }
            await page.waitForTimeout(5000);
            console.log(`Succeed to sign in ${sitename}!`);
        }catch (err){
            console.log(`Failed to sign in ${sitename}!\n` + err);
            axios.post(barkURL + `[Sign] Failed to sign in ${sitename}!`);
            process.exit(1);
        }
    }

    async function sign_wait(page,sitename,cookies,url,timeout,...selectors){ 
        console.log(`Start sign in ${sitename}...`);
        await page.setCookie(...cookies);
        await page.goto(url,{waitUntil: "networkidle0"});
        //await page.waitForTimeout(timeout);
        for(let i = 1; i <= 3; i++){
            try {
                await page.waitForSelector(selectors[0]);
                console.log(sitename +  ": i = 0，Succeed to find selector: " +  selectors[0]);
                await page.waitForTimeout(1000);
                await page.click(selectors[0]);
                await page.waitForTimeout(20000);
                await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

            }catch (err){
                console.log(`Failed to sign in ${sitename}!\n` + err);
                axios.post(barkURL + `[Sign] Failed to sign in ${sitename}!`);
                process.exit(1);
            }
        }
    }
    
    async function sign_SeHua(page, sitename, cookies, url, ...selectors) {
        console.log(`Start sign in ${sitename}...`);
        await page.setCookie(...cookies);
        await page.goto(url, { waitUntil: "networkidle0" });
        try {

            await page.waitForSelector(selectors[0]);
            console.log(sitename + ": i = " + 0 + '，Succeed to find selector: ' + selectors[0]);
            await page.waitForTimeout(1000);
            const signBtnText = await page.$eval(`${selectors[0]}`, el => el.innerText);
            if (signBtnText == "今日已签到") {
                process.exit(1);
            }
            await page.click(selectors[0]);
            await page.waitForTimeout(5000);
            await page.waitForSelector(selectors[1]);
            console.log(sitename + ": i = " + 1 + '，Succeed to find selector: ' + selectors[1]);
            const verifiText = await page.$eval(`${selectors[1]} + form > span > div > table > tbody > tr > td`, el => el.innerText.match(/\d+ - \d+/));
            const verifyResult = await page.evaluate(`${verifiText[0]}`);
            await page.$eval(`${selectors[1]} + form > span > div > table > tbody > tr > td > input`, (el, re) => {
                return el.value = re;
            }, verifyResult);
            await page.waitForTimeout(5000);
            await page.click(selectors[2]);
            await page.waitForTimeout(5000);
            console.log(`Succeed to sign in $ { sitename }!`);
        } catch (err) {
            console.log(`Failed to sign in $ { sitename }!\n ` + err);
            axios.post(barkURL + ` [Sign] Failed to sign in $ { sitename }!`);
            process.exit(1);
        }
    }
}
