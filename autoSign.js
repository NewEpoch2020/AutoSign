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
        //zodgame(),  //还没完成
        //sketchupbar()
        //pojie52()
        //bilibili()
    ])

    await browser.close();

    async function sehuatang(){
        console.log("Start sign in sehuatang...");
        const page_sehuatang = await browser.newPage();
        await page_sehuatang.setCookie(...cookies_Sehuatang); //可变长度参数就是一个数组   
        await page_sehuatang.goto('https://www.sehuatang.org/');

        try {
            await page_sehuatang.waitForSelector('#um > p:nth-child(2) > strong > a')
            console.log("Succeed to sign in sehuatang!");
        }catch (err){
            console.log("Failed to sign in sehuatang!");
            axios.post(barkURL + '[Sign] Failed to sign in sehuatang!');
        }
    }
    
    async function zodgame(){
        console.log("Start sign in zodgame...");
        const page_zodgame = await browser.newPage(); 
        await page_zodgame.setCookie(...cookies_zodgame); //可变长度参数就是一个数组
        await page_zodgame.goto('https://zodgame.xyz/plugin.php?id=dsu_paulsign:sign');

        try {
            await page_zodgame.waitForSelector('#um > p:nth-child(3) > strong > a');
            await page_zodgame.click(); //心情图片
            await page.waitForTimeout(1000);
            await page_zodgame.click(); //签到
            console.log("Succeed to sign in zodgame!");
        }catch (err){
            console.log("Failed to sign in zodgame!");
            axios.post(barkURL + '[Sign] Failed to sign in zodgame!');
        }
    }

    async function sketchupbar(){
        console.log("Start sign in sketchupbar...");
        const page_sketchupbar = await browser.newPage(); 
        await page_sketchupbar.setCookie(...cookies_sketchupbar); //可变长度参数就是一个数组
        await page_sketchupbar.goto('https://www.sketchupbar.com/sign.php?mod=sign');

        try {
            await page_sketchupbar.waitForSelector('#JD_sign');
            await page_sketchupbar.click('#JD_sign');
            console.log("Succeed to sign in sketchupbar!");
        }catch (err){
            console.log("Failed to sign in sketchupbar!");
            axios.post(barkURL + '[Sign] Failed to sign in sketchupbar!');
        }
    }

    async function pojie52(){
        console.log("Start sign in pojie52...");
        const page_pojie52 = await browser.newPage(); 
        await page_pojie52.setCookie(...cookies_pojie52); //可变长度参数就是一个数组
        await page_pojie52.goto('https://www.52pojie.cn/');

        try {
            await page_pojie52.waitForSelector('#um > p:nth-child(2) > strong > a');
            await page_pojie52.click('#um > p:nth-child(3) > a:nth-child(1) > img');
            console.log("Succeed to sign in pojie52!");
        }catch (err){
            console.log("Failed to sign in pojie52!");
            axios.post(barkURL + '[Sign] Failed to sign in pojie52!');
        }
    }
    
    async function bilibili(){
        console.log("Start sign in bilibili...");
        const page_bilibili = await browser.newPage(); 
        await page_bilibili.setCookie(...cookies_bilibili); //可变长度参数就是一个数组
        await page_bilibili.goto('https://account.bilibili.com/account/home');

        try {
            await page_bilibili.waitForSelector('#ser-ul > li.security-list.on');
            console.log("Succeed to sign in bilibili!");
        }catch (err){
            console.log("Failed to sign in bilibili!");
            axios.post(barkURL + '[Sign] Failed to sign in bilibili!');
        }
    }
}
