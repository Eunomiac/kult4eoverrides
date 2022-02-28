const SAMPLEDATA = {
	move: {
		description: "",
		attributemod: "willpower",
		completesuccess: "Complete Success",
		partialsuccess: "Partial Success",
		failure: "Failure!",
		trigger: "When you",
		specialflag: "1"
	},
	advantage: {
		description: "", // not displayed on system sheet
		type: "active",
		effect: "<p>You have been trained by an intelligence agency to fight in the field.&nbsp;<em>Whenever you enter combat,&nbsp;</em><strong>roll +Violence.</strong></p>\n<p><strong>This Move grants Edges.&nbsp;</strong>You may spend Edges granted by this Move at any time during the scene to perform one of the following actions:</p>\n<ul>\n<li><strong>Take Cover:</strong>&nbsp;Avoid a ranged attack by diving behind an object or person.</li>\n<li><strong>Choke Hold:&nbsp;</strong>Lock a human opponent in a grip they cannot get out of without taking&nbsp;<strong>1 Harm</strong>.</li>\n<li><strong>Disarm:&nbsp;</strong>Remove an opponent's weapon in close combat.</li>\n<li><strong>Improvised Weapon:&nbsp;</strong>Execute a lethal, close-combat attack with a seemingly innocuous object (Surprise Strike [2], [Distance: arm])</li>\n</ul>",
		completesuccess: "<p style=\"text-align: center;\">Gain&nbsp;<strong>3 Edges</strong>.</p>",
		partialsuccess: "<p style=\"text-align: center;\">Gain <strong>2 Edges</strong>.</p>",
		failure: "<p>Gain<strong> 1 Edge</strong>, but you've made a bad call: <strong>The GM makes a Move</strong>.</p>",
		attributemod: "violence",
		tokens: 3, // Edges
		hasTokens: true
	},
	disadvantage: {
		description: "",
		type: "active",
		effect: "<p>The Effect paragraph.</p>",
		completesuccess: "<p>Complete Success text</p>",
		partialsuccess: "<p>Partial Success text</p>",
		failure: "<p>Failure text</p>",
		attributemod: "reason",
		tokens: 2,
		hasTokens: true
	},
	weapon: {
		description: "", // not used: USE FOR CLASSIFICATION TAGS: 'firearm', 'firearm,scope', 'melee,bludgeoning','melee,sword'
		harm: 3,
		range: "arm",
		ammo: {
			value: 2,
			min: 0,
			max: 5
		},
		special: "<p>Special text</p>"
	},
	darksecret: {
		description: "<p>Description text</p>",
		effect: ""
	},
	relationship: {
		target: "Cassandra",
		strength: 2
	},
	gear: {
		uses: "",
		description: "<p>Description paragraph</p>",
		ammo: {
			value: "2",
			max: 4
		}
	}
};

