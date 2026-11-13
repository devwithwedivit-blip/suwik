/**
 * MKTG - Analytics Dashboard Script
 * Processes metrics, computes engagement rate, renders comparison table,
 * generates qualitative performance insights, and initializes Chart.js visualizations.
 */

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const [postsRes, engageRes] = await Promise.all([
      fetch('data/posts.json'),
      fetch('data/engagement.json')
    ]);

    const posts = await postsRes.json();
    const engagementData = await engageRes.json();

    initAnalytics(posts, engagementData);
  } catch (err) {
    console.error('Error loading analytics:', err);
    document.getElementById('analyticsContent').innerHTML = '<p class="body-md">Error loading analytics data.</p>';
  }
});

function initAnalytics(posts, engagementData) {
  // Merge posts with engagement data
  const mergedData = posts.map(p => {
    const eng = engagementData.posts.find(e => e.postId === p.id) || {
      views: 0,
      likes: 0,
      shares: 0,
      dailyViews: [0, 0, 0, 0, 0, 0, 0],
      comments: []
    };

    let commentCount = 0;
    if (eng.comments) {
      eng.comments.forEach(c => {
        commentCount += 1;
        if (c.replies) commentCount += c.replies.length;
      });
    }

    const totalInteractions = eng.likes + commentCount + eng.shares;
    const engagementRate = eng.views > 0 ? (totalInteractions / eng.views) * 100 : 0;

    return {
      id: p.id,
      brand: p.brand,
      title: p.title,
      slug: p.slug,
      category: p.category,
      views: eng.views,
      likes: eng.likes,
      shares: eng.shares,
      comments: commentCount,
      engagementRate: engagementRate,
      dailyViews: eng.dailyViews || [0, 0, 0, 0, 0, 0, 0]
    };
  });

  // Calculate high-level KPIs
  const totalViews = mergedData.reduce((acc, d) => acc + d.views, 0);
  const totalLikes = mergedData.reduce((acc, d) => acc + d.likes, 0);
  const totalShares = mergedData.reduce((acc, d) => acc + d.shares, 0);
  const totalComments = mergedData.reduce((acc, d) => acc + d.comments, 0);
  const avgEngRate = totalViews > 0 ? ((totalLikes + totalShares + totalComments) / totalViews) * 100 : 0;

  renderKPIs(totalViews, totalLikes, totalShares, totalComments, avgEngRate);
  renderSpotlights(mergedData);
  renderTable(mergedData);
  renderCharts(mergedData, engagementData.days || ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]);
}

