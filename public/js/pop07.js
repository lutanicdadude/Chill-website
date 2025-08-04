class ImageSwitcher extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    text-align: center;
                    margin-top: 20px;
                }
                img {
                    width: 300px;
                    height: auto;
                    border-radius: 10px;
                }
                button {
                    display: block;
                    margin: 20px auto;
                    padding: 10px 20px;
                    background-color: rgb(255, 180, 19);
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                    font-size: 16px;
                }
                button:hover {
                    background-color: rgb(214, 152, 18);
                }
            </style>
            <div class="container">
                <h1 id="clickCounter">0</h1>
                <img id="displayImage" src="/images/class mascot.png" alt="">
                <button id="changeButton">CLICK!</button>
            </div>
        `;
    }

    attachEventListeners() {
        const button = this.shadowRoot.querySelector("#changeButton");
        const image = this.shadowRoot.querySelector("#displayImage");
        const counterDisplay = this.shadowRoot.querySelector("#clickCounter");
        let value = parseInt(counterDisplay.textContent, 10); // Convert to number

        // Original image
        const originalImage = image.src;

        // New image
        const newImage = "/images/class mascot hands raising.png";

        // Function to change image and revert after 1 second
        const changeImage = async () => {
            // Change image
            image.src = newImage;

            // Play sound
            const sound = new Audio("/images/pop sound.mp3");
            sound.play();

            // Add count
            value++;

            if (value % 100 == 0) {
                console.log("hi");
                let showMeme = await getMeme();
                counterDisplay.innerHTML = `
                    <img src="${showMeme}" alt="Meme" width="300">
                `;
            } else {
                counterDisplay.textContent = `${value}`;
            }

            // Revert back after 1 second
            setTimeout(() => {
                image.src = originalImage;
            }, 100);
        };

        // Mouse click event anywhere on the page
        document.addEventListener("click", (event) => {
            if (!this.shadowRoot.contains(event.target)) {
                changeImage();
            }
        });

        console.log(value)
    }
}

async function getMeme() {
    let meme = await fetch("https://meme-api.com/gimme");
    if (!meme.ok) {
        throw new Error(`Failed to fetch meme: ${meme.status}`);
    }
    let useMeme = await meme.json();
    return useMeme.url;
}

customElements.define("image-switcher", ImageSwitcher);