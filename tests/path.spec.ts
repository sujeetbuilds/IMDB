import path from 'path';

const currentDirectory=process.cwd();
console.log(`currentDirectory: ${currentDirectory}`);
const parentDirectory=path.dirname(currentDirectory);
console.log(`parentDirectory: ${parentDirectory}`);
const grandParentDirectory=path.dirname(parentDirectory);
console.log(`grandParentDirectory: ${grandParentDirectory}`);

    //csv or txt file
    const csvRows:string[]=[];
    csvRows.push('Rank,MovieName,MovieURL,LaunchYear,WatchTime,ContentRating,MovieRating');
    console.log(csvRows[0]);