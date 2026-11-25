# Deutsch B1 · Nemis tilini o‘zbekcha o‘rganish

Bir kuni darsdagi **der Bahnhof** so‘zini o‘rganasiz, ertasi kuni uni kartada takrorlaysiz, keyin esa filmdagi *„Wo ist der Bahnhof?“* jumlasini aktyor ortidan aytib ko‘rasiz. Deutsch B1 shu uch mashqni — **o‘rganish, eslab qolish va gapirishni** — bitta mahalliy platformaga jamlaydi. Natijalaringiz kompyuteringizda saqlanadi.

[**Ishga tushirish**](#ishga-tushirish) · [**Mashq tanlash**](#mashq-tanlash) · [**Movie va TV**](#movie-va-tv) · [**Dars importi**](#dars-importi) · [**Zaxira va tiklash**](#zaxira-va-tiklash) · [**Muammo yechimi**](#muammo-yechimi)

## Ishga tushirish

Linux kompyuterida **Git**, **Python 3** hamda **FFmpeg** (`ffmpeg` va `ffprobe`) kerak. Loyiha papkasini yuklab olgan bo‘lsangiz, faqat uning ichida `./start.sh` buyrug‘ini bajaring. Birinchi marta klonlayotgan bo‘lsangiz:

```bash
git clone https://github.com/drowgone/deutsch-B1-.git Deutsch-B1-Platforma
cd Deutsch-B1-Platforma
./start.sh
```

Brauzerda `http://127.0.0.1:8743/` ochiladi. Birinchi sinov uchun **Darslar** bo‘limiga o‘ting, darsni tanlang va matndan bir jumlani tinglang. Keyin **Kartalar** bo‘limida to‘plamni shu darsga moslang.

<details>
<summary><strong>Terminalni yopgandan keyin ham ishlatish</strong></summary>

Oddiy ishga tushirishda terminal ochiq turadi; serverni to‘xtatish uchun <kbd>Ctrl</kbd> + <kbd>C</kbd> bosing. Terminaldan mustaqil ishlatish uchun boshidan `./start.sh --background` buyrug‘idan foydalaning. Film papkasi va profil bazasi birinchi ishga tushirishda yaratiladi.

</details>

## Mashq tanlash

| Maqsad | Qayerga kirish | Nimadan boshlash |
| --- | --- | --- |
| Bugungi ishni rejalash | **Bosh sahifa → Reja** | O‘quv blokini tanlang. Oddiy taymerda muddatni, Pomodoroda sikllar sonini belgilang. |
| Yangi mavzuni tushunish | **Darslar · Grammatika** | Qoidani misolda ko‘ring, mashqni bajaring, so‘ng dars testida o‘zingizni tekshiring. |
| Unutilayotgan so‘zlarni qaytarish | **Lug‘at → Kartalar** | Takrorlash vaqti kelgan so‘zlarni tanlang. Javobni ko‘rishdan oldin so‘zni ovoz chiqarib ayting. |
| Gap tuzishni mashq qilish | **Kartalar → Gap konstruktori** | O‘zbekcha gapga qarab nemischa so‘zlarni tering. Tartibni tuzatish uchun so‘zni sichqoncha bilan sudrang. |
| Imtihonga tayyorlanish | **Goethe** | Daraja va ko‘nikmani tanlab, o‘qish, tinglash yoki yozish topshirig‘ini bajaring. |
| Talaffuz va ohang ustida ishlash | **Media → Movie** | Dialog ro‘yxatidan bitta jumlani tanlang, tinglang va shu ohangda qaytaring. |

<details>
<summary><strong>Kartani tarjimasidan emas, nemischa ta’rifidan topish</strong></summary>

Kartalar sozlamalarida **Savol tomoni → Nemischa izoh**ni tanlang. Masalan, *„Ein Ort, an dem Züge halten.“* ta’rifidan **der Bahnhof** so‘zini eslang. Til darajasi va qiyinlik filtrlarini birga ishlatishingiz mumkin. **Sevimli so‘zlar** o‘zingiz tanlagan to‘plamni, **Takrorlash vaqti kelgan** esa takrorlash jadvalidagi so‘zlarni ochadi.

</details>

<details>
<summary><strong>Pomodorodagi ⑤ tugmasi nima qiladi?</strong></summary>

Pomodoroda dars qismi **25 daqiqa**. **⑤** ni yoqsangiz, dars yakunida **5 daqiqalik majburiy tanaffus** boshlanadi. Tanaffus tugaganda platformaga qaytishingiz kutiladi. ⑤ o‘chiq bo‘lsa, majburiy tanaffus o‘tkazib yuboriladi. Bosh sahifadagi statistikada **Pomodoro dars vaqti** va **yakunlangan sikllar** alohida ko‘rinadi; tanaffus dars vaqtiga kirmaydi.

</details>

<details>
<summary><strong>Interfeysni o‘zingizga moslash</strong></summary>

Bosh sahifadagi kartalarni joylashtirish va o‘lchamini o‘zgartirish mumkin. Rang rejimini **Tizim**da qoldirsangiz, platforma kompyuterning yorug‘ yoki qorong‘i mavzusiga moslashadi. Avatar sozlamalarida yurish, hazilkash rejim, ovoz va kunlik eslatmalarni alohida boshqarasiz. Nemischa matnni belgilab, o‘ng tugma menyusidan tinglash yoki tarjimani tanlashingiz mumkin.

</details>

## Movie va TV

**Movie** o‘zingizdagi fayllar bilan ishlaydi. **TV** esa internet orqali jonli efirni ochadi va tanlangan kanal, ovoz hamda subtitr sozlamalarini eslab qoladi. GitHub nusxasiga filmlar kiritilmagan.

**Birinchi shadowing mashqi:**

1. Filmni `movie/` papkasiga qo‘ying. Tashqi nemischa subtitr bo‘lsa, masalan, `Beispiel.mkv` yoniga `Beispiel.de.srt`ni joylang.
2. **Media → Movie**ni oching. Server filmni aniqlagach, uni tanlang va **Subtitr treki**ni tekshiring. Film ichidagi subtitrni tanlash yoki **Subtitr ochish** orqali `.srt` / `.vtt` faylini berish mumkin.
3. Dialog qatorini bosing: pleyer shu jumlaga o‘tadi. **Jumlani takrorlash** bilan talaffuzni mashq qiling. Uzunroq parcha uchun boshini **A**, oxirini **B** bilan belgilang.
4. **Ibora + urg‘u** ko‘rinishida butun jumla ekranda qoladi. So‘z vaqt belgilari mavjud bo‘lsa, aytilayotgan so‘z ajralib turadi. Tezlikni pasaytirib mashq qiling, keyin asl tezlikda yana tinglang.

<details>
<summary><strong>So‘z darajasidagi vaqt belgilari va rasmli subtitrlar</strong></summary>

Oddiy SRT ko‘pincha faqat jumlaning boshlanishi va tugashini beradi. **Deutsch · so‘zma-so‘z (avtomatik)** treki esa nemischa audiodan vaqtlarni mahalliy Vosk modeli bilan hisoblaydi. PGS subtitrlari rasm sifatida chiqadi. Bu imkoniyatlar kerak bo‘lsa, loyiha papkasida:

```bash
python3 -m pip install --target .speech-runtime/packages av pillow vosk
```

Vosk’ning `vosk-model-small-de-0.15` modelini alohida olib, `.speech-runtime/vosk-model-small-de-0.15/` ichiga oching. PyAV va Pillow PGS rasmlarini o‘qish uchun, Vosk va nemischa model esa audiodan so‘z vaqtlarini olish uchun ishlatiladi. VLC uchun alohida SRT yaratish buyrug‘i va ijro variantlari [Movie qo‘llanmasida](Movie-qollanma.txt) berilgan.

</details>

## Dars importi

**Dars qo‘shish** oynasida import turini maqsadga qarab tanlang: **Jadval xabaridan import** — butun dars uchun; **Ommaviy so‘zlar (CSV/JSON)** — faqat lug‘at uchun. To‘liq dars JSON’ini lug‘at maydoniga joylamang.

<details>
<summary><strong>Nusxalab import qilish mumkin bo‘lgan dars: «Am Bahnhof»</strong></summary>

Quyidagi namunani **Jadval xabaridan import** maydoniga qo‘ying. `id` berilmasa, platforma keyingi dars raqamini ajratadi. Mavjud `id`ni qayta ishlatsangiz, shu raqamdagi dars yangilanadi.

```json
{
  "level": "A1.2",
  "title": "Am Bahnhof",
  "summary": "Vokzal qayerdaligini so‘rash.",
  "examples": [{ "de": "Wo ist der Bahnhof?", "uz": "Vokzal qayerda?" }],
  "words": [{
    "de": "der Bahnhof",
    "plural": "die Bahnhöfe",
    "uz": "vokzal",
    "meaningDe": "Ein Ort, an dem Züge halten.",
    "difficulty": "oson"
  }],
  "exercises": [{
    "type": "choice",
    "prompt": "Wo ist _____ Bahnhof?",
    "options": ["der", "die", "das"],
    "answers": ["der"]
  }]
}
```

`meaningDe` — kartada ishlatiladigan **nemischa izoh**. `difficulty` uchun `oson`, `o'rta` yoki `qiyin` yozing. Ko‘proq maydonlar kerak bo‘lsa, import oynasidagi **Namuna JSON shablonini ko‘rish** tugmasini bosing.

</details>

## Zaxira va tiklash

Server orqali kirgan brauzerlar o‘qish profilini shu loyihadagi `.platform-data/profile.sqlite3` bazasidan oladi. Boshqa kompyuterda repozitoriyni klonlash kodni olib keladi; **o‘z darslaringiz va natijalaringizni olib o‘tish uchun zaxira kerak**.

| Sizda nima qolgan? | Qaysi nusxa kerak? | Qanday davom etasiz? |
| --- | --- | --- |
| Platforma bor, profil bo‘sh | **Profilni saqlash (.json)** | **Dars qo‘shish → Zaxira nusxa**da faylni tanlang. Tasdiqlanganda joriy profil almashtiriladi. Filmning ijro joyi saqlanadi, film faylining o‘zi JSON’ga kirmaydi. |
| Loyiha papkasi butunlay yo‘qolgan | **Butun loyiha (.tar)** | Arxivni bo‘sh papkada ochib, ichidagi `Deutsch-B1-Platforma/start.sh`ni ishga tushiring. Profil, mahalliy filmlar va mavjud nutq modeli birga qaytadi. |

<details>
<summary><strong>Terminaldan to‘liq nusxa olish va yaxlitligini tekshirish</strong></summary>

Loyiha papkasida bajaring. Birinchi buyruq serverga saqlangan so‘nggi holatni oladi; ochiq ekrandagi ayni holat uchun brauzerdagi zaxira tugmasidan foydalaning.

```bash
backup="../Deutsch-B1-$(date +%Y%m%d-%H%M%S).tar"
./start.sh --backup "$backup"
./start.sh --verify-backup "$backup"
```

Arxivni loyiha papkasidan tashqarida saqlang. Disk buzilganda ham tiklay olish uchun uni boshqa diskka ko‘chiring. [Tiklash bo‘yicha to‘liq yo‘riqnoma →](Zaxira-qollanma.txt)

</details>

## Muammo yechimi

<details>
<summary><strong>Boshqa brauzerda natijalarim yo‘q</strong></summary>

Ikkala brauzerda ham `./start.sh` ochadigan `http://127.0.0.1:8743/` manzilidan foydalaning. `index.html`ni fayl sifatida ochgan bo‘lsangiz, eski brauzerdan JSON zaxira oling, so‘ng uni server manzilida tiklang.

</details>

<details>
<summary><strong>Film ro‘yxatda yo‘q yoki subtitr ko‘rinmayapti</strong></summary>

Fayl nusxalanishi tugaganini va `.mkv` bevosita `movie/` ichida ekanini tekshiring. Film ochilsa-yu, yozuv chiqmasa, **Subtitr treki**dan nemischa trekni tanlang va **Birinchi jumla** bilan kirishdagi sukutni o‘tkazing. Tashqi subtitr bo‘lsa, **Subtitr ochish** orqali filmga biriktiring.

</details>

<details>
<summary><strong>Qaysi klaviatura tugmalari ishlaydi?</strong></summary>

| Qayerda | Tugma | Amal |
| --- | --- | --- |
| Platformada | <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd> | Qidiruv |
| Platformada | <kbd>?</kbd> | Yordam |
| Movie pleyerida | <kbd>Space</kbd> yoki <kbd>K</kbd> | Ijro / pauza |
| Movie pleyerida | <kbd>←</kbd> / <kbd>→</kbd> | 10 soniya orqaga / oldinga |
| Movie pleyerida | <kbd>F</kbd> · <kbd>C</kbd> · <kbd>M</kbd> | To‘liq ekran · subtitr · ovozni o‘chirish/yoqish |

Pleyer tugmalari ishlashi uchun fokus video qismida bo‘lsin. Matn kiritish maydonida ular yozayotgan matningizga ta’sir qilmaydi.

</details>

## Kod xaritasi

| Qaysi qismni o‘zgartirmoqchisiz? | Boshlash uchun fayllar |
| --- | --- |
| Sahifa, darslar va mashqlar | [index.html](index.html) · [platforma.js](assets/platforma.js) · [platforma.css](assets/platforma.css) |
| Kartalar joylashuvi va o‘qish statistikasi | [dashboard-layout.js](assets/dashboard-layout.js) · [study-stats.js](assets/study-stats.js) |
| Movie, TV va subtitrlar | [movie.js](assets/movie.js) · [live-tv.js](assets/live-tv.js) · [movie_tracks.py](movie_tracks.py) · [movie_words.py](movie_words.py) |
| Mahalliy server, profil va zaxira | [movie_server.py](movie_server.py) · [platform_profile.py](platform_profile.py) · [profile-sync.js](assets/profile-sync.js) · [project_backup.py](project_backup.py) |

[↑ Ishga tushirishga qaytish](#ishga-tushirish)
