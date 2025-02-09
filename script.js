async function fetchData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

function populateSocialMediaStats(data) {
  const container = document.querySelector(".social-media-stats__container");
  container.innerHTML = "";
  data.social_media_stats.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("social-media-stats__card", item.platform.toLowerCase());
    card.innerHTML = `
      <div class="card__header">
        <img src="images/icon-${item.platform.toLowerCase()}.svg" alt="${
      item.platform
    }" />
        <p class="user-name bold secondary">${item.username}</p>
      </div>
      <div class="card__core">
        <p class="big-text bold primary">${
          item.followers || item.subscribers
        }</p>
        <p class="followers secondary">${
          item.platform === "YouTube" ? "subscribers" : "followers"
        }</p>
      </div>
      <div class="card__footer">
        <img src="images/icon-${
          item.change_today >= 0 ? "up" : "down"
        }.svg" alt="" />
        <p class="overview__card__change bold ${
          item.change_today >= 0 ? "green-text" : "red-text"
        }">
          ${Math.abs(item.change_today)} today
        </p>
      </div>
    `;
    container.appendChild(card);
  });
}

function populateEngagementMetrics(data) {
  const container = document.querySelector(".engagement-metrics__container");
  container.innerHTML = "";
  data.engagement_metrics.forEach((metric) => {
    const card = document.createElement("article");
    card.classList.add("engagement-metrics__card");
    card.innerHTML = `
      <header class="metrics-card__header">
        <h4 class="metrics-card__title overview__card__heading secondary">
          ${metric.metric}
        </h4>
        <img class="metrics-card__image" src="images/icon-${metric.platform.toLowerCase()}.svg" alt="${
      metric.platform
    }" />
      </header>
      <footer class="metrics-card__footer">
        <p class="metrics-card__count overview__card__count bold primary">${
          metric.value
        }</p>
        <p class="metrics-card__change ${
          metric.change_percentage >= 0 ? "green-text" : "red-text"
        } bold overview__card__change">
          <img src="images/icon-${
            metric.change_percentage >= 0 ? "up" : "down"
          }.svg" alt="" />
          ${Math.abs(metric.change_percentage)}%
        </p>
      </footer>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.querySelector("body");
  themeToggle.addEventListener("change", function () {
    body.classList.toggle("dark", themeToggle.checked);
  });
  const data = await fetchData();
  if (data) {
    populateSocialMediaStats(data);
    populateEngagementMetrics(data);
  }
});