const JSONDATA = [
	{
		name: "Academic Network",
		itemType: "advantage",
		type: "active",
		moveName: "Tap Academic Network",
		notes: null,
		clock: null,
		trigger: "When it would be useful to know someone at a university,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You have academic contacts at universities around the world.",
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "provide the person’s name, field of study, and how you got to know one another, then <span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "The person is a friend (Relation +1).",
				list: null
			},
			partial: {
				text: "The person is an acquaintance (Relation +0).",
				list: null
			},
			fail: {
				text: "You know one another, but there is an old enmity between the two of you (Relation +0).",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Access the Dark Net",
		itemType: "advantage",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you search the Dark Net for forbidden information, rare items, or myths,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "perception",
		rollPhrase: "<span class='roll-desc'>roll +Perception</span>:",
		results: {
			success: {
				text: "You discover what you’re looking for, and may also choose one option:",
				list: "|You discover a portal to another dimension, and a path you can trace back to it later.|You make contact with someone – or something – who can help you, for the right price.|You find something valuable or important, in addition to what you were looking for. The GM will tell you what it is."
			},
			partial: {
				text: "You find what you’re looking for, but you’re also exposed to repulsive and frightening stimuli. You must Keep it Together to see how it affects you.",
				list: null
			},
			fail: {
				text: "You find what you’re after, but also contact something very dangerous. It might attempt to latch onto you or follow you back into reality. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Ace up the Sleeve",
		itemType: "advantage",
		type: "active",
		moveName: "Pull an Ace",
		notes: null,
		clock: null,
		trigger: "Whenever someone’s got you up against the wall or in a tight spot,",
		lists: {
			questions: null,
			options: null,
			edges: "|You have a small, concealed lethal weapon (stiletto or similar), which you can produce unnoticed.|You realize your opponent has a weakness you can exploit (take +2 to your next roll, if it involves exploiting the weakness). Ask the GM what it is.|You spot a way out. Ask the GM what it is. Take +2 to your next roll to make use of it."
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "coolness",
		rollPhrase: "<span class='roll-desc'>roll +Coolness</span>:",
		results: {
			success: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|You have a small, concealed lethal weapon (stiletto or similar), which you can produce unnoticed.|You realize your opponent has a weakness you can exploit (take +2 to your next roll, if it involves exploiting the weakness). Ask the GM what it is.|You spot a way out. Ask the GM what it is. Take +2 to your next roll to make use of it."
			},
			partial: {
				text: "Get 1 Edge. You may spend it at any time during the scene.",
				list: "|You have a small, concealed lethal weapon (stiletto or similar), which you can produce unnoticed.|You realize your opponent has a weakness you can exploit (take +2 to your next roll, if it involves exploiting the weakness). Ask the GM what it is.|You spot a way out. Ask the GM what it is. Take +2 to your next roll to make use of it."
			},
			fail: {
				text: "Get 1 Edge, but the situation is worse than you imagined. The GM makes a Move.",
				list: "|You have a small, concealed lethal weapon (stiletto or similar), which you can produce unnoticed.|You realize your opponent has a weakness you can exploit (take +2 to your next roll, if it involves exploiting the weakness). Ask the GM what it is.|You spot a way out. Ask the GM what it is. Take +2 to your next roll to make use of it."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Analyst",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you Investigate something,",
		lists: {
			questions: "|Which organizations, groups, or people of interest may be connected to this?|Is there a connection between this and another event?|What could a plausible motive be?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "you may also choose from these additional questions: $QUESTIONS$"
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Animal Speaker",
		itemType: "advantage",
		type: "active",
		moveName: "Control Animal",
		notes: null,
		clock: null,
		trigger: "Whenever you attempt to control an animal,",
		lists: {
			questions: null,
			options: "|Make the animal go against its instincts.|Make the animal follow you.|Make the animal protect you against an attacker.",
			edges: null
		},
		description: {
			"intro": "You are able to understand and control animals.",
			"static": null
		},
		attributemod: "intuition",
		rollPhrase: "<span class='roll-desc'>roll +Intuition</span>:",
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Arcane Researcher",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you venture into alternate planes of existence or meet entities from other dimensions,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "you may declare that you have read about this dimension or creature before. Ask the GM what you learned from your past studies."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Artifact",
		itemType: "advantage",
		type: "active",
		moveName: "Activate Artifact",
		notes: null,
		clock: null,
		trigger: "Whenever you activate the object,",
		lists: {
			questions: null,
			options: "|See the true form of a creature or location.|Receive a vision of what threatens you.|Get yourself out of a bind.|Call on the entity bound to the artifact and bargain with them.",
			edges: null
		},
		description: {
			"intro": "You own a seemingly mundane item, which actually possesses mystical powers. Its powers can be activated through certain methods, such as infusing it with blood or whispering forbidden words (you decide what is required). Work with the GM to devise a list of options appropriate to the artifact, using this list as an example: $OPTIONS$",
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
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
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Artistic Talent",
		itemType: "advantage",
		type: "active",
		moveName: "Perform",
		notes: null,
		clock: null,
		trigger: "Whenever you perform your chosen art form or show your works to an audience,",
		lists: {
			questions: null,
			options: "|They want to see more of your art.|They are affected by the emotion you wanted to convey (e.g., anger, sorrow, fear, joy, lust, etc).|They look up to you (take +1 ongoing with the audience during this scene).|Their attention is fixed entirely on you throughout your performance.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span> to influence your audience at any time during the scene:",
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "At any Cost",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you truly desire something,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "you may take +2 to a roll by decreasing Stability (−2)."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Authority",
		itemType: "advantage",
		type: "active",
		moveName: "Check: Authority",
		notes: null,
		clock: null,
		trigger: "At the beginning of each game session,",
		lists: {
			questions: null,
			options: "|Influence someone who has heard of your authority in your academic field, as if you had rolled a (15+).|Gain access to a university’s resources, such as their facilities, researchers, or scientific archives.|Make a statement about something or someone in mass media.|Gain access to people or places under the pretense of engaging in your research or studies.",
			edges: null
		},
		description: {
			"intro": "You’re an academic authority in your field and a well-known name in newspapers, debate shows, and scientific journals.",
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "During this game session, choose up to three options.",
				list: "|Influence someone who has heard of your authority in your academic field, as if you had rolled a (15+).|Gain access to a university’s resources, such as their facilities, researchers, or scientific archives.|Make a statement about something or someone in mass media.|Gain access to people or places under the pretense of engaging in your research or studies."
			},
			partial: {
				text: "During this game session, choose up to two options.",
				list: "|Influence someone who has heard of your authority in your academic field, as if you had rolled a (15+).|Gain access to a university’s resources, such as their facilities, researchers, or scientific archives.|Make a statement about something or someone in mass media.|Gain access to people or places under the pretense of engaging in your research or studies."
			},
			fail: {
				text: "During this game session you may choose one option, but you also attract unwanted attention like stalkers, professional adversaries, competitors, or hostile forces. The GM makes a Move for them at some point during the session.",
				list: "|Influence someone who has heard of your authority in your academic field, as if you had rolled a (15+).|Gain access to a university’s resources, such as their facilities, researchers, or scientific archives.|Make a statement about something or someone in mass media.|Gain access to people or places under the pretense of engaging in your research or studies."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Awe-Inspiring",
		itemType: "advantage",
		type: "active",
		moveName: "Take Charge",
		notes: null,
		clock: null,
		trigger: "Whenever you make a show of being the boss,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "People around you accept you as their leader and listen to you. Take +1 ongoing against people in this scene.",
				list: null
			},
			partial: {
				text: "People feel you’re leadership material and show you respect. Choose one of them, in particular, who goes along with what you think. You have +1 ongoing against them during this scene.",
				list: null
			},
			fail: {
				text: "People feel like you’re the leader, but one of them tries to challenge you for it. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Backstab",
		itemType: "advantage",
		type: "active",
		moveName: "Backstab",
		notes: null,
		clock: null,
		trigger: "Whenever you attack someone who’s unprepared for it,",
		lists: {
			questions: null,
			options: "|Aim for the sensitive parts: Deal +1 Harm.|Knock out: The NPC is rendered unconcious. PCs roll to Endure Injury and become neutralized on a (–9).|Careful: You act soundlessly and, if your victim dies, you leave no clues or traces behind.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "coolness",
		rollPhrase: "<span class='roll-desc'>roll +Coolness</span>:",
		results: {
			success: {
				text: "Choose two options.",
				list: "|Aim for the sensitive parts: Deal +1 Harm.|Knock out: The NPC is rendered unconcious. PCs roll to Endure Injury and become neutralized on a (–9).|Careful: You act soundlessly and, if your victim dies, you leave no clues or traces behind."
			},
			partial: {
				text: "Choose one option.",
				list: "|Aim for the sensitive parts: Deal +1 Harm.|Knock out: The NPC is rendered unconcious. PCs roll to Endure Injury and become neutralized on a (–9).|Careful: You act soundlessly and, if your victim dies, you leave no clues or traces behind."
			},
			fail: {
				text: "You expose your betrayal and your target gets to react to your attack as usual. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Battlefield Medicine",
		itemType: "advantage",
		type: "active",
		moveName: "Stabilize Injury",
		notes: null,
		clock: null,
		trigger: "Whenever you stabilize an injured person’s wounds, even if you don’t have access to medical equipment,",
		lists: {
			questions: null,
			options: "|Improvisation: You stabilize one Wound without access to medical equipment.|Effective: You stabilize two Wounds instead of one.|Careful: The wound stabilizes and will heal much faster than normal.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
		results: {
			success: {
				text: "Choose two options.",
				list: "|Improvisation: You stabilize one Wound without access to medical equipment.|Effective: You stabilize two Wounds instead of one.|Careful: The wound stabilizes and will heal much faster than normal."
			},
			partial: {
				text: "You may choose one option. However, you must also choose one complication:",
				list: "|You leave cosmetic scars or defects (the patient loses Stability (−2).|There are lingering side effects (−1 to all rolls the wound could feasibly affect until it’s fully healed).|The patient remains knocked out until the GM determines that they awaken."
			},
			fail: {
				text: "You stabilize the wound, even without access to medical equipment, but there are also unexpected and potentially dangerous consequences, such as infections, healing deformities, or other serious side effects. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Body Awareness",
		itemType: "advantage",
		type: "active",
		moveName: "Perform Feat of Agility",
		notes: null,
		clock: null,
		trigger: "Whenever you perform acrobatic or agile feats,",
		lists: {
			questions: null,
			options: "|Escape bindings or restraints.|Get past an obstacle (creature or object).|Get into or make it through a space you normally wouldn’t be able to.",
			edges: null
		},
		description: {
			"intro": "Your body and mind are as one.",
			"static": null
		},
		attributemod: "perception",
		rollPhrase: "<span class='roll-desc'>roll +Perception</span>:",
		results: {
			success: {
				text: "Choose one option.",
				list: "|Escape bindings or restraints.|Get past an obstacle (creature or object).|Get into or make it through a space you normally wouldn’t be able to."
			},
			partial: {
				text: "Choose one option, but you expose yourself to danger or incur a cost.",
				list: "|Escape bindings or restraints.|Get past an obstacle (creature or object).|Get into or make it through a space you normally wouldn’t be able to."
			},
			fail: {
				text: "Choose one option, but something goes very wrong. The GM makes a Move.",
				list: "|Escape bindings or restraints.|Get past an obstacle (creature or object).|Get into or make it through a space you normally wouldn’t be able to."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Boss",
		itemType: "advantage",
		type: "active",
		moveName: "Deploy Henchmen",
		notes: null,
		clock: null,
		trigger: "Whenever you send your henchmen to do a risky job,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You have five to ten criminal henchmen who are loyal to you, usually for as long as you continue paying them.",
			"static": null
		},
		attributemod: "coolness",
		rollPhrase: "<span class='roll-desc'>roll +Coolness</span>:",
		results: {
			success: {
				text: "They follow your orders and everything goes according to plan.",
				list: null
			},
			partial: {
				text: "They follow your orders, but GM picks one option:",
				list: "|Someone got into trouble.|The job isn’t done, and needs something else to be completed.|There will be repercussions later on."
			},
			fail: {
				text: "The GM decides what went wrong, and whether it’s immediately evident or will become apparent later on. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Bound",
		itemType: "advantage",
		type: "active",
		moveName: "Check: Bound",
		notes: null,
		clock: null,
		trigger: "At the start of each game session,",
		lists: {
			questions: null,
			options: "|See the true form of a creature or location.|Disperse magic targeting you.|Call on the entity.",
			edges: null
		},
		description: {
			"intro": "You are bound to an extradimensional entity whose powers you can draw upon. Explain what you think it is.",
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Burglar",
		itemType: "advantage",
		type: "active",
		moveName: "Burgle",
		notes: null,
		clock: null,
		trigger: "Whenever you make use of your expertise in breaking and entering,",
		lists: {
			questions: null,
			options: "|You silently open a locked door within a few moments.|You neutralize an alarm.|You bust a lockbox or safe in less than two minutes.|You avoid being discovered by someone.|Trick someone into believing you belong here (e.g., pretend you’re a security guard) for a limited time.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "coolness",
		rollPhrase: "<span class='roll-desc'>roll +Coolness</span>:",
		results: {
			success: {
				text: "Get three options. You may spend them any time during the scene.",
				list: "|You silently open a locked door within a few moments.|You neutralize an alarm.|You bust a lockbox or safe in less than two minutes.|You avoid being discovered by someone.|Trick someone into believing you belong here (e.g., pretend you’re a security guard) for a limited time."
			},
			partial: {
				text: "Get two options. You may spend them any time during the scene.",
				list: "|You silently open a locked door within a few moments.|You neutralize an alarm.|You bust a lockbox or safe in less than two minutes.|You avoid being discovered by someone.|Trick someone into believing you belong here (e.g., pretend you’re a security guard) for a limited time."
			},
			fail: {
				text: "Get one option, but a problem arises. The GM makes a Move.",
				list: "|You silently open a locked door within a few moments.|You neutralize an alarm.|You bust a lockbox or safe in less than two minutes.|You avoid being discovered by someone.|Trick someone into believing you belong here (e.g., pretend you’re a security guard) for a limited time."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Chameleon",
		itemType: "advantage",
		type: "active",
		moveName: "Alter Appearance",
		notes: null,
		clock: null,
		trigger: "Whenever you imitate another’s appearance or conceal your own identity to trick someone,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "intuition",
		rollPhrase: "<span class='roll-desc'>roll +Intuition</span>:",
		results: {
			success: {
				text: "Your disguise is convincing, as long as you keep the act going.",
				list: null
			},
			partial: {
				text: "You manage to trick everyone who doesn’t examine you in detail, but choose one complication:",
				list: "|You can’t keep this deception up for very long. You must act fast, if you don’t want to risk getting exposed.|You leave traces and clues behind, which can be connected to you later on."
			},
			fail: {
				text: "Your disguise is only effective at a distance. If you attract any attention to yourself, you will be exposed.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Character Actor",
		itemType: "advantage",
		type: "active",
		moveName: "Blend In",
		notes: null,
		clock: null,
		trigger: "Whenever you try to blend into a place or crowd by adapting your appearance and behavior to the others present,",
		lists: {
			questions: null,
			options: "|Placate someone who is becoming suspicious.|Get access to a place outsiders aren’t allowed to go.|Get someone to tell you about this place’s secrets.|Get someone’s assistance with something here.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "intuition",
		rollPhrase: "<span class='roll-desc'>roll +Intuition</span>:",
		results: {
			success: {
				text: "Choose three options. You may save up to two for later.",
				list: "|Placate someone who is becoming suspicious.|Get access to a place outsiders aren’t allowed to go.|Get someone to tell you about this place’s secrets.|Get someone’s assistance with something here."
			},
			partial: {
				text: "Choose two options. You may save one for later.",
				list: "|Placate someone who is becoming suspicious.|Get access to a place outsiders aren’t allowed to go.|Get someone to tell you about this place’s secrets.|Get someone’s assistance with something here."
			},
			fail: {
				text: "Choose one option, but things don’t go according to plan. The GM makes a Move.",
				list: "|Placate someone who is becoming suspicious.|Get access to a place outsiders aren’t allowed to go.|Get someone to tell you about this place’s secrets.|Get someone’s assistance with something here."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Charismatic Aura",
		itemType: "advantage",
		type: "active",
		moveName: "Radiate Charisma",
		notes: null,
		clock: null,
		trigger: "Whenever your aura is truly noticeable,",
		lists: {
			questions: null,
			options: "|Catch a stranger’s attention. They become curious and approach you.|Change a person’s disposition towards you from either aggressive to suspicious, suspicious to neutral, or neutral to positive.|Make opponents perceive you as harmless and ignore you for as long as you remain in the background and do not act against them.",
			edges: null
		},
		description: {
			"intro": "You radiate an aura that makes people trust you and seek your company.",
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
		results: {
			success: {
				text: "Choose two separate options.",
				list: "|Catch a stranger’s attention. They become curious and approach you.|Change a person’s disposition towards you from either aggressive to suspicious, suspicious to neutral, or neutral to positive.|Make opponents perceive you as harmless and ignore you for as long as you remain in the background and do not act against them."
			},
			partial: {
				text: "Choose one option.",
				list: "|Catch a stranger’s attention. They become curious and approach you.|Change a person’s disposition towards you from either aggressive to suspicious, suspicious to neutral, or neutral to positive.|Make opponents perceive you as harmless and ignore you for as long as you remain in the background and do not act against them."
			},
			fail: {
				text: "Choose one option, but you also attract unwanted attention. The GM makes a Move.",
				list: "|Catch a stranger’s attention. They become curious and approach you.|Change a person’s disposition towards you from either aggressive to suspicious, suspicious to neutral, or neutral to positive.|Make opponents perceive you as harmless and ignore you for as long as you remain in the background and do not act against them."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Code of Honor",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you take risks or make sacrifices for your code of honor,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You abide by a strict code of honor. Decide its nature when you take this Advantage.",
			"static": "gain Stability (+1)."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Collector",
		itemType: "advantage",
		type: "active",
		moveName: "Seek Rare Item",
		notes: null,
		clock: null,
		trigger: "Whenever you search for an unusual or rare item,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
		results: {
			success: {
				text: "You know exactly where the item is, how to acquire it, and how to minimize hazards, obstacles, and/or costs.",
				list: null
			},
			partial: {
				text: "You know roughly where it is and what hazards, obstacles, and/or costs are associated with acquiring it.",
				list: null
			},
			fail: {
				text: "You know roughly where to start searching for it, but not the hazards or costs involved in pursuing it.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Contagious Insanity",
		itemType: "advantage",
		type: "active",
		moveName: "Spread Madness",
		notes: null,
		clock: null,
		trigger: "Whenever you allow your madness to infect someone you’re speaking with,",
		lists: {
			questions: null,
			options: "|Afflict your victim with a temporary psychosis, in which they are haunted by their fears (NPCs only).|Trigger a Disadvantage within another person (PCs only, roll for the Disadvantage).|Affect an additional victim.|Call for creatures of madness to haunt the infected.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
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
				text: "Your intended victim’s own terrors and Dark Secrets manifest within you, instead. You must Keep it Together.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Crafty",
		itemType: "advantage",
		type: "active",
		moveName: "Pull a Long Con",
		notes: null,
		clock: null,
		trigger: "Whenever you manipulate an NPC in a longer conversation,",
		lists: {
			questions: null,
			options: "|They become suspicious of someone else of your choosing.|They view you as their ally, for as long as you don’t betray them (+1 to all rolls against them).|They willingly do a favor for you.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "intuition",
		rollPhrase: "<span class='roll-desc'>roll +Intuition</span>:",
		results: {
			success: {
				text: "Choose up to two options. You may save one until later during this scene.",
				list: "|They become suspicious of someone else of your choosing.|They view you as their ally, for as long as you don’t betray them (+1 to all rolls against them).|They willingly do a favor for you."
			},
			partial: {
				text: "Choose one option.",
				list: "|They become suspicious of someone else of your choosing.|They view you as their ally, for as long as you don’t betray them (+1 to all rolls against them).|They willingly do a favor for you."
			},
			fail: {
				text: "They’re on to you. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Crime Scene Investigator",
		itemType: "advantage",
		type: "active",
		moveName: "Investigate Crime Scene",
		notes: null,
		clock: null,
		trigger: "Whenever you investigate a crime scene,",
		lists: {
			questions: "|What was the chain of events?|What can I assume about the perpetrator?|Which mistakes did the perpetrator make?|When was the crime committed?|When was someone here last?|Does the crime remind me of something I am familiar with already and, if so, what?|Who might know more about the crime?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Cult Leader",
		itemType: "advantage",
		type: "active",
		moveName: "Lead Ritual",
		notes: null,
		clock: null,
		trigger: "Whenever you and your followers perform a ritual,",
		lists: {
			questions: null,
			options: "|a vision of a creature’s true form.|a vision of a portal between dimensions.|a vision of the cult’s enemies.|a vision of an object's purpose.|a vision revealing your deity’s wishes (take +1 to all rolls while fulfilling their wishes).",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
		results: {
			success: {
				text: "Choose to receive up to three visions from the list below.",
				list: "|a vision of a creature’s true form.|a vision of a portal between dimensions.|a vision of the cult’s enemies.|a vision of an object's purpose.|a vision revealing your deity’s wishes (take +1 to all rolls while fulfilling their wishes)."
			},
			partial: {
				text: "Choose to receive up to two visions from the list below.",
				list: "|a vision of a creature’s true form.|a vision of a portal between dimensions.|a vision of the cult’s enemies.|a vision of an object's purpose.|a vision revealing your deity’s wishes (take +1 to all rolls while fulfilling their wishes)."
			},
			fail: {
				text: "Choose one vision, but the Illusion tears as a result. You may temporarily be transported into another dimension, attract a demonic being’s attention, or receive a horrifying omen. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Dabbler in the Occult",
		itemType: "advantage",
		type: "active",
		moveName: "Perform Ritual",
		notes: null,
		clock: null,
		trigger: "Whenever you attempt to perform a magical ritual from a set of instructions,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You know a little of magical rituals, but have never gone beyond performing written instructions.",
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
		results: {
			success: {
				text: "You perform every step correctly; the ritual works as intended.",
				list: null
			},
			partial: {
				text: "You make a minor error. The GM chooses one complication:",
				list: "|You do not have working protection against the forces or entities the ritual summons.|The effects of the ritual are slightly different than what you had imagined.|The ritual summons unexpected entities or forces."
			},
			fail: {
				text: "You misunderstand the scripture and perform the ritual with no control whatsoever over the resulting outcome. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Daredevil",
		itemType: "advantage",
		type: "active",
		moveName: "Enter Danger",
		notes: null,
		clock: null,
		trigger: "Whenever you’re entering a dangerous situation,",
		lists: {
			questions: null,
			options: null,
			edges: "|Keep your eyes open: Discover a threat before it discovers you.|Get out of the way: Avoid an attack.|Get the jump on them: Harm your opponent before they can react."
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "perception",
		rollPhrase: "<span class='roll-desc'>roll +Perception</span>:",
		results: {
			success: {
				text: "Choose three Edges. You may spend them anytime during the scene.",
				list: "|Keep your eyes open: Discover a threat before it discovers you.|Get out of the way: Avoid an attack.|Get the jump on them: Harm your opponent before they can react."
			},
			partial: {
				text: "Choose two Edges. You may spend them anytime during the scene.",
				list: "|Keep your eyes open: Discover a threat before it discovers you.|Get out of the way: Avoid an attack.|Get the jump on them: Harm your opponent before they can react."
			},
			fail: {
				text: "Choose one Edge, but you are in over your head. The GM makes a Move.",
				list: "|Keep your eyes open: Discover a threat before it discovers you.|Get out of the way: Avoid an attack.|Get the jump on them: Harm your opponent before they can react."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Data Retrieval",
		itemType: "advantage",
		type: "active",
		moveName: "Perform Research",
		notes: null,
		clock: null,
		trigger: "Whenever you look for information on a subject in a library, research archive, or on the Internet,",
		lists: {
			questions: "|What is its origin?|What is it meant for?|How does it work?|What do I have to watch out for?|How can I stop or destroy this? 110",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>. In response to the inquiries you make, the GM will tell you what you uncover, in as much detail as can be expected from the source you have utilized:",
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Dead Shot",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: null,
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are a seasoned marksman.",
			"static": "Any Harm you deal with a firearm is considered +1 Harm."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Deadly Stare",
		itemType: "advantage",
		type: "active",
		moveName: "Death Stare",
		notes: null,
		clock: null,
		trigger: "Whenever you find yourself in a charged situation,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "<span class='roll-desc'>roll +Violence</span>:",
		results: {
			success: {
				text: "You make eye contact with an NPC, causing them to freeze up and be unable to take any actions until you break eye contact. You also get +2 ongoing against your target.",
				list: null
			},
			partial: {
				text: "You make eye contact with an NPC, causing them to freeze up and be unable to take any actions until you break eye contact.",
				list: null
			},
			fail: {
				text: "Your opponents see you as their primary threat.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Death Drive",
		itemType: "advantage",
		type: "active",
		moveName: "Fight Recklessly",
		notes: null,
		clock: null,
		trigger: "Whenever you fight with no regard for your personal safety,",
		lists: {
			questions: null,
			options: null,
			edges: "|Eager: Engage an additional hostile in Combat.|Vicious: deal +2 Harm with one attack.|Frantic: get within reach to attack a hostile.|Reckless: frighten your opponents by laughing into the face of death (+1 ongoing during the fight)."
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "<span class='roll-desc'>roll +Violence</span>:",
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Eager: Engage an additional hostile in Combat.|Vicious: deal +2 Harm with one attack.|Frantic: get within reach to attack a hostile.|Reckless: frighten your opponents by laughing into the face of death (+1 ongoing during the fight)."
			},
			partial: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Eager: Engage an additional hostile in Combat.|Vicious: deal +2 Harm with one attack.|Frantic: get within reach to attack a hostile.|Reckless: frighten your opponents by laughing into the face of death (+1 ongoing during the fight)."
			},
			fail: {
				text: "Get 1 Edge, but afterwards you discover you have been injured without noticing it (Endure Injury; the GM determines the amount of Harm based on who attacked you and how).",
				list: "|Eager: Engage an additional hostile in Combat.|Vicious: deal +2 Harm with one attack.|Frantic: get within reach to attack a hostile.|Reckless: frighten your opponents by laughing into the face of death (+1 ongoing during the fight)."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Desperate",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you try to make it through overwhelming odds,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "take +1 on all rolls until you’re clear of the threat."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Divine Champion",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you fight your deity’s enemies or fight to protect a sacred object,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "you do +1 Harm and take +1 to Endure Injury. However, if you lose the a battle, your deity becomes irate: You take −1 ongoing to all actions related to your deity until you have atoned for your failure."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Divine",
		itemType: "advantage",
		type: "active",
		moveName: "Sway Monster",
		notes: null,
		clock: null,
		trigger: "Whenever you encounter a monstrous creature,",
		lists: {
			questions: null,
			options: "|Soothe an aggressive creature.|Command the creature and force it to obey your order.",
			edges: null
		},
		description: {
			"intro": "There is something about you that reminds your former servants of what you truly are.",
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Dreamer",
		itemType: "advantage",
		type: "active",
		moveName: "Lucid Dream",
		notes: null,
		clock: null,
		trigger: "Whenever you want to meet someone or find out the truth about something in the Dream,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are a talented, self-taught dream wanderer.",
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
		results: {
			success: {
				text: "You meet the intended person or arrive at the specific place in the Dream.",
				list: null
			},
			partial: {
				text: "You meet the intended person, or arrive at the specific place. However, some element has changed, or something followed you or the person in question.",
				list: null
			},
			fail: {
				text: "You are lost in the Dream and cannot wake up until you find your way back.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Driver",
		itemType: "advantage",
		type: "active",
		moveName: "Drive Dangerously",
		notes: null,
		clock: null,
		trigger: "Whenever you drive your vehicle under pressure and in dangerous situations,",
		lists: {
			questions: null,
			options: null,
			edges: "|Make a risky maneuver to get out of the way.|Shake off one pursuing vehicle.|Use your vehicle as a weapon against a pedestrian (2/3/4 Harm depending on speed).|Sideswipe another vehicle off the road."
		},
		description: {
			"intro": "You are a trained professional at operating motor vehicles (car or motorcycle).",
			"static": null
		},
		attributemod: "coolness",
		rollPhrase: "<span class='roll-desc'>roll +Coolness</span>:",
		results: {
			success: {
				text: "Gain 3 Edges. You may spend them anytime during the scene.",
				list: "|Make a risky maneuver to get out of the way.|Shake off one pursuing vehicle.|Use your vehicle as a weapon against a pedestrian (2/3/4 Harm depending on speed).|Sideswipe another vehicle off the road."
			},
			partial: {
				text: "Gain 2 Edges. You may spend them anytime during the scene.",
				list: "|Make a risky maneuver to get out of the way.|Shake off one pursuing vehicle.|Use your vehicle as a weapon against a pedestrian (2/3/4 Harm depending on speed).|Sideswipe another vehicle off the road."
			},
			fail: {
				text: "Gain 1 Edge to spend any time during the scene, but the situation worsens somehow – maybe you speed past a police car, additional vehicles start pursuing you, or you or your vehicle is damaged. The GM makes a Move.",
				list: "|Make a risky maneuver to get out of the way.|Shake off one pursuing vehicle.|Use your vehicle as a weapon against a pedestrian (2/3/4 Harm depending on speed).|Sideswipe another vehicle off the road."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Elite Education",
		itemType: "advantage",
		type: "active",
		moveName: "Request a Favor",
		notes: null,
		clock: null,
		trigger: "Whenever you ask your contacts for a favor,",
		lists: {
			questions: null,
			options: "|Gain a favor from a country’s administration (e.g., released from jail, skip a customs check, or get help from the police).|Gain access to a location unavailable to the public.|Locate or track a hidden or missing person.|Receive both the means to escape and a safe hiding spot.",
			edges: null
		},
		description: {
			"intro": "You have attended one of the world’s most prestigious institutes of higher learning and have acquired contacts with power and influence.",
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "Choose up to three options.",
				list: "|Gain a favor from a country’s administration (e.g., released from jail, skip a customs check, or get help from the police).|Gain access to a location unavailable to the public.|Locate or track a hidden or missing person.|Receive both the means to escape and a safe hiding spot."
			},
			partial: {
				text: "Choose up to two options.",
				list: "|Gain a favor from a country’s administration (e.g., released from jail, skip a customs check, or get help from the police).|Gain access to a location unavailable to the public.|Locate or track a hidden or missing person.|Receive both the means to escape and a safe hiding spot."
			},
			fail: {
				text: "Choose one option, but you’ve become indebted to someone. The debt can be called in during the story, whenever the GM chooses.",
				list: "|Gain a favor from a country’s administration (e.g., released from jail, skip a customs check, or get help from the police).|Gain access to a location unavailable to the public.|Locate or track a hidden or missing person.|Receive both the means to escape and a safe hiding spot."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Elite Sport (Athletic)",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When running, throwing or catching objects,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You’ve competed professionally in an athletic sport (baseball, football, tennis, etc.), through which you have developed your physical capabilities.",
			"static": "you take +1 ongoing to all relevant rolls."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Elite Sport (Contact)",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you Endure Injury against a close combat attack,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You’ve competed professionally in a contact sport (e.g. ice hockey, football), through which you have learned to take a hit.",
			"static": "take +1 to your roll."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Elite Sport (Fencing)",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When using swords,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You’ve competed professionally in fencing, and know how to wield a sword.",
			"static": "you can make the attack {Riposte [3], [Distance: arm, attack immediately after parrying]}, and you have a rapier {[Stabbing weapon]} at home."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Endure Trauma",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you reduce Stability,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are not as easily affected by trauma as others.",
			"static": "you always lose 1 fewer level than normal."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Enforcer",
		itemType: "advantage",
		type: "active",
		moveName: "Threaten Other",
		notes: null,
		clock: null,
		trigger: "Whenever you credibly threaten someone directly or suggestively,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "<span class='roll-desc'>roll +Violence</span>:",
		results: {
			success: {
				text: "They must decide to either do what you want or defy you with the knowledge that you can execute your threat.",
				list: null
			},
			partial: {
				text: "You must give them a third option. Choose one:",
				list: "|They offer you something they think you’d rather have.|Retreat from the scene.|They are terrorized; you have +1 ongoing on all rolls against them until they’ve proven they’re not afraid of you.|They attack you from a disadvantaged position. You take +2 on your roll to Engage in Combat if you counterattack."
			},
			fail: {
				text: "Turns out you didn’t have the advantage you thought you did. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Enhanced Awareness",
		itemType: "advantage",
		type: "active",
		moveName: "Focus on the Illusion",
		notes: null,
		clock: null,
		trigger: "When you focus your senses at a location where the Illusion is weak,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>. (15+) You can discern clear details regarding the location, and may be able to speak to entities tied to it. (10–14) You get some basic impressions regarding the location. (–9) The Illusion tears. The veil is lifted temporarily, revealing an alternate dimension – the GM determines which one. The PC could be sucked into it or something may cross over into our reality. The GM makes a Move.:",
		results: {
			success: {
				text: "You can discern clear details regarding the location, and may be able to speak to entities tied to it.",
				list: null
			},
			partial: {
				text: "You get some basic impressions regarding the location.",
				list: null
			},
			fail: {
				text: "The Illusion tears. The veil is lifted temporarily, revealing an alternate dimension – the GM determines which one. The PC could be sucked into it or something may cross over into our reality. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Erotic",
		itemType: "advantage",
		type: "active",
		moveName: "Incite Desire",
		notes: null,
		clock: null,
		trigger: "Whenever you make moves to attract an NPC to you,",
		lists: {
			questions: null,
			options: "|The person must have you, and will abandon their normally reasonable behavior to do so.|The person is distracted by you for as long as you’re in the vicinity, unable to concentrate on anything else.|The person becomes jealous of anyone competing for your attention, and tries to dispose of them by any means necessary.|You make them uncertain and confused. You take +1 ongoing against them during this scene.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "Choose up to three options any time during this scene.",
				list: "|The person must have you, and will abandon their normally reasonable behavior to do so.|The person is distracted by you for as long as you’re in the vicinity, unable to concentrate on anything else.|The person becomes jealous of anyone competing for your attention, and tries to dispose of them by any means necessary.|You make them uncertain and confused. You take +1 ongoing against them during this scene."
			},
			partial: {
				text: "Choose up to two options any time during this scene.",
				list: "|The person must have you, and will abandon their normally reasonable behavior to do so.|The person is distracted by you for as long as you’re in the vicinity, unable to concentrate on anything else.|The person becomes jealous of anyone competing for your attention, and tries to dispose of them by any means necessary.|You make them uncertain and confused. You take +1 ongoing against them during this scene."
			},
			fail: {
				text: "Choose one option any time during this scene, but the nature of the attraction is different than you had hoped. The GM makes a Move.",
				list: "|The person must have you, and will abandon their normally reasonable behavior to do so.|The person is distracted by you for as long as you’re in the vicinity, unable to concentrate on anything else.|The person becomes jealous of anyone competing for your attention, and tries to dispose of them by any means necessary.|You make them uncertain and confused. You take +1 ongoing against them during this scene."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Escape Artist",
		itemType: "advantage",
		type: "active",
		moveName: "Escape",
		notes: null,
		clock: null,
		trigger: "Whenever you need to escape a dangerous situation,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are a master at slipping away when the shit hits the fan.",
			"static": null
		},
		attributemod: "coolness",
		rollPhrase: "outline your plan and <span class='roll-desc'>roll +Coolness</span>:",
		results: {
			success: {
				text: "You escape without complications.",
				list: null
			},
			partial: {
				text: "You can choose to stay or escape at a cost, such as leaving something important behind or take something traceable with you. The GM decides what it is.",
				list: null
			},
			fail: {
				text: "You are only half out the door when you’re caught in a really bad spot. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Exit Strategy",
		itemType: "advantage",
		type: "active",
		moveName: "Covert Exit",
		notes: null,
		clock: null,
		trigger: "Whenever you have killed someone covertly and leave the scene of the murder,",
		lists: {
			questions: null,
			options: "|You leave the scene of the murder unnoticed and reach a safe spot of your choosing in the vicinity. Describe how.|You have left no clues that can be traced back to you.|The body is well hidden and will not be found for quite some time. 108",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "perception",
		rollPhrase: "<span class='roll-desc'>roll +Perception</span>:",
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Exorcist",
		itemType: "advantage",
		type: "active",
		moveName: "Perform Exorcism",
		notes: null,
		clock: null,
		trigger: "Whenever you perform an exorcism to banish a spirit or extradimensional creature,",
		lists: {
			questions: null,
			options: "|Nobody is harmed during the ritual.|The entity will not reappear later.|The entity will not become hostile toward you.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "explain what the ritual looks like and <span class='roll-desc'>roll +Soul</span>:",
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
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Expert",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you Investigate something associated with one of your chosen fields,",
		lists: {
			questions: null,
			options: "|Archeology|Economics|History|Comparative Literature|Psychology|Sociology|Theology|(Other)",
			edges: null
		},
		description: {
			"intro": "You are an expert in certain fields of knowledge. Choose two areas of expertise when you gain this Advantage: $OPTIONS$",
			"static": "you always get to ask one additional question, regardless of the outcome, and may ask any questions you want."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Explosives Expert",
		itemType: "advantage",
		type: "active",
		moveName: "Build Explosive",
		notes: null,
		clock: null,
		trigger: "Whenever you’re building an improvised bomb under time pressure,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You can build and disarm bombs. If you have enough time and resources, you can build any kind of bomb you like without a roll.",
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
		results: {
			success: {
				text: "You construct a functional bomb.",
				list: null
			},
			partial: {
				text: "The bomb’s blast potential is lower than usual (decrease Harm dealt by −1).",
				list: null
			},
			fail: {
				text: "The bomb is unpredictable. Maybe it doesn’t detonate, detonates prematurely, or it is more powerful and volatile than expected. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Extortionist",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you Read a Person,",
		lists: {
			questions: "|What are you afraid of?|What is precious to you?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "you may choose from these questions in addition to the usual ones: $QUESTIONS$"
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Eye for an Eye",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you suffer a serious or critical injury, name the person you feel is responsible.",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "You get +2 ongoing to all rolls against them, forever. All rolls targeting the person count, but rolls targeting the person’s family, friends, minions, and property only count if the GM feels they’re applicable."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Eye for Detail",
		itemType: "advantage",
		type: "active",
		moveName: "Study Other",
		notes: null,
		clock: null,
		trigger: "Whenever you have had time to study somebody for a while,",
		lists: {
			questions: "|Where are you from?|Are you capable of violence?|How could I seduce or tempt you?|Why are you here?|What are you working on?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "perception",
		rollPhrase: "<span class='roll-desc'>roll +Perception</span>:",
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
				text: "Ask one question from the list below, but you expose your inquisitiveness to the person you’re observing. The GM makes a Move.",
				list: "|Where are you from?|Are you capable of violence?|How could I seduce or tempt you?|Why are you here?|What are you working on?"
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Fascination",
		itemType: "advantage",
		type: "active",
		moveName: "Artful Seduction",
		notes: null,
		clock: null,
		trigger: "Whenever you use your art to seduce an NPC,",
		lists: {
			questions: null,
			options: "|They are attracted to you.|They forget their woes when experiencing your art.|They are totally captivated by your art and forget all about their surrounding environment.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
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
				text: "They are affected by you in a way you didn’t anticipate, or the attraction is uncomfortably strong – you choose. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Fast Talk",
		itemType: "advantage",
		type: "active",
		moveName: "Fast Talk",
		notes: null,
		clock: null,
		trigger: "Whenever you talk to an NPC to get their attention,",
		lists: {
			questions: null,
			options: "|Prevent the NPC from noticing something in her immediate vicinity.|Get the NPC to disclose something important (the GM will provide the details).|Distract the NPC. You take +1 to your next roll against them.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "coolness",
		rollPhrase: "<span class='roll-desc'>roll +Coolness</span>:",
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Field Agent",
		itemType: "advantage",
		type: "active",
		moveName: "Enter Combat",
		notes: null,
		clock: null,
		trigger: "Whenever you enter combat,",
		lists: {
			questions: null,
			options: null,
			edges: "|Take cover: avoid a ranged attack by diving behind an object or a person.|Choke hold: lock a human opponent in a grip they cannot get out of without taking 1 Harm.|Disarm: remove an opponent’s weapon in close combat.|Improvised weapon: execute a lethal, close-combat attack with a seemingly innocuous object (Surprise Strike [2] [Distance: arm])."
		},
		description: {
			"intro": "You have been trained by an intelligence agency to fight in the field.",
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "<span class='roll-desc'>roll +Violence</span>:",
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Take cover: avoid a ranged attack by diving behind an object or a person.|Choke hold: lock a human opponent in a grip they cannot get out of without taking 1 Harm.|Disarm: remove an opponent’s weapon in close combat.|Improvised weapon: execute a lethal, close-combat attack with a seemingly innocuous object (Surprise Strike [2] [Distance: arm])."
			},
			partial: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Take cover: avoid a ranged attack by diving behind an object or a person.|Choke hold: lock a human opponent in a grip they cannot get out of without taking 1 Harm.|Disarm: remove an opponent’s weapon in close combat.|Improvised weapon: execute a lethal, close-combat attack with a seemingly innocuous object (Surprise Strike [2] [Distance: arm])."
			},
			fail: {
				text: "Get 1 Edge, but you have made a bad call. The GM makes a Move.",
				list: "|Take cover: avoid a ranged attack by diving behind an object or a person.|Choke hold: lock a human opponent in a grip they cannot get out of without taking 1 Harm.|Disarm: remove an opponent’s weapon in close combat.|Improvised weapon: execute a lethal, close-combat attack with a seemingly innocuous object (Surprise Strike [2] [Distance: arm])."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Forbidden Inspiration",
		itemType: "advantage",
		type: "active",
		moveName: "Seek Inspiration",
		notes: null,
		clock: null,
		trigger: "Whenever you dive deep into your art and allow yourself to be inspired by the Truth,",
		lists: {
			questions: null,
			options: "|Enticement: Entice an entity to come to you.|Visions: See Through the Illusion into a specific place of your choice.|Inspiration: Ask the GM if there is anything strange or supernatural about the situation you’re in. The answer will be revealed through your art. 114",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
		results: {
			success: {
				text: "Choose two options.",
				list: "|Enticement: Entice an entity to come to you.|Visions: See Through the Illusion into a specific place of your choice.|Inspiration: Ask the GM if there is anything strange or supernatural about the situation you’re in. The answer will be revealed through your art. 114"
			},
			partial: {
				text: "Choose one option.",
				list: "|Enticement: Entice an entity to come to you.|Visions: See Through the Illusion into a specific place of your choice.|Inspiration: Ask the GM if there is anything strange or supernatural about the situation you’re in. The answer will be revealed through your art. 114"
			},
			fail: {
				text: "You have gazed too deeply into the abyss. Choose one option, but you also experience terrifying visions or encounter something horrible. The GM makes a Move.",
				list: "|Enticement: Entice an entity to come to you.|Visions: See Through the Illusion into a specific place of your choice.|Inspiration: Ask the GM if there is anything strange or supernatural about the situation you’re in. The answer will be revealed through your art. 114"
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Forked Tongue",
		itemType: "advantage",
		type: "active",
		moveName: "Manipulate Other",
		notes: null,
		clock: null,
		trigger: "Whenever you manipulate someone,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "Choose one option:",
				list: "|They trust you (PC takes +1 Relation with you).|They’re spellbound by you (take +1 ongoing against them during this scene).|They reveal a weakness, which you can exploit later."
			},
			partial: {
				text: "Choose one option from the list above, but there’s also a complication, chosen by the GM or player:",
				list: "|They see you as a friend they can turn to when in need.|They fall in love with you.|They will feel betrayed, spurned, humiliated, or manipulated whenever you abuse their trust in you."
			},
			fail: {
				text: "They see right through you and will act as they please.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Gang Leader",
		itemType: "advantage",
		type: "active",
		moveName: "Give Orders",
		notes: null,
		clock: null,
		trigger: "Whenever you give your gang orders that are risky and/ or may result in them paying a high price,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You’re the boss of a small gang of criminals.",
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "<span class='roll-desc'>roll +Violence</span>:",
		results: {
			success: {
				text: "They enact your orders without question.",
				list: null
			},
			partial: {
				text: "They do as you want, but there is a complication (choose one):",
				list: "|One of them defies you in front of the others.|They will all be disgruntled for some time."
			},
			fail: {
				text: "Problems arise. Maybe something goes wrong when carrying out your orders, or they doubt your abilities as a leader. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Genius",
		itemType: "advantage",
		type: "active",
		moveName: "Think Fast",
		notes: null,
		clock: null,
		trigger: "Whenever you find yourself in a life-threatening situation,",
		lists: {
			questions: null,
			options: null,
			edges: "|Logical: You realize an effective way to dispose of the threat. Deal +1 Harm whenever you exploit it.|Quick thinker: You realize how to protect yourself from Harm. Treat it as if you’d rolled a (15+) on Avoid Harm whenever you exploit it.|Rational: You realize how to save yourself by sacrificing someone else. Pick the person you utilize to escape the threat."
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span> to see if you can discover a way out:",
		results: {
			success: {
				text: "Choose up to three Edges, useable any time in the scene, while you’re still in danger.",
				list: "|Logical: You realize an effective way to dispose of the threat. Deal +1 Harm whenever you exploit it.|Quick thinker: You realize how to protect yourself from Harm. Treat it as if you’d rolled a (15+) on Avoid Harm whenever you exploit it.|Rational: You realize how to save yourself by sacrificing someone else. Pick the person you utilize to escape the threat."
			},
			partial: {
				text: "Choose up to two Edges, useable any time in the scene, while you’re still in danger.",
				list: "|Logical: You realize an effective way to dispose of the threat. Deal +1 Harm whenever you exploit it.|Quick thinker: You realize how to protect yourself from Harm. Treat it as if you’d rolled a (15+) on Avoid Harm whenever you exploit it.|Rational: You realize how to save yourself by sacrificing someone else. Pick the person you utilize to escape the threat."
			},
			fail: {
				text: "Choose one Edge, but you also attract unwanted attention. The GM makes a Move.",
				list: "|Logical: You realize an effective way to dispose of the threat. Deal +1 Harm whenever you exploit it.|Quick thinker: You realize how to protect yourself from Harm. Treat it as if you’d rolled a (15+) on Avoid Harm whenever you exploit it.|Rational: You realize how to save yourself by sacrificing someone else. Pick the person you utilize to escape the threat."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Good Samaritan",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you help another at your own expense,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "gain Stability (+1)."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Gritted Teeth",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: null,
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "Abuse, violence, self-harm, and assaults have become familiar, and the pain hardly affects you at all anymore.",
			"static": "You suffer no penalties from wounds, whether serious or critical."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Grudge",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When someone directly or indirectly ruins your plans,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "you take +1 ongoing against them until you have taken revenge or received restitution of equal worth to what you lost."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Hacker",
		itemType: "advantage",
		type: "active",
		moveName: "Hack",
		notes: null,
		clock: null,
		trigger: "Whenever you penetrate digital networks in the pursuit of confidential data, crack software, or disable security systems,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
		results: {
			success: {
				text: "You accomplish your task without a problem.",
				list: null
			},
			partial: {
				text: "Complications arise. Choose one option:",
				list: "|Someone discovers the intrusion. You must take risks or compromise on how much you’re able to accomplish.|You leave traces of your intrusion."
			},
			fail: {
				text: "Unbeknownst to you, your intrusion didn’t work out as you wanted. Maybe you didn’t succeed at your task as well as you imagined, or you may have been discovered by personal enemies, law enforcement, or something else lurking in the network. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Hardened",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you Endure Injury,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "take +1 to your roll."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Hunter",
		itemType: "advantage",
		type: "active",
		moveName: "Hunt Other",
		notes: null,
		clock: null,
		trigger: "Whenever you are hunting someone or something,",
		lists: {
			questions: null,
			options: "|Set up an ambush for your enemy (deal your weapon’s Harm).|Camouflage (take +2 to Act Under Pressure while you are hiding).|Move in shadows (take +2 to Avoid Harm dealt with a ranged weapon).",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "perception",
		rollPhrase: "<span class='roll-desc'>roll +Perception</span>:",
		results: {
			success: {
				text: "Get three options. You may spend them anytime during this scene.",
				list: "|Set up an ambush for your enemy (deal your weapon’s Harm).|Camouflage (take +2 to Act Under Pressure while you are hiding).|Move in shadows (take +2 to Avoid Harm dealt with a ranged weapon)."
			},
			partial: {
				text: "Get two options. You may spend them anytime during this scene.",
				list: "|Set up an ambush for your enemy (deal your weapon’s Harm).|Camouflage (take +2 to Act Under Pressure while you are hiding).|Move in shadows (take +2 to Avoid Harm dealt with a ranged weapon)."
			},
			fail: {
				text: "Get one option, but you become the prey. The GM makes a Move.",
				list: "|Set up an ambush for your enemy (deal your weapon’s Harm).|Camouflage (take +2 to Act Under Pressure while you are hiding).|Move in shadows (take +2 to Avoid Harm dealt with a ranged weapon)."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Ice Cold",
		itemType: "advantage",
		type: "active",
		moveName: "Keep Cool",
		notes: null,
		clock: null,
		trigger: "Whenever you are in a violent conflict,",
		lists: {
			questions: null,
			options: null,
			edges: "|Avoid an attack.|Manage to snatch something.|Maneuver into a better position.|Put someone in a bad position (everyone gets +2 to any attack Moves)."
		},
		description: {
			"intro": "You keep your calm and cool, even in the midst of violence and chaos.",
			"static": null
		},
		attributemod: "coolness",
		rollPhrase: "<span class='roll-desc'>roll +Coolness</span>:",
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Avoid an attack.|Manage to snatch something.|Maneuver into a better position.|Put someone in a bad position (everyone gets +2 to any attack Moves)."
			},
			partial: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Avoid an attack.|Manage to snatch something.|Maneuver into a better position.|Put someone in a bad position (everyone gets +2 to any attack Moves)."
			},
			fail: {
				text: "Get 1 Edge, but you attract attention from the hostiles. The GM makes a Move.",
				list: "|Avoid an attack.|Manage to snatch something.|Maneuver into a better position.|Put someone in a bad position (everyone gets +2 to any attack Moves)."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Implanted Messages",
		itemType: "advantage",
		type: "active",
		moveName: "Experiment on Human",
		notes: null,
		clock: null,
		trigger: "Whenever you experiment on a human,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "you may implant an order into them. <span class='roll-desc'>Roll +Soul</span>:",
		results: {
			success: {
				text: "You hold 2 Power over them. For as long as you retain Power over them, they take 1 Serious Wound should they refuse or attempt to go against your order, but this loosens your grip over them by 1 Power. If they fulfill your order, all your remaining Power over them is removed.",
				list: null
			},
			partial: {
				text: "You hold 1 Power over them. For as long as you retain Power over them, they take 1 Serious Wound should they refuse or attempt to go against your order, but this loosens your grip over them by 1 Power. If they fulfill your order, all your remaining Power over them is removed.",
				list: null
			},
			fail: {
				text: "Something goes wrong, such as they get hurt in the process or the order’s outcome is different than what you imagined. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Impostor",
		itemType: "advantage",
		type: "active",
		moveName: "Exploit Rube",
		notes: null,
		clock: null,
		trigger: "Whenever you need money, a safehouse, protection, or other help one of your victims can provide,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You maintain relationships with numerous people who all believe you are their soulmate, yet are unaware of each other.",
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "describe who they are and <span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "They can provide you with whatever you require.",
				list: null
			},
			partial: {
				text: "One of them might be able to help, but it will take some convincing.",
				list: null
			},
			fail: {
				text: "You know someone who can help, but they have already seen through your game. If you want their assistance it will require threats or blackmail to get them to provide it.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Improviser",
		itemType: "advantage",
		type: "active",
		moveName: "Wing It",
		notes: null,
		clock: null,
		trigger: "Whenever you attempt to get out of a dangerous situation by winging it,",
		lists: {
			questions: null,
			options: "|Come up with a convincing lie.|Find something you can use as a makeshift weapon (2 Harm chop/stab/crush).|Hide from a pursuer.|Set a trap that gives you a surprise advantage (+2 to your first attack Move).",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "coolness",
		rollPhrase: "<span class='roll-desc'>roll +Coolness</span>:",
		results: {
			success: {
				text: "Choose two options.",
				list: "|Come up with a convincing lie.|Find something you can use as a makeshift weapon (2 Harm chop/stab/crush).|Hide from a pursuer.|Set a trap that gives you a surprise advantage (+2 to your first attack Move)."
			},
			partial: {
				text: "Choose one option.",
				list: "|Come up with a convincing lie.|Find something you can use as a makeshift weapon (2 Harm chop/stab/crush).|Hide from a pursuer.|Set a trap that gives you a surprise advantage (+2 to your first attack Move)."
			},
			fail: {
				text: "Your improvisation makes the situation worse. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Influential Friends",
		itemType: "advantage",
		type: "active",
		moveName: "Pull Strings",
		notes: null,
		clock: null,
		trigger: "Whenever you need to acquire an object, gain access to a restricted location, or meet a specific person,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You have friends with power and influence.",
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "Your friends can arrange for what you want.",
				list: null
			},
			partial: {
				text: "They can arrange for it, but you have to repay the favor later.",
				list: null
			},
			fail: {
				text: "They arrange for what you want, but you get on a powerful person’s bad side or attract negative publicity. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Inner Power",
		itemType: "advantage",
		type: "active",
		moveName: "Release Power",
		notes: null,
		clock: null,
		trigger: "Whenever you release your inner power,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You harbor a mysterious power, which you do not fully understand. The power can protect you, but you have no control over it.",
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
		results: {
			success: {
				text: "The power attacks all opponents in your vicinity, causing 2 Harm.",
				list: null
			},
			partial: {
				text: "The power attacks your closest opponent, causing 2 Harm.",
				list: null
			},
			fail: {
				text: "The power attacks all living beings, including yourself, in the vicinity, causing 2 Harm.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Instinct",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you Observe a Situation and act on the GM’s answers,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "take +2 instead of +1."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Interrogator",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you Read a Person and mention a name, person, or object,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "you may always ask “Are you lying?” This doesn’t count towards the number of questions you’re allowed to normally ask."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Intimidating",
		itemType: "advantage",
		type: "active",
		moveName: "Intimidate Other",
		notes: null,
		clock: null,
		trigger: "Whenever you’re trying to frighten another person,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "There is something about you that instinctively makes others fear you.",
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "<span class='roll-desc'>roll +Violence</span>:",
		results: {
			success: {
				text: "They succumb to fear and give in to your demands.",
				list: null
			},
			partial: {
				text: "They run away from you or give in to you, GM’s choice.",
				list: null
			},
			fail: {
				text: "They see you as their primary threat and act accordingly. The GM makes a Move for them.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Intuitive",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you Read a Person,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You can sense people’s motives through subconscious readings of their body language, word choices, and behavior.",
			"static": "you may always ask one additional question, regardless of the outcome of your roll."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Inventor",
		itemType: "advantage",
		type: "active",
		moveName: "Create or Repair",
		notes: null,
		clock: null,
		trigger: "Whenever you are about to create or repair something,",
		lists: {
			questions: null,
			options: "|Durable: The construction can be used multiple times and doesn’t break easily.|Effective: The construction confers +1 on rolls where it is used for its intended purpose.|Lethal: The construction causes +1 Harm.|Protective: The construction confers +1 armor.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "explain what you are about to do. The GM will tell you what you need to succeed, and once you have collected these materials, you may <span class='roll-desc'>roll +Reason</span>:",
		results: {
			success: {
				text: "The construction is successful and you may pick two options from below.",
				list: "|Durable: The construction can be used multiple times and doesn’t break easily.|Effective: The construction confers +1 on rolls where it is used for its intended purpose.|Lethal: The construction causes +1 Harm.|Protective: The construction confers +1 armor."
			},
			partial: {
				text: "The construction has minor flaws. You may choose one option from below.",
				list: "|Durable: The construction can be used multiple times and doesn’t break easily.|Effective: The construction confers +1 on rolls where it is used for its intended purpose.|Lethal: The construction causes +1 Harm.|Protective: The construction confers +1 armor."
			},
			fail: {
				text: "You complete the construction or repair, but it has significant flaws, some of which are hidden. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Jaded",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you Keep It Together and the result is a Partial Success,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "you may suppress your emotions and postpone their effects until the next scene."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Keen-Eyed",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you Observe a Situation,",
		lists: {
			questions: "|What weaknesses do they have I can use to my advantage?|What strengths do they have I should watch out for?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "you may choose from these questions, in addition to the ones normally acquired: $QUESTIONS$"
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Lay on Hands",
		itemType: "advantage",
		type: "active",
		moveName: "Heal",
		notes: null,
		clock: null,
		trigger: "Whenever you lay your hands on a seriously or critically wounded person and pray,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are able to heal others’ wounds without using medicine or first aid, but you must channel the injuries onto yourself or another living victim. To transfer the Wound, you must be able to see the victim, but not touch them and they are not required to consent. The wound transferred is of the same type, severity, and condition as the original.",
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
		results: {
			success: {
				text: "You fully heal the injured person, channeling the Wound onto yourself or a selected target.",
				list: null
			},
			partial: {
				text: "You stabilize the injured, channeling the Wound onto yourself or a selected target.",
				list: null
			},
			fail: {
				text: "You may choose to stabilize the injured, but if you do, the powers break free from your control.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Lightning Fast",
		itemType: "advantage",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you move unexpectedly fast in combat,",
		lists: {
			questions: null,
			options: null,
			edges: "|Dodge: avoid an attack.|Blinding speed: Engage in Combat with every opponent within reach of your weapon as a single attack. If you’re attacking with a firearm, this uses up all its ammo.|Uncanny precision: hit your opponent’s weak spot. Deal +1 Harm."
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "<span class='roll-desc'>roll +Violence</span>:",
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Dodge: avoid an attack.|Blinding speed: Engage in Combat with every opponent within reach of your weapon as a single attack. If you’re attacking with a firearm, this uses up all its ammo.|Uncanny precision: hit your opponent’s weak spot. Deal +1 Harm."
			},
			partial: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Dodge: avoid an attack.|Blinding speed: Engage in Combat with every opponent within reach of your weapon as a single attack. If you’re attacking with a firearm, this uses up all its ammo.|Uncanny precision: hit your opponent’s weak spot. Deal +1 Harm."
			},
			fail: {
				text: "Get 1 Edge, but you also end up in a bad spot or face unexpected resistance. The GM makes a Move.",
				list: "|Dodge: avoid an attack.|Blinding speed: Engage in Combat with every opponent within reach of your weapon as a single attack. If you’re attacking with a firearm, this uses up all its ammo.|Uncanny precision: hit your opponent’s weak spot. Deal +1 Harm."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Magical Intuition",
		itemType: "advantage",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you utilize your magical intuition,",
		lists: {
			questions: null,
			options: "|Learn something about a creature’s true nature.|Learn if something has a magical nature.|Learn where the Illusion is weakest towards other dimensions.",
			edges: null
		},
		description: {
			"intro": "You have an innate ability to perceive Kirlian auras and sense the presence of magic.",
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
		results: {
			success: {
				text: "Choose up to three options. Up to two may be saved until later this scene.",
				list: "|Learn something about a creature’s true nature.|Learn if something has a magical nature.|Learn where the Illusion is weakest towards other dimensions."
			},
			partial: {
				text: "Choose up to two options. One may be saved until later this scene.",
				list: "|Learn something about a creature’s true nature.|Learn if something has a magical nature.|Learn where the Illusion is weakest towards other dimensions."
			},
			fail: {
				text: "Choose one option, but you also get an unexpected vision or attract attention. The GM makes a Move.",
				list: "|Learn something about a creature’s true nature.|Learn if something has a magical nature.|Learn where the Illusion is weakest towards other dimensions."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Magnetic Attraction",
		itemType: "advantage",
		type: "active",
		moveName: "Attract Attention",
		notes: null,
		clock: null,
		trigger: "Whenever you attract everyone’s attention,",
		lists: {
			questions: null,
			options: "|People forget what they’re doing and can do nothing but stare at you.|Draw someone to you.|Get someone to do what you ask.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
		results: {
			success: {
				text: "Choose up to three options. You may save up to two until later in the scene.",
				list: "|People forget what they’re doing and can do nothing but stare at you.|Draw someone to you.|Get someone to do what you ask."
			},
			partial: {
				text: "Choose one option.",
				list: "|People forget what they’re doing and can do nothing but stare at you.|Draw someone to you.|Get someone to do what you ask."
			},
			fail: {
				text: "Choose one option, but someone present becomes obsessed, wanting to have you, keep you, and own you for themselves. The GM makes a Move.",
				list: "|People forget what they’re doing and can do nothing but stare at you.|Draw someone to you.|Get someone to do what you ask."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Manhunter",
		itemType: "advantage",
		type: "active",
		moveName: "Investigate Person",
		notes: null,
		clock: null,
		trigger: "Whenever you’re out to get information about someone,",
		lists: {
			questions: "|What is their background?|What or who do they love most of all?|Who do they surround themselves with, like, and/or trust?|Where are they located right now?|How can I best gain access to them?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
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
				text: "Ask the GM one question from the list below, but someone figures out you’ve been snooping around.",
				list: "|What is their background?|What or who do they love most of all?|Who do they surround themselves with, like, and/or trust?|Where are they located right now?|How can I best gain access to them?"
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Manipulative",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you do someone a favor or learn one of their secrets,",
		lists: {
			questions: null,
			options: "|Take +2 to Influence them.|Take +2 to Hinder them.",
			edges: null
		},
		description: {
			"intro": null,
			"static": "you may later choose one of the options below, by reminding them of your prior services or hint at the secret you know:"
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Martial Arts Expert",
		itemType: "advantage",
		type: "active",
		moveName: "Engage in Melee",
		notes: null,
		clock: null,
		trigger: "Whenever you’re fighting in close quarters,",
		lists: {
			questions: null,
			options: null,
			edges: "|Block: avoid a melee attack.|Roundhouse strike: Engage in Combat against several opponents surrounding you, counting as a single attack.|Disarm: remove an opponent’s weapon.|Throw: reposition an opponent or drop them to the ground."
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "<span class='roll-desc'>roll +Violence</span>:",
		results: {
			success: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Block: avoid a melee attack.|Roundhouse strike: Engage in Combat against several opponents surrounding you, counting as a single attack.|Disarm: remove an opponent’s weapon.|Throw: reposition an opponent or drop them to the ground."
			},
			partial: {
				text: "Get 1 Edge.",
				list: "|Block: avoid a melee attack.|Roundhouse strike: Engage in Combat against several opponents surrounding you, counting as a single attack.|Disarm: remove an opponent’s weapon.|Throw: reposition an opponent or drop them to the ground."
			},
			fail: {
				text: "Get 1 Edge, but you underestimate your opponents, who may be more numerous or skilled than you first assumed. The GM makes a Move.",
				list: "|Block: avoid a melee attack.|Roundhouse strike: Engage in Combat against several opponents surrounding you, counting as a single attack.|Disarm: remove an opponent’s weapon.|Throw: reposition an opponent or drop them to the ground."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Moles",
		itemType: "advantage",
		type: "active",
		moveName: "Contact Mole",
		notes: null,
		clock: null,
		trigger: "Whenever you make contact with one of your moles to acquire info or services,",
		lists: {
			questions: null,
			options: "|The mole has penetrated the organization’s inner circle; however, their influence is limited.|The mole owes you one; however, you must meet their demands to get what you want.",
			edges: null
		},
		description: {
			"intro": "You have placed a number of moles in groups or organizations of interest to you, such as business competitors, governments, or cults.",
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "explain what group or organization the mole belongs to, name them, and then <span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "You receive both options below.",
				list: "|The mole has penetrated the organization’s inner circle; however, their influence is limited.|The mole owes you one; however, you must meet their demands to get what you want."
			},
			partial: {
				text: "Choose one of the options below.",
				list: "|The mole has penetrated the organization’s inner circle; however, their influence is limited.|The mole owes you one; however, you must meet their demands to get what you want."
			},
			fail: {
				text: "The mole’s loyalties are questionable. Can you trust them? The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Network of Contacts",
		itemType: "advantage",
		type: "active",
		moveName: "Ask About Someone",
		notes: null,
		clock: null,
		trigger: "Whenever you check in with your contacts regarding an individual of your choosing,",
		lists: {
			questions: "|What resources do they have at their disposal?|Who do they have business dealings with?|Where can I find them?|What do they want?|What are they most afraid of losing?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
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
				text: "You may ask one question from the list below, but the person you’re inquiring about finds out you’re snooping around. The GM makes a Move.",
				list: "|What resources do they have at their disposal?|Who do they have business dealings with?|Where can I find them?|What do they want?|What are they most afraid of losing?"
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Notorious",
		itemType: "advantage",
		type: "active",
		moveName: "Check: Notorious",
		notes: null,
		clock: null,
		trigger: "Whenever you encounter someone who has likely heard about you,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are famous in your trade.",
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "They know of your reputation; you can decide what they have heard. The GM will have them act accordingly. You take +2 to your next roll to Influence them.",
				list: null
			},
			partial: {
				text: "They know of your reputation; you can decide what they have heard.",
				list: null
			},
			fail: {
				text: "They know of your reputation; the GM decides what they have heard.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Observant",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you Read a Person,",
		lists: {
			questions: "|What sort of person are you?|Is there anything odd about you?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "you may choose from these questions in addition to the usual ones: $QUESTIONS$"
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Occult Library",
		itemType: "advantage",
		type: "active",
		moveName: "Do Library Research",
		notes: null,
		clock: null,
		trigger: "Whenever you are in your library researching the supernatural,",
		lists: {
			questions: "|Which higher power does this have connections to?|What do I need, or need to do, to exorcise or control this being?|Which dimension is this associated with?|What must I do to protect myself from this?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
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
				text: "Ask the GM one question from the list below, but you have missed or overlooked something crucial. The GM takes 1 Hold, which can be spent at any time to make a hard or soft Move.",
				list: "|Which higher power does this have connections to?|What do I need, or need to do, to exorcise or control this being?|Which dimension is this associated with?|What must I do to protect myself from this?"
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Occult Studies",
		itemType: "advantage",
		type: "active",
		moveName: "Encounter the Occult",
		notes: null,
		clock: null,
		trigger: "Upon coming in contact with a magical discipline, entity, or phenomenon for the first time,",
		lists: {
			questions: null,
			options: "|I know something about this (ask the GM what you know and take +1 ongoing while acting on the answers during this scene).|I know where I can find more information about this (ask the GM where).",
			edges: null
		},
		description: {
			"intro": "You are a student of the occult.",
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
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
				text: "You have a hazy memory of something like this, but can’t say for sure if it’s true or not. The GM explains what it is you remember.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Officer",
		itemType: "advantage",
		type: "active",
		moveName: "Fight Beside Ally",
		notes: null,
		clock: null,
		trigger: "Whenever you are in combat with at least one ally by your side,",
		lists: {
			questions: null,
			options: null,
			edges: "|Attack!: One ally gets +2 to their next roll to Engage in Combat.|Coordinate fire!: All allies get +1 to their next roll to Engage in Combat with firearms while in the fight.|Aim for the head!: You or one of your allies’ Engage in Combat deals +1 Harm.|Take cover!: You or an ally receive 2 Armor against a ranged attack."
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "<span class='roll-desc'>roll +Violence</span>:",
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Attack!: One ally gets +2 to their next roll to Engage in Combat.|Coordinate fire!: All allies get +1 to their next roll to Engage in Combat with firearms while in the fight.|Aim for the head!: You or one of your allies’ Engage in Combat deals +1 Harm.|Take cover!: You or an ally receive 2 Armor against a ranged attack."
			},
			partial: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Attack!: One ally gets +2 to their next roll to Engage in Combat.|Coordinate fire!: All allies get +1 to their next roll to Engage in Combat with firearms while in the fight.|Aim for the head!: You or one of your allies’ Engage in Combat deals +1 Harm.|Take cover!: You or an ally receive 2 Armor against a ranged attack."
			},
			fail: {
				text: "You misjudge the situation. Choose whether you have put yourself or one of your allies in harm’s way. The GM makes a Move for your opponent.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Opportunist",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you sacrifice someone else to further your own goals,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "gain Stability (+1)."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Parkour",
		itemType: "advantage",
		type: "active",
		moveName: "Execute Acrobatic Maneuver",
		notes: null,
		clock: null,
		trigger: "Whenever you execute acrobatic maneuvers,",
		lists: {
			questions: null,
			options: "|Scale a seemingly impossible obstacle.|Make a seemingly life-threatening leap without suffering Harm.|Successfully avoid a threat. 106",
			edges: null
		},
		description: {
			"intro": "You are deft at running and jumping, even over difficult terrain.",
			"static": null
		},
		attributemod: "coolness",
		rollPhrase: "<span class='roll-desc'>roll +Coolness</span>:",
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Perpetual Victim",
		itemType: "advantage",
		type: "active",
		moveName: "Appear Helpless",
		notes: null,
		clock: null,
		trigger: "Whenever you appear defenseless during a dangerous experience,",
		lists: {
			questions: null,
			options: "|Make someone want to take care of you.|Make an aggressive person want to not harm you.|Make someone confide in you.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
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
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Prepared",
		itemType: "advantage",
		type: "active",
		moveName: "Investigate Location",
		notes: null,
		clock: null,
		trigger: "Whenever you investigate a location prior to visiting it,",
		lists: {
			questions: null,
			options: "|Find or create a map of the location.|Uncover any security systems and other obstacles.|Pinpoint the location of something you’re after.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
		results: {
			success: {
				text: "Choose three options.",
				list: "|Find or create a map of the location.|Uncover any security systems and other obstacles.|Pinpoint the location of something you’re after."
			},
			partial: {
				text: "Choose two options.",
				list: "|Find or create a map of the location.|Uncover any security systems and other obstacles.|Pinpoint the location of something you’re after."
			},
			fail: {
				text: "Choose one option, but you have missed or overlooked something crucial. The GM takes 1 Hold, which can be spent at any time to make a hard or soft Move for the location.",
				list: "|Find or create a map of the location.|Uncover any security systems and other obstacles.|Pinpoint the location of something you’re after."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Puppeteer",
		itemType: "advantage",
		type: "active",
		moveName: "Play Your Pawns",
		notes: null,
		clock: null,
		trigger: "Whenever you execute a plan using other people as pawns,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
		results: {
			success: {
				text: "Everyone involved takes +1 ongoing to carry out the plan, and you get one Experience if the plan is successful.",
				list: null
			},
			partial: {
				text: "You get one Experience if the plan is successful, but you have overlooked or miscalculated something.",
				list: null
			},
			fail: {
				text: "Your plan is inadequate, revealed, and/or misguided. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Quick Thinker",
		itemType: "advantage",
		type: "active",
		moveName: "Start Dangerous Mission",
		notes: null,
		clock: null,
		trigger: "Whenever you commence a dangerous mission,",
		lists: {
			questions: null,
			options: "|Remember something that’s advantageous in a negotiation. Ask the GM what it is.|You possess some equipment you can use to get out of a sticky situation. Ask the GM what it is.|You have special field training that would be useful in getting past one of your obstacles. Ask the GM what it is.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
		results: {
			success: {
				text: "Choose up to three options, at any time during the mission.",
				list: "|Remember something that’s advantageous in a negotiation. Ask the GM what it is.|You possess some equipment you can use to get out of a sticky situation. Ask the GM what it is.|You have special field training that would be useful in getting past one of your obstacles. Ask the GM what it is."
			},
			partial: {
				text: "Choose up to two options, at any time during the mission.",
				list: "|Remember something that’s advantageous in a negotiation. Ask the GM what it is.|You possess some equipment you can use to get out of a sticky situation. Ask the GM what it is.|You have special field training that would be useful in getting past one of your obstacles. Ask the GM what it is."
			},
			fail: {
				text: "At any time during the mission, choose one option, but you’ve failed to account for something. The GM makes a Move.",
				list: "|Remember something that’s advantageous in a negotiation. Ask the GM what it is.|You possess some equipment you can use to get out of a sticky situation. Ask the GM what it is.|You have special field training that would be useful in getting past one of your obstacles. Ask the GM what it is."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Rage",
		itemType: "advantage",
		type: "passive",
		moveName: "Awaken Inner Rage",
		notes: null,
		clock: null,
		trigger: "When you choose to awaken your inner rage in combat,",
		lists: {
			questions: null,
			options: null,
			edges: "|Brutal assault: take +1 Harm to your attack.|Ignore the pain: take +2 to Endure Injury.|Lost in frenzy: shake off and ignore psychological or supernatural influence."
		},
		description: {
			"intro": null,
			"static": "lose Stability (−1) and mark 1 Rage. Every time you get a wound and every time you defeat a foe, increase Rage (+1). Rage lasts until the end of the combat. During combat, you may spend 1 Rage to choose 1 Edge."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Read a Crowd",
		itemType: "advantage",
		type: "active",
		moveName: "Mingle",
		notes: null,
		clock: null,
		trigger: "Whenever you move through a small crowd to gather information,",
		lists: {
			questions: "|Who here has information I want?|Where can I find what I am looking for?|Who is watching me?|Is there anything else of interest?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "perception",
		rollPhrase: "<span class='roll-desc'>roll +Perception</span>. Examples of a ‘small crowd’ include a party, bar/restaurant, or an office. You decide what specific information you are looking for, as long as it makes sense for the crowd to possess such information:",
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
				text: "Ask one question, but you’ve blown your cover. Those who have what you’re looking for will be expecting you. The GM makes a Move.",
				list: "|Who here has information I want?|Where can I find what I am looking for?|Who is watching me?|Is there anything else of interest?"
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Ruthless",
		itemType: "advantage",
		type: "active",
		moveName: "Sacrifice Other",
		notes: null,
		clock: null,
		trigger: "Whenever you sacrifice another to save your own skin,",
		lists: {
			questions: null,
			options: null,
			edges: "|Human shield: force them to take all the Harm from one attack for you.|Bait: expose someone to danger so you can flank an enemy (deal +1 Harm).|Sacrifice: Leave them to the enemy while you slip away."
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "<span class='roll-desc'>roll +Violence</span>:",
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Human shield: force them to take all the Harm from one attack for you.|Bait: expose someone to danger so you can flank an enemy (deal +1 Harm).|Sacrifice: Leave them to the enemy while you slip away."
			},
			partial: {
				text: "Get 2 Edges.",
				list: "|Human shield: force them to take all the Harm from one attack for you.|Bait: expose someone to danger so you can flank an enemy (deal +1 Harm).|Sacrifice: Leave them to the enemy while you slip away."
			},
			fail: {
				text: "Things turns out in a bad way for you instead. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Scientist",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you Investigate an object or entity using the proper equipment,",
		lists: {
			questions: "|What properties does this have? (take +1 to any rolls against entities or objects of a similar type next time you encounter it).|How do I make use of this? (take +1 to any rolls associated with using the object).|What is its purpose?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "you may choose from these following questions, in addition to those acquired through investigation:"
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Sealed Fate",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: "Requires the Disadvantage Condemned",
		clock: null,
		trigger: "Whenever you are dealt a Critical Wound,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "you may mark 1 Time from Condemned to immediately stabilize the Wound."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Seducer",
		itemType: "advantage",
		type: "active",
		moveName: "Seduce",
		notes: null,
		clock: null,
		trigger: "Whenever you have an intimate moment with someone,",
		lists: {
			questions: null,
			options: "|Give you something you want.|Reveal a secret.|Fight to protect you. NPCs who fall in love with you cannot oppose you, as long as you haven’t expended all your options. Against PCs, you may only choose the following options:|Make them feel bad for opposing you (they must Keep it Together)|They feel happy in your presence, and gain Stability (+2).",
			edges: null
		},
		description: {
			"intro": "You can consciously make people fall in love with you.",
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "Choose up to three options, useable any time in the story.",
				list: "|Give you something you want.|Reveal a secret.|Fight to protect you. NPCs who fall in love with you cannot oppose you, as long as you haven’t expended all your options. Against PCs, you may only choose the following options:|Make them feel bad for opposing you (they must Keep it Together)|They feel happy in your presence, and gain Stability (+2)."
			},
			partial: {
				text: "Choose up to two options, useable any time in the story.",
				list: "|Give you something you want.|Reveal a secret.|Fight to protect you. NPCs who fall in love with you cannot oppose you, as long as you haven’t expended all your options. Against PCs, you may only choose the following options:|Make them feel bad for opposing you (they must Keep it Together)|They feel happy in your presence, and gain Stability (+2)."
			},
			fail: {
				text: "Choose one option, useable any time in the story, but you also develop feelings for the person. Increase your Relation to them by +1.",
				list: "|Give you something you want.|Reveal a secret.|Fight to protect you. NPCs who fall in love with you cannot oppose you, as long as you haven’t expended all your options. Against PCs, you may only choose the following options:|Make them feel bad for opposing you (they must Keep it Together)|They feel happy in your presence, and gain Stability (+2)."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Shadow",
		itemType: "advantage",
		type: "active",
		moveName: "Follow",
		notes: null,
		clock: null,
		trigger: "When shadowing someone,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "perception",
		rollPhrase: "<span class='roll-desc'>roll +Perception</span>:",
		results: {
			success: {
				text: "You avoid discovery, follow your target all the way to their final destination, and learn something about them you can use to your advantage later.",
				list: null
			},
			partial: {
				text: "You avoid discovery and follow your target to their final destination.",
				list: null
			},
			fail: {
				text: "You are spotted or encounter some sort of problem along the way. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Sixth Sense",
		itemType: "advantage",
		type: "active",
		moveName: "Check: Sixth Sense",
		notes: null,
		clock: null,
		trigger: "At the start of each game session,",
		lists: {
			questions: null,
			options: "|Act first in a threatening situation. This can include even acting prior to a surprise attack.|Sense whether someone wishes good or ill towards you.|Discover or sense a clue or lead when you’re off track.",
			edges: null
		},
		description: {
			"intro": "You have an intuition for things, both good and bad.",
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
		results: {
			success: {
				text: "Choose up to three options, useable any time during the session.",
				list: "|Act first in a threatening situation. This can include even acting prior to a surprise attack.|Sense whether someone wishes good or ill towards you.|Discover or sense a clue or lead when you’re off track."
			},
			partial: {
				text: "Choose up to two options, useable any time during the session.",
				list: "|Act first in a threatening situation. This can include even acting prior to a surprise attack.|Sense whether someone wishes good or ill towards you.|Discover or sense a clue or lead when you’re off track."
			},
			fail: {
				text: "Your instincts will fail to trigger in a dangerous situation. The GM makes a Move at some point during the session.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Snake Charmer",
		itemType: "advantage",
		type: "active",
		moveName: "Charm",
		notes: null,
		clock: null,
		trigger: "Whenever you perform your chosen art form for an intelligent, monstrous creature,",
		lists: {
			questions: null,
			options: "|Ask the creature for help with a problem.|Ask the creature for something you desire.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span> to awaken a desire within them:",
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
				text: "The desire is beyond the creature’s ability to regulate. It cannot help but attempt to devour or imprison you.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Sneak",
		itemType: "advantage",
		type: "active",
		moveName: "Hide & Sneak",
		notes: null,
		clock: null,
		trigger: "Whenever you keep hidden and try to avoid drawing attention to yourself,",
		lists: {
			questions: null,
			options: "|Find a secure hiding spot for a while.|Find an alternate route to avoid encountering people.|Bypass a security system or other obstacle without being noticed.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "coolness",
		rollPhrase: "<span class='roll-desc'>roll +Coolness</span>:",
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
				text: "Get 1 option, but you manage to attract someone’s attention. The GM makes a Move.",
				list: "|Find a secure hiding spot for a while.|Find an alternate route to avoid encountering people.|Bypass a security system or other obstacle without being noticed."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Sniper",
		itemType: "advantage",
		type: "active",
		moveName: "Scoped Shot",
		notes: null,
		clock: null,
		trigger: "Whenever you fire at a distant target utilizing a scoped rifle,",
		lists: {
			questions: null,
			options: "|Deal +1 Harm.|Hit another target as well.|Immobilize your target.|Get the target to lose control of something.|You don’t reveal your position. 118",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "<span class='roll-desc'>roll +Violence</span>:",
		results: {
			success: {
				text: "The shot finds its target. Choose two options.",
				list: "|Deal +1 Harm.|Hit another target as well.|Immobilize your target.|Get the target to lose control of something.|You don’t reveal your position. 118"
			},
			partial: {
				text: "The shot finds its target. Choose one option.",
				list: "|Deal +1 Harm.|Hit another target as well.|Immobilize your target.|Get the target to lose control of something.|You don’t reveal your position. 118"
			},
			fail: {
				text: "The shot didn’t go where you intended it to, or you reveal your position to the enemy – expect witnesses, opponents pursuing you as you leave the scene, or other problems. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Street Contacts",
		itemType: "advantage",
		type: "active",
		moveName: "Canvas Street Contacts",
		notes: null,
		clock: null,
		trigger: "Whenever you need to know something and check in with your contacts,",
		lists: {
			questions: "|What do you know about the [building / person / organization / event]?|What rumors are circulating on the street at the moment?|How can I get into [location]?|Who in this city would know more about this supernatural thing?",
			options: null,
			edges: null
		},
		description: {
			"intro": "You have contacts among the homeless, crazies, and other societal outsiders and outcasts.",
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Streetfighter",
		itemType: "advantage",
		type: "active",
		moveName: "Engage in Melee",
		notes: null,
		clock: null,
		trigger: "Whenever you fight in close combat,",
		lists: {
			questions: null,
			options: null,
			edges: "|Dodge: avoid an attack.|Flurry of blows: take +2 on your roll to attack an opponent.|Dirty strike: momentarily stun an opponent by painfully striking them, e.g. on the eye, crotch, or ear…"
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "<span class='roll-desc'>roll +Violence</span>:",
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Dodge: avoid an attack.|Flurry of blows: take +2 on your roll to attack an opponent.|Dirty strike: momentarily stun an opponent by painfully striking them, e.g. on the eye, crotch, or ear…"
			},
			partial: {
				text: "Get 2 Edges, but the GM also gets to pick one complication:",
				list: "|You risk losing control during the fight (Keep it Together to prevent it).|You earn an enemy, who will try to get back at you later."
			},
			fail: {
				text: "You’re unfocused and lose control. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Streetwise",
		itemType: "advantage",
		type: "active",
		moveName: "Shop the Black Market",
		notes: null,
		clock: null,
		trigger: "Whenever you want to acquire items or services from the criminal underworld,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "No problem – you get what you’re after. Someone will fix you right up.",
				list: null
			},
			partial: {
				text: "The GM chooses one option:",
				list: "|It will cost you something extra, such as in-kind services, tasks, or an inflated price.|You can get it handled, but only by dealing with someone you’re already indebted to.|“Shit, I had one, but I just let it go to [insert name] – maybe you can buy it from her?”|“Sorry, that’s a bit outside of my area, but maybe this will work instead?”"
			},
			fail: {
				text: "You think you find what you’re looking for, but there will be costly stipulations, considerable flaws, or major complications. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Stubborn",
		itemType: "advantage",
		type: "active",
		moveName: "Push Through",
		notes: null,
		clock: null,
		trigger: "Whenever you push yourself to the limit to overcome a threat,",
		lists: {
			questions: null,
			options: null,
			edges: "|Refuse to give up: Postpone the effects of a critical injury until you have made it out of the threat’s reach.|Will over skill: Roll +Willpower instead of the normal attribute whenever you avoid or fight whatever is threatening you.|Steel yourself: Break free from a supernatural effect."
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
		results: {
			success: {
				text: "Get 3 Edges. You may spend them any time during the scene.",
				list: "|Refuse to give up: Postpone the effects of a critical injury until you have made it out of the threat’s reach.|Will over skill: Roll +Willpower instead of the normal attribute whenever you avoid or fight whatever is threatening you.|Steel yourself: Break free from a supernatural effect."
			},
			partial: {
				text: "Get 2 Edges. You may spend them any time during the scene.",
				list: "|Refuse to give up: Postpone the effects of a critical injury until you have made it out of the threat’s reach.|Will over skill: Roll +Willpower instead of the normal attribute whenever you avoid or fight whatever is threatening you.|Steel yourself: Break free from a supernatural effect."
			},
			fail: {
				text: "Get 1 Edge, but you push yourself past your breaking point. Decrease Stability (−2).",
				list: "|Refuse to give up: Postpone the effects of a critical injury until you have made it out of the threat’s reach.|Will over skill: Roll +Willpower instead of the normal attribute whenever you avoid or fight whatever is threatening you.|Steel yourself: Break free from a supernatural effect."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: true,
		hasHolds: false,
		hasTokens: true
	},
	{
		name: "Survival Instinct",
		itemType: "advantage",
		type: "active",
		moveName: "Refuse to Yield",
		notes: null,
		clock: null,
		trigger: "Whenever you suffer a serious or critical injury yet refuse to yield,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "<span class='roll-desc'>roll +Violence</span>. On a success, you may temporarily ignore the effects of the injuries, but you will need treatment to stabilize them as soon as the time limit expires:",
		results: {
			success: {
				text: "You ignore your injuries until the conflict is over, as well as choose one:",
				list: "|Viciousness: +1 ongoing to Engage in Combat rolls for the remainder of the fight.|Adrenaline rush: +1 ongoing to Endure Injury rolls for the remainder of the fight."
			},
			partial: {
				text: "You ignore your injuries until the conflict is over.",
				list: null
			},
			fail: {
				text: "You overexert yourself and after a few moments your injuries cause you to pass out and collapse. After your next action, the GM decides when and how you pass out.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Survivalist",
		itemType: "advantage",
		type: "active",
		moveName: "Survivalist Skills",
		notes: null,
		clock: null,
		trigger: "Whenever you utilize your survivalist skills,",
		lists: {
			questions: null,
			options: "|Find water and something edible.|Make it past an environmental obstacle.|Find a safe spot to hide and rest.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "perception",
		rollPhrase: "<span class='roll-desc'>roll +Perception</span>:",
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
				text: "Choose one option useable while you remain in this situation, but you’ve also overlooked something important. The GM makes a Move.",
				list: "|Find water and something edible.|Make it past an environmental obstacle.|Find a safe spot to hide and rest."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Thirst for Knowledge",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you learn new information about alternate planes of existence, a supernatural entity, or a Higher Power,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "gain Stability (+1)."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "To the Last Breath",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: "Requires the Disadvantage Condemned",
		clock: null,
		trigger: "When you refuse to give in even if the odds turn against you,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "mark 1 Time to reroll the dice."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Tracer",
		itemType: "advantage",
		type: "active",
		moveName: "Execute Trace",
		notes: null,
		clock: null,
		trigger: "Whenever you utilize your intelligence networks to trace someone or something,",
		lists: {
			questions: "|Where in the world was this seen last?|What people have associated themselves with what I’m looking for lately?|What tracks and marks has it left behind?|Who else is trying to find what I’m looking for? 112",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
		results: {
			success: {
				text: "Ask up to three of the questions below.",
				list: "|Where in the world was this seen last?|What people have associated themselves with what I’m looking for lately?|What tracks and marks has it left behind?|Who else is trying to find what I’m looking for? 112"
			},
			partial: {
				text: "Ask up to two of the questions below.",
				list: "|Where in the world was this seen last?|What people have associated themselves with what I’m looking for lately?|What tracks and marks has it left behind?|Who else is trying to find what I’m looking for? 112"
			},
			fail: {
				text: "Ask one of the questions, but someone notices you snooping around. It might be someone you’d rather not be known by, or a traitor inside your network.",
				list: "|Where in the world was this seen last?|What people have associated themselves with what I’m looking for lately?|What tracks and marks has it left behind?|Who else is trying to find what I’m looking for? 112"
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Vigilant",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you Read a Person,",
		lists: {
			questions: "|Are you hiding anything from me?|How do you really feel about me?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "you may choose from these questions in addition to the usual ones: $QUESTIONS$"
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Voice of Insanity",
		itemType: "advantage",
		type: "active",
		moveName: "Mass Manipulation",
		notes: null,
		clock: null,
		trigger: "Whenever you manipulate a crowd,",
		lists: {
			questions: null,
			options: "|Attract other people to join in the crowd.|Have crowd members give you all their valuables.|Unite the crowd to fight for you.|Incite the crowd into an orgy of unbridled emotion: sexual lust, anger, sorrow, violence, generosity, or celebrating, depending on what concepts you are instilling into them.|Have the crowd disperse and calmly return to their normal lives.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Voice of Pain",
		itemType: "advantage",
		type: "active",
		moveName: "Suffer First Blood",
		notes: null,
		clock: null,
		trigger: "When an opponent seriously or critically wounds you for the first time,",
		lists: {
			questions: null,
			options: "|You realize how to get through your opponent’s defenses (take +1 to Engage in Combat with them).|You find your opponent’s weak spot (deal +1 Harm whenever you Engage in Combat with them).|You perceive your opponent’s pattern of attack (take +1 to Avoid Harm whenever they attack you). These effects are permanent against this opponent.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span> to gain insight from your pain:",
		results: {
			success: {
				text: "You get two options.",
				list: "|You realize how to get through your opponent’s defenses (take +1 to Engage in Combat with them).|You find your opponent’s weak spot (deal +1 Harm whenever you Engage in Combat with them).|You perceive your opponent’s pattern of attack (take +1 to Avoid Harm whenever they attack you). These effects are permanent against this opponent."
			},
			partial: {
				text: "Choose one option.",
				list: "|You realize how to get through your opponent’s defenses (take +1 to Engage in Combat with them).|You find your opponent’s weak spot (deal +1 Harm whenever you Engage in Combat with them).|You perceive your opponent’s pattern of attack (take +1 to Avoid Harm whenever they attack you). These effects are permanent against this opponent."
			},
			fail: {
				text: "Choose one option, but the pain will overwhelm you eventually and make you black out.",
				list: "|You realize how to get through your opponent’s defenses (take +1 to Engage in Combat with them).|You find your opponent’s weak spot (deal +1 Harm whenever you Engage in Combat with them).|You perceive your opponent’s pattern of attack (take +1 to Avoid Harm whenever they attack you). These effects are permanent against this opponent."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Wanderer",
		itemType: "advantage",
		type: "active",
		moveName: "Wander",
		notes: null,
		clock: null,
		trigger: "Whenever you are heading out to a community or another part of the city,",
		lists: {
			questions: null,
			options: "|Ask the GM one question about this place.|You have a contact at this place who could help you, with a bit of convincing.|You have a hideout here, where you can put your head down and get some rest.|You know something about this place. Tell the others what.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "perception",
		rollPhrase: "<span class='roll-desc'>roll +Perception</span>:",
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Watchers",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you are in mortal danger and choose to activate your Watchers,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are being watched over and protected by a group of mysterious people who intend on keeping you alive for their own obscure purposes.",
			"static": "the GM takes 1 Hold and introduces your Watchers to the scene. Their sole motivation is to keep you out of harm's reach, and the GM can spend Hold on the Watchers' behalf to let them make a Move against you."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: "The GM chooses the number of Watchers who come to your aid based on the power of the threat to your safety:",
			list: "|Small Gang: 2 Harm, 5 Wounds|Medium Gang: 3 Harm, 10 Wounds|Large Gang: 3 Harm, 15 Wounds"
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Wayfinder",
		itemType: "advantage",
		type: "active",
		moveName: "Mad Guidance",
		notes: null,
		clock: null,
		trigger: "Whenever you travel between two places in the city and allow your madness to guide you through the alleys,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span>:",
		results: {
			success: {
				text: "You discover a shortcut through the alleys, which takes you to your destination within a few minutes, regardless of how far the distance actually is.",
				list: null
			},
			partial: {
				text: "You discover a shortcut, but there is also some sort of obstacle you will need to get past.",
				list: null
			},
			fail: {
				text: "You discover a shortcut, but it leads you into a dangerous situation, such as the lair of some creature or an ambush set by some gang. The GM makes a Move. 116",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Weapon Master (Firearms)",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you Engage in Combat with a firearm,",
		lists: {
			questions: null,
			options: "|Two shots in the chest and one in the head {[4 Harm, room, −2 ammo]}|Disarm {1 Harm, room, −1 ammo, a targeted PC must Act Under Pressure]}",
			edges: null
		},
		description: {
			"intro": "You are a master of gunplay.",
			"static": "use +Coolness instead of Violence, and add the following Attack Moves to your firearms: $OPTIONS$"
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Weapon Master (Melee)",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you Engage in Combat in close quarters,",
		lists: {
			questions: null,
			options: "|Launching attack {[2 Harm, room]}|Precision attack {2 Harm, arm, ignores Armor]}|Tripping attack {2 Harm, arm, targets fall prone]}",
			edges: null
		},
		description: {
			"intro": "You are a master of armed melee combat.",
			"static": "use +Coolness instead of Violence, and add the following Attack Moves to your close combat weapons: $OPTIONS$"
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Workaholic",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you create something or carry out an experiment,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "gain Stability (+1)."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Worldly",
		itemType: "advantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you arrive at a new location in the mundane world,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "decide whether you have been here before, and if so, name some detail about the place significant to you. Also, decide if you met someone there and what you left behind. The GM will say what has changed since then."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Bad Reputation",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Bad Reputation",
		notes: null,
		clock: null,
		trigger: "In the first game session and whenever you attract the public’s attention,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "For some reason, you have attracted the public’s disapproval – even animosity. Perhaps you’ve been spotlighted in the tabloids as a pedophile or murderer, falsely or otherwise.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You blend in. Nobody is out to get you.",
				list: null
			},
			partial: {
				text: "You have been recognized. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "Several people have recognized you. Anger and fear control their actions. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move representing how your bad reputation sticks to you. For example, people might react with fear and suspicion towards you, a lynch mob forms to bring you to justice, your property is vandalized, your allies turn against you, and you can lose your job, agreements, and relationships.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Broken",
		itemType: "disadvantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: null,
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "Some experience in your past has broken your psyche so badly you’ve been unable to recuperate from it.",
			"static": "As a result, your Stability can never increase beyond Distressed [6]."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Competitor",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Competitor",
		notes: null,
		clock: null,
		trigger: "Whenever you neglect to protect your interests or are distracted elsewhere,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You have a competitor in the criminal underworld, whose business niche is similar to yours.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span> to see if your competitor managed to damage your business:",
		results: {
			success: {
				text: "You are safe from your competitor, for the moment.",
				list: null
			},
			partial: {
				text: "You have been careless. Your competitor may strike against you. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "You hand your competitor a golden opportunity, and they move against your interests. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for your competitor. For example, your competitor may take control of some of your business dealings, learn one of your secrets, sabotages one of your assets, or harms or buys off someone you care for and trust.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Condemned",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Condemned",
		notes: null,
		clock: 10,
		trigger: "At the start of every game session,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "Your fate has already been sealed. Perhaps you’re dying from a disease, been promised as the sacrificial offering to a forgotten god, or you’ve sold your soul to some entity, waiting to drag you off to hell when your time is up. When you finally run out of Time, you meet your ultimate fate.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You still have some time remaining.",
				list: null
			},
			partial: {
				text: "Your fate approaches. The GM chooses one of the following options:",
				list: "|You mark 1 Time.|You’re tortured by dreams or visions of your fate. Reduce Stability (−2).|You’re haunted by the entity or event that sealed your fate.|Someone in your vicinity is negatively affected by your fate.|Something provides you with false hope of escaping your fate."
			},
			fail: {
				text: "Your end approaches. The GM chooses two options, and may choose the same option twice:",
				list: "|You mark 1 Time.|You’re tortured by dreams or visions of your fate. Reduce Stability (−2).|You’re haunted by the entity or event that sealed your fate.|Someone in your vicinity is negatively affected by your fate.|Something provides you with false hope of escaping your fate."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Cursed",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Cursed",
		notes: null,
		clock: null,
		trigger: "In the first session and whenever you’re confronted by the supernatural,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are cursed.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span> to see how strongly the curse influences you:",
		results: {
			success: {
				text: "You temporarily avoid the curse’s influence.",
				list: null
			},
			partial: {
				text: "The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move for the curse. For example, you or someone you care about have an accident, something of yours is taken from you, you experience terrifying visions, or you’re forced to take certain actions with risk of dire consequences, if you refuse.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Depression",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Depression",
		notes: null,
		clock: null,
		trigger: "Whenever facing personal setbacks,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are constantly struggling with depression, which is only worsened by dejection and discouragement.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You remain in control.",
				list: null
			},
			partial: {
				text: "You experience temporary anxiety, decreased self-confidence, or lack of will. You take −1 to your next roll.",
				list: null
			},
			fail: {
				text: "You succumb to the sense of hopelessness or blame and punish yourself; reduce Stability (−2). Your lethargy and self-destructive urges do not go away until you numb your depression with medicine, drugs, or alcohol.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Drug Addict",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Drug Addict",
		notes: null,
		clock: null,
		trigger: "In the first game session and whenever you have been using, or have the opportunity to use,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are addicted to hard drugs; name at least one when you gain this Disadvantage.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You are in control of the urge, for now.",
				list: null
			},
			partial: {
				text: "The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move for your addiction. For example, you cannot resist using the drug, run out of drugs, become indebted to a dangerous person, put yourself in danger while under the influence of drugs, or ruin something important to you – like a relationship – while under the influence.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Experiment Gone Wrong",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Experiment Gone Wrong",
		notes: null,
		clock: null,
		trigger: "In the first session and whenever things seem in control,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You have carried out a scientific experiment, which went horribly awry. The experiment gave rise to something unnatural, which escaped and disappeared without a trace. Recently, the ‘results’ of your experiment tracked you down, reappearing in your life, and forcing you to either escape or confront it.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "Your experiment leaves you alone.",
				list: null
			},
			partial: {
				text: "Your experiment is close on your heels. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "Your experiment is in your vicinity and acts against you. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves on the experiment’s behalf. For example, the experiment gives you a lead on the Truth, sabotages or otherwise disrupts your research, demands something from you under threat of retribution, or kidnaps someone you care for – possibly returning them dead or transformed.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Fanatic",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Fanatic",
		notes: null,
		clock: null,
		trigger: "Whenever someone questions your ideology,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are a fervent adherent of an ideology, which you must define when you take this Disadvantage. You interpret the whole world in accordance with your ideology, which must not be questioned.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You can keep your emotions in check.",
				list: null
			},
			partial: {
				text: "You become angry, confused, or frustrated. You take −1 to your next roll.",
				list: null
			},
			fail: {
				text: "You are forced to choose between taking steps to changing the person or situation to adhere to your ideology, or reduce Stability (−2).",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Greedy",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Greedy",
		notes: null,
		clock: null,
		trigger: "When an opportunity to increase your wealth arises,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are driven by an unquenchable desire for money and wealth, and are prepared to sacrifice your health, family, and friends to fill the emptiness inside.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span> to see if you are in control of your desire:",
		results: {
			success: {
				text: "You keep your greed in check.",
				list: null
			},
			partial: {
				text: "The black void inside shrieks for more. As long as the opportunity exists and you do not take it, you suffer −1 ongoing to any rolls you make.",
				list: null
			},
			fail: {
				text: "You must take advantage of every opportunity to further your wealth, or reduce Stability (−2).",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Guilt",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Guilt",
		notes: null,
		clock: null,
		trigger: "In the first game session and whenever everything appears okay,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You carry heavy guilt for your past sins, having harmed one or several people through your actions or inaction.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "Your guilt isn’t on your mind at the moment.",
				list: null
			},
			partial: {
				text: "You are reminded of your guilt. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "Your guilt catches up to you. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for your guilt. For example, relatives of the people you’ve hurt seek you out, demons and other creatures are attracted by your guilt, the dead haunt you with nightmares or visions, or you fall victim to anxiety and self-doubt.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Harassed",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Harassed",
		notes: null,
		clock: null,
		trigger: "In the first game session and whenever you draw attention to yourself,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "For some reason, personal or otherwise, people tend to harass you; the authorities in particular.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span> to see if you’re harassed:",
		results: {
			success: {
				text: "You’ve managed to keep clear of harassment.",
				list: null
			},
			partial: {
				text: "The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for the harassers. For example, someone destroys your property or possessions, you are bullied and attacked by people with a prejudice against you, the authorities forcefully take something from you (rights, property, assets), someone you care about is harmed for associating with you, or you are denied your basic rights due to your identity.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Haunted",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Haunted",
		notes: null,
		clock: null,
		trigger: "In the first session and whenever you are distracted or weakened,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are haunted by supernatural forces. With the GM’s assistance, determine the nature of what you believe is haunting you.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span> to see if the entity gains power over you:",
		results: {
			success: {
				text: "The entity leaves you alone.",
				list: null
			},
			partial: {
				text: "The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move for the entity. For example, it requests a service from you and threatens retribution if you refuse, the entity possesses your body for the night, or the entity reveals a clue of what it is and what it wants from you.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Infirm",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Infirm",
		notes: null,
		clock: null,
		trigger: "Whenever you are subjected to major physical or psychological stress,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You suffer from a dangerous physical disease or condition, such as heart disease, hypertension, morbid obesity, or serious gastric ulcer.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "Your condition is under control.",
				list: null
			},
			partial: {
				text: "Your condition triggers, causing pain and daze (−1 to all rolls until the scene ends).",
				list: null
			},
			fail: {
				text: "Your condition is aggravated with life threatening results (Endure Injury with 2 Harm).",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Involuntary Medium",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Involuntary Medium",
		notes: null,
		clock: null,
		trigger: "Whenever you encounter spiritual entities or haunted places,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are an open vessel for any spirits or demonic entities who desire a medium to speak through or need a corporeal body to use for their purposes.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You resist the possession.",
				list: null
			},
			partial: {
				text: "The entity gains influence over you. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "The entity gains control over you. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for the being possessing you. For example, the entity may give you a vision, make use of your body, communicate with or through you, try to harm someone else through you, follow you unseen, demand something from you, or drag you into another dimension.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Jealousy",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Jealousy",
		notes: null,
		clock: null,
		trigger: "Whenever you encounter the subject of your jealousy or their life’s trappings (possessions, family, friends, etc),",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "There is someone who has the life you want to have, and you would do anything to possess it.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span> to see if you can keep your cool:",
		results: {
			success: {
				text: "You maintain control over your jealousy.",
				list: null
			},
			partial: {
				text: "You’re afflicted by jealousy and take −1 ongoing for as long as you remain in the subject’s vicinity, and you do not suppress your jealous desires.",
				list: null
			},
			fail: {
				text: "Your jealousy takes hold of you. You must Keep it Together to refrain from harming, destroying, or stealing from the subject of your jealousy.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Liar",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Liar",
		notes: null,
		clock: null,
		trigger: "At the start of every session,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You’re a compulsive liar, who invents stories at every opportunity, especially when it’s beneficial for you.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span> to see what trouble your lies have gotten you into this time:",
		results: {
			success: {
				text: "You have kept your lies tangle-free.",
				list: null
			},
			partial: {
				text: "You’ve told one too many lies. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "Your web of lies has come completely unraveled. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold whenever a PC encounters someone they know to ask, “What have you lied about to this person?” or to invent a troublesome lie the PC has told in the past.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Lost Identity",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Lost Identity",
		notes: null,
		clock: null,
		trigger: "In the first game session and whenever you encounter something from your repressed past,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "Your true identity has been lost to a military or private-run secret agent program. You do not remember anything about your pre-employment life. Recently, memories of your true identity have started coming back to you.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You repress your true identity, remaining in the present.",
				list: null
			},
			partial: {
				text: "Your true identity is catching up to you. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "Your true identity resurfaces. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for your true identity. For example, you recognize unknown people or places, organizations or individuals from your past life get in touch with you, your old identity influences your thought patterns or actions, or you suffer traumatic flashbacks.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Marked",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Marked",
		notes: null,
		clock: null,
		trigger: "Whenever you consciously Harm someone,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are marked by the darkness. The mark can take the shape of a full-body tattoo, a demonic body part such as a vestigial arm, an extra eye or mouth, machine parts integrated with your flesh, or similar manifestations.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You are still in control.",
				list: null
			},
			partial: {
				text: "You feed the darkness. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "The darkness gains power over you. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for the darkness living inside of you. For example, the darkness feeds on your life energy to sustain itself, forces you to commit murder in order to replenish its life energy, takes charge of your body and leaves you with only memory fragments of what transpired, forces you to harm someone in your vicinity, or temporarily transforms your body into something inhuman. You may have to Keep it Together to resist the darkness’ influence.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Mental Compulsion",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Mental Compulsion",
		notes: null,
		clock: null,
		trigger: "In situations where you could be distracted by your compulsion,",
		lists: {
			questions: null,
			options: "|Cleaning|Counting|Triple-checking|Showering|Memorizing|Pyromania|Kleptomania|Cursing|Confessing your sins|Eating|Hypochondria",
			edges: null
		},
		description: {
			"intro": "You are fixated on a particular idea or action, to the point of it strongly impacting your life. Choose a compulsion when you take this Disadvantage: $OPTIONS$",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You control your compulsions and can focus on other things.",
				list: null
			},
			partial: {
				text: "You become distracted and take −1 ongoing to all rolls until you have removed yourself from the situation or succumbed to your compulsion, taking any actions it demands of you.",
				list: null
			},
			fail: {
				text: "You become completely obsessed with your compulsion. If you focus on anything else, reduce Stability (−2).",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Nemesis",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Nemesis",
		notes: null,
		clock: null,
		trigger: "In the first game session and whenever you let your guard down,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "Through some terrible act you have made an enemy, who does everything in their power to take revenge. Decide who your nemesis is and what you have done to earn their vengeance.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span> to see if your nemesis moves against you:",
		results: {
			success: {
				text: "You are safe from your nemesis for the moment.",
				list: null
			},
			partial: {
				text: "You have been careless and your nemesis moves against you. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "You have compromised your position and your nemesis strikes against you in full force. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves on behalf of your nemesis. For example, your nemesis may strike when you’re alone, use secrets they’ve uncovered to extort you, intimidate you, hire henchmen to capture you, or attack someone or something you hold dear.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Nightmares",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Nightmares",
		notes: null,
		clock: null,
		trigger: "During any scene when you sleep,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You suffer from recurring nightmares, probably connected to your Dark Secrets.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You sleep in peace.",
				list: null
			},
			partial: {
				text: "The nightmares torment you. The GM may make a Move for your nightmares. For example, you are unable to sleep at all during the night (−1 ongoing until you sleep), something follows you back into reality, the nightmares provide you insight into the Truth, or you are forced to process some trauma (Keep it Together) when you wake up.",
				list: null
			},
			fail: {
				text: "The nightmares take over completely. You are trapped in the dream until you find a way to wake up, and everything that happens there also directly affects your sleeping body.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Oath of Revenge",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Oath of Revenge",
		notes: null,
		clock: null,
		trigger: "Whenever the target of your vengeance (or someone/something associated with them) appears,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You have sworn to avenge an unforgivable injustice. Decide who is the subject of your vengeance and what they have done to you. It could be a single individual, people who share a certain trait, or members of an organization.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You remain in control of your vengeful nature and can act rationally.",
				list: null
			},
			partial: {
				text: "You can’t focus on anything, other than the target of your vengeance. Take −1 ongoing until the target’s involvement in the scene ends.",
				list: null
			},
			fail: {
				text: "You become obsessed and can act only to further your revenge. Doing anything else requires you roll Keep it Together. Your obsession cannot be assuaged while the target remains in the same scene with you.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Object of Desire",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Object of Desire",
		notes: null,
		clock: null,
		trigger: "At the first game session and whenever you meet one or more new people,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "There is just something special about you. You ignite deep unhealthy desires in others, which they are unable to keep in check.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "The desire is not awakened at this moment.",
				list: null
			},
			partial: {
				text: "Someone becomes desirous of you. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "A strong desire is awakened in one or several people. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to ignite a person’s desires, influencing their behavior. For example, someone can be afflicted with an uncontrollable passion for you, attempt to force themselves on you, strongly proposition you, become intensely jealous of you, or harm themselves or someone else because of their desire of you.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Obsession",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Obsession",
		notes: null,
		clock: null,
		trigger: "At the first game session and whenever you encounter something associated with your obsession,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You have discovered a conspiracy or supernatural phenomenon, and you can’t stop yourself from getting to the bottom of it.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You overcome your obsession for the moment.",
				list: null
			},
			partial: {
				text: "Your obsession influences your behavior. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "Your obsession takes over completely. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to let your obsession creep into your daily life. You may be forced to choose between either engaging in your obsession or losing Stability. You may forget about important tasks and chores, miss meetings, or neglect your interpersonal relationships to solely focus on your obsession. Your obsession may even influence your dreams, giving you visions and revelations. In turn, the object of your obsession may also take note of you and try to stop your investigations.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Owned",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Owned",
		notes: null,
		clock: null,
		trigger: "In the first game session and whenever you draw attention to yourself in public,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You used to be a dangerous person’s private property, willingly or not. Since your escape, your former owner has been looking for you. Decide who your former owner is.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "For the moment, you are safe.",
				list: null
			},
			partial: {
				text: "Your former owner picks up your scent. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "Your owner finds you. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make Moves for your former owner. For example, they appear unexpectedly to convince you to return, send henchmen after you, kidnap or harm someone you care about, directly threaten you, destroy something important to you, try to mutilate you so nobody else would want you, or kill you outright so nobody else can have you.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Phobia",
		itemType: "disadvantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you’re confronted by the object of your phobia,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You harbor an overpowering fear of something. Choose the stimulus that frightens you.",
			"static": "you must Keep it Together."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Rationalist",
		itemType: "disadvantage",
		type: "passive",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "Whenever you See Through the Illusion and whenever the Illusion shatters,",
		lists: {
			questions: null,
			options: "|Your presence nurtures the Illusion, making it more powerful and impenetrable.|Your bewildered psyche starts creating mirror images of familiar places and people in the Illusion.|You attract extradimensional entities.|You consciously deny what you see, even to your own detriment.",
			edges: null
		},
		description: {
			"intro": "You refuse to believe in anything not confirmed as fact by modern science, even when it is right in front of you.",
			"static": "in addition to the standard effects, the GM may choose one option: $OPTIONS$"
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Repressed Memories",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Repressed Memories",
		notes: null,
		clock: null,
		trigger: "In situations associated with your repressed memories,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You have repressed a particularly unpleasant event from your past, but the memory of it sometimes rises to the surface. It could be a crime or some horrible thing you have done, been subjected to, or witnessed. The GM decides the nature of your repressed memory, usually based on your Dark Secrets.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span> to determine if the memories resurface:",
		results: {
			success: {
				text: "You continue to suppress the memories.",
				list: null
			},
			partial: {
				text: "The memories partly resurface, taking the form of flashbacks and/or hallucinations. You must Keep it Together.",
				list: null
			},
			fail: {
				text: "You are overwhelmed by your repressed memories, completely losing yourself to them. The GM makes a hard Move and you reduce Stability (−2).",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Rival",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Rival",
		notes: null,
		clock: null,
		trigger: "In the first game session and whenever you make a mistake or let down your guard,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You have an ambitious rival, who will do anything to be in your shoes. Choose who the rival is.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "All clear; your rival makes no moves against you.",
				list: null
			},
			partial: {
				text: "You’ve given your rival an opportunity. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "You’ve handed your rival whatever they needed to completely undermine you. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move on behalf of your rival. For example, the rival may get an important person on their side, sabotage one of your projects, extort you with evidence damaging to your reputation, or take desperate measures to get rid of you permanently.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Schizophrenia",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Schizophrenia",
		notes: null,
		clock: null,
		trigger: "In the first game session and whenever you go through difficult experiences,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You struggle with recurring psychotic episodes and terrifying hallucinations.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You maintain control of your insanity.",
				list: null
			},
			partial: {
				text: "The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "Schizophrenia overtakes you. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move for your schizophrenia. For example, one of your hallucinations takes on physical form, you view your current surroundings as being hostile to you, you’re afflicted by terrifying hallucinations, you’re subjected to dark visions (true or false), or someone in your vicinity turns out to not actually be real.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Sexual Neurosis",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Sexual Neurosis",
		notes: null,
		clock: null,
		trigger: "Whenever you have the opportunity to have consensual sex or take advantage of someone vulnerable to your advances,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "Your sexuality is a destructive, controlling force in your life. You compulsively seek out superficial sexual encounters and are willing to perform degrading acts – or even commit crimes – to satisfy your fantasies.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You can control your urges.",
				list: null
			},
			partial: {
				text: "Choose between having sex with the person or reduce your Stability (−1).",
				list: null
			},
			fail: {
				text: "You cannot resist having sex with the person and the GM chooses one option:",
				list: "|You hurt, or you are hurt by, your sexual partner (physically or psychologically).|The boundaries between dimensions are weakened; an entity from beyond catches the scent of you or your lover.|Your sexual partner becomes obsessed with you and starts stalking you."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Stalker",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Stalker",
		notes: null,
		clock: null,
		trigger: "In the first game session and whenever you expose your current location,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are hunted by a faceless enemy. Anyone you meet could be one of their minions – or even the stalker themselves. No one can be trusted. You must constantly change your address and be vigilant at all times to avoid leaving any tracks they can follow.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You are safe for now.",
				list: null
			},
			partial: {
				text: "Your enemies are on to you. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "Your enemies have caught up to you. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move for your pursuers. For example, a trusted associate has been paid off by them, one of your loved ones or allies disappears, something you are trying to do is undermined by your enemies, or they try to actively hurt you.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Victim of Passion",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Victim of Passion",
		notes: null,
		clock: null,
		trigger: "In the first game session and whenever you encounter the subject of your passions (or anything resembling it),",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You have an overwhelming passion for someone or something, seeking to possess it at any cost.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span>:",
		results: {
			success: {
				text: "You keep your passion in check.",
				list: null
			},
			partial: {
				text: "The passion awakens within you. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "You are completely in the passion’s grip. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to let your passion steer your actions. For example, you yearn uncontrollably for the subject of your passion – you must seek it out or reduce Stability (−2), your desire drags the subject of your passion into your dreams (perhaps trapping them there), your passion becomes tainted with jealousy and anger – making you want to control and damage it (Keep it Together to resist), your longing leaves you feeble vis-à-vis the objective of this passion (−1 to all rolls while sharing the same scene), or your passion can attract creatures of lust wishing to feed off it or make pacts with you.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Wanted",
		itemType: "disadvantage",
		type: "active",
		moveName: "Check: Wanted",
		notes: null,
		clock: null,
		trigger: "Whenever you attract attention to yourself or forget to keep your head down,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": "You are wanted by the authorities – local, state, or federal – for crimes you have committed.",
			"static": null
		},
		attributemod: null,
		rollPhrase: "<span class='roll-desc'>roll +0</span> to see if you’ve been discovered:",
		results: {
			success: {
				text: "You are safe, for now.",
				list: null
			},
			partial: {
				text: "You have made a mistake. The GM takes 1 Hold.",
				list: null
			},
			fail: {
				text: "All eyes are on you. The GM takes 3 Hold.",
				list: null
			}
		},
		suffix: {
			text: "The GM can spend Hold to make a Move for the authorities. For example, your mugshot appears on the TV news and in newspapers, law enforcement officers attempt to trap and catch you, or the authorities detain and interrogate someone you care about, confiscate your possessions, or turn your friends/family against you.",
			list: null
		},
		hasEdges: false,
		hasHolds: true,
		hasTokens: true
	},
	{
		name: "Act Under Pressure",
		itemType: "move",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you do something risky, under time pressure, or try to avoid danger,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "coolness",
		rollPhrase: "the GM will explain what the consequences for failure are and you <span class='roll-desc'>roll +Coolness</span>:",
		results: {
			success: {
				text: "You do what you intended.",
				list: null
			},
			partial: {
				text: "You do it, but hesitate, are delayed, or must deal with a complication – the GM reveals an unexpected outcome, a high price, or a difficult choice.",
				list: null
			},
			fail: {
				text: "There are serious consequences, you make a mistake, or you’re exposed to the danger. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Avoid Harm",
		itemType: "move",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you dodge, parry, or block Harm,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reflexes",
		rollPhrase: "<span class='roll-desc'>roll +Reflexes</span>:",
		results: {
			success: {
				text: "You emerge completely unharmed.",
				list: null
			},
			partial: {
				text: "You avoid the worst of it, but the GM decides if you end up in a bad spot, lose something, or partially sustain Harm.",
				list: null
			},
			fail: {
				text: "You were too slow to react or you made a bad judgment call. Perhaps you didn’t avoid any Harm at all, or you ended up in an even worse spot than before. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Endure Injury",
		itemType: "move",
		type: "active",
		moveName: null,
		notes: "Add Armor and subtract Harm from Fortitude roll",
		clock: null,
		trigger: "When enduring an injury,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "fortitude",
		rollPhrase: "<span class='roll-desc'>roll +Fortitude +Armor −Harm</span>:",
		results: {
			success: {
				text: "You ride out the pain and keep going.",
				list: null
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Engage in Combat",
		itemType: "move",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you engage an able opponent in combat,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "violence",
		rollPhrase: "explain how and <span class='roll-desc'>roll +Violence</span>:",
		results: {
			success: {
				text: "You inflict damage to your opponent and avoid counterattacks.",
				list: null
			},
			partial: {
				text: "You inflict damage, but at a cost. The GM chooses one:",
				list: "|You’re subjected to a counterattack.|You do less damage than intended.|You lose something important.|You expend all your ammo.|You’re beset by a new threat.|You’ll be in trouble later on."
			},
			fail: {
				text: "Your attack doesn’t go as anticipated. You might be subjected to bad luck, miss your target, or pay a high price for your assault. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Help Other",
		itemType: "move",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you help another player character’s Move,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "ask",
		rollPhrase: "explain how before their roll and <span class='roll-desc'>roll +Attribute</span>, where the Attribute is the same as the other player is rolling:",
		results: {
			success: {
				text: "You may modify the subsequent roll by +2.",
				list: null
			},
			partial: {
				text: "You may modify the subsequent roll by +1.",
				list: null
			},
			fail: {
				text: "Your interference has unintended consequences. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Hinder Other",
		itemType: "move",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you hinder another player character’s Move,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "ask",
		rollPhrase: "explain how before their roll and <span class='roll-desc'>roll +Attribute</span>, where the Attribute is the same as the other player is rolling:",
		results: {
			success: {
				text: "You may modify the subsequent roll by −2.",
				list: null
			},
			partial: {
				text: "You may modify the subsequent roll by −1.",
				list: null
			},
			fail: {
				text: "Your interference has unintended consequences. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Influence Other NPC",
		itemType: "move",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you influence an NPC through negotiation, argument, or from a position of power,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "She does what you ask",
				list: null
			},
			partial: {
				text: "She does what you ask, but the GM chooses one:",
				list: "|She demands better compensation.|Complications will arise at a future time.|She gives in for the moment, but will change her mind and regret it later."
			},
			fail: {
				text: "Your attempt has unintended repercussions. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Influence Other PC",
		itemType: "move",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you influence another PC,",
		lists: {
			questions: null,
			options: "|She’s motivated to do what you ask, and recieves +1 for her next roll, if she does it.|She’s worried of the consequences if she doesn’t do what you ask, and gets −1 Stability if she doesn’t do it.",
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "charisma",
		rollPhrase: "<span class='roll-desc'>roll +Charisma</span>:",
		results: {
			success: {
				text: "Both options below.",
				list: "|She’s motivated to do what you ask, and recieves +1 for her next roll, if she does it.|She’s worried of the consequences if she doesn’t do what you ask, and gets −1 Stability if she doesn’t do it."
			},
			partial: {
				text: "Choose one option below.",
				list: "|She’s motivated to do what you ask, and recieves +1 for her next roll, if she does it.|She’s worried of the consequences if she doesn’t do what you ask, and gets −1 Stability if she doesn’t do it."
			},
			fail: {
				text: "The character gets +1 on her next roll against you. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Investigate",
		itemType: "move",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you investigate something,",
		lists: {
			questions: "|How can I find out more about what I’m investigating?|What is my gut feel about what I’m investigating?|Is there anything weird about what I’m investigating?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
		results: {
			success: {
				text: "You uncover all direct leads, and may ask two questions to get additional information.",
				list: "|How can I find out more about what I’m investigating?|What is my gut feel about what I’m investigating?|Is there anything weird about what I’m investigating?"
			},
			partial: {
				text: "You uncover all direct leads, and may ask one question to get additional information. The information comes at a cost, determined by the GM, such as requiring someone or something for the answer, exposing yourself to danger, or needing to expend extra time or resources. Will you do what it takes?",
				list: "|How can I find out more about what I’m investigating?|What is my gut feel about what I’m investigating?|Is there anything weird about what I’m investigating?"
			},
			fail: {
				text: "You may get some information anyway, but you pay a price for it. You may expose yourself to dangers or costs. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Keep it Together",
		itemType: "move",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you exercise self-control to keep from succumbing to stress, traumatic experiences, psychic influence, or supernatural forces,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "willpower",
		rollPhrase: "<span class='roll-desc'>roll +Willpower</span>:",
		results: {
			success: {
				text: "You grit your teeth and stay the course.",
				list: null
			},
			partial: {
				text: "The effort to resist instills a condition, which remains with you until you have had time to recuperate. You get −1 in situations where this condition would be a hindrance to you. Choose one:",
				list: "|You become angry (−1 Stability).|You become sad (−1 Stability).|You become scared (−1 Stability).|You become guilt-ridden (−1 Stability).|You become obsessed (+1 Relation to whatever caused the condition).|You become distracted (−2 in situations where the condition limits you).|You will be haunted by the experience at a later time."
			},
			fail: {
				text: "The strain is too much for your mind to handle. The GM chooses your reaction:",
				list: "|You cower powerless in the threat’s presence.|You panic with no control of your actions.|You suffer emotional trauma (−2 Stability).|You suffer life-changing trauma (−4 Stability)."
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Observe a Situation",
		itemType: "move",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you observe a situation,",
		lists: {
			questions: "|What is my best way through this?|What currently poses the biggest threat?|What can I use to my advantage?|What should I be on the lookout for?|What is being hidden from me?|What seems strange about this?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "perception",
		rollPhrase: "<span class='roll-desc'>roll +Perception</span>:",
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
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Read a Person",
		itemType: "move",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you read a person,",
		lists: {
			questions: "|Are you lying?|How do you feel right now?|What are you about to do?|What do you wish I would do?|How could I get you to […]?",
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "intuition",
		rollPhrase: "<span class='roll-desc'>roll +Intuition</span>:",
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
				text: "You accidentally reveal your own intentions to the person you’re trying to read. Tell the GM/player what these intentions are. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "See Through the Illusion",
		itemType: "move",
		type: "active",
		moveName: null,
		notes: null,
		clock: null,
		trigger: "When you suffer shock, injuries, or distort your perception through drugs or rituals,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "soul",
		rollPhrase: "<span class='roll-desc'>roll +Soul</span> to See Through the Illusion:",
		results: {
			success: {
				text: "You perceive things as they truly are.",
				list: null
			},
			partial: {
				text: "You see Reality, but you also affect the Illusion. The GM chooses one:",
				list: "|Something senses you.|The Illusions tears around you."
			},
			fail: {
				text: "The GM explains what you see. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Sealed Fate B",
		itemType: "+Sealed Fate",
		type: "passive",
		moveName: "Defy Death",
		notes: null,
		clock: null,
		trigger: "Whenever you die,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": "mark 2 Time from Condemned and reawaken, injured and weak, but alive. All your Wounds will be stabilized."
		},
		attributemod: null,
		rollPhrase: null,
		results: {
			success: {
				text: null,
				list: null
			},
			partial: {
				text: null,
				list: null
			},
			fail: {
				text: null,
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Explosives Expert B",
		itemType: "+Explosives Expert",
		type: "active",
		moveName: "Disarm Explosive",
		notes: null,
		clock: null,
		trigger: "When you are disarming a bomb,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "reason",
		rollPhrase: "<span class='roll-desc'>roll +Reason</span>:",
		results: {
			success: {
				text: "The bomb is deactivated.",
				list: null
			},
			partial: {
				text: "Complications arise. Maybe you can’t completely turn it off, just delay the timer, weaken the explosive effect, or something else turns up and makes thing worse.",
				list: null
			},
			fail: {
				text: "Fuck, that’s not good! The bomb may go off in your hands, the timer starts counting down from 10, 9, 8, 7…, or even bigger problems occur. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	},
	{
		name: "Shadow B",
		itemType: "+Shadow",
		type: "active",
		moveName: "Evade a Shadow",
		notes: null,
		clock: null,
		trigger: "Whenever you want to lose someone shadowing you,",
		lists: {
			questions: null,
			options: null,
			edges: null
		},
		description: {
			"intro": null,
			"static": null
		},
		attributemod: "perception",
		rollPhrase: "<span class='roll-desc'>roll +Perception</span>:",
		results: {
			success: {
				text: "You shake your pursuers and can choose to try to shadow them instead.",
				list: null
			},
			partial: {
				text: "You shake your pursuers.",
				list: null
			},
			fail: {
				text: "Your pursuers are still on your tail, and they can set up an ambush, disappear without a trace (only to show up when you least expect it), or refuse to go away. The GM makes a Move.",
				list: null
			}
		},
		suffix: {
			text: null,
			list: null
		},
		hasEdges: false,
		hasHolds: false,
		hasTokens: false
	}
];

export default JSONDATA;
