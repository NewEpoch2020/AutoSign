autoSign();

async function autoSign(){
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());
    const axios = require('axios');
    const barkURL = "https://www.hidjnuiot78945huoridfngjkfnhf.xyz/J8AAL9oQYfySSKjgUSNQ9i/"
    
    const cookies_Sehuatang = process.env.SEHUATANG_COOKIES;

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
