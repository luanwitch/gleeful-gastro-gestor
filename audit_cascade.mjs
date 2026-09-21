import http from 'http';
import fs from 'fs';

// Fetch the HTML from wrangler
http.get('http://127.0.0.1:8787/', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    // Check elements
    console.log('=== CSS CASCADE AUDIT ===');
    
    // 1. Depoimentos section
    const depSection = html.match(/<section[^>]*id="depoimentos"[^>]*>/i)?.[0];
    console.log('\n1. Depoimentos Section:');
    console.log('HTML tag:', depSection);
    const hasBgCream = depSection?.includes('bg-cream');
    console.log('Has class "bg-cream":', hasBgCream);
    console.log('Inline style:', depSection?.match(/style="([^"]*)"/)?.[1]);
    
    // 2. FAQ section
    const faqSection = html.match(/<section[^>]*id="faq"[^>]*>/i)?.[0];
    console.log('\n2. FAQ Section:');
    console.log('HTML tag:', faqSection);
    console.log('Tone used:', faqSection?.includes('bg-paper') ? 'paper (#faf8f3)' : 'cream (#ede3d4)');

    // 3. Card in FAQ
    const faqCard = html.match(/<div[^>]*style="[^"]*border-color:[^"]*"[^>]*class="[^"]*rounded-xl[^"]*"[^>]*>/i)?.[0];
    console.log('\n3. FAQ Card:');
    console.log('HTML tag:', faqCard);

    // 4. Testimonials Card
    const depCard = html.match(/<div[^>]*class="[^"]*max-w-3xl[^"]*"[^>]*>/i)?.[0];
    console.log('\n4. Testimonials Card:');
    console.log('HTML tag:', depCard);
  });
});
