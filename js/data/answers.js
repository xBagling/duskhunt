// Every animal that can be a daily answer.
// • The key must match an entry in animal-list.js (the slug of its name).
// • sound: a recording from Wikimedia Commons (CC0 / public domain / CC BY / CC BY-SA — all allow
//   commercial use as long as the credit is shown, which the reveal screen does).
//   Optional start/len (seconds) pick the exact moment to play; tune them in the admin sound lab.
// • difficulty: 1 easy, 2 medium, 3 hard. The schedule puts easy days early in the week.
// • continents: any of North America, South America, Europe, Africa, Asia, Oceania, Oceans, Worldwide.
// After adding animals, run: bun tools/build-schedule.mjs

export const DEMO_ID = "domestic-cat"; // used in "How to play", never scheduled

export const ANSWERS = {
  "lion": {
    "sci": "Panthera leo",
    "wiki": "Lion",
    "difficulty": 1,
    "continents": [
      "Africa",
      "Asia"
    ],
    "habitat": "Savanna and grassland",
    "fact": "A lion's roar can be heard up to 8 km (5 miles) away.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/7d/Lion_raring-sound1TamilNadu178.ogg/Lion_raring-sound1TamilNadu178.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Lion_raring-sound1TamilNadu178.ogg",
      "credit": "த*உழவன்",
      "license": "Public domain"
    }
  },
  "tiger": {
    "sci": "Panthera tigris",
    "wiki": "Tiger",
    "difficulty": 2,
    "continents": [
      "Asia"
    ],
    "habitat": "Forests and mangrove swamps",
    "fact": "No two tigers have the same stripes, and the stripes are on their skin too, not just their fur.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/29/439280_schots_angry-tiger.wav/439280_schots_angry-tiger.wav.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:439280_schots_angry-tiger.wav",
      "credit": "schots",
      "license": "CC0"
    }
  },
  "dog": {
    "sci": "Canis familiaris",
    "wiki": "Dog",
    "difficulty": 1,
    "continents": [
      "Worldwide"
    ],
    "habitat": "Your couch, mostly",
    "fact": "Dogs were domesticated at least 15,000 years ago, long before any farm animal.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a2/Barking_of_a_dog.ogg/Barking_of_a_dog.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Barking_of_a_dog.ogg",
      "credit": "Amada44",
      "license": "CC BY-SA 3.0"
    }
  },
  "coyote": {
    "sci": "Canis latrans",
    "wiki": "Coyote",
    "difficulty": 2,
    "continents": [
      "North America"
    ],
    "habitat": "Deserts, prairies and cities",
    "fact": "Just two coyotes yipping together can sound like a whole pack. It's called the 'beau geste' effect.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/67/Pack_of_coyotes_howling.ogg/Pack_of_coyotes_howling.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Pack_of_coyotes_howling.ogg",
      "credit": "Rybkovich",
      "license": "CC BY-SA 4.0"
    }
  },
  "red-fox": {
    "sci": "Vulpes vulpes",
    "wiki": "Red fox",
    "difficulty": 2,
    "continents": [
      "North America",
      "Europe",
      "Asia",
      "Africa",
      "Oceania"
    ],
    "habitat": "Forests, farmland and cities",
    "fact": "Foxes have around 20 different calls. Their nighttime scream is so eerie that people often mistake it for a person.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f3/Bellender_Fuchs.ogg/Bellender_Fuchs.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Bellender_Fuchs.ogg",
      "credit": "Jugrü",
      "license": "CC BY-SA 3.0"
    }
  },
  "domestic-cat": {
    "sci": "Felis catus",
    "wiki": "Cat",
    "difficulty": 1,
    "continents": [
      "Worldwide"
    ],
    "habitat": "Sunny windowsills",
    "fact": "Adult cats rarely meow at each other. They mostly save it for talking to humans.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/53/Felis_silvestris_catus_meows.ogg/Felis_silvestris_catus_meows.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Felis_silvestris_catus_meows.ogg",
      "credit": "Tobias Puderer",
      "license": "CC BY-SA 3.0"
    }
  },
  "spotted-hyena": {
    "sci": "Crocuta crocuta",
    "wiki": "Spotted hyena",
    "difficulty": 2,
    "continents": [
      "Africa"
    ],
    "habitat": "Savanna and open woodland",
    "fact": "A hyena's 'whoop' carries up to 5 km (3 miles) across the savanna, and each hyena's whoop is unique.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/07/Spotted_Hyaena_%28Crocuta_crocuta%29_%28W1CDR0000381_BD12%29.ogg/Spotted_Hyaena_%28Crocuta_crocuta%29_%28W1CDR0000381_BD12%29.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Spotted_Hyaena_(Crocuta_crocuta)_(W1CDR0000381_BD12).ogg",
      "credit": "David Watts / The British Library",
      "license": "CC BY 4.0"
    }
  },
  "cow": {
    "accept": ["highland-cow"],
    "sci": "Bos taurus",
    "wiki": "Cattle",
    "difficulty": 1,
    "continents": [
      "Worldwide"
    ],
    "habitat": "Farms and fields",
    "fact": "Every cow has its own unique moo, and a calf can pick out its mother's voice from the whole herd.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/48/Mudchute_cow_1.ogg/Mudchute_cow_1.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Mudchute_cow_1.ogg",
      "credit": "Secretlondon",
      "license": "CC BY-SA 3.0"
    }
  },
  "sheep": {
    "sci": "Ovis aries",
    "wiki": "Sheep",
    "difficulty": 1,
    "continents": [
      "Worldwide"
    ],
    "habitat": "Farms and hillsides",
    "fact": "Sheep can remember the faces of at least 50 other sheep for up to two years.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/2a/Mudchute_sheep_1.ogg/Mudchute_sheep_1.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Mudchute_sheep_1.ogg",
      "credit": "Secretlondon",
      "license": "CC BY-SA 3.0"
    }
  },
  "goat": {
    "sci": "Capra hircus",
    "wiki": "Goat",
    "difficulty": 1,
    "continents": [
      "Worldwide"
    ],
    "habitat": "Farms and mountains",
    "fact": "Young goats develop 'accents': kids raised together start to bleat alike.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/bc/Herd_of_goats_bleating.ogg/Herd_of_goats_bleating.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Herd_of_goats_bleating.ogg",
      "credit": "stephan",
      "license": "Public domain"
    }
  },
  "donkey": {
    "sci": "Equus asinus",
    "wiki": "Donkey",
    "difficulty": 1,
    "continents": [
      "Worldwide"
    ],
    "habitat": "Farms and dry hills",
    "fact": "A donkey's hee-haw can be heard about 3 km (2 miles) away, perfect for keeping in touch across empty deserts.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6d/%D0%94%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D0%B8%D0%B9_%D0%9E%D1%81%D1%91%D0%BB%2C_%D0%9A%D0%B8%D0%BF%D1%80%D0%B8%D0%BE%D1%82%D1%81%D0%BA%D0%B8%D0%B9.ogg/%D0%94%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D0%B8%D0%B9_%D0%9E%D1%81%D1%91%D0%BB%2C_%D0%9A%D0%B8%D0%BF%D1%80%D0%B8%D0%BE%D1%82%D1%81%D0%BA%D0%B8%D0%B9.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:%D0%94%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D0%B8%D0%B9_%D0%9E%D1%81%D1%91%D0%BB,_%D0%9A%D0%B8%D0%BF%D1%80%D0%B8%D0%BE%D1%82%D1%81%D0%BA%D0%B8%D0%B9.ogg",
      "credit": "Warper up",
      "license": "CC BY-SA 3.0"
    }
  },
  "asian-elephant": {
    "sci": "Elephas maximus",
    "wiki": "Asian elephant",
    "difficulty": 1,
    "continents": [
      "Asia"
    ],
    "habitat": "Forests and grasslands",
    "fact": "Elephants also talk in rumbles too deep for humans to hear, which can travel for kilometres.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/40/Elephant_voice_-_trumpeting.ogg/Elephant_voice_-_trumpeting.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Elephant_voice_-_trumpeting.ogg",
      "credit": "தகவலுழவன்",
      "license": "CC0"
    }
  },
  "chimpanzee": {
    "sci": "Pan troglodytes",
    "wiki": "Chimpanzee",
    "difficulty": 2,
    "continents": [
      "Africa"
    ],
    "habitat": "Rainforest",
    "fact": "Chimps 'pant-hoot' to call to friends across the forest, and each chimp's call is recognizable.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/56/Pant-hoot_call_made_by_a_male_chimpanzee.ogg/Pant-hoot_call_made_by_a_male_chimpanzee.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Pant-hoot_call_made_by_a_male_chimpanzee.ogg",
      "credit": "Pawel Fedurek et al.",
      "license": "CC BY 4.0"
    }
  },
  "siamang": {
    "sci": "Symphalangus syndactylus",
    "wiki": "Siamang",
    "difficulty": 3,
    "continents": [
      "Asia"
    ],
    "habitat": "Rainforest treetops",
    "fact": "Siamangs have a throat sac that inflates like a balloon to make their duets extra loud.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a0/Hylobates_syndactylus_calling_3588.ogg/Hylobates_syndactylus_calling_3588.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Hylobates_syndactylus_calling_3588.ogg",
      "credit": "Dori",
      "license": "Public domain"
    }
  },
  "lar-gibbon": {
    "sci": "Hylobates lar",
    "wiki": "Lar gibbon",
    "difficulty": 3,
    "continents": [
      "Asia"
    ],
    "habitat": "Rainforest treetops",
    "fact": "Gibbon couples sing duets together, and their songs carry for more than a kilometre through the jungle.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/95/Lar_Gibbon_hoots.ogg/Lar_Gibbon_hoots.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Lar_Gibbon_hoots.ogg",
      "credit": "FunkMonk",
      "license": "CC BY-SA 3.0"
    }
  },
  "howler-monkey": {
    "sci": "Alouatta palliata",
    "wiki": "Mantled howler",
    "difficulty": 2,
    "continents": [
      "North America",
      "South America"
    ],
    "habitat": "Rainforest treetops",
    "fact": "Howler monkeys are among the loudest land animals. Their calls can be heard up to 5 km (3 miles) away.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/81/Mantled_Howler_Monkey_%28Alouatta_palliata%29_%28W_ALOUATTA_PALLIATA_R1_C2%29.ogg/Mantled_Howler_Monkey_%28Alouatta_palliata%29_%28W_ALOUATTA_PALLIATA_R1_C2%29.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Mantled_Howler_Monkey_(Alouatta_palliata)_(W_ALOUATTA_PALLIATA_R1_C2).ogg",
      "credit": "Richard Ranft / The British Library",
      "license": "CC BY 4.0"
    }
  },
  "indri": {
    "sci": "Indri indri",
    "wiki": "Indri",
    "difficulty": 3,
    "continents": [
      "Africa"
    ],
    "habitat": "Rainforests of Madagascar",
    "fact": "Indris are the only lemurs that sing, and family groups harmonize in songs that can last minutes.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/44/Roep_Indri_Indri.ogg/Roep_Indri_Indri.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Roep_Indri_Indri.ogg",
      "credit": "Stijn de Jong",
      "license": "CC BY-SA 2.5"
    }
  },
  "ring-tailed-lemur": {
    "sci": "Lemur catta",
    "wiki": "Ring-tailed lemur",
    "difficulty": 3,
    "continents": [
      "Africa"
    ],
    "habitat": "Dry forests of Madagascar",
    "fact": "Males have 'stink fights', wafting scent from their tails at each other to settle arguments.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/9a/Lemur_catta--cackle1.ogg/Lemur_catta--cackle1.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Lemur_catta--cackle1.ogg",
      "credit": "Joseph M. Macedonia",
      "license": "CC BY-SA 3.0"
    }
  },
  "humpback-whale": {
    "sci": "Megaptera novaeangliae",
    "wiki": "Humpback whale",
    "difficulty": 2,
    "continents": [
      "Oceans"
    ],
    "habitat": "Oceans all over the world",
    "fact": "Male humpbacks sing songs that change every year, and whales across a whole ocean learn the new hit.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/1/13/Humpbackwhale2.ogg/Humpbackwhale2.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Humpbackwhale2.ogg",
      "credit": "Spyrogumas",
      "license": "CC0"
    }
  },
  "orca": {
    "sci": "Orcinus orca",
    "wiki": "Orca",
    "difficulty": 2,
    "continents": [
      "Oceans"
    ],
    "habitat": "Every ocean, from the tropics to the poles",
    "fact": "Each orca family has its own dialect of calls, passed down from mothers to calves.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/79/Killer_whale.ogg/Killer_whale.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Killer_whale.ogg",
      "credit": "Public domain recording (see source)",
      "license": "Public domain"
    }
  },
  "beluga-whale": {
    "sci": "Delphinapterus leucas",
    "wiki": "Beluga whale",
    "difficulty": 2,
    "continents": [
      "Oceans"
    ],
    "habitat": "Arctic and sub-Arctic seas",
    "fact": "Belugas are nicknamed 'sea canaries' for all their whistles, chirps and clicks.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/9f/Beluga_vocalizations.ogg/Beluga_vocalizations.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Beluga_vocalizations.ogg",
      "credit": "Recorded by Fisheries Research Agency, Japan, with…",
      "license": "Public domain"
    }
  },
  "red-deer": {
    "sci": "Cervus elaphus",
    "wiki": "Red deer",
    "difficulty": 2,
    "continents": [
      "Europe",
      "Asia"
    ],
    "habitat": "Forests and moorland",
    "fact": "In autumn, stags roar to show off, and females can judge a stag's size just from how deep his roar is.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/95/Hirsch_roehrt.ogg/Hirsch_roehrt.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Hirsch_roehrt.ogg",
      "credit": "Jugrü",
      "license": "CC BY-SA 3.0"
    }
  },
  "elk": {
    "sci": "Cervus canadensis",
    "wiki": "Elk",
    "difficulty": 2,
    "continents": [
      "North America",
      "Asia"
    ],
    "habitat": "Mountains and forests",
    "fact": "A bull elk's 'bugle' mixes a deep growl and a high whistle at the same time.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/88/American_Elk_Bugling.ogg/American_Elk_Bugling.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:American_Elk_Bugling.ogg",
      "credit": "Jim Pisarowicz",
      "license": "Public domain"
    }
  },
  "guinea-pig": {
    "sci": "Cavia porcellus",
    "wiki": "Guinea pig",
    "difficulty": 2,
    "continents": [
      "Worldwide"
    ],
    "habitat": "Hutches and living rooms",
    "fact": "Guinea pigs 'wheek' loudly when they hear a fridge or a snack bag open. They've learned what it means.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/e/e2/Guinea_Pig_Feeding_Wheek.ogg/Guinea_Pig_Feeding_Wheek.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Guinea_Pig_Feeding_Wheek.ogg",
      "credit": "myself",
      "license": "Public domain"
    }
  },
  "giant-panda": {
    "sci": "Ailuropoda melanoleuca",
    "wiki": "Giant panda",
    "difficulty": 3,
    "continents": [
      "Asia"
    ],
    "habitat": "Bamboo forests of China",
    "fact": "Pandas don't roar. They bleat like goats, honk, and even 'twitter' and squeak.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b8/Giant_panda_twittering.ogg/Giant_panda_twittering.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Giant_panda_twittering.ogg",
      "credit": "Myself",
      "license": "Public domain"
    }
  },
  "meerkat": {
    "sci": "Suricata suricatta",
    "wiki": "Meerkat",
    "difficulty": 3,
    "continents": [
      "Africa"
    ],
    "habitat": "Deserts and dry grassland",
    "fact": "Meerkats have different alarm calls for eagles and for jackals, so the group knows exactly how to react.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/50/Erdmaennchen.ogg/Erdmaennchen.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Erdmaennchen.ogg",
      "credit": "Jugrü",
      "license": "CC BY-SA 3.0"
    }
  },
  "raccoon": {
    "sci": "Procyon lotor",
    "wiki": "Raccoon",
    "difficulty": 3,
    "continents": [
      "North America",
      "Europe",
      "Asia"
    ],
    "habitat": "Forests and cities",
    "fact": "Baby raccoons, called kits, chitter and twitter to keep in touch with their mother.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f7/Baby_Raccoon_Chatter_1.flac/Baby_Raccoon_Chatter_1.flac.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Baby_Raccoon_Chatter_1.flac",
      "credit": "jnargus",
      "license": "CC BY 3.0"
    }
  },
  "gray-wolf": {
    "accept": ["arctic-wolf"],
    "sci": "Canis lupus",
    "wiki": "Wolf",
    "difficulty": 1,
    "continents": [
      "North America",
      "Europe",
      "Asia"
    ],
    "habitat": "Forests, tundra and mountains",
    "fact": "Wolves howl to find their pack, and each wolf has a voice its packmates can recognize.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/87/Wolf_howls.ogg/Wolf_howls.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Wolf_howls.ogg",
      "credit": "Public domain recording (see source)",
      "license": "Public domain"
    }
  },
  "pig": {
    "sci": "Sus domesticus",
    "wiki": "Pig",
    "difficulty": 1,
    "continents": [
      "Worldwide"
    ],
    "habitat": "Farms",
    "fact": "Pigs have more than 20 different sounds, from friendly greeting grunts to 'where's my dinner?' squeals.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/ac/Pig_grunt_-_Erdie.ogg/Pig_grunt_-_Erdie.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Pig_grunt_-_Erdie.ogg",
      "credit": "erdie",
      "license": "CC BY 3.0"
    }
  },
  "horse": {
    "accept": ["przewalskis-horse"],
    "sci": "Equus caballus",
    "wiki": "Horse",
    "difficulty": 1,
    "continents": [
      "Worldwide"
    ],
    "habitat": "Farms and grasslands",
    "fact": "A horse's whinny is actually two sounds at once, made at two different pitches at the same time.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/d/db/Wiehern.ogg/Wiehern.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Wiehern.ogg",
      "credit": "Hü.",
      "license": "Public domain"
    }
  },
  "hedgehog": {
    "sci": "Erinaceus europaeus",
    "wiki": "European hedgehog",
    "difficulty": 3,
    "continents": [
      "Europe"
    ],
    "habitat": "Gardens and hedgerows",
    "fact": "Hedgehogs snuffle and snort like tiny pigs while they hunt, which is how they got their name.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/1/19/Braunigel_Drohger%C3%A4usche.ogg/Braunigel_Drohger%C3%A4usche.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Braunigel_Drohger%C3%A4usche.ogg",
      "credit": "Richard Huber",
      "license": "CC BY-SA 4.0"
    }
  },
  "house-mouse": {
    "sci": "Mus musculus",
    "wiki": "House mouse",
    "difficulty": 3,
    "continents": [
      "Worldwide"
    ],
    "habitat": "Houses, barns and fields",
    "fact": "Male mice sing ultrasonic love songs that are too high for humans to hear unless they're slowed down.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/08/Ultrasonic-Songs-of-Male-Mice-pbio.0030386.sa004.ogg/Ultrasonic-Songs-of-Male-Mice-pbio.0030386.sa004.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Ultrasonic-Songs-of-Male-Mice-pbio.0030386.sa004.ogg",
      "credit": "Holy T, Guo Z (PLoS Biology, 2005), pitch-shifted 16× down so humans can hear it",
      "license": "CC BY 3.0"
    }
  },
  "chicken": {
    "sci": "Gallus gallus domesticus",
    "wiki": "Chicken",
    "difficulty": 1,
    "continents": [
      "Worldwide"
    ],
    "habitat": "Farms and backyards",
    "fact": "Chickens have over 20 different calls, including separate alarms for danger from the sky and danger on the ground.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c5/Rooster_crowing.ogg/Rooster_crowing.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Rooster_crowing.ogg",
      "credit": "Filo gèn'",
      "license": "CC BY-SA 4.0"
    }
  },
  "mallard": {
    "accept": ["domestic-duck"],
    "sci": "Anas platyrhynchos",
    "wiki": "Mallard",
    "difficulty": 1,
    "continents": [
      "North America",
      "Europe",
      "Asia"
    ],
    "habitat": "Ponds, lakes and parks",
    "fact": "Only female mallards make the classic loud 'quack'. Males make a quieter, raspy sound.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/95/Mallard_%28Anas_platyrhynchos%29_%28W1CDR0001518_BD17%29.ogg/Mallard_%28Anas_platyrhynchos%29_%28W1CDR0001518_BD17%29.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Mallard_(Anas_platyrhynchos)_(W1CDR0001518_BD17).ogg",
      "credit": "Aubrey John Williams / The British Library",
      "license": "CC BY-SA 4.0"
    }
  },
  "canada-goose": {
    "sci": "Branta canadensis",
    "wiki": "Canada goose",
    "difficulty": 1,
    "continents": [
      "North America",
      "Europe"
    ],
    "habitat": "Lakes, parks and golf courses",
    "fact": "Canada geese fly in a V so each bird saves energy by riding the air currents of the one in front.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/77/Branta_canadensis.ogg/Branta_canadensis.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Branta_canadensis.ogg",
      "credit": "Public domain recording (see source)",
      "license": "Public domain"
    }
  },
  "greylag-goose": {
    "sci": "Anser anser",
    "wiki": "Greylag goose",
    "difficulty": 2,
    "continents": [
      "Europe",
      "Asia"
    ],
    "habitat": "Wetlands and farmland",
    "fact": "Almost all farmyard geese in Europe are descended from the wild greylag goose.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/0/0e/Greylag_Goose_%28Anser_anser%29_-_B%C3%A6rum%2C_Norway_2021-04-03.mp3?utm_source=commons.wikimedia.org&utm_campaign=api&utm_content=original",
      "page": "https://commons.wikimedia.org/wiki/File:Greylag_Goose_(Anser_anser)_-_B%C3%A6rum,_Norway_2021-04-03.mp3",
      "credit": "Ryan Hodnett",
      "license": "CC BY-SA 4.0"
    }
  },
  "whooper-swan": {
    "sci": "Cygnus cygnus",
    "wiki": "Whooper swan",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia"
    ],
    "habitat": "Lakes and marshes",
    "fact": "Whooper swans are named after their loud, trumpet-like 'whooping' calls.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/4d/Whooper_Swan_%28Cygnus_cygnus%29_%28W_CYGNUS_CYGNUS_R1_C6%29.ogg/Whooper_Swan_%28Cygnus_cygnus%29_%28W_CYGNUS_CYGNUS_R1_C6%29.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Whooper_Swan_(Cygnus_cygnus)_(W_CYGNUS_CYGNUS_R1_C6).ogg",
      "credit": "Richard Ridgeway / The British Library",
      "license": "CC BY 4.0"
    }
  },
  "common-loon": {
    "sci": "Gavia immer",
    "wiki": "Common loon",
    "difficulty": 2,
    "continents": [
      "North America"
    ],
    "habitat": "Northern lakes",
    "fact": "The loon's haunting wail is so famous that movies use it to sound spooky, even in places loons never live.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/02/Common_loon_yodels.ogg/Common_loon_yodels.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Common_loon_yodels.ogg",
      "credit": "Darwin Long, Peter Otto",
      "license": "CC BY-SA 2.5"
    }
  },
  "laughing-kookaburra": {
    "sci": "Dacelo novaeguineae",
    "wiki": "Laughing kookaburra",
    "difficulty": 1,
    "continents": [
      "Oceania"
    ],
    "habitat": "Eucalyptus forests of Australia",
    "fact": "The kookaburra's 'laugh' is really a warning to other birds: this territory is taken.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/ca/LaughingKookaburra.ogg/LaughingKookaburra.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:LaughingKookaburra.ogg",
      "credit": "Kuco",
      "license": "Public domain"
    }
  },
  "eurasian-eagle-owl": {
    "sci": "Bubo bubo",
    "wiki": "Eurasian eagle-owl",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia",
      "Africa"
    ],
    "habitat": "Cliffs and forests",
    "fact": "Its deep 'oo-hu' hoot carries for kilometres on a still night.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/b/be/Bubo_bubo_-_Eurasian_Eagle-Owl_XC461330.mp3?utm_source=commons.wikimedia.org&utm_campaign=api&utm_content=original",
      "page": "https://commons.wikimedia.org/wiki/File:Bubo_bubo_-_Eurasian_Eagle-Owl_XC461330.mp3",
      "credit": "Mirko Tomasi",
      "license": "CC BY-SA 4.0"
    }
  },
  "barn-owl": {
    "sci": "Tyto alba",
    "wiki": "Barn owl",
    "difficulty": 2,
    "continents": [
      "North America",
      "South America",
      "Europe",
      "Africa",
      "Asia",
      "Oceania"
    ],
    "habitat": "Farmland and barns",
    "fact": "Barn owls don't hoot. They let out a long, bloodcurdling shriek.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/2b/Barn_Owl_%28Tyto_alba%29_%28W_TYTO_ALBA_R1_C16%29.ogg/Barn_Owl_%28Tyto_alba%29_%28W_TYTO_ALBA_R1_C16%29.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Barn_Owl_(Tyto_alba)_(W_TYTO_ALBA_R1_C16).ogg",
      "credit": "Victor C. Lewis / The British Library",
      "license": "CC BY 4.0"
    }
  },
  "common-cuckoo": {
    "sci": "Cuculus canorus",
    "wiki": "Common cuckoo",
    "difficulty": 1,
    "continents": [
      "Europe",
      "Asia",
      "Africa"
    ],
    "habitat": "Woodland and meadows",
    "fact": "Cuckoos never raise their own chicks. They sneak their eggs into other birds' nests.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/33/Kuckuck.ogg/Kuckuck.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Kuckuck.ogg",
      "credit": "Jugrü",
      "license": "CC BY-SA 3.0"
    }
  },
  "herring-gull": {
    "sci": "Larus argentatus",
    "wiki": "European herring gull",
    "difficulty": 1,
    "continents": [
      "Europe",
      "North America"
    ],
    "habitat": "Coasts, harbours and chip shops",
    "fact": "Gull chicks peck the red spot on their parent's beak to ask for food.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/5/5c/XC707075_-_European_Herring_Gull_-_Larus_argentatus.mp3?utm_source=commons.wikimedia.org&utm_campaign=api&utm_content=original",
      "page": "https://commons.wikimedia.org/wiki/File:XC707075_-_European_Herring_Gull_-_Larus_argentatus.mp3",
      "credit": "Sonothèque ADVL",
      "license": "CC0"
    }
  },
  "indian-peafowl": {
    "sci": "Pavo cristatus",
    "wiki": "Indian peafowl",
    "difficulty": 2,
    "continents": [
      "Asia"
    ],
    "habitat": "Forests and farmland",
    "fact": "A peacock's loud call sounds a lot like someone yelling 'help!'",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/05/Pavo_cristatus_%28call%29.ogg/Pavo_cristatus_%28call%29.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Pavo_cristatus_(call).ogg",
      "credit": "Ke4roh",
      "license": "Public domain"
    }
  },
  "wild-turkey": {
    "sci": "Meleagris gallopavo",
    "wiki": "Wild turkey",
    "difficulty": 1,
    "continents": [
      "North America"
    ],
    "habitat": "Forests and fields",
    "fact": "Only male turkeys gobble, and the sound can carry about 1.5 km (1 mile).",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/1/11/Gobbler.ogg/Gobbler.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Gobbler.ogg",
      "credit": "bod",
      "license": "Public domain"
    }
  },
  "rock-dove": {
    "sci": "Columba livia",
    "wiki": "Rock dove",
    "difficulty": 1,
    "continents": [
      "Worldwide"
    ],
    "habitat": "Cities and cliffs",
    "fact": "Pigeons can find their way home from hundreds of kilometres away, partly by sensing Earth's magnetic field.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Columba_livia_-_Rock_Dove_XC541143.mp3?utm_source=commons.wikimedia.org&utm_campaign=api&utm_content=original",
      "page": "https://commons.wikimedia.org/wiki/File:Columba_livia_-_Rock_Dove_XC541143.mp3",
      "credit": "Marie-Lan Taÿ Pamart",
      "license": "CC BY-SA 4.0"
    }
  },
  "mourning-dove": {
    "sci": "Zenaida macroura",
    "wiki": "Mourning dove",
    "difficulty": 2,
    "continents": [
      "North America"
    ],
    "habitat": "Open country and backyards",
    "fact": "Its soft, sad 'coo-OO-oo' is how the mourning dove got its name.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a2/Zenaida_macroura_-_Mourning_Dove_XC128006.ogg/Zenaida_macroura_-_Mourning_Dove_XC128006.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Zenaida_macroura_-_Mourning_Dove_XC128006.ogg",
      "credit": "Jonathon Jongsma",
      "license": "CC BY-SA 3.0"
    }
  },
  "common-raven": {
    "sci": "Corvus corax",
    "wiki": "Common raven",
    "difficulty": 2,
    "continents": [
      "North America",
      "Europe",
      "Asia",
      "Africa"
    ],
    "habitat": "Mountains, forests and coasts",
    "fact": "Ravens can imitate other sounds, including car engines, other birds and even human words.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/ad/Common_Raven_Grand_Teton_National_Park.ogg/Common_Raven_Grand_Teton_National_Park.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Common_Raven_Grand_Teton_National_Park.ogg",
      "credit": "National Park Service",
      "license": "Public domain"
    }
  },
  "carrion-crow": {
    "accept": ["hooded-crow"],
    "sci": "Corvus corone",
    "wiki": "Carrion crow",
    "difficulty": 1,
    "continents": [
      "Europe",
      "Asia"
    ],
    "habitat": "Farmland, parks and cities",
    "fact": "Crows can recognize individual human faces and remember people who treated them badly.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/d/d1/Corvus_corone_-_Carrion_Crow_XC24828.mp3?utm_source=commons.wikimedia.org&utm_campaign=api&utm_content=original",
      "page": "https://commons.wikimedia.org/wiki/File:Corvus_corone_-_Carrion_Crow_XC24828.mp3",
      "credit": "Sander Pieterse",
      "license": "CC BY-SA 4.0"
    }
  },
  "eurasian-magpie": {
    "sci": "Pica pica",
    "wiki": "Eurasian magpie",
    "difficulty": 2,
    "continents": [
      "Europe",
      "Asia"
    ],
    "habitat": "Parks, farmland and woodland",
    "fact": "Magpies can recognize themselves in a mirror, something very few animals can do.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/61/Pica_pica-2015-6-12-part1.flac/Pica_pica-2015-6-12-part1.flac.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Pica_pica-2015-6-12-part1.flac",
      "credit": "Spyros Papanastasiou",
      "license": "CC0"
    }
  },
  "common-blackbird": {
    "sci": "Turdus merula",
    "wiki": "Common blackbird",
    "difficulty": 2,
    "continents": [
      "Europe",
      "Asia",
      "Africa",
      "Oceania"
    ],
    "habitat": "Gardens and woodland",
    "fact": "City blackbirds sing at a higher pitch than forest blackbirds, so they can be heard over the traffic.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/91/Amselrp.ogg/Amselrp.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Amselrp.ogg",
      "credit": "Anton",
      "license": "CC BY-SA 2.5"
    }
  },
  "common-nightingale": {
    "accept": ["thrush-nightingale"],
    "sci": "Luscinia megarhynchos",
    "wiki": "Common nightingale",
    "difficulty": 2,
    "continents": [
      "Europe",
      "Asia",
      "Africa"
    ],
    "habitat": "Thickets and woodland",
    "fact": "Male nightingales know hundreds of different song phrases and often sing all night long.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/ce/20130528Vogelzwitschern_Reilingen.ogg/20130528Vogelzwitschern_Reilingen.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:20130528Vogelzwitschern_Reilingen.ogg",
      "credit": "AnRo0002",
      "license": "CC0"
    }
  },
  "european-robin": {
    "sci": "Erithacus rubecula",
    "wiki": "European robin",
    "difficulty": 2,
    "continents": [
      "Europe"
    ],
    "habitat": "Gardens and woodland",
    "fact": "Robins sing all year round, and in winter even the females sing to defend their own patch.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/37/Erithacus_rubecula_-_European_Robin_-_XC114615.ogg/Erithacus_rubecula_-_European_Robin_-_XC114615.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Erithacus_rubecula_-_European_Robin_-_XC114615.ogg",
      "credit": "Jonathon Jongsma",
      "license": "CC BY-SA 3.0"
    }
  },
  "common-starling": {
    "sci": "Sturnus vulgaris",
    "wiki": "Common starling",
    "difficulty": 2,
    "continents": [
      "Europe",
      "Asia",
      "North America",
      "Oceania"
    ],
    "habitat": "Gardens, farms and cities",
    "fact": "Starlings are master mimics that can copy car alarms, phone ringtones and other birds.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/07/Sturnus_vulgaris.ogg/Sturnus_vulgaris.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Sturnus_vulgaris.ogg",
      "credit": "Vladimir Yu. Arkhipov, Arkhivov",
      "license": "CC BY-SA 3.0"
    }
  },
  "superb-lyrebird": {
    "sci": "Menura novaehollandiae",
    "wiki": "Superb lyrebird",
    "difficulty": 3,
    "continents": [
      "Oceania"
    ],
    "habitat": "Forests of south-eastern Australia",
    "fact": "Lyrebirds can mimic almost anything they hear, from kookaburras to camera shutters and chainsaws.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/4/48/Menura_novaehollandiae_-_Superb_Lyrebird_XC442964.mp3?utm_source=commons.wikimedia.org&utm_campaign=api&utm_content=original",
      "page": "https://commons.wikimedia.org/wiki/File:Menura_novaehollandiae_-_Superb_Lyrebird_XC442964.mp3",
      "credit": "James Ray",
      "license": "CC BY-SA 4.0"
    }
  },
  "scarlet-macaw": {
    "sci": "Ara macao",
    "wiki": "Scarlet macaw",
    "difficulty": 2,
    "continents": [
      "North America",
      "South America"
    ],
    "habitat": "Rainforest",
    "fact": "Macaws gather at clay cliffs to eat mud, which may give them salt that's missing from their diet.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/89/Scarlet_macaw_01.wav/Scarlet_macaw_01.wav.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Scarlet_macaw_01.wav",
      "credit": "Ganesh Mohan T",
      "license": "CC BY-SA 4.0"
    }
  },
  "kea": {
    "sci": "Nestor notabilis",
    "wiki": "Kea",
    "difficulty": 3,
    "continents": [
      "Oceania"
    ],
    "habitat": "Mountains of New Zealand",
    "fact": "Kea have a special 'laughing' call that makes other kea start playing.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Kea_%28Nestor_notabilis%29_song.ogg/Kea_%28Nestor_notabilis%29_song.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Kea_(Nestor_notabilis)_song.ogg",
      "credit": "Department of Conservation",
      "license": "CC BY 4.0"
    }
  },
  "great-spotted-woodpecker": {
    "sci": "Dendrocopos major",
    "wiki": "Great spotted woodpecker",
    "difficulty": 2,
    "continents": [
      "Europe",
      "Asia"
    ],
    "habitat": "Woodland and gardens",
    "fact": "Woodpeckers drum on trees up to 20 times per second to announce their territory.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/40/Great_Spotted_Woodpecker_drum.ogg/Great_Spotted_Woodpecker_drum.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Great_Spotted_Woodpecker_drum.ogg",
      "credit": "T.Voekler",
      "license": "CC BY-SA 3.0"
    }
  },
  "bald-eagle": {
    "sci": "Haliaeetus leucocephalus",
    "wiki": "Bald eagle",
    "difficulty": 2,
    "continents": [
      "North America"
    ],
    "habitat": "Lakes, rivers and coasts",
    "fact": "Bald eagles have a surprisingly weak, squeaky call, so movies often dub in a red-tailed hawk's scream instead.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/59/Bald_Eagle_Yellowstone_National_Park.ogg/Bald_Eagle_Yellowstone_National_Park.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Bald_Eagle_Yellowstone_National_Park.ogg",
      "credit": "National Park Service",
      "license": "Public domain"
    }
  },
  "common-crane": {
    "sci": "Grus grus",
    "wiki": "Common crane",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia",
      "Africa"
    ],
    "habitat": "Wetlands and fields",
    "fact": "A crane's long, looped windpipe works like a trumpet, making its calls carry for kilometres.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/06/Grus_grus.ogg/Grus_grus.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Grus_grus.ogg",
      "credit": "Волков Владислав Петрович (с разрешения серого журавля)",
      "license": "CC0"
    }
  },
  "eurasian-bittern": {
    "sci": "Botaurus stellaris",
    "wiki": "Eurasian bittern",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia",
      "Africa"
    ],
    "habitat": "Reedbeds",
    "fact": "The male bittern's 'boom' sounds like someone blowing over a bottle, and can be heard 5 km (3 miles) away.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/9/98/Botaurus_stellaris_-_Eurasian_Bittern_XC434683.mp3?utm_source=commons.wikimedia.org&utm_campaign=api&utm_content=original",
      "page": "https://commons.wikimedia.org/wiki/File:Botaurus_stellaris_-_Eurasian_Bittern_XC434683.mp3",
      "credit": "Joost van Bruggen",
      "license": "CC BY-SA 4.0"
    }
  },
  "eurasian-hoopoe": {
    "sci": "Upupa epops",
    "wiki": "Eurasian hoopoe",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia",
      "Africa"
    ],
    "habitat": "Open country and orchards",
    "fact": "The hoopoe is named after its soft call: 'oop-oop-oop'.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/cf/Upupa_epops.ogg/Upupa_epops.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Upupa_epops.ogg",
      "credit": "Vladimir Yu. Arkhipov, Arkhivov",
      "license": "CC BY-SA 3.0"
    }
  },
  "helmeted-guineafowl": {
    "sci": "Numida meleagris",
    "wiki": "Helmeted guineafowl",
    "difficulty": 3,
    "continents": [
      "Africa"
    ],
    "habitat": "Savanna and farms",
    "fact": "Farmers keep guineafowl as 'watchdogs', because they shriek loudly at anything unusual.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/8c/Guineahencall.ogg/Guineahencall.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Guineahencall.ogg",
      "credit": "Braincricket",
      "license": "CC BY-SA 3.0"
    }
  },
  "african-penguin": {
    "sci": "Spheniscus demersus",
    "wiki": "African penguin",
    "difficulty": 2,
    "continents": [
      "Africa"
    ],
    "habitat": "Coasts of southern Africa",
    "fact": "They're nicknamed 'jackass penguins' because their call sounds like a braying donkey.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/29/Vocal-individuality-cues-in-the-African-penguin-%28Spheniscus-demersus%29-a-source-filter-theory-srep17255-s2.oga/Vocal-individuality-cues-in-the-African-penguin-%28Spheniscus-demersus%29-a-source-filter-theory-srep17255-s2.oga.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Vocal-individuality-cues-in-the-African-penguin-(Spheniscus-demersus)-a-source-filter-theory-srep17255-s2.oga",
      "credit": "Favaro L, Gamba M, Alfieri C, Pessani D, McElligott A",
      "license": "CC BY 4.0"
    }
  },
  "greater-flamingo": {
    "sci": "Phoenicopterus roseus",
    "wiki": "Greater flamingo",
    "difficulty": 2,
    "continents": [
      "Africa",
      "Europe",
      "Asia"
    ],
    "habitat": "Salty lakes and lagoons",
    "fact": "Flamingos honk like geese, and a big flock can be deafening.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Phoenicopterus_roseus_-_Greater_Flamingo_XC432217.mp3?utm_source=commons.wikimedia.org&utm_campaign=api&utm_content=original",
      "page": "https://commons.wikimedia.org/wiki/File:Phoenicopterus_roseus_-_Greater_Flamingo_XC432217.mp3",
      "credit": "Joost van Bruggen",
      "license": "CC BY-SA 4.0"
    }
  },
  "common-pheasant": {
    "sci": "Phasianus colchicus",
    "wiki": "Common pheasant",
    "difficulty": 2,
    "continents": [
      "Asia",
      "Europe",
      "North America"
    ],
    "habitat": "Farmland and woodland edges",
    "fact": "Male pheasants give a loud 'kok-kok' crow and then whirr their wings.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/88/Phasianus_colchicus_-_Common_Pheasant_-_XC115583.ogg/Phasianus_colchicus_-_Common_Pheasant_-_XC115583.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Phasianus_colchicus_-_Common_Pheasant_-_XC115583.ogg",
      "credit": "Jonathon Jongsma",
      "license": "CC BY-SA 3.0"
    }
  },
  "northern-cardinal": {
    "sci": "Cardinalis cardinalis",
    "wiki": "Northern cardinal",
    "difficulty": 2,
    "continents": [
      "North America"
    ],
    "habitat": "Gardens and woodland",
    "fact": "Unlike most songbirds, female cardinals sing too, sometimes to ask the male to bring food to the nest.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Cardinalis_cardinalis_-_Northern_Cardinal_XC75501.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Cardinalis_cardinalis_-_Northern_Cardinal_XC75501.mp3",
      "credit": "Jonathon Jongsma",
      "license": "CC BY-SA 3.0"
    }
  },
  "blue-jay": {
    "sci": "Cyanocitta cristata",
    "wiki": "Blue jay",
    "difficulty": 2,
    "continents": [
      "North America"
    ],
    "habitat": "Forests and backyards",
    "fact": "Blue jays can imitate a hawk's scream, possibly to scare other birds away from food.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a3/Blue_Jay.ogg/Blue_Jay.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Blue_Jay.ogg",
      "credit": "G. McGrane",
      "license": "Public domain"
    }
  },
  "eurasian-curlew": {
    "sci": "Numenius arquata",
    "wiki": "Eurasian curlew",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia",
      "Africa"
    ],
    "habitat": "Moors and mudflats",
    "fact": "The curlew is named after its call: a rising, bubbling 'cur-lee'.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/0/00/XN_Numenius_arquata.ogg/XN_Numenius_arquata.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:XN_Numenius_arquata.ogg",
      "credit": "Guido Gerding",
      "license": "CC BY-SA 3.0"
    }
  },
  "common-swift": {
    "sci": "Apus apus",
    "wiki": "Common swift",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia",
      "Africa"
    ],
    "habitat": "The skies over towns",
    "fact": "Young swifts can stay in the air for up to 10 months without landing, eating and even sleeping on the wing.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5e/Mauersegler.ogg/Mauersegler.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Mauersegler.ogg",
      "credit": "Jugrü",
      "license": "CC BY-SA 3.0"
    }
  },
  "great-tit": {
    "sci": "Parus major",
    "wiki": "Great tit",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia"
    ],
    "habitat": "Woodland and gardens",
    "fact": "Great tits have a call that sounds like 'tea-cher, tea-cher'.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/cd/Parus_major_-_Great_Tit_XC129643.ogg/Parus_major_-_Great_Tit_XC129643.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Parus_major_-_Great_Tit_XC129643.ogg",
      "credit": "Gavin Vella",
      "license": "CC BY-SA 3.0"
    }
  },
  "eurasian-collared-dove": {
    "sci": "Streptopelia decaocto",
    "wiki": "Eurasian collared dove",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia"
    ],
    "habitat": "Towns and gardens",
    "fact": "Its 'coo-COO-coo' is often mistaken for a cuckoo, and it spread across all of Europe in about 50 years.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/91/Streptopelia_decaocto_-_Eurasian_Collared_Dove_-_XC82758.ogg/Streptopelia_decaocto_-_Eurasian_Collared_Dove_-_XC82758.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Streptopelia_decaocto_-_Eurasian_Collared_Dove_-_XC82758.ogg",
      "credit": "Jonathon Jongsma",
      "license": "CC BY-SA 3.0"
    }
  },
  "common-quail": {
    "sci": "Coturnix coturnix",
    "wiki": "Common quail",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia",
      "Africa"
    ],
    "habitat": "Farmland and grassland",
    "fact": "The male's call sounds like 'wet-my-lips', and you'll hear it far more often than you'll see the bird.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/77/Common_Quail_%28Coturnix_coturnix%29_%28W1CDR0001390_BD1%29.ogg/Common_Quail_%28Coturnix_coturnix%29_%28W1CDR0001390_BD1%29.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Common_Quail_(Coturnix_coturnix)_(W1CDR0001390_BD1).ogg",
      "credit": "Lawrence Shove (British Library)",
      "license": "CC BY-SA 4.0"
    }
  },
  "spring-peeper": {
    "sci": "Pseudacris crucifer",
    "wiki": "Spring peeper",
    "difficulty": 3,
    "continents": [
      "North America"
    ],
    "habitat": "Woodland ponds",
    "fact": "Spring peepers are about the size of a paperclip, but a big chorus can be heard over a kilometre away.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/4a/Springpeepers.ogg/Springpeepers.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Springpeepers.ogg",
      "credit": "Mdf, edits by user:Borisblue",
      "license": "CC BY-SA 3.0"
    }
  },
  "common-coqui": {
    "sci": "Eleutherodactylus coqui",
    "wiki": "Common coquí",
    "difficulty": 3,
    "continents": [
      "North America"
    ],
    "habitat": "Forests of Puerto Rico",
    "fact": "It's named after its two-note call, 'ko-KEE', which can be as loud as a lawnmower.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/84/Coqu%C3%AD.flac/Coqu%C3%AD.flac.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Coqu%C3%AD.flac",
      "credit": "Caballero1967",
      "license": "CC BY-SA 4.0"
    }
  },
  "common-toad": {
    "sci": "Bufo bufo",
    "wiki": "Common toad",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia"
    ],
    "habitat": "Gardens, woods and ponds",
    "fact": "Every spring, toads migrate back to the pond where they were born, sometimes crossing roads in huge numbers.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3b/Erdkr%C3%B6te_Paarungsruf.OGG/Erdkr%C3%B6te_Paarungsruf.OGG.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Erdkr%C3%B6te_Paarungsruf.OGG",
      "credit": "Rabe19 (Diskussion)",
      "license": "Public domain"
    }
  },
  "natterjack-toad": {
    "sci": "Epidalea calamita",
    "wiki": "Natterjack toad",
    "difficulty": 3,
    "continents": [
      "Europe"
    ],
    "habitat": "Sand dunes and heaths",
    "fact": "Natterjacks have one of the loudest calls of any amphibian in Europe, carrying up to 2 km.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Epidalea_calamita.ogg/Epidalea_calamita.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Epidalea_calamita.ogg",
      "credit": "DaddyCell",
      "license": "CC BY-SA 4.0"
    }
  },
  "european-tree-frog": {
    "sci": "Hyla arborea",
    "wiki": "European tree frog",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia"
    ],
    "habitat": "Wet meadows and bushes",
    "fact": "It's tiny, but a European tree frog's call can be heard a kilometre away.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/53/XN_Hyla_arborea_01.ogg/XN_Hyla_arborea_01.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:XN_Hyla_arborea_01.ogg",
      "credit": "XN",
      "license": "CC BY-SA 3.0"
    }
  },
  "marsh-frog": {
    "sci": "Pelophylax ridibundus",
    "wiki": "Marsh frog",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia"
    ],
    "habitat": "Ponds and ditches",
    "fact": "Its scientific name 'ridibundus' means 'laughing': its call sounds like a cackle.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/59/Marsh_frog_%28Pelophylax_ridibundus%29_call.ogg/Marsh_frog_%28Pelophylax_ridibundus%29_call.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Marsh_frog_(Pelophylax_ridibundus)_call.ogg",
      "credit": "Llivermore",
      "license": "CC BY-SA 4.0"
    }
  },
  "american-toad": {
    "sci": "Anaxyrus americanus",
    "wiki": "American toad",
    "difficulty": 3,
    "continents": [
      "North America"
    ],
    "habitat": "Gardens and forests",
    "fact": "A male American toad's trill can last up to 30 seconds without a break.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3a/Anaxyrus_americanus_-_American_Toad_Vocalization.wav/Anaxyrus_americanus_-_American_Toad_Vocalization.wav.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Anaxyrus_americanus_-_American_Toad_Vocalization.wav",
      "credit": "SwampVids",
      "license": "CC BY 4.0"
    }
  },
  "tokay-gecko": {
    "sci": "Gekko gecko",
    "wiki": "Tokay gecko",
    "difficulty": 3,
    "continents": [
      "Asia"
    ],
    "habitat": "Rainforests and houses",
    "fact": "It's named after its loud call: 'TO-kay! TO-kay!'",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/91/Mating_call_of_a_male_Tokay_gecko_%28Gekko_gecko%29.ogg/Mating_call_of_a_male_Tokay_gecko_%28Gekko_gecko%29.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Mating_call_of_a_male_Tokay_gecko_(Gekko_gecko).ogg",
      "credit": "Richard Ling &lt;wikipedia@rling.com&gt;",
      "license": "Public domain"
    }
  },
  "honey-bee": {
    "sci": "Apis mellifera",
    "wiki": "Western honey bee",
    "difficulty": 1,
    "continents": [
      "Worldwide"
    ],
    "habitat": "Hives, meadows and gardens",
    "fact": "That buzz comes from their wings beating about 230 times every second.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Honeybee-hive.ogg/Honeybee-hive.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Honeybee-hive.ogg",
      "credit": "Skinkie",
      "license": "CC0"
    }
  },
  "field-cricket": {
    "sci": "Gryllus campestris",
    "wiki": "Gryllus campestris",
    "difficulty": 2,
    "continents": [
      "Europe",
      "Asia",
      "Africa"
    ],
    "habitat": "Meadows",
    "fact": "Crickets 'sing' by rubbing their wings together, and they chirp faster when it's warmer.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f4/Gryllus_campestris_02_%28HS%29.ogg/Gryllus_campestris_02_%28HS%29.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Gryllus_campestris_02_(HS).ogg",
      "credit": "Harald Süpfle",
      "license": "CC BY-SA 3.0"
    }
  },
  "katydid": {
    "sci": "Pterophylla camellifolia",
    "wiki": "Pterophylla camellifolia",
    "difficulty": 3,
    "continents": [
      "North America"
    ],
    "habitat": "Treetops",
    "fact": "It's named after its call, which sounds like 'Katy did, Katy didn't'.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/47/Pterophylla_camellifolia_singing.wav/Pterophylla_camellifolia_singing.wav.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Pterophylla_camellifolia_singing.wav",
      "credit": "peterwchen",
      "license": "CC BY 4.0"
    }
  },
  "great-green-bush-cricket": {
    "sci": "Tettigonia viridissima",
    "wiki": "Great green bush-cricket",
    "difficulty": 3,
    "continents": [
      "Europe",
      "Asia"
    ],
    "habitat": "Meadows and hedges",
    "fact": "Bush-crickets have their 'ears' on their front legs, just below the knees.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a6/Tettigonia_viridissima_-_Gr%C3%BCnes_Heupferd_%28HS%29.ogg/Tettigonia_viridissima_-_Gr%C3%BCnes_Heupferd_%28HS%29.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Tettigonia_viridissima_-_Gr%C3%BCnes_Heupferd_(HS).ogg",
      "credit": "Harald Süpfle",
      "license": "CC BY-SA 3.0"
    }
  },
  "mole-cricket": {
    "sci": "Gryllotalpa gryllotalpa",
    "wiki": "Gryllotalpa gryllotalpa",
    "difficulty": 3,
    "continents": [
      "Europe"
    ],
    "habitat": "Damp soil",
    "fact": "Mole crickets dig a trumpet-shaped burrow that amplifies their song like a megaphone.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Maulwurfsgrille_Audio_CF.mp3?utm_source=commons.wikimedia.org&utm_campaign=api&utm_content=original",
      "page": "https://commons.wikimedia.org/wiki/File:Maulwurfsgrille_Audio_CF.mp3",
      "credit": "Christian Fischer",
      "license": "CC BY-SA 4.0"
    }
  },
  "cicada": {
    "accept": ["periodical-cicada"],
    "sci": "Cicadidae",
    "wiki": "Cicada",
    "difficulty": 2,
    "continents": [
      "Europe",
      "Asia",
      "Africa",
      "North America",
      "South America",
      "Oceania"
    ],
    "habitat": "Trees in warm places",
    "fact": "Some cicadas are louder than a rock concert, over 100 decibels, using drum-like organs called tymbals.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/e/ed/Cicada_calling_in_Irving%2C_TX_in_June_of_2012.ogg/Cicada_calling_in_Irving%2C_TX_in_June_of_2012.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Cicada_calling_in_Irving,_TX_in_June_of_2012.ogg",
      "credit": "Dhkurt",
      "license": "CC BY-SA 3.0"
    }
  },
  "western-diamondback-rattlesnake": {
    "sci": "Crotalus atrox",
    "wiki": "Western diamondback rattlesnake",
    "difficulty": 2,
    "continents": [
      "North America"
    ],
    "habitat": "Deserts and rocky hills",
    "fact": "A rattle is made of keratin, like your fingernails, and it gets a new segment every time the snake sheds its skin.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/2/22/Rattlesnake.ogg/Rattlesnake.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Rattlesnake.ogg",
      "credit": "Public domain recording (see source)",
      "license": "Public domain"
    }
  },
  "budgerigar": {
    "sci": "Melopsittacus undulatus",
    "wiki": "Budgerigar",
    "difficulty": 1,
    "continents": [
      "Oceania"
    ],
    "habitat": "Australian grassland (and living rooms)",
    "fact": "A budgie named Puck holds the world record for the biggest vocabulary of any bird: over 1,700 words.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/8/83/Budgerigar_chirping.ogg/Budgerigar_chirping.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Budgerigar_chirping.ogg",
      "credit": "mary905",
      "license": "Public domain"
    }
  },
  "american-bison": {
    "sci": "Bison bison",
    "wiki": "American bison",
    "difficulty": 2,
    "continents": [
      "North America"
    ],
    "habitat": "Prairies and the valleys of Yellowstone",
    "fact": "During the mating season, bison bulls bellow so loudly they can be heard kilometres away.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/9/95/Bison.ogg/Bison.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Bison.ogg",
      "credit": "National Park Service",
      "license": "Public domain"
    }
  },
  "greater-roadrunner": {
    "sci": "Geococcyx californianus",
    "wiki": "Greater roadrunner",
    "difficulty": 3,
    "continents": [
      "North America"
    ],
    "habitat": "Deserts",
    "fact": "Real roadrunners don't say 'beep beep'. They coo like a dove and clatter their beaks.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5c/Roadrunner_Clatter.ogg/Roadrunner_Clatter.ogg.mp3",
      "page": "https://commons.wikimedia.org/wiki/File:Roadrunner_Clatter.ogg",
      "credit": "Bob DuHamel",
      "license": "CC BY-SA 3.0"
    }
  },
  "sandhill-crane": {
    "sci": "Antigone canadensis",
    "wiki": "Sandhill crane",
    "difficulty": 3,
    "continents": [
      "North America"
    ],
    "habitat": "Wetlands and prairies",
    "fact": "Sandhill crane couples perform a 'unison call' together, a duet that helps them stay bonded for life.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Yellowstone_sound_library_-_Sandhill_Crane_-_002.mp3?utm_source=commons.wikimedia.org&utm_campaign=api&utm_content=original",
      "page": "https://commons.wikimedia.org/wiki/File:Yellowstone_sound_library_-_Sandhill_Crane_-_002.mp3",
      "credit": "NPS / Shan Burson",
      "license": "Public domain"
    }
  },
  "red-winged-blackbird": {
    "sci": "Agelaius phoeniceus",
    "wiki": "Red-winged blackbird",
    "difficulty": 3,
    "continents": [
      "North America"
    ],
    "habitat": "Marshes and fields",
    "fact": "Males sing 'conk-la-ree!' from the cattails and boldly chase away much bigger birds, even hawks.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Yellowstone_sound_library_-_Red-Winged_Blackbird_-_001.mp3?utm_source=commons.wikimedia.org&utm_campaign=api&utm_content=original",
      "page": "https://commons.wikimedia.org/wiki/File:Yellowstone_sound_library_-_Red-Winged_Blackbird_-_001.mp3",
      "credit": "NPS & MSU Acoustic Atlas / Jennifer Jerrett",
      "license": "Public domain"
    }
  },
  "killdeer": {
    "sci": "Charadrius vociferus",
    "wiki": "Killdeer",
    "difficulty": 3,
    "continents": [
      "North America"
    ],
    "habitat": "Fields, shores and even parking lots",
    "fact": "Killdeer fake a broken wing to lure predators away from their nest, then 'recover' and fly off.",
    "sound": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/4/40/Yellowstone_sound_library_-_Killdeer_-_001.mp3?utm_source=commons.wikimedia.org&utm_campaign=api&utm_content=original",
      "page": "https://commons.wikimedia.org/wiki/File:Yellowstone_sound_library_-_Killdeer_-_001.mp3",
      "credit": "NPS/Peter Comley",
      "license": "Public domain"
    }
  }
};
