const axios = require('axios');
const fs = require('fs');
const zlib = require('zlib');

const outputPath = 'output.json';

axios({
  method: 'get',
  url: url,
  responseType: 'stream'
})
.then(response => {
  const unzip = zlib.createGunzip();
  const writeStream = fs.createWriteStream(outputPath);

  response.data.pipe(unzip).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('File downloaded and extracted successfully.');

    // Now you can read the JSON file and work with its data
    const jsonData = require(`${outputPath}`);
    const formattedData = Array.isArray(jsonData) ? jsonData : [jsonData];

    console.log(formattedData);

    // You can also perform further processing on jsonData here
  });

  writeStream.on('error', error => {
    console.error('Error writing to file:', error);
  });
})
.catch(error => {
  console.error('Error downloading the file:', error);
});
