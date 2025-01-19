"use strict";

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString: string = "";
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on("data", function (inputStdin: string): void {
  inputString += inputStdin;
});

process.stdin.on("end", function (): void {
  inputLines = inputString.split("\n");
  inputString = "";

  main();
});

function readLine(): string {
  return inputLines[currentLine++];
}

/*
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

function climbingLeaderboard(ranked: number[], player: number[]): number[] {

  const uniqueRanked = Array.from(new Set(ranked));

  let previousIndex = uniqueRanked.length;
  const positions: number[] = [];

 
  player.forEach((score) => {
    
    while (previousIndex > 0 && score >= uniqueRanked[previousIndex - 1]) {
      previousIndex--;
    }

   
    positions.push(previousIndex + 1);
  });

  return positions;
}

function main() {
  const ws: WriteStream = createWriteStream(process.env["OUTPUT_PATH"]);

  const rankedCount: number = parseInt(readLine().trim(), 10);

  const ranked: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((rankedTemp) => parseInt(rankedTemp, 10));

  const playerCount: number = parseInt(readLine().trim(), 10);

  const player: number[] = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((playerTemp) => parseInt(playerTemp, 10));

  const result: number[] = climbingLeaderboard(ranked, player);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
