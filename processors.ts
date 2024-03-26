import { existsSync, mkdirSync, writeFileSync } from "fs";

const sanitize = (str: string) => str.replace(/[^a-z0-9]/gi, "");

export const processAsMoviePlaylist = (
  parsedPlaylist: any,
  outputFolder: string
) => {
  console.time("processAsMoviePlaylist: Processing time");
  for (const item of parsedPlaylist.items) {
    try {
      const { name, url } = item;
      const filename = sanitize(name);

      // Create a folder in the output folder with the name of the playlist
      const folder = `${outputFolder}/${filename}`;

      // Create the folder if it doesn't exist
      if (!existsSync(folder)) {
        mkdirSync(folder);
      }

      // Create a file in the newly created folder with the name ${name}.strm
      const streamFile = `${folder}/${filename}.strm`;

      // Create the file with the path of streamFile and add the url property to that file
      writeFileSync(streamFile, url);

      console.log(`Created ${streamFile}`);
    } catch (error) {
      console.log(error);
    }
  }
  console.timeEnd("processAsMoviePlaylist: Processing time");
};

export const processAsTvSeriesPlaylist = (
  parsedPlaylist: any,
  outputFolder: string
) => {
  console.time("processAsTvSeriesPlaylist: Processing time");

  for (const item of parsedPlaylist.items) {
    try {
      let { name, url } = item;
      let directory;  

      if (name) {
        name = sanitize(name);
        directory = name.split(" ");
        directory.pop();
        directory = directory.join(" ");
      }

      const folder = `${outputFolder}/${directory}`;

      // Create the folder if it doesn't exist
      if (!existsSync(folder)) {
        mkdirSync(folder);
      }

      // Create a file in the newly created folder with the name ${name}.strm
      const streamFile = `${folder}/${name}.strm`;

      // Create the file with the path of streamFile and add the url property to that file
      writeFileSync(streamFile, url);

      console.log(`Created ${streamFile}`);
    } catch (error) {
      console.log(error);
    }
  }
  console.timeEnd("processAsTvSeriesPlaylist: Processing time");
};
