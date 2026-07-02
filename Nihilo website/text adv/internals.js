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
                setState: { tenebrousStone: true},
                nextText: 2   
            },
            {
                text: "Try to take the orb.",
                nextText: 3
            },
        ]
    },
    {
        id: 2,
        text: "You approach the statue and take a closer look at the sphere. Not seen at distance, but clearly visible now: a thin black smoke glides along the impossibly smooth surface. Each glowing channel is unique in its carving, taking its own portion of the sphere, but with a deep red hue that unnaturally radiates from within. A puzzle, it resembles. Or perhaps an omen.",
        options: [
            {
                text: "Try to take the orb.",
                setState: { tenebrousStone: true},
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
                nextText:4
            },
        ]
    },
    {
        id: 4,
        text: "A few moments pass as you pocket the stone and wipe more sweat away from your forehead. A rush of cool air blows by--a refreshing, momentary chill. As the air passes, a shroud of darkness begins crawling over the land, seemingly towards you. It grows quickly, but is absolutely silent. Not a draft of wind. The ground begins to roar beneath you, trembling terribly, sending you onto your rear. the land heaves violently as you crawl onto the only seemingly stable oject, the statue, and cling for dearest mercy. Earth roars in a violent spasm, and massive objects begin to shift from the surrounding sands. All around you, three massive pyramids, the bottoms still obscured by infinite sands, loom about you. Above head, the looming clouds have taken station and hang still. It is dim--cooler. And then the first bellowing horn begins. The pyramid first to raise is north of you, and a neat, circular indentation, somewhat like a mouth, yawns open. From within, a deep, hungering drone builds up before unleashing a nightmarish, barotone wail."
    }

]

startGame()