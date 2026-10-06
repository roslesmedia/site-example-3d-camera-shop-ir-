/** All prices, specifications and model codes in this file are fictional demonstration data. */
export const business = {
  name: "دیدبان",
  englishName: "DIDBAN",
  type: "فروشگاه تخصصی دوربین مداربسته و تجهیزات نظارتی",
  location: "تهران، ونک",
  address: "تهران، محدوده ونک، خیابان نمونه، پلاک ۲۴",
  phone: "۰۲۱-۰۰۰۰-۱۲۳۴",
  email: "hello@didban.example",
  instagram: "@didban.security.demo",
  slogan: "امنیت را دقیق‌تر ببینید",
  supportingMessage:
    "از میان برندها و تجهیزات نظارتی، متناسب با فضای خودتان انتخاب کنید.",
  notice: "اطلاعات و محصولات این نسخه برای نمایش نمونه هستند.",
};
export const brands = [
  "Hikvision",
  "Dahua",
  "Uniview",
  "Axis",
  "Bosch",
  "Hanwha Vision",
  "Tiandy",
  "Vivotek",
  "Milesight",
  "Mobotix",
  "i-PRO",
  "Pelco",
  "Honeywell",
  "FLIR",
  "Hikmicro",
  "Ubiquiti",
  "Reolink",
  "TP-Link VIGI",
  "EZVIZ",
  "Imou",
  "Tapo",
  "Eufy Security",
  "Arlo",
  "Ring",
  "Google Nest",
  "Lorex",
  "Swann",
  "Zmodo",
  "Annke",
  "Amcrest",
  "Foscam",
  "Provision-ISR",
  "TVT",
  "Tenda",
  "Western Digital",
  "Samsung",
  "D-Link",
  "Netgear",
  "Cisco",
  "MikroTik",
  "Zyxel",
  "Seagate",
  "Toshiba",
  "Synology",
  "QNAP",
  "Panasonic",
  "Sony",
  "ACTi",
  "Avigilon",
  "GeoVision",
].map((name) => ({
  id: name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, ""),
  name,
}));

export const categories = [
  { id: "dome", name: "دوربین‌های دام", type: "dome" },
  { id: "bullet", name: "دوربین‌های بولت", type: "bullet" },
  { id: "turret", name: "دوربین‌های تورت", type: "turret" },
  { id: "ptz", name: "دوربین‌های گردان PTZ", type: "ptz" },
  { id: "indoor", name: "دوربین‌های داخلی", type: "indoor" },
  { id: "outdoor", name: "دوربین‌های بیرونی", type: "outdoor" },
  { id: "wifi", name: "دوربین‌های بی‌سیم و Wi-Fi", type: "wifi" },
  { id: "cellular", name: "دوربین‌های سیم‌کارتی 4G", type: "cellular" },
  { id: "battery", name: "دوربین‌های باتری‌دار", type: "battery" },
  { id: "solar", name: "دوربین‌های خورشیدی", type: "solar" },
  { id: "fisheye", name: "دوربین‌های پانوراما و فیش‌آی", type: "fisheye" },
  { id: "thermal", name: "دوربین‌های حرارتی", type: "thermal" },
  { id: "doorbell", name: "زنگ در ویدئویی", type: "doorbell" },
  { id: "recorder", name: "دستگاه‌های NVR و DVR", type: "recorder" },
  { id: "kit", name: "کیت‌های کامل نظارتی", type: "kit" },
  { id: "network", name: "تجهیزات شبکه و PoE", type: "network" },
  { id: "storage", name: "هارد و فضای ذخیره‌سازی", type: "storage" },
  { id: "accessory", name: "پایه، کابل و لوازم جانبی", type: "accessory" },
];

