const Fs = require("fs");
const Path = require("path");
const Sass = require("node-sass");
const srcPath = Path.resolve("src").toString();

const getComponents = () => {
  let allComponents = [];
  const types = ["atoms", "molecules", "organisms"];

  types.forEach((type) => {
    const allFiles = Fs.readdirSync(`src/${type}`).map((file) => {
      return {
        input: Path.resolve(`src/${type}`, file),
        minOutput: `${file.slice(0, -4)}min.css`,
        output: `${file.slice(0, -4)}css`,
      };
    });

    allComponents = [...allComponents, ...allFiles];
  });

  return allComponents;
};

const compile = (filePath, fileName, isMinified = false) => {
  const result = Sass.renderSync({
    data: Fs.readFileSync(Path.resolve(filePath)).toString(),
    outputStyle: isMinified ? "compressed" : "expanded",
    outFile: fileName,
    includePaths: [srcPath],
  }).css.toString();
  Fs.writeFileSync(Path.resolve("lib/" + fileName), result);
};

try {
  Fs.mkdirSync(Path.resolve("lib"));
} catch (e) {
  // If Already File Exists, Not Working
}

// Global
compile("src/global.scss", "global.css");
compile("src/global.scss", "global.min.css", true);

getComponents().forEach((component) => {
  compile(component.input, component.output);
  compile(component.input, component.minOutput, true);
});
