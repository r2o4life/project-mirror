const http = require('http');

const PORT = 3000;
const HOST = '127.0.0.1';

const routes = [
  '/',
  '/dashboard',
  '/benchmarks',
  '/matchmaking',
  '/spawn',
  '/explore/benchmarks',
  '/explore/governance',
  '/explore/matchmaking',
  '/explore/spawn'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://${HOST}:${PORT}${route}`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, route, status: res.statusCode });
        } else {
          // If there's an error, try to extract the React digest error if possible
          const errorMatch = data.match(/Event handlers cannot be passed to Client Component props/);
          resolve({ 
            success: false, 
            route, 
            status: res.statusCode, 
            error: errorMatch ? 'Event handler React error' : `HTTP ${res.statusCode}` 
          });
        }
      });
    }).on('error', (err) => {
      resolve({ success: false, route, status: 'NETWORK_ERROR', error: err.message });
    });
  });
}

async function runTests() {
  console.log('Running Ingress Point Tests...\n');
  let hasErrors = false;
  let passed = 0;
  
  for (const route of routes) {
    const result = await checkRoute(route);
    if (result.success) {
      console.log(`✅ PASS: ${result.route} (Status: ${result.status})`);
      passed++;
    } else {
      console.log(`❌ FAIL: ${result.route} (Status: ${result.status}) - ${result.error}`);
      hasErrors = true;
    }
  }

  console.log(`\nTest Summary: ${passed}/${routes.length} routes passed.`);
  if (hasErrors) {
    console.error('Some navigation parameters or ingress points failed.');
    process.exit(1);
  } else {
    console.log('All navigational parameters are actively reliable.');
    process.exit(0);
  }
}

runTests();
