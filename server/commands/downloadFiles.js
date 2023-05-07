import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));

async function downloadFile(url, destination) {
  const response = await axios.get(url, { responseType: "stream" });
  const filePath = path.join(destination);

  const writer = fs.createWriteStream(filePath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function downloadCSVFiles(destinationFolder) {
  const files = [
    {
      url: "https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv",
      name: "2021-05.csv",
    },
    {
      url: "https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv",
      name: "2021-06.csv",
    },
    {
      url: "https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv",
      name: "2021-07.csv",
    },
    {
      url: "https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv",
      name: "hsl-city-bicycle-stations.csv",
    },
    // Add more files as needed
  ];

  ensureFolderExists(destinationFolder);

  for (const file of files) {
    const { url, name } = file;
    const destination = path.join(destinationFolder, name);

    console.log("destination", destination);

    console.log(`Downloading ${name}...`);
    await downloadFile(url, destination);
    console.log(`${name} downloaded successfully.`);
  }
}

function ensureFolderExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Created folder: ${folderPath}`);
  } else {
    console.log(`Folder already exists: ${folderPath}`);
  }
}

downloadCSVFiles(__dirname + "/src/resources/");
