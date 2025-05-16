import { api } from "encore.dev/api";
import ejs from "ejs";

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Privacy Policy for OptiPilot</title>
  <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="anonymous">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&amp;display=swap">
  <style>
    body {
      counter-reset: section;
      font-family: 'Figtree', cursive;
      font-size: 16px;
        margin: 0;
        padding-inline: 1rem;
        line-height: 1.33;
        color: #090B0E;
        letter-spacing: .01em;
        max-width: 680px;
    }

    p {
        text-align: justify;
    }

    a {
        color: #45CA92;
        font-weight: 550;
    }

    h2::before {
      counter-increment: section;
      content: counter(section) ". ";
    }
  </style>
</head>
<body>

  <header>
    <h1>Privacy Policy for OptiPilot Chrome Extension</h1>
    <p>Last updated: May 16, 2025</p>
  </header>

  <section>
    <h2>Introduction</h2>
    <p>OptiPilot (“we,” “our,” or “us”) is an AI-powered Chrome extension published by TOPFLIGHT TECHNOLOGIES LIMITED. We value your privacy and have provided this Privacy Policy to explain how we collect, use, and share data when you use the OptiPilot extension. If you have any questions, you can contact us at <a href="mailto:topflightdigital.apps@gmail.com">topflightdigital.apps@gmail.com</a>.</p>
  </section>

  <section>
    <h2>Data Collected</h2>
    <ul>
      <li>Screenshots of website content (HTML, text, images) that you request to analyze.</li>
    </ul>
  </section>

  <section>
    <h2>How We Use Data</h2>
    <p>We send the screenshots you capture to OpenAI’s GPT assistant in order to generate tailored A/B test suggestions based on your page content.</p>
  </section>

  <section>
    <h2>Third-Party Services</h2>
    <ul>
      <li><a href="https://openai.com/privacy/">OpenAI</a> – processes and stores your screenshots per their policy.</li>
      <li><a href="https://pdfmonkey.io/privacy-policy/">PDFMonkey</a> – generates downloadable PDF summaries of A/B test ideas. Only the AI-generated title and gist are sent; retention is governed by PDFMonkey’s policy.</li>
    </ul>
  </section>

  <section>
    <h2>Data Retention</h2>
    <ul>
      <li>Screenshots you send are retained by OpenAI according to <a href="https://openai.com/privacy/">OpenAI’s privacy policy</a>.</li>
      <li>PDF summaries generated via PDFMonkey are stored per <a href="https://pdfmonkey.io/privacy-policy/">PDFMonkey’s privacy policy</a>.</li>
    </ul>
  </section>

  <section>
    <h2>Your Rights and Choices</h2>
    <ul>
      <li>You can disable or uninstall the OptiPilot extension at any time via Chrome’s extensions settings to stop all data collection.</li>
      <li>To review or delete any data we’ve sent on your behalf (e.g. to OpenAI or PDFMonkey), contact us at <a href="mailto:topflightdigital.apps@gmail.com">topflightdigital.apps@gmail.com</a> and we will coordinate the request.</li>
    </ul>
  </section>

  <section>
    <h2>Changes to This Policy</h2>
    <p>We may update this Privacy Policy occasionally. The “Last updated” date at the top will reflect any changes.</p>
  </section>
</body>
</html>
`;

export const serveInlineHTML = api.raw(
    { expose: true, path: "/privacy-policy", method: "GET" },
    async(_, resp) => {
        const content = ejs.render(html);
        resp.setHeader("Content-Type", "text/html");
        resp.end(content);
    },
);
