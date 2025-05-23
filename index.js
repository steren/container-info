#!/usr/bin/env node

const express = require('express');
const app = express();

const fs = require('node:fs');
const os = require("node:os");
const v8 = require("node:v8");
const process = require('node:process');

function handle(signal) {
  console.log(`Received signal ${signal}`);
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);

function getInfo() {
  const files = [
    "/sys/fs/cgroup/memory/memory.usage_in_bytes",
    "/sys/fs/cgroup/memory/memory.limit_in_bytes",
    "/sys/fs/cgroup/cpu/cpuacct.usage",
    "/sys/fs/cgroup/cpu/cpu.shares",
    "/sys/fs/cgroup/cpu/cpu.cfs_quota_us",
    "/sys/fs/cgroup/cpu/cpu.cfs_period_us",
    ]

  let cgroup = {};
  for (let f of files) {
    try {
      cgroup[f] = fs.readFileSync(f, 'utf8');
    } catch(e) {
      console.error(`Cannot read cgroup info for ${f}`, e);
    }
  } 

  let memory = {
      freemem: os.freemem(),
      totalmem: os.totalmem(),
      memoryUsage: process.memoryUsage(),
  };

  let cpus = os.cpus();
  let availableParallelism = os.availableParallelism();

  let username = os.userInfo().username

  let product_name;
  try {
    product_name = fs.readFileSync('/sys/class/dmi/id/product_name', 'utf8');
  } catch(e) {
    console.error(`Cannot read /sys/class/dmi/id/product_name`, e);
  }

  let env = process.env;

  let heapinfo = v8.getHeapStatistics();

  let pid = process.pid;

  return {cgroup, memory, heapinfo, cpus, username, product_name, env, availableParallelism, pid};
}

app.get('/', (req, res) => {
  console.log('Received a request.');
  res.send(getInfo());
});

console.log("Container info:");
console.log(getInfo());

console.log("Starting server");
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening on port', port);
});
