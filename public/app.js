document.addEventListener('DOMContentLoaded', function () {

    // --- AI Configuration ---
    let geminiApiKey = localStorage.getItem('geminiApiKey') || '';

    // --- Data & Constants ---
    const studentList = ["ADITYA", "AMIRA", "ANISA", "ANDARA", "BUMI", "IHSAN", "KHANSA", "KOKO", "NAJWA", "NAJWA AULIA", "DEVAN", "RAFIF", "RINI", "SYA", "SYAKIRA", "HASHIFAH", "HELKA", "AFNAL", "WAWA", "PRAYATA QAISER", "ZHILAN", "ZAKI", "NAQUEEN", "TRISTAN", "NABILA"].sort();
    const classList = ["Kelas 7", "Kelas 8", "Kelas 9", "Kelas 10", "Kelas 11"];
    const pretestQuestions = [{
        q: "1. At school, we do experiments in the science __________.",
        o: ["Market", "Laboratory", "Hospital", "Station"]
    }, {
        q: "2. My mother always __________ fresh vegetables at the market for our dinner at home.",
        o: ["Buys", "Sells", "Sleeps", "Drives"]
    }, {
        q: "3. The Borobudur Temple is a __________ building in Indonesia, visited by many tourists every year.",
        o: ["Modern", "Famous", "Fresh", "Young"]
    }, {
        q: "4. The fried rice cooked by my mother tastes very __________. I really enjoy it.",
        o: ["Sour", "Tasty", "Ugly", "Bitter"]
    }, {
        q: "5. A __________ fixes cars and motorcycles in the workshop.",
        o: ["Mechanic", "Farmer", "Teacher", "Pilot"]
    }, {
        q: "6. The nurse gives medicine to the sick __________ lying in the hospital bed.",
        o: ["Patient", "Student", "Visitor", "Farmer"]
    }, {
        q: "7. We borrow storybooks from the school __________ every week.",
        o: ["Library", "Kitchen", "Market", "Canteen"]
    }, {
        q: "8. My grandfather still uses an __________ radio at home. It is very old.",
        o: ["Ancient", "Delicious", "Fresh", "New"]
    }, {
        q: "9. Soldiers work hard to __________ their country from enemies.",
        o: ["Defend", "Destroy", "Break", "Ignore"]
    }, {
        q: "10. The bus is very __________; it arrives in only five minutes.",
        o: ["Quick", "Weak", "Late", "Slow"]
    }, {
        q: "11. My grandfather is 80 years old; he is not __________ anymore.",
        o: ["Young", "Tall", "Small", "Baby"]
    }, {
        q: "12. The teacher tells us to __________ our homework after lunch so we can study together.",
        o: ["Start", "Cancel", "Forget", "Ignore"]
    }, {
        q: "13. The library is so quiet; it is not __________ at all.",
        o: ["Noisy", "Crowded", "Busy", "Loud"]
    }, {
        q: "14. The roses in front of the class look very __________. They are beautiful.",
        o: ["Pretty", "Dirty", "Ugly", "Bad"]
    }, {
        q: "15. The quiz feels __________ for many students. They finish quickly.",
        o: ["Easy", "Hard", "Weak", "Strong"]
    }, {
        q: "16. The rabbit has very long __________ on its head.",
        o: ["Ears", "Legs", "Eyes", "Teeth"]
    }, {
        q: "17. We put the water in the fridge if we want it __________ to drink.",
        o: ["Cold", "Hot", "Warm", "Big"]
    }, {
        q: "18. I usually walk to school with my best __________, my closest companion.",
        o: ["Friend", "Enemy", "Visitor", "Stranger"]
    }, {
        q: "19. We reach the classroom after the bell; we are not __________.",
        o: ["Early", "Soon", "After", "Now"]
    }, {
        q: "20. Dita solves math problems quickly; she is very __________ in class.",
        o: ["Bright", "Lazy", "Slow", "Weak"]
    }, {
        q: "21. My brother is very __________. He is not short.",
        o: ["Tall", "Small", "Big", "Thin"]
    }, {
        q: "22. We go to the __________ to buy medicine. It sells drugs legally.",
        o: ["Pharmacy", "Library", "Station", "Market"]
    }, {
        q: "23. The sky is full of twinkling __________ at night.",
        o: ["Stars", "Clouds", "Sand", "Trees"]
    }, {
        q: "24. A person who drives a car every day is called a __________.",
        o: ["Farmer", "Teacher", "Driver", "Pilot"]
    }, {
        q: "25. That mountain is very __________; it is hard to climb.",
        o: ["High", "Low", "Short", "Flat"]
    }, {
        q: "26. My shoes are very __________. They cost a lot of money.",
        o: ["Expensive", "Small", "Dirty", "Weak"]
    }, {
        q: "27. The cheetah is the __________ animal on land. It can run up to 100 km/h.",
        o: ["Fastest", "Slowest", "Heaviest", "Strongest"]
    }, {
        q: "28. She cries all day because she is very __________.",
        o: ["Sad", "Clever", "Smart", "Tall"]
    }, {
        q: "29. Please __________ the window, it is too hot inside.",
        o: ["Open", "Close", "Lock", "Break"]
    }, {
        q: "30. The farmer grows __________ on his farm, which is the main food in Asia.",
        o: ["Rice", "Corn", "Wheat", "Potato"]
    }];
    const posttestQuestions = [
        { q: "1. I usually buy pens and notebooks in the __________ near my school.", o: ["Stationery shop", "Garage", "Kitchen", "Garden"] },
        { q: "2. My father goes to the __________ when he feels very sick.", o: ["Hospital", "Market", "Mosque", "Station"] },
        { q: "3. Mount Merapi is an __________ volcano in Central Java, because it erupts regularly.", o: ["Active", "Silent", "Modern", "Young"] },
        { q: "4. The cake from the bakery tastes very __________. I love the flavor.", o: ["Delicious", "Sour", "Ugly", "Bitter"] },
        { q: "5. A __________ controls and flies an airplane safely.", o: ["Pilot", "Teacher", "Driver", "Farmer"] },
        { q: "6. We buy medicine at the __________ near the bus stop.", o: ["Pharmacy", "Canteen", "Market", "School"] },
        { q: "7. My grandmother likes to wear a very __________ dress at parties, with the latest fashion style.", o: ["Modern", "Old", "Fresh", "Dirty"] },
        { q: "8. Policemen work hard to __________ people in the city from criminal like thief.", o: ["Protect", "Break", "Destroy", "Ignore"] },
        { q: "9. The train is very __________; it comes earlier than expected.", o: ["Rapid", "Slow", "Weak", "Late"] },
        { q: "10. My shoes are very __________. They are too small for me.", o: ["Tight", "Expensive", "Big", "Long"] },
        { q: "11. A person who takes care of our teeth is a __________.", o: ["Dentist", "Pilot", "Farmer", "Teacher"] },
        { q: "12. The children sing Rock and Rolls __________ in the classroom.", o: ["Songs", "Books", "Games", "Pictures"] },
        { q: "13. My friends play __________ at the field every Saturday afternoon.", o: ["Football", "Books", "Rice", "Songs"] },
        { q: "14. My family have __________ together every morning before school.", o: ["Breakfast", "Dinner", "Medicine", "Homework"] },
        { q: "15. My cousin plays __________ on the guitar every weekend.", o: ["Music", "Books", "Football", "Rice"] },
        { q: "16. The moon __________ at night and shines brightly.", o: ["Glows", "Sleeps", "Jumps", "Eats"] },
        { q: "17. My brother often goes to the __________ for a holiday in Hawaii.", o: ["Beach", "Stationery", "School", "Kitchen"] },
        { q: "18. Please __________ the door, it is very noisy outside.", o: ["Close", "Open", "Break", "Push"] },
        { q: "19. She gives a __________ to her father for father’s day .", o: ["Wallet", "Email", "Plate", "Soap"] },
        { q: "20. These shoes are not expensive; they are very __________.", o: ["Cheap", "Big", "Strong", "Tall"] },
        { q: "21. After we eat, we usually __________ our homework.", o: ["Begin", "Finish", "Cancel", "Forget"] },
        { q: "22. The students look very __________ because many of them fail the exam.", o: ["Sad", "Joyful", "Cheerful", "Excited"] },
        { q: "23. Ani always gets high scores in math. She is very __________.", o: ["Smart", "Weak", "Lazy", "Fool"] },
        { q: "24. The cheetah runs very __________ across the field. It is the fastest land animal.", o: ["Speedy", "Slow", "Weak", "Long"] },
        { q: "25. We arrive at school very __________. The class has already started.", o: ["Late", "Soon", "After", "Now"] },
        { q: "26. The park near my house is full of __________ flowers.", o: ["Beautiful", "Ugly", "Dirty", "Bad"] },
        { q: "27. Please __________ the window, it is still open and very noisy outside.", o: ["Close", "Push", "Break", "Open"] },
        { q: "28. The new student faces many __________ in his first week.", o: ["Challenges", "Friends", "Games", "Rewards"] },
        { q: "29. The elephant is very __________. It weighs several tons.", o: ["Huge", "Small", "Thin", "Short"] },
        { q: "30. A person who writes news articles in a newspaper is called a __________.", o: ["Journalist", "Teacher", "Pilot", "Singer"] }
    ];
    const motivationQuestions = {
        'A': {
            title_id: "Motivasi dari Diri Sendiri",
            title_en: "Motivation from Oneself",
            questions: [{
                id: 1,
                text_id: "Saya belajar Bahasa Inggris karena saya suka dan menikmatinya.",
                text_en: "I study English because I like and enjoy it."
            }, {
                id: 2,
                text_id: "Saya merasa bangga dan puas kalau bisa belajar Bahasa Inggris dengan baik.",
                text_en: "I feel proud and satisfied if I can learn English well."
            }, {
                id: 3,
                text_id: "Saya merasa senang saat berhasil memahami pelajaran Bahasa Inggris.",
                text_en: "I feel happy when I succeed in understanding English lessons."
            }]
        },
        'B': {
            title_id: "Motivasi karena Tujuan Pribadi",
            title_en: "Motivation for Personal Goals",
            questions: [{
                id: 4,
                text_id: "Saya belajar Bahasa Inggris karena saya tahu itu bermanfaat untuk masa depan.",
                text_en: "I study English because I know it is beneficial for the future."
            }, {
                id: 5,
                text_id: "Saya belajar Bahasa Inggris supaya nilai saya di sekolah lebih bagus.",
                text_en: "I study English to get better grades at school."
            }, {
                id: 6,
                text_id: "Saya belajar Bahasa Inggris karena penting untuk meraih cita-cita saya.",
                text_en: "I study English because it is important for achieving my goals."
            }]
        },
        'C': {
            title_id: "Motivasi karena Dorongan Luar",
            title_en: "Motivation from External Encouragement",
            questions: [{
                id: 7,
                text_id: "Saya belajar Bahasa Inggris karena disuruh orang tua atau guru.",
                text_en: "I study English because my parents or teacher told me to."
            }, {
                id: 8,
                text_id: "Saya belajar Bahasa Inggris supaya mendapatkan nilai yang tinggi.",
                text_en: "I study English to get high scores."
            }, {
                id: 9,
                text_id: "Saya belajar Bahasa Inggris agar tidak dimarahi guru atau orang tua.",
                text_en: "I study English so I won't be scolded by my teacher or parents."
            }]
        },
        'D': {
            title_id: "Tidak Ada Motivasi",
            title_en: "No Motivation",
            questions: [{
                id: 10,
                text_id: "Saya tidak tahu kenapa saya harus belajar Bahasa Inggris.",
                text_en: "I don't know why I have to study English."
            }, {
                id: 11,
                text_id: "Saya merasa belajar Bahasa Inggris tidak ada gunanya untuk saya.",
                text_en: "I feel that studying English is useless for me."
            }, {
                id: 12,
                text_id: "Kadang saya belajar Bahasa Inggris tanpa alasan yang jelas.",
                text_en: "Sometimes I study English for no clear reason."
            }]
        }
    };
    const intensityQuestions = {
        'A': {
            title_id: "Frekuensi Penggunaan",
            title_en: "Frequency of Use",
            questions: [
                { id: 1, text_id: "Saya menggunakan aplikasi Duolingo hampir setiap hari.", text_en: "I use the Duolingo app almost every day." },
                { id: 2, text_id: "Dalam seminggu, saya membuka Duolingo lebih dari 3 kali.", text_en: "In a week, I open Duolingo more than 3 times." },
                { id: 3, text_id: "Saya lebih sering menggunakan Duolingo dibanding aplikasi belajar lain.", text_en: "I use Duolingo more often than other learning apps." }
            ]
        },
        'B': {
            title_id: "Durasi Penggunaan",
            title_en: "Duration of Use",
            questions: [
                { id: 4, text_id: "Sekali belajar dengan Duolingo, saya biasanya belajar lebih dari 15 menit.", text_en: "When I study with Duolingo, I usually study for more than 15 minutes." },
                { id: 5, text_id: "Waktu belajar dengan Duolingo terasa cukup lama untuk menambah kosakata.", text_en: "The study time with Duolingo feels long enough to add vocabulary." },
                { id: 6, text_id: "Saya sering menggunakan Duolingo lebih dari satu kali dalam sehari.", text_en: "I often use Duolingo more than once a day." }
            ]
        },
        'C': {
            title_id: "Konsistensi Penggunaan",
            title_en: "Consistency of Use",
            questions: [
                { id: 7, text_id: "Saya menggunakan Duolingo secara teratur sesuai jadwal yang saya buat.", text_en: "I use Duolingo regularly according to the schedule I made." },
                { id: 8, text_id: "Saya jarang melewatkan hari tanpa membuka aplikasi Duolingo.", text_en: "I rarely miss a day without opening the Duolingo app." },
                { id: 9, text_id: "Saya tetap menggunakan Duolingo meskipun banyak tugas sekolah.", text_en: "I keep using Duolingo even with a lot of school homework." }
            ]
        },
        'D': {
            title_id: "Fokus dan Keterlibatan",
            title_en: "Focus and Engagement",
            questions: [
                { id: 10, text_id: "Saat menggunakan Duolingo, saya fokus memperhatikan latihan kosakata.", text_en: "When using Duolingo, I focus on paying attention to vocabulary exercises." },
                { id: 11, text_id: "Saya termotivasi untuk menyelesaikan target harian di Duolingo.", text_en: "I am motivated to complete the daily target on Duolingo." },
                { id: 12, text_id: "Saya berusaha menjaga streak (hari berturut-turut) saat menggunakan Duolingo.", text_en: "I try to maintain my streak (consecutive days) when using Duolingo." }
            ]
        }
    };
    const unitData = {
        1: {
            title: {
                id: "UNIT 1: Orientasi & Pengaturan Duolingo",
                en: "UNIT 1: Orientation & Duolingo Setup 🧠"
            },
            description: {
                id: "Di unit ini, kita akan berkenalan dengan kelas dan menyiapkan akun Duolingo.",
                en: "In this unit, we will get to know the class and set up a Duolingo account."
            },
            vocab: [{
                en: "Account",
                id: "Akun",
                icon: "👤"
            }, {
                en: "Username",
                id: "Nama Pengguna",
                icon: "💬"
            }, {
                en: "Streak",
                id: "Runtunan",
                icon: "🔥"
            }, {
                en: "Lesson",
                id: "Pelajaran",
                icon: "📚"
            }],
            singAlong: [{
                id: "Nyanyikan lagu 'A million dreams - The Greatest Showman'",
                en: "Sing the song 'A million dreams - The Greatest Showman'",
                videoId: "Sr3X0DCXI-M"
            }],
            dialogue: [{
                speaker: "Tutor",
                text: "Hi, everyone! Welcome to the class. First, let's set up your Duolingo account. Do you have a smartphone?"
            }, {
                speaker: "Student",
                text: "Yes, I do. I've heard about Duolingo but I've never used it."
            }, {
                speaker: "Tutor",
                text: "Great! Please download it from the app store and create a new account. You can sign up with Google or Facebook to make it faster."
            }, {
                speaker: "Student",
                text: "Okay, I'm creating my account now. What should I choose for the daily goal?"
            }, {
                speaker: "Tutor",
                text: "I recommend starting with the 'Regular' goal, which is about 10 minutes a day. The most important thing is to be consistent and maintain your streak! Now, let's find each other. What's your username?"
            }],
            duolingoPlay: [{
                id: "Ikuti akun Duolingo guru (@fadlyzaki).",
                en: "Follow the teacher's Duolingo account (@fadlyzaki)."
            }, {
                id: "Bergabung dengan kelas Duolingo for Schools (kode: wuyzyz).",
                en: "Join the Duolingo for Schools classroom (code: wuyzyz)."
            }, {
                id: "Selesaikan setup akun Duolingo Anda.",
                en: "Finish setting up your Duolingo account."
            }],
            interview: [{
                id: "Apa nama pengguna Duolingo-mu?",
                en: "What is your Duolingo username?"
            }, {
                id: "Mengapa kamu ingin belajar Bahasa Inggris?",
                en: "Why do you want to learn English?"
            }]
        },
        2: {
            title: {
                id: "UNIT 2: Perkenalan Diri",
                en: "UNIT 2: Introducing Myself 🙋‍♀️"
            },
            description: {
                id: "Mari belajar cara memperkenalkan diri, termasuk nama, hobi, dan hal-hal favoritmu.",
                en: "Let's learn how to introduce yourself, including your name, hobbies, and favorite things."
            },
            vocab: [{
                en: "Name",
                id: "Nama",
                icon: "🏷️"
            }, {
                en: "Hobby",
                id: "Hobi",
                icon: "🎨"
            }, {
                en: "Live",
                id: "Tinggal",
                icon: "🏠"
            }, {
                en: "Favorite",
                id: "Favorit",
                icon: "❤️"
            }],
            singAlong: [{
                id: "Nyanyikan lagu 'A million dreams - The Greatest Showman'",
                en: "Sing the song 'A million dreams - The Greatest Showman'",
                videoId: "Sr3X0DCXI-M"
            }],
            dialogue: [{
                speaker: "Alex",
                text: "Hi! My name is Alex. What's your name?"
            }, {
                speaker: "Student",
                text: "Hello, Alex. I'm Bella. It's a pleasure to meet you."
            }, {
                speaker: "Alex",
                text: "Nice to meet you too, Bella. Where do you live?"
            }, {
                speaker: "Student",
                text: "I live in Jakarta. My hobby is reading comics and watching sci-fi movies. What about you?"
            }],
            duolingoPlay: [{
                id: "Dapatkan minimal 10 XP di Duolingo.",
                en: "Earn a minimum of 10 XP on Duolingo."
            }],
            interview: [{
                id: "Siapa nama lengkapmu?",
                en: "What is your full name?"
            }, {
                id: "Apa hobimu?",
                en: "What is your hobby?"
            }, {
                id: "Apa makanan favoritmu?",
                en: "What is your favorite food?"
            }]
        },
        3: {
            title: {
                id: "UNIT 3: Rutinitas Harian",
                en: "UNIT 3: Daily Routines ☀️"
            },
            description: {
                id: "Membicarakan kegiatan sehari-hari, dari pagi hingga malam.",
                en: "Talking about daily activities, from morning to night."
            },
            vocab: [{
                en: "Wake up",
                id: "Bangun",
                icon: "⏰"
            }, {
                en: "Breakfast",
                id: "Sarapan",
                icon: "🍳"
            }, {
                en: "Go to school",
                id: "Pergi sekolah",
                icon: "🎒"
            }, {
                en: "Sleep",
                id: "Tidur",
                icon: "😴"
            }],
            singAlong: [{
                id: "Nyanyikan lagu 'Count on Me - Bruno Mars'",
                en: "Sing the song 'Count on Me - Bruno Mars'",
                videoId: "6k8cpUkKK4c"
            }],
            dialogue: [{
                speaker: "Chris",
                text: "What time do you usually wake up on weekdays?"
            }, {
                speaker: "Student",
                text: "I usually wake up at 6 AM. I have to get ready for school. Then I have breakfast with my family."
            }, {
                speaker: "Chris",
                text: "What do you usually eat for breakfast?"
            }],
            duolingoPlay: [{
                id: "Dapatkan minimal 10 XP di Duolingo.",
                en: "Earn a minimum of 10 XP on Duolingo."
            }],
            interview: [{
                id: "Jam berapa kamu bangun?",
                en: "What time do you wake up?"
            }, {
                id: "Apa yang kamu lakukan di malam hari?",
                en: "What do you do in the evening?"
            }]
        },
        4: {
            title: {
                id: "UNIT 4: Kehidupan Sekolah",
                en: "UNIT 4: School Life 🏫"
            },
            description: {
                id: "Berbagi cerita tentang kehidupan di sekolah.",
                en: "Sharing stories about school life."
            },
            vocab: [{
                en: "Subject",
                id: "Mata Pelajaran",
                icon: "🔬"
            }, {
                en: "Teacher",
                id: "Guru",
                icon: "👩‍🏫"
            }, {
                en: "Homework",
                id: "Pekerjaan Rumah",
                icon: "📝"
            }, {
                en: "Friend",
                id: "Teman",
                icon: "🧑‍🤝‍🧑"
            }],
            singAlong: [{
                id: "Nyanyikan lagu 'Count on Me - Bruno Mars'",
                en: "Sing the song 'Count on Me - Bruno Mars'",
                videoId: "6k8cpUkKK4c"
            }],
            dialogue: [{
                speaker: "Evan",
                text: "Hey Fara, how's it going? What is your favorite subject at school?"
            }, {
                speaker: "Student",
                text: "Hi Evan! I'm doing well, thanks. I love Math! I know it's hard for some people, but I find it challenging and fun. How about you?"
            }],
            duolingoPlay: [{
                id: "Dapatkan minimal 10 XP di Duolingo.",
                en: "Earn a minimum of 10 XP on Duolingo."
            }],
            interview: [{
                id: "Apa mata pelajaran favoritmu?",
                en: "What's your favorite subject?"
            }, {
                id: "Siapa teman baikmu di sekolah?",
                en: "Who is your best friend at school?"
            }]
        },
        5: {
            title: {
                id: "UNIT 5: Makanan & Minuman",
                en: "UNIT 5: Food & Drinks 🍔"
            },
            description: {
                id: "Belajar memesan makanan dan minuman.",
                en: "Learning to order food and drinks."
            },
            vocab: [{
                en: "Order",
                id: "Memesan",
                icon: "🧾"
            }, {
                en: "Drink",
                id: "Minuman",
                icon: "🥤"
            }, {
                en: "Delicious",
                id: "Lezat",
                icon: "😋"
            }, {
                en: "Spicy",
                id: "Pedas",
                icon: "🌶️"
            }],
            singAlong: [{
                id: "Nyanyikan lagu 'Perfect - Ed Sheeran'",
                en: "Sing the song 'Perfect - Ed Sheeran'",
                videoId: "cNGjD0VG4R8"
            }],
            dialogue: [{
                speaker: "Waiter",
                text: "Good evening, welcome to our restaurant! Here is the menu. Are you ready to order?"
            }, {
                speaker: "Student",
                text: "Good evening. Everything looks so good. What do you recommend?"
            }],
            duolingoPlay: [{
                id: "Dapatkan minimal 10 XP di Duolingo.",
                en: "Earn a minimum of 10 XP on Duolingo."
            }],
            interview: [{
                id: "Apa makanan Indonesia favoritmu?",
                en: "What's your favorite Indonesian food?"
            }, {
                id: "Apakah kamu suka makanan pedas?",
                en: "Do you like spicy food?"
            }]
        },
        6: {
            title: {
                id: "UNIT 6: Hobi & Waktu Luang",
                en: "UNIT 6: Hobbies & Free Time 🎮"
            },
            description: {
                id: "Berbagi tentang hobi dan kegiatan di waktu luang.",
                en: "Sharing about hobbies and free time activities."
            },
            vocab: [{
                en: "Play games",
                id: "Bermain game",
                icon: "🕹️"
            }, {
                en: "Read books",
                id: "Membaca buku",
                icon: "📖"
            }, {
                en: "Listen to music",
                id: "Mendengar musik",
                icon: "🎧"
            }, {
                en: "Watch movies",
                id: "Menonton film",
                icon: "🎬"
            }],
            singAlong: [{
                id: "Nyanyikan lagu 'Perfect - Ed Sheeran'",
                en: "Sing the song 'Perfect - Ed Sheeran'",
                videoId: "cNGjD0VG4R8"
            }],
            dialogue: [{
                speaker: "Hans",
                text: "What do you usually do in your free time, Ina?"
            }, {
                speaker: "Student",
                text: "On weekends, I usually listen to music and read books. It's very relaxing."
            }],
            duolingoPlay: [{
                id: "Dapatkan minimal 10 XP di Duolingo.",
                en: "Earn a minimum of 10 XP on Duolingo."
            }],
            interview: [{
                id: "Apa hobimu?",
                en: "What is your hobby?"
            }, {
                id: "Seberapa sering kamu melakukan hobimu?",
                en: "How often do you do your hobby?"
            }]
        },
        7: {
            title: {
                id: "UNIT 7: Tempat di Kota",
                en: "UNIT 7: Places in Town 🏛️"
            },
            description: {
                id: "Belajar nama-nama tempat di kota dan menanyakan arah.",
                en: "Learning names of places in town and asking for directions."
            },
            vocab: [{
                en: "Bank",
                id: "Bank",
                icon: "🏦"
            }, {
                en: "Library",
                id: "Perpustakaan",
                icon: "📚"
            }, {
                en: "Post office",
                id: "Kantor pos",
                icon: "✉️"
            }, {
                en: "Hospital",
                id: "Rumah sakit",
                icon: "🏥"
            }],
            singAlong: [{
                id: "Nyanyikan lagu 'Fight song - Rachel Platten'",
                en: "Sing the song 'Fight song - Rachel Platten'",
                videoId: "XbxNtPiCBK8"
            }],
            dialogue: [{
                speaker: "Tourist",
                text: "Excuse me, I'm a bit lost. Can you tell me where the nearest bank is?"
            }, {
                speaker: "Student",
                text: "Of course. Go straight ahead on this street and turn left at the big traffic light. You will see a park."
            }],
            duolingoPlay: [{
                id: "Dapatkan minimal 10 XP di Duolingo.",
                en: "Earn a minimum of 10 XP on Duolingo."
            }],
            interview: [{
                id: "Ke mana kamu biasa pergi di akhir pekan?",
                en: "Where do you usually go on weekends?"
            }, {
                id: "Apakah ada perpustakaan di dekat rumahmu?",
                en: "Is there a library near your house?"
            }]
        },
        8: {
            title: {
                id: "UNIT 8: Ulasan & Perpisahan",
                en: "UNIT 8: Review & Farewell 👋"
            },
            description: {
                id: "Mengulang apa yang telah dipelajari dan mengucapkan salam perpisahan.",
                en: "Reviewing what we've learned and saying goodbye."
            },
            vocab: [{
                en: "Review",
                id: "Ulasan",
                icon: "🔄"
            }, {
                en: "Learn",
                id: "Belajar",
                icon: "💡"
            }, {
                en: "Practice",
                id: "Berlatih",
                icon: "🗣️"
            }, {
                en: "Goodbye",
                id: "Selamat tinggal",
                icon: "👋"
            }],
            singAlong: [{
                id: "Nyanyikan lagu 'Fight song - Rachel Platten'",
                en: "Sing the song 'Fight song - Rachel Platten'",
                videoId: "XbxNtPiCBK8"
            }],
            dialogue: [{
                speaker: "Tutor",
                text: "Well everyone, this is our last session. So, what have you learned in this program?"
            }, {
                speaker: "Student",
                text: "I learned so much! I was shy before, but now I can introduce myself and order food confidently."
            }],
            duolingoPlay: [{
                id: "Dapatkan minimal 10 XP di Duolingo.",
                en: "Earn a minimum of 10 XP on Duolingo."
            }],
            interview: [{
                id: "Unit mana yang jadi favoritmu?",
                en: "What was your favorite unit?"
            }, {
                id: "Apa yang akan kamu lakukan untuk terus berlatih?",
                en: "What will you do to keep practicing?"
            }]
        }
    };
    const appState = {
        currentView: 'home',
        studentId: null,
        studentClass: null,
        ratings: {},
        trackerData: Array(8).fill(null).map(() => ({
            xp: 0,
            streak: 0
        }))
    };

    // --- DOM Elements ---
    const mainContent = document.querySelector('.main-content');
    const toast = document.getElementById('toast');

    /**
 * Sends a data payload to Firestore.
 * @param {object} payload The data object to send.
 * @param {HTMLButtonElement} [button] The button element for UI feedback.
 * @param {Function} [onSuccessCallback] A function to run on successful save.
 */
    function sendDataToFirestore(payload, button, onSuccessCallback) {
        const fb = window.__fb || {};
        const { db, serverTimestamp, addDoc, collection, doc, setDoc } = fb;

        if (!db) {
            // Offline fallback / graceful degradation when running locally via file://
            console.log("Firestore not initialized. Falling back to memory/local storage simulation.");

            if (!appState.studentId && !payload.type.startsWith("teacher") && payload.type !== 'preTestData' && payload.type !== 'postTestData' && payload.type !== 'motivationData' && payload.type !== 'intensityData') {
                showToast("Harap pilih nama dan kelas Anda terlebih dahulu. / Please select your name and class first.", true);
                renderView("home");
                if (button) {
                    button.disabled = false;
                    button.classList.remove("opacity-50");
                }
                return;
            }

            try {
                // Keep progress in localStorage just in case, though the app doesn't load it back
                const localKey = `workbook_offline_${appState.studentId}_${payload.type}`;
                let existing = JSON.parse(localStorage.getItem(localKey) || "{}");
                if (payload.type === 'unitData' && payload.section) {
                    existing[payload.section] = payload.data;
                    localStorage.setItem(localKey, JSON.stringify(existing));
                } else {
                    localStorage.setItem(localKey, JSON.stringify(payload.data));
                }
            } catch (e) {
                console.warn("localStorage fallback failed.", e);
            }

            if (!button) {
                console.log("Autosave offline successful.");
            } else {
                showToast("Disimpan (Offline Mode). / Saved (Offline).");
            }
            if (onSuccessCallback) onSuccessCallback();

            if (button) {
                button.disabled = false;
                button.classList.remove("opacity-50");
            }
            return;
        }

        if (!appState.studentId && !payload.type.startsWith("teacher") && payload.type !== 'preTestData' && payload.type !== 'postTestData' && payload.type !== 'motivationData' && payload.type !== 'intensityData') {
            showToast("Harap pilih nama dan kelas Anda terlebih dahulu. / Please select your name and class first.", true);
            renderView("home");
            if (button) {
                button.disabled = false;
                button.classList.remove("opacity-50");
            }
            return;
        }

        let originalTextEl, originalText;
        if (button) {
            button.disabled = true;
            button.classList.add("opacity-50");
            originalTextEl = button.querySelector("span:last-child");
            originalText = originalTextEl ? originalTextEl.innerHTML : button.textContent;
            if (originalTextEl) {
                originalTextEl.innerHTML = `<span class="lang-id">Mengirim...</span><span class="lang-en">Sending...</span>`;
            } else {
                button.textContent = "Mengirim... / Sending...";
            }
        }

        const writes = [];
        try {
            if (payload.type === "teacherReport") {
                const rows = Array.isArray(payload.data) ? payload.data : [];
                rows.forEach(row => {
                    const docData = {
                        ts: serverTimestamp(),
                        studentName: (row.studentName ?? "").toString(),
                        studentClass: (row.studentClass ?? "").toString(),
                        unit: (row.unit ?? "").toString(),
                        activity: (row.activity ?? "").toString(),
                        xp: Number.isFinite(+row.xp) ? +row.xp : 0,
                        streak: Number.isFinite(+row.streak) ? +row.streak : 0,
                        grade: Number.isFinite(+row.grade) ? +row.grade : 0,
                        comments: (row.comments ?? "").toString(),
                    };
                    writes.push(addDoc(collection(db, "teacherReports"), docData));
                }
                );
            } else if (payload.type === "teacherScores") {
                const rows = Array.isArray(payload.data) ? payload.data : [];
                rows.forEach(row => {
                    const docData = {
                        ts: serverTimestamp(),
                        studentName: (row.studentName ?? "").toString(),
                        studentClass: (row.studentClass ?? "").toString(),
                        type: (row.type ?? "").toString(),
                        score: Number.isFinite(+row.score) ? +row.score : 0,
                        comments: (row.comments ?? "").toString(),
                    };
                    writes.push(addDoc(collection(db, "teacherScores"), docData));
                }
                );
            } else if (payload.type === "teacherObservation") { // New payload type
                const docData = {
                    ...payload.data,
                    ts: serverTimestamp()
                };
                writes.push(addDoc(collection(db, "teacherObservations"), docData));
            } else if (payload.type === "trackerData") {
                const snapshotDoc = {
                    ts: serverTimestamp(),
                    studentId: appState.studentId,
                    studentClass: appState.studentClass,
                    sessions: Array.isArray(payload.data) ? payload.data.map(s => ({
                        session: (s.session ?? "").toString(),
                        xp: Number.isFinite(+s.xp) ? +s.xp : 0,
                        streak: Number.isFinite(+s.streak) ? +s.streak : 0,
                    })) : [],
                };
                writes.push(addDoc(collection(db, "students", appState.studentId, "tracker"), snapshotDoc));
            } else if (payload.type === "preTestData" || payload.type === "postTestData") {
                const testType = payload.type === 'preTestData' ? 'preTest' : 'postTest';
                const testDocRef = doc(db, "students", appState.studentId, "tests", testType);
                const testPayload = {
                    answers: payload.data,
                    lastUpdated: serverTimestamp(),
                    studentId: appState.studentId,
                    studentClass: appState.studentClass
                };
                writes.push(setDoc(testDocRef, testPayload, {
                    merge: true
                }));
            } else if (payload.type === "motivationData") {
                const motivationDocRef = doc(db, "students", appState.studentId, "tests", "motivation");
                const motivationPayload = {
                    answers: payload.data,
                    lastUpdated: serverTimestamp(),
                    studentId: appState.studentId,
                    studentClass: appState.studentClass
                };
                writes.push(setDoc(motivationDocRef, motivationPayload, {
                    merge: true
                }));
            } else if (payload.type === "intensityData") {
                const intensityDocRef = doc(db, "students", appState.studentId, "tests", "intensity");
                const intensityPayload = {
                    answers: payload.data,
                    lastUpdated: serverTimestamp(),
                    studentId: appState.studentId,
                    studentClass: appState.studentClass
                };
                writes.push(setDoc(intensityDocRef, intensityPayload, { merge: true }));
            } else if (payload.type === "unitData") {
                const { unitId, section, data } = payload;
                if (!unitId || !section) {
                    throw new Error("Missing unitId or section for unitData write.");
                }
                const unitDocRef = doc(db, "students", appState.studentId, "units", `unit_${unitId}`);
                const updatePayload = {
                    [section]: data,
                    lastUpdated: serverTimestamp(),
                    studentId: appState.studentId,
                    studentClass: appState.studentClass
                };
                writes.push(setDoc(unitDocRef, updatePayload, {
                    merge: true
                }));
            } else if (payload.type === 'teacherUnitScore') {
                const { unitId, section, score } = payload;
                const scoreDocRef = doc(db, "students", appState.studentId, "scores", `unit_${unitId}`);
                const scorePayload = {
                    [section]: {
                        score: score,
                        gradedBy: "teacher",
                        // Or a teacher ID if you have teacher auth
                        gradedAt: serverTimestamp()
                    },
                    studentId: appState.studentId,
                    studentClass: appState.studentClass
                };
                writes.push(setDoc(scoreDocRef, scorePayload, {
                    merge: true
                }));
            } else {
                throw new Error(`Unknown payload type: ${payload.type}`);
            }
        } catch (err) {
            console.error("Error preparing Firestore writes:", err);
            showToast("Gagal menyimpan data. / Failed to save data.", true);
            if (button) {
                button.disabled = false;
                button.classList.remove("opacity-50");
                if (originalTextEl)
                    originalTextEl.innerHTML = originalText;
                else
                    button.textContent = originalText;
            }
            return;
        }

        Promise.all(writes).then(() => {
            if (!button) {
                console.log("Autosave successful.")
            } else {
                showToast("Data berhasil disimpan. / Saved successfully.");
            }
            if (onSuccessCallback)
                onSuccessCallback();
        }
        ).catch(err => {
            console.error("Firestore write failed:", err);
            showToast("Gagal menyimpan ke database. / Failed to save to database.", true);
        }
        ).finally(() => {
            if (button) {
                button.disabled = false;
                button.classList.remove("opacity-50");
                if (originalTextEl)
                    originalTextEl.innerHTML = originalText;
                else
                    button.textContent = originalText;
            }
        }
        );
    }

    function showToast(message, isError = false) {
        toast.textContent = message;
        toast.className = `fixed bottom-5 right-5 text-white py-2 px-4 rounded-lg shadow-lg opacity-0 transform translate-y-2 ${isError ? 'bg-red-600' : 'bg-gray-800'}`;
        toast.classList.remove('opacity-0', 'translate-y-2');
        setTimeout(() => toast.classList.add('opacity-100', 'translate-y-0'), 10);
        setTimeout(() => {
            toast.classList.remove('opacity-100', 'translate-y-0');
            toast.classList.add('opacity-0', 'translate-y-2');
        }
            , 3000);
    }

    /**
     * Calls the Gemini API directly via REST.
     * @param {string} userPrompt The main prompt from the user/app.
     * @param {string} systemInstruction Optional system instructions to guide the model.
     * @returns {Promise<string|null>} The AI's response text or null if failed.
     */
    async function callGeminiAPI(userPrompt, systemInstruction = "You are a helpful English tutor.") {
        if (!geminiApiKey) {
            showToast("API Key Gemini belum diatur. Silakan atur di Mode Guru. / Gemini API Key not set. Please configure in Teacher Mode.", true);
            return null;
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;

        const payload = {
            system_instruction: {
                parts: [{ text: systemInstruction }]
            },
            contents: [{
                parts: [{ text: userPrompt }]
            }],
            generationConfig: {
                temperature: 0.2 // Lower temp for more deterministic grading/grammar checks
            }
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Gemini API Error:", errorData);
                showToast(`Gemini Error: ${response.status} ${response.statusText}`, true);
                return null;
            }

            const data = await response.json();
            if (data && data.candidates && data.candidates.length > 0) {
                return data.candidates[0].content.parts[0].text;
            } else {
                showToast("Respons AI kosong atau tidak valid / Empty or invalid AI response", true);
                return null;
            }
        } catch (error) {
            console.error("Fetch request to Gemini failed:", error);
            showToast("Gagal terhubung ke AI / Failed to connect to AI", true);
            return null;
        }
    }

    function renderView(viewId) {
        document.querySelectorAll('.main-content > div').forEach(div => div.classList.remove('active'));
        const activeDiv = document.getElementById(viewId);
        if (activeDiv)
            activeDiv.classList.add('active');

        appState.currentView = viewId;
        if (viewId === 'tracker') {
            const isTeacher = sessionStorage.getItem('isTeacher') === 'true';
            document.getElementById('student-tracker-view').style.display = isTeacher ? 'none' : 'block';
            document.getElementById('teacher-tracker-view').style.display = isTeacher ? 'block' : 'none';

            // Populate participant dropdown when teacher view is rendered
            if (isTeacher) {
                const participantSelect = document.getElementById('obs-participant-id');
                participantSelect.innerHTML = '<option value="">Select participant</option>' + studentList.map(name => `<option value="${name}">${name}</option>`).join('');
            }
        }
    }

    // --- Initialization ---
    function initializeApp() {
        const template = document.getElementById('unit-template');
        // Populate student and class dropdowns
        const studentNameInputEl = document.getElementById('student-name-input');
        studentNameInputEl.innerHTML = `<option value="" disabled selected>Select Name</option>` + studentList.map(name => `<option value="${name}">${name}</option>`).join('');
        const studentClassInputEl = document.getElementById('student-class-input');
        studentClassInputEl.innerHTML = `<option value="" disabled selected>Select Class</option>` + classList.map(cls => `<option value="${cls}">${cls}</option>`).join('');

        // Create Pre-test questions
        createPretestQuestions();

        // Create Post-test questions
        createPosttestQuestions();

        // Create Motivation questions
        createMotivationQuestions();

        // Create Intensity questions
        createIntensityQuestions();

        // Create unit pages from template
        for (let i = 1; i <= 8; i++)
            createUnitPage(i);
        template.remove();

        // Create mobile navigation
        createMobileNav();

        // Load saved state
        loadInitialState();

        // Attach all event listeners (before chart to ensure interactions work even if chart CDN fails)
        attachEventListeners();

        // Setup Chart.js (may fail if CDN didn't load)
        try {
            setupChart();
        } catch (e) {
            console.warn("Chart.js failed to initialize:", e);
        }

        // Set initial view
        renderView('home');
    }

    // --- Page & Component Builders ---
    function createPretestQuestions() {
        const container = document.getElementById('pretest-questions-container');
        container.innerHTML = '';
        pretestQuestions.forEach((item, index) => {
            const qNum = index + 1;
            const optionsHtml = item.o.map((opt, i) => {
                const optionLetter = String.fromCharCode(97 + i);
                return `<div><label class="flex items-center"><input type="radio" name="q${qNum}" value="${optionLetter}" class="mr-2 h-4 w-4 text-[#78C800] focus:ring-[#58a700]"> ${optionLetter}. ${opt}</label></div>`;
            }
            ).join('');

            const questionHtml = `
                        <div>
                            <p class="font-semibold">${item.q}</p>
                            <div class="mt-2 space-y-2">${optionsHtml}</div>
                        </div>`;
            container.innerHTML += questionHtml;
        }
        );
    }

    function createPosttestQuestions() {
        const container = document.getElementById('posttest-questions-container');
        container.innerHTML = '';
        posttestQuestions.forEach((item, index) => {
            const qNum = index + 1;
            const optionsHtml = item.o.map((opt, i) => {
                const optionLetter = String.fromCharCode(97 + i);
                return `<div><label class="flex items-center"><input type="radio" name="q${qNum}" value="${optionLetter}" class="mr-2 h-4 w-4 text-[#78C800] focus:ring-[#58a700]"> ${optionLetter}. ${opt}</label></div>`;
            }
            ).join('');

            const questionHtml = `
                        <div>
                            <p class="font-semibold">${item.q}</p>
                            <div class="mt-2 space-y-2">${optionsHtml}</div>
                        </div>`;
            container.innerHTML += questionHtml;
        }
        );
    }

    function createMotivationQuestions() {
        const container = document.getElementById('motivation-questions-container');
        container.innerHTML = '';
        const ratingLabels = {
            id: ['Sangat Tidak Setuju', 'Tidak Setuju', 'Ragu-Ragu', 'Setuju', 'Sangat Setuju'],
            en: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
        };

        for (const key in motivationQuestions) {
            const section = motivationQuestions[key];
            let questionsHtml = '';
            section.questions.forEach(q => {
                const optionsHtml = ratingLabels.id.map((label_id, index) => {
                    const label_en = ratingLabels.en[index];
                    return `
                            <label class="flex flex-col items-center space-y-1 cursor-pointer">
                                <input type="radio" name="mq${q.id}" value="${index + 1}" class="h-4 w-4 text-[#78C800] focus:ring-[#58a700]">
                                <span class="text-xs text-center">
                                    <span class="lang-id">${label_id}</span>
                                    <span class="lang-en">${label_en}</span>
                                </span>
                            </label>
                        `
                }
                ).join('');

                questionsHtml += `
                            <div class="py-4 border-b">
                                <p><span class="lang-id">${q.id}. ${q.text_id}</span><span class="lang-en">${q.id}. ${q.text_en}</span></p>
                                <div class="mt-3 grid grid-cols-5 gap-2 text-center">${optionsHtml}</div>
                            </div>
                        `;
            }
            );

            container.innerHTML += `
                        <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                            <h3 class="text-xl font-bold text-gray-700">
                                <span class="lang-id">${key}. ${section.title_id}</span>
                                <span class="lang-en">${key}. ${section.title_en}</span>
                            </h3>
                            <div class="mt-4 space-y-4">${questionsHtml}</div>
                        </div>
                    `;
        }
    }

    function createIntensityQuestions() {
        const container = document.getElementById('intensity-questions-container');
        container.innerHTML = '';
        const ratingLabels = {
            id: ['Sangat Tidak Setuju', 'Tidak Setuju', 'Ragu-Ragu', 'Setuju', 'Sangat Setuju'],
            en: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
        };

        for (const key in intensityQuestions) {
            const section = intensityQuestions[key];
            let questionsHtml = '';
            section.questions.forEach(q => {
                const optionsHtml = ratingLabels.id.map((label_id, index) => {
                    const label_en = ratingLabels.en[index];
                    return `
                            <label class="flex flex-col items-center space-y-1 cursor-pointer">
                                <input type="radio" name="iq${q.id}" value="${index + 1}" class="h-4 w-4 text-[#78C800] focus:ring-[#58a700]">
                                <span class="text-xs text-center">
                                    <span class="lang-id">${label_id}</span>
                                    <span class="lang-en">${label_en}</span>
                                </span>
                            </label>
                        `
                }
                ).join('');

                questionsHtml += `
                            <div class="py-4 border-b">
                                <p><span class="lang-id">${q.id}. ${q.text_id}</span><span class="lang-en">${q.id}. ${q.text_en}</span></p>
                                <div class="mt-3 grid grid-cols-5 gap-2 text-center">${optionsHtml}</div>
                            </div>
                        `;
            }
            );

            container.innerHTML += `
                        <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                            <h3 class="text-xl font-bold text-gray-700">
                                <span class="lang-id">${key}. ${section.title_id}</span>
                                <span class="lang-en">${key}. ${section.title_en}</span>
                            </h3>
                            <div class="mt-4 space-y-4">${questionsHtml}</div>
                        </div>
                    `;
        }
    }

    function createUnitPage(unitId) {
        const template = document.getElementById('unit-template');
        const data = unitData[unitId];
        if (!data)
            return;
        const unitContainer = document.getElementById(`unit${unitId}`);
        const clone = template.cloneNode(true);
        clone.id = '';
        clone.setAttribute('data-unit-number', unitId);
        clone.querySelector('.unit-title').innerHTML = `<span class="lang-id">${data.title.id}</span><span class="lang-en">${data.title.en}</span>`;
        clone.querySelector('.unit-description').innerHTML = `<span class="lang-id">${data.description.id}</span><span class="lang-en">${data.description.en}</span>`;

        // Vocab list and forms
        const vocabList = clone.querySelector('.vocab-list');
        const vocabForm = clone.querySelector('.vocab-examples-form');
        data.vocab.forEach(word => {
            vocabList.innerHTML += `<div class="bg-gray-50 p-3 rounded-lg text-center"><div class="text-3xl">${word.icon}</div><div class="font-semibold mt-2">${word.en}</div><div class="text-sm text-gray-500">${word.id}</div></div>`;
            vocabForm.innerHTML += `
            <div class="relative">
                <label for="vocab-u${unitId}-${word.en}" class="font-semibold text-gray-700">${word.en}:</label>
                <div class="flex flex-col md:flex-row items-start md:items-center md:space-x-2 mt-1 gap-2 md:gap-0">
                    <input type="text" id="vocab-u${unitId}-${word.en}" data-word="${word.en}" class="w-full md:flex-1 p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" placeholder="Tulis kalimatmu... / Write your sentence...">
                    <button type="button" class="ai-check-grammar-btn w-full md:w-auto bg-purple-100 text-purple-700 border border-purple-300 px-3 py-2 rounded-md hover:bg-purple-200 transition-colors whitespace-nowrap text-sm font-semibold flex items-center justify-center space-x-1" data-input-id="vocab-u${unitId}-${word.en}">
                        <span>✨</span>
                        <span><span class="lang-id">Cek Grammar</span><span class="lang-en">Check</span></span>
                    </button>
                </div>
                <div id="ai-feedback-vocab-u${unitId}-${word.en}" class="text-sm mt-2 hidden p-3 rounded-md bg-purple-50 text-purple-800 border border-purple-200 leading-relaxed shadow-sm"></div>
            </div>`;
        }
        );

        // Sing Along section
        const singAlongContainer = clone.querySelector('.sing-along-tasks');
        data.singAlong.forEach((task, i) => {
            singAlongContainer.innerHTML += `<div class="mb-4"><div class="flex items-center"><input type="checkbox" id="sa-u${unitId}-t${i}" class="h-5 w-5 rounded border-gray-300 text-[#78C800] focus:ring-[#58a700]" data-section="singAlong" data-unit="${unitId}" data-task-index="${i}"><label for="sa-u${unitId}-t${i}" class="ml-3 text-gray-700"><span class="lang-id">${task.id}</span><span class="lang-en">${task.en}</span></label> ${task.videoId ? `<a href="https://www.youtube.com/watch?v=${task.videoId}" target="_blank" class="ml-4 text-sm text-blue-600 hover:underline">(<span class="lang-id">Tonton Video</span><span class="lang-en">Watch Video</span>)</a>` : ''}</div></div>`;
        }
        );

        // Dialogue section
        const dialogueContainer = clone.querySelector('.dialogue-practice-area');
        if (data.dialogue && dialogueContainer) {
            dialogueContainer.innerHTML = ''; // Clear any template content
            data.dialogue.forEach(line => {
                const speaker = line.speaker === 'Student' ? (appState.studentId || 'Student') : line.speaker;
                const isUser = line.speaker === 'Student';
                dialogueContainer.innerHTML += `<div class="flex items-end gap-2 ${isUser ? 'justify-end' : ''}"><div class="max-w-xs md:max-w-md p-3 rounded-2xl ${isUser ? 'bg-[#78C800] text-white rounded-br-none' : 'bg-gray-200 rounded-bl-none'}"><b>${speaker}:</b> ${line.text}</div></div>`;
            });
        }

        // Interview section
        const interviewContainer = clone.querySelector('.peer-interview');
        data.interview.forEach((q, i) => {
            interviewContainer.innerHTML += `<div><label for="q${unitId}-${i}" class="font-semibold text-gray-700">${i + 1}. <span class="lang-id">${q.id}</span><span class="lang-en">${q.en}</span></label><input type="text" id="q${unitId}-${i}" class="mt-2 w-full p-2 border border-gray-300 rounded-md" placeholder="Jawaban temanmu / Your friend's answer..."></div>`;
        }
        );

        // Duolingo Play section
        const duolingoContainer = clone.querySelector('.duolingo-play-tasks');
        data.duolingoPlay.forEach((task, i) => {
            duolingoContainer.innerHTML += `<div class="flex items-center"><input type="checkbox" id="dp-u${unitId}-t${i}" class="h-5 w-5 rounded border-gray-300 text-[#78C800] focus:ring-[#58a700]" data-section="duolingoPlay" data-unit="${unitId}" data-task-index="${i}"><label for="dp-u${unitId}-t${i}" class="ml-3 text-gray-700"><span class="lang-id">${task.id}</span><span class="lang-en">${task.en}</span></label></div>`;
        }
        );

        unitContainer.appendChild(clone);
    }

    function createMobileNav() {
        const mobileUnitNav = document.getElementById('mobile-unit-nav');
        if (!mobileUnitNav)
            return;
        for (let i = 1; i <= 8; i++) {
            const unit = unitData[i];
            if (unit) {
                const icon = document.querySelector(`#nav-links a[data-target="unit${i}"] span:first-child`).textContent;
                const titleId = unit.title.id.split(':')[1].trim();
                const titleEn = unit.title.en.split(':')[1].replace(/[^\w\s&]/g, '').trim();
                mobileUnitNav.innerHTML += `<a href="#" data-target="unit${i}" class="quick-nav-link bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors"><div class="text-3xl">${icon}</div><p class="mt-2 font-semibold text-sm text-gray-800"><span class="lang-id">${titleId}</span><span class="lang-en">${titleEn}</span></p></a>`;
            }
        }
    }

    let progressChart;
    function setupChart() {
        const chartCtx = document.getElementById('progressChart').getContext('2d');
        progressChart = new Chart(chartCtx, {
            type: 'bar',
            data: {
                labels: appState.trackerData.map((_, i) => `Sesi ${i + 1}`),
                datasets: [{
                    label: 'XP Didapat',
                    data: appState.trackerData.map(d => d.xp),
                    backgroundColor: '#78C800',
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e5e7eb'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#333',
                        padding: 10,
                        cornerRadius: 5
                    }
                }
            }
        });
    }

    // --- State Management ---
    function loadInitialState() {
        const savedLang = localStorage.getItem('language') || 'en';
        updateLanguage(savedLang);

        const savedStudentId = localStorage.getItem('studentId');
        const savedStudentClass = localStorage.getItem('studentClass');
        if (savedStudentId && savedStudentClass) {
            setupStudent(savedStudentId, savedStudentClass);
        }

        if (sessionStorage.getItem('isTeacher') === 'true') {
            document.body.classList.add('teacher-mode');
            document.getElementById('teacher-section').style.display = 'block';
            document.getElementById('teacher-login-container').style.display = 'none';

            // Populate Gemini API Key input if it exists
            const geminiInput = document.getElementById('gemini-api-key-input');
            if (geminiInput && geminiApiKey) {
                geminiInput.value = geminiApiKey;
            }
        }

        appState.trackerData.forEach((data, index) => {
            document.querySelector('#tracker-table tbody').innerHTML += `<tr class="border-b"><td class="p-3 font-semibold">${index + 1}</td><td class="p-3"><input type="number" class="w-20 p-1 border rounded" data-type="xp" data-index="${index}" value="${data.xp}"></td><td class="p-3"><input type="number" class="w-20 p-1 border rounded" data-type="streak" data-index="${index}" value="${data.streak}"></td></tr>`;
        }
        );
    }

    function setupStudent(name, studentClass) {
        appState.studentId = name;
        appState.studentClass = studentClass;
        localStorage.setItem('studentId', name);
        localStorage.setItem('studentClass', studentClass);

        document.getElementById('student-name-display').textContent = name;
        document.getElementById('student-class-display').textContent = `(${studentClass})`;
        document.getElementById('welcome-name-id').textContent = name;
        document.getElementById('welcome-name-en').textContent = name;

        document.getElementById('student-setup').style.display = 'none';
        document.getElementById('student-welcome').style.display = 'block';
        document.getElementById('student-display').style.display = 'block';
    }

    function updateLanguage(lang) {
        document.body.classList.toggle('en', lang === 'en');
        localStorage.setItem('language', lang);
        document.getElementById('lang-btn-id').classList.toggle('active', lang === 'id');
        document.getElementById('lang-btn-en').classList.toggle('active', lang === 'en');
    }

    // --- Event Listeners ---
    function attachEventListeners() {
        document.getElementById('lang-btn-id').addEventListener('click', () => updateLanguage('id'));
        document.getElementById('lang-btn-en').addEventListener('click', () => updateLanguage('en'));

        document.querySelector('.nav-link-header').addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelector('.nav-link[data-target="home"]').classList.add('active');
            renderView('home');
        }
        );

        document.getElementById('menu-toggle').addEventListener('click', () => {
            document.getElementById('nav-links').classList.toggle('hidden');
        }
        );

        // AI Settings
        const saveApiBtn = document.getElementById('save-api-key-btn');
        if (saveApiBtn) {
            saveApiBtn.addEventListener('click', () => {
                const keyInput = document.getElementById('gemini-api-key-input').value.trim();
                if (keyInput) {
                    geminiApiKey = keyInput;
                    localStorage.setItem('geminiApiKey', keyInput);
                    const statusText = document.getElementById('api-key-status');
                    statusText.classList.remove('hidden');
                    setTimeout(() => statusText.classList.add('hidden'), 3000);
                }
            });
        }

        // Global Event Delegation for AI Buttons
        document.addEventListener('click', async (e) => {
            // 1. AI Grammar Check in Student View
            if (e.target.closest('.ai-check-grammar-btn')) {
                const btn = e.target.closest('.ai-check-grammar-btn');
                const inputId = btn.dataset.inputId;
                const inputEl = document.getElementById(inputId);
                const feedbackEl = document.getElementById(`ai-feedback-${inputId}`);

                if (!inputEl.value.trim()) {
                    showToast("Tulis kalimat dulu! / Write a sentence first!", true);
                    return;
                }

                btn.disabled = true;
                const originalText = btn.innerHTML;
                btn.innerHTML = `<span class="animate-pulse">⏳ Mengecek...</span>`;
                feedbackEl.classList.add('hidden');

                const prompt = `Please check the English grammar of the following sentence written by a student learning English. 
Sentence: "${inputEl.value}"
Vocabulary word they were supposed to use: "${inputEl.dataset.word}"

If the sentence is correct and uses the word properly, say: "✅ Bagus sekali!" (Add a short encouraging English comment).
If there is a grammar error, provide the corrected sentence and briefly explain the error in Indonesian. Keep your response short and friendly.`;

                const aiResponse = await callGeminiAPI(prompt, "You are a helpful, encouraging English tutor for Indonesian secondary school students.");

                btn.disabled = false;
                btn.innerHTML = originalText;

                if (aiResponse) {
                    feedbackEl.innerHTML = aiResponse.replace(/\n/g, '<br>');
                    feedbackEl.classList.remove('hidden');
                }
            }

            // 2. AI Auto-Score in Teacher View
            if (e.target.closest('.auto-score-ai-button')) {
                const btn = e.target.closest('.auto-score-ai-button');
                const unitPage = btn.closest('.unit-page');

                // Collect sentences
                const inputs = unitPage.querySelectorAll('.vocab-examples-form input');
                const sentences = [];
                inputs.forEach(i => {
                    if (i.value.trim()) {
                        sentences.push(`Word: ${i.dataset.word} | Sentence: ${i.value}`);
                    }
                });

                if (sentences.length === 0) {
                    showToast("Siswa belum mengisi kalimat / No sentences written yet", true);
                    return;
                }

                btn.disabled = true;
                const originalText = btn.innerHTML;
                btn.innerHTML = `⏳ AI Scoring...`;

                const prompt = `You are grading an English vocabulary assignment for an Indonesian secondary school student. 
They had to write ${inputs.length} sentences using specific vocabulary words. Here are their submissions:
${sentences.join('\n')}

Please evaluate their grammar, spelling, and proper use of the assigned words.
Give a final score from 0 to 100.
IMPORTANT: You MUST end your response exactly with the formal SCORE tag as follows: [SCORE: X] where X is the integer score.`;

                const aiResponse = await callGeminiAPI(prompt, "You are a strict but fair English teacher.");

                btn.disabled = false;
                btn.innerHTML = originalText;

                if (aiResponse) {
                    const scoreMatch = aiResponse.match(/\[SCORE:\s*(\d+)\]/i);
                    if (scoreMatch) {
                        const score = parseInt(scoreMatch[1], 10);
                        const scoreInput = unitPage.querySelector('.teacher-score-input[data-section="vocabulary"]');
                        if (scoreInput) scoreInput.value = score;
                        showToast(`Skor AI: ${score}/100 / Scored by AI`, false);
                    } else {
                        showToast(`Format skor AI tidak ditemukan / AI score format not found in response`, true);
                    }
                }
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.dataset.target;

                if (targetId !== 'home' && !appState.studentId) {
                    showToast('Harap pilih nama dan kelas Anda terlebih dahulu. / Please select your name and class first.', true);
                    return;
                }

                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                if (window.innerWidth < 768)
                    document.getElementById('nav-links').classList.add('hidden');
                renderView(targetId);
            }
            );
        }
        );

        document.getElementById('mobile-unit-nav').addEventListener('click', (e) => {
            const link = e.target.closest('.quick-nav-link');
            if (link) {
                e.preventDefault();
                const targetId = link.dataset.target;

                if (!appState.studentId) {
                    showToast('Harap pilih nama dan kelas Anda terlebih dahulu. / Please select your name and class first.', true);
                    return;
                }

                renderView(targetId);
                document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
                document.querySelector(`#nav-links a[data-target="${targetId}"]`)?.classList.add('active');
            }
        }
        );

        document.getElementById('student-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('student-name-input').value;
            const sClass = document.getElementById('student-class-input').value;
            if (name && sClass)
                setupStudent(name, sClass);
        }
        );

        document.getElementById('change-student').addEventListener('click', () => {
            localStorage.removeItem('studentId');
            localStorage.removeItem('studentClass');
            appState.studentId = null;
            appState.studentClass = null;
            document.getElementById('student-setup').style.display = 'block';
            document.getElementById('student-welcome').style.display = 'none';
            document.getElementById('student-display').style.display = 'none';
            renderView('home');
        }
        );

        // --- Main Content Interactions ---
        mainContent.addEventListener('click', handleMainContentClick);
        mainContent.addEventListener('change', handleMainContentChange);

        const pretestForm = document.getElementById('pretest-form');
        pretestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = document.getElementById('submit-pretest-btn');
            const formData = new FormData(pretestForm);
            const answers = Object.fromEntries(formData.entries());

            if (Object.keys(answers).length < pretestQuestions.length) {
                showToast('Harap jawab semua pertanyaan sebelum mengirim. / Please answer all questions before submitting.', true);
                return;
            }

            const onSuccess = () => {
                pretestForm.style.display = 'none';
                document.getElementById('pretest-complete-view').style.display = 'block';
            }
                ;

            sendDataToFirestore({
                type: 'preTestData',
                data: answers
            }, button, onSuccess);
        }
        );

        pretestForm.addEventListener('change', () => {
            const formData = new FormData(pretestForm);
            const answers = Object.fromEntries(formData.entries());
            if (Object.keys(answers).length > 0) {
                sendDataToFirestore({
                    type: 'preTestData',
                    data: answers
                });
                // No button for silent auto-save
            }
        }
        );

        const posttestForm = document.getElementById('posttest-form');
        posttestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = document.getElementById('submit-posttest-btn');
            const formData = new FormData(posttestForm);
            const answers = Object.fromEntries(formData.entries());

            if (Object.keys(answers).length < posttestQuestions.length) {
                showToast('Harap jawab semua pertanyaan sebelum mengirim. / Please answer all questions before submitting.', true);
                return;
            }

            const onSuccess = () => {
                posttestForm.style.display = 'none';
                document.getElementById('posttest-complete-view').style.display = 'block';
            };

            sendDataToFirestore({
                type: 'postTestData',
                data: answers
            }, button, onSuccess);
        });

        posttestForm.addEventListener('change', () => {
            const formData = new FormData(posttestForm);
            const answers = Object.fromEntries(formData.entries());
            if (Object.keys(answers).length > 0) {
                sendDataToFirestore({
                    type: 'postTestData',
                    data: answers
                });
            }
        });

        document.getElementById('back-to-home-btn').addEventListener('click', () => {
            document.querySelector('.nav-link[data-target="home"]').click();
        }
        );
        document.getElementById('posttest-back-to-home-btn').addEventListener('click', () => {
            document.querySelector('.nav-link[data-target="home"]').click();
        });

        const motivationForm = document.getElementById('motivation-form');
        motivationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = document.getElementById('submit-motivation-btn');
            const formData = new FormData(motivationForm);
            const answers = Object.fromEntries(formData.entries());

            const totalQuestions = Object.values(motivationQuestions).reduce((acc, section) => acc + section.questions.length, 0);
            if (Object.keys(answers).length < totalQuestions) {
                showToast('Harap jawab semua pertanyaan sebelum mengirim. / Please answer all questions before submitting.', true);
                return;
            }

            const onSuccess = () => {
                motivationForm.style.display = 'none';
                document.getElementById('motivation-complete-view').style.display = 'block';
            }
                ;

            sendDataToFirestore({
                type: 'motivationData',
                data: answers
            }, button, onSuccess);
        }
        );

        motivationForm.addEventListener('change', () => {
            const formData = new FormData(motivationForm);
            const answers = Object.fromEntries(formData.entries());
            if (Object.keys(answers).length > 0) {
                sendDataToFirestore({
                    type: 'motivationData',
                    data: answers
                });
            }
        }
        );

        document.getElementById('motivation-back-to-home-btn').addEventListener('click', () => {
            document.querySelector('.nav-link[data-target="home"]').click();
        }
        );

        // --- New Intensity Form Listeners ---
        const intensityForm = document.getElementById('intensity-form');
        intensityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = document.getElementById('submit-intensity-btn');
            const formData = new FormData(intensityForm);
            const answers = Object.fromEntries(formData.entries());

            const totalQuestions = Object.values(intensityQuestions).reduce((acc, section) => acc + section.questions.length, 0);
            if (Object.keys(answers).length < totalQuestions) {
                showToast('Harap jawab semua pertanyaan sebelum mengirim. / Please answer all questions before submitting.', true);
                return;
            }

            const onSuccess = () => {
                intensityForm.style.display = 'none';
                document.getElementById('intensity-complete-view').style.display = 'block';
            };

            sendDataToFirestore({
                type: 'intensityData',
                data: answers
            }, button, onSuccess);
        });

        intensityForm.addEventListener('change', () => {
            const formData = new FormData(intensityForm);
            const answers = Object.fromEntries(formData.entries());
            if (Object.keys(answers).length > 0) {
                sendDataToFirestore({
                    type: 'intensityData',
                    data: answers
                });
            }
        });

        document.getElementById('intensity-back-to-home-btn').addEventListener('click', () => {
            document.querySelector('.nav-link[data-target="home"]').click();
        });


        // --- Teacher Mode ---
        document.getElementById('teacher-mode-btn').addEventListener('click', () => document.getElementById('teacher-modal').style.display = 'flex');
        document.getElementById('cancel-teacher-modal').addEventListener('click', () => document.getElementById('teacher-modal').style.display = 'none');
        document.getElementById('submit-teacher-password').addEventListener('click', handleTeacherLogin);
        document.getElementById('exit-teacher-mode-btn').addEventListener('click', handleTeacherLogout);

        // --- Teacher Report Tables ---
        document.getElementById('teacher-tracker-view').addEventListener('click', handleTeacherTableClicks);
        document.getElementById('add-report-entry-btn').addEventListener('click', () => addTeacherTableRow('report'));
        document.getElementById('save-report-btn').addEventListener('click', (e) => saveTeacherTableData('report', e.target));
        document.getElementById('add-pre-post-test-entry-btn').addEventListener('click', () => addTeacherTableRow('pre-post'));
        document.getElementById('save-pre-post-test-btn').addEventListener('click', (e) => saveTeacherTableData('pre-post', e.target));
        document.getElementById('add-motivation-entry-btn').addEventListener('click', () => addTeacherTableRow('motivation'));
        document.getElementById('save-motivation-btn').addEventListener('click', (e) => saveTeacherTableData('motivation', e.target));
        document.getElementById('add-intensity-entry-btn').addEventListener('click', () => addTeacherTableRow('intensity'));
        document.getElementById('save-intensity-btn').addEventListener('click', (e) => saveTeacherTableData('intensity', e.target));

        // New Observation Form Listener
        document.getElementById('save-observation-btn').addEventListener('click', handleSaveObservation);
    }

    // --- Event Handlers ---
    function handleMainContentClick(e) {
        const button = e.target.closest('.save-section-button');
        const star = e.target.closest('.star-rating span');
        const teacherScoreBtn = e.target.closest('.save-teacher-score-button');
        const unitPage = e.target.closest('.unit-page');

        if (button && unitPage) {
            const unitId = unitPage.dataset.unitNumber;
            const section = button.dataset.section;
            let data;
            if (section === 'vocabulary') {
                data = {};
                unitPage.querySelectorAll('.vocab-examples-form input').forEach(i => data[i.dataset.word] = i.value);
            } else if (section === 'interview') {
                data = {};
                unitPage.querySelectorAll('.peer-interview input').forEach(i => {
                    const q = document.querySelector(`label[for="${i.id}"] .lang-en`).textContent.trim();
                    data[q] = i.value;
                }
                );
            } else if (section === 'duolingoPlay') {
                data = {
                    tasks: Array.from(unitPage.querySelectorAll('.duolingo-play-tasks input')).map(cb => ({
                        task: unitData[unitId].duolingoPlay[cb.dataset.taskIndex].en,
                        completed: cb.checked
                    })),
                    xp: unitPage.querySelector('.duolingo-xp-input').value || 0,
                    streak: unitPage.querySelector('.duolingo-streak-input').value || 0
                };
            }
            if (data)
                sendDataToFirestore({
                    type: 'unitData',
                    unitId,
                    section,
                    data
                }, button);
        }

        if (star && unitPage) {
            const value = parseInt(star.dataset.value);
            appState.ratings[unitPage.dataset.unitNumber] = value;
            star.parentElement.querySelectorAll('span').forEach((s, i) => s.style.color = i < value ? '#facc15' : '');
            sendDataToFirestore({
                type: 'unitData',
                unitId: unitPage.dataset.unitNumber,
                section: 'reflection',
                data: {
                    rating: value
                }
            });
        }

        if (teacherScoreBtn && unitPage) {
            const scoreInput = teacherScoreBtn.previousElementSibling;
            const score = scoreInput.value;
            const section = scoreInput.dataset.section;
            const unitId = unitPage.dataset.unitNumber;
            if (score) {
                sendDataToFirestore({
                    type: 'teacherUnitScore',
                    unitId,
                    section,
                    score
                }, teacherScoreBtn, () => {
                    const reportData = {
                        studentName: appState.studentId,
                        studentClass: appState.studentClass,
                        unit: `Unit ${unitId}`,
                        activity: section.charAt(0).toUpperCase() + section.slice(1),
                        // Capitalize
                        grade: score,
                        comments: 'Scored from unit page'
                    };
                    sendDataToFirestore({
                        type: 'teacherReport',
                        data: [reportData]
                    });
                }
                );
            } else {
                showToast("Please enter a score.", true);
            }
        }
    }

    function handleMainContentChange(e) {
        const target = e.target;
        const unitPage = target.closest('.unit-page');
        if (!unitPage || !target.matches('input[type="checkbox"][data-section]'))
            return;

        const unitId = unitPage.dataset.unitNumber;
        const section = target.dataset.section;

        const allCheckboxes = unitPage.querySelectorAll(`input[data-section="${section}"]`);
        const tasksData = Array.from(allCheckboxes).map(cb => {
            const taskIndex = cb.dataset.taskIndex;
            return {
                task: unitData[unitId][section][taskIndex].en,
                completed: cb.checked
            };
        }
        );

        let data = (section === 'duolingoPlay') ? {
            tasks: tasksData
        } : tasksData;
        sendDataToFirestore({
            type: 'unitData',
            unitId,
            section,
            data
        });
    }

    function handleTeacherLogin() {
        const password = document.getElementById('teacher-password-input');
        if (password.value === 'GURU123') {
            sessionStorage.setItem('isTeacher', 'true');
            document.body.classList.add('teacher-mode');
            document.getElementById('teacher-section').style.display = 'block';
            document.getElementById('teacher-login-container').style.display = 'none';
            document.getElementById('teacher-modal').style.display = 'none';
            showToast('Mode guru diaktifkan. / Teacher mode activated.');
            renderView(appState.currentView);
        } else {
            showToast('Kode akses salah. / Incorrect access code.', true);
        }
        password.value = '';
    }

    function handleTeacherLogout() {
        sessionStorage.removeItem('isTeacher');
        document.body.classList.remove('teacher-mode');
        document.getElementById('teacher-section').style.display = 'none';
        document.getElementById('teacher-login-container').style.display = 'block';
        showToast('Mode guru dinonaktifkan. / Teacher mode deactivated.');
        renderView(appState.currentView);
    }

    function handleTeacherTableClicks(e) {
        const duplicateBtn = e.target.closest('.duplicate-teacher-row');
        const removeBtn = e.target.closest('.remove-teacher-row');

        if (removeBtn) {
            removeBtn.closest('tr').remove();
        }

        if (duplicateBtn) {
            const row = duplicateBtn.closest('tr');
            const tableBody = row.parentElement;
            const inputs = row.querySelectorAll('select, input');
            let rowData = {};
            let type;

            if (tableBody.id === 'teacher-report-body') {
                type = 'report';
                rowData = {
                    studentName: inputs[0].value,
                    studentClass: inputs[1].value,
                    unit: inputs[2].value,
                    activity: inputs[3].value,
                    xp: inputs[4].value,
                    streak: inputs[5].value,
                    grade: inputs[6].value,
                    comments: inputs[7].value
                };
            } else if (tableBody.id === 'pre-post-test-body') {
                type = 'pre-post';
                rowData = {
                    studentName: inputs[0].value,
                    studentClass: inputs[1].value,
                    testType: inputs[2].value,
                    score: inputs[3].value,
                    comments: inputs[4].value
                };
            } else if (tableBody.id === 'motivation-body') {
                type = 'motivation';
                rowData = {
                    studentName: inputs[0].value,
                    studentClass: inputs[1].value,
                    score: inputs[2].value,
                    comments: inputs[3].value
                };
            } else if (tableBody.id === 'intensity-body') {
                type = 'intensity';
                rowData = {
                    studentName: inputs[0].value,
                    studentClass: inputs[1].value,
                    score: inputs[2].value,
                    comments: inputs[3].value
                };
            }
            if (type)
                addTeacherTableRow(type, rowData);
        }
    }

    // New Handler for Observation Form
    function handleSaveObservation(e) {
        const button = e.target.closest('button');
        e.preventDefault();

        const data = {
            observerName: document.getElementById('obs-observer-name').value,
            observationDate: document.getElementById('obs-date').value,
            participantId: document.getElementById('obs-participant-id').value,
            observationContext: document.getElementById('obs-context').value,
            autonomyRating: document.getElementById('obs-autonomy-rating').value,
            autonomyNotes: document.getElementById('obs-autonomy-notes').value,
            competenceRating: document.getElementById('obs-competence-rating').value,
            competenceNotes: document.getElementById('obs-competence-notes').value,
            relatednessRating: document.getElementById('obs-relatedness-rating').value,
            relatednessNotes: document.getElementById('obs-relatedness-notes').value,
            vocabForm: document.getElementById('obs-vocab-form').value,
            vocabMeaning: document.getElementById('obs-vocab-meaning').value,
            vocabUse: document.getElementById('obs-vocab-use').value,
            vocabRange: document.getElementById('obs-vocab-range').value,
            vocabControl: document.getElementById('obs-vocab-control').value,
        };

        if (!data.participantId) {
            showToast('Please select a participant ID.', true);
            return;
        }

        if (!data.observerName || !data.observationDate) {
            showToast('Please fill in Observer Name and Date.', true);
            return;
        }

        const onSuccess = () => {
            showToast('Observation saved successfully!');
            document.getElementById('observation-form').reset();
        };

        sendDataToFirestore({
            type: 'teacherObservation',
            data: data
        }, button, onSuccess);
    }

    // --- Teacher Table Logic ---
    function addTeacherTableRow(type, data = {}) {
        const tbody = document.getElementById(type === 'report' ? 'teacher-report-body' : type === 'pre-post' ? 'pre-post-test-body' : type === 'motivation' ? 'motivation-body' : 'intensity-body');
        const newRow = document.createElement('tr');
        const studentOptions = studentList.map(name => `<option value="${name}" ${data.studentName === name ? 'selected' : ''}>${name}</option>`).join('');
        const classOptions = classList.map(cls => `<option value="${cls}" ${data.studentClass === cls ? 'selected' : ''}>${cls}</option>`).join('');

        let rowHtml = `
                    <td class="p-2"><select class="w-full p-1 border rounded bg-white">${studentOptions}</select></td>
                    <td class="p-2"><select class="w-full p-1 border rounded bg-white">${classOptions}</select></td>
                `;

        if (type === 'report') {
            const unitOptions = Array.from({
                length: 8
            }, (_, i) => `<option ${data.unit === `Unit ${i + 1}` ? 'selected' : ''}>Unit ${i + 1}</option>`).join('');
            const activityOptions = ['Sing Along', 'New Vocabulary', 'Dialogue Example', 'Speaking Practice', 'Duolingo Play', 'Self Reflection'].map(act => `<option ${data.activity === act ? 'selected' : ''}>${act}</option>`).join('');
            rowHtml += `
                        <td class="p-2"><select class="w-full p-1 border rounded bg-white">${unitOptions}</select></td>
                        <td class="p-2"><select class="w-full p-1 border rounded bg-white">${activityOptions}</select></td>
                        <td class="p-2"><input type="number" class="w-20 p-1 border rounded" placeholder="XP" value="${data.xp || ''}"></td>
                        <td class="p-2"><input type="number" class="w-20 p-1 border rounded" placeholder="Streak" value="${data.streak || ''}"></td>
                        <td class="p-2"><input type="number" class="w-20 p-1 border rounded" placeholder=".../100" value="${data.grade || ''}"></td>`;
        } else if (type === 'pre-post') {
            rowHtml += `
                        <td class="p-2"><select class="w-full p-1 border rounded bg-white">
                            <option ${data.testType === 'Pre-Test' ? 'selected' : ''}>Pre-Test</option>
                            <option ${data.testType === 'Post-Test' ? 'selected' : ''}>Post-Test</option>
                        </select></td>
                        <td class="p-2"><input type="number" class="w-20 p-1 border rounded" placeholder=".../100" value="${data.score || ''}"></td>`;
        } else {
            // motivation or intensity
            rowHtml += `<td class="p-2"><input type="number" class="w-20 p-1 border rounded" placeholder="1-5" min="1" max="5" value="${data.score || ''}"></td>`;
        }
        rowHtml += `
                    <td class="p-2"><input type="text" class="w-full p-1 border rounded" placeholder="Komentar" value="${data.comments || ''}"></td>
                    <td class="p-2 flex space-x-2">
                        <button type="button" class="duplicate-teacher-row text-blue-500 hover:text-blue-700">📋</button>
                        <button type="button" class="remove-teacher-row text-red-500 hover:text-red-700">✖</button>
                    </td>`;

        newRow.innerHTML = rowHtml;
        tbody.appendChild(newRow);
    }

    function saveTeacherTableData(type, button) {
        const tbodyId = type === 'report' ? 'teacher-report-body' : type === 'pre-post' ? 'pre-post-test-body' : type === 'motivation' ? 'motivation-body' : 'intensity-body';
        const rows = document.querySelectorAll(`#${tbodyId} tr`);
        const dataToSave = [];
        let payloadType = 'teacherReport';

        rows.forEach(row => {
            const inputs = row.querySelectorAll('select, input');
            if (inputs.length === 0 || (inputs[0] && inputs[0].value.trim() === ''))
                return;
            // Skip empty rows
            let entry = {};
            if (type === 'report') {
                entry = {
                    studentName: inputs[0].value,
                    studentClass: inputs[1].value,
                    unit: inputs[2].value,
                    activity: inputs[3].value,
                    xp: inputs[4].value,
                    streak: inputs[5].value,
                    grade: inputs[6].value,
                    comments: inputs[7].value
                };
            } else {
                // pre-post, motivation, or intensity
                payloadType = 'teacherScores';
                if (type === 'pre-post') {
                    entry = {
                        studentName: inputs[0].value,
                        studentClass: inputs[1].value,
                        type: inputs[2].value,
                        score: inputs[3].value,
                        comments: inputs[4].value
                    };
                } else {
                    // motivation or intensity
                    entry = {
                        studentName: inputs[0].value,
                        studentClass: inputs[1].value,
                        type: type === 'motivation' ? 'Motivation' : 'Intensity',
                        score: inputs[2].value,
                        comments: inputs[3].value
                    };
                }
            }
            dataToSave.push(entry);
        }
        );

        if (dataToSave.length > 0) {
            sendDataToFirestore({
                type: payloadType,
                data: dataToSave
            }, button);
        } else {
            showToast('Tidak ada data untuk disimpan. / No data to save.', true);
        }
    }

    // --- GO! ---
    initializeApp();
});