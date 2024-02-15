const palAPi = {
  id: 1,
  key: "001",
  image: "/public/images/paldeck/001.png",
  name: "Lamball",
  wiki: "https://palworld.fandom.com/wiki/Lamball",
  types: ["neutral"],
  imageWiki:
    "https://static.wikia.nocookie.net/palworld/images/0/01/Lamball_menu.png/",
  suitability: [
    {
      type: "handiwork",
      image: "/public/images/works/handiwork.png",
      level: 1,
    },
    {
      type: "transporting",
      image: "/public/images/works/transporting.png",
      level: 1,
    },
    {
      type: "farming",
      image: "/public/images/works/farming.png",
      level: 1,
    },
  ],
  drops: ["wool", "lamball_mutton"],
  aura: {
    name: "fluffy_shield",
    description:
      "When activated, equips to the player and becomes a shield.\nSometimes drops Wool when assigned to Ranch.",
    tech: null,
  },
  description:
    "A walk up a hill tends to end with this Pal tumbling back down. This causes it to become dizzy and unable to move, making it easy to capture and kill. As a result, this pal has tumbled down to the very bottom of the food chain itself.",
  skills: [
    {
      level: 1,
      name: "roly_poly",
      type: "neutral",
      cooldown: 1,
      power: 35,
      description:
        "Lamball's special skill. Curls into a ball, rolling after any enemies in its way. Becomes dizzy and unable to move after the attack ends.\n",
    },
    {
      level: 7,
      name: "air_cannon",
      type: "neutral",
      cooldown: 2,
      power: 25,
      description: "Quickly fires a burst of highly pressurized air.\n",
    },
    {
      level: 15,
      name: "power_shot",
      type: "neutral",
      cooldown: 4,
      power: 35,
      description: "Charges energy into a focused blast.\n",
    },
    {
      level: 22,
      name: "implode",
      type: "neutral",
      cooldown: 55,
      power: 180,
      description:
        "Risks its life to cause a violent explosion. Becomes incapacitated afterwards.\n",
    },
    {
      level: 30,
      name: "electric_ball",
      type: "electric",
      cooldown: 9,
      power: 50,
      description: "Fires an electric ball that slowly pursues an enemy.\n",
    },
    {
      level: 40,
      name: "power_bomb",
      type: "neutral",
      cooldown: 15,
      power: 70,
      description:
        "Charges a massive amount of energy before firing a large destructive ball.\n",
    },
    {
      level: 50,
      name: "pal_blast",
      type: "neutral",
      cooldown: 55,
      power: 150,
      description:
        "Charges destructive energy before firing a high-powered beam forward across a wide area.\n",
    },
  ],
  stats: {
    hp: 70,
    attack: {
      melee: 70,
      ranged: 70,
    },
    defense: 70,
    speed: {
      ride: 550,
      run: 400,
      walk: 40,
    },
    stamina: 100,
    support: 100,
    food: 2,
  },
  asset: "SheepBall",
  genus: "humanoid",
  rarity: 1,
  price: 1000,
  size: "xs",
  maps: {
    day: "/public/images/maps/001-day.png",
    night: "/public/images/maps/001-night.png",
  },
  breeding: {
    rank: 1470,
    order: 27,
    child_eligble: true,
    male_probability: 50.0,
  },
};
export type PalType = typeof palAPi;
