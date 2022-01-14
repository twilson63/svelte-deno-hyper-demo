const p = Deno.run({
  cmd: [
    'deno',
    'run',
    '--allow-net',
    '--allow-read',
    '--allow-env',
    '--import-map=import_map.json',
    '--unstable',
    '--no-check=remote',
    'server.js'
  ],
  stdout: 'piped',
  stderr: 'piped'
})

const { code } = p.status()

// Reading the outputs closes their pipes
const rawOutput = await p.output();
const rawError = await p.stderrOutput();

if (code === 0) {
  await Deno.stdout.write(rawOutput);
} else {
  const errorString = new TextDecoder().decode(rawError);
  console.log(errorString);
}

Deno.exit(code);