// Every guessable thing, grouped by taxonomy so wrong guesses can say how close they were.
//
// Format:
//   @ClassKey|Label|emoji     starts a class        (e.g. Mammal)
//   #OrderKey|Label|emoji     starts an order       (e.g. Carnivores)
//   %FamilyKey|Label|emoji    starts a family       (e.g. Cats)
//   Name=alias,alias emoji; Name2; ...   entries in the current family
//
// Emoji are optional. Entries without one inherit the family/order/class emoji.
// Keep names unique. Answers in answers.js refer to entries by slug (e.g. "gray-wolf").

export const ANIMAL_LIST = `
@Mammalia|Mammal|🐾
#Carnivora|Carnivores|🐾
%Felidae|Cat family|🐱
Lion 🦁; Tiger 🐅; Leopard 🐆; Jaguar 🐆; Cheetah 🐆; Snow leopard 🐆; Clouded leopard 🐆; Black panther 🐆
Cougar=puma,mountain lion,catamount,panther; Eurasian lynx=lynx; Canada lynx; Bobcat; Serval; Caracal; Ocelot; Margay
Jaguarundi; Sand cat; Fishing cat; Pallas's cat=manul; Black-footed cat; Wildcat=wild cat,scottish wildcat; Liger; Saber-toothed cat=sabertooth,smilodon,saber-toothed tiger
Domestic cat=cat,house cat,kitten,kitty,tabby,tomcat,siamese cat,persian cat,maine coon,sphynx cat,bengal cat,ragdoll cat 🐈
%Canidae|Dog family|🐕
Gray wolf=wolf,grey wolf,timber wolf 🐺; Arctic wolf 🐺; Red wolf 🐺; Ethiopian wolf 🐺; Maned wolf
Dog=domestic dog,puppy,pup,hound,doggo,labrador,golden retriever,german shepherd,chihuahua,poodle,beagle,bulldog,husky,dachshund,corgi,pug,rottweiler,terrier,dalmatian,great dane,border collie,greyhound,shiba inu,boxer dog,pitbull,basset hound,bloodhound,schnauzer,sheepdog 🐕
Dingo; Coyote; Golden jackal=jackal; Black-backed jackal; Red fox=fox 🦊; Arctic fox 🦊; Fennec fox=fennec 🦊; Gray fox 🦊; Kit fox 🦊; Swift fox 🦊; Bat-eared fox 🦊
Raccoon dog=tanuki; African wild dog=painted dog,painted wolf,hunting dog; Dhole=asian wild dog; Bush dog
%Ursidae|Bears|🐻
Brown bear=bear,grizzly bear,grizzly,kodiak bear 🐻; American black bear=black bear 🐻; Polar bear=ice bear 🐻; Giant panda=panda,panda bear 🐼
Sloth bear 🐻; Sun bear 🐻; Asiatic black bear=moon bear 🐻; Spectacled bear=andean bear 🐻
%Ailuridae|Red panda
Red panda=lesser panda,firefox
%Procyonidae|Raccoon family|🦝
Raccoon=racoon,trash panda 🦝; Coati=coatimundi; Kinkajou=honey bear; Ringtail=ring-tailed cat
%Mustelidae|Weasel family
Eurasian otter=otter,river otter 🦦; Sea otter 🦦; Giant otter 🦦; Asian small-clawed otter 🦦; European badger=badger 🦡; Honey badger=ratel 🦡; American badger 🦡
Wolverine; Weasel; Stoat=ermine; Ferret; Mink; Pine marten=marten; Fisher; Polecat; Tayra
%Mephitidae|Skunks|🦨
Striped skunk=skunk,polecat (american) 🦨; Spotted skunk 🦨
%Hyaenidae|Hyenas
Spotted hyena=hyena,hyaena,laughing hyena; Striped hyena; Brown hyena; Aardwolf
%Herpestidae|Mongooses
Meerkat=suricate; Mongoose=indian grey mongoose; Banded mongoose; Dwarf mongoose
%Viverridae|Civets
Civet=african civet; Genet=common genet; Binturong=bearcat
%Eupleridae|Malagasy carnivores
Fossa
%Otariidae|Eared seals|🦭
California sea lion=sea lion 🦭; Steller sea lion 🦭; Fur seal=northern fur seal 🦭; South American sea lion 🦭
%Phocidae|True seals|🦭
Harbor seal=common seal,seal,harbour seal 🦭; Grey seal=gray seal 🦭; Harp seal 🦭; Elephant seal 🦭; Leopard seal 🦭; Weddell seal 🦭; Ringed seal 🦭; Monk seal 🦭; Bearded seal 🦭
%Odobenidae|Walrus|🦭
Walrus 🦭

#Artiodactyla|Even-toed hoofed mammals|🦌
%Bovidae|Cattle, sheep and antelopes|🐄
Cow=cattle,bull,ox,calf,dairy cow,heifer,steer,moo cow 🐄; Water buffalo=domestic buffalo 🐃; African buffalo=cape buffalo 🐃; American bison=bison,buffalo 🦬; European bison=wisent 🦬
Yak; Zebu; Gaur; Highland cow=highland cattle 🐄
Sheep=ram,lamb,ewe,baa 🐑; Bighorn sheep 🐏; Mouflon 🐏; Dall sheep 🐏
Goat=billy goat,nanny goat,kid,pygmy goat 🐐; Ibex=alpine ibex 🐐; Mountain goat 🐐; Markhor 🐐; Chamois; Muskox=musk ox
Wildebeest=gnu; Impala; Springbok; Thomson's gazelle=gazelle,tommy; Oryx=gemsbok; Greater kudu=kudu; Eland; Gerenuk; Dik-dik; Saiga; Topi
Hartebeest; Sable antelope; Blackbuck; Nilgai=blue bull; Bongo; Klipspringer; Duiker; Waterbuck
%Cervidae|Deer|🦌
Red deer=stag,deer,hind 🦌; Elk=wapiti 🦌; Moose=eurasian elk 🫎; Reindeer=caribou,rudolph 🦌; White-tailed deer=whitetail 🦌; Roe deer 🦌; Fallow deer 🦌
Mule deer 🦌; Sika deer 🦌; Muntjac=barking deer 🦌; Chital=spotted deer,axis deer 🦌; Water deer 🦌; Pudu 🦌
%Giraffidae|Giraffes|🦒
Giraffe 🦒; Okapi=forest giraffe
%Suidae|Pigs|🐖
Pig=hog,piglet,swine,domestic pig,oink,sow,boar (domestic),pot-bellied pig 🐖; Wild boar=wild pig 🐗; Warthog 🐗; Babirusa; Red river hog
%Tayassuidae|Peccaries
Collared peccary=peccary,javelina
%Hippopotamidae|Hippos|🦛
Hippopotamus=hippo,river horse 🦛; Pygmy hippopotamus=pygmy hippo 🦛
%Camelidae|Camels and llamas|🐪
Camel=dromedary,bactrian camel,arabian camel 🐪; Llama 🦙; Alpaca 🦙; Vicuña=vicuna 🦙; Guanaco 🦙
%Antilocapridae|Pronghorn
Pronghorn=pronghorn antelope
%Tragulidae|Mouse-deer
Chevrotain=mouse-deer

#Cetacea|Whales and dolphins|🐋
%Balaenopteridae|Rorqual whales|🐋
Humpback whale=humpback 🐋; Blue whale=whale 🐋; Fin whale 🐋; Minke whale 🐋; Sei whale 🐋
%Balaenidae|Right whales|🐋
Bowhead whale 🐋; Right whale=north atlantic right whale 🐋
%Eschrichtiidae|Gray whale|🐋
Gray whale=grey whale 🐋
%Physeteridae|Sperm whales|🐳
Sperm whale=cachalot 🐳
%Delphinidae|Oceanic dolphins|🐬
Bottlenose dolphin=dolphin,flipper 🐬; Orca=killer whale 🐬; Common dolphin 🐬; Spinner dolphin 🐬; Pilot whale 🐬; Risso's dolphin 🐬; Dusky dolphin 🐬
%Monodontidae|Belugas and narwhals|🐋
Beluga whale=beluga,white whale,sea canary 🐋; Narwhal=unicorn of the sea 🐋
%Phocoenidae|Porpoises|🐬
Harbour porpoise=porpoise,harbor porpoise 🐬; Vaquita 🐬
%Iniidae|River dolphins|🐬
Amazon river dolphin=boto,pink river dolphin 🐬

#Perissodactyla|Odd-toed hoofed mammals|🐎
%Equidae|Horses|🐎
Horse=pony,stallion,mare,foal,colt,filly,neigh,steed,shetland pony 🐎; Donkey=ass,burro,jackass,mule (donkey) 🫏; Zebra=plains zebra 🦓; Mule 🫏; Przewalski's horse=takhi 🐎; Wild ass=onager,kiang 🫏
%Rhinocerotidae|Rhinos|🦏
White rhinoceros=rhino,white rhino,rhinoceros 🦏; Black rhinoceros=black rhino 🦏; Indian rhinoceros=greater one-horned rhino 🦏; Sumatran rhinoceros 🦏; Woolly rhinoceros=woolly rhino 🦏
%Tapiridae|Tapirs
Tapir=malayan tapir,baird's tapir,mountain tapir

#Proboscidea|Elephants|🐘
%Elephantidae|Elephants|🐘
African elephant=elephant,african bush elephant,dumbo 🐘; Asian elephant=indian elephant 🐘; African forest elephant=forest elephant 🐘; Woolly mammoth=mammoth 🦣
%Mammutidae|Mastodons|🦣
Mastodon 🦣

#Primates|Primates|🐒
%Hominidae|Great apes|🦍
Chimpanzee=chimp,ape 🐒; Bonobo=pygmy chimpanzee 🐒; Gorilla=silverback,mountain gorilla 🦍; Orangutan=orang-utan 🦧
Human=person,people,man,woman,baby,toddler,kid (human),my dad,my mom,my neighbor,me 🧑; Neanderthal=caveman 🧔
%Hylobatidae|Gibbons|🐒
Siamang 🐒; Lar gibbon=gibbon,white-handed gibbon 🐒; Hoolock gibbon 🐒
%Cercopithecidae|Old World monkeys|🐒
Baboon=olive baboon,hamadryas baboon 🐒; Mandrill 🐒; Rhesus macaque=monkey,macaque,rhesus monkey 🐒; Japanese macaque=snow monkey 🐒; Barbary macaque 🐒
Proboscis monkey 🐒; Colobus monkey=colobus 🐒; Vervet monkey 🐒; Gelada 🐒; Golden snub-nosed monkey 🐒; Langur=hanuman langur 🐒
%Atelidae|Howler and spider monkeys|🐒
Howler monkey=howler 🐒; Spider monkey 🐒; Woolly monkey 🐒
%Cebidae|Capuchins and squirrel monkeys|🐒
Capuchin monkey=capuchin 🐒; Squirrel monkey 🐒
%Callitrichidae|Marmosets and tamarins|🐒
Marmoset=common marmoset,pygmy marmoset 🐒; Golden lion tamarin=tamarin,cotton-top tamarin 🐒
%Aotidae|Night monkeys|🐒
Owl monkey=night monkey 🐒
%Lemuridae|Lemurs|🐒
Ring-tailed lemur=lemur 🐒; Ruffed lemur 🐒
%Indriidae|Indris and sifakas|🐒
Indri=babakoto 🐒; Sifaka 🐒
%Daubentoniidae|Aye-aye|🐒
Aye-aye 🐒
%Lorisidae|Lorises|🐒
Slow loris=loris 🐒
%Galagidae|Galagos|🐒
Bushbaby=galago,bush baby 🐒
%Tarsiidae|Tarsiers|🐒
Tarsier 🐒

#Rodentia|Rodents|🐀
%Muridae|Mice and rats|🐁
House mouse=mouse,mice,field mouse 🐁; Brown rat=rat,sewer rat,norway rat 🐀; Black rat=roof rat 🐀; Gerbil 🐁; Spiny mouse 🐁
%Cricetidae|Hamsters and voles|🐹
Hamster=golden hamster,syrian hamster,dwarf hamster 🐹; Vole=field vole,meadow vole 🐁; Lemming 🐹; Muskrat 🐀
%Sciuridae|Squirrels|🐿️
Red squirrel=squirrel 🐿️; Eastern gray squirrel=gray squirrel,grey squirrel 🐿️; Chipmunk 🐿️; Groundhog=woodchuck 🐿️; Alpine marmot=marmot 🐿️
Prairie dog 🐿️; Flying squirrel 🐿️; Ground squirrel=gopher 🐿️
%Castoridae|Beavers|🦫
Beaver 🦫
%Caviidae|Cavies
Guinea pig=cavy 🐹; Capybara; Patagonian mara=mara
%Erethizontidae|New World porcupines
North American porcupine=porcupine
%Hystricidae|Old World porcupines
Crested porcupine
%Chinchillidae|Chinchillas
Chinchilla; Viscacha
%Dipodidae|Jerboas
Jerboa
%Gliridae|Dormice
Dormouse=hazel dormouse
%Heterocephalidae|Naked mole-rat
Naked mole-rat=mole rat
%Dasyproctidae|Agoutis
Agouti

#Lagomorpha|Rabbits and hares|🐇
%Leporidae|Rabbits and hares|🐇
Rabbit=bunny,european rabbit,bunny rabbit 🐇; European hare=hare 🐇; Snowshoe hare 🐇; Jackrabbit 🐇
%Ochotonidae|Pikas|🐇
Pika

#Chiroptera|Bats|🦇
%Vespertilionidae|Vesper bats|🦇
Common pipistrelle=pipistrelle,bat 🦇; Noctule 🦇; Big brown bat 🦇; Long-eared bat 🦇
%Pteropodidae|Fruit bats|🦇
Flying fox=fruit bat,megabat 🦇
%Phyllostomidae|Leaf-nosed bats|🦇
Vampire bat 🦇
%Molossidae|Free-tailed bats|🦇
Mexican free-tailed bat=free-tailed bat 🦇
%Rhinolophidae|Horseshoe bats|🦇
Horseshoe bat 🦇

#Eulipotyphla|Hedgehogs, moles and shrews|🦔
%Erinaceidae|Hedgehogs|🦔
Hedgehog=european hedgehog,hedgie 🦔
%Talpidae|Moles
Mole=european mole; Star-nosed mole
%Soricidae|Shrews
Shrew=common shrew; Water shrew

#Diprotodontia|Kangaroos, koalas and wombats|🦘
%Macropodidae|Kangaroos|🦘
Red kangaroo=kangaroo,roo 🦘; Wallaby 🦘; Quokka 🦘; Tree-kangaroo 🦘
%Phascolarctidae|Koala|🐨
Koala=koala bear 🐨
%Vombatidae|Wombats
Wombat
%Phalangeridae|Possums
Common brushtail possum=possum,brushtail possum
%Petauridae|Gliders
Sugar glider

#Dasyuromorphia|Carnivorous marsupials
%Dasyuridae|Dasyurids
Tasmanian devil=taz; Quoll
%Thylacinidae|Thylacine
Thylacine=tasmanian tiger,tasmanian wolf

#Didelphimorphia|Opossums
%Didelphidae|Opossums
Virginia opossum=opossum

#Monotremata|Egg-laying mammals
%Ornithorhynchidae|Platypus
Platypus=duck-billed platypus
%Tachyglossidae|Echidnas
Echidna=spiny anteater

#Pilosa|Sloths and anteaters|🦥
%Bradypodidae|Three-toed sloths|🦥
Three-toed sloth=sloth 🦥
%Choloepodidae|Two-toed sloths|🦥
Two-toed sloth 🦥
%Myrmecophagidae|Anteaters
Giant anteater=anteater; Tamandua

#Cingulata|Armadillos
%Dasypodidae|Armadillos
Armadillo=nine-banded armadillo

#Pholidota|Pangolins
%Manidae|Pangolins
Pangolin=scaly anteater

#Sirenia|Sea cows
%Trichechidae|Manatees
Manatee=sea cow
%Dugongidae|Dugong
Dugong

#Tubulidentata|Aardvark
%Orycteropodidae|Aardvark
Aardvark=antbear

#Hyracoidea|Hyraxes
%Procaviidae|Hyraxes
Rock hyrax=hyrax,dassie

#Scandentia|Treeshrews
%Tupaiidae|Treeshrews
Treeshrew=tree shrew

#Macroscelidea|Elephant shrews
%Macroscelididae|Elephant shrews
Elephant shrew=sengi

@Aves|Bird|🐦
#Galliformes|Landfowl|🐓
%Phasianidae|Pheasants and fowl|🐓
Chicken=rooster,hen,cockerel,chick,cock,chook,cock-a-doodle-doo 🐓; Common pheasant=pheasant; Indian peafowl=peacock,peahen,peafowl 🦚; Wild turkey=turkey,gobbler 🦃
Common quail=quail; Red grouse=grouse; Ruffed grouse; Capercaillie=wood grouse; Black grouse; Ptarmigan; Grey partridge=partridge; Golden pheasant; Red junglefowl=junglefowl
%Numididae|Guineafowl
Helmeted guineafowl=guineafowl,guinea fowl,guinea hen
%Odontophoridae|New World quail
California quail; Northern bobwhite=bobwhite
%Megapodiidae|Megapodes
Australian brush-turkey=brush turkey; Malleefowl
%Cracidae|Guans and curassows
Chachalaca; Curassow

#Anseriformes|Waterfowl|🦆
%Anatidae|Ducks, geese and swans|🦆
Mallard=duck,wild duck,quack 🦆; Domestic duck=pekin duck,farm duck 🦆; Muscovy duck 🦆; Wood duck 🦆; Mandarin duck 🦆; Common eider=eider 🦆; Eurasian teal=teal 🦆
Northern pintail=pintail 🦆; Eurasian wigeon=wigeon 🦆; Northern shoveler=shoveler 🦆; Canvasback 🦆; Common goldeneye=goldeneye 🦆; Common merganser=merganser,goosander 🦆
Canada goose=canadian goose,honker 🪿; Greylag goose=goose,domestic goose,farm goose 🪿; Snow goose 🪿; Barnacle goose 🪿; Brent goose=brant 🪿; Egyptian goose 🪿
Mute swan=swan 🦢; Whooper swan 🦢; Black swan 🦢; Trumpeter swan 🦢; Tundra swan 🦢
%Anhimidae|Screamers
Southern screamer=screamer

#Struthioniformes|Ostriches
%Struthionidae|Ostriches
Ostrich
#Casuariiformes|Emus and cassowaries
%Dromaiidae|Emu
Emu
%Casuariidae|Cassowaries
Cassowary=southern cassowary
#Rheiformes|Rheas
%Rheidae|Rheas
Rhea=greater rhea
#Apterygiformes|Kiwis
%Apterygidae|Kiwis
Kiwi=kiwi bird
#Tinamiformes|Tinamous
%Tinamidae|Tinamous
Tinamou

#Sphenisciformes|Penguins|🐧
%Spheniscidae|Penguins|🐧
Emperor penguin=penguin 🐧; King penguin 🐧; Adélie penguin=adelie penguin 🐧; African penguin=jackass penguin,black-footed penguin 🐧; Gentoo penguin 🐧; Chinstrap penguin 🐧
Rockhopper penguin 🐧; Magellanic penguin 🐧; Little penguin=fairy penguin,little blue penguin 🐧; Humboldt penguin 🐧; Macaroni penguin 🐧

#Gaviiformes|Loons
%Gaviidae|Loons
Common loon=loon,great northern diver; Red-throated loon=red-throated diver; Black-throated loon=black-throated diver

#Podicipediformes|Grebes
%Podicipedidae|Grebes
Great crested grebe=grebe; Little grebe=dabchick; Pied-billed grebe

#Procellariiformes|Albatrosses and petrels
%Diomedeidae|Albatrosses
Wandering albatross=albatross; Laysan albatross
%Procellariidae|Petrels and shearwaters
Manx shearwater=shearwater; Northern fulmar=fulmar; Petrel=giant petrel
%Hydrobatidae|Storm petrels
Storm petrel

#Phoenicopteriformes|Flamingos|🦩
%Phoenicopteridae|Flamingos|🦩
Greater flamingo=flamingo 🦩; American flamingo 🦩; Lesser flamingo 🦩

#Pelecaniformes|Pelicans, herons and ibises
%Pelecanidae|Pelicans
Great white pelican=pelican; Brown pelican; Australian pelican
%Ardeidae|Herons
Grey heron=heron,gray heron; Great blue heron; Great egret=egret; Little egret; Cattle egret; Eurasian bittern=bittern; American bittern; Black-crowned night heron=night heron
%Threskiornithidae|Ibises and spoonbills
Sacred ibis=ibis; Scarlet ibis; Glossy ibis; Eurasian spoonbill=spoonbill; Roseate spoonbill
%Balaenicipitidae|Shoebill
Shoebill=whalehead
%Scopidae|Hamerkop
Hamerkop

#Suliformes|Cormorants and gannets
%Phalacrocoracidae|Cormorants
Great cormorant=cormorant; European shag=shag
%Sulidae|Gannets and boobies
Northern gannet=gannet; Blue-footed booby=booby
%Fregatidae|Frigatebirds
Frigatebird=magnificent frigatebird
%Anhingidae|Darters
Anhinga=snakebird,darter

#Ciconiiformes|Storks
%Ciconiidae|Storks
White stork=stork; Marabou stork; Black stork; Wood stork

#Accipitriformes|Hawks and eagles|🦅
%Accipitridae|Hawks, eagles and kites|🦅
Bald eagle=eagle,american eagle 🦅; Golden eagle 🦅; Harpy eagle 🦅; White-tailed eagle=sea eagle 🦅; African fish eagle=fish eagle 🦅; Steller's sea eagle 🦅
Red-tailed hawk=hawk 🦅; Common buzzard=buzzard 🦅; Northern goshawk=goshawk 🦅; Eurasian sparrowhawk=sparrowhawk 🦅; Red kite=kite 🦅; Black kite 🦅; Hen harrier=harrier 🦅; Western marsh harrier=marsh harrier 🦅
Griffon vulture=vulture 🦅; Bearded vulture=lammergeier 🦅; Egyptian vulture 🦅
%Pandionidae|Osprey|🦅
Osprey=fish hawk 🦅
%Cathartidae|New World vultures|🦅
Andean condor=condor 🦅; California condor 🦅; Turkey vulture 🦅; King vulture 🦅
%Sagittariidae|Secretarybird
Secretarybird=secretary bird

#Falconiformes|Falcons|🦅
%Falconidae|Falcons|🦅
Peregrine falcon=falcon,peregrine 🦅; Common kestrel=kestrel 🦅; American kestrel 🦅; Gyrfalcon 🦅; Merlin 🦅; Eurasian hobby=hobby 🦅; Crested caracara=caracara 🦅

#Gruiformes|Cranes and rails
%Gruidae|Cranes
Common crane=crane,eurasian crane; Sandhill crane; Whooping crane; Red-crowned crane=japanese crane; Grey crowned crane=crowned crane
%Rallidae|Rails and coots
Eurasian coot=coot; Common moorhen=moorhen,gallinule; Water rail=rail; Corn crake=corncrake; Takahē=takahe; Purple swamphen=pukeko
%Aramidae|Limpkin
Limpkin

#Otidiformes|Bustards
%Otididae|Bustards
Great bustard=bustard; Kori bustard

#Charadriiformes|Shorebirds and gulls
%Laridae|Gulls and terns
Herring gull=seagull,gull,sea gull; Black-headed gull; Laughing gull; Great black-backed gull; Black-legged kittiwake=kittiwake; Arctic tern=tern; Common tern; Black skimmer=skimmer
%Alcidae|Auks and puffins
Atlantic puffin=puffin; Razorbill; Common murre=guillemot,murre; Little auk=dovekie
%Scolopacidae|Sandpipers
Eurasian curlew=curlew; Common sandpiper=sandpiper; Eurasian woodcock=woodcock; Common snipe=snipe; Dunlin; Red knot; Bar-tailed godwit=godwit; Whimbrel; Ruff
%Charadriidae|Plovers
Northern lapwing=lapwing,peewit; Killdeer; Common ringed plover=ringed plover,plover; European golden plover=golden plover
%Haematopodidae|Oystercatchers
Eurasian oystercatcher=oystercatcher
%Recurvirostridae|Avocets and stilts
Pied avocet=avocet; Black-winged stilt=stilt
%Stercorariidae|Skuas
Great skua=skua,bonxie

#Columbiformes|Pigeons and doves|🕊️
%Columbidae|Pigeons and doves|🕊️
Rock dove=pigeon,rock pigeon,feral pigeon,city pigeon,dove,white dove 🕊️; Mourning dove 🕊️; Eurasian collared dove=collared dove 🕊️; Common wood pigeon=wood pigeon 🕊️; European turtle dove=turtle dove 🕊️
Victoria crowned pigeon=crowned pigeon 🕊️; Nicobar pigeon 🕊️; Dodo 🦤; Passenger pigeon 🕊️

#Psittaciformes|Parrots|🦜
%Psittacidae|African and New World parrots|🦜
Scarlet macaw=macaw 🦜; Blue-and-yellow macaw 🦜; Hyacinth macaw 🦜; African grey parrot=african grey,grey parrot,parrot 🦜; Amazon parrot 🦜; Monk parakeet=quaker parrot 🦜; Sun conure=conure 🦜
%Psittaculidae|Old World parrots|🦜
Budgerigar=budgie,parakeet,shell parakeet 🦜; Rose-ringed parakeet=ring-necked parakeet 🦜; Lovebird 🦜; Rainbow lorikeet=lorikeet 🦜; Eclectus parrot 🦜
%Cacatuidae|Cockatoos|🦜
Sulphur-crested cockatoo=cockatoo 🦜; Cockatiel 🦜; Galah=pink cockatoo,rose-breasted cockatoo 🦜; Palm cockatoo 🦜
%Strigopidae|New Zealand parrots|🦜
Kea 🦜; Kākāpō=kakapo 🦜; Kākā=kaka 🦜

#Cuculiformes|Cuckoos
%Cuculidae|Cuckoos
Common cuckoo=cuckoo,cuckoo bird; Greater roadrunner=roadrunner,beep beep; Asian koel=koel; Coucal=pheasant coucal

#Musophagiformes|Turacos
%Musophagidae|Turacos
Turaco=go-away-bird

#Opisthocomiformes|Hoatzin
%Opisthocomidae|Hoatzin
Hoatzin=stinkbird

#Strigiformes|Owls|🦉
%Strigidae|Typical owls|🦉
Tawny owl=owl,brown owl,wood owl 🦉; Great horned owl=hoot owl 🦉; Eurasian eagle-owl=eagle owl 🦉; Snowy owl=hedwig 🦉; Barred owl 🦉; Burrowing owl 🦉; Little owl 🦉
Long-eared owl 🦉; Short-eared owl 🦉; Eastern screech owl=screech owl 🦉; Great grey owl 🦉; Elf owl 🦉; Eurasian pygmy owl=pygmy owl 🦉
%Tytonidae|Barn owls|🦉
Barn owl=white owl,ghost owl 🦉

#Caprimulgiformes|Nightjars and frogmouths
%Caprimulgidae|Nightjars
European nightjar=nightjar,goatsucker; Eastern whip-poor-will=whip-poor-will; Common nighthawk=nighthawk
%Podargidae|Frogmouths
Tawny frogmouth=frogmouth
%Nyctibiidae|Potoos
Common potoo=potoo

#Apodiformes|Swifts and hummingbirds
%Apodidae|Swifts
Common swift=swift; Chimney swift
%Trochilidae|Hummingbirds
Ruby-throated hummingbird=hummingbird,hummer; Anna's hummingbird; Bee hummingbird; Sword-billed hummingbird

#Coraciiformes|Kingfishers and rollers
%Alcedinidae|Kingfishers
Common kingfisher=kingfisher; Laughing kookaburra=kookaburra,laughing jackass; Belted kingfisher
%Meropidae|Bee-eaters
European bee-eater=bee-eater
%Coraciidae|Rollers
Lilac-breasted roller=roller
%Momotidae|Motmots
Motmot=blue-crowned motmot

#Bucerotiformes|Hornbills and hoopoes
%Bucerotidae|Hornbills
Great hornbill=hornbill; Southern ground hornbill=ground hornbill; Rhinoceros hornbill; Zazu
%Upupidae|Hoopoes
Eurasian hoopoe=hoopoe

#Piciformes|Woodpeckers and toucans
%Picidae|Woodpeckers
Great spotted woodpecker=woodpecker; European green woodpecker=green woodpecker; Black woodpecker; Pileated woodpecker; Northern flicker=flicker; Red-headed woodpecker; Downy woodpecker; Eurasian wryneck=wryneck
%Ramphastidae|Toucans
Toco toucan=toucan; Keel-billed toucan; Aracari
%Indicatoridae|Honeyguides
Greater honeyguide=honeyguide
%Lybiidae|African barbets
Barbet

#Trogoniformes|Trogons
%Trogonidae|Trogons
Resplendent quetzal=quetzal; Trogon

#Coliiformes|Mousebirds
%Coliidae|Mousebirds
Speckled mousebird=mousebird

#Pteroclidiformes|Sandgrouse
%Pteroclidae|Sandgrouse
Sandgrouse

#Passeriformes|Songbirds|🐦
%Corvidae|Crows and jays|🐦
Common raven=raven,nevermore 🐦; Carrion crow=crow 🐦; American crow 🐦; Hooded crow 🐦; Rook 🐦; Western jackdaw=jackdaw 🐦; Eurasian magpie=magpie 🐦
Eurasian jay=jay; Blue jay; Steller's jay; Spotted nutcracker=nutcracker; Red-billed chough=chough
%Artamidae|Butcherbirds
Australian magpie=magpie (australian); Pied butcherbird=butcherbird
%Turdidae|Thrushes
Common blackbird=blackbird,eurasian blackbird; American robin; Song thrush=thrush; Mistle thrush; Eastern bluebird=bluebird; Fieldfare; Redwing; Wood thrush; Hermit thrush
%Muscicapidae|Chats and flycatchers
European robin=robin,robin redbreast; Common nightingale=nightingale; Thrush nightingale; Bluethroat; Common redstart=redstart; European stonechat=stonechat; Northern wheatear=wheatear; Oriental magpie-robin=magpie-robin
%Sturnidae|Starlings
Common starling=starling,european starling; Common myna=myna,mynah; Common hill myna=hill myna,talking myna; Superb starling
%Menuridae|Lyrebirds
Superb lyrebird=lyrebird
%Paridae|Tits and chickadees
Great tit=tit,titmouse; Eurasian blue tit=blue tit; Coal tit; Black-capped chickadee=chickadee; Tufted titmouse
%Fringillidae|Finches
Atlantic canary=canary,domestic canary,tweety; European goldfinch=goldfinch; American goldfinch; Common chaffinch=chaffinch; Eurasian bullfinch=bullfinch; European greenfinch=greenfinch; House finch; Red crossbill=crossbill; Hawfinch; Eurasian siskin=siskin
%Passeridae|Old World sparrows
House sparrow=sparrow; Eurasian tree sparrow=tree sparrow
%Passerellidae|New World sparrows
Song sparrow; White-throated sparrow; Dark-eyed junco=junco
%Estrildidae|Waxbills
Zebra finch; Gouldian finch; Java sparrow
%Cardinalidae|Cardinals
Northern cardinal=cardinal,redbird; Indigo bunting; Rose-breasted grosbeak=grosbeak
%Hirundinidae|Swallows
Barn swallow=swallow; Common house martin=house martin,martin; Sand martin=bank swallow; Purple martin; Tree swallow
%Troglodytidae|Wrens
Eurasian wren=wren,winter wren,jenny wren; Carolina wren; House wren
%Alaudidae|Larks
Eurasian skylark=skylark,lark; Woodlark; Horned lark
%Mimidae|Mockingbirds
Northern mockingbird=mockingbird,mocking bird; Grey catbird=catbird,gray catbird; Brown thrasher=thrasher
%Icteridae|New World blackbirds
Red-winged blackbird; Baltimore oriole; Common grackle=grackle; Brown-headed cowbird=cowbird; Western meadowlark=meadowlark; Bobolink
%Oriolidae|Old World orioles
Eurasian golden oriole=golden oriole,oriole
%Motacillidae|Wagtails and pipits
White wagtail=wagtail,pied wagtail; Meadow pipit=pipit
%Laniidae|Shrikes
Red-backed shrike=shrike,butcher bird; Great grey shrike; Loggerhead shrike
%Sittidae|Nuthatches
Eurasian nuthatch=nuthatch; White-breasted nuthatch
%Certhiidae|Treecreepers
Eurasian treecreeper=treecreeper; Brown creeper
%Regulidae|Kinglets
Goldcrest; Ruby-crowned kinglet=kinglet
%Phylloscopidae|Leaf warblers
Common chiffchaff=chiffchaff; Willow warbler
%Acrocephalidae|Reed warblers
Eurasian reed warbler=reed warbler; Sedge warbler; Great reed warbler
%Sylviidae|Sylviid warblers
Eurasian blackcap=blackcap; Common whitethroat=whitethroat
%Parulidae|New World warblers
Yellow warbler=warbler; American redstart; Common yellowthroat
%Tyrannidae|Tyrant flycatchers
Eastern phoebe=phoebe; Great kiskadee=kiskadee; Eastern kingbird=kingbird; Scissor-tailed flycatcher=flycatcher
%Cotingidae|Cotingas
Three-wattled bellbird=bellbird; White bellbird; Andean cock-of-the-rock=cock-of-the-rock; Screaming piha=piha
%Pipridae|Manakins
Club-winged manakin=manakin
%Paradisaeidae|Birds-of-paradise
Greater bird-of-paradise=bird-of-paradise,bird of paradise
%Ptilonorhynchidae|Bowerbirds
Satin bowerbird=bowerbird
%Meliphagidae|Honeyeaters
Tūī=tui; Bell miner=bellbird (australian); Noisy miner
%Pycnonotidae|Bulbuls
Red-whiskered bulbul=bulbul
%Cinclidae|Dippers
White-throated dipper=dipper
%Bombycillidae|Waxwings
Bohemian waxwing=waxwing; Cedar waxwing
%Aegithalidae|Long-tailed tits
Long-tailed tit
%Emberizidae|Buntings
Yellowhammer; Common reed bunting=reed bunting,bunting
%Ploceidae|Weavers
Village weaver=weaver,weaverbird
%Nectariniidae|Sunbirds
Sunbird
%Vireonidae|Vireos
Red-eyed vireo=vireo
%Rhipiduridae|Fantails
Willie wagtail; Fantail=grey fantail
%Dicruridae|Drongos
Fork-tailed drongo=drongo
%Pittidae|Pittas
Pitta

@Reptilia|Reptile|🦎
#Crocodilia|Crocodilians|🐊
%Alligatoridae|Alligators and caimans|🐊
American alligator=alligator,gator 🐊; Chinese alligator 🐊; Spectacled caiman=caiman 🐊; Black caiman 🐊
%Crocodylidae|Crocodiles|🐊
Nile crocodile=crocodile,croc 🐊; Saltwater crocodile=saltie 🐊; American crocodile 🐊; Mugger crocodile 🐊
%Gavialidae|Gharials|🐊
Gharial=gavial 🐊
#Squamata|Lizards and snakes|🦎
%Viperidae|Vipers|🐍
Western diamondback rattlesnake=rattlesnake,rattler,diamondback 🐍; Timber rattlesnake 🐍; Sidewinder 🐍; Common European adder=adder,viper 🐍; Gaboon viper 🐍; Puff adder 🐍; Copperhead 🐍; Cottonmouth=water moccasin 🐍; Bushmaster 🐍; Fer-de-lance 🐍
%Elapidae|Cobras and relatives|🐍
King cobra=cobra 🐍; Indian cobra 🐍; Black mamba=mamba 🐍; Green mamba 🐍; Coral snake 🐍; Inland taipan=taipan 🐍; Sea snake 🐍; Death adder 🐍; Krait 🐍
%Pythonidae|Pythons|🐍
Reticulated python=python 🐍; Burmese python 🐍; Ball python=royal python 🐍
%Boidae|Boas|🐍
Boa constrictor=boa 🐍; Green anaconda=anaconda 🐍
%Colubridae|Colubrid snakes|🐍
Grass snake=snake 🐍; Corn snake 🐍; Kingsnake=king snake 🐍; Milk snake 🐍; Garter snake 🐍; Rat snake 🐍; Hognose snake 🐍; Boomslang 🐍; Vine snake 🐍; Flying snake 🐍
%Gekkonidae|Geckos|🦎
Tokay gecko=gecko,tokay 🦎; Common house gecko=house gecko 🦎; Day gecko 🦎
%Eublepharidae|Eyelid geckos|🦎
Leopard gecko 🦎
%Iguanidae|Iguanas|🦎
Green iguana=iguana 🦎; Marine iguana 🦎; Rhinoceros iguana 🦎
%Chamaeleonidae|Chameleons|🦎
Veiled chameleon=chameleon 🦎; Panther chameleon 🦎; Jackson's chameleon 🦎
%Varanidae|Monitor lizards|🦎
Komodo dragon 🦎; Nile monitor=monitor lizard 🦎; Asian water monitor=water monitor 🦎; Perentie=goanna 🦎
%Agamidae|Agamas|🦎
Bearded dragon=beardie 🦎; Frilled lizard=frill-necked lizard 🦎; Thorny devil 🦎; Agama=rainbow agama 🦎; Flying dragon=draco lizard 🦎
%Scincidae|Skinks|🦎
Skink 🦎; Blue-tongued skink 🦎
%Lacertidae|Wall lizards|🦎
Common wall lizard=wall lizard 🦎; Sand lizard 🦎; Viviparous lizard=common lizard,lizard 🦎
%Anguidae|Slow worms|🦎
Slow worm=slowworm,blindworm 🦎; Glass lizard 🦎
%Helodermatidae|Gila monsters|🦎
Gila monster 🦎; Beaded lizard 🦎
%Phrynosomatidae|Horned lizards|🦎
Horned lizard=horny toad 🦎
%Dactyloidae|Anoles|🦎
Green anole=anole 🦎
%Corytophanidae|Basilisk lizards|🦎
Basilisk lizard=jesus lizard 🦎
#Testudines|Turtles and tortoises|🐢
%Testudinidae|Tortoises|🐢
Galápagos tortoise=galapagos tortoise,giant tortoise,tortoise 🐢; Aldabra giant tortoise 🐢; Hermann's tortoise 🐢; Desert tortoise 🐢; Sulcata tortoise=african spurred tortoise 🐢
%Cheloniidae|Sea turtles|🐢
Green sea turtle=sea turtle 🐢; Loggerhead sea turtle=loggerhead 🐢; Hawksbill sea turtle=hawksbill 🐢
%Dermochelyidae|Leatherback|🐢
Leatherback sea turtle=leatherback 🐢
%Chelydridae|Snapping turtles|🐢
Common snapping turtle=snapping turtle,snapper 🐢; Alligator snapping turtle 🐢
%Emydidae|Pond turtles|🐢
Red-eared slider=turtle,terrapin 🐢; Box turtle 🐢; Painted turtle 🐢
%Trionychidae|Softshell turtles|🐢
Softshell turtle 🐢
#Rhynchocephalia|Tuatara|🦎
%Sphenodontidae|Tuatara|🦎
Tuatara 🦎
#Plesiosauria|Plesiosaurs|🦕
%Elasmosauridae|Elasmosaurs|🦕
Plesiosaurus=plesiosaur,nessie (real) 🦕
#Mosasauria|Mosasaurs|🦕
%Mosasauridae|Mosasaurs|🦕
Mosasaurus=mosasaur 🦕

@Amphibia|Amphibian|🐸
#Anura|Frogs and toads|🐸
%Ranidae|True frogs|🐸
American bullfrog=bullfrog 🐸; Common frog=frog,european frog,grass frog 🐸; Wood frog 🐸; Marsh frog 🐸; Edible frog 🐸; Northern leopard frog=leopard frog 🐸; Green frog 🐸; Pool frog 🐸
%Bufonidae|True toads|🐸
Common toad=toad,european toad 🐸; Cane toad 🐸; American toad 🐸; Natterjack toad=natterjack 🐸; Golden toad 🐸
%Hylidae|Tree frogs|🐸
European tree frog=tree frog,treefrog 🐸; Spring peeper=peeper 🐸; Red-eyed tree frog 🐸; American green tree frog=green tree frog 🐸; Gray tree frog 🐸; White's tree frog=dumpy frog 🐸; Pacific tree frog=pacific chorus frog,chorus frog 🐸
%Eleutherodactylidae|Rain frogs|🐸
Common coquí=coqui 🐸
%Dendrobatidae|Poison dart frogs|🐸
Poison dart frog=poison frog,dart frog 🐸; Golden poison frog 🐸
%Pipidae|Clawed frogs|🐸
African clawed frog=clawed frog 🐸; Surinam toad 🐸
%Ceratophryidae|Horned frogs|🐸
Pacman frog=horned frog 🐸
%Microhylidae|Narrow-mouthed frogs|🐸
Tomato frog 🐸
%Brevicipitidae|Rain frogs (African)|🐸
Desert rain frog 🐸
%Bombinatoridae|Fire-bellied toads|🐸
Fire-bellied toad 🐸
%Alytidae|Midwife toads|🐸
Midwife toad 🐸
%Limnodynastidae|Australian ground frogs|🐸
Pobblebonk=banjo frog 🐸
%Myobatrachidae|Australian toadlets|🐸
Corroboree frog 🐸
%Rhacophoridae|Shrub frogs|🐸
Wallace's flying frog=flying frog 🐸
%Pyxicephalidae|African bullfrogs|🐸
African bullfrog=pixie frog 🐸
%Leptodactylidae|Southern frogs|🐸
Mountain chicken frog 🐸
#Caudata|Salamanders and newts|🦎
%Salamandridae|Newts and salamanders|🦎
Great crested newt=newt 🦎; Smooth newt 🦎; Fire salamander 🦎; Rough-skinned newt 🦎; Eastern newt 🦎
%Ambystomatidae|Mole salamanders|🦎
Axolotl=mexican walking fish 🦎; Tiger salamander 🦎
%Cryptobranchidae|Giant salamanders|🦎
Chinese giant salamander=giant salamander 🦎; Hellbender 🦎
%Plethodontidae|Lungless salamanders|🦎
Red-backed salamander=salamander 🦎
%Proteidae|Mudpuppies|🦎
Olm=proteus 🦎; Mudpuppy 🦎
#Gymnophiona|Caecilians|🪱
%Caeciliidae|Caecilians|🪱
Caecilian 🪱

@Actinopterygii|Ray-finned fish|🐟
#Perciformes|Perch-like fish|🐟
%Percidae|Perches|🐟
European perch=perch 🐟; Walleye 🐟; Zander 🐟
%Serranidae|Groupers|🐟
Grouper=giant grouper 🐟; European sea bass=sea bass 🐟
%Scombridae|Tunas and mackerels|🐟
Atlantic bluefin tuna=tuna 🐟; Atlantic mackerel=mackerel 🐟
%Pomacentridae|Damselfish|🐠
Clownfish=anemonefish,nemo 🐠; Damselfish 🐠
%Labridae|Wrasses|🐠
Humphead wrasse=napoleon wrasse,wrasse 🐠
%Scaridae|Parrotfish|🐠
Parrotfish 🐠
%Sciaenidae|Drums and croakers|🐟
Atlantic croaker=croaker 🐟; Black drum=drum fish 🐟
%Cichlidae|Cichlids|🐠
Tilapia 🐟; Freshwater angelfish=angelfish 🐠; Oscar=oscar fish 🐠; Cichlid 🐠
%Acanthuridae|Surgeonfish|🐠
Blue tang=dory,surgeonfish 🐠
%Istiophoridae|Marlins|🐟
Blue marlin=marlin 🐟; Sailfish 🐟
%Xiphiidae|Swordfish|🐟
Swordfish 🐟
%Gobiidae|Gobies|🐟
Goby 🐟; Mudskipper 🐟
%Centrarchidae|Sunfishes|🐟
Largemouth bass=bass,black bass 🐟; Bluegill 🐟
%Osphronemidae|Gouramis|🐠
Betta=siamese fighting fish,fighting fish 🐠; Gourami 🐠
#Cypriniformes|Carps and minnows|🐟
%Cyprinidae|Carps|🐟
Common carp=carp 🐟; Goldfish 🐟; Koi 🐟; Minnow 🐟; Roach 🐟; Barbel 🐟; Zebrafish=zebra danio 🐟
#Salmoniformes|Salmon and trout|🐟
%Salmonidae|Salmon and trout|🐟
Atlantic salmon=salmon 🐟; Rainbow trout=trout 🐟; Brown trout 🐟; Arctic char 🐟
#Clupeiformes|Herrings|🐟
%Clupeidae|Herrings|🐟
Atlantic herring=herring 🐟; Sardine=pilchard 🐟
%Engraulidae|Anchovies|🐟
Anchovy 🐟
#Gadiformes|Cods|🐟
%Gadidae|Cods|🐟
Atlantic cod=cod 🐟; Haddock 🐟; Pollock 🐟
#Siluriformes|Catfish|🐟
%Siluridae|Sheatfish|🐟
Wels catfish=catfish 🐟
%Ictaluridae|North American catfish|🐟
Channel catfish 🐟
%Loricariidae|Armored catfish|🐟
Pleco=plecostomus 🐟
#Characiformes|Characins|🐟
%Serrasalmidae|Piranhas|🐟
Red-bellied piranha=piranha 🐟
%Characidae|Tetras|🐟
Neon tetra=tetra 🐟
#Anguilliformes|Eels|🐍
%Anguillidae|Freshwater eels|🐍
European eel=eel 🐍
%Muraenidae|Moray eels|🐍
Moray eel=moray 🐍
#Esociformes|Pikes|🐟
%Esocidae|Pikes|🐟
Northern pike=pike 🐟
#Tetraodontiformes|Pufferfish and relatives|🐡
%Tetraodontidae|Pufferfish|🐡
Pufferfish=puffer fish,blowfish,fugu 🐡
%Molidae|Molas|🐟
Ocean sunfish=mola 🐟
%Balistidae|Triggerfish|🐠
Triggerfish 🐠
#Syngnathiformes|Seahorses and pipefish|🐟
%Syngnathidae|Seahorses|🐟
Seahorse=sea horse 🐟; Leafy seadragon=sea dragon 🐟; Pipefish 🐟
#Lophiiformes|Anglerfish|🐟
%Lophiidae|Monkfish|🐟
Monkfish 🐟
%Ceratiidae|Deep-sea anglerfish|🐟
Anglerfish=deep-sea anglerfish 🐟
#Pleuronectiformes|Flatfish|🐟
%Pleuronectidae|Righteye flounders|🐟
Atlantic halibut=halibut 🐟; European plaice=plaice 🐟; Flounder 🐟
%Soleidae|Soles|🐟
Common sole=sole 🐟
#Scorpaeniformes|Scorpionfish|🐟
%Scorpaenidae|Scorpionfish|🐟
Lionfish 🐟; Scorpionfish 🐟
%Synanceiidae|Stonefish|🐟
Stonefish 🐟
#Beloniformes|Needlefish|🐟
%Exocoetidae|Flying fish|🐟
Flying fish 🐟
#Batrachoidiformes|Toadfish|🐟
%Batrachoididae|Toadfish|🐟
Plainfin midshipman=midshipman,singing fish 🐟; Oyster toadfish=toadfish 🐟
#Acipenseriformes|Sturgeons|🐟
%Acipenseridae|Sturgeons|🐟
Sturgeon=beluga sturgeon 🐟
#Lepisosteiformes|Gars|🐟
%Lepisosteidae|Gars|🐟
Alligator gar=gar 🐟
#Osteoglossiformes|Bonytongues|🐟
%Arapaimidae|Arapaima|🐟
Arapaima=pirarucu 🐟
%Mormyridae|Elephantfish|🐟
Elephantfish 🐟
#Gymnotiformes|Knifefish|🐍
%Gymnotidae|Electric eels|🐍
Electric eel 🐍

@Sarcopterygii|Lobe-finned fish|🐟
#Coelacanthiformes|Coelacanths|🐟
%Latimeriidae|Coelacanths|🐟
Coelacanth 🐟
#Ceratodontiformes|Lungfish|🐟
%Neoceratodontidae|Australian lungfish|🐟
Lungfish=australian lungfish 🐟

@Chondrichthyes|Shark or ray|🦈
#Lamniformes|Mackerel sharks|🦈
%Lamnidae|Mackerel sharks|🦈
Great white shark=shark,white shark,jaws 🦈; Shortfin mako=mako shark 🦈
%Cetorhinidae|Basking shark|🦈
Basking shark 🦈
%Otodontidae|Megalodon|🦈
Megalodon=megalodon shark 🦈
#Carcharhiniformes|Ground sharks|🦈
%Carcharhinidae|Requiem sharks|🦈
Tiger shark 🦈; Bull shark 🦈; Blue shark 🦈; Blacktip reef shark=reef shark 🦈; Lemon shark 🦈
%Sphyrnidae|Hammerheads|🦈
Hammerhead shark=hammerhead 🦈
%Scyliorhinidae|Catsharks|🦈
Small-spotted catshark=catshark,dogfish 🦈
#Orectolobiformes|Carpet sharks|🦈
%Rhincodontidae|Whale shark|🦈
Whale shark 🦈
%Ginglymostomatidae|Nurse sharks|🦈
Nurse shark 🦈
#Squaliformes|Dogfish sharks|🦈
%Somniosidae|Sleeper sharks|🦈
Greenland shark 🦈
#Myliobatiformes|Stingrays|🦈
%Dasyatidae|Stingrays|🦈
Stingray=ray,sting ray 🦈
%Mobulidae|Manta rays|🦈
Manta ray=manta 🦈
#Rajiformes|Skates|🦈
%Rajidae|Skates|🦈
Skate 🦈
#Torpediniformes|Electric rays|🦈
%Torpedinidae|Electric rays|🦈
Electric ray=torpedo ray 🦈
#Rhinopristiformes|Sawfish|🦈
%Pristidae|Sawfish|🦈
Sawfish 🦈
#Chimaeriformes|Chimaeras|🦈
%Chimaeridae|Chimaeras|🦈
Ghost shark=chimaera,ratfish 🦈

@Hyperoartia|Jawless fish|🐟
#Petromyzontiformes|Lampreys|🐍
%Petromyzontidae|Lampreys|🐍
Lamprey 🐍
@Myxini|Hagfish|🐟
#Myxiniformes|Hagfish|🐍
%Myxinidae|Hagfish|🐍
Hagfish=slime eel 🐍

@Insecta|Insect|🐛
#Hymenoptera|Bees, wasps and ants|🐝
%Apidae|Bees|🐝
Honey bee=bee,honeybee,buzz 🐝; Bumblebee=bumble bee 🐝; Carpenter bee 🐝; Stingless bee 🐝
%Megachilidae|Mason bees|🐝
Mason bee 🐝
%Vespidae|Wasps and hornets|🐝
Common wasp=wasp,yellowjacket 🐝; European hornet=hornet 🐝; Asian giant hornet=murder hornet 🐝; Paper wasp 🐝
%Formicidae|Ants|🐜
Ant=black garden ant 🐜; Fire ant 🐜; Leafcutter ant=leaf-cutter ant 🐜; Army ant 🐜; Bullet ant 🐜; Carpenter ant 🐜; Weaver ant 🐜
%Mutillidae|Velvet ants|🐜
Velvet ant=cow killer 🐜
#Lepidoptera|Butterflies and moths|🦋
%Nymphalidae|Brush-footed butterflies|🦋
Monarch butterfly=monarch,butterfly 🦋; Painted lady 🦋; Red admiral 🦋; Peacock butterfly 🦋; Blue morpho=morpho 🦋
%Papilionidae|Swallowtails|🦋
Swallowtail butterfly=swallowtail 🦋; Birdwing butterfly=birdwing 🦋
%Pieridae|Whites and yellows|🦋
Cabbage white=white butterfly 🦋; Brimstone butterfly=brimstone 🦋
%Sphingidae|Hawkmoths|🦋
Death's-head hawkmoth=hawkmoth,hawk moth,sphinx moth 🦋; Hummingbird hawk-moth 🦋
%Saturniidae|Giant silk moths|🦋
Luna moth 🦋; Atlas moth 🦋
%Bombycidae|Silkworm moths|🐛
Silkworm=silk moth 🐛
%Erebidae|Tiger moths|🦋
Tiger moth 🦋; Spongy moth=gypsy moth 🦋
%Noctuidae|Owlet moths|🦋
Moth=owlet moth,miller moth 🦋
%Geometridae|Inchworms|🐛
Inchworm=looper,geometer moth 🐛
#Coleoptera|Beetles|🪲
%Scarabaeidae|Scarab beetles|🪲
Dung beetle=scarab 🪲; Rhinoceros beetle 🪲; Goliath beetle 🪲; Cockchafer=may bug,june bug 🪲; Hercules beetle 🪲
%Coccinellidae|Ladybugs|🐞
Ladybug=ladybird,lady beetle 🐞
%Lucanidae|Stag beetles|🪲
Stag beetle 🪲
%Lampyridae|Fireflies|🪲
Firefly=lightning bug,glow-worm 🪲
%Curculionidae|Weevils|🪲
Weevil 🪲
%Cerambycidae|Longhorn beetles|🪲
Longhorn beetle 🪲
%Dytiscidae|Diving beetles|🪲
Diving beetle 🪲
%Tenebrionidae|Darkling beetles|🪲
Mealworm=darkling beetle 🐛
%Carabidae|Ground beetles|🪲
Bombardier beetle 🪲
%Chrysomelidae|Leaf beetles|🪲
Colorado potato beetle=potato beetle 🪲
#Orthoptera|Crickets and grasshoppers|🦗
%Gryllidae|Crickets|🦗
Field cricket=cricket,chirp 🦗; House cricket 🦗
%Tettigoniidae|Katydids and bush-crickets|🦗
Katydid=common true katydid 🦗; Great green bush-cricket=bush cricket,bush-cricket 🦗
%Acrididae|Grasshoppers|🦗
Grasshopper 🦗; Desert locust=locust 🦗
%Gryllotalpidae|Mole crickets|🦗
Mole cricket 🦗
%Anostostomatidae|Wētā|🦗
Giant wētā=weta,giant weta 🦗
#Hemiptera|True bugs|🪲
%Cicadidae|Cicadas|🪲
Cicada=annual cicada,locust (cicada) 🪲; Periodical cicada=17-year cicada 🪲
%Aphididae|Aphids|🪲
Aphid=greenfly 🪲
%Cimicidae|Bed bugs|🪲
Bed bug=bedbug 🪲
%Pentatomidae|Stink bugs|🪲
Stink bug=shield bug 🪲
%Gerridae|Water striders|🪲
Water strider=pond skater 🪲
%Belostomatidae|Giant water bugs|🪲
Giant water bug=toe-biter 🪲
%Micronectidae|Water boatmen|🪲
Lesser water boatman=water boatman 🪲
%Membracidae|Treehoppers|🪲
Treehopper 🪲
#Diptera|Flies|🪰
%Muscidae|House flies|🪰
Housefly=fly,house fly 🪰
%Culicidae|Mosquitoes|🦟
Mosquito=mozzie,skeeter,gnat 🦟
%Drosophilidae|Fruit flies|🪰
Fruit fly=vinegar fly 🪰
%Syrphidae|Hoverflies|🪰
Hoverfly=flower fly 🪰
%Calliphoridae|Blowflies|🪰
Bluebottle=blowfly,blow fly 🪰
%Tabanidae|Horse flies|🪰
Horse-fly=horsefly,gadfly 🪰
%Tipulidae|Crane flies|🪰
Crane fly=daddy longlegs 🪰
#Odonata|Dragonflies|🪰
%Aeshnidae|Hawker dragonflies|🪰
Dragonfly=emperor dragonfly 🪰
%Coenagrionidae|Damselflies|🪰
Damselfly 🪰
#Mantodea|Mantises|🦗
%Mantidae|Mantises|🦗
Praying mantis=mantis 🦗
%Hymenopodidae|Flower mantises|🦗
Orchid mantis 🦗
#Blattodea|Cockroaches and termites|🪳
%Blattidae|Cockroaches|🪳
Cockroach=roach,american cockroach 🪳
%Blaberidae|Giant cockroaches|🪳
Madagascar hissing cockroach=hissing cockroach 🪳
%Termitidae|Termites|🐜
Termite=white ant 🐜
#Phasmatodea|Stick insects|🦗
%Phasmatidae|Stick insects|🦗
Stick insect=walking stick 🦗
%Phylliidae|Leaf insects|🦗
Leaf insect 🦗
#Siphonaptera|Fleas|🪲
%Pulicidae|Fleas|🪲
Flea 🪲
#Psocodea|Lice|🪲
%Pediculidae|Lice|🪲
Louse=lice,head louse 🪲
#Ephemeroptera|Mayflies|🪰
%Ephemeridae|Mayflies|🪰
Mayfly 🪰
#Dermaptera|Earwigs|🪲
%Forficulidae|Earwigs|🪲
Earwig 🪲
#Zygentoma|Silverfish|🪲
%Lepismatidae|Silverfish|🪲
Silverfish 🪲
#Neuroptera|Lacewings and antlions|🪰
%Myrmeleontidae|Antlions|🪰
Antlion=doodlebug 🪰
%Chrysopidae|Lacewings|🪰
Green lacewing=lacewing 🪰

@Arachnida|Arachnid|🕷️
#Araneae|Spiders|🕷️
%Theraphosidae|Tarantulas|🕷️
Tarantula=goliath birdeater 🕷️
%Theridiidae|Widow spiders|🕷️
Black widow=widow spider 🕷️
%Araneidae|Orb weavers|🕸️
European garden spider=garden spider,orb weaver,cross spider,spider 🕸️
%Salticidae|Jumping spiders|🕷️
Jumping spider=peacock spider 🕷️
%Lycosidae|Wolf spiders|🕷️
Wolf spider 🕷️
%Agelenidae|Funnel weavers|🕷️
Giant house spider=house spider 🕷️
%Pholcidae|Cellar spiders|🕷️
Cellar spider=daddy long-legs spider 🕷️
%Sparassidae|Huntsman spiders|🕷️
Huntsman spider 🕷️
%Atracidae|Funnel-web spiders|🕷️
Sydney funnel-web spider=funnel-web spider 🕷️
%Sicariidae|Recluse spiders|🕷️
Brown recluse 🕷️
#Scorpiones|Scorpions|🦂
%Buthidae|Bark scorpions|🦂
Deathstalker=scorpion,deathstalker scorpion 🦂
%Scorpionidae|Burrowing scorpions|🦂
Emperor scorpion 🦂
#Opiliones|Harvestmen|🕷️
%Phalangiidae|Harvestmen|🕷️
Harvestman 🕷️
#Ixodida|Ticks|🕷️
%Ixodidae|Hard ticks|🕷️
Tick=deer tick 🕷️
#Trombidiformes|Mites|🕷️
%Trombidiidae|Velvet mites|🕷️
Mite=red velvet mite,dust mite 🕷️
#Solifugae|Camel spiders|🕷️
%Galeodidae|Camel spiders|🕷️
Camel spider=sun spider,wind scorpion 🕷️
#Amblypygi|Whip spiders|🕷️
%Phrynidae|Whip spiders|🕷️
Whip spider=tailless whip scorpion 🕷️

@Malacostraca|Crustacean|🦀
#Decapoda|Crabs, lobsters and shrimp|🦀
%Nephropidae|Lobsters|🦞
American lobster=lobster 🦞; European lobster 🦞
%Palinuridae|Spiny lobsters|🦞
Spiny lobster=rock lobster 🦞
%Cancridae|Rock crabs|🦀
Edible crab=crab 🦀; Dungeness crab 🦀
%Portunidae|Swimming crabs|🦀
Blue crab 🦀; European green crab=shore crab,green crab 🦀
%Coenobitidae|Land hermit crabs|🦀
Hermit crab 🦀; Coconut crab=robber crab 🦀
%Ocypodidae|Fiddler and ghost crabs|🦀
Fiddler crab 🦀; Ghost crab 🦀
%Gecarcinidae|Land crabs|🦀
Christmas Island red crab=red crab 🦀
%Inachidae|Spider crabs|🦀
Japanese spider crab=spider crab 🦀
%Astacidae|Crayfish|🦞
Crayfish=crawfish,crawdad 🦞
%Penaeidae|Prawns|🦐
Shrimp=prawn 🦐
%Alpheidae|Snapping shrimp|🦐
Snapping shrimp=pistol shrimp 🦐
#Stomatopoda|Mantis shrimp|🦐
%Odontodactylidae|Mantis shrimp|🦐
Mantis shrimp=peacock mantis shrimp 🦐
#Euphausiacea|Krill|🦐
%Euphausiidae|Krill|🦐
Krill 🦐
#Isopoda|Isopods|🪲
%Armadillidiidae|Pill bugs|🪲
Woodlouse=pill bug,roly-poly,slater,sowbug 🪲
%Cirolanidae|Giant isopods|🪲
Giant isopod 🪲
#Amphipoda|Amphipods|🦐
%Talitridae|Sand hoppers|🦐
Sand hopper=beach hopper,sand flea 🦐

@Branchiopoda|Branchiopod|🦐
#Anostraca|Fairy shrimp|🦐
%Artemiidae|Brine shrimp|🦐
Brine shrimp=sea monkey,sea monkeys 🦐
#Diplostraca|Water fleas|🦐
%Daphniidae|Water fleas|🦐
Water flea=daphnia 🦐
@Copepoda|Copepod|🦐
#Calanoida|Copepods|🦐
%Calanidae|Copepods|🦐
Copepod 🦐
@Thecostraca|Barnacle|🐚
#Balanomorpha|Barnacles|🐚
%Balanidae|Acorn barnacles|🐚
Barnacle 🐚
@Merostomata|Horseshoe crab|🦀
#Xiphosura|Horseshoe crabs|🦀
%Limulidae|Horseshoe crabs|🦀
Horseshoe crab 🦀
@Chilopoda|Centipede|🐛
#Scolopendromorpha|Centipedes|🐛
%Scolopendridae|Giant centipedes|🐛
Centipede=giant centipede 🐛
@Diplopoda|Millipede|🐛
#Spirostreptida|Millipedes|🐛
%Spirostreptidae|Giant millipedes|🐛
Millipede=giant african millipede 🐛
@Trilobita|Trilobite|🪲
#Redlichiida|Trilobites|🪲
%Redlichiidae|Trilobites|🪲
Trilobite 🪲

@Gastropoda|Snail or slug|🐌
#Stylommatophora|Land snails and slugs|🐌
%Helicidae|Garden snails|🐌
Garden snail=snail,escargot 🐌; Roman snail 🐌
%Achatinidae|Giant African snails|🐌
Giant African land snail 🐌
%Limacidae|Keeled slugs|🐌
Leopard slug=slug 🐌
%Ariolimacidae|Banana slugs|🐌
Banana slug 🐌
#Neogastropoda|Sea snails|🐚
%Conidae|Cone snails|🐚
Cone snail 🐚
%Buccinidae|Whelks|🐚
Whelk 🐚
#Littorinimorpha|Periwinkles and conchs|🐚
%Littorinidae|Periwinkles|🐚
Periwinkle 🐚
%Cypraeidae|Cowries|🐚
Cowrie=cowry 🐚
%Strombidae|Conchs|🐚
Queen conch=conch 🐚
#Nudibranchia|Sea slugs|🐌
%Chromodorididae|Chromodorid sea slugs|🐌
Nudibranch=sea slug 🐌
#Patellogastropoda|Limpets|🐚
%Patellidae|Limpets|🐚
Limpet 🐚
#Lepetellida|Abalone|🐚
%Haliotidae|Abalone|🐚
Abalone=paua 🐚

@Cephalopoda|Cephalopod|🐙
#Octopoda|Octopuses|🐙
%Octopodidae|Octopuses|🐙
Common octopus=octopus 🐙; Blue-ringed octopus 🐙; Giant Pacific octopus 🐙
%Opisthoteuthidae|Dumbo octopuses|🐙
Dumbo octopus 🐙
#Myopsida|Inshore squid|🦑
%Loliginidae|Pencil squid|🦑
Squid=common squid,calamari 🦑
#Oegopsida|Oceanic squid|🦑
%Architeuthidae|Giant squid|🦑
Giant squid 🦑
%Cranchiidae|Glass squid|🦑
Colossal squid 🦑
%Ommastrephidae|Flying squid|🦑
Humboldt squid 🦑
#Sepiida|Cuttlefish|🦑
%Sepiidae|Cuttlefish|🦑
Cuttlefish 🦑
#Nautilida|Nautiluses|🐚
%Nautilidae|Nautiluses|🐚
Nautilus 🐚
#Vampyromorphida|Vampire squid|🦑
%Vampyroteuthidae|Vampire squid|🦑
Vampire squid 🦑

@Bivalvia|Bivalve|🦪
#Ostreida|Oysters|🦪
%Ostreidae|Oysters|🦪
Oyster 🦪
#Mytilida|Mussels|🦪
%Mytilidae|Mussels|🦪
Mussel=blue mussel 🦪
#Venerida|Clams|🦪
%Veneridae|Venus clams|🦪
Clam 🦪
%Cardiidae|Cockles and giant clams|🦪
Giant clam 🦪; Cockle 🦪
#Pectinida|Scallops|🦪
%Pectinidae|Scallops|🦪
Scallop 🦪

@Scyphozoa|Jellyfish|🪼
#Semaeostomeae|Jellyfish|🪼
%Ulmaridae|Moon jellies|🪼
Moon jellyfish=jellyfish,jelly 🪼
%Cyaneidae|Lion's mane jellies|🪼
Lion's mane jellyfish 🪼
@Cubozoa|Box jellyfish|🪼
#Chirodropida|Box jellyfish|🪼
%Chironicidae|Sea wasps|🪼
Box jellyfish=sea wasp 🪼
@Hydrozoa|Hydrozoan|🪼
#Siphonophorae|Siphonophores|🪼
%Physaliidae|Man o' war|🪼
Portuguese man o' war=man-of-war,man o war 🪼
#Anthoathecata|Hydras|🪼
%Hydridae|Hydras|🪼
Hydra (animal)=freshwater hydra 🪼
@Anthozoa|Coral or anemone|🪸
#Actiniaria|Sea anemones|🪸
%Actiniidae|Sea anemones|🪸
Sea anemone=anemone 🪸
#Scleractinia|Stony corals|🪸
%Acroporidae|Staghorn corals|🪸
Coral=stony coral,coral reef 🪸
@Ctenophora|Comb jelly|🪼
#Lobata|Comb jellies|🪼
%Bolinopsidae|Comb jellies|🪼
Comb jelly 🪼

@Asteroidea|Starfish|⭐
#Valvatida|Sea stars|⭐
%Oreasteridae|Cushion stars|⭐
Starfish=sea star ⭐
%Acanthasteridae|Crown-of-thorns|⭐
Crown-of-thorns starfish ⭐
@Echinoidea|Sea urchin|🦔
#Camarodonta|Sea urchins|🦔
%Strongylocentrotidae|Sea urchins|🦔
Sea urchin=urchin 🦔
#Clypeasteroida|Sand dollars|🦔
%Mellitidae|Sand dollars|🦔
Sand dollar 🦔
@Holothuroidea|Sea cucumber|🥒
#Holothuriida|Sea cucumbers|🥒
%Holothuriidae|Sea cucumbers|🥒
Sea cucumber 🥒
@Ophiuroidea|Brittle star|⭐
#Ophiurida|Brittle stars|⭐
%Ophiuridae|Brittle stars|⭐
Brittle star 🌟

@Clitellata|Segmented worm|🪱
#Crassiclitellata|Earthworms|🪱
%Lumbricidae|Earthworms|🪱
Earthworm=worm,nightcrawler 🪱
#Arhynchobdellida|Leeches|🪱
%Hirudinidae|Leeches|🪱
Medicinal leech=leech 🪱
@Polychaeta|Bristle worm|🪱
#Phyllodocida|Bristle worms|🪱
%Nereididae|Ragworms|🪱
Ragworm=bristle worm 🪱
%Eunicidae|Bobbit worms|🪱
Bobbit worm 🪱
#Sabellida|Fan worms|🪱
%Serpulidae|Christmas tree worms|🪱
Christmas tree worm 🪱
@Eutardigrada|Tardigrade|🐻
#Parachela|Water bears|🐻
%Hypsibiidae|Water bears|🐻
Tardigrade=water bear,moss piglet 🐻
@Chromadorea|Roundworm|🪱
#Rhabditida|Roundworms|🪱
%Rhabditidae|Roundworms|🪱
Roundworm=nematode 🪱
@Rhabditophora|Flatworm|🪱
#Tricladida|Planarians|🪱
%Dugesiidae|Planarians|🪱
Flatworm=planarian 🪱
@Demospongiae|Sponge|🧽
#Dictyoceratida|Sponges|🧽
%Spongiidae|Bath sponges|🧽
Sea sponge=sponge 🧽
@Ascidiacea|Sea squirt|🫧
#Stolidobranchia|Sea squirts|🫧
%Pyuridae|Sea squirts|🫧
Sea squirt=tunicate 🫧

@Dinosauria|Dinosaur|🦖
#Theropoda|Meat-eating dinosaurs|🦖
%Tyrannosauridae|Tyrannosaurs|🦖
Tyrannosaurus rex=t-rex,t rex,trex,tyrannosaurus 🦖
%Dromaeosauridae|Raptors|🦖
Velociraptor=raptor (dinosaur) 🦖
%Spinosauridae|Spinosaurs|🦖
Spinosaurus 🦖
%Allosauridae|Allosaurs|🦖
Allosaurus 🦖
#Sauropoda|Long-necked dinosaurs|🦕
%Diplodocidae|Diplodocids|🦕
Diplodocus 🦕; Brontosaurus 🦕
%Brachiosauridae|Brachiosaurs|🦕
Brachiosaurus 🦕
#Ornithischia|Bird-hipped dinosaurs|🦕
%Ceratopsidae|Horned dinosaurs|🦕
Triceratops 🦕
%Stegosauridae|Stegosaurs|🦕
Stegosaurus 🦕
%Ankylosauridae|Ankylosaurs|🦕
Ankylosaurus 🦕
%Hadrosauridae|Duck-billed dinosaurs|🦕
Parasaurolophus 🦕
%Iguanodontidae|Iguanodonts|🦕
Iguanodon 🦕
@Pterosauria|Pterosaur|🦖
#Pterodactyloidea|Pterosaurs|🦖
%Pteranodontidae|Pteranodons|🦖
Pterodactyl=pteranodon,pterosaur 🦖

@Mythical|Mythical creature|🐉
#Legendary|Legendary creatures|🐉
%Dragons|Dragons and serpents|🐉
Dragon 🐉; Wyvern 🐉; Lernaean Hydra=hydra (myth) 🐉; Basilisk 🐍; Sea serpent 🐍
%MythHorses|Magic horses|🦄
Unicorn 🦄; Pegasus 🦄; Kelpie 🐎
%MythBeasts|Mythical beasts|🐉
Griffin=gryphon 🦅; Phoenix=firebird 🔥; Chimera 🐉; Manticore 🦁; Sphinx 🦁; Cerberus=three-headed dog 🐕; Minotaur 🐂; Kraken 🐙; Leviathan 🐋; Thunderbird 🦅; Roc 🦅
%Cryptids|Cryptids|👣
Bigfoot=sasquatch 👣; Yeti=abominable snowman 👣; Loch Ness Monster=nessie 🦕; Chupacabra 👣; Mothman 🦋; Jackalope 🐇; Jersey Devil 😈; Bunyip 👣; Drop bear 🐨
%Folklore|Folklore|👻
Werewolf 🐺; Vampire 🧛; Mermaid=merman,siren 🧜; Troll 🧌; Goblin 👺; Banshee 👻; Ghost=spirit,poltergeist,haunted house 👻; Zombie 🧟; Gremlin 👹; Fairy=pixie 🧚; Elf 🧝; Ogre 👹; Genie 🧞
%Aliens|Aliens|👽
Alien=extraterrestrial,martian,ufo 👽

@Thing|Not an animal|🤔
#Machines|Machines and gadgets|⚙️
%Household|Household noises|🏠
Squeaky door=creaky door,door hinge 🚪; Whistling kettle=kettle 🫖; Washing machine 🫧; Vacuum cleaner=hoover,vacuum 🧹; Microwave 🍿; Fridge=refrigerator 🧊; Toilet flush=toilet 🚽
Hair dryer 💨; Blender 🥤; Alarm clock ⏰; Smoke alarm=smoke detector 🚨; Coffee machine=espresso machine ☕; Doorbell 🔔
%Vehicles|Vehicles and engines|🚗
Car alarm 🚨; Motorcycle=motorbike 🏍️; Lawn mower=lawnmower 🚜; Chainsaw 🪚; Truck=lorry 🚚; Foghorn 📯; Train horn=train 🚂; Siren=ambulance siren,police siren 🚨
Jet engine=airplane,plane 🛩️; Helicopter 🚁; Dentist drill=drill 🦷; Car engine=car 🚗; Tractor 🚜; Rusty bicycle=bicycle,bike 🚲
%Electronics|Electronics|🤖
Dial-up modem=modem,dial-up internet 📞; Robot 🤖; Old printer=printer 🖨️; Fax machine 📠; Theremin 🎛️; Synthesizer=synth 🎹; 8-bit video game=video game,retro game 🎮; Radio static=static,white noise 📻; Walkie-talkie 📻
#People|Human noises|🧑
%Body|Body noises|😮
Stomach rumble=my stomach,tummy rumble,hungry stomach 🫃; Snoring=snore,my dad snoring 😴; Burp=belch 😮; Sneeze 🤧; Hiccup 😯; Fart=toot,trump 💨; Yawn 🥱; Whistling=whistle 😗; Beatboxing=beatbox 🎤; Opera singer=opera,soprano 🎭
%Instruments|Musical instruments|🎶
Didgeridoo 🪈; Bagpipes 🎶; Kazoo 🎶; Tuba 🎺; Trombone 🎺; Violin 🎻; Cello 🎻; Accordion 🪗; Drum=drums 🥁; Rubber duck=squeaky toy 🦆; Deflating balloon=balloon 🎈; Whoopee cushion 💨
#Nature|Nature sounds|🌍
%Weather|Weather and earth|⛈️
Thunder=thunderstorm ⛈️; Wind=howling wind 🌬️; Rain 🌧️; Waterfall 💦; Earthquake 🌋; Volcano 🌋; Ocean waves=waves,sea 🌊; Cracking ice=ice 🧊; Falling tree=tree 🌳
%Space|Space|🌌
Black hole 🕳️; Outer space=space,the universe 🌌
`;
