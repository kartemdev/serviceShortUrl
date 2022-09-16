require('dotenv')
const express = require('express');
const cors = require('cors');
const { shorturl, user } = require('./db/models');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());

async function urlCutter() {
  const arrEN = ['A', 'B', '2', 'C', 'D', '4', 'E', 'F', '6', 'G', 'H', 'I', '7', 'J', 'K', 'L', 'M', '8',
    'N', '1', 'O', 'P', 'Q', 'R', '3', 'S', 'T', 'U', '9', 'V', 'W', 'X', 'Y', '5', 'Z'];

  let url = '';

  for (let i = 0; i <= 4; i += 1) {
    const randomIndex = Math.round(Math.random() * (arrEN.length - 1));
    console.log(randomIndex, arrEN[randomIndex]);
    url += arrEN[randomIndex];
  }

  const shortUrlCheck = await shorturl.findOne({ where: { shortUrl: url } });

  if (shortUrlCheck) {
    urlCutter();
  }
  console.log(url);
  return url;
}

app.post('/urls/register', async (req, res) => {
  try {
    await user.create({
      name: req.body.user
    });
    res.sendStatus(200);
  } catch (error) {
    console.log('error register --->', error);
  }
});

app.get('/urls/:user', (async (req, res) => {
  try {
    console.log(req.params);
    const name = await user.findOne({ where: { name: req.params.user } });
    console.log(name);
    const urls = await shorturl.findAll({ where: { userId: name.id } });
    res.json(urls);
  } catch (error) {
    console.log('error get data(urls) --->', error);
  }
}));

app.get('/s/:shortUrl', async (req, res) => {
  try {
    const link = req.params.shortUrl;
    const obj = await shorturl.findOne({ where: { shortUrl: link } });
    res.redirect(obj.longUrl);
  } catch (error) {
    console.log('error redirect --->', error);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'client/build/index.html'));
});

app.listen(PORT, () => console.log('server started'));
