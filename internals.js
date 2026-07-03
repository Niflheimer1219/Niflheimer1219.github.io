const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}
function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}
const textNodes = [
    {
        id: 1,
        text: "Heat and misery of the desert scours your skin. You don't know exactly how long you've been under the blazing sun, but it must be days so far. In each shuffling movement forward, your toes scrape along scalding sands. A dire blast of sand kicks up and obfuscates what little you can see under the blazing suns intensity. You brush away the sand from your eyelids with cracked, red hands. Before you stands an object you have yet to encounter--the first object, really--a statue: a human-height, stone-sculpted statue. Atop the statue is a glassy orb, of which strange, glowing channels have been cut.",
        options: [
            {
                text: "Examine the orb.", 
                nextText: 2   
            },
            {
                text: "Try to take the orb.",
                setState: {tenebrousStone: true},
                nextText: 3
            },
            {
                text: "Examine your surroundings.",
                nextText: 5

            },
        ]
    },
    {
        id: 2,
        text: "You approach the statue and take a closer look at the sphere. Not seen at distance, but clearly visible now: a thin black smoke glides along the impossibly smooth surface. Each glowing channel is unique in its carving, taking its own portion of the sphere, but with a deep red hue that unnaturally radiates from within. A puzzle, it resembles. Or perhaps an omen.",
        options: [
            {
                text: "Try to take the orb.",
                setState: {tenebrousStone: true},
                nextText: 3
            },
        ]

    },
    {
        id: 3,
        text: "You reach out for the stone, grasping it with some troubled exertion. Despite the threatening appearance, the object is cool to the touch, and the smoke massages the skin. You've acquired the Tenebrous Stone.",
        options: [
            {
                text: "Put the stone away.",
                nextText: 4
            },
        ]
    },
    {
        id: 4,
        text: "A few moments pass as you pocket the stone and wipe more sweat away from your forehead. A rush of cool air blows by--a refreshing, momentary chill. As the air passes, a shroud of darkness begins crawling over the land, seemingly towards you. It grows quickly, but is absolutely silent. Not a draft of wind. The ground begins to roar beneath you, trembling terribly, sending you onto your rear. the land heaves violently as you crawl onto the only seemingly stable oject, the statue, and cling for dearest mercy. Earth roars in a violent spasm, and massive objects begin to shift from the surrounding sands. A few moments pass as the sand settles back to the ground. All around you, three massive pyramids, the bottoms still obscured by infinite sands, loom about you. Above head, looming clouds have appeared and taken station, hanging still, seemingly just above you. The shadow that came crawling towards you has enveloped the land. The sun has been dimmed and taken on a dismal red corona. Then the first horn blares. The pyramid first to raise is north of you, and a neat, circular indentation, somewhat like a mouth, yawns open. From within, a deep, hungering drone builds up before unleashing a nightmarish, barotone wail. Within moments, another horn whips up and blasts, shaking even your insides as you cover your ears. The wind begins again, but this time with fightening haste. Your eyes scan over towards the eastern pyramid, approaching from behind it is a quickly raising, incoming wall of sand. Between the banshee screams of the air rushing and the north pyramid crying for its dinner, you feel compelled towards the western pyramid.",
        options: [
            {
                text: "Run towards the pyramid.",
                nextText: 7              
            },
            {
                text: "Gather your senses amongst the chaos.",
                requiredState: (currentState) => currentState.contemplative,
                nextText: 101,
            },
        ]
    },
    {   id: 5,
        text: "You stop for a moment, leaning your body on the pillar. The sky is absent of clouds. For some reason, none ever formed. The sky is blue, but not the blue you're used to. It seems to go on forever, upward, never showing the cosmos beyond the sky at night. Even in the evenings, the desert does not cool, the stars do not shine, and not a voice is to be heard, only the rustling of sand falling into the deep, treacherous ravines that scour the landscape you look out on. Like massive cysts once excised and now healed; these ravines blotch the landscape, acting as pitfalls to one's demise. You notice a weakened chuckle escape as your mind wonders to the first evening in this unknown land: almost walking directly over the gape of, and into, one of these hellish ravines. The panic still returns when you approach near one. Your eyes drift over now to the orb, but your mind is split.", 
        options: [
            {
                text: "Examine the orb.",
                nextText: 2
            },
            {
                text: "Who am I?",
                setState: {contemplative: true },
                nextText: 6,
            },
        ],

    },
    {
        id: 6,
        text: "You close your eyes before the spherical stone. Your conscious comes to be still, and you attempt to put the pieces together. All that comes back to you is a memory clearly broken in several places. None of the events agree. None of it makes sense, but a certain warning does return: 'If you think you know anger, just wait until Dad comes home and sees what you did to Mom.' Anger begins to well up in you. You remember how pained your fists and legs were when you awoke here. As though you ran a thousand miles through a dense forest without stop, as though the sprinter failed their jump and snapped both tibias. Same as the failed sprinter, same as the jungle runner: you came to in agony. It has carried thus far, lessening at the legs and hands over time and now reflecting in your crusted, cracked hands, sand-scourged feet, and...your conscious shies away from what you may resemble now. A human, still? A monster? Your fingers are far too damaged at the tips to give you a honest answer as you touch your face. Dried blood is all that is drawn from the interaction. The anger swells again. This time, unprompted. You feel the sudden urge to move forward. Wherever 'forward' is. You realise now that your eyes are open, have been open, are burnt and dried. You frantically blink and rub moisture back in, feeling like glass slicing through the cornea. You behold the stone again. It seems to always be looking at you without eyes.",
        options: [
            {
                text: "Examine the orb.",
                nextText: 2
            },
            {
                text: "Try to take the orb.",
                nextText: 3
            }
        ],
    },
    {
        id: 101,
        text: "You pull the stone out of your pocket and feel the smooth surface, trying desperately to ground yourself amongst the cacophany. The stone seems to respond to your efforts. Without leaving your palm, pieces of the Tenebrous stone shift. Elements of the sphere raise and others recede. It seems to dance in your hand as the change in geometry gently shifts it to and fro. The spasming of the sphere stops, along with the excretion of black smoke. Silence begins to fall around you, as though concrete walls now shielded your ears to the violent sounds. You can...sense it, now. There is a storm coming. The shadows that crawled over you, the Corona of red over the now darkened sun, all of these must be omens. You resolve: you must find safety.",
        options: [
            {
                text: "Race toward the pyramid.",
                nextText: 8,
                setState: {Neutral: true},
            },
            {
                text: "Ignore the signs. (Restart)",
                nextText: -1,
            },
        ],

    },

]

startGame()

/* Each alignment has an associated hundreds place value. 1 is Neutral, 2 is Taor, 3 is Ulmecka, and 4 is Nihilitl, death or game over is represented as 500, but does has values beyond that to fit the specific death. Remember to always skip assigning text values to 100, 200, 300, and 400. This system is consistent across all chapters prior to being compiled into the final text adventure (God forgive me.) Tags associated with alignments:
1. Neutral: contemplative, calm, rational, sensible, dreamingStone
2. Taor: cruel, dismissive, selfish, suicidal, incarceratingStone
3. Ulmecka: judgemental, perfidious, usurer, manipulatingStone
4. Nihilitl: hopeless, defeated, unwilling, tenebrousStone
*/