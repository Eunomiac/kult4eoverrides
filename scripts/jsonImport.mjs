import U from "./utilities.mjs";

const K4EOTEMPLATES = {
	MOVE: {
		name: "moveName ?? name",
		type: "move",
		data: {
			attributemod: "Attribute",
			specialFlag: "0",
			description: "", // Full text block appearing at top of move sheet and when spoken to chat
			trigger: "", // Unformatted trigger text for reference by rest of API
			completesuccess: "",
			partialsuccess: "",
			failure: "",
			koFlags: {
				linkName: "name",
				linkType: "advantage/disadvantage",
				isFrozen: true,
				isRolled: true // Set false for passive 'moves' that should just display their text to chat
			}
		}
	},
	ADV_DISADV: {
		name: "name",
		type: "advantage/disadvantage",
		data: {
			attributemod: "Attribute",
			koFlags: {
				moves: []
			}
		}
	},
	WEAPON: {
		name: "name",
		type: "weapon",
		data: {
			description: "",
			harm: 0,
			range: 0,
			ammo: {
				value: 0,
				min: 0,
				max: 0
			},
			special: "",
			koFlags: {
				attacks: [
					{
						name: "Combat Shooting",
						source: "Handgun",
						range: "arm/room/field/horizon",
						harm: 2,
						ammoCost: 1,
						special: ""
					}, // This can convert into a MOVE of the form:
					{
						name: "<weaponName>: <attackName>",
						type: "move",
						data: {
							attributemod: "violence",
							specialFlag: "0",
							description: "", // Adapt Engage in Combat and weapon stats to create block for chat roll
							trigger: "", // Unformatted trigger text for reference by rest of API
							completesuccess: "", // Can use Engage in Combat for these
							partialsuccess: "",
							failure: "",
							koFlags: {
								linkName: "<weaponName>",
								linkType: "weapon",
								linkID: "xxxx", // The actual ID of the embedded weapon item, for ammo tracking
								usesAmmo: 2, // Num ammo used
								isRolled: true // Set false for passive 'moves' that should just display their text to chat
							}
						}
					}
				],
				type: "melee|ranged"
			}
		}
	},
	GEAR: {
		name: "name",
		type: "gear",
		data: {
			uses: "",
			description: "",
			koFlags: {
				armor: 0,
				attacks: [],
				moves: []
			}
		}
	}
};

