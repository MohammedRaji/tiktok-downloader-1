import extract from "tiktok-downloader-core";
import express from "express";

const app = express();

function asBadRequest(res: express.Response, message: string) {
  res.status(400);
  res.statusMessage = message;
  res.send(message);
}

app.get("/", async (req: express.Request, res: express.Response) => {
  const { url } = req.query;
  if (url === undefined) {
    asBadRequest(res, "No URL provided");
    return;
  }
  let videoURL = undefined;
  try {
    videoURL = await extract(url);
  } catch (e) {
    asBadRequest(res, "Cannot extract URL");
    return;
  }
  if (videoURL === undefined) {
    asBadRequest(res, "Cannot extract URL");
    return;
  }
  res.redirect(videoURL);
});

app.listen(3000);
