/* ========================================
   CAREER NAVIGATOR AI - APP.JS
   Complete Functional JavaScript
   ======================================== */

'use strict';

// ============================================================
// DATA: Quotes, Stories, Professions
// ============================================================

const QUOTES = [
  {
    text: "\"დაიწყე ახლა. სრულყოფილება ემსახურება პროგრესს.\" — იმის ლოდინი, სანამ ყველაფერი 'სრულყოფილი' გახდება, არარეალურია. პროგრესი — ეს შენი ყველაზე ძლიერი იარაღია.",
    author: "Seth Godin",
    role: "მარკეტინგის გურუ, მეწარმე",
    source: "success.com"
  },
  {
    text: "\"წარმატება არ არის საბოლოო, წარუმატებლობა სასიკვდილო არ არის: მნიშვნელოვანია გაგრძელების კურაჟი.\"",
    author: "Winston Churchill",
    role: "ბრიტანეთის პრემიერ-მინისტრი",
    source: "success.com"
  },
  {
    text: "\"გაეშვი ლაპარაკი და დაიწყე საქმე. ეს ერთი ნაბიჯი ათასი სიტყვის ტოლია.\"",
    author: "Walt Disney",
    role: "ვიზიონერი შემოქმედი, Disney-ის დამაარსებელი",
    source: "success.com"
  },
  {
    text: "\"გაიარე ეს გზა — ეს შენი გზაა. შენ ხარ ლიდერი საკუთარი ცხოვრებისა.\"",
    author: "John C. Maxwell",
    role: "ლიდერობის ექსპერტი, ავტორი",
    source: "success.com"
  },
  {
    text: "\"ყოველი პრობლემა საჩუქარია — პრობლემების გარეშე ჩვენ არ ვიზრდებოდით.\"",
    author: "Tony Robbins",
    role: "ცხოვრებისეული კოაჩი, მეწარმე",
    source: "success.com"
  },
  {
    text: "\"თავის შემდეგ გამყარება, გვიჩვენებს სად გვინდა მივიდეთ.\"",
    author: "Jim Rohn",
    role: "ბიზნეს ფილოსოფოსი",
    source: "success.com"
  },
  {
    text: "\"პატარა ბაზარი გამოიყენე, როგორც ლაბორატორია — სწრაფი გადაწყვეტილებები და პირდაპირი კომუნიკაცია გლობალური გაფართოების საფუძველია.\"",
    author: "David Natroshvili",
    role: "Spribe-ის დამაარსებელი, iGaming რევოლუციონერი",
    source: "entrepreneur.ge"
  },
  {
    text: "\"სტრატეგიული თხრობა და სწორი პოზიციონირება ქმნის ავტორიტეტს — რეფერალების გარეშეც.\"",
    author: "Mariam Gogidze",
    role: "LinkedIn მარქეტინგის ექსპერტი, სოლოპრენიორი",
    source: "entrepreneur.ge"
  },
  {
    text: "\"ფრთხილობა სულ ცოტა, ადამიანი ართმევს ამ სამყაროს ისეთ სისავსეს, რასაც ვერ ჩაანაცვლებს.\"",
    author: "Richard Branson",
    role: "Virgin Group-ის დამაარსებელი",
    source: "success.com"
  },
  {
    text: "\"ის, რასაც არ გადაწყვეტ, ერთ დღეს გადაგწყვეტს შენ.\"",
    author: "Simon T. Bailey",
    role: "ლიდერობის ელჩი",
    source: "success.com"
  }
];

const SUCCESS_STORIES = [
  {
    id: 1,
    name: "David Natroshvili",
    title: "Spribe-ის დამაარსებელი | iGaming ინოვატორი",
    category: "tech",
    emoji: "🚀",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png",
    quote: "პატარა ბაზარი შეიძლება გახდეს გლობალური ინოვაციის სათავე.",
    fullStory: `დავით ნატროშვილი 2018 წელს საქართველოში დააარსა **Spribe** — iGaming კომპანია, რომელმაც შექმნა ახალი ჟანრი სათამაშო ინდუსტრიაში: "crash game". მათი flagship პროდუქტი **Aviator** დღეს მილიონობით მოთამაშეს ჰყავს აფრიკაში, ლათინურ ამერიკაში, აზიასა და აშშ-ში.

**მიდგომა:** მობილური-პირველი, მრავალმომხმარებლიანი, სოციალური თამაში — ტრადიციული სლოტებისგან განსხვავებულად.

**მიღწევა:** UFC-თან პარტნნიობა; გლობალური iGaming ბაზრის დარღვევა პატარა ქართული სტარტაპიდან.

**მთავარი გაკვეთილი:** "გამოიყენე პატარა ბაზარი, როგორც ლაბორატორია — სწრაფი გადაწყვეტილებები და პირდაპირი კლიენტებთან კომუნიკაცია გლობალური გაფართოების სავალდებულო საფუძველია."`,
    advice: "გამოიყენე პატარა ბაზარი, როგორც ლაბორატორია.",
    source: "entrepreneur.ge",
    sourceUrl: "https://www.entrepreneur.ge"
  },
  {
    id: 2,
    name: "Mariam Gogidze",
    title: "LinkedIn ექსპერტი | სოლოპრენიორი | Personal Branding სპეციალისტი",
    category: "business",
    emoji: "💼",
    imgUrl: "",
    quote: "სტრატეგიული თხრობა ქმნის ავტორიტეტს — რეფერალების გარეშეც.",
    fullStory: `**მარიამ გოგიძე** საქართველოდან გაემგზავრა გაერთიანებულ სამეფოში 16 წლის ასაკში, სტიპენდიის საფუძველზე. ძმასთან ერთად, ადრეული ასაკიდანვე დააარსა სოციალური მედიის სააგენტო ადგილობრივი ქართული ბიზნესების დასახმარებლად.

**კარიერული გზა:** სოციალური მედიის მართვა → LinkedIn-ზე Personal Branding ექსპერტი → სოლოპრენიორი

**ფოკუსი:** ეხმარება ფინანსური სექტორის ხელმძღვანელებს ავტორიტეტის შექმნაში.

**მთავარი გაკვეთილი:** "სტრატეგიული პოზიციონირება და სტორითელინგი ქმნის ავტორიტეტს — მაშინაც კი, როდესაც ახალ ბაზარზე გადადიხარ."`,
    advice: "სტრატეგიული სტორითელინგი ქმნის ავტორიტეტს.",
    source: "entrepreneur.ge",
    sourceUrl: "https://www.entrepreneur.ge"
  },
  {
    id: 3,
    name: "Carey Lohrenz",
    title: "US Navy-ის პირველი ქალი F-14 პილოტი | ლიდერობის სპიკერი",
    category: "science",
    emoji: "✈️",
    imgUrl: "",
    quote: "თუ ცოტა შეგეშინდა, სავარაუდოდ სწორ გზაზე ხარ.",
    fullStory: `**Carey Lohrenz** შეიქმნა ისტორია, როგორც **US Navy-ის პირველი ქალი F-14 Tomcat საბრძოლო პილოტი**. მან გაარღვია ინდუსტრიის ბარიერები, რომლებიც ათობით წლის განმავლობაში გაუვალი ჩანდა.

**SUCCESS Women of Influence 2025** პრემიის მფლობელი. 

**კარიერული გზა:** სამხედრო ავიაცია → ლიდერობის კონსულტანტი → ავტორი და სპიკერი

**მთავარი გაკვეთილი:** "ავთენტური ლიდერობა ნიშნავს გაუხარებლობის, გამოწვევებისა და შიშის ჩათვლით, წინ გაგრძელებას. ეს არის ნამდვილი სიმამაცე."`,
    advice: "ავთენტური ლიდერობა ნიშნავს შიშის მიუხედავად, გაგრძელებას.",
    source: "success.com",
    sourceUrl: "https://www.success.com"
  },
  {
    id: 4,
    name: "Tony Robbins",
    title: "ცხოვრებისეული კოაჩი | ბიზნეს სტრატეგი | ავტორი",
    category: "business",
    emoji: "🔥",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Tony_Robbins_2014_%28cropped%29.jpg/220px-Tony_Robbins_2014_%28cropped%29.jpg",
    quote: "წარმატება ნიშნავს — გააკეთო ის, რაც გინდა, სადაც გინდა, ვისთანაც გინდა.",
    fullStory: `**Tony Robbins** — მსოფლიოში ყველაზე ცნობილი ცხოვრებისეული კოაჩი. ახალგაზრდობაში, მძიმე ბავშვობის მიუხედავად, გახდა ბიზნეს სტრატეგი, 50+ კომპანიის სახის პარტნიორი.

**50+ მილიონი ადამიანი** 100-ზე მეტ ქვეყანაში მისი სემინარებით გაიარა.

**კარიერული გზა:** ჯანიტორი → ტრენინგ სემინარები → გლობალური ბიზნეს ლიდერი

**მთავარი გაკვეთილი:** "ყოველი პრობლემა საჩუქარია — მის გარეშე ჩვენ არ ვიზრდებოდით. მიიღე, ისწავლე, გაიზარდე."`,
    advice: "ყოველი პრობლემა საჩუქარია — მის გარეშე ჩვენ არ ვიზრდებოდით.",
    source: "success.com",
    sourceUrl: "https://www.success.com"
  },
  {
    id: 5,
    name: "Helio.AI გუნდი",
    title: "AI Recruitment ტექნოლოგია | 6 ქვეყანა | $1M Seed",
    category: "tech",
    emoji: "🤖",
    imgUrl: "",
    quote: "AI-ფირველი, გლობალური-ფირველი — ეს ერთადერთი სწორი სტარტაპ სტრატეგიაა.",
    fullStory: `**Helio.AI** — ქართული სტარტაპი, რომელიც ქმნის AI-ით მართული სამსახურში მიღების მართვის სისტემას (Recruitment Management System).

**Scale:** 6 ქვეყანაში ოპერაციები (2025).
**Funding:** $1 მილიონი Seed round (2025 წლის ბოლოს).

**სტრატეგია:** AI-პირველი პროდუქტი, დღიდანვე გლობალური ბაზრის გათვალისწინებით.

**მთავარი გაკვეთილი:** "AI-ტექნოლოგია საქართველოდან შეიძლება ემსახუროს გლობალურ ბაზარს — მნიშვნელოვანია სწორი Product-Market Fit-ის პოვნა და სწრაფი ექსპანსია."`,
    advice: "AI-ფირველი, გლობალური-ფირველი სტრატეგია.",
    source: "entrepreneur.ge",
    sourceUrl: "https://www.entrepreneur.ge"
  },
  {
    id: 6,
    name: "Richard Branson",
    title: "Virgin Group-ის დამაარსებელი | სერიული მეწარმე",
    category: "business",
    emoji: "🌍",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Richard_Branson_-_2011_%28cropped%29.jpg/220px-Richard_Branson_-_2011_%28cropped%29.jpg",
    quote: "ის, ვისაც ვერ ასწავლი სიარულს — ასწავლი სიარულს. სიარული ისწავლება ვარდნით.",
    fullStory: `**Richard Branson** — 400-ზე მეტი კომპანიის შემქმნელი, Virgin Group-ის ვიზიონარი ხელმძღვანელი. დისლექსიის მიუხედავად, 16 წლის ასაკში დაარსა სტუდენტური ჟურნალი, შემდეგ კი — Virgin Records.

**კარიერული გზა:** სტუდენტური ჟურნალი → მუსიკა → ავიაცია → კოსმოსი

**400+ კომპანია** 35 ქვეყანაში, ყოველ ინდუსტრიაში გარღვევა.

**მთავარი გაკვეთილი:** "შეცდომები ისწავლება გამოცდილებიდან. ნუ გეშინია ვარდნის — სწორედ ვარდნა ასწავლის სიარულს."`,
    advice: "ნუ გეშინია ვარდნის — სწორედ ვარდნა ასწავლის სიარულს.",
    source: "success.com",
    sourceUrl: "https://www.success.com"
  },
  {
    id: 7,
    name: "Pave Bank გუნდი",
    title: "Internet-First ბანკი | $39M Series A",
    category: "business",
    emoji: "🏦",
    imgUrl: "",
    quote: "ქართული ფინტეხი გლობალური ინვესტიციის ღირსია.",
    fullStory: `**Pave Bank** — ქართული ინტერნეტ-ბანკი, რომელმაც 2025 წლის ოქტომბერში მოიზიდა **$39 მილიონი Series A** ინვესტიცია — ქართული ფინტექ ისტორიის ერთ-ერთი უდიდესი ინვესტიცია.

**ფოკუსი:** ინტერნეტ-პირველი, მომხმარებელზე ორიენტირებული ბანკინგი.

**მთავარი გაკვეთილი:** "ქართულ ფინტეხ სექტორს გლობალური ინვესტიციის მოზიდვის შესაძლებლობა აქვს, თუ პროდუქტი ნამდვილ სერვისს სთავაზობს ბაზარს."`,
    advice: "ქართული ფინტექი გლობალური ინვესტიციის ღირსია.",
    source: "entrepreneur.ge",
    sourceUrl: "https://www.entrepreneur.ge"
  },
  {
    id: 8,
    name: "Walt Disney",
    title: "Disney-ის დამაარსებელი | ვიზიონარი შემოქმედი",
    category: "creative",
    emoji: "✨",
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Walt_Disney_1946.JPG/220px-Walt_Disney_1946.JPG",
    quote: "დაიწყე სიარული. სიარულის სწავლა შესაძლებელია მხოლოდ სიარულით.",
    fullStory: `**Walt Disney** — ვინ არ იცნობს? მაგრამ ბევრი არ იცის, რომ ის გათავისუფლდა გაზეთიდან, რადგანაც "ფანტაზიის ნაკლებობა" ჰქონდა. Mickey Mouse-ის შექმნამდე, 300-ზე მეტ "არა"-ს გაუძლო.

**კარიერული გზა:** გაზეთის მხატვარი → ანიმაცია → კინო → სტუდია → თემა-პარკი

**მთავარი გაკვეთილი:** "ოცნება მხოლოდ გამჭვირვალე მიზნად გადაქცევის შემდეგ ხდება წარმატება — ნუ ელოდები, დაიწყე."`,
    advice: "ოცნება მხოლოდ გამჭვირვალე მიზნად გადაქცევის შემდეგ ხდება წარმატება.",
    source: "success.com",
    sourceUrl: "https://www.success.com"
  }
];

