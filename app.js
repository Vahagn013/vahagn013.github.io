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
            activateSection(targetId);
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
    });
}); 