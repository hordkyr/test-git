const commitBtn = document.getElementById("commitBtn");
const clearBtn = document.getElementById("clearBtn");
const commitList = document.getElementById("commitList");
const commitCount = document.getElementById("commitCount");

let commits = JSON.parse(localStorage.getItem("commits")) || [];

function generateHash() {
    return Math.random().toString(16).substring(2, 9);
}

function renderCommits() {
    commitList.innerHTML = "";
    commits.forEach(commit => {
        const div = document.createElement("div");
        div.classList.add("commit");
        div.innerHTML = `
            <div class="commit-hash">${commit.hash}</div>
            <strong>${commit.message}</strong><br>
            <small>by ${commit.author} • ${commit.date}</small>
        `;
        commitList.appendChild(div);
    });
    commitCount.textContent = commits.length;
}

commitBtn.addEventListener("click", () => {
    const author = document.getElementById("author").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!author || !message) {
        alert("Please fill in all fields");
        return;
    }

    const newCommit = {
        hash: generateHash(),
        author,
        message,
        date: new Date().toLocaleString()
    };

    commits.unshift(newCommit);
    localStorage.setItem("commits", JSON.stringify(commits));
    renderCommits();

    document.getElementById("author").value = "";
    document.getElementById("message").value = "";
});

clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear commit history?")) {
        commits = [];
        localStorage.removeItem("commits");
        renderCommits();
    }
});

renderCommits();
