import puppeteer from "puppeteer";
import fs from "fs";

const scrapeService = async (request) => {
  try {
    const url = request.body.url;
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    const data = await page.evaluate(() => {
      const cards = document.querySelectorAll(".most-booked");
      const result = [];
      cards.forEach((card) => {
        const title =
          card.querySelector(".service-name")?.innerText.trim() || "";
        const description =
          card.querySelector(".price")?.innerText.trim() || "";
        result.push({
          source: "services",
          content: `${title}: ${description}`,
        });
      });
      return result;
    });

    await browser.close();

    fs.writeFileSync(
      "data/homehero-content.json",
      JSON.stringify(data, null, 2)
    );

    console.log(" Scraped and saved!", data);
  } catch (error) {
    console.error("scrapeService error:", error);
    throw error;
  }
};

const scrapingService = { scrapeService };

export default scrapingService;
