import extract from "tiktok-downloader-core";
import cli from "commander";
import https from "https";
import fs from "fs";

cli.version("0.1.0");

cli
  .command("download <url>")
  .description("Download a video")
  .action(async (env, options) => {
    let url = options.parent.args[0] as string;
    if (url.endsWith("/")) url = url.substring(0, url.length - 1);

    const urlParts = url.split("/");
    const id = urlParts[urlParts.length - 1];

    const mediaURL = await extract(url);

    const fileName = `${id}.mp4`;
    const file = fs.createWriteStream(fileName);
    const request = https.get(mediaURL, res => {
      res.pipe(file);
    });
    request.on("finish", () => {
      console.log(`Video saved to file ${fileName}`);
    });
  });

cli
  .command("extract <url>")
  .description("Extract a video url")
  .action(async (env, options) => {
    console.log(await extract(options.parent.args[0]));
  });

cli.on("--help", () => {
  const pathToIndex = process.argv[1].substring(process.cwd().length + 1);

  console.log("");
  console.log("Examples:");
  console.log(`  $ node ${pathToIndex} download https://vm.tiktok.com/Q3a2hQ/`);
  console.log(`  $ node ${pathToIndex} extract https://vm.tiktok.com/Q3a2hQ/`);
});

cli.parse(process.argv);

if (!process.argv.slice(2).length) {
  cli.outputHelp();
}
