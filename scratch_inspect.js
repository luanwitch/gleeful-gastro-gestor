const http = require('http');

http.get('http://127.0.0.1:8787/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP STATUS:', res.statusCode);
    const links = data.match(/<link[^>]+>/g) || [];
    console.log('STYLESHEET LINKS:');
    links.forEach(l => console.log('  ', l));

    // Check specific tags in the HTML
    console.log('\n--- CHECKING HTML TAGS IN SSR RESPONSE ---');
    console.log('HTML tag:', data.match(/<html[^>]*>/i)?.[0]);
    console.log('BODY tag:', data.match(/<body[^>]*>/i)?.[0]);
    
    // Check Section Depoimentos
    const depMatch = data.match(/<section[^>]*id="depoimentos"[^>]*>/i);
    console.log('Depoimentos section tag:', depMatch?.[0]);

    // Check FAQ Section
    const faqMatch = data.match(/<section[^>]*id="faq"[^>]*>/i);
    console.log('FAQ section tag:', faqMatch?.[0]);

    // Check Agendar Button
    const agendarMatch = data.match(/<a[^>]*Agendar<\/a>/i) || data.match(/<a[^>]*href="#agendamento"[^>]*>/i);
    console.log('Agendar CTA:', agendarMatch?.[0]);

    // Find CSS link href
    const cssMatch = data.match(/href="(\/assets\/[^"]+\.css[^"]*)"/);
    if (cssMatch) {
      const cssUrl = 'http://127.0.0.1:8787' + cssMatch[1];
      console.log('\n--- FETCHING CSS FROM:', cssUrl);
      http.get(cssUrl, (cssRes) => {
        console.log('CSS HTTP STATUS:', cssRes.statusCode);
        console.log('CSS HEADERS:', cssRes.headers);
        let cssData = '';
        cssRes.on('data', chunk => cssData += chunk);
        cssRes.on('end', () => {
          console.log('CSS Length:', cssData.length);
          console.log('Contains #ede3d4:', cssData.includes('#ede3d4'));
          console.log('Contains #3f4824:', cssData.includes('#3f4824'));
          console.log('Contains #8a542f:', cssData.includes('#8a542f'));
          console.log('Contains #a38e79:', cssData.includes('#a38e79'));
          console.log('Contains #faf8f3:', cssData.includes('#faf8f3'));
        });
      });
    } else {
      console.log('NO CSS LINK FOUND IN HTML!');
    }
  });
});
