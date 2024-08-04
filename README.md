# AutoScraper

AutoScraper adalah library JavaScript yang menyederhanakan web scraping dengan otomatis mengekstrak data berdasarkan data contoh yang disediakan.

## Instalasi

Gunakan npm untuk menginstal AutoScraper:

```bash
npm install autoscraper
```

## Penggunaan

Berikut adalah contoh cara menggunakan AutoScraper untuk mengekstrak data dari sebuah halaman web:

```javascript
const axios = require('axios');
const AutoScraper = require('autoscraper');

// URL halaman web yang ingin di-scrape
const url = 'https://contoh.com';

// Contoh data yang ingin diekstrak
const sampleData = ['Contoh Data 1', 'Contoh Data 2'];

const main = async () => {
  // Mengambil HTML dari halaman web
  const { data: html } = await axios.get(url);
  
  // Membuat instance AutoScraper
  const scraper = new AutoScraper();
  
  // Menghasilkan rule berdasarkan contoh data
  const rules = await scraper.buildRules(html, sampleData);
  
  // Menyimpan rule yang dihasilkan
  scraper.setRule('example_rule', rules);

  // Menggunakan rule untuk mengekstrak data dari halaman web
  const result = await scraper.getResults(html, 'example_rule');

  console.log(result);
};

main();
```

## API

### AutoScraper

#### buildRules(html: string, sampleData: string[]): Promise<Rule>

Menghasilkan rule scraping berdasarkan HTML dan data contoh yang disediakan.

#### setRule(name: string, rule: Rule): void

Menyimpan rule scraping dengan nama tertentu.

#### getResults(html: string, ruleName: string): Promise<string[]>

Menggunakan rule yang disimpan untuk mengekstrak data dari HTML.

## Kontribusi

Kontribusi sangat dihargai! Silakan ajukan pull request atau buat issue untuk melaporkan bug atau memberikan saran.

## Lisensi

Proyek ini dilisensikan di bawah lisensi MIT. Lihat file [LICENSE](./LICENSE) untuk informasi lebih lanjut.
