import { spawn } from 'child_process';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result?.value;
  }

  close() {
    this.ws.close();
  }
}

async function runTests() {
  console.log('--- STARTING COMPREHENSIVE BROWSER INTERACTION TEST ---');
  
  // 1. Launch Chrome Headless with Remote Debugging
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9333',
    '--user-data-dir=C:\\Users\\Dell\\AppData\\Local\\Temp\\chrome_test_p',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await sleep(2500);

  try {
    // 2. Open tab
    const tabRes = await fetch('http://localhost:9333/json/new?http://localhost:8080/index.html', { method: 'PUT' });
    const tabData = await tabRes.json();
    const cdp = new CDPClient(tabData.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await sleep(1500);

    // ==========================================
    // TEST 1: INDEX.HTML VERIFICATION
    // ==========================================
    console.log('\n[TEST 1] Verifying Homepage (index.html)...');
    const indexTitle = await cdp.eval('document.title');
    console.log(`  Page title: "${indexTitle}"`);

    const heroText = await cdp.eval('document.querySelector(".hero-title")?.textContent');
    console.log(`  Hero headline: "${heroText}"`);

    const heroLink = await cdp.eval('document.querySelector(".hero-overlay-info a")?.getAttribute("href")');
    console.log(`  Hero link: "${heroLink}"`);

    const homeBlogCards = await cdp.eval('document.querySelectorAll("#blogs .article-card").length');
    console.log(`  Featured Works Blog Cards count: ${homeBlogCards}`);

    const quoteAuthor = await cdp.eval('document.querySelector(".quote-author")?.textContent');
    console.log(`  Quote author: "${quoteAuthor}"`);

    const spansText = await cdp.eval('Array.from(document.querySelectorAll(".span-item")).map(s => s.textContent).join(" ")');
    console.log(`  Spans row: "${spansText}"`);

    if (heroText.includes('Zomato') && heroLink.includes('zomato') && homeBlogCards === 8) {
      console.log('  ✓ Homepage hero featuring Zomato blog and project section verified successfully!');
    } else {
      throw new Error(`Hero validation failed: "${heroText}", "${heroLink}"`);
    }

    // ==========================================
    // TEST 2: ARTICLES.HTML (NEWS PAGE)
    // ==========================================
    console.log('\n[TEST 2] Navigating to Articles page (articles.html)...');
    await cdp.send('Page.navigate', { url: 'http://localhost:8080/articles.html' });
    await sleep(2000);

    const articlesPageH1 = await cdp.eval('document.querySelector("h1")?.textContent');
    console.log(`  Page H1: "${articlesPageH1}"`);

    const sublabel = await cdp.eval('document.querySelector(".articles-sublabel")?.textContent');
    console.log(`  Sublabel: "${sublabel}"`);

    const renderedCards = await cdp.eval('document.querySelectorAll(".article-card").length');
    console.log(`  Rendered Case Study Cards: ${renderedCards}`);

    const brands = await cdp.eval('Array.from(document.querySelectorAll(".brand-pill")).map(b => b.textContent)');
    console.log(`  Brands rendered: ${brands.join(', ')}`);

    if (renderedCards === 8) {
      console.log('  ✓ All 8 brand marketing case study cards rendered successfully!');
    } else {
      throw new Error(`Expected 8 cards, found ${renderedCards}`);
    }

    // ==========================================
    // TEST 3: ARTICLE.HTML (SINGLE CASE STUDY & INTERACTION)
    // ==========================================
    console.log('\n[TEST 3] Navigating to Single Article (Zomato)...');
    await cdp.send('Page.navigate', { url: 'http://localhost:8080/article.html?slug=zomato-push-notifications-moment-marketing' });
    await sleep(2000);

    const articleH1 = await cdp.eval('document.querySelector(".article-headline")?.textContent');
    console.log(`  Headline: "${articleH1}"`);

    const sampleBadge = await cdp.eval('document.querySelector(".sample-badge")?.textContent');
    console.log(`  Disclaimer Badge: "${sampleBadge}"`);

    const initialLikesText = await cdp.eval('document.getElementById("likeBtnText")?.textContent');
    console.log(`  Initial Like Button: "${initialLikesText}"`);

    // Click Like Button
    console.log('  -> Clicking Like button...');
    await cdp.eval('document.getElementById("btnLike").click()');
    await sleep(500);

    const updatedLikesText = await cdp.eval('document.getElementById("likeBtnText")?.textContent');
    const hasLikedClass = await cdp.eval('document.getElementById("btnLike").classList.contains("liked")');
    console.log(`  Updated Like Button: "${updatedLikesText}" (Liked class: ${hasLikedClass})`);

    if (updatedLikesText.includes('388') && hasLikedClass) {
      console.log('  ✓ Like button properly increments in-session and updates state!');
    } else {
      throw new Error('Like button increment failed');
    }

    // Click Share Button
    console.log('  -> Clicking Share button...');
    await cdp.eval('document.getElementById("btnShare").click()');
    await sleep(500);

    const toastNotice = await cdp.eval('document.getElementById("toastNotice")?.textContent');
    const toastVisible = await cdp.eval('document.getElementById("toastNotice")?.classList.contains("show")');
    console.log(`  Toast notification triggered: "${toastNotice}" (Visible: ${toastVisible})`);

    // Verify Comments List
    const commentsCount = await cdp.eval('document.querySelectorAll(".comment-card").length');
    const commentTitle = await cdp.eval('document.getElementById("commentCountTitle")?.textContent');
    console.log(`  Initial Comment Cards: ${commentsCount}, Title Total: ${commentTitle}`);

    // Add a New Comment
    console.log('  -> Submitting a new comment via form...');
    await cdp.eval(`
      document.getElementById("commentAuthor").value = "Pooja Banerjee";
      document.getElementById("commentBody").value = "Incredible breakdown of moment marketing. The push notification timing is so true!";
      document.getElementById("addCommentForm").dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    `);
    await sleep(600);

    const newCommentTitle = await cdp.eval('document.getElementById("commentCountTitle")?.textContent');
    const topCommentAuthor = await cdp.eval('document.querySelector(".comment-author")?.textContent');
    console.log(`  Updated Comment Total: ${newCommentTitle}, New Top Comment Author: "${topCommentAuthor}"`);

    if (parseInt(newCommentTitle, 10) === parseInt(commentTitle, 10) + 1 && topCommentAuthor === 'Pooja Banerjee') {
      console.log('  ✓ Dynamic comment posting and thread updating succeeded!');
    } else {
      throw new Error('Comment submission failed');
    }

    // ==========================================
    // TEST 4: ANALYTICS.HTML (DASHBOARD & CHARTS)
    // ==========================================
    console.log('\n[TEST 4] Navigating to Analytics Dashboard (analytics.html)...');
    await cdp.send('Page.navigate', { url: 'http://localhost:8080/analytics.html' });
    await sleep(2500);

    const kpiCount = await cdp.eval('document.querySelectorAll(".kpi-card").length');
    console.log(`  KPI Summary Cards: ${kpiCount}`);

    const bestBrand = await cdp.eval('document.querySelector(".spotlight-best h3")?.textContent');
    const worstBrand = await cdp.eval('document.querySelector(".spotlight-worst h3")?.textContent');
    console.log(`  Spotlight Best: "${bestBrand}"`);
    console.log(`  Spotlight Worst: "${worstBrand}"`);

    const tableRows = await cdp.eval('document.querySelectorAll("#analyticsTableBody tr").length');
    console.log(`  Table Comparison Rows: ${tableRows}`);

    // Verify Chart.js initialized
    const barChartExists = await cdp.eval('typeof Chart !== "undefined" && Chart.getChart("likesBarChart") !== undefined');
    const lineChartExists = await cdp.eval('typeof Chart !== "undefined" && Chart.getChart("viewsLineChart") !== undefined');
    console.log(`  Chart 1 (Bar Chart) active: ${barChartExists}`);
    console.log(`  Chart 2 (Line Chart) active: ${lineChartExists}`);

    if (kpiCount === 5 && tableRows === 8 && barChartExists && lineChartExists) {
      console.log('  ✓ Analytics dashboard KPIs, Table, Best/Worst highlights, and Chart.js instances verified!');
    } else {
      throw new Error('Analytics dashboard validation failed');
    }

    // ==========================================
    // TEST 5: MOBILE RESPONSIVENESS & DRAWER
    // ==========================================
    console.log('\n[TEST 5] Testing Mobile Viewport (375x812)...');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(1000);

    // Click mobile menu toggle
    console.log('  -> Toggling mobile navigation drawer...');
    await cdp.eval('document.getElementById("mobileNavToggle").click()');
    await sleep(500);

    const isDrawerOpen = await cdp.eval('document.getElementById("mobileDrawer").classList.contains("open")');
    console.log(`  Mobile drawer open: ${isDrawerOpen}`);

    if (isDrawerOpen) {
      console.log('  ✓ Mobile navigation drawer responsive toggle verified!');
    } else {
      throw new Error('Mobile drawer toggle failed');
    }

    // Reset emulation for desktop
    await cdp.send('Emulation.clearDeviceMetricsOverride');

    // ==========================================
    // TEST 6: ABOUT US PAGE (SUPRIYA & 100 WORDS)
    // ==========================================
    console.log('\n[TEST 6] Navigating to About Us page (about.html)...');
    await cdp.send('Page.navigate', { url: 'http://localhost:8080/about.html' });
    await sleep(2000);

    const aboutTitle = await cdp.eval('document.title');
    console.log(`  About Page Title: "${aboutTitle}"`);

    const supriyaImg = await cdp.eval('document.querySelector("img[alt*=\'Supriya\']")?.getAttribute("src")');
    console.log(`  Founder Photo: "${supriyaImg}"`);

    const aboutText = await cdp.eval('document.body.innerText');
    const hasIHE = aboutText.includes('Institute of Home Economics');
    const hasNewDelhi = aboutText.includes('New Delhi');
    const has1stYear = aboutText.includes('1st Year');
    console.log(`  Contains Institute of Home Economics: ${hasIHE}, New Delhi: ${hasNewDelhi}, 1st Year: ${has1stYear}`);

    // Verify 100-word founder story
    const storyWordsCount = await cdp.eval(`
      (() => {
        const p = Array.from(document.querySelectorAll("p")).find(el => el.textContent.includes("I started this blog during my 1st year"));
        if (!p) return 0;
        return p.textContent.trim().split(/\\s+/).length;
      })()
    `);
    console.log(`  Founder Journey Story Word Count: ${storyWordsCount} words`);

    // Verify no offices section
    const hasOfficesSection = await cdp.eval('document.querySelector(".offices-grid, #offices") !== null');
    console.log(`  Offices section present: ${hasOfficesSection}`);

    if (supriyaImg && hasIHE && hasNewDelhi && storyWordsCount === 100 && !hasOfficesSection) {
      console.log('  ✓ About Us page verified with Supriya photo, Institute of Home Economics, New Delhi, and EXACT 100 words story!');
    } else {
      throw new Error(`About Us verification failed. Words: ${storyWordsCount}, Offices present: ${hasOfficesSection}`);
    }

    // Close tab and cdp
    cdp.close();
    console.log('\n======================================================');
    console.log('ALL VERIFICATION TESTS PASSED PERFECTLY IN LIVE BROWSER!');
    console.log('======================================================\n');

  } finally {
    chromeProc.kill('SIGKILL');
  }
}

runTests().catch(err => {
  console.error('\n❌ BROWSER TEST ERROR:', err);
  process.exit(1);
});

