// main.ts
// Fetch and display GitHub profile and repositories for Thursaun

const GITHUB_USERNAME = "Thursaun";
const API_BASE = `https://api.github.com/users/${GITHUB_USERNAME}`;

async function fetchProfile() {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
}

async function fetchRepos() {
    const res = await fetch(`${API_BASE}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error("Failed to fetch repos");
    return res.json();
}

function renderProfile(profile: any) {
    const el = document.getElementById("profile");
    if (!el) return;
    el.innerHTML = `
        <img src="${profile.avatar_url}" alt="${profile.name}" />
        <div class="profile-info">
            <h1>${profile.name || profile.login}</h1>
            <p>${profile.bio || ""}</p>
            <div class="stats">
                <span class="stat">👥 ${profile.followers} followers</span>
                <span class="stat">⭐ ${profile.public_repos} repos</span>
                <span class="stat">📍 ${profile.location || ""}</span>
            </div>
            <p><a href="${profile.html_url}" target="_blank">View on GitHub</a></p>
        </div>
    `;
}

function renderRepos(repos: any[]) {
    const el = document.getElementById("repos");
    if (!el) return;
    el.innerHTML = `
        <h2>Latest Repositories</h2>
        <ul class="repo-list">
            ${repos.map(repo => `
                <li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <p>${repo.description || "No description"}</p>
                </li>
            `).join("")}
        </ul>
    `;
}

async function main() {
    try {
        const [profile, repos] = await Promise.all([
            fetchProfile(),
            fetchRepos()
        ]);
        renderProfile(profile);
        renderRepos(repos);
    } catch (e) {
        document.body.innerHTML = `<div style="color:red;text-align:center;margin-top:40px;">Failed to load GitHub data.</div>`;
    }
}

main();