export type Product = {
  id: string;
  name: string;
  model: string;
  brand: string;
  category: string;
  type: string;
  price: number;
  specs: string[];
  keywords: string[];
  environment: "indoor" | "outdoor";
  color: string;
};
// Each row defines five editable demo products; specifications describe only these fictional demo codes.
const catalogueRows = [
  {
    category: "dome",
    brandNames: ["Hikvision", "Dahua", "Uniview", "Axis", "Bosch"],
    names: [
      "دام شبکه دقیق",
      "دام کم‌نور",
      "دام سقفی فشرده",
      "دام زاویه‌باز",
      "دام حرفه‌ای",
    ],
    base: 3850000,
    specs: ["تصویر نمونه 4MP", "اتصال PoE", "لنز نمونه ۲٫۸ میلی‌متر"],
    environment: "indoor",
  },
  {
    category: "bullet",
    brandNames: ["Hanwha Vision", "Tiandy", "Vivotek", "Milesight", "Mobotix"],
    names: [
      "بولت نمای بیرونی",
      "بولت دید شب",
      "بولت شبکه باریک",
      "بولت لنز متغیر",
      "بولت مقاوم",
    ],
    base: 5200000,
    specs: ["تصویر نمونه 4K", "اتصال شبکه", "بدنه نمونه IP67"],
    environment: "outdoor",
  },
  {
    category: "turret",
    brandNames: ["i-PRO", "Pelco", "Honeywell", "Provision-ISR", "TVT"],
    names: [
      "تورت سقفی",
      "تورت دید شب",
      "تورت کم‌نور",
      "تورت جمع‌وجور",
      "تورت زاویه‌باز",
    ],
    base: 4300000,
    specs: ["تصویر نمونه 5MP", "اتصال PoE", "تنظیم دستی زاویه"],
    environment: "indoor",
  },
  {
    category: "ptz",
    brandNames: ["Hikvision", "Dahua", "Panasonic", "Sony", "Avigilon"],
    names: [
      "گردان شبکه",
      "گردان زوم‌دار",
      "گردان محوطه",
      "گردان فضای وسیع",
      "گردان حرفه‌ای",
    ],
    base: 16800000,
    specs: ["تصویر نمونه 4MP", "زوم نمونه ۲۰ برابر", "کنترل زاویه PTZ"],
    environment: "outdoor",
  },
  {
    category: "indoor",
    brandNames: ["EZVIZ", "Imou", "Tapo", "Google Nest", "Foscam"],
    names: [
      "دوربین رومیزی خانه",
      "دوربین داخلی چرخشی",
      "دوربین کوچک دفتر",
      "دوربین اتاق",
      "دوربین داخلی شبکه",
    ],
    base: 2450000,
    specs: ["تصویر نمونه 2MP", "صدای دوطرفه نمونه", "مناسب بررسی فضای داخلی"],
    environment: "indoor",
  },
  {
    category: "outdoor",
    brandNames: ["Lorex", "Swann", "Annke", "Amcrest", "ACTi"],
    names: [
      "دوربین ورودی ساختمان",
      "دوربین حیاط",
      "دوربین نمای فروشگاه",
      "دوربین محوطه باز",
      "دوربین شبکه بیرونی",
    ],
    base: 5700000,
    specs: ["تصویر نمونه 4MP", "بدنه نمونه IP67", "دید شب نمونه"],
    environment: "outdoor",
  },
  {
    category: "wifi",
    brandNames: ["Reolink", "Tapo", "EZVIZ", "Imou", "Zmodo"],
    names: [
      "بی‌سیم چرخشی",
      "بی‌سیم خانگی",
      "بی‌سیم جمع‌وجور",
      "بی‌سیم رومیزی",
      "بی‌سیم زاویه‌باز",
    ],
    base: 3100000,
    specs: ["اتصال Wi-Fi", "تصویر نمونه 2MP", "درگاه کارت حافظه نمونه"],
    environment: "indoor",
  },
  {
    category: "cellular",
    brandNames: ["Reolink", "Imou", "Hikvision", "Dahua", "Milesight"],
    names: [
      "سیم‌کارتی فضای باز",
      "سیم‌کارتی محوطه",
      "سیم‌کارتی گردان",
      "سیم‌کارتی مستقل",
      "سیم‌کارتی کوچک",
    ],
    base: 8600000,
    specs: ["اتصال نمونه 4G", "تصویر نمونه 4MP", "نیازمند بررسی پوشش شبکه"],
    environment: "outdoor",
  },
  {
    category: "battery",
    brandNames: ["Arlo", "Eufy Security", "Ring", "Google Nest", "Reolink"],
    names: [
      "باتری‌دار ورودی",
      "باتری‌دار خانه",
      "باتری‌دار بیرونی",
      "باتری‌دار کوچک",
      "باتری‌دار شبکه",
    ],
    base: 7900000,
    specs: [
      "باتری قابل شارژ نمونه",
      "اتصال Wi-Fi",
      "زمان کارکرد وابسته به استفاده",
    ],
    environment: "outdoor",
  },
  {
    category: "solar",
    brandNames: ["Reolink", "Eufy Security", "Arlo", "Imou", "EZVIZ"],
    names: [
      "دوربین با پنل خورشیدی",
      "کیت خورشیدی حیاط",
      "خورشیدی فضای باز",
      "خورشیدی سیم‌کارتی",
      "خورشیدی کم‌مصرف",
    ],
    base: 11300000,
    specs: [
      "پنل خورشیدی نمونه",
      "باتری پشتیبان نمونه",
      "نیازمند نور کافی محیط",
    ],
    environment: "outdoor",
  },
  {
    category: "fisheye",
    brandNames: ["Vivotek", "Mobotix", "Axis", "GeoVision", "Uniview"],
    names: [
      "فیش‌آی سقفی",
      "پانورامای فروشگاه",
      "فیش‌آی شبکه",
      "پانورامای دفتر",
      "فیش‌آی زاویه‌باز",
    ],
    base: 9800000,
    specs: ["نمای نمونه ۳۶۰ درجه", "تصویر نمونه 6MP", "نصب سقفی نمونه"],
    environment: "indoor",
  },
  {
    category: "thermal",
    brandNames: ["FLIR", "Hikmicro", "Bosch", "Hikvision", "Dahua"],
    names: [
      "حرارتی بررسی محوطه",
      "حرارتی فشرده",
      "حرارتی شبکه",
      "حرارتی دوحسگر",
      "حرارتی فضای باز",
    ],
    base: 28500000,
    specs: [
      "تصویر حرارتی نمونه",
      "نمای مرئی نمونه",
      "کاربری وابسته به شرایط محیط",
    ],
    environment: "outdoor",
  },
  {
    category: "doorbell",
    brandNames: ["Ring", "Google Nest", "Eufy Security", "Arlo", "EZVIZ"],
    names: [
      "زنگ تصویری ورودی",
      "زنگ تصویری بی‌سیم",
      "زنگ تصویری کوچک",
      "زنگ تصویری باتری‌دار",
      "زنگ تصویری شبکه",
    ],
    base: 4900000,
    specs: ["تصویر نمونه 2MP", "صدای دوطرفه نمونه", "نصب کنار ورودی"],
    environment: "outdoor",
  },
  {
    category: "recorder",
    brandNames: ["Hikvision", "Dahua", "Uniview", "TVT", "GeoVision"],
    names: [
      "ضبط‌کننده NVR هشت‌کانال",
      "ضبط‌کننده DVR چهارکانال",
      "ضبط‌کننده NVR فشرده",
      "ضبط‌کننده DVR شبکه",
      "ضبط‌کننده NVR شانزده‌کانال",
    ],
    base: 7200000,
    specs: [
      "ضبط نمونه چندکاناله",
      "خروجی تصویر HDMI",
      "هارد جداگانه بررسی شود",
    ],
    environment: "indoor",
  },
  {
    category: "kit",
    brandNames: ["Lorex", "Swann", "Annke", "Amcrest", "TP-Link VIGI"],
    names: [
      "کیت چهار دوربین بولت",
      "کیت خانگی دام",
      "کیت نظارتی فروشگاه",
      "کیت شبکه دفتر",
      "کیت دوربین و NVR",
    ],
    base: 18900000,
    specs: ["۴ دوربین نمونه", "ضبط‌کننده نمونه", "سازگاری اجزا نیازمند بررسی"],
    environment: "outdoor",
  },
  {
    category: "network",
    brandNames: ["Ubiquiti", "Tenda", "D-Link", "Netgear", "MikroTik"],
    names: [
      "سوئیچ PoE هشت‌پورت",
      "سوئیچ شبکه فشرده",
      "سوئیچ PoE چهارپورت",
      "سوئیچ مدیریتی",
      "روتر شبکه نظارتی",
    ],
    base: 2650000,
    specs: [
      "اتصال Gigabit نمونه",
      "۸ درگاه نمونه",
      "توان و سازگاری نیازمند بررسی",
    ],
    environment: "indoor",
  },
  {
    category: "storage",
    brandNames: ["Western Digital", "Seagate", "Toshiba", "Synology", "QNAP"],
    names: [
      "هارد نظارتی ۴ ترابایت",
      "هارد ضبط ۲ ترابایت",
      "هارد نظارتی ۶ ترابایت",
      "ذخیره‌ساز شبکه دوخانه",
      "ذخیره‌ساز شبکه چهارخانه",
    ],
    base: 4650000,
    specs: [
      "فضای ذخیره‌سازی نمونه",
      "مناسب بررسی ضبط تصویر",
      "سازگاری دستگاه بررسی شود",
    ],
    environment: "indoor",
  },
  {
    category: "accessory",
    brandNames: ["Samsung", "Cisco", "Zyxel", "Bosch", "Axis"],
    names: [
      "کارت حافظه ۲۵۶ گیگابایت",
      "کابل شبکه نمونه",
      "مبدل شبکه نمونه",
      "پایه نصب دیواری",
      "پایه سقفی دوربین",
    ],
    base: 850000,
    specs: [
      "لوازم جانبی نمونه",
      "کاربری نصب و نگهداری",
      "سازگاری با مدل بررسی شود",
    ],
    environment: "indoor",
  },
] as const;

