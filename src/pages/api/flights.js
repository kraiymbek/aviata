const flightData = require('../../../public/flightData.json');

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    //   return res.status(201).send('');
    // }

    return res.status(403).send('');
  }

  return res.status(404).send('');
};