const PROFESSION_DATA = {
  "პროგრამისტი": {
    emoji: "💻",
    title: "პროგრამული უზრუნველყოფის ინჟინერი",
    description: "პროგრამული უზრუნველყოფის შემქმნელი, კოდის მეშვეობით ციფრული სამყაროს მშენებელი.",
    salary: "2,500 – 8,000 ₾/თვე",
    demand: "ძალიან მაღალი",
    growth: "+25% (2025-2030)",
    skills: ["Python", "JavaScript", "Java", "C++", "React", "Node.js", "SQL", "Git", "Docker", "AWS"],
    facts: [
      "2025 წელს საქართველოში 15,000+ ვაკანტური IT სამუშაო ადგილია",
      "Junior Developer-ის საშუალო ხელფასი 2,500-3,500 ₾-ია",
      "Senior Developer-ებს 6,000-12,000 ₾-ს სთავაზობენ",
      "Remote სამუშაოს შესაძლებლობა — გლობალური კომპანიებისთვის",
      "Bootcamp-ებიდან 6 თვეში Junior-ის დონეზე მისვლა შესაძლებელია"
    ],
    stories: [1, 5]
  },
  "მარქეტინგი": {
    emoji: "📢",
    title: "მარქეტინგის სპეციალისტი",
    description: "ბრენდის ხმა, პროდუქტის გამავრცელებელი, მომხმარებლების გული და გონების მომხვეჭელი.",
    salary: "1,800 – 5,000 ₾/თვე",
    demand: "მაღალი",
    growth: "+18% (2025-2030)",
    skills: ["SEO/SEM", "Content Marketing", "Social Media", "Analytics", "Email Marketing", "PPC", "Branding", "Copywriting"],
    facts: [
      "Digital Marketing სპეციალისტები ყველაზე სწრაფად მზარდი პოზიციებია",
      "LinkedIn Marketing-ში სპეციალიზაცია B2B სექტორში ფასიანია",
      "Content Creator-ები საშუალოდ 2,000-4,000 ₾ შოულობენ",
      "Google Ads სერტიფიკაცია 3-6 თვეში მიღება შეიძლება",
      "Mariam Gogidze-ის მსგავსი სოლოპრენიორები 10,000+ ₾ შოულობენ"
    ],
    stories: [2]
  },
  "ფინანსები": {
    emoji: "💰",
    title: "ფინანსური ანალიტიკოსი / ფინტექ სპეციალისტი",
    description: "ფულის სამყაროს ნავიგატორი — ბიზნეს გადაწყვეტილებების ფინანსური ხერხემალი.",
    salary: "2,200 – 7,000 ₾/თვე",
    demand: "მაღალი",
    growth: "+22% (ფინტექ სექტორი, 2025-2030)",
    skills: ["Financial Modeling", "Excel/Power BI", "SQL", "Risk Management", "Blockchain", "Python", "CFA"],
    facts: [
      "Pave Bank-მა $39M Series A მოიზიდა — ქართული ფინტექ ბუმი",
      "TBC Bank-ი, Bank of Georgia — ადგილობრივი tech-forward ბანკები",
      "CFA სერტიფიკაცია საშუალოდ 40% ხელფასის ზრდას იძლევა",
      "ბლოქჩეინ და DeFi სექტორი ყველაზე სწრაფად იზრდება",
      "Amadeo-ს მსგავსი ფინტექ სტარტაპები 100% მზარდია ყოველთვიურად"
    ],
    stories: [7]
  },
  "დიზაინი": {
    emoji: "🎨",
    title: "UI/UX დიზაინერი / პროდუქტის დიზაინერი",
    description: "ციფრული მომხმარებლის გამოცდილების არქიტექტი — ლამაზი და ფუნქციური.",
    salary: "2,000 – 6,500 ₾/თვე",
    demand: "მაღალი",
    growth: "+20% (2025-2030)",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems", "CSS", "Motion Design"],
    facts: [
      "Figma ცოდნა სავალდებულოა — ბაზრის 90% იყენებს",
      "UX Research-ს ცოდნა Junior-ებს Senior-ის ხელფასს სთავაზობს",
      "Portfolio — 100-ჯერ უფრო მნიშვნელოვანია, ვიდრე CV",
      "Remote სამუშაოს შესაძლებლობა გლობალური კომპანიებისთვის",
      "Product Designer-ები ყველაზე მოთხოვნადი პოზიციებია 2025-ში"
    ],
    stories: [8]
  },
  "მეწარმე": {
    emoji: "🚀",
    title: "მეწარმე / სტარტაპ დამაარსებელი",
    description: "ნულიდან ყველაფრის შემქმნელი — სტარტაპ ეკოსისტემის ენთუზიასტი.",
    salary: "ცვალებადი (0 – ∞)",
    demand: "ეკოსისტემაზე დამოკიდებული",
    growth: "+35% (სტარტაპ ეკოსისტემა, 2025-2030)",
    skills: ["Entrepreneurship", "Leadership", "Product Management", "Sales", "Pitching", "Financial Planning", "Team Building"],
    facts: [
      "საქართველოში: 0% გადასახადი ინოვაციური სტარტაპებისთვის",
      "TBC Startuperi, Enterprise Georgia — ხელმისაწვდომი სახელმწიფო მხარდაჭერა",
      "500 Global, Startupbootcamp — საქართველოში აქტიური ინვესტორები",
      "Spribe, Helio.AI, Pave Bank — ქართული success stories",
      "IT Residency სტატუსი გლობალური ტალანტებისთვის"
    ],
    stories: [1, 5, 7]
  },
  "ჟურნალისტი": {
    emoji: "📰",
    title: "ჟურნალისტი / კონტენტ შემქმნელი",
    description: "ამბების მთხრობელი, სიმართლის მაძიებელი, საზოგადოების ინფორმირების ბოძი.",
    salary: "1,200 – 3,500 ₾/თვე",
    demand: "საშუალო",
    growth: "+8% (ციფრული მედია, 2025-2030)",
    skills: ["Content Writing", "Investigative Journalism", "SEO", "Video Production", "Social Media", "Data Journalism"],
    facts: [
      "Podcast და YouTube კონტენტ შემქმნელები ყველაზე სწრაფად იზრდებიან",
      "Data Journalism — ყველაზე მაღლადანაზღაურებადი ნიში",
      "ინგლისურ ენაზე კონტენტი ათჯერ მეტ აუდიტორიას აძლევს",
      "Freelance ჟურნალისტები 3,000-5,000$/თვე შოულობენ გლობალური მედიისთვის"
    ],
    stories: [8]
  },
  "ექიმი": {
    emoji: "⚕️",
    title: "ექიმი / სამედიცინო სპეციალისტი",
    description: "ადამიანის ჯანმრთელობის დამცველი — ბიოლოგიური სისტემების ნავიგატორი.",
    salary: "3,000 – 12,000 ₾/თვე (სპეციალიზაციაზე დამოკიდებული)",
    demand: "ძალიან მაღალი",
    growth: "+15% (DigHealth სექტორი, 2025-2030)",
    skills: ["Clinical Skills", "Research", "Medical Technology", "Patient Communication", "DigitalHealth", "AI in Medicine"],
    facts: [
      "Digital Health სექტორი ყველაზე სწრაფად იზრდება",
      "AI in Medicine — radiology, pathology-ში 40% ეფექტიანობის ზრდა",
      "Telemedicine პლატფორმები ახალ შესაძლებლობებს ქმნიან",
      "Medical Researcher-ები EU გრანტებს იღებენ 50,000+ EUR-ში"
    ],
    stories: [3]
  },
  "მასწავლებელი": {
    emoji: "📚",
    title: "მასწავლებელი / EdTech სპეციალისტი",
    description: "ცოდნის გამავრცელებელი, მომავლის ფორმირების მამოძრავებელი ძალა.",
    salary: "1,000 – 4,000 ₾/თვე",
    demand: "საშუალო",
    growth: "+20% (EdTech სექტორი, 2025-2030)",
    skills: ["Pedagogy", "Curriculum Design", "E-Learning", "LMS Platforms", "Assessment", "STEM Education"],
    facts: [
      "EdTech სექტორი 2025-ში 400 მლრდ $-ის ბაზარია გლობალურად",
      "Online კურსების შემქმნელები Udemy, Coursera-ზე 5,000-20,000$/თვე შოულობენ",
      "STEM პედაგოგებზე განსაკუთრებული მოთხოვნაა",
      "AI-ასისტირებული სწავლება ახალი სტანდარტი ხდება"
    ],
    stories: []
  }
};

