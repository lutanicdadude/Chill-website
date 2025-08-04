class SelectOption extends HTMLElement {
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
                .image-container {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 20px;
                    width: 80%; /* Default width for large screens */
                    margin-left: auto;
                    margin-right: auto;
                }
                .image-container img {
                    width: 150px;
                    height: auto;
                    border-radius: 10px;
                    cursor: pointer;
                    border: 3px solid transparent;
                }
                img.selected {
                    border: 3px solid rgb(255, 180, 19);
                }
                .selected-text {
                    margin-top: 20px;
                    font-size: 18px;
                    font-weight: bold;
                }
                .option-container {
                    text-align: center;
                    margin-top: 20px;
                    display: flex;
                    flex-wrap: wrap;
                }
                .option-container .row {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    width: 100%;
                }

                .option-container .col-md-6 {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                    min-width: 150px;
                    padding: 10px;
                    text-align: center;
                    height: 100px;
                }

                /* Adjust image-container and images on mobile */
                @media (max-width: 768px) {
                    .image-container {
                        width: 60%; /* Make the container smaller on mobile */
                    }
                    .image-container img {
                        width: 100px; /* Reduce image size on mobile */
                    }

                    .option-container .row {
                        flex-direction: column;
                        align-items: center;
                    }

                    .option-container .col-md-6 {
                        min-width: 100%;
                    }
                }
            </style>
            <div class="container">
                <h1>Select an option</h1>
                <div class="image-container">
                    <img src="/images/user rock.png" alt="Rock" data-value="Rock">
                    <img src="/images/user paper.png" alt="Paper" data-value="Paper">
                    <img src="/images/user sissors.png" alt="Scissors" data-value="Scissors">
                </div>
                <div class="selected-text" id="selectedText">No selection yet</div>
                <div class="option-container text-center">
                    <div class="row">
                        <div class="col-md-6">
                            <div id="computerOption"></div>
                        </div>
                        <div class="col-md-6">
                            <div id="userOption"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const images = this.shadowRoot.querySelectorAll(".image-container img");
        const selectedText = this.shadowRoot.querySelector("#selectedText");
        const compImgDiv = this.shadowRoot.querySelector("#computerOption");
        const userImgDiv = this.shadowRoot.querySelector("#userOption");

        images.forEach(img => {
            img.addEventListener("click", () => {
                // Remove selected class from all images
                images.forEach(image => image.classList.remove("selected"));

                // Add selected class to the clicked image
                img.classList.add("selected");

                // Get the selected image's data-value
                const selectedValue = img.getAttribute("data-value");
                selectedText.textContent = `You selected: ${selectedValue}`;

                // Display the user's selected image
                const userImage = document.createElement('img');
                userImage.src = img.src; // Use the clicked image's source
                userImage.alt = selectedValue;
                userImage.width = 150; // You can set the width as needed

                // Clear previous content and append the new image for the user's selection
                userImgDiv.innerHTML = '';
                userImgDiv.appendChild(userImage);

                // Simulate computer's selection
                let randomSelect = Math.floor(Math.random() * 3);
                let ComputerSelect;
                let ComputerOptionImg;

                if (randomSelect === 0) {
                    ComputerSelect = "Rock";
                    ComputerOptionImg = "/images/mascot stone.png";
                } else if (randomSelect === 1) {
                    ComputerSelect = "Paper";
                    ComputerOptionImg = "/images/mascot paper.png";
                } else if (randomSelect === 2) {
                    ComputerSelect = "Scissors";
                    ComputerOptionImg = "/images/sissors mouse.png";
                }

                // Create a new image element for the computer's selection
                const computerImage = document.createElement('img');
                computerImage.src = ComputerOptionImg;
                computerImage.alt = ComputerSelect;
                computerImage.width = 150; // Set width for consistency

                // Clear previous content and append the new image for the computer's selection
                compImgDiv.innerHTML = '';
                compImgDiv.appendChild(computerImage);

                this.checkWinner(selectedValue, ComputerSelect);
            });
        });
    }

    checkWinner(userChoice, computerChoice) {
        const selectedText = this.shadowRoot.querySelector("#selectedText");
        if (userChoice == computerChoice) {
            selectedText.innerHTML = "It is a tie";
            console.log("Tie");
        } else if (
            (userChoice === "Rock" && computerChoice === "Scissors") ||
            (userChoice === "Scissors" && computerChoice === "Paper") ||
            (userChoice === "Paper" && computerChoice === "Rock")
        ) {
            selectedText.innerHTML = "You Won!";
            console.log("Win");
        } else {
            selectedText.innerHTML = "07 Won!";
            console.log("Lose");
        }
    }
}

customElements.define("select-hand", SelectOption);
