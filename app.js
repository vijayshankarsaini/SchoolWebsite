const express = require('express');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(ejsLayouts); // Use layouts
app.set('layout', 'layout'); // default layout file
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const loadContent = async (path) => {
  return fs.readJson(path);
};

app.get('/', async (req, res) => {
  const layout = await loadContent('./data/layout.json');
  const index = await loadContent('./data/index.json');
  res.render('index', { _layout: layout, _index: index });
});

app.get('/admission', async (req, res) => {
  const layout = await loadContent('./data/layout.json');
  res.render('admission', {_layout: layout });
});

app.get('/gallery', async (req, res) => {
  const layout = await loadContent('./data/layout.json');
  const gallery = await loadContent('./data/gallery.json');
  res.render('gallery', {_layout: layout, _gallery: gallery });
});

app.get('/result', async (req, res) => {
  const layout = await loadContent('./data/layout.json');
  const result = await loadContent('./data/result.json');
  res.render('result', {_layout: layout, _result: result });
});

app.get('/teacher', async (req, res) => {
  const layout = await loadContent('./data/layout.json');
  const teacher = await loadContent('./data/teacher.json');
  res.render('teacher', {_layout: layout, _teacher: teacher });
});

app.get('/testimonial', async (req, res) => {
  const layout = await loadContent('./data/layout.json');
  const testimonial = await loadContent('./data/testimonial.json');
  res.render('testimonial', {_layout: layout, _testimonial: testimonial });
});

app.get('/alumni', async (req, res) => {
  const layout = await loadContent('./data/layout.json');
  const alumni = await loadContent('./data/alumni.json');
  res.render('alumni', {_layout: layout, _alumni: alumni });
});

app.get('/about', async (req, res) => {
  const layout = await loadContent('./data/layout.json');
  const about = await loadContent('./data/about.json');
  res.render('about', { _layout: layout, _about: about });
});

app.get('/contact', async (req, res) => {
  const layout = await loadContent('./data/layout.json');
  const contact = await loadContent('./data/contact.json');
  res.render('contact', {_layout: layout, _contact: contact });
});

app.post('/contact', (req, res) => {
  const formData = req.body;
  fs.appendFile('contact_submissions.txt', JSON.stringify(formData) + '\n');
  res.send("Thank you for contacting us!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