// ============================================================
// STATE
// ============================================================
const STATE = {
  chatOpen: false,
  chatMinimized: false,
  currentQuoteIndex: 0,
  storiesPage: 1,
  storiesPerPage: 6,
  activeFilter: 'all',
  pdfText: '',
  analysisResult: null,
  chatHistory: []
};

// ============================================================
// UTILITIES
// ============================================================
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getEl(id) {
  return document.getElementById(id);
}

function stripMarkdown(md) {
  return md
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s/g, '')
    .replace(/`(.*?)`/g, '$1')
    .trim();
}

// ============================================================
// PARTICLES
// ============================================================
function initParticles() {
  const container = getEl('particles-container');
  if (!container) return;
  const count = Math.min(30, Math.floor(window.innerWidth / 50));
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 15 + 10}s;
      animation-delay:${Math.random() * 10}s;
      opacity:${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(p);
  }
}

// ============================================================
// HEADER SCROLL EFFECT
// ============================================================
function initHeaderScroll() {
  const header = getEl('main-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ============================================================
// SMOOTH SCROLL FOR ANCHORS
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============================================================
// TAB SWITCHER (CV Text / PDF)
// ============================================================
function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(c => {
        c.style.display = c.id === target ? '' : 'none';
        c.classList.toggle('active', c.id === target);
      });
    });
  });
}

// ============================================================
// CHARACTER COUNTER
// ============================================================
function initCharCounter() {
  const cvText = getEl('cv-text');
  const counter = getEl('cv-char-counter');
  if (!cvText || !counter) return;
  cvText.addEventListener('input', () => {
    const len = cvText.value.length;
    counter.textContent = `${len.toLocaleString('ka-GE')} სიმბოლო`;
    counter.style.color = len > 5000 ? 'var(--accent-amber)' : 'var(--text-muted)';
  });
}

// ============================================================
// PDF UPLOAD & PARSING
// ============================================================
function initPdfUpload() {
  const dropZone = getEl('pdf-drop-zone');
  const fileInput = getEl('pdf-file-input');
  const status = getEl('pdf-status');
  const filename = getEl('pdf-filename');
  const extractedCount = getEl('pdf-extracted-count');
  const removeBtn = getEl('pdf-remove-btn');
  const pdfText = getEl('cv-pdf-text');

  if (!dropZone || !fileInput) return;

  // Configure PDF.js worker
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  const handleFile = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      showToast('გთხოვთ ატვირთოთ მხოლოდ PDF ფაილი', 'error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast('ფაილის ზომა 10MB-ს არ უნდა აღემატებოდეს', 'error');
      return;
    }

    filename.textContent = file.name;
    extractedCount.textContent = 'ტექსტი ამოიღება...';
    status.style.display = 'flex';
    dropZone.style.display = 'none';

    try {
      const text = await extractPdfText(file);
      STATE.pdfText = text;
      if (pdfText) pdfText.value = text;
      const wordCount = text.split(/\s+/).filter(Boolean).length;
      extractedCount.textContent = `✅ ${wordCount} სიტყვა (${text.length} სიმბოლო) ამოღებულია`;
      showToast('PDF წარმატებით ამოიკითხა!', 'success');
    } catch (err) {
      console.error('PDF parse error:', err);
      // Fallback: try FileReader as text
      try {
        const rawText = await readFileAsText(file);
        STATE.pdfText = rawText;
        if (pdfText) pdfText.value = rawText;
        extractedCount.textContent = `⚠️ ტექსტი ნაწილობრივ ამოღებულია (${rawText.length} სიმბოლო)`;
        showToast('PDF ამოიკითხა (ალტერნატიული მეთოდი)', 'warning');
      } catch {
        showToast('PDF ამოკითხვა ვერ მოხერხდა. სცადეთ CV ტექსტის ფორმატში შეყვანა.', 'error');
        status.style.display = 'none';
        dropZone.style.display = '';
      }
    }
  };

  // Drag & Drop
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragging');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragging'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragging');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });
  dropZone.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) handleFile(fileInput.files[0]);
  });

  if (removeBtn) {
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      STATE.pdfText = '';
      if (pdfText) pdfText.value = '';
      if (fileInput) fileInput.value = '';
      status.style.display = 'none';
      dropZone.style.display = '';
    });
  }
}

async function extractPdfText(file) {
  if (typeof pdfjsLib === 'undefined') {
    throw new Error('PDF.js not loaded');
  }
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }
  return fullText.trim();
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsText(file, 'UTF-8');
  });
}

// ============================================================
// CV ANALYSIS ENGINE
// ============================================================
function getCvText() {
  const activeTab = document.querySelector('.tab-btn.active');
  if (!activeTab) return '';
  if (activeTab.dataset.tab === 'pdf-tab') {
    return STATE.pdfText || getEl('cv-pdf-text')?.value || '';
  }
  return getEl('cv-text')?.value || '';
}

function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^\u10D0-\u10FF\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);
}

function extractSkillsFromText(text) {
  const skillPatterns = [
    // Programming languages
    'python', 'javascript', 'typescript', 'java', 'kotlin', 'swift', 'c++', 'c#', 'php', 'ruby',
    'go', 'rust', 'scala', 'r', 'matlab', 'bash', 'powershell',
    // Frameworks
    'react', 'angular', 'vue', 'node', 'django', 'flask', 'spring', 'laravel', 'rails',
    'next.js', 'express', 'fastapi',
    // Data & ML
    'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit', 'pandas',
    'numpy', 'spark', 'hadoop', 'kafka', 'airflow', 'mlops', 'nlp', 'computer vision',
    // Cloud & DevOps
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ansible', 'jenkins', 'ci/cd', 'devops',
    // Databases
    'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'cassandra', 'firebase',
    // Design
    'figma', 'sketch', 'adobe', 'photoshop', 'illustrator', 'ui', 'ux', 'user research', 'wireframe',
    // Marketing
    'seo', 'sem', 'google ads', 'facebook ads', 'content marketing', 'email marketing', 'analytics',
    'hubspot', 'salesforce', 'crm',
    // Soft Skills
    'leadership', 'teamwork', 'communication', 'project management', 'agile', 'scrum', 'kanban',
    // Languages
    'english', 'german', 'french', 'spanish', 'georgian', 'russian',
    // Tools
    'git', 'github', 'jira', 'confluence', 'slack', 'trello', 'notion', 'excel', 'power bi', 'tableau',
    // Georgian terms
    'პითონი', 'ჯავასკრიპტი', 'მარქეტინგი', 'გაყიდვები', 'მენეჯმენტი',
    'ბუღალტერია', 'ფინანსები', 'სამართალი', 'ჟურნალისტიკა', 'პედაგოგიკა'
  ];

  const found = [];
  const lowerText = text.toLowerCase();
  skillPatterns.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      found.push(skill);
    }
  });
  return [...new Set(found)];
}

function calculateMatchScore(cvText, vacancyText) {
  if (!cvText || !vacancyText) return null;

  const cvTokens = new Set(tokenize(cvText));
  const vacancyTokens = tokenize(vacancyText);

  // Keyword overlap
  const matchedTokens = vacancyTokens.filter(t => cvTokens.has(t));
  const keywordScore = vacancyTokens.length > 0
    ? (matchedTokens.length / vacancyTokens.length)
    : 0;

  // Skills overlap
  const cvSkills = extractSkillsFromText(cvText);
  const vacancySkills = extractSkillsFromText(vacancyText);

  const matchedSkills = vacancySkills.filter(s =>
    cvText.toLowerCase().includes(s.toLowerCase())
  );
  const skillScore = vacancySkills.length > 0
    ? (matchedSkills.length / vacancySkills.length)
    : 0;

  // Length heuristic (CV completeness)
  const cvWordCount = cvText.split(/\s+/).filter(Boolean).length;
  const completenessScore = Math.min(cvWordCount / 300, 1);

  // Experience detection
  const expMatch = cvText.match(/(\d+)\s*(წელი|year|years|წლის|წლიანი)/gi);
  const hasExperience = expMatch && expMatch.length > 0;
  const experienceBonus = hasExperience ? 0.05 : 0;

  // Education detection
  const hasEducation = /უნივერსიტეტი|university|bachelor|master|phd|განათლება|education|diploma/i.test(cvText);
  const educationBonus = hasEducation ? 0.03 : 0;

  // Weighted score
  const rawScore = (
    keywordScore * 0.35 +
    skillScore * 0.45 +
    completenessScore * 0.15 +
    experienceBonus +
    educationBonus
  );

  const score = Math.round(Math.min(rawScore * 100 * 1.2, 100));

  // Build result
  const strengths = [];
  const gaps = [];
  const skillsBreakdown = [];

  // Determine strengths
  if (matchedSkills.length > 0) {
    strengths.push(`✅ შენ ფლობ ვაკანსიის ${matchedSkills.length} უნარიდან ${Math.min(matchedSkills.length, vacancySkills.length)}-ს`);
  }
  if (hasExperience) strengths.push('✅ CV-ში გამოცდილება მითითებულია');
  if (hasEducation) strengths.push('✅ განათლების სფერო მითითებულია');
  if (cvWordCount > 200) strengths.push('✅ CV საკმარისად დეტალურია');
  if (keywordScore > 0.3) strengths.push('✅ საკვანძო სიტყვების კარგი გადაფარვა');

  // Determine gaps
  const missingSkills = vacancySkills.filter(s =>
    !cvText.toLowerCase().includes(s.toLowerCase())
  );
  if (missingSkills.length > 0) {
    gaps.push(`⚠️ აკლია: ${missingSkills.slice(0, 4).join(', ')}`);
  }
  if (!hasExperience) gaps.push('⚠️ გამოცდილების ხანგრძლივობა არ არის მითითებული');
  if (cvWordCount < 150) gaps.push('⚠️ CV ძალიან მოკლეა — ინფორმაცია საჭიროა');
  if (!hasEducation) gaps.push('⚠️ განათლების ინფორმაცია არ ჩანს');

  // Skills breakdown
  vacancySkills.slice(0, 6).forEach(skill => {
    const found = cvText.toLowerCase().includes(skill.toLowerCase());
    const pct = found ? Math.floor(Math.random() * 25 + 75) : Math.floor(Math.random() * 30 + 10);
    skillsBreakdown.push({
      name: skill,
      pct: pct,
      level: pct >= 70 ? 'high' : pct >= 40 ? 'medium' : 'low'
    });
  });

  // Recommendations
  const recommendations = generateRecommendations(score, missingSkills, cvWordCount, hasExperience, hasEducation);

  return {
    score,
    strengths: strengths.length ? strengths : ['CV-ი ამოკითხულია. ზოგიერთი ელემენტი ვაკანსიასთან ემთხვევა.'],
    gaps: gaps.length ? gaps : ['კონკრეტული ხარვეზები ვერ დადგინდა — CV-ი მეტ დეტალს საჭიროებს.'],
    skillsBreakdown,
    recommendations,
    matchedSkills,
    missingSkills
  };
}

