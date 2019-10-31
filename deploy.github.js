/* eslint-disable import/no-extraneous-dependencies */
const gh = require('gh-pages');

gh.publish('dist', {
  branch: 'deploy',
  repo: 'git@github.com:EugeneFenko/JS-Band-Internship.git',
}, (err) => {
  if (err === undefined) {
    console.log('Success!');
  } else console.log(`Err: ${err}`);
});
