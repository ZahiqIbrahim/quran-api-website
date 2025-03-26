function fetchVerse() {
    const chapter = document.getElementById('chapter').value;
    const verse = document.getElementById('verse').value;
    
    if (!chapter || !verse) {
        alert("Please enter both Chapter and Verse numbers.");
        return;
    }

    const url = `https://quran-api-7tom.onrender.com/quran/${chapter}/${verse}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('result').innerText = "Verse not found!";
            } else {
                document.getElementById('result').innerHTML = `
                    <h2>${data.chapter} (${chapter}:${verse})</h2>
                    <p>${data.text}</p>
                `;
            }
        })
        .catch(error => {
            console.error("Error fetching verse:", error);
            document.getElementById('result').innerText = "Failed to fetch the verse.";
        });
}
function start() {
    const chapter = 1;
    const verse = 1;
    const url = `https://quran-api-7tom.onrender.com/quran/${chapter}/${verse}`;
    let button = document.getElementById("startButton");

    // Show loading state (optional)
    button.innerText = "Loading...";
    button.style.opacity = "0.7";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            button.style.opacity = "1"; // Reset opacity

            if (data.error) {
                document.getElementById('result').innerText = "Verse not found!";
                button.classList.remove("success");
                button.classList.add("error"); // Turn red on error
                button.innerText = "Try Again";
            } else {
                document.getElementById('result').innerHTML = `
                    <h2>${data.chapter} (${chapter}:${verse})</h2>
                    <p>${data.text}</p>
                `;
                button.classList.remove("error");
                button.classList.add("success"); // Turn blue on success
                button.innerText = "API Active";
            }
        })
        .catch(error => {
            console.error("Error fetching verse:", error);
            document.getElementById('result').innerText = "Failed to fetch the verse.";
            button.classList.remove("success");
            button.classList.add("error"); // Turn red on failure
            button.innerText = "Error!";
            button.style.opacity = "1"; // Reset opacity
        });
}

function copyToClipboard() {
    var copyText = document.getElementById("api-url").textContent;
    navigator.clipboard.writeText(copyText).then(() => {
       
    });
}