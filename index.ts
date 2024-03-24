import parser from "iptv-playlist-parser";
import { readFileSync, writeFileSync } from "fs";
import { mkdirSync, existsSync } from "fs";
import { resolve } from "path";

const [file, output] = process.argv.slice(2);

const usage = () => {
  console.log("Usage: node index.ts <file> <output>");
  console.log("Example: node index.ts file.m3u8 output.txt");
};

if (!file || !output) {
  usage();
  process.exit(1);
}

// Create the output folder if it doesn't exist

const outputFolder = resolve(__dirname, output);

if (!existsSync(outputFolder)) {
  mkdirSync(outputFolder, { recursive: true });
}

const playlist = parser.parse(readFileSync(file, "utf-8"));
// console.log(JSON.stringify(playlist.items, null, 2));
for (const item of playlist.items) {
  const { name, url } = item;
  // Create a folder in the output folder with the name of the playlist
  const folder = `${outputFolder}/${name}`;
//   console.log({ folder });

  // Create the folder if it doesn't exist
  if (!existsSync(folder)) {
    mkdirSync(folder);
  }

  // Create a file in the newly created folder with the name ${name}.strm
  const streamFile = `${folder}/${name}.strm`;

  // Create the file with the path of streamFile and add the url property to that file
  writeFileSync(streamFile, url);

  console.log(`Created ${streamFile}`);
}
