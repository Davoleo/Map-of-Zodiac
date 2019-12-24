var button = document.getElementById("download-button");
var counterParagraph = document.querySelector('footer p');

function getLatestVersion() {
    fetch(`https://api.github.com/repos/Davoleo/Map-of-Zodiac/releases/latest`, {method: 'GET'})
    .then(res => res.json())
    .then(res => {
        button.innerHTML = button.innerHTML + " " + res.tag_name;
    })
}

function getDownloadCount() {
    fetch(`https://api.github.com/repos/Davoleo/Map-of-Zodiac/releases`, {method: 'GET'})
    .then(response => response.json())
    .then(response => {

        let count = 0;

        response.forEach(release => {
            console.log(release.assets[0].download_count);
            count += release.assets[0].download_count;
        });

        counterParagraph.textContent = counterParagraph.textContent + " " + count;
    })
}

getLatestVersion();

getDownloadCount();