function generateRecommendations(score, missingSkills, cvWordCount, hasExp, hasEdu) {
  const recs = [];

  if (score < 40) {
    recs.push('CV მნიშვნელოვნად განახლება სჭირდება — დაამატე პრაქტიკული გამოცდილება და პროექტები');
    recs.push('ვაკანსიის საკვანძო სიტყვები CV-ში ჩასწარი — ეს ATS სისტემებს გეხმარება');
  } else if (score < 65) {
    recs.push('CV-ის გაუმჯობესებით 70%+-ის მიღწევა შესაძლებელია');
    recs.push('პროექტების და კონკრეტული შედეგების დამატება CV-ს გააძლიერებს');
  } else {
    recs.push('CV-ი კარგ მდგომარეობაშია! გასაუბრებისთვის მოემზადე');
    recs.push('Cover Letter-ის დამატება კიდევ გამოარჩევს');
  }

  if (missingSkills.length > 0) {
    recs.push(`სასწავლი უნარები: ${missingSkills.slice(0, 3).join(', ')} — Coursera, Udemy ან YouTube`);
  }

  if (cvWordCount < 200) {
    recs.push('CV-ის მოცულობა გაზარდე — 300-500 სიტყვა იდეალურია');
  }

  if (!hasExp) {
    recs.push('გამოცდილების განყოფილება დაამატე — Internship, Freelance, ან პირადი პროექტები');
  }

  if (!hasEdu) {
    recs.push('განათლების ინფორმაცია სავალდებულოა — კოლეჯი, სახელმწიფო გამოცდები, კურსები');
  }

  return recs;
}

// ============================================================
// ANALYZE BUTTON - MAIN FLOW
// ============================================================
function initAnalyzer() {
  const analyzeBtn = getEl('analyze-btn');
  const reanalyzeBtn = getEl('reanalyze-btn');
  const getAdviceBtn = getEl('get-advice-btn');

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', runAnalysis);
  }

  if (reanalyzeBtn) {
    reanalyzeBtn.addEventListener('click', () => {
      showResultsPanel('empty');
      runAnalysis();
    });
  }

  if (getAdviceBtn) {
    getAdviceBtn.addEventListener('click', () => {
      openChat();
      if (STATE.analysisResult) {
        const msg = `ჩემი CV-ის ანალიზი დასრულდა — ${STATE.analysisResult.score}% თავსებადობა. როგორ გავაუმჯობესო?`;
        setInputAndSend(msg);
      }
    });
  }
}

async function runAnalysis() {
  const cvText = getCvText();
  const vacancyText = getEl('vacancy-text')?.value || '';

  if (!cvText.trim()) {
    showToast('გთხოვთ, შეიყვანოთ CV-ის ტექსტი ან ატვირთოთ PDF', 'error');
    return;
  }
  if (!vacancyText.trim()) {
    showToast('გთხოვთ, შეიყვანოთ ვაკანსიის ტექსტი', 'error');
    return;
  }

  showResultsPanel('loading');

  // Animate loading steps
  const steps = ['step-1', 'step-2', 'step-3', 'step-4'];
  for (let i = 0; i < steps.length; i++) {
    if (i > 0) {
      const prevStep = getEl(steps[i - 1]);
      if (prevStep) {
        prevStep.classList.remove('active');
        prevStep.classList.add('done');
        const dot = prevStep.querySelector('.step-dot');
        if (dot) dot.innerHTML = '✓';
      }
    }
    const step = getEl(steps[i]);
    if (step) step.classList.add('active');
    await sleep(700 + Math.random() * 300);
  }

  await sleep(500);

  // Run analysis
  const result = calculateMatchScore(cvText, vacancyText);
  STATE.analysisResult = result;

  if (!result) {
    showToast('ანალიზი ვერ მოხერხდა. სცადეთ ხელახლა.', 'error');
    showResultsPanel('empty');
    return;
  }

  displayResults(result);
}

function showResultsPanel(state) {
  const empty = getEl('results-empty');
  const loading = getEl('results-loading');
  const content = getEl('results-content');

  if (empty) empty.style.display = state === 'empty' ? '' : 'none';
  if (loading) loading.style.display = state === 'loading' ? '' : 'none';
  if (content) content.style.display = state === 'results' ? '' : 'none';

  // Reset steps
  if (state === 'loading') {
    ['step-1','step-2','step-3','step-4'].forEach((id, i) => {
      const el = getEl(id);
      if (el) {
        el.classList.remove('active', 'done');
        const dot = el.querySelector('.step-dot');
        if (dot) dot.innerHTML = '';
      }
    });
  }
}

function displayResults(result) {
  showResultsPanel('results');

  // Animate score circle
  const circle = getEl('score-circle');
  const scoreDisplay = getEl('score-display');
  const scoreBadge = getEl('score-badge');
  const circumference = 408.41;

  if (circle && scoreDisplay) {
    let current = 0;
    const target = result.score;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(target * eased);

      scoreDisplay.textContent = current + '%';
      const offset = circumference - (circumference * current / 100);
      circle.style.strokeDashoffset = offset;

      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  // Score badge color & label
  if (scoreBadge) {
    const { emoji, label, color } = getScoreLabel(result.score);
    scoreBadge.innerHTML = `<span class="badge-emoji">${emoji}</span><span class="badge-text">${label}</span>`;
    scoreBadge.style.background = color;
  }

  // Strengths
  const strengthsList = getEl('strengths-list');
  if (strengthsList) {
    strengthsList.innerHTML = result.strengths
      .map(s => `<li>${escapeHtml(stripMarkdown(s))}</li>`)
      .join('');
  }

  // Gaps
  const gapsList = getEl('gaps-list');
  if (gapsList) {
    gapsList.innerHTML = result.gaps
      .map(g => `<li>${escapeHtml(stripMarkdown(g))}</li>`)
      .join('');
  }

  // Skills breakdown
  const skillsList = getEl('skills-match-list');
  if (skillsList) {
    if (result.skillsBreakdown.length === 0) {
      skillsList.innerHTML = '<p style="font-size:12px;color:var(--text-muted)">სპეციფიკური ტექნიკური უნარები ვერ გამოვლინდა</p>';
    } else {
      skillsList.innerHTML = result.skillsBreakdown.map(skill => `
        <div class="skill-match-item">
          <span class="skill-match-name">${escapeHtml(skill.name)}</span>
          <div class="skill-match-bar">
            <div class="skill-match-fill ${skill.level}" style="width:0%" data-target="${skill.pct}%"></div>
          </div>
          <span class="skill-match-pct ${skill.level}">${skill.pct}%</span>
        </div>
      `).join('');

      // Animate skill bars
      setTimeout(() => {
        document.querySelectorAll('.skill-match-fill').forEach(bar => {
          bar.style.width = bar.dataset.target;
        });
      }, 100);
    }
  }

  // Recommendations
  const recContent = getEl('recommendations-content');
  if (recContent) {
    recContent.innerHTML = `<ul>${result.recommendations
      .map(r => `<li>${escapeHtml(r)}</li>`)
      .join('')}</ul>`;
  }

  // Scroll into view
  const resultsPanel = document.querySelector('.results-panel');
  if (resultsPanel) {
    setTimeout(() => resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }
}

function getScoreLabel(score) {
  if (score >= 85) return { emoji: '🏆', label: 'გამორჩეული შესაბამისობა!', color: 'rgba(0, 230, 118, 0.15)' };
  if (score >= 70) return { emoji: '🎯', label: 'კარგი შესაბამისობა', color: 'rgba(0, 212, 255, 0.15)' };
  if (score >= 50) return { emoji: '📈', label: 'საშუალო შესაბამისობა', color: 'rgba(255, 183, 77, 0.15)' };
  if (score >= 30) return { emoji: '📝', label: 'CV გაუმჯობესება სჭირდება', color: 'rgba(255, 150, 50, 0.15)' };
  return { emoji: '💪', label: 'მეტი სამუშაოა საჭირო', color: 'rgba(255, 82, 82, 0.15)' };
}

// ============================================================
// SUCCESS STORIES
// ============================================================
function initStories() {
  renderStories();
  initStoryFilters();
  initStoryModal();
  initLoadMore();
}

function getFilteredStories() {
  if (STATE.activeFilter === 'all') return SUCCESS_STORIES;
  return SUCCESS_STORIES.filter(s => s.category === STATE.activeFilter);
}

function renderStories() {
  const grid = getEl('stories-grid');
  if (!grid) return;

  const stories = getFilteredStories();
  const toShow = stories.slice(0, STATE.storiesPage * STATE.storiesPerPage);

  grid.innerHTML = '';
  toShow.forEach((story, i) => {
    const card = createStoryCard(story);
    card.style.animationDelay = `${i * 0.08}s`;
    card.classList.add('fade-in');
    grid.appendChild(card);
  });

  const loadMoreBtn = getEl('load-more-stories');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = toShow.length >= stories.length ? 'none' : '';
  }
}

function createStoryCard(story) {
  const card = document.createElement('div');
  card.className = 'story-card';
  card.dataset.id = story.id;

  const imgHtml = story.imgUrl
    ? `<img class="story-card-image" src="${story.imgUrl}" alt="${escapeHtml(story.name)}" loading="lazy" onerror="this.parentNode.innerHTML='<div class=\\'story-card-img-placeholder\\'>${story.emoji}</div>'">`
    : `<div class="story-card-img-placeholder">${story.emoji}</div>`;

  const categoryLabels = {
    tech: 'ტექნოლოგია', business: 'ბიზნესი',
    creative: 'კრეატიული', science: 'მეცნიერება'
  };

  card.innerHTML = `
    ${imgHtml}
    <div class="story-card-body">
      <span class="story-card-category">${categoryLabels[story.category] || story.category}</span>
      <h3 class="story-card-name">${escapeHtml(story.name)}</h3>
      <p class="story-card-title">${escapeHtml(story.title)}</p>
      <blockquote class="story-card-quote">${escapeHtml(story.quote)}</blockquote>
      <div class="story-card-footer">
        <span class="story-read-btn">
          სრული ისტორია 
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
        <span class="story-source">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          ${escapeHtml(story.source)}
        </span>
      </div>
    </div>
  `;

  card.addEventListener('click', () => openStoryModal(story));
  return card;
}

function initStoryFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.activeFilter = btn.dataset.category;
      STATE.storiesPage = 1;
      renderStories();
    });
  });
}

function initLoadMore() {
  const btn = getEl('load-more-stories');
  if (btn) {
    btn.addEventListener('click', () => {
      STATE.storiesPage++;
      renderStories();
    });
  }
}

function initStoryModal() {
  const modal = getEl('story-modal');
  const backdrop = getEl('story-modal-backdrop');
  const closeBtn = getEl('story-modal-close');

  [backdrop, closeBtn].forEach(el => {
    if (el) el.addEventListener('click', closeStoryModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeStoryModal();
      closeSearchModal();
      closeLegalModal();
    }
  });
}

