import { test, assert } from "vitest"
import AutoScraper from "../src"

test("simple", () => {
  const scraper = new AutoScraper("https://www.scrapethissite.com/pages/")
  scraper.scrape()
  assert.equal("foo", "foo")
})
