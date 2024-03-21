const NodeCache = require('node-cache');
const cache = new NodeCache();

// module.exports = duration => (req, res, next) => {
//   if (req.method !== 'GET') {
//     console.error('Cannot cache npn-GET methods!');
//     return next();
//   }
//   const key = req.originalUrl;
//   const cachedResponse = cache.get(key);

//   if(cachedResponse) {
//     console.log(`cache hit for ${key}`);
//     res.send(cachedResponse);
//   } else {
//     console.log(`cache miss for ${key}`);
//     res.originalSend = res.send;
//     res.send = body => {
//       res.originalSend(body);
//       cache.set(key, body, duration);
//     };
//     next();
//   }
// };

module.exports = duration => (req, res, next) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const key = req.originalUrl.split('?')[0]; // Remove query parameters from the cache key
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    console.log(`Cache hit for ${key}`);
    return res.send(cachedResponse);
  }

  console.log(`Cache miss for ${key}`);
  
  const originalSend = res.send;
  res.send = body => {
    originalSend.call(res, body);
    cache.set(key, body, duration);
  };
  
  next();
};