export const products: Product[] = catalogueRows.flatMap((row, rowIndex) =>
  row.names.map((name, index) => ({
    id: `demo-${row.category}-${index + 1}`,
    name,
    model: `DEMO-${row.category.toUpperCase()}-${String(rowIndex * 5 + index + 1).padStart(3, "0")}`,
    brand: brands.find((brand) => brand.name === row.brandNames[index])!.id,
    category: row.category,
    type: row.category,
    price: row.base + index * 475000,
    specs: [...row.specs],
    keywords: [
      name,
      row.brandNames[index],
      categories.find((category) => category.id === row.category)!.name,
      ...row.specs,
      "نمونه",
    ],
    environment: row.environment,
    color: ["#e8eced", "#d1d8df", "#eff2ee", "#252d36", "#c7cccf"][index],
  })),
);

export const faqs = [
  {
    question: "برای خانه چه نوع دوربینی مناسب است؟",
    answer:
      "برای فضای داخلی، دوربین رومیزی یا دام می‌تواند گزینه قابل بررسی باشد. نور اتاق، امکان کابل‌کشی، حریم خصوصی و مشخصات مدل را پیش از انتخاب بررسی کنید.",
  },
  {
    question: "تفاوت دوربین دام و بولت چیست؟",
    answer:
      "دام معمولاً بدنه‌ای گنبدی و نصب سقفی دارد؛ بولت بدنه‌ای کشیده و جهت دید مشخص‌تری دارد. شکل بدنه به‌تنهایی کیفیت تصویر یا مناسب‌بودن برای فضای بیرونی را تعیین نمی‌کند.",
  },
  {
    question: "چه زمانی به دستگاه NVR یا DVR نیاز دارم؟",
    answer:
      "برای ضبط و مدیریت چند دوربین، یک ضبط‌کننده سازگار می‌تواند مفید باشد. NVR معمولاً با دوربین شبکه و DVR با ورودی ویدئویی سازگار کار می‌کند؛ تعداد کانال، ظرفیت ذخیره و سازگاری دقیق را بررسی کنید.",
  },
  {
    question: "دوربین بی‌سیم برای چه فضایی مناسب است؟",
    answer:
      "در فضایی با پوشش پایدار Wi-Fi و دسترسی مناسب به برق، دوربین بی‌سیم می‌تواند کابل‌کشی شبکه را کمتر کند. دیوارها، فاصله از روتر و تداخل شبکه روی عملکرد اثر دارند.",
  },
  {
    question: "چطور درباره یک محصول استعلام بگیرم؟",
    answer:
      "جزئیات محصول را باز کنید و «استعلام قیمت» را بزنید تا نام محصول در فرم قرار بگیرد. این نسخه نمایشی است؛ فرم هیچ پیامی به فروشگاه یا سرویس خارجی ارسال نمی‌کند.",
  },
];
export const solutions = [
  {
    id: "home",
    name: "خانه و آپارتمان",
    description:
      "دوربین داخلی، زنگ تصویری و مدل‌های بی‌سیم را مقایسه کنید. نور اتاق، حریم خصوصی و کیفیت شبکه در انتخاب نقش دارند.",
    categories: ["indoor", "wifi", "doorbell", "dome"],
  },
  {
    id: "shop",
    name: "فروشگاه",
    description:
      "برای ورودی، صندوق و مسیر رفت‌وآمد، زاویه‌های دید متفاوت را بررسی کنید. پوشش نهایی به چیدمان، نور و محل نصب وابسته است.",
    categories: ["turret", "dome", "fisheye", "recorder", "kit"],
  },
  {
    id: "office",
    name: "دفتر کار",
    description:
      "دوربین شبکه و ذخیره‌ساز سازگار می‌توانند برای بررسی ورودی و بخش‌های عمومی مناسب باشند. ظرفیت شبکه و مقررات حریم خصوصی را در نظر بگیرید.",
    categories: ["dome", "indoor", "network", "storage", "recorder"],
  },
  {
    id: "outdoor",
    name: "فضای بیرونی",
    description:
      "بولت، گردان و مدل‌های مستقل را براساس نور، شرایط محیط، برق و شبکه مقایسه کنید. مقاومت بدنه و فاصله دید هر مدل نیازمند بررسی است.",
    categories: ["bullet", "outdoor", "ptz", "cellular", "solar"],
  },
];
