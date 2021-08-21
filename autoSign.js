autoSign();

async function autoSign(){
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());
    const axios = require('axios');
    
    //别忘了workflow里设置环境变量
    const barkURL = process.env.BARK_URL;  
    const cookies_Sehuatang = eval(process.env.SEHUATANG_COOKIES);
    const cookies_zodgame = eval(process.env.ZODGAME_COOKIES);
    const cookies_sketchupbar = eval(process.env.SKETCHUPBAR_COOKIES);
    const cookies_pojie52 = eval(process.env.POJIE52_COOKIES);
    const cookies_bilibili = eval(process.env.BILIBILI_COOKIES); 

    const browser = await puppeteer.launch({
        headless: true //必须设置为无头模式
    });
    await Promise.all([ //没有顺序的概念
        sehuatang(),
        zodgame(),  
        sketchupbar(),
        pojie52(),
        bilibili(),
    ]);
    await browser.close();
    
    async function sehuatang(){
        const sitename = "sehuatang";
        const url = "https://www.sehuatang.org/home.php?mod=spacecp&ac=credit&showcredit=1";
        const selector = "#um > p:nth-child(2) > strong > a";
        await sign_justlogin(sitename,cookies_Sehuatang,url,selector);
    }
    
    async function sketchupbar(){
        const sitename = "sketchupbar";
        const url = "https://www.sketchupbar.com/sign.php?mod=sign";
        const selector = "#JD_sign";
        await sign_click_1(sitename,cookies_sketchupbar,url,selector);
    }

    async function pojie52(){
        const sitename = "52pojie";
        const url = "https://www.52pojie.cn/";
        const selector = "#um > p:nth-child(3) > a:nth-child(1) > img";
        await sign_click_1(sitename,cookies_pojie52,url,selector);
    }

    async function zodgame(){
        const sitename = "zodgame";
        const url = "https://zodgame.xyz/plugin.php?id=dsu_paulsign:sign";
        const selector1 = "#wl > center > img";
        const selector2 = "#qiandao > table > tbody > tr > td > div > a > img";
        await sign_click_2(sitename,cookies_zodgame,url,selector1,selector2);
    }
    
//------------------------------------------------------------------------------//
    
    async function sign_justlogin(sitename,cookies,url,selector_flag){
        console.log(`Start sign in ${sitename}...`);
        const page = await browser.newPage();
        await page.setCookie(...cookies); //可变长度参数就是一个数组   
        await page.goto(url);
        try {
            await page.waitForSelector(selector_flag);
            console.log(`Succeed to sign in ${sitename}!`);
        }catch (err){
            console.log(`Failed to sign in ${sitename}!\n` + err);
            axios.post(barkURL + `[Sign] Failed to sign in ${sitename}!?isArchive=1`);
        }
    }

    async function sign_click_1(sitename,cookies,url,selector_click){
        console.log(`Start sign in ${sitename}...`);
        const page = await browser.newPage();
        await page.setCookie(...cookies); //可变长度参数就是一个数组   
        await page.goto(url);
        try {
            await page.waitForSelector(selector_click);
            await page.click(selector_click);
            await page.waitForTimeout(5000);
            console.log(`Succeed to sign in ${sitename}!`);
        }catch (err){
            console.log(`Failed to sign in ${sitename}!\n` + err);
            axios.post(barkURL + `[Sign] Failed to sign in ${sitename}!?isArchive=1`);
        }
    }

    async function sign_click_2(sitename,cookies,url,selector1,selector2){
        console.log(`Start sign in ${sitename}...`);
        const page = await browser.newPage();
        await page.setCookie(...cookies); //可变长度参数就是一个数组   
        await page.goto(url);
        try {
            await page.waitForSelector(selector1);
            await page.click(selector1);
            await page.waitForTimeout(1000);
            await page.click(selector2);
            await page.waitForTimeout(5000);
            console.log(`Succeed to sign in ${sitename}!`);
        }catch (err){
            console.log(`Failed to sign in ${sitename}!\n` + err);
            axios.post(barkURL + `[Sign] Failed to sign in ${sitename}!?isArchive=1`);
        }
    }

}
