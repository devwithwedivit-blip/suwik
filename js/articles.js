/**
 * MKTG - Articles Listing Script
 * Loads posts and engagement metrics, and dynamically renders cards.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('articlesGrid');
  if (!container) return;

  try {
    const [postsRes, engageRes] = await Promise.all([
      fetch('data/posts.json'),
      fetch('data/engagement.json')
    ]);

    const posts = await postsRes.json();
    const engagementData = await engageRes.json();
    const engagementMap = new Map();

    engagementData.posts.forEach(item => {
      engagementMap.set(item.slug, item);
    });

    renderArticles(posts, engagementMap, container);
  } catch (err) {
    console.error('Error loading articles:', err);
    container.innerHTML = '<p class="body-md">Unable to load case studies at this moment.</p>';
  }
});

function renderArticles(posts, engagementMap, container) {
  container.innerHTML = '';

  posts.forEach((post, index) => {
    const eng = engagementMap.get(post.slug) || { views: 0, likes: 0, shares: 0, commentCount: 0 };
    const caseIndex = String(index + 1).padStart(2, '0');

    const card = document.createElement('article');
    card.className = 'article-card';
    card.innerHTML = `
      <a href="article.html?slug=${post.slug}" style="display:flex; flex-direction:column; height:100%;">
        <div class="card-cover">
          <img src="${post.coverImage || 'assets/images/zomato_hero.webp'}" alt="${post.brand}" class="card-cover-bg" loading="lazy" />
          <div class="card-cover-scrim"></div>
          <div class="card-cover-top">
            <span class="brand-pill">${post.brand}</span>
            <span class="case-no">// ${caseIndex}</span>
          </div>
          <div class="card-cover-mid">
            <h3 class="card-brand-hero">${post.brand}</h3>
            <p class="font-mono" style="font-size: 11px; opacity: 0.75;">${post.category}</p>
          </div>
          <div class="card-cover-bottom">
            <span>${post.date}</span>
            <span>${post.readTime}</span>
          </div>
        </div>
        <div class="card-body">
          <div>
            <h4 class="card-title">${post.title}</h4>
            <p class="card-summary">${post.summary}</p>
          </div>
          <div class="card-footer">
            <span class="font-mono" style="color:var(--text-primary); display:flex; align-items:center; gap:4px;">
              Read Case <span style="font-size:14px;">→</span>
            </span>
            <div class="card-metrics">
              <span title="Views">${eng.views.toLocaleString()} views</span>
              <span>•</span>
              <span title="Likes">${eng.likes.toLocaleString()} likes</span>
            </div>
          </div>
        </div>
      </a>
    `;
    container.appendChild(card);
  });
}

