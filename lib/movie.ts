const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    const url = `https://www1.xmovies8.stream/search?keyword=${encodeURIComponent(keyword)}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let movies = [];
    $('.item').each((index, element) => {
      const title = $(element).find('.title').text().trim();
      const link = $(element).find('a').attr('href');
      const image = $(element).find('img').attr('src');

      movies.push({ title, link, image });
    });

    return res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to scrape the website' });
  }
};
