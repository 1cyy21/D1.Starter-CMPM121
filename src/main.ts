// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";
import pack1Url from "./assets/pack1.svg?no-inline";
import pack2Url from "./assets/pack2.svg?no-inline";
import pack3Url from "./assets/pack3.svg?no-inline";
import "./style.css";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A teal tile with a cream circle";
image.width = 96;
image.height = 96;

const message = document.createElement("p");
message.textContent = "Your project starts here.";

interface Pack {
  minCash: number;
  maxCash: number;
}

interface Upgrade extends Pack {
  name: string;
  cost: number;
  imageUrl: string;
  purchased: boolean;
  button?: HTMLButtonElement;
}

const basePack = { minCash: 1, maxCash: 3 };

const upgrades: Upgrade[] = [
  {
    name: "Pack 1",
    cost: 20,
    minCash: -5,
    maxCash: 10,
    imageUrl: pack1Url,
    purchased: false,
  },
  {
    name: "Pack 2",
    cost: 100,
    minCash: -25,
    maxCash: 60,
    imageUrl: pack2Url,
    purchased: false,
  },
  {
    name: "Pack 3",
    cost: 500,
    minCash: -100,
    maxCash: 400,
    imageUrl: pack3Url,
    purchased: false,
  },
];

let cash: number = 0;
let passiveBonuses: number = 0;
let currentPack: Pack = basePack;

const counter = document.createElement("h1");
counter.textContent = "Cash: $0";

const upgrade_1 = document.createElement("button");
upgrade_1.textContent = "Purchase Pack 1 Upgrade";

const upgrade_2 = document.createElement("button");
upgrade_2.textContent = "Purchase Pack 2 Upgrade";

const upgrade_3 = document.createElement("button");
upgrade_3.textContent = "Purchase Pack 3 Upgrade";

app.append(heading, image, message, counter, upgrade_1, upgrade_2, upgrade_3);

image.addEventListener("click", function () {
  console.log("Clicked!");
  addCash(1);
});

upgrade_1.addEventListener("click", () => passiveBonuses += 1);
upgrade_1.disabled = true;

upgrade_1.addEventListener("click", () => passiveBonuses += 1);
upgrade_2.disabled = true;

upgrade_1.addEventListener("click", () => passiveBonuses += 1);
upgrade_3.disabled = true;

function toggleUpgrades() {
  if (cash >= 20) {
    upgrade_1.disabled = false;
  }
}

function addCash(amount: number) {
  cash += amount;
  updateCounter();
}

function updateCounter() {
  counter.textContent = "Cash: $ " + Math.floor(cash);
}

// Tick calculations
let last = performance.now();

function tick(now: number) {
  cash += passiveBonuses * (now - last) / 1000;
  last = now;
  updateCounter();
  toggleUpgrades();
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