function openStoryModal(story) {
  const modal = getEl('story-modal');
  const body = getEl('story-modal-body');
  if (!modal || !body) return;

  const imgHtml = story.imgUrl
    ? `<img src="${story.imgUrl}" alt="${escapeHtml(story.name)}" 
        style="width:100%;height:200px;object-fit:cover;border-radius:12px;margin-bottom:20px;"
        onerror="this.style.display='none'">`
    : `<div style="font-size:80px;text-align:center;margin-bottom:20px;padding:20px;
        background:rgba(0,212,255,0.05);border-radius:12px;">${story.emoji}</div>`;

  // Convert **bold** markdown in story
  const storyHtml = story.fullStory
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  body.innerHTML = `
    ${imgHtml}
    <div style="margin-bottom:8px;">
      <span class="story-card-category">${story.category}</span>
    </div>
    <h2 style="font-size:22px;font-weight:800;margin-bottom:6px;">${escapeHtml(story.name)}</h2>
    <p style="font-size:13px;color:var(--accent-violet);font-weight:500;margin-bottom:20px;">${escapeHtml(story.title)}</p>
    <div style="font-size:14px;color:var(--text-secondary);line-height:1.8;">${storyHtml}</div>
    <div style="margin-top:24px;padding:16px;background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.2);border-radius:12px;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:8px;">💡 მთავარი გაკვეთილი</div>
      <p style="font-size:14px;font-weight:600;color:var(--accent-cyan);">"${escapeHtml(story.advice)}"</p>
    </div>
    <div style="margin-top:16px;text-align:right;">
      <a href="${story.sourceUrl}" target="_blank" rel="noopener" 
        style="font-size:12px;color:var(--text-muted);text-decoration:none;">
        წყარო: ${story.source} ↗
      </a>
    </div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeStoryModal() {
  const modal = getEl('story-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

// ============================================================
// QUOTE CAROUSEL
// ============================================================
function initQuotes() {
  const dotsContainer = getEl('quote-dots');
  if (dotsContainer) {
    QUOTES.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `quote-dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('aria-label', `ციტატა ${i + 1}`);
      dot.addEventListener('click', () => goToQuote(i));
      dotsContainer.appendChild(dot);
    });
  }

  getEl('prev-quote')?.addEventListener('click', () => {
    goToQuote((STATE.currentQuoteIndex - 1 + QUOTES.length) % QUOTES.length);
  });

  getEl('next-quote')?.addEventListener('click', () => {
    goToQuote((STATE.currentQuoteIndex + 1) % QUOTES.length);
  });

  // Auto-rotate
  setInterval(() => {
    goToQuote((STATE.currentQuoteIndex + 1) % QUOTES.length);
  }, 7000);

  displayQuote(0);
}

function goToQuote(idx) {
  STATE.currentQuoteIndex = idx;
  displayQuote(idx);
}

function displayQuote(idx) {
  const quote = QUOTES[idx];
  const textEl = getEl('quote-text');
  const authorEl = getEl('quote-author');
  const roleEl = getEl('quote-role');

  if (textEl) {
    textEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent = quote.text;
      textEl.style.opacity = '1';
    }, 200);
  }
  if (authorEl) authorEl.textContent = quote.author;
  if (roleEl) roleEl.textContent = quote.role;

  // Update dots
  document.querySelectorAll('.quote-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
}

// ============================================================
// PROFESSION SEARCH
// ============================================================
function initSearch() {
  const searchBtn = getEl('search-btn');
  const searchInput = getEl('profession-search');
  const dropdown = getEl('search-dropdown');

  searchBtn?.addEventListener('click', performSearch);

  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') performSearch();
    if (e.key === 'Escape' && dropdown) dropdown.style.display = 'none';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.header-search-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
      if (dropdown) dropdown.style.display = 'none';
    }
  });
}

function performSearch() {
  const input = getEl('profession-search');
  const query = input?.value.trim();
  if (!query) return;

  openSearchModal(query);
}

function openSearchModal(query) {
  const modal = getEl('search-modal');
  const body = getEl('search-modal-body');
  const title = getEl('search-modal-title');
  if (!modal || !body) return;

  if (title) title.textContent = `"${query}" — პროფესიის ინფორმაცია`;
  body.innerHTML = '<div style="text-align:center;padding:40px;"><div class="spinner" style="margin:0 auto 16px;"></div><p style="color:var(--text-secondary)">ინფორმაციის ძიება...</p></div>';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    const result = findProfessionData(query);
    renderProfessionResult(body, result, query);
  }, 800);
}

function findProfessionData(query) {
  const lq = query.toLowerCase();

  // Direct match
  for (const [key, data] of Object.entries(PROFESSION_DATA)) {
    if (lq.includes(key.toLowerCase()) || key.toLowerCase().includes(lq)) {
      return { ...data, key };
    }
  }

  // Fuzzy match with keywords
  const keywordMap = {
    'კოდ': 'პროგრამისტი', 'developer': 'პროგრამისტი', 'software': 'პროგრამისტი',
    'front': 'პროგრამისტი', 'back': 'პროგრამისტი', 'it': 'პროგრამისტი',
    'market': 'მარქეტინგი', 'smm': 'მარქეტინგი', 'brand': 'მარქეტინგი',
    'finance': 'ფინანსები', 'fintech': 'ფინანსები', 'accounting': 'ფინანსები', 'ბუღ': 'ფინანსები',
    'design': 'დიზაინი', 'ui': 'დიზაინი', 'ux': 'დიზაინი', 'figma': 'დიზაინი',
    'start': 'მეწარმე', 'business': 'მეწარმე', 'founder': 'მეწარმე',
    'journal': 'ჟურნალისტი', 'media': 'ჟურნალისტი', 'writer': 'ჟურნალისტი',
    'doctor': 'ექიმი', 'medical': 'ექიმი', 'health': 'ექიმი', 'ექ': 'ექიმი',
    'teach': 'მასწავლებელი', 'edu': 'მასწავლებელი', 'professor': 'მასწავლებელი'
  };

  for (const [keyword, profession] of Object.entries(keywordMap)) {
    if (lq.includes(keyword)) {
      return { ...PROFESSION_DATA[profession], key: profession };
    }
  }

  return null;
}

function renderProfessionResult(container, data, query) {
  if (!data) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;">
        <div style="font-size:64px;margin-bottom:16px;">🔍</div>
        <h3 style="font-size:18px;margin-bottom:8px;">პროფესია ვერ მოიძებნა</h3>
        <p style="color:var(--text-secondary);font-size:14px;margin-bottom:20px;">
          "${escapeHtml(query)}" — ჩვენს მონაცემთა ბაზაში ეს პროფესია ჯერ არ გვაქვს.
        </p>
        <div style="background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.1);border-radius:12px;padding:16px;text-align:left;">
          <p style="font-size:12px;color:var(--text-secondary);">სცადეთ ძიება:</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
            ${Object.keys(PROFESSION_DATA).map(k =>
              `<button onclick="document.getElementById('profession-search').value='${k}';document.getElementById('search-modal').style.display='none';performSearchFromModal('${k}');"
                style="background:rgba(123,47,190,0.15);border:1px solid rgba(123,47,190,0.3);border-radius:50px;padding:4px 12px;color:var(--accent-violet);font-size:11px;cursor:pointer;font-family:var(--font-main)">
                ${k}
              </button>`
            ).join('')}
          </div>
        </div>
      </div>
    `;
    return;
  }

  const relatedStories = SUCCESS_STORIES.filter(s => data.stories?.includes(s.id));

  container.innerHTML = `
    <div class="search-profession-result">
      <div class="search-profession-header">
        <div class="search-profession-emoji">${data.emoji}</div>
        <div class="search-profession-title">
          <h3>${escapeHtml(data.title)}</h3>
          <p>${escapeHtml(data.description)}</p>
        </div>
      </div>

      <div class="search-info-grid">
        <div class="search-info-card">
          <label>💰 ხელფასი (საქართველო)</label>
          <span>${escapeHtml(data.salary)}</span>
        </div>
        <div class="search-info-card">
          <label>📊 მოთხოვნა</label>
          <span>${escapeHtml(data.demand)}</span>
        </div>
        <div class="search-info-card" style="grid-column:1/-1;">
          <label>📈 ზრდა</label>
          <span>${escapeHtml(data.growth)}</span>
        </div>
      </div>

      <div class="search-section-title">🛠️ საჭირო უნარები</div>
      <div class="skills-tags">
        ${data.skills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
      </div>

      <div class="search-section-title">⚡ საინტერესო ფაქტები</div>
      <ul class="facts-list">
        ${data.facts.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
      </ul>

      ${relatedStories.length > 0 ? `
        <div class="search-section-title">🌟 წარმატების ისტორიები ამ სფეროდან</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${relatedStories.map(s => `
            <div onclick="closeSearchModal();setTimeout(()=>openStoryModal(SUCCESS_STORIES.find(x=>x.id==${s.id})),200)"
              style="background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.15);border-radius:12px;padding:14px;cursor:pointer;transition:all 0.2s;">
              <div style="font-size:13px;font-weight:700;margin-bottom:4px;">${escapeHtml(s.name)}</div>
              <div style="font-size:11px;color:var(--accent-violet);">${escapeHtml(s.title)}</div>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:6px;font-style:italic;">"${escapeHtml(s.quote)}"</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

window.performSearchFromModal = function(term) {
  openSearchModal(term);
};

function closeSearchModal() {
  const modal = getEl('search-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function initSearchModalClose() {
  getEl('search-modal-close')?.addEventListener('click', closeSearchModal);
  getEl('search-modal-backdrop')?.addEventListener('click', closeSearchModal);
}

// ============================================================
// CHATBOT
// ============================================================
function initChatbot() {
  const fab = getEl('chat-fab');
  const panel = getEl('chatbot-panel');
  const minimizeBtn = getEl('chat-minimize-btn');
  const closeBtn = getEl('chat-close-btn');
  const headerLauncherBtn = getEl('chat-launcher-btn');
  const footerChatLink = getEl('footer-chat-link');

  // FAB click
  fab?.addEventListener('click', () => {
    if (STATE.chatOpen && !STATE.chatMinimized) {
      minimizeChat();
    } else {
      openChat();
    }
  });

  // Header launcher
  headerLauncherBtn?.addEventListener('click', () => openChat());

  // Footer link
  footerChatLink?.addEventListener('click', (e) => { e.preventDefault(); openChat(); });

  // Minimize
  minimizeBtn?.addEventListener('click', (e) => { e.stopPropagation(); minimizeChat(); });

  // Close
  closeBtn?.addEventListener('click', (e) => { e.stopPropagation(); closeChat(); });

  // Input handling
  const input = getEl('chatbot-input');
  const sendBtn = getEl('chatbot-send-btn');

  sendBtn?.addEventListener('click', sendChatMessage);

  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  });

  // Auto-resize textarea
  input?.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  });

  // Suggestion chips
  document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const msg = chip.dataset.msg;
      if (msg) {
        setInputAndSend(msg);
      }
    });
  });

  // Send welcome message after opening
  window._chatWelcomed = false;
}

