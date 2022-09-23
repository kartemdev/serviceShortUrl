require('dotenv')
const express = require('express');
const cors = require('cors');
const { shorturl, user } = require('./db/models');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require('sequelize');

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
  return url;
}

app.post('/urls/login', async (req, res) => {
  try {
    const userCheck = await user.findOne({ where: { name: req.body.username } });
    if (!userCheck) {
      return res.status(404).json({ message: 'User not found' })
    }
    const checkPass = bcrypt.compareSync(req.body.password, userCheck.password)
    if (!checkPass) {
      return res.status(400).json({ message: 'invalid password' })
    }
    const token = jwt.sign({ id: userCheck.id }, 'mern-secret-key', {expiresIn: "1m"})
    return res.status(200).json({userName: userCheck.name, token: token})
  } catch (error) {
    console.log('error login --->', error);
    return res.json({ message: 'server error' })
  }
})

app.post('/urls/register', async (req, res) => {
  try {
    const userCheck = await user.findOne({ where: { name: req.body.username } });
    if (!userCheck) {
      const hashPassword = await bcrypt.hash(req.body.password, 4)
      await user.create({
        name: req.body.username,
        password: hashPassword,
      });
      return res.status(200).json({ message: 'user sign up' });
    } 
      return res.status(400).json({ message: 'user already sign up' });
  } catch (error) {
    console.log('error register --->', error);
    return res.json({ message: 'server error' });
  }
});

app.get('/urls/:user', (async (req, res) => {
  console.log('------>', req.body);
  try {
    console.log(req.params);
    const name = await user.findOne({ where: { name: req.params.user } });
    console.log(name);
    const urls = await shorturl.findAll({ where: { userId: name.id } });
    return res.json(urls);
  } catch (error) {
    console.log('error get data(urls) --->', error);
    return res.json({ message: 'server error' })
  }
}));

app.get('/s/:shortUrl', async (req, res) => {
  try {
    const link = req.params.shortUrl;
    const obj = await shorturl.findOne({ where: { shortUrl: link } });
    return res.redirect(obj.longUrl);
  } catch (error) {
    console.log('error redirect --->', error);
    return res.json({ message: 'server error' })
  }
});

app.post('/urls/s', async (req, res) => {
  try {
    const { username, url } = req.body;
    const short = await urlCutter(url);
    const userCheck = await user.findOne({ where: { name: username } });
    const shortUrl = await shorturl.create({ userId: userCheck.id, longUrl: url, shortUrl: short })
    return res.json(shortUrl);
  } catch (error) {
    console.log('error create shortUrl --->', error);
    return res.json('server error');
  }
})

app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname,'client/build/index.html'));
});

app.listen(PORT, () => console.log('server started', PORT));
