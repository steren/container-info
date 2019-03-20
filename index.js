const express = require('express');
const app = express();

const fs = require('fs');

app.get('/', (req, res) => {
  console.log('Hello world received a request.');

  const files = [
      "/sys/fs/cgroup/memory/memory.usage_in_bytes",
      "/sys/fs/cgroup/memory/memory.limit_in_bytes",
      "/sys/fs/cgroup/cpu/cpuacct.usage",
      "/sys/fs/cgroup/cpu/cpu.shares",
      ]

  let results = {};
  for (let f of files) {
    results[f] = fs.readFileSync(f, 'utf8');
  } 

  res.send(results);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});