const fs = require("fs");
const path = require("path");

// Read the parameter names
const paramsPath = path.join(__dirname, "params.json");
const params = JSON.parse(fs.readFileSync(paramsPath, "utf8"));

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, "converted_presets");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Process each preset file in the bass directory
const bassDir = path.join(__dirname, "bass");
const presetFiles = fs
  .readdirSync(bassDir)
  .filter((file) => file.endsWith(".json"));

presetFiles.forEach((presetFile) => {
  const presetPath = path.join(bassDir, presetFile);
  const presetData = JSON.parse(fs.readFileSync(presetPath, "utf8"));

  // Create an object with parameter names and values
  const convertedPreset = {};
  Object.entries(params).forEach(([paramName, _], index) => {
    const paramIndex = (index + 1).toString();
    if (presetData[paramIndex] !== undefined) {
      convertedPreset[paramName] = presetData[paramIndex];
    }
  });

  // Save the converted preset
  const outputPath = path.join(outputDir, presetFile);
  fs.writeFileSync(outputPath, JSON.stringify(convertedPreset, null, 2));
  console.log(`Converted ${presetFile} successfully`);
});
