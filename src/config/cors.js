const cors = require('cors');
const { zonedTimeToUtc } = require('date-fns-tz');
const whitelist = [];

const corsOptionsDelegate = (req, callback) => {
  const origin = req.header('Origin');
  var isDomainAllowed = whitelist.includes(origin);

  if (process.env.APP_BASE === 'dev') {
    isDomainAllowed = true;
  }

  if (isDomainAllowed || isTokenValid) {
    callback(null, { origin: true }); // Permite a origem se estiver na whitelist ou se o token for válido
  } else {
    callback(new Error('Not allowed by CORS'), { origin: false }); // Rejeita se não estiver na whitelist e o token estiver errado
  }
};

module.exports = cors(corsOptionsDelegate);
