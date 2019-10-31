// eslint-disable-next-line import/no-extraneous-dependencies
import { publish } from 'gh-pages';

publish('dist', {
  branch: 'deploy',
  repo: 'git@github.com:EugeneFenko/JS-Band-Internship.git',
}, (err) => {
  if (err === undefined) {
    console.log('Success!');
  } else console.log(`Err: ${err}`);
});
