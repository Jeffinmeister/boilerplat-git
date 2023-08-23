
const axios = require('axios');
const zlib = require('zlib');


axios({
  method: 'get',
  url: url,
  responseType: 'stream'
})
.then(response => {
  const unzip = zlib.createGunzip();
  response.data.pipe(unzip);

  let jsonData = '';

  unzip.on('data', chunk => {
    jsonData += chunk.toString('utf8');  // Convert the chunk to a string using 'utf8'
  });

  unzip.on('end', () => {
    console.log('File downloaded and extracted successfully.');

    try {
      // Assuming each line is a JSON object, split by newline character
      const jsonLines = jsonData.split('\n');
      const formattedData = jsonLines.map(line => {
        try {
          return JSON.parse(line);
        } catch (error) {
          console.error('Error parsing JSON line:', error);
          return null;  // Handle parsing errors gracefully
        }
      }).filter(item => item !== null);

      console.log('Formatted JSON data:');
      console.log(formattedData[0]);

      // You can perform further processing on formattedData here
    } catch (error) {
      console.error('Error processing JSON data:', error);
    }
  });
})
.catch(error => {
  console.error('Error downloading the file:', error);
});
