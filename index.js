const express = require('express');
const app = express();

const fs = require('fs');
const os = require("os");
const process = require('process');

app.get('/', (req, res) => {
  console.log('Received a request.');

  const files = [
      "/sys/fs/cgroup/memory/memory.usage_in_bytes",
      "/sys/fs/cgroup/memory/memory.limit_in_bytes",
      "/sys/fs/cgroup/cpu/cpuacct.usage",
      "/sys/fs/cgroup/cpu/cpu.shares",
      "/sys/fs/cgroup/cpu/cpu.cfs_quota_us",
      ]

  let cgroup = {};
  for (let f of files) {
    try {
      cgroup[f] = fs.readFileSync(f, 'utf8');
    } catch(e) {
      console.error(`Cannot read cgroup info for `${f}`, e);
    }
  } 

  let memory = {
      freemem: os.freemem(),
      totalmem: os.totalmem(),
      memoryUsage: process.memoryUsage(),
  };

  let cpus = os.cpus();

  let username = os.userInfo().username

  res.send({cgroup, memory, cpus, username});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
