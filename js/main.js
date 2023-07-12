// Main Variables
let repoInput = document.querySelector(".get-repos input");
let getBtn = document.querySelector(".get-repos span");
let reposData = document.querySelector(".show-data");

getBtn.addEventListener("click", function () {
  getRepos();
});

// Get Repos
function getRepos() {
  if (repoInput.value == "") {
    reposData.innerHTML = "<span>Please write GitHub username.</span>";
  } else {
    let fetchReq = `https://api.github.com/users/${repoInput.value}/repos`;
    fetch(fetchReq)
      .then((response) => response.json())
      .then((data) => {
        reposData.innerHTML = "";
        data.forEach((repo) => {
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo["name"]);
          mainDiv.appendChild(repoName);

          let infoDiv = document.createElement("div");
          infoDiv.className = "info";

          let theUrl = document.createElement("a");
          let urlText = document.createTextNode("Visit");
          theUrl.appendChild(urlText);
          theUrl.href = `https://github.com/${repoInput.value}/${repo["name"]}`;
          theUrl.setAttribute("target", "_blank");

          let starsSpan = document.createElement("span");
          let starsText = document.createTextNode(
            `Stars ${repo["stargazers_count"]}`
          );
          starsSpan.appendChild(starsText);
          infoDiv.appendChild(starsSpan);
          infoDiv.appendChild(theUrl);
          mainDiv.appendChild(infoDiv);

          mainDiv.className = "repo-box";

          reposData.appendChild(mainDiv);
        });
      });
  }
}
