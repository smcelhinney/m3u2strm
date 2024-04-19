import { Command, Option } from "commander";
import { version } from "./package.json";
import { readM3u } from "./resource-reader";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";
import parser from "iptv-playlist-parser";
import { processAsMoviePlaylist, processAsTvSeriesPlaylist } from "./processors";
const program = new Command();

function errorColor(str: string) {
  // Add ANSI escape codes to display text in red.
  return `\x1b[31m${str}\x1b[0m`;
}

program.version(version);

program.configureOutput({
  // Visibly override write routines as example!
  writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
  writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
  // Highlight errors in color.
  outputError: (str, write) => write(errorColor(str)),
});

/**
 * Sync a library
 */
program
  .command("sync")
  .addOption(
    new Option("-l, --library <library>")
      .choices(["tv", "movies", "live"])
      .makeOptionMandatory()
  )
  .addOption(new Option("-o, --output <output>"))
  .addOption(new Option("-u, --url [url]"))
  .description("Sync a library")
  .action(async function ({ library, output, url }) {
    switch (library) {
      case "tv":
      case "movies":
        if (!output || !url) {
          program.error(
            "Output and URL are required for tv and movies libraries"
          );
        }
        console.time("Total Processing time");
        const m3uAsText = await readM3u(url);
        if (!m3uAsText) {
          program.error("No parseable playlist found");
          process.exit(0)
        }

        const outputFolder = resolve(__dirname, output);
        if (!existsSync(outputFolder)) {
          mkdirSync(outputFolder, { recursive: true });
        }

        const playlist = parser.parse(m3uAsText);

        if (library === "tv") {
          processAsTvSeriesPlaylist(playlist, outputFolder);
        }

        if (library === "movies") {
          processAsMoviePlaylist(playlist, outputFolder);
        }
        console.timeEnd("Total Processing time");

        break;
      case "live":
        break;
      default:
        throw new Error('Invalid library. Must be "tv", "movies", or "live"');
    }

    
    // console.log({ opts: this.opts().library });
    // console.log("clone command called with library: ", { args });
  });

program.parse(process.argv);
