import { program } from "commander";
import parser from "iptv-playlist-parser";
import { readFileSync, writeFileSync } from "fs";
import { mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import {
  processAsMoviePlaylist,
  processAsTvSeriesPlaylist,
} from "./processors";

program
  .requiredOption("-o, --output <output>", "The output folder")
  .requiredOption("-t, --type <type>", "The type of playlist: tv|movie")
  .requiredOption("-f, --file <file>", "The file to parse");

program.parse();

const { file, output, type } = program.opts();

// Create the output folder if it doesn't exist
const outputFolder = resolve(__dirname, output);

if (!existsSync(outputFolder)) {
  mkdirSync(outputFolder, { recursive: true });
}

const playlist = parser.parse(readFileSync(file, "utf-8"));

if (type === "tv") {
  processAsTvSeriesPlaylist(playlist, outputFolder);
}

if (type === "movie") {
  processAsMoviePlaylist(playlist, outputFolder);
}
