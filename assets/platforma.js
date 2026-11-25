// =========================================================================
    // 1. GROUNDED DATA: 5-MONTH ROADMAP + 12 ENRICHED LESSONS + VOCABULARY
    // =========================================================================
    const SCHEDULE_INFO = {
      title: "Yetkazish nemis tili darslarini",
      time: "Har kuni soat 09:00 da",
      duration: "5 oy (150 kun · 350–400 soat)",
      dailyTarget: "2 — 2.5 soat",
      currentLevel: "A1.2"
    };

    const GOLDEN_RULES = [
      {
        num: "01",
        title: "Barcha otlar bosh harf bilan yoziladi",
        desc: "Odamlar, narsalar va mavhum tushunchalar gapning qayerida kelishidan qat'i nazar katta harf bilan boshlanadi.",
        example: "der Tisch, die Zeit, das Haus"
      },
      {
        num: "02",
        title: "Har bir otning jinsi (artikli) bor",
        desc: "So'zlarni doim artikli bilan yodlang: erkak jinsi (der), ayol jinsi (die), o'rta jins (das).",
        example: "der Mann · die Frau · das Kind"
      },
      {
        num: "03",
        title: "Darak gapda tuslangan fe'l doim 2-o'rinda",
        desc: "Gap nima bilan boshlanishidan qat'i nazar, tuslangan fe'l ikkinchi pozitsiyada qoladi.",
        example: "Heute lerne ich Deutsch."
      }
    ];

    const ROADMAP = [
      {
        month: "1-oy", level: "A1.1", title: "Poydevor va asosiy qoidalar", status: "done",
        topics: [
          "Alifbo, fonetika (ä, ö, ü, ß, ei, ie, sp/st), kishilik olmoshlari",
          "sein va haben fe'llari, to'g'ri va kuchli fe'llarning tuslanishi",
          "Artikllar (der, die, das), Nominativ va Akkusativ, inkor (nicht, kein)",
          "Modal fe'llar, egalik olmoshlari, salomlashish va oila lug'ati"
        ]
      },
      {
        month: "2-oy", level: "A1.2", title: "Kundalik muloqot va o'tgan zamon", status: "active",
        topics: [
          "Dativ kelishigi va predloglar (mit, nach, aus, zu, bei)",
          "Ajraladigan fe'llar (aufstehen, einkaufen, anrufen)",
          "O'tgan zamon — Perfekt (haben va sein bilan, Partizip II)",
          "Do'kon, soat, kun tartibi, uy-joy va shahar lug'ati"
        ]
      },
      {
        month: "3-oy", level: "A2.1", title: "Murakkabroq jumlalar va fikr bildirish", status: "upcoming",
        topics: [
          "Perfekt mustahkamlash va Präteritum (war / hatte)",
          "Egalik olmoshlari barcha kelishiklarda",
          "Ergash gap bog'lovchilari (weil, dass, wenn — fe'l oxiriga suriladi)",
          "Sifatlarning turlanishi (Adjektivdeklination), sayohat, transport va sog'liq"
        ]
      },
      {
        month: "4-oy", level: "A2.2", title: "Erkinroq suhbat va yozishma", status: "upcoming",
        topics: [
          "Ikki tomonlama predloglar (Wechselpräpositionen: Akkusativ vs Dativ)",
          "Sifatlarning qiyosiy darajalari (Komparativ / Superlativ: gut / besser / am besten)",
          "Majhul nisbat asoslari (Passiv) va o'zlik fe'llari (Reflexivverben)",
          "Rasmiy va norasmiy xatlar yozish, e'lonlarni tushunish"
        ]
      },
      {
        month: "5-oy", level: "B1", title: "B1 darajasi va imtihonga tayyorgarlik", status: "upcoming",
        topics: [
          "Konjunktiv II (hätte, wäre, würde gern — istak va muloyim iltimoslar)",
          "Murakkab bog'lovchilar (obwohl, trotzdem, um... zu, ohne... zu)",
          "Fe'l boshqaruvi (fe'l + predlog)",
          "B1 4 moduli bo'yicha mashq: Lesen, Hören, Schreiben, Sprechen"
        ]
      }
    ];

    const STUDY_BLOCKS = [
      { id: "b1", title: "1-blok: Yangi grammatika va qoida", minutes: 30, desc: "Bugungi dars qoidasini o'qish, formulani yozib olish va 5–7 ta misol gap tuzish.", icon: "book-open" },
      { id: "b2", title: "2-blok: Lug'at yodlash", minutes: 30, desc: "14–15 ta yangi so'zni artikli va ko'pligi bilan yodlash, fleshkartalarda takrorlash.", icon: "languages" },
      { id: "b3", title: "3-blok: Eshitish va O'qish", minutes: 30, desc: "Audio eshitish (DW Nicos Weg) va darsdagi nemischa dialoglarni tinglab qaytarish.", icon: "headphones" },
      { id: "b4", title: "4-blok: Gapirish va Yozish", minutes: 30, desc: "Kunlik mashqlarni yechish va o'rganilgan so'zlar bilan 3–5 ta gap yozib ovoz chiqarib aytish.", icon: "mic" }
    ];

    const GRAMMAR_CASES_DATA = {
      Nominativ: {
        question: "Wer? Was? (Kim? Nima?)",
        role: "Gapning egasi (harakatni bajaruvchi)",
        color: "blue",
        articles: [
          { g: "Erkak", def: "der", indef: "ein", neg: "kein", poss: "mein", ex: "Der Mann lernt Deutsch." },
          { g: "Ayol", def: "die", indef: "eine", neg: "keine", poss: "meine", ex: "Die Frau trinkt Tee." },
          { g: "O'rta", def: "das", indef: "ein", neg: "kein", poss: "mein", ex: "Das Kind spielt im Park." },
          { g: "Ko'plik", def: "die", indef: "—", neg: "keine", poss: "meine", ex: "Die Bücher sind neu." }
        ],
        pronouns: "ich, du, er, sie, es, wir, ihr, sie/Sie",
        triggers: "sein, werden, bleiben, heißen fe'llari bilan doim Nominativ keladi."
      },
      Akkusativ: {
        question: "Wen? Was? (Kimni? Nimani?)",
        role: "To'g'ridan-to'g'ri to'ldiruvchi (o'zbekcha -ni)",
        color: "amber",
        articles: [
          { g: "Erkak ★", def: "den", indef: "einen", neg: "keinen", poss: "meinen", ex: "Ich trinke den Kaffee." },
          { g: "Ayol", def: "die", indef: "eine", neg: "keine", poss: "meine", ex: "Ich kaufe eine Tasche." },
          { g: "O'rta", def: "das", indef: "ein", neg: "kein", poss: "mein", ex: "Ich lese das Buch." },
          { g: "Ko'plik", def: "die", indef: "—", neg: "keine", poss: "meine", ex: "Ich habe keine Probleme." }
        ],
        pronouns: "mich, dich, ihn, sie, es, uns, euch, sie/Sie",
        triggers: "Fe'llar: haben, brauchen, kaufen, suchen, essen, trinken, sehen. Predloglar: durch, für, gegen, ohne, um (FUDGO)."
      },
      Dativ: {
        question: "Wem? Wo? (Kimga? Qayerda?)",
        role: "Vositali to'ldiruvchi (o'zbekcha -ga, -da)",
        color: "emerald",
        articles: [
          { g: "Erkak ★", def: "dem", indef: "einem", neg: "keinem", poss: "meinem", ex: "Ich helfe dem Mann." },
          { g: "Ayol ★", def: "der", indef: "einer", neg: "keiner", poss: "meiner", ex: "Ich danke der Frau." },
          { g: "O'rta ★", def: "dem", indef: "einem", neg: "keinem", poss: "meinem", ex: "Wir fahren mit dem Auto." },
          { g: "Ko'plik ★", def: "den + n", indef: "— + n", neg: "keinen + n", poss: "meinen + n", ex: "Ich helfe den Kindern." }
        ],
        pronouns: "mir, dir, ihm, ihr, ihm, uns, euch, ihnen/Ihnen",
        triggers: "Fe'llar: helfen, danken, gefallen, gehören, antworten. Predloglar: aus, bei, mit, nach, seit, von, zu."
      },
      Genitiv: {
        question: "Wessen? (Kimning? Nimaning?)",
        role: "Qaratqich kelishigi (B1 daraja — o'zbekcha -ning)",
        color: "rose",
        articles: [
          { g: "Erkak ★", def: "des + (e)s", indef: "eines + (e)s", neg: "keines + (e)s", poss: "meines + (e)s", ex: "Das Auto des Vaters." },
          { g: "Ayol ★", def: "der", indef: "einer", neg: "keiner", poss: "meiner", ex: "Die Tasche der Mutter." },
          { g: "O'rta ★", def: "des + (e)s", indef: "eines + (e)s", neg: "keines + (e)s", poss: "meines + (e)s", ex: "Das Ende des Jahres." },
          { g: "Ko'plik ★", def: "der", indef: "—", neg: "keiner", poss: "meiner", ex: "Die Zimmer der Kinder." }
        ],
        pronouns: "meiner, deiner, seiner, ihrer...",
        triggers: "Predloglar: wegen (tufayli), trotz (qaramasdan), während (davomida), statt (o'rniga)."
      }
    };

    const IRREGULAR_VERBS_TABLE = [
      { inf: "sein", pres3: "ist", prat: "war", perf: "ist gewesen", uz: "bo'lmoq", note: "Istisno: sein bilan" },
      { inf: "haben", pres3: "hat", prat: "hatte", perf: "hat gehabt", uz: "ega bo'lmoq", note: "du hast, er hat" },
      { inf: "gehen", pres3: "geht", prat: "ging", perf: "ist gegangen", uz: "bormoq (piyoda)", note: "Harakat: sein bilan" },
      { inf: "fahren", pres3: "fährt", prat: "fuhr", perf: "ist gefahren", uz: "bormoq (transport)", note: "a → ä, sein bilan" },
      { inf: "kommen", pres3: "kommt", prat: "kam", perf: "ist gekommen", uz: "kelmoq", note: "Harakat: sein bilan" },
      { inf: "bleiben", pres3: "bleibt", prat: "blieb", perf: "ist geblieben", uz: "qolmoq", note: "Istisno: sein bilan!" },
      { inf: "essen", pres3: "isst", prat: "aß", perf: "hat gegessen", uz: "yemoq", note: "e → i, gegessen" },
      { inf: "trinken", pres3: "trinkt", prat: "trank", perf: "hat getrunken", uz: "ichmoq", note: "i → a → u" },
      { inf: "lesen", pres3: "liest", prat: "las", perf: "hat gelesen", uz: "o'qimoq", note: "e → ie" },
      { inf: "sehen", pres3: "sieht", prat: "sah", perf: "hat gesehen", uz: "ko'rmoq", note: "e → ie" },
      { inf: "sprechen", pres3: "spricht", prat: "sprach", perf: "hat gesprochen", uz: "gapirmoq", note: "e → i" },
      { inf: "nehmen", pres3: "nimmt", prat: "nahm", perf: "hat genommen", uz: "olmoq", note: "du nimmst, er nimmt" },
      { inf: "schreiben", pres3: "schreibt", prat: "schrieb", perf: "hat geschrieben", uz: "yozmoq", note: "ei → ie" },
      { inf: "fliegen", pres3: "fliegt", prat: "flog", perf: "ist geflogen", uz: "uchmoq", note: "Harakat: sein bilan" },
      { inf: "aufstehen", pres3: "steht auf", prat: "stand auf", perf: "ist aufgestanden", uz: "turmoq", note: "Ajraladigan + sein" },
      { inf: "helfen", pres3: "hilft", prat: "half", perf: "hat geholfen", uz: "yordam bermoq", note: "e → i, + Dativ" },
      { inf: "geben", pres3: "gibt", prat: "gab", perf: "hat gegeben", uz: "bermoq", note: "e → i" },
      { inf: "schlafen", pres3: "schläft", prat: "schlief", perf: "hat geschlafen", uz: "uxlamoq", note: "a → ä" }
    ];

    const ARTICLE_RULES_DATA = [
      {
        art: "der", color: "blue", title: "Erkak jinsi (Maskulin)",
        rules: ["Kunlar, oylar, fasllar: der Montag, der Mai, der Sommer", "Ob-havo: der Regen, der Schnee, der Wind", "Qo'shimchalar: -er, -ig, -ling, -ismus, -or (der Lehrer, der Motor)", "Spirtli ichimliklar (pivo istisno!): der Wein, der Kaffee"],
        exceptions: ["das Bier (pivo — o'rta jins!)", "die Nacht (tun — ayol jinsi!)", "der Käse (-e bilan tugasa ham der!)"]
      },
      {
        art: "die", color: "rose", title: "Ayol jinsi (Feminin)",
        rules: ["Qo'shimchalar (100%): -ung, -heit, -keit, -schaft, -tät, -ion (die Zeitung, die Freiheit)", "Kasb ayol shakli: -in (die Studentin, die Ärztin)", "Ko'pchilik -e bilan tugaydigan otlar: die Lampe, die Tasche, die Frage", "Barcha ko'plik shakllari doim die: die Bücher, die Kinder"],
        exceptions: ["der Name, der Junge, der Kollege (-e bilan tugasa ham der!)", "das Ende, das Auge, das Interesse (-e bilan tugasa ham das!)"]
      },
      {
        art: "das", color: "emerald", title: "O'rta jins (Neutrum)",
        rules: ["Kichraytirish qo'shimchalari (100%): -chen, -lein (das Mädchen, das Brötchen)", "Fe'ldan yasalgan otlar: das Essen, das Lernen, das Leben", "Qo'shimchalar: -ment, -um, -tum, -ma (das Dokument, das Zentrum)", "Ranglar va tillar: das Blau, das Deutsch"],
        exceptions: ["das Mädchen (qiz bola bo'lsa ham -chen sababli das!)", "der Reichtum, der Irrtum (-tum bo'lsa ham der!)"]
      }
    ];

    const SENTENCE_BUILDER_DATA = [
      { id: "sb1", level: "A1.1", rule: "2-o'rinda fe'l", uz: "Bugun men nemis tili o'rganyapman.", tokens: ["Heute", "lerne", "ich", "Deutsch."] },
      { id: "sb2", level: "A1.1", rule: "Tanishuv", uz: "Men O'zbekistondanman va Toshkentda yashayman.", tokens: ["Ich", "komme", "aus", "Usbekistan", "und", "wohne", "in", "Taschkent."] },
      { id: "sb3", level: "A1.1", rule: "sein / haben", uz: "Afsuski, bugun menda vaqt yo'q.", tokens: ["Leider", "habe", "ich", "heute", "keine", "Zeit."] },
      { id: "sb4", level: "A1.1", rule: "Akkusativ", uz: "Men qahva ichyapman va non yeyapman.", tokens: ["Ich", "trinke", "einen", "Kaffee", "und", "esse", "Brot."] },
      { id: "sb5", level: "A1.1", rule: "Akkusativ", uz: "U o‘z kalitini qidiryapti.", tokens: ["Er", "sucht", "seinen", "Schlüssel."] },
      { id: "sb6", level: "A1.1", rule: "Modal fe'l ramkasi", uz: "Men nemis tilida yaxshi gapira olaman.", tokens: ["Ich", "kann", "gut", "Deutsch", "sprechen."] },
      { id: "sb7", level: "A1.1", rule: "Modal fe'l ramkasi", uz: "Biz bugun uy vazifasini bajarishimiz kerak.", tokens: ["Wir", "müssen", "heute", "die", "Hausaufgabe", "machen."] },
      { id: "sb8", level: "A1.1", rule: "Ajraladigan fe'l", uz: "Men har kuni soat yettida o'rnimdan turaman.", tokens: ["Ich", "stehe", "jeden", "Tag", "um", "sieben", "Uhr", "auf."] },
      { id: "sb9", level: "A1.1", rule: "Ajraladigan fe'l", uz: "Biz bugun supermarketda bozorlik qilyapmiz.", tokens: ["Wir", "kaufen", "heute", "im", "Supermarkt", "ein."] },
      { id: "sb10", level: "A1.1", rule: "Dativ", uz: "Men oshxonada onamga yordam beryapman.", tokens: ["Ich", "helfe", "meiner", "Mutter", "in", "der", "Küche."] },
      { id: "sb11", level: "A1.1", rule: "Dativ + mit", uz: "U har kuni ishga avtobusda boradi.", tokens: ["Er", "fährt", "jeden", "Tag", "mit", "dem", "Bus", "zur", "Arbeit."] },
      { id: "sb12", level: "A1.1", rule: "Inkor (nicht)", uz: "Bu yangi kitob qimmat emas.", tokens: ["Das", "neue", "Buch", "ist", "nicht", "teuer."] },
      { id: "sb13", level: "A1.1", rule: "Modal fe'l (möchten)", uz: "Men bitta sharbat buyurtma qilmoqchi edim.", tokens: ["Ich", "möchte", "einen", "Saft", "bestellen."] },
      { id: "sb14", level: "A1.2", rule: "Perfekt (haben)", uz: "Men kecha nemis tili o'rgandim.", tokens: ["Ich", "habe", "gestern", "Deutsch", "gelernt."] },
      { id: "sb15", level: "A1.2", rule: "Perfekt (ajraladigan)", uz: "Onam kecha supermarketda bozorlik qildi.", tokens: ["Meine", "Mutter", "hat", "gestern", "im", "Supermarkt", "eingekauft."] },
      { id: "sb16", level: "A1.2", rule: "Perfekt (sein)", uz: "Men kecha Samarqandga bordim.", tokens: ["Ich", "bin", "gestern", "nach", "Samarkand", "gefahren."] },
      { id: "sb17", level: "A1.2", rule: "Perfekt (istisno bleiben)", uz: "Biz dam olish kunlari uyda qoldik.", tokens: ["Wir", "sind", "am", "Wochenende", "zu", "Hause", "geblieben."] },
      { id: "sb18", level: "A2.1", rule: "Ergash gap (weil)", uz: "Men nemis tili o'rganyapman, chunki Germaniyada ishlamoqchiman.", tokens: ["Ich", "lerne", "Deutsch,", "weil", "ich", "in", "Deutschland", "arbeiten", "möchte."] },
      { id: "sb19", level: "A2.1", rule: "wenn · fe’l oxirida", uz: "Vaqtim bo‘lsa, kutubxonaga boraman.", tokens: ["Wenn","ich","Zeit","habe,","gehe","ich","in","die","Bibliothek."] },
      { id: "sb20", level: "A2.1", rule: "dass · fe’l oxirida", uz: "Menimcha, kurs ertaga boshlanadi.", tokens: ["Ich","glaube,","dass","der","Kurs","morgen","beginnt."] },
      { id: "sb21", level: "A2.2", rule: "obwohl · fe’l oxirida", uz: "Yomg‘ir yog‘sa ham, biz sayrga chiqamiz.", tokens: ["Obwohl","es","regnet,","gehen","wir","spazieren."] },
      { id: "sb22", level: "A2.2", rule: "deshalb · fe’l 2-o‘rinda", uz: "Men kasalman, shuning uchun uyda qolaman.", tokens: ["Ich","bin","krank,","deshalb","bleibe","ich","zu","Hause."] },
      { id: "sb23", level: "B1", rule: "um … zu · maqsad", uz: "Imtihondan o‘tish uchun har kuni mashq qilaman.", tokens: ["Ich","übe","jeden","Tag,","um","die","Prüfung","zu","bestehen."] },
      { id: "sb24", level: "B1", rule: "Relativsatz · fe’l oxirida", uz: "Kecha sotib olgan kitobim juda qiziq.", tokens: ["Das","Buch,","das","ich","gestern","gekauft","habe,","ist","sehr","interessant."] },
      { id: "sb25", level: "B1", rule: "damit · maqsad", uz: "Hamma tushunishi uchun u sekin gapiradi.", tokens: ["Sie","spricht","langsam,","damit","alle","sie","verstehen."] },
      { id: "sb26", level: "B1", rule: "Konjunktiv II", uz: "Ko‘proq vaqtim bo‘lganida, ko‘proq sayohat qilardim.", tokens: ["Wenn","ich","mehr","Zeit","hätte,","würde","ich","mehr","reisen."] }
    ];

    const SENTENCE_PATTERNS = [
      {
        id: "main", label: "Oddiy darak gap",
        slots: [
          { pos: "1-o'rin", val: "Heute", role: "Vaqt / Ega" },
          { pos: "2-o'rin ★", val: "lerne", role: "Tuslangan fe'l", hi: true },
          { pos: "O'rtasi", val: "ich fleißig", role: "Ega + Ravish" },
          { pos: "Oxiri", val: "Deutsch.", role: "To'ldiruvchi" }
        ],
        note: "Darak gapda tuslangan fe'l qat'iy ravishda 2-o'rinda turadi."
      },
      {
        id: "modal", label: "Modal fe'l / Perfekt",
        slots: [
          { pos: "1-o'rin", val: "Ich", role: "Ega" },
          { pos: "2-o'rin ★", val: "habe / kann", role: "Yordamchi / Modal", hi: true },
          { pos: "O'rtasi", val: "gestern Deutsch", role: "Vaqt + Ob'ekt" },
          { pos: "Oxiri ★", val: "gelernt / sprechen.", role: "Partizip II / Infinitiv", hi: true }
        ],
        note: "Fe'l ramkasi (Satzklammer): 2-o'rinda tuslangan fe'l, oxirida asosiy fe'l."
      },
      {
        id: "sub", label: "Ergash gap (weil, dass, wenn)",
        slots: [
          { pos: "Bog'lovchi", val: "..., weil", role: "Ergash bog'lovchi", hi: true },
          { pos: "Ega", val: "ich", role: "Ega" },
          { pos: "O'rtasi", val: "in Deutschland arbeiten", role: "Qolgan bo'laklar" },
          { pos: "ENG OXIRI ★", val: "möchte.", role: "Tuslangan fe'l oxirga!", hi: true }
        ],
        note: "weil, dass, wenn, obwohl bog'lovchilaridan keyin tuslangan fe'l gapning eng oxiriga suriladi!"
      },
      {
        id: "aduso", label: "0-o'rin bog'lovchilar (ADUSO)",
        slots: [
          { pos: "0-o'rin", val: "aber / denn / und", role: "O'rin egallamaydi" },
          { pos: "1-o'rin", val: "ich", role: "Ega" },
          { pos: "2-o'rin ★", val: "habe", role: "Tuslangan fe'l", hi: true },
          { pos: "Davomi", val: "heute Zeit.", role: "Qolgan qism" }
        ],
        note: "ADUSO (Aber, Denn, Und, Sondern, Oder) so'z tartibini O'ZGARTIRMAYDI!"
      }
    ];

    const ISHLAMOQ_NUANCES = [
      { context: "Inson (mehnat)", verb: "arbeiten", example: "Er arbeitet bei Siemens.", uz: "U Siemensda ishlaydi." },
      { context: "Texnika (funksiya)", verb: "funktionieren", example: "Die Heizung funktioniert nicht.", uz: "Isitgich ishlamayapti." },
      { context: "Dastur / Jarayon", verb: "laufen", example: "Das Programm läuft stabil.", uz: "Dastur barqaror ishlayapti." },
      { context: "Dori / Usul (ta'sir)", verb: "wirken", example: "Die Tablette wirkt sofort.", uz: "Tabletka darhol ta'sir qiladi." }
    ];

    const GOETHE_LINKS = {
      A1: {
        label: "Goethe-Zertifikat A1: Start Deutsch 1",
        infoUrl: "https://www.goethe.de/ins/uz/de/spr/prf/gzsd1.cfm",
        onlineUrl: "https://bfu.goethe.de/a1_sd1/",
        pdfUrl: "https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_modellsatz.pdf"
      },
      A2: {
        label: "Goethe-Zertifikat A2",
        infoUrl: "https://www.goethe.de/ins/uz/de/spr/prf/gzsd2.cfm",
        onlineUrl: "https://bfu.goethe.de/a2_mod_2MX5/",
        pdfUrl: "https://www.goethe.de/pro/relaunch/prf/materialien/A2/A2_Uebungssatz_Erwachsene.pdf"
      },
      B1: {
        label: "Goethe-Zertifikat B1",
        infoUrl: "https://www.goethe.de/ins/uz/de/spr/prf/gzb1/ueb.html",
        onlineUrl: "https://bfu.goethe.de/b1_mod/",
        pdfUrl: "https://www.goethe.de/ins/uz/de/spr/prf/gzb1/ueb.html"
      }
    };

    const BUILTIN_READING_TEXTS = [
      {
        id: "rt_1",
        lessonDay: 1,
        level: "A1.1",
        title: "Mein Tag in Taschkent",
        de: "Hallo! Ich heiße Anvar und ich komme aus Usbekistan. Ich wohne mit meiner Familie in Taschkent. Unsere Wohnung ist nicht sehr groß, aber sie ist hell und gemütlich. Jeden Morgen stehe ich um sieben Uhr auf. Zuerst trinke ich einen Kaffee oder einen Tee und esse ein Brot mit Käse. Danach lerne ich zwei Stunden Deutsch, denn ich möchte in fünf Monaten das B1-Zertifikat machen. Am Nachmittag gehe ich in die Universität oder treffe meine Freunde in einem Café. Wir sprechen viel, trinken Saft und lachen zusammen. Am Abend kaufe ich im Supermarkt ein, koche das Abendessen und lese noch ein Buch. Um elf Uhr bin ich müde und gehe schlafen.",
        uz: "Salom! Mening ismim Anvar va men O'zbekistondanman. Men oilam bilan Toshkentda yashayman. Bizning kvartiramiz juda katta emas, lekin u yorug' va shinam. Har kuni ertalab soat yettida o'rnimdan turaman. Avval qahva yoki choy ichaman va pishloqli non yeyman. Keyin ikki soat nemis tili o'rganaman, chunki besh oy ichida B1 sertifikatini olmoqchiman. Tushdan keyin universitetga boraman yoki do'stlarim bilan kafeda uchrashaman. Biz ko'p gaplashamiz, sharbat ichamiz va birga kulamiz. Kechqurun supermarketda bozorlik qilaman, kechki ovqat pishiraman va yana bir kitob o'qiyman. Soat o'n birda charchayman va uxlashga yotaman.",
        vocab: ["gemütlich — shinam", "zuerst — avval", "danach — shundan keyin", "das Abendessen — kechki ovqat"],
        questions: [
          { q: "Anvar wohnt allein in Taschkent.", ans: false },
          { q: "Er lernt jeden Tag zwei Stunden Deutsch.", ans: true },
          { q: "Am Abend kauft er im Supermarkt ein.", ans: true }
        ]
      },
      {
        id: "rt_2",
        lessonDay: 2,
        level: "A1.2",
        title: "Mein letztes Wochenende in Samarkand",
        de: "Am letzten Wochenende bin ich mit meinem Bruder nach Samarkand gefahren. Wir sind am Samstagmorgen sehr früh aufgestanden und haben um sieben Uhr den schnellen Zug genommen. Die Fahrt hat nur zwei Stunden gedauert und war sehr angenehm. Im Zug haben wir Kaffee getrunken, Musik gehört und über unsere Pläne gesprochen. In Samarkand haben wir zuerst den berühmten Registan-Platz besucht und viele schöne Fotos gemacht. Mittags sind wir in ein traditionelles Restaurant gegangen und haben leckeren Plov gegessen. Am Nachmittag haben wir kleine Geschenke für unsere Eltern gekauft. Am Sonntagabend sind wir müde, aber sehr glücklich nach Hause zurückgekommen. Es war ein wunderbarer Ausflug!",
        uz: "O'tgan dam olish kunlari akam bilan Samarqandga bordik. Shanba kuni ertalab juda erta turdik va soat yettida tezyurar poyezdga chiqdik. Yo'l atigi ikki soat davom etdi va juda yoqimli bo'ldi. Poyezdda qahva ichdik, musiqa tingladik va rejalarimiz haqida gaplashdik. Samarqandda avval mashhur Registon maydoniga bordik va ko'plab chiroyli rasmlar oldik. Tushlikda an'anaviy restoranga kirdik va mazali osh yedik. Tushdan keyin ota-onamiz uchun kichik sovg'alar sotib oldik. Yakshanba oqshomida charchagan, ammo juda baxtiyor holda uyga qaytdik. Bu ajoyib sayohat bo'ldi!",
        vocab: ["die Fahrt — safar", "angenehm — yoqimli", "berühmt — mashhur", "der Ausflug — sayr/ekskursiya"],
        questions: [
          { q: "Sie sind mit dem Bus nach Samarkand gefahren.", ans: false },
          { q: "Die Zugfahrt hat zwei Stunden gedauert.", ans: true },
          { q: "Sie haben Geschenke für ihre Eltern gekauft.", ans: true }
        ]
      },
      {
        id: "rt_3",
        lessonDay: 3,
        level: "A2.1",
        title: "Warum ich eine neue Sprache lerne",
        de: "Vor einigen Monaten habe ich beschlossen, intensiv Deutsch zu lernen, weil ich später in Deutschland studieren und arbeiten möchte. Am Anfang war die Grammatik ziemlich schwer für mich, besonders die Artikel und die verschiedenen Fälle wie Akkusativ und Dativ. Aber ich habe schnell gemerkt, dass ein fester Tagesplan enorm hilft. Wenn man jeden Morgen zur gleichen Zeit lernt, wird das Lernen zu einer guten Gewohnheit. Neben Grammatikübungen höre ich deutsche Podcasts und lese jeden Tag mindestens einen kurzen Text. Ich spreche auch laut mit mir selbst, damit meine Aussprache immer besser wird. Obwohl es manchmal anstrengend ist, macht es mir großen Spaß, wenn ich schon einfache Gespräche ohne Wörterbuch verstehen kann.",
        uz: "Bir necha oy oldin intensiv ravishda nemis tilini o'rganishga qaror qildim, chunki keyinchalik Germaniyada o'qish va ishlashni xohlayman. Boshida grammatika, ayniqsa artikllar hamda Akkusativ va Dativ kabi kelishiklar men uchun ancha qiyin edi. Lekin qat'iy kun tartibi juda katta yordam berishini tez tushundim. Agar har kuni ertalab bir xil vaqtda o'qilsa, o'rganish yaxshi odatga aylanadi. Grammatika mashqlaridan tashqari, nemischa podkastlar tinglayman va har kuni kamida bitta qisqa matn o'qiyman. Talaffuzim yanada yaxshilanishi uchun o'zim bilan baland ovozda gaplashaman. Ba'zan charchatuvchi bo'lsa-da, oddiy suhbatlarni lug'atsiz tushuna olganimda menga katta zavq beradi.",
        vocab: ["beschließen — qaror qilmoq", "die Gewohnheit — odat", "die Aussprache — talaffuz", "anstrengend — charchatuvchi"],
        questions: [
          { q: "Am Anfang fand der Autor die Artikel sehr leicht.", ans: false },
          { q: "Er hört deutsche Podcasts und liest täglich einen Text.", ans: true },
          { q: "Er möchte später in Deutschland studieren und arbeiten.", ans: true }
        ]
      },
      {
        id: "rt_4",
        lessonDay: 4,
        level: "B1",
        title: "Digitales Lernen im Alltag — Chancen und Grenzen",
        de: "Immer mehr Menschen nutzen heute digitale Plattformen, Apps und Online-Kurse, um Fremdsprachen flexibel von zu Hause aus zu lernen. Ein großer Vorteil besteht darin, dass man nicht an feste Unterrichtszeiten oder einen bestimmten Ort gebunden ist. Besonders für Berufstätige oder Studierende mit vollem Terminkalender ist diese Freiheit äußerst praktisch. Außerdem ermöglichen interaktive Karteikarten, automatische Aussprachehilfen und tägliche Erinnerungen ein regelmäßiges Training. Trotzdem darf man nicht vergessen, dass das digitale Lernen auch Grenzen hat. Ohne echte Gespräche mit anderen Menschen fällt es oft schwer, im Alltag spontan und sicher zu reagieren. Deshalb empfehlen viele Sprachlehrer eine Kombination aus digitalen Übungen und persönlichem Austausch in Lerngruppen oder Tandem-Gesprächen.",
        uz: "Bugungi kunda tobora ko'proq odamlar uydan turib xorijiy tillarni moslashuvchan tarzda o'rganish uchun raqamli platformalar, ilovalar va onlayn kurslardan foydalanmoqda. Katta afzallik shundaki, inson qat'iy dars vaqtiga yoki ma'lum bir joyga bog'lanib qolmaydi. Ayniqsa jadvali tig'iz ishlaydiganlar yoki talabalar uchun bu erkinlik nihoyatda qulay. Bundan tashqari, interaktiv fleshkartalar, avtomatik talaffuz yordamchilari va kunlik eslatmalar muntazam mashq qilish imkonini beradi. Shunga qaramay, raqamli o'rganishning chegaralari ham borligini unutmaslik kerak. Boshqa odamlar bilan jonli suhbatlarsiz kundalik hayotda tez va ishonchli javob qaytarish ko'pincha qiyin kechadi. Shu bois ko'plab til o'qituvchilari raqamli mashqlarni o'quv guruhlari yoki tandem suhbatlar bilan birlashtirishni tavsiya qiladi.",
        vocab: ["flexibel — moslashuvchan", "der Vorteil — afzallik", "der Terminkalender — kun tartibi", "der Austausch — fikr/tajriba almashish"],
        questions: [
          { q: "Beim digitalen Lernen muss man immer zu einer festen Zeit im Klassenzimmer sein.", ans: false },
          { q: "Interaktive Karteikarten helfen beim regelmäßigen Training.", ans: true },
          { q: "Sprachlehrer empfehlen eine Kombination aus digitalen Übungen und echten Gesprächen.", ans: true }
        ]
      }
    ];

    const BUILTIN_GOETHE_TASKS = {
      A1: {
        writing: [
          {
            id: "gw_a1_1",
            part: "Schreiben · Teil 2 (Goethe A1: Start Deutsch 1)",
            title: "Kichik xabar / E-Mail yozish (taxminan 30 so'z)",
            prompt: "Siz do'stingiz Tobiyasning tug'ilgan kuniga taklif qilindingiz. Unga qisqa e-mail yozing va quyidagi 3 ta bandga javob bering:",
            points: [
              "Taklif uchun rahmat ayting (Für die Einladung danken)",
              "Kela olishingizni va nimani olib kelishingizni yozing (Kommen & etwas mitbringen)",
              "Boshlanish vaqtini so'rang (Nach der Uhrzeit fragen)"
            ],
            targetWords: 30,
            sample: "Lieber Tobias,\nvielen Dank für deine Einladung! Ich komme sehr gern zu deiner Party und bringe einen Kuchen mit. Wann beginnt das Fest am Samstag?\nViele Grüße,\nAnvar"
          }
        ],
        listening: [
          {
            id: "gl_a1_1",
            part: "Hören · Teil 1 & 2 (Goethe A1 format)",
            title: "Vokzaldagi e'lon va do'kondagi suhbat",
            transcript: "Achtung, eine Durchsage für alle Fahrgäste: Der Zug nach München fährt heute nicht von Gleis vier, sondern von Gleis sieben ab. Die Abfahrt ist um vierzehn Uhr dreißig. Bitte steigen Sie schnell ein. Ich wiederhole: Der Zug nach München fährt heute von Gleis sieben.",
            questions: [
              { q: "Wohin fährt der Zug?", options: ["Nach Berlin", "Nach München", "Nach Hamburg"], ans: 1 },
              { q: "Von welchem Gleis fährt der Zug heute ab?", options: ["Gleis 4", "Gleis 7", "Gleis 14"], ans: 1 }
            ]
          }
        ],
        speaking: [
          {
            id: "gs_a1_1",
            part: "Sprechen · Teil 1 & 2 (Goethe A1 format)",
            title: "O'zingizni tanishtirish (Sich vorstellen) va savol berish",
            durationSec: 120,
            prompt: "Imtihonchiga o'zingiz haqingizda 7 ta nuqta bo'yicha gapirib bering: Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby. Keyin 'Wochenende' mavzusida sherigingizga savol bering.",
            redemittel: [
              { de: "Guten Tag! Ich heiße ... und bin ... Jahre alt.", uz: "Xayrli kun! Mening ismim ... va men ... yoshdaman." },
              { de: "Ich komme aus Usbekistan und wohne in ...", uz: "Men O'zbekistondanman va ...da yashayman." },
              { de: "Ich spreche Usbekisch und lerne Deutsch.", uz: "Men o'zbekcha gapiraman va nemis tilini o'rganyapman." },
              { de: "Was machst du gern am Wochenende?", uz: "Dam olish kunlari nima qilishni yoqtirasan?" }
            ]
          }
        ]
      },
      A2: {
        writing: [
          {
            id: "gw_a2_1",
            part: "Schreiben · Teil 1 (Goethe-Zertifikat A2)",
            title: "SMS / Xabar yozish (taxminan 20–30 so'z) + E-Mail (30–40 so'z)",
            prompt: "Siz do'stingiz bilan soat 18:00 da kinoda uchrashishingiz kerak edi, lekin avtobus kechikdi. Do'stingizga SMS yozing:",
            points: [
              "Uzr so'rang (Sich entschuldigen)",
              "Kechikish sababini tushuntiring (Grund nennen)",
              "Yangi uchrashuv vaqtini taklif qiling (Neue Uhrzeit vorschlagen)"
            ],
            targetWords: 30,
            sample: "Hallo Max, es tut mir sehr leid, aber ich komme heute etwas später. Mein Bus hat Verspätung und steht im Stau. Können wir uns um 18:30 Uhr vor dem Kino treffen? Bis gleich!"
          }
        ],
        listening: [
          {
            id: "gl_a2_1",
            part: "Hören · Teil 1 (Goethe-Zertifikat A2)",
            title: "Telefon javob bergichi (Anrufbeantworter)",
            transcript: "Hallo, hier ist die Praxis von Doktor Weber. Frau Karimova, Sie haben morgen um neun Uhr einen Termin bei uns. Leider ist Doktor Weber morgen vormittag nicht da. Wir können Ihren Termin auf Donnerstag um fünfzehn Uhr verschieben. Bitte rufen Sie uns heute noch bis achtzehn Uhr zurück. Vielen Dank!",
            questions: [
              { q: "Wann war der alte Termin?", options: ["Morgen um 9:00 Uhr", "Donnerstag um 15:00 Uhr", "Heute um 18:00 Uhr"], ans: 0 },
              { q: "Wann ist der neue Terminvorschlag?", options: ["Morgen um 15:00 Uhr", "Donnerstag um 15:00 Uhr", "Freitag um 9:00 Uhr"], ans: 1 }
            ]
          }
        ],
        speaking: [
          {
            id: "gs_a2_1",
            part: "Sprechen · Teil 3 (Goethe-Zertifikat A2)",
            title: "Birgalikda reja tuzish (Gemeinsam etwas planen)",
            durationSec: 180,
            prompt: "Siz va do'stingiz shanba kuni birga sport bilan shug'ullanmoqchisiz. Qachon, qayerda uchrashish va qaysi sportni tanlashni kelishib oling.",
            redemittel: [
              { de: "Hast du am Samstag Zeit? Wollen wir zusammen Sport machen?", uz: "Shanba kuni vaqting bormi? Birga sport bilan shug'ullanamizmi?" },
              { de: "Das ist eine gute Idee! Um wie viel Uhr treffen wir uns?", uz: "Bu yaxshi fikr! Soat nechada uchrashamiz?" },
              { de: "Am Vormittag kann ich leider nicht, aber um 15 Uhr passt es mir gut.", uz: "Ertalab afsuski bo'sh emasman, lekin soat 15:00 menga juda qulay." },
              { de: "Einverstanden! Dann bis Samstag im Park!", uz: "Kelishdik! Unda shanba kuni bog'da ko'rishguncha!" }
            ]
          }
        ]
      },
      B1: {
        writing: [
          {
            id: "gw_b1_1",
            part: "Schreiben · Teil 1 (Goethe-Zertifikat B1)",
            title: "Norasmiy E-Mail (taxminan 80 so'z)",
            prompt: "Siz yaqinda yangi shaharga ko'chib o'tdingiz. Do'stingizga xat yozing va quyidagi 3 bandni yoriting:",
            points: [
              "Yangi kvartira va shahar haqida tasvirlab bering (Wohnung & Stadt beschreiben)",
              "Nima uchun ko'chib o'tganingizni tushuntiring (Grund für den Umzug begründen)",
              "Do'stingizni mehmonga taklif qiling va vaqt taklif eting (Einladen & Termin vorschlagen)"
            ],
            targetWords: 80,
            sample: "Lieber Lukas,\nwie geht es dir? Ich möchte dir endlich von meiner neuen Wohnung erzählen! Letzte Woche bin ich nach München umgezogen, weil ich hier eine tolle Arbeit gefunden habe. Meine Wohnung ist zwar nicht sehr groß, aber sie liegt zentral und hat einen sonnigen Balkon. Die Stadt gefällt mir bisher sehr gut, besonders die vielen Parks.\nHast du nächsten Monat Zeit, mich zu besuchen? Am Wochenende könnte ich dir die ganze Stadt zeigen. Schreib mir bald!\nViele Grüße,\nAnvar"
          }
        ],
        listening: [
          {
            id: "gl_b1_1",
            part: "Hören · Teil 2 (Goethe-Zertifikat B1)",
            title: "Radio xabari: Velosiped yo'laklari",
            transcript: "Willkommen bei den Lokalnachrichten. Die Stadtverwaltung hat heute bekannt gegeben, dass im kommenden Frühling zwanzig Kilometer neue Fahrradwege gebaut werden. Ziel dieses Projekts ist es, den Autoverkehr im Zentrum zu reduzieren und die Luftqualität zu verbessern. Während der Bauarbeiten müssen Autofahrer auf der Hauptstraße leider mit kurzen Umleitungen rechnen. Der öffentliche Nahverkehr bleibt jedoch wie gewohnt pünktlich.",
            questions: [
              { q: "Was möchte die Stadtverwaltung im Frühling bauen?", options: ["Neue Parkplätze", "20 km neue Fahrradwege", "Eine neue U-Bahn-Linie"], ans: 1 },
              { q: "Was ist das Hauptziel des Projekts?", options: ["Weniger Autoverkehr und bessere Luft", "Mehr Touristen anlocken", "Schnellere Züge"], ans: 0 }
            ]
          }
        ],
        speaking: [
          {
            id: "gs_b1_1",
            part: "Sprechen · Teil 2 (Goethe-Zertifikat B1)",
            title: "Qisqa taqdimot (Präsentation — 3 daqiqa)",
            durationSec: 180,
            prompt: "Mavzu: «Brauchen wir heute noch gedruckte Bücher?» (Bugun bizga qog'oz kitoblar hali ham kerakmi?). 4 qism bo'yicha gapiring: 1) Shaxsiy tajriba, 2) O'zbekistondagi vaziyat, 3) Afzallik va kamchiliklar, 4) Xulosa.",
            redemittel: [
              { de: "Ich möchte heute über das Thema ... sprechen.", uz: "Men bugun ... mavzusi haqida gapirmoqchiman." },
              { de: "Meiner Erfahrung nach lesen viele junge Leute heute auf dem Handy.", uz: "Mening tajribamga ko'ra, ko'plab yoshlar bugun telefonda o'qiydi." },
              { de: "Ein großer Vorteil von E-Books ist, dass man sie überall mitnehmen kann.", uz: "Elektron kitoblarning katta afzalligi — ularni hamma joyga olib yurish mumkin." },
              { de: "Zusammenfassend lässt sich sagen, dass beide Formen wichtig sind.", uz: "Xulosa qilib aytganda, har ikkala shakl ham muhim." }
            ]
          }
        ]
      }
    };

    const DAILY_PACKS_BY_LESSON = {"1": {"readingText": {"id": "rt_day_1", "level": "A1.1", "title": "1-kun matni: Hallo! Ich heiße Anvar", "de": "Hallo! Guten Tag! Ich heiße Anvar und ich komme aus Usbekistan. Ich wohne mit meiner Familie in Taschkent. Taschkent ist eine große und sehr schöne Stadt. Jeden Morgen lerne ich fleißig Deutsch, denn die Sprache ist sehr wichtig für meine Zukunft. Meine Schwester heißt Madina und sie lernt auch Deutsch. Wir wohnen zusammen in einem hellen Haus in der Nähe vom Park. Am Nachmittag kommen oft unsere Freunde aus Samarkand und Buchara zu Besuch. Wir sagen freundlich Hallo, sprechen viel über unsere Pläne und lernen zusammen neue deutsche Wörter. Am Abend sagen wir Tschüss oder Auf Wiedersehen und gehen ruhig schlafen. Deutsch lernen macht uns wirklich großen Spaß!", "uz": "Salom! Xayrli kun! Mening ismim Anvar va men O'zbekistondanman. Men oilam bilan Toshkentda yashayman. Toshkent katta va juda chiroyli shahar. Har kuni ertalab tirishqoqlik bilan nemis tili o'rganaman, chunki bu til kelajagim uchun juda muhim. Singlimning ismi Madina va u ham nemis tili o'rganadi. Biz bog' yaqinidagi yorug' uyda birga yashaymiz. Tushdan keyin Samarqand va Buxorodan do'stlarimiz tez-tez mehmonga keladi. Biz samimiy salomlashamiz, rejalarimiz haqida ko'p gaplashamiz va birga yangi nemischa so'zlarni o'rganamiz. Kechqurun xayrlashamiz va tinchgina uxlashga yotamiz. Nemis tilini o'rganish bizga rostdan ham katta zavq beradi!", "vocab": ["fleißig — tirishqoq", "die Zukunft — kelajak", "in der Nähe — yaqinida", "zu Besuch — mehmonga"], "questions": [{"q": "Anvar kommt aus Usbekistan und wohnt in Taschkent.", "ans": true}, {"q": "Seine Schwester Madina lernt kein Deutsch.", "ans": false}, {"q": "Am Nachmittag kommen Freunde aus Samarkand und Buchara.", "ans": true}]}, "goetheTasks": {"level": "A1", "writing": {"id": "gw_d1", "part": "1-kun · Goethe A1 Schreiben", "title": "O'zingiz haqingizda qisqa tanishuv xati (30+ so'z)", "prompt": "Nemis tili kursiga yangi qo'shildingiz. Guruhingizga qisqa xabar yozing:", "points": ["Salomlashing va ismingizni ayting", "Qayerdan ekaningiz va qayerda yashashingizni yozing", "Nima o'rganayotganingizni qo'shing"], "targetWords": 30, "sample": "Hallo zusammen! Ich heiße Anvar und komme aus Usbekistan. Ich wohne in Taschkent. Jetzt lerne ich jeden Tag Deutsch. Ich freue mich auf den Kurs! Viele Grüße, Anvar."}, "listening": {"id": "gl_d1", "part": "1-kun · Goethe A1 Hören", "title": "Kursdagi birinchi tanishuv", "transcript": "Guten Tag! Ich heiße Lukas und ich komme aus Österreich, aus Wien. Aber jetzt wohne ich in Berlin und arbeite hier. Woher kommst du und wo wohnst du jetzt?", "questions": [{"q": "Woher kommt Lukas?", "options": ["Aus Deutschland", "Aus Österreich", "Aus der Schweiz"], "ans": 1}, {"q": "Wo wohnt Lukas jetzt?", "options": ["In Wien", "In München", "In Berlin"], "ans": 2}]}, "speaking": {"id": "gs_d1", "part": "1-kun · Goethe A1 Sprechen (Teil 1)", "title": "O'zingizni tanishtiring (Sich vorstellen)", "durationSec": 90, "prompt": "Ismingiz, mamlakatingiz, shahringiz va o'rganayotgan tilingiz haqida 4-5 ta gap ayting.", "redemittel": [{"de": "Guten Tag! Ich heiße ...", "uz": "Xayrli kun! Mening ismim ..."}, {"de": "Ich komme aus Usbekistan.", "uz": "Men O'zbekistondanman."}, {"de": "Ich wohne in ...", "uz": "Men ...da yashayman."}, {"de": "Ich lerne jetzt Deutsch.", "uz": "Men hozir nemis tili o'rganyapman."}]}}}, "2": {"readingText": {"id": "rt_day_2", "level": "A1.1", "title": "2-kun matni: Meine Freunde und ihre Berufe", "de": "Ich habe viele gute Freunde und jeder hat einen interessanten Beruf. Mein bester Freund heißt Timur. Er ist Arzt und arbeitet in einem großen Krankenhaus in der Stadt. Timur ist sehr fleißig, aber am Abend ist er oft müde und hat leider keine Zeit. Seine Frau heißt Nilufar und sie ist Lehrerin an einer Schule. Sie sind sehr freundlich und haben ein kleines Kind. Das Kind ist vier Jahre alt und spielt gern im Garten. Ich bin noch Student und habe ein schönes Buch für meinen Deutschkurs. Ein Auto habe ich noch nicht, aber ich habe viel Motivation und lerne jeden Tag mit großer Freude. Zusammen sind wir ein starkes Team!", "uz": "Mening ko'plab yaxshi do'stlarim bor va har birining qiziqarli kasbi bor. Eng yaqin do'stimning ismi Timur. U shifokor va shahardagi katta kasalxonada ishlaydi. Timur juda mehnatkash, lekin kechqurun tez-tez charchaydi va afsuski vaqti bo'lmaydi. Uning rafiqasining ismi Nilufar, u maktabda o'qituvchi. Ular juda samimiy va kichkina farzandlari bor. Bola to'rt yoshda va bog'da o'ynashni yaxshi ko'radi. Men hali talabaman va nemis tili kursim uchun chiroyli kitobim bor. Menda hali mashina yo'q, lekin katta ishtiyoqim bor va har kuni zavq bilan o'qiyman. Birgalikda biz kuchli jamoamiz!", "vocab": ["der Beruf — kasb", "das Krankenhaus — kasalxona", "der Garten — bog'", "die Freude — quvonch"], "questions": [{"q": "Timur ist Lehrer an einer Schule.", "ans": false}, {"q": "Timur und Nilufar haben ein kleines Kind.", "ans": true}, {"q": "Der Erzähler hat schon ein neues Auto.", "ans": false}]}, "goetheTasks": {"level": "A1", "writing": {"id": "gw_d2", "part": "2-kun · Goethe A1 Schreiben", "title": "Do'stingiz va kasblar haqida yozing (30+ so'z)", "prompt": "Eng yaqin do'stingiz haqida 4-5 ta gap yozing (sein va haben fe'llaridan foydalaning):", "points": ["Ismi va kasbi (Er/Sie ist ...)", "Nimalari bor yoki yo'q (Er/Sie hat ... / kein ...)", "Qanday inson ekanligi (freundlich, klug)"], "targetWords": 30, "sample": "Mein Freund heißt Timur. Er ist Arzt und arbeitet im Krankenhaus. Er ist sehr freundlich und klug. Timur hat ein Haus und ein Auto, aber er hat leider wenig Zeit."}, "listening": {"id": "gl_d2", "part": "2-kun · Goethe A1 Hören", "title": "Kim qaysi kasbda ishlaydi?", "transcript": "Hallo, ich bin Sabine. Ich bin Lehrerin und arbeite gern mit Kindern. Mein Mann Peter ist kein Lehrer, er ist Arzt. Wir haben zwei Kinder und ein kleines Haus.", "questions": [{"q": "Was ist Peter von Beruf?", "options": ["Lehrer", "Arzt", "Student"], "ans": 1}, {"q": "Wie viele Kinder haben Sabine und Peter?", "options": ["Ein Kind", "Zwei Kinder", "Keine Kinder"], "ans": 1}]}, "speaking": {"id": "gs_d2", "part": "2-kun · Goethe A1 Sprechen", "title": "Kasb va oila haqida savol-javob", "durationSec": 90, "prompt": "O'zingiz va yaqinlaringizning kasbi haqida gapiring va sherigingizdan so'rang.", "redemittel": [{"de": "Ich bin Student / Ingenieur / Lehrer.", "uz": "Men talaba / muhandis / o'qituvchiman."}, {"de": "Hast du Geschwister oder Kinder?", "uz": "Aka-uka, opa-singling yoki bolalaring bormi?"}, {"de": "Ich habe ein Buch, aber kein Auto.", "uz": "Menda kitob bor, lekin mashina yo'q."}]}}}, "3": {"readingText": {"id": "rt_day_3", "level": "A1.1", "title": "3-kun matni: Einkaufen vor dem Deutschkurs", "de": "Heute Morgen gehe ich vor dem Deutschkurs schnell in das Geschäft. Ich brauche viele kleine Sachen für meinen Tag. Zuerst kaufe ich einen Stift und ein neues Heft, denn mein alter Stift schreibt nicht mehr gut. Danach suche ich eine praktische Tasche für mein Buch und mein Handy. Im Café nebenan bestelle ich einen heißen Kaffee und ein frisches Brot. Manchmal trinke ich auch einen Tee oder einfach kaltes Wasser. Auf dem Rückweg kaufe ich noch einen roten Apfel für die Pause. Zu Hause suche ich meinen Schlüssel, aber ich finde ihn sofort in meiner neuen Tasche. Jetzt habe ich alles und kann ruhig lernen!", "uz": "Bugun ertalab nemis tili darsidan oldin tezda do'konga kirdim. Kunim uchun ko'p kichik narsalar kerak. Avval bitta ruchka va yangi daftar sotib olaman, chunki eski ruchkam endi yaxshi yozmayapti. Keyin kitobim va telefonim uchun qulay sumka qidiraman. Yonidagi kafeda bitta issiq qahva va yangi non buyurtma qilaman. Ba'zan choy yoki shunchaki sovuq suv ham ichaman. Qaytishda tanaffus uchun yana bitta qizil olma olaman. Uyda kalitimni qidiraman, lekin uni darhol yangi sumkamning ichidan topaman. Endi menda hamma narsa bor va bemalol o'qiy olaman!", "vocab": ["das Geschäft — do'kon", "das Heft — daftar", "nebenan — yonida", "die Pause — tanaffus"], "questions": [{"q": "Er kauft einen neuen Stift und ein Heft.", "ans": true}, {"q": "Im Café trinkt er keinen Kaffee.", "ans": false}, {"q": "Er findet seinen Schlüssel in der neuen Tasche.", "ans": true}]}, "goetheTasks": {"level": "A1", "writing": {"id": "gw_d3", "part": "3-kun · Goethe A1 Schreiben", "title": "Xarid ro'yxati va qisqa xabar (30+ so'z)", "prompt": "Do'stingizga do'kondan nimalar olish kerakligini yozing (Akkusativ ishlating):", "points": ["Qaysi ichimlik kerak (einen Kaffee / Tee / Wasser)", "Qaysi yegulik kerak (ein Brot / einen Apfel)", "Boshqa narsa (einen Stift / eine Tasche)"], "targetWords": 30, "sample": "Hallo Ali, gehst du heute in den Supermarkt? Ich brauche einen Kaffee, ein Brot und einen Apfel. Ich habe auch keinen Stift mehr. Kannst du bitte einen Stift kaufen? Danke!"}, "listening": {"id": "gl_d3", "part": "3-kun · Goethe A1 Hören", "title": "Kafeda buyurtma", "transcript": "Guten Morgen! Ich möchte bitte einen großen Kaffee und ein Brot mit Käse. Meine Freundin trinkt keinen Kaffee, sie braucht einen grünen Tee und ein Glas Wasser.", "questions": [{"q": "Was trinkt die Freundin?", "options": ["Einen Kaffee", "Einen grünen Tee und Wasser", "Nur Apfelsaft"], "ans": 1}, {"q": "Was isst der Sprecher?", "options": ["Einen Apfel", "Ein Brot mit Käse", "Einen Kuchen"], "ans": 1}]}, "speaking": {"id": "gs_d3", "part": "3-kun · Goethe A1 Sprechen (Teil 2)", "title": "Do'konda so'rash (Akkusativ bilan)", "durationSec": 90, "prompt": "Sotuvchidan sumka, ruchka, olma va suv so'rab dialog tuzing.", "redemittel": [{"de": "Ich suche eine Tasche / einen Stift.", "uz": "Men sumka / ruchka qidiryapman."}, {"de": "Ich brauche einen Kaffee und Wasser.", "uz": "Menga qahva va suv kerak."}, {"de": "Haben Sie einen roten Apfel?", "uz": "Sizda qizil olma bormi?"}]}}}, "4": {"readingText": {"id": "rt_day_4", "level": "A1.1", "title": "4-kun matni: Was ich heute tun muss und kann", "de": "Mein Montag ist immer sehr aktiv und gut geplant. Am Morgen muss ich früh aufstehen und zwei Stunden für meine Arbeit am Computer sitzen. Ich muss viele E-Mails schreiben und wichtige Aufgaben machen. Zum Glück kann ich sehr gut organisieren und schnell arbeiten. Mittags mache ich eine Pause und koche etwas Leckeres, denn ich kann wirklich gut kochen! Am Nachmittag muss ich meine Hausaufgaben für den Deutschkurs machen. Ich kann schon viele Wörter verstehen und einfache Sätze sprechen. Am Abend möchte ich meinen Freunden helfen, wenn sie Fragen haben. Danach bin ich müde und muss früh schlafen gehen, damit ich morgen wieder fit bin.", "uz": "Mening dushanba kunim doim juda faol va yaxshi rejalashtirilgan bo'ladi. Ertalab erta turishim va ishim uchun kompyuter oldida ikki soat o'tirishim kerak. Ko'plab elektron xatlar yozishim va muhim vazifalarni bajarishim shart. Yaxshiyamki, men juda yaxshi tashkil qila olaman va tez ishlay olaman. Tushlikda tanaffus qilaman va mazali narsa pishiraman, chunki rostdan ham yaxshi ovqat pishira olaman! Tushdan keyin nemis tili kursi uchun uy vazifalarimni bajarishim kerak. Men allaqachon ko'p so'zlarni tushuna olaman va oddiy gaplarni gapira olaman. Kechqurun do'stlarimda savollar bo'lsa, ularga yordam bermoqchiman. Keyin charchayman va ertaga yana tetik bo'lish uchun erta uxlashim kerak.", "vocab": ["geplant — rejalashtirilgan", "zum Glück — yaxshiyamki", "lecker — mazali", "fit — tetik"], "questions": [{"q": "Er kann gar nicht gut kochen.", "ans": false}, {"q": "Am Nachmittag muss er seine Deutsch-Hausaufgaben machen.", "ans": true}, {"q": "Er kann schon einfache Sätze auf Deutsch sprechen.", "ans": true}]}, "goetheTasks": {"level": "A1", "writing": {"id": "gw_d4", "part": "4-kun · Goethe A1 Schreiben", "title": "Uchrashuvni rad etish xati (30+ so'z)", "prompt": "Do'stingiz sizni bugun kechqurun kafega chaqirdi, lekin bora olmaysiz (können / müssen ishlating):", "points": ["Bora olmasligingizni ayting", "Sababini yozing (ish / uy vazifasi)", "Ertaga uchrashishni taklif qiling"], "targetWords": 30, "sample": "Hallo Sara, es tut mir leid, aber ich kann heute Abend leider nicht kommen. Ich muss noch arbeiten und meine Hausaufgaben machen. Können wir uns morgen treffen? Liebe Grüße!"}, "listening": {"id": "gl_d4", "part": "4-kun · Goethe A1 Hören", "title": "Ish va dars rejasi", "transcript": "Hallo Marco, kannst du mir heute helfen? Ich muss bis achtzehn Uhr arbeiten und kann leider nicht einkaufen gehen. Kannst du bitte Brot und Milch kaufen?", "questions": [{"q": "Bis wann muss die Sprecherin arbeiten?", "options": ["Bis 16 Uhr", "Bis 18 Uhr", "Bis 20 Uhr"], "ans": 1}, {"q": "Was soll Marco kaufen?", "options": ["Kaffee und Kuchen", "Brot und Milch", "Äpfel und Tee"], "ans": 1}]}, "speaking": {"id": "gs_d4", "part": "4-kun · Goethe A1 Sprechen", "title": "Nimalarni qila olasiz va nimalar qilishingiz kerak?", "durationSec": 90, "prompt": "Bugungi majburiyatlaringiz (müssen) va qobiliyatlaringiz (können) haqida gapiring.", "redemittel": [{"de": "Ich kann gut kochen und Deutsch verstehen.", "uz": "Men yaxshi ovqat pishira olaman va nemischani tushuna olaman."}, {"de": "Ich muss heute meine Hausaufgaben machen.", "uz": "Men bugun uy vazifamni bajarishim kerak."}, {"de": "Kannst du mir bitte helfen?", "uz": "Menga yordam bera olasanmi, iltimos?"}]}}}, "5": {"readingText": {"id": "rt_day_5", "level": "A1.1", "title": "5-kun matni: Mein Tagesablauf von früh bis spät", "de": "Mein normaler Tag fängt immer sehr früh an. Ich stehe um sechs Uhr dreißig auf und mache zuerst das Fenster im Schlafzimmer auf, weil frische Luft sehr gesund ist. Um sieben Uhr frühstücke ich in Ruhe und rufe manchmal kurz meine Mutter an. Um acht Uhr fängt mein Online-Unterricht an und dauert zwei Stunden. Nach dem Mittagessen gehe ich in den Supermarkt und kaufe frisches Obst und Gemüse ein. Kommst du morgen vielleicht auch mit? Am Abend mache ich die Tür und alle Fenster zu, esse mit meiner Familie zusammen und sehe manchmal dreißig Minuten lang auf Deutsch fern. So lerne ich jeden Tag ein bisschen mehr!", "uz": "Mening oddiy kunim doim juda erta boshlanadi. Soat olti yarimda o'rnimdan turaman va avval yotoqxonadagi derazani ochaman, chunki toza havo juda foydali. Soat yettida xotirjam nonushta qilaman va ba'zan onamga qisqa qo'ng'iroq qilaman. Soat sakkizda onlayn darsim boshlanadi va ikki soat davom etadi. Tushlikdan keyin supermarketga boraman va yangi meva-sabzavotlar xarid qilaman. Balki ertaga sen ham birga borarsan? Kechqurun eshik va barcha derazalarni yopaman, oilam bilan birga ovqatlanaman va ba'zan o'ttiz daqiqa nemis tilida televizor ko'raman. Shunday qilib har kuni oz-ozdan ko'proq o'rganaman!", "vocab": ["der Tagesablauf — kun tartibi", "frische Luft — toza havo", "das Obst — meva", "ein bisschen — ozgina"], "questions": [{"q": "Der Tag fängt um neun Uhr an.", "ans": false}, {"q": "Er kauft nach dem Mittagessen im Supermarkt ein.", "ans": true}, {"q": "Am Abend sieht er manchmal dreißig Minuten auf Deutsch fern.", "ans": true}]}, "goetheTasks": {"level": "A1", "writing": {"id": "gw_d5", "part": "5-kun · Goethe A1 Schreiben", "title": "Kun tartibingizni tasvirlang (35+ so'z)", "prompt": "Ajraladigan fe'llardan (aufstehen, anfangen, einkaufen, anrufen, fernsehen) kamida 3 tasini ishlatib kuningizni yozing:", "points": ["Soat nechada turasiz?", "Dars/ish soat nechada boshlanadi?", "Kechqurun nima qilasiz?"], "targetWords": 35, "sample": "Ich stehe jeden Tag um 7 Uhr auf. Um 9 Uhr fängt mein Deutschkurs an. Am Nachmittag kaufe ich im Supermarkt ein und rufe meinen Freund an. Am Abend sehe ich ein bisschen fern."}, "listening": {"id": "gl_d5", "part": "5-kun · Goethe A1 Hören", "title": "Soat va kun tartibi", "transcript": "Hallo Lena, unser Deutschkurs fängt morgen nicht um neun Uhr, sondern erst um zehn Uhr dreißig an. Bitte komm pünktlich! Nach dem Kurs kaufen wir zusammen im Supermarkt ein.", "questions": [{"q": "Wann fängt der Deutschkurs morgen an?", "options": ["Um 9:00 Uhr", "Um 10:30 Uhr", "Um 11:00 Uhr"], "ans": 1}, {"q": "Was machen sie nach dem Kurs?", "options": ["Sie sehen fern", "Sie kaufen zusammen ein", "Sie fahren nach Hause"], "ans": 1}]}, "speaking": {"id": "gs_d5", "part": "5-kun · Goethe A1 Sprechen", "title": "Soat va kun tartibi haqida gapiring", "durationSec": 90, "prompt": "Ertalabdan kechgacha nima qilishingizni soatlar bilan aytib bering.", "redemittel": [{"de": "Ich stehe um sieben Uhr auf.", "uz": "Men soat yettida turaman."}, {"de": "Meine Arbeit fängt um neun Uhr an.", "uz": "Ishim soat to'qqizda boshlanadi."}, {"de": "Kommst du heute Nachmittag mit?", "uz": "Bugun tushdan keyin birga borasanmi?"}]}}}, "6": {"readingText": {"id": "rt_day_6", "level": "A1.1", "title": "6-kun matni: Unterwegs in der Stadt mit Familie", "de": "Am Samstag fahren wir oft mit der ganzen Familie ins Stadtzentrum. Mein Vater fährt lieber mit dem Bus, aber mein Bruder kommt immer mit dem Fahrrad, weil es schnell und sportlich ist. Ich fahre gern mit dem Zug, wenn wir eine andere Stadt besuchen. Nach dem Frühstück helfe ich zuerst meiner Mutter in der Küche und danke ihr für das leckere Essen. Danach gehen wir zusammen zum Markt. Dort treffen wir unsere Schwester und trinken mit ihr einen Tee. Am Nachmittag habe ich leider einen Termin beim Arzt, aber danach gehe ich mit einem guten Freund ins Kino. Der neue Film gefällt mir bestimmt sehr gut!", "uz": "Shanba kunlari butun oilamiz bilan tez-tez shahar markaziga boramiz. Otam avtobusda yurishni afzal ko'radi, akam esa doim velosipedda keladi, chunki bu tez va sportcha. Boshqa shaharga borganimizda men poyezdda yurishni yaxshi ko'raman. Nonushtadan keyin avval oshxonada onamga yordam beraman va mazali taom uchun unga rahmat aytaman. Shundan so'ng birga bozorga boramiz. U yerda opamizni uchratamiz va u bilan choy ichamiz. Tushdan keyin afsuski shifokorda uchrashuvim bor, lekin undan keyin yaqin do'stim bilan kinoga boraman. Yangi film menga albatta juda yoqadi!", "vocab": ["unterwegs — yo'lda", "das Stadtzentrum — shahar markazi", "der Termin — uchrashuv/qabul", "bestimmt — albatta"], "questions": [{"q": "Der Bruder kommt immer mit dem Bus.", "ans": false}, {"q": "Nach dem Frühstück hilft er seiner Mutter in der Küche.", "ans": true}, {"q": "Am Nachmittag hat er einen Termin beim Arzt.", "ans": true}]}, "goetheTasks": {"level": "A1", "writing": {"id": "gw_d6", "part": "6-kun · Goethe A1 Schreiben", "title": "Transport va uchrashuv haqida yozing (35+ so'z)", "prompt": "Dativ predloglari (mit, nach, zu, bei) yordamida do'stingizga shanba kungi rejangizni yozing:", "points": ["Nimada borasiz (mit dem Bus / Zug / Fahrrad)", "Ishdan/darsdan keyin qayerga borasiz (nach der Arbeit / zum Arzt)", "Kim bilan uchrashasiz (mit einem Freund / meiner Mutter)"], "targetWords": 35, "sample": "Hallo Dilshod, am Samstag fahre ich mit dem Bus ins Zentrum. Nach dem Deutschkurs helfe ich meiner Mutter und gehe dann zum Markt. Abends gehe ich mit einem Freund ins Café. Kommst du mit?"}, "listening": {"id": "gl_d6", "part": "6-kun · Goethe A1 Hören", "title": "Qanday yetib borish mumkin?", "transcript": "Entschuldigung, wie komme ich zum Bahnhof? — Das ist ganz einfach! Fahren Sie hier mit dem Bus Nummer fünf bis zur Hauptstraße. Von dort gehen Sie fünf Minuten zu Fuß.", "questions": [{"q": "Wohin möchte die Person fahren?", "options": ["Zum Arzt", "Zum Bahnhof", "Zum Supermarkt"], "ans": 1}, {"q": "Welche Busnummer soll sie nehmen?", "options": ["Nummer 5", "Nummer 7", "Nummer 15"], "ans": 0}]}, "speaking": {"id": "gs_d6", "part": "6-kun · Goethe A1 Sprechen", "title": "Transport va yordam haqida gapiring", "durationSec": 90, "prompt": "Qaysi transportda yurishingizni va kimga yordam berishingizni Dativda ayting.", "redemittel": [{"de": "Ich fahre jeden Tag mit dem Bus.", "uz": "Men har kuni avtobusda yuraman."}, {"de": "Nach der Arbeit gehe ich nach Hause.", "uz": "Ishdan keyin uyga boraman."}, {"de": "Das Buch gefällt mir sehr gut.", "uz": "Kitob menga juda yoqyapti."}]}}}, "7": {"readingText": {"id": "rt_day_7", "level": "A1.1", "title": "7-kun matni: Unsere Wohnung und meine Familie", "de": "Heute möchte ich euch meine Familie und unsere Wohnung vorstellen. Meine Eltern wohnen in einem ruhigen Viertel und meine Großeltern leben ganz in der Nähe. Unsere Wohnung hat drei helle Zimmer, eine moderne Küche und einen kleinen Balkon. In meinem Zimmer stehen ein großer Tisch, ein bequemer Stuhl und ein Regal für meine deutschen Bücher. Auf dem Tisch liegen meine Brille, meine Uhr und mein Laptop. Mein Bruder hat auch ein eigenes Zimmer, aber sein Zimmer ist ein bisschen kleiner als mein Zimmer. Unsere Wohnung ist noch ziemlich neu und sehr gemütlich. Am Wochenende besuchen uns oft unsere Verwandten, und wir sitzen alle zusammen am großen Tisch.", "uz": "Bugun sizlarga oilamni va kvartiramizni tanishtirmoqchiman. Ota-onam tinch mahallada yashaydi, bobom va buvim ham juda yaqinda turadi. Kvartiramizda uchta yorug' xona, zamonaviy oshxona va kichik balkon bor. Mening xonamda katta stol, qulay stul va nemischa kitoblarim uchun javon turadi. Stol ustida ko'zoynagim, soatim va noutbukim yotibdi. Akamning ham o'z xonasi bor, lekin uning xonasi mening xonamdan biroz kichikroq. Kvartiramiz hali ancha yangi va juda shinam. Dam olish kunlari qarindoshlarimiz tez-tez mehmonga keladi va hammamiz katta stol atrofida birga o'tiramiz.", "vocab": ["vorstellen — tanishtirmoq", "ruhig — tinch", "bequem — qulay", "die Verwandten — qarindoshlar"], "questions": [{"q": "Die Wohnung hat drei helle Zimmer.", "ans": true}, {"q": "Auf dem Tisch liegen seine Brille und seine Uhr.", "ans": true}, {"q": "Die Wohnung ist sehr alt und dunkel.", "ans": false}]}, "goetheTasks": {"level": "A1", "writing": {"id": "gw_d7", "part": "7-kun · Goethe A1 Schreiben", "title": "Xonangiz va oilangiz haqida (35+ so'z)", "prompt": "Egalik olmoshlari (mein, meine, unser, unsere) yordamida uyingizni tasvirlang:", "points": ["Uyingizda nechta xona bor?", "Xonangizda nimalar bor (Tisch, Stuhl, Buch)?", "Oilangiz haqida 1-2 gap qo'shing"], "targetWords": 35, "sample": "Unsere Wohnung ist hell und gemütlich. Sie hat drei Zimmer. In meinem Zimmer stehen mein Tisch und mein Stuhl. Meine Eltern und meine Schwester wohnen auch hier. Ich liebe meine Familie!"}, "listening": {"id": "gl_d7", "part": "7-kun · Goethe A1 Hören", "title": "Kvartira e'loni", "transcript": "Wir vermieten eine schöne Zweizimmerwohnung im Zentrum. Die Wohnung ist neu, hat einen großen Balkon und eine moderne Küche. Die Miete beträgt sechshundert Euro pro Monat.", "questions": [{"q": "Wie viele Zimmer hat die Wohnung?", "options": ["Zwei Zimmer", "Drei Zimmer", "Vier Zimmer"], "ans": 0}, {"q": "Hat die Wohnung einen Balkon?", "options": ["Nein", "Ja, einen großen Balkon", "Nur einen Garten"], "ans": 1}]}, "speaking": {"id": "gs_d7", "part": "7-kun · Goethe A1 Sprechen", "title": "Uy va oila tasviri", "durationSec": 90, "prompt": "Kvartirangiz yoki uyingiz hamda oila a'zolaringiz haqida qisqacha gapirib bering.", "redemittel": [{"de": "Meine Familie ist groß / klein.", "uz": "Mening oilam katta / kichik."}, {"de": "In meinem Zimmer stehen ein Tisch und ein Stuhl.", "uz": "Xonamda stol va stul bor."}, {"de": "Unsere Wohnung ist sehr gemütlich.", "uz": "Bizning kvartiramiz juda shinam."}]}}}, "8": {"readingText": {"id": "rt_day_8", "level": "A1.1", "title": "8-kun matni: Ist Deutsch wirklich so schwer?", "de": "Viele Menschen denken, dass Deutsch eine extrem schwere Sprache ist. Aber stimmt das wirklich? Nein, das ist nicht ganz richtig! Natürlich ist die Grammatik am Anfang nicht immer leicht, und man hat manchmal Fragen oder kleine Probleme mit den Artikeln. Aber wenn man langsam und regelmäßig lernt, macht man keine großen Fehler mehr. Mein Kurs ist nicht teuer, und unser Lehrer erklärt jede Antwort sehr klar und geduldig. Neulich hat mich ein Freund gefragt: «Lernst du heute nicht?» Ich habe sofort geantwortet: «Doch, ich lerne jeden Tag!» Wichtig ist nur, dass man nicht aufgibt. Mit einem guten Plan ist Deutsch gar nicht so schwer!", "uz": "Ko'p odamlar nemis tili nihoyatda qiyin til deb o'ylashadi. Lekin bu rostdan ham to'g'rimi? Yo'q, bu unchalik to'g'ri emas! Albatta, grammatika boshida har doim ham oson emas va ba'zan artikllar bilan savollar yoki kichik muammolar bo'ladi. Lekin sekin va muntazam o'rganilsa, endi katta xatolar qilinmaydi. Mening kursim qimmat emas, o'qituvchimiz esa har bir javobni juda aniq va sabr bilan tushuntiradi. Yaqinda bir do'stim mendan so'radi: «Bugun o'qimaysanmi?» Men darhol javob berdim: «Yo'g'-e, men har kuni o'qiyman!» Eng muhimi — taslim bo'lmaslik. Yaxshi reja bilan nemis tili umuman unchalik qiyin emas!", "vocab": ["regelmäßig — muntazam", "der Fehler — xato", "geduldig — sabrli", "aufgeben — taslim bo'lmoq"], "questions": [{"q": "Der Deutschkurs ist sehr teuer.", "ans": false}, {"q": "Der Lehrer erklärt jede Antwort klar und geduldig.", "ans": true}, {"q": "Auf die Frage «Lernst du heute nicht?» antwortet er mit «Doch!».", "ans": true}]}, "goetheTasks": {"level": "A1", "writing": {"id": "gw_d8", "part": "8-kun · Goethe A1 Schreiben", "title": "Inkor gaplar va «Doch» bilan qisqa xabar (35+ so'z)", "prompt": "Do'stingizga telefon yoki noutbuk tanlashda maslahat yozing (nicht, kein, teuer, billig, wichtig):", "points": ["Nima qimmat emas / arzon?", "Qaysi muammo yo'q (kein Problem)?", "Siz uchun nima muhim?"], "targetWords": 35, "sample": "Hallo Tim, das neue Handy ist nicht teuer, sondern ziemlich billig. Es ist schnell und macht keine Probleme. Für mich ist eine gute Kamera sehr wichtig. Ich kaufe es morgen!"}, "listening": {"id": "gl_d8", "part": "8-kun · Goethe A1 Hören", "title": "Do'konda narx haqida suhbat", "transcript": "Gefällt dir die rote Tasche nicht? — Doch, sie gefällt mir sehr gut! Aber sie ist leider viel zu teuer. Die schwarze Tasche ist billig und auch sehr praktisch.", "questions": [{"q": "Gefällt ihr die rote Tasche?", "options": ["Nein, gar nicht", "Ja, aber sie ist zu teuer", "Ja, sie ist sehr billig"], "ans": 1}, {"q": "Welche Tasche ist billig und praktisch?", "options": ["Die rote Tasche", "Die schwarze Tasche", "Keine Tasche"], "ans": 1}]}, "speaking": {"id": "gs_d8", "part": "8-kun · Goethe A1 Sprechen", "title": "Inkor savollarga «Doch!» bilan javob", "durationSec": 90, "prompt": "Quyidagi savollarga baland ovozda 'Doch!' va 'Nein' bilan javob berishni mashq qiling.", "redemittel": [{"de": "Hast du keine Zeit? — Doch, ich habe Zeit!", "uz": "Vaqting yo'qmi? — Yo'g'-e, vaqtim bor!"}, {"de": "Das ist nicht schwer, das ist leicht.", "uz": "Bu qiyin emas, bu oson."}, {"de": "Leider habe ich kein Problem damit.", "uz": "Afsuski / bu borada muammoyim yo'q."}]}}}, "9": {"readingText": {"id": "rt_day_9", "level": "A1.1", "title": "9-kun matni: Ein gemütlicher Abend im Restaurant", "de": "Am Freitagabend wollen meine Freunde und ich zusammen in ein neues Restaurant gehen. Als wir ankommen, fragen wir den Kellner freundlich: «Dürfen wir hier am Fenster sitzen?» Er lächelt und bringt uns sofort die Speisekarte. Wir lesen die Karte sehr aufmerksam, denn es gibt viele leckere Gerichte und Getränke. Ich möchte zuerst eine warme Suppe und danach ein kleines Stück Kuchen bestellen. Mein Freund will lieber einen frischen Orangensaft trinken, weil sein Arzt sagt, er soll viel Vitamin C zu sich nehmen. Im Restaurant darf man natürlich nicht rauchen, aber man darf schöne Fotos machen. Am Ende rufen wir den Kellner und wollen die Rechnung zusammen bezahlen. Das Essen war fantastisch!", "uz": "Juma oqshomida do'stlarim va men birga yangi restoranga bormoqchimiz. Yetib kelganimizda ofitsiantdan muloyimlik bilan so'raymiz: «Bu yerda deraza yonida o'tirsak maylimi?» U tabassum qiladi va bizga darhol menyuni olib keladi. Menyuni diqqat bilan o'qiymiz, chunki ko'plab mazali taomlar va ichimliklar bor. Men avval issiq sho'rva, keyin esa kichik bir bo'lak tort buyurtma qilmoqchiman. Do'stim esa yangi apelsin sharbati ichishni xohlaydi, chunki shifokori unga ko'p C vitamini ichishi kerakligini aytgan. Restoranda, albatta, chekish mumkin emas, lekin chiroyli rasmlarga tushish mumkin. Oxirida ofitsiantni chaqiramiz va hisobni birga to'lamoqchimiz. Taom ajoyib bo'ldi!", "vocab": ["der Kellner — ofitsiant", "aufmerksam — diqqat bilan", "das Gericht — taom", "lächeln — tabassum qilmoq"], "questions": [{"q": "Im Restaurant darf man rauchen.", "ans": false}, {"q": "Der Freund will einen frischen Orangensaft trinken.", "ans": true}, {"q": "Sie möchten am Fenster sitzen.", "ans": true}]}, "goetheTasks": {"level": "A1", "writing": {"id": "gw_d9", "part": "9-kun · Goethe A1 Schreiben", "title": "Restoranda stol band qilish (35+ so'z)", "prompt": "Restoranga qisqa e-mail yozib, juma oqshomiga stol band qiling (möchten / dürfen / wollen):", "points": ["Qaysi kun va soat nechada kelmoqchisiz?", "Necha kishi bo'lasiz?", "Deraza yonidagi stolni so'rang"], "targetWords": 35, "sample": "Sehr geehrte Damen und Herren, ich möchte am Freitag um 19 Uhr einen Tisch für vier Personen reservieren. Dürfen wir bitte am Fenster sitzen? Vielen Dank! Mit freundlichen Grüßen, Anvar."}, "listening": {"id": "gl_d9", "part": "9-kun · Goethe A1 Hören", "title": "Muzeydagi qoidalar", "transcript": "Willkommen im Stadtmuseum! Bitte beachten Sie unsere Regeln: Hier darf man leider nicht essen und nicht trinken. Fotos ohne Blitz dürfen Sie aber gern machen. Die Führung beginnt um elf Uhr.", "questions": [{"q": "Was darf man im Museum machen?", "options": ["Essen und trinken", "Fotos ohne Blitz machen", "Rauchen"], "ans": 1}, {"q": "Wann beginnt die Führung?", "options": ["Um 10 Uhr", "Um 11 Uhr", "Um 12 Uhr"], "ans": 1}]}, "speaking": {"id": "gs_d9", "part": "9-kun · Goethe A1 Sprechen (Teil 3)", "title": "Kafeda buyurtma berish va ruxsat so'rash", "durationSec": 90, "prompt": "Ofitsiant bilan suhbatni mashq qiling: menyu so'rang, taom buyurtma qiling va hisobni so'rang.", "redemittel": [{"de": "Darf ich bitte die Speisekarte haben?", "uz": "Iltimos, menyuni olsam maylimi?"}, {"de": "Ich möchte einen Kaffee und einen Kuchen bestellen.", "uz": "Men qahva va pirog buyurtma qilmoqchi edim."}, {"de": "Die Rechnung, bitte! Ich möchte bezahlen.", "uz": "Hisobni bering, iltimos! To'lamoqchiman."}]}}}, "10": {"readingText": {"id": "rt_day_10", "level": "A1.1", "title": "10-kun matni: Eine Reise mit dem Zug", "de": "Jeden Monat fährt mein älterer Bruder mit dem schnellen Zug von Taschkent nach Samarkand. Er nimmt immer ein Online-Ticket auf seinem Handy, damit er es nie vergisst. Am Bahnhof trifft er oft nette Kollegen und spricht mit ihnen über die Arbeit. Während der ganzen Fahrt liest mein Bruder meistens eine deutsche Zeitung oder ein interessantes Buch. Manchmal sieht er auch einen kurzen Film auf seinem Tablet und isst dazu einen frischen Apfel. Seine Frau fährt lieber mit dem Flugzeug vom Flughafen, aber mein Bruder findet den Zug viel entspannter. Am Abend gibt er unseren Eltern immer kleine Souvenirs aus der Stadt. Reisen macht ihm jedes Mal große Freude!", "uz": "Har oy katta akam tezyurar poyezdda Toshkentdan Samarqandga boradi. U hech qachon unutmasligi uchun doim telefonida onlayn chipta oladi. Vokzalda u tez-tez yoqimli hamkasblarini uchratadi va ular bilan ish haqida gaplashadi. Butun safar davomida akam ko'pincha nemischa gazeta yoki qiziqarli kitob o'qiydi. Ba'zan planshetida qisqa film ham ko'radi va buning yonida yangi olma yeydi. Uning rafiqasi aeroportdan samolyotda uchishni afzal ko'radi, lekin akam poyezdni ancha xotirjamroq deb biladi. Kechqurun u ota-onamizga doim shahardan kichik esdalik sovg'alar beradi. Sayohat qilish unga har safar katta quvonch bag'ishlaydi!", "vocab": ["während — davomida", "entspannt — xotirjam", "das Flugzeug — samolyot", "der Kollege — hamkasb"], "questions": [{"q": "Der Bruder fährt jeden Monat mit dem Zug nach Samarkand.", "ans": true}, {"q": "Während der Fahrt schläft er immer und liest nie.", "ans": false}, {"q": "Seine Frau fliegt lieber mit dem Flugzeug.", "ans": true}]}, "goetheTasks": {"level": "A1", "writing": {"id": "gw_d10", "part": "10-kun · Goethe A1 Schreiben", "title": "Do'stingizning odatlari haqida (40+ so'z)", "prompt": "Kuchli fe'llarni (fährt, liest, sieht, isst, trifft) er/sie shaxsida ishlatib yaqin insoningiz haqida yozing:", "points": ["U qayerga va nimada boradi?", "Bo'sh vaqtida nima o'qiydi yoki ko'radi?", "Kim bilan tez-tez uchrashadi?"], "targetWords": 40, "sample": "Mein Bruder fährt jeden Tag mit dem Zug zur Arbeit. Im Zug liest er oft eine Zeitung und isst einen Apfel. Am Abend sieht er gern einen Film oder trifft seine Freunde im Café. Er spricht auch sehr gut Deutsch."}, "listening": {"id": "gl_d10", "part": "10-kun · Goethe A1 Hören", "title": "Aeroportdagi e'lon", "transcript": "Achtung am Flughafen! Der Flug LH vierhundertzwölf nach Frankfurt startet heute um sechzehn Uhr zwanzig von Gate zwölf. Bitte nehmen Sie Ihr Ticket und Ihren Reisepass bereit.", "questions": [{"q": "Wohin fliegt das Flugzeug?", "options": ["Nach Berlin", "Nach Frankfurt", "Nach Wien"], "ans": 1}, {"q": "Von welchem Gate startet der Flug?", "options": ["Gate 12", "Gate 16", "Gate 20"], "ans": 0}]}, "speaking": {"id": "gs_d10", "part": "10-kun · Goethe A1 Sprechen", "title": "Sayohat va chipta haqida gapiring", "durationSec": 120, "prompt": "Poyezd yoki samolyotda sayohat qilish odatlaringiz haqida 4-5 ta gap ayting.", "redemittel": [{"de": "Ich fahre oft mit dem Zug.", "uz": "Men tez-tez poyezdda yuraman."}, {"de": "Mein Freund liest im Zug ein Buch.", "uz": "Do'stim poyezdda kitob o'qiydi."}, {"de": "Ich nehme mein Ticket am Bahnhof.", "uz": "Men chiptamni vokzaldan olaman."}]}}}, "11": {"readingText": {"id": "rt_day_11", "level": "A1.2", "title": "11-kun matni: Was ich am letzten Wochenende gemacht habe", "de": "Mein letztes Wochenende war sehr produktiv und gleichzeitig erholsam. Am Samstagmorgen habe ich zuerst zwei Stunden lang Deutsch gelernt und alle neuen Wörter im Heft wiederholt. Danach habe ich im Supermarkt eingekauft und zu Hause ein leckeres Mittagessen für meine ganze Familie gekocht. Am Nachmittag habe ich lange mit meinem besten Freund telefoniert und ihn gefragt, wie es ihm geht. Später haben wir im Park zusammen Fußball gespielt und viel gelacht. Am Sonntag habe ich noch nicht viel gearbeitet, sondern einfach ein bisschen Musik gehört und ein neues Buch gekauft. Vorgestern habe ich sogar schon die Hausaufgaben für die nächste Woche gemacht. Das Wochenende hat mir wirklich gutgetan!", "uz": "O'tgan dam olish kunlarim juda samarali va ayni paytda maroqli bo'ldi. Shanba kuni ertalab avval ikki soat nemis tili o'rgandim va daftardagi barcha yangi so'zlarni takrorladim. Shundan so'ng supermarketda bozorlik qildim va uyda butun oilam uchun mazali tushlik pishirdim. Tushdan keyin eng yaqin do'stim bilan uzoq telefonlashdim va undan ahvoli qandayligini so'radim. Keyinroq bog'da birga futbol o'ynadik va ko'p kuldik. Yakshanba kuni hali ko'p ishlamadim, balki shunchaki biroz musiqa tingladim va yangi kitob sotib oldim. O'tgan kuni hatto keyingi hafta uchun uy vazifalarini ham bajarib qo'ydim. Dam olish kunlari menga rostdan ham yaxshi ta'sir qildi!", "vocab": ["erholsam — dam oldiruvchi", "wiederholen — takrorlamoq", "sogar — hatto", "gutgetan — yaxshi ta'sir qildi"], "questions": [{"q": "Am Samstagmorgen hat er zwei Stunden Deutsch gelernt.", "ans": true}, {"q": "Er hat am Samstag nicht eingekauft.", "ans": false}, {"q": "Mit seinem Freund hat er im Park Fußball gespielt.", "ans": true}]}, "goetheTasks": {"level": "A2", "writing": {"id": "gw_d11", "part": "11-kun · Goethe A2 Schreiben", "title": "Dam olish kuningiz haqida E-Mail (40+ so'z)", "prompt": "Do'stingizga o'tgan dam olish kuni nimalar qilganingizni Perfekt (haben + Partizip II) bilan yozing:", "points": ["Shanba kuni nima qildingiz (gelernt, eingekauft, gekocht)?", "Kim bilan gaplashdingiz (telefoniert)?", "Yakshanba kuni nima qildingiz?"], "targetWords": 40, "sample": "Lieber Paul, wie geht es dir? Mein Wochenende war super! Am Samstag habe ich Deutsch gelernt, eingekauft und für meine Familie gekocht. Abends habe ich mit meinem Freund telefoniert. Am Sonntag haben wir Fußball gespielt. Und was hast du gemacht? Viele Grüße!"}, "listening": {"id": "gl_d11", "part": "11-kun · Goethe A2 Hören", "title": "Kecha nima bo'ldi?", "transcript": "Hallo Anna, hast du gestern für die Party eingekauft? — Ja, ich habe gestern im Supermarkt Getränke und Obst gekauft. Danach habe ich auch noch einen großen Schokoladenkuchen gebacken und mit Lukas telefoniert.", "questions": [{"q": "Was hat Anna im Supermarkt gekauft?", "options": ["Nur Brot", "Getränke und Obst", "Ein Geschenk"], "ans": 1}, {"q": "Mit wem hat sie telefoniert?", "options": ["Mit Lukas", "Mit ihrer Mutter", "Mit dem Arzt"], "ans": 0}]}, "speaking": {"id": "gs_d11", "part": "11-kun · Goethe A2 Sprechen", "title": "O'tgan dam olish kuningiz haqida so'zlang", "durationSec": 120, "prompt": "Kecha va o'tgan dam olish kunlari nimalar qilganingizni Perfektda gapirib bering.", "redemittel": [{"de": "Gestern habe ich viel gearbeitet und Deutsch gelernt.", "uz": "Kecha ko'p ishladim va nemis tili o'rgandim."}, {"de": "Am Wochenende habe ich im Supermarkt eingekauft.", "uz": "Dam olish kunlari supermarketda bozorlik qildim."}, {"de": "Ich habe mit meinem Freund telefoniert.", "uz": "Do'stim bilan telefonlashdim."}]}}}, "12": {"readingText": {"id": "rt_day_12", "level": "A1.2", "title": "12-kun matni: Unser Urlaub in Samarkand", "de": "Im letzten Monat bin ich mit meinem Bruder in den Urlaub nach Samarkand gefahren. Wir sind am frühen Morgen aufgestanden und pünktlich zum Bahnhof gegangen. Die Fahrt mit dem modernen Zug ist sehr schnell vergangen. In Samarkand sind wir drei Tage geblieben und haben viele historische Orte besucht. Wir sind stundenlang durch die schöne Altstadt gelaufen und haben dabei wunderbare Fotos gemacht. Mittags haben wir in einem gemütlichen Restaurant gegessen und heißen grünen Tee getrunken. Abends habe ich meiner Familie eine lange Nachricht geschrieben und ein spannendes Buch gelesen. Am Sonntagabend sind wir leider wieder nach Hause zurückgefahren, aber dieser Urlaub ist einfach unvergesslich gewesen!", "uz": "O'tgan oyda akam bilan Samarqandga ta'tilga bordik. Erta tongda turdik va vaqtida vokzalga keldik. Zamonaviy poyezddagi safar juda tez o'tib ketdi. Samarqandda uch kun qoldik va ko'plab tarixiy joylarga bordik. Chiroyli eski shahar bo'ylab soatlab yurdik va shu bilan birga ajoyib rasmlar oldik. Tushlikda shinam restoranda ovqatlandik va issiq ko'k choy ichdik. Kechqurun oilamga uzun xabar yozdim va qiziqarli kitob o'qidim. Yakshanba oqshomida afsuski yana uyga qaytib keldik, lekin bu ta'til shunchaki unutilmas bo'ldi!", "vocab": ["vergangen — o'tib ketdi", "die Altstadt — eski shahar", "spannend — qiziqarli", "unvergesslich — unutilmas"], "questions": [{"q": "Sie sind mit dem Flugzeug nach Samarkand geflogen.", "ans": false}, {"q": "Sie sind drei Tage in Samarkand geblieben.", "ans": true}, {"q": "Abends hat er seiner Familie eine Nachricht geschrieben.", "ans": true}]}, "goetheTasks": {"level": "A2", "writing": {"id": "gw_d12", "part": "12-kun · Goethe A2 Schreiben", "title": "Ta'til haqida xat (haben & sein Perfekt, 45+ so'z)", "prompt": "Do'stingizga oxirgi safaringiz haqida xat yozing (bin gefahren / bin geblieben / habe gegessen / habe geschrieben):", "points": ["Qayerga va nimada bordingiz?", "U yerda qancha qoldingiz va nima qildingiz?", "Taassurotingiz qanday bo'ldi (ist gewesen)?"], "targetWords": 45, "sample": "Liebe Nina, ich bin im Urlaub nach Samarkand gefahren und drei Tage dort geblieben. Ich bin durch die Altstadt gegangen, habe leckeren Plov gegessen und viele Fotos gemacht. Am Sonntag bin ich wieder nach Hause gekommen. Der Urlaub ist wunderschön gewesen! Liebe Grüße, Anvar."}, "listening": {"id": "gl_d12", "part": "12-kun · Goethe A2 Hören", "title": "Ta'tildan qaytish suhbati", "transcript": "Hallo Karim, willkommen zurück! Bist du im Urlaub nach Deutschland geflogen? — Nein, diesmal bin ich nicht geflogen. Ich bin mit meiner Familie in die Berge gefahren. Wir sind fünf Tage dort geblieben und viel gewandert.", "questions": [{"q": "Wohin ist Karim im Urlaub gefahren?", "options": ["Nach Deutschland", "In die Berge", "Ans Meer"], "ans": 1}, {"q": "Wie lange ist er dort geblieben?", "options": ["Drei Tage", "Fünf Tage", "Zwei Wochen"], "ans": 1}]}, "speaking": {"id": "gs_d12", "part": "12-kun · Goethe A2 Sprechen", "title": "Oxirgi ta'til yoki safaringizni hikoya qiling", "durationSec": 120, "prompt": "sein va haben bilan Perfektda oxirgi safaringizni 5-6 ta gapda aytib bering.", "redemittel": [{"de": "Ich bin nach ... gefahren / geflogen.", "uz": "Men ...ga bordim / uchdim."}, {"de": "Wir sind dort drei Tage geblieben.", "uz": "Biz u yerda uch kun qoldik."}, {"de": "Ich habe lecker gegessen und viel gesehen.", "uz": "Men mazali ovqatlandim va ko'p narsa ko'rdim."}, {"de": "Der Urlaub ist sehr schön gewesen.", "uz": "Ta'til juda chiroyli bo'ldi."}]}}}};

    const BUILTIN_LESSONS = [
      {
        id: 1, level: "A1.1",
        title: "Tanishuv, kishilik olmoshlari va fe'llarning tuslanishi",
        summary: "Fe'llarning hozirgi zamonda (Präsens) -e, -st, -t, -en qo'shimchalari bilan tuslanishi, gapda so'z tartibi va asosiy fonetika qoidalari.",
        grammarPoints: [
          { heading: "Fe'llarning hozirgi zamonda tuslanishi", text: "Infinitivdagi -en qo'shimchasi olib tashlanadi va o'zakka shaxs qo'shimchasi qo'shiladi: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en. (heißen fe'lida du heißt bo'ladi)." },
          { heading: "Gapda so'z tartibi va Fonetika", text: "Darak va savol so'zli gaplarda tuslangan fe'l doim 2-o'rinda. Fonetika: ei → [ay], ie → [i:], w → [v], s (unlidan oldin) → [z], sp/st (so'z boshida) → [shp/sht]." }
        ],
        table: {
          headers: ["Shaxs", "Qo'shimcha", "lernen", "kommen", "wohnen"],
          rows: [
            ["ich (men)", "-e", "ich lerne", "ich komme", "ich wohne"],
            ["du (sen)", "-st", "du lernst", "du kommst", "du wohnst"],
            ["er / sie / es", "-t", "er/sie lernt", "er/sie kommt", "er/sie wohnt"],
            ["wir (biz)", "-en", "wir lernen", "wir kommen", "wir wohnen"],
            ["ihr (sizlar)", "-t", "ihr lernt", "ihr kommt", "ihr wohnt"],
            ["sie / Sie", "-en", "sie/Sie lernen", "sie/Sie kommen", "sie/Sie wohnen"]
          ]
        },
        commonMistakes: [
          { wrong: "Heute ich lerne Deutsch.", right: "Heute lerne ich Deutsch.", note: "Tuslangan fe'l doim 2-o'rinda turishi shart." },
          { wrong: "Du heißst Ali.", right: "Du heißt Ali.", note: "ß o'zida s tovushini saqlagani uchun faqat -t qo'shiladi." }
        ],
        dialogue: [
          { speaker: "Anna", de: "Hallo! Wie heißt du?", uz: "Salom! Isming nima?" },
          { speaker: "Anvar", de: "Hallo! Ich heiße Anvar. Und du?", uz: "Salom! Mening ismim Anvar. Sening-chi?" },
          { speaker: "Anna", de: "Ich bin Anna. Woher kommst du?", uz: "Men Annaman. Qayerdansan?" },
          { speaker: "Anvar", de: "Ich komme aus Usbekistan und wohne in Taschkent.", uz: "Men O'zbekistondanman va Toshkentda yashayman." }
        ],
        memoryTip: "Qo'shimchalarni 'E-ST-T-EN-T-EN' ritmi bilan yodlang: ich (-e), du (-st), er (-t), wir (-en), ihr (-t), sie (-en).",
        examples: [
          { de: "Ich komme aus Usbekistan.", uz: "Men O'zbekistondanman." },
          { de: "Wie heißen Sie? — Ich heiße Anvar.", uz: "Ismingiz nima? — Mening ismim Anvar." },
          { de: "Wo wohnst du? — Ich wohne in Samarkand.", uz: "Qayerda yashaysan? — Samarqandda yashayman." }
        ],
        exercises: [
          { id: "l1_e1", type: "input", prompt: "«Salom! Mening ismim Ali.» — nemis tiliga tarjima qiling (yoki o'z ismingiz bilan yozing).", hint: "Hallo! Ich heiße ...", answers: ["hallo ich heiße ali", "hallo! ich heiße ali.", "hallo ich heisse ali", "hallo! ich heisse ali."], flexiblePrefix: "hallo! ich heiße ", sampleAnswer: "Hallo! Ich heiße Ali." },
          { id: "l1_e2", type: "input", prompt: "«Men O'zbekistondanman.» — nemis tiliga tarjima qiling.", hint: "Ich ... aus Usbekistan.", answers: ["ich komme aus usbekistan", "ich komme aus usbekistan."], sampleAnswer: "Ich komme aus Usbekistan." },
          { id: "l1_e3", type: "input", prompt: "«Men Toshkentda yashayman.» — nemis tiliga tarjima qiling.", hint: "Ich ... in Taschkent.", answers: ["ich wohne in taschkent", "ich wohne in taschkent.", "ich wohne in toshkent"], sampleAnswer: "Ich wohne in Taschkent." },
          { id: "l1_e4", type: "input", prompt: "«Men nemis tili o'rganyapman.» (Deutsch — nemis tili)", hint: "Ich ... Deutsch.", answers: ["ich lerne deutsch", "ich lerne deutsch."], sampleAnswer: "Ich lerne Deutsch." }
        ],
        words: [
          { id: "w1_1", art: "other", de: "Hallo!", plural: "", pron: "xallo", uz: "Salom!" },
          { id: "w1_2", art: "other", de: "Guten Morgen!", plural: "", pron: "guten morgen", uz: "Xayrli tong!" },
          { id: "w1_3", art: "other", de: "Guten Tag!", plural: "", pron: "guten tak", uz: "Xayrli kun!" },
          { id: "w1_4", art: "other", de: "Guten Abend!", plural: "", pron: "guten abent", uz: "Xayrli kech!" },
          { id: "w1_5", art: "other", de: "Auf Wiedersehen!", plural: "", pron: "auf vi:derzeen", uz: "Ko'rishguncha! (rasmiy)" },
          { id: "w1_6", art: "other", de: "Tschüss!", plural: "", pron: "chyus", uz: "Xayr! (norasmiy)" },
          { id: "w1_7", art: "der", de: "Name", plural: "die Namen", pron: "der name, di namen", uz: "ism" },
          { id: "w1_8", art: "das", de: "Land", plural: "die Länder", pron: "das lant, di lender", uz: "mamlakat" },
          { id: "w1_9", art: "die", de: "Stadt", plural: "die Städte", pron: "di shtat, di shtete", uz: "shahar" },
          { id: "w1_10", art: "other", de: "Danke!", plural: "", pron: "danke", uz: "Rahmat!" },
          { id: "w1_11", art: "other", de: "Bitte!", plural: "", pron: "bitte", uz: "Marhamat / Arzimaydi" },
          { id: "w1_12", art: "verb", de: "heißen", plural: "du heißt", pron: "xaysen", uz: "nomi/ismi ... bo'lmoq" },
          { id: "w1_13", art: "verb", de: "kommen", plural: "er kommt", pron: "kommen", uz: "kelmoq" },
          { id: "w1_14", art: "verb", de: "wohnen", plural: "er wohnt", pron: "voonen", uz: "yashamoq" },
          { id: "w1_15", art: "verb", de: "lernen", plural: "er lernt", pron: "lernen", uz: "o'rganmoq" }
        ]
      },
      {
        id: 2, level: "A1.1",
        title: "Sein va haben fe'llari hamda artikllar",
        summary: "Eng muhim ikki noto'g'ri fe'l — sein (bo'lmoq) va haben (ega bo'lmoq), aniq/noaniq artikllar (der/die/das, ein/eine) va kein inkori.",
        grammarPoints: [
          { heading: "Aniq va noaniq artikllar", text: "Aniq artikl: der (erkak), die (ayol), das (o'rta), die (ko'plik). Noaniq artikl: ein (der/das uchun), eine (die uchun). Ko'plikda noaniq artikl ishlatilmaydi." },
          { heading: "Otlarning inkori: kein / keine", text: "Ot oldidan 'yo'q' ma'nosida kein (erkak/o'rta) va keine (ayol/ko'plik) ishlatiladi: Ich habe kein Auto. Ich habe keine Zeit." }
        ],
        table: {
          headers: ["Shaxs", "sein (bo'lmoq)", "Misol", "haben (ega bo'lmoq)", "Misol"],
          rows: [
            ["ich", "bin", "Ich bin Student.", "habe", "Ich habe Zeit."],
            ["du", "bist", "Du bist klug.", "hast", "Du hast ein Buch."],
            ["er / sie / es", "ist", "Er ist Arzt.", "hat", "Sie hat ein Auto."],
            ["wir", "sind", "Wir sind hier.", "haben", "Wir haben Hunger."],
            ["ihr", "seid", "Ihr seid spät.", "habt", "Habt ihr Fragen?"],
            ["sie / Sie", "sind", "Sie sind freundlich.", "haben", "Sie haben Zeit."]
          ]
        },
        commonMistakes: [
          { wrong: "Ich Student.", right: "Ich bin Student.", note: "O'zbek tilidan farqli o'laroq, nemis gapida fe'lsiz (sein siz) gap tuzilmaydi." },
          { wrong: "Ich habe nicht Zeit.", right: "Ich habe keine Zeit.", note: "Artiklsiz otlarni inkor qilishda nicht emas, kein/keine ishlatiladi." }
        ],
        dialogue: [
          { speaker: "Tim", de: "Bist du Student?", uz: "Sen talabamisan?" },
          { speaker: "Sardor", de: "Ja, ich bin Student. Und hast du heute Zeit?", uz: "Ha, men talabaman. Bugun vaqting bormi?" },
          { speaker: "Tim", de: "Leider habe ich keine Zeit. Ich bin müde.", uz: "Afsuski, vaqtim yo'q. Men charchaganman." }
        ],
        memoryTip: "Otlarning oxirgi harflariga qarang: -ung, -heit, -keit, -in bilan tugagan otlar deyarli doim ayol jinsi (die) bo'ladi!",
        examples: [
          { de: "Das ist ein Buch.", uz: "Bu bir kitob." },
          { de: "Ich habe keine Zeit.", uz: "Menda vaqt yo'q." },
          { de: "Er ist Arzt und sie ist Lehrerin.", uz: "U shifokor, u (qiz) esa o'qituvchi." }
        ],
        exercises: [
          { id: "l2_e1", type: "choice", prompt: "Ich _____ Student. (sein fe'lining to'g'ri shakli)", options: ["bin", "bist", "ist", "sind"], answers: ["bin"], sampleAnswer: "bin" },
          { id: "l2_e2", type: "choice", prompt: "Wir _____ ein Auto. (haben fe'lining to'g'ri shakli)", options: ["habe", "hast", "hat", "haben"], answers: ["haben"], sampleAnswer: "haben" },
          { id: "l2_e3", type: "input", prompt: "«Menda vaqt yo'q.» — nemis tiliga tarjima qiling.", hint: "Ich habe ... Zeit.", answers: ["ich habe keine zeit", "ich habe keine zeit."], sampleAnswer: "Ich habe keine Zeit." },
          { id: "l2_e4", type: "choice", prompt: "Das ist _____ Buch. (noaniq artikl: ein yoki eine?)", options: ["ein", "eine"], answers: ["ein"], sampleAnswer: "ein" },
          { id: "l2_e5", type: "choice", prompt: "Er _____ müde. (sein fe'lining to'g'ri shakli)", options: ["bin", "bist", "ist", "seid"], answers: ["ist"], sampleAnswer: "ist" }
        ],
        words: [
          { id: "w2_1", art: "der", de: "Mann", plural: "die Männer", pron: "der man, di menner", uz: "erkak kishi" },
          { id: "w2_2", art: "die", de: "Frau", plural: "die Frauen", pron: "di frau, di frauen", uz: "ayol kishi" },
          { id: "w2_3", art: "das", de: "Kind", plural: "die Kinder", pron: "das kint, di kinder", uz: "bola" },
          { id: "w2_4", art: "der", de: "Freund", plural: "die Freunde", pron: "der froynt, di froynde", uz: "do'st" },
          { id: "w2_5", art: "das", de: "Haus", plural: "die Häuser", pron: "das xaus, di xoyzer", uz: "uy" },
          { id: "w2_6", art: "das", de: "Auto", plural: "die Autos", pron: "das auto, di autos", uz: "mashina" },
          { id: "w2_7", art: "das", de: "Buch", plural: "die Bücher", pron: "das bux, di byuxer", uz: "kitob" },
          { id: "w2_8", art: "die", de: "Zeit", plural: "", pron: "di tsayt", uz: "vaqt" },
          { id: "w2_9", art: "das", de: "Geld", plural: "", pron: "das gelt", uz: "pul" },
          { id: "w2_10", art: "der", de: "Student", plural: "die Studentin", pron: "der shtudent", uz: "talaba" },
          { id: "w2_11", art: "der", de: "Lehrer", plural: "die Lehrerin", pron: "der leerer", uz: "o'qituvchi" },
          { id: "w2_12", art: "der", de: "Arzt", plural: "die Ärztin", pron: "der artst", uz: "shifokor" },
          { id: "w2_13", art: "other", de: "gut", plural: "", pron: "gut", uz: "yaxshi" },
          { id: "w2_14", art: "other", de: "müde", plural: "", pron: "myude", uz: "charchagan" },
          { id: "w2_15", art: "other", de: "hier / dort", plural: "", pron: "xi:r / dort", uz: "bu yerda / u yerda" }
        ]
      },
      {
        id: 3, level: "A1.1",
        title: "Akkusativ (Tushum kelishigi) — «Kimni? Nimani?»",
        summary: "O'zbek tilidagi -ni qo'shimchasining nemischa ekvivalenti. Akkusativda faqat erkak jinsi (der → den, ein → einen, kein → keinen) o'zgaradi.",
        grammarPoints: [
          { heading: "Faqat erkak jinsi (der) o'zgaradi!", text: "Akkusativda ayol (die), o'rta (das) va ko'plik (die) o'zgarishsiz qoladi. Faqat erkak jinsi: der → den, ein → einen, kein → keinen." },
          { heading: "Doim Akkusativ talab qiladigan fe'llar", text: "haben (ega bo'lmoq), brauchen (kerak bo'lmoq), kaufen (sotib olmoq), suchen (qidirmoq), trinken (ichmoq), essen (yemoq)." }
        ],
        table: {
          headers: ["Jins", "Nominativ", "Akkusativ", "Misol"],
          rows: [
            ["Erkak (der)", "der / ein / kein", "den / einen / keinen", "Ich trinke den Kaffee."],
            ["Ayol (die)", "die / eine / keine", "die / eine / keine", "Ich kaufe eine Tasche."],
            ["O'rta (das)", "das / ein / kein", "das / ein / kein", "Ich suche das Handy."],
            ["Ko'plik (die)", "die / — / keine", "die / — / keine", "Ich habe keine Bücher."]
          ]
        },
        commonMistakes: [
          { wrong: "Ich habe ein Stift.", right: "Ich habe einen Stift.", note: "haben fe'lidan keyin doim Akkusativ keladi; der Stift → einen Stift." },
          { wrong: "Ich suche der Schlüssel.", right: "Ich suche den Schlüssel.", note: "suchen (qidirmoq) Akkusativ talab qiladi." }
        ],
        dialogue: [
          { speaker: "Verkäufer", de: "Guten Tag! Was brauchen Sie?", uz: "Xayrli kun! Sizga nima kerak?" },
          { speaker: "Kunde", de: "Ich suche eine Tasche und einen Stift.", uz: "Men bitta sumka va bitta ruchka qidiryapman." },
          { speaker: "Verkäufer", de: "Hier ist die Tasche. Brauchen Sie auch Kaffee?", uz: "Mana sumka. Sizga qahva ham kerakmi?" }
        ],
        memoryTip: "Akkusativ qoidasi = 'N-harfi qoidasi': faqat der/ein/kein oxiriga -n kelib den/einen/keinen bo'ladi!",
        examples: [
          { de: "Ich habe einen Kaffee.", uz: "Menda qahva bor." },
          { de: "Ich habe keinen Stift.", uz: "Menda ruchka yo'q." },
          { de: "Ich brauche Wasser.", uz: "Menga suv kerak." }
        ],
        exercises: [
          { id: "l3_e1", type: "choice", prompt: "Ich trinke _____ Kaffee. (der Kaffee → Akkusativ)", options: ["ein", "einen", "eine"], answers: ["einen"], sampleAnswer: "einen" },
          { id: "l3_e2", type: "choice", prompt: "Wir kaufen _____ Tasche. (die Tasche → Akkusativ)", options: ["eine", "einen", "ein"], answers: ["eine"], sampleAnswer: "eine" },
          { id: "l3_e3", type: "choice", prompt: "Er sucht _____ Schlüssel. (der Schlüssel → Akkusativ)", options: ["der", "den", "das"], answers: ["den"], sampleAnswer: "den" },
          { id: "l3_e4", type: "input", prompt: "«Menga suv kerak.» — nemis tiliga tarjima qiling.", hint: "Ich brauche ...", answers: ["ich brauche wasser", "ich brauche das wasser", "ich brauche ein wasser"], sampleAnswer: "Ich brauche Wasser." },
          { id: "l3_e5", type: "input", prompt: "«Menda ruchka yo'q.» (der Stift, kein/keinen bilan)", hint: "Ich habe ... Stift.", answers: ["ich habe keinen stift", "ich habe keinen stift."], sampleAnswer: "Ich habe keinen Stift." }
        ],
        words: [
          { id: "w3_1", art: "der", de: "Kaffee", plural: "die Kaffees", pron: "der kafe", uz: "qahva" },
          { id: "w3_2", art: "der", de: "Tee", plural: "die Tees", pron: "der te:", uz: "choy" },
          { id: "w3_3", art: "das", de: "Wasser", plural: "", pron: "das vasser", uz: "suv" },
          { id: "w3_4", art: "das", de: "Brot", plural: "die Brote", pron: "das brot", uz: "non" },
          { id: "w3_5", art: "der", de: "Apfel", plural: "die Äpfel", pron: "der apfel, di epfel", uz: "olma" },
          { id: "w3_6", art: "der", de: "Stift", plural: "die Stifte", pron: "der shtift", uz: "ruchka / qalam" },
          { id: "w3_7", art: "die", de: "Tasche", plural: "die Taschen", pron: "di tashe", uz: "sumka" },
          { id: "w3_8", art: "das", de: "Handy", plural: "die Handys", pron: "das xendi", uz: "mobil telefon" },
          { id: "w3_9", art: "der", de: "Schlüssel", plural: "die Schlüssel", pron: "der shlyussel", uz: "kalit" },
          { id: "w3_10", art: "verb", de: "brauchen", plural: "er braucht", pron: "brauxen", uz: "kerak bo'lmoq" },
          { id: "w3_11", art: "verb", de: "kaufen", plural: "er kauft", pron: "kaufen", uz: "sotib olmoq" },
          { id: "w3_12", art: "verb", de: "suchen", plural: "er sucht", pron: "zuxen", uz: "qidirmoq" },
          { id: "w3_13", art: "verb", de: "trinken", plural: "er trinkt", pron: "trinken", uz: "ichmoq" },
          { id: "w3_14", art: "verb", de: "essen", plural: "du isst, er isst", pron: "essen", uz: "yemoq" }
        ]
      },
      {
        id: 4, level: "A1.1",
        title: "Modal fe'llar — können va müssen",
        summary: "Imkoniyat (können) va majburiyat (müssen) ifodalash. Fe'l ramkasi qoidasi: modal fe'l 2-o'rinda, asosiy fe'l gapning eng oxirida.",
        grammarPoints: [
          { heading: "Modal fe'llarning 2 ta muhim xususiyati", text: "1) Birlik shakllarida (ich, du, er/sie/es) o'zak unlisi o'zgaradi (ö→a, ü→u). 2) ich va er/sie/es shakllari bir xil va qo'shimchasiz: ich kann, er kann; ich muss, er muss." },
          { heading: "Fe'l ramkasi (Satzklammer)", text: "Modal fe'l 2-o'rinda tuslanadi, asosiy fe'l esa infinitiv (-en) shaklda gapning eng oxiriga suriladi: Ich kann Deutsch sprechen." }
        ],
        table: {
          headers: ["Shaxs", "können (qila olmoq)", "müssen (majbur bo'lmoq)"],
          rows: [
            ["ich", "kann [kan]", "muss [mus]"],
            ["du", "kannst [kanst]", "musst [must]"],
            ["er / sie / es", "kann [kan]", "muss [mus]"],
            ["wir", "können [kyonnen]", "müssen [myussen]"],
            ["ihr", "könnt [kyont]", "müsst [myust]"],
            ["sie / Sie", "können [kyonnen]", "müssen [myussen]"]
          ]
        },
        commonMistakes: [
          { wrong: "Ich kann sprechen Deutsch.", right: "Ich kann Deutsch sprechen.", note: "Asosiy fe'l (sprechen) doimo gapning eng oxiriga suriladi!" },
          { wrong: "Er kannt gut kochen.", right: "Er kann gut kochen.", note: "Modal fe'llarda er/sie/es ga -t qo'shilmaydi (ich = er)." }
        ],
        dialogue: [
          { speaker: "Lena", de: "Kannst du heute Abend kommen?", uz: "Bugun kechqurun kela olasanmi?" },
          { speaker: "Jamshid", de: "Leider nein, ich muss heute lange arbeiten.", uz: "Afsuski yo'q, bugun uzoq ishlashim kerak." },
          { speaker: "Lena", de: "Schade! Aber du kannst morgen kommen.", uz: "Afsus! Lekin ertaga kela olasan." }
        ],
        memoryTip: "Modal fe'lli gapni sendvich deb tasavvur qiling: 2-o'rinda modal fe'l, oxirida asosiy fe'l, hamma narsa ularning o'rtasida!",
        examples: [
          { de: "Ich kann Deutsch sprechen.", uz: "Men nemischa gapira olaman." },
          { de: "Ich muss heute arbeiten.", uz: "Men bugun ishlashim kerak." },
          { de: "Wir müssen jetzt gehen.", uz: "Biz hozir ketishimiz kerak." }
        ],
        exercises: [
          { id: "l4_e1", type: "choice", prompt: "Ich _____ gut kochen. (können fe'li)", options: ["kann", "kannst", "können", "könnt"], answers: ["kann"], sampleAnswer: "kann" },
          { id: "l4_e2", type: "choice", prompt: "Du _____ heute arbeiten. (müssen fe'li)", options: ["muss", "musst", "müssen", "müsst"], answers: ["musst"], sampleAnswer: "musst" },
          { id: "l4_e3", type: "input", prompt: "«Men nemis tilini tushuna olaman.» (verstehen fe'lini oxiriga qo'ying)", hint: "Ich kann Deutsch ...", answers: ["ich kann deutsch verstehen", "ich kann deutsch verstehen."], sampleAnswer: "Ich kann Deutsch verstehen." },
          { id: "l4_e4", type: "input", prompt: "«Biz hozir uy vazifasini bajarishimiz kerak.» (die Hausaufgabe, machen)", hint: "Wir müssen jetzt die Hausaufgabe ...", answers: ["wir müssen jetzt die hausaufgabe machen", "wir muessen jetzt die hausaufgabe machen", "wir müssen jetzt die hausaufgaben machen"], sampleAnswer: "Wir müssen jetzt die Hausaufgabe machen." },
          { id: "l4_e5", type: "choice", prompt: "Er _____ nicht schlafen. (können fe'lining to'g'ri shakli)", options: ["kann", "könnt", "kannst"], answers: ["kann"], sampleAnswer: "kann" }
        ],
        words: [
          { id: "w4_1", art: "verb", de: "sprechen", plural: "du sprichst, er spricht", pron: "shprexen", uz: "gapirmoq" },
          { id: "w4_2", art: "verb", de: "verstehen", plural: "er versteht", pron: "fershteyen", uz: "tushunmoq" },
          { id: "w4_3", art: "verb", de: "arbeiten", plural: "er arbeitet", pron: "arbayten", uz: "ishlamoq" },
          { id: "w4_4", art: "verb", de: "schlafen", plural: "du schläfst, er schläft", pron: "shlafen", uz: "uxlamoq" },
          { id: "w4_5", art: "verb", de: "kochen", plural: "er kocht", pron: "koxen", uz: "pishirmoq" },
          { id: "w4_6", art: "verb", de: "gehen", plural: "er geht", pron: "geyen", uz: "bormoq / piyoda yurmoq" },
          { id: "w4_7", art: "verb", de: "machen", plural: "er macht", pron: "maxen", uz: "qilmoq / bajarmoq" },
          { id: "w4_8", art: "verb", de: "helfen", plural: "du hilfst, er hilft", pron: "xelfen", uz: "yordam bermoq" },
          { id: "w4_9", art: "other", de: "heute", plural: "", pron: "xoyte", uz: "bugun" },
          { id: "w4_10", art: "other", de: "jetzt", plural: "", pron: "yetst", uz: "hozir" },
          { id: "w4_11", art: "other", de: "sehr", plural: "", pron: "zeer", uz: "juda" },
          { id: "w4_12", art: "die", de: "Arbeit", plural: "die Arbeiten", pron: "di arbayt", uz: "ish" },
          { id: "w4_13", art: "die", de: "Hausaufgabe", plural: "die Hausaufgaben", pron: "di xaus-aufgabe", uz: "uy vazifasi" },
          { id: "w4_14", art: "verb", de: "können / müssen", plural: "kann / muss", pron: "kyonnen / myussen", uz: "qila olmoq / majbur bo'lmoq" }
        ]
      },
      {
        id: 5, level: "A1.1",
        title: "Ajraladigan fe'llar (Trennbare Verben) va kun tartibi",
        summary: "Old qo'shimchasi (auf-, ein-, an-, zu-, mit-, fern-) darak va so'roq gapda fe'ldan uzilib gapning eng oxiriga ketadigan fe'llar.",
        grammarPoints: [
          { heading: "Prefiks gapning eng oxiriga ketadi", text: "auf|stehen → Ich stehe um 7 Uhr auf. ein|kaufen → Wir kaufen heute im Supermarkt ein. Eng ko'p uchraydigan prefikslar: auf-, zu-, ein-, an-, aus-, mit-, fern-." },
          { heading: "Modal fe'l bilan kelganda ajralmaydi!", text: "Gapda modal fe'l bo'lsa, ajraladigan fe'l butunligicha gap oxiriga o'tadi: Ich muss um 7 Uhr aufstehen." }
        ],
        table: {
          headers: ["Fe'l", "Prefiks", "Gapda qo'llanishi", "Tarjimasi"],
          rows: [
            ["aufstehen", "auf-", "Ich stehe um 7 Uhr auf.", "Men soat 7 da turaman."],
            ["einkaufen", "ein-", "Wir kaufen im Supermarkt ein.", "Biz supermarketda xarid qilamiz."],
            ["anrufen", "an-", "Ich rufe meinen Freund an.", "Men do'stimga qo'ng'iroq qilyapman."],
            ["zumachen", "zu-", "Wir machen das Fenster zu.", "Biz derazani yopyapmiz."]
          ]
        },
        commonMistakes: [
          { wrong: "Ich aufstehe um 7 Uhr.", right: "Ich stehe um 7 Uhr auf.", note: "Oddiy darak gapda auf- prefiksi gap oxiriga ajralib ketadi." },
          { wrong: "Ich muss um 7 Uhr stehe auf.", right: "Ich muss um 7 Uhr aufstehen.", note: "Modal fe'l bilan fe'l ajralmaydi va infinitivda oxirida turadi." }
        ],
        dialogue: [
          { speaker: "Ona", de: "Wann stehst du morgen auf?", uz: "Ertaga soat nechada turasan?" },
          { speaker: "Bek", de: "Ich stehe um 7 Uhr auf. Danach kaufe ich im Supermarkt ein.", uz: "Soat 7 da turaman. Keyin supermarketda bozorlik qilaman." },
          { speaker: "Ona", de: "Gut, ruf mich bitte später an!", uz: "Yaxshi, keyinroq menga qo'ng'iroq qil!" }
        ],
        memoryTip: "Prefiksga urg'u tushsa (AUFstehen, EINkaufen) — u ajraladi! (be-, ver-, ge- kabilarga urg'u tushmaydi va ular ajralmaydi).",
        examples: [
          { de: "Ich stehe um 7 Uhr auf.", uz: "Men soat 7 da o'rnimdan turaman." },
          { de: "Ich muss um 7 Uhr aufstehen.", uz: "Men soat 7 da turishim kerak." },
          { de: "Kommst du morgen mit?", uz: "Ertaga birga borasanmi?" }
        ],
        exercises: [
          { id: "l5_e1", type: "choice", prompt: "Ich stehe um 6 Uhr _____. (to'g'ri qo'shimcha)", options: ["auf", "an", "ein"], answers: ["auf"], sampleAnswer: "auf" },
          { id: "l5_e2", type: "choice", prompt: "Er _____ heute im Supermarkt ein. (einkaufen fe'li)", options: ["kaufe", "kaufst", "kauft", "kaufen"], answers: ["kauft"], sampleAnswer: "kauft" },
          { id: "l5_e3", type: "choice", prompt: "Wir machen das Fenster _____. (Derazani yopyapmiz)", options: ["zu", "auf", "mit"], answers: ["zu"], sampleAnswer: "zu" },
          { id: "l5_e4", type: "input", prompt: "Ich rufe meinen Freund _____. (bo'sh joyga prefiks yozing)", hint: "anrufen → ...", answers: ["an"], sampleAnswer: "an" },
          { id: "l5_e5", type: "input", prompt: "Kommst du morgen _____? (mitkommen → prefiksni yozing)", hint: "mit...", answers: ["mit"], sampleAnswer: "mit" }
        ],
        words: [
          { id: "w5_1", art: "verb", de: "aufstehen", plural: "er steht auf", pron: "auf-shteyen", uz: "uyqudan/o'rnidan turmoq" },
          { id: "w5_2", art: "verb", de: "einkaufen", plural: "er kauft ein", pron: "ayn-kaufen", uz: "xarid / bozorlik qilmoq" },
          { id: "w5_3", art: "verb", de: "anrufen", plural: "er ruft an", pron: "an-rufen", uz: "qo'ng'iroq qilmoq" },
          { id: "w5_4", art: "verb", de: "anfangen", plural: "er fängt an", pron: "an-fangen", uz: "boshlanmoq" },
          { id: "w5_5", art: "verb", de: "aufmachen", plural: "er macht auf", pron: "auf-maxen", uz: "ochmoq" },
          { id: "w5_6", art: "verb", de: "zumachen", plural: "er macht zu", pron: "tsu-maxen", uz: "yopmoq" },
          { id: "w5_7", art: "verb", de: "fernsehen", plural: "er sieht fern", pron: "fern-zeen", uz: "televizor ko'rmoq" },
          { id: "w5_8", art: "verb", de: "mitkommen", plural: "er kommt mit", pron: "mit-kommen", uz: "birga bormoq/kelmoq" },
          { id: "w5_9", art: "die", de: "Uhr", plural: "die Uhren", pron: "di u:r", uz: "soat" },
          { id: "w5_10", art: "other", de: "um ... Uhr", plural: "", pron: "um ... u:r", uz: "soat ... da" },
          { id: "w5_11", art: "der", de: "Supermarkt", plural: "die Supermärkte", pron: "der zuper-markt", uz: "supermarket" },
          { id: "w5_12", art: "other", de: "morgen", plural: "", pron: "morgen", uz: "ertaga" },
          { id: "w5_13", art: "die", de: "Tür", plural: "die Türen", pron: "di tyur", uz: "eshik" },
          { id: "w5_14", art: "das", de: "Fenster", plural: "die Fenster", pron: "das fenster", uz: "deraza" }
        ]
      },
      {
        id: 6, level: "A1.1",
        title: "Dativ (Jo'nalish kelishigi) — «Kimga? Qayerda?»",
        summary: "O'zbek tilidagi -ga va -da qo'shimchalari. Dativda barcha jins artikllari o'zgaradi: der/das → dem, die → der, ko'plik → den + n.",
        grammarPoints: [
          { heading: "Dativ talab qiluvchi fe'llar va predloglar", text: "Fe'llar: helfen (yordam bermoq), danken (rahmat aytmoq), gefallen (yoqmoq), gehören (tegishli bo'lmoq). Predloglar: mit, nach, aus, zu, bei." },
          { heading: "Qulay qisqartmalar", text: "zu + dem = zum, zu + der = zur, bei + dem = beim, in + dem = im." }
        ],
        table: {
          headers: ["Jins", "Nominativ", "Dativ", "Misol"],
          rows: [
            ["Erkak (der)", "der / ein", "dem / einem", "Ich helfe dem Mann."],
            ["O'rta (das)", "das / ein", "dem / einem", "Ich helfe dem Kind."],
            ["Ayol (die)", "die / eine", "der / einer", "Ich helfe der Frau."],
            ["Ko'plik (die)", "die / —", "den ...-n", "Ich helfe den Kindern."]
          ]
        },
        commonMistakes: [
          { wrong: "Ich fahre mit den Bus.", right: "Ich fahre mit dem Bus.", note: "mit doim Dativ talab qiladi: der Bus → dem Bus." },
          { wrong: "Ich helfe die Mutter.", right: "Ich helfe der Mutter.", note: "Ayol jinsi (die) Dativda der ga aylanadi!" }
        ],
        dialogue: [
          { speaker: "Ali", de: "Wie fährst du zur Arbeit?", uz: "Ishga nimada borasan?" },
          { speaker: "Max", de: "Ich fahre mit dem Bus oder mit dem Fahrrad.", uz: "Men avtobusda yoki velosipedda boraman." },
          { speaker: "Ali", de: "Super! Nach der Arbeit gehe ich zum Arzt.", uz: "Zo'r! Ishdan keyin men shifokorga boraman." }
        ],
        memoryTip: "Dativ artikllarini 'MRMN' deb eslang: deM (erkak), deR (ayol), deM (o'rta), deN (ko'plik)!",
        examples: [
          { de: "Ich helfe meiner Mutter.", uz: "Men onamga yordam beryapman." },
          { de: "Er fährt mit dem Bus.", uz: "U avtobusda ketmoqda." },
          { de: "Das Buch gefällt mir.", uz: "Kitob menga yoqyapti." }
        ],
        exercises: [
          { id: "l6_e1", type: "choice", prompt: "Ich helfe _____ Mutter. (die Mutter → Dativ)", options: ["die", "der", "dem"], answers: ["der"], sampleAnswer: "der" },
          { id: "l6_e2", type: "choice", prompt: "Er fährt mit _____ Bus. (der Bus → Dativ)", options: ["dem", "den", "der"], answers: ["dem"], sampleAnswer: "dem" },
          { id: "l6_e3", type: "choice", prompt: "Wir fahren mit _____ Fahrrad. (das Fahrrad → Dativ)", options: ["das", "dem", "den"], answers: ["dem"], sampleAnswer: "dem" },
          { id: "l6_e4", type: "input", prompt: "Ich komme mit einem _____. (do'stim bilan — Freund so'zini yozing)", hint: "Freund", answers: ["freund"], sampleAnswer: "Freund" },
          { id: "l6_e5", type: "input", prompt: "Das Buch gefällt _____. (menga — mir so'zini yozing)", hint: "mir", answers: ["mir"], sampleAnswer: "mir" }
        ],
        words: [
          { id: "w6_1", art: "der", de: "Vater", plural: "die Väter", pron: "der fater, di feter", uz: "ota" },
          { id: "w6_2", art: "die", de: "Mutter", plural: "die Mütter", pron: "di mutter, di myutter", uz: "ona" },
          { id: "w6_3", art: "der", de: "Bruder", plural: "die Brüder", pron: "der bruder, di bryuder", uz: "aka / uka" },
          { id: "w6_4", art: "die", de: "Schwester", plural: "die Schwestern", pron: "di shvester", uz: "opa / singil" },
          { id: "w6_5", art: "der", de: "Bus", plural: "die Busse", pron: "der bus", uz: "avtobus" },
          { id: "w6_6", art: "der", de: "Zug", plural: "die Züge", pron: "der tsuk, di tsyuge", uz: "poyezd" },
          { id: "w6_7", art: "das", de: "Fahrrad", plural: "die Fahrräder", pron: "das fa:r-rat", uz: "velosiped" },
          { id: "w6_8", art: "verb", de: "danken", plural: "+ Dativ", pron: "danken", uz: "rahmat aytmoq" },
          { id: "w6_9", art: "verb", de: "gefallen", plural: "es gefällt mir", pron: "gefallen", uz: "yoqmoq" },
          { id: "w6_10", art: "other", de: "mit", plural: "+ Dativ", pron: "mit", uz: "bilan" },
          { id: "w6_11", art: "other", de: "nach", plural: "+ Dativ", pron: "nax", uz: "keyin / tomon" },
          { id: "w6_12", art: "other", de: "zu", plural: "+ Dativ (zum/zur)", pron: "tsu", uz: "ga / huzuriga" },
          { id: "w6_13", art: "other", de: "bei", plural: "+ Dativ (beim)", pron: "bay", uz: "da / yonida" }
        ]
      },
      {
        id: 7, level: "A1.1",
        title: "Egalik olmoshlari (Possessivartikel) — «Mening, sening...»",
        summary: "mein, dein, sein, ihr, unser, euer — egalik olmoshlari o'zidan keyin kelayotgan otning jinsiga va kelishigiga qarab qo'shimcha oladi.",
        grammarPoints: [
          { heading: "Otning jinsiga qarab qo'shimcha oladi", text: "Nominativda: erkak (der) va o'rta (das) qo'shimchasiz (mein Vater, mein Buch); ayol (die) va ko'plik -e oladi (meine Mutter, meine Bücher)." },
          { heading: "Akkusativ va Dativda", text: "Akkusativ erkak jinsi: -en (meinen Schlüssel). Dativda: erkak/o'rta -em (mit meinem Freund), ayol -er (in unserer Wohnung / meiner Mutter)." }
        ],
        table: {
          headers: ["Shaxs", "Egalik olmoshi", "Talaffuzi", "Tarjimasi"],
          rows: [
            ["ich", "mein / meine", "[mayn]", "mening"],
            ["du", "dein / deine", "[dayn]", "sening"],
            ["er / es", "sein / seine", "[zayn]", "uning (o'g'il/narsa)"],
            ["sie (u - qiz)", "ihr / ihre", "[i:r]", "uning (qiz)"],
            ["wir", "unser / unsere", "[unzer]", "bizning"],
            ["ihr", "euer / eure", "[oyer]", "sizlarning"],
            ["sie / Sie", "ihr / Ihr", "[i:r]", "ularning / Sizning"]
          ]
        },
        commonMistakes: [
          { wrong: "Das ist mein Mutter.", right: "Das ist meine Mutter.", note: "die Mutter ayol jinsi bo'lgani uchun -e qo'shiladi." },
          { wrong: "Ich suche mein Schlüssel.", right: "Ich suche meinen Schlüssel.", note: "der Schlüssel Akkusativda -en oladi." }
        ],
        dialogue: [
          { speaker: "Sara", de: "Ist das deine Wohnung?", uz: "Bu sening kvartirangmi?" },
          { speaker: "Dilshod", de: "Ja, ich wohne hier mit meiner Familie.", uz: "Ha, men bu yerda oilam bilan yashayman." },
          { speaker: "Sara", de: "Eure Wohnung ist sehr groß und schön!", uz: "Sizlarning kvartirangiz juda katta va chiroyli ekan!" }
        ],
        memoryTip: "Egalik olmoshlari huddi ein/eine kabi o'zgaradi: qayerda eine bo'lsa → meine, qayerda einen bo'lsa → meinen, qayerda einem bo'lsa → meinem!",
        examples: [
          { de: "Das ist mein Vater und meine Mutter.", uz: "Bu mening otam va mening onam." },
          { de: "Ich suche meinen Schlüssel.", uz: "Men kalitimni qidiryapman." },
          { de: "Wir wohnen in unserer Wohnung.", uz: "Biz o'z kvartiramizda yashaymiz." }
        ],
        exercises: [
          { id: "l7_e1", type: "choice", prompt: "Das ist _____ Vater. (der Vater → mening otam)", options: ["mein", "meine", "meinen"], answers: ["mein"], sampleAnswer: "mein" },
          { id: "l7_e2", type: "choice", prompt: "Wo ist _____ Brille? (die Brille → sening ko'zoynaging)", options: ["dein", "deine", "deinen"], answers: ["deine"], sampleAnswer: "deine" },
          { id: "l7_e3", type: "choice", prompt: "Wir wohnen in _____ Wohnung. (die Wohnung → Dativ)", options: ["unser", "unsere", "unserer"], answers: ["unserer"], sampleAnswer: "unserer" },
          { id: "l7_e4", type: "input", prompt: "«Mening akam yangi mashina sotib olyapti.» (kauft ein neues Auto)", hint: "Mein Bruder kauft ...", answers: ["mein bruder kauft ein neues auto", "mein bruder kauft ein neues auto."], sampleAnswer: "Mein Bruder kauft ein neues Auto." },
          { id: "l7_e5", type: "choice", prompt: "Ich helfe _____ Mutter. (Dativ)", options: ["meine", "meiner", "meinem"], answers: ["meiner"], sampleAnswer: "meiner" }
        ],
        words: [
          { id: "w7_1", art: "die", de: "Familie", plural: "die Familien", pron: "di familiye", uz: "oila" },
          { id: "w7_2", art: "die", de: "Eltern", plural: "(faqat ko'plik)", pron: "di eltern", uz: "ota-ona" },
          { id: "w7_3", art: "die", de: "Großeltern", plural: "(faqat ko'plik)", pron: "di gros-eltern", uz: "bobo va buvi" },
          { id: "w7_4", art: "der", de: "Sohn", plural: "die Söhne", pron: "der zon, di zyne", uz: "o'g'il (farzand)" },
          { id: "w7_5", art: "die", de: "Tochter", plural: "die Töchter", pron: "di toxter, di tyoxter", uz: "qiz (farzand)" },
          { id: "w7_6", art: "die", de: "Wohnung", plural: "die Wohnungen", pron: "di vonung", uz: "kvartira" },
          { id: "w7_7", art: "das", de: "Zimmer", plural: "die Zimmer", pron: "das tsimmer", uz: "xona" },
          { id: "w7_8", art: "der", de: "Tisch", plural: "die Tische", pron: "der tish", uz: "stol" },
          { id: "w7_9", art: "der", de: "Stuhl", plural: "die Stühle", pron: "der shtu:l, di shtyule", uz: "stul" },
          { id: "w7_10", art: "die", de: "Brille", plural: "die Brillen", pron: "di brille", uz: "ko'zoynak" },
          { id: "w7_11", art: "other", de: "neu", plural: "", pron: "noy", uz: "yangi" },
          { id: "w7_12", art: "other", de: "alt", plural: "", pron: "alt", uz: "eski / qari" },
          { id: "w7_13", art: "other", de: "groß / klein", plural: "", pron: "gros / klayn", uz: "katta / kichik" }
        ]
      },
      {
        id: 8, level: "A1.1",
        title: "Inkor (nicht va kein farqi) hamda «doch» javobi",
        summary: "Qachon kein va qachon nicht ishlatiladi? Inkor savolga ijobiy javob berishda «Doch!» qoidasi.",
        grammarPoints: [
          { heading: "kein — faqat noaniq/artiklsiz OTLAR uchun", text: "Ich habe ein Auto → Ich habe kein Auto. Ich habe Zeit → Ich habe keine Zeit. Ich trinke Kaffee → Ich trinke keinen Kaffee." },
          { heading: "nicht — FE'L, SIFAT, JOY va ANIQ/EGALIK artiklli otlar uchun", text: "Fe'l: Ich arbeite heute nicht. Sifat: Das Buch ist nicht teuer. Joy/Egalik: Das ist nicht mein Schlüssel. Inkor savolga tasdiq javobi: Doch!" }
        ],
        table: {
          headers: ["Nimani inkor qilamiz?", "So'z", "Misol"],
          rows: [
            ["Artiklsiz / ein ot", "kein / keine / keinen", "Ich habe kein Problem."],
            ["Fe'l (harakat)", "nicht (oxirida)", "Wir verstehen die Frage nicht."],
            ["Sifat / holat", "nicht (sifatdan oldin)", "Das Handy ist nicht billig."],
            ["Inkor savolga tasdiq", "Doch!", "Hast du keine Zeit? — Doch, ich habe Zeit!"]
          ]
        },
        commonMistakes: [
          { wrong: "Kommst du nicht? — Ja, ich komme!", right: "Kommst du nicht? — Doch, ich komme!", note: "Inkor savolga ijobiy javob berishda Ja emas, Doch ishlatiladi." },
          { wrong: "Das ist kein mein Buch.", right: "Das ist nicht mein Buch.", note: "Egalik olmoshi (mein) oldidan kein emas, nicht keladi." }
        ],
        dialogue: [
          { speaker: "Paul", de: "Trinkst du keinen Kaffee?", uz: "Sen qahva ichmaysanmi?" },
          { speaker: "Aziz", de: "Doch! Ich trinke gern Kaffee, aber heute habe ich keine Zeit.", uz: "Yo'g'-e, ichaman! Qahvani yaxshi ko'raman, lekin bugun vaqtim yo'q." }
        ],
        memoryTip: "O'zingizdan so'rang: gapda 'ein' bormi yoki bo'lishi mumkinmi? Ha bo'lsa → kein, yo'q bo'lsa → nicht!",
        examples: [
          { de: "Das Buch ist nicht teuer.", uz: "Kitob qimmat emas." },
          { de: "Ich verstehe das nicht.", uz: "Men buni tushunmayapman." },
          { de: "Kommst du nicht? — Doch, ich komme!", uz: "Kelmaysanmi? — Yo'g'-e, boraman!" }
        ],
        exercises: [
          { id: "l8_e1", type: "choice", prompt: "Ich habe _____ Problem. (das Problem)", options: ["kein", "nicht", "keine"], answers: ["kein"], sampleAnswer: "kein" },
          { id: "l8_e2", type: "choice", prompt: "Das Handy ist _____ billig. (sifat inkori)", options: ["nicht", "kein", "keine"], answers: ["nicht"], sampleAnswer: "nicht" },
          { id: "l8_e3", type: "choice", prompt: "Wir verstehen die Frage _____. (aniq artiklli ot / fe'l inkori)", options: ["nicht", "keine", "kein"], answers: ["nicht"], sampleAnswer: "nicht" },
          { id: "l8_e4", type: "choice", prompt: "«Hast du keine Zeit?» — «_____, ich habe Zeit!»", options: ["Doch", "Ja", "Nein"], answers: ["doch"], sampleAnswer: "Doch" },
          { id: "l8_e5", type: "input", prompt: "Leider habe ich heute _____ Zeit. (bo'sh o'rinni to'ldiring)", hint: "die Zeit → ...", answers: ["keine"], sampleAnswer: "keine" }
        ],
        words: [
          { id: "w8_1", art: "other", de: "teuer", plural: "", pron: "toyer", uz: "qimmat" },
          { id: "w8_2", art: "other", de: "billig", plural: "", pron: "billix", uz: "arzon" },
          { id: "w8_3", art: "other", de: "richtig", plural: "", pron: "rixtix", uz: "to'g'ri" },
          { id: "w8_4", art: "other", de: "falsch", plural: "", pron: "falsh", uz: "noto'g'ri, xato" },
          { id: "w8_5", art: "other", de: "schnell", plural: "", pron: "shnel", uz: "tez" },
          { id: "w8_6", art: "other", de: "langsam", plural: "", pron: "langzam", uz: "sekin" },
          { id: "w8_7", art: "other", de: "wichtig", plural: "", pron: "vixtix", uz: "muhim" },
          { id: "w8_8", art: "other", de: "schwer", plural: "", pron: "shve:r", uz: "qiyin / og'ir" },
          { id: "w8_9", art: "other", de: "leicht", plural: "", pron: "layxt", uz: "oson / yengil" },
          { id: "w8_10", art: "das", de: "Problem", plural: "die Probleme", pron: "das problem", uz: "muammo" },
          { id: "w8_11", art: "die", de: "Frage", plural: "die Fragen", pron: "di frage", uz: "savol" },
          { id: "w8_12", art: "die", de: "Antwort", plural: "die Antworten", pron: "di antvort", uz: "javob" },
          { id: "w8_13", art: "other", de: "doch", plural: "", pron: "dox", uz: "aksincha / yo'g'-e" },
          { id: "w8_14", art: "other", de: "leider", plural: "", pron: "layder", uz: "afsuski" }
        ]
      },
      {
        id: 9, level: "A1.1",
        title: "Qolgan modal fe'llar (wollen, möchten, dürfen, sollen)",
        summary: "Qat'iy xohish (wollen), muloyim xohish (möchten), ruxsat (dürfen) va maslahat/topshiriq (sollen) fe'llari.",
        grammarPoints: [
          { heading: "Har bir modal fe'lning ma'nosi", text: "wollen — qat'iy xohish; möchten — muloyim xohish (kafeda/do'konda); dürfen — ruxsat/taqiq; sollen — boshqa birovning maslahati yoki vazifasi." },
          { heading: "Gap tuzilishi", text: "ich va er/sie/es shakllari bir xil. Modal fe'l 2-o'rinda, asosiy fe'l (-en) gap oxirida turadi: Ich möchte heute Pizza essen." }
        ],
        table: {
          headers: ["Shaxs", "wollen", "möchten", "dürfen", "sollen"],
          rows: [
            ["ich", "will", "möchte", "darf", "soll"],
            ["du", "willst", "möchtest", "darfst", "sollst"],
            ["er / sie / es", "will", "möchte", "darf", "soll"],
            ["wir / sie / Sie", "wollen", "möchten", "dürfen", "sollen"],
            ["ihr", "wollt", "möchtet", "dürft", "sollt"]
          ]
        },
        commonMistakes: [
          { wrong: "Ich will einen Kaffee! (kafeda)", right: "Ich möchte einen Kaffee, bitte.", note: "Kafeda/restoranda wollen qo'pol eshitiladi, har doim möchten ishlating." },
          { wrong: "Er möchtet Pizza.", right: "Er möchte Pizza.", note: "möchten da ham ich = er/sie/es (möchte)." }
        ],
        dialogue: [
          { speaker: "Kellner", de: "Guten Tag! Was möchten Sie bestellen?", uz: "Xayrli kun! Nima buyurtma qilmoqchisiz?" },
          { speaker: "Gast", de: "Ich möchte einen Saft und ein Stück Kuchen, bitte.", uz: "Men bitta sharbat va bir bo'lak tort xohlardim, iltimos." },
          { speaker: "Gast", de: "Darf man hier fotografieren?", uz: "Bu yerda rasmga olsa maylimi?" },
          { speaker: "Kellner", de: "Ja, natürlich! Hier dürfen Sie fotografieren.", uz: "Ha, albatta! Bu yerda rasmga olish mumkin." }
        ],
        memoryTip: "Kafeda buyurtma = möchten; Qonun/ruxsat = dürfen; Shifokor/ustoz maslahati = sollen.",
        examples: [
          { de: "Ich möchte einen Kaffee, bitte.", uz: "Men bitta qahva xohlardim, iltimos." },
          { de: "Hier darf man nicht rauchen.", uz: "Bu yerda chekish mumkin emas." },
          { de: "Der Arzt sagt, ich soll viel Wasser trinken.", uz: "Shifokor ko'p suv ichishim kerakligini aytdi." }
        ],
        exercises: [
          { id: "l9_e1", type: "choice", prompt: "Ich _____ einen Saft bestellen. (muloyim xohish — möchten)", options: ["möchte", "möchtest", "möchten"], answers: ["möchte"], sampleAnswer: "möchte" },
          { id: "l9_e2", type: "choice", prompt: "_____ man hier fotografieren? (dürfen — 3-shaxs birlik)", options: ["Darf", "Darfst", "Dürfen"], answers: ["darf"], sampleAnswer: "Darf" },
          { id: "l9_e3", type: "choice", prompt: "Wir _____ im Sommer nach Deutschland fahren. (wollen)", options: ["will", "wollt", "wollen"], answers: ["wollen"], sampleAnswer: "wollen" },
          { id: "l9_e4", type: "input", prompt: "Ich möchte jetzt die Rechnung _____. (to'lamoq fe'lini yozing)", hint: "bezahlen", answers: ["bezahlen"], sampleAnswer: "bezahlen" },
          { id: "l9_e5", type: "input", prompt: "«Sen ko'p suv ichishing kerak.» (sollen bilan tarjima qiling)", hint: "Du sollst viel Wasser ...", answers: ["du sollst viel wasser trinken", "du sollst viel wasser trinken."], sampleAnswer: "Du sollst viel Wasser trinken." }
        ],
        words: [
          { id: "w9_1", art: "das", de: "Restaurant", plural: "die Restaurants", pron: "das restoron", uz: "restoran" },
          { id: "w9_2", art: "das", de: "Café", plural: "die Cafés", pron: "das kafe", uz: "kafe" },
          { id: "w9_3", art: "die", de: "Speisekarte", plural: "die Speisekarten", pron: "di shpayze-karte", uz: "menyu (taomnoma)" },
          { id: "w9_4", art: "die", de: "Rechnung", plural: "die Rechnungen", pron: "di rexnung", uz: "hisob (chek)" },
          { id: "w9_5", art: "das", de: "Essen", plural: "", pron: "das essen", uz: "ovqat / taom" },
          { id: "w9_6", art: "das", de: "Getränk", plural: "die Getränke", pron: "das getrenk", uz: "ichimlik" },
          { id: "w9_7", art: "der", de: "Saft", plural: "die Säfte", pron: "der zaft, di zefte", uz: "sharbat" },
          { id: "w9_8", art: "der", de: "Kuchen", plural: "die Kuchen", pron: "der kuxen", uz: "pirog / tort" },
          { id: "w9_9", art: "verb", de: "bestellen", plural: "er bestellt", pron: "beshtellen", uz: "buyurtma bermoq" },
          { id: "w9_10", art: "verb", de: "bezahlen", plural: "er bezahlt", pron: "betsalen", uz: "to'lamoq" },
          { id: "w9_11", art: "verb", de: "sitzen", plural: "er sitzt", pron: "zitsen", uz: "o'tirmoq" },
          { id: "w9_12", art: "verb", de: "rauchen", plural: "er raucht", pron: "rauxen", uz: "chekmoq" },
          { id: "w9_13", art: "verb", de: "fotografieren", plural: "er fotografiert", pron: "fotografiren", uz: "rasmga olmoq" },
          { id: "w9_14", art: "other", de: "viel", plural: "", pron: "fi:l", uz: "ko'p" }
        ]
      },
      {
        id: 10, level: "A1.1",
        title: "O'zak unlisi o'zgaradigan kuchli fe'llar (Vokalwechsel)",
        summary: "Faqat du va er/sie/es shaxslarida o'zak unlisi o'zgaradigan kuchli fe'llar: a → ä, e → i, e → ie.",
        grammarPoints: [
          { heading: "Faqat du va er/sie/es o'zgaradi!", text: "ich, wir, ihr, sie/Sie shaxslarida o'zak o'zgarmaydi. 3 ta guruh: a → ä (fahren → fährt), e → i (sprechen → spricht, nehmen → nimmt), e → ie (lesen → liest, sehen → sieht)." }
        ],
        table: {
          headers: ["Guruh", "Fe'l", "ich", "du", "er / sie / es"],
          rows: [
            ["a → ä", "fahren", "fahre", "fährst", "fährt"],
            ["a → ä", "schlafen", "schlafe", "schläfst", "schläft"],
            ["e → i", "sprechen", "spreche", "sprichst", "spricht"],
            ["e → i", "nehmen", "nehme", "nimmst", "nimmt"],
            ["e → ie", "lesen", "lese", "liest", "liest"],
            ["e → ie", "sehen", "sehe", "siehst", "sieht"]
          ]
        },
        commonMistakes: [
          { wrong: "Er fahrt nach Berlin.", right: "Er fährt nach Berlin.", note: "fahren da er/du shaxsida a → ä bo'ladi." },
          { wrong: "Wir liest eine Zeitung.", right: "Wir lesen eine Zeitung.", note: "wir shaxsida o'zak hech qachon o'zgarmaydi!" }
        ],
        dialogue: [
          { speaker: "Julia", de: "Fährst du oft mit dem Zug?", uz: "Tez-tez poyezdda yurasanmi?" },
          { speaker: "Bobur", de: "Ja, ich fahre jeden Monat. Im Zug lese ich oft ein Buch.", uz: "Ha, har oy boraman. Poyezdda tez-tez kitob o'qiyman." },
          { speaker: "Julia", de: "Mein Bruder schläft im Zug immer oder sieht einen Film.", uz: "Akam esa poyezdda doim uxlaydi yoki film ko'radi." }
        ],
        memoryTip: "Kuchli fe'lni yodlaganda doim 3-shaxsi bilan birga ayting: fahren–fährt, lesen–liest, nehmen–nimmt!",
        examples: [
          { de: "Mein Bruder fährt nach Samarkand.", uz: "Akam Samarqandga ketyapti." },
          { de: "Ich lese ein Buch, aber meine Schwester liest eine Zeitung.", uz: "Men kitob o'qiyapman, singlim esa gazeta o'qiyapti." }
        ],
        exercises: [
          { id: "l10_e1", type: "choice", prompt: "Er _____ jeden Tag eine Zeitung. (lesen)", options: ["lest", "liest", "lese"], answers: ["liest"], sampleAnswer: "liest" },
          { id: "l10_e2", type: "choice", prompt: "_____ du heute nach Taschkent? (fahren)", options: ["Fahrst", "Fährst", "Fährt"], answers: ["fährst"], sampleAnswer: "Fährst" },
          { id: "l10_e3", type: "choice", prompt: "Meine Mutter _____ ein Ticket am Bahnhof. (nehmen)", options: ["nehmt", "nimmt", "nimmst"], answers: ["nimmt"], sampleAnswer: "nimmt" },
          { id: "l10_e4", type: "choice", prompt: "Der Freund _____ oft Filme. (sehen)", options: ["seht", "sieht", "siehst"], answers: ["sieht"], sampleAnswer: "sieht" },
          { id: "l10_e5", type: "input", prompt: "Sie _____ jeden Tag einen Apfel. (essen fe'lini to'g'ri shaklda yozing)", hint: "isst", answers: ["isst"], sampleAnswer: "isst" }
        ],
        words: [
          { id: "w10_1", art: "verb", de: "fahren", plural: "du fährst, er fährt", pron: "faren", uz: "bormoq (transportda)" },
          { id: "w10_2", art: "verb", de: "lesen", plural: "du liest, er liest", pron: "lezen", uz: "o'qimoq" },
          { id: "w10_3", art: "verb", de: "sehen", plural: "du siehst, er sieht", pron: "zeyen", uz: "ko'rmoq" },
          { id: "w10_4", art: "verb", de: "nehmen", plural: "du nimmst, er nimmt", pron: "ney-men", uz: "olmoq" },
          { id: "w10_5", art: "verb", de: "geben", plural: "du gibst, er gibt", pron: "geben", uz: "bermoq" },
          { id: "w10_6", art: "verb", de: "treffen", plural: "du triffst, er trifft", pron: "treffen", uz: "uchratmoq / uchrashmoq" },
          { id: "w10_7", art: "verb", de: "vergessen", plural: "du vergisst, er vergisst", pron: "fergessen", uz: "unutmoq" },
          { id: "w10_8", art: "die", de: "Zeitung", plural: "die Zeitungen", pron: "di tsaytung", uz: "gazeta" },
          { id: "w10_9", art: "der", de: "Film", plural: "die Filme", pron: "der film", uz: "film" },
          { id: "w10_10", art: "das", de: "Ticket", plural: "die Tickets", pron: "das tiket", uz: "chipta (bilet)" },
          { id: "w10_11", art: "der", de: "Bahnhof", plural: "die Bahnhöfe", pron: "der ba:n-xof", uz: "vokzal" },
          { id: "w10_12", art: "der", de: "Flughafen", plural: "die Flughäfen", pron: "der flug-xafen", uz: "aeroport" },
          { id: "w10_13", art: "other", de: "jeden Tag", plural: "", pron: "yeden tak", uz: "har kuni" },
          { id: "w10_14", art: "other", de: "oft", plural: "", pron: "oft", uz: "tez-tez" }
        ]
      },
      {
        id: 11, level: "A1.2",
        title: "O'tgan zamon — Perfekt (1-qism: haben bilan)",
        summary: "Og'zaki nutqda eng ko'p ishlatiladigan o'tgan zamon: haben (2-o'rinda) + Partizip II (gap oxirida: ge- + o'zak + -t).",
        grammarPoints: [
          { heading: "To'g'ri fe'llardan Partizip II yasash", text: "ge- + fe'l o'zagi + -t: machen → gemacht, lernen → gelernt, kaufen → gekauft, spielen → gespielt. O'zak -t/-d bilan tugasa -et: arbeiten → gearbeitet." },
          { heading: "2 ta muhim istisno", text: "1) -ieren fe'llari ge- olmaydi: telefonieren → telefoniert, studieren → studiert. 2) Ajraladigan fe'llarda ge- o'rtada keladi: ein|kaufen → eingekauft." }
        ],
        table: {
          headers: ["Infinitiv", "Partizip II", "Talaffuzi", "Misol"],
          rows: [
            ["lernen", "gelernt", "[gelernt]", "Ich habe gestern Deutsch gelernt."],
            ["kaufen", "gekauft", "[gekauft]", "Wir haben ein Auto gekauft."],
            ["arbeiten", "gearbeitet", "[gearbaytet]", "Ich habe viel gearbeitet."],
            ["einkaufen", "eingekauft", "[ayngekauft]", "Sie hat im Supermarkt eingekauft."],
            ["telefonieren", "telefoniert", "[telefonirt]", "Er hat telefoniert."]
          ]
        },
        commonMistakes: [
          { wrong: "Ich habe getelefoniert.", right: "Ich habe telefoniert.", note: "-ieren bilan tugaydigan fe'llar hech qachon ge- olmaydi!" },
          { wrong: "Sie hat geeinkauft.", right: "Sie hat eingekauft.", note: "Ajraladigan fe'llarda ge- prefiksdan keyin o'rtada keladi." }
        ],
        dialogue: [
          { speaker: "Mark", de: "Was hast du am Wochenende gemacht?", uz: "Dam olish kunlari nima qilding?" },
          { speaker: "Umid", de: "Ich habe Deutsch gelernt und mit Freunden Fußball gespielt.", uz: "Men nemis tili o'rgandim va do'stlarim bilan futbol o'ynadim." },
          { speaker: "Mark", de: "Hast du schon für morgen eingekauft?", uz: "Ertaga uchun bozorlik qilib bo'ldingmi?" },
          { speaker: "Umid", de: "Noch nicht, ich mache das heute Abend.", uz: "Hali yo'q, buni bugun kechqurun qilaman." }
        ],
        memoryTip: "Perfekt ham sendvich: 2-o'rinda haben, gap oxirida ge-...-t!",
        examples: [
          { de: "Ich habe gestern Deutsch gelernt.", uz: "Men kecha nemis tili o'rgandim." },
          { de: "Wir haben ein Auto gekauft.", uz: "Biz mashina sotib oldik." },
          { de: "Meine Mutter hat gestern eingekauft.", uz: "Onam kecha bozorlik qildi." }
        ],
        exercises: [
          { id: "l11_e1", type: "choice", prompt: "Ich _____ gestern viel gearbeitet. (haben fe'li)", options: ["habe", "hast", "hat", "bin"], answers: ["habe"], sampleAnswer: "habe" },
          { id: "l11_e2", type: "input", prompt: "Wir haben am Wochenende Fußball _____. (spielen → Partizip II)", hint: "ge...t", answers: ["gespielt"], sampleAnswer: "gespielt" },
          { id: "l11_e3", type: "input", prompt: "Meine Mutter hat gestern im Supermarkt _____. (einkaufen → Partizip II)", hint: "ein...kauft", answers: ["eingekauft"], sampleAnswer: "eingekauft" },
          { id: "l11_e4", type: "choice", prompt: "Er _____ mit seinem Freund telefoniert. (haben fe'li)", options: ["habe", "hast", "hat", "ist"], answers: ["hat"], sampleAnswer: "hat" },
          { id: "l11_e5", type: "input", prompt: "«Men kecha yangi kitob sotib oldim.» (Ich habe gestern ein neues Buch ...)", hint: "gekauft", answers: ["gekauft", "ich habe gestern ein neues buch gekauft", "ich habe gestern ein neues buch gekauft."], sampleAnswer: "Ich habe gestern ein neues Buch gekauft." }
        ],
        words: [
          { id: "w11_1", art: "other", de: "gestern", plural: "", pron: "gestern", uz: "kecha" },
          { id: "w11_2", art: "other", de: "vorgestern", plural: "", pron: "forgestern", uz: "o'tgan kuni" },
          { id: "w11_3", art: "other", de: "letzte Woche", plural: "", pron: "letste voxe", uz: "o'tgan hafta" },
          { id: "w11_4", art: "other", de: "letztes Jahr", plural: "", pron: "letstes ya:r", uz: "o'tgan yili" },
          { id: "w11_5", art: "other", de: "schon", plural: "", pron: "shon", uz: "allaqachon" },
          { id: "w11_6", art: "other", de: "noch nicht", plural: "", pron: "nox nixt", uz: "hali ... yo'q" },
          { id: "w11_7", art: "die", de: "Woche", plural: "die Wochen", pron: "di voxe", uz: "hafta" },
          { id: "w11_8", art: "der", de: "Monat", plural: "die Monate", pron: "der monat", uz: "oy" },
          { id: "w11_9", art: "das", de: "Jahr", plural: "die Jahre", pron: "das ya:r", uz: "yil" },
          { id: "w11_10", art: "das", de: "Wochenende", plural: "die Wochenenden", pron: "das voxen-ende", uz: "dam olish kunlari" },
          { id: "w11_11", art: "verb", de: "spielen", plural: "hat gespielt", pron: "shpilen / geshpilt", uz: "o'ynamoq" },
          { id: "w11_12", art: "verb", de: "fragen", plural: "hat gefragt", pron: "fragen / gefrakt", uz: "so'ramoq" },
          { id: "w11_13", art: "verb", de: "telefonieren", plural: "hat telefoniert", pron: "telefoniren / telefonirt", uz: "telefonlashmoq" }
        ]
      },
      {
        id: 12, level: "A1.2",
        title: "O'tgan zamon — Perfekt (2-qism: sein bilan va kuchli fe'llar)",
        summary: "Joy o'zgarishi, holat o'zgarishi va 3 ta istisno fe'lda (sein, bleiben, passieren) sein yordamchi fe'li ishlatiladi. Kuchli fe'llar -en bilan tugaydi.",
        grammarPoints: [
          { heading: "Qachon sein ishlatiladi? (3 ta holat)", text: "1) Joy o'zgarishi: gehen (gegangen), fahren (gefahren), kommen (gekommen), fliegen (geflogen). 2) Holat o'zgarishi: aufstehen (aufgestanden), einschlafen (eingeschlafen). 3) Istisnolar: sein (gewesen), bleiben (geblieben), passieren (passiert)." },
          { heading: "Kuchli fe'llarning Partizip II shakli", text: "Kuchli fe'llar odatda -en bilan tugaydi: essen → hat gegessen, trinken → hat getrunken, lesen → hat gelesen, schreiben → hat geschrieben." }
        ],
        table: {
          headers: ["Fe'l", "Yordamchi fe'l", "Partizip II", "Misol"],
          rows: [
            ["gehen", "sein", "gegangen", "Er ist nach Hause gegangen."],
            ["fahren", "sein", "gefahren", "Ich bin nach Taschkent gefahren."],
            ["aufstehen", "sein", "aufgestanden", "Wann bist du aufgestanden?"],
            ["bleiben", "sein", "geblieben", "Wir sind zu Hause geblieben."],
            ["schreiben", "haben", "geschrieben", "Ich habe eine Nachricht geschrieben."]
          ]
        },
        commonMistakes: [
          { wrong: "Ich habe nach Taschkent gefahren.", right: "Ich bin nach Taschkent gefahren.", note: "fahren joy o'zgarishini bildirgani uchun sein (bin) bilan keladi." },
          { wrong: "Wir haben zu Hause geblieben.", right: "Wir sind zu Hause geblieben.", note: "bleiben (qolmoq) harakat bo'lmasa ham sein bilan keladigan 3 istisnodan biri!" }
        ],
        dialogue: [
          { speaker: "Nina", de: "Wo warst du im Urlaub? Bist du nach Berlin geflogen?", uz: "Ta'tilda qayerda eding? Berlinga uchdingmi?" },
          { speaker: "Siroj", de: "Nein, ich bin nach Samarkand gefahren und drei Tage dort geblieben.", uz: "Yo'q, Samarqandga bordim va uch kun u yerda qoldim." },
          { speaker: "Nina", de: "Schön! Hast du viele Fotos gemacht?", uz: "Ajoyib! Ko'p rasmga oldingmi?" }
        ],
        memoryTip: "A nuqtadan B nuqtaga harakat bormi? Ha → SEIN! Bundan tashqari 3 ta maxsus do'stni yodlang: sein, bleiben, passieren → doim SEIN!",
        examples: [
          { de: "Ich bin gestern nach Taschkent gefahren.", uz: "Men kecha Toshkentga bordim." },
          { de: "Wann bist du heute aufgestanden?", uz: "Bugun soat nechada turding?" },
          { de: "Wir haben ein gutes Buch gelesen.", uz: "Biz yaxshi kitob o'qidik." }
        ],
        exercises: [
          { id: "l12_e1", type: "choice", prompt: "Ich _____ gestern nach Samarkand gefahren. (habe yoki bin?)", options: ["bin", "habe", "ist"], answers: ["bin"], sampleAnswer: "bin" },
          { id: "l12_e2", type: "choice", prompt: "Wir _____ gestern Pizza gegessen. (haben yoki sind?)", options: ["haben", "sind", "hat"], answers: ["haben"], sampleAnswer: "haben" },
          { id: "l12_e3", type: "input", prompt: "Wann bist du heute _____? (aufstehen → Partizip II)", hint: "aufge...", answers: ["aufgestanden"], sampleAnswer: "aufgestanden" },
          { id: "l12_e4", type: "input", prompt: "Er ist am Wochenende zu Hause _____. (bleiben → Partizip II)", hint: "gebl...", answers: ["geblieben"], sampleAnswer: "geblieben" },
          { id: "l12_e5", type: "input", prompt: "Ich habe gestern meinem Freund eine Nachricht _____. (schreiben → Partizip II)", hint: "geschr...", answers: ["geschrieben"], sampleAnswer: "geschrieben" }
        ],
        words: [
          { id: "w12_1", art: "verb", de: "gehen", plural: "ist gegangen", pron: "geyen — ist gegangen", uz: "bormoq / ketmoq" },
          { id: "w12_2", art: "verb", de: "fliegen", plural: "ist geflogen", pron: "fligen — ist geflogen", uz: "uchmoq" },
          { id: "w12_3", art: "verb", de: "bleiben", plural: "ist geblieben", pron: "blayben — ist gebliben", uz: "qolmoq" },
          { id: "w12_4", art: "verb", de: "sein", plural: "ist gewesen", pron: "zayn — ist gevezen", uz: "bo'lmoq" },
          { id: "w12_5", art: "verb", de: "schreiben", plural: "hat geschrieben", pron: "shrayben — xat geshriben", uz: "yozmoq" },
          { id: "w12_6", art: "other", de: "zu Hause", plural: "", pron: "tsu xauze", uz: "uyda (joy)" },
          { id: "w12_7", art: "other", de: "nach Hause", plural: "", pron: "nax xauze", uz: "uyga (yo'nalish)" },
          { id: "w12_8", art: "der", de: "Urlaub", plural: "die Urlaube", pron: "der urlaub", uz: "ta'til" }
        ]
      }
    ];

    // =========================================================================
    // 2. HIGH-CAPACITY STORAGE ENGINE (IndexedDB + localStorage Fallback)
    //    Designed cleanly for 500+ lessons & 3,000+ words without 5MB limits
    // =========================================================================
    const DB_NAME = "DeutschB1ProDB";
    const DB_VERSION = 1;
    const STORE_NAME = "kv";
    const LEGACY_STORAGE_KEY = "deutsch_b1_platform_v1";
    function getLocalTodayStr(d = new Date()) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }
    let todayStr = getLocalTodayStr();

    let dbInstance = null;
    let usingIndexedDB = false;

    function openDB() {
      return new Promise((resolve) => {
        if (!("indexedDB" in window)) return resolve(null);
        try {
          const req = indexedDB.open(DB_NAME, DB_VERSION);
          req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              db.createObjectStore(STORE_NAME);
            }
          };
          req.onsuccess = (e) => {
            dbInstance = e.target.result;
            usingIndexedDB = true;
            resolve(dbInstance);
          };
          req.onerror = () => resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }

    function idbGet(key) {
      return new Promise((resolve) => {
        if (!dbInstance) return resolve(null);
        try {
          const tx = dbInstance.transaction(STORE_NAME, "readonly");
          const req = tx.objectStore(STORE_NAME).get(key);
          req.onsuccess = () => resolve(req.result ?? null);
          req.onerror = () => resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }

    function idbSet(key, val) {
      return new Promise((resolve) => {
        if (!dbInstance) return resolve(false);
        try {
          const tx = dbInstance.transaction(STORE_NAME, "readwrite");
          tx.objectStore(STORE_NAME).put(val, key);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    }

    function getDefaultState() {
      return {
        activeTab: "dashboard",
        selectedLessonId: 12,
        completedLessons: [],
        solvedExercises: {},
        masteredWords: [],
        favoriteWords: [],
        customLessons: [],
        customWords: [],
        customReadingTexts: [],
        customGoetheTasks: [],
        readingAnswers: {},
        listeningAnswers: {},
        writingDrafts: {},
        srsMap: {}, // { [wordId]: { interval: number, reps: number, nextDate: 'YYYY-MM-DD' } }
        cardReviews: {},
        timerRuns: {},
        studyStats: {},
        activityLog: {}, // { 'YYYY-MM-DD': { words: number, exercises: number } }
        planStartDate: todayStr,
        bestStreak: 0,
        lessonGrades: {}, // { [lessonId]: { score, total, pct, grade, date, attempts } }
        dailyBlocks: { date: todayStr, completed: [] },
        articleBestStreak: 0,
        speechRate: 1.0,
        soundEffects: true,
        studyAvatar: { walk: true, pranks: false, sound: true, reminders: true, time: "09:00", remindedOn: "" },
        themeMode: "system"
      };
    }

    let state = getDefaultState();
    let masteredSet = new Set();
    let favoriteSet = new Set();
    let completedLessonSet = new Set();

    function rebuildFastSets() {
      masteredSet = new Set(state.masteredWords);
      favoriteSet = new Set(state.favoriteWords);
      completedLessonSet = new Set(state.completedLessons);
    }

    let saveTimer = null;
    function writeState() {
      if (replacingProfile) return;
      clearTimeout(saveTimer);
      saveTimer = null;
      profileSync.update("state",state);
      return persistImportRecovery(state);
    }
    function saveState() {
      rebuildFastSets();
      clearTimeout(saveTimer);
      saveTimer = setTimeout(writeState,80);
    }

    // Recovery for the lesson-13 JSON previously sent through the CSV importer.
    // Match complete German/Uzbek fragments and the legacy import metadata.
    const lesson13ImportRows = new Map([
      [1,"\"id\": 13",""],
      [2,"\"level\": \"A1.2\"",""],
      [3,"\"title\": \"war va hatte (Präteritum: sein va haben)\"",""],
      [4,"\"summary\": \"O'tgan zamonda sein (war — edi/bo'ldi) va haben (hatte — bor edi) fe'llarining tuslanishi hamda kundalik nutqda qo'llanilishi.\"",""],
      [6,"\"Jonli nutqda sein va haben uchun Perfekt o'rniga deyarli doim Präteritum (war va hatte) ishlatiladi.\"",""],
      [7,"\"war (ich war","du warst"],
      [8,"\"hatte (ich hatte","du hattest"],
      [10,"]",""],
      [13,"\"wrong\": \"Ich bin gestern müde gewesen.\"",""],
      [14,"\"correct\": \"Ich war gestern müde.\"",""],
      [16,"}",""],
      [18,"\"wrong\": \"Ich hatte keine Bruder.\"",""],
      [19,"\"correct\": \"Ich hatte keinen Bruder.\"",""],
      [21,"}",""],
      [23,"\"wrong\": \"Wir war zu Hause.\"",""],
      [24,"\"correct\": \"Wir waren zu Hause.\"",""],
      [27,"]",""],
      [30,"\"speaker\": \"A\"",""],
      [31,"\"de\": \"Wo warst du gestern Abend? Ich habe dich angerufen.\"",""],
      [33,"}",""],
      [35,"\"speaker\": \"B\"",""],
      [36,"\"de\": \"Entschuldigung! Ich war im Zug und hatte kein Internet.\"",""],
      [38,"}",""],
      [40,"\"speaker\": \"A\"",""],
      [41,"\"de\": \"Kein Problem. War die Reise gut?\"",""],
      [43,"}",""],
      [45,"\"speaker\": \"B\"",""],
      [46,"\"de\": \"Ja","sie war super"],
      [47,"\"uz\": \"Ha","zo'r bo'ldi"],
      [49,"]",""],
      [50,"\"memoryTip\": \"ich va er/sie/es shakllari doimo bir xil (war / hatte). Perfektdagi kabi gap oxiriga ikkinchi fe'l qo'yish shart emas!\"",""],
      [53,"\"de\": \"Ich war gestern im Büro","aber ich hatte keine Zeit.\""],
      [54,"\"uz\": \"Men kecha ofisda edim","lekin vaqtim yo'q edi.\""],
      [55,"}",""],
      [57,"\"de\": \"Das Wetter war am Wochenende sehr schön.\"",""],
      [59,"}",""],
      [61,"\"de\": \"Wir hatten gestern ein wichtiges Meeting.\"",""],
      [64,"]",""],
      [66,"\"Ich _____ gestern leider krank. (war / hatte)\"",""],
      [67,"\"Wir _____ am Montag einen wichtigen Termin. (waren / hatten)\"",""],
      [68,"\"_____ ihr am Wochenende im Park? (wart / hattet)\"",""],
      [69,"\"Kecha ob-havo juda yaxshi edi. (Tarjima qiling)\"",""],
      [70,"\"Bizda kecha ko'p ish bor edi","shuning uchun charchagan edik. (Tarjima qiling)\""],
      [71,"]",""],
      [73,"{\"de\": \"das Büro\"","\"plural\": \"die Büros\""],
      [74,"{\"de\": \"die Pause\"","\"plural\": \"die Pausen\""],
      [75,"{\"de\": \"der Termin\"","\"plural\": \"die Termine\""],
      [76,"{\"de\": \"das Wetter\"","\"plural\": \"-\""],
      [77,"{\"de\": \"der Regen\"","\"plural\": \"-\""],
      [78,"{\"de\": \"die Sonne\"","\"plural\": \"-\""],
      [79,"{\"de\": \"das Glück\"","\"plural\": \"-\""],
      [80,"{\"de\": \"die Idee\"","\"plural\": \"die Ideen\""],
      [81,"{\"de\": \"der Kollege\"","\"plural\": \"die Kollegen\""],
      [82,"{\"de\": \"das Projekt\"","\"plural\": \"die Projekte\""],
      [83,"{\"de\": \"gesund\"","\"plural\": \"-\""],
      [84,"{\"de\": \"krank\"","\"plural\": \"-\""],
      [85,"{\"de\": \"pünktlich\"","\"plural\": \"-\""],
      [86,"{\"de\": \"danach\"","\"plural\": \"-\""],
      [87,"]",""],
      [89,"\"id\": \"rt_13\"",""],
      [90,"\"level\": \"A1.2\"",""],
      [91,"\"title\": \"Mein Tag gestern\"",""],
      [92,"\"de\": \"Gestern war ein langer","aber sehr schöner Tag für mich. Am Morgen war ich schon um sieben Uhr wach und hatte viel Energie. Zuerst habe ich ein gesundes Frühstück gemacht und einen starken Kaffee getrunken. Danach bin ich mit dem Bus ins Büro gefahren"],
      [93,"\"uz\": \"Kecha men uchun uzun","lekin juda chiroyli kun bo'ldi. Ertalab soat yettidayoq uyg'oq edim va menda kuch-quvvat ko'p edi. Avval foydali nonushta tayyorladim va achchiq qahva ichdim. Shundan so'ng avtobusda ofisga bordim"],
      [95,"{\"q\": \"Am Morgen hatte die Person keine Energie.\"","\"ans\": false}"],
      [96,"{\"q\": \"Das Wetter war kalt und es hat geregnet.\"","\"ans\": true}"],
      [97,"{\"q\": \"Am Abend hat die Familie zusammen gekocht.\"","\"ans\": true}"],
      [99,"}",""],
      [101,"\"level\": \"A1\"",""],
      [103,"\"title\": \"Nachricht an einen Freund\"",""],
      [104,"\"prompt\": \"Do'stingiz Tim sizni kecha kinoga taklif qilgan edi","lekin bora olmadingiz. Unga qisqa xabar yozing.\""],
      [106,"\"Nega kecha bora olmaganingizni ayting (war / hatte ishlating).\"",""],
      [107,"\"Kecha kechqurun nima qilganingizni yozing.\"",""],
      [109,"]",""],
      [110,"\"targetWords\": 40",""],
      [111,"\"sample\": \"Hallo Tim","es tut mir sehr leid! Ich war gestern leider krank und hatte starke Kopfschmerzen. Deshalb war ich den ganzen Tag zu Hause und habe viel geschlafen. Heute geht es mir wieder gut. Hast du morgen Zeit für einen Kaffee? Viele Grüße"],
      [112,"}",""],
      [114,"\"title\": \"Telefonnachricht von Lukas\"",""],
      [115,"\"transcript\": \"Hallo Lisa","hier ist Lukas. Ich war heute Morgen um neun Uhr beim Arzt"],
      [118,"\"q\": \"Wo war Lukas heute Morgen?\"",""],
      [119,"\"options\": [\"Im Büro\"","\"Beim Arzt\""],
      [121,"}",""],
      [123,"\"q\": \"Wann möchte Lukas sich mit Lisa treffen?\"",""],
      [124,"\"options\": [\"Um 9 Uhr\"","\"Am Nachmittag\""],
      [128,"}",""],
      [130,"\"title\": \"Mein letztes Wochenende\"",""],
      [131,"\"prompt\": \"O'tgan dam olish kunlarini qayerda va kim bilan o'tkazganingizni 3-4 gap bilan aytib bering.\"",""],
      [133,"{\"de\": \"Am Wochenende war ich ...\"","\"uz\": \"Dam olish kunlari men ... edim.\"}"],
      [134,"{\"de\": \"Das Wetter war sehr ...\"","\"uz\": \"Ob-havo juda ... edi.\"}"],
      [135,"{\"de\": \"Ich hatte viel / wenig Zeit für ...\"","\"uz\": \"Menda ... uchun ko'p / kam vaqt bor edi.\"}"],
      [136,"{\"de\": \"Es hat mir sehr gut gefallen.\"","\"uz\": \"Bu menga juda yoqdi.\"}"]
    ].map(([row, de, uz]) => [row, JSON.stringify([de, uz])]));
    const lesson13ImportFragments = new Set(lesson13ImportRows.values());

    function getLesson13ImportRows(words) {
      const candidates = words.flatMap((word, index) => {
        const id = word && /^bw_(\d+)_(\d+)$/.exec(word.id);
        if (!id || word.level !== "Import" || word.lessonId !== null
            || word.art !== "other" || word.plural !== "" || typeof word.de !== "string"
            || word.pron !== word.de.toLowerCase()) return [];
        const pair = JSON.stringify([word.de, word.uz]);
        if (!lesson13ImportFragments.has(pair)) return [];
        return [{ index, timestamp: Number(id[1]), row: Number(id[2]), pair,
          anchor: word.uz && word.de.length + word.uz.length >= 70 }];
      });
      const result = new Set();
      // One line of offset accounts for a pasted opening Markdown fence.
      for (const offset of [0, 1]) {
        const matches = candidates.filter(entry => lesson13ImportRows.get(entry.row - offset) === entry.pair);
        const anchors = matches.filter(entry => entry.anchor);
        for (const match of matches) {
          if (anchors.some(anchor => Math.abs(anchor.timestamp - match.timestamp) <= 100)) {
            result.add(match.index);
          }
        }
      }
      return result;
    }

    async function persistBrowserValue(key, value) {
      if (usingIndexedDB) return idbSet(key,value);
      try {
        localStorage.setItem(key === "app_state" ? LEGACY_STORAGE_KEY : key,JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    }

    function persistImportRecovery(nextState) {
      return persistBrowserValue("app_state",nextState);
    }

    function saveMovieSubtitles() {
      const subtitles = moviePlayer.subtitleProfile();
      profileSync.update("subtitles",subtitles);
      persistBrowserValue("movie_subtitles",subtitles);
      profileSync.flush();
    }

    async function removeAccidentalLesson13Import() {
      if (state.lesson13ImportRecovery || !Array.isArray(state.customWords)) return 0;
      const matches = getLesson13ImportRows(state.customWords);
      const entries = [];
      const keep = state.customWords.filter((word, index) => {
        if (!matches.has(index)) return true;
        entries.push({ index, word });
        return false;
      });
      if (!entries.length) return 0;

      // Preserve an ID if a different custom word happens to share it.
      const remainingIds = new Set(keep.map(word => word?.id));
      const removedIds = new Set(entries.map(({ word }) => word.id).filter(id => !remainingIds.has(id)));
      const srsMap = state.srsMap || {};
      const archived = {
        entries,
        masteredWords: state.masteredWords.filter(id => removedIds.has(id)),
        favoriteWords: state.favoriteWords.filter(id => removedIds.has(id)),
        srsMap: Object.fromEntries(Object.entries(srsMap).filter(([id]) => removedIds.has(id)))
      };
      const nextState = {
        ...state,
        customWords: keep,
        masteredWords: state.masteredWords.filter(id => !removedIds.has(id)),
        favoriteWords: state.favoriteWords.filter(id => !removedIds.has(id)),
        srsMap: Object.fromEntries(Object.entries(srsMap).filter(([id]) => !removedIds.has(id))),
        lesson13ImportRecovery: archived
      };
      // The archive and cleanup are saved together, before changing the view.
      if (!await persistImportRecovery(nextState)) return 0;
      state = nextState;
      return entries.length;
    }

    function currentProfile() {
      return {state,workspace,movie:moviePlayer.profileData(),captions:captionDisplay.profileData(),subtitles:moviePlayer.subtitleProfile()};
    }

    function applySharedProfile(profile) {
      if (profile.state && typeof profile.state === "object" && !Array.isArray(profile.state)) {
        state = {...getDefaultState(),...profile.state};
        delete state.darkMode;
        if (state.dailyBlocks?.date !== todayStr) state.dailyBlocks = {date:todayStr,completed:[]};
      }
      if (profile.workspace && typeof profile.workspace.positions === "object" && profile.workspace.positions) {
        workspace = profile.workspace;
        window.pomodoroLiquid?.restorePools(workspace.tomatoPools);
        cacheWorkspace();
      }
      if (profile.movie && typeof profile.movie === "object") moviePlayer.applyProfile(profile.movie);
      if (typeof profile.captions === "string") captionDisplay.applyProfile(profile.captions);
      if (profile.subtitles && typeof profile.subtitles === "object") {
        moviePlayer.applySubtitles(profile.subtitles);
        persistBrowserValue("movie_subtitles",moviePlayer.subtitleProfile());
      }
    }

    async function initStorage() {
      await openDB();
      let loaded = null;
      if (usingIndexedDB) {
        loaded = await idbGet("app_state");
      }
      if (!loaded) {
        try {
          const raw = localStorage.getItem(LEGACY_STORAGE_KEY);
          if (raw) loaded = JSON.parse(raw);
        } catch (e) {
          loaded = null;
        }
      }
      const local = {};
      if (loaded && typeof loaded === "object" && !Array.isArray(loaded)) local.state = loaded;
      if (workspace.ui) local.workspace = workspace;
      try {
        if (localStorage.getItem("deutsch-b1.movie.v1")) local.movie = moviePlayer.profileData();
        if (localStorage.getItem("deutsch-b1.caption-mode")) local.captions = captionDisplay.profileData();
      } catch {}
      const journalKey = "shared_profile_journal";
      const [journal,subtitles] = await Promise.all([journalKey,"movie_subtitles"].map(async key => {
        const saved = await idbGet(key);
        if (saved || usingIndexedDB) return saved;
        try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
      }));
      if (subtitles) local.subtitles = subtitles;
      const shared = await profileSync.start({...journal?.baseline,...local},journal,entry => persistBrowserValue(journalKey,entry));
      applySharedProfile(shared);
      if (profileSync.available && shared.state) await persistImportRecovery(state);
      profileSync.activate(currentProfile());
      const removedImportCount = await removeAccidentalLesson13Import();
      if (removedImportCount) writeState();
      restoreWorkspace();
      if (new URLSearchParams(location.search).has('movie') && (!workspace.activeTab || performance.getEntriesByType('navigation')[0]?.type === 'navigate')) state.activeTab = 'movie';
      rebuildFastSets();
      if (workspace.backupResume) {
        const {at,media} = workspace.backupResume;
        const timer = workspace.focusTimer;
        if (Number.isFinite(at) && timer?.run && Number.isFinite(timer.run.start) && Number.isFinite(timer.run.end)) {
          const run = timer.run, until = Math.max(run.start,Math.min(at,run.end));
          if (until > run.start) (state.timerRuns ??= {})[run.id] = {start:run.start,end:until,completed:false,...(timer.pomodoro ? {pomodoro:true} : {})};
          const now = Date.now(), remaining = run.end - until;
          timer.left = remaining;
          timer.run = {id:crypto.randomUUID(),start:now - (remaining ? 0 : 1),end:now + remaining};
        } else if (Number.isFinite(at) && timer?.rest) timer.rest.end = Date.now() + Math.max(0,timer.rest.end-at);
        if (state.activeTab === 'movie') moviePlayer.resumeHub(media);
        delete workspace.backupResume;
        writeWorkspace(); writeState();
      }
      restoreFocusTimer();
      studyStats.start();
      applyTheme();
      if (!workspace.ui) ui.wotdIndex = Math.floor(Math.random() * Math.max(1, getAllWords().length));
      render();
      finishInitialLoader();
      activateAvatar();
      if (removedImportCount) {
        showToast(`${removedImportCount} ta xato import yozuvi lug‘atdan olib tashlandi.`, "success");
      }
    }

    // Dynamic getters combining built-in + user/schedule-imported data
    function getAllLessons() {
      const byId = new Map();
      BUILTIN_LESSONS.forEach(l => byId.set(Number(l.id), l));
      (state.customLessons || []).forEach(l => byId.set(Number(l.id), l));
      return Array.from(byId.values()).sort((a, b) => Number(a.id) - Number(b.id));
    }

    function getAllWords() {
      const lessons = getAllLessons();
      const lessonWords = [];
      for (let i = 0; i < lessons.length; i++) {
        const l = lessons[i];
        const ws = l.words || [];
        for (let j = 0; j < ws.length; j++) {
          lessonWords.push({ ...ws[j], lessonId: l.id, level: l.level });
        }
      }
      return [...(state.customWords || []), ...lessonWords];
    }

    function getTotalExercises() {
      return getAllLessons().reduce((sum, l) => sum + (l.exercises ? l.exercises.length : 0), 0);
    }

    function getLessonDailyPack(lesson) {
      if (!lesson) return { readingText: null, goetheTasks: null };
      const builtinPack = DAILY_PACKS_BY_LESSON[Number(lesson.id)] || {};
      return {
        readingText: normalizeLessonReading(lesson.readingText, lesson.id, lesson.level, lesson.title) || builtinPack.readingText || null,
        goetheTasks: normalizeLessonGoethe(lesson.goetheTasks, lesson.id, lesson.level) || builtinPack.goetheTasks || null
      };
    }

    function getAllReadingTexts() {
      const fromLessons = getAllLessons()
        .map(l => {
          const p = getLessonDailyPack(l);
          return p.readingText ? { ...p.readingText, lessonDay: l.id } : null;
        })
        .filter(Boolean)
        .reverse();
      const seen = new Set(fromLessons.map(x => x.id));
      const extras = [...(state.customReadingTexts || []), ...BUILTIN_READING_TEXTS].filter(x => !seen.has(x.id));
      return [...fromLessons, ...extras];
    }

    function getGoetheTasksForLevel(level) {
      const base = BUILTIN_GOETHE_TASKS[level] || BUILTIN_GOETHE_TASKS.A1;
      const fromLessons = getAllLessons()
        .map(l => getLessonDailyPack(l).goetheTasks)
        .filter(t => t && t.level === level)
        .reverse();
      const custom = (state.customGoetheTasks || [])
        .map((pack, i) => normalizeLessonGoethe(pack, "archive-" + i, level))
        .filter(pack => pack?.level === level);
      const all = [...fromLessons, ...custom];
      return Object.fromEntries(["writing","listening","speaking"].map(skill => {
        const seen = new Set();
        const tasks = [...all.map(pack=>pack[skill]).filter(Boolean), ...base[skill]].filter(task => {
          const {id,...content} = task;
          const key = JSON.stringify(content);
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        return [skill,tasks];
      }));
    }

    function countWords(text) {
      return String(text || "").trim().split(/\s+/).filter(Boolean).length;
    }

    function addDaysStr(dateStr, days) {
      const d = new Date(dateStr + "T12:00:00");
      d.setDate(d.getDate() + days);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }

    function invalidatePracticeCaches() {
      ui.fcDeck = [];
      ui.fcFlipped = false;
      reconfigurePractice();
    }

    function validateBackupState(raw) {
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
      const def = getDefaultState();
      const safe = { ...def };
      if (!Object.keys(def).some(key => Object.hasOwn(raw,key))) return null;
      if (['dashboard','lessons','vocab','practice','grammar','goethe','movie','roadmap'].includes(raw.activeTab)) safe.activeTab = raw.activeTab;
      const arrayKeys = ["completedLessons", "masteredWords", "favoriteWords", "customLessons", "customWords", "customReadingTexts", "customGoetheTasks"];
      const objKeys = ["solvedExercises", "readingAnswers", "listeningAnswers", "writingDrafts", "srsMap", "activityLog", "studyStats", "lessonGrades", "cardReviews", "timerRuns"];
      for (const k of arrayKeys) {
        if (raw[k] !== undefined) {
          if (!Array.isArray(raw[k])) return null;
          safe[k] = raw[k];
        }
      }
      for (const k of objKeys) {
        if (raw[k] !== undefined) {
          if (!raw[k] || typeof raw[k] !== "object" || Array.isArray(raw[k])) return null;
          safe[k] = raw[k];
        }
      }
      const recovery = raw.lesson13ImportRecovery;
      if (recovery?.restored === true) {
        safe.lesson13ImportRecovery = { restored: true };
      } else if (recovery && Array.isArray(recovery.entries) && recovery.entries.every(entry =>
        Number.isInteger(entry?.index) && entry.index >= 0
        && lesson13ImportFragments.has(JSON.stringify([entry.word?.de, entry.word?.uz]))
      ) && Array.isArray(recovery.masteredWords) && Array.isArray(recovery.favoriteWords)
        && recovery.srsMap && typeof recovery.srsMap === "object") {
        safe.lesson13ImportRecovery = recovery;
      }
      if (typeof raw.selectedLessonId === "number") safe.selectedLessonId = raw.selectedLessonId;
      if (typeof raw.articleBestStreak === "number") safe.articleBestStreak = raw.articleBestStreak;
      if (typeof raw.bestStreak === "number") safe.bestStreak = raw.bestStreak;
      if (typeof raw.speechRate === "number") safe.speechRate = raw.speechRate;
      if (typeof raw.soundEffects === "boolean") safe.soundEffects = raw.soundEffects;
      safe.studyAvatar = avatarSettings(raw.studyAvatar);
      if (Object.hasOwn(themeLabels,raw.themeMode)) safe.themeMode = raw.themeMode;
      if (typeof raw.planStartDate === "string") safe.planStartDate = raw.planStartDate;
      if (raw.dailyBlocks && typeof raw.dailyBlocks === "object" && Array.isArray(raw.dailyBlocks.completed)) {
        safe.dailyBlocks = raw.dailyBlocks.date === getLocalTodayStr() ? raw.dailyBlocks : { date: getLocalTodayStr(), completed: [] };
      }
      return safe;
    }

    function computeGradeMeta(pct) {
      if (pct >= 90) return { grade: "A+", label: "A'lo", pill: "bg-emerald-100 text-emerald-800 border-emerald-200", bar: "bg-emerald-500", ring: "text-emerald-600", passed: true };
      if (pct >= 75) return { grade: "A", label: "Yaxshi", pill: "bg-blue-100 text-blue-800 border-blue-200", bar: "bg-blue-500", ring: "text-blue-600", passed: true };
      if (pct >= 60) return { grade: "B", label: "Qoniqarli", pill: "bg-amber-100 text-amber-800 border-amber-200", bar: "bg-amber-500", ring: "text-amber-600", passed: true };
      return { grade: "C", label: "Qayta o'qing", pill: "bg-rose-100 text-rose-800 border-rose-200", bar: "bg-rose-500", ring: "text-rose-600", passed: false };
    }

    function gradeBadgeHtml(gradeRec) {
      if (!gradeRec) {
        return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">Baholanmagan</span>`;
      }
      const meta = computeGradeMeta(gradeRec.pct);
      return `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${meta.pill}">${meta.grade} · ${gradeRec.pct}%</span>`;
    }

    function buildMasteryQuizForLesson(lesson) {
      const questions = [];
      const allWords = getAllWords();

      // 1) Take up to 2 choice exercises from the lesson itself
      const choiceExs = (lesson.exercises || []).filter(ex => ex.type === "choice" && ex.options && ex.options.length >= 2);
      choiceExs.slice(0, 2).forEach(ex => {
        const correctOpt = ex.options.find(o => checkExerciseAnswer(ex, o)) || ex.sampleAnswer;
        questions.push({
          tag: "Grammatika",
          prompt: ex.prompt,
          speak: "",
          options: [...ex.options],
          correctText: correctOpt,
          explain: `To'g'ri javob: ${correctOpt}`
        });
      });

      // 2) Take 1 reading comprehension question from that day's 100+ word text if available
      const pack = getLessonDailyPack(lesson);
      if (pack.readingText && pack.readingText.questions && pack.readingText.questions.length) {
        const rq = pack.readingText.questions[0];
        questions.push({
          tag: "Matn (Lesen)",
          prompt: `«${pack.readingText.title}» matni bo'yicha: "${rq.q}"`,
          speak: rq.q,
          options: ["Richtig (To'g'ri)", "Falsch (Noto'g'ri)"],
          correctText: rq.ans ? "Richtig (To'g'ri)" : "Falsch (Noto'g'ri)",
          explain: rq.ans ? "Matnga ko'ra bu gap to'g'ri (Richtig)." : "Matnga ko'ra bu gap noto'g'ri (Falsch)."
        });
      }

      // 3) Fill remaining up to 5 questions from this lesson's vocabulary
      const lessonWords = [...(lesson.words || [])].sort(() => Math.random() - 0.5);
      for (const w of lessonWords) {
        if (questions.length >= 5) break;
        const distractors = allWords
          .filter(x => x.id !== w.id && x.uz !== w.uz)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(x => x.uz);
        if (distractors.length < 3) continue;
        const opts = [w.uz, ...distractors].sort(() => Math.random() - 0.5);
        questions.push({
          tag: "Lug'at",
          prompt: `«${fullGermanWord(w)}» [${w.pron}] so'zining tarjimasi qaysi?`,
          speak: fullGermanWord(w),
          options: opts,
          correctText: w.uz,
          explain: `${fullGermanWord(w)} — ${w.uz}`
        });
      }
      return questions;
    }

    function openMasteryQuiz(lessonId) {
      const lesson = getAllLessons().find(l => Number(l.id) === Number(lessonId));
      if (!lesson) return;
      ui.mqLessonId = Number(lesson.id);
      ui.mqQuestions = buildMasteryQuizForLesson(lesson);
      ui.mqIndex = 0;
      ui.mqCorrect = 0;
      ui.mqAnswered = false;
      ui.mqLastOk = false;
      ui.mqLastPicked = null;
      ui.mqFinished = false;
      document.getElementById("mq-subtitle").textContent = `${lesson.id}-dars (${lesson.level}) · O'zlashtirish testi`;
      document.getElementById("mq-title").textContent = lesson.title;
      setModalOpen("mastery-quiz-modal", true);
      renderMasteryModalBody();
    }

    function renderMasteryModalBody() {
      const body = document.getElementById("mq-body");
      if (!body) return;
      const total = ui.mqQuestions.length;
      if (total === 0) {
        body.innerHTML = `<div class="text-sm text-slate-600 text-center py-6">Ushbu dars uchun test savollari topilmadi.</div>`;
        return;
      }

      if (ui.mqFinished) {
        const pct = Math.round((ui.mqCorrect / total) * 100);
        const meta = computeGradeMeta(pct);
        body.innerHTML = `
          <div class="text-center space-y-5 py-2">
            <div class="mx-auto w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center ${meta.pill}">
              <div class="text-2xl font-black">${meta.grade}</div>
              <div class="text-xs font-extrabold">${pct}%</div>
            </div>
            <div>
              <h4 class="text-xl font-extrabold text-slate-900">${meta.passed ? "Tabriklaymiz! Dars o'zlashtirildi" : "Yana bir oz takrorlash kerak"}</h4>
              <p class="text-sm text-slate-600 mt-1">${total} ta savoldan <strong>${ui.mqCorrect} tasiga</strong> to'g'ri javob berdingiz (${meta.label}).</p>
            </div>
            <div class="h-2.5 bg-slate-100 rounded-full overflow-hidden max-w-xs mx-auto">
              <div data-study-fill class="h-full ${meta.bar} rounded-full transition-all" style="width:${pct}%"></div>
            </div>
            <div class="flex items-center justify-center gap-3 pt-2">
              <button type="button" data-action="mq-retry" class="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700">Qayta topshirish</button>
              <button type="button" data-action="mq-done" class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold">Natijani saqlash va yopish</button>
            </div>
          </div>`;
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      const q = ui.mqQuestions[ui.mqIndex];
      const progPct = Math.round(((ui.mqIndex + (ui.mqAnswered ? 1 : 0)) / total) * 100);
      body.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between text-xs font-bold text-slate-500">
            <span class="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">${esc(q.tag)}</span>
            <span>Savol ${ui.mqIndex + 1} / ${total} · Ball: ${ui.mqCorrect}</span>
          </div>
          <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div data-study-fill class="h-full bg-amber-500 rounded-full transition-all duration-300" style="width:${progPct}%"></div>
          </div>

          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3">
            <div class="text-base font-bold text-slate-900 leading-snug">${esc(q.prompt)}</div>
            ${q.speak ? `<button type="button" data-speak="${esc(q.speak)}" aria-label="Tinglash" class="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 shrink-0"><i data-lucide="volume-2" class="w-4 h-4"></i></button>` : ''}
          </div>

          <div class="space-y-2.5">
            ${q.options.map((opt, idx) => {
              let cls = "bg-white border-slate-200 hover:border-slate-900 text-slate-800";
              if (ui.mqAnswered) {
                if (opt === q.correctText) cls = "bg-emerald-50 border-emerald-500 text-emerald-900";
                else if (idx === ui.mqLastPicked && !ui.mqLastOk) cls = "bg-rose-50 border-rose-500 text-rose-900";
                else cls = "bg-white border-slate-200 text-slate-400 opacity-70";
              }
              return `<button type="button" data-action="mq-pick" data-idx="${idx}" ${ui.mqAnswered ? 'disabled' : ''} class="w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-bold transition ${cls}">${esc(opt)}</button>`;
            }).join("")}
          </div>

          ${ui.mqAnswered ? `
            <div class="p-3.5 rounded-xl text-xs font-bold flex items-center justify-between gap-2 ${ui.mqLastOk ? 'anim-success-pop bg-emerald-50 text-emerald-800 border border-emerald-200' : 'anim-error-shake bg-rose-50 text-rose-800 border border-rose-200'}">
              <span>${ui.mqLastOk ? '✓ To‘g‘ri! ' : '✕ Xato. '}${esc(q.explain)}</span>
              <button type="button" data-action="mq-next" class="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold shrink-0">${ui.mqIndex + 1 < total ? 'Keyingi →' : 'Natijani ko‘rish'}</button>
            </div>
          ` : ''}
        </div>`;
      if (window.lucide) window.lucide.createIcons();
    }


    function recordDailyActivity(kind, amount = 1) {
      if (!state.activityLog) state.activityLog = {};
      if (!state.activityLog[todayStr]) state.activityLog[todayStr] = { words: 0, exercises: 0 };
      if (kind === "word") state.activityLog[todayStr].words += amount;
      else state.activityLog[todayStr].exercises += amount;
      const st = studyStats.streaks();
      if (st.current > (state.bestStreak || 0)) state.bestStreak = st.current;
      saveState();
    }

    function getDueSrsWords() {
      const srs = state.srsMap || {};
      return getAllWords().filter(w => {
        const rec = srs[w.id];
        if (!rec) return true; // New words are due immediately
        return rec.nextDate <= todayStr;
      });
    }

    function getSrsStats() {
      const all = getAllWords();
      const srs = state.srsMap || {};
      let due = 0, learning = 0, strong = 0;
      all.forEach(w => {
        const r = srs[w.id];
        if (!r || r.nextDate <= todayStr) due += 1;
        else if (r.interval >= 14) strong += 1;
        else learning += 1;
      });
      return { due, learning, strong, total: all.length };
    }

    let progressChartInstance = null;
    function studyWeekDates() {
      return Array.from({length:7},(_,index)=>addDaysStr(getLocalTodayStr(),index-6));
    }

    function refreshStudyChart() {
      if (!progressChartInstance || state.activeTab !== "dashboard") return;
      const dates = studyWeekDates();
      const values = dates.map(studyStats.totals);
      progressChartInstance.data.labels = dates.map(date=>date.slice(8) + "." + date.slice(5,7));
      progressChartInstance.data.datasets[0].data = values.map(day=>day.correct);
      progressChartInstance.data.datasets[1].data = values.map(day=>day.wrong);
      progressChartInstance.data.datasets[2].data = values.map(day=>day.ms / 60000);
      progressChartInstance.update("none");
    }

    function renderDashboardChart() {
      const canvas = document.getElementById("progress-activity-chart");
      if (!canvas || typeof Chart === "undefined") return;
      if (progressChartInstance) {
        progressChartInstance.destroy();
        progressChartInstance = null;
      }
      const dates = studyWeekDates();
      const isDark = document.documentElement.classList.contains("dark");
      const tickColor = isDark ? "#94a3b8" : "#64748b";
      const gridColor = isDark ? "rgba(148,163,184,0.12)" : "rgba(148,163,184,0.2)";

      progressChartInstance = new Chart(canvas.getContext("2d"), {
        type: "bar",
        data: {
          labels: dates.map(date => date.slice(8) + "." + date.slice(5,7)),
          datasets: [
            {label:"To‘g‘ri", data:dates.map(date=>studyStats.totals(date).correct), backgroundColor:"#10b981", borderRadius:5},
            {label:"Xato", data:dates.map(date=>studyStats.totals(date).wrong), backgroundColor:"#fb7185", borderRadius:5},
            {type:"line", label:"Faol vaqt (daq.)", yAxisID:"time", data:dates.map(date=>studyStats.totals(date).ms / 60000),
              borderColor:isDark ? "#93c5fd" : "#2563eb", backgroundColor:isDark ? "#93c5fd" : "#2563eb", tension:.25}
          ]
        },
        options: {
          animation: motionPreference.matches ? false : { duration: 420, easing: "easeOutQuart" },
          responsive: true,
          maintainAspectRatio: false,
          interaction: {mode:"index",intersect:false},
          onClick: (_event,points) => {
            const date = studyWeekDates()[points[0]?.index];
            if (date) {
              studyStats.select("study-day",{date});
              document.getElementById("study-report").scrollIntoView({block:"start",behavior:motionPreference.matches ? "instant" : "smooth"});
            }
          },
          plugins: {
            tooltip:{callbacks:{label: context => context.dataset.yAxisID === "time" ? `Faol vaqt ${context.raw.toFixed(1)} daq.` : `${context.dataset.label} ${context.raw}`}},
            legend: {
              position: "bottom",
              labels: { color: tickColor, boxWidth: 12, font: { size: 11, weight: "600" } }
            }
          },
          scales: {
            x: { ticks: { color: tickColor, font: { size: 11 } }, grid: { display: false } },
            y: { beginAtZero: true, ticks: { stepSize: 2, color: tickColor, font: { size: 11 } }, grid: { color: gridColor } },
            time: {position:"right",beginAtZero:true,suggestedMax:1,ticks:{color:tickColor,maxTicksLimit:5,callback:value=>value+" daq."},
              grid:{drawOnChartArea:false}}
          }
        }
      });
    }

    function hasPracticeArticle(word) {
      return ["der","die","das"].includes(word?.art);
    }

    // =========================================================================
    // 3. EPHEMERAL UI STATE (WITH PAGINATION FOR 3000+ WORDS & 500+ LESSONS)
    // =========================================================================
    let ui = {
      // Lessons pagination & filtering
      lessonSearch: "",
      lessonLevel: "all",
      lessonPage: 1,
      lessonSubTab: "grammar", // grammar | exercises | reading | goethe | vocab
      dayGoetheSkill: "writing",
      lessonsPerPage: 25,
      // Vocab pagination & filtering
      vocabSearch: "",
      vocabLesson: "all",
      vocabType: "all",
      vocabStatus: "all",
      vocabSort: "default",
      vocabPage: 1,
      vocabPerPage: 36,
      // Dashboard / Practice / Timer
      wotdIndex: 0,
      studyCalendarDay: "",
      studyCalendarScope: "day",
      practiceMode: "flashcards",
      practiceFiltersOpen: false,
      fcFilter: "all",
      fcLevel: "all",
      fcDifficulty: "all",
      fcOrder: "random",
      practiceOrderVersion: 1,
      fcDirection: "de-uz",
      fcIndex: 0,
      fcFlipped: false,
      fcDeck: [],
      artStreak: 0,
      artTotal: 0,
      artCorrect: 0,
      artCurrent: null,
      artFeedback: null,
      timerBlockId: "b1",
      timerSecondsLeft: 30 * 60,
      timerRunning: false,

      syncTab: "schedule",
      goetheSubTab: "texts", // texts | exam
      goetheLevel: "A1",
      goetheSkill: "writing", // writing | listening | speaking
      selectedTextId: "rt_1",
      showTextTranslation: false,
      showLessonTranslation: false,
      showWritingSample: {},
      showListeningTranscript: {},
      listeningPlays: {},
      speakSecLeft: 120,
      speakRunning: false,
      speakInterval: null,
      // Grammar Hub state
      grammarTab: "cases", // cases | verbs | articles | syntax | nuances
      grammarCase: "Akkusativ",
      grammarVerbQuery: "",
      grammarSyntaxId: "main",
      gameLevel: "all",
      gameDifficulty: "all",
      gameSource: "all",
      gameMisses: [],
      practiceCycles: {},
      matchSize: "6",
      matchRight: [],
      matchFeedback: null,
      spellMode: "translate",
      spellHint: false,
      quizDirection: "de-uz",
      // Extra vocab memorization techniques
      matchPairs: [],
      matchSelectedDe: null,
      matchSelectedUz: null,
      matchMatchedIds: [],
      matchMistakes: 0,
      spellCurrent: null,
      spellInput: "",
      spellFeedback: null,
      spellStreak: 0,
      quizCurrent: null,
      quizOptions: [],
      quizFeedback: null,
      quizStreak: 0,
      // SRS state
      srsFlipped: false,
      srsSessionReviewed: 0,
      // Sentence builder state
      sbIndex: 0,
      sbBank: [],
      sbSelected: [],
      sbFeedback: null,
      sbStreak: 0,
      // Mastery Q&A Quiz state
      mqLessonId: null,
      mqQuestions: [],
      mqIndex: 0,
      mqCorrect: 0,
      mqAnswered: false,
      mqLastOk: false,
      mqLastPicked: null,
      mqFinished: false
    };

    const workspaceKey = "deutsch-b1.workspace.v1";
    const runtimeUIKeys = new Set(["speakInterval","timerRunning","timerSecondsLeft","speakRunning",
      "mqLessonId","mqQuestions","mqIndex","mqCorrect","mqAnswered","mqLastOk","mqLastPicked","mqFinished"]);
    let workspace = {positions:{}}, currentPlace = "", restoringPlace = false, workspaceTimer, restoreFrame, resizeRestore, resizeDeadline;
    try {
      const value = JSON.parse(localStorage.getItem(workspaceKey));
      if (value && typeof value === "object" && value.positions) workspace = value;
    } catch {}
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    function placeKey() {
      const sections = {
        lessons:[state.selectedLessonId,ui.lessonSubTab,ui.dayGoetheSkill],
        practice:[ui.practiceMode], grammar:[ui.grammarTab,ui.grammarCase,ui.grammarSyntaxId],
        goethe:[ui.goetheSubTab,ui.goetheLevel,ui.goetheSkill,ui.selectedTextId]
      };
      return [state.activeTab,...(sections[state.activeTab] || [])].join(":");
    }
    function capturePlace() {
      if (!currentPlace) return;
      const root = document.getElementById("app-root");
      const inner = [...root.querySelectorAll("[data-study-scroll]")].map(node => {
        const pos = {id:node.id, top:node.scrollTop, left:node.scrollLeft};
        if (node.hasAttribute('data-list-key')) {
          (workspace.sharedLists ||= {})[node.id] = {...pos, key:node.dataset.listKey};
        }
        return pos;
      });
      if (restoringPlace) return;
      workspace.positions[currentPlace] = {top:scrollY, inner};
    }
    document.addEventListener('media-hub-mode', event => { workspace.mediaMode = event.detail; writeWorkspace(); });
    function rememberWorkspace() {
      if (!currentPlace) return;
      const values = {};
      for (const [key,value] of Object.entries(ui)) {
        if (runtimeUIKeys.has(key)) continue;
        values[key] = key === "fcDeck" ? value.map(w=>w.id) : value;
      }
      workspace.ui = values;
      workspace.activeTab = state.activeTab;
      workspace.selectedLessonId = state.selectedLessonId;
      writeWorkspace();
    }
    function cacheWorkspace() {
      try { localStorage.setItem(workspaceKey,JSON.stringify(workspace)); } catch {}
    }
    function writeWorkspace() {
      if (replacingProfile) return;
      cacheWorkspace();
      profileSync.update("workspace",workspace);
    }
    function restoreWorkspace() {
      const snapshot = workspace.ui;
      if (snapshot && typeof snapshot === "object") {
        for (const [key,value] of Object.entries(snapshot)) {
          if (!(key in ui) || runtimeUIKeys.has(key) || key === "fcDeck") continue;
          const initial = ui[key];
          if (initial === null || typeof value === typeof initial) ui[key] = value;
        }
        if (!snapshot.practiceCycles) {
          // Older sessions kept separate filters and cached questions for these games.
          for (const key of ["artCurrent","artFeedback","quizCurrent","quizFeedback","spellCurrent","spellFeedback"]) ui[key] = null;
          ui.matchPairs = [];
        }
        if (!snapshot.quizDirection && snapshot.quizReverse) ui.quizDirection = "uz-de";
        const words = new Map(getAllWords().map(w=>[w.id,w]));
        ui.fcDeck = Array.isArray(snapshot.fcDeck) ? snapshot.fcDeck.map(id=>words.get(id)).filter(Boolean) : [];
        ui.fcIndex = Math.max(0,Math.min(Number(ui.fcIndex) || 0,ui.fcDeck.length-1));
        if (!snapshot.practiceOrderVersion && snapshot.fcOrder !== "random") {
          ui.fcOrder = "random";
          resetFlashcards();
        }
      }
      if (["dashboard","lessons","vocab","practice","grammar","goethe","movie","roadmap"].includes(workspace.activeTab))
        state.activeTab = workspace.activeTab;
      if (getAllLessons().some(l=>Number(l.id)===Number(workspace.selectedLessonId)))
        state.selectedLessonId = workspace.selectedLessonId;

    }
    function restorePlace(liveTop, liveInner) {
      const key = placeKey(), changed = key !== currentPlace;
      currentPlace = key;
      const position = workspace.positions[key];
      // Sidebars belong to their list, not the selected detail. Restore synchronously
      // so rapid selections never capture the temporary zero of a newly rendered node.
      for (const node of document.querySelectorAll('#app-root [data-study-scroll]')) {
        let offset = (!changed && liveInner?.get(node.id)) || position?.inner?.find(i => i.id === node.id);
        if (node.hasAttribute('data-list-key')) {
          const shared = workspace.sharedLists?.[node.id] || (node.id === 'lesson-list-scroll' && workspace.lessonList);
          if (shared) offset = shared.key === node.dataset.listKey ? shared : null;
        }
        node.scrollTop = offset?.top || 0;
        node.scrollLeft = offset?.left || 0;
      }
      if (!changed && state.activeTab === "movie") return;
      cancelAnimationFrame(restoreFrame);
      resizeRestore?.disconnect();
      clearTimeout(resizeDeadline);
      restoringPlace = true;
      const finish = () => {
        resizeRestore?.disconnect();
        clearTimeout(resizeDeadline);
        restoreFrame = requestAnimationFrame(() => { restoringPlace = false; });
      };
      restoreFrame = requestAnimationFrame(() => {
        if (!changed && liveTop == null) { finish(); return; }
        const top = liveTop ?? position?.top ?? 0;
        if (state.activeTab === "practice") {
          holdPracticeScroll(top);
          finish();
          return;
        }
        const move = () => window.scrollTo({top,behavior:"instant"});
        if (Math.abs(scrollY - top) > 1) move();
        if (state.activeTab !== "movie" || scrollY + 1 >= top || !("ResizeObserver" in window)) {
          finish();
          return;
        }
        // The movie list and player are mounted after the catalog arrives.
        resizeRestore = new ResizeObserver(() => {
          move();
          if (scrollY + 1 >= top) finish();
        });
        resizeRestore.observe(document.getElementById("app-root"));
        resizeDeadline = setTimeout(finish,2000);
      });
    }
    document.addEventListener("scroll", () => {
      if (restoringPlace) return;
      clearTimeout(workspaceTimer);
      workspaceTimer = setTimeout(() => { capturePlace(); rememberWorkspace(); },180);
    },true);
    function flushWorkspace() {
      capturePlace();
      rememberWorkspace();
      if (saveTimer !== null) writeState();
      queueMicrotask(() => profileSync.flush());
    }
    window.addEventListener("pagehide",flushWorkspace);
    document.addEventListener("visibilitychange",()=> { if (document.hidden) flushWorkspace(); });
    document.addEventListener("input",event => {
      if (event.target.id === "vocab-search-input") ui.vocabSearch = event.target.value;
      if (event.target.id === "lesson-search-input") ui.lessonSearch = event.target.value;
      rememberWorkspace();
    });
    document.addEventListener("click",()=>queueMicrotask(rememberWorkspace));
    document.addEventListener("change",()=>queueMicrotask(rememberWorkspace));

    // =========================================================================
    // 4. SPEECH SYNTHESIS (DE-DE), DIALOGUE PLAYER, CHIME, THEME & TOASTS
    // =========================================================================
    // DEUTSCH MOTION — JS START
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let scrollRevealObserver = null;
    let progressAnimation = null;
    const seenMotionSections = new Set();
    const modalCloseTimers = new Map();
    let modalReturnFocus = null;
    let previousBodyOverflow = '';
    let menuCloseTimer = null;

    function initScrollReveals() {
      if (scrollRevealObserver) scrollRevealObserver.disconnect();
      if (state.activeTab === "practice") return;
      const root = document.getElementById('app-root');
      const sections = root.querySelectorAll('section, .reveal-on-scroll');
      sections.forEach(el => el.classList.add('reveal-on-scroll'));
      if (motionPreference.matches || !('IntersectionObserver' in window)) {
        sections.forEach(el => el.classList.remove('motion-pending'));
        return;
      }
      scrollRevealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove('motion-pending');
          seenMotionSections.add(entry.target.dataset.motionKey);
          scrollRevealObserver.unobserve(entry.target);
        });
      }, { threshold: 0, rootMargin: '0px 0px -16px 0px' });
      sections.forEach((el, index) => {
        const key = `${state.activeTab}:${index}`;
        el.dataset.motionKey = key;
        // Newly rendered content already above the fold must never disappear.
        if (seenMotionSections.has(key) || el.getBoundingClientRect().top < innerHeight - 16) {
          seenMotionSections.add(key);
          return;
        }
        el.classList.add('motion-pending');
        scrollRevealObserver.observe(el);
      });
    }

    function scrollToPageTop() {
      if (restoringPlace && workspace.positions[currentPlace]) return;
      window.scrollTo({ top: 0, behavior: motionPreference.matches ? 'instant' : 'smooth' });
    }

    function flashProgressBar() {
      const bar = document.getElementById('top-progress-bar');
      if (progressAnimation) progressAnimation.cancel();
      if (motionPreference.matches || !bar.animate) return;
      progressAnimation = bar.animate([
        { transform: 'scaleX(0)', opacity: 1, offset: 0 },
        { transform: 'scaleX(.65)', opacity: 1, offset: .4 },
        { transform: 'scaleX(1)', opacity: 1, offset: .72 },
        { transform: 'scaleX(1)', opacity: 0, offset: 1 }
      ], { duration: 480, easing: 'ease-out' });
    }

    function finishInitialLoader() {
      document.getElementById('loader-bar-fill').style.transform = 'scaleX(1)';
      document.getElementById('loader-status').textContent = 'Tayyor! Guten Tag!';
      const loader = document.getElementById('app-loader');
      loader.classList.add('hidden-loader');
      loader.setAttribute('aria-hidden', 'true');
      loader.inert = true;
      document.getElementById('app-root').setAttribute('aria-busy', 'false');
      // Stop the shimmer after boot, including while the tab is in the background.
      window.setTimeout(() => { loader.hidden = true; }, motionPreference.matches ? 0 : 380);
    }

    function setMobileMenuOpen(open) {
      const menu = document.getElementById('mobile-menu');
      const button = document.getElementById('mobile-menu-btn');
      if ((button.getAttribute('aria-expanded') === 'true') !== open) requestInterfaceCue(open ? 'open' : 'close');
      clearTimeout(menuCloseTimer);
      menu.classList.remove('motion-closing');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Menyuni yopish' : 'Menyuni ochish');
      if (!open && menu.contains(document.activeElement)) button.focus({preventScroll:true});
      menu.inert = !open;
      if (open) menu.classList.remove('hidden');
      else if (motionPreference.matches || menu.classList.contains('hidden')) menu.classList.add('hidden');
      else {
        menu.classList.add('motion-closing');
        menuCloseTimer = setTimeout(() => {
          menu.classList.add('hidden');
          menu.classList.remove('motion-closing');
        }, 310);
      }
    }

    function getOpenModal() {
      return document.querySelector('[role="dialog"]:not(.hidden):not(.motion-closing)');
    }
    function syncModalBackground() {
      const open = !!getOpenModal();
      document.querySelectorAll('header, main, footer').forEach(el => { el.inert = open; });
      document.body.style.overflow = open ? 'hidden' : previousBodyOverflow;
      if (avatarRoot.inert !== open) {
        avatarRoot.inert = open;
        queueAvatarRoute(850);
      }
    }
    function setModalOpen(id, open) {
      const modal = document.getElementById(id);
      const wasOpen = !modal.classList.contains('hidden') && !modal.classList.contains('motion-closing');
      clearTimeout(modalCloseTimers.get(id));
      modalCloseTimers.delete(id);
      if (open) {
        if (!getOpenModal() && !modalReturnFocus) {
          modalReturnFocus = document.activeElement;
          previousBodyOverflow = document.body.style.overflow;
        }
        const returnFocus = modalReturnFocus;
        document.querySelectorAll('[role="dialog"]').forEach(other => {
          if (other !== modal && !other.classList.contains('hidden')) setModalOpen(other.id, false);
        });
        modalReturnFocus = returnFocus;
        if (!wasOpen) requestInterfaceCue('open');
        modal.classList.remove('hidden', 'motion-closing');
        modal.inert = false;
        modal.removeAttribute('aria-hidden');
        const title = modal.querySelector('h2, h3');
        if (title) {
          title.id ||= `${id}-heading`;
          modal.setAttribute('aria-labelledby', title.id);
        } else modal.setAttribute('aria-label', 'Tezkor qidiruv');
        syncModalBackground();
        const focusTarget = modal.querySelector('input, button, select, textarea, [tabindex="0"]');
        if (focusTarget) focusTarget.focus({ preventScroll: true });
        return;
      }
      if (modal.classList.contains('hidden')) return;
      if (wasOpen) requestInterfaceCue('close');
      if (modal.contains(document.activeElement)) document.activeElement.blur();
      modal.inert = true;
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.add('motion-closing');
      syncModalBackground();
      if (!getOpenModal() && modalReturnFocus) {
        if (modalReturnFocus.isConnected) modalReturnFocus.focus({ preventScroll: true });
        modalReturnFocus = null;
      }
      const finish = () => {
        modal.classList.add('hidden');
        modal.classList.remove('motion-closing');
        modalCloseTimers.delete(id);
      };
      if (motionPreference.matches) finish();
      else modalCloseTimers.set(id, setTimeout(finish, 310));
    }

    function animateFeedback(element, ok) {
      if (!element || motionPreference.matches) return;
      const name = ok ? 'anim-success-pop' : 'anim-error-shake';
      element.classList.remove('anim-success-pop', 'anim-error-shake');
      // A frame boundary restarts feedback without forced synchronous layout.
      requestAnimationFrame(() => {
        if (element.isConnected) element.classList.add(name);
      });
    }

    function flipPracticeCard(mode) {
      const isSrs = mode === 'srs';
      const key = isSrs ? 'srsFlipped' : 'fcFlipped';
      const card = document.querySelector(`[data-action="${isSrs ? 'srs' : 'fc'}-flip"] .flip-card-inner`);
      if (!card) return;
      clearAvatarPrank();
      const flipped = !card.classList.contains('flipped');
      ui[key] = flipped;
      requestInterfaceCue('flip');
      showPracticeFace(card, flipped);
      if (isSrs) {
        const panel = card.closest(".practice-panel");
        panel.querySelector('[data-action="srs-flip-button"]').setAttribute("aria-pressed",String(flipped));
        panel.querySelectorAll('[data-action="srs-rate"]').forEach(button=>{ button.disabled = !flipped; });
      } else {
        const study = card.closest(".card-study");
        study.querySelector('[data-action="fc-flip-button"]').setAttribute("aria-pressed",String(flipped));
        study.querySelectorAll('[data-action="fc-rate"]').forEach(button=>{ button.disabled = !flipped; });
        const listen = study.querySelector('.card-listen');
        listen.hidden = !flipped && listen.hasAttribute('data-reveal-only');
      }
      rememberWorkspace();
    }

    function showPracticeFace(card, flipped) {
      card.classList.toggle('flipped', flipped);
      const back = card.querySelector('.flip-back');
      const front = card.querySelector('.flip-face:not(.flip-back)');
      front.inert = flipped; back.inert = !flipped;
      front.setAttribute('aria-hidden', String(flipped));
      back.setAttribute('aria-hidden', String(!flipped));
      // Preserve the same DOM node so the CSS rotation can interpolate.
    }

    function prepareViewMotion(viewChanged) {
      const root = document.getElementById('app-root');
      if (viewChanged && !motionPreference.matches) {
        root.firstElementChild?.classList.add('motion-view-enter');
        flashProgressBar();
      }
      root.querySelectorAll('.stagger-grid > *').forEach((el, i) => {
        el.style.setProperty('--motion-order', Math.min(i, 5));
      });
      root.querySelectorAll('.flip-card-inner').forEach(card => {
        const flipped = card.classList.contains('flipped');
        card.querySelectorAll('.flip-face').forEach(face => {
          const hidden = face.classList.contains('flip-back') ? !flipped : flipped;
          face.inert = hidden; face.setAttribute('aria-hidden', String(hidden));
        });
      });
      initScrollReveals();
    }

    document.getElementById('mobile-menu-btn').setAttribute('aria-controls', 'mobile-menu');
    document.getElementById('mobile-menu-btn').setAttribute('aria-expanded', 'false');
    document.getElementById('mobile-menu').inert = true;
    document.addEventListener('keydown', e => {
      const modal = getOpenModal();
      if (e.key === 'Escape') setMobileMenuOpen(false);
      if (!modal || e.key !== 'Tab') return;
      const items = [...modal.querySelectorAll('button, input, select, textarea, a[href], [tabindex="0"]')]
        .filter(el => !el.disabled && !el.closest('[inert]') && el.getClientRects().length);
      if (!items.length) { e.preventDefault(); return; }
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
        e.preventDefault(); first.focus();
      }
    });
    document.addEventListener('invalid', e => animateFeedback(e.target, false), true);
    motionPreference.addEventListener('change', () => {
      if (motionPreference.matches) {
        document.getAnimations().forEach(animation => {
          if (animation.effect?.getTiming().iterations === Infinity) animation.cancel();
          else { try { animation.finish(); } catch { animation.cancel(); } }
        });
        if (progressAnimation) progressAnimation.cancel();
        document.querySelectorAll('[role="dialog"].motion-closing').forEach(modal => setModalOpen(modal.id, false));
        if (document.getElementById('mobile-menu-btn').getAttribute('aria-expanded') === 'false') setMobileMenuOpen(false);
      }
      initScrollReveals();
      if (progressChartInstance) {
        progressChartInstance.options.animation = motionPreference.matches ? false : { duration: 420 };
        progressChartInstance.update('none');
      }
    });
    // DEUTSCH MOTION — JS END

    const systemTheme = matchMedia("(prefers-color-scheme: dark)");
    const themeLabels = {system:"Tizim",light:"Kunduzgi",dark:"Tungi"};
    const themeModes = Object.keys(themeLabels);
    const themeToggle = document.getElementById("theme-toggle-btn");
    function applyTheme() {
      const mode = themeModes.includes(state.themeMode) ? state.themeMode : "system";
      const wasDark = document.documentElement.classList.contains("dark");
      const isDark = mode === "dark" || (mode === "system" && systemTheme.matches);
      document.documentElement.classList.toggle("dark",isDark);
      for (const icon of themeToggle.querySelectorAll("[data-theme-icon]")) icon.hidden = icon.dataset.themeIcon !== mode;
      const next = themeModes[(themeModes.indexOf(mode) + 1) % themeModes.length];
      themeToggle.title = `Rang rejimi — ${themeLabels[mode]}. Keyingi — ${themeLabels[next]}`;
      themeToggle.setAttribute("aria-label",themeToggle.title);
      if (wasDark !== isDark && state.activeTab === "dashboard") renderDashboardChart();
    }
    systemTheme.addEventListener("change",applyTheme);

    // READ ALONG — JS START
    // Browser speech is the audio source; captions follow its word events.
    // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/boundary_event
    let activeSpeechSession = null;

    // Start asynchronous voice enumeration before the first user click.
    window.speechSynthesis?.getVoices();
    const captionPanel = document.getElementById('speech-captions');
    const captionLine = document.getElementById('caption-line');
    const renderSpeechCaption = captionDisplay.renderer(captionLine);
    captionDisplay.bind(document.getElementById('caption-mode'), () => {
      if (activeSpeechSession?.range) showCaption(activeSpeechSession, activeSpeechSession.range.start);
    });
    document.getElementById('caption-stop').addEventListener('click', stopGermanSpeech);

    const speechPause = document.getElementById('caption-pause');
    const speechSpeed = document.getElementById('caption-rate');
    const soundRate = document.getElementById('sound-rate');
    const rateValue = document.getElementById('sound-rate-value');
    function previewRate() {
      const label = Number(soundRate.value) + '×';
      soundRate.style.setProperty('--rail-ratio', (soundRate.valueAsNumber - Number(soundRate.min)) / (soundRate.max - soundRate.min));
      rateValue.value = label;
      const badge = document.getElementById('sound-current-rate');
      badge.textContent = label;
      badge.parentElement.setAttribute('aria-label', 'Ovoz sozlamalari, o‘qish tezligi ' + label);
      soundRate.setAttribute('aria-valuetext', label);
      for (const mark of document.querySelectorAll('[data-rate-stop]')) mark.setAttribute('aria-pressed', String(Number(mark.dataset.rateStop) === Number(soundRate.value)));
    }
    document.querySelector('.sound-rate-scale').addEventListener('click', event => {
      const mark = event.target.closest('[data-rate-stop]');
      if (mark) setSpeechSpeed(Number(mark.dataset.rateStop));
    });
    soundRate.addEventListener('input', previewRate);
    soundRate.addEventListener('change', () => setSpeechSpeed(Number(soundRate.value)));
    function setSpeechSpeed(rate) {
      state.speechRate = rate;
      saveState();
      updateNavActive();
      // The next utterance reads state.speechRate; never cancel live narration for a rate change.
    }
    speechSpeed.addEventListener('change', () => setSpeechSpeed(Number(speechSpeed.value)));
    speechPause.addEventListener('click', () => {
      const session = activeSpeechSession;
      if (!session) return;
      session.paused = !session.paused;
      speechPause.textContent = session.paused ? 'Davom etish' : 'Pauza';
      session.restart();
    });

    function captionTokens(text) {
      return Array.from(text.matchAll(/\S+/gu), match => ({
        text: match[0], start: match.index, end: match.index + match[0].length
      }));
    }

    function showCaption(session, start) {
      if (session.block?.hidden) { captionPanel.hidden = true; return; }
      const index = session.tokenIndex.get(start);
      if (index === undefined) return;
      const token = session.tokens[index];
      captionPanel.hidden = !renderSpeechCaption([token.phrase], () => token.phraseIndex);
    }

    function renderSpeechText(text) {
      const source = String(text || '');
      let html = '', cursor = 0;
      for (const match of source.matchAll(/\S+/gu)) {
        html += esc(source.slice(cursor, match.index));
        html += `<span class="speech-word" data-speech-start="${match.index}" data-speech-end="${match.index + match[0].length}">${esc(match[0])}</span>`;
        cursor = match.index + match[0].length;
      }
      return html + esc(source.slice(cursor));
    }

    function setSpeechButtonState(button, playing) {
      if (!button) return;
      button.classList.toggle('audio-playing-btn', playing);
      button.setAttribute('aria-pressed', String(playing));
      if (playing) button.dataset.speechActive = 'true';
      else delete button.dataset.speechActive;
      if (button.matches('[data-speech-target][data-speak]') && button.dataset.readingButton !== undefined) {
        const label = button.querySelector('span');
        if (label) label.textContent = playing ? "To'xtatish" : 'Matnni tinglash';
        button.setAttribute('aria-label', playing ? "Matnni tinglashni to'xtatish" : 'Matnni tinglash');
      }
    }

    function stopGermanSpeech() {
      // Invalidate callbacks before cancel(), which can itself emit error/end.
      const session = activeSpeechSession;
      activeSpeechSession = null;
      captionPanel.hidden = true;
      renderSpeechCaption([], () => -1);
      clearTimeout(session?.captionTimer);
      if (session) session.highlighted.forEach(el => el.classList.remove('is-speaking-word', 'is-speaking-sentence'));
      document.querySelectorAll('[data-speech-active]').forEach(button => setSpeechButtonState(button, false));
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (session) queueAvatarRoute(950);
    }

    function followSpeechWord(session, element) {
      if (!element || motionPreference.matches || document.hidden) return;
      const rect = element.getBoundingClientRect();
      const top = (document.querySelector('header')?.getBoundingClientRect().bottom || 0) + 24;
      if ((rect.top < top || rect.bottom > innerHeight - 64) && performance.now() - session.lastScrollAt > 700) {
        session.lastScrollAt = performance.now();
        window.scrollBy({ top: rect.top - Math.max(top, innerHeight * .42), behavior: 'smooth' });
      }
    }

    function highlightSpeechRange(session, start, end, mode, follow = true) {
      if (activeSpeechSession !== session) return;
      if (session.captions) showCaption(session, start);
      session.range = { start, end, mode };
      session.highlighted.forEach(el => el.classList.remove('is-speaking-word', 'is-speaking-sentence'));
      session.highlighted = session.words.filter(word =>
        Number(word.dataset.speechStart) < end && Number(word.dataset.speechEnd) > start);
      session.highlighted.forEach(el => el.classList.add(mode === 'word' ? 'is-speaking-word' : 'is-speaking-sentence'));
      if (follow && !session.block?.hidden) followSpeechWord(session, session.highlighted[0]);
    }

    function syncSpeechView() {
      const session = activeSpeechSession;
      if (session?.captions && state.activeTab !== session.tab) { stopGermanSpeech(); return; }
      if (!session?.targetId) return;
      const block = document.getElementById(session.targetId);
      // Navigation/text changes stop playback; translation/question renders keep it.
      if (!block || block.textContent !== session.text) { stopGermanSpeech(); return; }
      session.block = block;
      session.words = [...block.querySelectorAll('[data-speech-start]')];
      session.button = [...document.querySelectorAll('[data-speech-target]')]
        .find(button => button.dataset.speechTarget === session.targetId);
      setSpeechButtonState(session.button, true);
      if (session.range) {
        const { start, end, mode } = session.range;
        highlightSpeechRange(session, start, end, mode, false);
      }
    }

    function speakGerman(text, sourceButton = null, captionOnly = false) {
      if (!text || !String(text).trim()) return;
      const targetId = sourceButton?.dataset.speechTarget || null;
      if (activeSpeechSession && (targetId ? activeSpeechSession.targetId === targetId : captionOnly && sourceButton && activeSpeechSession.button === sourceButton) && activeSpeechSession.text === text) {
        stopGermanSpeech();
        return;
      }
      stopGermanSpeech();
      const block = targetId ? document.getElementById(targetId) : null;
      if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        showToast("Ushbu brauzerda ovozli o'qish qo'llab-quvvatlanmaydi.", 'warn');
        return;
      }
      const tokens = captionTokens(text);
      const session = {
        captions: true, tokens, tab: state.activeTab,
        tokenIndex: new Map(tokens.map((token, i) => [token.start, i])),
        text: String(text), targetId, block, button: sourceButton,
        words: block ? [...block.querySelectorAll('[data-speech-start]')] : [],
        highlighted: [], range: null, lastScrollAt: -Infinity, utterance: null
      };
      activeSpeechSession = session;
      stopAvatarRoute();
      silenceInterfaceCue();
      setSpeechButtonState(sourceButton, true);
      const synth = window.speechSynthesis;
      const germanVoices = synth.getVoices().filter(v => /^de(?:-|_|$)/i.test(v.lang));
      const voice = germanVoices.find(v => /natural|neural|premium|enhanced|google/i.test(v.name)) || germanVoices[0];
      speechPause.textContent = 'Pauza';
      captionPanel.hidden = true;
      // Preserve phrasing, punctuation, and breathing pauses. Sentence boundaries
      // also let voices without word events realign captions throughout a passage.
      const sentences = typeof Intl.Segmenter === 'function'
          ? [...new Intl.Segmenter('de', { granularity: 'sentence' }).segment(session.text)]
          : [...session.text.matchAll(/[^.!?]+[.!?]*|[.!?]+/gu)].map(m => ({ segment: m[0], index: m.index }));
      let at = 0;
      for (const sentence of sentences) {
        const end = sentence.index + sentence.segment.length;
        let phrase;
        while (at < tokens.length && tokens[at].start < end) {
          const token = tokens[at++];
          if (!phrase || phrase.segments.length === 9) phrase = {text:'',segments:[]};
          token.phrase = phrase;
          token.phraseIndex = phrase.segments.length;
          phrase.segments.push({text:token.text});
          phrase.text += (token.phraseIndex ? ' ' : '') + token.text;
        }
      }
      let sentenceIndex = 0;
      session.restart = () => {
        session.utterance = null;
        clearTimeout(session.captionTimer);
        synth.cancel();
        if (!session.paused) speakNext(session.range?.start);
      };
      function speakNext(offset) {
        if (activeSpeechSession !== session || session.paused) return;
        const whole = sentences[sentenceIndex];
        const skip = whole ? Math.max(0, (offset ?? whole.index) - whole.index) : 0;
        const sentence = whole && { segment: whole.segment.slice(skip), index: whole.index + skip };
        if (!sentence) {
          stopGermanSpeech();
          if (session.answerCue) requestInterfaceCue(session.answerCue);
          return;
        }
        try {
          const utter = new SpeechSynthesisUtterance(sentence.segment);
          session.utterance = utter;
          utter.lang = 'de-DE';
          utter.rate = state.speechRate || 1;
          if (voice) utter.voice = voice;
          const current = () => activeSpeechSession === session && session.utterance === utter;
          const words = tokens.filter(t => t.start >= sentence.index && t.start < sentence.index + sentence.segment.length);
          let position = 0;
          let hasWordTiming = false;
          function mark(i) {
            const word = words[i];
            if (!current() || !word) return;
            position = i;
            highlightSpeechRange(session, word.start, word.end, 'word');
          }
          function scheduleCaption() {
            clearTimeout(session.captionTimer);
            if (!current() || hasWordTiming || position + 1 >= words.length) return;
            const word = words[position].text;
            const delay = (160 + Math.min(word.length, 16) * 32 + (/[,;:]$/.test(word) ? 130 : 0)) / utter.rate;
            session.captionTimer = setTimeout(() => { mark(position + 1); scheduleCaption(); }, delay);
          }
          utter.onstart = () => {
            if (!current() || !words.length) return;
            mark(0);
            scheduleCaption();
          };
          utter.onboundary = event => {
            if (!current() || event.name === 'sentence' || !Number.isInteger(event.charIndex)) return;
            const offset = sentence.index + event.charIndex;
            const i = words.findIndex(word => offset >= word.start && offset < word.end);
            if (i < 0) return;
            if (i > 0) hasWordTiming = true;
            mark(i);
            scheduleCaption();
          };
          utter.onpause = () => { if (current()) clearTimeout(session.captionTimer); };
          utter.onresume = () => { if (current()) scheduleCaption(); };
          utter.onend = () => {
            if (!current()) return;
            clearTimeout(session.captionTimer);
            sentenceIndex++;
            speakNext();
          };
          utter.onerror = event => {
            if (!current()) return;
            stopGermanSpeech();
            if (!['canceled', 'interrupted'].includes(event.error)) {
              showToast("Brauzer ovozini ijro etib bo‘lmadi. Qurilmadagi nemischa ovoz sozlamalarini tekshiring.", 'warn');
            }
          };
          synth.speak(utter);
        } catch {
          if (activeSpeechSession === session) {
            stopGermanSpeech();
            showToast("Brauzerda ovozli o'qish ishlamadi.", 'warn');
          }
        }
      }
      speakNext();
    }
    window.addEventListener('pagehide', stopGermanSpeech);
    // READ ALONG — JS END

    function speakDialogue(lines) {
      if (!lines || !lines.length) return;
      const joined = lines.map(l => l.de).join(" ");
      speakGerman(joined, null, true);
    }

    // Small, locally synthesized cues. Each note is [frequency, start, duration, gain].
    const interfaceCues = {
      avatarStep: { priority: -1, notes: [[184, 0, .049, .039]] },
      avatarGrip: { priority: -1, notes: [[247, 0, .048, .026], [330, .035, .048, .024]] },
      avatarJump: { priority: -1, notes: [[440, 0, .059, .037], [660, .042, .082, .032]] },
      avatarLand: { priority: -1, notes: [[156, 0, .074, .049], [214, .036, .049, .026]] },
      avatarThud: { priority: -1, notes: [[93, 0, .11, .065], [68, .032, .09, .03]] },
      avatarRoll: { priority: -1, notes: [[190, 0, .051, .041], [152, .065, .067, .034], [127, .132, .065, .022]] },
      avatarReminder: { priority: -1, notes: [[523, 0, .095, .047], [698, .077, .12, .042]] },
      avatarPaper: { priority: -1, paper: true },
      avatarTease: { priority: -1, notes: [[392, 0, .08, .04], [523, .12, .09, .036], [349, .29, .12, .035]] },
      press:    { priority: 0, notes: [[740, 0, .047, .070]] },
      choose:   { priority: 1, notes: [[523, 0, .068, .077]] },
      page:     { priority: 2, notes: [[392, 0, .07, .067], [659, .045, .10, .058]] },
      open:     { priority: 2, notes: [[330, 0, .065, .067], [495, .038, .08, .054]] },
      close:    { priority: 2, notes: [[495, 0, .055, .055], [330, .038, .073, .062]] },
      paper:    { priority: 3, paper: true },
      flip:     { priority: 2, notes: [[659, 0, .045, .057], [880, .022, .063, .060]] },
      learned:  { priority: 3, notes: [[523, 0, .085, .081], [784, .068, .12, .073]] },
      correct:  { priority: 3, notes: [[587, 0, .075, .079], [880, .065, .13, .072]] },
      retry:    { priority: 3, notes: [[349, 0, .076, .083], [262, .073, .105, .077]] },
      timerPomoPause: {priority:5, notes:[[523,0,.12,.065],[349,.12,.18,.055]]},
      timerPomoStart: {priority:7, splat:true},
      timerPomoRest: {priority:6, notes:[[698,0,.23,.07],[523,.24,.28,.07],[392,.52,.4,.06]]},
      timerPomoDone: {priority:6, notes:[[392,0,.17,.06],[494,.17,.19,.07],[587,.37,.35,.08]]},
      timerPomoTick: {priority:5, notes:[[740,0,.045,.05],[494,.065,.065,.045]]},
      timerStart: { priority: 7, notes: [[523, 0, .14, .16], [698, .12, .22, .15]] },
      timerStop: { priority: 5, notes: [[587, 0, .075, .065], [392, .065, .13, .065]] },
      timerTick: { priority: 5, notes: [[880, 0, .085, .062]] },
      timerDone: { priority: 6, notes: [[523, 0, .18, .09], [659, .13, .21, .087], [784, .27, .36, .09]] },
      complete: { priority: 4, notes: [[523, 0, .14, .093], [659, .105, .17, .089], [784, .21, .24, .085]] }
    };
    let effectsContext;
    let effectsResume;
    let paperNoise;
    let tomatoSplat;
    let timerSoundRequest = 0;
    let currentEffect;
    let currentEffectName;
    let queuedEffect;
    let deferredEffect;
    let effectTimer;

    function unlockInterfaceAudio() {
      if (state.soundEffects === false && state.studyAvatar.sound === false) return Promise.resolve(false);
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return Promise.resolve(false);
        if (!effectsContext || effectsContext.state === 'closed') {
          effectsContext = new AudioContext();
          effectsResume = null;
        }
        const ctx = effectsContext;
        if (ctx.state === 'running') return Promise.resolve(true);
        if (!effectsResume) {
          const pending = ctx.resume().then(() => ctx.state === 'running', () => false).finally(() => {
            if (effectsResume === pending) effectsResume = null;
          });
          effectsResume = pending;
        } else if (navigator.userActivation?.isActive) {
          ctx.resume().catch(() => {});
        }
        return effectsResume;
      } catch {
        return Promise.resolve(false);
      }
    }

    function silenceInterfaceCue() {
      if (!currentEffect) return;
      currentEffect.disconnect();
      currentEffect = null;
      currentEffectName = null;
    }

    function playPaperCue(ctx, bus, start) {
      const duration = .245;
      if (!paperNoise) {
        paperNoise = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
        const samples = paperNoise.getChannelData(0);
        for (let i = 0; i < samples.length; i++) {
          const flutter = .7 + .3 * Math.sin(i / ctx.sampleRate * 2 * Math.PI * 43);
          samples[i] = (Math.random() * 2 - 1) * flutter;
        }
      }
      const source = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), envelope = ctx.createGain();
      source.buffer = paperNoise;
      filter.type = "bandpass";
      filter.Q.value = .72;
      filter.frequency.setValueAtTime(850,start);
      filter.frequency.exponentialRampToValueAtTime(2450,start + .08);
      filter.frequency.exponentialRampToValueAtTime(640,start + duration);
      envelope.gain.setValueAtTime(.0001,start);
      envelope.gain.exponentialRampToValueAtTime(.15,start + .048);
      envelope.gain.exponentialRampToValueAtTime(.04,start + .118);
      envelope.gain.exponentialRampToValueAtTime(.085,start + .145);
      envelope.gain.exponentialRampToValueAtTime(.0001,start + duration);
      source.connect(filter).connect(envelope).connect(bus);
      source.onended = () => {
        source.disconnect();
        filter.disconnect();
        envelope.disconnect();
        if (currentEffect === bus) silenceInterfaceCue();
      };
      source.start(start);
    }

    function playTomatoSplat(ctx, bus, start) {
      if (!tomatoSplat || tomatoSplat.sampleRate !== ctx.sampleRate) {
        tomatoSplat = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * .42), ctx.sampleRate);
        const samples = tomatoSplat.getChannelData(0);
        // A soft impact, a short spray and three smaller wet pops.
        let filteredNoise = 0, bodyPhase = 0;
        const splashes = [[.023, 720, .24], [.059, 540, .19], [.129, 410, .12]];
        for (let i = 0; i < samples.length; i++) {
          const t = i / ctx.sampleRate;
          const attack = Math.min(1, t / .003);
          bodyPhase += 2 * Math.PI * (88 + 175 * Math.exp(-t / .022)) / ctx.sampleRate;
          filteredNoise += .34 * (Math.random() * 2 - 1 - filteredNoise);
          let sound = .43 * Math.sin(bodyPhase) * Math.exp(-t / .051)
            + filteredNoise * .93 * Math.exp(-t / .035);
          for (const [onset, pitch, volume] of splashes) {
            const age = t - onset;
            if (age < 0) continue;
            const phase = 2 * Math.PI * pitch * (.38 * age + .62 * .013 * (1 - Math.exp(-age / .013)));
            sound += volume * Math.min(1, age / .002) * Math.exp(-age / .034)
              * (.76 * Math.sin(phase) + filteredNoise);
          }
          samples[i] = attack * sound * Math.min(1, (.42 - t) / .012);
        }
      }
      const source = ctx.createBufferSource();
      source.buffer = tomatoSplat;
      source.connect(bus);
      source.onended = () => {
        source.disconnect();
        if (currentEffect === bus) silenceInterfaceCue();
      };
      source.start(start);
    }

    function cueEnabled(name) {
      return name.startsWith('avatar') ? state.studyAvatar.sound !== false : state.soundEffects !== false;
    }

    function playInterfaceCue(name) {
      if (!cueEnabled(name) || effectsContext?.state !== 'running') return;
      if (name.startsWith('avatar')) {
        const hidden = name === 'avatarReminder' ? avatarReminder.hidden : avatarWorld.hidden;
        if (activeSpeechSession || hidden || (currentEffect && !currentEffectName?.startsWith('avatar'))) return;
        if (name === 'avatarStep' && currentEffect) return;
      }
      if (!['timerPomoPause','timerStop'].includes(name) && currentEffectName?.startsWith('timer') && interfaceCues[name].priority < interfaceCues[currentEffectName].priority) return;
      silenceInterfaceCue();
      const ctx = effectsContext;
      const start = ctx.currentTime + .006;
      const bus = ctx.createGain();
      if (!name.startsWith('avatar') && !name.startsWith('timer')) bus.gain.value = activeSpeechSession ? .48 : 1.4;
      bus.connect(ctx.destination);
      currentEffect = bus;
      currentEffectName = name;
      const { notes, paper, splat } = interfaceCues[name];
      if (splat) { playTomatoSplat(ctx,bus,start); return; }
      if (name === 'avatarPaper') bus.gain.value = .5;
      if (paper) { playPaperCue(ctx,bus,start); return; }
      notes.forEach(([frequency, offset, duration, volume], i) => {
        const tone = ctx.createOscillator();
        const envelope = ctx.createGain();
        const at = start + offset;
        tone.type = ['flip', 'avatarStep', 'avatarGrip', 'avatarLand', 'avatarRoll'].includes(name) ? 'triangle' : 'sine';
        tone.frequency.setValueAtTime(frequency, at);
        envelope.gain.setValueAtTime(.0001, at);
        envelope.gain.exponentialRampToValueAtTime(volume, at + .01);
        if (name.startsWith('timer')) envelope.gain.setValueAtTime(volume * .8, at + duration * .42);
        envelope.gain.exponentialRampToValueAtTime(.0001, at + duration);
        tone.connect(envelope);
        envelope.connect(bus);
        tone.onended = () => {
          tone.disconnect();
          envelope.disconnect();
          if (i === notes.length - 1 && currentEffect === bus) silenceInterfaceCue();
        };
        tone.start(at);
        tone.stop(at + duration);
      });
    }

    function playTimerCue(name, run = null) {
      const request = ++timerSoundRequest;
      if (!cueEnabled(name)) return;
      if (effectsContext?.state === 'running') { playInterfaceCue(name); return; }
      const requestedAt = performance.now();
      unlockInterfaceAudio().then(ready => {
        if (!ready || request !== timerSoundRequest || performance.now() - requestedAt > 1500) return;
        if (run && (focusRun?.id !== run.id || Date.now() >= run.end)) return;
        playInterfaceCue(name);
      });
    }

    function requestInterfaceCue(name) {
      if (!effectsContext || !cueEnabled(name)) return;
      if (!queuedEffect || interfaceCues[name].priority >= interfaceCues[queuedEffect.name].priority) {
        queuedEffect = {name, at:performance.now()};
      }
      if (effectTimer !== undefined) return;
      effectTimer = setTimeout(() => {
        const cue = queuedEffect;
        queuedEffect = effectTimer = undefined;
        if (effectsContext?.state === 'running') playInterfaceCue(cue.name);
        else if (effectsResume && !cue.name.startsWith('avatar')) {
          if (deferredEffect?.pending === effectsResume) {
            if (interfaceCues[cue.name].priority >= interfaceCues[deferredEffect.cue.name].priority) deferredEffect.cue = cue;
            return;
          }
          const entry = {cue, pending:effectsResume};
          deferredEffect = entry;
          entry.pending.then(ready => {
            if (deferredEffect !== entry) return;
            deferredEffect = null;
            if (ready && performance.now() - entry.cue.at <= 1200) playInterfaceCue(entry.cue.name);
          });
        }
      }, 24);
    }

    function playAnswerCue(correct, afterPronunciation = false) {
      const cue = correct ? 'correct' : 'retry';
      if (afterPronunciation && activeSpeechSession) activeSpeechSession.answerCue = cue;
      else requestInterfaceCue(cue);
    }

    const turnPageActions = /^(?:set-(?:.*(?:tab|skill)|practice-mode|grammar-case|grammar-syntax)|.*-page|open-lesson|select-(?:lesson|reading-text)|search-pick-lesson|fc-(?:next|prev|shuffle)|(?:sb|mq|spell)-next|next-wotd)$/;
    document.addEventListener('click', event => {
      if (event.isTrusted) unlockInterfaceAudio();
      const control = event.target.closest?.('button, a[href], summary, [role="button"], [role="tab"], [data-action]');
      if (!control || control.closest(':disabled, [aria-disabled="true"], [inert]') || control.matches('#sound-effects-toggle, #avatar-sound-toggle')) return;
      const action = control.dataset.action || '';
      if (action === 'timer-toggle' || control.hasAttribute('data-speak') || action === 'play-dialogue' || action === 'play-listening') return;
      const opensPage = (control.dataset.nav && control.dataset.nav !== state.activeTab)
        || control.hasAttribute('data-sync-tab') || turnPageActions.test(action);
      requestInterfaceCue(opensPage ? 'page' : 'press');
    }, true);

    document.addEventListener('keydown', event => {
      if (event.isTrusted && !event.repeat) unlockInterfaceAudio();
    }, true);

    document.addEventListener('change', event => {
      if (!event.target.matches('select, input[type="file"], input[type="radio"], input[type="checkbox"]')) return;
      if (event.isTrusted) unlockInterfaceAudio();
      if (!event.target.matches('input[type="radio"], input[type="checkbox"]')) requestInterfaceCue('choose');
    }, true);

    document.addEventListener('invalid', () => requestInterfaceCue('retry'), true);

    const soundSettings = document.getElementById('sound-settings');
    document.addEventListener('pointerdown', e => { if (!soundSettings.contains(e.target)) soundSettings.open = false; });
    soundSettings.addEventListener('focusout', e => { if (e.relatedTarget && !soundSettings.contains(e.relatedTarget)) soundSettings.open = false; });
    soundSettings.addEventListener('keydown', e => {
      if (e.key === 'Escape' && soundSettings.open) {
        e.stopPropagation(); soundSettings.open = false; soundSettings.querySelector('summary').focus();
      }
    });
    function updateSoundEffectsToggle() {
      const enabled = state.soundEffects !== false;
      if (!enabled && currentEffectName && !currentEffectName.startsWith('avatar')) silenceInterfaceCue();
      const button = document.getElementById('sound-effects-toggle');
      button.setAttribute('aria-checked', String(enabled));
      button.title = enabled ? 'Tizim ovozi yoqilgan' : 'Tizim ovozi o‘chirilgan';
    }

    document.getElementById('sound-effects-toggle').addEventListener('click', () => {
      state.soundEffects = state.soundEffects === false;
      updateSoundEffectsToggle();
      saveState();
      if (state.soundEffects) {
        unlockInterfaceAudio();
        requestInterfaceCue('choose');
      } else {
        deferredEffect = null;
        if (queuedEffect && !queuedEffect.name.startsWith('avatar')) {
          clearTimeout(effectTimer); queuedEffect = effectTimer = undefined;
        }
        if (activeSpeechSession) delete activeSpeechSession.answerCue;
      }
    });

    function showToast(message, type = "info") {
      if (type === 'success') requestInterfaceCue('correct');
      else if (type === 'error' || type === 'warn') requestInterfaceCue('retry');
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      const colors = { info: 'bg-slate-900 text-white', success: 'bg-emerald-600 text-white', warn: 'bg-amber-600 text-white', error: 'bg-rose-600 text-white' };
      toast.className = `${colors[type] || colors.info} motion-toast motion-toast-in px-4 py-3 rounded-xl shadow-lg text-sm font-medium pointer-events-auto`;
      const mark = document.createElement('span');
      mark.className = 'motion-toast-mark';
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = ({ success: '✓', error: '!', warn: '!', info: 'i' })[type] || 'i';
      const label = document.createElement('span');
      label.textContent = message;
      toast.append(mark, label);
      container.appendChild(toast);
      // Keep bursts from covering the mobile viewport.
      while (container.children.length > 3) container.firstElementChild.remove();
      setTimeout(() => {
        toast.classList.replace('motion-toast-in', 'motion-toast-out');
        setTimeout(() => toast.remove(), motionPreference.matches ? 0 : 310);
      }, type === 'error' ? 5000 : 3600);
    }

    // =========================================================================
    // 5. SMART SCHEDULE LESSON PARSER (JSON OR MARKDOWN)
    // =========================================================================
    function parseScheduleLessonText(rawText) {
      const trimmed = rawText.trim();
      if (!trimmed) throw new Error("Matn bo'sh.");

      // 1) Try JSON extraction (direct JSON or inside ```json ... ```)
      const jsonFence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
      const candidate = jsonFence ? jsonFence[1].trim() : trimmed;
      if (candidate.startsWith("{") || candidate.startsWith("[")) {
        const parsed = JSON.parse(candidate);
        const list = Array.isArray(parsed) ? parsed : [parsed];
        const nextId = Number(getAllLessons().at(-1).id) + 1;
        if (!list.length || list.some(lesson => !lesson || typeof lesson !== "object" || Array.isArray(lesson)))
          throw new Error("JSON ichida dars obyekti bo‘lishi kerak.");
        return list.map((lesson,index) => normalizeLessonObj(lesson,nextId + index));
      }

      // 2) Fallback: Smart Markdown Parser for regular Gemini schedule messages
      const allLessons = getAllLessons();
      const nextId = allLessons.length ? Math.max(...allLessons.map(l => Number(l.id))) + 1 : 1;
      const titleMatch = trimmed.match(/#{1,4}\s*(?:(\d+)\s*-?\s*dars[:.\-\s]*)?(.+)/i);
      const parsedId = titleMatch && titleMatch[1] ? Number(titleMatch[1]) : nextId;
      const parsedTitle = titleMatch ? titleMatch[2].replace(/\*/g, "").trim() : `${parsedId}-dars (Jadvaldan import)`;
      const levelMatch = trimmed.match(/\b(A1\.1|A1\.2|A2\.1|A2\.2|B1)\b/);
      const parsedLevel = levelMatch ? levelMatch[1] : "A1.2";

      // Extract numbered vocabulary lines like: 1. **der Tisch, die Tische** [der tish] — stol
      const words = [];
      const wordRegex = /^\d+\.\s+\*\*(.+?)\*\*(?:\s*\[([^\]]+)\])?\s*[—–-]\s*(.+)$/gm;
      let wm;
      let wIdx = 1;
      while ((wm = wordRegex.exec(trimmed)) !== null) {
        const rawDe = wm[1].trim();
        const pron = (wm[2] || "").trim();
        const uz = wm[3].trim();
        const parts = rawDe.split(",").map(s => s.trim());
        const mainPart = parts[0] || rawDe;
        const plural = parts[1] || "";
        let art = "other";
        let de = mainPart;
        const artMatch = mainPart.match(/^(der|die|das)\s+(.+)$/i);
        if (artMatch) {
          art = artMatch[1].toLowerCase();
          de = artMatch[2].trim();
        } else if (/en$|ern$|eln$/i.test(mainPart.split(" ")[0])) {
          art = "verb";
        }
        words.push({ id: `w${parsedId}_${wIdx++}`, art, de, plural, pron: pron || de.toLowerCase(), uz });
      }

      // Extract numbered exercises after "Amaliy mashqlar"
      const exercises = [];
      const exSectionIdx = trimmed.search(/amaliy mashqlar/i);
      if (exSectionIdx !== -1) {
        const exBlock = trimmed.slice(exSectionIdx);
        const exRegex = /^\d+\.\s+(.+)$/gm;
        let em;
        let eIdx = 1;
        while ((em = exRegex.exec(exBlock)) !== null) {
          const prompt = em[1].replace(/\*/g, "").trim();
          exercises.push({
            id: `l${parsedId}_e${eIdx++}`,
            type: "selfcheck",
            prompt,
            hint: "Tarjima yoki javobingizni yozing...",
            answers: [],
            sampleAnswer: "O'z javobingizni tekshiring"
          });
        }
      }

      const introParagraphs = trimmed.split(/\n\n+/).filter(p => !p.startsWith("#") && !/^\d+\./.test(p.trim())).slice(0, 3);
      return [normalizeLessonObj({
        id: parsedId,
        level: parsedLevel,
        title: parsedTitle,
        summary: introParagraphs[0] ? introParagraphs[0].replace(/\*/g, "").slice(0, 220) : "Jadvaldan qo'shilgan kunlik dars.",
        grammarPoints: introParagraphs.map((p, i) => ({
          heading: i === 0 ? "Asosiy tushuntirish" : `Qo'shimcha qoida ${i}`,
          text: p.replace(/\*/g, "").trim()
        })),
        words,
        exercises
      })];
    }

    function lessonText(value) {
      return typeof value === "string" ? value.trim() : "";
    }

    function lessonItemId(value, fallback) {
      const id = typeof value === "number" ? String(value) : lessonText(value);
      return /^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/.test(id) ? id : fallback;
    }

    function normalizeGrammarPoints(points, summary) {
      const items = Array.isArray(points) ? points : [];
      const normalized = items.map(item => typeof item === "string"
        ? {heading:"",text:lessonText(item)}
        : {heading:lessonText(item?.heading),text:lessonText(item?.text)})
        .filter(item => item.heading || item.text);
      return normalized.length ? normalized : [{heading:"Qoida",text:lessonText(summary)}];
    }

    function normalizeLessonReading(value, id, level, title) {
      const de = lessonText(value?.de);
      if (!de) return null;
      return {
        id:lessonItemId(value.id,"rt_day_" + id),
        level:lessonText(value.level) || level,
        title:lessonText(value.title) || title,
        de, uz:lessonText(value.uz),
        vocab:Array.isArray(value.vocab) ? value.vocab : [],
        questions:Array.isArray(value.questions) ? value.questions.filter(item =>
          lessonText(item?.q) && typeof item.ans === "boolean") : []
      };
    }

    function normalizeLessonGoethe(value, id, level) {
      if (!value || typeof value !== "object") return null;
      const tasks = {};
      for (const skill of ["writing","listening","speaking"]) {
        const task = value[skill];
        if (!task || typeof task !== "object" || Array.isArray(task)) continue;
        const taskId = lessonItemId(task.id,`lesson-${id}-${skill}`);
        const shared = {id:taskId,title:lessonText(task.title),part:lessonText(task.part)};
        if (skill === "writing") {
          tasks.writing = {...shared,prompt:lessonText(task.prompt),sample:lessonText(task.sample),
            targetWords:Number(task.targetWords) || 30,
            points:Array.isArray(task.points) ? task.points.filter(point => lessonText(point)) : []};
        } else if (skill === "listening") {
          const questions = Array.isArray(task.questions) ? task.questions.filter(question =>
            lessonText(question?.q) && Array.isArray(question.options) &&
            Number.isInteger(Number(question.ans)) && Number(question.ans) >= 0 && Number(question.ans) < question.options.length) : [];
          tasks.listening = {...shared,transcript:lessonText(task.transcript),questions};
        } else {
          tasks.speaking = {...shared,prompt:lessonText(task.prompt),durationSec:Number(task.durationSec) || 120,
            redemittel:Array.isArray(task.redemittel) ? task.redemittel.filter(item => lessonText(item?.de)) : []};
        }
      }
      if (!Object.keys(tasks).length) return null;
      return {level:lessonText(value.level) || lessonText(level).split(".")[0] || "A1",...tasks};
    }

    function normalizeLessonVideo(video) {
      const link = lessonText(video?.url);
      if (!link) return null;
      try {
        const url = new URL(link);
        if (!["https:","http:"].includes(url.protocol) || url.username || url.password || url.port) return null;
        const [first, second] = url.pathname.split("/").filter(Boolean);
        let id = null;
        if (url.hostname === "youtu.be") id = first;
        else if (["youtube.com","www.youtube.com","m.youtube.com","youtube-nocookie.com","www.youtube-nocookie.com"].includes(url.hostname)) {
          if (first === "watch") id = url.searchParams.get("v");
          else if (["embed","shorts","live"].includes(first)) id = second;
        }
        if (!/^[\w-]{11}$/.test(id || "")) return null;
        return {
          url:"https://www.youtube.com/watch?v=" + id,
          title:lessonText(video.title),
          channel:lessonText(video.channel),
          description:lessonText(video.description)
        };
      } catch {
        return null;
      }
    }

    function normalizeLessonExercise(item, id, index) {
      const exercise = typeof item === "string" ? {prompt:item} : item || {};
      const prompt = lessonText(exercise.prompt);
      if (!prompt) return null;
      const sample = lessonText(exercise.sampleAnswer);
      const answers = Array.isArray(exercise.answers) ? exercise.answers.filter(answer => lessonText(answer)) : sample ? [sample] : [];
      const options = Array.isArray(exercise.options) ? exercise.options.filter(option => lessonText(option)) : [];
      const type = exercise.type === "selfcheck" || (!answers.length && !lessonText(exercise.flexiblePrefix))
        ? "selfcheck" : exercise.type === "choice" && options.length >= 2 ? "choice" : "input";
      return {
        id:lessonItemId(exercise.id,`l${id}_e${index + 1}`),
        type, prompt, options,
        hint:lessonText(exercise.hint),
        answers, sampleAnswer:sample || answers[0] || "",
        flexiblePrefix:lessonText(exercise.flexiblePrefix)
      };
    }

    function normalizeLessonWord(word, id, index) {
      let de = lessonText(word?.de);
      if (!de) return null;
      let art = ["der","die","das","verb","other"].includes(word.art) ? word.art : "other";
      // Capitalization distinguishes noun phrases (das Büro) from fixed expressions (das tut mir leid).
      const noun = de.match(/^(der|die|das)\s+(.+)$/iu);
      if (noun && /^\p{Lu}/u.test(noun[2]) && ["der","die","das","other"].includes(art)) {
        art = noun[1].toLowerCase();
        de = noun[2];
      }
      const plural = lessonText(word.plural);
      return {
        id:lessonItemId(word.id,`w${id}_${index + 1}_${Date.now()}`),
        art, de, plural:/^[-–—]+$/.test(plural) ? "" : plural,
        pron:lessonText(word.pron) || de.toLowerCase(),
        uz:lessonText(word.uz),
        ...wordLearningFields(word)
      };
    }

    function normalizeLessonObj(obj, fallbackId = Number(getAllLessons().at(-1).id) + 1) {
      const givenId = Number(obj.id);
      const id = Number.isSafeInteger(givenId) && givenId > 0 ? givenId : fallbackId;
      const level = lessonText(obj.level) || "A1.2";
      const title = lessonText(obj.title) || `${id}-dars`;
      const video = normalizeLessonVideo(obj.video);
      if (lessonText(obj.video?.url) && !video)
        throw new Error(`${id}-darsdagi video.url uchun YouTube video havolasini kiriting.`);
      return {
        id, level, title,
        summary:lessonText(obj.summary) || "Kunlik nemis tili darsi.",
        grammarPoints:normalizeGrammarPoints(obj.grammarPoints,obj.summary),
        table:obj.table && obj.table.headers ? obj.table : null,
        commonMistakes:Array.isArray(obj.commonMistakes) ? obj.commonMistakes.filter(Boolean).map(m =>
          ({wrong:m.wrong,right:m.right || m.correct,note:m.note})) : [],
        dialogue:Array.isArray(obj.dialogue) ? obj.dialogue : [],
        memoryTip:lessonText(obj.memoryTip),
        examples:Array.isArray(obj.examples) ? obj.examples : [],
        exercises:(Array.isArray(obj.exercises) ? obj.exercises : []).map((item,i) => normalizeLessonExercise(item,id,i)).filter(Boolean),
        words:(Array.isArray(obj.words) ? obj.words : []).map((word,i) => normalizeLessonWord(word,id,i)).filter(Boolean),
        readingText:normalizeLessonReading(obj.readingText,id,level,title),
        goetheTasks:normalizeLessonGoethe(obj.goetheTasks,id,level),
        video
      };
    }

    // =========================================================================
    // 6. HELPERS
    // =========================================================================
    function esc(str) {
      return String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function articleBadge(art) {
      const map = {
        der: "bg-blue-100 text-blue-800 border-blue-200",
        die: "bg-rose-100 text-rose-800 border-rose-200",
        das: "bg-emerald-100 text-emerald-800 border-emerald-200",
        verb: "bg-amber-100 text-amber-800 border-amber-200",
        other: "bg-slate-100 text-slate-700 border-slate-200"
      };
      const label = art === "verb" ? "Fe'l" : art === "other" ? "Ibora" : art;
      return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold border ${map[art] || map.other}">${esc(label)}</span>`;
    }

    function fullGermanWord(w) {
      return ["der", "die", "das"].includes(w.art) ? `${w.art} ${w.de}` : w.de;
    }

    function normalizeAnswer(s) {
      return String(s || "").trim().toLowerCase().replace(/[.,!?«»"']/g, "").replace(/\s+/g, " ");
    }

    function checkExerciseAnswer(ex, userVal) {
      const norm = normalizeAnswer(userVal);
      if (!norm) return false;
      if (ex.flexiblePrefix && norm.startsWith(normalizeAnswer(ex.flexiblePrefix)) && norm.length > normalizeAnswer(ex.flexiblePrefix).length) {
        return true;
      }
      return (ex.answers || []).some(ans => normalizeAnswer(ans) === norm);
    }

    function formatTimer(sec) {
      if (sec >= 3600) return `${Math.floor(sec / 3600)}:${formatTimer(sec % 3600)}`;
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    function renderPagination(currentPage, totalPages, actionName) {
      if (totalPages <= 1) return "";
      return `
        <div class="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs">
          <button type="button" data-action="${actionName}" data-page="${Math.max(1, currentPage - 1)}" ${currentPage <= 1 ? 'disabled' : ''} class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold hover:bg-slate-50 disabled:opacity-40">← Oldingi</button>
          <span class="font-semibold text-slate-500">Sahifa ${currentPage} / ${totalPages}</span>
          <button type="button" data-action="${actionName}" data-page="${Math.min(totalPages, currentPage + 1)}" ${currentPage >= totalPages ? 'disabled' : ''} class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold hover:bg-slate-50 disabled:opacity-40">Keyingi →</button>
        </div>
      `;
    }

    // =========================================================================
    // 7. RENDER VIEWS
    // =========================================================================
    const studyFooter = document.querySelector('.study-footer');
    const footerTimer = document.getElementById('footer-focus-timer');
    const footerBlocks = document.getElementById('footer-blocks');
    const footerProgress = document.getElementById('footer-progress');

    function syncStudyFooter() {
      if (!footerTimer.firstElementChild) footerTimer.innerHTML = renderFocusTimer("footer");
      const lesson = getAllLessons().find(item => Number(item.id) === Number(state.selectedLessonId));
      const lessonLabel = document.getElementById('footer-lesson');
      lessonLabel.textContent = lesson ? `${lesson.id}-darsni davom ettirish` : 'Darslarni ochish';
      lessonLabel.parentElement.title = lesson?.title || 'Darslar';
      for (const button of studyFooter.querySelectorAll('[data-nav]')) {
        if (button.dataset.nav === state.activeTab) button.setAttribute('aria-current','page');
        else button.removeAttribute('aria-current');
      }
    }

    function updateNavActive() {
      document.querySelectorAll(".nav-btn").forEach(btn => {
        const isActive = btn.dataset.nav === state.activeTab;
        btn.classList.toggle("tab-active", isActive);
        btn.classList.toggle("tab-inactive", !isActive);
        if (isActive) btn.setAttribute('aria-current','page');
        else btn.removeAttribute('aria-current');
      });
      const rate = String(state.speechRate);
      const custom = speechSpeed.querySelector('[data-custom]');
      if (custom && custom.value !== rate) custom.remove();
      if (![...speechSpeed.options].some(option => option.value === rate)) {
        const option = new Option(rate + '×', rate);
        option.dataset.custom = 'true';
        speechSpeed.add(option);
      }
      speechSpeed.value = rate;
      soundRate.value = rate;
      previewRate();
      updateSoundEffectsToggle();
    }

    function holdPracticeScroll(top) {
      const content = document.querySelector('.practice-content');
      if (!content) return;
      content.style.minBlockSize = "";
      const missing = top - (document.documentElement.scrollHeight - innerHeight);
      // Keep the current scroll position reachable when the next question is shorter.
      if (missing > 0) content.style.minBlockSize = `${content.offsetHeight + missing}px`;
      if (Math.abs(scrollY - top) > 1) window.scrollTo({top,behavior:"instant"});
    }

    function renderPracticeView(root, focused) {
      const markup = renderPractice();
      if (focused?.id === "spell-answer-input" && ui.practiceMode === "spell") {
        const template = document.createElement("template");
        template.innerHTML = markup;
        const nextInput = template.content.querySelector("#spell-answer-input");
        if (nextInput) {
          // Keep the focused input attached when the learner answers with the keyboard.
          const row = focused.closest(".practice-input"), nextRow = nextInput.closest(".practice-input");
          const children = [...nextRow.parentElement.children], index = children.indexOf(nextRow);
          for (const child of [...row.parentElement.children]) {
            if (child !== row) child.remove();
          }
          row.before(...children.slice(0,index));
          row.after(...children.slice(index+1));
          row.querySelector("button").replaceWith(nextRow.querySelector("button"));
          focused.classList.remove("practice-motion-success","practice-motion-error");
          if (focused.value !== nextInput.value) focused.value = nextInput.value;
          focused.readOnly = nextInput.readOnly;
          focused.setAttribute("aria-invalid",nextInput.getAttribute("aria-invalid"));
          return;
        }
      }
      root.innerHTML = markup;
    }

    function render({keepScroll = false} = {}) {
      studyStats.tick();
      capturePlace();
      clearAvatarPrank();
      updateNavActive();
      syncStudyFooter();
      const root = document.getElementById("app-root");
      const viewChanged = root.dataset.motionView !== state.activeTab;
      const liveTop = !viewChanged && (keepScroll || placeKey() === currentPlace) && state.activeTab !== 'movie' ? scrollY : null;
      const liveInner = new Map([...root.querySelectorAll('[data-study-scroll]')].map(n => [n.id, {top:n.scrollTop,left:n.scrollLeft}]));
      const practiceTop = state.activeTab === "practice" && placeKey() === currentPlace ? scrollY : null;
      if (viewChanged && root.dataset.motionView) requestInterfaceCue('page');
      root.dataset.motionView = state.activeTab;
      const focused = root.contains(document.activeElement) ? document.activeElement : null;
      const focusId = focused?.id;
      const focusData = focused ? Object.entries(focused.dataset).filter(([key]) => key !== "result") : [];
      const selection = focused && typeof focused.selectionStart === 'number'
        ? [focused.selectionStart, focused.selectionEnd] : null;
      if (state.activeTab !== 'movie') moviePlayer.close();
      if (state.activeTab === 'movie') moviePlayer.mount(root);
      else if (state.activeTab === "dashboard") {
        const words = getAllWords();
        root.innerHTML = renderDashboard(words);
        if (words.length) updateDashboardWord(root.querySelector('[data-layout-card="word"]'), words[ui.wotdIndex % words.length]);
        window.mountDashboardLayout(root, workspace.dashboardLayout, value => {
          workspace.dashboardLayout = value;
          rememberWorkspace();
        }, workspace.dashboardSnapshots, (mode, snapshot) => {
          (workspace.dashboardSnapshots ??= {})[mode] = snapshot;
          writeWorkspace();
        });
      }
      else if (state.activeTab === "lessons") root.innerHTML = renderLessons();
      else if (state.activeTab === "vocab") root.innerHTML = renderVocab();
      else if (state.activeTab === "practice") renderPracticeView(root,focused);
      else if (state.activeTab === "grammar") root.innerHTML = renderGrammar();
      else if (state.activeTab === "goethe") root.innerHTML = renderGoethe();
      else if (state.activeTab === "roadmap") root.innerHTML = renderRoadmap();

      studyStats.observeCalendarHeight();
      if (window.lucide) window.lucide.createIcons();
      prepareViewMotion(viewChanged);
      syncSpeechView();
      syncAvatarView();
      if (!viewChanged && focused && !focused.isConnected) {
        const replacement = focusId ? document.getElementById(focusId)
          : focusData.length ? [...root.querySelectorAll('[data-action], [data-speak]')].find(el =>
            focusData.every(([key, value]) => el.dataset[key] === value)) : null;
        if (replacement) {
          replacement.focus({ preventScroll: true });
          if (selection && replacement.setSelectionRange) replacement.setSelectionRange(...selection);
        }
      }
      syncFocusTimer();
      if (state.activeTab === 'dashboard') renderDashboardChart();
      else if (progressChartInstance) { progressChartInstance.destroy(); progressChartInstance = null; }
      if (practiceTop !== null) holdPracticeScroll(practiceTop);
      restorePlace(liveTop, liveInner); rememberWorkspace();
    }

    // --- VIEW 1: DASHBOARD ---
    function updateDashboardWord(card, word) {
      const german = fullGermanWord(word);
      const listen = card.querySelector('[data-speak]');
      if (activeSpeechSession?.button === listen) stopGermanSpeech();
      listen.dataset.speak = german;
      card.querySelector('[data-word-article]').innerHTML = articleBadge(word.art);
      card.querySelector('[data-word-german]').textContent = german;
      card.querySelector('[data-word-plural]').textContent = word.plural || '';
      card.querySelector('[data-word-pron]').textContent = `[${word.pron ?? ''}]`;
      card.querySelector('[data-word-uz]').textContent = word.uz;
      card.querySelector('[data-word-origin]').textContent = word.lessonId ? `${word.lessonId}-dars (${word.level})` : 'Shaxsiy lug‘at';
    }

    function renderDashboard(allWords) {
      const allLessons = getAllLessons();
      const totalEx = getTotalExercises();
      const solvedCount = Object.values(state.solvedExercises).filter(x => x?.correct || x?.reviewed).length;
      const completedLessonsCount = state.completedLessons.length;
      const masteredCount = state.masteredWords.length;
      const blocksDone = state.dailyBlocks.completed.length;

      const activeLesson = allLessons.find(l => Number(l.id) === Number(state.selectedLessonId)) || allLessons[allLessons.length - 1];

      return `
        <div class="space-y-6">
          <!-- Hero Banner -->
          <section class="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div class="absolute right-0 top-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div class="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div class="space-y-2 max-w-2xl">
                <div class="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Faol jadval: ${esc(SCHEDULE_INFO.time)} · ${esc(SCHEDULE_INFO.title)}</span>
                </div>
                <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Guten Tag! B1 sari har kungi qadamingiz</h1>
                <p class="text-slate-300 text-sm sm:text-base">
                  Platformada hozir <strong>${allLessons.length} ta dars</strong> va <strong>${allWords.length} ta so'z</strong> mavjud. IndexedDB bazasi 500+ dars va 3000+ so'zni kompyuter va telefonda tezkor saqlaydi.
                </p>
              </div>
              <div class="flex flex-wrap gap-2.5 shrink-0">
                <button type="button" data-action="open-lesson" data-lesson="${activeLesson.id}" class="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition flex items-center gap-2 shadow-sm">
                  <i data-lucide="play-circle" class="w-4 h-4"></i>
                  <span>${activeLesson.id}-darsni ochish</span>
                </button>
                <button type="button" data-action="open-sync" class="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition flex items-center gap-2">
                  <i data-lucide="plus-circle" class="w-4 h-4"></i>
                  <span>Jadval darsini qo'shish</span>
                </button>
              </div>
            </div>
          </section>

          <!-- KPI Cards -->
          <section class="stagger-grid db-kpis gap-4">
            <div class="motion-card bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                <span>Tugatilgan darslar</span>
                <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i>
              </div>
              <div class="text-2xl font-extrabold text-slate-900">${completedLessonsCount} <span class="text-sm font-semibold text-slate-400">/ ${allLessons.length}</span></div>
              <div class="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div data-study-fill class="h-full bg-emerald-500 rounded-full" style="width:${allLessons.length ? Math.round((completedLessonsCount / allLessons.length) * 100) : 0}%"></div>
              </div>
            </div>

            <div class="motion-card bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                <span>Yechilgan mashqlar</span>
                <i data-lucide="pen-tool" class="w-4 h-4 text-blue-600"></i>
              </div>
              <div class="text-2xl font-extrabold text-slate-900">${solvedCount} <span class="text-sm font-semibold text-slate-400">/ ${totalEx}</span></div>
              <div class="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div data-study-fill class="h-full bg-blue-500 rounded-full" style="width:${totalEx ? Math.round((solvedCount / totalEx) * 100) : 0}%"></div>
              </div>
            </div>

            <div class="motion-card bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                <span>Yodlangan so'zlar</span>
                <i data-lucide="bookmark-check" class="w-4 h-4 text-amber-600"></i>
              </div>
              <div class="text-2xl font-extrabold text-slate-900">${masteredCount} <span class="text-sm font-semibold text-slate-400">/ ${allWords.length}</span></div>
              <div class="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div data-study-fill class="h-full bg-amber-500 rounded-full" style="width:${allWords.length ? Math.round((masteredCount / allWords.length) * 100) : 0}%"></div>
              </div>
            </div>

            <div class="motion-card bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div class="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                <span>Bugungi 2 soatlik reja</span>
                <i data-lucide="timer" class="w-4 h-4 text-rose-600"></i>
              </div>
              <div class="text-2xl font-extrabold text-slate-900">${blocksDone} <span class="text-sm font-semibold text-slate-400">/ 4 blok</span></div>
              <div class="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div data-study-fill class="h-full bg-rose-500 rounded-full" style="width:${Math.round((blocksDone / 4) * 100)}%"></div>
              </div>
            </div>
          </section>

          <div class="db-layout-tools"><button type="button" data-layout-toggle aria-pressed="false">Joylashuvni sozlash</button><button type="button" data-layout-save hidden>Joylashuvni saqlash</button><button type="button" data-layout-restore hidden>Saqlanganini qaytarish</button><button type="button" data-layout-reset hidden>Asl holatga qaytarish</button></div>
          ${renderFocusTimer("dashboard")}
      ${studyStats.render()}

          <!-- Main Desktop 3-Column Grid -->
          <div data-layout-columns class="gap-6">
            <div class="min-w-0 space-y-6">
              <!-- Active Lesson Card -->
              <div data-layout-card="lesson" class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold">${activeLesson.id}-dars</span>
                    <span class="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold">${esc(activeLesson.level)}</span>
                    <span class="text-xs text-slate-500 font-medium">Oxirgi faol dars</span>
                  </div>
                  <span class="text-xs font-semibold text-slate-500">${(activeLesson.words || []).length} so'z · ${(activeLesson.exercises || []).length} mashq · Mini-dialog</span>
                </div>
                <h2 class="text-xl font-bold text-slate-900 mb-2">${esc(activeLesson.title)}</h2>
                <p class="text-sm text-slate-600 mb-4">${esc(activeLesson.summary)}</p>
                <div class="flex flex-wrap items-center gap-3">
                  <button type="button" data-action="open-lesson" data-lesson="${activeLesson.id}" class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition flex items-center gap-2">
                    <i data-lucide="book-open-check" class="w-4 h-4"></i>
                    <span>Batafsil dars va mashqlarni ochish</span>
                  </button>
                  <button type="button" data-nav="practice" class="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition flex items-center gap-2">
                    <i data-lucide="layers" class="w-4 h-4"></i>
                    <span>Fleshkartada mashq qilish</span>
                  </button>
                </div>
              </div>

              <div data-layout-card="chart" class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                <div>
                  <h2 class="text-lg font-bold text-slate-900">Oxirgi 7 kun</h2>
                  <p class="text-xs text-slate-500">Kunni bosib natijasini oching.</p>
                </div>
                <div class="relative h-56 w-full"><canvas id="progress-activity-chart" aria-label="Oxirgi 7 kunning faol vaqti va javoblari" role="img"></canvas></div>

                <!-- Interactive Graded Lessons Mastery Strip (in Daily Streaks) -->
                <div class="pt-3 border-t border-slate-100 space-y-2.5">
                  ${(() => {
                    const allL = getAllLessons();
                    const grades = state.lessonGrades || {};
                    const gradedList = allL.filter(l => grades[l.id]);
                    const avgPct = gradedList.length ? Math.round(gradedList.reduce((s, l) => s + grades[l.id].pct, 0) / gradedList.length) : 0;
                    return `
                      <div class="flex flex-wrap items-center justify-between gap-2">
                        <div class="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                          <i data-lucide="award" class="w-4 h-4 text-emerald-600"></i>
                          <span>Baholangan darslar natijasi (${gradedList.length}/${allL.length})</span>
                        </div>
                        <span class="text-xs font-bold ${avgPct >= 75 ? 'text-emerald-700' : 'text-amber-700'}">O'rtacha o'zlashtirish: ${avgPct}%</span>
                      </div>
                      <div class="flex flex-wrap gap-1.5">
                        ${allL.slice(0, 24).map(l => {
                          const g = grades[l.id];
                          const meta = g ? computeGradeMeta(g.pct) : null;
                          return `
                            <button type="button" data-action="open-mastery-quiz" data-lesson="${l.id}" title="${l.id}-dars: ${esc(l.title)} ${g ? '(' + g.grade + ' · ' + g.pct + '%)' : '(Baholash uchun bosing)'}" class="px-2.5 py-1.5 rounded-xl border text-xs font-bold transition hover:scale-105 ${g ? meta.pill : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-amber-400 hover:text-slate-900'}">
                              <span>${l.id}-dars</span>
                              ${g ? `<span class="ml-1 font-extrabold">${g.grade} (${g.pct}%)</span>` : '<span class="ml-1 opacity-60">· Test</span>'}
                            </button>`;
                        }).join("")}
                      </div>`;
                  })()}
                </div>

                <!-- SRS & Sentence Builder Quick Launch -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                  <button type="button" data-action="open-practice-mode" data-mode="srs" class="text-left p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 hover:bg-amber-100/70 transition flex items-center justify-between gap-2">
                    <div>
                      <div class="text-xs font-extrabold text-amber-900">Oraliqli takrorlash (SRS)</div>
                      <div class="text-xs text-slate-600 mt-0.5">Bugun takrorlash: <strong>${getSrsStats().due} ta so'z</strong></div>
                    </div>
                    <i data-lucide="arrow-right" class="w-4 h-4 text-amber-700 shrink-0"></i>
                  </button>
                  <button type="button" data-action="open-practice-mode" data-mode="builder" class="text-left p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 hover:bg-blue-100/70 transition flex items-center justify-between gap-2">
                    <div>
                      <div class="text-xs font-extrabold text-blue-900">Gap tuzish konstruktori</div>
                      <div class="text-xs text-slate-600 mt-0.5">${SENTENCE_BUILDER_DATA.length} ta interaktiv nemischa gap</div>
                    </div>
                    <i data-lucide="arrow-right" class="w-4 h-4 text-blue-700 shrink-0"></i>
                  </button>
                </div>
              </div>

              <!-- Daily 4-Block Study Plan -->
              <div data-layout-card="plan" class="reveal-on-scroll bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h2 class="text-lg font-bold text-slate-900">Bugungi 2 soatlik dars bloklari</h2>
                    <p class="text-xs text-slate-500">Har bir blok 30 daqiqa · Bajarilganlarini belgilang</p>
                  </div>
                  <button type="button" data-nav="roadmap" class="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                    <span>Taymerni ochish</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  ${STUDY_BLOCKS.map(b => {
                    const done = state.dailyBlocks.completed.includes(b.id);
                    return `
                      <button type="button" data-action="toggle-block" data-block="${b.id}" aria-pressed="${done}" class="text-left p-4 rounded-xl border transition flex items-start gap-3 ${done ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50/60 border-slate-200 hover:bg-slate-50'}">
                        <div data-block-mark class="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${done ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 bg-white'}">
                          ${done ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
                        </div>
                        <div class="min-w-0">
                          <div class="text-sm font-bold ${done ? 'text-emerald-900 line-through' : 'text-slate-900'}">${esc(b.title)}</div>
                          <div class="text-xs text-slate-500 mt-0.5">${b.minutes} daqiqa</div>
                        </div>
                      </button>
                    `;
                  }).join("")}
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="min-w-0 space-y-6">
              ${allWords.length ? `
                <div data-layout-card="word" class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Tasodifiy so'z</span>
                    <button type="button" data-action="next-wotd" class="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                      <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
                      <span>Boshqasi</span>
                    </button>
                  </div>
                  <div class="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div data-word-article class="mb-2"></div>
                      <div data-word-german aria-live="polite" lang="de" class="text-2xl font-extrabold text-slate-900"></div>
                      <div data-word-plural lang="de" class="text-xs text-slate-500 mt-0.5 min-h-4"></div>
                    </div>
                    <button type="button" data-speak="" class="p-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition shrink-0" title="Tinglash">
                      <i data-lucide="volume-2" class="w-5 h-5"></i>
                    </button>
                  </div>
                  <div data-word-pron class="text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg inline-block mb-3"></div>
                  <div data-word-uz class="text-base font-semibold text-slate-800 border-t border-slate-100 pt-3"></div>
                  <div data-word-origin class="text-xs text-slate-400 mt-1"></div>
                </div>
              ` : ''}

              <div data-layout-card="rules" class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <i data-lucide="award" class="w-4 h-4 text-amber-600"></i>
                  <span>Nemis tilining 3 oltin qoidasi</span>
                </h3>
                <div class="space-y-3">
                  ${GOLDEN_RULES.map(r => `
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div class="text-xs font-bold text-slate-900">${r.num}. ${esc(r.title)}</div>
                      <div class="text-xs text-slate-600 mt-1">${esc(r.desc)}</div>
                      <div class="text-xs font-semibold text-amber-700 mt-1">${esc(r.example)}</div>
                    </div>
                  `).join("")}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function renderDailyReadingPane(lesson) {
      const pack = getLessonDailyPack(lesson);
      const t = pack.readingText;
      if (!t) {
        return `<div class="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500">Bu dars uchun hali 100+ so'zlik matn biriktirilmagan. <strong>Dars qo'shish</strong> orqali yangilashingiz mumkin.</div>`;
      }
      const wc = countWords(t.de);
      return `
        <div class="space-y-5">
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white text-xs font-bold">${lesson.id}-kun · ${esc(t.level || lesson.level)}</span>
                  <span class="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">${wc} ta nemischa so'z</span>
                </div>
                <h2 class="text-lg sm:text-xl font-extrabold text-slate-900">${esc(t.title)}</h2>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" data-reading-button data-speak="${esc(t.de)}" data-speech-target="daily-reading-text" aria-controls="daily-reading-text" aria-pressed="false" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition">
                  <i data-lucide="volume-2" class="w-4 h-4"></i><span>Matnni tinglash</span>
                </button>
                <button type="button" data-action="toggle-text-translation" class="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700">
                  ${ui.showLessonTranslation ? "Tarjimani yashirish" : "O'zbekcha tarjima"}
                </button>
              </div>
            </div>
            <div id="daily-reading-text" lang="de" class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-base leading-8 text-slate-900 font-medium">${renderSpeechText(t.de)}</div>
            ${ui.showLessonTranslation && t.uz ? `<div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-sm leading-relaxed text-slate-800"><div class="text-xs font-extrabold uppercase text-amber-800 mb-1">O'zbekcha tarjimasi</div>${esc(t.uz)}</div>` : ''}
            ${(t.vocab || []).length ? `<div class="flex flex-wrap gap-2">${t.vocab.map(v => `<span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">${esc(v)}</span>`).join("")}</div>` : ''}
          </div>
          ${(t.questions || []).length ? `
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
              <h3 class="text-base font-bold text-slate-900">Matn bo'yicha tekshiruv (Richtig / Falsch)</h3>
              ${t.questions.map((item, idx) => {
                const key = `${t.id}_q${idx}`;
                const picked = state.readingAnswers[key];
                const hasPicked = picked !== undefined;
                const ok = hasPicked && picked === item.ans;
                return `
                  <div class="p-4 rounded-xl border ${!hasPicked ? 'bg-slate-50 border-slate-200' : ok ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'} flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div class="text-sm font-semibold text-slate-900">${idx + 1}. ${esc(item.q)}</div>
                    <div class="flex items-center gap-2 shrink-0">
                      <button type="button" data-action="answer-reading" data-key="${key}" data-val="true" data-correct="${item.ans === true}" class="px-3.5 py-1.5 rounded-lg text-xs font-bold border transition ${picked === true ? (ok ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-rose-600 text-white border-rose-600') : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}">Richtig</button>
                      <button type="button" data-action="answer-reading" data-key="${key}" data-val="false" data-correct="${item.ans === false}" class="px-3.5 py-1.5 rounded-lg text-xs font-bold border transition ${picked === false ? (ok ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-rose-600 text-white border-rose-600') : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}">Falsch</button>
                    </div>
                  </div>`;
              }).join("")}
            </div>` : ''}
        </div>`;
    }

    function renderDailyGoethePane(lesson) {
      const pack = getLessonDailyPack(lesson);
      const gt = pack.goetheTasks;
      if (!gt) {
        return `<div class="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-500">Bu dars uchun Goethe mashqlari hali qo'shilmagan.</div>`;
      }
      const gLink = GOETHE_LINKS[gt.level] || GOETHE_LINKS.A1;
      const wTask = gt.writing;
      const lTask = gt.listening;
      const sTask = gt.speaking;
      return `
        <div class="space-y-5">
          <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-extrabold">${lesson.id}-kun · Goethe ${esc(gt.level)}</span>
              ${[
                { id: "writing", label: "Schreiben (Yozish)" },
                { id: "listening", label: "Hören (Tinglash)" },
                { id: "speaking", label: "Sprechen (Gapirish)" }
              ].map(sk => `<button type="button" data-action="set-day-goethe-skill" data-skill="${sk.id}" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${ui.dayGoetheSkill === sk.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">${sk.label}</button>`).join("")}
            </div>
            <a href="${gLink.onlineUrl}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1">
              <span>Goethe ${esc(gt.level)} rasmiy bazasi ↗</span>
            </a>
          </div>

          ${ui.dayGoetheSkill === "writing" && wTask ? (() => {
            const draft = state.writingDrafts[wTask.id] || "";
            const wc = countWords(draft);
            const showSample = !!ui.showWritingSample[wTask.id];
            return `
              <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div><span class="text-xs font-bold text-amber-700">${esc(wTask.part || 'Schreiben')}</span><h3 class="text-lg font-extrabold text-slate-900">${esc(wTask.title)}</h3></div>
                  <span class="px-3 py-1 rounded-full text-xs font-bold ${wc >= (wTask.targetWords || 30) ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}">Yozilgan: <span id="wc-${wTask.id}">${wc}</span> / ${wTask.targetWords || 30} so'z</span>
                </div>
                <p class="text-sm text-slate-700">${esc(wTask.prompt)}</p>
                <ul class="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200/70 text-xs text-slate-700">${(wTask.points || []).map(p => `<li class="flex items-start gap-2"><span class="text-amber-600 font-bold">✓</span><span>${esc(p)}</span></li>`).join("")}</ul>
                <textarea data-writing-id="${wTask.id}" rows="5" placeholder="Nemis tilida javobingizni yozing..." class="w-full rounded-xl border border-slate-300 p-3.5 text-sm leading-relaxed focus:ring-2 focus:ring-slate-900 focus:outline-none">${esc(draft)}</textarea>
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <button type="button" data-action="toggle-writing-sample" data-tid="${wTask.id}" class="text-xs font-bold text-amber-700 hover:underline">${showSample ? "Namuna javobni yashirish" : "Namuna javobni ko'rish"}</button>
                  <button type="button" data-show-captions data-speak="${esc(draft || wTask.sample)}" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5"><i data-lucide="volume-2" class="w-3.5 h-3.5"></i><span>Tinglash</span></button>
                </div>
                ${showSample ? `<div class="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-sm whitespace-pre-line text-slate-800"><div class="text-xs font-extrabold text-emerald-800 mb-1">Namuna javob:</div>${esc(wTask.sample)}</div>` : ''}
              </div>`;
          })() : ''}

          ${ui.dayGoetheSkill === "listening" && lTask ? (() => {
            const plays = ui.listeningPlays[lTask.id] || 0;
            const showTr = !!ui.showListeningTranscript[lTask.id];
            return `
              <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div><span class="text-xs font-bold text-amber-700">${esc(lTask.part || 'Hören')}</span><h3 class="text-lg font-extrabold text-slate-900">${esc(lTask.title)}</h3></div>
                  <div class="flex items-center gap-2">
                    <button type="button" data-action="play-listening" data-tid="${lTask.id}" data-speech-target="transcript-${esc(lTask.id)}" data-text="${esc(lTask.transcript)}" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"><i data-lucide="headphones" class="w-4 h-4"></i><span>Tinglash (${plays})</span></button>
                    <button type="button" data-action="toggle-listening-transcript" data-tid="${lTask.id}" class="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">${showTr ? "Matnni yashirish" : "Audio matni"}</button>
                  </div>
                </div>
                <div id="transcript-${esc(lTask.id)}" lang="de" ${showTr ? '' : 'hidden'} class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700">${renderSpeechText(lTask.transcript)}</div>
                <div class="space-y-3">
                  ${(lTask.questions || []).map((q, qi) => {
                    const key = `${lTask.id}_q${qi}`;
                    const picked = state.listeningAnswers[key];
                    const hasPicked = picked !== undefined;
                    const ok = hasPicked && Number(picked) === Number(q.ans);
                    return `
                      <div class="p-4 rounded-xl border ${!hasPicked ? 'bg-slate-50 border-slate-200' : ok ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'} space-y-2">
                        <div class="text-sm font-bold text-slate-900">${qi + 1}. ${esc(q.q)}</div>
                        <div class="flex flex-wrap gap-2">
                          ${(q.options || []).map((opt, oi) => {
                            const selected = hasPicked && Number(picked) === oi;
                            let cls = "bg-white border-slate-300 text-slate-800 hover:bg-slate-100";
                            if (selected && ok) cls = "bg-emerald-600 border-emerald-600 text-white";
                            else if (selected && !ok) cls = "bg-rose-600 border-rose-600 text-white";
                            return `<button type="button" data-action="answer-listening" data-key="${key}" data-idx="${oi}" data-correct="${oi === Number(q.ans)}" class="px-3.5 py-2 rounded-lg border text-xs font-bold transition ${cls}">${esc(opt)}</button>`;
                          }).join("")}
                        </div>
                      </div>`;
                  }).join("")}
                </div>
              </div>`;
          })() : ''}

          ${ui.dayGoetheSkill === "speaking" && sTask ? `
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span class="text-xs font-bold text-amber-700">${esc(sTask.part || 'Sprechen')}</span>
                  <h3 class="text-lg font-extrabold text-slate-900">${esc(sTask.title)}</h3>
                  <p class="text-sm text-slate-600 mt-1">${esc(sTask.prompt)}</p>
                </div>
                <div class="bg-slate-900 text-white px-4 py-3 rounded-xl text-center shrink-0 min-w-[140px]">
                  <div class="text-[10px] uppercase font-bold text-amber-400">Taymer</div>
                  <div id="speak-timer-display" class="text-2xl font-extrabold font-mono my-1">${formatTimer(ui.speakSecLeft)}</div>
                  <div class="flex items-center justify-center gap-1.5">
                    <button type="button" data-action="speak-timer-toggle" class="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold">${ui.speakRunning ? 'Pauza' : 'Boshlash'}</button>
                    <button type="button" data-action="speak-timer-reset" data-sec="${sTask.durationSec || 90}" class="px-2.5 py-1 rounded-lg bg-white/15 text-white text-xs font-semibold">Qayta</button>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${(sTask.redemittel || []).map(r => `
                  <div class="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div><div class="text-sm font-bold text-slate-900">${esc(r.de)}</div><div class="text-xs text-slate-500 mt-0.5">${esc(r.uz)}</div></div>
                    <button type="button" data-show-captions data-speak="${esc(r.de)}" class="p-2 rounded-lg bg-white border border-slate-200 hover:bg-amber-50 text-amber-700 shrink-0"><i data-lucide="volume-2" class="w-4 h-4"></i></button>
                  </div>`).join("")}
              </div>
            </div>` : ''}
        </div>`;
    }

    // --- VIEW 2: DAILY LESSONS (SCALABLE TO 500+ LESSONS + DEEP DETAILS) ---
    function renderLessonVideo(lesson) {
      const video = normalizeLessonVideo(lesson.video);
      if (!video) return "";
      const id = new URL(video.url).searchParams.get("v");
      const title = video.title || lesson.title;
      // A file URL never supplies a Referer to YouTube. Host that iframe on the local server.
      const playerUrl = location.protocol === "file:"
        ? "http://127.0.0.1:8743/assets/lesson-youtube.html?v=" + id
        : "https://www.youtube.com/embed/" + id;
      return `<section class="lesson-video" aria-labelledby="lesson-video-title">
        <h3 id="lesson-video-title" class="text-base font-extrabold text-slate-900">${esc(title)}</h3>
        ${video.channel ? `<p class="text-xs font-semibold text-slate-600">${esc(video.channel)}</p>` : ""}
        ${video.description ? `<p class="text-sm text-slate-700">${esc(video.description)}</p>` : ""}
        <iframe src="${playerUrl}" title="${esc(title)}"
          loading="lazy" referrerpolicy="strict-origin-when-cross-origin"
          allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>
        <a class="text-sm font-bold text-amber-700 hover:underline" href="${video.url}" target="_blank" rel="noopener noreferrer">YouTube’da ochish ↗</a>
      </section>`;
    }

    function mobileStudyPicker(id, label, items, selected, optionLabel, renderRow) {
      const current = items.find(item => String(item.id) === String(selected));
      return `<div class="mobile-study-picker">
        ${current ? renderRow(current, true) : `<div class="text-xs text-slate-500 p-3">${items.length ? esc(label) : 'Natija topilmadi.'}</div>`}
        <select id="${id}" aria-label="${esc(label)}" ${items.length ? '' : 'disabled'}>
          ${current ? '' : `<option value="" selected disabled>${esc(label)}</option>`}
          ${items.map(item => `<option value="${esc(item.id)}" ${item === current ? 'selected' : ''}>${esc(optionLabel(item))}</option>`).join('')}
        </select></div>`;
    }

    function renderLessons() {
      const allLessons = getAllLessons();
      const q = ui.lessonSearch.trim().toLowerCase();

      const filteredLessons = allLessons.filter(l => {
        if (ui.lessonLevel !== "all" && l.level !== ui.lessonLevel) return false;
        if (q) {
          const hay = `${l.id}-dars ${l.level} ${l.title} ${l.summary}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });

      const totalPages = Math.max(1, Math.ceil(filteredLessons.length / ui.lessonsPerPage));
      if (ui.lessonPage > totalPages) ui.lessonPage = totalPages;
      const start = (ui.lessonPage - 1) * ui.lessonsPerPage;
      const pagedLessons = filteredLessons.slice(start, start + ui.lessonsPerPage);

      const lesson = allLessons.find(l => Number(l.id) === Number(state.selectedLessonId)) || allLessons[0];
      const lessonIdx = allLessons.findIndex(l => Number(l.id) === Number(lesson.id));
      const prevLesson = lessonIdx > 0 ? allLessons[lessonIdx - 1] : null;
      const nextLesson = lessonIdx < allLessons.length - 1 ? allLessons[lessonIdx + 1] : null;
      const isCompleted = completedLessonSet.has(Number(lesson.id));
      const exercises = lesson.exercises || [];
      const lessonSolved = exercises.filter(ex => state.solvedExercises[ex.id]?.correct || state.solvedExercises[ex.id]?.reviewed).length;

      function lessonRow(l, preview = false) {
                  const active = Number(l.id) === Number(lesson.id);
                  const done = completedLessonSet.has(Number(l.id));
                  const solved = (l.exercises || []).filter(e => state.solvedExercises[e.id]?.correct || state.solvedExercises[e.id]?.reviewed).length;
                  return `
                    <${preview ? 'div aria-hidden="true"' : 'button type="button"'} ${preview ? '' : 'data-action="select-lesson"'} data-lesson="${l.id}" ${active ? 'aria-current="true"' : ''} class="shrink-0 lg:shrink text-left px-3 py-2.5 rounded-xl border transition flex items-start justify-between gap-2 min-w-[210px] lg:min-w-0 ${active ? 'lesson-current' : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'}">
                      <div class="min-w-0">
                        <div class="flex flex-wrap items-center gap-1.5">
                          <span class="text-xs font-bold ${active ? 'lesson-current-accent' : 'text-amber-700'}">${l.id}-dars</span>
                          <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded ${active ? 'lesson-current-level' : 'bg-slate-100 text-slate-600'}">${esc(l.level)}</span>
                        </div>
                        <div class="text-xs font-semibold mt-1 line-clamp-2">${esc(l.title)}</div>
                        <div class="text-[11px] mt-1 ${active ? 'lesson-current-meta' : 'text-slate-400'}">Mashq: ${solved}/${(l.exercises || []).length} · So'z: ${(l.words || []).length}</div>
                        ${(() => {
                          const g = (state.lessonGrades || {})[l.id];
                          if (!g) return '';
                          const meta = computeGradeMeta(g.pct);
                          return `<div class="mt-1.5 flex items-center gap-1.5"><div class="flex-1 h-1.5 rounded-full ${active ? 'lesson-current-level' : 'bg-slate-200'} overflow-hidden"><div data-study-fill class="h-full ${meta.bar} rounded-full" style="width:${g.pct}%"></div></div><span class="text-[10px] font-extrabold ${active ? 'lesson-current-accent' : meta.ring}">${g.grade} ${g.pct}%</span></div>`;
                        })()}
                      </div>
                      <div class="mt-0.5 shrink-0">
                        ${done ? `<i data-lucide="check-circle-2" class="w-4 h-4 ${active ? 'text-emerald-400' : 'text-emerald-600'}"></i>` : `<i data-lucide="circle" class="w-4 h-4 ${active ? 'text-slate-600' : 'text-slate-300'}"></i>`}
                      </div>
                    </${preview ? 'div' : 'button'}>
                  `;
                }

      return `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Scalable Lesson Sidebar (handles 500+ lessons smoothly) -->
          <aside class="lg:col-span-4 xl:col-span-3">
            <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm lg:sticky lg:top-24 space-y-3">
              <div class="flex items-center justify-between gap-2">
                <h2 class="font-bold text-slate-900 text-sm">Darslar (${filteredLessons.length})</h2>
                <button type="button" data-action="open-sync" class="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                  <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                  <span>Jadvaldan</span>
                </button>
              </div>

              <!-- Sidebar Search & CEFR Level Filter -->
              <div class="space-y-2">
                <input id="lesson-search-input" type="text" value="${esc(ui.lessonSearch)}" placeholder="Dars raqami yoki mavzusi..." class="w-full rounded-xl border border-slate-300 px-3 py-1.5 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none" />
                <div class="flex flex-wrap gap-1">
                  ${["all", "A1.1", "A1.2", "A2.1", "A2.2", "B1"].map(lv => `
                    <button type="button" data-action="set-lesson-level" data-level="${lv}" class="px-2 py-1 rounded-lg text-[11px] font-bold transition ${ui.lessonLevel === lv ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                      ${lv === 'all' ? 'Barchasi' : lv}
                    </button>
                  `).join("")}
                </div>
              </div>

              <!-- Paginated Lesson List -->
              <div id="lesson-list-scroll" data-list-key="${esc(JSON.stringify([ui.lessonPage,ui.lessonLevel,q]))}" data-study-scroll class="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 max-h-[55vh] lg:overflow-y-auto">
                ${mobileStudyPicker("mobile-lesson-select", "Darsni tanlang", filteredLessons, lesson.id, l => `${l.id}-dars · ${l.level} · ${l.title}`, lessonRow)}
                ${pagedLessons.length === 0 ? `<div class="text-xs text-slate-500 p-3 text-center">Dars topilmadi.</div>` : pagedLessons.map(item => lessonRow(item)).join("")}
              </div>

              ${totalPages > 1 ? `<div class="desktop-lesson-pages">${renderPagination(ui.lessonPage, totalPages, "set-lesson-page")}</div>` : ""}
            </div>
          </aside>

          <!-- Detailed Lesson Workspace -->
          <div class="lg:col-span-8 xl:col-span-9 space-y-6">
            <!-- Header -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <span class="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold">${lesson.id}-dars</span>
                    <span class="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold">${esc(lesson.level)}</span>
                    ${isCompleted ? '<span class="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">Tugatilgan ✓</span>' : ''}
                  </div>
                  <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900">${esc(lesson.title)}</h1>
                  <p class="text-sm text-slate-600 mt-1.5 leading-relaxed">${esc(lesson.summary)}</p>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                  ${(state.customLessons || []).some(cl => Number(cl.id) === Number(lesson.id)) ? `<button type="button" data-action="delete-custom-lesson" data-lesson="${lesson.id}" aria-label="Import qilingan darsni o'chirish" class="p-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition" title="Import qilingan darsni o'chirish"><i data-lucide="trash-2" class="w-4 h-4"></i></button>` : ''}
                  ${(() => {
                    const g = (state.lessonGrades || {})[lesson.id];
                    const meta = g ? computeGradeMeta(g.pct) : null;
                    return `
                      ${g ? `<span class="px-3 py-2 rounded-xl border text-xs font-extrabold ${meta.pill}">${g.grade} · ${g.pct}% (${meta.label})</span>` : ''}
                      <button type="button" data-action="open-mastery-quiz" data-lesson="${lesson.id}" class="px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm ${g && meta.passed ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-amber-500 text-slate-950 hover:bg-amber-400'}">
                        <i data-lucide="clipboard-check" class="w-4 h-4"></i>
                        <span>${g ? 'Qayta baholash (Test)' : "O'zlashtirishni tekshirish"}</span>
                      </button>
                      <button type="button" data-action="toggle-lesson-complete" data-lesson="${lesson.id}" title="Qo'lda belgilash" class="p-2.5 rounded-xl border text-xs font-bold transition ${isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}">
                        <i data-lucide="${isCompleted ? 'check-circle-2' : 'check'}" class="w-4 h-4"></i>
                      </button>`;
                  })()}
                </div>
              </div>
            </div>

            <!-- Unified Daily Schedule 5-Part Bar -->
            <div class="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm flex flex-wrap gap-1.5">
              ${[
                { id: "grammar", label: "1. Grammatika & Dialog", icon: "graduation-cap" },
                { id: "exercises", label: `2. Mashqlar (${lessonSolved}/${exercises.length})`, icon: "pen-tool" },
                { id: "reading", label: "3. Kunlik Matn (100+)", icon: "file-text" },
                { id: "goethe", label: "4. Goethe Sertifikat", icon: "award" },
                { id: "vocab", label: `5. Lug'at (${(lesson.words || []).length})`, icon: "languages" }
              ].map(tab => `
                <button type="button" data-action="set-lesson-subtab" data-subtab="${tab.id}" class="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${ui.lessonSubTab === tab.id ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}">
                  <i data-lucide="${tab.icon}" class="w-3.5 h-3.5"></i>
                  <span>${tab.label}</span>
                </button>
              `).join("")}
            </div>

            ${ui.lessonSubTab === "reading" ? renderDailyReadingPane(lesson) : ''}
            ${ui.lessonSubTab === "goethe" ? renderDailyGoethePane(lesson) : ''}

            ${ui.lessonSubTab === "grammar" ? `
            <!-- 1. Deep Grammar Explanation + Table + Memory Tip -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <h2 class="text-base font-bold text-slate-900 flex items-center gap-2">
                <i data-lucide="graduation-cap" class="w-5 h-5 text-amber-600"></i>
                <span>1. Batafsil grammatik tushuntirish</span>
              </h2>
              ${renderLessonVideo(lesson)}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${normalizeGrammarPoints(lesson.grammarPoints,lesson.summary).map(gp => `
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    ${gp.heading ? `<div class="font-bold text-sm text-slate-900 mb-1">${esc(gp.heading)}</div>` : ""}
                    <p class="text-sm text-slate-700 leading-relaxed">${esc(gp.text)}</p>
                  </div>
                `).join("")}
              </div>

              ${lesson.table && lesson.table.headers ? `
                <div id="lesson-table-scroll" data-study-scroll class="overflow-x-auto rounded-xl border border-slate-200">
                  <table class="w-full text-left text-sm">
                    <thead class="bg-slate-100 text-slate-700 text-xs uppercase">
                      <tr>${lesson.table.headers.map(h => `<th class="px-4 py-2.5 font-bold">${esc(h)}</th>`).join("")}</tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                      ${lesson.table.rows.map(row => `
                        <tr class="hover:bg-slate-50/70">
                          ${row.map((cell, idx) => `<td class="px-4 py-2.5 ${idx === 0 ? 'font-semibold text-slate-900' : 'text-slate-700'}">${esc(cell)}</td>`).join("")}
                        </tr>
                      `).join("")}
                    </tbody>
                  </table>
                </div>
              ` : ''}

              ${lesson.memoryTip ? `
                <div class="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
                  <i data-lucide="lightbulb" class="w-5 h-5 text-amber-600 shrink-0 mt-0.5"></i>
                  <div>
                    <div class="text-xs font-extrabold uppercase tracking-wider text-amber-800">Esda saqlash usuli</div>
                    <p class="text-sm text-slate-800 mt-0.5">${esc(lesson.memoryTip)}</p>
                  </div>
                </div>
              ` : ''}

              ${(lesson.examples || []).length ? `
                <div>
                  <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Misol gaplar (tinglash uchun bosing)</div>
                  <div class="space-y-2">
                    ${lesson.examples.map((ex, index) => `
                      <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                        <div>
                          <div class="text-sm font-bold text-slate-900" id="example-line-${index}" lang="de">${renderSpeechText(ex.de)}</div>
                          <div class="text-xs text-slate-600">${esc(ex.uz)}</div>
                        </div>
                        <button type="button" data-speech-target="example-line-${index}" data-speak="${esc(ex.de)}" class="p-2 rounded-lg bg-white hover:bg-amber-100 text-amber-800 border border-slate-200 transition shrink-0" title="Tinglash">
                          <i data-lucide="volume-2" class="w-4 h-4"></i>
                        </button>
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- 2. Common Mistakes & Mini-Dialogue (Desktop 2-Column) -->
            ${((lesson.commonMistakes && lesson.commonMistakes.length) || (lesson.dialogue && lesson.dialogue.length)) ? `
              <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                ${lesson.commonMistakes && lesson.commonMistakes.length ? `
                  <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                    <h2 class="text-base font-bold text-slate-900 flex items-center gap-2">
                      <i data-lucide="alert-triangle" class="w-5 h-5 text-rose-600"></i>
                      <span>Ko'p uchraydigan xatolar</span>
                    </h2>
                    <div class="space-y-3">
                      ${lesson.commonMistakes.map(cm => `
                        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                          <div class="text-rose-700 font-semibold">✕ <span class="line-through">${esc(cm.wrong)}</span></div>
                          <div class="text-emerald-700 font-bold">✓ ${esc(cm.right || cm.correct)}</div>
                          <div class="text-slate-600">${esc(cm.note)}</div>
                        </div>
                      `).join("")}
                    </div>
                  </div>
                ` : ''}

                ${lesson.dialogue && lesson.dialogue.length ? `
                  <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                    <div class="flex items-center justify-between gap-2">
                      <h2 class="text-base font-bold text-slate-900 flex items-center gap-2">
                        <i data-lucide="messages-square" class="w-5 h-5 text-blue-600"></i>
                        <span>Jonli mini-dialog</span>
                      </h2>
                      <button type="button" data-action="play-dialogue" data-lesson="${lesson.id}" class="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition">
                        <i data-lucide="volume-2" class="w-3.5 h-3.5"></i>
                        <span>To'liq tinglash</span>
                      </button>
                    </div>
                    <div class="space-y-2.5">
                      ${lesson.dialogue.map((d, index) => `
                        <div class="flex items-start justify-between gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                          <div>
                            <div class="text-xs font-extrabold text-amber-700">${esc(d.speaker)}</div>
                            <div class="text-sm font-bold text-slate-900 mt-0.5" id="dialogue-line-${index}" lang="de">${renderSpeechText(d.de)}</div>
                            <div class="text-xs text-slate-500 mt-0.5">${esc(d.uz)}</div>
                          </div>
                          <button type="button" data-speech-target="dialogue-line-${index}" data-speak="${esc(d.de)}" class="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 shrink-0" title="Tinglash">
                            <i data-lucide="volume-2" class="w-4 h-4"></i>
                          </button>
                        </div>
                      `).join("")}
                    </div>
                  </div>
                ` : ''}
              </div>
            ` : ''}

            ` : ''}

            ${ui.lessonSubTab === "exercises" ? `
            <!-- 3. Interactive Exercises -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h2 class="text-base font-bold text-slate-900 flex items-center gap-2">
                  <i data-lucide="pen-tool" class="w-5 h-5 text-blue-600"></i>
                  <span>2. Amaliy mashqlar (${lessonSolved}/${exercises.length} bajarildi)</span>
                </h2>
                <button type="button" data-action="reset-lesson-exercises" data-lesson="${lesson.id}" class="text-xs font-semibold text-slate-500 hover:text-slate-800">
                  Mashqlarni qayta boshlash
                </button>
              </div>

              <div class="space-y-3">
                ${exercises.map((ex, idx) => {
                  const saved = state.solvedExercises[ex.id];
                  const selfReview = ex.type === "selfcheck";
                  const isRight = !selfReview && saved?.correct;
                  const isWrong = !selfReview && saved && !saved.correct;
                  const reviewed = selfReview && (saved?.reviewed || saved?.correct);
                  return `
                    <div data-exercise-feedback="${ex.id}" class="p-4 rounded-xl border ${isRight ? 'bg-emerald-50/60 border-emerald-200' : isWrong ? 'bg-rose-50/60 border-rose-200' : 'bg-slate-50/70 border-slate-200'}">
                      <div class="flex items-start justify-between gap-2 mb-2.5">
                        <div class="text-sm font-semibold text-slate-900">
                          <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-900 text-white text-xs font-bold mr-1.5">${idx + 1}</span>
                          ${esc(ex.prompt)}
                        </div>
                        ${isRight || reviewed ? `<span class="text-xs font-bold text-emerald-700 shrink-0">${reviewed ? "Saqlandi" : "To‘g‘ri!"}</span>` : ""}
                      </div>

                      ${ex.type === "choice" ? `
                        <div class="flex flex-wrap gap-2">
                          ${ex.options.map(opt => {
                            const selected = saved && normalizeAnswer(saved.answer) === normalizeAnswer(opt);
                            let btnClass = "bg-white border-slate-300 text-slate-800 hover:bg-slate-100";
                            if (selected && isRight) btnClass = "bg-emerald-600 border-emerald-600 text-white";
                            else if (selected && isWrong) btnClass = "bg-rose-600 border-rose-600 text-white";
                            return `
                              <button type="button" data-action="answer-choice" data-ex="${ex.id}" data-lesson="${lesson.id}" data-val="${esc(opt)}" class="px-3.5 py-2 rounded-lg border text-sm font-semibold transition ${btnClass}">
                                ${esc(opt)}
                              </button>
                            `;
                          }).join("")}
                        </div>
                      ` : `
                        <div class="flex flex-col sm:flex-row gap-2">
                          <input type="text" id="input-${esc(ex.id)}" value="${esc(saved ? saved.answer : '')}" placeholder="${esc(ex.hint || 'Javobingizni yozing...')}" class="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none" />
                          <button type="button" data-action="check-input" data-ex="${ex.id}" data-lesson="${lesson.id}" class="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition shrink-0">
                            ${selfReview ? "Javobni saqlash" : "Tekshirish"}
                          </button>
                        </div>
                      `}

                      <div class="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div>
                          ${selfReview ? '<span class="text-slate-600">Mustaqil mashq</span>' : ""}
                          ${isWrong ? `<span class="text-rose-700 font-semibold">Noto'g'ri. Qayta urinib ko'ring yoki javobni tekshiring.</span>` : ''}
                          ${isRight ? `<span class="text-emerald-700 font-semibold">Barakalla! To'g'ri javob: ${esc(ex.sampleAnswer)}</span>` : ''}
                        </div>
                        ${ex.sampleAnswer ? `<button type="button" data-action="reveal-answer" data-ex="${ex.id}" data-lesson="${lesson.id}" class="text-slate-500 hover:text-slate-900 underline font-medium">
                          ${selfReview ? "Namunani ko‘rish" : "Javobni ko‘rish"}
                        </button>` : ""}
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>

            ` : ''}

            ${ui.lessonSubTab === "vocab" ? `
            <!-- 4. Lesson Vocabulary -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h2 class="text-base font-bold text-slate-900 flex items-center gap-2">
                  <i data-lucide="languages" class="w-5 h-5 text-emerald-600"></i>
                  <span>3. Dars lug'ati (${(lesson.words || []).length} ta so'z)</span>
                </h2>
                <button type="button" data-action="open-vocab-for-lesson" data-lesson="${lesson.id}" class="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                  <span>Yangi so'zlar sahifasida ochish</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
                ${(lesson.words || []).map(w => `
                  <div class="flex items-center justify-between gap-2 p-3 rounded-xl border border-slate-200/80 hover:bg-slate-50 transition">
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5 flex-wrap">
                        ${articleBadge(w.art)}
                        <span lang="de" class="font-bold text-sm text-slate-900">${esc(w.de)}</span>
                        ${cardDifficulties[w.difficulty] ? `<span class="text-xs text-slate-600">${esc(cardDifficulties[w.difficulty])}</span>` : ""}
                      </div>
                      <div class="text-xs text-slate-500 mt-0.5">[${esc(w.pron)}] · <span class="text-slate-800 font-medium">${esc(w.uz)}</span></div>
                      ${w.meaningDe ? `<p lang="de" class="mt-1.5 text-xs text-slate-700">${esc(w.meaningDe)}</p>` : ""}
                    </div>
                    <button type="button" data-speak="${esc(fullGermanWord(w))}" class="p-2 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition shrink-0" title="Tinglash">
                      <i data-lucide="volume-2" class="w-4 h-4"></i>
                    </button>
                  </div>
                `).join("")}
              </div>
            </div>

            ` : ''}

            <!-- Sequential Daily Step Button -->
            ${(() => {
              const order = [
                { id: "grammar", next: "exercises", label: "2. Amaliy mashqlarga o'tish →" },
                { id: "exercises", next: "reading", label: "3. Kunlik 100+ so'zlik matnga o'tish →" },
                { id: "reading", next: "goethe", label: "4. Goethe sertifikat mashqlariga o'tish →" },
                { id: "goethe", next: "vocab", label: "5. Kunlik lug'atga o'tish →" }
              ];
              const cur = order.find(x => x.id === ui.lessonSubTab);
              return cur ? `<div class="flex justify-end"><button type="button" data-action="set-lesson-subtab" data-subtab="${cur.next}" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition shadow-sm">${cur.label}</button></div>` : '';
            })()}

            <!-- Prev / Next Lesson -->
            <div class="flex items-center justify-between gap-3">
              <button type="button" data-action="select-lesson" data-lesson="${prevLesson ? prevLesson.id : lesson.id}" ${!prevLesson ? 'disabled' : ''} class="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-2">
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
                <span>Oldingi dars</span>
              </button>
              <button type="button" data-action="select-lesson" data-lesson="${nextLesson ? nextLesson.id : lesson.id}" ${!nextLesson ? 'disabled' : ''} class="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-40 flex items-center gap-2">
                <span>Keyingi dars</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // --- VIEW 3: VOCABULARY BANK (PAGINATED FOR 3,000+ WORDS) ---
    function renderVocab() {
      const allLessons = getAllLessons();
      const allWords = getAllWords();
      const q = ui.vocabSearch.trim().toLowerCase();

      let filtered = allWords.filter(w => {
        if (ui.vocabLesson !== "all") {
          if (ui.vocabLesson === "custom" && w.lessonId) return false;
          if (ui.vocabLesson !== "custom" && String(w.lessonId) !== String(ui.vocabLesson)) return false;
        }
        if (ui.vocabType !== "all" && w.art !== ui.vocabType) return false;
        const isMastered = masteredSet.has(w.id);
        const isFav = favoriteSet.has(w.id);
        if (ui.vocabStatus === "mastered" && !isMastered) return false;
        if (ui.vocabStatus === "learning" && isMastered) return false;
        if (ui.vocabStatus === "favorite" && !isFav) return false;
        if (q) {
          const hay = `${w.art} ${w.de} ${w.plural || ''} ${w.pron || ''} ${w.uz}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });

      if (ui.vocabSort === "az") filtered = [...filtered].sort((a, b) => a.de.localeCompare(b.de));
      else if (ui.vocabSort === "za") filtered = [...filtered].sort((a, b) => b.de.localeCompare(a.de));

      const totalPages = Math.max(1, Math.ceil(filtered.length / ui.vocabPerPage));
      if (ui.vocabPage > totalPages) ui.vocabPage = totalPages;
      const start = (ui.vocabPage - 1) * ui.vocabPerPage;
      const pageWords = filtered.slice(start, start + ui.vocabPerPage);

      const masteredCount = state.masteredWords.length;

      return `
        <div class="space-y-6">
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 class="text-2xl font-extrabold text-slate-900">Yangi so'zlar lug'ati</h1>
                <p class="text-sm text-slate-600 mt-1">
                  Jami <strong>${allWords.length} ta</strong> so'z · Ko'rsatilmoqda: <strong>${filtered.length}</strong> · Yodlangan: <strong class="text-emerald-700">${masteredCount}</strong>
                </p>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button type="button" data-action="open-add-word" class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition flex items-center gap-2">
                  <i data-lucide="plus" class="w-4 h-4"></i>
                  <span>Yangi so'z</span>
                </button>
                <button type="button" data-action="open-sync-bulk" class="px-3.5 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-sm font-semibold transition flex items-center gap-1.5">
                  <i data-lucide="upload" class="w-4 h-4"></i>
                  <span>Ommaviy yuklash</span>
                </button>
                <button type="button" data-action="export-vocab-csv" class="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5" title="Excel / Google Sheets uchun tarjimasi bilan CSV">
                  <i data-lucide="file-spreadsheet" class="w-4 h-4"></i>
                  <span>CSV (Excel)</span>
                </button>
                <button type="button" data-action="export-vocab-txt" class="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5" title="O'qish va chop etish uchun TXT">
                  <i data-lucide="file-text" class="w-4 h-4"></i>
                  <span>TXT</span>
                </button>
                <button type="button" data-action="export-vocab" class="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5" title="JSON eksport">
                  <i data-lucide="download" class="w-4 h-4"></i>
                  <span>JSON</span>
                </button>
              </div>
            </div>

            <!-- Filter Bar -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-5 pt-5 border-t border-slate-100">
              <div class="relative lg:col-span-1">
                <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
                <input id="vocab-search-input" type="text" value="${esc(ui.vocabSearch)}" placeholder="Qidiruv..." class="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none" />
              </div>

              <select id="vocab-lesson-select" class="rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none">
                <option value="all" ${ui.vocabLesson === 'all' ? 'selected' : ''}>Barcha darslar (${allLessons.length})</option>
                <option value="custom" ${ui.vocabLesson === 'custom' ? 'selected' : ''}>Shaxsiy so'zlar</option>
                ${allLessons.map(l => `<option value="${l.id}" ${String(ui.vocabLesson) === String(l.id) ? 'selected' : ''}>${l.id}-dars (${l.level})</option>`).join("")}
              </select>

              <select id="vocab-type-select" class="rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none">
                <option value="all" ${ui.vocabType === 'all' ? 'selected' : ''}>Barcha artikl / turlar</option>
                <option value="der" ${ui.vocabType === 'der' ? 'selected' : ''}>der (erkak)</option>
                <option value="die" ${ui.vocabType === 'die' ? 'selected' : ''}>die (ayol)</option>
                <option value="das" ${ui.vocabType === 'das' ? 'selected' : ''}>das (o'rta)</option>
                <option value="verb" ${ui.vocabType === 'verb' ? 'selected' : ''}>Fe'llar</option>
                <option value="other" ${ui.vocabType === 'other' ? 'selected' : ''}>Sifat / Ibora</option>
              </select>

              <select id="vocab-status-select" class="rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none">
                <option value="all" ${ui.vocabStatus === 'all' ? 'selected' : ''}>Barcha holatlar</option>
                <option value="learning" ${ui.vocabStatus === 'learning' ? 'selected' : ''}>Hali yodlanmagan</option>
                <option value="mastered" ${ui.vocabStatus === 'mastered' ? 'selected' : ''}>Yodlangan</option>
                <option value="favorite" ${ui.vocabStatus === 'favorite' ? 'selected' : ''}>Sevimli / Qiyin</option>
              </select>

              <select id="vocab-sort-select" class="rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none">
                <option value="default" ${ui.vocabSort === 'default' ? 'selected' : ''}>Tartib: Dars bo'yicha</option>
                <option value="az" ${ui.vocabSort === 'az' ? 'selected' : ''}>Alifbo: A → Z</option>
                <option value="za" ${ui.vocabSort === 'za' ? 'selected' : ''}>Alifbo: Z → A</option>
              </select>
            </div>
          </div>

          <!-- Paginated Words Grid -->
          ${pageWords.length === 0 ? `
            <div class="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <p class="text-slate-600 font-semibold">Ushbu filtr bo'yicha so'z topilmadi.</p>
              <button type="button" data-action="reset-vocab-filters" class="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold">Filtrlarni tozalash</button>
            </div>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              ${pageWords.map(w => {
                const mastered = masteredSet.has(w.id);
                const fav = favoriteSet.has(w.id);
                return `
                  <div class="motion-card bg-white rounded-2xl border p-4 shadow-sm flex flex-col justify-between ${mastered ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'}">
                    <div>
                      <div class="flex items-start justify-between gap-2 mb-2">
                        <div class="flex items-center gap-1.5 flex-wrap">
                          ${articleBadge(w.art)}
                          <span class="text-[11px] font-semibold text-slate-400">${w.lessonId ? `${w.lessonId}-dars` : 'Shaxsiy'}</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <button type="button" data-speak="${esc(fullGermanWord(w))}" class="p-1.5 rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100 transition" title="Talaffuzni tinglash">
                            <i data-lucide="volume-2" class="w-4 h-4"></i>
                          </button>
                          <button type="button" data-action="toggle-fav" data-word="${w.id}" class="p-1.5 rounded-lg transition ${fav ? 'text-amber-500 bg-amber-50' : 'text-slate-400 hover:bg-slate-100'}" title="Sevimli / Qiyin so'z">
                            <i data-lucide="star" class="w-4 h-4 ${fav ? 'fill-amber-400' : ''}"></i>
                          </button>
                          ${!w.lessonId ? `<button type="button" data-action="delete-custom-word" data-word="${w.id}" aria-label="So'zni o'chirish" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition" title="O'chirish"><i data-lucide="trash-2" class="w-4 h-4"></i></button>` : ''}
                        </div>
                      </div>

                      <div class="text-lg font-extrabold text-slate-900 leading-snug">${esc(fullGermanWord(w))}</div>
                      ${w.plural ? `<div class="text-xs text-slate-500 mt-0.5">${esc(w.plural)}</div>` : ''}
                      <div class="text-xs font-mono text-slate-500 mt-1.5">[${esc(w.pron)}]</div>
                    </div>

                    <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span class="text-sm font-semibold text-slate-800">${esc(w.uz)}</span>
                      <button type="button" data-action="toggle-mastered" data-word="${w.id}" class="px-2.5 py-1 rounded-lg text-xs font-bold transition shrink-0 ${mastered ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}">
                        ${mastered ? 'Yodlangan ✓' : 'Yodladim'}
                      </button>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
            <div class="bg-white rounded-2xl border border-slate-200 px-5 py-3 shadow-sm">
              ${renderPagination(ui.vocabPage, totalPages, "set-vocab-page")}
            </div>
          `}
        </div>
      `;
    }

    // --- VIEW 3.5: INTERACTIVE GERMAN GRAMMAR HUB ---
    function renderGrammar() {
      const cData = GRAMMAR_CASES_DATA[ui.grammarCase] || GRAMMAR_CASES_DATA.Akkusativ;
      const vq = ui.grammarVerbQuery.trim().toLowerCase();
      const filteredVerbs = IRREGULAR_VERBS_TABLE.filter(v =>
        !vq || `${v.inf} ${v.pres3} ${v.prat} ${v.perf} ${v.uz} ${v.note}`.toLowerCase().includes(vq)
      );
      const activeSyntax = SENTENCE_PATTERNS.find(p => p.id === ui.grammarSyntaxId) || SENTENCE_PATTERNS[0];

      return `
        <div class="space-y-6">
          <!-- Grammar Hub Header & Interactive Sub-tabs -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">Interaktiv Grammatika Markazi</span>
                <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Nemis tili qoidalari, jadvallar va istisnolar</h1>
              </div>
              <span class="text-xs text-slate-500">A1.1 → B1 asosiy qoidalar to'plami</span>
            </div>

            <div class="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
              ${[
                { id: "cases", label: "1. Kelishiklar (4 ta)", icon: "table-2" },
                { id: "verbs", label: "2. Kuchli fe'llar va istisnolar", icon: "zap" },
                { id: "articles", label: "3. der/die/das qoidalari", icon: "tags" },
                { id: "syntax", label: "4. Gap tuzilishi (Satzbau)", icon: "blocks" },
                { id: "nuances", label: "5. Inkor & «Ishlamoq»", icon: "sparkles" }
              ].map(t => `
                <button type="button" data-action="set-grammar-tab" data-tab="${t.id}" class="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${ui.grammarTab === t.id ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                  <i data-lucide="${t.icon}" class="w-3.5 h-3.5"></i>
                  <span>${t.label}</span>
                </button>
              `).join("")}
            </div>
          </div>

          ${ui.grammarTab === "cases" ? `
            <!-- 1. INTERACTIVE CASES EXPLORER -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div class="flex flex-wrap items-center gap-2">
                ${["Nominativ", "Akkusativ", "Dativ", "Genitiv"].map(c => `
                  <button type="button" data-action="set-grammar-case" data-case="${c}" class="px-4 py-2 rounded-xl text-xs font-extrabold transition ${ui.grammarCase === c ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">${c}</button>
                `).join("")}
              </div>

              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div class="text-sm font-extrabold text-slate-900">${ui.grammarCase} — <span class="text-amber-700">${esc(cData.question)}</span></div>
                  <div class="text-xs text-slate-600 mt-0.5">${esc(cData.role)}</div>
                </div>
                <div class="text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700">Olmoshlar: ${esc(cData.pronouns)}</div>
              </div>

              <div id="grammar-case-table-scroll" data-study-scroll class="overflow-x-auto rounded-xl border border-slate-200">
                <table class="w-full text-left text-sm">
                  <thead class="bg-slate-100 text-slate-700 text-xs uppercase">
                    <tr>
                      <th class="px-4 py-2.5 font-bold">Jins</th>
                      <th class="px-4 py-2.5 font-bold">Aniq</th>
                      <th class="px-4 py-2.5 font-bold">Noaniq</th>
                      <th class="px-4 py-2.5 font-bold">Inkor</th>
                      <th class="px-4 py-2.5 font-bold">Egalik</th>
                      <th class="px-4 py-2.5 font-bold">Misol (tinglash)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    ${cData.articles.map(row => `
                      <tr class="hover:bg-slate-50/70">
                        <td class="px-4 py-2.5 font-bold text-slate-900">${esc(row.g)}</td>
                        <td class="px-4 py-2.5 font-extrabold text-amber-700">${esc(row.def)}</td>
                        <td class="px-4 py-2.5 font-semibold">${esc(row.indef)}</td>
                        <td class="px-4 py-2.5">${esc(row.neg)}</td>
                        <td class="px-4 py-2.5">${esc(row.poss)}</td>
                        <td class="px-4 py-2.5">
                          <button type="button" data-show-captions data-speak="${esc(row.ex)}" class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-amber-700">
                            <i data-lucide="volume-2" class="w-3.5 h-3.5 text-amber-600"></i><span>${esc(row.ex)}</span>
                          </button>
                        </td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>

              <div class="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-slate-800">
                <strong>Qachon ishlatiladi?</strong> ${esc(cData.triggers)}
              </div>
            </div>
          ` : ui.grammarTab === "verbs" ? `
            <!-- 2. IRREGULAR & STRONG VERBS + EXCEPTIONS -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 class="text-base font-extrabold text-slate-900">Kuchli va noto'g'ri fe'llar jadvali (${filteredVerbs.length} ta)</h2>
                  <p class="text-xs text-slate-500">Istalgan fe'lni bosing — talaffuzi eshitiladi</p>
                </div>
                <input id="grammar-verb-search" type="text" value="${esc(ui.grammarVerbQuery)}" placeholder="Fe'l qidiring (gehen, yemoq, sein)..." class="sm:w-64 rounded-xl border border-slate-300 px-3 py-2 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none" />
              </div>

              <div id="grammar-verb-table-scroll" data-study-scroll class="overflow-x-auto rounded-xl border border-slate-200">
                <table class="w-full text-left text-xs sm:text-sm">
                  <thead class="bg-slate-100 text-slate-700 text-xs uppercase">
                    <tr>
                      <th class="px-3.5 py-2.5 font-bold">Infinitiv</th>
                      <th class="px-3.5 py-2.5 font-bold">er/sie (Präsens)</th>
                      <th class="px-3.5 py-2.5 font-bold">Präteritum</th>
                      <th class="px-3.5 py-2.5 font-bold">Perfekt</th>
                      <th class="px-3.5 py-2.5 font-bold">Tarjima</th>
                      <th class="px-3.5 py-2.5 font-bold">Eslatma / Istisno</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    ${filteredVerbs.map(v => `
                      <tr class="hover:bg-slate-50/70">
                        <td class="px-3.5 py-2.5 font-extrabold text-slate-900">
                          <button type="button" data-speak="${esc(v.inf + ', ' + v.perf)}" class="inline-flex items-center gap-1.5 hover:text-amber-700">
                            <i data-lucide="volume-2" class="w-3.5 h-3.5 text-amber-600"></i><span>${esc(v.inf)}</span>
                          </button>
                        </td>
                        <td class="px-3.5 py-2.5 font-semibold text-blue-700">${esc(v.pres3)}</td>
                        <td class="px-3.5 py-2.5">${esc(v.prat)}</td>
                        <td class="px-3.5 py-2.5 font-bold ${v.perf.startsWith('ist ') ? 'text-emerald-700' : 'text-slate-800'}">${esc(v.perf)}</td>
                        <td class="px-3.5 py-2.5">${esc(v.uz)}</td>
                        <td class="px-3.5 py-2.5 text-xs text-slate-500">${esc(v.note)}</td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ui.grammarTab === "articles" ? `
            <!-- 3. ARTICLE RULES & EXCEPTIONS -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
              ${ARTICLE_RULES_DATA.map(ar => `
                <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between space-y-4">
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      ${articleBadge(ar.art)}
                      <span class="text-xs font-bold text-slate-500">${esc(ar.title)}</span>
                    </div>
                    <ul class="space-y-2 text-xs text-slate-700">
                      ${ar.rules.map(r => `<li class="flex items-start gap-2"><span class="text-emerald-600 font-bold">✓</span><span>${esc(r)}</span></li>`).join("")}
                    </ul>
                  </div>
                  <div class="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/80 space-y-1.5">
                    <div class="text-[11px] font-extrabold uppercase text-rose-700">Muhim istisnolar!</div>
                    ${ar.exceptions.map(ex => `<div class="text-xs text-slate-800">• ${esc(ex)}</div>`).join("")}
                  </div>
                </div>
              `).join("")}
            </div>
          ` : ui.grammarTab === "syntax" ? `
            <!-- 4. INTERACTIVE SENTENCE STRUCTURE BUILDER -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div class="flex flex-wrap gap-2">
                ${SENTENCE_PATTERNS.map(p => `
                  <button type="button" data-action="set-grammar-syntax" data-sid="${p.id}" class="px-3.5 py-2 rounded-xl text-xs font-bold transition ${ui.grammarSyntaxId === p.id ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">${esc(p.label)}</button>
                `).join("")}
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                ${activeSyntax.slots.map(s => `
                  <div class="p-4 rounded-2xl border-2 text-center ${s.hi ? 'border-amber-400 bg-amber-50/60' : 'border-slate-200 bg-slate-50'}">
                    <div class="text-[11px] font-extrabold uppercase tracking-wider ${s.hi ? 'text-amber-700' : 'text-slate-400'}">${esc(s.pos)}</div>
                    <div class="text-lg font-extrabold text-slate-900 my-2">${esc(s.val)}</div>
                    <div class="text-xs text-slate-500">${esc(s.role)}</div>
                  </div>
                `).join("")}
              </div>

              <div class="p-4 rounded-xl bg-slate-900 text-white text-sm flex flex-wrap items-center justify-between gap-3">
                <span>${esc(activeSyntax.note)}</span>
                <button type="button" data-show-captions data-speak="${esc(activeSyntax.slots.map(s => s.val).join(' ').replace('..., ', ''))}" class="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shrink-0">
                  <i data-lucide="volume-2" class="w-3.5 h-3.5"></i><span>Gapni tinglash</span>
                </button>
              </div>
            </div>
          ` : `
            <!-- 5. INKOR & ISHLAMOQ NUANCES -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                <h2 class="text-base font-extrabold text-slate-900">nicht vs kein vs Doch!</h2>
                <div class="space-y-2.5 text-xs">
                  <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200"><strong class="text-blue-700">kein / keine / keinen:</strong> Faqat artiklsiz yoki <em>ein</em> bilan keladigan OTLARni inkor qiladi (<em>Ich habe kein Auto</em>).</div>
                  <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200"><strong class="text-amber-700">nicht:</strong> Fe'l, sifat, joy va aniq/egalik artiklli otni inkor qiladi (<em>Das Buch ist nicht teuer</em>).</div>
                  <div class="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200"><strong class="text-emerald-800">Doch!:</strong> Inkor savolga ijobiy javob berganda (<em>Kommst du nicht? — Doch, ich komme!</em>).</div>
                </div>
              </div>
              <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                <h2 class="text-base font-extrabold text-slate-900">«Ishlamoq» fe'lining 4 xil nemischa ma'nosi</h2>
                ${ISHLAMOQ_NUANCES.map(item => `
                  <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <div class="text-xs font-bold text-slate-500">${esc(item.context)} → <span class="text-slate-900 text-sm">${esc(item.verb)}</span></div>
                      <div class="text-xs text-slate-700 mt-0.5">${esc(item.example)} <span class="text-slate-400">(${esc(item.uz)})</span></div>
                    </div>
                    <button type="button" data-show-captions data-speak="${esc(item.example)}" class="p-2 rounded-lg bg-white border border-slate-200 hover:bg-amber-50 text-amber-700 shrink-0"><i data-lucide="volume-2" class="w-4 h-4"></i></button>
                  </div>
                `).join("")}
              </div>
            </div>
          `}
        </div>
      `;
    }

    // --- VIEW 4: FLASHCARDS & ARTICLE TRAINER ---
    const cardDifficulties = {oson:"Oson","o'rta":"O‘rta",qiyin:"Qiyin"};
    const cardFilters = {
      "fc-filter-select":"fcFilter", "fc-level-select":"fcLevel", "fc-difficulty-select":"fcDifficulty",
      "fc-order-select":"fcOrder", "fc-direction-select":"fcDirection"
    };
    function wordLearningFields(word) {
      const difficulty = typeof word.difficulty === "string"
        ? word.difficulty.trim().toLowerCase().replace(/[‘’ʻʼ]/g, "'") : "";
      return {
        meaningDe:typeof word.meaningDe === "string" ? word.meaningDe.trim() : "",
        difficulty:Object.hasOwn(cardDifficulties,difficulty) ? difficulty : ""
      };
    }
    function wordDifficulty(word) {
      const {difficulty} = wordLearningFields(word);
      if (difficulty) return difficulty;
      const rating = state.cardReviews?.[word.id];
      if (Object.hasOwn(cardDifficulties,rating)) return rating;
      if (masteredSet.has(word.id)) return "oson";
      if (favoriteSet.has(word.id) || /^B[12]|^C[12]/i.test(word.level)) return "qiyin";
      return /^A1\.1$/.test(word.level) ? "oson" : "o'rta";
    }
    function matchesCardFilter(word) {
        const level = String(word.level || "Shaxsiy").toUpperCase();
        if (ui.fcLevel !== "all" && level !== ui.fcLevel && !level.startsWith(ui.fcLevel + ".")) return false;
        if (ui.fcDifficulty !== "all" && ui.fcDifficulty !== wordDifficulty(word)) return false;
        if (ui.fcFilter === "due") return (state.srsMap?.[word.id]?.nextDate || todayStr) <= todayStr;
        if (ui.fcFilter === "unlearned") return !masteredSet.has(word.id);
        if (ui.fcFilter === "favorite") return favoriteSet.has(word.id);
        return ui.fcFilter === "all" || String(word.lessonId) === ui.fcFilter;
    }
    function buildFlashcardDeck(words = getAllWords()) {
      const pool = words.filter(matchesCardFilter);
      if (ui.fcOrder === "random") return shufflePractice(pool);
      if (ui.fcOrder === "mixed") {
        const buckets = new Map(), mixed = [];
        for (const word of pool) {
          const key = String(word.level || "Shaxsiy") + ":" + wordDifficulty(word);
          if (!buckets.has(key)) buckets.set(key,[]);
          buckets.get(key).push(word);
        }
        for (let i = 0; mixed.length < pool.length; i++) {
          for (const bucket of buckets.values()) if (bucket[i]) mixed.push(bucket[i]);
        }
        return mixed;
      }
      return pool;
    }
    function resetFlashcards() {
      ui.fcDeck = buildFlashcardDeck();
      ui.fcIndex = 0;
      ui.fcFlipped = false;
    }
    function wrapFlashcards() {
      const last = ui.fcDeck.at(-1);
      ui.fcDeck = shufflePractice(ui.fcDeck);
      if (ui.fcDeck.length > 1 && ui.fcDeck[0].id === last.id) ui.fcDeck.push(ui.fcDeck.shift());
    }
    function moveFlashcard(step) {
      if (step > 0 && ui.fcIndex + step >= ui.fcDeck.length && ui.fcOrder === "random") wrapFlashcards();
      ui.fcFlipped = false;
      ui.fcIndex = (ui.fcIndex + step + ui.fcDeck.length) % Math.max(1,ui.fcDeck.length);
      renderPracticeUpdate(step > 0 ? "fc-next" : "fc-prev");
    }
    function rateFlashcard(card, rating) {
      const days = {"qiyin":1,"o'rta":3,"oson":7}[rating];
      if (!card || !days || !ui.fcFlipped) return;
      (state.cardReviews ||= {})[card.id] = rating;
      const previous = state.srsMap[card.id];
      const interval = rating === "oson" ? Math.max(days,Math.round((previous?.interval || 1) * 1.6)) : days;
      state.srsMap[card.id] = {
        interval, reps:rating === "qiyin" ? 0 : (previous?.reps || 0) + 1,
        nextDate:addDaysStr(todayStr,interval)
      };
      if (rating === "oson" && !masteredSet.has(card.id)) state.masteredWords.push(card.id);
      recordDailyActivity("word",1);
      studyStats.record("flashcards");
      const keep = (ui.fcFilter !== "due" || rating === "qiyin")
        && (ui.fcFilter !== "unlearned" || !masteredSet.has(card.id))
        && (ui.fcDifficulty === "all" || ui.fcDifficulty === wordDifficulty(card));
      if (!keep || rating === "qiyin" && ui.fcOrder !== "random") {
        ui.fcDeck.splice(ui.fcIndex,1);
        if (keep) {
          const after = Math.min(ui.fcIndex + 3,ui.fcDeck.length);
          ui.fcDeck.splice(after,0,card);
        }
      } else {
        ui.fcIndex++;
        if (ui.fcOrder === "random" && ui.fcIndex >= ui.fcDeck.length) wrapFlashcards();
      }
      ui.fcIndex %= Math.max(1,ui.fcDeck.length);
      ui.fcFlipped = false;
      requestInterfaceCue(rating === "qiyin" ? "retry" : "learned");
      showToast(rating === "qiyin" && keep && ui.fcOrder !== "random" ? "So‘z navbatda yana chiqadi." : `Keyingi takrorlash ${interval} kundan keyin.`);
      renderPracticeUpdate("fc-rate");
    }
    function renderCardSelect(id, label, options) {
      const key = cardFilters[id];
      return `<label class="card-filter">${label}<select id="${id}">${options.map(([value,text]) =>
        `<option value="${esc(value)}" ${ui[key] === value ? "selected" : ""}>${esc(text)}</option>`
      ).join("")}</select></label>`;
    }

    function matchesGameFilter(level, difficulty) {
      const code = String(level || "Shaxsiy").toUpperCase();
      return (ui.gameLevel === "all" || code === ui.gameLevel || code.startsWith(ui.gameLevel + "."))
        && (ui.gameDifficulty === "all" || difficulty === ui.gameDifficulty);
    }
    function gameWords(words = getAllWords()) {
      return words.filter(word => typeof word.de === "string" && word.de.trim() && typeof word.uz === "string" && word.uz.trim()
        && matchesCardFilter(word)
        && (ui.gameSource !== "missed" || ui.gameMisses.includes(word.id)));
    }
    function shufflePractice(items) {
      const pool = [...items];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i],pool[j]] = [pool[j],pool[i]];
      }
      return pool;
    }
    // Track shown IDs per game. A short matching round consumes only its displayed pairs.
    function drawPractice(items, previous, limit = 1, accept = () => true) {
      if (!items.length) return [];
      const mode = ui.practiceMode, seen = new Set(ui.practiceCycles[mode] || []);
      const deck = buildFlashcardDeck(items);
      let ordered = deck.filter(word => !seen.has(word.id));
      if (!ordered.length) { seen.clear(); ordered = deck; }
      if (ordered.length > 1 && previous && ordered[0].id === previous.id) ordered.push(ordered.shift());
      const result = [];
      for (const word of ordered) {
        if (!accept(word)) continue;
        result.push(word); seen.add(word.id);
        if (result.length >= limit) break;
      }
      ui.practiceCycles[mode] = [...seen];
      return result;
    }
    function markPracticeAnswer(word, correct) {
      if (!correct && !ui.gameMisses.includes(word.id)) ui.gameMisses.push(word.id);
      if (correct && ui.gameSource === "missed") ui.gameMisses = ui.gameMisses.filter(id => id !== word.id);
      studyStats.record(ui.practiceMode,correct ? "correct" : "wrong");
      if (correct) recordDailyActivity("word",1);
    }
    function germanNote(word) {
      const builtIn = Object.hasOwn(germanWordNotes,word.de) ? germanWordNotes[word.de] : [];
      return [wordLearningFields(word).meaningDe || builtIn[0],builtIn[1]];
    }
    function renderPracticeNote(word) {
      if (!word) return "";
      const [meaning,example] = germanNote(word);
      return `<div class="practice-note">
        <div><strong lang="de">${esc(fullGermanWord(word))}</strong> · ${esc(word.uz)}
          ${word.plural ? `<small lang="de">${esc(word.plural)}</small>` : ""}</div>
        ${meaning ? `<p lang="de">${esc(meaning)}</p>` : ""}
        ${example ? `<p lang="de"><i>${esc(example)}</i></p>` : ""}
        <button type="button" data-speak="${esc(example || fullGermanWord(word))}" class="practice-plain"><i data-lucide="volume-2"></i> Tinglash</button>
      </div>`;
    }
    function practiceEmpty(text = "Bu tanlovda mashq uchun so‘z topilmadi.") {
      return `<div class="practice-panel text-center"><p>${esc(text)}</p><button type="button" data-action="game-reset-filters" class="practice-plain mt-3">Filtrlarni tozalash</button></div>`;
    }
    function gameSelect(id, label, value, entries) {
      return `<label class="card-filter">${label}<select id="${id}">${entries.map(([key,title]) =>
        `<option value="${esc(key)}" ${key === value ? "selected" : ""}>${esc(title)}</option>`
      ).join("")}</select></label>`;
    }
    function practiceFilters(levels, extrasOnly = false) {
      const mode = ui.practiceMode;
      return `${extrasOnly ? "" : `${gameSelect("game-level","Til darajasi",ui.gameLevel,[["all","Barcha darajalar"],...levels.map(level=>[level,level])])}
        ${gameSelect("game-difficulty","Qiyinlik",ui.gameDifficulty,[["all","Barcha qiyinliklar"],...Object.entries(cardDifficulties)])}`}
        ${!["builder","srs"].includes(mode) ? gameSelect("game-source","So‘zlar",ui.gameSource,[["all","Barcha so‘zlar"],["missed","Xato qilingan so‘zlar"]]) : ""}
        ${mode === "match" ? gameSelect("game-match-size","Raund hajmi",ui.matchSize,[["4","4 juftlik"],["6","6 juftlik"],["8","8 juftlik"]]) : ""}
        ${mode === "spell" ? gameSelect("game-spell-mode","Topshiriq",ui.spellMode,[["translate","Tarjimadan yozish"],["dictation","Eshitib yozish"]]) : ""}
        ${mode === "quiz" ? gameSelect("game-quiz-direction","Savol tomoni",ui.quizDirection,[["de-uz","Nemischa so‘z"],["uz-de","O‘zbekcha tarjima"],["meaning","Nemischa izoh"]]) : ""}
      `;
    }
    function pickNextArticleWord() {
      return drawPractice(gameWords().filter(hasPracticeArticle),ui.artCurrent)[0] || null;
    }
    function initMatchGame() {
      const german = new Set(), uzbek = new Set();
      const pairs = drawPractice(gameWords(),null,Number(ui.matchSize),word => {
        const de = normalizeAnswer(fullGermanWord(word)), uz = normalizeAnswer(word.uz);
        if (!de || !uz || german.has(de) || uzbek.has(uz)) return false;
        german.add(de); uzbek.add(uz);
        return true;
      });
      ui.matchPairs = pairs;
      ui.matchRight = shufflePractice(pairs).map(word=>word.id);
      ui.matchSelectedDe = null;
      ui.matchSelectedUz = null;
      ui.matchMatchedIds = [];
      ui.matchMistakes = 0;
      ui.matchFeedback = null;
    }
    function nextSpellWord() {
      ui.spellCurrent = drawPractice(gameWords(),ui.spellCurrent)[0] || null;
      ui.spellInput = "";
      ui.spellHint = false;
      ui.spellFeedback = null;
    }
    function quizPrompt(word) {
      if (ui.quizDirection === "uz-de") return word.uz;
      if (ui.quizDirection === "meaning") return germanNote(word)[0] || word.uz;
      return fullGermanWord(word);
    }
    function quizAnswer(word) {
      return ui.quizDirection === "de-uz" ? word.uz : fullGermanWord(word);
    }
    function nextQuizWord() {
      const pool = gameWords().filter(word => quizPrompt(word) && quizAnswer(word));
      const target = drawPractice(pool,ui.quizCurrent)[0] || null;
      ui.quizCurrent = target;
      ui.quizOptions = [];
      ui.quizFeedback = null;
      if (!target) return;
      const used = new Set([normalizeAnswer(quizAnswer(target))]);
      const choices = [target];
      const distractors = shufflePractice(pool);
      // Prefer answers from the selection; a one-word lesson still needs a distractor.
      if (distractors.length < 4 || new Set(pool.map(w=>normalizeAnswer(quizAnswer(w)))).size < 4)
        distractors.push(...shufflePractice(getAllWords()));
      for (const word of distractors) {
        const answer = normalizeAnswer(quizAnswer(word));
        if (used.has(answer) || normalizeAnswer(quizPrompt(word)) === normalizeAnswer(quizPrompt(target))) continue;
        used.add(answer); choices.push(word);
        if (choices.length === 4) break;
      }
      ui.quizOptions = shufflePractice(choices);
    }
    function builderItems() {
      return SENTENCE_BUILDER_DATA.filter(item =>
        matchesGameFilter(item.level,item.tokens.length <= 6 ? "oson" : item.tokens.length <= 9 ? "o'rta" : "qiyin"));
    }
    function activeBuilderItem() {
      const items = builderItems();
      return items[ui.sbIndex % items.length];
    }
    function resetBuilder(item = activeBuilderItem()) {
      ui.sbSelected = [];
      ui.sbBank = shufflePractice((item?.tokens || []).map((text,id)=>({id,text})));
      ui.sbFeedback = null;
    }
    function reconfigurePractice() {
      ui.practiceCycles = {};
      ui.artCurrent = ui.artFeedback = null;
      ui.matchPairs = [];
      ui.spellCurrent = ui.spellFeedback = null;
      ui.quizCurrent = ui.quizFeedback = null;
      ui.srsFlipped = false;
      ui.sbIndex = 0;
      resetBuilder();
    }

    function practiceFeedback(result) {
      return result ? `<p role="status" class="practice-feedback ${result.ok === true ? "is-correct" : result.ok === false ? "is-incorrect" : ""}">${esc(result.text)}</p>` : "";
    }
    function practiceButton(action,text,primary = false,attributes = "") {
      return `<button type="button" data-action="${action}" class="${primary ? 'practice-primary' : 'practice-plain'}" ${attributes}>${text}</button>`;
    }
    function practiceRoundResult(result, action, label, word) {
      return `<div class="practice-round-actions">
        ${practiceFeedback(result)}
        ${practiceButton(action,label,true,result ? "" : "hidden")}
      </div>
      ${result ? renderPracticeNote(word) : ""}`;
    }
    const srsRatings = [[1,"Qayta"],[3,"Qiyin"],[7,"Yaxshi"],[14,"Juda oson"]];
    function nextSrsInterval(wordId, days) {
      const interval = state.srsMap?.[wordId]?.interval || 1;
      return days === 1 ? 1 : Math.max(days,Math.round(interval * (days === 14 ? 2.2 : 1.6)));
    }
    function filteredSrs() {
      return getDueSrsWords().filter(word => matchesGameFilter(word.level,wordDifficulty(word)));
    }
    function renderExtraPracticeModes() {
      if (ui.practiceMode === "articles") {
        if (!hasPracticeArticle(ui.artCurrent)) {
          ui.artFeedback = null;
          ui.artCurrent = pickNextArticleWord();
        }
        const noun = ui.artCurrent;
        if (!noun) return practiceEmpty("Bu filtrga mos artiklli ot topilmadi.");
        return `<section class="practice-panel" aria-label="Artikl mashqi">
          <div class="practice-heading"><h2>Qaysi artikl?</h2><span>${esc(noun.level || "Shaxsiy")} · ${cardDifficulties[wordDifficulty(noun)]}</span></div>
          <div class="practice-prompt"><strong lang="de">${esc(noun.de)}</strong><span>${esc(noun.uz)}</span></div>
          <div class="practice-options practice-articles">
            ${["der","die","das"].map((article,index)=>`<button type="button" lang="de" data-action="art-guess" data-guess="${article}"
              data-result="${ui.artFeedback ? article === noun.art ? 'correct' : article === ui.artFeedback.guess ? 'wrong' : '' : ''}"
              ${ui.artFeedback ? "disabled" : ""}><kbd>${index+1}</kbd>${article}</button>`).join("")}
          </div>
          ${practiceRoundResult(ui.artFeedback,"art-next","Keyingi so‘z",noun)}
        </section>`;
      }
      if (ui.practiceMode === "match") {
        if (!ui.matchPairs.length) initMatchGame();
        if (!ui.matchPairs.length) return practiceEmpty();
        const total = ui.matchPairs.length, count = ui.matchMatchedIds.length;
        const entries = new Map(ui.matchPairs.map(word=>[word.id,word]));
        const right = ui.matchRight.length === total ? ui.matchRight.map(id=>entries.get(id)).filter(Boolean)
          : [...ui.matchPairs].sort((a,b)=>a.uz.localeCompare(b.uz));
        const column = (words,side,label) => `<div class="practice-match-column"><h3>${label}</h3>
          ${words.map(word=>{
            const done = ui.matchMatchedIds.includes(word.id);
            const selected = word.id === (side === "de" ? ui.matchSelectedDe : ui.matchSelectedUz);
            const wrong = ui.matchFeedback?.ok === false && word.id ===
              (side === "de" ? ui.matchFeedback.id : ui.matchFeedback.otherId);
            return `<button type="button" lang="${side}" data-action="match-pick-${side}" data-wid="${esc(word.id)}"
              aria-pressed="${selected}" ${done ? 'data-result="correct" disabled' : wrong ? 'data-result="wrong"' : ''}
              >${esc(side === "de" ? fullGermanWord(word) : word.uz)}</button>`;
          }).join("")}</div>`;
        return `<section class="practice-panel practice-wide">
          <div class="practice-heading"><h2>Juftlik topish</h2>${practiceButton("match-restart","Yangi raund")}</div>
          <div class="practice-meta"><span>Topildi ${count} / ${total}</span><span>Xatolar ${ui.matchMistakes}</span></div>
          <progress aria-label="Topilgan juftliklar" value="${count}" max="${total}"></progress>
          <div class="practice-match practice-options">${column(ui.matchPairs,"de","Nemischa")}${column(right,"uz","O‘zbekcha")}</div>
          ${practiceFeedback(ui.matchFeedback)}
          ${ui.matchFeedback?.ok ? renderPracticeNote(entries.get(ui.matchFeedback.id)) : ""}
          ${count === total ? '<p class="practice-feedback is-correct" role="status">Barcha juftliklar topildi.</p>' : ""}
        </section>`;
      }
      if (ui.practiceMode === "spell") {
        if (!ui.spellCurrent) nextSpellWord();
        const word = ui.spellCurrent;
        if (!word) return practiceEmpty();
        const dictation = ui.spellMode === "dictation";
        return `<section class="practice-panel">
          <div class="practice-heading"><h2>${dictation ? "Eshitib yozish" : "Tarjimadan yozish"}</h2><span>Seriya ${ui.spellStreak}</span></div>
          <div class="practice-prompt">
            ${dictation ? '<span>Eshitgan so‘zingizni nemischa yozing.</span>' : `<strong lang="uz">${esc(word.uz)}</strong>`}
          </div>
          <div class="practice-actions">
            <button type="button" data-speak="${esc(fullGermanWord(word))}" class="practice-plain"><i data-lucide="volume-2"></i> Eshitish</button>
            ${practiceButton("spell-hint","Birinchi harf",false,ui.spellFeedback ? "disabled" : "")}
          </div>
          <div class="practice-input">
            <input id="spell-answer-input" type="text" lang="de" aria-label="Nemischa javob" autocomplete="off" autocapitalize="off" spellcheck="false"
              value="${esc(ui.spellInput)}" placeholder="Nemischa javob" aria-invalid="${ui.spellFeedback?.ok === false}" ${ui.spellFeedback ? "readonly" : ""}>
            ${practiceButton(ui.spellFeedback ? "spell-next" : "spell-check",ui.spellFeedback ? "Keyingi so‘z" : "Tekshirish",true)}
          </div>
          <div class="practice-actions">${["ä","ö","ü","ß"].map(ch =>
            practiceButton("spell-char",ch,false,`data-ch="${ch}" ${ui.spellFeedback ? "disabled" : ""}`)).join("")}</div>
          ${ui.spellHint ? `<p class="practice-feedback" role="status">Birinchi harf <strong lang="de">${esc(Array.from(word.de)[0] || "")}</strong></p>` : ""}
          ${ui.spellFeedback ? practiceFeedback(ui.spellFeedback) + renderPracticeNote(word) : ""}
        </section>`;
      }
      if (ui.practiceMode === "quiz") {
        if (!ui.quizCurrent) nextQuizWord();
        const question = ui.quizCurrent, result = ui.quizFeedback;
        if (!question) return practiceEmpty();
        if (ui.quizOptions.length < 2) return practiceEmpty("Test uchun kamida ikkita turli javob kerak.");
        return `<section class="practice-panel">
          <div class="practice-heading"><h2>Tezkor test</h2><span>Seriya ${ui.quizStreak}</span></div>
          <p class="practice-prompt" lang="${ui.quizDirection === "uz-de" || ui.quizDirection === "meaning" && !germanNote(question)[0] ? "uz" : "de"}"><strong>${esc(quizPrompt(question))}</strong></p>
          <div class="practice-options practice-quiz">${ui.quizOptions.map((option,index)=>`
            <button type="button" data-action="quiz-pick" data-wid="${esc(option.id)}" ${result ? "disabled" : ""}
              data-result="${result ? option.id === question.id ? 'correct' : option.id === result.picked ? 'wrong' : '' : ''}">
              <kbd>${index + 1}</kbd>${esc(quizAnswer(option))}
            </button>`).join("")}</div>
          ${practiceRoundResult(result,"quiz-next","Keyingi savol",question)}
        </section>`;
      }
      if (ui.practiceMode === "srs") {
        const due = filteredSrs(), word = due[0];
        if (!word) return `<section class="practice-panel"><div class="practice-heading"><h2>SRS takrorlash</h2></div>
          <p>Bu tanlovda bugun takrorlanadigan so‘z qolmadi.</p>
          <div class="practice-actions">
            ${ui.gameLevel !== "all" || ui.gameDifficulty !== "all" ? practiceButton("game-reset-filters","Barcha darajalarni ko‘rish") : ""}
            ${practiceButton("set-practice-mode","Fleshkartalarni ochish",true,'data-mode="flashcards"')}
            ${Object.keys(state.srsMap || {}).length ? practiceButton("srs-reset-due","SRS jadvalini tiklash") : ""}
          </div>
        </section>`;
        return `<section class="practice-panel">
          <div class="practice-heading"><h2>SRS takrorlash</h2><span>Navbatda ${due.length} · Baholandi ${ui.srsSessionReviewed}</span></div>
          <div class="perspective-1000 card-stage cursor-pointer" data-action="srs-flip">
            <div class="flip-card-inner ${ui.srsFlipped ? 'flipped' : ''}">
              <div class="flip-face card-face"><span class="card-kicker">Deutsch</span><strong lang="de">${esc(fullGermanWord(word))}</strong>
                ${word.plural ? `<small lang="de">${esc(word.plural)}</small>` : ""}</div>
              <div class="flip-face flip-back card-face card-answer"><span class="card-kicker">Javob</span>
                ${renderPracticeNote(word)}
              </div>
            </div>
          </div>
          ${practiceButton("srs-flip-button","Kartani aylantirish",true,`aria-pressed="${ui.srsFlipped}"`)}
          <div class="practice-options practice-srs">${srsRatings.map(([days,label])=>
            practiceButton("srs-rate",`${label}<small>${nextSrsInterval(word.id,days)} kun</small>`,false,
              `data-wid="${esc(word.id)}" data-days="${days}" ${ui.srsFlipped ? "" : "disabled"}`)
          ).join("")}</div>
        </section>`;
      }
      const items = builderItems(), item = activeBuilderItem();
      if (!item) return practiceEmpty("Bu daraja va qiyinlikda gap topilmadi.");
      if (!ui.sbBank.length && !ui.sbSelected.length) resetBuilder(item);
      const finished = !!ui.sbFeedback?.ok;
      return `<section class="practice-panel practice-wide builder-panel" data-builder-locked="${finished}">
        <div class="practice-heading"><h2>Gap konstruktori</h2><span>${ui.sbIndex % items.length + 1} / ${items.length} · Seriya ${ui.sbStreak}</span></div>
        <div class="practice-meta"><span>${esc(item.level)}</span><span>${esc(item.rule)}</span></div>
        <p class="practice-prompt"><strong>${esc(item.uz)}</strong></p>
        <div class="practice-actions">
          ${practiceButton("sb-clear","Tozalash",false,finished || !ui.sbSelected.length ? "disabled" : "")}
          ${practiceButton("sb-hint","Keyingi so‘zga ishora",false,finished || !ui.sbBank.length ? "disabled" : "")}
          ${practiceButton("sb-check","Tekshirish",true,finished || !ui.sbSelected.length ? "disabled" : "")}
          ${practiceButton("sb-next","Keyingi gap",finished)}
        </div>
        <div class="builder-board">
          <div class="builder-zone">
            <h3 id="builder-sentence-label">Yig‘ilgan gap</h3>
            <div class="practice-tokens practice-built" role="group" aria-labelledby="builder-sentence-label" data-builder-zone="sentence" lang="de">
              ${ui.sbSelected.length ? ui.sbSelected.map((token,index)=>practiceButton("sb-remove",esc(token.text),true,`data-idx="${index}" data-token="${token.id}" aria-describedby="builder-drag-help" ${finished ? "disabled" : ""}`)).join("")
                : '<span>So‘zlarni bu yerga sudrang yoki bosing.</span>'}
            </div>
          </div>
          <div class="builder-zone" ${finished ? "hidden" : ""}>
            <h3 id="builder-words-label">So‘zlar</h3>
            <div class="practice-tokens builder-bank" role="group" aria-labelledby="builder-words-label" data-builder-zone="bank" lang="de">
              ${ui.sbBank.map((token,index)=>practiceButton("sb-pick",esc(token.text),false,`data-idx="${index}" data-token="${token.id}" aria-describedby="builder-drag-help"`)).join("")}
            </div>
          </div>
          <p id="builder-drag-help" class="builder-help" ${finished ? "hidden" : ""}>
            So‘zni sudrab joyini o‘zgartiring. Klaviaturada <kbd>Shift</kbd> + <kbd>←</kbd> yoki <kbd>→</kbd>.
          </p>
          <span class="sr-only" data-builder-live role="status"></span>
        </div>
        ${practiceFeedback(ui.sbFeedback)}
        ${finished ? `<button type="button" data-speak="${esc(item.tokens.join(" "))}" class="practice-plain"><i data-lucide="volume-2"></i> To‘liq gapni tinglash</button>` : ""}
      </section>`;
    }

    function renderPracticeUpdate(action, dropPosition) {
      const motion = !motionPreference.matches;
      const moveTokens = motion && ["sb-pick","sb-remove","sb-hint","sb-clear","sb-reorder"].includes(action);
      const positions = new Map();
      if (moveTokens) {
        for (const token of document.querySelectorAll(".practice-content [data-token]")) {
          positions.set(token.dataset.token, token.getBoundingClientRect());
        }
        if (dropPosition) positions.set(dropPosition.id,dropPosition.rect);
      }
      const focused = document.activeElement;
      render();
      const board = document.querySelector(".practice-content");
      if (focused?.dataset.action === action) {
        const focusAfter = {
          "art-guess":"art-next", "art-next":"art-guess",
          "quiz-pick":"quiz-next", "quiz-next":"quiz-pick",
          "fc-rate":"fc-flip-button", "srs-rate":"srs-flip-button"
        }[action];
        let target;
        if (focusAfter) target = board.querySelector(`[data-action="${focusAfter}"]:not([disabled]):not([hidden])`);
        else if (focused.dataset.token !== undefined)
          target = board.querySelector(`[data-token="${CSS.escape(focused.dataset.token)}"]:enabled`);
        else if (action.startsWith("match-pick-") && ui.matchFeedback?.ok)
          target = board.querySelector(`[data-action="${action}"]:enabled`) || board.querySelector('[data-action="match-restart"]');
        target?.focus({preventScroll:true});
      }
      if (!motion) return;

      const play = (selector, effect) => {
        board.querySelectorAll(selector).forEach(el => el.classList.add(`practice-motion-${effect}`));
      };
      if (moveTokens) {
        for (const token of board.querySelectorAll("[data-token]")) {
          const previous = positions.get(token.dataset.token);
          if (!previous || !token.animate) continue;
          const next = token.getBoundingClientRect();
          const dx = previous.x - next.x, dy = previous.y - next.y;
          const dropped = dropPosition?.id === token.dataset.token;
          if (!dropped && Math.abs(dx) + Math.abs(dy) < 3) continue;
          token.animate([
            {translate:`${dx}px ${dy}px`,scale:dropped ? "1.04" : "1",opacity:dropped ? .93 : .78},
            {translate:"0 0",scale:"1",opacity:1}
          ],{duration:280,easing:"cubic-bezier(.22,1,.36,1)"});
        }
      }
      if (["fc-next","fc-prev","fc-rate","fc-shuffle","srs-rate"].includes(action)) {
        play(".card-stage",action === "fc-prev" ? "card-back" : "card-forward");
        play(".card-meta, .practice-heading > span","count");
        if (action === "srs-rate") play(".practice-panel > p","in");
      } else if (["art-next","quiz-next","spell-next","sb-next","match-restart"].includes(action)) {
        play(".practice-prompt, .practice-match-column","in");
        play(".practice-articles > button, .practice-quiz > button, .practice-tokens","options");
      } else if (action === "art-guess" || action === "quiz-pick") {
        play('[data-result="correct"]',"success");
        play('[data-result="wrong"]',"error");
      } else if (action.startsWith("match-pick-")) {
        if (ui.matchFeedback?.ok) {
          const id = CSS.escape(ui.matchFeedback.id);
          play(`[data-wid="${id}"][data-result="correct"]`,"success");
          play(".practice-meta > span:first-child","count");
        } else if (ui.matchFeedback) play('[data-result="wrong"]',"error");
        else play('.practice-match [aria-pressed="true"]',"selected");
      } else if (action === "spell-check") {
        play(".practice-input > input",ui.spellFeedback.ok ? "success" : "error");
      } else if (action === "sb-check") {
        if (typeof ui.sbFeedback?.ok === "boolean")
          play(".practice-built",ui.sbFeedback.ok ? "success" : "error");
      }
      if (["art-guess","quiz-pick","match-pick-de","match-pick-uz","spell-check","spell-hint","sb-hint","sb-check"].includes(action)) {
        play(".practice-feedback","in");
        play(".practice-note, .practice-round-actions button:not([hidden])","detail");
      }
    }

    function builderTokens(zone) {
      return zone === "sentence" ? ui.sbSelected : ui.sbBank;
    }

    function moveBuilderToken(id, from, to, slot, action, dropPosition) {
      if (ui.sbFeedback?.ok) return;
      const source = builderTokens(from), target = builderTokens(to);
      const index = source.findIndex(token => String(token.id) === id);
      if (index < 0) return;
      const position = source === target && index < slot ? slot - 1 : slot;
      if (source === target && position === index) return;
      const [token] = source.splice(index,1);
      target.splice(position,0,token);
      ui.sbFeedback = null;
      if (action === "sb-reorder") requestInterfaceCue("paper");
      renderPracticeUpdate(action,dropPosition);
      if (action !== "sb-reorder") return;
      const replacement = builderRoot.querySelector(`[data-builder-zone="${to}"] [data-token="${id}"]`);
      replacement?.focus({preventScroll:true});
      builderRoot.querySelector("[data-builder-live]").textContent = `«${token.text}» ${position+1}-o‘ringa ko‘chirildi.`;
    }

    const builderRoot = document.getElementById("app-root");
    let builderDrag = null;
    let suppressBuilderClick = false;

    function builderDropTarget(x,y) {
      const zone = document.elementFromPoint(x,y)?.closest("[data-builder-zone]");
      if (!zone || !builderRoot.contains(zone)) return null;
      const tokens = Array.from(zone.querySelectorAll("[data-token]"),button => ({
        button, rect:button.getBoundingClientRect()
      }));
      if (!tokens.length) return {zone,slot:0};
      let nearest = tokens[0];
      for (const item of tokens) {
        if (Math.abs(item.rect.top + item.rect.height / 2 - y) < Math.abs(nearest.rect.top + nearest.rect.height / 2 - y))
          nearest = item;
      }
      const row = tokens.filter(item => Math.abs(item.rect.top - nearest.rect.top) < 5);
      const before = row.find(item => x < item.rect.left + item.rect.width / 2);
      const marker = (before || row.at(-1)).button;
      return {zone,marker,edge:before ? "before" : "after",slot:Number(marker.dataset.idx) + (before ? 0 : 1)};
    }

    function paintBuilderDrop(drag,target) {
      const previous = drag.target;
      if (previous?.zone === target?.zone && previous?.marker === target?.marker && previous?.edge === target?.edge) return;
      previous?.zone.removeAttribute("data-builder-target");
      previous?.marker?.removeAttribute("data-builder-edge");
      if (target) {
        target.zone.dataset.builderTarget = "true";
        if (target.marker) target.marker.dataset.builderEdge = target.edge;
      }
      drag.target = target;
    }

    function finishBuilderDrag(event, drop = false) {
      const drag = builderDrag;
      if (!drag || (event.pointerId !== undefined && event.pointerId !== drag.pointer)) return;
      builderDrag = null;
      if (!drag.preview) return;
      const target = drop && drag.token.isConnected ? builderDropTarget(event.clientX,event.clientY) : null;
      const dropPosition = {id:drag.id,rect:drag.preview.getBoundingClientRect()};
      paintBuilderDrop(drag,null);
      drag.token.removeAttribute("data-builder-lifted");
      drag.preview.remove();
      if (drag.token.hasPointerCapture(drag.pointer)) drag.token.releasePointerCapture(drag.pointer);
      if (target) moveBuilderToken(drag.id,drag.from,target.zone.dataset.builderZone,target.slot,"sb-reorder",dropPosition);
    }

    window.addEventListener("pointerdown",() => { if (!builderDrag?.preview) suppressBuilderClick = false; },true);
    window.addEventListener("click",event => {
      if (!suppressBuilderClick || event.detail === 0) return;
      suppressBuilderClick = false;
      event.preventDefault();
      event.stopImmediatePropagation();
    },true);

    builderRoot.addEventListener("pointerdown",event => {
      const token = event.target.closest(".builder-panel[data-builder-locked='false'] [data-token]:enabled");
      if (!token || event.button !== 0 || !event.isPrimary || builderDrag) return;
      builderDrag = {
        token,id:token.dataset.token,from:token.closest("[data-builder-zone]").dataset.builderZone,
        pointer:event.pointerId,startX:event.clientX,startY:event.clientY
      };
    });
    document.addEventListener("pointermove",event => {
      const drag = builderDrag;
      if (!drag || drag.pointer !== event.pointerId) return;
      if (!drag.token.isConnected) { finishBuilderDrag(event); return; }
      if (!drag.preview) {
        if (Math.hypot(event.clientX - drag.startX,event.clientY - drag.startY) < 6) return;
        const rect = drag.token.getBoundingClientRect();
        drag.offsetX = drag.startX - rect.left;
        drag.offsetY = drag.startY - rect.top;
        drag.preview = document.createElement("span");
        drag.preview.className = "builder-drag-preview";
        drag.preview.textContent = drag.token.textContent;
        drag.preview.setAttribute("aria-hidden","true");
        drag.preview.style.width = rect.width + "px";
        drag.preview.style.height = rect.height + "px";
        document.body.append(drag.preview);
        drag.token.dataset.builderLifted = "true";
        drag.token.setPointerCapture(event.pointerId);
        suppressBuilderClick = true;
        if (event.isTrusted) unlockInterfaceAudio();
      }
      event.preventDefault();
      drag.preview.style.translate = `${event.clientX - drag.offsetX}px ${event.clientY - drag.offsetY}px`;
      paintBuilderDrop(drag,builderDropTarget(event.clientX,event.clientY));
    });
    document.addEventListener("pointerup",event => finishBuilderDrag(event,true));
    document.addEventListener("pointercancel",event => finishBuilderDrag(event));
    document.addEventListener("lostpointercapture",event => finishBuilderDrag(event));
    window.addEventListener("blur",event => finishBuilderDrag(event));

    document.addEventListener("keydown",event => {
      if (builderDrag && event.key === "Escape") {
        event.preventDefault();
        finishBuilderDrag(event);
        return;
      }
      if (!event.shiftKey || !["ArrowLeft","ArrowRight"].includes(event.key)) return;
      const token = event.target.closest(".builder-panel[data-builder-locked='false'] [data-token]:enabled");
      if (!token) return;
      event.preventDefault();
      const zone = token.closest("[data-builder-zone]").dataset.builderZone;
      const index = Number(token.dataset.idx);
      const step = event.key === "ArrowLeft" ? -1 : 1;
      if (index + step < 0 || index + step >= builderTokens(zone).length) return;
      moveBuilderToken(token.dataset.token,zone,zone,index + (step < 0 ? -1 : 2),"sb-reorder");
    });

    function renderPracticeFilterSidebar(levels, lessons) {
      const flashcards = ui.practiceMode === "flashcards";
      const gameLevels = ui.practiceMode === "builder"
        ? [...new Set(["A1","A2","B1",...SENTENCE_BUILDER_DATA.map(item=>item.level)])].sort()
        : levels;
      const wordGame = !["builder","srs"].includes(ui.practiceMode);
      const fields = wordGame ? `
      ${renderCardSelect("fc-filter-select","To‘plam",[["all","Barcha so‘zlar"],["due","Takrorlash vaqti kelgan"],["unlearned","Yodlanmaganlar"],["favorite","Sevimli so‘zlar"],...lessons.map(l=>[String(l.id),l.id+"-dars"])])}
      ${renderCardSelect("fc-level-select","Til darajasi",[["all","Barcha darajalar"],...levels.map(level=>[level,level==="SHAXSIY" ? "Shaxsiy" : level])])}
      ${renderCardSelect("fc-difficulty-select","Qiyinlik",[["all","Barcha qiyinliklar"],...Object.entries(cardDifficulties)])}
      ${renderCardSelect("fc-order-select","Tartib",[["ordered","Dars bo‘yicha"],["mixed","Aralash"],["random","Tasodifiy"]])}
      ${flashcards ? renderCardSelect("fc-direction-select","Savol tomoni",[["de-uz","Nemischa so‘z"],["uz-de","O‘zbekcha tarjima"],["meaning","Nemischa izoh"],["mixed","Aralash til"]]) : practiceFilters(levels,true)}
      ${flashcards && ui.fcOrder === "random" ? '<button type="button" data-action="fc-shuffle" class="card-reshuffle"><i data-lucide="shuffle"></i> Qayta aralashtirish</button>' : ""}
      ` : practiceFilters(gameLevels);
      return `<aside data-list-key="practice" id="practice-filter-sidebar" class="practice-sidebar" aria-label="Mashq filtrlari" data-study-scroll>
        <h2 class="practice-filter-title"><i data-lucide="sliders-horizontal" aria-hidden="true"></i> Filtrlar</h2>
        <button id="practice-filter-toggle" class="practice-filter-toggle" type="button" data-action="toggle-practice-filters"
          aria-expanded="${ui.practiceFiltersOpen}" aria-controls="practice-filter-fields">
          <i data-lucide="sliders-horizontal" aria-hidden="true"></i><span>Filtrlar</span>
          <i data-lucide="chevron-down" class="practice-filter-chevron" aria-hidden="true"></i>
        </button>
        <div id="practice-filter-fields" class="card-filters">${fields}</div>
      </aside>`;
    }

    function renderPractice() {
      const allLessons = getAllLessons();
      if (ui.practiceMode === "flashcards" && ui.fcDeck.length === 0) resetFlashcards();

      const card = ui.fcDeck[ui.fcIndex] || null;
      const cefr = getAllWords().map(w=>String(w.level || "Shaxsiy").toUpperCase());
      const levels = [...new Set(["A1","A2","B1",...cefr])].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));
      const notes = card ? germanNote(card) : [];
      const meaning = notes[0] || "";
      const reverse = ui.fcDirection === "uz-de" || (ui.fcDirection === "mixed" && ui.fcIndex % 2 !== 0);
      const germanPrompt = ui.fcDirection === "meaning" && meaning;
      const accuracy = ui.artTotal > 0 ? Math.round((ui.artCorrect / ui.artTotal) * 100) : 0;

      return `
        <div class="space-y-6">
          <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-1.5">
              ${[
                { id: "flashcards", label: "Fleshkartalar" },
                { id: "articles", label: "Artikllar" },
                { id: "match", label: "Juftlik topish" },
                { id: "spell", label: "Yozib yodlash" },
                { id: "quiz", label: "Tezkor test" },
                { id: "srs", label: "SRS" },
                { id: "builder", label: "Gap konstruktori" }
              ].map(m => `
                <button type="button" data-action="set-practice-mode" data-mode="${m.id}" aria-pressed="${ui.practiceMode === m.id}" class="px-3.5 py-2 rounded-xl text-xs font-bold transition ${ui.practiceMode === m.id ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">${m.label}</button>
              `).join("")}
            </div>
            ${ui.practiceMode === "articles" ? `
              <div class="flex items-center gap-4 text-xs font-bold">
                <span class="text-slate-600">Seriya <span class="text-amber-600">${ui.artStreak}</span></span>
                <span class="text-slate-600">Rekord <span class="text-emerald-600">${state.articleBestStreak}</span></span>
                <span class="text-slate-600">Aniqlik <span class="text-blue-600">${accuracy}%</span></span>
              </div>` : ""}
          </div>

          <div class="practice-layout">
            ${renderPracticeFilterSidebar(levels,allLessons)}
            <div class="practice-content" data-mode="${ui.practiceMode}">
          ${ui.practiceMode === "flashcards" ? (
            !card ? `
              <div class="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                <p class="text-slate-700 font-bold text-lg">Ushbu to'plamda kartalar tugadi!</p>
                <button type="button" data-action="fc-reset-all" class="mt-4 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold">Barcha so'zlarni ochish</button>
              </div>
            ` : `
              <div class="card-study">
                <div class="card-meta">
                  <span>${ui.fcIndex + 1} / ${ui.fcDeck.length} karta</span>
                  <span>${esc(card.level || "Shaxsiy")} · ${cardDifficulties[wordDifficulty(card)]}</span>
                </div>
                <progress aria-label="Kartalar bo‘yicha o‘rin" max="${ui.fcDeck.length}" value="${ui.fcIndex + 1}"></progress>
                <div class="perspective-1000 card-stage cursor-pointer" data-action="fc-flip" data-card-id="${esc(card.id)}">
                  <div class="flip-card-inner ${ui.fcFlipped ? 'flipped' : ''}">
                    <div class="flip-face card-face">
                      <span class="card-kicker">${germanPrompt ? "Bedeutung" : reverse ? "O‘zbekcha" : "Deutsch"}</span>
                      <strong lang="${reverse && !germanPrompt ? "uz" : "de"}">${esc(germanPrompt || (reverse ? card.uz : fullGermanWord(card)))}</strong>
                      ${!reverse && !germanPrompt && card.plural ? `<small lang="de">${esc(card.plural)}</small>` : ""}
                      ${!reverse && !germanPrompt && card.pron ? `<small>[${esc(card.pron)}]</small>` : ""}
                    </div>
                    <div class="flip-face flip-back card-face card-answer">
                      <span class="card-kicker">Javob</span>
                      <strong lang="de">${esc(fullGermanWord(card))}</strong>
                      <p>${esc(card.uz)}${card.plural ? ` · <span lang="de">${esc(card.plural)}</span>` : ""}</p>
                      ${meaning ? `<div class="card-note"><b>Bedeutung</b><span lang="de">${esc(meaning)}</span></div>` : ""}
                      ${notes[1] ? `<div class="card-note"><b>Beispiel</b><span lang="de">${esc(notes[1])}</span></div>` : ""}
                    </div>
                  </div>
                </div>
                <div class="card-controls">
                  <button type="button" data-action="fc-prev" aria-label="Oldingi karta"><i data-lucide="arrow-left"></i></button>
                  <button type="button" data-action="fc-flip-button" aria-pressed="${ui.fcFlipped}">Kartani aylantirish</button>
                  <button type="button" data-speak="${esc(fullGermanWord(card))}" class="card-listen" ${!ui.fcFlipped && (reverse || germanPrompt) ? "hidden" : ""} ${reverse || germanPrompt ? "data-reveal-only" : ""} aria-label="Tinglash"><i data-lucide="volume-2"></i></button>
                  <button type="button" data-action="fc-next" aria-label="Keyingi karta"><i data-lucide="arrow-right"></i></button>
                </div>
                <div class="card-ratings" aria-label="Javobni baholash">
                  ${[["qiyin","Qayta · 1 kun"],["o'rta","O‘rta · 3 kun"],["oson","Bildim · 7+ kun"]].map(([rating,label])=>
                    `<button type="button" data-action="fc-rate" data-rating="${esc(rating)}" ${ui.fcFlipped ? "" : "disabled"}>${label}</button>`
                  ).join("")}
                </div>
              </div>
            `
          ) : renderExtraPracticeModes()}
            </div>
          </div>
        </div>
      `;
    }

    // --- VIEW 4.5: GOETHE-ZERTIFIKAT & 100+ WORD DAILY READING TEXTS ---
    function renderGoethe() {
      const texts = getAllReadingTexts();
      const activeText = texts.find(t => t.id === ui.selectedTextId) || texts[0];
      const textWordCount = activeText ? countWords(activeText.de) : 0;
      const gLink = GOETHE_LINKS[ui.goetheLevel] || GOETHE_LINKS.A1;
      const gTasks = getGoetheTasksForLevel(ui.goetheLevel);

      function readingRow(t, preview = false) {
                      const active = activeText && t.id === activeText.id;
                      const wc = countWords(t.de);
                      return `
                        <${preview ? 'div aria-hidden="true"' : 'button type="button"'} ${preview ? '' : 'data-action="select-reading-text"'} data-tid="${t.id}" ${active ? 'aria-current="true"' : ''} class="w-full text-left p-3 rounded-xl border transition ${active ? 'lesson-current' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'}">
                          <div class="flex items-center justify-between gap-1 mb-1">
                            <span class="text-[11px] font-bold px-2 py-0.5 rounded ${active ? 'lesson-current-level' : 'bg-amber-100 text-amber-800'}">${esc(t.level)}</span>
                            <span class="text-[11px] font-semibold ${active ? 'lesson-current-meta' : 'text-slate-500'}">${wc} so'z</span>
                          </div>
                          <div class="text-xs font-bold line-clamp-2">${esc(t.title)}</div>
                        </${preview ? 'div' : 'button'}>
                      `;
                    }

      return `
        <div class="space-y-6">
          <!-- Top Banner & Sub-tab Switcher -->
          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">Goethe-Institut formati</span>
                <span class="text-xs text-slate-500">A1 · A2 · B1 Sertifikat &amp; 100+ so'zlik matnlar</span>
              </div>
              <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">Goethe Sertifikat Tayyorgarlik &amp; Kunlik Matnlar</h1>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" data-action="set-goethe-subtab" data-subtab="texts" class="px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-1.5 ${ui.goetheSubTab === 'texts' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                <i data-lucide="file-text" class="w-4 h-4"></i>
                <span>Kunlik Matnlar (100+ so'z)</span>
              </button>
              <button type="button" data-action="set-goethe-subtab" data-subtab="exam" class="px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-1.5 ${ui.goetheSubTab === 'exam' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                <i data-lucide="award" class="w-4 h-4"></i>
                <span>Goethe Imtihon Mashqlari</span>
              </button>
            </div>
          </div>

          ${ui.goetheSubTab === "texts" ? `
            <!-- DAILY 100+ WORD READING TEXTS -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <aside class="lg:col-span-4 xl:col-span-3 space-y-3">
                <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2.5">
                  <div class="flex items-center justify-between">
                    <h2 class="font-bold text-sm text-slate-900">O'qish matnlari (${texts.length})</h2>
                    <button type="button" data-action="open-sync" class="text-xs font-bold text-amber-700 hover:underline">+ Jadvaldan</button>
                  </div>
                  <div id="reading-list-scroll" data-list-key="reading" data-study-scroll class="space-y-2 max-h-[60vh] overflow-y-auto">
                ${mobileStudyPicker("mobile-reading-select", "O‘qish matnini tanlang", texts, activeText?.id, t => `${t.level} · ${t.title}`, readingRow)}
                    ${texts.map(item => readingRow(item)).join("")}
                  </div>
                </div>
              </aside>

              <div class="lg:col-span-8 xl:col-span-9 space-y-5">
                ${activeText ? `
                  <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div class="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div class="flex items-center gap-2 mb-1">
                          <span class="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white text-xs font-bold">${esc(activeText.level)}</span>
                          <span class="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">${textWordCount} ta nemischa so'z</span>
                        </div>
                        <h2 class="text-xl font-extrabold text-slate-900">${esc(activeText.title)}</h2>
                      </div>
                      <div class="flex items-center gap-2">
                        <button type="button" data-reading-button data-speak="${esc(activeText.de)}" data-speech-target="goethe-reading-text" aria-controls="goethe-reading-text" aria-pressed="false" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition">
                          <i data-lucide="volume-2" class="w-4 h-4"></i>
                          <span>Matnni tinglash</span>
                        </button>
                        <button type="button" data-action="toggle-text-translation" class="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700">
                          ${ui.showTextTranslation ? "Tarjimani yashirish" : "O'zbekcha tarjima"}
                        </button>
                      </div>
                    </div>

                    <div id="goethe-reading-text" lang="de" class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-base leading-8 text-slate-900 font-medium">${renderSpeechText(activeText.de)}</div>

                    ${ui.showTextTranslation && activeText.uz ? `
                      <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-sm leading-relaxed text-slate-800">
                        <div class="text-xs font-extrabold uppercase text-amber-800 mb-1">O'zbekcha tarjimasi</div>
                        ${esc(activeText.uz)}
                      </div>
                    ` : ''}

                    ${(activeText.vocab || []).length ? `
                      <div class="flex flex-wrap gap-2 pt-1">
                        ${activeText.vocab.map(v => `<span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">${esc(v)}</span>`).join("")}
                      </div>
                    ` : ''}
                  </div>

                  <!-- Reading Comprehension Richtig/Falsch -->
                  ${(activeText.questions || []).length ? `
                    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                      <h3 class="text-base font-bold text-slate-900">Matn bo'yicha tekshiruv (Richtig / Falsch)</h3>
                      ${activeText.questions.map((item, idx) => {
                        const key = `${activeText.id}_q${idx}`;
                        const picked = state.readingAnswers[key];
                        const hasPicked = picked !== undefined;
                        const ok = hasPicked && picked === item.ans;
                        return `
                          <div class="p-4 rounded-xl border ${!hasPicked ? 'bg-slate-50 border-slate-200' : ok ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'} flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div class="text-sm font-semibold text-slate-900">${idx + 1}. ${esc(item.q)}</div>
                            <div class="flex items-center gap-2 shrink-0">
                              <button type="button" data-action="answer-reading" data-key="${key}" data-val="true" data-correct="${item.ans === true}" class="px-3.5 py-1.5 rounded-lg text-xs font-bold border transition ${picked === true ? (ok ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-rose-600 text-white border-rose-600') : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}">Richtig</button>
                              <button type="button" data-action="answer-reading" data-key="${key}" data-val="false" data-correct="${item.ans === false}" class="px-3.5 py-1.5 rounded-lg text-xs font-bold border transition ${picked === false ? (ok ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-rose-600 text-white border-rose-600') : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}">Falsch</button>
                            </div>
                          </div>
                        `;
                      }).join("")}
                    </div>
                  ` : ''}
                ` : ''}
              </div>
            </div>
          ` : `
            <!-- GOETHE-ZERTIFIKAT EXAM PRACTICE (WRITING / LISTENING / SPEAKING) -->
            <div class="space-y-5">
              <!-- Level & Skill Selector + Official Goethe-Institut Links -->
              <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-xs font-bold text-slate-500 mr-1">Daraja:</span>
                  ${["A1", "A2", "B1"].map(lv => `
                    <button type="button" data-action="set-goethe-level" data-level="${lv}" class="px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition ${ui.goetheLevel === lv ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">Goethe ${lv}</button>
                  `).join("")}
                  <span class="mx-2 text-slate-300">|</span>
                  ${[
                    { id: "writing", label: "Schreiben (Yozish)" },
                    { id: "listening", label: "Hören (Tinglash)" },
                    { id: "speaking", label: "Sprechen (Gapirish)" }
                  ].map(sk => `
                    <button type="button" data-action="set-goethe-skill" data-skill="${sk.id}" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${ui.goetheSkill === sk.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">${sk.label}</button>
                  `).join("")}
                </div>

                <!-- Official Goethe-Institut Practice Base Links -->
                <div class="flex flex-wrap items-center gap-2 text-xs">
                  <a href="${gLink.onlineUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold hover:bg-emerald-100 transition flex items-center gap-1">
                    <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                    <span>Goethe ${ui.goetheLevel} Modellsatz</span>
                  </a>
                  <a href="${gLink.infoUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition">Goethe Usbekistan ↗</a>
                </div>
              </div>

              ${ui.goetheSkill === "writing" ? `
                <!-- SCHREIBEN (WRITING) -->
                <div class="space-y-5">
                  ${gTasks.writing.map(task => {
                    const draft = state.writingDrafts[task.id] || "";
                    const wc = countWords(draft);
                    const showSample = !!ui.showWritingSample[task.id];
                    return `
                      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                        <div class="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span class="text-xs font-bold text-amber-700">${esc(task.part || 'Schreiben')}</span>
                            <h2 class="text-lg font-extrabold text-slate-900">${esc(task.title)}</h2>
                          </div>
                          <span class="px-3 py-1 rounded-full text-xs font-bold ${wc >= (task.targetWords || 30) ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}">
                            Yozilgan: <span id="wc-${task.id}">${wc}</span> / ${task.targetWords || 30} so'z
                          </span>
                        </div>
                        <p class="text-sm text-slate-700">${esc(task.prompt)}</p>
                        <ul class="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200/70 text-xs text-slate-700">
                          ${(task.points || []).map(p => `<li class="flex items-start gap-2"><span class="text-amber-600 font-bold">✓</span><span>${esc(p)}</span></li>`).join("")}
                        </ul>
                        <textarea data-writing-id="${task.id}" rows="6" placeholder="Nemis tilida javobingizni shu yerga yozing..." class="w-full rounded-xl border border-slate-300 p-3.5 text-sm leading-relaxed focus:ring-2 focus:ring-slate-900 focus:outline-none">${esc(draft)}</textarea>
                        <div class="flex flex-wrap items-center justify-between gap-2">
                          <button type="button" data-action="toggle-writing-sample" data-tid="${task.id}" class="text-xs font-bold text-amber-700 hover:underline">
                            ${showSample ? "Namuna javobni yashirish" : "Namuna javobni ko'rish (Goethe namunasi)"}
                          </button>
                          <button type="button" data-show-captions data-speak="${esc(draft || task.sample)}" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5">
                            <i data-lucide="volume-2" class="w-3.5 h-3.5"></i>
                            <span>Yozganimni tinglash</span>
                          </button>
                        </div>
                        ${showSample ? `
                          <div class="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-sm whitespace-pre-line text-slate-800">
                            <div class="text-xs font-extrabold text-emerald-800 mb-1">Namuna javob:</div>
                            ${esc(task.sample)}
                          </div>
                        ` : ''}
                      </div>
                    `;
                  }).join("")}
                </div>
              ` : ui.goetheSkill === "listening" ? `
                <!-- HÖREN (LISTENING) -->
                <div class="space-y-5">
                  ${gTasks.listening.map(task => {
                    const plays = ui.listeningPlays[task.id] || 0;
                    const showTr = !!ui.showListeningTranscript[task.id];
                    return `
                      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                        <div class="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <span class="text-xs font-bold text-amber-700">${esc(task.part || 'Hören')}</span>
                            <h2 class="text-lg font-extrabold text-slate-900">${esc(task.title)}</h2>
                          </div>
                          <div class="flex items-center gap-2">
                            <button type="button" data-action="play-listening" data-tid="${task.id}" data-speech-target="transcript-${esc(task.id)}" data-text="${esc(task.transcript)}" class="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition">
                              <i data-lucide="headphones" class="w-4 h-4"></i>
                              <span>Audioni tinglash (${plays} marta)</span>
                            </button>
                            <button type="button" data-action="toggle-listening-transcript" data-tid="${task.id}" class="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700">
                              ${showTr ? "Matnni yashirish" : "Audio matni"}
                            </button>
                          </div>
                        </div>

                        <div id="transcript-${esc(task.id)}" lang="de" ${showTr ? '' : 'hidden'} class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">${renderSpeechText(task.transcript)}</div>

                        <div class="space-y-3">
                          ${(task.questions || []).map((q, qi) => {
                            const key = `${task.id}_q${qi}`;
                            const picked = state.listeningAnswers[key];
                            const hasPicked = picked !== undefined;
                            const ok = hasPicked && Number(picked) === Number(q.ans);
                            return `
                              <div class="p-4 rounded-xl border ${!hasPicked ? 'bg-slate-50 border-slate-200' : ok ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'} space-y-2.5">
                                <div class="text-sm font-bold text-slate-900">${qi + 1}. ${esc(q.q)}</div>
                                <div class="flex flex-wrap gap-2">
                                  ${(q.options || []).map((opt, oi) => {
                                    const selected = hasPicked && Number(picked) === oi;
                                    let cls = "bg-white border-slate-300 text-slate-800 hover:bg-slate-100";
                                    if (selected && ok) cls = "bg-emerald-600 border-emerald-600 text-white";
                                    else if (selected && !ok) cls = "bg-rose-600 border-rose-600 text-white";
                                    return `<button type="button" data-action="answer-listening" data-key="${key}" data-idx="${oi}" data-correct="${oi === Number(q.ans)}" class="px-3.5 py-2 rounded-lg border text-xs font-bold transition ${cls}">${esc(opt)}</button>`;
                                  }).join("")}
                                </div>
                              </div>
                            `;
                          }).join("")}
                        </div>
                      </div>
                    `;
                  }).join("")}
                </div>
              ` : `
                <!-- SPRECHEN (SPEAKING) -->
                <div class="space-y-5">
                  ${gTasks.speaking.map(task => `
                    <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                      <div class="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <span class="text-xs font-bold text-amber-700">${esc(task.part || 'Sprechen')}</span>
                          <h2 class="text-lg font-extrabold text-slate-900">${esc(task.title)}</h2>
                          <p class="text-sm text-slate-600 mt-1">${esc(task.prompt)}</p>
                        </div>
                        <div class="bg-slate-900 text-white px-4 py-3 rounded-xl text-center shrink-0 min-w-[150px]">
                          <div class="text-[10px] uppercase font-bold text-amber-400">Gapirish taymeri</div>
                          <div id="speak-timer-display" class="text-2xl font-extrabold font-mono my-1">${formatTimer(ui.speakSecLeft)}</div>
                          <div class="flex items-center justify-center gap-1.5">
                            <button type="button" data-action="speak-timer-toggle" class="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold">${ui.speakRunning ? 'Pauza' : 'Boshlash'}</button>
                            <button type="button" data-action="speak-timer-reset" data-sec="${task.durationSec || 120}" class="px-2.5 py-1 rounded-lg bg-white/15 text-white text-xs font-semibold">Qayta</button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Foydali iboralar (Redemittel — tinglab takrorlang)</div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                          ${(task.redemittel || []).map(r => `
                            <div class="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                              <div>
                                <div class="text-sm font-bold text-slate-900">${esc(r.de)}</div>
                                <div class="text-xs text-slate-500 mt-0.5">${esc(r.uz)}</div>
                              </div>
                              <button type="button" data-show-captions data-speak="${esc(r.de)}" class="p-2 rounded-lg bg-white border border-slate-200 hover:bg-amber-50 text-amber-700 shrink-0">
                                <i data-lucide="volume-2" class="w-4 h-4"></i>
                              </button>
                            </div>
                          `).join("")}
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>
              `}
            </div>
          `}
        </div>
      `;
    }

    // --- VIEW 5: ROADMAP, TIMER & GRAMMAR CHEAT SHEET ---
    function renderRoadmap() {
      return `
        <div class="space-y-6">
          <section class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div class="lg:col-span-5">${renderFocusTimer("details")}</div>

              <div class="lg:col-span-7 space-y-3">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-bold text-slate-900">Kunlik 2 soatlik dars jadvali (4 × 30 daqiqa)</h2>
                  <span class="text-xs font-semibold text-emerald-700">${state.dailyBlocks.completed.length}/4 bajarildi</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  ${STUDY_BLOCKS.map(b => {
                    const selected = b.id === ui.timerBlockId;
                    const done = state.dailyBlocks.completed.includes(b.id);
                    return `
                      <div class="p-4 rounded-xl border transition ${selected ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900' : 'border-slate-200 bg-white'}">
                        <div class="flex items-start justify-between gap-2">
                          <button type="button" data-action="select-timer-block" data-block="${b.id}" class="text-left flex-1">
                            <div class="text-sm font-bold text-slate-900">${esc(b.title)}</div>
                            <div class="text-xs text-slate-500 mt-1">${b.minutes} daqiqa</div>
                          </button>
                          <button type="button" data-action="toggle-block" data-block="${b.id}" aria-pressed="${done}" class="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${done ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 bg-white'}" title="Bajarildi deb belgilash">
                            ${done ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
                          </button>
                        </div>
                      </div>
                    `;
                  }).join("")}
                </div>
              </div>
            </div>
          </section>

          <!-- 5-Month Roadmap -->
          <section class="reveal-on-scroll bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-5">
              <div>
                <h2 class="text-lg font-bold text-slate-900">5 oylik B1 yo'l xaritasi (Roadmap)</h2>
                <p class="text-xs text-slate-500">Noldan B1 darajagacha — 350–400 soat · Har kuni 09:00 da avtomatik dars</p>
              </div>
              <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">Hozirgi bosqich: 2-oy (A1.2)</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              ${ROADMAP.map(m => {
                const badgeClass = m.status === 'done' ? 'bg-emerald-100 text-emerald-800' : m.status === 'active' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600';
                const statusLabel = m.status === 'done' ? 'Bajarildi' : m.status === 'active' ? 'Jarayonda' : 'Kutilmoqda';
                return `
                  <div class="rounded-2xl border p-4 flex flex-col justify-between ${m.status === 'active' ? 'border-amber-400 bg-amber-50/30 ring-1 ring-amber-300' : 'border-slate-200 bg-slate-50/40'}">
                    <div>
                      <div class="flex items-center justify-between gap-1 mb-2">
                        <span class="text-xs font-extrabold text-slate-900">${m.month} · ${m.level}</span>
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeClass}">${statusLabel}</span>
                      </div>
                      <h3 class="text-sm font-bold text-slate-900 mb-2.5">${esc(m.title)}</h3>
                      <ul class="space-y-1.5 text-xs text-slate-600">
                        ${m.topics.map(t => `<li class="flex items-start gap-1.5"><span class="text-amber-600 font-bold">•</span><span>${esc(t)}</span></li>`).join("")}
                      </ul>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </section>

          <!-- Cheat Sheets -->
          <section class="reveal-on-scroll grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 class="text-base font-bold text-slate-900 mb-3">Kelishiklar jadvali (Nominativ · Akkusativ · Dativ)</h3>
              <div id="roadmap-table-scroll" data-study-scroll class="overflow-x-auto rounded-xl border border-slate-200">
                <table class="w-full text-left text-xs sm:text-sm">
                  <thead class="bg-slate-100 text-slate-700">
                    <tr>
                      <th class="px-3 py-2 font-bold">Jins</th>
                      <th class="px-3 py-2 font-bold">Nominativ</th>
                      <th class="px-3 py-2 font-bold">Akkusativ</th>
                      <th class="px-3 py-2 font-bold">Dativ</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    <tr><td class="px-3 py-2 font-bold text-blue-700">Erkak</td><td class="px-3 py-2">der / ein</td><td class="px-3 py-2 font-bold text-blue-700">den / einen</td><td class="px-3 py-2 font-bold text-amber-700">dem / einem</td></tr>
                    <tr><td class="px-3 py-2 font-bold text-rose-700">Ayol</td><td class="px-3 py-2">die / eine</td><td class="px-3 py-2">die / eine</td><td class="px-3 py-2 font-bold text-amber-700">der / einer</td></tr>
                    <tr><td class="px-3 py-2 font-bold text-emerald-700">O'rta</td><td class="px-3 py-2">das / ein</td><td class="px-3 py-2">das / ein</td><td class="px-3 py-2 font-bold text-amber-700">dem / einem</td></tr>
                    <tr><td class="px-3 py-2 font-bold text-slate-700">Ko'plik</td><td class="px-3 py-2">die / —</td><td class="px-3 py-2">die / —</td><td class="px-3 py-2 font-bold text-amber-700">den ...-n</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-base font-bold text-slate-900">«Ishlamoq» fe'lining nemischa ma'nolari</h3>
                <span class="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">Shaxsiy eslatma</span>
              </div>
              <div class="space-y-2.5">
                ${ISHLAMOQ_NUANCES.map(item => `
                  <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <div class="text-xs font-bold text-slate-500">${esc(item.context)} → <span class="text-slate-900 text-sm">${esc(item.verb)}</span></div>
                      <div class="text-xs text-slate-700 mt-0.5">${esc(item.example)} <span class="text-slate-400">(${esc(item.uz)})</span></div>
                    </div>
                    <button type="button" data-show-captions data-speak="${esc(item.example)}" class="p-2 rounded-lg bg-white border border-slate-200 hover:bg-amber-50 text-amber-700 shrink-0" title="Tinglash">
                      <i data-lucide="volume-2" class="w-4 h-4"></i>
                    </button>
                  </div>
                `).join("")}
              </div>
            </div>
          </section>
        </div>
      `;
    }

    // =========================================================================
    // 8. TIMER, MODALS & GLOBAL SEARCH
    // =========================================================================
    const focusTimerKey = "deutsch-b1.focus-timer.v1";
    let normalSeconds = 1800, pomodoro = false, breakEnabled = false, rest = null;
    let cycleTarget = 4, cyclesDone = 0, setStarted = false;
    const cycleLocked = () => pomodoro && setStarted && !setFinished();
    const cycleLabel = () => `${Math.min(cyclesDone + 1,cycleTarget)}/${cycleTarget}`;
    const setFinished = () => pomodoro && cyclesDone === cycleTarget;
    const focusSeconds = () => pomodoro ? 1500 : normalSeconds;
    function formatFocusTime(seconds) {
      if (pomodoro) return formatTimer(seconds);
      const hours = Math.floor(seconds / 3600);
      return String(hours).padStart(2,'0') + ':' + formatTimer(seconds % 3600);
    }
    let awaitingReturn = false;
    const restDialog = document.getElementById('focus-rest');
    restDialog.addEventListener('cancel', event => event.preventDefault());
    for (const type of ['keydown','keyup','keypress','wheel','touchmove','contextmenu','click','pointerdown']) {
      window.addEventListener(type, event => {
        if (!restDialog.open) return;
        event.preventDefault(); event.stopImmediatePropagation();
      }, {capture:true,passive:false});
    }
    function syncRest() {
      if (!rest) { if (restDialog.open) restDialog.close(); return; }
      const left = Math.min(300,Math.max(0,Math.ceil((rest.end-Date.now())/1000)));
      restDialog.querySelector('[data-rest-cycle]').textContent = cycleLabel();
      restDialog.querySelector('time').textContent = formatTimer(left);
      restDialog.style.setProperty('--rest-angle', `${left * 1.2}deg`);
      if (!restDialog.open) {
        if (activeSpeechSession) stopGermanSpeech();
        const mediaHub = document.querySelector('#movie-view[data-mode]');
        if (mediaHub) {
          const host = mediaHub.parentElement;
          moviePlayer.close();
          mediaHub.remove();
          moviePlayer.mount(host);
          window.lucide?.createIcons({root:host});
        }
        document.querySelectorAll('video,audio').forEach(media=>media.pause());
        restDialog.showModal();
      }
    }
    let focusRun = null;
    let focusRemainingMs = null;
    let focusTick;
    let lastFocusSecond = -1;
    let pendingFocusFinish;

    function activePomodoroRun() { return pomodoro ? focusRun : null; }

    const timerDock = document.getElementById("focus-timer-dock");
    function focusBlock() {
      return STUDY_BLOCKS.find(block => block.id === ui.timerBlockId) || STUDY_BLOCKS[0];
    }

    function renderFocusTimer(layout) {
      const block = focusBlock();
      const compact = layout !== "details";
      const inFooter = layout === "footer";
      const title = compact ? block.title.replace(/^\d+-blok:\s*/,"") : block.title;
      const track = `<div class="focus-track"><progress data-focus-progress max="${focusSeconds()}" aria-label="Dars taymeri jarayoni"></progress>${inFooter ? "" : '<span class="focus-droplet" aria-hidden="true"></span>'}</div>`;
      if (layout === "dock") return `<section class="focus-timer focus-dock" aria-label="Dars taymeri" data-focus-mode="${pomodoro ? 'pomodoro' : 'normal'}">
        <div class="focus-actions">
          <button type="button" data-nav="roadmap" class="focus-dock-time" title="${esc(title)} · Rejani ochish">
            <time class="focus-countdown" role="timer" aria-live="off" data-focus-clock>${formatFocusTime(ui.timerSecondsLeft)}</time>
            <small class="focus-cycle" data-cycle-count data-dock-cycle hidden></small>
          </button>
          <button type="button" data-action="timer-toggle" class="focus-primary">
            <span data-focus-start><i data-lucide="play" aria-hidden="true"></i></span>
            <span data-focus-pause hidden><i data-lucide="pause" aria-hidden="true"></i></span>
            <span data-focus-button class="sr-only"></span>
          </button>
        </div>
        <span data-focus-status class="sr-only"></span>
        ${track}
      </section>`;
      return `<section class="focus-timer focus-${inFooter ? "dashboard" : layout}" aria-label="Dars taymeri" data-focus-mode="${pomodoro ? 'pomodoro' : 'normal'}">
        <div class="focus-main">
          <div class="focus-info">
            <strong title="${esc(block.title)}">${esc(title)}</strong>
            <span data-focus-status></span>
          </div>
          <button type="button" class="focus-tomato" data-action="timer-mode" aria-label="Pomodoro rejimi" aria-pressed="${pomodoro}" title="${ui.timerRunning ? 'Rejimni almashtirish uchun taymerni pauzaga qo‘ying' : 'Pomodoro · 25 + 5'}" ${ui.timerRunning ? 'disabled' : ''}>
            <picture class="tomato-normal"><source media="(prefers-reduced-motion: reduce)" srcset="assets/pomodoro-still.png"><img src="assets/pomodoro.gif" alt="" width="36" height="36"></picture>
            <picture class="tomato-furious"><source media="(prefers-reduced-motion: reduce)" srcset="assets/pomodoro-furious-still.png"><img src="assets/pomodoro-furious.gif" alt="" width="36" height="36"></picture>
          </button>
          <div class="focus-clock-slot">
            <button type="button" data-action="timer-duration"><time class="focus-countdown" role="timer" aria-live="off" data-focus-clock>${formatFocusTime(ui.timerSecondsLeft)}</time></button>
            <label class="focus-cycle focus-cycle-editor" hidden><span data-cycle-prefix></span><span class="focus-cycle-value"><input data-cycle-target type="text" inputmode="numeric" maxlength="2" aria-label="Sikllar soni" title="Sikllar soni"><span data-cycle-ink aria-hidden="true"></span></span></label>
          </div>
        </div>
        ${compact ? "" : `<p class="focus-description">${esc(block.desc)}</p>`}
        <div class="focus-actions">
          <button type="button" data-action="timer-toggle" class="focus-primary">
            <span data-focus-start><i data-lucide="play"></i></span>
            <span data-focus-pause hidden><i data-lucide="pause"></i></span>
            <span data-focus-button></span>
          </button>
          <button type="button" data-action="timer-notifications" aria-label="Taymer bildirishnomalarini yoqish" title="Taymer bildirishnomalarini yoqish"><i data-lucide="bell"></i></button>
          <button type="button" data-action="timer-break" aria-label="25 daqiqadan keyin majburiy tanaffus" title="25 daqiqadan keyin 5 daqiqalik majburiy tanaffus">⑤</button>
          <button type="button" data-action="timer-drips" aria-label="Sous tomchilari" aria-pressed="${workspace.tomatoDripsEnabled !== false}" ${pomodoro ? '' : 'hidden'}><i data-lucide="droplet" aria-hidden="true"></i></button>
          <button type="button" data-action="timer-reset" aria-label="Taymerni qayta o‘rnatish" title="Taymerni qayta o‘rnatish"><i data-lucide="rotate-ccw" aria-hidden="true"></i>${compact ? "" : " Qayta"}</button>
          ${compact ? `<button type="button" data-nav="roadmap" title="Reja va taymer" aria-label="Reja va taymer"><i data-lucide="arrow-up-right"></i></button>` : ""}
        </div>
        ${track}
      </section>`;
    }


    function syncFocusTimer() {
      const total = focusSeconds();
      const themeActive = pomodoro && setStarted && !setFinished();
      document.documentElement.toggleAttribute('data-tomato-session', themeActive);
      document.documentElement.toggleAttribute('data-tomato-paused', themeActive && !focusRun && !rest);
      document.documentElement.toggleAttribute('data-tomato-preview', pomodoro && !setStarted);
      const dripsEnabled = workspace.tomatoDripsEnabled !== false;
      document.documentElement.toggleAttribute('data-tomato-drips-off', !dripsEnabled);
      syncRest();
      const paused = !ui.timerRunning && focusRemainingMs > 0 && focusRemainingMs < total * 1000;
      const dockVisible = (ui.timerRunning || paused || awaitingReturn) && !["dashboard","roadmap"].includes(state.activeTab);
      timerDock.hidden = !dockVisible;
      if (dockVisible && timerDock.dataset.block !== ui.timerBlockId) {
        timerDock.innerHTML = renderFocusTimer("dock");
        timerDock.dataset.block = ui.timerBlockId;
        window.lucide?.createIcons();
      }
      const label = setFinished() ? "Yangi to‘plam" : ui.timerRunning ? "Pauza" : paused ? "Play" : "Boshlash";
      const status = awaitingReturn ? "Keyingi sikl sizni kutmoqda" : setFinished() ? "To‘plam yakunlandi" : ui.timerRunning ? "Taymer ishlayapti" : ui.timerSecondsLeft === 0 ? "Yakunlandi" :
        paused ? "Pauzada" : "Dars taymeri";
      const done = STUDY_BLOCKS.filter(block => state.dailyBlocks.completed.includes(block.id)).length;
      const blocksLabel = `${done}/${STUDY_BLOCKS.length} blok`;
      if (footerBlocks.textContent !== blocksLabel) {
        footerBlocks.textContent = blocksLabel;
        footerProgress.max = STUDY_BLOCKS.length;
        footerProgress.value = done;
      }
      if (footerTimer.dataset.block !== ui.timerBlockId && footerTimer.firstElementChild) {
        const block = focusBlock();
        const heading = footerTimer.querySelector('.focus-info strong');
        heading.title = block.title;
        heading.textContent = block.title.replace(/^\d+-blok:\s*/, "");
        footerTimer.dataset.block = ui.timerBlockId;
      }
      for (const timer of document.querySelectorAll(".focus-timer")) {
        timer.dataset.focusMode = pomodoro ? 'pomodoro' : 'normal';
        timer.toggleAttribute('data-tomato-timer', pomodoro && !footerTimer.contains(timer));
        const modeButton = timer.querySelector('.focus-tomato');
        modeButton?.setAttribute('aria-pressed', String(pomodoro));
        if (modeButton) {
          modeButton.disabled = !!focusRun || cycleLocked();
          if (cycleLocked()) modeButton.title = 'Rejimni almashtirish uchun to‘plamni tugating yoki Qayta tugmasini bosing';
          else if (pomodoro) modeButton.title = 'Pomodoro · 25 + 5';
        }
        const badge = timer.querySelector('[data-cycle-count]');
        if (badge) {
          badge.hidden = !pomodoro;
          badge.textContent = cycleLabel();
        }
        const cycleInput = timer.querySelector('[data-cycle-target]');
        if (cycleInput) {
          cycleInput.closest('.focus-cycle-editor').hidden = !pomodoro;
          cycleInput.disabled = !!focusRun || !!rest || cycleLocked();
          timer.querySelector('[data-cycle-prefix]').textContent = cycleLabel().split('/')[0] + '/';
          if (document.activeElement !== cycleInput) cycleInput.value = cycleTarget;
          const ink = timer.querySelector('[data-cycle-ink]');
          if (ink.textContent !== String(cycleTarget)) ink.textContent = cycleTarget;
        }
        const durationButton = timer.querySelector('[data-action="timer-duration"]');
        if (durationButton) {
          durationButton.disabled = pomodoro || !!focusRun || !!rest || cycleLocked();
          durationButton.title = cycleLocked() ? 'Sikllar soni qulflangan · Qayta tugmasi bilan ochiladi' : pomodoro ? 'Pomodoro · 25 daqiqa' : 'Taymer vaqtini o‘zgartirish';
          const breakButton = timer.querySelector('[data-action="timer-break"]');
          breakButton.hidden = !pomodoro;
          breakButton.setAttribute('aria-pressed', String(breakEnabled));
          const dripsButton = timer.querySelector('[data-action="timer-drips"]');
          dripsButton.hidden = !pomodoro;
          dripsButton.setAttribute('aria-pressed', String(dripsEnabled));
          dripsButton.title = dripsEnabled ? 'Sous tomchilarini to‘xtatish' : 'Sous tomchilarini yoqish';
        }
        const progress = timer.querySelector('[data-focus-progress]');
        progress.max = total;
        timer.dataset.timerState = ui.timerRunning && ui.timerSecondsLeft <= 10 ? "ending" : ui.timerRunning ? "running" : "ready";
        if (!timer.querySelector('.focus-clock-input')) {
          timer.querySelector("[data-focus-clock]").textContent = formatFocusTime(ui.timerSecondsLeft);
        }
        progress.value = total - ui.timerSecondsLeft;
        progress.parentElement.style.setProperty('--elapsed', (100 * progress.position) + '%');
        timer.querySelector("[data-focus-status]").textContent = (pomodoro ? "Pomodoro · " : "") + status;
        timer.querySelector("[data-focus-start]").hidden = ui.timerRunning;
        timer.querySelector("[data-focus-pause]").hidden = !ui.timerRunning;
        const labelNode = timer.querySelector("[data-focus-button]");
        labelNode.textContent = label;
        if (timer.classList.contains("focus-dock")) {
          labelNode.closest("button").title = label;
          timer.querySelector('.focus-dock-time').title = (pomodoro ? 'Pomodoro · ' : '') + focusBlock().title + ' · Rejani ochish';
        }
      }
      for (const bell of document.querySelectorAll('[data-action="timer-notifications"]')) {
        bell.hidden = !("Notification" in window) || !window.isSecureContext;
        const granted = timerNoticesEnabled();
        bell.setAttribute("aria-pressed",String(granted));
        bell.title = granted ? "Bildirishnomalar yoqilgan · O‘chirish" : "Bildirishnomalar o‘chirilgan · Yoqish";
        bell.setAttribute("aria-label",bell.title);
      }
    }

    function storeFocusTimer() {
      const run = focusRun && {id:focusRun.id,start:focusRun.start,end:focusRun.end};
      workspace.focusTimer = {block:ui.timerBlockId,left:focusRemainingMs,normalSeconds,pomodoro,breakEnabled,cycleTarget,cyclesDone,setStarted,rest,run,awaitingReturn};
      writeWorkspace();
      queueMicrotask(() => profileSync.flush());
    }

    function restoreFocusTimer() {
      let saved = workspace.focusTimer;
      const migrate = saved === undefined;
      if (migrate) {
        try { saved = JSON.parse(sessionStorage.getItem(focusTimerKey)); } catch {}
      }
      const recent = saved?.recent;
      if (recent && typeof recent.id === "string" && Number.isFinite(recent.start) && Number.isFinite(recent.end)) {
        const existing = state.timerRuns?.[recent.id];
        if (!existing || recent.end > existing.end || (recent.completed && !existing.completed)) {
          const {id,...record} = recent;
          state.timerRuns = {...state.timerRuns,[id]:record};
          state.bestStreak = Math.max(state.bestStreak || 0,studyStats.streaks().current);
          writeState();
        }
      }
      normalSeconds = Number.isInteger(saved?.normalSeconds) && saved.normalSeconds > 0 && saved.normalSeconds <= 86400 ? saved.normalSeconds : Number.isInteger(saved?.minutes) && saved.minutes >= 1 && saved.minutes <= 1440 ? saved.minutes * 60 : 1800;
      pomodoro = saved?.pomodoro === true;
      breakEnabled = saved?.breakEnabled === true;
      cycleTarget = Number.isInteger(saved?.cycleTarget) && saved.cycleTarget >= 1 && saved.cycleTarget <= 99 ? saved.cycleTarget : 4;
      cyclesDone = pomodoro && Number.isInteger(saved?.cyclesDone) ? Math.max(0,Math.min(saved.cyclesDone,cycleTarget)) : 0;
      rest = pomodoro && typeof saved?.rest?.id === 'string' && Number.isFinite(saved.rest.end) ? saved.rest : null;
      setStarted = pomodoro && (saved?.setStarted ?? Boolean(saved?.run || rest || cyclesDone || (saved?.left > 0 && saved.left < focusSeconds()*1000)));
      awaitingReturn = pomodoro && saved?.awaitingReturn === true && !rest && !saved.run && cyclesDone < cycleTarget;
      const block = STUDY_BLOCKS.find(item => item.id === saved?.block);
      clearTimeout(focusTick);
      window.removeEventListener("beforeunload",confirmTimerExit);
      focusRun = null;
      focusRemainingMs = null;
      ui.timerRunning = false;
      lastFocusSecond = -1;
      if (!block || !Number.isFinite(saved.left) || saved.left < 0 || saved.left > focusSeconds() * 1000) {
        ui.timerSecondsLeft = focusSeconds();
        return;
      }
      ui.timerBlockId = block.id;
      focusRemainingMs = saved.left;
      ui.timerSecondsLeft = Math.ceil(saved.left / 1000);
      if (rest) { focusTick = setTimeout(updateFocusClock,0); return; }
      const run = saved.run;
      if (run && typeof run.id === "string" && Number.isFinite(run.start) && Number.isFinite(run.end) &&
          run.end - run.start > 0 && run.end - run.start <= focusSeconds() * 1000) {
        focusRun = {...run};
        ui.timerRunning = true;
        ui.timerSecondsLeft = Math.ceil(Math.max(0,run.end - Date.now()) / 1000);
        window.addEventListener("beforeunload",confirmTimerExit);
        focusTick = setTimeout(updateFocusClock,0);
      }
      if (migrate) storeFocusTimer();
    }

    async function refreshStoredFocusTimer() {
      const previous = workspace.focusTimer;
      const result = await profileSync.refreshTimer();
      if (!result || !Object.hasOwn(result,"focusTimer") || workspace.focusTimer !== previous) return;
      const previousBlock = ui.timerBlockId, oldSeconds = normalSeconds, oldMode = pomodoro, oldRunning = ui.timerRunning;
      workspace.focusTimer = result.focusTimer;
      cacheWorkspace();
      restoreFocusTimer();
      if ((ui.timerBlockId !== previousBlock || normalSeconds !== oldSeconds || pomodoro !== oldMode || ui.timerRunning !== oldRunning) && ["dashboard","roadmap"].includes(state.activeTab)) render();
      else { syncFocusTimer(); studyStats.refreshPomodoro(); }
    }

    function confirmTimerExit(event) {
      if (!focusRun || Date.now() >= focusRun.end) return;
      event.preventDefault();
      event.returnValue = true;
    }

    function recordFocusRun(completed = false) {
      if (!focusRun) return;
      const {id,start,end} = focusRun;
      const until = Math.min(Date.now(),end);
      if (until <= start) return;
      const record = {start,end:until,completed,...(pomodoro ? {pomodoro:true} : {})};
      (state.timerRuns ??= {})[id] = record;
      state.bestStreak = Math.max(state.bestStreak || 0,studyStats.streaks().current);
      writeState();
    }

    function stopFocusTimer(completed = false, persist = true) {
      if (focusRun) {
        focusRemainingMs = Math.max(0,focusRun.end - Date.now());
        recordFocusRun(completed);
      }
      clearTimeout(focusTick);
      focusRun = null;
      lastFocusSecond = -1;
      ui.timerRunning = false;
      if (focusRemainingMs !== null) ui.timerSecondsLeft = Math.ceil(focusRemainingMs / 1000);
      window.removeEventListener("beforeunload",confirmTimerExit);
      timerNotice?.close();
      if (timerWorker && !completed) timerWorker.then(async worker => {
        try { (await worker?.getNotifications({tag:timerNoticeTag}))?.forEach(notice=>notice.close()); } catch {}
      });
      if (persist) storeFocusTimer();
      studyStats.refreshPomodoro();
    }

    function finishFocusTimer() {
      const run = focusRun;
      if (!run || Date.now() < run.end) return;
      if (!profileSync.available) { completeFocusTimer(); return; }
      return pendingFocusFinish ??= refreshStoredFocusTimer().then(() => {
        if (focusRun?.id === run.id && Date.now() >= focusRun.end) completeFocusTimer();
      }).finally(() => { pendingFocusFinish = undefined; });
    }

    function completeFocusTimer() {
      const block = focusBlock();
      const endDate = getLocalTodayStr(new Date(focusRun.end));
      const finished = focusRun;
      stopFocusTimer(true,false);
      if (pomodoro) rest = {id:finished.id,end:finished.end + (breakEnabled ? 300000 : 0)};
      storeFocusTimer();
      if (endDate === getLocalTodayStr()) {
        if (state.dailyBlocks.date !== endDate) state.dailyBlocks = {date:endDate,completed:[]};
        if (!state.dailyBlocks.completed.includes(block.id)) state.dailyBlocks.completed.push(block.id);
      }
      writeState();
      if (rest) {
        if (rest.end > Date.now()) { playTimerCue('timerPomoRest'); }
        if (rest.end > Date.now()) render();
        updateFocusClock(); return;
      }
      playTimerCue("timerDone");
      showToast(`${block.title} yakunlandi.`,"success");
      sendFocusNotice("Deutsch B1 · Taymer yakunlandi",block.title);
      render();
    }

    function updateFocusClock() {
      if (rest) {
        clearTimeout(focusTick);
        const remaining = rest.end - Date.now();
        if (remaining > 0) { syncRest(); focusTick = setTimeout(updateFocusClock,remaining % 1000 || 1000); return; }
        if (rest.manual) {
          rest = null;
          syncRest();
          toggleTimer();
          return;
        }
        const date = getLocalTodayStr(new Date(rest.end));
        const day = (state.studyStats ??= {})[date] ??= {};
        (day.pomodoroCycles ??= {})[rest.id] = true;
        state.bestStreak = Math.max(state.bestStreak || 0,studyStats.streaks().current);
        cyclesDone = Math.min(cyclesDone + 1,cycleTarget);
        writeState(); rest = null; ui.timerSecondsLeft = setFinished() ? 0 : focusSeconds(); focusRemainingMs = ui.timerSecondsLeft*1000;
        studyStats.refreshPomodoro();
        syncRest();
        awaitingReturn = breakEnabled && !setFinished();
        if (!awaitingReturn && !setFinished()) toggleTimer();
        else { storeFocusTimer(); render(); }
        if (setFinished()) {
          playTimerCue('timerPomoDone');
          const message = `Pomodoro to‘plami yakunlandi: ${cycleTarget}/${cycleTarget} sikl bajarildi.`;
          showToast(message,'success'); sendFocusNotice('Pomodoro · To‘plam yakunlandi',message); return;
        }
        if (awaitingReturn) {
          const message = 'Platformaga qayting yoki sahifada harakat qiling. Keyingi 25 daqiqalik seans boshlanadi.';
          showToast('Tanaffus tugadi. ' + message,'success');
          sendFocusNotice('Pomodoro · Tanaffus tugadi',message);
          return;
        }
        showToast('Pomodoro tugadi · 1 sikl kunlik faollikka yozildi.','success');
        sendFocusNotice(`Pomodoro · ${cyclesDone}/${cycleTarget} sikl yakunlandi`,'Keyingi 25 daqiqalik dars boshlandi.'); return;
      }
      if (!focusRun) return;
      clearTimeout(focusTick);
      const remaining = focusRun.end - Date.now();
      if (remaining <= 0) { finishFocusTimer(); return; }
      ui.timerSecondsLeft = Math.ceil(remaining / 1000);
      if (ui.timerSecondsLeft !== lastFocusSecond) {
        lastFocusSecond = ui.timerSecondsLeft;
        if (lastFocusSecond <= 10) playTimerCue(pomodoro ? "timerPomoTick" : "timerTick");
        syncFocusTimer();
        if (pomodoro) studyStats.refreshPomodoro();
      }
      focusTick = setTimeout(updateFocusClock,remaining % 1000 || 1000);
    }

    function toggleTimer() {
      if (rest) return;
      awaitingReturn = false;
      if (focusRun) {
        if (Date.now() >= focusRun.end) { finishFocusTimer(); return; }
        stopFocusTimer();
        writeState();
        playTimerCue(pomodoro ? "timerPomoPause" : "timerStop");
      } else {
        if (setFinished()) cyclesDone = 0;
        if (pomodoro) setStarted = true;
        const duration = focusRemainingMs > 0 ? focusRemainingMs : focusSeconds() * 1000;
        const start = Date.now();
        focusRemainingMs = duration;
        focusRun = {id:crypto.randomUUID?.() || `${start}-${Math.random()}`,start,end:start + duration};
        ui.timerRunning = true;
        window.addEventListener("beforeunload",confirmTimerExit);
        storeFocusTimer();
        updateFocusClock();
        playTimerCue(pomodoro ? "timerPomoStart" : "timerStart", focusRun);
      }
      syncFocusTimer();
    }

    async function resetFocusTimer(block = focusBlock(), drainSauce = false) {
      if (focusRun && Date.now() >= focusRun.end) await finishFocusTimer();
      if (rest) return;
      if (focusRun || ui.timerSecondsLeft < focusSeconds()) playTimerCue(pomodoro ? "timerPomoPause" : "timerStop");
      if (drainSauce) window.pomodoroLiquid?.reset();
      awaitingReturn = false;
      stopFocusTimer();
      cyclesDone = 0; setStarted = false;
      const blockChanged = ui.timerBlockId !== block.id;
      ui.timerBlockId = block.id;
      ui.timerSecondsLeft = focusSeconds();
      focusRemainingMs = ui.timerSecondsLeft * 1000;
      storeFocusTimer();
      if (blockChanged) render();
      else syncFocusTimer();
    }

    function parseTimerTime(value) {
      const time = value.trim();
      const parts = /^\d{1,6}$/.test(time)
        ? time.padStart(6,'0').match(/\d{2}/g)
        : /^\d{1,2}(?::\d{1,2}){1,2}$/.test(time) ? time.split(':') : null;
      if (!parts) return 0;
      const [seconds, minutes = 0, hours = 0] = parts.reverse().map(Number);
      const total = hours * 3600 + minutes * 60 + seconds;
      return minutes < 60 && seconds < 60 && total <= 86400 ? total : 0;
    }

    function editNormalClock(button) {
      const slot = button.parentElement;
      const clock = button.querySelector('time');
      const original = ui.timerSecondsLeft;
      const input = document.createElement('input');
      input.className = 'focus-countdown focus-clock-input';
      input.type = 'text';
      input.inputMode = 'numeric';
      input.maxLength = 8;
      input.value = clock.textContent;
      input.setAttribute('aria-label', 'Taymer vaqti, soat, daqiqa va soniya');
      input.title = 'Masalan: 28:51 yoki 1:02:03';
      slot.style.minWidth = `${button.getBoundingClientRect().width}px`;
      slot.append(input);
      input.focus({preventScroll:true});
      input.setSelectionRange(input.value.length,input.value.length);
      const positions = [0,1,3,4,6,7,8];
      let rolling = true;
      let typed = '';
      function display(digits, cursor) {
        input.value = digits.match(/.{2}/g).join(':');
        input.setSelectionRange(positions[cursor],positions[cursor]);
        input.setCustomValidity('');
      }
      function changeDigits(text, deletion = '') {
        const indexAt = offset => positions.filter(position => position < offset).length;
        let from = indexAt(input.selectionStart);
        let to = indexAt(input.selectionEnd);
        const whole = from === 0 && to === 6;
        if (whole) { rolling = true; typed = ''; }
        if (!deletion && !/^\d+$/.test(text)) return;
        if (rolling) {
          if (deletion && !typed && !whole) typed = input.value.replaceAll(':','');
          typed = deletion ? typed.slice(0,-1) : (typed + text).slice(-6);
          display(typed.padStart(6,'0'),6);
          return;
        }
        const digits = input.value.replaceAll(':','').split('');
        if (deletion && from === to) {
          if (deletion.endsWith('Backward')) from = Math.max(0,from - 1);
          else to = Math.min(6,to + 1);
        }
        digits.fill('0',from,to);
        for (const digit of text) {
          if (from === 6) break;
          digits[from++] = digit;
        }
        display(digits.join(''),from);
      }
      input.onpointerdown = () => { rolling = false; };
      input.onbeforeinput = event => {
        if (!event.cancelable) return;
        event.preventDefault();
        if (event.inputType.startsWith('delete')) changeDigits('',event.inputType);
        else if (event.inputType.startsWith('insert')) changeDigits(event.data || '');
      };
      input.onpaste = event => {
        event.preventDefault();
        const value = event.clipboardData.getData('text').trim();
        if (value.includes(':')) {
          const seconds = parseTimerTime(value);
          if (seconds) {
            typed = formatFocusTime(seconds).replaceAll(':','');
            rolling = true;
            display(typed,6);
          }
        } else if (/^\d{1,6}$/.test(value)) changeDigits(value);
      };
      input.oninput = () => {
        typed = input.value.replace(/\D/g,'').slice(-6);
        rolling = true;
        display(typed.padStart(6,'0'),6);
      };
      function finish(save, returnFocus) {
        const seconds = parseTimerTime(input.value);
        input.onblur = null;
        input.remove();
        slot.style.removeProperty('min-width');
        if (save && seconds && seconds !== original && !pomodoro && !focusRun && !rest) {
          normalSeconds = ui.timerSecondsLeft = seconds;
          focusRemainingMs = seconds * 1000;
          storeFocusTimer();
          syncFocusTimer();
        } else {
          clock.textContent = formatFocusTime(ui.timerSecondsLeft);
        }
        if (returnFocus) button.focus({preventScroll:true});
      }
      input.onblur = () => finish(true,false);
      input.onkeydown = event => {
        event.stopPropagation();
        if (['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) rolling = false;
        if (!['Enter','Escape'].includes(event.key)) return;
        event.preventDefault();
        const save = event.key === 'Enter';
        if (save && !parseTimerTime(input.value)) {
          input.setCustomValidity('00:01 dan 24:00:00 gacha vaqt kiriting.');
          input.reportValidity();
          return;
        }
        finish(save,true);
      };
    }
    document.addEventListener('focusin', event => {
      if (event.target.matches('[data-cycle-target]')) event.target.select();
    });
    document.addEventListener('focusout', event => {
      const input = event.target;
      if (!input.matches('[data-cycle-target]')) return;
      const value = Number(input.value);
      if (pomodoro && !focusRun && !rest && !cycleLocked() && /^\d{1,2}$/.test(input.value) && value > 0 && value !== cycleTarget) {
        if (setFinished()) {
          cyclesDone = 0;
          setStarted = false;
          ui.timerSecondsLeft = focusSeconds();
          focusRemainingMs = ui.timerSecondsLeft * 1000;
        }
        cycleTarget = value;
        storeFocusTimer();
        syncFocusTimer();
      }
      input.value = cycleTarget;
    });
    document.addEventListener('keydown', event => {
      if (!event.target.matches('[data-cycle-target]')) return;
      if (event.key === 'Escape') event.target.value = cycleTarget;
      if (['Escape','Enter'].includes(event.key)) {
        event.preventDefault();
        event.target.blur();
      }
    });
    const timerNoticeTag = "deutsch-focus-timer";
    let timerNotice, timerWorker;

    async function focusNoticeWorker() {
      if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
      timerWorker ??= navigator.serviceWorker.register("assets/timer-notifications.js").then(async registration => {
        if (registration.active) return registration;
        const worker = registration.installing || registration.waiting;
        if (!worker) throw Error("Timer notification worker unavailable");
        await new Promise((resolve,reject) => {
          const ready = () => {
            if (worker.state === "activated") resolve();
            else if (worker.state === "redundant") reject(Error("Timer notification worker stopped"));
          };
          worker.addEventListener("statechange",ready);
          ready();
        });
        return registration;
      }).catch(() => { timerWorker = undefined; });
      return timerWorker;
    }

    function timerNoticesEnabled() {
      return window.Notification?.permission === "granted" && workspace.timerNotifications !== false;
    }

    async function sendFocusNotice(title,body) {
      if (!timerNoticesEnabled()) return;
      const options = {body,tag:timerNoticeTag,data:{url:location.href}};
      try {
        const worker = await focusNoticeWorker();
        if (!timerNoticesEnabled()) return;
        if (worker) {
          await worker.showNotification(title,options);
          return;
        }
      } catch { /* Try the window notification API if the worker is unavailable. */ }
      try {
        if (!timerNoticesEnabled()) return;
        timerNotice?.close();
        timerNotice = new Notification(title,options);
        timerNotice.onclick = () => { window.focus(); timerNotice?.close(); };
      } catch { showToast("Brauzer tizim bildirishnomasini yubora olmadi."); }
    }

    async function enableTimerNotifications() {
      if (!window.Notification || !window.isSecureContext) return;
      const enable = !timerNoticesEnabled();
      if (enable && Notification.permission !== "granted") {
        try {
          if (await Notification.requestPermission() !== "granted") {
            showToast("Bildirishnomalarni yoqish uchun brauzerda bu saytga ruxsat bering.");
            syncFocusTimer();
            return;
          }
        } catch { showToast("Brauzer bildirishnoma ruxsatini bera olmadi."); return; }
      }
      workspace.timerNotifications = enable;
      writeWorkspace();
      syncFocusTimer();
      if (enable) focusNoticeWorker();
      showToast(enable ? "Taymer bildirishnomalari yoqildi." : "Taymer bildirishnomalari o‘chirildi.");
    }

    function resumeOnReturn() {
      if (awaitingReturn && !document.hidden && document.hasFocus()) toggleTimer();
    }
    for (const type of ['pointermove','pointerdown','keydown']) {
      document.addEventListener(type,event => {
        if (!event.isTrusted || !awaitingReturn || event.target.closest?.('[data-action="timer-toggle"],[data-action="timer-reset"]')) return;
        resumeOnReturn();
      },{passive:true});
    }
    async function refreshOnReturn() {
      if (document.hidden || !currentPlace) return;
      await refreshStoredFocusTimer();
      updateFocusClock();
      resumeOnReturn();
    }
    document.addEventListener("visibilitychange",refreshOnReturn);
    window.addEventListener("focus",refreshOnReturn);

    function openSyncModal(tab = "schedule") {
      ui.syncTab = tab;
      setModalOpen("sync-modal", true);
      updateSyncModalTabs();
      const lessons = getAllLessons();
      const words = getAllWords();
      const storageNote = document.getElementById("profile-storage-note");
      storageNote.textContent = profileSync.available
        ? "Darslar, natijalar va sozlamalar shu kompyuterdagi server orqali brauzerlar orasida ulashiladi."
        : "HTML fayl holatida ma’lumot shu brauzerda qoladi. Serverga o‘tkazish uchun zaxira nusxasini yuklab oling.";
      const engineEl = document.getElementById("db-engine-label");
      const countsEl = document.getElementById("db-counts-label");
      const bulkStatsEl = document.getElementById("bulk-db-stats");
      if (engineEl) engineEl.textContent = profileSync.available ? "Loyiha bazasi (SQLite)" : usingIndexedDB ? "Brauzer bazasi (IndexedDB)" : "Brauzer xotirasi";
      if (countsEl) countsEl.textContent = `Jami: ${lessons.length} ta dars · ${words.length} ta so'z`;
      if (bulkStatsEl) bulkStatsEl.textContent = `Hozirgi baza: ${words.length} ta so'z`;
      if (window.lucide) window.lucide.createIcons();
    }

    function updateSyncModalTabs() {
      document.getElementById("lesson13-import-recovery").classList.toggle(
        "hidden", !state.lesson13ImportRecovery?.entries?.length
      );
      document.querySelectorAll(".sync-tab-btn").forEach(btn => {
        const active = btn.dataset.syncTab === ui.syncTab;
        btn.classList.toggle("border-slate-900", active);
        btn.classList.toggle("text-slate-900", active);
        btn.classList.toggle("border-transparent", !active);
        btn.classList.toggle("text-slate-500", !active);
      });
      ["schedule", "bulk", "backup"].forEach(k => {
        document.getElementById(`sync-pane-${k}`).classList.toggle("hidden", k !== ui.syncTab);
      });
    }

    function closeAllModals() {
      document.querySelectorAll('[role="dialog"]:not(.hidden)').forEach(modal => setModalOpen(modal.id, false));
    }

    function renderGlobalSearch(query) {
      const box = document.getElementById("global-search-results");
      const q = query.trim().toLowerCase();
      if (!q) {
        box.innerHTML = `<div class="p-4 text-xs text-slate-500 text-center">Dars nomi yoki so'z kiriting (masalan: Perfekt, Bahnhof, suv)...</div>`;
        return;
      }
      const matchedLessons = getAllLessons().filter(l => `${l.id}-dars ${l.title} ${l.level}`.toLowerCase().includes(q)).slice(0, 6);
      const matchedWords = getAllWords().filter(w => `${w.art} ${w.de} ${w.uz}`.toLowerCase().includes(q)).slice(0, 12);

      if (!matchedLessons.length && !matchedWords.length) {
        box.innerHTML = `<div class="p-4 text-xs text-slate-500 text-center">Hech narsa topilmadi.</div>`;
        return;
      }

      box.innerHTML = `
        ${matchedLessons.map(l => `
          <button type="button" data-action="search-pick-lesson" data-lesson="${l.id}" class="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between gap-2">
            <div>
              <span class="text-xs font-bold text-amber-700">${l.id}-dars (${esc(l.level)})</span>
              <div class="text-sm font-semibold text-slate-900">${esc(l.title)}</div>
            </div>
            <span class="text-[11px] text-slate-400">Dars →</span>
          </button>
        `).join("")}
        ${matchedWords.map(w => `
          <div class="px-3 py-2 rounded-xl hover:bg-slate-50 flex items-center justify-between gap-2">
            <div>
              <span class="font-bold text-sm text-slate-900">${esc(fullGermanWord(w))}</span>
              <span class="text-xs text-slate-500 ml-2">${esc(w.uz)}</span>
            </div>
            <button type="button" data-speak="${esc(fullGermanWord(w))}" class="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100">
              <i data-lucide="volume-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        `).join("")}
      `;
      if (window.lucide) window.lucide.createIcons();
    }

    // =========================================================================
    // 9. EVENT DELEGATION & KEYBOARD SHORTCUTS
    // =========================================================================
    document.addEventListener("click", (e) => {
      const speakBtn = e.target.closest("[data-speak]");
      if (speakBtn) {
        e.stopPropagation();
        speakGerman(speakBtn.dataset.speak, speakBtn, speakBtn.hasAttribute('data-show-captions'));
        return;
      }

      const syncTabBtn = e.target.closest("[data-sync-tab]");
      if (syncTabBtn) {
        ui.syncTab = syncTabBtn.dataset.syncTab;
        updateSyncModalTabs();
        return;
      }

      const navBtn = e.target.closest("[data-nav]");
      if (navBtn) {
        const fromFooter = studyFooter.contains(navBtn);
        if (fromFooter && navBtn.dataset.nav === state.activeTab) {
          document.getElementById('app-root').focus({preventScroll:true});
          scrollToPageTop();
          return;
        }
        state.activeTab = navBtn.dataset.nav;
        saveState();
        setMobileMenuOpen(false);
        render();
        if (fromFooter) document.getElementById('app-root').focus({preventScroll:true});
        return;
      }

      const actionEl = e.target.closest("[data-action]");
      if (!actionEl) return;
      const action = actionEl.dataset.action;
      if (["study-day","study-month","study-today","study-scope"].includes(action)) {
        studyStats.select(action,actionEl.dataset);
        return;
      }

      if (action === "open-lesson" || action === "select-lesson") {
        if (Number(actionEl.dataset.lesson) !== Number(state.selectedLessonId)) ui.showLessonTranslation = false;
        state.selectedLessonId = Number(actionEl.dataset.lesson);
        state.activeTab = "lessons";
        saveState();
        const fromList = !!actionEl.closest("#lesson-list-scroll");
        render({keepScroll:fromList});
        if (!fromList) scrollToPageTop();
      } else if (action === "search-pick-lesson") {
        closeAllModals();
        state.selectedLessonId = Number(actionEl.dataset.lesson);
        state.activeTab = "lessons";
        saveState();
        render();
      } else if (action === "open-sync") {
        openSyncModal("schedule");
      } else if (action === "open-sync-bulk") {
        openSyncModal("bulk");
      } else if (action === "set-lesson-level") {
        ui.lessonLevel = actionEl.dataset.level;
        ui.lessonPage = 1;
        render();
      } else if (action === "set-lesson-page") {
        ui.lessonPage = Number(actionEl.dataset.page);
        render();
      } else if (action === "set-vocab-page") {
        ui.vocabPage = Number(actionEl.dataset.page);
        render();
        scrollToPageTop();
      } else if (action === "play-dialogue") {
        const lid = Number(actionEl.dataset.lesson);
        const l = getAllLessons().find(x => Number(x.id) === lid);
        if (l && l.dialogue) speakDialogue(l.dialogue);
      } else if (action === "toggle-lesson-complete") {
        const lid = Number(actionEl.dataset.lesson);
        if (completedLessonSet.has(lid)) {
          state.completedLessons = state.completedLessons.filter(id => Number(id) !== lid);
        } else {
          state.completedLessons.push(lid);
          studyStats.record("lessons","done","lesson-" + lid);
          showToast(`${lid}-dars tugatildi deb belgilandi!`, "success");
        }
        saveState();
        render();
      } else if (action === "answer-choice") {
        const lid = Number(actionEl.dataset.lesson);
        const exId = actionEl.dataset.ex;
        const val = actionEl.dataset.val;
        const lesson = getAllLessons().find(l => Number(l.id) === lid);
        const ex = lesson?.exercises.find(x => x.id === exId);
        if (ex) {
          const ok = checkExerciseAnswer(ex, val);
          studyStats.record("exercises",ok ? "correct" : "wrong");
          state.solvedExercises[exId] = { correct: ok, answer: val };
          saveState();
          if (ok) { recordDailyActivity("exercise", 1); showToast("To'g'ri javob!", "success"); }
          else playAnswerCue(false);
          render();
          animateFeedback(document.querySelector(`[data-exercise-feedback="${CSS.escape(exId)}"]`), ok);
        }
      } else if (action === "check-input") {
        const lid = Number(actionEl.dataset.lesson);
        const exId = actionEl.dataset.ex;
        const input = document.getElementById(`input-${exId}`);
        const lesson = getAllLessons().find(l => Number(l.id) === lid);
        const ex = lesson?.exercises.find(x => x.id === exId);
        if (ex && input && input.value.trim()) {
          const val = input.value;
          if (ex.type === "selfcheck") {
            const previous = state.solvedExercises[exId];
            state.solvedExercises[exId] = {reviewed:true,answer:val};
            if (!previous?.reviewed && !previous?.correct) recordDailyActivity("exercise",1);
            saveState();
            showToast("Javobingiz saqlandi.");
            render();
            return;
          }
          const ok = checkExerciseAnswer(ex, val);
          studyStats.record("exercises",ok ? "correct" : "wrong");
          state.solvedExercises[exId] = { correct: ok, answer: val };
          saveState();
          if (ok) { recordDailyActivity("exercise", 1); showToast("Barakalla! To'g'ri javob!", "success"); }
          else showToast("Qayta tekshirib ko'ring.", "warn");
          render();
          animateFeedback(document.querySelector(`[data-exercise-feedback="${CSS.escape(exId)}"]`), ok);
        }
      } else if (action === "reveal-answer") {
        const lid = Number(actionEl.dataset.lesson);
        const exId = actionEl.dataset.ex;
        const lesson = getAllLessons().find(l => Number(l.id) === lid);
        const ex = lesson?.exercises.find(x => x.id === exId);
        if (ex?.type === "selfcheck" && ex.sampleAnswer) {
          showToast(ex.sampleAnswer);
          return;
        }
        if (ex?.sampleAnswer) {
          state.solvedExercises[exId] = { correct: true, answer: ex.sampleAnswer };
          saveState();
          showToast(`To'g'ri javob: ${ex.sampleAnswer}`, "info");
          render();
        }
      } else if (action === "reset-lesson-exercises") {
        const lid = Number(actionEl.dataset.lesson);
        const lesson = getAllLessons().find(l => Number(l.id) === lid);
        if (lesson) {
          (lesson.exercises || []).forEach(ex => { delete state.solvedExercises[ex.id]; });
          saveState();
          showToast("Dars mashqlari tozalandi.", "info");
          render();
        }
      } else if (action === "open-vocab-for-lesson") {
        ui.vocabLesson = String(actionEl.dataset.lesson);
        ui.vocabPage = 1;
        state.activeTab = "vocab";
        saveState();
        render();
        scrollToPageTop();
      } else if (action === "toggle-mastered") {
        const wid = actionEl.dataset.word;
        if (masteredSet.has(wid)) state.masteredWords = state.masteredWords.filter(id => id !== wid);
        else {
          state.masteredWords.push(wid);
          studyStats.record("vocab","done",wid);
          recordDailyActivity("word", 1);
          requestInterfaceCue('learned');
        }
        saveState();
        render();
      } else if (action === "toggle-fav") {
        const wid = actionEl.dataset.word;
        if (favoriteSet.has(wid)) state.favoriteWords = state.favoriteWords.filter(id => id !== wid);
        else {
          state.favoriteWords.push(wid);
          requestInterfaceCue('choose');
        }
        saveState();
        render();
      } else if (action === "reset-vocab-filters") {
        ui.vocabSearch = "";
        ui.vocabLesson = "all";
        ui.vocabType = "all";
        ui.vocabStatus = "all";
        ui.vocabSort = "default";
        ui.vocabPage = 1;
        render();
      } else if (action === "open-add-word") {
        setModalOpen("add-word-modal", true);
        document.getElementById("cw-de").focus();
      } else if (action === "export-vocab-csv") {
        const words = getAllWords();
        const header = ["Dars", "Daraja", "Artikl/Tur", "Nemischa", "Ko'plik/Perfekt", "Talaffuz", "O'zbekcha tarjima", "Holat"];
        const rows = words.map(w => [
          w.lessonId ? `${w.lessonId}-dars` : "Shaxsiy",
          w.level || "",
          w.art,
          w.de,
          w.plural || "",
          w.pron || "",
          w.uz,
          masteredSet.has(w.id) ? "Yodlangan" : "O'rganilmoqda"
        ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(","));
        const csv = "\uFEFF" + [header.join(","), ...rows].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `nemis_tili_lugat_${todayStr}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        showToast(`${words.length} ta so'z tarjimasi bilan CSV (Excel) formatda yuklandi!`, "success");
      } else if (action === "export-vocab-txt") {
        const words = getAllWords();
        const lines = words.map((w, i) => `${i + 1}. ${fullGermanWord(w)}${w.plural ? ' (' + w.plural + ')' : ''} [${w.pron || ''}] — ${w.uz}`);
        const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `nemis_tili_lugat_${todayStr}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        showToast(`${words.length} ta so'z TXT ro'yxat sifatida yuklandi!`, "success");
      } else if (action === "set-grammar-tab") {
        ui.grammarTab = actionEl.dataset.tab;
        render();
      } else if (action === "set-grammar-case") {
        ui.grammarCase = actionEl.dataset.case;
        render({keepScroll:true});
      } else if (action === "set-grammar-syntax") {
        ui.grammarSyntaxId = actionEl.dataset.sid;
        render({keepScroll:true});
      } else if (action === "match-restart") {
        initMatchGame();
        renderPracticeUpdate(action);
      } else if (action === "match-pick-de" || action === "match-pick-uz") {
        const id = actionEl.dataset.wid;
        if (ui.matchMatchedIds.includes(id)) return;
        const side = action === "match-pick-de" ? "matchSelectedDe" : "matchSelectedUz";
        ui[side] = ui[side] === id ? null : id;
        ui.matchFeedback = null;
        if (ui.matchSelectedDe && ui.matchSelectedUz) {
          const word = ui.matchPairs.find(item => item.id === ui.matchSelectedDe);
          const correct = ui.matchSelectedDe === ui.matchSelectedUz;
          ui.matchFeedback = {ok:correct,id:word.id,otherId:ui.matchSelectedUz,
            text:correct ? "To‘g‘ri juftlik." : "Bu juftlik mos kelmadi. Qayta urinib ko‘ring."};
          if (correct) ui.matchMatchedIds.push(word.id);
          else ui.matchMistakes++;
          markPracticeAnswer(word,correct);
          playAnswerCue(correct);
          ui.matchSelectedDe = ui.matchSelectedUz = null;
        }
        renderPracticeUpdate(action);
      } else if (action === "spell-hint") {
        ui.spellHint = true;
        renderPracticeUpdate(action);
      } else if (action === "spell-char") {
        const input = document.getElementById("spell-answer-input");
        if (input && !input.readOnly) {
          input.setRangeText(actionEl.dataset.ch,input.selectionStart,input.selectionEnd,"end");
          ui.spellInput = input.value;
          input.focus({preventScroll:true});
        }
      } else if (action === "spell-check") {
        const word = ui.spellCurrent;
        const answer = normalizeAnswer(ui.spellInput.normalize("NFC"));
        if (!word || !answer || ui.spellFeedback) return;
        const ok = [word.de,fullGermanWord(word)].some(text => normalizeAnswer(text.normalize("NFC")) === answer);
        ui.spellHint = false;
        ui.spellStreak = ok ? ui.spellStreak + 1 : 0;
        ui.spellFeedback = {ok,text:ok ? "To‘g‘ri yozdingiz." : "Yozilishini javob bilan solishtiring."};
        markPracticeAnswer(word,ok);
        playAnswerCue(ok);
        renderPracticeUpdate(action);
      } else if (action === "spell-next") {
        nextSpellWord();
        renderPracticeUpdate(action);
        document.getElementById("spell-answer-input")?.focus({preventScroll:true});
      } else if (action === "quiz-next") {
        nextQuizWord();
        renderPracticeUpdate(action);
      } else if (action === "open-mastery-quiz") {
        openMasteryQuiz(Number(actionEl.dataset.lesson));
      } else if (action === "mq-pick") {
        if (ui.mqAnswered) return;
        const idx = Number(actionEl.dataset.idx);
        const q = ui.mqQuestions[ui.mqIndex];
        const pickedText = q.options[idx];
        const ok = pickedText === q.correctText;
        ui.mqAnswered = true;
        ui.mqLastOk = ok;
        ui.mqLastPicked = idx;
        if (ok) ui.mqCorrect += 1;
        studyStats.record("mastery",ok ? "correct" : "wrong");
        playAnswerCue(ok);
        renderMasteryModalBody();
      } else if (action === "mq-next") {
        if (ui.mqIndex + 1 < ui.mqQuestions.length) {
          ui.mqIndex += 1;
          ui.mqAnswered = false;
          ui.mqLastPicked = null;
          renderMasteryModalBody();
        } else {
          ui.mqFinished = true;
          const total = ui.mqQuestions.length;
          const pct = Math.round((ui.mqCorrect / total) * 100);
          const meta = computeGradeMeta(pct);
          const lid = ui.mqLessonId;
          if (!state.lessonGrades) state.lessonGrades = {};
          const prevAttempts = state.lessonGrades[lid]?.attempts || 0;
          state.lessonGrades[lid] = {
            score: ui.mqCorrect,
            total,
            pct,
            grade: meta.grade,
            date: getLocalTodayStr(),
            attempts: prevAttempts + 1
          };
          if (meta.passed && !completedLessonSet.has(lid)) {
            state.completedLessons.push(lid);
            studyStats.record("lessons","done","lesson-" + lid);
          }
          if (meta.passed) requestInterfaceCue('complete');
          else playAnswerCue(false);
          recordDailyActivity("exercise", Math.max(1, ui.mqCorrect));
          saveState();
          renderMasteryModalBody();
          render();
        }
      } else if (action === "mq-retry") {
        openMasteryQuiz(ui.mqLessonId);
      } else if (action === "mq-done") {
        closeAllModals();
        showToast("Dars bahosi saqlandi!", "success");
        render();
      } else if (action === "delete-custom-word") {
        const wid = actionEl.dataset.word;
        const w = (state.customWords || []).find(x => x.id === wid);
        if (!w) return;
        openConfirmModal("So'zni o'chirish", `«${fullGermanWord(w)}» so'zini shaxsiy lug'atdan o'chirasizmi?`, () => {
          state.customWords = state.customWords.filter(x => x.id !== wid);
          state.masteredWords = state.masteredWords.filter(id => id !== wid);
          state.favoriteWords = state.favoriteWords.filter(id => id !== wid);
          invalidatePracticeCaches();
          saveState();
          showToast("So'z o'chirildi.", "info");
          render();
        });
      } else if (action === "delete-custom-lesson") {
        const lid = Number(actionEl.dataset.lesson);
        openConfirmModal("Darsni o'chirish", `${lid}-darsni bazadan o'chirasizmi?`, () => {
          state.customLessons = (state.customLessons || []).filter(x => Number(x.id) !== lid);
          state.selectedLessonId = getAllLessons()[getAllLessons().length - 1]?.id || 1;
          invalidatePracticeCaches();
          saveState();
          showToast(`${lid}-dars o'chirildi.`, "info");
          render();
        });
      } else if (action === "open-practice-mode") {
        state.activeTab = "practice";
        ui.practiceMode = actionEl.dataset.mode;
        saveState();
        render();
        scrollToPageTop();
      } else if (action === "game-reset-filters") {
        ui.gameLevel = ui.gameDifficulty = ui.gameSource = "all";
        if (!["builder","srs"].includes(ui.practiceMode)) { ui.fcFilter = ui.fcLevel = ui.fcDifficulty = "all"; resetFlashcards(); }
        reconfigurePractice();
        render();
      } else if (action === "srs-flip" || action === "srs-flip-button") {
        flipPracticeCard('srs');
      } else if (action === "srs-rate") {
        const word = filteredSrs()[0];
        const days = Number(actionEl.dataset.days);
        if (!ui.srsFlipped || word?.id !== actionEl.dataset.wid || !srsRatings.some(rating=>rating[0] === days)) return;
        const previous = state.srsMap?.[word.id];
        const nextInterval = nextSrsInterval(word.id,days);
        (state.srsMap ||= {})[word.id] = {
          interval:nextInterval,
          reps:days === 1 ? 0 : (previous?.reps || 0) + 1,
          nextDate:addDaysStr(todayStr,nextInterval)
        };
        if (days >= 7 && !masteredSet.has(word.id)) state.masteredWords.push(word.id);
        ui.srsFlipped = false;
        ui.srsSessionReviewed++;
        recordDailyActivity("word",1);
        studyStats.record("srs");
        showToast(`Keyingi takrorlash ${nextInterval} kundan keyin.`);
        requestInterfaceCue(days === 1 ? 'retry' : 'learned');
        renderPracticeUpdate(action);
      } else if (action === "srs-reset-due") {
        openConfirmModal("SRS jadvalini tiklash","Barcha takrorlash sanalari o‘chiriladi va so‘zlar bugungi navbatga qaytadi.",() => {
          state.srsMap = {};
          ui.srsFlipped = false;
          ui.srsSessionReviewed = 0;
          ui.fcDeck = [];
          saveState();
          render();
        });
      } else if (action === "sb-pick" || action === "sb-remove") {
        const source = action === "sb-pick" ? "bank" : "sentence";
        const destination = source === "bank" ? "sentence" : "bank";
        moveBuilderToken(actionEl.dataset.token,source,destination,builderTokens(destination).length,action);
      } else if (action === "sb-clear") {
        resetBuilder();
        renderPracticeUpdate(action);
      } else if (action === "sb-hint") {
        const item = activeBuilderItem();
        if (!item || ui.sbFeedback?.ok) return;
        const wrong = ui.sbSelected.findIndex((token,index)=>token.text !== item.tokens[index]);
        const index = wrong < 0 ? ui.sbSelected.length : wrong;
        if (index >= item.tokens.length) return;
        if (wrong >= 0) ui.sbBank.push(...ui.sbSelected.splice(wrong));
        const next = ui.sbBank.findIndex(token=>token.text === item.tokens[index]);
        if (next >= 0) ui.sbSelected.push(...ui.sbBank.splice(next,1));
        ui.sbFeedback = {text:`Ishora · ${index+1}-o‘rinda «${item.tokens[index]}» keladi.`};
        renderPracticeUpdate(action);
      } else if (action === "sb-check") {
        const item = activeBuilderItem();
        if (!item || !ui.sbSelected.length || ui.sbFeedback?.ok) return;
        const wrong = ui.sbSelected.findIndex((token,index)=>token.text !== item.tokens[index]);
        const ok = wrong < 0 && ui.sbSelected.length === item.tokens.length;
        if (!ok && wrong < 0) {
          ui.sbFeedback = {text:"So‘z tartibi to‘g‘ri. Gapni tugating."};
        } else {
          ui.sbStreak = ok ? ui.sbStreak + 1 : 0;
          ui.sbFeedback = {ok,text:ok ? "Gap to‘g‘ri tuzildi." : `${wrong+1}-o‘rindagi so‘zni tekshiring. ${item.rule}.`};
          studyStats.record("builder",ok ? "correct" : "wrong");
          if (ok) recordDailyActivity("exercise",1);
          playAnswerCue(ok);
        }
        renderPracticeUpdate(action);
      } else if (action === "sb-next") {
        ui.sbIndex = (ui.sbIndex + 1) % Math.max(1,builderItems().length);
        resetBuilder();
        renderPracticeUpdate(action);
      } else if (action === "quiz-pick") {
        const question = ui.quizCurrent, picked = actionEl.dataset.wid;
        if (!question || ui.quizFeedback || !ui.quizOptions.some(option=>option.id === picked)) return;
        const ok = picked === question.id;
        ui.quizStreak = ok ? ui.quizStreak + 1 : 0;
        ui.quizFeedback = {ok,picked,text:ok ? "To‘g‘ri javob." : "To‘g‘ri javob ajratib ko‘rsatildi."};
        markPracticeAnswer(question,ok);
        playAnswerCue(ok);
        renderPracticeUpdate(action);
      } else if (action === "export-vocab") {
        const data = JSON.stringify(getAllWords(), null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "nemis_tili_lugat.json";
        a.click();
        URL.revokeObjectURL(url);
        showToast("Lug'at JSON fayl sifatida yuklandi.", "success");
      } else if (action === "next-wotd") {
        const words = getAllWords();
        if (words.length < 2) return;
        const step = 1 + Math.floor(Math.random() * (words.length - 1));
        ui.wotdIndex = (ui.wotdIndex + step) % words.length;
        updateDashboardWord(actionEl.closest('[data-layout-card="word"]'), words[ui.wotdIndex]);
        rememberWorkspace();
      } else if (action === "toggle-block") {
        clearAvatarPrank();
        const bid = actionEl.dataset.block;
        if (state.dailyBlocks.completed.includes(bid)) {
          state.dailyBlocks.completed = state.dailyBlocks.completed.filter(id => id !== bid);
        } else {
          state.dailyBlocks.completed.push(bid);
          if (e.isTrusted) studyStats.record("roadmap","done","block-" + bid);
          requestInterfaceCue('learned');
        }
        saveState();
        render();
      } else if (action === "toggle-practice-filters") {
        ui.practiceFiltersOpen = !ui.practiceFiltersOpen;
        actionEl.setAttribute("aria-expanded",String(ui.practiceFiltersOpen));
      } else if (action === "set-practice-mode") {
        ui.practiceMode = actionEl.dataset.mode;
        render();
      } else if (action === "fc-flip" || action === "fc-flip-button") {
        flipPracticeCard("flashcards");
      } else if (action === "fc-next" || action === "fc-prev") {
        moveFlashcard(action === "fc-next" ? 1 : -1);
      } else if (action === "fc-shuffle") {
        resetFlashcards();
        renderPracticeUpdate(action);
      } else if (action === "fc-rate") {
        rateFlashcard(ui.fcDeck[ui.fcIndex],actionEl.dataset.rating);
      } else if (action === "fc-reset-all") {
        ui.fcFilter = ui.fcLevel = ui.fcDifficulty = "all";
        reconfigurePractice(); resetFlashcards();
        render();
      } else if (action === "art-guess") {
        handleArticleGuess(actionEl.dataset.guess);
      } else if (action === "art-next") {
        ui.artCurrent = pickNextArticleWord();
        ui.artFeedback = null;
        renderPracticeUpdate(action);
      } else if (action === "select-timer-block") {
        const block = STUDY_BLOCKS.find(item => item.id === actionEl.dataset.block);
        if (block && block.id !== ui.timerBlockId) resetFocusTimer(block);
      } else if (action === "timer-duration") {
        if (focusRun || rest || cycleLocked()) return;
        if (!pomodoro) editNormalClock(actionEl);
      } else if (action === "timer-drips") {
        if (!pomodoro) return;
        workspace.tomatoDripsEnabled = workspace.tomatoDripsEnabled === false;
        writeWorkspace();
        syncFocusTimer();
      } else if (action === "timer-break") {
        if (!pomodoro || rest) return;
        breakEnabled = !breakEnabled;
        storeFocusTimer();
        syncFocusTimer();
      } else if (action === "timer-mode") {
        if (focusRun || rest) return;
        if (cycleLocked()) return;
        pomodoro = !pomodoro; cyclesDone = 0; setStarted = false;
        focusRemainingMs = focusSeconds()*1000; ui.timerSecondsLeft = focusSeconds();
        storeFocusTimer(); syncFocusTimer();
        if (pomodoro && !motionPreference.matches && !footerTimer.contains(actionEl)) {
          actionEl.closest('.focus-timer').querySelector('[data-focus-clock]').animate(
            [{opacity:.5},{opacity:1}], {duration:450,easing:'ease-out'}
          );
          actionEl.querySelector('picture')?.animate([
            {transform:'rotate(-9deg) scale(.92)'},
            {transform:'rotate(3deg) scale(1.035)', offset:.58},
            {transform:'rotate(0) scale(1)'}
          ], {duration:460, easing:'ease-out'});
        }


      } else if (action === "timer-toggle") {
        toggleTimer();
      } else if (action === "timer-notifications") {
        enableTimerNotifications();
      } else if (action === "set-lesson-subtab") {
        ui.lessonSubTab = actionEl.dataset.subtab;
        render();
      } else if (action === "set-day-goethe-skill") {
        ui.dayGoetheSkill = actionEl.dataset.skill;
        render({keepScroll:true});
      } else if (action === "set-goethe-subtab") {
        ui.goetheSubTab = actionEl.dataset.subtab;
        render();
      } else if (action === "set-goethe-level") {
        ui.goetheLevel = actionEl.dataset.level;
        render({keepScroll:true});
      } else if (action === "set-goethe-skill") {
        ui.goetheSkill = actionEl.dataset.skill;
        render({keepScroll:true});
      } else if (action === "select-reading-text") {
        ui.selectedTextId = actionEl.dataset.tid;
        ui.showTextTranslation = false;
        render({keepScroll:true});
      } else if (action === "toggle-text-translation") {
        const key = state.activeTab === "lessons" ? "showLessonTranslation" : "showTextTranslation";
        ui[key] = !ui[key];
        render();
      } else if (action === "answer-reading") {
        studyStats.record("reading",actionEl.dataset.correct === "true" ? "correct" : "wrong");
        playAnswerCue(actionEl.dataset.correct === 'true');
        state.readingAnswers[actionEl.dataset.key] = actionEl.dataset.val === "true";
        saveState();
        render();
      } else if (action === "toggle-writing-sample") {
        const tid = actionEl.dataset.tid;
        ui.showWritingSample[tid] = !ui.showWritingSample[tid];
        render();
      } else if (action === "play-listening") {
        const tid = actionEl.dataset.tid;
        ui.listeningPlays[tid] = (ui.listeningPlays[tid] || 0) + 1;
        speakGerman(actionEl.dataset.text, actionEl, true);
        render();
      } else if (action === "toggle-listening-transcript") {
        const tid = actionEl.dataset.tid;
        ui.showListeningTranscript[tid] = !ui.showListeningTranscript[tid];
        render();
      } else if (action === "answer-listening") {
        studyStats.record("listening",actionEl.dataset.correct === "true" ? "correct" : "wrong");
        playAnswerCue(actionEl.dataset.correct === 'true');
        state.listeningAnswers[actionEl.dataset.key] = Number(actionEl.dataset.idx);
        saveState();
        render();
      } else if (action === "speak-timer-toggle") {
        requestInterfaceCue(ui.speakRunning ? 'close' : 'open');
        if (ui.speakRunning) {
          clearInterval(ui.speakInterval);
          ui.speakInterval = null;
          ui.speakRunning = false;
          render();
        } else {
          ui.speakRunning = true;
          render();
          ui.speakInterval = setInterval(() => {
            if (ui.speakSecLeft > 0) {
              ui.speakSecLeft -= 1;
              const el = document.getElementById("speak-timer-display");
              if (el) el.textContent = formatTimer(ui.speakSecLeft);
            } else {
              clearInterval(ui.speakInterval);
              ui.speakInterval = null;
              ui.speakRunning = false;
              requestInterfaceCue('complete');
              if (!document.hidden && document.hasFocus()) studyStats.record("speaking");
              showToast("Gapirish vaqti tugadi!", "success");
              render();
            }
          }, 1000);
        }
      } else if (action === "speak-timer-reset") {
        clearInterval(ui.speakInterval);
        ui.speakInterval = null;
        ui.speakRunning = false;
        ui.speakSecLeft = Number(actionEl.dataset.sec) || 120;
        render();
      } else if (action === "timer-reset") {
        resetFocusTimer(focusBlock(), true);
      }
    });

    function handleArticleGuess(guess) {
      const noun = ui.artCurrent;
      if (!noun || ui.artFeedback) return;
      ui.artTotal++;
      const ok = guess === noun.art;
      if (ok) {
        ui.artCorrect++;
        ui.artStreak++;
        state.articleBestStreak = Math.max(state.articleBestStreak,ui.artStreak);
      } else ui.artStreak = 0;
      ui.artFeedback = {ok,guess,text:ok ? "Artikl to‘g‘ri tanlandi." : `To‘g‘ri artikl — ${noun.art}.`};
      markPracticeAnswer(noun,ok);
      playAnswerCue(ok);
      renderPracticeUpdate("art-guess");
    }

    let searchDebounce = null;
    document.addEventListener("input", (e) => {
      if (e.target.id === "vocab-search-input") {
        const val = e.target.value;
        const pos = e.target.selectionStart;
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(() => {
          ui.vocabSearch = val;
          ui.vocabPage = 1;
          render();
          const inp = document.getElementById("vocab-search-input");
          if (inp) { inp.focus({preventScroll:true}); inp.setSelectionRange(pos, pos); }
        }, 120);
      } else if (e.target.id === "lesson-search-input") {
        const val = e.target.value;
        const pos = e.target.selectionStart;
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(() => {
          ui.lessonSearch = val;
          ui.lessonPage = 1;
          render();
          const inp = document.getElementById("lesson-search-input");
          if (inp) { inp.focus({preventScroll:true}); inp.setSelectionRange(pos, pos); }
        }, 120);
      } else if (e.target.dataset && e.target.dataset.writingId) {
        const wid = e.target.dataset.writingId;
        state.writingDrafts[wid] = e.target.value;
        if (e.isTrusted && e.target.value.trim()) studyStats.record("writing","done",wid);
        saveState();
        const counter = document.getElementById(`wc-${wid}`);
        if (counter) counter.textContent = countWords(e.target.value);
      } else if (e.target.id === "grammar-verb-search") {
        ui.grammarVerbQuery = e.target.value;
        const pos = e.target.selectionStart;
        render();
        const inp = document.getElementById("grammar-verb-search");
        if (inp) { inp.focus({preventScroll:true}); inp.setSelectionRange(pos, pos); }
      } else if (e.target.id === "spell-answer-input") {
        ui.spellInput = e.target.value;
      } else if (e.target.id === "global-search-input") {
        renderGlobalSearch(e.target.value);
      }
    });

    const gameControls = {
      "game-level":"gameLevel", "game-difficulty":"gameDifficulty", "game-source":"gameSource",
      "game-match-size":"matchSize", "game-spell-mode":"spellMode", "game-quiz-direction":"quizDirection"
    };
    document.addEventListener("change", (e) => {
      if (["mobile-lesson-select", "mobile-reading-select"].includes(e.target.id)) {
        const {id, value} = e.target;
        if (id === "mobile-lesson-select") {
          state.selectedLessonId = Number(value);
          ui.lessonPage = Math.floor((e.target.selectedIndex - (e.target.options[0]?.value === '' ? 1 : 0)) / ui.lessonsPerPage) + 1;
          ui.showLessonTranslation = false;
          saveState();
        } else {
          ui.selectedTextId = value;
          ui.showTextTranslation = false;
        }
        render({keepScroll:true});
        document.getElementById(id)?.focus({preventScroll:true});
        return;
      }
      if (e.target.id === "vocab-lesson-select") { ui.vocabLesson = e.target.value; ui.vocabPage = 1; render(); }
      else if (e.target.id === "vocab-type-select") { ui.vocabType = e.target.value; ui.vocabPage = 1; render(); }
      else if (e.target.id === "vocab-status-select") { ui.vocabStatus = e.target.value; ui.vocabPage = 1; render(); }
      else if (e.target.id === "vocab-sort-select") { ui.vocabSort = e.target.value; ui.vocabPage = 1; render(); }
      else if (Object.hasOwn(gameControls,e.target.id)) {
        const key = gameControls[e.target.id];
        ui[key] = e.target.value;
        if (key === "matchSize") initMatchGame();
        else if (key === "spellMode") nextSpellWord();
        else if (key === "quizDirection") nextQuizWord();
        else reconfigurePractice();
        render();
      }
      else if (Object.hasOwn(cardFilters,e.target.id)) {
        const key = cardFilters[e.target.id];
        ui[key] = e.target.value;
        if (key === "fcDirection") ui.fcFlipped = false;
        else { resetFlashcards(); reconfigurePractice(); }
        render();
      }
    });

    // PC Keyboard Shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.defaultPrevented || e.target.closest?.("#speech-captions, #text-menu") || e.shiftKey && e.key.startsWith("Arrow")) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openGlobalSearch();
        return;
      }
      if (e.key === "Escape") {
        closeAllModals();
        return;
      }
      if (getOpenModal()) return;
      // Ignore shortcuts while typing in inputs
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      if (e.key === "?") {
        setModalOpen("shortcuts-modal", true);
      } else if (state.activeTab === "practice" && ui.practiceMode === "flashcards") {
        if (e.code === "Space" && tag !== "button") { e.preventDefault(); flipPracticeCard("flashcards"); }
        else if (e.key === "ArrowRight") { e.preventDefault(); requestInterfaceCue("page"); moveFlashcard(1); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); requestInterfaceCue("page"); moveFlashcard(-1); }
      } else if (state.activeTab === "practice" && ui.practiceMode === "articles") {
        if (["1","2","3"].includes(e.key)) handleArticleGuess(["der","die","das"][Number(e.key)-1]);
      } else if (state.activeTab === "practice" && ui.practiceMode === "quiz") {
        if (["1","2","3","4"].includes(e.key)) document.querySelectorAll('[data-action="quiz-pick"]')[Number(e.key)-1]?.click();
      } else if (state.activeTab === "practice" && ui.practiceMode === "srs" && e.code === "Space" && tag !== "button") {
        e.preventDefault();
        flipPracticeCard("srs");
      } else if (state.activeTab === "lessons") {
        const all = getAllLessons();
        const idx = all.findIndex(l => Number(l.id) === Number(state.selectedLessonId));
        if (e.key === "ArrowRight" && idx < all.length - 1) {
          state.selectedLessonId = all[idx + 1].id;
          requestInterfaceCue('page');
          saveState();
          render();
        } else if (e.key === "ArrowLeft" && idx > 0) {
          state.selectedLessonId = all[idx - 1].id;
          requestInterfaceCue('page');
          saveState();
          render();
        }
      }
    });

    // Header & Modal Button Bindings
    document.getElementById("brand-home-btn").addEventListener("click", () => { state.activeTab = "dashboard"; saveState(); render(); });
    document.getElementById("mobile-menu-btn").addEventListener("click", () => setMobileMenuOpen(document.getElementById("mobile-menu-btn").getAttribute("aria-expanded") !== "true"));
    document.querySelector('.platform-menu-tools').addEventListener('click', event => {
      const action = event.target.closest('[data-header-action]')?.dataset.headerAction;
      if (!action) return;
      if (action === 'shortcuts-btn') setMobileMenuOpen(false);
      document.getElementById(action).click();
    });
    const headerMenuBreakpoint = window.matchMedia('(min-width: 1024px)');
    headerMenuBreakpoint.addEventListener('change', event => {
      if (event.matches) setMobileMenuOpen(false);
    });
    document.addEventListener('pointerdown', event => {
      if (!event.target.closest('#platform-header') && document.getElementById('mobile-menu-btn').ariaExpanded === 'true')
        setMobileMenuOpen(false);
    });
    document.getElementById("open-sync-btn").addEventListener("click", () => openSyncModal("schedule"));
    function openGlobalSearch() {
      setModalOpen("search-modal", true);
      const input = document.getElementById("global-search-input");
      input.value = "";
      renderGlobalSearch("");
      input.focus({preventScroll:true});
    }
    document.getElementById("global-search-btn").addEventListener("click", openGlobalSearch);
    document.getElementById("footer-search").addEventListener("click", openGlobalSearch);
    document.getElementById("footer-shortcuts").addEventListener("click", () => setModalOpen("shortcuts-modal", true));
    document.getElementById("footer-top").addEventListener("click", () => {
      document.getElementById("brand-home-btn").focus({preventScroll:true});
      scrollToPageTop();
    });
    let pendingConfirmCb = null;
    function openConfirmModal(title, text, onConfirm) {
      pendingConfirmCb = onConfirm;
      document.getElementById("confirm-modal-title").textContent = title;
      document.getElementById("confirm-modal-text").textContent = text;
      setModalOpen("confirm-modal", true);
      if (window.lucide) window.lucide.createIcons();
    }
    document.getElementById("confirm-cancel-btn").addEventListener("click", closeAllModals);
    document.getElementById("confirm-ok-btn").addEventListener("click", () => {
      const cb = pendingConfirmCb;
      pendingConfirmCb = null;
      closeAllModals();
      if (cb) cb();
    });
    document.getElementById("confirm-modal").addEventListener("click", (e) => {
      if (e.target.id === "confirm-modal") closeAllModals();
    });

    // Offline / Online Banner
    function syncOnlineStatus() {
      const banner = document.getElementById("offline-banner");
      if (banner) banner.classList.toggle("hidden", navigator.onLine !== false);
    }
    window.addEventListener("online", () => { syncOnlineStatus(); showToast("Internet aloqasi tiklandi!", "success"); });
    window.addEventListener("offline", () => { syncOnlineStatus(); showToast("Oflayn rejim: barcha o'zgarishlar lokal saqlanadi.", "warn"); });
    syncOnlineStatus();

    // Midnight rollover watcher (local UTC+5 date)
    setInterval(() => {
      const nowLocal = getLocalTodayStr();
      if (nowLocal !== todayStr) {
        todayStr = nowLocal;
        state.dailyBlocks = { date: todayStr, completed: [] };
        saveState();
        render();
      }
    }, 60000);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target && e.target.id) {
        if (e.target.id.startsWith("input-")) {
          const exId = e.target.id.replace("input-", "");
          const btn = document.querySelector(`[data-action="check-input"][data-ex="${exId}"]`);
          if (btn) btn.click();
        } else if (e.target.id === "spell-answer-input") {
          e.preventDefault();
          const btn = document.querySelector(ui.spellFeedback ? '[data-action="spell-next"]' : '[data-action="spell-check"]');
          if (btn) btn.click();
        }
      }
    });
    themeToggle.addEventListener("click", () => {
      state.themeMode = themeModes[(themeModes.indexOf(state.themeMode) + 1) % themeModes.length];
      applyTheme();
      saveState();
      showToast(`Rang rejimi — ${themeLabels[state.themeMode]}`, "info");
    });
    document.getElementById("shortcuts-btn").addEventListener("click", () => setModalOpen("shortcuts-modal", true));

    document.getElementById("close-modal-btn").addEventListener("click", closeAllModals);
    document.getElementById("cancel-modal-btn").addEventListener("click", closeAllModals);
    document.getElementById("close-sync-modal-btn").addEventListener("click", closeAllModals);
    document.getElementById("close-shortcuts-btn").addEventListener("click", closeAllModals);
    document.getElementById("close-mastery-modal-btn").addEventListener("click", closeAllModals);
    document.getElementById("mastery-quiz-modal").addEventListener("click", (e) => {
      if (e.target.id === "mastery-quiz-modal") closeAllModals();
    });

    ["add-word-modal", "sync-modal", "search-modal", "shortcuts-modal"].forEach(id => {
      document.getElementById(id).addEventListener("click", (e) => {
        if (e.target.id === id) closeAllModals();
      });
    });

    // Add Single Word Form
    document.getElementById("add-word-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const art = document.getElementById("cw-article").value;
      const de = document.getElementById("cw-de").value.trim();
      const plural = document.getElementById("cw-plural").value.trim();
      const pron = document.getElementById("cw-pron").value.trim() || de.toLowerCase();
      const uz = document.getElementById("cw-uz").value.trim();
      if (!de || !uz) return;
      const dup = getAllWords().find(w => w.de.toLowerCase() === de.toLowerCase());
      if (dup) {
        showToast(`«${fullGermanWord(dup)}» allaqachon mavjud (${dup.lessonId ? dup.lessonId + '-dars' : 'Shaxsiy'})!`, "warn");
        return;
      }
      const newWord = { id: "cw_" + Date.now(), art, de, plural, pron, uz, lessonId: null, level: "Shaxsiy" };
      state.customWords.unshift(newWord);
      invalidatePracticeCaches();
      saveState();
      e.target.reset();
      closeAllModals();
      showToast(`«${fullGermanWord(newWord)}» lug'atga qo'shildi!`, "success");
      render();
    });

    // Schedule Lesson Import Handler
    document.getElementById("load-sample-json-btn").addEventListener("click", () => {
      const nextId = Number(getAllLessons().at(-1).id) + 1;
      const sample = {
        id: nextId,
        level: "A1.2",
        title: "war va hatte",
        summary: "Sein va haben fe’llarining Präteritum shakllari.",
        grammarPoints: ["Sein fe’lining ich shakli war, haben fe’liniki hatte."],
        commonMistakes: [{wrong:"Wir war zu Hause.",correct:"Wir waren zu Hause.",note:"Wir bilan waren ishlatiladi."}],
        examples: [{de:"Ich war im Büro.",uz:"Men ofisda edim."}],
        exercises: [
          {type:"choice",prompt:"Ich _____ gestern im Büro.",options:["war","waren"],answers:["war"]},
          "Kecha uyda edim. (Nemischaga tarjima qiling)"
        ],
        words: [{de:"das Büro",plural:"die Büros",pron:"das byuro",uz:"ofis",meaningDe:"Ein Raum, in dem man arbeitet.",difficulty:"oson"}],
        video: {
          title:"HABEN und SEIN im PRÄTERITUM",
          channel:"YourGermanTeacher",
          url:"https://www.youtube.com/watch?v=g0Zo17VXDAA",
          description:"War va hatte shakllarining ishlatilishi."
        }
      };
      document.getElementById("schedule-paste-input").value = JSON.stringify(sample, null, 2);
    });

    document.getElementById("import-schedule-lesson-btn").addEventListener("click", () => {
      const raw = document.getElementById("schedule-paste-input").value;
      try {
        const importedLessons = parseScheduleLessonText(raw);
        const lessons = new Map(state.customLessons.map(lesson => [Number(lesson.id),lesson]));
        for (const lesson of importedLessons) lessons.set(lesson.id,lesson);
        state.customLessons = [...lessons.values()];
        const addedWords = importedLessons.reduce((count,lesson) => count + lesson.words.length,0);
        invalidatePracticeCaches();
        state.selectedLessonId = importedLessons.at(-1).id;
        state.activeTab = "lessons";
        ui.lessonSubTab = "grammar";
        ui.showLessonTranslation = false;
        saveState();
        document.getElementById("schedule-paste-input").value = "";
        closeAllModals();
        showToast(`${importedLessons.length} ta dars va ${addedWords} ta so'z muvaffaqiyatli qo'shildi!`, "success");
        render();
      } catch (err) {
        showToast(err instanceof SyntaxError ? "JSON formatini tekshiring." :
          err.message || "Dars matnini o‘qib bo‘lmadi.", "error");
      }
    });

    // Bulk Words Import (CSV or JSON — supports 3,000+ words cleanly)
    document.getElementById("import-bulk-words-btn").addEventListener("click", () => {
      const raw = document.getElementById("bulk-words-input").value.trim();
      if (!raw) return;
      if (/^(?:\x60{3}(?:json)?\s*)?\{/i.test(raw)) {
        showToast("Dars JSON faylini «Jadval darsi» bo‘limidan kiriting.", "warn");
        return;
      }
      try {
        let newWords = [];
        if (raw.startsWith("[")) {
          const arr = JSON.parse(raw);
          newWords = arr.map((w, i) => ({
            id: w.id || `bw_${Date.now()}_${i}`,
            art: ["der", "die", "das", "verb", "other"].includes(w.art) ? w.art : "other",
            de: String(w.de || "").trim(),
            plural: String(w.plural || "").trim(),
            pron: String(w.pron || w.de || "").trim(),
            uz: String(w.uz || "").trim(),
            lessonId: w.lessonId || null,
            level: w.level || "Import",
            ...wordLearningFields(w)
          })).filter(w => w.de && w.uz);
        } else {
          const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
          lines.forEach((line, i) => {
            const sep = line.includes(";") ? ";" : ",";
            const cols = line.split(sep).map(c => c.trim());
            if (cols.length >= 2) {
              const hasArt = ["der", "die", "das", "verb", "other"].includes(cols[0].toLowerCase());
              if (hasArt && cols.length >= 3) {
                newWords.push({
                  id: `bw_${Date.now()}_${i}`,
                  art: cols[0].toLowerCase(),
                  de: cols[1],
                  plural: cols.length >= 5 ? cols[2] : "",
                  pron: cols.length >= 5 ? cols[3] : (cols.length === 4 ? cols[2] : cols[1].toLowerCase()),
                  uz: cols[cols.length - 1],
                  lessonId: null,
                  level: "Import"
                });
              } else {
                newWords.push({
                  id: `bw_${Date.now()}_${i}`,
                  art: "other",
                  de: cols[0],
                  plural: "",
                  pron: cols[0].toLowerCase(),
                  uz: cols[1],
                  lessonId: null,
                  level: "Import"
                });
              }
            }
          });
        }
        if (!newWords.length) {
          showToast("Yaroqli so'zlar topilmadi.", "warn");
          return;
        }
        state.customWords = [...newWords, ...state.customWords];
        invalidatePracticeCaches();
        saveState();
        document.getElementById("bulk-words-input").value = "";
        closeAllModals();
        showToast(`${newWords.length} ta yangi so'z bazaga qo'shildi!`, "success");
        render();
      } catch (e) {
        showToast("Importda xatolik: CSV yoki JSON formatini tekshiring.", "error");
      }
    });

    document.getElementById("restore-lesson13-import-btn").addEventListener("click", async (event) => {
      const archive = state.lesson13ImportRecovery;
      if (!archive?.entries?.length) return;
      const button = event.currentTarget;
      button.disabled = true;
      if (saveTimer) clearTimeout(saveTimer);
      const customWords = [...state.customWords];
      for (const { index, word } of archive.entries) {
        customWords.splice(index, 0, word);
      }
      const nextState = {
        ...state,
        customWords,
        masteredWords: [...new Set([...state.masteredWords, ...archive.masteredWords])],
        favoriteWords: [...new Set([...state.favoriteWords, ...archive.favoriteWords])],
        srsMap: { ...archive.srsMap, ...state.srsMap },
        lesson13ImportRecovery: { restored: true }
      };
      if (await persistImportRecovery(nextState)) {
        state = nextState;
        profileSync.update("state",state);
        rebuildFastSets();
        invalidatePracticeCaches();
        updateSyncModalTabs();
        render();
        showToast("Xato import yozuvlari tiklandi.", "info");
      } else {
        showToast("Tiklashni saqlab bo‘lmadi.", "warn");
      }
      button.disabled = false;
    });

    const backupFormat = 'deutsch-b1-profile';
    const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
    let replacingProfile = false;
    async function backupDigest({version,format,exportedAt,profile}) {
      const bytes = new TextEncoder().encode(JSON.stringify([version,format,exportedAt,profile]));
      return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)), n=>n.toString(16).padStart(2,'0')).join('');
    }
    async function checkpointProfile() {
      studyStats.tick(); capturePlace(); rememberWorkspace(); saveAvatarPosition(); moviePlayer.checkpoint();
      const at = Date.now(), media = document.querySelector('#movie-view')?.dataset.mode || null;
      const profile = await profileSync.snapshot(currentProfile());
      profile.workspace.backupResume = {at,media};
      return {version:5,format:backupFormat,exportedAt:new Date(at).toISOString(),profile};
    }
    for (const id of ['download-backup-btn','download-project-backup-btn']) {
      document.getElementById(id).addEventListener('click',async ({currentTarget:button}) => {
        button.disabled = true;
        try {
          const full = id === 'download-project-backup-btn';
          if (full && (!profileSync.available || !(await fetch('/api/project-backup',{method:'HEAD'})).ok)) {
            throw Error('To‘liq arxiv uchun loyiha papkasida ./start.sh --backup buyrug‘ini ishga tushiring.');
          }
          const backup = await checkpointProfile();
          if (full) {
            const frame = document.createElement('iframe'), form = document.createElement('form');
            frame.name = 'project-backup-' + Date.now(); frame.hidden = form.hidden = true;
            form.target = frame.name; form.method = 'POST'; form.action = '/api/project-backup';
            const input = document.createElement('input'); input.name = 'profile'; input.type = 'hidden'; input.value = JSON.stringify(backup.profile);
            form.append(input); document.body.append(frame,form); form.submit(); form.remove();
          } else {
            backup.sha256 = await backupDigest(backup);
            const url = URL.createObjectURL(new Blob([JSON.stringify(backup)],{type:'application/json'}));
            const link = document.createElement('a'); link.href = url; link.download = 'Deutsch-B1-' + backup.exportedAt.replace(/[:.]/g,'-') + '.json'; link.click();
            setTimeout(()=>URL.revokeObjectURL(url),30000);
          }
          showToast('Zaxira nusxasini yuklash boshlandi.','success');
        } catch (err) { showToast(err.message || 'Zaxirani yaratib bo‘lmadi.','error'); }
        finally { button.disabled = false; }
      });
    }
    async function readBackup(file) {
      const data = JSON.parse(await file.text(),(key,value)=>{
        if (['__proto__','prototype','constructor'].includes(key)) throw Error('Zaxirada nomaqbul kalit bor.');
        return value;
      });
      if (!record(data) || (data.version !== undefined && (!Number.isInteger(data.version) || data.version < 1 || data.version > 5))) throw Error('Zaxira formati tanilmadi.');
      const modern = data.version === 5, p = modern ? data.profile : data;
      if (modern && (data.format !== backupFormat || !record(p) || !record(p.state) || !record(p.workspace?.positions) || !record(p.movie) || !record(p.subtitles) || !['flow','line','word'].includes(p.captions) || data.sha256 !== await backupDigest(data))) throw Error('Zaxira chala yoki o‘zgargan. Profilga o‘zgarish kiritilmadi.');
      const raw = p.state ?? p, state = validateBackupState(raw);
      if (!state) throw Error('Zaxiradagi profil tuzilmasi noto‘g‘ri.');
      const workspace = record(p.workspace?.positions) ? p.workspace : {positions:{},ui:{},activeTab:state.activeTab,selectedLessonId:state.selectedLessonId};
      const at = Date.parse(data.exportedAt);
      if (!modern && Number.isFinite(at)) workspace.backupResume = {at,media:null};
      return {state:modern ? raw : {...raw,...state},workspace,movie:record(p.movie) ? p.movie : {},captions:['flow','line','word'].includes(p.captions) ? p.captions : 'flow',subtitles:record(p.subtitles) ? p.subtitles : {}};
    }
    document.getElementById('restore-backup-input').addEventListener('change',async ({target:input})=>{
      const file = input.files?.[0]; if (!file) return;
      input.disabled = true;
      try {
        const profile = await readBackup(file);
        if (!confirm('Joriy profil «' + file.name + '» nusxasidagi holatga almashtirilsinmi?')) return;
        const restored = profileSync.available ? await profileSync.importProfile(profile) : profile;
        replacingProfile = true;
        clearTimeout(focusTick); clearTimeout(saveTimer); clearTimeout(workspaceTimer);
        window.removeEventListener('beforeunload',confirmTimerExit);
        sessionStorage.removeItem(focusTimerKey); sessionStorage.removeItem(avatarRouteKey);
        applySharedProfile(restored);
        const results = await Promise.all([persistBrowserValue('app_state',state),persistBrowserValue('movie_subtitles',restored.subtitles),persistBrowserValue('shared_profile_journal',{baseline:restored})]);
        if (!profileSync.available && (!results.every(Boolean) || localStorage.getItem(workspaceKey) !== JSON.stringify(workspace))) throw Error('Brauzer xotirasida joy yetarli emas. Loyihani start.sh orqali ochib tiklang.');
        location.reload();
      } catch (err) { replacingProfile = false; showToast(err instanceof SyntaxError ? 'Fayl to‘g‘ri JSON emas.' : err.message,'error'); }
      finally { input.disabled = false; input.value = ''; }
    });

    // Avatar assets reuse selected LPC PNGs from the supplied character export.
    const avatarFrames = {
  "hurt:up": [
    "assets/avatar/standard/hurt/up/1.png",
    "assets/avatar/standard/hurt/up/2.png",
    "assets/avatar/standard/hurt/up/3.png",
    "assets/avatar/standard/hurt/up/4.png",
    "assets/avatar/standard/hurt/up/5.png",
    "assets/avatar/standard/hurt/up/6.png"
  ],
  "idle:down": [
    "assets/avatar/standard/idle/down/1.png",
    "assets/avatar/standard/idle/down/2.png"
  ],
  "walk:left": [
    "assets/avatar/standard/walk/left/1.png",
    "assets/avatar/standard/walk/left/2.png",
    "assets/avatar/standard/walk/left/3.png",
    "assets/avatar/standard/walk/left/4.png",
    "assets/avatar/standard/walk/left/5.png",
    "assets/avatar/standard/walk/left/6.png",
    "assets/avatar/standard/walk/left/7.png",
    "assets/avatar/standard/walk/left/8.png",
    "assets/avatar/standard/walk/left/9.png"
  ],
  "walk:right": [
    "assets/avatar/standard/walk/right/1.png",
    "assets/avatar/standard/walk/right/2.png",
    "assets/avatar/standard/walk/right/3.png",
    "assets/avatar/standard/walk/right/4.png",
    "assets/avatar/standard/walk/right/5.png",
    "assets/avatar/standard/walk/right/6.png",
    "assets/avatar/standard/walk/right/7.png",
    "assets/avatar/standard/walk/right/8.png",
    "assets/avatar/standard/walk/right/9.png"
  ],
  "run:left": [
    "assets/avatar/standard/run/left/1.png",
    "assets/avatar/standard/run/left/2.png",
    "assets/avatar/standard/run/left/3.png",
    "assets/avatar/standard/run/left/4.png",
    "assets/avatar/standard/run/left/5.png",
    "assets/avatar/standard/run/left/6.png",
    "assets/avatar/standard/run/left/7.png",
    "assets/avatar/standard/run/left/8.png"
  ],
  "run:right": [
    "assets/avatar/standard/run/right/1.png",
    "assets/avatar/standard/run/right/2.png",
    "assets/avatar/standard/run/right/3.png",
    "assets/avatar/standard/run/right/4.png",
    "assets/avatar/standard/run/right/5.png",
    "assets/avatar/standard/run/right/6.png",
    "assets/avatar/standard/run/right/7.png",
    "assets/avatar/standard/run/right/8.png"
  ],
  "jump:left": [
    "assets/avatar/standard/jump/left/1.png",
    "assets/avatar/standard/jump/left/2.png",
    "assets/avatar/standard/jump/left/3.png",
    "assets/avatar/standard/jump/left/4.png",
    "assets/avatar/standard/jump/left/5.png"
  ],
  "jump:right": [
    "assets/avatar/standard/jump/right/1.png",
    "assets/avatar/standard/jump/right/2.png",
    "assets/avatar/standard/jump/right/3.png",
    "assets/avatar/standard/jump/right/4.png",
    "assets/avatar/standard/jump/right/5.png"
  ],
  "climb:up": [
    "assets/avatar/standard/climb/up/1.png",
    "assets/avatar/standard/climb/up/2.png",
    "assets/avatar/standard/climb/up/3.png",
    "assets/avatar/standard/climb/up/4.png",
    "assets/avatar/standard/climb/up/5.png",
    "assets/avatar/standard/climb/up/6.png"
  ],
  "emote:down": [
    "assets/avatar/standard/emote/down/1.png",
    "assets/avatar/standard/emote/down/2.png",
    "assets/avatar/standard/emote/down/3.png"
  ]
};
    const avatarRoot = document.getElementById('study-avatar');
    const avatarWorld = document.getElementById('avatar-world');
    const avatarSprite = document.getElementById('parkour-avatar');
    const avatarLanding = document.getElementById('avatar-landing');
    const avatarDock = document.getElementById('study-avatar-toggle');
    const avatarSoundToggle = document.getElementById('avatar-sound-toggle');
    const avatarPanel = document.getElementById('study-avatar-panel');
    const avatarReminder = document.getElementById('avatar-reminder');
    const avatarParkour = document.getElementById('avatar-parkour');
    const avatarWalkToggle = document.getElementById('avatar-walk-toggle');
    const avatarReminderToggle = document.getElementById('avatar-reminder-toggle');
    const avatarReminderTime = document.getElementById('avatar-reminder-time');
    const avatarClock = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tashkent', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    });
    const avatar = {
      recovery: null, untilSlip: 3 + Math.floor(Math.random() * 3),
      ready: false, plan: 0, hops: 0, combo: 0, sameRowHops: 0, zone: 'body', scale: 1,
      lastActivity: -Infinity, lastTabChange: -Infinity, lastScrollAt: -Infinity,
      lastScrollX: window.scrollX, lastScrollY: window.scrollY, scrollDistance: 0
    };

    function avatarSettings(raw = {}) {
      return {
        walk: raw?.walk !== false,
        pranks: raw?.pranks === true,
        sound: raw?.sound !== false,
        reminders: raw?.reminders !== false,
        time: /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(raw?.time) ? raw.time : '09:00',
        remindedOn: /^\d{4}-\d{2}-\d{2}$/.test(raw?.remindedOn) ? raw.remindedOn : ''
      };
    }

    function avatarClockParts(now) {
      const parts = Object.fromEntries(avatarClock.formatToParts(now).map(part => [part.type, part.value]));
      return { day: parts.year + '-' + parts.month + '-' + parts.day, time: parts.hour + ':' + parts.minute };
    }

    function avatarStudyTip() {
      const remaining = STUDY_BLOCKS.length - avatar.plan;
      if (!remaining) return 'Bugungi reja bajarildi! Xohlasangiz, fleshkartalar bilan qisqa takrorlash qiling.';
      if (!(state.activityLog?.[todayStr]?.words)) return 'Boshlash uchun 5 ta yangi so‘zni artikli bilan takrorlab ko‘ring.';
      return remaining + ' ta mashg‘ulot bloki qoldi. Rejada keyingi blokni tanlang.';
    }

    function dismissAvatarReminder() {
      avatarReminder.hidden = true;
      delete avatarDock.dataset.reminder;
    }

    function avatarObscured() {
      return document.hidden || !!getOpenModal() || !!activeSpeechSession;
    }

    function checkAvatarReminder(now = new Date()) {
      if (!avatar.ready || !state.studyAvatar.reminders || !avatarPanel.hidden || avatarObscured() || avatar.plan >= STUDY_BLOCKS.length) return;
      const { day, time } = avatarClockParts(now);
      if (state.studyAvatar.remindedOn === day || time < state.studyAvatar.time) return;
      state.studyAvatar.remindedOn = day;
      saveState();
      avatarReminder.hidden = false;
      document.getElementById('avatar-reminder-copy').textContent = avatarStudyTip();
      avatarDock.dataset.reminder = '';
      requestInterfaceCue('avatarReminder');
    }

    function drawAvatarFrame(action, index = 0) {
      const frames = avatarFrames[action];
      const src = frames[index % frames.length];
      if (avatar.frame !== src) {
        avatarSprite.src = src;
        avatar.frame = src;
      }
      avatarSprite.dataset.pose = action.split(':')[0];
    }

    const AVATAR_QUIET_MS = 3600;
    const avatarHeader = document.querySelector('header');
    const avatarHeaderRow = avatarHeader.querySelector('.platform-header-row');

    function measureAvatarHeader() {
      const bottom = avatarHeaderRow.getBoundingClientRect().bottom;
      avatar.headerY = bottom + 15;
      avatarWorld.style.setProperty('--avatar-header-edge', Math.max(0, bottom) + 'px');
    }

    // Cards use document coordinates. The header uses viewport coordinates, so
    // scrolling moves the landings with their cards without restarting a jump.
    function avatarBodyPoint(x, y) {
      return { x: x + window.scrollX, y: y + window.scrollY, space: 'body' };
    }

    function avatarOnScreen(point) {
      if (point.space === 'body') return { x: point.x - window.scrollX, y: point.y - window.scrollY };
      if (point.space === 'header') return { x: point.x, y: avatar.headerY };
      return point;
    }

    function paintAvatar() {
      if (!avatar.position || avatarWorld.hidden) return;
      const { x, y } = avatarOnScreen(avatar.position);
      const tuck = avatar.tuck || 0;
      const size = (avatar.scale || 1) * (1 - tuck * .29);
      const spin = avatar.angle || 0;
      const pivot = avatar.trick === 'roll' || (spin && avatar.trick !== 'skate') ? 40 : 68.6;
      const foot = avatar.trick === 'roll' ? pivot + (23 + 5 * (1 - tuck)) * size : 68.6;
      avatarSprite.style.transformOrigin = '50% ' + pivot + 'px';
      avatarSprite.style.transform = 'translate3d(' + (x - 36) + 'px,' + (y - foot) + 'px,0) scale(' + size + ') rotate(' + spin + 'deg)';
      if (prank.bubbleWidth) {
        const left = Math.max(5, Math.min(innerWidth - prank.bubbleWidth - 5, x - prank.bubbleWidth / 2));
        recoveryMood.style.transform = `translate3d(${left}px,${Math.max(avatar.headerY - 10, y - 74)}px,0)`;
      }
      if (avatar.landing) {
        const next = avatarOnScreen(avatar.landing);
        avatarLanding.style.transform = 'translate3d(' + (next.x - 13) + 'px,' + (next.y + 1) + 'px,0)';
      }
    }

    window.parkourFeet = () => avatar.position && !avatarWorld.hidden && !document.fullscreenElement
      ? {...avatarOnScreen(avatar.position), size:avatar.scale || 1, moving:avatar.moving || !!avatar.recovery}
      : null;

    const avatarCardSelector = 'section.rounded-2xl, .motion-card, div.rounded-2xl.border, article.rounded-2xl, div.rounded-3xl.border, [data-action="fc-flip"], [data-action="srs-flip"]';

    function getAvatarPlatforms() {
      const root = document.getElementById('app-root');
      const floor = window.innerHeight - 20;
      const ceiling = avatar.headerY + 36;
      const platforms = [];
      for (const card of root.querySelectorAll(avatarCardSelector)) {
        const rect = card.getBoundingClientRect();
        if (rect.height < 55 || rect.width < 100 || rect.top < ceiling || rect.top > floor || card.closest('[hidden], [inert], .motion-pending')) continue;
        const left = Math.max(20, rect.left + 20);
        const right = Math.min(window.innerWidth - 20, rect.right - 20);
        if (right - left < 30 || platforms.some(p => Math.abs(p.y - rect.top) < 10 && Math.abs(p.left - left) < 12)) continue;
        platforms.push({ card, left, right, y: rect.top });
        if (platforms.length === 20) break;
      }
      return platforms;
    }

    function cancelAvatarMotion() {
      clearTimeout(avatar.travelTimer);
      cancelAnimationFrame(avatar.frameId);
      avatar.travelTimer = avatar.frameId = undefined;
      avatar.moving = false;
      avatar.angle = avatar.tuck = 0;
      avatar.trick = null;
      avatar.landing = null;
      avatarWorld.removeAttribute('data-moving');
    }

    function stopAvatarRoute() {
      clearAvatarPrank();
      cancelAvatarMotion();
      clearTimeout(avatar.quietTimer);
      avatarWorld.hidden = true;
    }

    function allowAvatarRoute() {
      if (!avatar.ready || motionPreference.matches || avatarObscured() || !avatarPanel.hidden) return false;
      if (!state.studyAvatar.walk && !state.studyAvatar.pranks && avatar.hops === 0) return false;
      return !document.activeElement?.matches('textarea, input[type="text"], input[type="search"]');
    }

    function setAvatarZone(zone) {
      avatar.zone = zone;
      avatarWorld.dataset.zone = zone;
    }

    function scheduleAvatarMove(next, delay) {
      clearTimeout(avatar.travelTimer);
      avatar.travelTimer = setTimeout(() => {
        avatar.travelTimer = undefined;
        if (allowAvatarRoute()) next();
      }, delay);
    }

    function queueAvatarRoute(delay) {
      if (!allowAvatarRoute()) { stopAvatarRoute(); return; }
      if (prank.active || avatar.moving || avatar.travelTimer !== undefined) return;
      scheduleAvatarMove(() => {
        if (avatar.recovery) resumeAvatarRecovery();
        else if (avatar.zone === 'header' || avatar.zone === 'to-header') enterAvatarHeader();
        else if (avatar.zone === 'to-body') returnAvatarToBody();
        else runAvatarHop();
      }, delay);
    }

    const AVATAR_GRAVITY = 1850; // CSS px per second squared

    // The fall uses the viewport floor. The ascent binds to live card edges.
    const recoveryPhases = ['edge', 'fall', 'rise', 'angry', 'climb'];
    const avatarRouteKey = 'lernbuddy-route-v1:' + location.pathname;
    const recoveryMood = document.getElementById('avatar-mood');
    const clampUnit = value => Math.max(0, Math.min(1, value));
    function avatarPause() { return 450 + Math.random() * 650; }

    function saveAvatarPosition() {
      if (!avatar.ready || !avatar.position) return;
      const point = avatarOnScreen(avatar.position);
      const saved = {
        x: clampUnit(point.x / innerWidth), y: clampUnit(point.y / innerHeight),
        zone: avatar.zone, combo: avatar.combo, hops: avatar.hops,
        untilSlip: avatar.untilSlip, recovery: avatar.recovery
      };
      workspace.avatarRoute = saved;
      writeWorkspace();
    }

    function restoreAvatarPosition() {
      let saved = workspace.avatarRoute;
      if (saved === undefined) {
        try { saved = JSON.parse(sessionStorage.getItem(avatarRouteKey)); } catch {}
      }
      const fraction = n => Number.isFinite(n) && n >= 0 && n <= 1;
      if (!saved || !fraction(saved.x) || !fraction(saved.y)) return;
      avatar.combo = Number.isSafeInteger(saved.combo) ? saved.combo : 0;
      avatar.hops = Number.isInteger(saved.hops) ? Math.max(0, Math.min(5, saved.hops)) : 0;
      if (Number.isInteger(saved.untilSlip)) avatar.untilSlip = Math.max(1, Math.min(7, saved.untilSlip));
      avatar.position = { x: saved.x * innerWidth, y: saved.y * innerHeight, space: 'screen' };
      const r = saved.recovery;
      if (r && recoveryPhases.includes(r.phase) && [r.startX, r.edge, r.floorX, r.startY, r.progress].every(fraction)) {
        avatar.recovery = r;
        setAvatarZone('recovery');
      } else if (saved.zone === 'header') {
        avatar.position.space = 'header';
        avatar.scale = .58;
        setAvatarZone('header');
      } else setAvatarZone('to-body');
      if (workspace.avatarRoute === undefined) saveAvatarPosition();
    }

    const avatarFooter = document.querySelector("body > footer");
    function startAvatarSlip(card) {
      if (!card?.isConnected) return false;
      const rect = card.getBoundingClientRect();
      const from = avatarOnScreen(avatar.position);
      const floor = avatarFooter.getBoundingClientRect().top;
      if (Math.abs(from.y - rect.top) > 12 || from.y < avatar.headerY || floor - from.y < 90) return false;
      // Choose an actual visible card edge. A small overshoot breaks foot contact.
      const edges = [rect.left - 4, rect.right + 4].filter(x => x >= 8 && x <= innerWidth - 8);
      if (!edges.length) return false;
      const edge = edges.sort((a, b) => Math.abs(from.x - a) - Math.abs(from.x - b))[0];
      const dir = edge < from.x ? -1 : 1;
      const drift = Math.sqrt(2 * (floor - from.y) / AVATAR_GRAVITY) * 95;
      const floorX = Math.max(21, Math.min(innerWidth - 21, edge + dir * drift));
      avatar.recovery = { phase: 'edge', progress: 0, startX: clampUnit(from.x / innerWidth),
        edge: edge / innerWidth, launchY: from.y + scrollY, startY: clampUnit(from.y / innerHeight), floorX: floorX / innerWidth };
      avatar.untilSlip = 4 + Math.floor(Math.random() * 4);
      setAvatarZone('recovery');
      saveAvatarPosition();
      resumeAvatarRecovery();
      return true;
    }

    function resumeCardAscent(r) {
      avatarWorld.dataset.recovery = 'climb';
      const selector = avatarCardSelector + ', div.rounded-xl.border';
      const root = document.getElementById('app-root');
      let card;
      let previous = performance.now();
      let nextCue = previous + 200;

      function edges(rect) {
        return { top: Math.max(avatar.headerY, rect.top), bottom: rect.bottom };
      }

      function plan(from) {
        const cards = root.querySelectorAll(selector);
        let best = Infinity;
        let index = -1;
        let side = 1;
        cards.forEach((el, i) => {
          const rect = el.getBoundingClientRect();
          const { top, bottom } = edges(rect);
          if (rect.width < 88 || rect.height < 50 || bottom - top < 26 || top >= from.y - 22 || el.closest('[inert], [hidden], .motion-pending')) return;
          for (const dir of [1, -1]) {
            const x = dir === 1 ? rect.left : rect.right;
            if (x < 4 || x > innerWidth - 4) continue;
            const grip = Math.min(from.y - 14, bottom - 8);
            const touch = document.elementFromPoint(x + dir * 5, Math.max(top + 9, grip - 5));
            if (Math.max(top + 9, grip - 5) < innerHeight && !el.contains(touch)) continue;
            const cost = Math.abs(x - from.x) + Math.max(0, from.y - bottom) * 1.4 + (from.y - top) * .44;
            if (cost < best) { best = cost; index = i; side = dir; }
          }
        });
        card = cards[index] || null;
        const rect = card?.getBoundingClientRect();
        const wall = rect ? (side === 1 ? rect.left : rect.right) : from.x;
        // Walk along the floor or the current ledge before leaping for the next hold.
        let takeoff = from.x;
        const onFooter = Math.abs(from.y - avatarFooter.getBoundingClientRect().top) <= 4;
        if (onFooter) takeoff = wall;
        else if (avatar.platform?.isConnected) {
          const base = avatar.platform.getBoundingClientRect();
          if (Math.abs(base.top - from.y) < 4) takeoff = Math.max(base.left + 9, Math.min(base.right - 9, wall));
        }
        const grip = rect ? Math.max(edges(rect).top + 10, Math.min(from.y - 14, edges(rect).bottom - 8)) : avatar.headerY;
        r.leg = {
          view: avatar.view, index, side, step: Math.abs(takeoff - from.x) > 12 ? 'walk' : 'jump',
          x: from.x / innerWidth, y: from.y / innerHeight, takeoff: takeoff / innerWidth,
          grip: rect ? clampUnit((grip - rect.top) / rect.height) : 0,
          floor: onFooter, scroll: scrollY, duration: 0
        };
        r.progress = 0;
        if (r.leg.step === 'jump') requestInterfaceCue('avatarJump');
      }

      if (r.leg && r.leg.view === avatar.view && ['walk', 'jump', 'wall', 'ledge'].includes(r.leg.step)
          && [r.leg.x, r.leg.y, r.leg.takeoff, r.leg.grip, r.leg.duration, r.leg.scroll].every(Number.isFinite)) {
        card = root.querySelectorAll(selector)[r.leg.index];
      } else r.leg = null;

      function finish() {
        avatar.recovery = null;
        avatar.platform = null;
        delete avatarWorld.dataset.recovery;
        avatar.position = { x: avatar.position.x, y: 0, space: 'header' };
        avatar.scale = .58;
        avatar.moving = false;
        avatar.frameId = undefined;
        setAvatarZone('header');
        saveAvatarPosition();
        walkAvatarHeader();
        scheduleAvatarReturn(650);
      }

      function tick(now) {
        if (!allowAvatarRoute()) { stopAvatarRoute(); return; }
        const dt = Math.max(0, Math.min(64, now - previous));
        previous = now;
        let rect = card?.isConnected ? card.getBoundingClientRect() : null;
        if (!r.leg || r.leg.view !== avatar.view || (r.leg.index >= 0 &&
            (!rect || rect.bottom <= avatar.headerY + 12 || 
             (r.leg.side === 1 ? rect.left : rect.right) < 0 || (r.leg.side === 1 ? rect.left : rect.right) > innerWidth))) {
          const from = avatarOnScreen(avatar.position);
          plan({x: Math.max(8, Math.min(innerWidth - 8, from.x)), y: Math.max(avatar.headerY, from.y)});
          rect = card?.getBoundingClientRect();
        }
        const leg = r.leg;
        const wall = rect ? (leg.side === 1 ? rect.left : rect.right) : leg.takeoff * innerWidth;
        const top = rect ? edges(rect).top : avatar.headerY;
        const grip = rect ? Math.max(top, Math.min(edges(rect).bottom, rect.top + rect.height * leg.grip)) : top;
        const startY = leg.floor ? avatarFooter.getBoundingClientRect().top : leg.y * innerHeight + leg.scroll - scrollY;
        const startX = leg.x * innerWidth, takeoff = leg.takeoff * innerWidth;
        const peak = Math.max(28, startY - grip + 10);
        const lift = Math.sqrt(2 * AVATAR_GRAVITY * peak);
        const seconds = (lift + Math.sqrt(Math.max(0, lift * lift + 2 * AVATAR_GRAVITY * (grip - startY)))) / AVATAR_GRAVITY;
        if (!leg.duration) {
          if (leg.step === 'walk') leg.duration = Math.max(180, Math.abs(takeoff - startX) / .19);
          if (leg.step === 'jump') leg.duration = seconds * 1000;
          if (leg.step === 'wall') leg.duration = Math.max(160, (grip - top) / .15);
          if (leg.step === 'ledge') leg.duration = 235;
        }
        const t = r.progress = Math.min(1, r.progress + dt / leg.duration);
        let x = wall, y = top;
        const frame = Math.floor(leg.duration * t / 135);
        if (leg.step === 'walk') {
          x = startX + (takeoff - startX) * t; y = startY;
          drawAvatarFrame('walk:' + avatarDirection(startX, takeoff), frame);
        } else if (leg.step === 'jump') {
          x = takeoff + (wall - takeoff) * t;
          y = startY + (grip - startY) * t - AVATAR_GRAVITY * seconds * seconds * t * (1 - t) / 2;
          drawAvatarFrame('jump:' + avatarDirection(takeoff, wall), Math.floor(t * 2));
          if (!rect) avatar.scale = 1 - .42 * t;
        } else if (leg.step === 'wall') {
          const stroke = t - .22 * Math.sin(t * 8 * Math.PI) / (8 * Math.PI);
          y = grip + (top - grip) * stroke;
          drawAvatarFrame('climb:up', frame);
        } else {
          x += leg.side * 15 * t;
          drawAvatarFrame('walk:' + (leg.side === 1 ? 'right' : 'left'), frame);
        }
        avatar.position = { x, y, space: 'screen' };
        paintAvatar();
        if (leg.step !== 'jump' && now >= nextCue) {
          requestInterfaceCue(leg.step === 'wall' ? 'avatarGrip' : 'avatarStep');
          nextCue = now + 450;
        }
        if (t === 1) {
          if (!rect && leg.step === 'jump') { finish(); return; }
          if (leg.step === 'ledge') {
            avatar.platform = card;
            if (top <= avatar.headerY + 1) { finish(); return; }
            r.leg = null;
          } else {
            leg.step = { walk: 'jump', jump: 'wall', wall: 'ledge' }[leg.step];
            leg.duration = 0;
            if (leg.step === 'jump') requestInterfaceCue('avatarJump');
          }
          r.progress = 0;
          saveAvatarPosition();
        }
        avatar.frameId = requestAnimationFrame(tick);
      }
      tick(previous);
    }

    function resumeAvatarRecovery() {
      if (!allowAvatarRoute() || !avatar.recovery) return;
      cancelAvatarMotion();
      clearTimeout(avatar.quietTimer);
      avatarWorld.hidden = false;
      avatar.moving = true;
      const r = avatar.recovery;
      if (r.phase === 'climb') { resumeCardAscent(r); return; }
      let previous = performance.now();
      let cueAt = previous + 180;
      function tick(now) {
        if (!allowAvatarRoute()) { stopAvatarRoute(); return; }
        const dt = Math.max(0, Math.min(now - previous, 64));
        previous = now;
        const startX = r.startX * innerWidth, edge = r.edge * innerWidth, floorX = r.floorX * innerWidth;
        const floor = avatarFooter.getBoundingClientRect().top;
        if (!Number.isFinite(r.launchY)) r.launchY = scrollY + r.startY * innerHeight;
        const startY = Math.min(floor,r.launchY - scrollY);
        const direction = edge < startX ? 'left' : 'right';
        const sign = direction === 'left' ? -1 : 1;
        const durations = { edge: Math.max(220, Math.abs(edge - startX) / .165),
          fall: Math.max(80, 1000 * Math.sqrt(2 * (floor - startY) / AVATAR_GRAVITY)),
          rise: 850, angry: 1150 };
        const duration = durations[r.phase];
        const t = r.progress = Math.min(1, r.progress + dt / duration);
        const elapsed = duration * t;
        let x = floorX, y = floor;
        avatarWorld.dataset.recovery = r.phase;
        avatar.scale = 1;
        avatar.angle = 0;
        if (r.phase === 'edge') {
          x = startX + (edge - startX) * t;
          y = startY;
          drawAvatarFrame('run:' + direction, Math.floor(elapsed / 105));
        } else if (r.phase === 'fall') {
          x = edge + (floorX - edge) * t;
          y = startY + (floor - startY) * t * t;
          avatar.angle = sign * (12 + 54 * t);
          drawAvatarFrame('jump:' + direction, 2);
        } else if (r.phase === 'rise') {
          // Hold the prone frame briefly, then play the supplied hurt strip backwards.
          drawAvatarFrame('hurt:up', Math.round(5 * (1 - clampUnit((t - .22) / .78))));
        } else if (r.phase === 'angry') {
          x += Math.sin(6 * Math.PI * t) * 2;
          drawAvatarFrame('emote:down', Math.floor(elapsed / 145));
          recoveryMood.style.transform = 'translate3d(' + Math.max(3, Math.min(innerWidth - 42, x - 19)) + 'px,' + (floor - 81) + 'px,0)';
        }
        if (r.phase === 'edge' && now >= cueAt) {
          requestInterfaceCue('avatarStep');
          cueAt = now + 470;
        }
        avatar.position = { x, y, space: 'screen' };
        paintAvatar();
        if (t === 1) {
          const next = recoveryPhases[recoveryPhases.indexOf(r.phase) + 1];
          r.phase = next;
          r.progress = 0;
          if (next === 'rise') requestInterfaceCue('avatarThud');
          saveAvatarPosition();
          if (next === 'climb') { resumeCardAscent(r); return; }
        }
        avatar.frameId = requestAnimationFrame(tick);
      }
      tick(previous);
    }

    function jumpAvatarTo(facing, to, height, done, options = {}) {
      const from = avatarOnScreen(avatar.position);
      const deltaY = avatarOnScreen(to).y - from.y;
      const wet = window.pomodoroLiquid?.onWetEdge(from);
      const peak = wet ? Math.max(Math.min(height,14), -deltaY + 4) : Math.max(height, -deltaY + 12);
      const lift = Math.sqrt(2 * AVATAR_GRAVITY * peak);
      // Positive y points down. Use the descending root to reach the landing.
      const seconds = (lift + Math.sqrt(lift * lift + 2 * AVATAR_GRAVITY * deltaY)) / AVATAR_GRAVITY;
      moveAvatarTo('jump:' + facing, to, seconds * 1000, done, {
        ...options, flip:!wet && options.flip, gravityCurve: AVATAR_GRAVITY * seconds * seconds / 2
      });
    }

    function moveAvatarTo(phase, to, duration, done, { scale = 1, gravityCurve = 0, flip = false } = {}) {
      const from = avatar.position;
      let previous = performance.now(), elapsed = 0;
      const startScale = avatar.scale || 1;
      const sameSpace = from.space === to.space;
      const airborne = gravityCurve > 0;
      const rolling = phase.startsWith('roll:');
      const facing = phase.endsWith(':left') ? -1 : 1;
      const grip = phase === 'climb:up';
      const cue = grip ? 'avatarGrip' : 'avatarStep';
      let nextStep = 100;
      let rollCuePlayed = false;
      avatar.moving = true;
      avatarWorld.hidden = false;
      avatar.trick = rolling ? 'roll' : flip ? 'flip' : null;
      const sprite = rolling ? phase.replace('roll:', 'jump:') : phase;
      drawAvatarFrame(sprite);
      if (airborne) requestInterfaceCue('avatarJump');
      function step(now) {
        if (!allowAvatarRoute()) { stopAvatarRoute(); return; }
        const wet = !airborne && avatar.zone === 'body' && window.pomodoroLiquid?.onWetEdge(avatarOnScreen(avatar.position));
        elapsed += Math.min(64,Math.max(0,now-previous)) * (wet ? .55 : 1);
        previous = now;
        const progress = Math.min(1, elapsed / duration);
        if (rolling && !rollCuePlayed && elapsed >= 100) {
          rollCuePlayed = true;
          requestInterfaceCue('avatarRoll');
        }
        // A roll carries the landing's momentum and slows as the avatar stands.
        const t = rolling ? 1 - (1 - progress) ** 2 : progress;
        const start = sameSpace ? from : avatarOnScreen(from);
        const end = sameSpace ? to : avatarOnScreen(to);
        avatar.position = {
          x: start.x + (end.x - start.x) * t,
          y: start.y + (end.y - start.y) * t - gravityCurve * t * (1 - t),
          space: sameSpace ? from.space : 'screen'
        };
        avatar.scale = startScale + (scale - startScale) * t;
        avatar.angle = 0;
        avatar.tuck = 0;
        if (rolling || flip) {
          const spin = rolling ? t : Math.min(1, Math.max(0, (progress - .13) / .69));
          avatar.tuck = Math.sin(Math.PI * spin);
          avatar.angle = facing * 360 * spin;
          drawAvatarFrame(sprite, avatar.tuck > .25 ? 2 : 0);
          avatarSprite.dataset.pose = avatar.trick;
        } else if (airborne) {
          drawAvatarFrame(phase, Math.floor(progress * (avatarFrames[phase].length - 1)));
        } else {
          drawAvatarFrame(phase, Math.floor(elapsed / (grip ? 160 : 135)));
          if (elapsed >= nextStep && progress < .98) {
            requestInterfaceCue(cue);
            nextStep = elapsed + (grip ? 450 : 520);
          }
        }
        paintAvatar();
        if (progress < 1) avatar.frameId = requestAnimationFrame(step);
        else {
          avatar.position = to;
          avatar.moving = false;
          avatar.trick = null;
          avatar.angle = avatar.tuck = 0;
          avatar.frameId = undefined;
          paintAvatar();
          done();
        }
      }
      avatar.frameId = requestAnimationFrame(step);
    }

    function avatarDirection(from, to) { return to < from ? 'left' : 'right'; }

    function avatarLanded(target, withSound = true) {
      avatar.platform = target.card;
      avatar.landing = null;
      avatarWorld.removeAttribute('data-moving');
      drawAvatarFrame('idle:down');
      if (withSound) requestInterfaceCue('avatarLand');
    }

    function finishBodyHop(target, from, fromCard, withSound = true) {
      avatar.previous = fromCard;
      avatar.sameRowHops = Math.abs(target.y - from.y) < 30 ? avatar.sameRowHops + 1 : 0;
      avatarLanded(target.p, withSound);
      const wasDemo = avatar.hops > 0;
      avatar.hops = Math.max(0, avatar.hops - 1);
      if ((state.studyAvatar.walk || avatar.hops) && --avatar.untilSlip <= 0 && startAvatarSlip(target.p.card)) return;
      if (wasDemo && !avatar.hops) cheerAvatar(800);
      else scheduleAvatarMove(runAvatarHop, avatarPause());
    }

    const prankToggle = document.getElementById('avatar-prank-toggle');
    const prankEffects = document.getElementById('avatar-prank-effects');
    const prank = { nextAt: performance.now() + 4500 + Math.random() * 6000, recent: [] };

    function clearAvatarPrank() {
      const active = prank.active;
      if (!active) return;
      prank.active = null;
      for (const timer of active.timers) clearTimeout(timer);
      for (const effect of active.effects) effect.cancel();
      active.restore?.();
      prankEffects.replaceChildren();
      prank.bubbleWidth = 0;
      delete avatarWorld.dataset.pranking;
      recoveryMood.textContent = 'Uf!';
      cancelAvatarMotion();
      drawAvatarFrame('idle:down');
      paintAvatar();
    }

    function finishAvatarPrank() {
      clearAvatarPrank();
      queueAvatarRoute(avatarPause());
    }

    function prankAfter(delay, action) {
      const active = prank.active;
      const timer = setTimeout(() => {
        active.timers.delete(timer);
        if (prank.active !== active) return;
        if (!active.el.isConnected || !state.studyAvatar.pranks || !allowAvatarRoute()) finishAvatarPrank();
        else action();
      }, delay);
      active.timers.add(timer);
    }

    function prankAnimate(el, frames, duration, options = {}) {
      const effect = el.animate(frames, {duration, easing: 'ease-out', ...options});
      prank.active.effects.push(effect);
      return effect;
    }

    function avatarPrankLine(text) {
      recoveryMood.textContent = text;
      prank.bubbleWidth = recoveryMood.offsetWidth;
      paintAvatar();
    }

    function prankPoint(el, fromX, center = false) {
      if (!el.isConnected || el.closest('[hidden], [inert], .motion-pending')) return null;
      const mark = el.dataset.action === 'toggle-block' ? el.querySelector('[data-block-mark]') || el : el;
      const rect = mark.getBoundingClientRect();
      const left = Math.max(12, rect.left + Math.min(12, rect.width / 2));
      const right = Math.min(innerWidth - 12, rect.right - Math.min(12, rect.width / 2));
      const x = center ? (left + right) / 2 : Math.max(left, Math.min(right, fromX));
      const y = center ? rect.top + Math.min(8, rect.height / 2) : rect.top >= avatar.headerY + 25 ? rect.top : rect.bottom;
      if (!rect.width || left > right || y < avatar.headerY + 25 || y > innerHeight - 12) return null;
      const hit = document.elementFromPoint(x, y === rect.bottom ? y - 2 : y + 2);
      return hit && el.contains(hit) ? {x, y} : null;
    }

    function calendarPrankRoute(el) {
      const days = [...el.parentElement.querySelectorAll('[data-action="study-day"]')];
      const start = days.indexOf(el);
      const route = direction => {
        const run = [el];
        for (let i = 1; i < 5; i++) {
          const next = days[start + direction * i];
          const previous = run.at(-1);
          if (!next || Math.abs(next.offsetTop - previous.offsetTop) > 3 || !prankPoint(next, 0, true)) break;
          run.push(next);
        }
        return run;
      };
      const routes = [route(1), route(-1)].filter(run => run.length >= 3);
      return routes[Math.floor(Math.random() * routes.length)];
    }

    function chartSkateLine(canvas) {
      const chart = progressChartInstance;
      if (chart?.canvas !== canvas || !canvas.isConnected || !chart.width || !chart.height) return null;
      return chart.getSortedVisibleDatasetMetas().find(meta => meta.type === 'line');
    }

    function chartSkateEntry(canvas, fromX) {
      const line = chartSkateLine(canvas);
      if (!line || canvas.closest('[hidden], [inert], .motion-pending')) return null;
      const rect = canvas.getBoundingClientRect();
      const sx = rect.width / progressChartInstance.width;
      const sy = rect.height / progressChartInstance.height;
      let run = [], longest = [];
      line.data.forEach((point, index) => {
        const x = rect.left + point.x * sx, y = rect.top + point.y * sy;
        if (point.skip || x < 18 || x > innerWidth - 18 || y < avatar.headerY + 48 ||
            y > innerHeight - 10 || document.elementFromPoint(x, y) !== canvas) {
          run = [];
          return;
        }
        run.push({x, y, index});
        if (run.length > longest.length) longest = run;
      });
      if (longest.length < 2) return null;
      const first = longest[0], last = longest.at(-1);
      const [start, end] = Math.abs(fromX - first.x) <= Math.abs(fromX - last.x) ? [first, last] : [last, first];
      return {...start, end: end.index};
    }

    // Follow the same cubic control points Chart.js uses to stroke its time series.
    function chartRailSample(points, index) {
      const i = Math.min(Math.floor(index), points.length - 2);
      const a = points[i], b = points[i + 1], t = index - i, u = 1 - t;
      function axis(p, c1, c2, q) {
        if (!Number.isFinite(c1) || !Number.isFinite(c2)) return {pos: p * u + q * t, slope: q - p};
        return {
          pos: u ** 3 * p + 3 * u * u * t * c1 + 3 * u * t * t * c2 + t ** 3 * q,
          slope: u * u * (c1 - p) + 2 * u * t * (c2 - c1) + t * t * (q - c2)
        };
      }
      const x = axis(a.x, a.cp2x, b.cp1x, b.x);
      const y = axis(a.y, a.cp2y, b.cp1y, b.y);
      return {x: x.pos, y: y.pos, dx: x.slope, dy: y.slope};
    }

    function skateActivityChart(canvas) {
      const entry = chartSkateEntry(canvas, avatarOnScreen(avatar.position).x);
      if (!entry) { finishAvatarPrank(); return; }
      const direction = Math.sign(entry.end - entry.index);
      const facing = direction > 0 ? 'right' : 'left';
      const points = chartSkateLine(canvas).data;
      const span = Math.abs(points[entry.end].x - points[entry.index].x);
      const duration = Math.max(1500, span / .16);
      const started = performance.now();
      const board = document.createElement('span');
      board.className = 'avatar-skateboard';
      prankEffects.append(board);
      avatar.trick = 'skate';
      avatar.moving = true;
      avatarPrankLine('Bu chiziqda uchsa bo‘larkan!');
      const hopStart = duration * .49;
      const hopMs = 340;
      let hopped = false, landed = false;
      function ride(now) {
        const line = chartSkateLine(canvas);
        if (!line || !allowAvatarRoute() || !state.studyAvatar.pranks) { finishAvatarPrank(); return; }
        const elapsed = now - started, t = clampUnit(elapsed / duration);
        const index = entry.index + (entry.end - entry.index) * (.5 - .5 * Math.cos(Math.PI * t));
        const rail = chartRailSample(line.data, index);
        const rect = canvas.getBoundingClientRect();
        const sx = rect.width / progressChartInstance.width, sy = rect.height / progressChartInstance.height;
        const x = rect.left + rail.x * sx, y = rect.top + rail.y * sy;
        if (y < avatar.headerY + 24 || y > innerHeight - 4 || x < 10 || x > innerWidth - 10) { finishAvatarPrank(); return; }
        const air = clampUnit((elapsed - hopStart) / hopMs);
        const lift = 4 * 25 * air * (1 - air);
        if (elapsed >= hopStart && !hopped) {
          hopped = true;
          requestInterfaceCue('avatarJump');
        }
        if (air === 1 && !landed) {
          landed = true;
          requestInterfaceCue('avatarLand');
          avatarPrankLine('Voy, grafikni tebratib yubordim!');
          prankAnimate(canvas, [{translate:'0 0'}, {translate:'0 4px'}, {translate:'0 -3px'},
            {translate:'0 1px'}, {translate:'0 0'}], 380);
        }
        const tilt = Math.atan2(rail.dy * sy, rail.dx * sx) * 180 / Math.PI;
        board.style.transform = `translate3d(${x - 15}px,${y - lift - 4}px,0) rotate(${tilt}deg)`;
        avatar.position = avatarBodyPoint(x, y - lift - 4);
        avatar.angle = tilt * .55 - direction * 7 * Math.sin(Math.PI * t);
        drawAvatarFrame('jump:' + facing, lift > 1 ? 2 : 1);
        paintAvatar();
        if (t < 1) avatar.frameId = requestAnimationFrame(ride);
        else {
          avatar.position = avatarBodyPoint(x, y);
          avatar.angle = 0;
          avatar.trick = null;
          board.remove();
          const ripple = document.createElement('span');
          ripple.className = 'avatar-chart-ripple';
          ripple.style.left = x + 'px';
          ripple.style.top = y + 'px';
          ripple.style.color = line.dataset.options.borderColor;
          prankEffects.append(ripple);
          prankAnimate(ripple, [{scale:'.4', opacity:1}, {scale:'2.2', opacity:0}], 480, {fill:'forwards'});
          drawAvatarFrame('emote:down', 2);
          avatarPrankLine('Nuqtani tutdim!');
          prankAfter(650, finishAvatarPrank);
        }
      }
      avatar.frameId = requestAnimationFrame(ride);
    }

    function scatterableText(el) {
      return el.firstChild?.nodeType === Node.TEXT_NODE && el.childNodes.length === 1 &&
        el.textContent.length <= 125 && /\S+\s+\S+\s+\S+/.test(el.textContent.trim()) &&
        el.getBoundingClientRect().height <= 104;
    }

    const avatarPranks = {
      chart: {selector: '#progress-activity-chart', point: chartSkateEntry, play: skateActivityChart},
      fabric: {selector: 'section.study-report, section.rounded-2xl, .practice-panel, div.rounded-2xl.border, div.rounded-3xl.border',
        accepts: el => el.getBoundingClientRect().height >= 100, play: shakeAvatarFabric},
      dates: {selector: '.study-calendar-days [data-action="study-day"]', center: true,
        accepts: el => !!calendarPrankRoute(el), play: hopCalendarDates},
      timer: {selector: '.focus-timer [data-action="timer-toggle"]', center: true,
        accepts: el => !ui.timerRunning && !el.disabled, play: teaseFocusTimer},
      scatter: {selector: 'h1, h2, h3, p', accepts: scatterableText, play: scatterAvatarWords},
      magnet: {selector: '.practice-meta, .study-streak, .practice-heading',
        accepts: el => el.children.length >= 2 && el.children.length <= 6, play: pullAvatarBadges},
      tilt: {selector: 'h1, h2, h3', play: tiltAvatarHeading},
      control: {selector: '[data-action="toggle-block"][aria-pressed="false"], [data-action="fc-flip"], [data-action="srs-flip"]',
        play: fiddleAvatarControl}
    };

    function pickAvatarPrank(from) {
      if (String(window.getSelection())) return null;
      const root = document.getElementById('app-root');
      const options = new Map();
      for (const [kind, trick] of Object.entries(avatarPranks)) {
        const targets = [];
        for (const el of root.querySelectorAll(trick.selector)) {
          if (el.contains(document.activeElement) || el.matches(':hover') && el.closest('.focus-timer')) continue;
          const point = trick.point ? trick.point(el, from.x) : prankPoint(el, from.x, trick.center);
          if (!point || trick.accepts && !trick.accepts(el)) continue;
          const cost = Math.hypot(point.x - from.x, point.y - from.y);
          targets.push({el, kind, ...point, cost});
        }
        if (targets.length) options.set(kind, targets.sort((a, b) => a.cost - b.cost).slice(0, 3));
      }
      const all = [...options.keys()];
      const unused = all.filter(kind => !prank.recent.includes(kind));
      if (unused.includes('chart')) return options.get('chart')[0];
      const kinds = unused.length ? unused : all;
      const choices = options.get(kinds[Math.floor(Math.random() * kinds.length)]);
      return choices?.[Math.floor(Math.random() * choices.length)] ?? null;
    }

    function playAvatarPrank(target) {
      const {el, kind} = target;
      const trick = avatarPranks[kind];
      if (prank.active || !state.studyAvatar.pranks || !allowAvatarRoute() || !el.isConnected ||
          (trick.accepts && !trick.accepts(el)) || el.contains(document.activeElement) || String(window.getSelection())) return false;
      prank.active = {el, timers: new Set(), effects: []};
      prank.recent = [kind, ...prank.recent].slice(0, 2);
      recoveryMood.textContent = '';
      avatarWorld.dataset.pranking = kind;
      drawAvatarFrame('emote:down', 2);
      trick.play(el);
      return true;
    }

    function shakeAvatarFabric(el) {
      avatarPrankLine('Buncha chang qayerdan keldi?');
      requestInterfaceCue('avatarPaper');
      const folds = [el, ...[...el.children].filter(child => {
        const {top, bottom} = child.getBoundingClientRect();
        return top < innerHeight && bottom > avatar.headerY;
      }).slice(0, 5)];
      folds.forEach((fold, index) => {
        const shift = index ? 4 : 7;
        prankAnimate(fold, [
          {translate: '0 0', rotate: '0deg', scale: '1'},
          {translate: `${shift}px -7px`, rotate: '.8deg', scale: '1.01 .985', offset: .19},
          {translate: `-${shift}px 4px`, rotate: '-.65deg', scale: '.99 1.012', offset: .43},
          {translate: `${shift / 2}px -3px`, rotate: '.35deg', scale: '1.004 .996', offset: .66},
          {translate: '0 0', rotate: '0deg', scale: '1'}
        ], 830, {delay: 55 * index, easing: 'ease-in-out'});
      });
      for (const delay of [155,355,550]) prankAfter(delay,() => window.pomodoroLiquid?.shakeCard(el));
      prankAfter(1610, finishAvatarPrank);
    }

    function hopCalendarDates(el) {
      const days = calendarPrankRoute(el);
      if (!days) { finishAvatarPrank(); return; }
      function land(index) {
        const day = days[index];
        if (!day.isConnected) { finishAvatarPrank(); return; }
        avatarLanded({card: day}, index > 0);
        prankAnimate(day, [
          {scale: '1', boxShadow: 'inset 0 0 0 0 #f59e0b00'},
          {scale: '.88', boxShadow: 'inset 0 0 0 2px #f59e0b', offset: .28},
          {scale: '1', boxShadow: 'inset 0 0 0 3px #f59e0b00'}
        ], 480);
        prankAfter(index + 1 === days.length ? 380 : 140, () => {
          if (index + 1 === days.length) { finishAvatarPrank(); return; }
          const next = prankPoint(days[index + 1], 0, true);
          if (!next) { finishAvatarPrank(); return; }
          const direction = avatarDirection(avatarOnScreen(avatar.position).x, next.x);
          jumpAvatarTo(direction, avatarBodyPoint(next.x, next.y), 17, () => land(index + 1));
        });
      }
      land(0);
    }

    function teaseFocusTimer(el) {
      avatarPrankLine('Taymerni bosaymi? Bir… ikki…');
      function tap() {
        drawAvatarFrame('jump:right', 2);
        prankAfter(140, () => drawAvatarFrame('emote:down', 2));
        prankAnimate(el, [
          {scale: '1', outline: '0 solid #f59e0b00'},
          {scale: '.94', outline: '2px solid #f59e0b', offset: .25},
          {scale: '1', outline: '4px solid #f59e0b00'}
        ], 430);
        requestInterfaceCue('avatarTease');
      }
      tap();
      prankAfter(630, tap);
      prankAfter(1350, () => avatarPrankLine('Hazil edi!'));
      prankAfter(2050, finishAvatarPrank);
    }

    function scatterAvatarWords(el) {
      const source = el.firstChild;
      const text = source.textContent;
      const range = document.createRange();
      const font = getComputedStyle(el);
      const words = [];
      for (const match of text.matchAll(/\S+/gu)) {
        range.setStart(source, match.index);
        range.setEnd(source, match.index + match[0].length);
        const rect = range.getBoundingClientRect();
        if (rect.top <= avatar.headerY - 7 || rect.bottom > innerHeight || rect.left < 0 || rect.right > innerWidth ||
            range.getClientRects().length !== 1 || words.length >= 16) {
          finishAvatarPrank();
          return;
        }
        const node = document.createElement('span');
        node.className = 'avatar-prank-word';
        node.textContent = match[0];
        Object.assign(node.style, {left: rect.left + 'px', top: rect.top + 'px', lineHeight: rect.height + 'px',
          fontFamily: font.fontFamily, fontSize: font.fontSize, fontWeight: font.fontWeight, fontStyle: font.fontStyle,
          letterSpacing: font.letterSpacing, color: font.color});
        const dx = Math.max(5 - rect.left, Math.min(innerWidth - rect.right - 5, (Math.random() - .5) * 255));
        const dy = Math.max(-12, Math.min(innerHeight - rect.bottom - 6, 27 + Math.random() * 59));
        const angle = (Math.random() - .5) * 90;
        words.push({node, x: rect.left + rect.width / 2, y: rect.top, dx, dy, angle});
      }
      const start = avatarOnScreen(avatar.position);
      const kickX = Math.max(22, Math.min(innerWidth - 22, start.x + (start.x > innerWidth / 2 ? -32 : 32)));
      jumpAvatarTo(avatarDirection(start.x, kickX), avatarBodyPoint(kickX, start.y), 25, () => {
        if (!el.isConnected || el.firstChild !== source || source.textContent !== text) {
          finishAvatarPrank();
          return;
        }
        prankEffects.append(...words.map(word => word.node));
        el.classList.add('avatar-prank-scattered');
        prank.active.restore = () => el.classList.remove('avatar-prank-scattered');
        requestInterfaceCue('avatarPaper');
        for (const word of words) {
          word.pose = `translate(${word.dx}px,${word.dy}px) rotate(${word.angle}deg)`;
          prankAnimate(word.node, [
            {transform: 'none'},
            {transform: `translate(${word.dx * .5}px,${-26 - Math.abs(word.dx) * .22}px) rotate(${word.angle / 2}deg)`, offset: .44},
            {transform: `translate(${word.dx}px,${word.dy - 6}px) rotate(${word.angle}deg)`, offset: .82},
            {transform: word.pose}
          ], 450 + Math.random() * 180, {fill: 'forwards'});
        }
        const remaining = [...words].sort((a, b) => a.x + a.dx - b.x - b.dx);
        const batchSize = Math.ceil(words.length / 3);
        if (kickX > innerWidth / 2) remaining.reverse();
        prankAfter(830, () => {
          avatarPrankLine('Mayli, o‘zim yig‘aman…');
          gather();
        });
        function gather() {
          if (!el.isConnected) { finishAvatarPrank(); return; }
          const batch = remaining.splice(0, batchSize);
          const from = avatarOnScreen(avatar.position);
          const goal = Math.max(22, Math.min(innerWidth - 22, batch.reduce((sum, word) => sum + word.x + word.dx, 0) / batch.length));
          moveAvatarTo('walk:' + avatarDirection(from.x, goal), avatarBodyPoint(goal, from.y),
            Math.max(160, Math.min(620, Math.abs(goal - from.x) * 6)), () => {
              if (!el.isConnected) { finishAvatarPrank(); return; }
              requestInterfaceCue('avatarGrip');
              batch.forEach((word, index) => {
                prankAnimate(word.node, [
                  {transform: word.pose},
                  {transform: `translate(${goal - word.x}px,${from.y - word.y - 24}px) rotate(0deg) scale(.82)`, offset: .43},
                  {transform: 'none'}
                ], 430, {delay: 28 * index, fill: 'forwards'});
              });
              prankAfter(600, remaining.length ? gather : finishAvatarPrank);
            });
        }
      }, {flip: true});
    }

    function pullAvatarBadges(el) {
      avatarPrankLine('Qani, bir-biringizga yaqinroq!');
      requestInterfaceCue('avatarTease');
      const parent = el.getBoundingClientRect();
      const center = parent.left + parent.width / 2;
      for (const child of el.children) {
        const rect = child.getBoundingClientRect();
        const pull = Math.max(-34, Math.min(34, (center - rect.left - rect.width / 2) * .26));
        prankAnimate(child, [
          {translate: '0 0', scale: '1'},
          {translate: `${pull}px -5px`, scale: '.92', offset: .33},
          {translate: `${pull}px -5px`, scale: '.92', offset: .64},
          {translate: '0 0', scale: '1'}
        ], 1100, {easing: 'ease-in-out'});
      }
      prankAfter(1450, finishAvatarPrank);
    }

    function tiltAvatarHeading(el) {
      avatarPrankLine('Sarlavhani tekis qo‘ydim… shekilli.');
      requestInterfaceCue('avatarTease');
      prankAnimate(el, [{rotate: '0deg'}, {rotate: '-5deg', offset: .25}, {rotate: '2deg', offset: .58}, {rotate: '0deg'}], 1030);
      prankAfter(1470, finishAvatarPrank);
    }

    function fiddleAvatarControl(el) {
      if (el.dataset.action === 'toggle-block') {
        const mark = el.querySelector('[data-block-mark]') || el;
        mark.classList.add('avatar-prank-check');
        prank.active.restore = () => mark.classList.remove('avatar-prank-check');
        avatarPrankLine('Shu blokni belgilab qo‘ysam-chi?');
      } else {
        const card = el.querySelector('.flip-card-inner');
        if (!card) { finishAvatarPrank(); return; }
        const original = card.classList.contains('flipped');
        showPracticeFace(card, !original);
        prank.active.restore = () => showPracticeFace(card, original);
        avatarPrankLine('Kartang qaysi tomonda edi?');
      }
      requestInterfaceCue('avatarTease');
      prankAfter(2200, finishAvatarPrank);
    }

    function approachAvatarPrank(target, platforms) {
      const from = avatarOnScreen(avatar.position);
      const landing = avatarBodyPoint(target.x, target.y);
      const depart = () => {
        const start = avatarOnScreen(avatar.position);
        const facing = avatarDirection(start.x, target.x);
        const rise = start.y - target.y;
        const finish = () => {
          avatarLanded({card: target.el});
          const trick = avatarPranks[target.kind];
          const point = trick.point ? trick.point(target.el, target.x) : prankPoint(target.el, target.x, trick.center);
          const actual = avatarOnScreen(avatar.position);
          if (state.studyAvatar.pranks && point && Math.hypot(actual.x - point.x, actual.y - point.y) < 9) {
            if (playAvatarPrank(target)) return;
          }
          scheduleAvatarMove(runAvatarHop, avatarPause());
        };
        avatar.landing = landing;
        avatarWorld.dataset.moving = '';
        if (rise > 100) {
          const grip = { ...landing, y: landing.y + rise - 45 };
          jumpAvatarTo(facing, grip, 58, () => moveAvatarTo('climb:up', landing, 340 + (rise - 45) * 4, finish));
        } else {
          jumpAvatarTo(facing, landing, 54, finish, { flip: Math.abs(start.x - target.x) > 60 });
        }
      };
      const ledge = platforms.find(p => Math.abs(p.y - from.y) < 10 && from.x >= p.left - 3 && from.x <= p.right + 3);
      const edgeX = ledge ? Math.max(ledge.left, Math.min(ledge.right, target.x)) : from.x;
      const stride = Math.abs(edgeX - from.x);
      if (stride > 50) {
        moveAvatarTo('walk:' + avatarDirection(from.x, edgeX), avatarBodyPoint(edgeX, from.y), stride * 8, depart);
      } else depart();
    }

    function runAvatarHop() {
      if (!allowAvatarRoute() || prank.active) return;
      measureAvatarHeader();
      const platforms = getAvatarPlatforms();
      const fromPoint = avatar.position ? avatarOnScreen(avatar.position) : { x: innerWidth / 2, y: avatar.headerY };
      const targetPrank = state.studyAvatar.pranks && avatar.hops === 0 && performance.now() >= prank.nextAt
        ? pickAvatarPrank(fromPoint) : null;
      if (!platforms.length && !targetPrank) {
        if (state.studyAvatar.pranks && !state.studyAvatar.walk && !avatar.hops) scheduleAvatarMove(runAvatarHop, 3000);
        else enterAvatarHeader();
        return;
      }
      setAvatarZone('body');
      if (avatar.position?.space !== 'body') {
        if (avatar.position) { returnAvatarToBody(); return; }
        const first = platforms[0] || { card: targetPrank.el, left: targetPrank.x, right: targetPrank.x, y: targetPrank.y };
        avatar.position = avatarBodyPoint(first.left + Math.min(36, (first.right - first.left) / 2), first.y);
        avatar.platform = first.card;
      }
      const from = avatarOnScreen(avatar.position);
      if (from.y < avatar.headerY - 20 || from.y > innerHeight + 40 || from.x < -24 || from.x > innerWidth + 24) {
        enterAvatarHeader();
        return;
      }
      if (targetPrank) {
        prank.nextAt = performance.now() + 15000 + Math.random() * 12500;
        approachAvatarPrank(targetPrank, platforms);
        return;
      }
      if (!state.studyAvatar.walk && !avatar.hops) {
        scheduleAvatarMove(runAvatarHop, 2500);
        return;
      }
      const origin = platforms.find(p => from.x >= p.left - 4 && from.x <= p.right + 4 && Math.abs(p.y - from.y) < 18);
      const fromCard = origin?.card;
      if (origin && window.pomodoroLiquid?.onWetEdge(from)) {
        const direction = from.x < (origin.left + origin.right)/2 ? 1 : -1;
        const x = Math.max(origin.left,Math.min(origin.right,from.x + direction * 46));
        moveAvatarTo('walk:' + avatarDirection(from.x,x),avatarBodyPoint(x,origin.y),
          720,() => queueAvatarRoute(avatarPause()));
        return;
      }
      const combo = avatar.combo++ % 4;
      const choices = platforms.map(p => {
        const middle = (p.left + p.right) * .5;
        const hint = from.x + (middle < from.x ? -36 : 36);
        const x = Math.max(p.left + 8, Math.min(p.right - 8, hint));
        const rise = from.y - p.y;
        return { p, x, y: p.y, climb: rise > 94 && rise < 390 && Math.abs(x - from.x) < 310 };
      }).filter(t => t.p.card !== fromCard && Math.abs(t.x - from.x) <= 355
        && (t.climb || (from.y - t.y <= 94 && t.y - from.y <= 390)));
      const score = t => Math.hypot(t.x - from.x, (t.y - from.y) * 1.13)
        + (t.p.card === avatar.previous ? 240 : 0)
        + (avatar.sameRowHops >= 2 && Math.abs(t.y - from.y) < 30 ? 330 : 0)
        + (combo === 2 && t.climb ? -380 : combo !== 2 && t.climb ? 145 : 0);
      choices.sort((a, b) => score(a) - score(b));
      const sameCard = origin || platforms[0];
      const target = choices[0] || {
        p: sameCard, y: sameCard.y,
        x: from.x >= (sameCard.left + sameCard.right) / 2
          ? Math.max(sameCard.left, from.x - 95)
          : Math.min(sameCard.right, from.x + 95)
      };
      const horizontal = target.x - from.x;
      const rise = from.y - target.y;
      const facing = avatarDirection(from.x, target.x);
      const landing = avatarBodyPoint(target.x, target.y);
      avatar.landing = landing;
      avatarWorld.dataset.moving = '';
      const finish = () => finishBodyHop(target, from, fromCard);
      const runway = facing === 'right' ? target.p.right - target.x : target.x - target.p.left;
      const rollDistance = Math.min(81, runway);
      const roll = !target.climb && rollDistance >= 39 && (combo === 0 || combo === 3 || rise < -85);
      const flip = combo !== 2 && Math.abs(horizontal) >= 22 && !target.climb;
      const land = () => {
        if (!roll) { finish(); return; }
        requestInterfaceCue('avatarLand');
        avatarWorld.removeAttribute('data-moving');
        avatar.landing = null;
        const rollEnd = {
          ...landing, x: landing.x + (facing === 'right' ? rollDistance : -rollDistance)
        };
        // Start contact immediately, then allow the landing sound to finish under the roll.
        moveAvatarTo('roll:' + facing, rollEnd, 560, () => finishBodyHop(target, from, fromCard, false));
      };

      if (target.climb) {
        const wallX = from.x < target.x ? target.p.left - 12 : target.p.right + 12;
        const wallY = Math.min(from.y, target.y + 132);
        const wall = avatarBodyPoint(wallX, wallY);
        const ledge = avatarBodyPoint(wallX, target.y);
        jumpAvatarTo(avatarDirection(from.x, wallX), wall, 34, () =>
          moveAvatarTo('climb:up', ledge, 470 + (wallY - target.y) * 5.8, () =>
            moveAvatarTo('walk:' + avatarDirection(wallX, target.x), landing, 420 + Math.abs(target.x - wallX) * 5.5, finish)));
      } else if (target.p.card === fromCard && Math.abs(horizontal) >= 55) {
        const takeoff = avatarBodyPoint(from.x + horizontal * .31, from.y);
        moveAvatarTo('walk:' + facing, takeoff, 510, () => jumpAvatarTo(facing, landing, flip ? 65 : 37, land, { flip }));
      } else {
        const height = flip ? 61 : 25 + Math.abs(horizontal) * .11;
        jumpAvatarTo(facing, landing, height, land, { flip });
      }
    }

    function scheduleAvatarReturn(delay = 0) {
      clearTimeout(avatar.quietTimer);
      const remaining = AVATAR_QUIET_MS - (performance.now() - avatar.lastActivity);
      avatar.quietTimer = setTimeout(() => {
        if (avatar.zone === 'header' && allowAvatarRoute()) returnAvatarToBody();
      }, Math.max(delay, remaining, 0));
    }

    function walkAvatarHeader() {
      if (!allowAvatarRoute() || avatar.zone !== 'header') return;
      const { x } = avatarOnScreen(avatar.position);
      const left = 25;
      const right = Math.max(left + 10, innerWidth - 29);
      if (x <= left + 18) avatar.headerDirection = 'right';
      if (x >= right - 18) avatar.headerDirection = 'left';
      const goal = avatar.headerDirection === 'left' ? left : right;
      moveAvatarTo('walk:' + avatarDirection(x, goal), { x: goal, y: 0, space: 'header' },
        Math.max(480, Math.abs(goal - x) * 13), () => scheduleAvatarMove(walkAvatarHeader, 240), { scale: .58 });
    }

    function enterAvatarHeader() {
      if (!allowAvatarRoute()) return;
      measureAvatarHeader();
      if (avatar.zone === 'header' && avatar.position?.space === 'header') {
        if (!avatar.moving && avatar.travelTimer === undefined) walkAvatarHeader();
        scheduleAvatarReturn();
        return;
      }
      if (avatar.zone === 'to-header' && avatar.moving) return;
      const before = avatar.position && avatarOnScreen(avatar.position);
      cancelAvatarMotion();
      clearTimeout(avatar.quietTimer);
      if (!before) {
        avatar.position = { x: 34, y: 0, space: 'header' };
        avatar.scale = .58;
        setAvatarZone('header');
        walkAvatarHeader();
        scheduleAvatarReturn(700);
        return;
      }
      const x = Math.max(24, Math.min(innerWidth - 25, before.x));
      const y = Math.max(34, Math.min(innerHeight + 34, before.y));
      avatar.position = { x, y, space: 'screen' };
      setAvatarZone('to-header');
      const goal = Math.max(27, Math.min(innerWidth - 29, x + (x <= innerWidth * .5 ? 44 : -44)));
      const headerPoint = { x: goal, y: 0, space: 'header' };
      const arrive = () => {
        setAvatarZone('header');
        requestInterfaceCue('avatarLand');
        walkAvatarHeader();
        scheduleAvatarReturn(300);
      };
      const direction = avatarDirection(x, goal);
      if (y - avatar.headerY > 100) {
        const grip = { x: goal, y: y - 40, space: 'screen' };
        jumpAvatarTo(direction, grip, 62, () =>
          moveAvatarTo('climb:up', headerPoint, 540 + (grip.y - avatar.headerY) * 2.8, arrive, { scale: .58 }), { scale: .72 });
      } else {
        jumpAvatarTo(direction, headerPoint, 28, arrive, { scale: .58 });
      }
    }

    function returnAvatarToBody() {
      if (!allowAvatarRoute()) return;
      measureAvatarHeader();
      const view = avatar.position && avatarOnScreen(avatar.position);
      if (!view) { runAvatarHop(); return; }
      const candidates = getAvatarPlatforms().map(p => ({ p, x: Math.max(p.left, Math.min(p.right, view.x)), y: p.y }));
      const score = t => Math.hypot(t.x - view.x, t.y - view.y);
      candidates.sort((a, b) => score(a) - score(b));
      let target = candidates[0];
      if (!target && state.studyAvatar.pranks) {
        const visible = pickAvatarPrank(view);
        if (visible) target = { ...visible, p: { card: visible.el } };
      }
      if (!target) {
        if (avatar.zone !== 'header') enterAvatarHeader();
        scheduleAvatarReturn(1600);
        return;
      }
      cancelAvatarMotion();
      clearTimeout(avatar.quietTimer);
      setAvatarZone('to-body');
      avatar.previous = null;
      avatar.sameRowHops = 0;
      avatar.landing = avatarBodyPoint(target.x, target.y);
      avatarWorld.dataset.moving = '';
      jumpAvatarTo(avatarDirection(view.x, target.x), avatar.landing, 24, () => {
          setAvatarZone('body');
          avatarLanded(target.p);
          scheduleAvatarMove(runAvatarHop, avatarPause());
        });
    }

    function avatarBrowsingActivity(kind) {
      if (!avatar.ready) return;
      const now = performance.now();
      avatar.lastActivity = now;
      if (avatar.recovery) {
        avatar.lastScrollX = scrollX; avatar.lastScrollY = scrollY;
        avatar.scrollDistance = 0;
        return;
      }

      if (kind === 'tab') {
        const frequent = now - avatar.lastTabChange < 2600;
        avatar.lastTabChange = now;
        if (frequent || avatar.zone !== 'body') enterAvatarHeader();
        else if (allowAvatarRoute()) {
          cancelAvatarMotion();
          if (avatar.position) scheduleAvatarMove(returnAvatarToBody, 250);
          else queueAvatarRoute(600);
        }
      } else {
        const elapsed = now - avatar.lastScrollAt;
        const traveled = Math.abs(window.scrollY - avatar.lastScrollY) + Math.abs(window.scrollX - avatar.lastScrollX);
        avatar.lastScrollAt = now;
        avatar.lastScrollY = window.scrollY;
        avatar.lastScrollX = window.scrollX;
        avatar.scrollDistance = (elapsed > 500 ? 0 : avatar.scrollDistance) + traveled;
        const p = avatar.position && avatarOnScreen(avatar.position);
        const offscreen = avatar.zone === 'body' && p && (p.y < avatar.headerY - 18 || p.y > innerHeight + 40);
        if (avatar.zone !== 'header' && (avatar.scrollDistance >= 160 || offscreen)) enterAvatarHeader();
      }
      if (avatar.zone === 'header') scheduleAvatarReturn();
    }

    function cheerAvatar(duration) {
      if (avatarWorld.hidden || avatar.moving || avatar.zone !== 'body') return;
      drawAvatarFrame('emote:down', 2);
      clearTimeout(avatar.travelTimer);
      avatar.travelTimer = setTimeout(() => {
        avatar.travelTimer = undefined;
        drawAvatarFrame('idle:down');
        if (allowAvatarRoute()) scheduleAvatarMove(runAvatarHop, avatarPause());
        else stopAvatarRoute();
      }, duration);
    }

    function refreshAvatarMotionControls() {
      const reduced = motionPreference.matches;
      avatarWalkToggle.disabled = reduced;
      prankToggle.disabled = reduced;
      avatarParkour.disabled = reduced;
      document.getElementById('avatar-motion-note').hidden = !reduced;
    }

    function setAvatarPanel(open, restoreFocus = false) {
      avatarPanel.hidden = !open;
      refreshAvatarMotionControls();
      avatarDock.setAttribute('aria-expanded', String(open));
      if (open) {
        dismissAvatarReminder();
        stopAvatarRoute();
      } else {
        if (restoreFocus) avatarDock.focus({ preventScroll: true });
        queueAvatarRoute(950);
      }
    }

    function syncAvatarView() {
      if (!avatar.ready) return;
      const tabs = {
        lessons: [ui.lessonSubTab, ui.dayGoetheSkill], practice: [ui.practiceMode],
        grammar: [ui.grammarTab], goethe: [ui.goetheSubTab, ui.goetheSkill]
      };
      const view = [state.activeTab, ...(tabs[state.activeTab] || [])].join(':');
      if (avatar.view && avatar.view !== view) avatarBrowsingActivity('tab');
      avatar.view = view;
      const completed = new Set(state.dailyBlocks?.completed || []);
      const before = avatar.plan;
      avatar.plan = STUDY_BLOCKS.filter(block => completed.has(block.id)).length;
      document.getElementById('avatar-progress').textContent = 'Bugun ' + avatar.plan + ' / ' + STUDY_BLOCKS.length + ' blok';
      document.querySelectorAll('#avatar-meter span').forEach((bar, index) => bar.classList.toggle('done', index < avatar.plan));
      document.getElementById('avatar-tip').textContent = avatarStudyTip();
      const quick = document.getElementById('avatar-quick-action');
      const finished = avatar.plan >= STUDY_BLOCKS.length;
      quick.dataset.nav = finished ? 'practice' : 'roadmap';
      quick.textContent = finished ? 'Fleshkartalar' : 'Bugungi reja';
      avatarWalkToggle.checked = state.studyAvatar.walk;
      prankToggle.checked = state.studyAvatar.pranks;
      updateAvatarSoundToggle();
      refreshAvatarMotionControls();
      avatarReminderToggle.checked = state.studyAvatar.reminders;
      avatarReminderTime.value = state.studyAvatar.time;
      avatarReminderTime.disabled = !state.studyAvatar.reminders;
      if (finished || !state.studyAvatar.reminders) dismissAvatarReminder();
      if (avatar.plan > before && allowAvatarRoute() && avatar.zone === 'body' && !avatar.moving) cheerAvatar(1500);
      queueAvatarRoute(950);
      checkAvatarReminder();
    }

    function activateAvatar() {
      state.studyAvatar = avatarSettings(state.studyAvatar);
      avatar.ready = true;
      measureAvatarHeader();
      setAvatarZone('body');
      restoreAvatarPosition();
      avatar.preloaded = Object.values(avatarFrames).flat().map(src => {
        const frame = new Image();
        frame.src = src;
        return frame;
      });
      syncAvatarView();
      setInterval(checkAvatarReminder, 20_000);
    }

    function updateAvatarSoundToggle() {
      const enabled = state.studyAvatar.sound !== false;
      avatarSoundToggle.setAttribute('aria-checked', String(enabled));
      avatarSoundToggle.title = enabled ? 'Avatar ovozi yoqilgan' : 'Avatar ovozi o‘chirilgan';
      if (!enabled) {
        if (queuedEffect?.name.startsWith('avatar')) {
          clearTimeout(effectTimer);
          queuedEffect = effectTimer = undefined;
        }
        if (currentEffectName?.startsWith('avatar')) silenceInterfaceCue();
      }
    }

    avatarSoundToggle.addEventListener('click', () => {
      state.studyAvatar.sound = state.studyAvatar.sound === false;
      if (state.studyAvatar.sound) unlockInterfaceAudio();
      updateAvatarSoundToggle();
      saveState();
    });

    avatarDock.addEventListener('click', () => setAvatarPanel(avatarPanel.hidden));
    document.getElementById('avatar-close-panel').addEventListener('click', () => setAvatarPanel(false, true));
    document.getElementById('avatar-dismiss-reminder').addEventListener('click', () => {
      dismissAvatarReminder();
      avatarDock.focus({ preventScroll: true });
    });
    document.getElementById('avatar-reminder-cta').addEventListener('click', dismissAvatarReminder);
    document.getElementById('avatar-quick-action').addEventListener('click', () => setAvatarPanel(false, true));
    avatarWalkToggle.addEventListener('change', () => {
      state.studyAvatar.walk = avatarWalkToggle.checked;
      saveState();
      if (!state.studyAvatar.walk) avatar.hops = 0;
      queueAvatarRoute(400);
    });
    prankToggle.addEventListener('change', () => {
      state.studyAvatar.pranks = prankToggle.checked;
      prank.nextAt = performance.now() + 2000 + Math.random() * 4500;
      stopAvatarRoute();
      saveState();
      queueAvatarRoute(650);
    });
    avatarReminderToggle.addEventListener('change', () => {
      state.studyAvatar.reminders = avatarReminderToggle.checked;
      avatarReminderTime.disabled = !state.studyAvatar.reminders;
      if (!state.studyAvatar.reminders) dismissAvatarReminder();
      saveState();
    });
    avatarReminderTime.addEventListener('change', () => {
      if (!avatarReminderTime.checkValidity()) return;
      state.studyAvatar.time = avatarReminderTime.value;
      saveState();
    });
    avatarParkour.addEventListener('click', () => {
      if (avatarParkour.disabled) return;
      avatar.hops = 5;
      avatar.combo = 0;
      setAvatarPanel(false, true);
      // Continue from the current position even when the demo is requested mid-route.
      cancelAvatarMotion();
      queueAvatarRoute(220);
    });
    document.addEventListener('keydown', event => {
      if (prank.active && (event.key === 'Escape' || (['Enter', ' ', 'Tab'].includes(event.key) &&
          event.target.closest?.('#app-root, .focus-timer')))) finishAvatarPrank();
      if (event.key === 'Escape' && !avatarPanel.hidden && !getOpenModal()) setAvatarPanel(false, true);
    }, true);
    document.addEventListener('pointerdown', event => {
      if (prank.active && event.target.closest?.('#app-root, .focus-timer')) finishAvatarPrank();
    }, true);
    document.addEventListener('scroll', () => {
      if (prank.active) finishAvatarPrank();
    }, {capture: true, passive: true});
    window.addEventListener('pagehide', saveAvatarPosition);
    window.addEventListener('pageshow', () => { if (avatar.ready) queueAvatarRoute(100); });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) saveAvatarPosition();
      queueAvatarRoute(750);
      checkAvatarReminder();
    });
    window.addEventListener('scroll', () => {
      avatarBrowsingActivity('scroll');
      paintAvatar();
      queueAvatarRoute(700);
    }, { passive: true });
    window.addEventListener('resize', () => {
      if (prank.active) clearAvatarPrank();
      measureAvatarHeader();
      if (avatar.zone === 'header' && avatar.position?.space === 'header' && allowAvatarRoute()) {
        cancelAvatarMotion();
        avatar.position.x = Math.max(25, Math.min(avatar.position.x, innerWidth - 29));
      }
      paintAvatar();
      queueAvatarRoute(750);
    }, { passive: true });
    document.addEventListener('focusin', event => {
      if (event.target.matches?.('textarea, input[type="text"], input[type="search"]')) stopAvatarRoute();
    });
    document.addEventListener('focusout', event => {
      if (event.target.matches?.('textarea, input[type="text"], input[type="search"]')) queueAvatarRoute(650);
    });
    motionPreference.addEventListener('change', syncAvatarView);

    // Boot application with IndexedDB
    initStorage();
