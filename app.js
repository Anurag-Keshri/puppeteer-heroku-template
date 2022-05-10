const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());


const USER_AGENT = 'Mozilla/5.0 (SymbianOS 9.4; Series60/5.0 NokiaN97-1/10.0.012; Profile/MIDP-2.1 Configuration/CLDC-1.1; en-us) AppleWebKit/525 (KHTML, like Gecko) WicKed/7.1.12344';
// get new user_agent if this fails
// const randomUseragent = require('random-useragent');

module.exports = async function () {
    const t1 = new Date().getTime();
    const browser = await puppeteer.launch(
        {
            headless: true,
            // executablePath: process.env.CHROME_BIN || null, 
            args: [
                '--enable-features=NetworkService',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                "--single-process",
                "--no-zygote"
            ],
            ignoreHTTPSErrors: true,
            dumpio: false
        }
    );
    console.log('Puppeteer started');
    const page = await browser.newPage();
    const UA = USER_AGENT;

    // //Randomize viewport size
    // await page.setViewport({
    //     width: 1920 + Math.floor(Math.random() * 100),
    //     height: 3000 + Math.floor(Math.random() * 100),
    //     deviceScaleFactor: 1,
    //     hasTouch: false,
    //     isLandscape: false,
    //     isMobile: false,
    // });

    await page.setUserAgent(UA);
    await page.setJavaScriptEnabled(true);
    await page.setDefaultNavigationTimeout(0);

    // await page.goto('https://www.youtube.com/', { waitUntil: 'networkidle2' });
    await page.goto('https://bitport.io/new-account');
    await page.waitForSelector('#frm-signUpForm-email');
    const imgPath = `screenshot_google.png`;
    await page.screenshot({ path: `public/${imgPath}` });

    browser.close().then(() => {
        console.log('Puppeteer closed');
    }).catch((error) => {
        console.error('Error closing puppeteer');
        console.error(error);
    });

    const t2 = new Date().getTime();
    console.log(`Total time: puppeteer: ${t2-t1}`);
    return imgPath;
}