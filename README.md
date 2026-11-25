# Deutsch B1 Platforma

Nemis tilini o‘rganish uchun mahalliy platforma: darslar, lug‘at va fleshkartalar, Pomodoro, o‘qish statistikasi hamda Movie va TV orqali tinglash mashqlari.

## Ishga tushirish

Linux tizimida Python 3 va FFmpeg (`ffmpeg`, `ffprobe`) kerak. Loyiha papkasida `./start.sh` buyrug‘ini bajaring. Brauzerda platforma `http://127.0.0.1:8743/` manzilida ochiladi.

Birinchi ishga tushishda `movie/` papkasi yaratiladi. Shaxsiy `.mkv` va subtitr fayllarini shu yerga qo‘ying. Filmlar, o‘qish profilingiz, zaxiralar va hosil qilingan kesh Git’ga kiritilmaydi.

## Movie uchun ixtiyoriy komponentlar

PGS tasvirli subtitrlari va ovozdan so‘z vaqtlarini aniqlash kerak bo‘lsa, loyiha papkasida `python3 -m pip install --target .speech-runtime/packages av pillow vosk` buyrug‘ini bajaring. So‘z vaqtlarini aniqlash uchun Vosk’ning `vosk-model-small-de-0.15` nemischa modelini `.speech-runtime/vosk-model-small-de-0.15/` ichiga oching. Mavjud o‘rnatmadan `.speech-runtime/` papkasini mos Linux va Python muhitiga ko‘chirish ham mumkin.

[Movie qo‘llanmasi](Movie-qollanma.txt) · [Profil va butun loyihani tiklash](Zaxira-qollanma.txt)
