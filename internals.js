
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
                nextText: 7,             
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
        text: "You close your eyes before the stone. Your conscious comes to stillness, and you attempt to put the pieces together. All that comes back to you is a memory clearly broken in several places. None of the events agree. None of it makes sense, but a certain warning does return:\n\n 'If you think you know anger, just wait until Dad comes home and sees what you did to Mom.'\n\nAnger begins to well up in you. You remember how pained your fists and legs were when you awoke here. As though you ran a thousand miles through a dense forest without stop, as though the sprinter failed their jump and snapped both tibias. Same as the failed sprinter, same as the jungle runner: you came to in agony. It has carried thus far, lessening at the legs and hands over time and now reflecting in your crusted, cracked hands, sand-scourged feet, and...your conscious shies away from what you may resemble now. A human, still? A monster? Your fingers are far too damaged at the tips to give you a honest answer as you touch your face. Dried blood is all that is drawn from the interaction. The anger swells again. This time, unprompted. You feel the sudden urge to move forward. Wherever 'forward' is. You realise now that your eyes are open, have been open, are burnt and dried. You frantically blink and rub moisture back in, feeling like glass slicing through the cornea. You behold the stone again. It seems to always be looking at you without eyes.",
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
        id: 7,
        text: "You make haste towards the pyramid, ignoring all other input from your surroundings. Your instincts scream and thrash within your guts: you know what is coming is not meant for humans. What you've experienced thus far is nothing short of a nightmare, and the dream now returns to deal another blow. As you approach, there appears to be an opening marred with black around the edges. Between wheezing, struggling breaths, you understand it to be a blast entrance. The debris of the wall crunches on your bare feet, ribbing and jabbing into the flesh like teeth. At last, you fall upon the mound of rubble at the opening, and turn back. A vicious sand storm has picked up behind you, and with each passing moment, the sand whipped faster and faster, colliding into itself with such frenzy that heat begins to melt the sand into glass. Arcs on static energy blast the shards, spitting them from the whirlwind like shrapnel. You duck behind the wall, covering yourself in debris to dodge the onslaught. You cannot see, but you can hear: a myriad of glass needles and shards whizzing into the chamber, ricocheting violently. As you lay under your dust and brick comforter, a sudden stinging comes to your feet. Glass? Insects?",
        options: [
            {
                text: "Quickly smack at your feet.",
                nextText: 10,
                setState: {wounded: true},
            },
            {
                text: "Attempt to pull your feet in.",
                nextText: 11
            },
        ]
    },
    {
        id: 101,
        text: "You pull the stone out of your pocket and feel the smooth surface, trying desperately to ground yourself amongst the cacophany. The stone seems to respond to your efforts. Without leaving your palm, pieces of the Tenebrous Stone shift. Elements of the sphere raise and others recede. It seems to dance in your hand as the change in geometry gently shifts it to and fro. The spasming of the sphere stops, along with the excretion of black smoke. Silence begins to fall around you, as though concrete walls now shield your ears to the violent sounds. You can...sense it, now. There is a storm coming. The shadows that crawled over you, the Corona of red over the now darkened sun, all of these must be omens. You resolve: you must find safety.",
        options: [
            {
                text: "Race toward the pyramid.",
                nextText: 8,
                setState: {Neutral: true},
            },
            {
                text: "Ignore the signs.",
                nextText: 500,
            },
        ],

    },
    {
        id: 8,
        text: "In a whirlwind sprint brought on with sudden vigor, you begin to race towards the Western Pyramid. As you approach, there appears to be an opening marred with black around the edges. Between wheezing, struggling breaths, you understand it to be a blast entrance. The debris of the wall crunches on your bare feet, ribbing and jabbing into the flesh like teeth. At last, you fall upon the mound of rubble at the opening, and turn back. A vicious sand storm has picked up behind you, and with each passing moment, the sand whipped faster and faster, colliding into itself with such frenzy that heat began to melt the sand into glass. Arcs on static energy blast the shards, spitting them from the whirlwind like shrapnel. You duck behind the wall, covering yourself in debris to dodge the onslaught. You cannot see, but you can hear: a myriad of glass needles and shards whizzing into the chamber, ricocheting violently. As you lay under your dust and brick comforter, a sudden stinging comes to your feet. Glass? Insects?",
        options: [
            {
                text: "Quickly smack at your feet.",
                nextText: 10,
                setState: {wounded: true},
            },
            {
                text: "Attempt to pull your feet in.",
                nextText: 11
            },
        ]
    },
    {
        id: 10,
        text: "You quickly unearth your hand to attempt to smack away at the sensations, but a far more violent and agonizing sensation takes over: your hand has fallen victim to the glass being shot inside of the chamber. From beneath your dusty haven, you groan and spasm in a vain attempt to control the pain. It is futile; you scream in a shocked rush of excrutiation. You don't know if the scream was for help, or to get the pain out. Perhaps both. You pull your feet in, feeling them slide along small slivers of glass. Each fine needle puncturing into flesh and biting into nerve.\n\nMoments pass as you bear down on your senses, attempting to pull shards from the myriad wounds without further exposure to the storm. In the midst of the maelstrom of nerve-stricken pain, you don't notice the strange and sudden passing of the storm. You pause in the silence, breathing through remnants of what was once a t-shirt that still hangs from your neck and shoulders. Through muffled, hissing gasps, you uncover your feet once more. Only the pain that lingers, no new pain comes.\n\nYou unearth yourself after some deliberate, calculated movements. A picture of chaos rests before you. This chamber...is flooded with reflecting glass. An endless array of red, all reflecting back at you, like infinite eyes of ruby attempting to scour your mind. Before, above,and beyond those shards rests 4 quiet walls, neatly sealing the chamber into a square. Well, if not for the entrance. However, there is an entrance--exit?\n\nA hall way, certainly...And a shrill, muffled scream that certainly was not your own.\n\n",
        options:[
            {
                text: "Gather yourself.",
                nextText: 12
            },
        ],
    },
    {
        id: 11,
        text: "You draw your feet under the debris, trusting that what pains you is not sentient. You bear down on your senses and attempt to remain calm, despite the wailing shrieks and thundering arcs of the storm. You attempt to, under the blanket of destruction and dust, remove some of the slivers of glass that you now realize have pin-cushioned the bottom of your feet. You pull each shard out, some accompanied by your personal chorus of strained grunts and false-starts on some shards. In the midst of the maelstrom of nerve-stricken pain, you don't notice the strange and sudden passing of the storm. You pause in the silence, breathing through remnants of what was once a t-shirt that still hangs from your neck and shoulders. Through muffled, hissing gasps, you uncover your feet once more. Only the pain lingers, and no new pain comes.\n\nYou unearth yourself after some deliberate, calculated movements. A picture of chaos rests before you. This chamber...is flooded with reflecting glass. An endless array of red, all reflecting back at you, like infinite eyes of ruby attempting to scour your mind. Before, above,and beyond those shards rests 4 quiet walls, neatly sealing the chamber into a square. Well, if not for the entrance. However, there is an entrance--exit?\n\nA hall way, certainly...And a shrill, muffled scream that certainly was not your own.\n\n",
        options: [
            {
                text: "Gather yourself.",
                nextText: 12,
            },
        ],
    },
    {
        id: 12,
        text: "From the hallway, deep within--much further than you can perceive amongst all senses, a howl echoes once again. A muffled, harrowing cry. Then the light came, just barely indistinguishable from the red of the reflected light at first. Slowly, but approaching much faster as seconds pass. Another muffled cry, this time much closer. Whatever is coming, it's approaching quickly. Before you can think to stir yourself up from your nest of debris, your attention is caught by yet another howl, this time accompanying sounds of smacking. The gait similar to a franctic person now, yes, but the light is much closer now--\n\nThe silhouette of a man appears, he is writhing frantically, a torch clearly in hand, and body...missing flesh. He is spasming with each whip of the arms, running towards you now. As you stand, you see the man's eyes clearly. He is frantic. His face is without skin; peeled back up and behind his head. Grisly pieces of meat still attached, flicking blood away with each stomp.\n\n'N-no! Stop!' You shout, the man unheeding. 'Glass!'\n\nThe man's eye widen further in horror as he crosses the threshold into the chamber, falling immediately unto himself, rolling in the glass, screaming and sobbing with what life remains of him, taken to the extreme by adrenaline. You can see it now, as he flails and cries: a wide slab of metal has been barbarically hammered over his mouth with long, rusted spikes--rail spikes. As you see the remaining detail of his figure, he raises his hand towards you to grab at your leg, pleading for help with his eyes. The grip is strong and bloody, stunning you in place. It's his left hand, without skin, de-gloved to the elbow. His eyes meet yours once more, and echoes one last slobbering, bloody sob before collapsing before you.\n\nMoments that feel like hours pass as you look over the deceased man. 'Who the hell did this to him? What the hell is beyond that hallway?'\n\nYou look down to the floor and notice that his entrapping in the glass and subsequent thrashing has cleared a bloody, slick trail to cross to the hallway. Without light, you would be unable to see. But this poor man has brought you a seeming gift: the torch he was spared with. It is sadistically bound to his right had, unexstuingishing, and held fast.",
        options: [
            {
                text: "Look over the man.",
                nextText: 13,
                setState: {caring: true}
            },
            {
                text: "Break the torch off him.",
                nextText: 201,
                setState: {cruel: true, dismissive: true, contemplative: false}
            },
        ],
    },
    {
        id: 13,
        text: "You draw your eyes away from the torch as a sense of passion overcomes you. 'I'm so sorry...' you mutter under constrained tears. How could this be done to someone? The more you consider, the more the memories of the past return: You were angry, searching. A image flashes across your conscious, a memory, but still blurry. You can't help but shiver under the portent that your memories are connected to your reason being in this hell. You recall the bodies in the ravines that you passed as you wondered the desert. At first, you knew thirst would take you. It didn't. And then you waited for hunger. And then for a violent death--this one you pled for, only to stagger with a weakly thumping heart along a blasted, vast expanse. This man clearly succumbed. The tears have been running since you uttered your apology. Despite the constant, sharp desire for death, you don't envy him. You cry, and slump to your knees. Waves of emotional pain and dissonance wash over your head and back, rooting in, and dissolving into, your flesh, muscle, blood, and then soul. If this man was kind, he deserves to be redeemed. If this man was cruel, his torturer should be confronted.\n\n'No one deserves your fate, my friend,' you whisper. 'I will take up where you left off. I will honor you.'\n\nYou reach down to the bound torch, and try to surgically remove it at first, unwilling to desecrate the remnants of this poor fellow. At first you thought you were making progress, but it's clear that this attached permanently. It can only be broken off.\n\nTears fill your eyes again as your soul wails to keep you from violating him, from preventing him being given atleast the decency to be left intact after suffering such a horrifying death. But it is no use. You wipe tears away, and shut your eyes as you grip the torch and leverage his radius and ulna bones flatly against an intact brick. You push down on the arm. Then harder. Harder. Snap.\n\nWith you now is his hand. And the torch.\n\nYou've acquired a Torch.\n\nYou begin stepping past you man, careful to evade glass and further disturbances to him. Regarding him once more, you raise the torch, and see the hallway clearer now. All along the path and wall are spatters of blood. Some dry, some fresh. You begin your journey down the hallway, walking forever into the dark.\n\n This concludes Chapter 1.",
        options: [
            {
                text: "Restart chapter. (debug purposes)",
                nextText: 1,
                
            }
        ]
    },
    {
        id: 201,
        text: "'Poor fool,' you utter as your reach down and grab the torch. As you attempt to pull it away, the man's arm goes taut. Some minor frustration builds and you quickly leverage his arm over remaining debris and push down violently. A quick snap rings out, and the hand separates sinewly from the arm. One final, ripping tug snaps the remaining tendon and cartilege. A grisly trophy, surely, but one paid for. Whoever set this man loose unknowingly passed along a serendipitous gift. Your mind briefly considers what kind of heinous crime this man committed in order to be so brutally tortured.\n\n'You probably fucked a kid, huh. Maybe murdered an expecting mother? Perhaps you got what you deserved. Perhaps I will soon, too.'\n\nYou've acquired the Torch.\n\nRegarding him once more, you raise the torch, and see the hallway clearer now. All along the path and wall are spatters of blood. Some dry, some fresh. You begin your journey down the hallway, walking forever into the dark.\n\nThis concludes Chapter 1.",
        options: [
            {
                text: "Restart chapter. (debug purposes)",
                nextText: 1,
            },
        ],
    },
    {
        id: 500,
        text: "You stand there, staring up at the sky. Despite the warnings, you simply do not have the desire nor energy to move. After so long in this desert, unable to die naturally of dehydration nor starvation, you've come to accept that nothing here wishes to see you succeed or survive. Not at all, in fact: you've seen roads of skeletons and bodies. All mutilated. All clearly victimized by one another, or by something else entirely. Images of what you've seen in the ravines return: mountains of corpses. Heads crushed, limbs turned into spindles of bone fragments, blood, and ruptured ligaments. Their eyes always seemed to stare back at you in silent horror, frozen in their final moments, forever to envy the position of the Living. Indeed.\n\nYou return from your reflections, and see a vicious wall of sand, heated and arcing with static:a furnace wall of devastation. You do not move. You do not shift.\n\nYou close your eyes and allow the wall to take you away.\n\nThe memory to be restored and printed before final loss of conciousness, is that of your Son. A happy, bubbling smile brings your mind to gentle ease as the the physical world washes away in sudden, horrifying waves of injury.\n\n'I love you, Ke-'",
        options: [
            {
                text: "Try to survive the horror--again. (Restart)",
                nextText: -1,
            }
        ]
    },
]

startGame()

/* Each alignment has an associated text id with a denotation in the hundreds place. 1 is Neutral, 2 is Taor, 3 is Ulmecka, and 4 is Nihilitl, death or game over is represented as 500, but does has values beyond that to fit the specific death. Remember to always skip assigning text values to 100, 200, 300, and 400. This system is consistent across all chapters prior to being compiled into the final text adventure (God forgive me.) Tags associated with alignments:
1. Neutral: contemplative, calm, rational, caring, dreamingStone
2. Taor: cruel, dismissive, selfish, suicidal, incarceratingStone
3. Ulmecka: judgemental, perfidious, usurer, manipulatingStone
4. Nihilitl: hopeless, defeated, unwilling, tenebrousStone
*/