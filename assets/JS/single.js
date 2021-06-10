var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

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
            typeEl.textContent = "(Pull request)";
        }else{
            typeEl.textContent="(Issue)";
        }

        issueEl.appendChild(typeEl);
        console.log(issueEl);

        issueContainerEl.appendChild(issueEl);
    }
}

var displayWarning = function(repo){
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    //append link
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href","https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target","_blank");
    limitWarningEl.appendChild(linkEl);
}

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response){
        if (response.ok){
            response.json().then(function(data){
                displayIssues(data);

                //check if api has paginated issues
                if (response.headers.get("Link")){
                    displayWarning(repo);
                }
            })
        }else{
            window.alert("There was a problem with your request!");
        }
    });
}

getRepoIssues("facebook/react");