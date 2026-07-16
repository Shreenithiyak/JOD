const http = require('https');

const urls = [
  "https://images.unsplash.com/photo-1540039155733-d7696d4eb98e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1533227260815-92b24bdcb2f1?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({url, status: res.statusCode});
    }).on('error', (e) => resolve({url, status: 'error', error: e.message}));
  });
}

(async () => {
  for(let url of urls) {
    const res = await checkUrl(url);
    console.log(res.status, url);
  }
})();
