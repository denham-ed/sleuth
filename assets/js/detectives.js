const detectives = [{
    name: "Sherlock Holmes",
    image: "assets/media/detectives/sherlock_holmes.jpeg",
    facts: [{
        stat: "Enemies",
        result: 4,
        relStrength: 1.01587301587302
    }, {
        stat: "Cases",
        result: 145,
        relStrength: 1.59889731219848
    }, {
        stat: "Style",
        result: 10,
        relStrength: 0.909090909090909
    }, {
        stat: "Assistants",
        result: 2,
        relStrength: 0.8
    }],
    biography: "Sherlock Holmes, the world's first consulting detective, epitomises the fictional detective. Known for his powers of deduction and logical reasoning, first appeared in 1887. A century later there are over 25,000 stage adaptations, films, television shows and publications featuring the occupant of 221B Baker Street",
    creator: "Arthur Conan Doyle"
},
{
    name: "Tom Barnaby",
    image: "assets/media/detectives/tom_barnaby.jpeg",
    facts: [{
        stat: "Enemies",
        result: 4,
        relStrength: 1.01587301587302
    }, {
        stat: "Cases",
        result: 141,
        relStrength: 1.55478980013784
    }, {
        stat: "Style",
        result: 10,
        relStrength: 0.909090909090909
    }, {
        stat: "Assistants",
        result: 2,
        relStrength: 0.8
    }],
    biography: "First appearing as the eponymous hero in the Chief Inspector Barnaby novel series, Tom Barnaby would later appear in 13 series of the ITV drama Midsomer Murders played by John Nettles.",
    creator: "Caroline Graham"
},
{
    name: "Benoit Blanc",
    image: "assets/media/detectives/benoit_blanc.jpeg",
    facts: [{
        stat: "Enemies",
        result: 4,
        relStrength: 1.01587301587302
    }, {
        stat: "Cases",
        result: 13,
        relStrength: 0.143349414197105
    }, {
        stat: "Style",
        result: 13,
        relStrength: 1.18181818181818
    }, {
        stat: "Assistants",
        result: 2,
        relStrength: 0.8
    }],
    biography: "Portrayed by Daniel Craig in the films Knives Out and Glass Onion, Benoit Blanc is described as the 'The Last of the Gentleman Sleuths'. Eccentric and known for his Southern drawl, he possesses a brilliant mind and superb skills of observation.",
    creator: "Rian Johnson"
},
{
    name: "Hercule Poirot",
    image: "assets/media/detectives/hercule_poirot.jpeg",
    facts: [{
        stat: "Enemies",
        result: 6,
        relStrength: 1.52380952380952
    }, {
        stat: "Cases",
        result: 19,
        relStrength: 0.209510682288077
    }, {
        stat: "Style",
        result: 10,
        relStrength: 0.909090909090909
    }, {
        stat: "Assistants",
        result: 6,
        relStrength: 2.4
    }],
    biography: "Appearing in thirty-three novels, two plays and more than fifty short stories, Poirot is one of Agatha Christie's most famous characters. Known for his methodical reasoning and his psychological understanding of his suspects and victims, the Belgian detective has been portrayed by several actors including Albert Finney, Peter Ustinov, David Suchet and Kenneth Branagh.",
    creator: "Agatha Christie"
},
{
    name: "Nancy Drew",
    image: "assets/media/detectives/nancy_drew.jpeg",
    facts: [{
        stat: "Enemies",
        result: 3,
        relStrength: 0.761904761904762
    }, {
        stat: "Cases",
        result: 98,
        relStrength: 1.08063404548587
    }, {
        stat: "Style",
        result: 5,
        relStrength: 0.454545454545455
    }, {
        stat: "Assistants",
        result: 1,
        relStrength: 0.4
    }],
    biography: "Appearing first as the female counterpart to the Hardy Boys, Nancy Drew has been reinvented and recontextualised for over 80 years. Her stories now appear in 45 languages and she has been cited as a formative influence for several successful figures including Sonia Sotomayor and Hillary Rodham Clinton.",
    creator: "Edward Stratemeyer"
},
{
    name: "Jonathan Creek",
    image: "assets/media/detectives/jonathan_creek.jpeg",
    facts: [{
        stat: "Enemies",
        result: 4,
        relStrength: 1.01587301587302
    }, {
        stat: "Cases",
        result: 107,
        relStrength: 1.17987594762233
    }, {
        stat: "Style",
        result: 7,
        relStrength: 0.636363636363636
    }, {
        stat: "Assistants",
        result: 3,
        relStrength: 1.2
    }],
    biography: "A designer of magic tricks by trade, Jonathan Creek applies his lateral thinking and reasoning to solve seemingly-impossible crimes. Creek's cases epitomise the 'locked-room mystery' genre and he is ably assisted by his on-again-off-again partner Maddy Magellan.",
    creator: "David Renwick"
},
{
    name: "Alex Cross",
    image: "assets/media/detectives/alex_cross.jpeg",
    facts: [{
        stat: "Enemies",
        result: 1,
        relStrength: 0.253968253968254
    }, {
        stat: "Cases",
        result: 120,
        relStrength: 1.32322536181943
    }, {
        stat: "Style",
        result: 13,
        relStrength: 1.18181818181818
    }, {
        stat: "Assistants",
        result: 5,
        relStrength: 2
    }],
    biography: "A detective with the Metropolitan Police Department, Alex Cross is known as the hero of James Patterson's dark and thrilling novel series. Focussing on dark themes, such as the unsolved murder of Cross' wife, the series has spawned three films - Kiss the Girls, Along Came a Spider and Alex Cross.",
    creator: "James Patterson"
},
{
    name: "Sam Wyndham",
    image: "assets/media/detectives/sam_wyndham.jpeg",
    facts: [{
        stat: "Enemies",
        result: 5,
        relStrength: 1.26984126984127
    }, {
        stat: "Cases",
        result: 35,
        relStrength: 0.385940730530669
    }, {
        stat: "Style",
        result: 3,
        relStrength: 0.272727272727273
    }, {
        stat: "Assistants",
        result: 6,
        relStrength: 2.4
    }],
    biography: "After leaving the Metropolitan Police, Sam Wyndham starts a new life and career in Calcutta with the Imperial Police Form. His friendship with Sergeant Bannerjee, his dark sense of humour and his distrust of authority are central themes through his exploits in India.",
    creator: "Abir Mukherjee"
},
{
    name: "Dirk Gently",
    image: "assets/media/detectives/dirk_gently.jpeg",
    facts: [{
        stat: "Enemies",
        result: 5,
        relStrength: 1.26984126984127
    }, {
        stat: "Cases",
        result: 41,
        relStrength: 0.45210199862164
    }, {
        stat: "Style",
        result: 14,
        relStrength: 1.27272727272727
    }, {
        stat: "Assistants",
        result: 1,
        relStrength: 0.4
    }],
    biography: "Billing himself as a 'holistic detective', Dirk Gently's cases often involve a seemingly-paranormal twist, including a time-travel murder.",
    creator: "Douglas Adams"
},
{
    name: "Byomkesh Bakshi",
    image: "assets/media/detectives/byomkesh_bakshi.jpeg",
    facts: [{
        stat: "Enemies",
        result: 6,
        relStrength: 1.52380952380952
    }, {
        stat: "Cases",
        result: 9,
        relStrength: 0.0992419021364576
    }, {
        stat: "Style",
        result: 14,
        relStrength: 1.27272727272727
    }, {
        stat: "Assistants",
        result: 1,
        relStrength: 0.4
    }],
    biography: "Byomkesh Bakhshi's powers of reasoning and observation are so astute that both parts of his name have entered the Bengali language to describe someone intelligent. Bakshi's cases are narrated by companion Ajit Bandyopadhyay.",
    creator: "Sharadindu Bandyopadhyay"
},
{
    name: "Cormoran Strike",
    image: "assets/media/detectives/cormoran_strike.jpeg",
    facts: [{
        stat: "Enemies",
        result: 4,
        relStrength: 1.01587301587302
    }, {
        stat: "Cases",
        result: 114,
        relStrength: 1.25706409372846
    }, {
        stat: "Style",
        result: 10,
        relStrength: 0.909090909090909
    }, {
        stat: "Assistants",
        result: 3,
        relStrength: 1.2
    }],
    biography: "Private detective and war veteran Cormoran Strike appears in 6 novels by Robert Galbraith, a pseudonym for JK Rowling.",
    creator: "Robert Galbraith aka JK Rowling"
},
{
    name: "Alan Banks",
    image: "assets/media/detectives/alan_banks.jpeg",
    facts: [{
        stat: "Enemies",
        result: 6,
        relStrength: 1.52380952380952
    }, {
        stat: "Cases",
        result: 117,
        relStrength: 1.29014472777395
    }, {
        stat: "Style",
        result: 14,
        relStrength: 1.27272727272727
    }, {
        stat: "Assistants",
        result: 1,
        relStrength: 0.4
    }],
    biography: "The award-winning Alan Banks novels (and subsequent TV series) relate the cases of DCI Banks as he grapples with gritty cases in the Yorkshire Dales after relocating from London.",
    creator: "Peter Robinson"
},
{
    name: "Dick Tracy",
    image: "assets/media/detectives/dick_tracy.jpeg",
    facts: [{
        stat: "Enemies",
        result: 3,
        relStrength: 0.761904761904762
    }, {
        stat: "Cases",
        result: 129,
        relStrength: 1.42246726395589
    }, {
        stat: "Style",
        result: 19,
        relStrength: 1.72727272727273
    }, {
        stat: "Assistants",
        result: 4,
        relStrength: 1.6
    }],
    biography: "Dick Tracy, in his comic book form, first appeared in 1931 in the Detroit Mirror. His cases are often gritty and violent and filled with topical themes and references. Tracy is so famous, he has transcended the genre and is referenced in media as varied as contemporary art, satire, novels, stop-motion comedy, tv and films.",
    creator: "Chester Gould"
},
{
    name: "Peter Wimsey",
    image: "assets/media/detectives/peter_wimsey.jpeg",
    facts: [{
        stat: "Enemies",
        result: 0,
        relStrength: 0
    }, {
        stat: "Cases",
        result: 117,
        relStrength: 1.29014472777395
    }, {
        stat: "Style",
        result: 14,
        relStrength: 1.27272727272727
    }, {
        stat: "Assistants",
        result: 0,
        relStrength: 0
    }],
    biography: "Lord Peter Wimsey is the archetypal British gentleman detective. Notably, the character ages in real-time throughout the series of novels; from his aristocratic upbringing and service in WWI to his final case during the second world war. The stories also offer a piercing social satire of the British class system.",
    creator: "Dorothy L. Sayers"
},
{
    name: "Frank Columbo",
    image: "assets/media/detectives/frank_columbo.jpeg",
    facts: [{
        stat: "Enemies",
        result: 5,
        relStrength: 1.26984126984127
    }, {
        stat: "Cases",
        result: 102,
        relStrength: 1.12474155754652
    }, {
        stat: "Style",
        result: 9,
        relStrength: 0.818181818181818
    }, {
        stat: "Assistants",
        result: 1,
        relStrength: 0.4
    }],
    biography: "The raincoat and cigar of LAPD office Columbo are as iconic as his relentless investigative approach. The lieutenant was played by Peter Falk in the TV series that ran from 1968 until 2003. His biography is confusing by design - Columbo is a private man, who refused to even confirm his first name!",
    creator: "Richard Levinson & William Link"
},
{
    name: "Kinsey Millhone",
    image: "assets/media/detectives/kinsey_millhone.jpeg",
    facts: [{
        stat: "Enemies",
        result: 3,
        relStrength: 0.761904761904762
    }, {
        stat: "Cases",
        result: 144,
        relStrength: 1.58787043418332
    }, {
        stat: "Style",
        result: 11,
        relStrength: 1
    }, {
        stat: "Assistants",
        result: 2,
        relStrength: 0.8
    }],
    biography: "Ex-police officer turned private investigator Kinsey Millhone is the protagonist in Sue Grafton's 'alphabet mysteries. Single-minded and determined, Millhone pursues her investigations in 1980s Santa Teresa.",
    creator: "Sue Grafton"
}
]