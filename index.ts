import { program } from "commander";
import { existsSync, mkdirSync } from "fs";
import parser from "iptv-playlist-parser";
import { resolve } from "path";
import {
  processAsMoviePlaylist,
  processAsTvSeriesPlaylist,
} from "./processors";
import { readM3u } from "./resource-reader";

async function main() {
  program
    .requiredOption("-o, --output <output>", "The output folder")
    .requiredOption("-t, --type <type>", "The type of playlist: tv|movie");
  program.parse();

  const { output, type } = program.opts();
  const [m3uPath] = program.args;
  const m3uAsText = await readM3u(m3uPath);

  // Create the output folder if it doesn't exist
  const outputFolder = resolve(__dirname, output);
  if (!existsSync(outputFolder)) {
    mkdirSync(outputFolder, { recursive: true });
  }

  if (m3uAsText) {
    const playlist = parser.parse(m3uAsText);

    if (type === "tv") {
      processAsTvSeriesPlaylist(playlist, outputFolder);
    }

    if (type === "movie") {
      processAsMoviePlaylist(playlist, outputFolder);
    }
  } else {
    throw new Error("No parseable playlist found");
  }
}
main().catch(console.error);