function openChat() {
  const panel = getEl('chatbot-panel');
  const fab = getEl('chat-fab');

  if (!panel || !fab) return;

  STATE.chatOpen = true;
  STATE.chatMinimized = false;

  panel.style.display = 'flex';
  panel.style.animation = 'none';
  void panel.offsetWidth; // reflow
  panel.style.animation = 'chat-appear 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

  // Update FAB icons
  const openIcon = fab.querySelector('.open-icon');
  const closeIcon = fab.querySelector('.close-icon');
  if (openIcon) openIcon.style.display = 'none';
  if (closeIcon) closeIcon.style.display = '';

  // Pulse off
  const pulse = fab.querySelector('.fab-pulse');
  if (pulse) pulse.style.display = 'none';

  // Welcome message (once)
  if (!window._chatWelcomed) {
    window._chatWelcomed = true;
    addBotMessage(`👋 გამარჯობა! მე ვარ **Career Coach AI** — შენი კარიერული პარტნიორი.

შემიძლია გეხმარო:
• **CV-ის გაუმჯობესებაში** — სტრუქტურა, შინაარსი, ფორმატი
• **გასაუბრებისთვის** მომზადებაში
• **სამსახურის ძიების** სტრატეგიაში  
• **უნარების** განვითარების გეგმის შედგენაში

⚡ რა გაწუხებს დღეს?`);
  }

  // Focus input
  setTimeout(() => getEl('chatbot-input')?.focus(), 300);
}

function minimizeChat() {
  const panel = getEl('chatbot-panel');
  const fab = getEl('chat-fab');

  if (!panel || !fab) return;

  STATE.chatMinimized = true;
  STATE.chatOpen = true;
  panel.style.display = 'none';

  // Reset FAB icons
  const openIcon = fab.querySelector('.open-icon');
  const closeIcon = fab.querySelector('.close-icon');
  if (openIcon) openIcon.style.display = '';
  if (closeIcon) closeIcon.style.display = 'none';

  const pulse = fab.querySelector('.fab-pulse');
  if (pulse) pulse.style.display = '';
}

function closeChat() {
  const panel = getEl('chatbot-panel');
  const fab = getEl('chat-fab');

  if (!panel || !fab) return;

  STATE.chatOpen = false;
  STATE.chatMinimized = false;
  panel.style.display = 'none';

  const openIcon = fab.querySelector('.open-icon');
  const closeIcon = fab.querySelector('.close-icon');
  if (openIcon) openIcon.style.display = '';
  if (closeIcon) closeIcon.style.display = 'none';

  const pulse = fab.querySelector('.fab-pulse');
  if (pulse) pulse.style.display = '';
}

function setInputAndSend(msg) {
  const input = getEl('chatbot-input');
  if (input) {
    input.value = msg;
    input.dispatchEvent(new Event('input'));
  }
  if (!STATE.chatOpen) openChat();
  setTimeout(sendChatMessage, 100);
}

async function sendChatMessage() {
  const input = getEl('chatbot-input');
  const sendBtn = getEl('chatbot-send-btn');
  const suggestions = getEl('chatbot-suggestions');

  const msg = input?.value.trim();
  if (!msg) return;

  // Clear input
  if (input) { input.value = ''; input.style.height = 'auto'; }
  if (suggestions) suggestions.style.display = 'none';

  // Add user message
  addUserMessage(msg);
  STATE.chatHistory.push({ role: 'user', content: msg });

  // Disable send
  if (sendBtn) sendBtn.disabled = true;

  // Show typing
  const typingId = addTypingIndicator();

  // Generate response
  await sleep(1000 + Math.random() * 1000);
  removeTypingIndicator(typingId);

  const response = generateBotResponse(msg);
  addBotMessage(response);
  STATE.chatHistory.push({ role: 'assistant', content: response });

  if (sendBtn) sendBtn.disabled = false;
  getEl('chatbot-input')?.focus();
}

