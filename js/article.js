/**
 * MKTG - Single Article Page Script
 * Renders full case study, handles in-session likes, share copy, and comment posting.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug') || 'zomato-push-notifications-moment-marketing';

  try {
    const [postsRes, engageRes] = await Promise.all([
      fetch('data/posts.json'),
      fetch('data/engagement.json')
    ]);

    const posts = await postsRes.json();
    const engagementData = await engageRes.json();

    const post = posts.find(p => p.slug === slug) || posts[0];
    const metrics = engagementData.posts.find(e => e.slug === post.slug) || {
      views: 1200,
      likes: 150,
      shares: 40,
      comments: []
    };

    renderArticle(post, metrics);
  } catch (err) {
    console.error('Error loading article:', err);
    document.getElementById('articleContainer').innerHTML = '<p class="body-md">Error loading article content.</p>';
  }
});

function renderArticle(post, metrics) {
  document.title = `${post.title} — SUWIK Blogs`;

  // State management for in-session likes and comments
  let currentLikes = metrics.likes;
  let hasLiked = false;
  let allComments = [...metrics.comments];

  const container = document.getElementById('articleContainer');
  if (!container) return;

  // Calculate total comments including replies
  const getTotalCommentCount = () => {
    let count = 0;
    allComments.forEach(c => {
      count += 1;
      if (c.replies) count += c.replies.length;
    });
    return count;
  };

  container.innerHTML = `
    <header class="article-header">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span class="article-brand-category">${post.category} // ${post.brand}</span>
        <span class="sample-badge">Sample / Demo Engagement Data</span>
      </div>
      <h1 class="h2 article-headline">${post.title}</h1>
      <p class="body-lg article-subhead">${post.subtitle}</p>

      <div class="article-meta-bar">
        <div class="meta-item">
          <span>By ${post.author}</span>
          <span>•</span>
          <span>${post.date}</span>
          <span>•</span>
          <span>${post.readTime}</span>
        </div>
        <div class="meta-item">
          <span id="viewCountDisplay">${metrics.views.toLocaleString()} Views</span>
          <span>•</span>
          <span id="likeCountDisplay">${currentLikes.toLocaleString()} Likes</span>
          <span>•</span>
          <span id="shareCountDisplay">${metrics.shares.toLocaleString()} Shares</span>
          <span>•</span>
          <span id="commentCountHeader">${getTotalCommentCount()} Comments</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-bar">
        <button id="btnLike" class="btn-action" aria-label="Like this case study">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
          <span id="likeBtnText">Like (${currentLikes})</span>
        </button>

        <button id="btnShare" class="btn-action" aria-label="Share case study link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          <span>Share Link</span>
        </button>

        <a href="analytics.html" class="btn-action" style="margin-left:auto;">
          <span>View Analytics →</span>
        </a>
      </div>

      <!-- Article Hero Cover Image -->
      <div class="article-hero-banner" style="width:100%; aspect-ratio:16/9; max-height:480px; border-radius:12px; overflow:hidden; margin: 28px 0 36px; background:#1A1A1A; box-shadow: 0 8px 30px rgba(0,0,0,0.08);">
        <img src="${post.coverImage || 'assets/images/zomato_hero.webp'}" alt="${post.brand} Cover" style="width:100%; height:100%; object-fit:cover;" />
      </div>
    </header>

    <main class="article-content">
      <div class="article-lead">
        ${post.summary}
      </div>

      ${post.sections.map(s => `
        <section class="article-section">
          <h2 class="section-title-sm">${s.heading}</h2>
          <p class="section-body">${s.body}</p>
        </section>
      `).join('')}

      <aside class="takeaway-box">
        <div class="takeaway-label">Key Marketing Takeaway for Students</div>
        <p class="takeaway-text">${post.takeaway}</p>
      </aside>
    </main>

    <!-- Comments Section -->
    <section class="comments-container">
      <div class="comments-header">
        <h3 class="h3" style="font-size:24px;">Discussion & Comments (<span id="commentCountTitle">${getTotalCommentCount()}</span>)</h3>
        <span class="font-mono" style="color:var(--text-secondary); font-size:11px;">Fictional Peer Feedback</span>
      </div>

      <div id="commentsList" class="comments-list">
        <!-- Comments rendered dynamically below -->
      </div>

      <!-- Add Comment Form -->
      <form id="addCommentForm" class="comment-form">
        <h4 class="form-title">Join the Conversation</h4>
        <input type="text" id="commentAuthor" class="form-input" placeholder="Your Name (e.g. Rahul Sharma)" required />
        <textarea id="commentBody" class="form-textarea" placeholder="Share your perspective, question, or counterpoint..." required></textarea>
        <button type="submit" class="nav-pill" style="align-self:flex-start;">Post Comment</button>
      </form>
    </section>
  `;

  // Render initial comment tree
  const commentsListContainer = document.getElementById('commentsList');
  function refreshCommentsUI() {
    commentsListContainer.innerHTML = '';
    allComments.forEach(c => {
      const card = document.createElement('div');
      card.className = 'comment-card';
      card.innerHTML = `
        <div class="comment-top">
          <div class="avatar-circle">${c.avatar || c.author.substring(0, 2).toUpperCase()}</div>
          <span class="comment-author">${c.author}</span>
          <span class="comment-date">${c.timeAgo || 'Just now'}</span>
        </div>
        <p class="comment-body">${c.text}</p>
        ${c.replies && c.replies.length > 0 ? `
          <div class="replies-thread">
            ${c.replies.map(r => `
              <div class="reply-item">
                <div class="comment-top">
                  <div class="avatar-circle" style="width:26px; height:26px; font-size:10px;">${r.avatar || r.author.substring(0, 2).toUpperCase()}</div>
                  <span class="comment-author" style="font-size:13px;">${r.author}</span>
                  <span class="comment-date">${r.timeAgo || 'Just now'}</span>
                </div>
                <p class="comment-body" style="font-size:13px;">${r.text}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      `;
      commentsListContainer.appendChild(card);
    });

    const totalCount = getTotalCommentCount();
    document.getElementById('commentCountHeader').textContent = `${totalCount} Comments`;
    document.getElementById('commentCountTitle').textContent = totalCount;
  }
  refreshCommentsUI();

  // Like Button Functionality
  const btnLike = document.getElementById('btnLike');
  const likeBtnText = document.getElementById('likeBtnText');
  const likeCountDisplay = document.getElementById('likeCountDisplay');

  btnLike.addEventListener('click', () => {
    if (!hasLiked) {
      currentLikes += 1;
      hasLiked = true;
      btnLike.classList.add('liked');
      likeBtnText.textContent = `Liked (${currentLikes})`;
      showToast('You liked this case study!');
    } else {
      currentLikes -= 1;
      hasLiked = false;
      btnLike.classList.remove('liked');
      likeBtnText.textContent = `Like (${currentLikes})`;
      showToast('Like removed');
    }
    likeCountDisplay.textContent = `${currentLikes.toLocaleString()} Likes`;
  });

  // Share Button Functionality
  const btnShare = document.getElementById('btnShare');
  btnShare.addEventListener('click', () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Link copied to clipboard!');
      }).catch(() => {
        // Fallback without blocking prompt modal
        copyFallback(shareUrl);
      });
    } else {
      copyFallback(shareUrl);
    }
  });

  function copyFallback(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
    } catch (e) { }
    document.body.removeChild(tempInput);
    showToast('Link copied to clipboard!');
  }

  // Add Comment Form Submission
  const commentForm = document.getElementById('addCommentForm');
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const authorInput = document.getElementById('commentAuthor');
    const bodyInput = document.getElementById('commentBody');

    const author = authorInput.value.trim();
    const text = bodyInput.value.trim();

    if (!author || !text) return;

    const initials = author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    const newComment = {
      id: 'c_' + Date.now(),
      author: author,
      avatar: initials,
      timeAgo: 'Just now',
      text: text,
      replies: []
    };

    allComments.unshift(newComment);
    refreshCommentsUI();
    showToast('Comment posted successfully!');

    authorInput.value = '';
    bodyInput.value = '';
  });
}
