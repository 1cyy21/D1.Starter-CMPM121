// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";
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

let clickCount: number = 0;
let passiveBonuses: number = 0;
// let upgrades = [];

const counter = document.createElement("h1");
counter.textContent = "Clicks: 0";

const upgrade_1 = document.createElement("button");
upgrade_1.textContent = "Purchase Upgrade 1";

app.append(heading, image, message, counter, upgrade_1);

image.addEventListener("click", function () {
  console.log("Clicked!");
  addClicks(1);
});

upgrade_1.addEventListener("click", () => passiveBonuses += 1);
upgrade_1.disabled = true;

function toggleUpgrades() {
  if (clickCount >= 20) {
    upgrade_1.disabled = false;
  }
}

function addClicks(amount: number) {
  clickCount += amount;
  updateCounter();
}

function updateCounter() {
  counter.textContent = "Clicks: " + Math.floor(clickCount);
}

//
let last = performance.now();

function tick(now: number) {
  clickCount += passiveBonuses * (now - last) / 1000;
  last = now;
  updateCounter();
  toggleUpgrades();
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