// Initial import of JSONDATA after Google Sheet .csv conversion at http://...
const DATA_JSON = [
	{
		name: "Academic Network",
		itemType: "advantage",
		type: "active",
		moveName: "Tap Academic Network",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/academic-network.svg",
		effect: {
			intro: "You have academic contacts at universities around the world.",
			trigger: "When it would be useful to know someone at a university,",
			effect: "provide the person's name, field of study, and how you got to know one another, then roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "The person is a friend (Relation +1).",
				list: ""
			},
			partial: {
				text: "The person is an acquaintance (Relation +0).",
				list: ""
			},
			fail: {
				text: "You know one another, but there is an old enmity between the two of you (Relation +0).",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Access the Dark Net",
		itemType: "advantage",
		type: "active",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "perception",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/access-the-dark-net.svg",
		effect: {
			intro: "",
			trigger: "Whenever you search the Dark Net for forbidden information, rare items, or myths,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You discover what you're looking for, and may also choose one option:",
				list: "|You discover a portal to another dimension, and a path you can trace back to it later.|You make contact with someone—or something—who can help you, for the right price.|You find something valuable or important, in addition to what you were looking for. The GM will tell you what it is."
			},
			partial: {
				text: "You find what you're looking for, but you're also exposed to repulsive and frightening stimuli. You must Keep it Together to see how it affects you.",
				list: ""
			},
			fail: {
				text: "You find what you're after, but also contact something very dangerous. It might attempt to latch onto you or follow you back into reality. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Ace Up the Sleeve",
		itemType: "advantage",
		type: "active",
		moveName: "Pull an Ace",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "coolness",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/ace-up-the-sleeve.svg",
		effect: {
			intro: "",
			trigger: "Whenever someone's got you up against the wall or in a tight spot,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|Reveal a Weapon - You have a small, concealed lethal weapon (stiletto or similar), which you can produce unnoticed.|Spot a Weakness - You realize your opponent has a weakness you can exploit (take +2 to your next roll, if it involves exploiting the weakness). Ask the GM what it is.|Find an Exit - You spot a way out. Ask the GM what it is. Take +2 to your next roll to make use of it.",
			attacks: ""
		},
		results: {
			success: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Reveal a Weapon - You have a small, concealed lethal weapon (stiletto or similar), which you can produce unnoticed.|Spot a Weakness - You realize your opponent has a weakness you can exploit (take +2 to your next roll, if it involves exploiting the weakness). Ask the GM what it is.|Find an Exit - You spot a way out. Ask the GM what it is. Take +2 to your next roll to make use of it."
			},
			partial: {
				text: "Get 1 Edge. You may spend it at any time during the scene.",
				list: "|Reveal a Weapon - You have a small, concealed lethal weapon (stiletto or similar), which you can produce unnoticed.|Spot a Weakness - You realize your opponent has a weakness you can exploit (take +2 to your next roll, if it involves exploiting the weakness). Ask the GM what it is.|Find an Exit - You spot a way out. Ask the GM what it is. Take +2 to your next roll to make use of it."
			},
			fail: {
				text: "Get 1 Edge, but the situation is worse than you imagined. The GM makes a Move.",
				list: "|Reveal a Weapon - You have a small, concealed lethal weapon (stiletto or similar), which you can produce unnoticed.|Spot a Weakness - You realize your opponent has a weakness you can exploit (take +2 to your next roll, if it involves exploiting the weakness). Ask the GM what it is.|Find an Exit - You spot a way out. Ask the GM what it is. Take +2 to your next roll to make use of it."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Analyst",
		itemType: "advantage",
		type: "passive",
		moveName: "",
		notes: ">AppendList:move/Investigate,questions",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/analyst.svg",
		effect: {
			intro: "",
			trigger: "Whenever you Investigate something,",
			effect: "you may also choose from these additional questions: $QUESTIONS$"
		},
		lists: {
			questions: "|Which organizations, groups, or people of interest may be connected to this?|Is there a connection between this and another event?|What could a plausible motive be?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Animal Speaker",
		itemType: "advantage",
		type: "active",
		moveName: "Control Animal",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "intuition",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/animal-speaker.svg",
		effect: {
			intro: "You are able to understand and control animals.",
			trigger: "Whenever you attempt to control an animal,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Make the animal go against its instincts.|Make the animal follow you.|Make the animal protect you against an attacker.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose three options. You may save up to two for later.",
				list: "|Make the animal go against its instincts.|Make the animal follow you.|Make the animal protect you against an attacker."
			},
			partial: {
				text: "Choose two options. You may save one for later.",
				list: "|Make the animal go against its instincts.|Make the animal follow you.|Make the animal protect you against an attacker."
			},
			fail: {
				text: "Choose one option, but the animal is affected by your memories and Disadvantages. The GM makes a Move.",
				list: "|Make the animal go against its instincts.|Make the animal follow you.|Make the animal protect you against an attacker."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Arcane Researcher",
		itemType: "advantage",
		type: "passive",
		moveName: "Invoke Arcane Studies",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/arcane-researcher.svg",
		effect: {
			intro: "",
			trigger: "Whenever you venture into alternate planes of existence or meet entities from other dimensions,",
			effect: "you may declare that you have read about this dimension or creature before. Ask the GM what you learned from your past studies"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Artifact",
		itemType: "advantage",
		type: "active",
		moveName: "Activate Artifact",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/artifact.svg",
		effect: {
			intro: "You own a seemingly mundane item, which actually possesses mystical powers. Its powers can be activated through certain methods, such as infusing it with blood or whispering forbidden words (you decide what is required).$n$Work with the GM to devise a list of options appropriate to the artifact, using this list as an example: $OPTIONS$",
			trigger: "Whenever you activate the object,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|See the true form of a creature or location.|Receive a vision of what threatens you.|Get yourself out of a bind.|Call on the entity bound to the artifact and bargain with them.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose one option (the GM determines what happens).",
				list: "|See the true form of a creature or location.|Receive a vision of what threatens you.|Get yourself out of a bind.|Call on the entity bound to the artifact and bargain with them."
			},
			partial: {
				text: "Choose one option (the GM determines what happens). However, the artifact also exacts an additional price (the GM determines what is required).",
				list: "|See the true form of a creature or location.|Receive a vision of what threatens you.|Get yourself out of a bind.|Call on the entity bound to the artifact and bargain with them."
			},
			fail: {
				text: "The artifact does something unexpected, possibly dangerous. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Artistic Talent",
		itemType: "advantage",
		type: "active",
		moveName: "Perform",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/artistic-talent.svg",
		effect: {
			intro: "",
			trigger: "Whenever you perform your chosen art form or show your works to an audience,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]) to influence your audience at any time during the scene"
		},
		lists: {
			questions: "",
			options: "|They want to see more of your art.|They are affected by the emotion you wanted to convey (e.g., anger, sorrow, fear, joy, lust, etc).|They look up to you (take +1 ongoing with the audience during this scene).|Their attention is fixed entirely on you throughout your performance.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose up to two options any time during the scene.",
				list: "|They want to see more of your art.|They are affected by the emotion you wanted to convey (e.g., anger, sorrow, fear, joy, lust, etc).|They look up to you (take +1 ongoing with the audience during this scene).|Their attention is fixed entirely on you throughout your performance."
			},
			partial: {
				text: "Choose one option any time during the scene.",
				list: "|They want to see more of your art.|They are affected by the emotion you wanted to convey (e.g., anger, sorrow, fear, joy, lust, etc).|They look up to you (take +1 ongoing with the audience during this scene).|Their attention is fixed entirely on you throughout your performance."
			},
			fail: {
				text: "Choose one option, but a complication/threat manifests. The GM makes a Move.",
				list: "|They want to see more of your art.|They are affected by the emotion you wanted to convey (e.g., anger, sorrow, fear, joy, lust, etc).|They look up to you (take +1 ongoing with the audience during this scene).|Their attention is fixed entirely on you throughout your performance."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "At Any Cost",
		itemType: "advantage",
		type: "passive",
		moveName: "Pay the Price",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/at-any-cost.svg",
		effect: {
			intro: "",
			trigger: "Whenever you truly desire something,",
			effect: "you may take +2 to a roll by decreasing Stability (−2)"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Authority",
		itemType: "advantage",
		type: "active",
		moveName: "Check: Authority",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/authority.svg",
		effect: {
			intro: "You're an academic authority in your field and a well-known name in newspapers, debate shows, and scientific journals.",
			trigger: "At the beginning of each game session,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Influence someone who has heard of your authority in your academic field, as if you had rolled a (15+).|Gain access to a university's resources, such as their facilities, researchers, or scientific archives.|Make a statement about something or someone in mass media.|Gain access to people or places under the pretense of engaging in your research or studies.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "During this game session, choose up to three options.",
				list: "|Influence someone who has heard of your authority in your academic field, as if you had rolled a (15+).|Gain access to a university's resources, such as their facilities, researchers, or scientific archives.|Make a statement about something or someone in mass media.|Gain access to people or places under the pretense of engaging in your research or studies."
			},
			partial: {
				text: "During this game session, choose up to two options.",
				list: "|Influence someone who has heard of your authority in your academic field, as if you had rolled a (15+).|Gain access to a university's resources, such as their facilities, researchers, or scientific archives.|Make a statement about something or someone in mass media.|Gain access to people or places under the pretense of engaging in your research or studies."
			},
			fail: {
				text: "During this game session you may choose one option, but you also attract unwanted attention like stalkers, professional adversaries, competitors, or hostile forces. The GM makes a Move for them at some point during the session.",
				list: "|Influence someone who has heard of your authority in your academic field, as if you had rolled a (15+).|Gain access to a university's resources, such as their facilities, researchers, or scientific archives.|Make a statement about something or someone in mass media.|Gain access to people or places under the pretense of engaging in your research or studies."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Awe-Inspiring",
		itemType: "advantage",
		type: "active",
		moveName: "Take Charge",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/awe-inspiring.svg",
		effect: {
			intro: "",
			trigger: "Whenever you make a show of being the boss,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "People around you accept you as their leader and listen to you. Take +1 ongoing against people in this scene.",
				list: ""
			},
			partial: {
				text: "People feel you're leadership material and show you respect. Choose one of them, in particular, who goes along with what you think. You have +1 ongoing against them during this scene.",
				list: ""
			},
			fail: {
				text: "People feel like you're the leader, but one of them tries to challenge you for it. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Backstab",
		itemType: "advantage",
		type: "active",
		moveName: "Backstab",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "coolness",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/backstab.svg",
		effect: {
			intro: "",
			trigger: "Whenever you attack someone who's unprepared for it,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Aim for the sensitive parts: Deal +1 Harm.|Knock out: The NPC is rendered unconcious. PCs roll to Endure Injury and become neutralized on a (—9).|Careful: You act soundlessly and, if your victim dies, you leave no clues or traces behind.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose two options.",
				list: "|Aim for the sensitive parts: Deal +1 Harm.|Knock out: The NPC is rendered unconcious. PCs roll to Endure Injury and become neutralized on a (—9).|Careful: You act soundlessly and, if your victim dies, you leave no clues or traces behind."
			},
			partial: {
				text: "Choose one option.",
				list: "|Aim for the sensitive parts: Deal +1 Harm.|Knock out: The NPC is rendered unconcious. PCs roll to Endure Injury and become neutralized on a (—9).|Careful: You act soundlessly and, if your victim dies, you leave no clues or traces behind."
			},
			fail: {
				text: "You expose your betrayal and your target gets to react to your attack as usual. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Battlefield Medicine",
		itemType: "advantage",
		type: "active",
		moveName: "Stabilize Injury",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/battlefield-medicine.svg",
		effect: {
			intro: "",
			trigger: "Whenever you stabilize an injured person's wounds, even if you don't have access to medical equipment,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Improvisation: You stabilize one Wound without access to medical equipment.|Effective: You stabilize two Wounds instead of one.|Careful: The wound stabilizes and will heal much faster than normal.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose two options.",
				list: "|Improvisation: You stabilize one Wound without access to medical equipment.|Effective: You stabilize two Wounds instead of one.|Careful: The wound stabilizes and will heal much faster than normal."
			},
			partial: {
				text: "You may choose one option. However, you must also choose one complication:",
				list: "|You leave cosmetic scars or defects (the patient loses Stability (−2).|There are lingering side effects (−1 to all rolls the wound could feasibly affect until it's fully healed).|The patient remains knocked out until the GM determines that they awaken."
			},
			fail: {
				text: "You stabilize the wound, even without access to medical equipment, but there are also unexpected and potentially dangerous consequences, such as infections, healing deformities, or other serious side effects. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Body Awareness",
		itemType: "advantage",
		type: "active",
		moveName: "Perform Acrobatics",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "perception",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/body-awareness.svg",
		effect: {
			intro: "Your body and mind are as one.",
			trigger: "Whenever you perform acrobatic or agile feats,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Escape bindings or restraints.|Get past an obstacle (creature or object).|Get into or make it through a space you normally wouldn't be able to.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose one option.",
				list: "|Escape bindings or restraints.|Get past an obstacle (creature or object).|Get into or make it through a space you normally wouldn't be able to."
			},
			partial: {
				text: "Choose one option, but you expose yourself to danger or incur a cost.",
				list: "|Escape bindings or restraints.|Get past an obstacle (creature or object).|Get into or make it through a space you normally wouldn't be able to."
			},
			fail: {
				text: "Choose one option, but something goes very wrong. The GM makes a Move.",
				list: "|Escape bindings or restraints.|Get past an obstacle (creature or object).|Get into or make it through a space you normally wouldn't be able to."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Boss",
		itemType: "advantage",
		type: "active",
		moveName: "Deploy Henchmen",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "coolness",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/boss.svg",
		effect: {
			intro: "You have five to ten criminal henchmen who are loyal to you, usually for as long as you continue paying them.",
			trigger: "Whenever you send your henchmen to do a risky job,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "They follow your orders and everything goes according to plan.",
				list: ""
			},
			partial: {
				text: "They follow your orders, but GM picks one option:",
				list: "|Someone got into trouble.|The job isn't done, and needs something else to be completed.|There will be repercussions later on."
			},
			fail: {
				text: "The GM decides what went wrong, and whether it's immediately evident or will become apparent later on. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Bound",
		itemType: "advantage",
		type: "active",
		moveName: "Check: Bound",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/bound.svg",
		effect: {
			intro: "You are bound to an extradimensional entity whose powers you can draw upon. Explain what you think it is when you take this Advantage.",
			trigger: "At the start of each game session,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|See the true form of a creature or location.|Disperse magic targeting you.|Call on the entity.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You may choose up to three options at any time during the session.",
				list: "|See the true form of a creature or location.|Disperse magic targeting you.|Call on the entity."
			},
			partial: {
				text: "You may choose one option at any time during the session.",
				list: "|See the true form of a creature or location.|Disperse magic targeting you.|Call on the entity."
			},
			fail: {
				text: "You may choose one option at any time during the session, but the GM makes a Move for the entity at some point during the session.",
				list: "|See the true form of a creature or location.|Disperse magic targeting you.|Call on the entity."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Burglar",
		itemType: "advantage",
		type: "active",
		moveName: "Burgle",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "coolness",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/burglar.svg",
		effect: {
			intro: "",
			trigger: "Whenever you make use of your expertise in breaking and entering,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|You silently open a locked door within a few moments.|You neutralize an alarm.|You bust a lockbox or safe in less than two minutes.|You avoid being discovered by someone.|Trick someone into believing you belong here (e.g., pretend you're a security guard) for a limited time.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Get three options. You may spend them any time during the scene.",
				list: "|You silently open a locked door within a few moments.|You neutralize an alarm.|You bust a lockbox or safe in less than two minutes.|You avoid being discovered by someone.|Trick someone into believing you belong here (e.g., pretend you're a security guard) for a limited time."
			},
			partial: {
				text: "Get two options. You may spend them any time during the scene.",
				list: "|You silently open a locked door within a few moments.|You neutralize an alarm.|You bust a lockbox or safe in less than two minutes.|You avoid being discovered by someone.|Trick someone into believing you belong here (e.g., pretend you're a security guard) for a limited time."
			},
			fail: {
				text: "Get one option, but a problem arises. The GM makes a Move.",
				list: "|You silently open a locked door within a few moments.|You neutralize an alarm.|You bust a lockbox or safe in less than two minutes.|You avoid being discovered by someone.|Trick someone into believing you belong here (e.g., pretend you're a security guard) for a limited time."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Chameleon",
		itemType: "advantage",
		type: "active",
		moveName: "Alter Appearance",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "intuition",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/chameleon.svg",
		effect: {
			intro: "",
			trigger: "Whenever you imitate another's appearance or conceal your own identity to trick someone,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Your disguise is convincing, as long as you keep the act going.",
				list: ""
			},
			partial: {
				text: "You manage to trick everyone who doesn't examine you in detail, but choose one complication:",
				list: "|You can't keep this deception up for very long. You must act fast, if you don't want to risk getting exposed.|You leave traces and clues behind, which can be connected to you later on."
			},
			fail: {
				text: "Your disguise is only effective at a distance. If you attract any attention to yourself, you will be exposed.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Character Actor",
		itemType: "advantage",
		type: "active",
		moveName: "Blend In",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "intuition",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/character-actor.svg",
		effect: {
			intro: "",
			trigger: "Whenever you try to blend into a place or crowd by adapting your appearance and behavior to the others present,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Placate someone who is becoming suspicious.|Get access to a place outsiders aren't allowed to go.|Get someone to tell you about this place's secrets.|Get someone's assistance with something here.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose three options. You may save up to two for later.",
				list: "|Placate someone who is becoming suspicious.|Get access to a place outsiders aren't allowed to go.|Get someone to tell you about this place's secrets.|Get someone's assistance with something here."
			},
			partial: {
				text: "Choose two options. You may save one for later.",
				list: "|Placate someone who is becoming suspicious.|Get access to a place outsiders aren't allowed to go.|Get someone to tell you about this place's secrets.|Get someone's assistance with something here."
			},
			fail: {
				text: "Choose one option, but things don't go according to plan. The GM makes a Move.",
				list: "|Placate someone who is becoming suspicious.|Get access to a place outsiders aren't allowed to go.|Get someone to tell you about this place's secrets.|Get someone's assistance with something here."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Charismatic Aura",
		itemType: "advantage",
		type: "active",
		moveName: "Radiate Charisma",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/charismatic-aura.svg",
		effect: {
			intro: "You radiate an aura that makes people trust you and seek your company.",
			trigger: "Whenever your aura is truly noticeable,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Catch a stranger's attention. They become curious and approach you.|Change a person's disposition towards you from either aggressive to suspicious, suspicious to neutral, or neutral to positive.|Make opponents perceive you as harmless and ignore you for as long as you remain in the background and do not act against them.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose two separate options.",
				list: "|Catch a stranger's attention. They become curious and approach you.|Change a person's disposition towards you from either aggressive to suspicious, suspicious to neutral, or neutral to positive.|Make opponents perceive you as harmless and ignore you for as long as you remain in the background and do not act against them."
			},
			partial: {
				text: "Choose one option.",
				list: "|Catch a stranger's attention. They become curious and approach you.|Change a person's disposition towards you from either aggressive to suspicious, suspicious to neutral, or neutral to positive.|Make opponents perceive you as harmless and ignore you for as long as you remain in the background and do not act against them."
			},
			fail: {
				text: "Choose one option, but you also attract unwanted attention. The GM makes a Move.",
				list: "|Catch a stranger's attention. They become curious and approach you.|Change a person's disposition towards you from either aggressive to suspicious, suspicious to neutral, or neutral to positive.|Make opponents perceive you as harmless and ignore you for as long as you remain in the background and do not act against them."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Code of Honor",
		itemType: "advantage",
		type: "passive",
		moveName: "Uphold Your Code",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/code-of-honor.svg",
		effect: {
			intro: "You abide by a strict code of honor. Decide its nature when you take this Advantage.",
			trigger: "Whenever you take risks or make sacrifices for your code of honor,",
			effect: "gain Stability (+1)"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Collector",
		itemType: "advantage",
		type: "active",
		moveName: "Seek Rare Item",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/collector.svg",
		effect: {
			intro: "",
			trigger: "Whenever you search for an unusual or rare item,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You know exactly where the item is, how to acquire it, and how to minimize hazards, obstacles, and/or costs.",
				list: ""
			},
			partial: {
				text: "You know roughly where it is and what hazards, obstacles, and/or costs are associated with acquiring it.",
				list: ""
			},
			fail: {
				text: "You know roughly where to start searching for it, but not the hazards or costs involved in pursuing it.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Contagious Insanity",
		itemType: "advantage",
		type: "active",
		moveName: "Spread Madness",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/contagious-insanity.svg",
		effect: {
			intro: "",
			trigger: "Whenever you allow your madness to infect someone you're speaking with,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Afflict your victim with a temporary psychosis, in which they are haunted by their fears (NPCs only).|Trigger a Disadvantage within another person (PCs only, roll for the Disadvantage).|Affect an additional victim.|Call for creatures of madness to haunt the infected.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose two options.",
				list: "|Afflict your victim with a temporary psychosis, in which they are haunted by their fears (NPCs only).|Trigger a Disadvantage within another person (PCs only, roll for the Disadvantage).|Affect an additional victim.|Call for creatures of madness to haunt the infected."
			},
			partial: {
				text: "Choose one option.",
				list: "|Afflict your victim with a temporary psychosis, in which they are haunted by their fears (NPCs only).|Trigger a Disadvantage within another person (PCs only, roll for the Disadvantage).|Affect an additional victim.|Call for creatures of madness to haunt the infected."
			},
			fail: {
				text: "Your intended victim's own terrors and Dark Secrets manifest within you, instead. You must Keep it Together.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Crafty",
		itemType: "advantage",
		type: "active",
		moveName: "Pull a Long Con",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "intuition",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/crafty.svg",
		effect: {
			intro: "",
			trigger: "Whenever you manipulate an NPC in a longer conversation,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|They become suspicious of someone else of your choosing.|They view you as their ally, for as long as you don't betray them (+1 to all rolls against them).|They willingly do a favor for you.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose up to two options. You may save one until later during this scene.",
				list: "|They become suspicious of someone else of your choosing.|They view you as their ally, for as long as you don't betray them (+1 to all rolls against them).|They willingly do a favor for you."
			},
			partial: {
				text: "Choose one option.",
				list: "|They become suspicious of someone else of your choosing.|They view you as their ally, for as long as you don't betray them (+1 to all rolls against them).|They willingly do a favor for you."
			},
			fail: {
				text: "They're on to you. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Crime Scene Investigator",
		itemType: "advantage",
		type: "active",
		moveName: "Investigate Crime Scene",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/crime-scene-investigator.svg",
		effect: {
			intro: "",
			trigger: "Whenever you investigate a crime scene,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "|What was the chain of events?|What can I assume about the perpetrator?|Which mistakes did the perpetrator make?|When was the crime committed?|When was someone here last?|Does the crime remind me of something I am familiar with already and, if so, what?|Who might know more about the crime?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Ask two questions.",
				list: "|What was the chain of events?|What can I assume about the perpetrator?|Which mistakes did the perpetrator make?|When was the crime committed?|When was someone here last?|Does the crime remind me of something I am familiar with already and, if so, what?|Who might know more about the crime?"
			},
			partial: {
				text: "Ask one question.",
				list: "|What was the chain of events?|What can I assume about the perpetrator?|Which mistakes did the perpetrator make?|When was the crime committed?|When was someone here last?|Does the crime remind me of something I am familiar with already and, if so, what?|Who might know more about the crime?"
			},
			fail: {
				text: "Ask one question, but your investigation leads you into danger or introduces additional problems later on.",
				list: "|What was the chain of events?|What can I assume about the perpetrator?|Which mistakes did the perpetrator make?|When was the crime committed?|When was someone here last?|Does the crime remind me of something I am familiar with already and, if so, what?|Who might know more about the crime?"
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Cult Leader",
		itemType: "advantage",
		type: "active",
		moveName: "Lead a Ritual",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/cult-leader.svg",
		effect: {
			intro: "",
			trigger: "Whenever you and your followers perform a ritual,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|a vision of a creature's true form.|a vision of a portal between dimensions.|a vision of the cult's enemies.|a vision of an object's purpose.|a vision revealing your deity's wishes (take +1 to all rolls while fulfilling their wishes).",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose to receive up to three visions from the list below.",
				list: "|a vision of a creature's true form.|a vision of a portal between dimensions.|a vision of the cult's enemies.|a vision of an object's purpose.|a vision revealing your deity's wishes (take +1 to all rolls while fulfilling their wishes)."
			},
			partial: {
				text: "Choose to receive up to two visions from the list below.",
				list: "|a vision of a creature's true form.|a vision of a portal between dimensions.|a vision of the cult's enemies.|a vision of an object's purpose.|a vision revealing your deity's wishes (take +1 to all rolls while fulfilling their wishes)."
			},
			fail: {
				text: "Choose one vision, but the Illusion tears as a result. You may temporarily be transported into another dimension, attract a demonic being's attention, or receive a horrifying omen. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Dabbler in the Occult",
		itemType: "advantage",
		type: "active",
		moveName: "Perform a Ritual",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/dabbler-in-the-occult.svg",
		effect: {
			intro: "You know a little of magical rituals, but have never gone beyond performing written instructions.",
			trigger: "Whenever you attempt to perform a magical ritual from a set of instructions,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You perform every step correctly; the ritual works as intended.",
				list: ""
			},
			partial: {
				text: "You make a minor error. The GM chooses one complication:",
				list: "|You do not have working protection against the forces or entities the ritual summons.|The effects of the ritual are slightly different than what you had imagined.|The ritual summons unexpected entities or forces."
			},
			fail: {
				text: "You misunderstand the scripture and perform the ritual with no control whatsoever over the resulting outcome. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Daredevil",
		itemType: "advantage",
		type: "active",
		moveName: "Live Dangerously",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "perception",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/daredevil.svg",
		effect: {
			intro: "",
			trigger: "Whenever you're entering a dangerous situation,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|On a Swivel - Discover a threat before it discovers you.|Not Today - Avoid an attack.|Sucker Punch - Get the jump on them: Harm your opponent before they can react.",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose three Edges. You may spend them anytime during the scene.",
				list: "|On a Swivel - Discover a threat before it discovers you.|Not Today - Avoid an attack.|Sucker Punch - Get the jump on them: Harm your opponent before they can react."
			},
			partial: {
				text: "Choose two Edges. You may spend them anytime during the scene.",
				list: "|On a Swivel - Discover a threat before it discovers you.|Not Today - Avoid an attack.|Sucker Punch - Get the jump on them: Harm your opponent before they can react."
			},
			fail: {
				text: "Choose one Edge, but you are in over your head. The GM makes a Move.",
				list: "|On a Swivel - Discover a threat before it discovers you.|Not Today - Avoid an attack.|Sucker Punch - Get the jump on them: Harm your opponent before they can react."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Data Retrieval",
		itemType: "advantage",
		type: "active",
		moveName: "Perform Research",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/data-retrieval.svg",
		effect: {
			intro: "",
			trigger: "Whenever you look for information on a subject in a library, research archive, or on the Internet,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]).$n$In response to the inquiries you make, the GM will tell you what you uncover, in as much detail as can be expected from the source you have utilized"
		},
		lists: {
			questions: "|What is its origin?|What is it meant for?|How does it work?|What do I have to watch out for?|How can I stop or destroy this? 110",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Ask three questions.",
				list: "|What is its origin?|What is it meant for?|How does it work?|What do I have to watch out for?|How can I stop or destroy this? 110"
			},
			partial: {
				text: "Ask two questions.",
				list: "|What is its origin?|What is it meant for?|How does it work?|What do I have to watch out for?|How can I stop or destroy this? 110"
			},
			fail: {
				text: "Ask one question, but you also discover something unexpected. The GM makes a Move.",
				list: "|What is its origin?|What is it meant for?|How does it work?|What do I have to watch out for?|How can I stop or destroy this? 110"
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Dead Shot",
		itemType: "advantage",
		type: "passive",
		moveName: "",
		notes: ">ModValue:weapon/firearm,harm,1",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/dead-shot.svg",
		effect: {
			intro: "You are a seasoned marksman.",
			trigger: "Whenever you deal Harm with a firearm,",
			effect: "you deal +1 Harm"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Deadly Stare",
		itemType: "advantage",
		type: "active",
		moveName: "Death Stare",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/deadly-stare.svg",
		effect: {
			intro: "",
			trigger: "Whenever you find yourself in a charged situation,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You make eye contact with an NPC, causing them to freeze up and be unable to take any actions until you break eye contact. You also get +2 ongoing against your target.",
				list: ""
			},
			partial: {
				text: "You make eye contact with an NPC, causing them to freeze up and be unable to take any actions until you break eye contact.",
				list: ""
			},
			fail: {
				text: "Your opponents see you as their primary threat.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Death Drive",
		itemType: "advantage",
		type: "active",
		moveName: "Fight Recklessly",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/death-drive.svg",
		effect: {
			intro: "",
			trigger: "Whenever you fight with no regard for your personal safety,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|Bring 'Em On - Engage an additional hostile in Combat.|Savagery - Deal +2 Harm with one attack.|Charge - Get within reach to attack a hostile.|Go Crazy - Frighten your opponents by laughing into the face of death (+1 ongoing during the fight).",
			attacks: ""
		},
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Bring 'Em On - Engage an additional hostile in Combat.|Savagery - Deal +2 Harm with one attack.|Charge - Get within reach to attack a hostile.|Go Crazy - Frighten your opponents by laughing into the face of death (+1 ongoing during the fight)."
			},
			partial: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Bring 'Em On - Engage an additional hostile in Combat.|Savagery - Deal +2 Harm with one attack.|Charge - Get within reach to attack a hostile.|Go Crazy - Frighten your opponents by laughing into the face of death (+1 ongoing during the fight)."
			},
			fail: {
				text: "Get 1 Edge, but afterwards you discover you have been injured without noticing it (Endure Injury; the GM determines the amount of Harm based on who attacked you and how).",
				list: "|Bring 'Em On - Engage an additional hostile in Combat.|Savagery - Deal +2 Harm with one attack.|Charge - Get within reach to attack a hostile.|Go Crazy - Frighten your opponents by laughing into the face of death (+1 ongoing during the fight)."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Desperate",
		itemType: "advantage",
		type: "passive",
		moveName: "Fight Through",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/desperate.svg",
		effect: {
			intro: "",
			trigger: "Whenever you try to make it through overwhelming odds,",
			effect: "take +1 ongoing on all rolls until you're clear of the threat"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Divine Champion",
		itemType: "advantage",
		type: "passive",
		moveName: "Fight for Your God",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/divine-champion.svg",
		effect: {
			intro: "",
			trigger: "Whenever you fight your deity's enemies or fight to protect a sacred object,",
			effect: "you do +1 Harm and take +1 to Endure Injury"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Divine",
		itemType: "advantage",
		type: "active",
		moveName: "Sway Monster",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/divine.svg",
		effect: {
			intro: "There is something about you that reminds your former servants of what you truly are.",
			trigger: "Whenever you encounter a monstrous creature,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Soothe an aggressive creature.|Command the creature and force it to obey your order.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "The creature mistakes you for a god. Choose up to three options, useable any time during this scene.",
				list: "|Soothe an aggressive creature.|Command the creature and force it to obey your order."
			},
			partial: {
				text: "You are fascinating to the creature. Choose one option.",
				list: "|Soothe an aggressive creature.|Command the creature and force it to obey your order."
			},
			fail: {
				text: "You may choose one option, but after using it the creature becomes determined to possess you. It might try to devour you or perhaps capture you. The GM makes a Move.",
				list: "|Soothe an aggressive creature.|Command the creature and force it to obey your order."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Dreamer",
		itemType: "advantage",
		type: "active",
		moveName: "Navigate the Dream",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/dreamer.svg",
		effect: {
			intro: "You are a talented, self-taught dream wanderer.",
			trigger: "Whenever you want to meet someone or find out the truth about something in the Dream,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You meet the intended person or arrive at the specific place in the Dream.",
				list: ""
			},
			partial: {
				text: "You meet the intended person, or arrive at the specific place. However, some element has changed, or something followed you or the person in question.",
				list: ""
			},
			fail: {
				text: "You are lost in the Dream and cannot wake up until you find your way back.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Driver",
		itemType: "advantage",
		type: "active",
		moveName: "Drive Dangerously",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "coolness",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/driver.svg",
		effect: {
			intro: "You are a trained professional at operating motor vehicles (car or motorcycle).",
			trigger: "Whenever you drive your vehicle under pressure and in dangerous situations,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|Defensive Driving - Make a risky maneuver to get out of the way.|Evasive Driving - Shake off one pursuing vehicle.|Deadly Driving - Use your vehicle as a weapon against a pedestrian (2-4 Harm depending on speed).|Reckless Driving - Sideswipe another vehicle off the road.",
			attacks: ""
		},
		results: {
			success: {
				text: "Gain 3 Edges. You may spend them anytime during the scene.",
				list: "|Defensive Driving - Make a risky maneuver to get out of the way.|Evasive Driving - Shake off one pursuing vehicle.|Deadly Driving - Use your vehicle as a weapon against a pedestrian (2-4 Harm depending on speed).|Reckless Driving - Sideswipe another vehicle off the road."
			},
			partial: {
				text: "Gain 2 Edges. You may spend them anytime during the scene.",
				list: "|Defensive Driving - Make a risky maneuver to get out of the way.|Evasive Driving - Shake off one pursuing vehicle.|Deadly Driving - Use your vehicle as a weapon against a pedestrian (2-4 Harm depending on speed).|Reckless Driving - Sideswipe another vehicle off the road."
			},
			fail: {
				text: "Gain 1 Edge to spend any time during the scene, but the situation worsens somehow—maybe you speed past a police car, additional vehicles start pursuing you, or you or your vehicle is damaged. The GM makes a Move.",
				list: "|Defensive Driving - Make a risky maneuver to get out of the way.|Evasive Driving - Shake off one pursuing vehicle.|Deadly Driving - Use your vehicle as a weapon against a pedestrian (2-4 Harm depending on speed).|Reckless Driving - Sideswipe another vehicle off the road."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Elite Education",
		itemType: "advantage",
		type: "active",
		moveName: "Request a Favor",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/elite-education.svg",
		effect: {
			intro: "You have attended one of the world's most prestigious institutes of higher learning and have acquired contacts with power and influence.",
			trigger: "Whenever you ask your contacts for a favor,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Gain a favor from a country's administration (e.g., released from jail, skip a customs check, or get help from the police).|Gain access to a location unavailable to the public.|Locate or track a hidden or missing person.|Receive both the means to escape and a safe hiding spot.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose up to three options.",
				list: "|Gain a favor from a country's administration (e.g., released from jail, skip a customs check, or get help from the police).|Gain access to a location unavailable to the public.|Locate or track a hidden or missing person.|Receive both the means to escape and a safe hiding spot."
			},
			partial: {
				text: "Choose up to two options.",
				list: "|Gain a favor from a country's administration (e.g., released from jail, skip a customs check, or get help from the police).|Gain access to a location unavailable to the public.|Locate or track a hidden or missing person.|Receive both the means to escape and a safe hiding spot."
			},
			fail: {
				text: "Choose one option, but you've become indebted to someone. The debt can be called in during the story, whenever the GM chooses.",
				list: "|Gain a favor from a country's administration (e.g., released from jail, skip a customs check, or get help from the police).|Gain access to a location unavailable to the public.|Locate or track a hidden or missing person.|Receive both the means to escape and a safe hiding spot."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Elite Sport (Athletic)",
		itemType: "advantage",
		type: "passive",
		moveName: "Run, Throw, Catch",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/elite-sport-(athletic).svg",
		effect: {
			intro: "You've competed professionally in an athletic sport (baseball, football, tennis, etc.), through which you have developed your physical capabilities.",
			trigger: "When running, throwing or catching objects,",
			effect: "you take +1 ongoing to all relevant rolls"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Elite Sport (Contact)",
		itemType: "advantage",
		type: "passive",
		moveName: "Take a Hit",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/elite-sport-(contact).svg",
		effect: {
			intro: "You've competed professionally in a contact sport (e.g. ice hockey, football), through which you have learned to take a hit.",
			trigger: "Whenever you Endure Injury against a close combat attack,",
			effect: "take +1 to your roll"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Elite Sport (Fencing)",
		itemType: "advantage",
		type: "passive",
		moveName: "Swordfight",
		notes: ">AppendList:weapon/sword,attacks",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/elite-sport-(fencing).svg",
		effect: {
			intro: "You've competed professionally in fencing. You own a rapier at home and you know how to wield it.",
			trigger: "When fighting with a sword,",
			effect: "add the following to your available attacks: $ATTACKS$"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Riposte:arm:3:-:You can use this attack immediately after successfully parrying.}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Endure Trauma",
		itemType: "advantage",
		type: "passive",
		moveName: "Resist Trauma",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/endure-trauma.svg",
		effect: {
			intro: "You are not as easily affected by trauma as others.",
			trigger: "Whenever you reduce Stability,",
			effect: "you always lose 1 fewer level than normal"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Enforcer",
		itemType: "advantage",
		type: "active",
		moveName: "Threaten Other",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/enforcer.svg",
		effect: {
			intro: "",
			trigger: "Whenever you credibly threaten someone directly or suggestively,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "They must decide to either do what you want or defy you with the knowledge that you can execute your threat.",
				list: ""
			},
			partial: {
				text: "You must give them a third option. Choose one:",
				list: "|They offer you something they think you'd rather have.|Retreat from the scene.|They are terrorized; you have +1 ongoing on all rolls against them until they've proven they're not afraid of you.|They attack you from a disadvantaged position. You take +2 on your roll to Engage in Combat if you counterattack."
			},
			fail: {
				text: "Turns out you didn't have the advantage you thought you did. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Enhanced Awareness",
		itemType: "advantage",
		type: "active",
		moveName: "Focus on the Illusion",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/enhanced-awareness.svg",
		effect: {
			intro: "",
			trigger: "When you focus your senses at a location where the Illusion is weak,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You can discern clear details regarding the location, and may be able to speak to entities tied to it.",
				list: ""
			},
			partial: {
				text: "You get some basic impressions regarding the location.",
				list: ""
			},
			fail: {
				text: "The Illusion tears. The veil is lifted temporarily, revealing an alternate dimension—the GM determines which one. The PC could be sucked into it or something may cross over into our reality. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Erotic",
		itemType: "advantage",
		type: "active",
		moveName: "Incite Desire",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/erotic.svg",
		effect: {
			intro: "",
			trigger: "Whenever you make moves to attract an NPC to you,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|The person must have you, and will abandon their normally reasonable behavior to do so.|The person is distracted by you for as long as you're in the vicinity, unable to concentrate on anything else.|The person becomes jealous of anyone competing for your attention, and tries to dispose of them by any means necessary.|You make them uncertain and confused. You take +1 ongoing against them during this scene.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose up to three options any time during this scene.",
				list: "|The person must have you, and will abandon their normally reasonable behavior to do so.|The person is distracted by you for as long as you're in the vicinity, unable to concentrate on anything else.|The person becomes jealous of anyone competing for your attention, and tries to dispose of them by any means necessary.|You make them uncertain and confused. You take +1 ongoing against them during this scene."
			},
			partial: {
				text: "Choose up to two options any time during this scene.",
				list: "|The person must have you, and will abandon their normally reasonable behavior to do so.|The person is distracted by you for as long as you're in the vicinity, unable to concentrate on anything else.|The person becomes jealous of anyone competing for your attention, and tries to dispose of them by any means necessary.|You make them uncertain and confused. You take +1 ongoing against them during this scene."
			},
			fail: {
				text: "Choose one option any time during this scene, but the nature of the attraction is different than you had hoped. The GM makes a Move.",
				list: "|The person must have you, and will abandon their normally reasonable behavior to do so.|The person is distracted by you for as long as you're in the vicinity, unable to concentrate on anything else.|The person becomes jealous of anyone competing for your attention, and tries to dispose of them by any means necessary.|You make them uncertain and confused. You take +1 ongoing against them during this scene."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Escape Artist",
		itemType: "advantage",
		type: "active",
		moveName: "Escape",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "coolness",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/escape-artist.svg",
		effect: {
			intro: "You are a master at slipping away when the shit hits the fan.",
			trigger: "Whenever you need to escape a dangerous situation,",
			effect: "outline your plan and roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You escape without complications.",
				list: ""
			},
			partial: {
				text: "You can choose to stay or escape at a cost, such as leaving something important behind or take something traceable with you. The GM decides what it is.",
				list: ""
			},
			fail: {
				text: "You are only half out the door when you're caught in a really bad spot. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Exit Strategy",
		itemType: "advantage",
		type: "active",
		moveName: "Make a Clean Exit",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "perception",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/exit-strategy.svg",
		effect: {
			intro: "",
			trigger: "Whenever you have killed someone covertly and leave the scene of the murder,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|You leave the scene of the murder unnoticed and reach a safe spot of your choosing in the vicinity. Describe how.|You have left no clues that can be traced back to you.|The body is well hidden and will not be found for quite some time. 108",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You get all three options below.",
				list: "|You leave the scene of the murder unnoticed and reach a safe spot of your choosing in the vicinity. Describe how.|You have left no clues that can be traced back to you.|The body is well hidden and will not be found for quite some time. 108"
			},
			partial: {
				text: "Choose two of the options below.",
				list: "|You leave the scene of the murder unnoticed and reach a safe spot of your choosing in the vicinity. Describe how.|You have left no clues that can be traced back to you.|The body is well hidden and will not be found for quite some time. 108"
			},
			fail: {
				text: "Choose one option, but you risk discovery or face unexpected obstacles. The GM makes a Move.",
				list: "|You leave the scene of the murder unnoticed and reach a safe spot of your choosing in the vicinity. Describe how.|You have left no clues that can be traced back to you.|The body is well hidden and will not be found for quite some time. 108"
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Exorcist",
		itemType: "advantage",
		type: "active",
		moveName: "Perform Exorcism",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/exorcist.svg",
		effect: {
			intro: "",
			trigger: "Whenever you perform an exorcism to banish a spirit or extradimensional creature,",
			effect: "explain what the ritual looks like and roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Nobody is harmed during the ritual.|The entity will not reappear later.|The entity will not become hostile toward you.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "The creature is banished. Choose two options.",
				list: "|Nobody is harmed during the ritual.|The entity will not reappear later.|The entity will not become hostile toward you."
			},
			partial: {
				text: "The creature is banished. Choose one option.",
				list: "|Nobody is harmed during the ritual.|The entity will not reappear later.|The entity will not become hostile toward you."
			},
			fail: {
				text: "The creature resists banishment and something goes terribly wrong, such as the creature possessing you. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Expert",
		itemType: "advantage",
		type: "passive",
		moveName: "",
		notes: "GET: ReplaceList (Investigate, Questions)",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/expert.svg",
		effect: {
			intro: "You are an expert in certain fields of knowledge. Choose two areas of expertise when you gain this Advantage: $OPTIONS$",
			trigger: "Whenever you Investigate something associated with one of your chosen fields,",
			effect: "you always get to ask one additional question, regardless of the outcome, and may ask any questions you want"
		},
		lists: {
			questions: "",
			options: "|Archeology|Economics|History|Comparative Literature|Psychology|Sociology|Theology|(Other)",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Explosives Expert",
		itemType: "advantage",
		type: "active",
		moveName: "Build Explosive",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/explosives-expert.svg",
		effect: {
			intro: "You can build and disarm bombs. If you have enough time and resources, you can build any kind of bomb you like without a roll.",
			trigger: "Whenever you're building an improvised bomb under time pressure,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You construct a functional bomb.",
				list: ""
			},
			partial: {
				text: "The bomb's blast potential is lower than usual (decrease Harm dealt by −1).",
				list: ""
			},
			fail: {
				text: "The bomb is unpredictable. Maybe it doesn't detonate, detonates prematurely, or it is more powerful and volatile than expected. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Extortionist",
		itemType: "advantage",
		type: "passive",
		moveName: "",
		notes: ">AppendList:move/Read a Person,questions",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/extortionist.svg",
		effect: {
			intro: "",
			trigger: "Whenever you Read a Person,",
			effect: "you may choose from these questions in addition to the usual ones: $QUESTIONS$"
		},
		lists: {
			questions: "|What are you afraid of?|What is precious to you?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Eye for an Eye",
		itemType: "advantage",
		type: "passive",
		moveName: "Promise Vengeance",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/eye-for-an-eye.svg",
		effect: {
			intro: "",
			trigger: "Whenever you suffer a serious or critical injury, name the person you feel is responsible.",
			effect: "You get +2 ongoing to all rolls against them, forever. All rolls targeting the person count, but rolls targeting the person's family, friends, minions, and property only count if the GM feels they're applicable"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Eye for Detail",
		itemType: "advantage",
		type: "active",
		moveName: "Study Other",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "perception",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/eye-for-detail.svg",
		effect: {
			intro: "",
			trigger: "Whenever you have had time to study somebody for a while,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "|Where are you from?|Are you capable of violence?|How could I seduce or tempt you?|Why are you here?|What are you working on?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Ask three questions from the list below.",
				list: "|Where are you from?|Are you capable of violence?|How could I seduce or tempt you?|Why are you here?|What are you working on?"
			},
			partial: {
				text: "Ask two questions from the list below.",
				list: "|Where are you from?|Are you capable of violence?|How could I seduce or tempt you?|Why are you here?|What are you working on?"
			},
			fail: {
				text: "Ask one question from the list below, but you expose your inquisitiveness to the person you're observing. The GM makes a Move.",
				list: "|Where are you from?|Are you capable of violence?|How could I seduce or tempt you?|Why are you here?|What are you working on?"
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Fascination",
		itemType: "advantage",
		type: "active",
		moveName: "Artful Seduction",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/fascination.svg",
		effect: {
			intro: "",
			trigger: "Whenever you use your art to seduce an NPC,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|They are attracted to you.|They forget their woes when experiencing your art.|They are totally captivated by your art and forget all about their surrounding environment.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose one option.",
				list: "|They are attracted to you.|They forget their woes when experiencing your art.|They are totally captivated by your art and forget all about their surrounding environment."
			},
			partial: {
				text: "Choose one option, but the GM also chooses one of the following:",
				list: "|They become obsessed with you.|They want you right now."
			},
			fail: {
				text: "They are affected by you in a way you didn't anticipate, or the attraction is uncomfortably strong—you choose. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Fast Talk",
		itemType: "advantage",
		type: "active",
		moveName: "Fast Talk",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "coolness",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/fast-talk.svg",
		effect: {
			intro: "",
			trigger: "Whenever you talk to an NPC to get their attention,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Prevent the NPC from noticing something in her immediate vicinity.|Get the NPC to disclose something important (the GM will provide the details).|Distract the NPC. You take +1 to your next roll against them.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose two options.",
				list: "|Prevent the NPC from noticing something in her immediate vicinity.|Get the NPC to disclose something important (the GM will provide the details).|Distract the NPC. You take +1 to your next roll against them."
			},
			partial: {
				text: "Choose one option.",
				list: "|Prevent the NPC from noticing something in her immediate vicinity.|Get the NPC to disclose something important (the GM will provide the details).|Distract the NPC. You take +1 to your next roll against them."
			},
			fail: {
				text: "Choose one option, but they grow suspicious of your motives. The GM makes a Move.",
				list: "|Prevent the NPC from noticing something in her immediate vicinity.|Get the NPC to disclose something important (the GM will provide the details).|Distract the NPC. You take +1 to your next roll against them."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Field Agent",
		itemType: "advantage",
		type: "active",
		moveName: "Enter Combat",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/field-agent.svg",
		effect: {
			intro: "You have been trained by an intelligence agency to fight in the field.",
			trigger: "Whenever you enter combat,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|Take Cover - Avoid a ranged attack by diving behind an object or a person.|Choke Hold - Lock a human opponent in a grip they cannot get out of without taking 1 Harm.|Disarm - Remove an opponent's weapon in close combat.|Improvised Weapon - Make a lethal, close-combat attack with a seemingly-innocuous object.$ATTACKS${Surprise Strike:arm:2:-:}",
			attacks: "{Surprise Strike:arm:2:-:}"
		},
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Take Cover - Avoid a ranged attack by diving behind an object or a person.|Choke Hold - Lock a human opponent in a grip they cannot get out of without taking 1 Harm.|Disarm - Remove an opponent's weapon in close combat.|Improvised Weapon - Make a lethal, close-combat attack with a seemingly-innocuous object.$ATTACKS${Surprise Strike:arm:2:-:}"
			},
			partial: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Take Cover - Avoid a ranged attack by diving behind an object or a person.|Choke Hold - Lock a human opponent in a grip they cannot get out of without taking 1 Harm.|Disarm - Remove an opponent's weapon in close combat.|Improvised Weapon - Make a lethal, close-combat attack with a seemingly-innocuous object.$ATTACKS${Surprise Strike:arm:2:-:}"
			},
			fail: {
				text: "Get 1 Edge, but you have made a bad call. The GM makes a Move.",
				list: "|Take Cover - Avoid a ranged attack by diving behind an object or a person.|Choke Hold - Lock a human opponent in a grip they cannot get out of without taking 1 Harm.|Disarm - Remove an opponent's weapon in close combat.|Improvised Weapon - Make a lethal, close-combat attack with a seemingly-innocuous object.$ATTACKS${Surprise Strike:arm:2:-:}"
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Forbidden Inspiration",
		itemType: "advantage",
		type: "active",
		moveName: "Seek Inspiration",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/forbidden-inspiration.svg",
		effect: {
			intro: "",
			trigger: "Whenever you dive deep into your art and allow yourself to be inspired by the Truth,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Enticement: Entice an entity to come to you.|Visions: See Through the Illusion into a specific place of your choice.|Inspiration: Ask the GM if there is anything strange or supernatural about the situation you're in. The answer will be revealed through your art. 114",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose two options.",
				list: "|Enticement: Entice an entity to come to you.|Visions: See Through the Illusion into a specific place of your choice.|Inspiration: Ask the GM if there is anything strange or supernatural about the situation you're in. The answer will be revealed through your art. 114"
			},
			partial: {
				text: "Choose one option.",
				list: "|Enticement: Entice an entity to come to you.|Visions: See Through the Illusion into a specific place of your choice.|Inspiration: Ask the GM if there is anything strange or supernatural about the situation you're in. The answer will be revealed through your art. 114"
			},
			fail: {
				text: "You have gazed too deeply into the abyss. Choose one option, but you also experience terrifying visions or encounter something horrible. The GM makes a Move.",
				list: "|Enticement: Entice an entity to come to you.|Visions: See Through the Illusion into a specific place of your choice.|Inspiration: Ask the GM if there is anything strange or supernatural about the situation you're in. The answer will be revealed through your art. 114"
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Forked Tongue",
		itemType: "advantage",
		type: "active",
		moveName: "Manipulate Other",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/forked-tongue.svg",
		effect: {
			intro: "",
			trigger: "Whenever you manipulate someone,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose one option:",
				list: "|They trust you (PC takes +1 Relation with you).|They're spellbound by you (take +1 ongoing against them during this scene).|They reveal a weakness, which you can exploit later."
			},
			partial: {
				text: "Choose one option from the list above, but there's also a complication, chosen by the GM or player:",
				list: "|They see you as a friend they can turn to when in need.|They fall in love with you.|They will feel betrayed, spurned, humiliated, or manipulated whenever you abuse their trust in you."
			},
			fail: {
				text: "They see right through you and will act as they please.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Gang Leader",
		itemType: "advantage",
		type: "active",
		moveName: "Give Orders",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/gang-leader.svg",
		effect: {
			intro: "You're the boss of a small gang of criminals.",
			trigger: "Whenever you give your gang orders that are risky and/ or may result in them paying a high price,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "They enact your orders without question.",
				list: ""
			},
			partial: {
				text: "They do as you want, but there is a complication (choose one):",
				list: "|One of them defies you in front of the others.|They will all be disgruntled for some time."
			},
			fail: {
				text: "Problems arise. Maybe something goes wrong when carrying out your orders, or they doubt your abilities as a leader. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Genius",
		itemType: "advantage",
		type: "active",
		moveName: "Think Fast",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/genius.svg",
		effect: {
			intro: "",
			trigger: "Whenever you find yourself in a life-threatening situation,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]) to see if you can discover a way out"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|Logical - You realize an effective way to dispose of the threat. Deal +1 Harm whenever you exploit it.|Quick Thinker - You realize how to protect yourself from Harm. Treat it as if you'd rolled a (15+) on Avoid Harm whenever you exploit it.|Rational - You realize how to save yourself by sacrificing someone else. Pick the person you throw under the bus to escape the threat.",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose up to three Edges, useable any time in the scene, while you're still in danger.",
				list: "|Logical - You realize an effective way to dispose of the threat. Deal +1 Harm whenever you exploit it.|Quick Thinker - You realize how to protect yourself from Harm. Treat it as if you'd rolled a (15+) on Avoid Harm whenever you exploit it.|Rational - You realize how to save yourself by sacrificing someone else. Pick the person you throw under the bus to escape the threat."
			},
			partial: {
				text: "Choose up to two Edges, useable any time in the scene, while you're still in danger.",
				list: "|Logical - You realize an effective way to dispose of the threat. Deal +1 Harm whenever you exploit it.|Quick Thinker - You realize how to protect yourself from Harm. Treat it as if you'd rolled a (15+) on Avoid Harm whenever you exploit it.|Rational - You realize how to save yourself by sacrificing someone else. Pick the person you throw under the bus to escape the threat."
			},
			fail: {
				text: "Choose one Edge, but you also attract unwanted attention. The GM makes a Move.",
				list: "|Logical - You realize an effective way to dispose of the threat. Deal +1 Harm whenever you exploit it.|Quick Thinker - You realize how to protect yourself from Harm. Treat it as if you'd rolled a (15+) on Avoid Harm whenever you exploit it.|Rational - You realize how to save yourself by sacrificing someone else. Pick the person you throw under the bus to escape the threat."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Good Samaritan",
		itemType: "advantage",
		type: "passive",
		moveName: "Help and Heal",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/good-samaritan.svg",
		effect: {
			intro: "",
			trigger: "Whenever you help another at your own expense,",
			effect: "gain Stability (+1)"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Gritted Teeth",
		itemType: "advantage",
		type: "passive",
		moveName: "",
		notes: ">SetPenalty:SeriousWound,0>SetPenalty:CriticalWound,0",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/gritted-teeth.svg",
		effect: {
			intro: "Abuse, violence, self-harm, and assaults have become familiar, and the pain hardly affects you at all anymore.",
			trigger: "Whenever you are Wounded,",
			effect: "you suffer no penalties from your Wounds"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Grudge",
		itemType: "advantage",
		type: "passive",
		moveName: "Chase a Grudge",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/grudge.svg",
		effect: {
			intro: "",
			trigger: "When someone directly or indirectly ruins your plans,",
			effect: "you take +1 ongoing against them until you have taken revenge or received restitution of equal worth to what you lost"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Hacker",
		itemType: "advantage",
		type: "active",
		moveName: "Hack",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/hacker.svg",
		effect: {
			intro: "",
			trigger: "Whenever you penetrate digital networks in the pursuit of confidential data, crack software, or disable security systems,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You accomplish your task without a problem.",
				list: ""
			},
			partial: {
				text: "Complications arise. Choose one option:",
				list: "|Someone discovers the intrusion. You must take risks or compromise on how much you're able to accomplish.|You leave traces of your intrusion."
			},
			fail: {
				text: "Unbeknownst to you, your intrusion didn't work out as you wanted. Maybe you didn't succeed at your task as well as you imagined, or you may have been discovered by personal enemies, law enforcement, or something else lurking in the network. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Hardened",
		itemType: "advantage",
		type: "passive",
		moveName: "Brush It Off",
		notes: ">BuffRoll:Endure Injury,1",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/hardened.svg",
		effect: {
			intro: "",
			trigger: "Whenever you Endure Injury,",
			effect: "take +1 to your roll"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Hunter",
		itemType: "advantage",
		type: "active",
		moveName: "Hunt Other",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "perception",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/hunter.svg",
		effect: {
			intro: "",
			trigger: "Whenever you are hunting someone or something,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Prepare Ambush - Deal your weapon's Harm when your enemy stumbles in.|Camouflage - Take +2 ongoing to Act Under Pressure for as long as you remain hiding.|Move in Shadows - Take +2 ongoing to Avoid Harm from ranged weapons.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Get three options. You may spend them anytime during this scene.",
				list: "|Prepare Ambush - Deal your weapon's Harm when your enemy stumbles in.|Camouflage - Take +2 ongoing to Act Under Pressure for as long as you remain hiding.|Move in Shadows - Take +2 ongoing to Avoid Harm from ranged weapons."
			},
			partial: {
				text: "Get two options. You may spend them anytime during this scene.",
				list: "|Prepare Ambush - Deal your weapon's Harm when your enemy stumbles in.|Camouflage - Take +2 ongoing to Act Under Pressure for as long as you remain hiding.|Move in Shadows - Take +2 ongoing to Avoid Harm from ranged weapons."
			},
			fail: {
				text: "Get one option, but you become the prey. The GM makes a Move.",
				list: "|Prepare Ambush - Deal your weapon's Harm when your enemy stumbles in.|Camouflage - Take +2 ongoing to Act Under Pressure for as long as you remain hiding.|Move in Shadows - Take +2 ongoing to Avoid Harm from ranged weapons."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Ice Cold",
		itemType: "advantage",
		type: "active",
		moveName: "Keep Cool",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "coolness",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/ice-cold.svg",
		effect: {
			intro: "You keep your calm and cool, even in the midst of violence and chaos.",
			trigger: "Whenever you are in a violent conflict,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|Easy Dodge - Avoid an attack.|Opportunity Calls - Manage to snatch something.|Patience, Patience - Maneuver into a better position.|Clever Trick - Put someone in a bad position (everyone gets +2 to any attack Moves).",
			attacks: ""
		},
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Easy Dodge - Avoid an attack.|Opportunity Calls - Manage to snatch something.|Patience, Patience - Maneuver into a better position.|Clever Trick - Put someone in a bad position (everyone gets +2 to any attack Moves)."
			},
			partial: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Easy Dodge - Avoid an attack.|Opportunity Calls - Manage to snatch something.|Patience, Patience - Maneuver into a better position.|Clever Trick - Put someone in a bad position (everyone gets +2 to any attack Moves)."
			},
			fail: {
				text: "Get 1 Edge, but you attract attention from the hostiles. The GM makes a Move.",
				list: "|Easy Dodge - Avoid an attack.|Opportunity Calls - Manage to snatch something.|Patience, Patience - Maneuver into a better position.|Clever Trick - Put someone in a bad position (everyone gets +2 to any attack Moves)."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Implanted Messages",
		itemType: "advantage",
		type: "active",
		moveName: "Experiment on Human",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/implanted-messages.svg",
		effect: {
			intro: "You know how to implant orders into the minds of your \"subjects\".",
			trigger: "Whenever you experiment on a human and wish to implant an order into them,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You hold 2 Power over them. For as long as you retain Power over them, they take 1 Serious Wound should they refuse or attempt to go against your order, but this loosens your grip over them by 1 Power. If they fulfill your order, all your remaining Power over them is removed.",
				list: ""
			},
			partial: {
				text: "You hold 1 Power over them. For as long as you retain Power over them, they take 1 Serious Wound should they refuse or attempt to go against your order, but this loosens your grip over them by 1 Power. If they fulfill your order, all your remaining Power over them is removed.",
				list: ""
			},
			fail: {
				text: "Something goes wrong, such as they get hurt in the process or the order's outcome is different than what you imagined. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Impostor",
		itemType: "advantage",
		type: "active",
		moveName: "Exploit Rube",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/impostor.svg",
		effect: {
			intro: "You maintain relationships with numerous people who all believe you are their soulmate, yet are unaware of each other.",
			trigger: "Whenever you need money, a safehouse, protection, or other help one of your victims can provide,",
			effect: "describe who they are and roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "They can provide you with whatever you require.",
				list: ""
			},
			partial: {
				text: "One of them might be able to help, but it will take some convincing.",
				list: ""
			},
			fail: {
				text: "You know someone who can help, but they have already seen through your game. If you want their assistance it will require threats or blackmail to get them to provide it.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Improviser",
		itemType: "advantage",
		type: "active",
		moveName: "Wing It",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "coolness",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/improviser.svg",
		effect: {
			intro: "",
			trigger: "Whenever you attempt to get out of a dangerous situation by winging it,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Lie - Come up with a convincing lie.|Gear Up - Find something you can use as a makeshift melee weapon. The GM will tell you what it is.|Hide - Stay out of a pursuer's sight.|Prepare - Set a trap that gives you a +2 surprise bonus the first time you Engage in Combat after the trap is sprung.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose two options.",
				list: "|Lie - Come up with a convincing lie.|Gear Up - Find something you can use as a makeshift melee weapon. The GM will tell you what it is.|Hide - Stay out of a pursuer's sight.|Prepare - Set a trap that gives you a +2 surprise bonus the first time you Engage in Combat after the trap is sprung."
			},
			partial: {
				text: "Choose one option.",
				list: "|Lie - Come up with a convincing lie.|Gear Up - Find something you can use as a makeshift melee weapon. The GM will tell you what it is.|Hide - Stay out of a pursuer's sight.|Prepare - Set a trap that gives you a +2 surprise bonus the first time you Engage in Combat after the trap is sprung."
			},
			fail: {
				text: "Your improvisation makes the situation worse. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Influential Friends",
		itemType: "advantage",
		type: "active",
		moveName: "Pull Strings",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/influential-friends.svg",
		effect: {
			intro: "You have friends with power and influence.",
			trigger: "Whenever you need to acquire an object, gain access to a restricted location, or meet a specific person,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Your friends can arrange for what you want.",
				list: ""
			},
			partial: {
				text: "They can arrange for it, but you have to repay the favor later.",
				list: ""
			},
			fail: {
				text: "They arrange for what you want, but you get on a powerful person's bad side or attract negative publicity. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Inner Power",
		itemType: "advantage",
		type: "active",
		moveName: "Release Power",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/inner-power.svg",
		effect: {
			intro: "You harbor a mysterious power, which you do not fully understand. The power can protect you, but you have no control over it.",
			trigger: "Whenever you release your inner power,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "The power attacks all opponents in your vicinity, causing 2 Harm.",
				list: ""
			},
			partial: {
				text: "The power attacks your closest opponent, causing 2 Harm.",
				list: ""
			},
			fail: {
				text: "The power attacks all living beings, including yourself, in the vicinity, causing 2 Harm.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Instinct",
		itemType: "advantage",
		type: "passive",
		moveName: "Act on Instincts",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/instinct.svg",
		effect: {
			intro: "",
			trigger: "Whenever you Observe a Situation and act on the GM's answers,",
			effect: "take +2 instead of +1"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Interrogator",
		itemType: "advantage",
		type: "passive",
		moveName: "Interrogate",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/interrogator.svg",
		effect: {
			intro: "",
			trigger: "Whenever you Read a Person and mention a name, person, or object,",
			effect: "you may always ask “Are you lying?” This doesn't count towards the number of questions you're allowed to normally ask"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Intimidating",
		itemType: "advantage",
		type: "active",
		moveName: "Intimidate Other",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/intimidating.svg",
		effect: {
			intro: "There is something about you that instinctively makes others fear you.",
			trigger: "Whenever you're trying to frighten another person,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "They succumb to fear and give in to your demands.",
				list: ""
			},
			partial: {
				text: "They run away from you or give in to you, GM's choice.",
				list: ""
			},
			fail: {
				text: "They see you as their primary threat and act accordingly. The GM makes a Move for them.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Intuitive",
		itemType: "advantage",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/intuitive.svg",
		effect: {
			intro: "You can sense people's motives through subconscious readings of their body language, word choices, and behavior.",
			trigger: "Whenever you Read a Person,",
			effect: "you may always ask one additional question, regardless of the outcome of your roll"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Inventor",
		itemType: "advantage",
		type: "active",
		moveName: "Create or Repair",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/inventor.svg",
		effect: {
			intro: "",
			trigger: "Whenever you are about to create or repair something,",
			effect: "explain what you are about to do. The GM will tell you what you need to succeed, and once you have collected these materials, you may roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Durable: The construction can be used multiple times and doesn't break easily.|Effective: The construction confers +1 on rolls where it is used for its intended purpose.|Lethal: The construction causes +1 Harm.|Protective: The construction confers +1 armor.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "The construction is successful and you may pick two options from below.",
				list: "|Durable: The construction can be used multiple times and doesn't break easily.|Effective: The construction confers +1 on rolls where it is used for its intended purpose.|Lethal: The construction causes +1 Harm.|Protective: The construction confers +1 armor."
			},
			partial: {
				text: "The construction has minor flaws. You may choose one option from below.",
				list: "|Durable: The construction can be used multiple times and doesn't break easily.|Effective: The construction confers +1 on rolls where it is used for its intended purpose.|Lethal: The construction causes +1 Harm.|Protective: The construction confers +1 armor."
			},
			fail: {
				text: "You complete the construction or repair, but it has significant flaws, some of which are hidden. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Jaded",
		itemType: "advantage",
		type: "passive",
		moveName: "Keep Holding On",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/jaded.svg",
		effect: {
			intro: "",
			trigger: "Whenever you Keep It Together and the result is a Partial Success,",
			effect: "you may suppress your emotions and postpone their effects until the next scene"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Keen-Eyed",
		itemType: "advantage",
		type: "passive",
		moveName: "",
		notes: ">AppendList:move/Observe a Situation,questions",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/keen-eyed.svg",
		effect: {
			intro: "",
			trigger: "Whenever you Observe a Situation,",
			effect: "you may choose from these questions, in addition to the ones normally acquired: $QUESTIONS$"
		},
		lists: {
			questions: "|What weaknesses do they have I can use to my advantage?|What strengths do they have I should watch out for?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Lay on Hands",
		itemType: "advantage",
		type: "active",
		moveName: "Heal",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/lay-on-hands.svg",
		effect: {
			intro: "You are able to heal others' Wounds without using medicine or first aid, but you must channel the injuries onto yourself or another living victim.$n$To transfer a Wound, you must be able to see the victim, but not touch them and they are not required to consent.$n$The wound transferred is of the same type, severity, and condition as the original.",
			trigger: "Whenever you lay your hands on a seriously or critically wounded person and pray,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You fully heal the injured person, channeling the Wound onto yourself or a selected target.",
				list: ""
			},
			partial: {
				text: "You stabilize the injured, channeling the Wound onto yourself or a selected target.",
				list: ""
			},
			fail: {
				text: "You may choose to stabilize the injured, but if you do, the powers break free from your control.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Lightning Fast",
		itemType: "advantage",
		type: "active",
		moveName: "Accelerate",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/lightning-fast.svg",
		effect: {
			intro: "",
			trigger: "Whenever you move unexpectedly fast in combat,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|Dodge - Avoid an attack.|Blinding Speed - Engage in Combat with every opponent within reach of your weapon as a single attack. If you're attacking with a firearm, this uses up all its ammo.|Uncanny Precision - Hit your opponent's weak spot. Deal +1 Harm.",
			attacks: ""
		},
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Dodge - Avoid an attack.|Blinding Speed - Engage in Combat with every opponent within reach of your weapon as a single attack. If you're attacking with a firearm, this uses up all its ammo.|Uncanny Precision - Hit your opponent's weak spot. Deal +1 Harm."
			},
			partial: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Dodge - Avoid an attack.|Blinding Speed - Engage in Combat with every opponent within reach of your weapon as a single attack. If you're attacking with a firearm, this uses up all its ammo.|Uncanny Precision - Hit your opponent's weak spot. Deal +1 Harm."
			},
			fail: {
				text: "Get 1 Edge, but you also end up in a bad spot or face unexpected resistance. The GM makes a Move.",
				list: "|Dodge - Avoid an attack.|Blinding Speed - Engage in Combat with every opponent within reach of your weapon as a single attack. If you're attacking with a firearm, this uses up all its ammo.|Uncanny Precision - Hit your opponent's weak spot. Deal +1 Harm."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Magical Intuition",
		itemType: "advantage",
		type: "active",
		moveName: "Intuit the Illusion",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/magical-intuition.svg",
		effect: {
			intro: "You have an innate ability to perceive Kirlian auras and sense the presence of magic.",
			trigger: "Whenever you utilize your magical intuition,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Learn something about a creature's true nature.|Learn if something has a magical nature.|Learn where the Illusion is weakest towards other dimensions.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose up to three options. Up to two may be saved until later this scene.",
				list: "|Learn something about a creature's true nature.|Learn if something has a magical nature.|Learn where the Illusion is weakest towards other dimensions."
			},
			partial: {
				text: "Choose up to two options. One may be saved until later this scene.",
				list: "|Learn something about a creature's true nature.|Learn if something has a magical nature.|Learn where the Illusion is weakest towards other dimensions."
			},
			fail: {
				text: "Choose one option, but you also get an unexpected vision or attract attention. The GM makes a Move.",
				list: "|Learn something about a creature's true nature.|Learn if something has a magical nature.|Learn where the Illusion is weakest towards other dimensions."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Magnetic Attraction",
		itemType: "advantage",
		type: "active",
		moveName: "Attract Attention",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/magnetic-attraction.svg",
		effect: {
			intro: "",
			trigger: "Whenever you attract everyone's attention,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|People forget what they're doing and can do nothing but stare at you.|Draw someone to you.|Get someone to do what you ask.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose up to three options. You may save up to two until later in the scene.",
				list: "|People forget what they're doing and can do nothing but stare at you.|Draw someone to you.|Get someone to do what you ask."
			},
			partial: {
				text: "Choose one option.",
				list: "|People forget what they're doing and can do nothing but stare at you.|Draw someone to you.|Get someone to do what you ask."
			},
			fail: {
				text: "Choose one option, but someone present becomes obsessed, wanting to have you, keep you, and own you for themselves. The GM makes a Move.",
				list: "|People forget what they're doing and can do nothing but stare at you.|Draw someone to you.|Get someone to do what you ask."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Manhunter",
		itemType: "advantage",
		type: "active",
		moveName: "Investigate Person",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/manhunter.svg",
		effect: {
			intro: "",
			trigger: "Whenever you're out to get information about someone,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "|What is their background?|What or who do they love most of all?|Who do they surround themselves with, like, and/or trust?|Where are they located right now?|How can I best gain access to them?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Ask the GM three questions from the list below.",
				list: "|What is their background?|What or who do they love most of all?|Who do they surround themselves with, like, and/or trust?|Where are they located right now?|How can I best gain access to them?"
			},
			partial: {
				text: "Ask the GM two questions from the list below.",
				list: "|What is their background?|What or who do they love most of all?|Who do they surround themselves with, like, and/or trust?|Where are they located right now?|How can I best gain access to them?"
			},
			fail: {
				text: "Ask the GM one question from the list below, but someone figures out you've been snooping around.",
				list: "|What is their background?|What or who do they love most of all?|Who do they surround themselves with, like, and/or trust?|Where are they located right now?|How can I best gain access to them?"
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Manipulative",
		itemType: "advantage",
		type: "passive",
		moveName: "Exploit Trust",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/manipulative.svg",
		effect: {
			intro: "",
			trigger: "Whenever you do someone a favor or learn one of their secrets,",
			effect: "you may later choose one of the options below, by reminding them of your prior services or hint at the secret you know: $OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Take +2 to Influence them.|Take +2 to Hinder them.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Martial Arts Expert",
		itemType: "advantage",
		type: "active",
		moveName: "Engage in Melee",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/martial-arts-expert.svg",
		effect: {
			intro: "",
			trigger: "Whenever you're fighting in close quarters,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|Block - Avoid a melee attack.|Roundhouse Strike - Engage in Combat against several opponents surrounding you, counting as a single attack.|Disarm - Remove an opponent's weapon.|Throw - Reposition an opponent or drop them to the ground.",
			attacks: ""
		},
		results: {
			success: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Block - Avoid a melee attack.|Roundhouse Strike - Engage in Combat against several opponents surrounding you, counting as a single attack.|Disarm - Remove an opponent's weapon.|Throw - Reposition an opponent or drop them to the ground."
			},
			partial: {
				text: "Get 1 Edge.",
				list: "|Block - Avoid a melee attack.|Roundhouse Strike - Engage in Combat against several opponents surrounding you, counting as a single attack.|Disarm - Remove an opponent's weapon.|Throw - Reposition an opponent or drop them to the ground."
			},
			fail: {
				text: "Get 1 Edge, but you underestimate your opponents, who may be more numerous or skilled than you first assumed. The GM makes a Move.",
				list: "|Block - Avoid a melee attack.|Roundhouse Strike - Engage in Combat against several opponents surrounding you, counting as a single attack.|Disarm - Remove an opponent's weapon.|Throw - Reposition an opponent or drop them to the ground."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Moles",
		itemType: "advantage",
		type: "active",
		moveName: "Contact Mole",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/moles.svg",
		effect: {
			intro: "You have placed a number of moles in groups or organizations of interest to you, such as business competitors, governments, or cults.",
			trigger: "Whenever you make contact with one of your moles to acquire info or services,",
			effect: "explain what group or organization the mole belongs to, name them, and then roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|The mole has penetrated the organization's inner circle; however, their influence is limited.|The mole owes you one; however, you must meet their demands to get what you want.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You receive both options below.",
				list: "|The mole has penetrated the organization's inner circle; however, their influence is limited.|The mole owes you one; however, you must meet their demands to get what you want."
			},
			partial: {
				text: "Choose one of the options below.",
				list: "|The mole has penetrated the organization's inner circle; however, their influence is limited.|The mole owes you one; however, you must meet their demands to get what you want."
			},
			fail: {
				text: "The mole's loyalties are questionable. Can you trust them? The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Network of Contacts",
		itemType: "advantage",
		type: "active",
		moveName: "Ask About Someone",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/network-of-contacts.svg",
		effect: {
			intro: "",
			trigger: "Whenever you check in with your contacts regarding an individual of your choosing,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "|What resources do they have at their disposal?|Who do they have business dealings with?|Where can I find them?|What do they want?|What are they most afraid of losing?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You may ask three questions from the list below.",
				list: "|What resources do they have at their disposal?|Who do they have business dealings with?|Where can I find them?|What do they want?|What are they most afraid of losing?"
			},
			partial: {
				text: "You may ask two questions from the list below.",
				list: "|What resources do they have at their disposal?|Who do they have business dealings with?|Where can I find them?|What do they want?|What are they most afraid of losing?"
			},
			fail: {
				text: "You may ask one question from the list below, but the person you're inquiring about finds out you're snooping around. The GM makes a Move.",
				list: "|What resources do they have at their disposal?|Who do they have business dealings with?|Where can I find them?|What do they want?|What are they most afraid of losing?"
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Notorious",
		itemType: "advantage",
		type: "active",
		moveName: "Check: Notorious",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/notorious.svg",
		effect: {
			intro: "You are famous in your trade.",
			trigger: "Whenever you encounter someone who has likely heard about you,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "They know of your reputation; you can decide what they have heard. The GM will have them act accordingly. You take +2 to your next roll to Influence them.",
				list: ""
			},
			partial: {
				text: "They know of your reputation; you can decide what they have heard.",
				list: ""
			},
			fail: {
				text: "They know of your reputation; the GM decides what they have heard.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Observant",
		itemType: "advantage",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/observant.svg",
		effect: {
			intro: "",
			trigger: "Whenever you Read a Person,",
			effect: "you may choose from these questions in addition to the usual ones: $QUESTIONS$"
		},
		lists: {
			questions: "|What sort of person are you?|Is there anything odd about you?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Occult Library",
		itemType: "advantage",
		type: "active",
		moveName: "Do Library Research",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/occult-library.svg",
		effect: {
			intro: "",
			trigger: "Whenever you are in your library researching the supernatural,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Ask the GM two questions from the list below.",
				list: "|Which higher power does this have connections to?|What do I need, or need to do, to exorcise or control this being?|Which dimension is this associated with?|What must I do to protect myself from this?"
			},
			partial: {
				text: "Ask the GM one question from the list below.",
				list: "|Which higher power does this have connections to?|What do I need, or need to do, to exorcise or control this being?|Which dimension is this associated with?|What must I do to protect myself from this?"
			},
			fail: {
				text: "Ask the GM one question from the list below, but you have missed or overlooked something crucial. The GM takes 1 Hold.",
				list: "|Which higher power does this have connections to?|What do I need, or need to do, to exorcise or control this being?|Which dimension is this associated with?|What must I do to protect myself from this?"
			}
		},
		suffix: {
			text: "The GM can spend Hold at any time to make a hard or soft Move.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Occult Studies",
		itemType: "advantage",
		type: "active",
		moveName: "Encounter the Occult",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/occult-studies.svg",
		effect: {
			intro: "You are a student of the occult.",
			trigger: "Upon coming in contact with a magical discipline, entity, or phenomenon for the first time,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|I know something about this (ask the GM what you know and take +1 ongoing while acting on the answers during this scene).|I know where I can find more information about this (ask the GM where).",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Take both options below.",
				list: "|I know something about this (ask the GM what you know and take +1 ongoing while acting on the answers during this scene).|I know where I can find more information about this (ask the GM where)."
			},
			partial: {
				text: "Choose one option.",
				list: "|I know something about this (ask the GM what you know and take +1 ongoing while acting on the answers during this scene).|I know where I can find more information about this (ask the GM where)."
			},
			fail: {
				text: "You have a hazy memory of something like this, but can't say for sure if it's true or not. The GM explains what it is you remember.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Officer",
		itemType: "advantage",
		type: "active",
		moveName: "Fight Beside Ally",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/officer.svg",
		effect: {
			intro: "",
			trigger: "Whenever you are in combat with at least one ally by your side,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|\"Attack!\" - One ally gets +2 to their next roll to Engage in Combat.|\"Coordinate Fire!\" - All allies get +1 to their next roll to Engage in Combat with firearms while in the fight.|\"Go For The Head!\" - You or one of your allies' Engage in Combat deals +1 Harm.|\"Take Cover!\" - You or an ally receive 2 Armor against a ranged attack.",
			attacks: ""
		},
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|\"Attack!\" - One ally gets +2 to their next roll to Engage in Combat.|\"Coordinate Fire!\" - All allies get +1 to their next roll to Engage in Combat with firearms while in the fight.|\"Go For The Head!\" - You or one of your allies' Engage in Combat deals +1 Harm.|\"Take Cover!\" - You or an ally receive 2 Armor against a ranged attack."
			},
			partial: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|\"Attack!\" - One ally gets +2 to their next roll to Engage in Combat.|\"Coordinate Fire!\" - All allies get +1 to their next roll to Engage in Combat with firearms while in the fight.|\"Go For The Head!\" - You or one of your allies' Engage in Combat deals +1 Harm.|\"Take Cover!\" - You or an ally receive 2 Armor against a ranged attack."
			},
			fail: {
				text: "You misjudge the situation. Choose whether you have put yourself or one of your allies in harm's way. The GM makes a Move for your opponent.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Opportunist",
		itemType: "advantage",
		type: "passive",
		moveName: "Trample Other",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/opportunist.svg",
		effect: {
			intro: "",
			trigger: "Whenever you sacrifice someone else to further your own goals,",
			effect: "gain Stability (+1)"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Parkour",
		itemType: "advantage",
		type: "active",
		moveName: "Execute Acrobatic Maneuver",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "coolness",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/parkour.svg",
		effect: {
			intro: "You are deft at running and jumping, even over difficult terrain.",
			trigger: "Whenever you execute acrobatic maneuvers,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Scale a seemingly impossible obstacle.|Make a seemingly life-threatening leap without suffering Harm.|Successfully avoid a threat. 106",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose two options. You may save one until later.",
				list: "|Scale a seemingly impossible obstacle.|Make a seemingly life-threatening leap without suffering Harm.|Successfully avoid a threat. 106"
			},
			partial: {
				text: "Choose one option.",
				list: "|Scale a seemingly impossible obstacle.|Make a seemingly life-threatening leap without suffering Harm.|Successfully avoid a threat. 106"
			},
			fail: {
				text: "Choose one option, but a complication, cost, or new threat emerges. The GM makes a Move.",
				list: "|Scale a seemingly impossible obstacle.|Make a seemingly life-threatening leap without suffering Harm.|Successfully avoid a threat. 106"
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Perpetual Victim",
		itemType: "advantage",
		type: "active",
		moveName: "Appear Helpless",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/perpetual-victim.svg",
		effect: {
			intro: "",
			trigger: "Whenever you appear defenseless during a dangerous experience,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Make someone want to take care of you.|Make an aggressive person want to not harm you.|Make someone confide in you.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose three options. You may save up to two options for use later during the scene.",
				list: "|Make someone want to take care of you.|Make an aggressive person want to not harm you.|Make someone confide in you."
			},
			partial: {
				text: "Choose one option.",
				list: "|Make someone want to take care of you.|Make an aggressive person want to not harm you.|Make someone confide in you."
			},
			fail: {
				text: "Someone tries to take advantage of you and your position. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Prepared",
		itemType: "advantage",
		type: "active",
		moveName: "Investigate Location",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/prepared.svg",
		effect: {
			intro: "",
			trigger: "Whenever you investigate a location prior to visiting it,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose three options.",
				list: "|Find or create a map of the location.|Uncover any security systems and other obstacles.|Pinpoint the location of something you're after."
			},
			partial: {
				text: "Choose two options.",
				list: "|Find or create a map of the location.|Uncover any security systems and other obstacles.|Pinpoint the location of something you're after."
			},
			fail: {
				text: "Choose one option, but you have missed or overlooked something crucial: The GM takes 1 Hold.",
				list: "|Find or create a map of the location.|Uncover any security systems and other obstacles.|Pinpoint the location of something you're after."
			}
		},
		suffix: {
			text: "The GM can spend Hold at any time to make a hard or soft Move for the location.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Puppeteer",
		itemType: "advantage",
		type: "active",
		moveName: "Play Your Pawns",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/puppeteer.svg",
		effect: {
			intro: "",
			trigger: "Whenever you execute a plan using other people as pawns,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Everyone involved takes +1 ongoing to carry out the plan, and you get one Experience if the plan is successful.",
				list: ""
			},
			partial: {
				text: "You get one Experience if the plan is successful, but you have overlooked or miscalculated something.",
				list: ""
			},
			fail: {
				text: "Your plan is inadequate, revealed, and/or misguided. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Quick Thinker",
		itemType: "advantage",
		type: "active",
		moveName: "Prepare for Danger",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/quick-thinker.svg",
		effect: {
			intro: "",
			trigger: "Whenever you commence a dangerous mission,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Remember something that's advantageous in a negotiation. Ask the GM what it is.|You possess some equipment you can use to get out of a sticky situation. Ask the GM what it is.|You have special field training that would be useful in getting past one of your obstacles. Ask the GM what it is.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose up to three options, at any time during the mission.",
				list: "|Remember something that's advantageous in a negotiation. Ask the GM what it is.|You possess some equipment you can use to get out of a sticky situation. Ask the GM what it is.|You have special field training that would be useful in getting past one of your obstacles. Ask the GM what it is."
			},
			partial: {
				text: "Choose up to two options, at any time during the mission.",
				list: "|Remember something that's advantageous in a negotiation. Ask the GM what it is.|You possess some equipment you can use to get out of a sticky situation. Ask the GM what it is.|You have special field training that would be useful in getting past one of your obstacles. Ask the GM what it is."
			},
			fail: {
				text: "At any time during the mission, choose one option, but you've failed to account for something. The GM makes a Move.",
				list: "|Remember something that's advantageous in a negotiation. Ask the GM what it is.|You possess some equipment you can use to get out of a sticky situation. Ask the GM what it is.|You have special field training that would be useful in getting past one of your obstacles. Ask the GM what it is."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Rage",
		itemType: "advantage",
		type: "passive",
		moveName: "Awaken Inner Rage",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/rage.svg",
		effect: {
			intro: "",
			trigger: "When you choose to awaken your inner rage in combat,",
			effect: "lose Stability (−1) and mark 1 Rage.$n$Every time you get a wound and every time you defeat a foe, increase Rage (+1).$n$Rage lasts until the end of the combat.$n$During combat, you may spend 1 Rage to choose 1 Edge: $EDGES$"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|Brutal Assault - Take +1 Harm to your attack.|What Pain? - Take +2 to Endure Injury.|See Only Red - Shake off and ignore psychological or supernatural influence.",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Read a Crowd",
		itemType: "advantage",
		type: "active",
		moveName: "Mingle",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "perception",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/read-a-crowd.svg",
		effect: {
			intro: "",
			trigger: "Whenever you move through a small crowd to gather information,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]).$n$Examples of a 'small crowd' include a party, bar/restaurant, or an office. You decide what specific information you are looking for, as long as it makes sense for the crowd to possess such information"
		},
		lists: {
			questions: "|Who here has information I want?|Where can I find what I am looking for?|Who is watching me?|Is there anything else of interest?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Ask three questions.",
				list: "|Who here has information I want?|Where can I find what I am looking for?|Who is watching me?|Is there anything else of interest?"
			},
			partial: {
				text: "Ask two questions, but you also draw unwanted attention to yourself.",
				list: "|Who here has information I want?|Where can I find what I am looking for?|Who is watching me?|Is there anything else of interest?"
			},
			fail: {
				text: "Ask one question, but you've blown your cover. Those who have what you're looking for will be expecting you. The GM makes a Move.",
				list: "|Who here has information I want?|Where can I find what I am looking for?|Who is watching me?|Is there anything else of interest?"
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Ruthless",
		itemType: "advantage",
		type: "active",
		moveName: "Sacrifice Other",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/ruthless.svg",
		effect: {
			intro: "",
			trigger: "Whenever you sacrifice another to save your own skin,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|Meat Shield - Force them to take all the Harm from one attack for you.|Nothing But Bait - Expose someone to danger so you can flank an enemy (deal +1 Harm).|Leave Them Behind - Abandon them to the enemy while you slip away.",
			attacks: ""
		},
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Meat Shield - Force them to take all the Harm from one attack for you.|Nothing But Bait - Expose someone to danger so you can flank an enemy (deal +1 Harm).|Leave Them Behind - Abandon them to the enemy while you slip away."
			},
			partial: {
				text: "Get 2 Edges.",
				list: "|Meat Shield - Force them to take all the Harm from one attack for you.|Nothing But Bait - Expose someone to danger so you can flank an enemy (deal +1 Harm).|Leave Them Behind - Abandon them to the enemy while you slip away."
			},
			fail: {
				text: "Things turns out in a bad way for you instead. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Scientist",
		itemType: "advantage",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/scientist.svg",
		effect: {
			intro: "",
			trigger: "Whenever you Investigate an object or entity using the proper equipment,",
			effect: "you may choose from these following questions, in addition to those acquired through investigation: $QUESTIONS$"
		},
		lists: {
			questions: "|What properties does this have? (take +1 to any rolls against entities or objects of a similar type next time you encounter it).|How do I make use of this? (take +1 to any rolls associated with using the object).|What is its purpose?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Sealed Fate",
		itemType: "advantage",
		type: "passive",
		moveName: "Invoke Fate",
		notes: "Requires the Disadvantage Condemned",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/sealed-fate.svg",
		effect: {
			intro: "",
			trigger: "Whenever you are dealt a Critical Wound,",
			effect: "you may mark 1 Time from Condemned to immediately stabilize the Wound"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Seducer",
		itemType: "advantage",
		type: "active",
		moveName: "Seduce",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/seducer.svg",
		effect: {
			intro: "You can consciously make people fall in love with you.",
			trigger: "Whenever you have an intimate moment with someone,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Give you something you want.|Reveal a secret.|Fight to protect you. NPCs who fall in love with you cannot oppose you, as long as you haven't expended all your options. Against PCs, you may only choose the following options:|Make them feel bad for opposing you (they must Keep it Together)|They feel happy in your presence, and gain Stability (+2).",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose up to three options, useable any time in the story.",
				list: "|Give you something you want.|Reveal a secret.|Fight to protect you. NPCs who fall in love with you cannot oppose you, as long as you haven't expended all your options. Against PCs, you may only choose the following options:|Make them feel bad for opposing you (they must Keep it Together)|They feel happy in your presence, and gain Stability (+2)."
			},
			partial: {
				text: "Choose up to two options, useable any time in the story.",
				list: "|Give you something you want.|Reveal a secret.|Fight to protect you. NPCs who fall in love with you cannot oppose you, as long as you haven't expended all your options. Against PCs, you may only choose the following options:|Make them feel bad for opposing you (they must Keep it Together)|They feel happy in your presence, and gain Stability (+2)."
			},
			fail: {
				text: "Choose one option, useable any time in the story, but you also develop feelings for the person. Increase your Relation to them by +1.",
				list: "|Give you something you want.|Reveal a secret.|Fight to protect you. NPCs who fall in love with you cannot oppose you, as long as you haven't expended all your options. Against PCs, you may only choose the following options:|Make them feel bad for opposing you (they must Keep it Together)|They feel happy in your presence, and gain Stability (+2)."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Shadow",
		itemType: "advantage",
		type: "active",
		moveName: "Follow",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "perception",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/shadow.svg",
		effect: {
			intro: "",
			trigger: "When shadowing someone,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You avoid discovery, follow your target all the way to their final destination, and learn something about them you can use to your advantage later.",
				list: ""
			},
			partial: {
				text: "You avoid discovery and follow your target to their final destination.",
				list: ""
			},
			fail: {
				text: "You are spotted or encounter some sort of problem along the way. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Sixth Sense",
		itemType: "advantage",
		type: "active",
		moveName: "Check: Sixth Sense",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/sixth-sense.svg",
		effect: {
			intro: "You have an intuition for things, both good and bad.",
			trigger: "At the start of each game session,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Act first in a threatening situation. This can include even acting prior to a surprise attack.|Sense whether someone wishes good or ill towards you.|Discover or sense a clue or lead when you're off track.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose up to three options, useable any time during the session.",
				list: "|Act first in a threatening situation. This can include even acting prior to a surprise attack.|Sense whether someone wishes good or ill towards you.|Discover or sense a clue or lead when you're off track."
			},
			partial: {
				text: "Choose up to two options, useable any time during the session.",
				list: "|Act first in a threatening situation. This can include even acting prior to a surprise attack.|Sense whether someone wishes good or ill towards you.|Discover or sense a clue or lead when you're off track."
			},
			fail: {
				text: "Your instincts will fail to trigger in a dangerous situation. The GM makes a Move at some point during the session.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Snake Charmer",
		itemType: "advantage",
		type: "active",
		moveName: "Charm",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/snake-charmer.svg",
		effect: {
			intro: "",
			trigger: "Whenever you perform your chosen art form for an intelligent, monstrous creature,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]) to awaken a desire within them"
		},
		lists: {
			questions: "",
			options: "|Ask the creature for help with a problem.|Ask the creature for something you desire.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose one option immediately, and you may choose up to two more any time in the future.",
				list: "|Ask the creature for help with a problem.|Ask the creature for something you desire."
			},
			partial: {
				text: "Choose one option.",
				list: "|Ask the creature for help with a problem.|Ask the creature for something you desire."
			},
			fail: {
				text: "The desire is beyond the creature's ability to regulate. It cannot help but attempt to devour or imprison you.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Sneak",
		itemType: "advantage",
		type: "active",
		moveName: "Hide & Sneak",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "coolness",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/sneak.svg",
		effect: {
			intro: "",
			trigger: "Whenever you keep hidden and try to avoid drawing attention to yourself,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Find a secure hiding spot for a while.|Find an alternate route to avoid encountering people.|Bypass a security system or other obstacle without being noticed.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Get 2 options. You may spend them any time during the scene.",
				list: "|Find a secure hiding spot for a while.|Find an alternate route to avoid encountering people.|Bypass a security system or other obstacle without being noticed."
			},
			partial: {
				text: "Get 1 option. You may spend them any time during the scene.",
				list: "|Find a secure hiding spot for a while.|Find an alternate route to avoid encountering people.|Bypass a security system or other obstacle without being noticed."
			},
			fail: {
				text: "Get 1 option, but you manage to attract someone's attention. The GM makes a Move.",
				list: "|Find a secure hiding spot for a while.|Find an alternate route to avoid encountering people.|Bypass a security system or other obstacle without being noticed."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Sniper",
		itemType: "advantage",
		type: "active",
		moveName: "Scoped Shot",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/sniper.svg",
		effect: {
			intro: "",
			trigger: "Whenever you fire at a distant target utilizing a scoped rifle,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Deal +1 Harm.|Hit another target as well.|Immobilize your target.|Get the target to lose control of something.|You don't reveal your position. 118",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "The shot finds its target. Choose two options.",
				list: "|Deal +1 Harm.|Hit another target as well.|Immobilize your target.|Get the target to lose control of something.|You don't reveal your position. 118"
			},
			partial: {
				text: "The shot finds its target. Choose one option.",
				list: "|Deal +1 Harm.|Hit another target as well.|Immobilize your target.|Get the target to lose control of something.|You don't reveal your position. 118"
			},
			fail: {
				text: "The shot didn't go where you intended it to, or you reveal your position to the enemy—expect witnesses, opponents pursuing you as you leave the scene, or other problems. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Street Contacts",
		itemType: "advantage",
		type: "active",
		moveName: "Canvas Street Contacts",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/street-contacts.svg",
		effect: {
			intro: "You have contacts among the homeless, crazies, and other societal outsiders and outcasts.",
			trigger: "Whenever you need to know something and check in with your contacts,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "|What do you know about the [building / person / organization / event]?|What rumors are circulating on the street at the moment?|How can I get into [location]?|Who in this city would know more about this supernatural thing?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Ask up to three questions.",
				list: "|What do you know about the [building / person / organization / event]?|What rumors are circulating on the street at the moment?|How can I get into [location]?|Who in this city would know more about this supernatural thing?"
			},
			partial: {
				text: "Ask one question.",
				list: "|What do you know about the [building / person / organization / event]?|What rumors are circulating on the street at the moment?|How can I get into [location]?|Who in this city would know more about this supernatural thing?"
			},
			fail: {
				text: "Ask one question, but someone becomes suspicious or aggressive. The GM makes a Move.",
				list: "|What do you know about the [building / person / organization / event]?|What rumors are circulating on the street at the moment?|How can I get into [location]?|Who in this city would know more about this supernatural thing?"
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Streetfighter",
		itemType: "advantage",
		type: "active",
		moveName: "Engage in Melee",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/streetfighter.svg",
		effect: {
			intro: "",
			trigger: "Whenever you fight in close combat,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|Dodge - Avoid an attack.|Flurry of Blows - Take +2 on your roll to attack an opponent.|Dirty Strike - Momentarily stun an opponent by striking them where it hurts.",
			attacks: ""
		},
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Dodge - Avoid an attack.|Flurry of Blows - Take +2 on your roll to attack an opponent.|Dirty Strike - Momentarily stun an opponent by striking them where it hurts."
			},
			partial: {
				text: "Get 2 Edges, but the GM also gets to pick one complication:",
				list: "|You risk losing control during the fight (Keep it Together to prevent it).|You earn an enemy, who will try to get back at you later."
			},
			fail: {
				text: "You're unfocused and lose control. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Streetwise",
		itemType: "advantage",
		type: "active",
		moveName: "Shop the Black Market",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/streetwise.svg",
		effect: {
			intro: "",
			trigger: "Whenever you want to acquire items or services from the criminal underworld,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "No problem—you get what you're after. Someone will fix you right up.",
				list: ""
			},
			partial: {
				text: "The GM chooses one option:",
				list: "|It will cost you something extra, such as in-kind services, tasks, or an inflated price.|You can get it handled, but only by dealing with someone you're already indebted to.|“Shit, I had one, but I just let it go to [insert name]—maybe you can buy it from her?”|“Sorry, that's a bit outside of my area, but maybe this will work instead?”"
			},
			fail: {
				text: "You think you find what you're looking for, but there will be costly stipulations, considerable flaws, or major complications. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Stubborn",
		itemType: "advantage",
		type: "active",
		moveName: "Push Through",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/stubborn.svg",
		effect: {
			intro: "",
			trigger: "Whenever you push yourself to the limit to overcome a threat,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "|Refuse to give up: Postpone the effects of a critical injury until you have made it out of the threat's reach.|Will over skill: Roll +Willpower instead of the normal attribute whenever you avoid or fight whatever is threatening you.|Steel yourself: Break free from a supernatural effect.",
			attacks: ""
		},
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Refuse to give up: Postpone the effects of a critical injury until you have made it out of the threat's reach.|Will over skill: Roll +Willpower instead of the normal attribute whenever you avoid or fight whatever is threatening you.|Steel yourself: Break free from a supernatural effect."
			},
			partial: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Refuse to give up: Postpone the effects of a critical injury until you have made it out of the threat's reach.|Will over skill: Roll +Willpower instead of the normal attribute whenever you avoid or fight whatever is threatening you.|Steel yourself: Break free from a supernatural effect."
			},
			fail: {
				text: "Get 1 Edge, but you push yourself past your breaking point. Decrease Stability (−2).",
				list: "|Refuse to give up: Postpone the effects of a critical injury until you have made it out of the threat's reach.|Will over skill: Roll +Willpower instead of the normal attribute whenever you avoid or fight whatever is threatening you.|Steel yourself: Break free from a supernatural effect."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: true,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Survival Instinct",
		itemType: "advantage",
		type: "active",
		moveName: "Refuse to Yield",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/survival-instinct.svg",
		effect: {
			intro: "",
			trigger: "Whenever you suffer a serious or critical injury yet refuse to yield,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]).$n$On a success, you may temporarily ignore the effects of the injuries, but you will need treatment to stabilize them as soon as the time limit expires"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You ignore your injuries until the conflict is over, as well as choose one:",
				list: "|Viciousness: +1 ongoing to Engage in Combat rolls for the remainder of the fight.|Adrenaline rush: +1 ongoing to Endure Injury rolls for the remainder of the fight."
			},
			partial: {
				text: "You ignore your injuries until the conflict is over.",
				list: ""
			},
			fail: {
				text: "You overexert yourself and after a few moments your injuries cause you to pass out and collapse. After your next action, the GM decides when and how you pass out.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Survivalist",
		itemType: "advantage",
		type: "active",
		moveName: "Survivalist Skills",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "perception",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/survivalist.svg",
		effect: {
			intro: "",
			trigger: "Whenever you utilize your survivalist skills,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Find water and something edible.|Make it past an environmental obstacle.|Find a safe spot to hide and rest.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose up to three options, useable while you remain in this situation.",
				list: "|Find water and something edible.|Make it past an environmental obstacle.|Find a safe spot to hide and rest."
			},
			partial: {
				text: "Choose up to two options, useable while you remain in this situation.",
				list: "|Find water and something edible.|Make it past an environmental obstacle.|Find a safe spot to hide and rest."
			},
			fail: {
				text: "Choose one option useable while you remain in this situation, but you've also overlooked something important. The GM makes a Move.",
				list: "|Find water and something edible.|Make it past an environmental obstacle.|Find a safe spot to hide and rest."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Thirst for Knowledge",
		itemType: "advantage",
		type: "passive",
		moveName: "Drink Deep",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/thirst-for-knowledge.svg",
		effect: {
			intro: "",
			trigger: "Whenever you learn new information about alternate planes of existence, a supernatural entity, or a Higher Power,",
			effect: "gain Stability (+1)"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "To the Last Breath",
		itemType: "advantage",
		type: "passive",
		moveName: "Refuse to Give In",
		notes: "Requires the Disadvantage Condemned",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/to-the-last-breath.svg",
		effect: {
			intro: "",
			trigger: "When you refuse to give in even if the odds turn against you,",
			effect: "mark 1 Time to reroll the dice"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Tracer",
		itemType: "advantage",
		type: "active",
		moveName: "Execute Trace",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/tracer.svg",
		effect: {
			intro: "",
			trigger: "Whenever you utilize your intelligence networks to trace someone or something,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "|Where in the world was this seen last?|What people have associated themselves with what I'm looking for lately?|What tracks and marks has it left behind?|Who else is trying to find what I'm looking for? 112",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Ask up to three of the questions below.",
				list: "|Where in the world was this seen last?|What people have associated themselves with what I'm looking for lately?|What tracks and marks has it left behind?|Who else is trying to find what I'm looking for? 112"
			},
			partial: {
				text: "Ask up to two of the questions below.",
				list: "|Where in the world was this seen last?|What people have associated themselves with what I'm looking for lately?|What tracks and marks has it left behind?|Who else is trying to find what I'm looking for? 112"
			},
			fail: {
				text: "Ask one of the questions, but someone notices you snooping around. It might be someone you'd rather not be known by, or a traitor inside your network.",
				list: "|Where in the world was this seen last?|What people have associated themselves with what I'm looking for lately?|What tracks and marks has it left behind?|Who else is trying to find what I'm looking for? 112"
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Vigilant",
		itemType: "advantage",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/vigilant.svg",
		effect: {
			intro: "",
			trigger: "Whenever you Read a Person,",
			effect: "you may choose from these questions in addition to the usual ones: $QUESTIONS$"
		},
		lists: {
			questions: "|Are you hiding anything from me?|How do you really feel about me?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Voice of Insanity",
		itemType: "advantage",
		type: "active",
		moveName: "Mass Manipulation",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/voice-of-insanity.svg",
		effect: {
			intro: "",
			trigger: "Whenever you manipulate a crowd,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Attract other people to join in the crowd.|Have crowd members give you all their valuables.|Unite the crowd to fight for you.|Incite the crowd into an orgy of unbridled emotion: sexual lust, anger, sorrow, violence, generosity, or celebrating, depending on what concepts you are instilling into them.|Have the crowd disperse and calmly return to their normal lives.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Choose up to three options, useable any time during this scene.",
				list: "|Attract other people to join in the crowd.|Have crowd members give you all their valuables.|Unite the crowd to fight for you.|Incite the crowd into an orgy of unbridled emotion: sexual lust, anger, sorrow, violence, generosity, or celebrating, depending on what concepts you are instilling into them.|Have the crowd disperse and calmly return to their normal lives."
			},
			partial: {
				text: "Choose up to two options, useable any time during this scene.",
				list: "|Attract other people to join in the crowd.|Have crowd members give you all their valuables.|Unite the crowd to fight for you.|Incite the crowd into an orgy of unbridled emotion: sexual lust, anger, sorrow, violence, generosity, or celebrating, depending on what concepts you are instilling into them.|Have the crowd disperse and calmly return to their normal lives."
			},
			fail: {
				text: "Choose one option, useable any time during this scene. However, the crowd becomes uncontrollable and volatile, and cannot be dispersed. The GM makes a Move.",
				list: "|Attract other people to join in the crowd.|Have crowd members give you all their valuables.|Unite the crowd to fight for you.|Incite the crowd into an orgy of unbridled emotion: sexual lust, anger, sorrow, violence, generosity, or celebrating, depending on what concepts you are instilling into them.|Have the crowd disperse and calmly return to their normal lives."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Voice of Pain",
		itemType: "advantage",
		type: "active",
		moveName: "Gain Insight from Pain",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/voice-of-pain.svg",
		effect: {
			intro: "",
			trigger: "When an opponent seriously or critically wounds you for the first time,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|You realize how to get through your opponent's defenses (take +1 to Engage in Combat with them).|You find your opponent's weak spot (deal +1 Harm whenever you Engage in Combat with them).|You perceive your opponent's pattern of attack (take +1 to Avoid Harm whenever they attack you). These effects are permanent against this opponent.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You get two options.",
				list: "|You realize how to get through your opponent's defenses (take +1 to Engage in Combat with them).|You find your opponent's weak spot (deal +1 Harm whenever you Engage in Combat with them).|You perceive your opponent's pattern of attack (take +1 to Avoid Harm whenever they attack you). These effects are permanent against this opponent."
			},
			partial: {
				text: "Choose one option.",
				list: "|You realize how to get through your opponent's defenses (take +1 to Engage in Combat with them).|You find your opponent's weak spot (deal +1 Harm whenever you Engage in Combat with them).|You perceive your opponent's pattern of attack (take +1 to Avoid Harm whenever they attack you). These effects are permanent against this opponent."
			},
			fail: {
				text: "Choose one option, but the pain will overwhelm you eventually and make you black out.",
				list: "|You realize how to get through your opponent's defenses (take +1 to Engage in Combat with them).|You find your opponent's weak spot (deal +1 Harm whenever you Engage in Combat with them).|You perceive your opponent's pattern of attack (take +1 to Avoid Harm whenever they attack you). These effects are permanent against this opponent."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Wanderer",
		itemType: "advantage",
		type: "active",
		moveName: "Wander",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "perception",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/wanderer.svg",
		effect: {
			intro: "",
			trigger: "Whenever you are heading out to a community or another part of the city,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Ask the GM one question about this place.|You have a contact at this place who could help you, with a bit of convincing.|You have a hideout here, where you can put your head down and get some rest.|You know something about this place. Tell the others what.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You have been here before. Choose two options any time during your visit.",
				list: "|Ask the GM one question about this place.|You have a contact at this place who could help you, with a bit of convincing.|You have a hideout here, where you can put your head down and get some rest.|You know something about this place. Tell the others what."
			},
			partial: {
				text: "You have heard of this place. Choose one option any time during your visit.",
				list: "|Ask the GM one question about this place.|You have a contact at this place who could help you, with a bit of convincing.|You have a hideout here, where you can put your head down and get some rest.|You know something about this place. Tell the others what."
			},
			fail: {
				text: "You have been here before, but something bad happened. Choose one option any time during your visit. The GM explains what kind of problem awaits you here. The GM makes a Move.",
				list: "|Ask the GM one question about this place.|You have a contact at this place who could help you, with a bit of convincing.|You have a hideout here, where you can put your head down and get some rest.|You know something about this place. Tell the others what."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Watchers",
		itemType: "advantage",
		type: "passive",
		moveName: "Invoke Watchers",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/watchers.svg",
		effect: {
			intro: "You are being watched over and protected by a group of mysterious people who intend on keeping you alive for their own obscure purposes.",
			trigger: "Whenever you are in mortal danger and choose to activate your Watchers,",
			effect: "the GM takes 1 Hold and introduces your Watchers to the scene. Their sole motivation is to keep you out of harm's reach, and the GM can spend Hold on the Watchers' behalf to let them make a Move against you"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "The GM chooses the number of Watchers who come to your aid based on the power of the threat to your safety:",
			list: "|Small Gang: 2 Harm, 5 Wounds|Medium Gang: 3 Harm, 10 Wounds|Large Gang: 3 Harm, 15 Wounds"
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Wayfinder",
		itemType: "advantage",
		type: "active",
		moveName: "Mad Guidance",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/wayfinder.svg",
		effect: {
			intro: "",
			trigger: "Whenever you travel between two places in the city and allow your madness to guide you through the alleys,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You discover a shortcut through the alleys, which takes you to your destination within a few minutes, regardless of how far the distance actually is.",
				list: ""
			},
			partial: {
				text: "You discover a shortcut, but there is also some sort of obstacle you will need to get past.",
				list: ""
			},
			fail: {
				text: "You discover a shortcut, but it leads you into a dangerous situation, such as the lair of some creature or an ambush set by some gang. The GM makes a Move. 116",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Weapon Master (Firearms)",
		itemType: "advantage",
		type: "passive",
		moveName: "Shoot",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/weapon-master-(firearms).svg",
		effect: {
			intro: "You are a master of gunplay.",
			trigger: "When you Engage in Combat with a firearm,",
			effect: "use +Coolness instead of Violence, and add the following to your available attacks: $ATTACKS$"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Two In the Chest, One in the Head:room:4:-2ammo:}{Disarming Shot:room:1:-1ammo:a targeted PC must Act Under Pressure.}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Weapon Master (Melee)",
		itemType: "advantage",
		type: "passive",
		moveName: "Strike",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/weapon-master-(melee).svg",
		effect: {
			intro: "You are a master of armed melee combat.",
			trigger: "When you Engage in Combat in close quarters, with or without a weapon",
			effect: "use +Coolness instead of Violence, and add the following to your available attacks: $ATTACKS$"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Launching Attack:room:2:-:}{Precision Attack:arm:2:-:Ignores Armor}{Tripping Attack:arm:2:-:The target falls prone.}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Workaholic",
		itemType: "advantage",
		type: "passive",
		moveName: "Lose Yourself in Work",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/workaholic.svg",
		effect: {
			intro: "",
			trigger: "Whenever you create something or carry out an experiment,",
			effect: "gain Stability (+1)"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Worldly",
		itemType: "advantage",
		type: "passive",
		moveName: "Assert Familiarity",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/worldly.svg",
		effect: {
			intro: "",
			trigger: "Whenever you arrive at a new location in the mundane world,",
			effect: "decide whether you have been here before, and if so, name some detail about the place significant to you. Also, decide if you met someone there and what you left behind. The GM will say what has changed since then"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Bad Reputation",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Bad Reputation",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/bad-reputation.svg",
		effect: {
			intro: "For some reason, you have attracted the public's disapproval—even animosity. Perhaps you've been spotlighted in the tabloids as a pedophile or murderer, falsely or otherwise.",
			trigger: "In the first game session and whenever you attract the public's attention,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You blend in. Nobody is out to get you.",
				list: ""
			},
			partial: {
				text: "You have been recognized. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "Several people have recognized you. Anger and fear control their actions. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move representing how your bad reputation sticks to you. For example, people might react with fear and suspicion towards you, a lynch mob forms to bring you to justice, your property is vandalized, your allies turn against you, and you can lose your job, agreements, and relationships.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Broken",
		itemType: "disadvantage",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/broken.svg",
		effect: {
			intro: "Some experience in your past has broken your psyche so badly you've been unable to recuperate from it.",
			trigger: "",
			effect: "•Broken Some experience in your past has broken your psyche so badly you've been unable to recuperate from it.<>Your Stability can never increase beyond Distressed [6]"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Competitor",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Competitor",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/competitor.svg",
		effect: {
			intro: "You have a competitor in the criminal underworld, whose business niche is similar to yours.",
			trigger: "Whenever you neglect to protect your interests or are distracted elsewhere,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]) to see if your competitor managed to damage your business"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You are safe from your competitor, for the moment.",
				list: ""
			},
			partial: {
				text: "You have been careless. Your competitor may strike against you. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "You hand your competitor a golden opportunity, and they move against your interests. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for your competitor. For example, your competitor may take control of some of your business dealings, learn one of your secrets, sabotages one of your assets, or harms or buys off someone you care for and trust.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Condemned",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Condemned",
		notes: "",
		clock: 10,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/condemned.svg",
		effect: {
			intro: "Your fate has already been sealed. Perhaps you're dying from a disease, been promised as the sacrificial offering to a forgotten god, or you've sold your soul to some entity, waiting to drag you off to hell when your time is up. When you finally run out of Time, you meet your ultimate fate.",
			trigger: "At the start of every game session,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You still have some time remaining.",
				list: ""
			},
			partial: {
				text: "Your fate approaches. The GM chooses one of the following options:",
				list: "|You mark 1 Time.|You're tortured by dreams or visions of your fate. Reduce Stability (−2).|You're haunted by the entity or event that sealed your fate.|Someone in your vicinity is negatively affected by your fate.|Something provides you with false hope of escaping your fate."
			},
			fail: {
				text: "Your end approaches. The GM chooses two options, and may choose the same option twice:",
				list: "|You mark 1 Time.|You're tortured by dreams or visions of your fate. Reduce Stability (−2).|You're haunted by the entity or event that sealed your fate.|Someone in your vicinity is negatively affected by your fate.|Something provides you with false hope of escaping your fate."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Cursed",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Cursed",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/cursed.svg",
		effect: {
			intro: "You are cursed.",
			trigger: "In the first session and whenever you're confronted by the supernatural,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]) to see how strongly the curse influences you"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You temporarily avoid the curse's influence.",
				list: ""
			},
			partial: {
				text: "The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move for the curse. For example, you or someone you care about have an accident, something of yours is taken from you, you experience terrifying visions, or you're forced to take certain actions with risk of dire consequences, if you refuse.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Depression",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Depression",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/depression.svg",
		effect: {
			intro: "You are constantly struggling with depression, which is only worsened by dejection and discouragement.",
			trigger: "Whenever facing personal setbacks,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You remain in control.",
				list: ""
			},
			partial: {
				text: "You experience temporary anxiety, decreased self-confidence, or lack of will. You take −1 to your next roll.",
				list: ""
			},
			fail: {
				text: "You succumb to the sense of hopelessness or blame and punish yourself; reduce Stability (−2). Your lethargy and self-destructive urges do not go away until you numb your depression with medicine, drugs, or alcohol.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Drug Addict",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Drug Addict",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/drug-addict.svg",
		effect: {
			intro: "You are addicted to hard drugs; name at least one when you gain this Disadvantage.",
			trigger: "In the first game session and whenever you have been using, or have the opportunity to use,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You are in control of the urge, for now.",
				list: ""
			},
			partial: {
				text: "The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move for your addiction. For example, you cannot resist using the drug, run out of drugs, become indebted to a dangerous person, put yourself in danger while under the influence of drugs, or ruin something important to you—like a relationship—while under the influence.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Experiment Gone Wrong",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Experiment Gone Wrong",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/experiment-gone-wrong.svg",
		effect: {
			intro: "You have carried out a scientific experiment, which went horribly awry. The experiment gave rise to something unnatural, which escaped and disappeared without a trace. Recently, the 'results' of your experiment tracked you down, reappearing in your life, and forcing you to either escape or confront it.",
			trigger: "In the first session and whenever things seem in control,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Your experiment leaves you alone.",
				list: ""
			},
			partial: {
				text: "Your experiment is close on your heels. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "Your experiment is in your vicinity and acts against you. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves on the experiment's behalf. For example, the experiment gives you a lead on the Truth, sabotages or otherwise disrupts your research, demands something from you under threat of retribution, or kidnaps someone you care for—possibly returning them dead or transformed.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Fanatic",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Fanatic",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/fanatic.svg",
		effect: {
			intro: "You are a fervent adherent of an ideology, which you must define when you take this Disadvantage. You interpret the whole world in accordance with your ideology, which must not be questioned.",
			trigger: "Whenever someone questions your ideology,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You can keep your emotions in check.",
				list: ""
			},
			partial: {
				text: "You become angry, confused, or frustrated. You take −1 to your next roll.",
				list: ""
			},
			fail: {
				text: "You are forced to choose between taking steps to changing the person or situation to adhere to your ideology, or reduce Stability (−2).",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Greedy",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Greedy",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/greedy.svg",
		effect: {
			intro: "You are driven by an unquenchable desire for money and wealth, and are prepared to sacrifice your health, family, and friends to fill the emptiness inside.",
			trigger: "When an opportunity to increase your wealth arises,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]) to see if you are in control of your desire"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You keep your greed in check.",
				list: ""
			},
			partial: {
				text: "The black void inside shrieks for more. As long as the opportunity exists and you do not take it, you suffer −1 ongoing to any rolls you make.",
				list: ""
			},
			fail: {
				text: "You must take advantage of every opportunity to further your wealth, or reduce Stability (−2).",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Guilt",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Guilt",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/guilt.svg",
		effect: {
			intro: "You carry heavy guilt for your past sins, having harmed one or several people through your actions or inaction.",
			trigger: "In the first game session and whenever everything appears okay,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Your guilt isn't on your mind at the moment.",
				list: ""
			},
			partial: {
				text: "You are reminded of your guilt. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "Your guilt catches up to you. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for your guilt. For example, relatives of the people you've hurt seek you out, demons and other creatures are attracted by your guilt, the dead haunt you with nightmares or visions, or you fall victim to anxiety and self-doubt.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Harassed",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Harassed",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/harassed.svg",
		effect: {
			intro: "For some reason, personal or otherwise, people tend to harass you; the authorities in particular.",
			trigger: "In the first game session and whenever you draw attention to yourself,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]) to see if you're harassed"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You've managed to keep clear of harassment.",
				list: ""
			},
			partial: {
				text: "The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for the harassers. For example, someone destroys your property or possessions, you are bullied and attacked by people with a prejudice against you, the authorities forcefully take something from you (rights, property, assets), someone you care about is harmed for associating with you, or you are denied your basic rights due to your identity.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Haunted",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Haunted",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/haunted.svg",
		effect: {
			intro: "You are haunted by supernatural forces. With the GM's assistance, determine the nature of what you believe is haunting you.",
			trigger: "In the first session and whenever you are distracted or weakened,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]) to see if the entity gains power over you"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "The entity leaves you alone.",
				list: ""
			},
			partial: {
				text: "The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move for the entity. For example, it requests a service from you and threatens retribution if you refuse, the entity possesses your body for the night, or the entity reveals a clue of what it is and what it wants from you.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Infirm",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Infirm",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/infirm.svg",
		effect: {
			intro: "You suffer from a dangerous physical disease or condition, such as heart disease, hypertension, morbid obesity, or serious gastric ulcer.",
			trigger: "Whenever you are subjected to major physical or psychological stress,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Your condition is under control.",
				list: ""
			},
			partial: {
				text: "Your condition triggers, causing pain and daze (−1 to all rolls until the scene ends).",
				list: ""
			},
			fail: {
				text: "Your condition is aggravated with life threatening results (Endure Injury with 2 Harm).",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Involuntary Medium",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Involuntary Medium",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/involuntary-medium.svg",
		effect: {
			intro: "You are an open vessel for any spirits or demonic entities who desire a medium to speak through or need a corporeal body to use for their purposes.",
			trigger: "Whenever you encounter spiritual entities or haunted places,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You resist the possession.",
				list: ""
			},
			partial: {
				text: "The entity gains influence over you. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "The entity gains control over you. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for the being possessing you. For example, the entity may give you a vision, make use of your body, communicate with or through you, try to harm someone else through you, follow you unseen, demand something from you, or drag you into another dimension.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Jealousy",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Jealousy",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/jealousy.svg",
		effect: {
			intro: "There is someone who has the life you want to have, and you would do anything to possess it.",
			trigger: "Whenever you encounter the subject of your jealousy or their life's trappings (possessions, family, friends, etc),",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]) to see if you can keep your cool"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You maintain control over your jealousy.",
				list: ""
			},
			partial: {
				text: "You're afflicted by jealousy and take −1 ongoing for as long as you remain in the subject's vicinity, and you do not suppress your jealous desires.",
				list: ""
			},
			fail: {
				text: "Your jealousy takes hold of you. You must Keep it Together to refrain from harming, destroying, or stealing from the subject of your jealousy.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Liar",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Liar",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/liar.svg",
		effect: {
			intro: "You're a compulsive liar, who invents stories at every opportunity, especially when it's beneficial for you.",
			trigger: "At the start of every session,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]) to see what trouble your lies have gotten you into this time"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You have kept your lies tangle-free.",
				list: ""
			},
			partial: {
				text: "You've told one too many lies. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "Your web of lies has come completely unraveled. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold whenever a PC encounters someone they know to ask, “What have you lied about to this person?” or to invent a troublesome lie the PC has told in the past.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Lost Identity",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Lost Identity",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/lost-identity.svg",
		effect: {
			intro: "Your true identity has been lost to a military or private-run secret agent program. You do not remember anything about your pre-employment life. Recently, memories of your true identity have started coming back to you.",
			trigger: "In the first game session and whenever you encounter something from your repressed past,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You repress your true identity, remaining in the present.",
				list: ""
			},
			partial: {
				text: "Your true identity is catching up to you. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "Your true identity resurfaces. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for your true identity. For example, you recognize unknown people or places, organizations or individuals from your past life get in touch with you, your old identity influences your thought patterns or actions, or you suffer traumatic flashbacks.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Marked",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Marked",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/marked.svg",
		effect: {
			intro: "You are marked by the darkness. The mark can take the shape of a full-body tattoo, a demonic body part such as a vestigial arm, an extra eye or mouth, machine parts integrated with your flesh, or similar manifestations.",
			trigger: "Whenever you consciously Harm someone,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You are still in control.",
				list: ""
			},
			partial: {
				text: "You feed the darkness. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "The darkness gains power over you. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for the darkness living inside of you. For example, the darkness feeds on your life energy to sustain itself, forces you to commit murder in order to replenish its life energy, takes charge of your body and leaves you with only memory fragments of what transpired, forces you to harm someone in your vicinity, or temporarily transforms your body into something inhuman. You may have to Keep it Together to resist the darkness' influence.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Mental Compulsion",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Mental Compulsion",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/mental-compulsion.svg",
		effect: {
			intro: "You are fixated on a particular idea or action, to the point of it strongly impacting your life. Choose a compulsion when you take this Disadvantage: $OPTIONS$",
			trigger: "In situations where you could be distracted by your compulsion,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "|Cleaning|Counting|Triple-checking|Showering|Memorizing|Pyromania|Kleptomania|Cursing|Confessing your sins|Eating|Hypochondria",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You control your compulsions and can focus on other things.",
				list: ""
			},
			partial: {
				text: "You become distracted and take −1 ongoing to all rolls until you have removed yourself from the situation or succumbed to your compulsion, taking any actions it demands of you.",
				list: ""
			},
			fail: {
				text: "You become completely obsessed with your compulsion. If you focus on anything else, reduce Stability (−2).",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Nemesis",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Nemesis",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/nemesis.svg",
		effect: {
			intro: "Through some terrible act you have made an enemy, who does everything in their power to take revenge. Decide who your nemesis is and what you have done to earn their vengeance.",
			trigger: "In the first game session and whenever you let your guard down,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]) to see if your nemesis moves against you"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You are safe from your nemesis for the moment.",
				list: ""
			},
			partial: {
				text: "You have been careless and your nemesis moves against you. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "You have compromised your position and your nemesis strikes against you in full force. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves on behalf of your nemesis. For example, your nemesis may strike when you're alone, use secrets they've uncovered to extort you, intimidate you, hire henchmen to capture you, or attack someone or something you hold dear.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Nightmares",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Nightmares",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/nightmares.svg",
		effect: {
			intro: "You suffer from recurring nightmares, probably connected to your Dark Secrets.",
			trigger: "During any scene when you sleep,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You sleep in peace.",
				list: ""
			},
			partial: {
				text: "The nightmares torment you. The GM may make a Move for your nightmares. For example, you are unable to sleep at all during the night (−1 ongoing until you sleep), something follows you back into reality, the nightmares provide you insight into the Truth, or you are forced to process some trauma (Keep it Together) when you wake up.",
				list: ""
			},
			fail: {
				text: "The nightmares take over completely. You are trapped in the dream until you find a way to wake up, and everything that happens there also directly affects your sleeping body.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Oath of Revenge",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Oath of Revenge",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/oath-of-revenge.svg",
		effect: {
			intro: "You have sworn to avenge an unforgivable injustice. Decide who is the subject of your vengeance and what they have done to you. It could be a single individual, people who share a certain trait, or members of an organization.",
			trigger: "Whenever the target of your vengeance (or someone/something associated with them) appears,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You remain in control of your vengeful nature and can act rationally.",
				list: ""
			},
			partial: {
				text: "You can't focus on anything, other than the target of your vengeance. Take −1 ongoing until the target's involvement in the scene ends.",
				list: ""
			},
			fail: {
				text: "You become obsessed and can act only to further your revenge. Doing anything else requires you roll Keep it Together. Your obsession cannot be assuaged while the target remains in the same scene with you.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Object of Desire",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Object of Desire",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/object-of-desire.svg",
		effect: {
			intro: "There is just something special about you. You ignite deep unhealthy desires in others, which they are unable to keep in check.",
			trigger: "At the first game session and whenever you meet one or more new people,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "The desire is not awakened at this moment.",
				list: ""
			},
			partial: {
				text: "Someone becomes desirous of you. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "A strong desire is awakened in one or several people. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to ignite a person's desires, influencing their behavior. For example, someone can be afflicted with an uncontrollable passion for you, attempt to force themselves on you, strongly proposition you, become intensely jealous of you, or harm themselves or someone else because of their desire of you.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Obsession",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Obsession",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/obsession.svg",
		effect: {
			intro: "You have discovered a conspiracy or supernatural phenomenon, and you can't stop yourself from getting to the bottom of it.",
			trigger: "At the first game session and whenever you encounter something associated with your obsession,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You overcome your obsession for the moment.",
				list: ""
			},
			partial: {
				text: "Your obsession influences your behavior. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "Your obsession takes over completely. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to let your obsession creep into your daily life. You may be forced to choose between either engaging in your obsession or losing Stability. You may forget about important tasks and chores, miss meetings, or neglect your interpersonal relationships to solely focus on your obsession. Your obsession may even influence your dreams, giving you visions and revelations. In turn, the object of your obsession may also take note of you and try to stop your investigations.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Owned",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Owned",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/owned.svg",
		effect: {
			intro: "You used to be a dangerous person's private property, willingly or not. Since your escape, your former owner has been looking for you. Decide who your former owner is when you take this Disadvantage.",
			trigger: "In the first game session and whenever you draw attention to yourself in public,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "For the moment, you are safe.",
				list: ""
			},
			partial: {
				text: "Your former owner picks up your scent. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "Your owner finds you. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for your former owner. For example, they appear unexpectedly to convince you to return, send henchmen after you, kidnap or harm someone you care about, directly threaten you, destroy something important to you, try to mutilate you so nobody else would want you, or kill you outright so nobody else can have you.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Phobia",
		itemType: "disadvantage",
		type: "passive",
		moveName: "Face Fears",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/phobia.svg",
		effect: {
			intro: "You harbor an overpowering fear of something. Choose the stimulus that frightens you when you take this Disadvantage.",
			trigger: "Whenever you're confronted by the object of your phobia,",
			effect: "you must Keep it Together"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Rationalist",
		itemType: "disadvantage",
		type: "passive",
		moveName: "Face the Illusion",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/rationalist.svg",
		effect: {
			intro: "You refuse to believe in anything not confirmed as fact by modern science, even when it is right in front of you.",
			trigger: "Whenever you See Through the Illusion and whenever the Illusion shatters,",
			effect: "in addition to the standard effects, the GM may choose one option: $OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Your presence nurtures the Illusion, making it more powerful and impenetrable.|Your bewildered psyche starts creating mirror images of familiar places and people in the Illusion.|You attract extradimensional entities.|You consciously deny what you see, even to your own detriment.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Repressed Memories",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Repressed Memories",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/repressed-memories.svg",
		effect: {
			intro: "You have repressed a particularly unpleasant event from your past, but the memory of it sometimes rises to the surface. It could be a crime or some horrible thing you have done, been subjected to, or witnessed. The GM decides the nature of your repressed memory, usually based on your Dark Secrets.",
			trigger: "In situations associated with your repressed memories,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]) to determine if the memories resurface"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You continue to suppress the memories.",
				list: ""
			},
			partial: {
				text: "The memories partly resurface, taking the form of flashbacks and/or hallucinations. You must Keep it Together.",
				list: ""
			},
			fail: {
				text: "You are overwhelmed by your repressed memories, completely losing yourself to them. The GM makes a hard Move and you reduce Stability (−2).",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Rival",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Rival",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/rival.svg",
		effect: {
			intro: "You have an ambitious rival, who will do anything to be in your shoes. Choose who your rival is when you take this Disadvantage.",
			trigger: "In the first game session and whenever you make a mistake or let down your guard,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "All clear; your rival makes no moves against you.",
				list: ""
			},
			partial: {
				text: "You've given your rival an opportunity. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "You've handed your rival whatever they needed to completely undermine you. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move on behalf of your rival. For example, the rival may get an important person on their side, sabotage one of your projects, extort you with evidence damaging to your reputation, or take desperate measures to get rid of you permanently.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Schizophrenia",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Schizophrenia",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/schizophrenia.svg",
		effect: {
			intro: "You struggle with recurring psychotic episodes and terrifying hallucinations.",
			trigger: "In the first game session and whenever you go through difficult experiences,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You maintain control of your insanity.",
				list: ""
			},
			partial: {
				text: "The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "Schizophrenia overtakes you. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move for your schizophrenia. For example, one of your hallucinations takes on physical form, you view your current surroundings as being hostile to you, you're afflicted by terrifying hallucinations, you're subjected to dark visions (true or false), or someone in your vicinity turns out to not actually be real.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Sexual Neurosis",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Sexual Neurosis",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/sexual-neurosis.svg",
		effect: {
			intro: "Your sexuality is a destructive, controlling force in your life. You compulsively seek out superficial sexual encounters and are willing to perform degrading acts—or even commit crimes—to satisfy your fantasies.",
			trigger: "Whenever you have the opportunity to have consensual sex or take advantage of someone vulnerable to your advances,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You can control your urges.",
				list: ""
			},
			partial: {
				text: "Choose between having sex with the person or reduce your Stability (−1).",
				list: ""
			},
			fail: {
				text: "You cannot resist having sex with the person and the GM chooses one option:",
				list: "|You hurt, or you are hurt by, your sexual partner (physically or psychologically).|The boundaries between dimensions are weakened; an entity from beyond catches the scent of you or your lover.|Your sexual partner becomes obsessed with you and starts stalking you."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Stalker",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Stalker",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/stalker.svg",
		effect: {
			intro: "You are hunted by a faceless enemy. Anyone you meet could be one of their minions—or even the stalker themselves. No one can be trusted. You must constantly change your address and be vigilant at all times to avoid leaving any tracks they can follow.",
			trigger: "In the first game session and whenever you expose your current location,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You are safe for now.",
				list: ""
			},
			partial: {
				text: "Your enemies are on to you. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "Your enemies have caught up to you. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move for your pursuers. For example, a trusted associate has been paid off by them, one of your loved ones or allies disappears, something you are trying to do is undermined by your enemies, or they try to actively hurt you.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Victim of Passion",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Victim of Passion",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/victim-of-passion.svg",
		effect: {
			intro: "You have an overwhelming passion for someone or something, seeking to possess it at any cost. Define the object of your passions when you take this Disadvantage.",
			trigger: "In the first game session and whenever you encounter the subject of your passions (or anything resembling it),",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You keep your passion in check.",
				list: ""
			},
			partial: {
				text: "The passion awakens within you. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "You are completely in the passion's grip. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to let your passion steer your actions. For example, you yearn uncontrollably for the subject of your passion—you must seek it out or reduce Stability (−2), your desire drags the subject of your passion into your dreams (perhaps trapping them there), your passion becomes tainted with jealousy and anger—making you want to control and damage it (Keep it Together to resist), your longing leaves you feeble vis-à-vis the objective of this passion (−1 to all rolls while sharing the same scene), or your passion can attract creatures of lust wishing to feed off it or make pacts with you.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Wanted",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Wanted",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "none",
		iconPath: "modules/kult4eoverrides/assets/icons/disadvantage/wanted.svg",
		effect: {
			intro: "You are wanted by the authorities—local, state, or federal—for crimes you have committed. Determine the nature of the allegations against you when you take this Disadvantage.",
			trigger: "Whenever you attract attention to yourself or forget to keep your head down,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]]) to see if you've been discovered"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You are safe, for now.",
				list: ""
			},
			partial: {
				text: "You have made a mistake. The GM takes 1 Hold.",
				list: ""
			},
			fail: {
				text: "All eyes are on you. The GM takes 3 Hold.",
				list: ""
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move for the authorities. For example, your mugshot appears on the TV news and in newspapers, law enforcement officers attempt to trap and catch you, or the authorities detain and interrogate someone you care about, confiscate your possessions, or turn your friends/family against you.",
			list: ""
		},
		hasEdges: false,
		hasHolds: true,
		hasAmmo: false
	},
	{
		name: "Act Under Pressure",
		itemType: "move",
		type: "active",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "coolness",
		iconPath: "modules/kult4eoverrides/assets/icons/move/act-under-pressure.svg",
		effect: {
			intro: "",
			trigger: "When you do something risky, under time pressure, or try to avoid danger,",
			effect: "the GM will explain what the consequences for failure are and you roll +Coolness"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You do what you intended.",
				list: ""
			},
			partial: {
				text: "You do it, but hesitate, are delayed, or must deal with a complication—the GM reveals an unexpected outcome, a high price, or a difficult choice.",
				list: ""
			},
			fail: {
				text: "There are serious consequences, you make a mistake, or you're exposed to the danger. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Avoid Harm",
		itemType: "move",
		type: "active",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reflexes",
		iconPath: "modules/kult4eoverrides/assets/icons/move/avoid-harm.svg",
		effect: {
			intro: "",
			trigger: "When you dodge, parry, or block Harm,",
			effect: "roll +Reflexes"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You emerge completely unharmed.",
				list: ""
			},
			partial: {
				text: "You avoid the worst of it, but the GM decides if you end up in a bad spot, lose something, or partially sustain Harm.",
				list: ""
			},
			fail: {
				text: "You were too slow to react or you made a bad judgment call. Perhaps you didn't avoid any Harm at all, or you ended up in an even worse spot than before. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Endure Injury",
		itemType: "move",
		type: "active",
		moveName: "",
		notes: "Add Armor and subtract Harm from Fortitude roll",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "fortitude",
		iconPath: "modules/kult4eoverrides/assets/icons/move/endure-injury.svg",
		effect: {
			intro: "",
			trigger: "When enduring an injury,",
			effect: "roll +Fortitude +Armor −Harm"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You ride out the pain and keep going.",
				list: ""
			},
			partial: {
				text: "You are still standing, but the GM picks one condition:",
				list: "|The injury throws you off balance.|You lose something.|You receive a Serious Wound."
			},
			fail: {
				text: "The injury is overwhelming. You choose if you:",
				list: "|Are knocked out (the GM may also choose to inflict a Serious Wound).|Receive a Critical Wound, but may continue to act (if you already have a Critical Wound, you may not choose this option again).|Die."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Engage in Combat",
		itemType: "move",
		type: "active",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "violence",
		iconPath: "modules/kult4eoverrides/assets/icons/move/engage-in-combat.svg",
		effect: {
			intro: "",
			trigger: "When you engage an able opponent in combat,",
			effect: "explain how and roll +Violence"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You inflict damage to your opponent and avoid counterattacks.",
				list: ""
			},
			partial: {
				text: "You inflict damage, but at a cost. The GM chooses one:",
				list: "|You're subjected to a counterattack.|You do less damage than intended.|You lose something important.|You expend all your ammo.|You're beset by a new threat.|You'll be in trouble later on."
			},
			fail: {
				text: "Your attack doesn't go as anticipated. You might be subjected to bad luck, miss your target, or pay a high price for your assault. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Help Other",
		itemType: "move",
		type: "active",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "ask",
		iconPath: "modules/kult4eoverrides/assets/icons/move/help-other.svg",
		effect: {
			intro: "",
			trigger: "When you help another player character's Move,",
			effect: "explain how before their roll and roll +Attribute, where the Attribute is the same as the other player is rolling"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You may modify the subsequent roll by +2.",
				list: ""
			},
			partial: {
				text: "You may modify the subsequent roll by +1.",
				list: ""
			},
			fail: {
				text: "Your interference has unintended consequences. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Hinder Other",
		itemType: "move",
		type: "active",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "ask",
		iconPath: "modules/kult4eoverrides/assets/icons/move/hinder-other.svg",
		effect: {
			intro: "",
			trigger: "When you hinder another player character's Move,",
			effect: "explain how before their roll and roll +Attribute, where the Attribute is the same as the other player is rolling"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You may modify the subsequent roll by −2.",
				list: ""
			},
			partial: {
				text: "You may modify the subsequent roll by −1.",
				list: ""
			},
			fail: {
				text: "Your interference has unintended consequences. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Influence Other NPC",
		itemType: "move",
		type: "active",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/move/influence-other-npc.svg",
		effect: {
			intro: "",
			trigger: "When you influence an NPC through negotiation, argument, or from a position of power,",
			effect: "roll +Charisma"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "She does what you ask",
				list: ""
			},
			partial: {
				text: "She does what you ask, but the GM chooses one:",
				list: "|She demands better compensation.|Complications will arise at a future time.|She gives in for the moment, but will change her mind and regret it later."
			},
			fail: {
				text: "Your attempt has unintended repercussions. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Influence Other PC",
		itemType: "move",
		type: "active",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "charisma",
		iconPath: "modules/kult4eoverrides/assets/icons/move/influence-other-pc.svg",
		effect: {
			intro: "",
			trigger: "When you influence another PC,",
			effect: "roll +Charisma"
		},
		lists: {
			questions: "",
			options: "|She's motivated to do what you ask, and recieves +1 for her next roll, if she does it.|She's worried of the consequences if she doesn't do what you ask, and gets −1 Stability if she doesn't do it.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Both options below.",
				list: "|She's motivated to do what you ask, and recieves +1 for her next roll, if she does it.|She's worried of the consequences if she doesn't do what you ask, and gets −1 Stability if she doesn't do it."
			},
			partial: {
				text: "Choose one option below.",
				list: "|She's motivated to do what you ask, and recieves +1 for her next roll, if she does it.|She's worried of the consequences if she doesn't do what you ask, and gets −1 Stability if she doesn't do it."
			},
			fail: {
				text: "The character gets +1 on her next roll against you. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Investigate",
		itemType: "move",
		type: "active",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/move/investigate.svg",
		effect: {
			intro: "",
			trigger: "When you investigate something,",
			effect: "roll +Reason"
		},
		lists: {
			questions: "|How can I find out more about what I'm investigating?|What is my gut feel about what I'm investigating?|Is there anything weird about what I'm investigating?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You uncover all direct leads, and may ask two questions to get additional information.",
				list: "|How can I find out more about what I'm investigating?|What is my gut feel about what I'm investigating?|Is there anything weird about what I'm investigating?"
			},
			partial: {
				text: "You uncover all direct leads, and may ask one question to get additional information. The information comes at a cost, determined by the GM, such as requiring someone or something for the answer, exposing yourself to danger, or needing to expend extra time or resources. Will you do what it takes?",
				list: "|How can I find out more about what I'm investigating?|What is my gut feel about what I'm investigating?|Is there anything weird about what I'm investigating?"
			},
			fail: {
				text: "You may get some information anyway, but you pay a price for it. You may expose yourself to dangers or costs. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Keep It Together",
		itemType: "move",
		type: "active",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "willpower",
		iconPath: "modules/kult4eoverrides/assets/icons/move/keep-it-together.svg",
		effect: {
			intro: "",
			trigger: "When you exercise self-control to keep from succumbing to stress, traumatic experiences, psychic influence, or supernatural forces,",
			effect: "roll +Willpower"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You grit your teeth and stay the course.",
				list: ""
			},
			partial: {
				text: "The effort to resist instills a condition, which remains with you until you have had time to recuperate. You get −1 in situations where this condition would be a hindrance to you. Choose one:",
				list: "|You become angry (−1 Stability).|You become sad (−1 Stability).|You become scared (−1 Stability).|You become guilt-ridden (−1 Stability).|You become obsessed (+1 Relation to whatever caused the condition).|You become distracted (−2 in situations where the condition limits you).|You will be haunted by the experience at a later time."
			},
			fail: {
				text: "The strain is too much for your mind to handle. The GM chooses your reaction:",
				list: "|You cower powerless in the threat's presence.|You panic with no control of your actions.|You suffer emotional trauma (−2 Stability).|You suffer life-changing trauma (−4 Stability)."
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Observe a Situation",
		itemType: "move",
		type: "active",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "perception",
		iconPath: "modules/kult4eoverrides/assets/icons/move/observe-a-situation.svg",
		effect: {
			intro: "",
			trigger: "When you observe a situation,",
			effect: "roll +Perception"
		},
		lists: {
			questions: "|What is my best way through this?|What currently poses the biggest threat?|What can I use to my advantage?|What should I be on the lookout for?|What is being hidden from me?|What seems strange about this?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "Ask two questions about the current situation. When you act on these answers, gain +1 to your rolls.",
				list: "|What is my best way through this?|What currently poses the biggest threat?|What can I use to my advantage?|What should I be on the lookout for?|What is being hidden from me?|What seems strange about this?"
			},
			partial: {
				text: "Ask one question about the current situation. When you act on the answer, gain +1 to your rolls.",
				list: "|What is my best way through this?|What currently poses the biggest threat?|What can I use to my advantage?|What should I be on the lookout for?|What is being hidden from me?|What seems strange about this?"
			},
			fail: {
				text: "You get to ask a question anyway, but you get no bonus for it and miss something, attract unwanted attention or expose yourself to danger. The GM makes a Move.",
				list: "|What is my best way through this?|What currently poses the biggest threat?|What can I use to my advantage?|What should I be on the lookout for?|What is being hidden from me?|What seems strange about this?"
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Read a Person",
		itemType: "move",
		type: "active",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "intuition",
		iconPath: "modules/kult4eoverrides/assets/icons/move/read-a-person.svg",
		effect: {
			intro: "",
			trigger: "When you read a person,",
			effect: "roll +Intuition"
		},
		lists: {
			questions: "|Are you lying?|How do you feel right now?|What are you about to do?|What do you wish I would do?|How could I get you to […]?",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You may ask the GM or player two questions about the target any time you are in conversation with them during this scene.",
				list: "|Are you lying?|How do you feel right now?|What are you about to do?|What do you wish I would do?|How could I get you to […]?"
			},
			partial: {
				text: "You may ask the GM or player one question about the target any time you are in conversation with them during this scene.",
				list: "|Are you lying?|How do you feel right now?|What are you about to do?|What do you wish I would do?|How could I get you to […]?"
			},
			fail: {
				text: "You accidentally reveal your own intentions to the person you're trying to read. Tell the GM/player what these intentions are. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "See Through the Illusion",
		itemType: "move",
		type: "active",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "soul",
		iconPath: "modules/kult4eoverrides/assets/icons/move/see-through-the-illusion.svg",
		effect: {
			intro: "",
			trigger: "When you suffer shock, injuries, or distort your perception through drugs or rituals,",
			effect: "roll +Soul"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You perceive things as they truly are.",
				list: ""
			},
			partial: {
				text: "You see Reality, but you also affect the Illusion. The GM chooses one:",
				list: "|Something senses you.|The Illusions tears around you."
			},
			fail: {
				text: "The GM explains what you see. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Divine Champion B",
		itemType: "+Divine Champion",
		type: "passive",
		moveName: "Fail your God",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/divine-champion.svg",
		effect: {
			intro: "",
			trigger: "When you lose a battle against your deity's enemies or to protect a sacred object,",
			effect: "your deity becomes irate: [[[you take −1 ongoing to all actions related to your deity until you have atoned for your failure.]]]"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Sealed Fate B",
		itemType: "+Sealed Fate",
		type: "passive",
		moveName: "Defy Death",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/sealed-fate.svg",
		effect: {
			intro: "",
			trigger: "Whenever you die,",
			effect: "[[[mark 2 Time from Condemned and reawaken, injured and weak, but alive. All your Wounds will be stabilized.]]]"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Explosives Expert A",
		itemType: "+Explosives Expert",
		type: "active",
		moveName: "Improvise Explosive",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/explosives-expert.svg",
		effect: {
			intro: "",
			trigger: "Whenever you're building an improvised bomb under time pressure,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You construct a functional bomb.",
				list: ""
			},
			partial: {
				text: "The bomb's blast potential is lower than usual (decrease Harm dealt by −1).",
				list: ""
			},
			fail: {
				text: "The bomb is unpredictable. Maybe it doesn't detonate, detonates prematurely, or it is more powerful and volatile than expected. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Explosives Expert B",
		itemType: "+Explosives Expert",
		type: "active",
		moveName: "Disarm Explosive",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "reason",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/explosives-expert.svg",
		effect: {
			intro: "",
			trigger: "When you are disarming a bomb,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "The bomb is deactivated.",
				list: ""
			},
			partial: {
				text: "Complications arise. Maybe you can't completely turn it off, just delay the timer, weaken the explosive effect, or something else turns up and makes thing worse.",
				list: ""
			},
			fail: {
				text: "Fuck, that's not good! The bomb may go off in your hands, the timer starts counting down from 10, 9, 8, 7…, or even bigger problems occur. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Shadow A",
		itemType: "+Shadow",
		type: "active",
		moveName: "Shadow Someone",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "perception",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/shadow.svg",
		effect: {
			intro: "",
			trigger: "When shadowing someone,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You avoid discovery, follow your target all the way to their final destination, and learn something about them you can use to your advantage later.",
				list: ""
			},
			partial: {
				text: "You avoid discovery and follow your target to their final destination.",
				list: ""
			},
			fail: {
				text: "You are spotted or encounter some sort of problem along the way. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Shadow B",
		itemType: "+Shadow",
		type: "active",
		moveName: "Evade a Shadow",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "perception",
		iconPath: "modules/kult4eoverrides/assets/icons/advantage/shadow.svg",
		effect: {
			intro: "",
			trigger: "Whenever you want to lose someone shadowing you,",
			effect: "roll to [[[moveName]]] (+[[[attrMod]]])"
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "You shake your pursuers and can choose to try to shadow them instead.",
				list: ""
			},
			partial: {
				text: "You shake your pursuers.",
				list: ""
			},
			fail: {
				text: "Your pursuers are still on your tail, and they can set up an ambush, disappear without a trace (only to show up when you least expect it), or refuse to go away. The GM makes a Move.",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Unarmed",
		itemType: "weapon",
		type: "melee",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/weapon/unarmed.svg",
		effect: {
			intro: "",
			trigger: "",
			effect: ""
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Punch, Kick & Tear:arm:1:-:}{Lock:arm:0:-:You are in control of the target until they break free.}{Shift:arm:0:-:You create distance between yourself and the target through a throw, body check or push.}{Disarm:arm:0:-:You remove an object your opponent held in their hand.}{Excessive Force:arm:2:-:Focus entirely on killing your target, disregarding your own safety.}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Edged Weapon",
		itemType: "weapon",
		type: "melee",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/weapon/edged-weapon.svg",
		effect: {
			intro: "Examples: knife, stiletto, screwdriver, dagger",
			trigger: "",
			effect: ""
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Cut, Slice & Stab:arm:2:-:}{Held to the Throat:arm:0:-:You are in control of the target until they break free.}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Crushing Weapon",
		itemType: "weapon",
		type: "melee",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/weapon/crushing-weapon.svg",
		effect: {
			intro: "Examples: baseball bat, hammer, club, crowbar",
			trigger: "",
			effect: ""
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Pummel, Maul & Crush:arm:2:-:}{Knock Down:arm:1:-:The target falls to the ground.}{Knock Out:arm:1:-:The target is knocked out. PC targets must successfully Endure Injury to avoid being knocked out.}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Chopping Weapon",
		itemType: "weapon",
		type: "melee",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/weapon/chopping-weapon.svg",
		effect: {
			intro: "Examples: machete, axe, sword",
			trigger: "",
			effect: ""
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Hack, Slash & Chop:arm:2:-:}{Momentum:arm:1:-:You may strike one additional target.}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Handgun",
		itemType: "weapon",
		type: "ranged",
		moveName: "",
		notes: "",
		clock: null,
		ammo: 4,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/weapon/handgun.svg",
		effect: {
			intro: "Examples: Beretta M92FS, Colt M1911A1, CZ P-10 C, FN Five-seveN, Glock 19, Glock 23, H&K USP45, H&K VP9, S&W Model 10, S&W MP40 Shield, SIG-Sauer P226, Walther P99",
			trigger: "",
			effect: ""
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Shoot:arm/room:2:-1ammo:}{Overkill:arm/room:3:-2ammo:}{Multiple Targets:arm/room:2:-3ammo:Hit up to one additional target.}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: true
	},
	{
		name: "Magnum Handgun",
		itemType: "weapon",
		type: "ranged",
		moveName: "",
		notes: "",
		clock: null,
		ammo: 3,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/weapon/magnum-handgun.svg",
		effect: {
			intro: "Examples: Colt Python, FA Model 83, IMI Desert Eagle, Ruger GP100, Ruger New Model Super Blackhawk, Ruger Super Redhawk, S&W M586, S&W Model S&W500, Taurus Raging Bull",
			trigger: "",
			effect: ""
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Shoot:arm/room:3:-1ammo:}{Overkill:arm/room:4:-3ammo:}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: true
	},
	{
		name: "Submachine Gun",
		itemType: "weapon",
		type: "ranged",
		moveName: "",
		notes: "",
		clock: null,
		ammo: 3,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/weapon/submachine-gun.svg",
		effect: {
			intro: "Examples: FN P90, Glock 18, H&K MP5, H&K MP7, H&K UMP45, IMI Uzi, Ingram MAC-10, KRISS Vector, Skorpion vz.61, Steyr AUG A3 Para XS",
			trigger: "",
			effect: ""
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Short Bursts:room:2:-1ammo:}{Focused Auto:room:3:-2ammo:}{Spray & Pray:room:2:-3ammo:Hit up to two additional targets.}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: true
	},
	{
		name: "Assault Rifle",
		itemType: "weapon",
		type: "ranged",
		moveName: "",
		notes: "",
		clock: null,
		ammo: 4,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/weapon/assault-rifle.svg",
		effect: {
			intro: "Examples: AK-47/AKM/AK-103, Colt M4A1, FAMAS, FN SCAR-L, H&K G36, HK416, IWI Tavor TAR-21, QBZ-95-1, SA80, Steyr AUG",
			trigger: "",
			effect: ""
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Controlled Fire:room/field:3:-1ammo:}{Mow Down:room/field:4:-2ammo:}{Empty the Mag:room/field:3:-4ammo:Hit up to two additional targets.}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: true
	},
	{
		name: "Machine Gun",
		itemType: "weapon",
		type: "ranged",
		moveName: "",
		notes: "",
		clock: null,
		ammo: 6,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/weapon/machine-gun.svg",
		effect: {
			intro: "Examples: FN MAG, M249, M60, MG5, RPK-74",
			trigger: "",
			effect: ""
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Burst Fire:room/field:3:-1ammo:}{Sustained Fire:room/field:3:-3ammo:Hit up to three additional targets.}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: true
	},
	{
		name: "Rifle",
		itemType: "weapon",
		type: "ranged",
		moveName: "",
		notes: "",
		clock: null,
		ammo: 3,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/weapon/rifle.svg",
		effect: {
			intro: "Examples: hunting rifle, marksman rifle, sniper rifle",
			trigger: "",
			effect: ""
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Aim & Fire:room/field/horizon:3:-1ammo:}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: true
	},
	{
		name: "Combat Shotgun",
		itemType: "weapon",
		type: "ranged",
		moveName: "",
		notes: "",
		clock: null,
		ammo: 3,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/weapon/combat-shotgun.svg",
		effect: {
			intro: "Examples: Benelli M3 Super 90, Franchi SPAS-12, Mossberg 500, Remington M870, Saiga-12, Winchester M1300",
			trigger: "",
			effect: ""
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Point-Blank:room:3:-1ammo:}{Farshot:field:1:-1ammo:}{Pellet Storm:room:3:-2ammo:Hit entire small, closely-packed group.}{Saturate:field:1:-2ammo:Hit entire small, closely-packed group.}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: true
	},
	{
		name: "Explosives",
		itemType: "weapon",
		type: "ranged",
		moveName: "",
		notes: "",
		clock: null,
		ammo: 1,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/weapon/explosives.svg",
		effect: {
			intro: "Examples: grenade,demolition charge,bomb",
			trigger: "",
			effect: ""
		},
		lists: {
			questions: "",
			options: "",
			edges: "",
			attacks: "{Detonation:room/field:4:-1ammo:Hits all targets in range.}"
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: true
	},
	{
		name: "Chosen One",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/chosen-one.svg",
		effect: {
			intro: "",
			trigger: "You have been chosen by a god to become its advocate or sacrificial lamb.",
			effect: "The god's disciples watch over you, waiting for the day of your ascension. You may have grown up in their cult, or were discovered by them well into your adulthood. Whichever the case, you're sure the cult has terrible plans for you. You've tried escaping from these disciples, but they always end up finding you again. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Avoid your pursuers.|Fight the cult and/or their god.|Fulfill your god's desire.|Expand the cult's membership.|Find out the truth about your destiny.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Curse",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/curse.svg",
		effect: {
			intro: "",
			trigger: "You are afflicted by a curse, knowingly or not.",
			effect: "The curse has started influencing your life and you must find a way to get rid of it. The curse may have been inherited or brought upon yourself through your own actions. Its effects are starting to make you lose your grasp on reality and threaten to harm those closest to you. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Find out what the curse is.|Discover how to break the curse.|Transfer the curse to someone else.|Find some way to accept your fate.|Take revenge on the person responsible for the curse.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Family Secret",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/family-secret.svg",
		effect: {
			intro: "",
			trigger: "Your family has a well-kept secret, which has haunted you for your entire life.",
			effect: "They may have been members of an obscure sect or exposed to some dreadful horror. You may have been initiated into this secret as a child, or only recently found out the truth as an adult. This secret keeps you on edge and threatens to destroy your life. You likely have to take action to save yourself and your family. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Keep the secret.|Avoid your family.|Confront your family.|Help your family.|Find out the entire truth.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Forbidden Knowledge",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/forbidden-knowledge.svg",
		effect: {
			intro: "",
			trigger: "You have uncovered some horrid truth, which brings reality's very nature into question.",
			effect: "It might be unlocking some way to move between dimensions, exposing the mayor's true demonic visage, finding proof that history has been rewritten, or discovering that the world as we know it is actually an illusion. The Illusion's keepers are now after you and it is only a matter of time before they find you. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Reveal the Truth to the world.|Acquire power or knowledge.|Explore the forbidden truth.|Fight the enemy.|Escape your pursuers.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Guardian",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/guardian.svg",
		effect: {
			intro: "",
			trigger: "You have been chosen to protect an important object, place, or person.",
			effect: "This sacred duty could have been inherited, assigned to you specifically, or granted to you at your own request. What you are protecting may be intended for accomplishing some great task in the future, or you may be safeguarding it to ensure it doesn't fall into the wrong hands. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Keep what you are guarding safe.|Find out more about the previous guardians and what you are protecting.|Pass the guardianship over to a worthy individual.|Fulfill your purpose.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Guilty of Crime",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/guilty-of-crime.svg",
		effect: {
			intro: "",
			trigger: "You feel constant remorse for a crime you have committed.",
			effect: "Regardless if you committed the crime on your own initiative or because you were coerced by others, you feel you are solely to blame. The victim, their relatives, and/or the police are probably looking for you. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Avoid justice.|Confront the victim or their relatives.|Punish yourself.|Help other people.|Bring the other perpetrators to justice—be it of the legal or personal variety.|Take revenge on those who made you commit the crime.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Heir",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/heir.svg",
		effect: {
			intro: "",
			trigger: "You have been granted a unique inheritance from relatives or friends.",
			effect: "It could be a small object or something more substantial, such as a house. The inheritance has instilled an unnatural obsession within you. You know it hides secrets and perhaps unknown forces. Might it reveal what happened to its previous owner? Others want to possess your inheritance also, and you suspect they will stop at nothing to acquire it. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Discover the truth about your inheritance.|Protect your inheritance.|Investigate what happened to its previous owner.|Confront those who seek to acquire your inheritance.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Mental Illness",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/mental-illness.svg",
		effect: {
			intro: "",
			trigger: "You or one of your close relations suffer from mental illness.",
			effect: "There's a good chance you have seen with your own eyes (or heard from your relative) that reality is simply an illusion. But who would believe a crazy person? Psychiatric institutions hold many secrets and many doctors have hidden motives. For the insane who end up on the streets, disturbed mentors gladly take newcomers under their wing to initiate them in the Truth. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Explore the Illusion.|Expose the conspiracy.|Take revenge on your doctors and other caregivers.|Find out the truth about your relative.|Find your missing mentally ill relative.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Occult Experience",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/occult-experience.svg",
		effect: {
			intro: "",
			trigger: "You have witnessed occult proceedings, which changed your view of reality.",
			effect: "You may have participated in arcane rituals, exposed cults serving disturbing entities, or seen things revealing that the world is not what it seems. Your experiences make it difficult for you to accept the Illusion that most others live in. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Uncover more of the Truth.|Seek atonement for your actions.|Help others realize the Truth.|Seek out more occult knowledge and power.|Fight the demons.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Pact with Dark Forces",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/pact-with-dark-forces.svg",
		effect: {
			intro: "",
			trigger: "You have sealed a pact with a powerful entity.",
			effect: "You may have made the pact willingly or been tricked into it. Regardless, you are now under the being's spell. You may have benefited greatly from this pact, but the cost could be your literal soul. Deep inside you understand you must find a way to trick the being into breaking the pact. The question is how? <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Find a way to break the pact.|Cheat death.|Slay the being.|Achieve further power or success.|Take revenge on whoever tricked you into the pact.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Responsible for Medical Experiments",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/responsible-for-medical-experiments.svg",
		effect: {
			intro: "",
			trigger: "You were responsible for or assisted in shady medical experiments, which ended in horrifying results.",
			effect: "Regardless of whether the subjects were willing or not, the experiments destroyed their lives and they are now dead, missing, or transformed into something inhuman. In addition to your pangs of guilt, you may be pursued by your former test subjects, their relatives, the law, former colleagues, employers, or nameless forces trying to silence you. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Avoid taking responsibility for the experiments.|Seek forgiveness from subjects and/or their relatives.|Gather evidence to expose your former employer.|Conclude interrupted or failed experiments.|Continue researching your findings.|Restore the test subjects to their former selves.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Returned from the Other Side",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/returned-from-the-other-side.svg",
		effect: {
			intro: "",
			trigger: "You experienced an event where the Illusion shattered completely, and you were the only one who returned.",
			effect: "Your apartment block may have slipped into another dimension, its existence wiped from history. An airplane may have disappeared and you were found twenty years later, without memories and having not aged a day. A company of soldiers in Afghanistan may have literally walked into hell and only you returned, covered in your comrades' blood. Deep down you feel you were not meant to have survived, and that something is coming for you to restore balance and order. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Discover the truth about the event.|Expose what happened to you to the world.|Elude your fate.|Return to the scene.|Find lost relatives or friends.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Rootless",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/rootless.svg",
		effect: {
			intro: "",
			trigger: "Your family always moved around.",
			effect: "Your parents never told you why, but the haunted look in their eyes and hushed conversations hinted that you were running away from something terrifying. They would rouse you in the middle of night, leaving behind everything you owned, simply to escape. Eventually, they even abandoned you. Maybe they're still on the run, or maybe whatever they feared finally caught up with them. The feeling of being followed never truly lets go, and wherever you end up it's not long before you're on the road again. You don't know exactly what would happen if you stopped, but you feel it's something terrible. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Find out what is pursuing you.|Find a place where you can stop and breathe.|Escape what is pursuing you.|Find your parents.|Figure out why this is happening.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Strange Disappearance",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/strange-disappearance.svg",
		effect: {
			intro: "",
			trigger: "Someone close to you disappeared after getting too close to the truth while investigating something.",
			effect: "You have no idea what happened, but someone recently sent you cryptic information, urging you to finish what your colleague started. Since your associate disappeared, you've become the victim of unknown stalkers. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Figure out whatever became of the missing person.|Finish the investigation they started.|Escape your pursuers.|Bring the guilty to justice.|Reveal the truth to the public.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Victim of Crime",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/victim-of-crime.svg",
		effect: {
			intro: "",
			trigger: "You have endured a terrible crime.",
			effect: "Your whole life is marred by this event and you cannot mentally suppress the violation, no matter how hard you try. Fear, shame, anger, and a sense of helplessness torment you, and in order to survive this trauma, you must find a way to heal your wounds. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Get revenge on the perpetrator.|Re-experience the crime again (as victim or as perpetrator).|Find out why it happened to you.|Stop similar crimes.|Confront and forgive the perpetrator.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Victim of Medical Experiments",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/victim-of-medical-experiments.svg",
		effect: {
			intro: "",
			trigger: "You were subjected to medical experiments with unexpected outcomes, with or without your consent and knowledge.",
			effect: "The experiments have had enduring mental and/or physical side effects. They may have shown you windows into alternate dimensions—resulting in madness. The side effects still torment you, and ridding yourself of them requires you to find the responsible parties. It's also possible your parents were the test subjects and you inherited the experimental effects, as a result. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Track down those responsible.|Restore yourself to the state you were in before.|Get revenge on the person(s) responsible.|Find a way to accept the person you are now.|Explore other dimensions.|Expose the truth to the world.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	},
	{
		name: "Visitations",
		itemType: "darksecret",
		type: "passive",
		moveName: "",
		notes: "",
		clock: null,
		ammo: null,
		armor: "",
		attributemod: "",
		iconPath: "modules/kult4eoverrides/assets/icons/darksecret/visitations.svg",
		effect: {
			intro: "",
			trigger: "You have a history of encounters with beings from the other side.",
			effect: "They could be family members or friends tracking you down post-mortem, entities discovered at haunted locations, or inhuman forces taking an interest in you. Regardless of what you do, you can't seem to escape them. Every time you think it's finally over, they reappear in your life—you are never truly free. <h2>Suggested Drives</h2>$OPTIONS$"
		},
		lists: {
			questions: "",
			options: "|Figure out why you are haunted in this way.|Help spirits find peace after death.|Fight evil beings.|Help people communicate with the dead.|Escape the entity pursuing you.",
			edges: "",
			attacks: ""
		},
		results: {
			success: {
				text: "",
				list: ""
			},
			partial: {
				text: "",
				list: ""
			},
			fail: {
				text: "",
				list: ""
			}
		},
		suffix: {
			text: "",
			list: ""
		},
		hasEdges: false,
		hasHolds: false,
		hasAmmo: false
	}
];

const PARSERS = {
	move: (data) => {
		data = JSON.parse(JSON.stringify(data));
		data.itemType = "move";
		return {
			...{
				"name": data.moveName ?? data.name,
				"type": "move",
				"img": imgCheck(data),
				"data.attributemod": data.attributemod ?? "none",
				"data.completesuccess": resultCheck(data.results.success, data),
				"data.partialsuccess": resultCheck(data.results.partial, data),
				"data.failure": resultCheck(data.results.fail, data),
				"data.trigger": descriptionCheck(data),
				"data.specialflag": {
					"keep it together": 1,
					"see through the illusion": 2,
					"endure injury": 3
				}[data.name.toLowerCase()] ?? 0
			},
			...data.linkName
				? {
						"flags.kult4eoverrides.linkName": data.linkName,
						"flags.kult4eoverrides.linkType": data.linkType
					}
				: {},
			"flags.kult4eoverrides.trigger": data.trigger,
			"flags.kult4eoverrides.isRolled": data.moveType === "roll",
			"flags.kult4eoverrides.moveType": data.moveType,
			"flags.kult4eoverrides.isFrozen": true
		};
	},
	advantage: (data) => ({
		"name": data.name,
		"type": "advantage",
		"img": imgCheck(data),
		"data.attributemod": data.attributemod ?? "none",
		"data.type": data.type,
		"data.description": descriptionCheck(data),
		"data.effect": descriptionCheck(data),
		"data.tokens": data.hasTokens ? 0 : "",
		"data.hasTokens": data.hasTokens,
		"data.completesuccess": "",
		"data.partialsuccess": "",
		"data.failure": "",
		"flags.kult4eoverrides.moves": data.moves ?? [],
		"flags.kult4eoverrides.attacks": data.attacks ?? [],
		"flags.kult4eoverrides.isFrozen": true
	}),
	disadvantage: (data) => ({
		"name": data.name,
		"type": "disadvantage",
		"img": imgCheck(data),
		"data.attributemod": data.attributemod ?? "none",
		"data.type": data.type,
		"data.description": descriptionCheck(data),
		"data.effect": descriptionCheck(data),
		"data.tokens": data.hasTokens ? 0 : "",
		"data.hasTokens": data.hasTokens,
		"data.completesuccess": "",
		"data.partialsuccess": "",
		"data.failure": "",
		"flags.kult4eoverrides.moves": data.moves ?? [],
		"flags.kult4eoverrides.attacks": data.attacks ?? [],
		"flags.kult4eoverrides.isFrozen": true
	}),
	weapon: (data) => ({
		"name": data.name,
		"type": "weapon",
		"img": imgCheck(data),
		"data.special": descriptionCheck(data),
		"data.harm": data.attacks[0].harm,
		"data.range": data.attacks[0].range,
		"data.ammo.value": data.ammo,
		"data.ammo.min": 0,
		"data.ammo.max": data.ammo,
		"flags.kult4eoverrides.moves": data.moves ?? [],
		"flags.kult4eoverrides.attacks": data.attacks ?? [],
		"flags.kult4eoverrides.type": data.type,
		"flags.kult4eoverrides.isFrozen": true
	}),
	darksecret: (data) => ({
		"name": data.name,
		"type": "darksecret",
		"img": imgCheck(data),
		"data.description": descriptionCheck(data),
		"data.effect": "",
		"flags.kult4eoverrides.isFrozen": true
	}),
	relationship: (data) => ({
		"name": data.name,
		"type": "relationship",
		"img": imgCheck(data),
		"target": "",
		"strength": "",
		"flags.kult4eoverrides.isFrozen": true
	}),
	gear: (data) => ({
		"name": data.name,
		"type": "gear",
		"img": imgCheck(data),
		"uses": "",
		"description": "",
		"flags.kult4eoverrides.isFrozen": true
	})
};

export default async function BUILD_ITEM_DATA() {
	// Find 'Engage in Combat' move to use as template for attack moves.
	const engageInCombatData = JSON.parse(JSON.stringify(DATA_JSON.find((itemData) => itemData.name === "Engage in Combat")));

	// Iterate over Items, adding subMove data and parsing Attacks
	DATA_JSON.forEach((itemData) => {
		if (itemData.itemType === "darksecret") {
			itemData.effect.intro = itemData.effect.trigger;
			itemData.effect.trigger = "";
			itemData.effect.effect = `${itemData.effect.intro} ${itemData.effect.effect}`;
		}
		// if (["darksecret", "relationship"].includes(itemData.itemType)) { return }
		if (/^[^A-Za-z]/.test(itemData.itemType)) {
			const parentItem = DATA_JSON.find((item) => item.name === itemData.itemType.slice(1));
			parentItem.moves = parentItem.moves ?? [];
			if (itemData.name.endsWith("A")) {
				// This subMove is REPLACING any move parsed out of the linked item
				parentItem.moves[0] = getMoveData(itemData, {
					"+": "advantage",
					"-": "disadvantage"
				}[itemData.itemType.charAt(0)]);
			} else {
				parentItem.moves.push(getMoveData(itemData, {
					"+": "advantage",
					"-": "disadvantage"
				}[itemData.itemType.charAt(0)]));
			}
		} else {
			itemData.attacks = itemData.attacks ?? [];
			itemData.moves = itemData.moves ?? [];
			if (itemData.effect?.trigger) {
				itemData.moves.push(getMoveData(itemData));
			}
			if (itemData.lists?.attacks?.length) {
				const attacksData = getAttacksData(itemData);
				itemData.attacks.push(...getAttackMoves(itemData, attacksData, engageInCombatData));
				itemData.moves.push(...itemData.attacks);
			}
		}
	});

	KO.log("MOVES ADDED", DATA_JSON);

	// FIRST PASS: Iterate through all strings, adding formatting
	const styleItemData = (itemData) => {
		// Strip page numbers
		itemData = stringMap(itemData, (str) => str.replace(/\s*\d\d\d\s*/g, ""));

		// Convert pipe-delimited strings to arrays
		["effect", "lists", "results", "suffix"].forEach((key) => {
			itemData[key] = stringMap(itemData[key], (str) => {
				if (/^\|/.test(str)) {
					return str.split(/\|/).slice(1);
				} else if (/\|/.test(str)) {
					console.error(`String '${str}' has a pipe, but not at the start`);
				}
				return str;
			});
		});

		// Wrap key words and phrases in <span> tags with indicated classes
		["effect", "lists", "results", "suffix"].forEach((key) => {
			itemData[key] = stringMap(itemData[key], (str) => {
				[
					["\\+(?:Fortitude|Willpower|Reflexes|Reason|Intuition|Perception|Coolness|Violence|Charisma|Soul|0|Varies|Attribute)", "roll-desc"],
					["(Serious|Critical)\\s+[Ww]oun[a-z]+", "keyword"],
					["(?:[Tt]he)?\\s+GM(?:\\s+\\w+){1,3}\\s+(?:Hold|Moves?)", "gm-phrase"],
					["Hold|Moves?", "gm-phrase"],
					["Avoid Harm", "move-name"],
					["[\\s()+−\\d]*\\b(?:Stability|Rage|Edges?|Harm|Wounds?|Time|Relations?|ongoing)\\b[\\s()+−\\d]*", "keyword"],
					["Endure Injury", "move-name"],
					["Keep [Ii]t Together", "move-name"],
					["Act Under Pressure", "move-name"],
					["Engage [Ii]n Combat", "move-name"],
					["Influence (?:Ano|O)ther", "move-name"],
					["See [Tt]hrough [Tt]he Illusion", "move-name"],
					["Read [Aa] Person", "move-name"],
					["Observe [Aa] Situation", "move-name"],
					["Investigate", "move-name"],
					["Help(?:\/|\\s+[Oo]r\\s+)Hinder(?:\\s+(?:Ano|O)ther)?", "move-name"]
				]
					.forEach(([pat, className]) => {
						str = str
							.replace(new RegExp(`(${pat})`, "g"), `<span class="item-${className}">$1</span>`);
					});
				return str;
			});
		});

		// Reposition white space and parentheses to outside of tags
		["effect", "lists", "results", "suffix"].forEach((key) => {
			itemData[key] = stringMap(itemData[key], (str) => str
				.replace(/(<[^>]+>)([\s(]*)(.*?)([\s)]*)(<\/[^>]+>)/g, "$2$1$3$5$4")
				.replace(/\(([^)]{1,4})(<\/[a-z]+>)\s*\)/gui, "($1)$2"));
		});

		// Repeat parsing for any sub-moves
		if (itemData.moves?.length) {
			itemData.moves = itemData.moves.map((moveData) => styleItemData(moveData));
		}

		return itemData;
	};
	const DATA_STYLED = DATA_JSON
		.filter((itemData) => /^[A-Za-z]/.test(itemData.itemType))
		.map(styleItemData);

	// SECOND PASS: Construct item data in accordance with kult4e template.json
	return Promise.all(DATA_STYLED
		.filter((data) => ["move", "advantage", "disadvantage", "weapon", "darksecret", "relationship", "gear"].includes(data.itemType))
		.map(async (itemData) => PARSERS[itemData.itemType](itemData)));
}

function getMoveData(itemData, altMoveType = false) {
	itemData = JSON.parse(JSON.stringify(itemData));
	const moveType = itemData.results?.success?.text ? "roll" : "static";
	if (altMoveType) {
		itemData = {
			...itemData,
			linkName: itemData.itemType.slice(1),
			linkType: altMoveType,
			name: itemData.moveName ?? itemData.name,
			itemType: "move",
			moveType
		};
	} else {
		itemData = {
			...itemData,
			linkName: itemData.name,
			linkType: itemData.itemType,
			name: itemData.moveName ?? itemData.name,
			itemType: "move",
			moveType
		};
	}
	delete itemData.moves;
	return itemData;
}

function getAttacksData(itemData) {
	const {attacks} = itemData.lists;
	if (attacks) {
		return attacks.slice(1, -1).split("}{").map((attackString) => {
			const [name, range, harm, ammo, special] = attackString.split(":");
			return {
				name,
				source: itemData.name,
				range,
				type: itemData.type,
				harm: U.pInt(harm),
				ammoCost: /\d/.test(ammo) ? parseInt(ammo.replace(/\D/g, "")) : 0,
				special
			};
		});
	}
	return [];
}
function getAttackMoves(itemData, attacksData, engageInCombatData) {
	return attacksData?.map((attack) => {
		const attackData = {...engageInCombatData};
		attackData.name = `${attack.source}: ${attack.name}`;
		attackData.ammoCost = attack.ammoCost;
		attackData.harm = attack.harm;
		attackData.range = attack.range;
		attackData.special = attack.special;
		attackData.type = attack.type;
		attackData.iconPath = itemData.iconPath;
		attackData.effect = {
			intro: tagWrap("p", [
				`Harm: ${attack.harm}`,
				`Range: ${U.lCase(attack.range)}`,
				attack.ammoCost ? `Ammo Cost: ${attack.ammoCost}` : ""
			], "center-text", " ◈ "),
			trigger: `When you execute a <b>"${attack.name}"</b> attack ${attack.source === "Unarmed" ? "while unarmed" : `with ${U.parseArticles(`a ${attack.source}`)}`},`,
			effect: "if you are within range and have sufficient ammunition (if required), roll +Violence"
		};
		attackData.results = {
			success: {
				text: `You inflict ${attack.harm} Harm to your opponent(s)${attack.ammoCost ? ` (expending ${attack.ammoCost} ammo)` : ""} and avoid counterattacks.${attack.special ? ` ${U.sCase(attack.special)}` : ""}`,
				list: null
			},
			partial: {
				text: `You inflict ${attack.harm} Harm to your opponent(s)${attack.ammoCost ? ` (expending at least ${attack.ammoCost} ammo)` : ""}, but at a cost chosen by the GM from the list below.${attack.special ? ` ${U.sCase(attack.special)}` : ""}`,
				list: "|You're subjected to a counterattack.|You do less damage than intended.|You lose something important.|You expend all your ammo.|You're beset by a new threat.|You'll be in trouble later on."
			},
			fail: {
				text: "Your attack doesn't go as anticipated. You might be subjected to bad luck, miss your target, or pay a high price for your assault. The GM makes a Move.",
				list: null
			}
		};
		attackData.hasAmmo = attack.ammoCost > 0;
		attackData.linkName = attack.source;
		attackData.linkType = itemData.itemType;
		attackData.moveType = "roll";
		return attackData;
	});
}

function tagWrap(tag, lines, classes, delim = "", isResolvingList = false) {
	lines = [lines].flat().filter((line) => Boolean(line));
	classes = [classes].flat().filter((cls) => Boolean(cls)).join(" ");
	const [tagStart, tagEnd] = [`<${tag}${classes ? ` class="${classes}"}` : ""}>`, `</${tag}>`];
	const injectLineBreaks = (text) => text.replace(/\$n\$/, `${tagEnd}${tagStart}`);
	if (lines.length) {
		lines = lines.join(delim);
		if (/\$(OPTIONS|QUESTIONS|EDGES)\$/.test(lines)) {
			const listType = lines.match(/\$(OPTIONS|QUESTIONS|EDGES)\$/)[1];
			if (isResolvingList) {
				const afterLines = lines.match(new RegExp(`\\$${listType}\\$(.*)$`))?.[1]?.trim() ?? "";
				lines = lines.replace(new RegExp(`\\s*\\$${listType}\\$.*$`), "");
				return injectLineBreaks([
					`${tagStart}${lines}${tagEnd}`,
					`$${listType}$`,
					afterLines.length > 0 ? `${tagStart}${afterLines}${tagEnd}` : ""
				].join(""));
			}
			lines = lines.replace(new RegExp(`\\s*\\$${listType}\\$`), "").trim();
			return [
				injectLineBreaks([tagStart, lines, tagEnd].join("")),
				`$${listType}$`
			].join("");
		}
		return injectLineBreaks(`${tagStart}${lines}${tagEnd}`);
	}
	return "";
}
function tagStrip(str) {
	if (str) {
		do {
			str = `${str}`.replace(/<[^>]+>(.*)<\/[^>]+>/g, "$1");
		} while (/<[^>]+>(.*)<\/[^>]+>/.test(str));
	}
	return str;
}
function stringMap(obj, mapFunc) {
	if (typeof obj === "string") { return mapFunc(obj) }
	if (!obj) { return obj }
	if (["number", "boolean", "function"].includes(typeof obj)) { return obj }
	if (Array.isArray(obj)) { return obj.map((elem) => stringMap(elem, mapFunc)) }
	return Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, stringMap(val, mapFunc)]));
}
async function awaitApply(itemPromise, assignData = {}) {
	const item = await itemPromise;
	return {
		...item,
		...assignData
	};
}
function getTypeName(type) {
	return {
		advantage: "Advantage",
		disadvantage: "Disadvantage",
		weapon: "Weapon",
		gear: "Gear",
		darksecret: "Dark Secret",
		relationship: "Relation"
	}[type];
}

function subMoveCheck(data) {
	if (data.linkName) {
		return `<span class="source-name">${getTypeName(data.linkType)}: ${data.linkName}</span>`;
	}
	return "";
}
function centerCheck(resultData) {
	const checkLine = typeof resultData === "string" ? resultData : resultData?.text;
	if (!checkLine) { return "" }
	return tagWrap("p", checkLine, resultData.list || tagStrip(checkLine).length > 60 ? null : "center-text");
}
function listCheck(listLines) {
	listLines = [listLines].flat().filter((line) => Boolean(line));
	if (listLines.length) {
		const isLabeled = listLines.every((line) => /^.{2,30} - /.test(line));
		const report = listLines.map((line) => [line, /^.{2,30} - /.test(line)]);

		// KO.log("ListCheck Report", report, isLabeled);
		return tagWrap("ul", listLines.map((line) => {
			if (isLabeled) {
				const [edgeName, edgeEffect] = line.split(/ - /);
				line = [
					tagWrap("span", edgeName, "edge-name"),
					" — ",
					edgeEffect
				].join("");
				// console.log(line);
			}
			return tagWrap("li", line);
		}), null, "\n")
			.replace(/<p[^>]*?>\s*\.\s*<\/p>/g, "");
	}
	return "";
}
function imgCheck(itemData) { return itemData.iconPath }
function descriptionCheck(itemData) {
	// if (itemData.itemType === "darksecret") {
	// console.log(JSON.stringify(itemData, null, 2));
	// debugger;
	// }
	const descBlockLines = [
		centerCheck(itemData?.effect?.intro)
	];
	if (itemData.itemType === "move") {
		descBlockLines.unshift(subMoveCheck(itemData));
		descBlockLines.push(
			tagWrap("p", [
				tagWrap("span", itemData.effect?.trigger, "item-trigger"),
				attrCheck(itemData.effect?.effect, itemData)
			], null, " ", true)
		);
	} else if (["darksecret", "relationship"].includes(itemData.itemType)) {
		descBlockLines.pop();
		descBlockLines.push(
			tagWrap("p", [
				tagWrap("span", itemData.effect?.effect, "")
			], null, " ", true)
		);
		// console.log("DescBlockLines", descBlockLines);
	} else {
		descBlockLines.push(
			...itemData.moves.map((move) => tagWrap("p", [
				move.effect?.trigger
					? tagWrap("span", move.effect?.trigger, "item-trigger")
					: tagWrap("span", move.effect?.effect),
				attrCheck(move.effect?.effect, move, itemData)
			], null, " ", true))
			// .replace(/\[\[\[moveName\]\]\]/g, tagWrap("span", move.name, "item-move-name")))
		);
	}
	descBlockLines.push(
		...itemData.hasEdges
			? [
					centerCheck(`<span class="item-keyword">This ${U.sCase(itemData.itemType)} grants Edges</span>.`),
					"Spend <span class=\"item-keyword\">Edges</span> to:",
					listCheck(itemData.lists.edges)
				]
			: [],
		itemData.hasHolds
			? centerCheck(`<span class="item-gm-phrase">This ${U.sCase(itemData.itemType)} generates Hold</span>.`)
			: "",
		tagWrap("p", [
			itemData.suffix.text,
			listCheck(itemData.suffix.list)
		], null, "", true)
	);
	// if (itemData.itemType === "darksecret") {
	// 	console.log(descBlockLines.join("")
	// 		.replace(/\$OPTIONS\$/, listCheck(itemData.lists.options))
	// 		.replace(/\$QUESTIONS\$/, listCheck(itemData.lists.questions)));
	// }
	return descBlockLines.join("")
		.replace(/\$OPTIONS\$/, listCheck(itemData.lists.options))
		.replace(/\$QUESTIONS\$/, listCheck(itemData.lists.questions))
		.replace(/<p[^>]*?>\s*\.\s*<\/p>/g, "");

	function attrCheck(text, data, parentItem) {
		const moveName = data.name ?? data.moveName;
		const attrMod = (data.attributemod ?? "0") === "none" ? "0" : data.attributemod ?? "0";
		if (parentItem) {
		// For Advantage/Disadvantage description blocks: Format as 'roll to <moveName> (+Attr)'
			return `${text ?? ""}.`
				.replace(/....attrMod.../, `<span class="item-roll-desc">+${U.tCase(attrMod)}</span>`)
				.replace(/\[\[\[.*\]\]\]/, `<span class="item-move-name">${moveName}</span>`)
				.replace(/<p[^>]*?>\s*\.\s*<\/p>/g, "");
		}
		// Otherwise, format as a straight move, collapsing effect to 'roll +Attribute'.
		return `${text ?? ""}.`
			.replace(/\s*\[\[\[moveName\]\]\]\s*/gui, " ")
			.replace(/roll to.*?\(\+\[\[\[attrMod\]\]\]\)/gui, `<span class="item-roll-desc">roll +${U.tCase(attrMod)}</span>`)
			.replace(/[\[\]]/gu, "")
			.replace(/<p[^>]*?>\s*\.\s*<\/p>/g, "");
	}
}
function resultCheck(result, data, isCheckingSubMove = true) {
	if (!result) { return result }
	return tagWrap("div", [
		subMoveCheck(data),
		centerCheck(result),
		listCheck(result.list),
		/Hold/.test(`${result.text}${JSON.stringify(result.list)}`) && /Hold/.test(`${data.suffix?.text}`)
			? `${tagWrap("p", data.suffix.text)}${listCheck(data.suffix.list)}`
			: ""
	], "item-text")
		.replace(/<p[^>]*?>\s*\.\s*<\/p>/g, "");
}

export {
	PARSERS
};
