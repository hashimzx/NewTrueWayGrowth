import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable JSON parser with large payload limit for base64 image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check route
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', academy: 'True Way Quran' });
});

// Real Color-Coded Tajweed Quran 30 Paras PDF Mapping
const JUZ_PDF_MAP: Record<number, string> = {
  1: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-1-alif-laam-meem-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  2: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-2-sayaqul-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  3: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-3-tilka-arrusul-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  4: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-4-lan-tanalu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  5: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-5-walmuhsanat-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  6: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-6-la-yuhibullah-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  7: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-7-wa-iza-samiu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  8: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-8-walaw-annana-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  9: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-9-qal-al-mala-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  10: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-10-wa-alamu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  11: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-11-yataziruna-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  12: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-12-wama-min-daabbah-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  13: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-13-wama-ubarriu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  14: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-14-rubama-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  15: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-15-subhan-allazi-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  16: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-16-qala-alam-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  17: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-17-iqtaraba-linnas-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  18: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-18-qad-aflaha-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  19: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-19-wa-qal-allazina-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  20: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-20-fama-kana-jawaba-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  21: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-21-wa-la-tujadiluu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  22: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-22-waman-yaqnut-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  23: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-23-wama-anzalna-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  24: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-24-faman-azlamu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  25: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-25-ilaihi-yuradu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  26: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-26-haa-meem-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  27: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-27-qala-fama-khatbukum-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  28: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-28-qad-samiallahu-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  29: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-29-tabarak-alazi-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf',
  30: 'https://islamic1articles.home.blog/wp-content/uploads/2020/08/quran-juz-30-amma-para-sipara-with-english-pdf-translation-meaning-tajwid-transliteration-for-hifz-15-line.pdf'
};

// Stream & proxy route for Color Coded Tajweed Para PDFs
app.get('/api/pdf/juz/:paraNumber', async (req: Request, res: Response) => {
  const paraNum = parseInt(req.params.paraNumber, 10);
  if (isNaN(paraNum) || paraNum < 1 || paraNum > 30) {
    return res.status(400).json({ error: 'Invalid Para number (1-30)' });
  }

  const pdfUrl = JUZ_PDF_MAP[paraNum];
  if (!pdfUrl) {
    return res.status(404).json({ error: 'PDF not found for specified Para' });
  }

  const isDownload = req.query.download === '1' || req.query.download === 'true';
  const fileName = `TrueWayQuran-Juz-${String(paraNum).padStart(2, '0')}-Color-Tajweed-English.pdf`;

  try {
    const upstreamRes = await fetch(pdfUrl, {
      headers: {
        'User-Agent': 'curl/7.88.1',
        'Referer': 'https://islamic1articles.home.blog/2019/01/06/15-line-quran-juz-1-to-30-pdf-with-english-translation-transliteration-and-tajweed-for-hifz/',
        'Accept': '*/*'
      }
    });

    if (!upstreamRes.ok) {
      return res.redirect(pdfUrl);
    }

    const arrayBuffer = await upstreamRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', buffer.length.toString());
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Content-Disposition',
      `${isDownload ? 'attachment' : 'inline'}; filename="${fileName}"`
    );

    return res.end(buffer);
  } catch (err: any) {
    console.error('Error serving PDF proxy caught:', err);
    res.redirect(pdfUrl);
  }
});

// Tajweed Rules PDF
app.get('/api/pdf/tajweed-rules', async (req: Request, res: Response) => {
  const url = 'https://islamic1articles.home.blog/wp-content/uploads/2019/01/tajweed-rules-for-reading-reciting-arabic-quran-juz-1-to-30-english-pdf.pdf';
  const isDownload = req.query.download === '1' || req.query.download === 'true';
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Disposition', `${isDownload ? 'attachment' : 'inline'}; filename="TrueWayQuran-Tajweed-Rules-Guide.pdf"`);
  res.redirect(url);
});

// Setup Vite middleware for development
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`True Way Quran server running at http://localhost:${PORT}`);
  });
}

startServer();
