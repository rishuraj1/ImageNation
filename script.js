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


// Open AI Section




const dalleEndPoint = "https://api.openai.com/v1/images/generations"
const reqBtn = document.getElementById("send-request");
const imgContainer = document.getElementById("image-container");

reqBtn.onclick = function () {
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
        .then(json => console.log(json))
        .then(displayImage);
}

function displayImage(jsonData) {
    for (i = 0; i < jsonData.data.length; i++) {
        let imgURL = jsonData.data[i].url;
        const imgElem = document.createElement("img");
        imgElem.src = imgURL;
        imgElem.style.width = "100%";
        imgElem.style.height = "100%";
        imgElem.style.objectFit = "cover";
        imgElem.style.margin = "10px";
        imgContainer.appendChild(imgElem);
    }
}
