var issueContainerEl = document.querySelector("#issues-container");

var displayIssues = function(issues){

    if (issues.length === 0){
        issueContainerEl.textContent="This repo has no open issues!";
        return;
    }
    
    for (x=0;x<issues.length;x++){
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[x].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[x].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if (issues[x].pull_request) {
            typeEl.textConten = "(Pull request)";
        }else{
            typeEl.textContent="(Issue)";
        }

        issueEl.appendChild(typeEl);
        console.log(issueEl);

        issueContainerEl.appendChild(issueEl);
    }
}

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                displayIssues(data);
            })
        }else{
            window.alert("There was a problem with your request!");
        }
    });
}

getRepoIssues("lrk83/git-it-done");