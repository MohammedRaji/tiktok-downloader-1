import fetch from "node-fetch";
import urlRegex from "url-regex";

/*
  Code based in https://github.com/AmeddahAchraf/Reddit_Video_Download
*/
export default async function extract(shareURL: string): Promise<string> {
  const response = await fetch(shareURL);
  const body = await response.text();
  const urls = body.match(urlRegex());
  return new Promise<string>(resolve => {
    resolve(urls!.find(url => url.startsWith("https://v")));
  });
}
