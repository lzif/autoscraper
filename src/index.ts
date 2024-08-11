import { gotScraping } from "got-scraping"
import * as cheerio from "cheerio"
import { getUniqueSelector } from "./utils"

type Result = {
  selector: string
  data: string[]
}

class AutoScraper {
  private url: string = ""
  private $: cheerio.CheerioAPI | null = null
  private wantedList: string[] = []

  constructor() {}

  private async fetchHtml(): Promise<cheerio.CheerioAPI> {
    const { body } = await gotScraping({ url: this.url })
    return cheerio.load(body)
  }

  private extractData($: cheerio.CheerioAPI): Result[] {
    const tagCounts: Record<string, number> = {}

    $("*").each((_, element) => {
      const classAttr = $(element).attr("class")
      if (!classAttr) {
        return
      }

      tagCounts[classAttr] = (tagCounts[classAttr] || 0) + 1
    })

    let repeatedTags = []
    let html: Result[] = []

    for (const classAttr in tagCounts) {
      if (tagCounts[classAttr] > 3) {
        repeatedTags.push({ classAttr, count: tagCounts[classAttr] })
        let className = "." + classAttr.replace(" ", ".")
        let selector: cheerio.Cheerio<cheerio.Element> = $(
          className,
        ).first() as cheerio.Cheerio<cheerio.Element>

        let outerHtml: Result = {
          selector: getUniqueSelector(selector),
          data: [],
        }
        $("." + classAttr.replace(" ", ".")).each((_, el) => {
          outerHtml.data.push(
$(el).prop("outerHTML")!
            //$(el).text().replace("\n", "").replace(/\s\s+/g, " ").trim(),
          )
        })
        if (
          this.wantedList.some((item) =>
            outerHtml.data.some((str) => str.includes(item)),
          ) &&
          outerHtml
        ) {
          html.push(outerHtml)
        }
      }
    }

    return html
  }

  public async build(url: string, wantedList: string[]): Promise<Result[]> {
    this.url = url
    this.wantedList = wantedList
    this.$ = await this.fetchHtml()
    const data = this.extractData(this.$)
    return data
  }
}

export default AutoScraper

// Contoh penggunaan
const wanted_list = ["Countries of the World: A Simple Example"]

const scraper = new AutoScraper()
scraper
  .build("https://www.scrapethissite.com/pages/", wanted_list)
  .then((result) => {
    console.log(result)
  })
