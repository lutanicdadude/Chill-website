class BallAnswer extends HTMLElement {
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
                .box {
                    padding: 50px;
                    border-radius: 10px;
                    text-align: center;
                    font-family: Arial, sans-serif;
                    background-color:rgb(221, 172, 109);
                    width: 200px;
                }
                button {
                    padding: 15px 30px;
                    font-size: 20px;
                    border: none;
                    background-color:rgb(255, 180, 19);
                    color: black;
                    cursor: pointer;
                    border-radius: 5px;
                }
                #answerForBall {
                    font-size: 35px;
                }
                button:hover {
                    background-color:rgb(214, 152, 18);
                }
            </style>
            <div class="box">
                <h2 id="answerForBall"></h2>
                <button>${this.getAttribute('button-text') || 'Click Me'}</button>
            </div>
        `;
    }

    attachEventListeners() {
        const button = this.shadowRoot.querySelector("button");
        if (button) {
            button.addEventListener("click", () => {
                this.returnAnswer();
            });
        };
    }

    returnAnswer() {
        const answers = ["It is certain", "It is decidedly so", "Without a doubt",
            "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely",
            "Outlook good", "Yes", "Signs point to yes", "Reply hazy, try again",
            "Ask again later", "Better not tell you now", "Cannot predict now",
            "Concentrate and ask again", "Don't count on it", "My reply is no",
            "My sources say no", "Outlook not so good", "Very doubtful"
        ];

        const randomAnswerIndex = Math.floor(Math.random() * answers.length);
        const answerElement = this.shadowRoot.querySelector("#answerForBall");

        if (answerElement) {
            answerElement.textContent = answers[randomAnswerIndex];
        }
    }
}

customElements.define('ball-answer', BallAnswer);
