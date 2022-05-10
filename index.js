const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = require(`${__dirname}/app.js`);

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', main)
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

async function main(req, res) {
  try {
    const result = await app();
    res.render('index', {imgPath: result});
  } catch (error) {
    console.error(error);
    res.send(error);
  }
}