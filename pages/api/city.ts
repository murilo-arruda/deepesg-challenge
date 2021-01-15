// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name } = JSON.parse(req.body);

    const key = 'b7966082'; // SET ENV VAR
    // Fetch from the HG API City
    const url = `https://api.hgbrasil.com/weather?key=${key}&city_name=${name}`;
    fetch(encodeURI(url))
      .then(async data => {
        const { results } = await data.json();
        const { humidity, wind_speedy, temp, city_name } = results;

        console.log(humidity, wind_speedy, temp, city_name);
        res.statusCode = 200;
        res.json({
          name: city_name,
          wind: wind_speedy,
          temp,
          humidity,
        });
      })
      .catch(error => console.log(error));
  } else {
    res.statusCode = 500;
    res.json({ message: 'unsuported method' });
  }
};
