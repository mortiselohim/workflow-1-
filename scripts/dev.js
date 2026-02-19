const { spawn } = require('node:child_process');

function run(name, cmd, args, cwd) {
  const child = spawn(cmd, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
  });
  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`[${name}] exited with code ${code}`);
    }
  });
  return child;
}

const procs = [
  run('backend', 'npm', ['run', 'start:dev'], 'backend'),
  run('admin', 'npm', ['run', 'dev'], 'admin_web'),
];

function shutdown(signal) {
  for (const p of procs) {
    try {
      p.kill(signal);
    } catch (_) {}
  }
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
