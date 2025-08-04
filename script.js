const username = 'KDavis00'; 

async function fetchRepos() {
  const repoList = document.getElementById('repoList');
  repoList.innerHTML = 'Loading repositories...';

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const repos = await response.json();
    console.log(repos); // Check output here

    if (!Array.isArray(repos) || repos.length === 0) {
      repoList.innerHTML = '<li>No repositories found.</li>';
      return;
    }

    repoList.innerHTML = '';

    repos.forEach(repo => {
      const li = document.createElement('li');
      li.className = 'repo-item';

      li.innerHTML = `
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
        <p class="repo-desc">${repo.description || 'No description available.'}</p>
      `;

      repoList.appendChild(li);
    });

  } catch (error) {
    repoList.innerHTML = `<li>Error fetching repositories: ${error.message}</li>`;
    console.error(error);
  }
}

fetchRepos();
