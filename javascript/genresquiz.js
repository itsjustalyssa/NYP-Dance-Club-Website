// This Javascript is done by: Huang Ru Yi Lily
// This is the Genres Quiz page javascript

// Wait for the DOM to be fully loaded before running the script
window.addEventListener('DOMContentLoaded', () => {

    // Initialize quiz questions and answers
    const questions = [
        {
            question: "What kind of music do you enjoy most?",
            answers: [
                { text: "Beats with strong rhythm and groove", genre: "Hip-Hop" },
                { text: "Smooth, jazzy tunes", genre: "Jazz" },
                { text: "Emotional and flowing music", genre: "Contemporary" },
                { text: "Energetic, upbeat dance music", genre: "House" },
            ]
        },
        {
            question: "How do you like to move?",
            answers: [
                { text: "Sharp, expressive, and full of attitude", genre: "Hip-Hop" },
                { text: "Graceful with lots of style and flair", genre: "Jazz" },
                { text: "Fluid, gentle, and emotional", genre: "Contemporary" },
                { text: "Smooth and fast with a steady beat", genre: "House" },
            ]
        },
        {
            question: "Which setting sounds best for dancing?",
            answers: [
                { text: "On the street or in a club with friends", genre: "Hip-Hop" },
                { text: "On a stage with bright lights", genre: "Jazz" },
                { text: "A quiet theater or studio", genre: "Contemporary" },
                { text: "At a party or festival with loud music", genre: "House" },
            ]
        },
        {
            question: "What feeling do you want to express when you dance?",
            answers: [
                { text: "Confidence and energy", genre: "Hip-Hop" },
                { text: "Fun and elegance", genre: "Jazz" },
                { text: "Emotion and storytelling", genre: "Contemporary" },
                { text: "Joy and freedom", genre: "House" },
            ]
        }
    ];

    // Tracks current question index and score tally for each genre
    let currentQuestionIndex = 0;
    const scores = {
        "Hip-Hop": 0,
        "Jazz": 0,
        "Contemporary": 0,
        "House": 0
    };

    // Get the quiz container element
    const quizContainer = document.getElementById('quiz-container');

    // Use Bootstrap classes
    quizContainer.classList.add('bg-white', 'p-4', 'rounded', 'mx-auto');
    quizContainer.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.08)';
    quizContainer.style.minHeight = '230px';

    // Create Spotify embed element
    const spotifyEmbed = document.createElement('iframe');
    spotifyEmbed.width = "100%";
    spotifyEmbed.height = "380";
    spotifyEmbed.frameBorder = "0";
    spotifyEmbed.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
    spotifyEmbed.loading = "lazy";

    const spotifyLinks = {
        "Hip-Hop": "https://open.spotify.com/embed/playlist/3NtXH4QVTVSA1XdeeUQZE1?utm_source=generator",
        "Jazz": "https://open.spotify.com/embed/playlist/70RNYDzrvGZrxOFDrmb7If?utm_source=generator",
        "Contemporary": "https://open.spotify.com/embed/playlist/3zDWzdw6gFroiahF9SEoZz?utm_source=generator",
        "House": "https://open.spotify.com/embed/playlist/7bu7BZEusLNJSaAuUUZBKn?utm_source=generator"
    };

    // Show question
    function showQuestion() {
        const q = questions[currentQuestionIndex];
        quizContainer.innerHTML = '';

        // Question counter
        const questionCounter = document.createElement('div');
        questionCounter.classList.add('text-muted', 'mb-2', 'fs-6', 'text-center');
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        quizContainer.appendChild(questionCounter);

        // Question text
        const questionText = document.createElement('div');
        questionText.classList.add('fw-semibold', 'mb-4', 'fs-5', 'text-center');
        questionText.textContent = q.question;
        quizContainer.appendChild(questionText);

        // Create buttons for answers
        q.answers.forEach(a => {
            const btn = document.createElement('button');
            btn.classList.add('btn', 'w-100', 'mb-3');
            btn.style.backgroundColor = '#d14a6c';
            btn.style.color = '#fff';
            btn.style.border = 'none';
            btn.style.borderRadius = '10px';
            btn.style.padding = '0.75rem 1.25rem';
            btn.style.fontSize = '1.1rem';
            btn.style.cursor = 'pointer';
            btn.style.boxShadow = '0 2px 8px rgba(51, 102, 204, 0.3)';
            btn.style.transition = 'background-color 0.25s ease, box-shadow 0.25s ease';
            btn.textContent = a.text;
            btn.setAttribute('data-genre', a.genre);

            btn.addEventListener('mouseenter', () => {
                btn.style.backgroundColor = '#812d42ff';
                btn.style.boxShadow = '0 3px 12px #9f37517e';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.backgroundColor = '#d14a6c';
                btn.style.boxShadow = '0 2px 8px #d14a6c7e';
            });

            btn.addEventListener('click', () => {
                const genre = btn.getAttribute('data-genre');
                scores[genre]++;
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion();
                } else {
                    showResult();
                }
            });

            quizContainer.appendChild(btn);
        });
    }

    // Calculate result
    function showResult() {
        let maxScore = 0;
        let topGenre = '';
        for (const genre in scores) {
            if (scores[genre] > maxScore) {
                maxScore = scores[genre];
                topGenre = genre;
            }
        }

        quizContainer.innerHTML = '';

        // Create result heading
        const resultHeading = document.createElement('h2');
        resultHeading.classList.add('mb-3');
        resultHeading.textContent = `Your dance style is: ${topGenre}`;
        quizContainer.appendChild(resultHeading);

        // Create description paragraph
        const descPara = document.createElement('p');
        descPara.classList.add('description', 'mb-4');
        descPara.style.fontSize = '1rem';
        descPara.style.lineHeight = '1.4';
        descPara.style.color = '#333';
        descPara.style.fontWeight = '500';
        descPara.textContent = getDescription(topGenre);
        quizContainer.appendChild(descPara);

        // Create restart button
        const restartBtn = document.createElement('button');
        restartBtn.textContent = 'Take Again';
        restartBtn.classList.add('btn', 'w-100');
        restartBtn.style.backgroundColor = '#a72828ff';
        restartBtn.style.boxShadow = '0 3px 10px rgba(167, 40, 40, 0.4)';
        restartBtn.style.border = 'none';
        restartBtn.style.borderRadius = '10px';
        restartBtn.style.padding = '0.75rem 1.25rem';
        restartBtn.style.marginTop = '15px';
        restartBtn.style.fontSize = '1.1rem';
        restartBtn.style.color = '#fff';
        restartBtn.style.cursor = 'pointer';
        restartBtn.style.transition = 'background-color 0.25s ease, box-shadow 0.25s ease';

        restartBtn.addEventListener('mouseenter', () => {
            restartBtn.style.backgroundColor = '#7e1e1eff';
            restartBtn.style.boxShadow = '0 4px 14px rgba(126, 30, 30, 0.6)';
        });
        restartBtn.addEventListener('mouseleave', () => {
            restartBtn.style.backgroundColor = '#a72828ff';
            restartBtn.style.boxShadow = '0 3px 10px rgba(167, 40, 40, 0.4)';
        });

        restartBtn.addEventListener('click', () => {
            currentQuestionIndex = 0;
            for (const g in scores) scores[g] = 0;
            showQuestion();
        });

        // Set Spotify embed source based on top genre
        spotifyEmbed.src = spotifyLinks[topGenre] || spotifyLinks["Hip-Hop"];
        quizContainer.appendChild(spotifyEmbed);
        quizContainer.appendChild(restartBtn);
    }

    // Get description for each dance genre
    function getDescription(genre) {
        const descriptions = {
            "Hip-Hop": "Hip-Hop is all about strong rhythm, energy, and attitude. It’s great if you like to express confidence and groove to the beat.",
            "Jazz": "Jazz dance is stylish and full of flair. It’s perfect if you enjoy fun, sharp movements and performing with energy.",
            "Contemporary": "Contemporary dance focuses on emotion and flow. It’s a good fit if you like to tell stories through gentle and fluid movement.",
            "House": "House dance is smooth and fast, with steady beats. It’s great if you want to feel free, joyful, and energetic on the dance floor."
        };
        return descriptions[genre] || "";
    }

    // Call Show question
    showQuestion();
});
