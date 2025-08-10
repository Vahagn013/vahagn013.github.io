document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.topBarButton');
    const sections = document.querySelectorAll('.content-section');
    const topBar = document.getElementById('topBar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            topBar.classList.add('scrolled');
        } else {
            topBar.classList.remove('scrolled');
        }
    });

    function activateSection(sectionId) {
        buttons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        const targetButton = document.getElementById(sectionId + 'Btn');
        if (targetButton) {
            targetButton.classList.add('active');
        }
        document.getElementById(sectionId).classList.add('active');
        
        document.getElementById(sectionId).scrollIntoView({
            behavior: 'smooth'
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.id.replace('Btn', '');
            if (targetId === 'quiz') {
                document.getElementById('quizModal').style.display = 'block';
                startQuiz();
            } else {
                activateSection(targetId);
            }
        });
    });

    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); 
            activateSection(targetId);
        });
    });

    document.getElementById('history').classList.add('active');
    document.getElementById('historyBtn').classList.add('active');

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const overlay = this.querySelector('.gallery-overlay');
            overlay.classList.toggle('active');
        });
    });

    const playButtons = document.querySelectorAll('.play-button');
    const progressBars = document.querySelectorAll('.progress');

    playButtons.forEach((button, index) => {
        let isPlaying = false;
        let progress = 0;
        let interval;

        button.addEventListener('click', function() {
            if (isPlaying) {
                clearInterval(interval);
                button.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                interval = setInterval(() => {
                    progress += 1;
                    if (progress > 100) {
                        progress = 0;
                        clearInterval(interval);
                        button.innerHTML = '<i class="fas fa-play"></i>';
                        isPlaying = false;
                    }
                    progressBars[index].style.width = `${progress}%`;
                }, 100);
                button.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        });
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    const languageToggle = document.getElementById('languageToggle');
    
    // Ensure the language toggle starts in English position (unchecked)
    languageToggle.checked = false;
    
    const translations = {
        en: {
            title: "Charles Aznavour",
            subtitle: "The Voice of France",
            history: "History",
            famousSongs: "Famous songs",
            family: "Children & Parents",
            friends: "Famous friends",
            gallery: "Gallery",
            historyContent: {
                title: "History",
                p1: "Charles Aznavour (1924-2018) was a French-Armenian singer, songwriter, and actor. Born as Shahnour Varinag Aznavourian in Paris, he became one of France's most popular and enduring singers.",
                p2: "His career spanned over 70 years, during which he wrote more than 1,000 songs, recorded over 1,400 songs in multiple languages, and sold more than 180 million records worldwide.",
                p3: "He was known as the \"French Frank Sinatra\" and was recognized for his distinctive voice and emotional delivery. Aznavour was also a successful actor, appearing in over 60 films.",
                p4: "In 2009, he was named the Entertainer of the Century by CNN and users of Time Online."
            },
            songsContent: {
                title: "Top 5 Famous Songs",
                songs: [
                    "\"La Bohème\" (1965) - A nostalgic look at the bohemian life in Montmartre",
                    "\"She\" (1974) - His most successful English-language hit",
                    "\"Hier Encore\" (1964) - A reflection on aging and lost youth",
                    "\"La Mamma\" (1963) - A tribute to mothers",
                    "\"For Me Formidable\" (1964) - A playful love song"
                ]
            },
            familyContent: {
                title: "Family",
                parents: "Parents",
                children: "Children",
                father: "Father - A baritone singer and restaurant owner",
                mother: "Mother - An actress",
                born: "Born in"
            },
            friendsContent: {
                title: "Famous Friends",
                edith: "The legendary French singer who discovered and mentored Aznavour early in his career.",
                sinatra: "The American singer who was a great admirer of Aznavour's work and often performed his songs.",
                liza: "Close friend and frequent collaborator, they performed together on many occasions."
            },
            galleryContent: {
                title: "Photo Gallery",
                concert: "Charles Aznavour in Concert",
                piaf: "With Edith Piaf and Eddie Constantine",
                portrait: "Charles Aznavour Portrait"
            },
                    footer: {
            about: "About Charles Aznavour",
            aboutText: "One of France's most popular and enduring singers, known for his distinctive voice and emotional delivery.",
            quickLinks: "Quick Links",
            socialMedia: "His Social Medias",
            copyright: "© 2024 Charles Aznavour Tribute. All rights reserved."
        },
        quiz: {
            title: "Test Your Knowledge!",
            intro: "How well do you know Charles Aznavour? Take this quiz to find out!",
            startButton: "🎯 Start Quiz",
            modalTitle: "🎵 Charles Aznavour Quiz",
            buttonText: "Aznavour's Quiz",
            questionCounter: "Question",
            of: "of",
                            next: "Next →",
                finish: "Finish Quiz",
                prev: "← Previous",
                excellent: "🎉 Excellent! You're a true Aznavour expert!",
                veryGood: "👍 Very good! You know your Aznavour well!",
                goodEffort: "😊 Good effort! Keep learning about Aznavour!",
                keepStudying: "📚 Keep studying! Aznavour has so much to teach us!",
                score: "Score",
                correct: "Correct",
                total: "Total",
                time: "Time",
                seconds: "seconds",
                restart: "Restart Quiz",
            questions: [
                {
                    question: "What year was Charles Aznavour born?",
                    answers: ["1924", "1925", "1926", "1927"],
                    correct: 0
                },
                {
                    question: "What was Charles Aznavour's real name?",
                    answers: ["Charles Aznavourian", "Shahnour Varinag Aznavourian", "Charles Aznavour", "Shahnour Aznavourian"],
                    correct: 1
                },
                {
                    question: "Which famous French singer discovered Charles Aznavour?",
                    answers: ["Édith Piaf", "Jacques Brel", "Georges Brassens", "Yves Montand"],
                    correct: 0
                },
                {
                    question: "What is one of Charles Aznavour's most famous songs?",
                    answers: ["La Vie en Rose", "La Bohème", "Non, Je Ne Regrette Rien", "Milord"],
                    correct: 1
                },
                {
                    question: "In which city was Charles Aznavour born?",
                    answers: ["Paris", "Marseille", "Lyon", "Toulouse"],
                    correct: 0
                },
                {
                    question: "How many songs did Charles Aznavour write in his lifetime?",
                    answers: ["Over 800", "Over 1000", "Over 1200", "Over 1500"],
                    correct: 2
                },
                {
                    question: "Which language did Charles Aznavour speak fluently besides French?",
                    answers: ["English", "Armenian", "Italian", "Spanish"],
                    correct: 1
                },
                {
                    question: "What was Charles Aznavour's nickname?",
                    answers: ["The French Elvis", "The French Sinatra", "The French Frank", "The French Star"],
                    correct: 1
                },
                {
                    question: "In which year did Charles Aznavour pass away?",
                    answers: ["2016", "2017", "2018", "2019"],
                    correct: 2
                },
                {
                    question: "Which award did Charles Aznavour receive in 1997?",
                    answers: ["Grammy Award", "Oscar", "César Award", "Honorary Oscar"],
                    correct: 3
                }
            ]
        }
        },
        fr: {
            title: "Charles Aznavour",
            subtitle: "La Voix de la France",
            history: "Histoire",
            famousSongs: "Chansons célèbres",
            family: "Enfants & Parents",
            friends: "Amis célèbres",
            gallery: "Galerie",
            historyContent: {
                title: "Histoire",
                p1: "Charles Aznavour (1924-2018) était un chanteur, compositeur et acteur franco-arménien. Né sous le nom de Shahnour Varinag Aznavourian à Paris, il est devenu l'un des chanteurs les plus populaires et durables de France.",
                p2: "Sa carrière s'est étendue sur plus de 70 ans, pendant lesquels il a écrit plus de 1 000 chansons, enregistré plus de 1 400 chansons en plusieurs langues et vendu plus de 180 millions de disques dans le monde.",
                p3: "Il était connu comme le \"Frank Sinatra français\" et était reconnu pour sa voix distinctive et son interprétation émotionnelle. Aznavour était également un acteur accompli, apparaissant dans plus de 60 films.",
                p4: "En 2009, il a été nommé Artiste du Siècle par CNN et les utilisateurs de Time Online."
            },
            songsContent: {
                title: "Top 5 Chansons Célèbres",
                songs: [
                    "\"La Bohème\" (1965) - Un regard nostalgique sur la vie bohème à Montmartre",
                    "\"She\" (1974) - Son plus grand succès en anglais",
                    "\"Hier Encore\" (1964) - Une réflexion sur le vieillissement et la jeunesse perdue",
                    "\"La Mamma\" (1963) - Un hommage aux mères",
                    "\"For Me Formidable\" (1964) - Une chanson d'amour enjouée"
                ]
            },
            familyContent: {
                title: "Famille",
                parents: "Parents",
                children: "Enfants",
                father: "Père - Chanteur baryton et propriétaire de restaurant",
                mother: "Mère - Actrice",
                born: "Né(e) en"
            },
            friendsContent: {
                title: "Amis Célèbres",
                edith: "La légendaire chanteuse française qui a découvert et guidé Aznavour au début de sa carrière.",
                sinatra: "Le chanteur américain qui était un grand admirateur du travail d'Aznavour et interprétait souvent ses chansons.",
                liza: "Ami proche et collaborateur fréquent, ils ont joué ensemble à de nombreuses occasions."
            },
            galleryContent: {
                title: "Galerie Photos",
                concert: "Charles Aznavour en Concert",
                piaf: "Avec Edith Piaf et Eddie Constantine",
                portrait: "Portrait de Charles Aznavour"
            },
            footer: {
                about: "À propos de Charles Aznavour",
                aboutText: "L'un des chanteurs les plus populaires et durables de France, connu pour sa voix distinctive et son interprétation émotionnelle.",
                quickLinks: "Liens Rapides",
                socialMedia: "Ses Réseaux Sociaux",
                copyright: "© 2024 Hommage à Charles Aznavour. Tous droits réservés."
            },
                                quiz: {
                title: "Testez Vos Connaissances !",
                intro: "À quel point connaissez-vous Charles Aznavour ? Passez ce quiz pour le découvrir !",
                startButton: "🎯 Commencer le Quiz",
                modalTitle: "🎵 Quiz Charles Aznavour",
                buttonText: "Quiz d'Aznavour",
                questionCounter: "Question",
                of: "sur",
                next: "Suivant →",
                finish: "Terminer le Quiz",
                prev: "← Précédent",
                excellent: "🎉 Excellent ! Vous êtes un vrai expert d'Aznavour !",
                veryGood: "👍 Très bien ! Vous connaissez bien votre Aznavour !",
                goodEffort: "😊 Bon effort ! Continuez à apprendre sur Aznavour !",
                keepStudying: "📚 Continuez à étudier ! Aznavour a tant à nous apprendre !",
                score: "Score",
                correct: "Correct",
                total: "Total",
                time: "Temps",
                seconds: "secondes",
                restart: "Recommencer le Quiz",
            questions: [
                {
                    question: "En quelle année Charles Aznavour est-il né ?",
                    answers: ["1924", "1925", "1926", "1927"],
                    correct: 0
                },
                {
                    question: "Quel était le vrai nom de Charles Aznavour ?",
                    answers: ["Charles Aznavourian", "Shahnour Varinag Aznavourian", "Charles Aznavour", "Shahnour Aznavourian"],
                    correct: 1
                },
                {
                    question: "Quelle célèbre chanteuse française a découvert Charles Aznavour ?",
                    answers: ["Édith Piaf", "Jacques Brel", "Georges Brassens", "Yves Montand"],
                    correct: 0
                },
                {
                    question: "Quelle est l'une des chansons les plus célèbres de Charles Aznavour ?",
                    answers: ["La Vie en Rose", "La Bohème", "Non, Je Ne Regrette Rien", "Milord"],
                    correct: 1
                },
                {
                    question: "Dans quelle ville Charles Aznavour est-il né ?",
                    answers: ["Paris", "Marseille", "Lyon", "Toulouse"],
                    correct: 0
                },
                {
                    question: "Combien de chansons Charles Aznavour a-t-il écrites dans sa vie ?",
                    answers: ["Plus de 800", "Plus de 1000", "Plus de 1200", "Plus de 1500"],
                    correct: 2
                },
                {
                    question: "Quelle langue Charles Aznavour parlait-il couramment en plus du français ?",
                    answers: ["Anglais", "Arménien", "Italien", "Espagnol"],
                    correct: 1
                },
                {
                    question: "Quel était le surnom de Charles Aznavour ?",
                    answers: ["L'Elvis français", "Le Frank Sinatra français", "Le Frank français", "L'Étoile française"],
                    correct: 1
                },
                {
                    question: "En quelle année Charles Aznavour est-il décédé ?",
                    answers: ["2016", "2017", "2018", "2019"],
                    correct: 2
                },
                {
                    question: "Quel prix Charles Aznavour a-t-il reçu en 1997 ?",
                    answers: ["Grammy Award", "Oscar", "César Award", "Oscar d'honneur"],
                    correct: 3
                }
            ]
        }
        }
    };

    languageToggle.addEventListener('change', function() {
        const language = this.checked ? 'en' : 'fr';
        
        document.querySelector('.title').textContent = translations[language].title;
        document.querySelector('.hero-overlay p').textContent = translations[language].subtitle;
        document.getElementById('historyBtn').textContent = translations[language].history;
        document.getElementById('famousSongsBtn').textContent = translations[language].famousSongs;
        document.getElementById('familyBtn').textContent = translations[language].family;
        document.getElementById('friendsBtn').textContent = translations[language].friends;
        document.getElementById('galleryBtn').textContent = translations[language].gallery;

        document.querySelector('#history .section-title').textContent = translations[language].historyContent.title;
        const historyParagraphs = document.querySelectorAll('.history-content p');
        historyParagraphs[0].textContent = translations[language].historyContent.p1;
        historyParagraphs[1].textContent = translations[language].historyContent.p2;
        historyParagraphs[2].textContent = translations[language].historyContent.p3;
        historyParagraphs[3].textContent = translations[language].historyContent.p4;

        document.querySelector('#famousSongs .section-title').textContent = translations[language].songsContent.title;
        const songLinks = document.querySelectorAll('.song-list li a');
        translations[language].songsContent.songs.forEach((song, index) => {
            songLinks[index].textContent = song;
        });

        document.querySelector('#family .section-title').textContent = translations[language].familyContent.title;
        document.querySelector('.family-content h3:first-of-type').textContent = translations[language].familyContent.parents;
        document.querySelector('.family-content h3:last-of-type').textContent = translations[language].familyContent.children;
        const familyMembers = document.querySelectorAll('.family-member p');
        familyMembers[0].textContent = translations[language].familyContent.father;
        familyMembers[1].textContent = translations[language].familyContent.mother;
        familyMembers[2].textContent = translations[language].familyContent.born + " 1946";
        familyMembers[3].textContent = translations[language].familyContent.born + " 1952";
        familyMembers[4].textContent = translations[language].familyContent.born + " 1956";
        familyMembers[5].textContent = translations[language].familyContent.born + " 1969";

        document.querySelector('#friends .section-title').textContent = translations[language].friendsContent.title;
        const friendDescriptions = document.querySelectorAll('.friend-description');
        friendDescriptions[0].textContent = translations[language].friendsContent.edith;
        friendDescriptions[1].textContent = translations[language].friendsContent.sinatra;
        friendDescriptions[2].textContent = translations[language].friendsContent.liza;

        document.querySelector('#gallery .section-title').textContent = translations[language].galleryContent.title;
        const galleryCaptions = document.querySelectorAll('.gallery-overlay p');
        galleryCaptions[0].textContent = translations[language].galleryContent.concert;
        galleryCaptions[1].textContent = translations[language].galleryContent.piaf;
        galleryCaptions[2].textContent = translations[language].galleryContent.portrait;

        const footerSections = document.querySelectorAll('.footer-section h3');
        footerSections[0].textContent = translations[language].footer.about;
        footerSections[1].textContent = translations[language].footer.quickLinks;
        footerSections[2].textContent = translations[language].footer.socialMedia;
        document.querySelector('.footer-section p').textContent = translations[language].footer.aboutText;
        document.querySelector('.footer-bottom p').textContent = translations[language].footer.copyright;

        // Update quiz text elements
        document.getElementById('quizBtn').textContent = translations[language].quiz.buttonText;
        document.querySelector('#quiz .section-title').textContent = translations[language].quiz.title;
        document.querySelector('#quiz .quiz-intro p').textContent = translations[language].quiz.intro;
        document.getElementById('startQuizBtn').textContent = translations[language].quiz.startButton;
        document.querySelector('#quizModal .quiz-header h2').textContent = translations[language].quiz.modalTitle;
        
        // Update footer quiz link
        document.querySelector('footer a[href="#quiz"]').textContent = translations[language].quiz.buttonText;
        
        // Update quiz questions and current language
        currentLanguage = language;
        quizQuestions = translations[language].quiz.questions;
        
        // If quiz is currently active, refresh the current question
        if (quizModal.style.display === 'block') {
            showQuestion();
        }
        
        // Update quiz navigation buttons if they exist
        if (document.getElementById('prevQuestion')) {
            document.getElementById('prevQuestion').textContent = translations[language].quiz.prev;
        }
        if (document.getElementById('nextQuestion')) {
            if (currentQuestion === quizQuestions.length - 1) {
                document.getElementById('nextQuestion').textContent = translations[language].quiz.finish;
            } else {
                document.getElementById('nextQuestion').textContent = translations[language].quiz.next;
            }
        }
        
        // Update quiz result labels if they exist
        if (document.getElementById('restartQuiz')) {
            document.getElementById('restartQuiz').textContent = translations[language].quiz.restart;
        }
    });
    
    // Initialize the website in English when the page loads
    // This ensures all content starts in English regardless of the toggle position
    const initializeEnglish = () => {
        document.querySelector('.title').textContent = translations.en.title;
        document.querySelector('.hero-overlay p').textContent = translations.en.subtitle;
        document.getElementById('historyBtn').textContent = translations.en.history;
        document.getElementById('famousSongsBtn').textContent = translations.en.famousSongs;
        document.getElementById('familyBtn').textContent = translations.en.family;
        document.getElementById('friendsBtn').textContent = translations.en.friends;
        document.getElementById('galleryBtn').textContent = translations.en.gallery;
        document.getElementById('quizBtn').textContent = translations.en.quiz.buttonText;
        
        // Update all other content to English
        document.querySelector('#history .section-title').textContent = translations.en.historyContent.title;
        const historyParagraphs = document.querySelectorAll('.history-content p');
        historyParagraphs[0].textContent = translations.en.historyContent.p1;
        historyParagraphs[1].textContent = translations.en.historyContent.p2;
        historyParagraphs[2].textContent = translations.en.historyContent.p3;
        historyParagraphs[3].textContent = translations.en.historyContent.p4;
        
        document.querySelector('#famousSongs .section-title').textContent = translations.en.songsContent.title;
        const songLinks = document.querySelectorAll('.song-list li a');
        translations.en.songsContent.songs.forEach((song, index) => {
            songLinks[index].textContent = song;
        });
        
        document.querySelector('#family .section-title').textContent = translations.en.familyContent.title;
        document.querySelector('.family-content h3:first-of-type').textContent = translations.en.familyContent.parents;
        document.querySelector('.family-content h3:last-of-type').textContent = translations.en.familyContent.children;
        const familyMembers = document.querySelectorAll('.family-member p');
        familyMembers[0].textContent = translations.en.familyContent.father;
        familyMembers[1].textContent = translations.en.familyContent.mother;
        familyMembers[2].textContent = translations.en.familyContent.born + " 1946";
        familyMembers[3].textContent = translations.en.familyContent.born + " 1952";
        familyMembers[4].textContent = translations.en.familyContent.born + " 1956";
        familyMembers[5].textContent = translations.en.familyContent.born + " 1969";
        
        document.querySelector('#friends .section-title').textContent = translations.en.friendsContent.title;
        const friendDescriptions = document.querySelectorAll('.friend-description');
        friendDescriptions[0].textContent = translations.en.friendsContent.edith;
        friendDescriptions[1].textContent = translations.en.friendsContent.sinatra;
        friendDescriptions[2].textContent = translations.en.friendsContent.liza;
        
        document.querySelector('#gallery .section-title').textContent = translations.en.galleryContent.title;
        const galleryCaptions = document.querySelectorAll('.gallery-overlay p');
        galleryCaptions[0].textContent = translations.en.galleryContent.concert;
        galleryCaptions[1].textContent = translations.en.galleryContent.piaf;
        galleryCaptions[2].textContent = translations.en.galleryContent.portrait;
        
        const footerSections = document.querySelectorAll('.footer-section h3');
        footerSections[0].textContent = translations.en.footer.about;
        footerSections[1].textContent = translations.en.footer.quickLinks;
        footerSections[2].textContent = translations.en.footer.socialMedia;
        document.querySelector('.footer-section p').textContent = translations.en.footer.aboutText;
        document.querySelector('.footer-bottom p').textContent = translations.en.footer.copyright;
        
        // Update quiz content to English
        document.querySelector('#quiz .section-title').textContent = translations.en.quiz.title;
        document.querySelector('#quiz .quiz-intro p').textContent = translations.en.quiz.intro;
        document.getElementById('startQuizBtn').textContent = translations.en.quiz.startButton;
        document.querySelector('#quizModal .quiz-header h2').textContent = translations.en.quiz.modalTitle;
        document.querySelector('footer a[href="#quiz"]').textContent = translations.en.quiz.buttonText;
    };
    
    // Call the initialization function when the page loads
    initializeEnglish();





    // Initialize website in English
    let currentLanguage = 'en';
    let quizQuestions = translations[currentLanguage].quiz.questions;

    let currentQuestion = 0;
    let userAnswers = [];
    let quizStartTime = 0;
    let quizTimer = null;

    const quizModal = document.getElementById('quizModal');
    const startQuizBtn = document.getElementById('startQuizBtn');
    const closeQuiz = document.getElementById('closeQuiz');
    const questionText = document.getElementById('questionText');
    const answersContainer = document.getElementById('answersContainer');
    const questionCounter = document.getElementById('questionCounter');
    const progressFill = document.getElementById('progressFill');
    const prevQuestion = document.getElementById('prevQuestion');
    const nextQuestion = document.getElementById('nextQuestion');
    const quizResults = document.getElementById('quizResults');
    const finalScore = document.getElementById('finalScore');
    const scoreMessage = document.getElementById('scoreMessage');
    const correctCount = document.getElementById('correctCount');
    const totalQuestions = document.getElementById('totalQuestions');
    const timeTaken = document.getElementById('timeTaken');
    const restartQuiz = document.getElementById('restartQuiz');

    function startQuiz() {
        currentQuestion = 0;
        userAnswers = new Array(quizQuestions.length).fill(null);
        quizStartTime = Date.now();
        quizModal.style.display = 'block';
        
        // Ensure we're using the current language
        quizQuestions = translations[currentLanguage].quiz.questions;
        
        showQuestion();
        startTimer();
    }

    function showQuestion() {
        const question = quizQuestions[currentQuestion];
        questionText.textContent = question.question;
        questionCounter.textContent = `${translations[currentLanguage].quiz.questionCounter} ${currentQuestion + 1} ${translations[currentLanguage].quiz.of} ${quizQuestions.length}`;
        
        const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
        progressFill.style.width = progress + '%';

        answersContainer.innerHTML = '';
        
        question.answers.forEach((answer, index) => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'answer-option';
            answerDiv.textContent = answer;
            
            if (userAnswers[currentQuestion] === index) {
                answerDiv.classList.add('selected');
            }
            
            answerDiv.addEventListener('click', (event) => selectAnswer(index, event));
            answersContainer.appendChild(answerDiv);
        });

        prevQuestion.disabled = currentQuestion === 0;
        nextQuestion.textContent = currentQuestion === quizQuestions.length - 1 ? 
            translations[currentLanguage].quiz.finish : translations[currentLanguage].quiz.next;
        
        // Update button text based on current language
        if (currentQuestion === quizQuestions.length - 1) {
            nextQuestion.textContent = translations[currentLanguage].quiz.finish;
        } else {
            nextQuestion.textContent = translations[currentLanguage].quiz.next;
        }
    }

    function selectAnswer(answerIndex, event) {
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        event.target.classList.add('selected');
        userAnswers[currentQuestion] = answerIndex;
    }

    function nextQuestionHandler() {
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            finishQuiz();
        }
    }

    function prevQuestionHandler() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    }

    function finishQuiz() {
        clearInterval(quizTimer);
        const timeElapsed = Math.round((Date.now() - quizStartTime) / 1000);
        
        let correct = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === quizQuestions[index].correct) {
                correct++;
            }
        });
        
        const score = Math.round((correct / quizQuestions.length) * 100);
        
        finalScore.textContent = score;
        correctCount.textContent = correct;
        totalQuestions.textContent = quizQuestions.length;
        timeTaken.textContent = timeElapsed;
        
        // Set score message based on performance
        if (score >= 90) {
            scoreMessage.textContent = translations[currentLanguage].quiz.excellent;
        } else if (score >= 70) {
            scoreMessage.textContent = translations[currentLanguage].quiz.veryGood;
        } else if (score >= 50) {
            scoreMessage.textContent = translations[currentLanguage].quiz.goodEffort;
        } else {
            scoreMessage.textContent = translations[currentLanguage].quiz.keepStudying;
        }
        
        // Hide quiz body and show results
        document.querySelector('.quiz-body').style.display = 'none';
        quizResults.style.display = 'block';
    }

    function startTimer() {
        quizTimer = setInterval(() => {
        }, 1000);
    }

    function restartQuizHandler() {
        document.querySelector('.quiz-body').style.display = 'block';
        quizResults.style.display = 'none';
        startQuiz();
    }

    function closeQuizHandler() {
        quizModal.style.display = 'none';
        clearInterval(quizTimer);
    }

    startQuizBtn.addEventListener('click', startQuiz);
    closeQuiz.addEventListener('click', closeQuizHandler);
    prevQuestion.addEventListener('click', prevQuestionHandler);
    nextQuestion.addEventListener('click', nextQuestionHandler);
    restartQuiz.addEventListener('click', restartQuizHandler);

    window.addEventListener('click', (event) => {
        if (event.target === quizModal) {
            closeQuizHandler();
        }
    });
}); 