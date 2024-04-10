const titlEl = document.getElementById("title")
const descEl = document.getElementById("desc")
const imgEl = document.getElementById("cover")
const playEl = document.getElementById("play-pause")
const audio = document.getElementById("music")
const progSec = document.getElementById("sec-prog")
const progRange = document.getElementById("perc-prog")

var currentCase = {target:{tagName:"DIV",title:1}}

let inPlay = 0, playing = false, first = true

function handleClick(e) {
    var track = e.target
    while(track.tagName!=="DIV") track = track.parentNode

    var id = Number(track.title)-1

    if(first) first = false

    titlEl.innerText = (id+1) + ". " + titles[id]
    descEl.innerText = descs[id]
    imgEl.setAttribute("src","gifs/"+id+".gif")
    inPlay = id
    playing = true
    playEl.innerHTML = pauseIcon
    audio.play()
    audio.currentTime = 0
}

document.querySelectorAll(".track").forEach(function(x) {
    x.addEventListener("click",e => handleClick(e))
})

const playIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/></svg>'
const pauseIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/></svg>'

playEl.addEventListener("click",function(e) {
    if(first) {
        first = false
        handleClick(currentCase)
    }
    else {
        playing = !playing

        if(playing) {
            playEl.innerHTML = pauseIcon
            imgEl.setAttribute("src","gifs/"+inPlay+".gif")
            audio.play()
        }
        else {
            playEl.innerHTML = playIcon
            imgEl.setAttribute("src","indv.jpg")
            audio.pause()
        } 
    }
})

progRange.addEventListener('input', function() {
    audio.currentTime = progRange.value * audio.duration
})

document.getElementById("volume").addEventListener('input', function(e) {
    audio.volume = e.target.value
});

audio.addEventListener('timeupdate', function (e) {
    progRange.value = e.target.currentTime / e.target.duration
    progSec.innerText = formatInMin(e.target.currentTime)
});

function formatInMin(s) {
    let sex = Math.floor(s % 60)
    return Math.floor(s / 60)+":"+ (sex < 10 ? '0' : '') + sex
}

audio.onended = function() {
    audio.currentTime = 0;
    currentCase.target.title = inPlay==13 ? 1 : currentCase.target.title+1
    handleClick(currentCase)
}

document.getElementById("prec-song").addEventListener('click',function() {
    if(inPlay>0)
        currentCase.target.title--

    audio.currentTime = 0
    handleClick(currentCase)
})

document.getElementById("next-song").addEventListener('click',function() {
    if(inPlay==13)
        currentCase.target.title = 1
    else currentCase.target.title++

    audio.currentTime = 0
    handleClick(currentCase)
})


const titles = [
    "L'Anticristo",
    "Capra a tre Teste",
    "Eva",
    "Servizio",
    "Il Signore delle Mosche",
    "Lilith",
    "Nemico",
    "Denaro",
    "Yung 3p 4",
    "Terr1",
    "Ilva",
    "Paganini",
    "Ex Angelo",
    "Lucifero"
]


