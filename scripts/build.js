const path = require("path");
const execa = require("execa");
const fs = require('fs-extra');

async function main() {
  const moduleType = process.argv[2];
  const argv = process.argv.slice(3);

  console.log(`Building ${moduleType} projects...`);

  const packagesDir = path.resolve(__dirname, "..", "packages");

  const packagesDirContents = await fs.readdir(packagesDir);
  const tsProjectPaths = packagesDirContents
    .map(name => path.resolve(packagesDir, name, `tsconfig.${moduleType}.json`))
    .filter(absolutePath => fs.existsSync(path.resolve(absolutePath)));

  const tscPath = path.resolve(__dirname, "..", "node_modules", ".bin", "tsc");

  const args = [
    "-b",
    ...tsProjectPaths,
    ...argv
  ];

  await execa(tscPath, args, {stdio: 'inherit'});

  console.log("Done!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
