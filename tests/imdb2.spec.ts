import { test,expect} from "@playwright/test";
test.setTimeout(210000);
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
    const movieListArrar:movieList[]=[];
    await page.waitForTimeout(10000);
    //List count
    // const rankings = page.locator('[data-testid="title-list-item-ranking"]'); //valid
    // const rankings = page.locator('//div[@data-testid="title-list-item-ranking"]/div[@role="presentation"]'); //valid
    // const rankings = page.locator('//div[@data-testid="title-list-item-ranking"]'); //valid
    const rankings = page.locator('//ul[@role="presentation"]//li');
    const count = await rankings.count();
    console.log(`RecordCount=${count}`);
    // Extract movie/s details
    for(let i=0;i<count;i++){
        // const rank=await rankings.nth(i).locator('xpath=.//div[@role="presentation" and contains(text(),"#")]').innerText();//valid
        const rank=await rankings.nth(i).locator('xpath=.//div[@role="presentation" and contains(text(),"#")]').innerText();
        console.log(`Rank: ${rank}`);
        // const movieName=await rankings.nth(i).locator('.ipc-title__text').textContent();
        // console.log(i,movieName);
        // const launchYear=await rankings.nth(i).locator('.ipc-inline-list__item').nth(0).textContent();
        // console.log(launchYear);
        // const watchTime=await rankings.nth(i).locator('.ipc-inline-list__item').nth(1).textContent();
        // console.log(watchTime);
        // const contentRating=await rankings.nth(i).locator('.ipc-inline-list__item').nth(2).textContent();
        // console.log(contentRating);
        // const movieRating=await rankings.nth(i).locator('.ipc-rating-star--voteCount').textContent();
        // console.log(movieRating);
    }

    await page.waitForTimeout(10000);
})