const descs = [
    "Il nemico di Cristo che tenta di soppiantarlo, ma che da Cristo sarà annientato nel suo ritorno trionfale (parusia) alla fine dei tempi. Nei Vangeli non si parla espressamente dell’A.; i testi di riferimento sono la seconda lettera di s. Paolo ai Tessalonicesi e l’Apocalisse. In s. Paolo l’A. è l’«uomo del peccato, figlio della perdizione, che si contrappone e si innalza sopra di tutto ciò che si chiama Dio» (è dunque l’«abominio della desolazione» di Daniele 9, 27; Matt. 24, 15; Mc. 13, 14), la cui manifestazione («apostasia» o ribellione) sarà «per virtù di Satana con prodigi mendaci e in ogni sorta di seduzione peccaminosa»; ma il Signore Gesù apparirà e lo annienterà. Nell’Apocalisse, dove la lotta tra Cristo e l’A. è il tema centrale, agli elementi derivati da Daniele (e che alludono ad Antioco IV Epifane) se ne aggiungono altri che sembrano alludere a Nerone: la leggenda del ritorno di Nerone (Nero redivivus) appare anche nella letteratura apocalittica giudaica e cristiana e nella letteratura patristica.",
    "Analogia tra la capra (G.O.A.T, Greatest of All Times) ed il favoloso cane della mitologia greca, custode dell’entrata dell’Ade. Compare per la prima volta nella Teogonia esiodea, dove è detto figlio di Tifone e di Echidna, fratello dell’Idra di Lerna fornito di 50 teste (poi comunemente tre). La descrizione del suo orribile aspetto è presente anche nell'Eneide di Virgilio e nelle Metamorfosi di Ovidio. Fu trascinato una volta sulla Terra da Eracle. Nel culto, l’elemento rituale più connesso con C. era la focaccia di miele che si dava ai morti perché la offrissero al portiere dell’Ade.",
    "Nel racconto biblico di Genesi 2-5, la prima donna, progenitrice del genere umano. Dio creò E. con una costola di Adamo, perché fosse sua compagna. Ingannata dal serpente, E. mangiò e indusse Adamo a mangiare il frutto dell'albero della conoscenza del bene e del male, proibito da Dio; a seguito di questa colpa, fu espulsa con Adamo dal giardino dell'Eden e punita con i dolori del parto. E. ebbe come figli Caino, Abele e Set. La letteratura cristiana antica ha contrapposto la figura di E., che ha condannato l'umanità disobbedendo al comandamento di Dio, a Maria madre di Gesù, che l'ha salvata con l'obbedienza e la fede in Dio. E. è anche figura della Chiesa, nata dal fianco di Cristo con la sua passione e morte.",
    "Un patto col diavolo è un accordo di scambio, in cui un uomo cede la propria anima al diavolo per ottenere da questi in cambio benefici di vario genere, quali ricchezza, talenti o poteri sovrannaturali. Il tema è trattato in leggende, racconti e opere letterarie.",
    "Il signore delle mosche (Lord of the Flies) è un romanzo dello scrittore britannico William Golding. Il libro ha come protagonisti un gruppo di ragazzi britannici bloccati su un'isola disabitata e racconta il loro disastroso tentativo di autogovernarsi. Il Signore delle mosche rappresenta il manifesto della poetica dell'autore, che può essere riassunta in questa frase: \"Gli umani producono il male come le api producono il miele\".",
    "La leggenda di Lilith, demone-femmina, possiede un’ampia letteratura diffusa sia in epoca antica, medievale e moderna. Questo mito affonda le sue origini nella religione mesopotamica e nei primi culti di quella ebraica che, insieme ad altri miti come ad esempio quello del diluvio universale, potrebbe averlo appreso dai babilonesi durante la prigionia degli ebrei a Babilonia. Nella religione mesopotamica, Lilith, è un demone femminile portatore di sciagure e morte, legata al vento e alla tempesta e alcune trascrizioni che accennano a questo culto sembrerebbero risalire al III millennio a. C. Nella religione ebraica, invece, Lilith è la prima moglie di Adamo che si rifugia nel Mar Rosso per fuggire dal marito. Lilith, infatti, essendo stata creata da Dio dalla polvere, come Adamo, pretendeva di averne anche gli stessi diritti, che, però, le furono negati. Per questo suo gesto di ribellione viene associata a un demone notturno, che spesso compare nella forma di una civetta, e capace di danneggiare i bambini maschi. Tuttavia, alla fine dell’Ottocento, durante l’emancipazione femminile, Lilith diventa simbolo della libertà delle donne.",
    "La principale rappresentazione simbolica del denaro nell'iconografia medievale è una borsa che, appesa al collo di un ricco, lo trascina all'Inferno. Il denaro nel senso in cui lo intendiamo oggi è un prodotto della modernità. Non è un protagonista di primo piano del Medioevo, né dal punto di vista economico e politico né da quello psicologico ed etico; è meno importante e meno presente di quanto non lo fosse nell'Impero romano, e soprattutto assai meno centrale di quanto non diventerà nei secoli successivi.",
    "Indica avversione decisa o assoluta incompatibilità ( esser n. delle chiacchiere, dei compromessi, dell'ipocrisia ), oppure appartenenza al paese col quale si è in guerra, dal punto di vista delle funzioni ed esigenze belliche ( l'artiglieria, l'aviazione n. ; il bombardamento delle linee n. ; la propaganda n. ), o anche generica o nociva ostilità ( sorte, fortuna n. ; la grandine è n. delle viti o alle viti ).",
    "collettivo artistico del rapper italiano Kid Yugi.",
    "Appellativo con cui gli Italiani del Nord chiamano spesso quelli del Mezzogiorno; tratto dalle espressioni terre matte, terre ballerine (vedi terra), si carica spesso d'una connotazione spregiativa.",
    "Dopo essere finita al centro di inchieste giudiziarie nel 2012, l'acciaieria pugliese realizzata nel 1960 è stata commissariata. Successivamente è stata venduta ad ArcelorMittal, multinazionale del segmento siderurgico che fa capo alla famiglia indiana Mittal.",
    "Era chiamato il “violinista del diavolo” per l’abilità esecutiva che solo colui che scende a patti con il demonio può possedere. Ma non solo. L’aspetto, gli atteggiamenti e gli eccessi di Paganini contribuirono a conferire all’appellativo “demoniaco” sempre maggiore sostanza.",
    "Essere sovrumano, ministro di Dio presso gli uomini per annunciare e fare eseguire la sua volontà. Il termine greco ἄγγελος («messaggero») applicato a messi divini (Hermes, Iride, la Fama, talvolta in connessione con l’Oltretomba) venne usato dai traduttori greci dell’Antico Testamento per rendere l’ebraico mal’āk, che vale «messaggero, ministro». Gli a., esseri superiori all’uomo (detti anche «figli» di Dio, Genesi 6, 2; Giobbe 1, 6), formano gli eserciti di Yahweh, fanno conoscere e osservare i suoi voleri: varcano le distanze in un attimo, appaiono agli uomini (talvolta in sogno o in visione) in forma umana, proteggono uomini (come Raffaele, custode di Tobia) e nazioni o li puniscono.",
    "Il termine Lucifero il cui significato letterale è Portatore di luce, è un termine con il quale ci si può riferire a differenti entità mitologiche"
]