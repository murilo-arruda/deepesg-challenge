// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name } = JSON.parse(req.body);
    const key = process.env.HG_API_KEY; // SET ENV VAR
    const url = `https://api.hgbrasil.com/weather?key=${key}&city_name=${name}`;
    fetch(encodeURI(url))
      .then(async data => {
        if (data.status === 403) {
          res.statusCode = 403;
          res.json({
            message: 'API da HGBrasil atingiu o limite de requisições diárias.',
          });
        } else {
          const { results } = await data.json();
          const { humidity, wind_speedy, temp, city_name } = results;

          res.statusCode = 200;
          res.json({
            name,
            wind: wind_speedy,
            temp,
            humidity,
          });
        }
      })
      .catch(error => console.log(error));
  } else {
    res.statusCode = 500;
    res.json({ message: 'unsuported method' });
  }
};