function renderKPIs(views, likes, shares, comments, rate) {
  const container = document.getElementById('kpiContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="kpi-card">
      <div class="kpi-label">Total Views</div>
      <div class="kpi-value">${views.toLocaleString()}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Total Likes</div>
      <div class="kpi-value">${likes.toLocaleString()}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Total Shares</div>
      <div class="kpi-value">${shares.toLocaleString()}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Total Comments</div>
      <div class="kpi-value">${comments.toLocaleString()}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Avg. Engagement Rate</div>
      <div class="kpi-value">${rate.toFixed(2)}%</div>
    </div>
  `;
}

function renderSpotlights(data) {
  const container = document.getElementById('spotlightContainer');
  if (!container) return;

  // Sort by engagement rate
  const sorted = [...data].sort((a, b) => b.engagementRate - a.engagementRate);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  container.innerHTML = `
    <div class="spotlight-card spotlight-best">
      <span class="spotlight-badge">★ Highest Engagement Performer</span>
      <h3 class="h3" style="font-size:24px; margin-bottom:8px;">${best.brand} (${best.engagementRate.toFixed(2)}%)</h3>
      <p class="body-md" style="color:var(--text-secondary); margin-bottom:14px;">
        ${best.title}
      </p>
      <p class="body-sm" style="color:var(--text-primary); line-height:1.5;">
        <strong>Diagnostic Insight:</strong> ${best.brand} achieved the benchmark-leading engagement rate driven by massive social shareability and high interaction density (${best.likes} likes and ${best.shares} shares against ${best.views.toLocaleString()} views). The witty, conversational messaging resonated strongly with user sentiment, proving that cultural moment marketing yields high-velocity organic amplification without paid push fatigue.
      </p>
    </div>

    <div class="spotlight-card spotlight-worst">
      <span class="spotlight-badge">▼ Lowest Engagement Performer</span>
      <h3 class="h3" style="font-size:24px; margin-bottom:8px;">${worst.brand} (${worst.engagementRate.toFixed(2)}%)</h3>
      <p class="body-md" style="color:var(--text-secondary); margin-bottom:14px;">
        ${worst.title}
      </p>
      <p class="body-sm" style="color:var(--text-primary); line-height:1.5;">
        <strong>Diagnostic Insight:</strong> While ${worst.brand} maintains high global brand awareness, this case study recorded lower interaction depth (${worst.likes} likes, ${worst.shares} shares). In educational content funnels, broad lifestyle narratives often generate passive consumption rather than active commenting. To lift engagement, incorporating interactive polls or localized student prompts would bridge the gap between admiration and active participation.
      </p>
    </div>
  `;
}

function renderTable(data) {
  const tbody = document.getElementById('analyticsTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  data.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="num-cell" style="color:var(--text-secondary);">${String(idx + 1).padStart(2, '0')}</td>
      <td>
        <a href="article.html?slug=${item.slug}" style="font-weight:400; text-decoration:none;">
          ${item.brand}
        </a>
        <div style="font-size:11px; color:var(--text-secondary);">${item.category}</div>
      </td>
      <td class="num-cell">${item.views.toLocaleString()}</td>
      <td class="num-cell">${item.likes.toLocaleString()}</td>
      <td class="num-cell">${item.shares.toLocaleString()}</td>
      <td class="num-cell">${item.comments.toLocaleString()}</td>
      <td class="num-cell" style="font-weight:500; color:var(--text-primary);">${item.engagementRate.toFixed(2)}%</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderCharts(data, dayLabels) {
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js not loaded');
    return;
  }

  // Set global Chart.js defaults matching minimal monochrome styling
  Chart.defaults.font.family = 'Helvetica, "Helvetica Neue", Arial, sans-serif';
  Chart.defaults.color = '#737373';
  Chart.defaults.scale.grid.color = '#EFEFEF';

  // 1. Bar Chart: Likes per Post
  const barCanvas = document.getElementById('likesBarChart');
  if (barCanvas) {
    new Chart(barCanvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: data.map(d => d.brand),
        datasets: [{
          label: 'Likes',
          data: data.map(d => d.likes),
          backgroundColor: '#1A1A1A',
          hoverBackgroundColor: '#4A4A4A',
          borderRadius: 4,
          barThickness: 24
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1A1A1A',
            padding: 10,
            cornerRadius: 4,
            titleFont: { size: 12, weight: 'normal' },
            bodyFont: { size: 12, family: '"BB Manual Mono", monospace' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { family: '"BB Manual Mono", monospace', size: 10 }
            }
          },
          x: {
            ticks: {
              font: { family: '"BB Manual Mono", monospace', size: 11 }
            }
          }
        }
      }
    });
  }

  // 2. Line Chart: 7-Day Views Trends (Top 4 vs Bottom 4 or Aggregated trend)
  const lineCanvas = document.getElementById('viewsLineChart');
  if (lineCanvas) {
    // Generate total day-wise views across all posts
    const aggregateDailyViews = [0, 0, 0, 0, 0, 0, 0];
    data.forEach(d => {
      d.dailyViews.forEach((v, i) => {
        if (i < 7) aggregateDailyViews[i] += v;
      });
    });

    // Individual top brands lines for depth
    const colors = ['#1A1A1A', '#555555', '#888888', '#AAAAAA'];
    const top4 = [...data].sort((a, b) => b.views - a.views).slice(0, 4);

    const datasets = top4.map((post, idx) => ({
      label: post.brand,
      data: post.dailyViews,
      borderColor: colors[idx],
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
      tension: 0.35
    }));

    // Add aggregate line
    datasets.unshift({
      label: 'All Posts Combined',
      data: aggregateDailyViews,
      borderColor: '#000000',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      fill: true,
      borderDash: [4, 4],
      borderWidth: 1.5,
      pointRadius: 2,
      tension: 0.35
    });

    new Chart(lineCanvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: dayLabels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 12,
              font: { family: '"BB Manual Mono", monospace', size: 10 },
              padding: 12
            }
          },
          tooltip: {
            backgroundColor: '#1A1A1A',
            padding: 10,
            cornerRadius: 4,
            titleFont: { size: 12, weight: 'normal' },
            bodyFont: { size: 11, family: '"BB Manual Mono", monospace' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: { family: '"BB Manual Mono", monospace', size: 10 }
            }
          },
          x: {
            ticks: {
              font: { family: '"BB Manual Mono", monospace', size: 11 }
            }
          }
        }
      }
    });
  }
}

