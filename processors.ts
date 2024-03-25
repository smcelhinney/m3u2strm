import { existsSync, mkdirSync, writeFileSync } from "fs";

export const processAsMoviePlaylist = (parsedPlaylist: any, outputFolder: string) => {
    // console.log(JSON.stringify(playlist.items, null, 2));
    for (const item of parsedPlaylist.items) {
      try {
        const { name, url } = item;

        // Create a folder in the output folder with the name of the playlist
        const folder = `${outputFolder}/${name}`;
  
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
  };
  

export const processAsTvSeriesPlaylist = (parsedPlaylist: any, outputFolder: string) => {
    // console.log(JSON.stringify(playlist.items, null, 2));
    for (const item of parsedPlaylist.items) {
      try {
        const { name, url } = item;
        let directory;
        if (name) {
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
  };
  