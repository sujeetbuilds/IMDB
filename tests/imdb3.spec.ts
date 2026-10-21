import { test,expect} from "@playwright/test";
// test.setTimeout(210000);
test('Scrape IMDB',async({page})=>{
    await page.goto('https://www.imdb.com/',{waitUntil:"networkidle"});//{waitUntil:"domcontentloaded"});
    type movieList={
        rank: string,
        movieName: string,
        launchYear: number,
        watchTime: string,
        contentRating: string,
        movieRating: string
    }
    await page.waitForTimeout(30000);
    await page.locator('#imdbHeader-navDrawerOpen').click();
    await page.locator('//span[@role="presentation" and (text()="Top 250 movies")]').click();
    
})