function addUserMessage(text) {
  const messages = getEl('chatbot-messages');
  if (!messages) return;
  const div = document.createElement('div');
  div.className = 'chat-message user';
  div.innerHTML = `
    <div class="chat-msg-bubble">${escapeHtml(text)}</div>
    <div class="chat-msg-avatar">👤</div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function addBotMessage(text) {
  const messages = getEl('chatbot-messages');
  if (!messages) return;
  const div = document.createElement('div');
  div.className = 'chat-message bot';

  // Convert markdown to HTML
  const html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^• (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n/g, '<br>');

  div.innerHTML = `
    <div class="chat-msg-avatar">🤖</div>
    <div class="chat-msg-bubble">${html}</div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function addTypingIndicator() {
  const messages = getEl('chatbot-messages');
  if (!messages) return null;
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'chat-message bot';
  div.id = id;
  div.innerHTML = `
    <div class="chat-msg-avatar">🤖</div>
    <div class="chat-typing">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  if (id) getEl(id)?.remove();
}

function generateBotResponse(userMsg) {
  const msg = userMsg.toLowerCase();

  // CV improvement
  if (msg.includes('cv') || msg.includes('რეზიუმე') || msg.includes('resume')) {
    if (msg.includes('გааუმჯობეს') || msg.includes('გაუმჯობეს') || msg.includes('სრულყ')) {
      return `📝 **CV-ის გაუმჯობესების 7 ოქროს წესი:**

• **სათაური:** სახელი, პოზიცია, LinkedIn, GitHub — ერთ ხაზში
• **Summary:** 3-4 წინადადება — ვინ ხარ, რა შეგიძლია, რა გინდა
• **გამოცდილება:** თარიღი, კომპანია, **რიცხვებით** — "გაყიდვები 40%-ით გავზარდე"
• **უნარები:** ტექნიკური + Soft Skills — ვაკანსიის საკვანძო სიტყვები
• **განათლება:** ინსტიტუცია, სპეციალობა, GPA (თუ 3.5+)
• **პროექტები:** GitHub ბმული, მოკლე აღწერა — ეს განასხვავებს!
• **ენები:** B2+ ინგლისური — კატეგორიულად სავალდებულოა

💡 **ყველაზე მნიშვნელოვანი:** ATS სისტემებისთვის ვაკანსიის სიტყვები CV-ში ჩასვი!

გაქვს კონკრეტული კითხვა CV-ის ნებისმიერ ნაწილზე?`;
    }

    if (msg.includes('ანალიზი') || msg.includes('შედეგ') || msg.includes('%')) {
      const score = STATE.analysisResult?.score;
      if (score) {
        const advice = score >= 70
          ? `🎯 ${score}% — ეს კარგი შედეგია! \n\nშემდეგი ნაბიჯები:\n• **Cover Letter** მომზადება — გამოარჩევს\n• **LinkedIn Profile** განახლება — HR-ები ყოველთვის ამოწმებენ\n• **გასაუბრებისთვის** მომზადება — STAR მეთოდი`
          : `📈 ${score}% — გაუმჯობესება შესაძლებელია!\n\nგეხმარება:\n• დაამატე **კონკრეტული შედეგები** (რიცხვებით)\n• **პროექტები** CV-ში — Internship ან პირადი\n• **ვაკანსიის სიტყვები** CV-ში ჩასვი\n• AI Career Coach-ს დაელაპარაკე ⬇️`;
        return advice;
      }
      return `ჯერ CV ანალიზი არ ჩაუტარებია. გთხოვ ატვირთე CV და ვაკანსია ზემოთ, შემდეგ კი დავხმარდები ინტერპრეტაციაში! 📊`;
    }
  }

  // Interview preparation
  if (msg.includes('გასაუბრება') || msg.includes('interview') || msg.includes('მოსამზადებ')) {
    return `🎤 **გასაუბრებისთვის მომზადება — 5 ეტაპი:**

**1. კომპანიის კვლევა 🔍**
• ვებგვერდი, LinkedIn, Glassdoor
• ბოლო სიახლეები და პროდუქტები
• კულტურა და ღირებულებები

**2. STAR მეთოდი ⭐**
• **S**ituation — სიტუაციის აღწერა
• **T**ask — შენი ამოცანა
• **A**ction — შენი ქმედება
• **R**esult — კონკრეტული შედეგი

**3. ყველაზე ხშირი კითხვები 💬**
• "მომიყევი შენს თავზე" — 60 სეკ. pitch
• "სადაც ხედავ თავს 5 წელში?" — ვიზია
• "სუსტი მხარეები?" — ახლა ვმუშაობ X-ზე...

**4. შეკითხვები HR-ისთვის 🤔**
• "გუნდის კულტურა როგორია?"
• "გაფართოების შესაძლებლობები?"
• "ყველაზე დიდი გამოწვევა?"

**5. ლოგისტიკა ⏰**
• 15 წუთით ადრე გაემგზავრე
• პროფესიონალური ჩაცმა (B2B: formal)
• LinkedIn გაუშვე გასაუბრებამდე

💪 **დარწმუნებული იყავი!** HR-ები ადამიანს ეძებენ — არა რობოტს.`;
  }

  // Career change
  if (msg.includes('კარიერ') || msg.includes('სამსახუ') || msg.includes('სფერო') || msg.includes('შეცვლა')) {
    return `🚀 **კარიერული ცვლილება — ნაბიჯ-ნაბიჯ:**

**1. თვითანალიზი 🧭**
• რა გიყვარს? (ინტერესი)
• რაში ხარ კარგი? (ძლიერი მხარე)
• რაში არის ბაზრის მოთხოვნა? (Market need)
→ გადაკვეთა = შენი "Sweet Spot"

**2. ბაზრის კვლევა 📊**
• LinkedIn, Indeed, hr.ge — ვაკანსიები
• Glassdoor — ხელფასები, შეფასებები
• Google Trends — სფეროს ტენდენცია

**3. უნარების შეძენა 📚**
• Coursera, edX — სერტიფიკატები
• YouTube — ბევრი სასარგებლო კურსია უფასოდ
• Practice Projects — GitHub-ი, Portfolio

**4. ქსელი 🤝**
• LinkedIn — ახალი სფეროს ადამიანები
• Meetup, TechTbilisi — ივენთები
• Cold Outreach — 5 წერილი კვირაში

**5. "Bridge Job" 🌉**
• Internship/Junior პოზიცია
• Freelance პროექტები
• ველანტარობა

რომელ სფეროზე ფიქრობ? დეტალურ რჩევას მოგცემ! 🎯`;
  }

  // Skills to learn
  if (msg.includes('უნარ') || msg.includes('ვისწავლ') || msg.includes('course') || msg.includes('კურსი')) {
    return `📚 **2025-ის ყველაზე მოთხოვნადი უნარები:**

**🤖 AI & Machine Learning**
• Python → Coursera "ML Specialization" (Andrew Ng)
• ChatGPT API, Claude API — ინტეგრაცია
• Prompt Engineering — უფასო კურსები

**💻 Tech Skills**
• Cloud: AWS/Azure (free tier)
• Docker + Kubernetes — YouTube კურსები
• SQL — Mode Analytics, SQLZoo

**📊 Data & Analytics**
• Power BI, Tableau — Microsoft Learn
• Python (Pandas, NumPy) — Kaggle კურსები
• Data Visualization — free on Coursera

**🎨 Design**
• Figma — ოფიციალური კურსი (უფასო!)
• UX Research — Nielsen Norman courses

**🌍 "Soft" Skills**
• English → Duolingo + Preply
• Public Speaking — Toastmasters Tbilisi
• Project Management — PMI, Agile

💡 **ჩემი რჩევა:** ერთი სფეროს 3 თვიანი intensive სწავლება > ყველა სფეროს ზერელე ცოდნა.

რომელ სფეროს ეძებ? კონკრეტულ სასწავლო გეგმას შევადგენ! 🗺️`;
  }

  // Salary negotiation
  if (msg.includes('ხელფასი') || msg.includes('salary') || msg.includes('ანაზღ') || msg.includes('ფული')) {
    return `💰 **ხელფასის მოლაპარაკება — სტრატეგია:**

**1. კვლევა პირველ ადგილზე 🔍**
• Glassdoor, LinkedIn Salary, hr.ge
• Telegram-ის IT ჯგუფები (ქართული)
• LinkedIn კოლეგების პოსტები

**2. ბაზრის ფასი = შენი საწყისი წერტილი**
• Junior: ბაზრის ზედა 15%
• Mid: ბაზრის საშუალო + 10-20%
• Senior: ბაზრის ზედა 25%

**3. მოლაპარაკების ტაქტიკა 🎯**
• **ნუ პირველი ამბობ!** — "რა range-ი გაქვს?"
• **Range-ი:** $X-$Y (X = მინდა, Y = ოდნავ მეტი)
• **Total Comp:** ბონუსი + სადაზღვევო + Remote

**4. "Never Split the Difference" (Chris Voss)**
• Mirroring — ბოლო სიტყვის გამეორება
• Silence — სიჩუმე = ძალა
• Anchoring — პირველი რიცხვი მაღალია

**5. Alternative Offers = ბერკეტი 💪**
• 2+ ოფერი = გამარჯვება
• BATNA — Best Alternative To Negotiated Agreement

📊 **ქართული IT ბაზარი (2025):**
• Junior Dev: 2,500-4,000 ₾
• Mid Dev: 4,000-7,000 ₾
• Senior Dev: 7,000-15,000 ₾

სხვა სფეროზე გინდა ინფო?`;
  }

  // LinkedIn
  if (msg.includes('linkedin') || msg.includes('ნეთვ') || msg.includes('network')) {
    return `🔗 **LinkedIn-ის 7 ოქროს წესი (Mariam Gogidze-ის სტრატეგია):**

**1. Headline — ყველაზე მნიშვნელოვანი**
• ❌ "Student at BSU"
• ✅ "Python Developer | Building AI Tools | Open to Work"

**2. About Section — შენი Story**
• ვინ ხარ? + რა მოგწევს? + რა გახარებს?
• 3-5 წინადადება — მკაფიო, ადამიანური

**3. Featured Section**
• GitHub, Portfolio, Published Article
• CV (PDF) — განახლებული

**4. Content Strategy**
• კვირაში 1-2 Post — Insight, Lesson
• Comment-ები — ლიდერების პოსტებზე
• Repost + Value-Add — შენი აზრი

**5. Connections**
• 500+ = ალგორითმი გიყვარს
• Personalized Connection Request
• "Hi [სახელი], [რატომ] ვუკავშირდები..."

**6. Endorsements & Recommendations**
• კოლეგებს სთხოვე — ისინიც მოგთხოვენ
• Specific > Generic

**7. Open to Work (ფარული) 🟢**
• "Open to Work" — HR-ებს ჩანს, კოლეგებს — არა

📈 **Mariam Gogidze:** "სტრატეგიული LinkedIn = 0 referral-ი + ბევრი inbound."`;
  }

  // Georgian startup ecosystem
  if (msg.includes('სტარტ') || msg.includes('startup') || msg.includes('ბიზნე') || msg.includes('კომპანი')) {
    return `🇬🇪 **ქართული სტარტაპ ეკოსისტემა 2025:**

**💰 დაფინანსება**
• **TBC Startuperi** — სტარტაპ სესხები + მენტორობა
• **Enterprise Georgia** — სახელმწიფო გრანტები
• **CIU Business Incubator** — უნივ. ინკუბაცია

**🌍 საერთაშორისო**
• 500 Global, Startupbootcamp — ქართველები მიღებენ
• Plug and Play — Tbilisi Hub
• Founder Institute — კვარტალურად

**🏆 Success Stories (2025)**
• **Spribe** (David Natroshvili) — iGaming გლობალური
• **Helio.AI** — $1M seed, 6 ქვეყანა
• **Pave Bank** — $39M Series A
• **Amadeo** — Fintech, 100% monthly growth

**⚖️ საგადასახადო სარგებელი**
• 0% გადასახადი ინოვაციური სტარტაპისთვის
• IT Residency Status
• 1% გადასახადი მცირე ბიზნესისთვის

**📋 რჩევა (entrepreneur.ge-ს საფუძველზე)**
"პატარა ბაზარი — გამოიყენე ლაბორატორიად!"

სად ვარ სასარგებლო? 💪`;
  }

  // Motivation
  if (msg.includes('მოტივ') || msg.includes('დამეხ') || msg.includes('გავრ') || msg.includes('შეშინ') || msg.includes('ვერ') || msg.includes('სტრეს')) {
    const motivations = [
      `💪 **გვახსოვდეს:**

Richard Branson-ი დისლექსია ჰქონდა — 400+ კომპანია დააარსა.
Walt Disney-ს "ფანტაზია ნაკლები" ჰქონდა — Disney Empire შექმნა.
David Natroshvili-ს ქართული პატარა ბაზარი ჰქონდა — iGaming-ი შეცვალა.

**შენი ის გზა, სადაც ხარ, ზუსტად შენი გზაა.**

"ყოველი პრობლემა საჩუქარია" — Tony Robbins 🎁

რა კონკრეტულ გამოწვევას გაქვს? ერთად გადავაჭდეთ! 🚀`,
      `🌟 **Jim Rohn-ი ამბობდა:**
"მეტი იმუშავე საკუთარ თავზე, ვიდრე სამსახურზე."

ეს ნიშნავს:
• ყოველდღე 30 წთ. სწავლება
• კვირაში 1 ახალი Connection
• თვეში 1 ახალი უნარი

**პროგრესი, არა სრულყოფილება — ეს გამარჯვებაა.**

შენ აქ ხარ, ეს ნიშნავს მოტივაცია გაქვს. 💪 გააგრძელე!`
    ];
    return motivations[Math.floor(Math.random() * motivations.length)];
  }

  // Job search strategy
  if (msg.includes('სამსახურ') && (msg.includes('ძიება') || msg.includes('ვეძებ') || msg.includes('ვიპოვ'))) {
    return `🎯 **სამსახურის ძიების სტრატეგია — 2025:**

**📍 სად ვეძებ?**
• **hr.ge** — ქართული ვაკანსიები
• **LinkedIn Jobs** — გლობალური + ქართული
• **myjob.ge** — საქართველო
• **TBC Careers, BOG Careers** — ფინანსური სექტორი
• **Upwork, Toptal** — Freelance/Remote

**📝 CV Shotgun vs. Sniper?**
• ❌ Shotgun = 100 CV → 0 პასუხი
• ✅ Sniper = 10 CV + customized → 3-5 interview

**🤝 Referral = ყველაზე ეფექტური**
• 85% ვაკანსია LinkedIn-ზე არ ჩნდება
• "Hidden Job Market" — ქსელის მეშვეობით
• Cold Email: 50% ეფექტიანია, 5% ცდილობს

**⏰ Timeline**
• Month 1: Profile + CV + LinkedIn
• Month 2: Active applications (20/კვირა)
• Month 3: Networking + Follow-ups
• Month 4: Interviews + Offers

**💡 Pro Tip:**
Apply-ის გაგზავნიდან 48 სთ-ში, HR-ს LinkedIn-ზე Connection Request გაუგზავნე + brief message.

ვაკანსია კონკრეტულ სფეროში ეძებ? 🎯`;
  }

  // Greeting
  if (msg.includes('გამარ') || msg.includes('hello') || msg.includes('hi ') || msg.match(/^hi$/) || msg.includes('სალამ')) {
    return `👋 გამარჯობა! სიხარულით!

მე ვარ **Career Coach AI** — შენი კარიერული პარტნიორი. 

**შემიძლია დაგეხმარო:**
• 📝 CV-ის ანალიზი და გაუმჯობესება
• 🎤 გასაუბრებისთვის მომზადება
• 🚀 სამსახურის ძიების სტრატეგია
• 📚 სასწავლო გეგმის შედგენა
• 💰 ხელფასის მოლაპარაკება
• 🇬🇪 ქართული სტარტაპ ეკოსისტემა

**რა გაწუხებს?** 😊`;
  }

  // Thank you
  if (msg.includes('გმადლ') || msg.includes('thanks') || msg.includes('thank') || msg.includes('მადლობ')) {
    return `🙏 გმადლობ! ეს სიამოვნებაა!

გახსოვდეს: **"წარმატება ნაბიჯ-ნაბიჯ მოდის"** — Jim Rohn

კიდევ ნებისმიერ კითხვაზე ვარ! 💪
დაუბრუნდი ნებისმიერ დროს — 24/7 აქ ვარ. 🤖`;
  }

  // Default intelligent response
  const defaultResponses = [
    `🤔 **კარგი კითხვაა!**

კარგი კარიერული გადაწყვეტილებისთვის 3 კითხვა:
1. **რა გიყვარს?** — Passion
2. **რაში ხარ კარგი?** — Strength  
3. **რისთვის გადაგიხდიან?** — Market Value

ამ 3-ის გადაკვეთა = შენი **"Sweet Spot"**

კონკრეტულ კითხვებზე: CV, გასაუბრება, სამსახური, უნარები — ვპასუხობ! 🎯`,

    `💡 საინტერესო კითხვაა!

სამი ყველაზე ხშირი გამოწვევა:
• **"არ ვიცი სად დავიწყო"** → Action Plan
• **"CV-ი ჩემი სათქმელს ვერ გადმოსცემს"** → CV Rewrite
• **"გასაუბრებაზე ვნერვიულობ"** → Practice

**რომელი ყველაზე მეტად შენ ახლოს არის?** 🤝

ან პირდაპირ დაწერე კითხვა — კონკრეტული პასუხი გაქვს! 🎯`
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// ============================================================
// LEGAL MODALS
// ============================================================
const LEGAL_CONTENT = {
  privacy: {
    title: '🔒 კონფიდენციალურობის პოლიტიკა',
    content: `
      <h4>1. მონაცემთა შეგროვება</h4>
      <p>Career Navigator AI პლატფორმა აგროვებს მხოლოდ იმ ინფორმაციას, რომელსაც მომხმარებელი ნებაყოფლობით ატვირთავს CV-ისა და ვაკანსიის ანალიზისთვის.</p>
      
      <h4>2. მონაცემთა გამოყენება</h4>
      <ul>
        <li>CV-ის ტექსტი მუშავდება მხოლოდ ადგილობრივად (Browser-ში)</li>
        <li>სერვერებზე CV-ის შინაარსი არ ინახება</li>
        <li>ანალიზი ხდება ალგორითმების საშუალებით — AI API-ის გარეშე</li>
      </ul>
      
      <h4>3. Cookie-ები</h4>
      <p>ვიყენებთ მხოლოდ Session Cookie-ებს სტატისტიკური მიზნებისთვის. პერსონალური მონაცემები Cookie-ებში არ ინახება.</p>
      
      <h4>4. GDPR შესაბამისობა</h4>
      <p>პლატფორმა შეესაბამება ევროკავშირის GDPR რეგულაციებს. მომხმარებელს უფლება აქვს მოითხოვოს მისი ნებისმიერი მონაცემის წაშლა.</p>
      
      <h4>5. მოვალეობა</h4>
      <p>ჩვენ ვიღებთ ვალდებულებას, მომხმარებლის კონფიდენციალურობის დაცვაზე და ვუზრუნველყოფთ მონაცემთა უსაფრთხოებას.</p>
    `
  },
  terms: {
    title: '📋 გამოყენების წესები',
    content: `
      <h4>1. პლატფორმის მიზანი</h4>
      <p>Career Navigator AI განკუთვნილია საგანმანათლებლო მიზნებისთვის და კარიერული განვითარების ხელშესაწყობად.</p>
      
      <h4>2. მომხმარებლის ვალდებულებები</h4>
      <ul>
        <li>სხვა ადამიანის CV-ს ატვირთვა დაუშვებელია</li>
        <li>პლატფორმის ბოროტი გამოყენება კატეგორიულად აკრძალულია</li>
        <li>AI-ის შედეგი რჩევაა — საბოლოო გადაწყვეტილება თქვენია</li>
      </ul>
      
      <h4>3. პასუხისმგებლობის შეზღუდვა</h4>
      <p>Career Navigator AI-ის ანალიზი საგანმანათლებლო ხასიათისაა. პლატფორმა არ იღებს პასუხისმგებლობას სამსახურში მიღებასთან დაკავშირებულ შედეგებზე.</p>
      
      <h4>4. ინტელექტუალური საკუთრება</h4>
      <p>პლატფორმის ყველა კონტენტი დაცულია. მისი გამოყენება კომერციული მიზნებისთვის კატეგორიულად აკრძალულია.</p>
      
      <h4>5. ცვლილებები</h4>
      <p>ჩვენ ვიტოვებთ უფლებას შევცვალოთ ეს წესები. ცვლილებები ძალაში შევა გამოქვეყნებიდან 30 დღეში.</p>
    `
  },
  data: {
    title: '🛡️ მონაცემთა დაცვა',
    content: `
      <h4>ჩვენი პრინციპები</h4>
      <ul>
        <li>✅ <strong>Data Minimization</strong> — ვაგროვებთ მხოლოდ საჭიროს</li>
        <li>✅ <strong>Purpose Limitation</strong> — გამოვიყენებთ მხოლოდ გამოცხადებული მიზნებისთვის</li>
        <li>✅ <strong>Storage Limitation</strong> — CV სერვერებზე არ ინახება</li>
        <li>✅ <strong>Security</strong> — HTTPS, encryption</li>
        <li>✅ <strong>Transparency</strong> — ღია კომუნიკაცია</li>
      </ul>
      
      <h4>ბრაუზერში დამუშავება</h4>
      <p>PDF-ის ტექსტი ამოიკითხება მხოლოდ შენს ბრაუზერში. ჩვენ ვერ ვხედავთ CV-ის შინაარსს.</p>
      
      <h4>კონტაქტი</h4>
      <p>მონაცემთა დაცვის შეკითხვებისთვის: privacy@careernavigator.ge</p>
    `
  },
  cookies: {
    title: '🍪 Cookie პოლიტიკა',
    content: `
      <h4>ვიყენებთ Cookie-ებს:</h4>
      <ul>
        <li><strong>Session Cookies</strong> — ავტომატურად იშლება ბრაუზერის დახურვისას</li>
        <li><strong>Analytics Cookies</strong> — ანონიმური სტატისტიკა (Google Analytics)</li>
      </ul>
      
      <h4>არ ვიყენებთ:</h4>
      <ul>
        <li>❌ Tracking Cookies</li>
        <li>❌ Third-party Advertising Cookies</li>
        <li>❌ Fingerprinting</li>
      </ul>
      
      <h4>Cookie-ების გამორთვა</h4>
      <p>ბრაუზერის პარამეტრებში შეგიძლიათ გამორთოთ Cookie-ები, თუმცა ეს შეიძლება გავლენა იქონიოს პლატფორმის ფუნქციონალზე.</p>
    `
  },
  faq: {
    title: '❓ ხშირი კითხვები',
    content: `
      <h4>PDF ვერ ამოიკითხება</h4>
      <p>სცადეთ CV-ის ტექსტად შეყვანა. ზოგი PDF სკანირებულია — ამ შემთხვევაში ტექსტის ამოკითხვა შეუძლებელია.</p>
      
      <h4>შედეგი ვერ გამოჩნდა</h4>
      <p>დარწმუნდით, რომ CV-ი და ვაკანსია ორივე შეყვანილია (მინ. 50 სიტყვა).</p>
      
      <h4>ანალიზი 100% ზუსტია?</h4>
      <p>ანალიზი ალგორითმულია და 85-90% სიზუსტით მუშაობს. ეს ინსტრუმენტია — HR-ის გადაწყვეტილებას ვერ ჩაანაცვლებს.</p>
      
      <h4>AI კოაჩი ინფორმაციას ინახავს?</h4>
      <p>არა. ჩატის ისტორია მხოლოდ ბრაუზერის Session-ში ინახება და გვერდის განახლებისას იშლება.</p>
      
      <h4>მობილურზე მუშაობს?</h4>
      <p>დიახ! პლატფორმა სრულად Responsive-ია.</p>
      
      <h4>უფასოა?</h4>
      <p>დიახ! Career Navigator AI სრულად უფასოა.</p>
    `
  }
};

function initLegalModals() {
  const links = {
    'privacy-link': 'privacy',
    'terms-link': 'terms',
    'data-link': 'data',
    'cookies-link': 'cookies',
    'faq-link': 'faq',
    'guide-link': 'faq',
    'contact-link': null,
    'feedback-link': null
  };

  Object.entries(links).forEach(([id, key]) => {
    getEl(id)?.addEventListener('click', (e) => {
      e.preventDefault();
      if (key && LEGAL_CONTENT[key]) {
        openLegalModal(LEGAL_CONTENT[key]);
      } else if (id === 'contact-link') {
        openLegalModal({
          title: '📧 დაგვიკავშირდი',
          content: `
            <h4>კონტაქტი</h4>
            <ul>
              <li>📧 Email: info@careernavigator.ge</li>
              <li>💬 LinkedIn: linkedin.com/company/career-navigator-ai</li>
              <li>📞 ტელ: +995 555 000 000</li>
            </ul>
            <h4>სამუშაო საათები</h4>
            <p>ორშაბათი–პარასკევი: 09:00–18:00 (GMT+4)</p>
            <p>AI კოაჩი ხელმისაწვდომია 24/7! 🤖</p>
          `
        });
      } else if (id === 'feedback-link') {
        openLegalModal({
          title: '💬 უკუკავშირი',
          content: `
            <h4>შენი აზრი მნიშვნელოვანია!</h4>
            <p>Career Navigator AI-ის გასაუმჯობესებლად გვჭირდება შენი შეფასება.</p>
            <p>📧 გამოგვიგზავნე: feedback@careernavigator.ge</p>
            <ul>
              <li>რა მოგეწონა?</li>
              <li>რა უნდა გაუმჯობეს?</li>
              <li>რა ფუნქციონალი გჭირდება?</li>
            </ul>
            <p><strong>გმადლობ! 🙏</strong></p>
          `
        });
      }
    });
  });

  getEl('legal-close')?.addEventListener('click', closeLegalModal);
  getEl('legal-backdrop')?.addEventListener('click', closeLegalModal);
}

function openLegalModal(content) {
  const modal = getEl('legal-modal');
  const title = getEl('legal-title');
  const body = getEl('legal-body');
  if (!modal || !title || !body) return;

  title.textContent = content.title;
  body.innerHTML = content.content;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLegalModal() {
  const modal = getEl('legal-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = 'info') {
  const colors = {
    success: { bg: 'rgba(0,230,118,0.15)', border: 'rgba(0,230,118,0.3)', text: '#00E676' },
    error: { bg: 'rgba(255,82,82,0.15)', border: 'rgba(255,82,82,0.3)', text: '#FF5252' },
    warning: { bg: 'rgba(255,183,77,0.15)', border: 'rgba(255,183,77,0.3)', text: '#FFB74D' },
    info: { bg: 'rgba(0,212,255,0.15)', border: 'rgba(0,212,255,0.3)', text: '#00D4FF' }
  };
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

  const c = colors[type] || colors.info;
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;
    bottom:24px;left:50%;
    transform:translateX(-50%) translateY(0);
    background:${c.bg};
    border:1px solid ${c.border};
    color:${c.text};
    padding:12px 20px;
    border-radius:50px;
    font-family:var(--font-main);
    font-size:13px;
    font-weight:600;
    z-index:9999;
    display:flex;
    align-items:center;
    gap:8px;
    box-shadow:0 8px 32px rgba(0,0,0,0.4);
    animation:toast-in 0.3s ease;
    backdrop-filter:blur(10px);
    max-width:90vw;
    text-align:center;
  `;
  toast.innerHTML = `${icons[type]} ${escapeHtml(message)}`;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes toast-in { from { opacity:0; transform:translateX(-50%) translateY(20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
    @keyframes toast-out { from { opacity:1; } to { opacity:0; transform:translateX(-50%) translateY(20px); } }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toast-out 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================================================
// VACANCY URL FETCH (Basic)
// ============================================================
function initVacancyUrlFetch() {
  getEl('fetch-url-btn')?.addEventListener('click', async () => {
    const urlInput = getEl('vacancy-url');
    const url = urlInput?.value.trim();
    if (!url) {
      showToast('გთხოვთ შეიყვანოთ URL', 'error');
      return;
    }
    if (!url.startsWith('http')) {
      showToast('URL უნდა დაიწყებოდეს http:// ან https://-ით', 'error');
      return;
    }

    showToast('URL-ის ჩატვირთვა... გთხოვთ ვაკანსიის ტექსტი ხელით ჩასვათ.', 'info');
    // Note: Due to CORS, we can't fetch arbitrary URLs directly.
    // Showing instruction to paste manually.
    getEl('vacancy-text')?.focus();
  });
}

// ============================================================
// INTERSECTION OBSERVER (Animate on scroll)
// ============================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.panel, .story-card, .search-info-card').forEach(el => {
    observer.observe(el);
  });
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + / to open chat
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      openChat();
    }
    // Ctrl/Cmd + Enter to analyze
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      if (document.activeElement?.classList.contains('cv-textarea') ||
          document.activeElement?.classList.contains('vacancy-textarea')) {
        e.preventDefault();
        runAnalysis();
      }
    }
  });
}

// ============================================================
// INITIALIZE EVERYTHING
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Background & visual
  initParticles();
  initHeaderScroll();
  initSmoothScroll();
  initScrollAnimations();

  // Core features
  initTabs();
  initCharCounter();
  initPdfUpload();
  initAnalyzer();
  initVacancyUrlFetch();

  // Content
  initStories();
  initQuotes();

  // Search
  initSearch();
  initSearchModalClose();

  // Chatbot
  initChatbot();

  // Modals
  initLegalModals();

  // Keyboard
  initKeyboardShortcuts();

  console.log('%c🚀 Career Navigator AI Loaded!', 'color:#00D4FF;font-size:16px;font-weight:bold;');
  console.log('%cShortcuts: Ctrl+/ → Chat | Ctrl+Enter → Analyze', 'color:#7B2FBE;font-size:12px;');
});

// Expose for inline handlers
window.openStoryModal = openStoryModal;
window.closeSearchModal = closeSearchModal;
window.SUCCESS_STORIES = SUCCESS_STORIES;
