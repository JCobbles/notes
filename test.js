const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['index.js'], {env});

// test('responds to requests', (t) => {
//   t.plan(2);

//   // Wait until the server is ready
//   child.stdout.on('data', _ => {
//     // Make a request to our app
//     request('http://127.0.0.1:5000', (error, response, body) => {
//       // stop the server
//       child.kill();

//       // No error
//       t.false(error);
//       // Successful response
//       t.equal(response.statusCode, 200);
//     });
//   });
// });

test('creates notes', (t) => {
  t.plan(1);

  // Wait until the server is ready
  child.stdout.on('data', _ => {
    request({
      method: 'POST',
      uri: 'http://localhost:3000/api/create',
      body: JSON.stringify({ title: 'Note title', body: 'This is a test note' })
    }, (error, response, body) => {
      child.kill();
      console.log(error);
      t.false(error);
      console.log(response.statusCode);
      console.log(body);
    });
  });
});
