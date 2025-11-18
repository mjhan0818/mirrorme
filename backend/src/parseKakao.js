import fs from "fs";

export function parseKakaoTxt(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split("\n");

  const messages = [];

  const regex = /^\[(.*?)\] \[(.*?)\] (.*)$/;

  for (let line of lines) {
    const match = line.match(regex);
    if (!match) continue;

    const [_, name, time, text] = match;

    messages.push({ name, time, text });
  }

  return messages;
}
