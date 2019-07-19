const path = require("path");
const fs = require('fs-extra');

const templateReplacementFiles = ["README.md", "package.json"];

const help = `Usage:
  create-package <template-name> <package-name>

Example:
  create-package library three-particle-emitter
`;

async function main() {
  const argv = process.argv.slice(2);

  if (argv.length < 2) {
    console.log(help);
    return;
  }

  const templateName = argv[0];
  const packageName = argv[1];

  const templatePath = path.resolve(__dirname, "..", "templates", templateName);
  const packagePath = path.resolve(__dirname, "..", "packages", packageName);

  console.log(`Copying "${templatePath}" to "${packagePath}"`);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template "${templateName}" does not exist.`);
  }

  if (fs.existsSync(packagePath)) {
    throw new Error(`Package "${packageName}" already exists.`);
  }

  await fs.copy(templatePath, packagePath, { overwrite: false, errorOnExist: true });

  for (const relativeFilePath of templateReplacementFiles) {
    const absoluteFilePath = path.resolve(packagePath, relativeFilePath);

    if (fs.existsSync(absoluteFilePath)) {
      let buffer = await fs.readFile(absoluteFilePath);
      let fileText = buffer.toString("utf8");
      fileText = fileText.replace(/\{package-name\}/g, packageName);
      await fs.writeFile(absoluteFilePath, fileText, "utf8");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });