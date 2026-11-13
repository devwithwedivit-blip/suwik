# SUWIK — Strategically Unified Worlds of Innovation and Knowledge

A static marketing case study blog website replicating the visual design language, Swiss modernist typography, and interactive UX of the reference design system. Founded and authored by **Supriya**, a 1st-year student at the **Institute of Home Economics, University of Delhi, Hauz Khas, New Delhi**.

The publication features 8 comprehensive brand marketing case studies (Zomato, Swiggy, Amul, CRED, Nykaa, boAt, Nike, Coca-Cola), an interactive in-session engagement counter, threaded student comments, and a real-time analytics dashboard.

---

## 🚀 How to Run the Website Locally

This is a completely static front-end application built with vanilla HTML5, CSS3, and modern JavaScript (ES6+). It requires no backend, build tools, or package installations.

### Option 1: Python HTTP Server (Recommended)
From this directory (`f:\supiiiii`), open PowerShell or your terminal and run:
```bash
python -m http.server 8080
```
Then open your browser and navigate to:
**[http://localhost:8080](http://localhost:8080)**

### Option 2: Node.js HTTP Server
```bash
npx serve .
# or
npx http-server -p 8080
```

### Option 3: VS Code Live Server
Right-click on `index.html` and select **"Open with Live Server"**.

---

## 📂 Site Structure & Pages

| URL / File | Description |
| :--- | :--- |
| `index.html` | Homepage: Hero area spotlighting the **Zomato Marketing Case Study** (`article.html?slug=zomato-push-notifications-moment-marketing`), **Blogs** section showcasing all 8 marketing case-study cards (with brand tags, reading times, live views, and likes), Founder Statement by Supriya, "Our research spans" row, "Driven by Insight, Powered by Knowledge", and "Meet the Founder" section. |
| `articles.html` | "Blogs" directory page, displaying all 8 case study cards in the minimalist card style with brand tags, reading times, views, and like counts. |
| `article.html?slug=...` | Single case study view with full article text, key student takeaway callout, in-session **Like** button, **Share** link button (with toast), sample engagement disclaimer, and threaded comment section. |
| `analytics.html` | Analytics Dashboard: 5 summary KPI cards, Best & Worst performing campaign spotlight with auto-generated diagnostic commentary, comparative metrics table (views, likes, shares, comments, engagement rate), and 2 Chart.js visualizations (Likes bar chart and 7-day views trend). |
| `about.html` | About page: **Supriya's Profile** (with photo), **How I Started This Blog** (verified 100-word founder story), Academic affiliation at the Institute of Home Economics, Hauz Khas, New Delhi, Strategic Pillars (Innovation, Knowledge, Impact), and Case Study Reading Library. (Offices section completely removed). |
| `team.html` | Team page: Founder Supriya (Institute of Home Economics, New Delhi) and student research cohort collaborators. |

---

## 👩‍🎓 Founder Story & Verification (About Us)

**Author:** Supriya  
**Academic Level:** 1st Year Undergraduate Scholar  
**Institution:** Institute of Home Economics (IHE), University of Delhi  
**Location:** Hauz Khas, New Delhi — 110016, India  
**Photo:** `assets/images/supriya.webp` (user-uploaded portrait)

### How I Started This Blog (Exactly 100 Words):
> *"I started this blog during my 1st year at the Institute of Home Economics, University of Delhi, located in Hauz Khas, New Delhi. Fascinated by consumer psychology and digital culture, I observed how marketing evolved beyond traditional advertisements into witty push notifications, moment marketing, and authentic community storytelling. Through SUWIK, standing for Strategically Unified Worlds of Innovation and Knowledge, I launched this publication to analyze eight iconic campaigns, from Zomato and Swiggy to Nike and Coca-Cola. My ongoing purpose is translating academic frameworks into practical, real-world insights that empower students to master the art and science of modern brand building."*

- **Word Count:** Exactly **100 words** (verified via `len(text.split()) == 100` and regex word tokens).

---

## ✏️ How to Edit Data Files

All dynamic text, blog posts, metrics, and site content are decoupled into three JSON files under `/data/`:

### 1. `/data/posts.json`
Contains the editorial case studies. Each entry includes:
- `id`: Unique numeric identifier (1 to 8).
- `slug`: URL slug (e.g., `zomato-push-notifications-moment-marketing`).
- `brand`: Brand name (e.g., Zomato, Swiggy, Nike).
- `category`: Strategy classification.
- `title` & `subtitle`: Main headlines.
- `author`, `date`, `readTime`: Metadata.
- `summary`: Lead introduction.
- `sections`: Array of 3 sections (`1. What The Brand Did`, `2. Which Marketing Strategy It Used`, `3. Why It Worked`).
- `takeaway`: Concluding student takeaway.

### 2. `/data/engagement.json`
Contains the metrics and comments. Easily swap sample benchmarks with real campaign data:
- `isSampleData`: Boolean flag powering the demo disclaimer.
- `days`: Array of 7 day labels (`["Day 1", "Day 2", ..., "Day 7"]`).
- `posts`: Array of metric objects for each post:
  - `views`: Total impressions / views.
  - `likes`: Total likes (posts 1–4 in hundreds; posts 5–8 in tens).
  - `shares`: Total shares.
  - `dailyViews`: Array of 7 daily view counts for the 7-day Chart.js line graph.
  - `comments`: Threaded comments array containing `id`, `author`, `avatar`, `timeAgo`, `text`, and optional `replies`.

### 3. `/data/site.json`
Contains all global static site content (SUWIK branding, navigation links, hero config, blogs section, quote, about text, founder details, and footer links).

---

## 📊 Word Count Verification (All 8 Blog Posts)

Each post was verified with an automated script (`verify_word_counts.py`) to confirm it strictly meets the **300–500 words** coursework requirement:

| # | Brand | Campaign Focus | Body Words | Total Words | Status (300–500 Words) |
| :-: | :--- | :--- | :-: | :-: | :-: |
| 1 | **Zomato** | Witty, meme-style social voice & push notifications | 369 | 393 | **PASS (Valid)** |
| 2 | **Swiggy** | Instamart / quick-commerce storytelling & empathy | 318 | 340 | **PASS (Valid)** |
| 3 | **Amul** | Topical billboards & Amul girl character longevity | 305 | 334 | **PASS (Valid)** |
| 4 | **CRED** | Unconventional celebrity subversion ("Indiranagar ka Gunda") | 318 | 342 | **PASS (Valid)** |
| 5 | **Nykaa** | Content-led commerce, tutorials & community building | 305 | 327 | **PASS (Valid)** |
| 6 | **boAt** | Gen Z lifestyle repositioning & "boAthead" tribe | 305 | 330 | **PASS (Valid)** |
| 7 | **Nike** | "Just Do It" purpose-driven mythic storytelling | 304 | 330 | **PASS (Valid)** |
| 8 | **Coca-Cola** | "Share a Coke" mass personalization & gifting | 305 | 331 | **PASS (Valid)** |

---

## 🛡️ Student Prototype Notice
*Student coursework prototype by Supriya, 1st Year, Institute of Home Economics, University of Delhi, Hauz Khas, New Delhi.*
