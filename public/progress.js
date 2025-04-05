document.addEventListener("DOMContentLoaded", function () {
    // Sample progress values (fetch from database in actual implementation)
    let progressData = {
        "web-progress": 75,
        "data-science-progress": 50,
        "ai-progress": 40
    };

    for (let id in progressData) {
        let progressElement = document.getElementById(id);
        if (progressElement) {
            let percentage = progressData[id] + "%";
            progressElement.style.width = percentage;
            progressElement.innerText = percentage;
        }
    }
});
