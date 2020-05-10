const fs = require('fs-extra');

fs.remove('dist/chapters/', err => {
  if (err) return console.error(err);

  console.log('Deleted intermediary chapters folder');
});

fs.remove('dist/_styles/style.css.map', err => {
  if (err) return console.error(err);

  console.log('Deleted CSS sourcemap');
});