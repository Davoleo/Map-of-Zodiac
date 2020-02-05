var buttonWindows = document.getElementById("windows-download-button");
var buttonMac = document.getElementById("mac-download-button");
var buttonLinux = document.getElementById("linux-download-button");

var counterParagraph = document.querySelector('footer p');

var navContent = document.querySelector("ul.nav");
var hamburger = document.querySelector("nav>img");

function getLatestVersion() {
    fetch(`https://api.github.com/repos/Davoleo/Map-of-Zodiac/releases/latest`, {method: 'GET'})
    .then(res => res.json())
    .then(res => {

        console.log(res);
        
        res.assets.forEach( asset => {

            if (asset.name.indexOf(".WIN") != -1) {
                buttonWindows.innerHTML = buttonWindows.innerHTML + "v" + res.tag_name;
                buttonWindows.setAttribute("href", asset.browser_download_url);
            }

            if (asset.name.indexOf(".OSX") != -1) {
                buttonMac.innerHTML = buttonMac.innerHTML + "v" + res.tag_name;
                buttonMac.setAttribute("href", asset.browser_download_url);
            }

            if (asset.name.indexOf(".LIN") != -1) {
                buttonLinux.innerHTML = buttonLinux.innerHTML + "v" + res.tag_name;
                buttonLinux.setAttribute("href", asset.browser_download_url);
            }

        });
    })
}

function getDownloadCount() {
    fetch(`https://api.github.com/repos/Davoleo/Map-of-Zodiac/releases`, {method: 'GET'})
    .then(response => response.json())
    .then(response => {
        let count = 0;

        response.forEach(release => {
            release.assets.forEach( asset => {
                if (isExecAsset)
                    count += asset.download_count;
            });
        });

        counterParagraph.textContent = counterParagraph.textContent + " " + count;
    })
}

function isExecAsset(asset) {
    let name = asset.name;
    return (name.indexOf(".WIN") != -1 || name.indexOf(".OSX") != -1 || name.indexOf(".LIN") != -1);
}

getLatestVersion();

getDownloadCount();

function hideShowSidebarContent() {
    if (document.body.clientWidth > 800) {
        navContent.classList.toggle("Hidden");
        hamburger.classList.toggle("Hidden");
    }
}

navContent.parentElement.addEventListener("mouseenter", hideShowSidebarContent);
navContent.parentElement.addEventListener("mouseleave", hideShowSidebarContent);