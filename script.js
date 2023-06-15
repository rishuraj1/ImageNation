let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}



function openSignIn() {
    window.location.href = "login.html";
}

function openSignUp() {
    window.location.href = "signup.html";
}


function goToGithub() {
    window.open("https://github.com/rishuraj1/ImageNation", "_blank");
}

function goToMyLinkedin() {
    window.open("https://www.linkedin.com/in/rishu-raj-b380041a1/", "_blank");
}

function goToMyGithub() {
    window.open("https://github.com/rishuraj1", "_blank");
}
function goToMyTwitter() {
    window.open("https://twitter.com/rrishu561", "_blank");
}


// Open AI Section




const dalleEndPoint = "https://api.openai.com/v1/images/generations"
const reqBtn = document.getElementById("send-request");
const imgContainer = document.getElementById("image-container");

reqBtn.onclick = function () {
    const reqStat = document.getElementById("req-status-value");
    reqStat.innerText = "Processing...";
    const API_KEY = document.getElementById("api-key").value;

    const count = Number(document.getElementById("image-count").value);

    const prompt = document.getElementById("image-prompt").value;

    const reqBody = {
        prompt: prompt,
        n: count,
        size: '1024x1024',
        response_format: 'url'
    }
    // console.log(reqBody);

    const reqParams = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(reqBody)
    }

    fetch(dalleEndPoint, reqParams)
        .then(res => res.json())
        .then(displayImages)
        .catch(err => reqStat.innerText = "error!");

}

function displayImages(jsonData) {
    try {
        const reqStat = document.getElementById("req-status-value");
        reqStat.innerText = "Done";

        const images = jsonData.data;

        images.forEach(img => {
            const imgURL = img.url;
            const imgDiv = document.createElement("div");
            imgDiv.classList.add("image-div");
            const imgTag = document.createElement("img");
            const download = document.createElement("button");
            download.innerText = "Download";
            download.classList.add("download-btn");

            imgTag.src = imgURL;
            imgDiv.prepend(imgTag);
            imgDiv.append(download);
            imgContainer.prepend(imgDiv);

            download.addEventListener("click", () => {
                downloadImg(imgURL);
            })

            function downloadImg(imgURl) {

            }
        });

    } catch (err) {
        console.log(err);
    }
}


