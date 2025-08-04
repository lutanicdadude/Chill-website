class Motivational extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.quotes = [
            { q: "Success is getting what you want. Happiness is wanting what you get.", a: "Dale Carnegie" },
            { q: "Start where you are. Use what you have. Do what you can.", a: "Arthur Ashe" },
            { q: "Doubt kills more dreams than failure ever will.", a: "Suzy Kassem" },
            { q: "Perseverance is not a long race; it is many short races one after the other.", a: "Walter Elliot" },
            { q: "What you get by achieving your goals is not as important as what you become by achieving your goals.", a: "Zig Ziglar" },
            { q: "Do what you love and success will follow. Passion is the fuel behind a successful career.", a: "Meg Whitman" },
            { q: "Only put off until tomorrow what you are willing to die having left undone.", a: "Pablo Picasso" },
            { q: "The secret of getting ahead is getting started.", a: "Mark Twain" },
            { q: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", a: "Aristotle" },
            { q: "If you don’t risk anything, you risk even more.", a: "Erica Jong" },
            { q: "You miss 100% of the shots you don’t take.", a: "Wayne Gretzky" },
            { q: "It takes as much energy to wish as it does to plan.", a: "Eleanor Roosevelt" },
            { q: "Opportunities multiply as they are seized.", a: "Sun Tzu" },
            { q: "The harder the conflict, the greater the triumph.", a: "George Washington" },
            { q: "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.", a: "Earl Nightingale" },
            { q: "A river cuts through rock, not because of its power, but because of its persistence.", a: "James N. Watkins" },
            { q: "The man who moves a mountain begins by carrying away small stones.", a: "Confucius" },
            { q: "Your limitation—it’s only your imagination.", a: "Unknown" },
            { q: "Don’t wait for opportunity. Create it.", a: "Unknown" },
            { q: "Dream big and dare to fail.", a: "Norman Vaughan" },
            { q: "Be so good they can’t ignore you.", a: "Steve Martin" },
            { q: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", a: "Ralph Waldo Emerson" },
            { q: "I find that the harder I work, the more luck I seem to have.", a: "Thomas Jefferson" },
            { q: "The only way to achieve the impossible is to believe it is possible.", a: "Charles Kingsleigh" },
            { q: "Opportunities are usually disguised as hard work, so most people don’t recognize them.", a: "Ann Landers" },
            { q: "Do something today that your future self will thank you for.", a: "Sean Patrick Flanery" },
            { q: "A goal without a plan is just a wish.", a: "Antoine de Saint-Exupéry" },
            { q: "Either you run the day, or the day runs you.", a: "Jim Rohn" },
            { q: "Don't be afraid to give up the good to go for the great.", a: "John D. Rockefeller" },
            { q: "There is no failure except in no longer trying.", a: "Elbert Hubbard" },
            { q: "The difference between ordinary and extraordinary is that little extra.", a: "Jimmy Johnson" },
            { q: "Make each day your masterpiece.", a: "John Wooden" },
            { q: "You don’t have to be great to start, but you have to start to be great.", a: "Zig Ziglar" },
            { q: "Great things are done by a series of small things brought together.", a: "Vincent Van Gogh" },
            { q: "Energy and persistence conquer all things.", a: "Benjamin Franklin" },
            { q: "I never lose. Either I win or I learn.", a: "Nelson Mandela" },
            { q: "Everything you’ve ever wanted is on the other side of fear.", a: "George Addair" },
            { q: "It is never too late to be what you might have been.", a: "George Eliot" },
            { q: "One way to keep momentum going is to have constantly greater goals.", a: "Michael Korda" },
            { q: "Our greatest glory is not in never falling, but in rising every time we fall.", a: "Confucius" },
            { q: "Stay hungry. Stay foolish.", a: "Steve Jobs" },
            { q: "Be not afraid of growing slowly; be afraid only of standing still.", a: "Chinese Proverb" },
            { q: "It’s not whether you get knocked down, it’s whether you get up.", a: "Vince Lombardi" },
            { q: "Small daily improvements are the key to staggering long-term results.", a: "Robin Sharma" },
            { q: "Whatever you are, be a good one.", a: "Abraham Lincoln" },
            { q: "Act as if it were impossible to fail.", a: "Dorothea Brande" },
            { q: "I attribute my success to this: I never gave or took any excuse.", a: "Florence Nightingale" },
            { q: "Don’t let what you cannot do interfere with what you can do.", a: "John Wooden" },
            { q: "Quality means doing it right when no one is looking.", a: "Henry Ford" },
            { q: "Courage is resistance to fear, mastery of fear—not absence of fear.", a: "Mark Twain" },
            { q: "The road to success and the road to failure are almost exactly the same.", a: "Colin R. Davis" },
            { q: "Learn as if you will live forever, live like you will die tomorrow.", a: "Mahatma Gandhi" },
            { q: "Don’t wait. The time will never be just right.", a: "Napoleon Hill" },
            { q: "What we achieve inwardly will change outer reality.", a: "Plutarch" },
            { q: "Inspiration does exist, but it must find you working.", a: "Pablo Picasso" },
            { q: "Keep going. Everything you need will come to you at the perfect time.", a: "Unknown" },
            { q: "Don’t let yesterday take up too much of today.", a: "Will Rogers" },
            { q: "Failure is the condiment that gives success its flavor.", a: "Truman Capote" },
            { q: "Do what you love, and you’ll never work a day in your life.", a: "Marc Anthony" },
            { q: "Make your life a masterpiece; imagine no limitations on what you can be, have, or do.", a: "Brian Tracy" },
            { q: "He who opens a school door, closes a prison.", a: "Victor Hugo" },
            { q: "Be yourself; everyone else is already taken.", a: "Oscar Wilde" },
            { q: "Everything you've ever wanted is on the other side of fear.", a: "George Addair" },
            { q: "Act as if what you do makes a difference. It does.", a: "William James" },
            { q: "Don’t limit your challenges. Challenge your limits.", a: "Jerry Dunn" },
            { q: "No masterpiece was ever created by a lazy artist.", a: "Salvador Dalí" },
            { q: "Life is 10% what happens to us and 90% how we react to it.", a: "Charles R. Swindoll" }
        ];

        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5em;
                    padding: 20px;
                    width: 100%;
                }
                .container {
                    background-image: url(/images/motivationbg.png);
                    background-repeat: no-repeat;
                    background-size: cover;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #ccc;
                    padding: 20px;
                    text-align: center;
                    width: 80%;
                    position: relative;
                }
                button {
                    margin-top: 10px;
                    padding: 10px 15px;
                    font-size: 1em;
                    cursor: pointer;
                }
            </style>
            <div class="container">
                <p id="quote">Click the button to get inspired!</p>
                <p id="author"></p>
                <button id="newQuoteBtn">Inspire Me</button>
            </div>
        `;

        this.shadowRoot.querySelector("#newQuoteBtn").addEventListener("click", () => this.getQuote());
    }

    getQuote() {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        const selectedQuote = this.quotes[randomIndex];

        this.shadowRoot.querySelector("#quote").textContent = `"${selectedQuote.q}"`;
        this.shadowRoot.querySelector("#author").textContent = `- ${selectedQuote.a}`;
    }
}

customElements.define('motivate-quote', Motivational);
