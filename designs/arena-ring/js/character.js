let characters = [
    {
        name: "Hukin",
        description:
            "Born into a noble bloodline of knights, Hukin trained under the kingdom’s finest warriors. Despite his status, he chose to fight on the frontlines, believing that true honor lies in protecting the weak, not commanding from behind. His shield bears the scars of a hundred battles.",
    },
    {
        name: "Elar",
        description:
            "Elar, an elf of the silverleaf clan, was gifted with vision beyond sight. Raised in the whispering forests, she learned to shoot arrows guided by the wind itself. Her silence is deadly, and her aim unerring—she never misses the mark she swears upon.",
    },
    {
        name: "Dawrin",
        description:
            "Forged in the mountain stronghold of Garnhuld, Dawrin wields a warhammer passed down from seven generations. His battle cry shakes the earth, and his loyalty to the dwarven code is unbreakable. He seeks to reclaim ancient relics stolen from his people.",
    },
    {
        name: "Navin",
        description:
            "Once a royal noble in the court of the Crimson Throne, Navin turned vampire to escape death. Though he retains his elegance and wit, centuries of bloodlust have twisted his soul. He walks the line between grace and savagery.",
    },
    {
        name: "Berk",
        description:
            "Berk was born under a red eclipse, marked by prophecy as the berserker of the Black Fang tribe. Fueled by rage and a burning desire to prove his worth, he charges into battle with reckless fury, breaking steel with his bare hands.",
    },
    {
        name: "Skeg",
        description:
            "Once a famed scholar of the Arcane Tower, Skeg’s thirst for forbidden knowledge led him to death—and beyond. Now a skeletal mage, he commands magic laced with decay, his eyes glowing with the curse of undeath and forbidden wisdom.",
    },
    {
        name: "Roblin",
        description:
            "Roblin grew up in the alley shadows of Gobrock city, where trust was a currency no one could afford. With nimble fingers and a sharper mind, he became the most wanted rogue in three kingdoms. Some say he stole the moonlight itself.",
    },
    {
        name: "Gomon",
        description:
            "A tinkerer by heart, Gomon creates impossible machines powered by aether and madness. Banished from the Gnome Academy for blowing up half its wing, he now roams the world with a walking forge, always seeking the next breakthrough—or explosion.",
    },
    {
        name: "Dakin",
        description:
            "Once the kingdom’s greatest champion, Dakin was betrayed and left to die in the Abyss. Clad in cursed armor and wielding a corrupted blade, he now walks the realm as a Dark Knight, seeking vengeance against those who wronged him.",
    },
    {
        name: "Laina",
        description:
            "Laina was born during the Festival of Light, said to be touched by the gods themselves. As a White Mage, she heals the wounded and purges darkness. But behind her serene smile lies a tragic past that fuels her desire to save others.",
    },
    {
        name: "Femon",
        description:
            "Femon emerged from the infernal plains, a warrior born of flame and wrath. Branded by the Demon Lords but cast out for defying them, he now fights to forge his own destiny, one battle at a time, blood and ash in his wake.",
    },
    {
        name: "Ninsin",
        description:
            "Silent as a whisper and deadly as poison, Ninsin was raised in the shadow temple of the Obsidian Crescent. Trained from childhood, he mastered the art of assassination. His name is never spoken aloud—only feared in the dark.",
    },
    {
        name: "Varka",
        description:
            "Varka was raised by wolves after her tribe was destroyed. She became a savage huntress, wielding dual axes and primal rage. The spirits of her ancestors guide her path, and she roams the wilds to avenge her fallen kin.",
    },
    {
        name: "Azaren",
        description:
            "Once a high priest of light, Azaren fell to madness when he uncovered the forbidden truth of immortality. Now an undead lich, he rules a forgotten crypt, weaving necromantic rituals in search of godhood—and revenge against the living.",
    },
];

function pageTransitionFunction() {
    initialCharacter();
}

function initialCharacter() {
    characters.forEach((character) => {
        let fileName = character.name.toLowerCase().replace(/ /g, "-");

        $(".list").append(`
                    <div class="col-6 col-sm-4">
                        <div class="content" id="character-${character.name}">
                            <img src="images/characters/${fileName}.png" alt="${character.name}">
                            <span>${character.name}</span>
                        </div>
                    </div>
        `);
    });

    $(".list > div").each((index, content) => {
        setTimeout(() => {
            content.classList.add("display");

            if (!index) {
                setTimeout(() => {
                    content.children[0].classList.add("active");
                    loadDetail();
                }, (characters.length - 1) * 100);
            }
        }, index * 100);
    });

    $(".list .content").on("click", setDetail);
}

function loadDetail() {
    let detailEl = document.querySelector(".detail");
    let time = 0;

    if (detailEl.classList.contains("active")) {
        detailEl.classList.remove("active");
        time = 800;
    }

    setTimeout(() => {
        let el = document.querySelector(".list .content.active");
        let character = characters.find((character) => {
            return character.name === el.id.replace("character-", "");
        });

        $(".list .content.active").removeClass("active");
        el.classList.add("active");

        let fileName = character.name.toLowerCase().replace(/ /g, "-");
        let img = detailEl.querySelector("img");
        img.src = `images/characters/${fileName}.png`;
        img.alt = character.name;

        detailEl.querySelector("h2").innerHTML = character.name;
        detailEl.querySelector("p").innerHTML = character.description;

        detailEl.classList.add("active");
    }, time);
}

function setDetail(e) {
    $(".list .content").removeClass("active");
    e.currentTarget.classList.add("active");

    loadDetail();
}
