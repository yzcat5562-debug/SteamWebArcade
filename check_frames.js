const http = require('http');
const https = require('https');

const urls = [
  { id: 'bo1-zombies', url: 'https://vel.gg/bo1z' },
  { id: 'moon-zombies', url: 'https://moon-zombies.pages.dev/' },
  { id: 'kino-der-toten', url: 'https://kino-der-toten.pages.dev/' },
  { id: 'bo3-cheese-cube', url: 'https://cheese-cube.pages.dev/' },
  { id: 'bo2', url: 'https://vibeslops.luckeysystems.com/' },
  { id: 'mw2', url: 'https://ovz-game-production.up.railway.app/' },
  { id: 'skate3', url: 'https://skate.aaddpp.lol/' },
  { id: 'skate-rust', url: 'https://global-terror.net/' },
  { id: 'cs-surf', url: 'https://surfd.net/' },
  { id: 'halo-ce', url: 'https://mitchellhynes.com/halo' },
  { id: 'halo-ce-mobile', url: 'https://hcemobile.com/' },
  { id: 'pes6', url: 'https://pes6.optijuegos.net/' },
  { id: 'gta5', url: 'https://web.archive.org/web/20261006055917/https://playgta5.com/' },
  { id: 'gta-vc', url: 'https://joncodeofficial.github.io/gta-vice-city-wasm' },
  { id: 'simpsons', url: 'https://shar-wasm.cjoseph.workers.dev/?skipmovie' },
  { id: 'quake1', url: 'https://q1.pieter.com/' },
  { id: 'quake2', url: 'https://q2.pieter.com/' },
  { id: 'quake3', url: 'https://q3.pieter.com/' },
  { id: 'rtcw', url: 'https://rtcw.pieter.com/' },
  { id: 'ut99', url: 'https://ut.pieter.com/' },
  { id: 'half-life', url: 'https://pixelsuft.github.io/hl/' },
  { id: 'cs16', url: 'https://x8bitrain.github.io/webXash/' },
  { id: 'diablo', url: 'https://johnimril.github.io/diablo_web/' },
  { id: 'hedgewars', url: 'https://webwars.link/' },
  { id: 'wasmarcade', url: 'https://wasmarcade.com/Fan' }
];

async function checkUrl(item) {
  return new Promise((resolve) => {
    const req = https.request(item.url, { method: 'HEAD', timeout: 5000 }, (res) => {
      const xfo = (res.headers['x-frame-options'] || '').toLowerCase();
      const csp = (res.headers['content-security-policy'] || '').toLowerCase();
      
      let blocked = false;
      let reason = '';
      if (xfo === 'deny' || xfo === 'sameorigin') {
        blocked = true;
        reason = 'X-Frame-Options: ' + xfo;
      } else if (csp.includes('frame-ancestors') && !csp.includes('frame-ancestors *')) {
        blocked = true;
        reason = 'CSP frame-ancestors restricts iframing';
      }
      
      resolve({ id: item.id, url: item.url, blocked, reason, status: res.statusCode });
    });
    
    req.on('error', (e) => resolve({ id: item.id, url: item.url, blocked: true, reason: 'Error: ' + e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ id: item.id, url: item.url, blocked: true, reason: 'Timeout' }); });
    req.end();
  });
}

async function run() {
  console.log('Checking URLs...');
  for (const item of urls) {
    const result = await checkUrl(item);
    if (result.blocked) {
      console.log('BLOCKED:', result.id, '->', result.reason);
    } else {
      console.log('OK:', result.id, '-> Status', result.status);
    }
  }
}

run();
