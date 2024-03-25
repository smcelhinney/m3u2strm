import parser from "iptv-playlist-parser";
import { readFileSync, writeFileSync } from "fs";
import { mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import { processAsMoviePlaylist, processAsTvSeriesPlaylist } from "./processors";

const [file, output, type] = process.argv.slice(2);

const usage = () => {
  console.log("Usage: node index.ts <file> <output> <type: tv|movie>");
  console.log("Example: node index.ts file.m3u8 output.txt tv");
};

if (!file || !output || !type) {
  usage();
  process.exit(1);
}

// Create the output folder if it doesn't exist

const outputFolder = resolve(__dirname, output);

if (!existsSync(outputFolder)) {
  mkdirSync(outputFolder, { recursive: true });
}

const playlist = parser.parse(readFileSync(file, "utf-8"));

if (type === "tv") {
  processAsTvSeriesPlaylist(playlist, outputFolder);
}

if(type === "movie") {
  processAsMoviePlaylist(playlist, outputFolder);
}
