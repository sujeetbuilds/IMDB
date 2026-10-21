import { test,expect} from '@playwright/test';
import fs from 'fs';
import path from 'path';
test.setTimeout(60*60*1000); //1 hour
test('Scrape IMDB’s Top 250 Movies Data',async({page})=>{
    await page.goto('https://www.imdb.com/',{waitUntil:"networkidle"});//{waitUntil:"domcontentloaded"});
    await page.waitForTimeout(30000);
    await page.locator('#imdbHeader-navDrawerOpen').click();
    await page.locator('//span[@role="presentation" and (text()="Top 250 movies")]').click();
    await page.waitForTimeout(10000);
    //List count
    // const rankings = page.locator('[data-testid="title-list-item-ranking"]'); //valid
    // const rankings = page.locator('//div[@data-testid="title-list-item-ranking"]/div[@role="presentation"]'); //valid
    // const rankings = page.locator('//div[@data-testid="title-list-item-ranking"]'); //valid
    const rankings = page.locator('.ipc-metadata-list-summary-item');
    const count = await rankings.count();
    console.log(`RecordCount=${count}`);
    //Extract movie/s details

    //Output folder
    const outputFolder=path.join(path.dirname(process.cwd()),'IMDB_OutputFolder');
    fs.mkdirSync(outputFolder,{recursive: true});

    //csv or txt file
    const csvRows:string[]=[];
    csvRows.push('Rank,MovieName,MovieURL,LaunchYear,WatchTime,ContentRating,MovieRating');

    for(let i=0;i<count;i++){
        // const rank=await rankings.nth(i).locator('xpath=.//div[@role="presentation" and contains(text(),"#")]').innerText();//valid
        const rankLocator=rankings.nth(i).locator('.ipc-signpost__text');//.textContent();
        const rank=await rankLocator.count()>0 ? await rankLocator.textContent():'N/A';
        console.log(`Rank: ${rank}`);
        const movieNameLocator=rankings.nth(i).locator('.ipc-title__text');
        const movieName=await movieNameLocator.count()>0 ? await movieNameLocator.textContent():'N/A';
        console.log(i,movieName);
        const movieHrefLocator=rankings.nth(i).locator('.ipc-title-link-wrapper');
        const movieHref=await movieHrefLocator.count()?await movieHrefLocator.getAttribute('href'):'N/A';
        const movieURL=`https://www.imdb.com${movieHref}`;
        console.log(i,movieURL);
        const launchYearLocator=rankings.nth(i).locator('.ipc-inline-list__item').nth(0);
        const launchYear=await launchYearLocator.count()?await launchYearLocator.textContent():'N/A';
        console.log(launchYear);
        const watchTimeLocator=rankings.nth(i).locator('.ipc-inline-list__item').nth(1);
        const watchTime=await watchTimeLocator.count()?await watchTimeLocator.textContent():'N/A';
        console.log(watchTime);
        const contentRatingLocator=rankings.nth(i).locator('.ipc-inline-list__item').nth(2);
        const contentRating=await contentRatingLocator.count()?await contentRatingLocator.textContent():'N/A';
        console.log(contentRating);
        const movieRatingLocator=rankings.nth(i).locator('.ipc-rating-star--voteCount');
        const movieRating=await movieRatingLocator.count()?await movieRatingLocator.textContent():'N/A';
        console.log(movieRating);

        csvRows.push([
            rank ?? 'null',
            movieName ?? 'null',
            movieURL,
            launchYear ?? '0',
            watchTime ?? 'null',
            contentRating ?? 'null',
            movieRating ?? 'null'
        ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(','));
    }

    const csvPath=path.join(outputFolder,'IMDB_Top_250_Movies.txt');
    //to save file as csv :- path.join(outputFolder,'IMDB_Top_250_Movies.csv');
    fs.writeFileSync(csvPath,csvRows.join('\n'),'utf8');
    await page.waitForTimeout(10000);
});
