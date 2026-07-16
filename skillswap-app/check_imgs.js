const fs = require('fs');
const content = fs.readFileSync('src/pages/LandingPage.jsx', 'utf8');
const urls = content.match(/https:\/\/images.unsplash.com\/[^"']+/g);
const http = require('https');

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({url, status: res.statusCode});
    }).on('error', (e) => resolve({url, status: 'error', error: e.message}));
  });
}

(async () => {
  if (!urls) {
    console.log("No URLs found");
    return;
  }
  for(let url of urls) {
    const res = await checkUrl(url);
    console.log(res.status, url);
  }
})();
