import { useState, useMemo, useRef, useEffect, lazy, Suspense } from "react";
import {
  Search,
  ArrowUpLeft,
  ArrowLeft,
  Menu,
  X,
  SlidersHorizontal,
  Plus,
  ScanLine,
  ShieldCheck,
  Layers,
  MapPin,
} from "lucide-react";
import {
  brands,
  categories,
  products,
  business,
  faqs,
  solutions,
} from "./data";
const Scene = lazy(() => import("./Scenes"));
const num = (n: number) => n.toLocaleString("fa-IR");
type Product = (typeof products)[number];
function Visual({
  kind,
  type,
  color,
}: {
  kind: "hero" | "category" | "lens" | "exploded" | "coverage" | "product";
  type?: string;
  color?: string;
}) {
  return (
    <Suspense
      fallback={<div className="loading">در حال آماده‌سازی نمای سه‌بعدی…</div>}
    >
      <Scene kind={kind} type={type} color={color} />
    </Suspense>
  );
}
function ProductArt({ p }: { p: Product }) {
  const [failed, setFailed] = useState(false);
  return !failed ? (
    <img
      className="product-render"
      src={`/products/${p.id}.png`}
      loading="lazy"
      alt={`نمای سه‌بعدی ${p.name}`}
      onError={() => setFailed(true)}
    />
  ) : (
    <div
      className={"product-art " + p.type}
      style={{ "--tint": p.color } as React.CSSProperties}
    >
      <div className="device">
        <div className="optic">
          <i />
          <b />
        </div>
        <span />
        <em />
      </div>
      <div className="art-floor" />
    </div>
  );
}
export default function App() {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState(""),
    [brand, setBrand] = useState(""),
    [environment, setEnvironment] = useState(""),
    [sort, setSort] = useState("recommended"),
    [menu, setMenu] = useState(false),
    [filter, setFilter] = useState(false),
    [brandSearch, setBrandSearch] = useState(""),
    [letter, setLetter] = useState(""),
    [selected, setSelected] = useState<Product | null>(null),
    [limit, setLimit] = useState(12),
    [solution, setSolution] = useState("home"),
    [topic, setTopic] = useState(""),
    [sent, setSent] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (selected) {
      if (!dialog.current?.open) {
        origin.current = document.activeElement as HTMLElement;
        dialog.current?.showModal();
      }
    } else if (dialog.current?.open) {
      dialog.current.close();
      origin.current?.focus();
    }
  }, [selected]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!brand || p.brand === brand) &&
        (!environment || p.environment === environment) &&
        (!q ||
          [
            p.name,
            p.model,
            brands.find((b) => b.id === p.brand)?.name,
            categories.find((c) => c.id === p.category)?.name,
            ...p.keywords,
          ]
            .join(" ")
            .toLowerCase()
            .includes(q)),
    );
    return sort === "low"
      ? list.sort((a, b) => a.price - b.price)
      : sort === "high"
        ? list.sort((a, b) => b.price - a.price)
        : sort === "new"
          ? [...list].reverse()
          : list;
  }, [query, category, brand, environment, sort]);
  const reset = () => {
    setCategory("");
    setBrand("");
    setQuery("");
    setEnvironment("");
    setLimit(12);
  };
  const shop = () =>
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  const enquire = (p?: Product) => {
    setTopic(p ? `${p.name} — ${p.model}` : "مشاوره انتخاب تجهیزات");
    setSelected(null);
    setSent(false);
    setTimeout(
      () =>
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" }),
      30,
    );
  };
  const nav = [
    ["home", "صفحه اصلی"],
    ["products", "محصولات"],
    ["categories", "دسته‌بندی‌ها"],
    ["brands", "برندها"],
    ["solutions", "راهکارها"],
    ["about", "درباره دیدبان"],
    ["contact", "تماس با ما"],
  ];
  return (
    <>
      <header className="header">
        <a href="#home" className="logo">
          <ScanLine />
          <span>
            دید<span>بان</span>
            <small>DIDBAN</small>
          </span>
        </a>
        <nav className={menu ? "nav open" : "nav"}>
          {nav.map(([id, title]) => (
            <a key={id} href={"#" + id} onClick={() => setMenu(false)}>
              {title}
            </a>
          ))}
        </nav>
        <button className="header-enquiry" onClick={() => enquire()}>
          مشاوره انتخاب <ArrowUpLeft size={16} />
        </button>
        <button
          className="menu-button icon-btn"
          aria-label={menu ? "بستن فهرست" : "باز کردن فهرست"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main>
        <section id="home" className="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span />
                فروشگاه تخصصی تجهیزات نظارتی
              </div>
              <h1>
                امنیت را
                <br />
                <span>دقیق‌تر</span> ببینید<span className="period">.</span>
              </h1>
              <p>
                از میان برندها و مدل‌های متنوع دوربین و تجهیزات نظارتی، انتخاب
                مناسب‌تری برای فضای خودتان پیدا کنید.
              </p>
              <div className="hero-actions">
                <a className="button" href="#products">
                  مشاهده محصولات <ArrowUpLeft size={18} />
                </a>
                <a className="text-link" href="#brands">
                  جست‌وجوی برندها <ArrowLeft size={17} />
                </a>
              </div>
              <div className="hero-meta">
                <span>
                  <b>۵۰</b> برند در یک نگاه
                </span>
                <span>
                  <b>۹۰</b> محصول برای مقایسه
                </span>
                <span>
                  <b>۱۸</b> گروه تخصصی
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="scene-coordinate">
                DIDBAN / EQUIPMENT COLLECTION — 01
              </div>
              <Visual kind="hero" />
              <span className="float-label label-one">
                <i /> دوربین‌های هوشمند
              </span>
              <span className="float-label label-two">
                از تصویر تا ذخیره‌سازی <Plus size={13} />
              </span>
              <div className="visual-bottom">
                مجموعه‌ای برای هر زاویه دید <span>↙ ۳۶۰°</span>
              </div>
            </div>
          </div>
          <form
            className="search-bar"
            onSubmit={(e) => {
              e.preventDefault();
              shop();
            }}
          >
            <Search />
            <input
              aria-label="جست‌وجوی محصولات"
              placeholder="به دنبال چه چیزی هستید؟ نام محصول، برند یا مدل…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(12);
              }}
            />
            <button type="submit">
              جست‌وجو در محصولات <ArrowLeft size={17} />
            </button>
          </form>
          <div className="hero-foot">
            <span>
              {business.location} <MapPin size={13} />
            </span>
            <span>انتخاب آگاهانه، از مقایسه شروع می‌شود.</span>
            <a href="#categories">برای کشف بیشتر حرکت کنید ↓</a>
          </div>
        </section>
        <section id="categories" className="section categories-section">
          <div className="section-top">
            <div>
              <span className="kicker">۰۱ / مسیر انتخاب شما</span>
              <h2>هر نیاز، یک زاویه تازه</h2>
            </div>
            <a href="#products" className="text-link">
              تمام دسته‌بندی‌ها <ArrowUpLeft size={18} />
            </a>
          </div>
          <div className="category-layout">
            <div className="category-scene">
              <Visual
                kind="category"
                type={
                  categories.find((c) => c.id === category)?.type || "bullet"
                }
              />
              <div className="scene-caption">
                نمای مفهومی تجهیزات{" "}
                <span>برای کشف، یک دسته را انتخاب کنید</span>
              </div>
            </div>
            <div className="category-list">
              {categories.map((c, i) => (
                <button
                  className={category === c.id ? "active" : ""}
                  key={c.id}
                  onClick={() => {
                    setCategory(c.id);
                    setLimit(12);
                  }}
                >
                  <span className="category-number">
                    {num(i + 1).padStart(2, "۰")}
                  </span>
                  {c.name}
                  <ArrowUpLeft size={16} />
                </button>
              ))}
            </div>
          </div>
          {category && (
            <button className="button small" onClick={shop}>
              مشاهده محصولات این دسته <ArrowLeft size={16} />
            </button>
          )}
        </section>
        <div className="brand-band">
          <span>
            انتخاب‌های متفاوت.
            <br />
            <b>یک مقصد تخصصی.</b>
          </span>
          <div>
            {brands.slice(0, 6).map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  setBrand(b.id);
                  shop();
                }}
                dir="ltr"
              >
                {b.name}
              </button>
            ))}
          </div>
          <a href="#brands">
            هر ۵۰ برند <ArrowUpLeft size={17} />
          </a>
        </div>
        <section id="products" className="section catalogue">
          <div className="section-top">
            <div>
              <span className="kicker">۰۲ / ویترین دیدبان</span>
              <h2>تجهیزات مناسب را پیدا کنید</h2>
            </div>
            <span className="subtle">
              قیمت‌ها و مشخصات، نمونه نمایشی هستند.
            </span>
          </div>
          <div className="catalogue-toolbar">
            <div className="inline-search">
              <Search size={18} />
              <input
                aria-label="جست‌وجو در کاتالوگ"
                placeholder="جست‌وجوی محصول یا برند"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setLimit(12);
                }}
              />
            </div>
            <button
              className="filter-toggle"
              aria-expanded={filter}
              onClick={() => setFilter(!filter)}
            >
              <SlidersHorizontal size={17} /> فیلتر محصولات
            </button>
            <label className="sort">
              مرتب‌سازی{" "}
              <select
                aria-label="مرتب‌سازی"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="recommended">پیشنهادی</option>
                <option value="low">قیمت از کم به زیاد</option>
                <option value="high">قیمت از زیاد به کم</option>
                <option value="new">جدیدترین</option>
              </select>
            </label>
          </div>
          <div className="shop-layout">
            <aside className={filter ? "filters expanded" : "filters"}>
              <div className="filter-heading">
                انتخاب دقیق‌تر{" "}
                <button
                  className="icon-btn"
                  aria-label="بستن فیلترها"
                  onClick={() => setFilter(false)}
                >
                  <X size={16} />
                </button>
              </div>
              <label>
                نوع محصول
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setLimit(12);
                  }}
                >
                  <option value="">تمام دسته‌بندی‌ها</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                برند
                <select
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setLimit(12);
                  }}
                >
                  <option value="">تمام برندها</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                محیط استفاده
                <select
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value)}
                >
                  <option value="">تمام فضاها</option>
                  <option value="indoor">فضای داخلی</option>
                  <option value="outdoor">فضای بیرونی</option>
                </select>
              </label>
              <button className="reset" onClick={reset}>
                پاک کردن فیلترها ↺
              </button>
              <button
                className="button small apply"
                onClick={() => setFilter(false)}
              >
                نمایش نتایج
              </button>
              <div className="filter-note">
                <ScanLine />
                <b>کدام گزینه برای شماست؟</b>
                <p>مشخصات، نور محیط و شرایط نصب را کنار هم بررسی کنید.</p>
                <button className="text-link" onClick={() => enquire()}>
                  راهنمای انتخاب <ArrowLeft size={15} />
                </button>
              </div>
            </aside>
            <div className="product-results">
              <div className="result-line">
                <span>
                  {num(filtered.length)} محصول {query && `برای «${query}»`}
                </span>
                <span>کاتالوگ نمایشی دیدبان</span>
              </div>
              <div className="product-grid">
                {filtered.slice(0, limit).map((p, i) => (
                  <article className="product-card" key={p.id}>
                    <button
                      className="product-open"
                      onClick={() => setSelected(p)}
                      aria-label={"جزئیات " + p.name}
                    >
                      <div className="card-top">
                        <span dir="ltr">
                          {brands.find((b) => b.id === p.brand)?.name}
                        </span>
                        <span className="demo-pill">نمونه</span>
                      </div>
                      <ProductArt p={p} />
                      <div className="product-content">
                        <small>
                          {categories.find((c) => c.id === p.category)?.name}
                        </small>
                        <h3>{p.name}</h3>
                        <span className="model" dir="ltr">
                          {p.model}
                        </span>
                        <div className="spec-chips">
                          {p.specs.slice(0, 2).map((s) => (
                            <span key={s}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </button>
                    <div className="price-row">
                      <span>
                        <b>{num(p.price)}</b> <small>تومان</small>
                      </span>
                      <button
                        aria-label={"استعلام " + p.name}
                        onClick={() => enquire(p)}
                      >
                        <ArrowUpLeft size={19} />
                      </button>
                    </div>
                    {i === 0 && <span className="card-accent" />}
                  </article>
                ))}
              </div>
              {!filtered.length && (
                <div className="empty">
                  <Search />
                  <h3>نتیجه‌ای با این انتخاب پیدا نشد.</h3>
                  <p>
                    نام برند یا محصول دیگری را امتحان کنید یا فیلترها را پاک
                    کنید.
                  </p>
                  <button className="button" onClick={reset}>
                    نمایش تمام محصولات
                  </button>
                </div>
              )}
              {filtered.length > limit && (
                <button
                  className="load-more"
                  onClick={() => setLimit(limit + 12)}
                >
                  نمایش محصولات بیشتر <Plus size={18} />
                </button>
              )}
            </div>
          </div>
        </section>
        <section className="story-intro">
          <span className="kicker">۰۳ / نگاهی به پشت تصویر</span>
          <h2>جزئیات، تفاوت را می‌سازند.</h2>
          <p>
            از اولین عدسی تا زاویه نصب؛ انتخاب بهتر با شناخت بیشتر شروع می‌شود.
          </p>
        </section>
        {(
          [
            {
              kind: "lens",
              title: "از نمای نزدیک شروع کنید",
              body: "جزئیات درون هر تصویر، از عبور نور از مجموعه عدسی‌ها آغاز می‌شود.",
              labels: ["محافظ لنز", "عدسی اپتیکال", "حسگر تصویر"],
            },
            {
              kind: "exploded",
              title: "ساخته‌شده برای دیدن جزئیات",
              body: "بدنه، حسگر و اجزای داخلی در کنار هم تصویر را شکل می‌دهند. این نمایش، یک ساختار مفهومی است و نقشه فنی محصول واقعی نیست.",
              labels: [
                "بدنه دوربین",
                "حسگر تصویر",
                "برد الکترونیکی",
                "پایه نصب",
              ],
            },
            {
              kind: "coverage",
              title: "هر فضا، زاویه دید خودش",
              body: "زاویه و پوشش نهایی به مدل دوربین، محل نصب و شرایط محیط بستگی دارد.",
              labels: ["محدوده دید تقریبی", "محل پیشنهادی نصب"],
            },
          ] as const
        ).map((s, i) => (
          <section className="story-section" key={s.kind}>
            <div className="story-copy">
              <div className="story-step">
                <span>۰{i + 1}</span>
                <i />
                <span>۰۳</span>
              </div>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
              <div className="story-labels">
                {s.labels.map((l, j) => (
                  <span key={l}>
                    <b>۰{j + 1}</b>
                    {l}
                  </span>
                ))}
              </div>
              <a href="#products" className="text-link">
                گزینه مناسب را پیدا کنید <ArrowLeft size={18} />
              </a>
              <span className="scroll-hint">
                ↓ حرکت شما، جزئیات را آشکار می‌کند
              </span>
            </div>
            <div className="story-scene">
              <Visual kind={s.kind} />
              <span className="scene-coordinate">
                DIDBAN / {s.kind.toUpperCase()} STUDY
              </span>
            </div>
          </section>
        ))}
        <section id="brands" className="section brands-section">
          <div className="section-top">
            <div>
              <span className="kicker">۰۴ / جهان برندها</span>
              <h2>۵۰ برند. امکان مقایسه بیشتر.</h2>
            </div>
            <p className="subtle">حضور نام برند به معنی نمایندگی رسمی نیست.</p>
          </div>
          <div className="brand-controls">
            <div className="inline-search">
              <Search size={18} />
              <input
                aria-label="جست‌وجوی برند"
                placeholder="نام برند را جست‌وجو کنید…"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
              />
            </div>
            <div className="alphabet" dir="ltr">
              {["", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((l) => (
                <button
                  className={letter === l ? "active" : ""}
                  key={l}
                  onClick={() => setLetter(l)}
                >
                  {l || "همه"}
                </button>
              ))}
            </div>
          </div>
          <div className="brand-directory">
            {brands
              .filter(
                (b) =>
                  b.name.toLowerCase().includes(brandSearch.toLowerCase()) &&
                  (!letter || b.name.toUpperCase().startsWith(letter)),
              )
              .map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setBrand(b.id);
                    setCategory("");
                    setQuery("");
                    shop();
                  }}
                >
                  <strong dir="ltr">{b.name}</strong>
                  <span>
                    {num(products.filter((p) => p.brand === b.id).length)} محصول
                    نمونه <ArrowUpLeft size={15} />
                  </span>
                </button>
              ))}
          </div>
          {!brands.some(
            (b) =>
              b.name.toLowerCase().includes(brandSearch.toLowerCase()) &&
              (!letter || b.name.toUpperCase().startsWith(letter)),
          ) && <p>برندی پیدا نشد. نام دیگری را امتحان کنید.</p>}
        </section>
        <section id="solutions" className="section solutions">
          <div>
            <span className="kicker">۰۵ / متناسب با فضای شما</span>
            <h2>
              برای چه فضایی به
              <br />
              تجهیزات نظارتی نیاز دارید؟
            </h2>
          </div>
          <div
            className="solution-tabs"
            role="tablist"
            aria-label="انتخاب فضای نصب"
          >
            {solutions.map((s) => (
              <button
                role="tab"
                aria-selected={solution === s.id}
                className={solution === s.id ? "active" : ""}
                key={s.id}
                onClick={() => setSolution(s.id)}
              >
                {s.name}
                <ArrowUpLeft size={18} />
              </button>
            ))}
          </div>
          {solutions
            .filter((s) => s.id === solution)
            .map((s) => (
              <div className="solution-detail" role="tabpanel" key={s.id}>
                <ShieldCheck />
                <div>
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                  <div>
                    {s.categories.map((id) => (
                      <button
                        key={id}
                        onClick={() => {
                          setCategory(id);
                          setBrand("");
                          shop();
                        }}
                      >
                        {categories.find((c) => c.id === id)?.name}{" "}
                        <ArrowLeft size={13} />
                      </button>
                    ))}
                  </div>
                  <small>
                    تناسب نهایی به نور، شبکه، نصب، مشخصات محصول و شرایط محیط
                    وابسته است.
                  </small>
                </div>
              </div>
            ))}
        </section>
        <section id="about" className="section about">
          <div className="about-mark">
            <ScanLine />
            <span>DIDBAN</span>
            <small>نگاه دقیق، انتخاب آگاهانه</small>
          </div>
          <div>
            <span className="kicker">درباره دیدبان</span>
            <h2>
              با نگاه بازتر،
              <br />
              انتخاب بهتری داشته باشید.
            </h2>
            <p>
              دیدبان با هدف ساده‌تر کردن مقایسه تجهیزات نظارتی طراحی شده است؛ از
              دوربین‌های مناسب خانه تا گزینه‌های قابل بررسی برای فروشگاه و دفتر
              کار.
            </p>
            <p className="subtle">
              این فروشگاه یک مفهوم نمایشی است؛ فضایی برای کشف برندها، شناخت
              تجهیزات و تجربه انتخاب.
            </p>
            <div className="about-points">
              <span>
                <Layers size={19} /> مقایسه چندبرندی
              </span>
              <span>
                <ScanLine size={19} /> شناخت انواع تجهیزات
              </span>
            </div>
          </div>
        </section>
        <section className="section faq-section">
          <div>
            <span className="kicker">پیش از انتخاب</span>
            <h2>
              پرسش‌های شما،
              <br />
              نقطه شروع ماست.
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.question}>
                <summary>
                  {f.question}
                  <Plus size={18} />
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="contact" className="section contact">
          <div>
            <span className="kicker">۰۶ / مسیر ارتباط</span>
            <h2>
              درباره انتخابتان
              <br />
              <span>گفت‌وگو کنیم.</span>
            </h2>
            <p>محصول موردنظر یا نیاز فضای خود را در فرم نمونه بنویسید.</p>
            <dl>
              <dt>نشانی نمونه</dt>
              <dd>{business.address}</dd>
              <dt>تلفن نمونه</dt>
              <dd>{business.phone}</dd>
              <dt>ایمیل نمونه</dt>
              <dd dir="ltr">{business.email}</dd>
              <dt>اینستاگرام نمونه</dt>
              <dd dir="ltr">{business.instagram}</dd>
            </dl>
          </div>
          <form
            className="enquiry-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="form-title">
              فرم استعلام نمونه <span>بدون ارسال اطلاعات</span>
            </div>
            <div className="form-row">
              <label>
                نام شما
                <input
                  name="name"
                  required
                  minLength={2}
                  placeholder="نام و نام خانوادگی"
                />
              </label>
              <label>
                شماره تماس
                <input
                  name="phone"
                  required
                  type="text"
                  inputMode="tel"
                  pattern="[+]?[0-9۰-۹]{7,15}"
                  placeholder="شماره تماس نمونه"
                  title="شماره تماس ۷ تا ۱۶ کاراکتری"
                />
              </label>
            </div>
            <label>
              محصول یا موضوع
              <input
                name="topic"
                required
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setSent(false);
                }}
                placeholder="برای چه محصول یا فضایی راهنمایی می‌خواهید؟"
              />
            </label>
            <label>
              توضیحات
              <textarea
                name="message"
                required
                minLength={5}
                rows={4}
                placeholder="ابعاد فضا، محل نصب یا پرسش خود را بنویسید…"
              />
            </label>
            <button className="button" type="submit">
              آماده‌سازی درخواست نمونه <ArrowUpLeft size={18} />
            </button>
            <p className="form-disclaimer">
              این فرم نمایشی است و اطلاعات را به هیچ سرویس خارجی ارسال نمی‌کند.
            </p>
            {sent && (
              <div className="success" role="status">
                درخواست نمونه آماده شد. پس از وارد کردن راه ارتباطی واقعی، این
                فرم را به مسیر تماس فروشگاه متصل کنید.
              </div>
            )}
          </form>
        </section>
      </main>
      <footer>
        <div>
          <a href="#home" className="footer-logo">
            دیدبان<span>DIDBAN</span>
          </a>
          <p>{business.slogan}</p>
        </div>
        <div>
          {nav.slice(1).map(([id, title]) => (
            <a key={id} href={"#" + id}>
              {title}
            </a>
          ))}
        </div>
        <div className="footer-note">
          {business.notice}
          <span>طراحی برای انتخاب آگاهانه · {business.location}</span>
        </div>
      </footer>
      <dialog
        ref={dialog}
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setSelected(null);
        }}
        className="product-dialog"
      >
        {selected && (
          <>
            <button
              className="dialog-close icon-btn"
              aria-label="بستن جزئیات محصول"
              onClick={() => setSelected(null)}
            >
              <X />
            </button>
            <div className="detail-layout">
              <div className="detail-visual">
                <Visual
                  kind="product"
                  type={selected.type}
                  color={selected.color}
                />
              </div>
              <div className="detail-content">
                <span className="kicker">
                  {brands.find((b) => b.id === selected.brand)?.name} / محصول
                  نمایشی
                </span>
                <h2>{selected.name}</h2>
                <p dir="ltr">{selected.model}</p>
                <p>
                  {categories.find((c) => c.id === selected.category)?.name}
                </p>
                <ul>
                  {selected.specs.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <div className="detail-price">
                  {num(selected.price)} <small>تومان — قیمت نمونه</small>
                </div>
                <button className="button" onClick={() => enquire(selected)}>
                  استعلام قیمت <ArrowUpLeft size={18} />
                </button>
                <small className="subtle">
                  مدل، قیمت و مشخصات برای نمایش تجربه فروشگاه هستند.
                </small>
              </div>
            </div>
            <div className="related">
              <h3>برای مقایسه بیشتر</h3>
              {products
                .filter(
                  (p) =>
                    p.category === selected.category && p.id !== selected.id,
                )
                .slice(0, 3)
                .map((p) => (
                  <button key={p.id} onClick={() => setSelected(p)}>
                    {p.name}
                    <ArrowLeft size={16} />
                  </button>
                ))}
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
