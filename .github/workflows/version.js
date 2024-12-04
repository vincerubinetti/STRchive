const { readFileSync, renameSync } = require("fs");
const { lte, valid } = require("semver");
const { parse } = require("yaml");
const { globSync } = require("glob");

module.exports = (glob) => {
  // load and parse file contents
  const { version: newVersion } = parse(
    readFileSync("CITATION.cff").toString()
  );
  const { version: oldVersion } = parse(
    readFileSync("CITATION-previous.cff").toString()
  );

  // check version
  if (!valid(newVersion)) throw Error("Version not valid");
  if (lte(newVersion, oldVersion)) return;

  // add version to artifact filenames
  for (const artifact of globSync(glob)) renameSync(artifact, artifact);

  return version;
};
