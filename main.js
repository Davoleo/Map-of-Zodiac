var buttonWindows = document.getElementById("windows-download-button");
var buttonMac = document.getElementById("mac-download-button");
var buttonLinux = document.getElementById("linux-download-button");

var counterParagraph = document.querySelector('footer p');

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
                count += asset.download_count;
            });
        });

        counterParagraph.textContent = counterParagraph.textContent + " " + count;
    })
}

getLatestVersion();

getDownloadCount();