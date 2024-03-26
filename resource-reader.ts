import axios from "axios";
import { readFileSync } from "fs";
import { resolve } from "path";

const isUrl = (src: string): boolean => {
  return src.startsWith("http");
};

export const readM3u = async (src: string): Promise<string | undefined> => {
  try {
    if (isUrl(src)) {
      const response = await axios.get(src);
      return response.data;
    }
    const filePath = resolve(__dirname, src);
    return readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error(e);
  }

  return undefined;
};
