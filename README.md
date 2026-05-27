# Public Web Flows Playwright QA Framework

Bu proje, public web flow'larını güvenli şekilde gözlemlemek ve smoke/regression testleri yazmak için hazırlanmış bir Playwright TypeScript otomasyon framework'üdür.

Örnek hedef site:

```text
https://www.turk.net/
```

Amaç; public ana sayfa, navigasyon, paket/kampanya sayfaları, güvenli akış giriş noktaları ve mobil görünüm gibi alanları güvenli sınırlar içinde kontrol etmektir.

Bu repo herhangi bir markanın resmi projesi, temsilcisi, partneri veya onaylı test paketi değildir. Hedef site yalnızca public web automation pratiği için örnek olarak kullanılır.

Bu proje gerçek kullanıcı işlemi yapmak için değildir. Hiçbir test gerçek başvuru, ödeme, sözleşme onayı, kimlik doğrulama veya kullanıcı talebi göndermemelidir.

## Bu Projede Ne Yaptık?

Adım adım yapılan işler:

1. Node.js ve npm hazırlandı.
2. Playwright TypeScript test altyapısı kuruldu.
3. VS Code için Playwright MCP ve Playwright agent dosyaları hazırlandı.
4. GitHub Copilot ve Copilot Chat tarafı kontrol edildi.
5. Public web flow'ları için güvenli test yapısı oluşturuldu.
6. Page Object Model yapısı kuruldu.
7. Gerçek kişisel veri içermeyen sahte test datası eklendi.
8. Ana sayfa, navigasyon, güvenli akış girişi ve mobil görünüm testleri yazıldı.
9. Public repo güvenliği için `.gitignore` genişletildi.
10. Push öncesi secret/API key taraması yapan güvenlik hook'u eklendi.
11. Dokümantasyon dosyaları oluşturuldu.

## Kullanılan Teknolojiler

### 1. Node.js

Node.js, JavaScript ve TypeScript araçlarını bilgisayarda çalıştırmamızı sağlar.

Bu projede Node.js şunlar için kullanılır:

- npm paketlerini çalıştırmak
- Playwright komutlarını çalıştırmak
- Test runner başlatmak
- Proje bağımlılıklarını yönetmek

Kontrol komutu:

```bash
node -v
```

### 2. npm

npm, Node.js paket yöneticisidir.

Bu projede npm şunlar için kullanılır:

- `@playwright/test` paketini yönetmek
- `package.json` içindeki scriptleri çalıştırmak
- Güvenlik kontrol scriptini çalıştırmak

Kontrol komutu:

```bash
npm -v
```

Bağımlılıkları kurmak için:

```bash
npm install
```

### 3. Playwright

Playwright, web sitelerini gerçek tarayıcılarla otomatik test etmemizi sağlayan test aracıdır.

Bu projede Playwright ile:

- Sayfa açılıyor
- Linkler kontrol ediliyor
- Header, logo, footer gibi alanların görünür olup olmadığı test ediliyor
- Mobil ekran boyutunda test yapılıyor
- Hassas akış girişleri yalnızca güvenli sınıra kadar gözlemleniyor
- Captcha, OTP, ödeme veya final işlem gibi alanlarda duruluyor

Test çalıştırma:

```bash
npx playwright test
```

Arayüzlü test modu:

```bash
npx playwright test --ui
```

Debug modu:

```bash
npx playwright test --debug
```

Raporu açmak:

```bash
npx playwright show-report
```

### 4. TypeScript

TypeScript, JavaScript'in daha güvenli ve tip kontrollü halidir.

Bu projede testler ve Page Object dosyaları TypeScript ile yazıldı:

- `.ts` uzantılı test dosyaları
- `.ts` uzantılı page object dosyaları
- Tip güvenliği
- Daha okunabilir test kodu

Örnek dosyalar:

```text
tests/turknet.home.spec.ts
pages/TurkNetHomePage.ts
```

### 5. Playwright Test Runner

Playwright Test Runner, testleri sırayla çalıştıran ve sonucu raporlayan araçtır.

Bu projede şunları sağlar:

- Testleri `tests/` klasöründen bulur
- Chromium projesinde çalıştırır
- Başarılı, başarısız veya skipped testleri raporlar
- Hata durumunda screenshot, video ve trace bilgisi saklar

Konfigürasyon dosyası:

```text
playwright.config.ts
```

### 6. Chromium

Chromium, Playwright'ın kullandığı tarayıcı motorudur.

Bu projede minimum tarayıcı olarak Chromium yapılandırıldı. Bunun sebebi:

- Hızlıdır
- Playwright ile çok iyi desteklenir
- CI ortamlarında yaygın kullanılır
- İlk güvenli smoke test kapsamı için yeterlidir

Konfigürasyonda proje adı:

```text
chromium
```

### 7. Page Object Model

Page Object Model, test kodunu daha temiz tutmak için kullanılan bir yapıdır.

Basit anlatımla:

- Sayfa davranışları `pages/` klasöründe tutulur.
- Test dosyaları sadece senaryoyu anlatır.
- Locator ve yardımcı methodlar tek yerde toplanır.

Bu sayede site değişirse sadece ilgili Page Object dosyasını güncellemek çoğu zaman yeterli olur.

Page Object dosyaları:

```text
pages/BasePage.ts
pages/TurkNetHomePage.ts
pages/TurkNetNavigationPage.ts
pages/TurkNetApplicationPage.ts
pages/TurkNetLoginPage.ts
pages/TurkNetInfrastructurePage.ts
pages/TurkNetSupportPage.ts
```

## Page Object Model Architecture

Bu projede Page Object Model, test niyetini sayfa etkileşim detaylarından ayırmak için kullanılır.

- Test senaryoları `tests/` klasöründedir.
- Sayfa etkileşimleri ve tekrar kullanılabilir assertion'lar `pages/` klasöründedir.
- Ortak güvenli gezinme, cookie banner yönetimi, güvenli tıklama ve manuel sınır algılama `pages/BasePage.ts` içindedir.
- Fake test verileri `test-data/turknet-test-data.ts` içinde merkezi tutulur.
- Testler uzun ham selector mantığı yazmak yerine Page Object methodlarını çağırır.
- reCAPTCHA, OTP, SMS, E-Devlet, ödeme, kimlik doğrulama, gerçek login ve final işlem gibi riskli noktalar Page Object methodlarında manuel sınır olarak korunur.

Güncel Page Object dosyaları:

```text
pages/BasePage.ts
pages/TurkNetHomePage.ts
pages/TurkNetNavigationPage.ts
pages/TurkNetApplicationPage.ts
pages/TurkNetLoginPage.ts
pages/TurkNetInfrastructurePage.ts
pages/TurkNetSupportPage.ts
```

### 8. Test Data

Test datası, testlerde kullanılacak sahte bilgileri tutar.

Bu projede gerçek kişisel veri kullanılmaz.

Dosya:

```text
test-data/turknet-test-data.ts
```

İçindeki örnek sahte veriler:

```text
Test User
test@example.com
5000000000
invalid-email
123
```

Bu bilgiler gerçek kişiye ait değildir ve test amaçlı placeholder veridir.

### 9. Git

Git, kod değişikliklerini takip etmek için kullanılır.

Bu projede Git ile:

- Değişiklikler commitlendi
- GitHub reposuna pushlandı
- Push öncesi güvenlik kontrolü eklendi

Durum kontrolü:

```bash
git status
```

### 10. GitHub

GitHub, projenin remote repository olarak tutulduğu yerdir.

Repo:

```text
https://github.com/sercemgulmez/Playwright_Agent_Project.git
```

Bu repo public olduğu için özellikle dikkat edilen noktalar:

- Şifre yazılmamalı
- API key yazılmamalı
- Token yazılmamalı
- Gerçek kullanıcı bilgisi yazılmamalı
- `.env` dosyaları pushlanmamalı

### 11. `.gitignore`

`.gitignore`, Git'in hangi dosyaları takip etmeyeceğini söyler.

Bu projede `.gitignore` içine şunlar eklendi:

- `.env`
- `.env.*`
- secret klasörleri
- private key dosyaları
- credential dosyaları
- Playwright raporları
- test sonuçları
- local editor ayarları

Amaç:

Public repo içine yanlışlıkla şifre, token veya API key gitmesini engellemek.

### 12. Secret Scan Script

Push öncesi güvenlik için bir tarama scripti eklendi.

Dosya:

```text
scripts/check-secrets.sh
```

Bu script şunları arar:

- API key benzeri değerler
- secret kelimeleri
- token değerleri
- password ifadeleri
- private key başlangıçları
- bazı yaygın cloud credential kalıpları

Manuel çalıştırmak için:

```bash
npm run security:check
```

### 13. Git Hook

Git hook, Git işlemlerinden önce veya sonra otomatik çalışan script demektir.

Bu projede `pre-push` hook eklendi:

```text
.githooks/pre-push
```

Bu hook her push öncesi şunu çalıştırır:

```bash
npm run security:check
```

Yani yanlışlıkla secret/API key commitlendiyse push öncesinde yakalanması hedeflenir.

### 14. VS Code

VS Code, projeyi geliştirmek için kullanılan editördür.

Bu projede VS Code tarafında:

- Playwright extension kullanıldı
- GitHub Copilot kontrol edildi
- GitHub Copilot Chat kontrol edildi
- MCP server ayarları oluşturuldu
- Agent tanımları eklendi

### 15. GitHub Copilot

GitHub Copilot, kod yazarken yapay zeka destekli öneriler sunar.

Bu projede Copilot:

- VS Code içinde kontrol edildi
- Kurulu olduğu doğrulandı
- Agent akışları için kullanılabilir hale getirildi

### 16. GitHub Copilot Chat

GitHub Copilot Chat, VS Code içindeki sohbet/agent arayüzüdür.

Bu projede amaç:

- Playwright agent komutlarını Chat üzerinden çağırabilmek
- Test planı ürettirmek
- Test generator agent ile test üretmek
- Gerekirse test healer agent ile bozulan testleri düzeltmek

### 17. Playwright MCP Server

MCP, Model Context Protocol anlamına gelir.

Playwright MCP Server, agent'ın tarayıcıyı araç gibi kullanabilmesini sağlar.

Bu projede iki MCP kaydı vardır:

Global/user MCP:

```text
playwright
```

Workspace MCP:

```text
playwright-test
```

Workspace MCP dosyası:

```text
.vscode/mcp.json
```

Önemli not:

Codex terminal oturumunda Playwright MCP browser tool'ları doğrudan callable değildi. Bu yüzden Codex tarafında standart Playwright implementasyonu yapıldı. VS Code içinde Copilot Chat/Agent Mode kullanılırken MCP server kullanılabilir.

### 18. Playwright Agents

Playwright agent dosyaları `.github/agents/` altında oluşturuldu.

Agent dosyaları:

```text
.github/agents/playwright-test-planner.agent.md
.github/agents/playwright-test-generator.agent.md
.github/agents/playwright-test-healer.agent.md
```

Görevleri:

- `playwright-test-planner`: Siteyi QA gibi gezip test planı çıkarır.
- `playwright-test-generator`: Test planından Playwright testleri üretir.
- `playwright-test-healer`: Bozulan testleri onarmaya yardımcı olur.

## Proje Klasör Yapısı

Ana dosya ve klasörler:

```text
.
├── README.md
├── package.json
├── package-lock.json
├── playwright.config.ts
├── pages/
│   ├── BasePage.ts
│   ├── TurkNetHomePage.ts
│   ├── TurkNetNavigationPage.ts
│   ├── TurkNetApplicationPage.ts
│   ├── TurkNetLoginPage.ts
│   ├── TurkNetInfrastructurePage.ts
│   └── TurkNetSupportPage.ts
├── test-data/
│   └── turknet-test-data.ts
├── tests/
│   ├── turknet.application-entry.spec.ts
│   ├── turknet.home.spec.ts
│   ├── turknet.login-entry.spec.ts
│   ├── turknet.mobile.spec.ts
│   ├── turknet.navigation.spec.ts
│   ├── turknet.packages.spec.ts
│   ├── turknet.support.spec.ts
│   └── turknet.validation-boundary.spec.ts
├── docs/
│   ├── turknet-test-strategy.md
│   └── turknet-agent-observations.md
├── scripts/
│   └── check-secrets.sh
├── .githooks/
│   └── pre-push
├── .github/
│   ├── agents/
│   └── workflows/
└── .vscode/
    └── mcp.json
```

## Önemli Dosyalar Ne İşe Yarar?

### `playwright.config.ts`

Playwright ayar dosyasıdır.

İçinde şunlar ayarlanır:

- Test klasörü: `./tests`
- Base URL: örnek public hedef site olarak `https://www.turk.net/`
- Timeout değerleri
- Screenshot ayarı
- Video ayarı
- Trace ayarı
- Chromium browser projesi
- Worker sayısı

### `pages/TurkNetHomePage.ts`

Örnek public ana sayfa için yardımcı methodları içerir.

Örnek görevleri:

- Ana sayfayı açmak
- Cookie banner varsa güvenli şekilde kapatmak
- Logo/header kontrolü yapmak
- Hero/CTA alanını kontrol etmek
- Footer kontrolü yapmak

### `pages/TurkNetNavigationPage.ts`

Navigasyon testleri için yardımcı methodları içerir.

Örnek görevleri:

- Ana menü linklerini kontrol etmek
- Görünen linkleri toplamak
- Güvenli bir linke tıklayıp sayfa açılıyor mu kontrol etmek

### `pages/TurkNetApplicationPage.ts`

Akış girişi, altyapı sorgulama veya paket CTA alanları için yardımcı methodları içerir.

Önemli güvenlik davranışı:

Bu dosya final submit yapmaz. Captcha, OTP, SMS, e-Devlet, ödeme veya kimlik doğrulama gibi bir sınır görürse test daha ileri gitmemelidir.

### `test-data/turknet-test-data.ts`

Sahte test datasını içerir.

Gerçek kişisel veri içermez.

### `docs/turknet-test-strategy.md`

Test stratejisini açıklar.

İçinde:

- Scope
- Smoke testler
- Regression testler
- Negative validation testleri
- Mobil testler
- Manual-only senaryolar
- Güvenlik sınırları
- Test komutları

### `docs/turknet-agent-observations.md`

Agent gözlemlerini ve sınırlamaları açıklar.

İçinde:

- MCP'nin Codex oturumunda callable olmadığı
- Hangi sayfaların/akışların hedeflendiği
- Cookie banner varsayımları
- Captcha/OTP/payment/e-Devlet sınırları
- Locator stratejisi
- Public production site test riskleri

## Test Dosyaları

### `tests/turknet.home.spec.ts`

Ana sayfa testleri.

Kontrol eder:

- Site açılıyor mu?
- Public hedef sayfa doğru şekilde yükleniyor mu?
- Header/brand görünüyor mu?
- CTA alanı bulunabiliyor mu?
- Footer görünüyor mu?
- Cookie banner varsa güvenli şekilde ele alınıyor mu?

### `tests/turknet.navigation.spec.ts`

Navigasyon testleri.

Kontrol eder:

- Header linkleri görünüyor mu?
- Güvenli bir navigasyon linki sayfa/section açıyor mu?
- Veri gönderimi yapılmadan gezinme sağlanıyor mu?

### `tests/turknet.application-entry.spec.ts`

Güvenli akış girişi testleri.

Kontrol eder:

- CTA bulunabiliyor mu?
- Akış güvenli şekilde açılıyor mu?
- Form veya sonraki adım görünüyorsa kontrol ediliyor mu?
- Final submit yapılmıyor.
- Captcha/OTP/payment/e-Devlet varsa manuel sınır kabul ediliyor.

### `tests/turknet.validation-boundary.spec.ts`

Validation ve manuel sınır testleri.

Kontrol eder:

- Test datası sadece fake placeholder değerlerden oluşuyor mu?
- Zorunlu alan validasyonu yalnızca güvenli non-final aksiyon varsa deneniyor mu?
- Altyapı/adres akışında gerçek adres veya final submit yapılmadan duruluyor mu?

### `tests/turknet.login-entry.spec.ts`

Login giriş sayfası gözlem testidir.

Kontrol eder:

- Login sayfası yalnızca yapı olarak gözlemlenebilir mi?
- Gerçek credential girilmeden manuel sınır korunuyor mu?

### `tests/turknet.support.spec.ts`

Destek/help içerik testidir.

Kontrol eder:

- Destek sayfası güvenli şekilde açılıyor mu?
- Destek linkleri görünür mü?

### `tests/turknet.packages.spec.ts`

Public paket/kampanya sayfası testidir.

Kontrol eder:

- Bilgi amaçlı public sayfa açılıyor mu?
- Form submission veya hassas işlem yapılmadan içerik gözlemleniyor mu?

### `tests/turknet.mobile.spec.ts`

Mobil görünüm testleri.

Kontrol eder:

- Mobil viewport ile ana sayfa açılıyor mu?
- CTA görünür veya erişilebilir mi?
- Mobil menü veya navigasyon erişilebilir mi?

## Kurulum Adımları

### 1. Projeyi aç

```bash
cd /Users/suleymansercemgulmez/Projeler/Playwright_Agent_Project
```

### 2. Bağımlılıkları kur

```bash
npm install
```

### 3. Playwright browser'ları eksikse kur

```bash
npx playwright install
```

### 4. Güvenlik kontrolünü çalıştır

```bash
npm run security:check
```

### 5. Testleri çalıştır

```bash
npx playwright test
```

## Sık Kullanılan Komutlar

Tüm testleri çalıştır:

```bash
npx playwright test
```

Sadece ana sayfa testlerini çalıştır:

```bash
npx playwright test tests/turknet.home.spec.ts
```

Sadece mobil testleri çalıştır:

```bash
npx playwright test tests/turknet.mobile.spec.ts
```

Playwright UI modunu aç:

```bash
npx playwright test --ui
```

Debug modunda çalıştır:

```bash
npx playwright test --debug
```

HTML raporu aç:

```bash
npx playwright show-report
```

Secret taraması çalıştır:

```bash
npm run security:check
```

## Güvenlik Kuralları

Bu proje public repo olduğu için aşağıdaki kurallar önemlidir.

Yasak olanlar:

- Gerçek telefon numarası kullanmak
- Gerçek TC kimlik numarası kullanmak
- Gerçek adres kullanmak
- Gerçek kullanıcı/müşteri numarası kullanmak
- Gerçek kullanıcı adı/şifre kullanmak
- Gerçek API key veya token yazmak
- Gerçek ödeme bilgisi kullanmak
- Final işlem veya başvuru göndermek
- Captcha veya bot koruması aşmaya çalışmak
- OTP/SMS doğrulaması aşmaya çalışmak
- e-Devlet akışını otomatikleştirmek

İzin verilenler:

- Sayfa açılışını kontrol etmek
- Görünür header/footer/CTA alanlarını kontrol etmek
- Güvenli bilgi sayfalarına gitmek
- Sahte placeholder data kullanmak
- Final submit yapmadan validasyon gözlemlemek
- Manual boundary çıktığında testi durdurmak veya skip etmek

## Manual Boundary Nedir?

Manual boundary, otomasyonun durması gereken noktadır.

Bu projede manual boundary kabul edilen durumlar:

- Captcha
- OTP
- SMS doğrulama
- e-Devlet
- Kimlik doğrulama
- Ödeme
- Sözleşme onayı
- Final başvuru gönderimi
- Gerçek kullanıcı/müşteri talebi oluşturma

Bu noktalarda test ilerlememelidir.

## Public Production Site Test Riski

Hedef site public production ortamıdır. Bu yüzden testler bazen skip olabilir veya bağlantı kapanabilir.

Sebep olabilecek durumlar:

- Bot koruması
- Rate limit
- A/B test
- Kampanya değişikliği
- Cookie banner değişikliği
- Site içeriğinin güncellenmesi
- Tarayıcı otomasyon trafiğinin kapatılması

Bu proje bu durumları bypass etmeye çalışmaz. Güvenli davranış olarak ilgili senaryoyu skip eder veya manuel sınır olarak dokümante eder.

## Marka ve Konumlandırma Notu

Bu repo bir marka adına konuşmaz, resmi kalite güvence paketi olduğunu iddia etmez ve hedef site sahibiyle bir bağlantı beyan etmez.

Konumlandırma bilinçli olarak generic tutulmuştur:

```text
Safe Playwright TypeScript automation framework for public web flows.
```

Dosya adlarında ve test örneklerinde hedef siteye ait isimlerin geçmesi yalnızca teknik bağlam içindir. Projenin amacı, public web flow test mimarisi, Page Object Model, güvenli test sınırları ve secret taraması gibi mühendislik pratiklerini göstermektir.

## VS Code İçinde Playwright Agent Kullanımı

VS Code içinde Copilot Chat/Agent Mode açıkken şu agentlar kullanılabilir:

```text
playwright-test-planner
playwright-test-generator
playwright-test-healer
```

Örnek planner prompt:

```text
Use playwright-test-planner. Open the configured public target site and explore safe public web flows as a QA engineer. Save a safe test plan under specs/.
```

Örnek generator prompt:

```text
Use playwright-test-generator. Generate Playwright tests from the saved test plan and place them under tests/.
```

Not:

Codex terminal oturumunda Playwright MCP browser araçları doğrudan kullanılamadı. VS Code içindeki Copilot Agent Mode tarafında MCP server kayıtları hazırdır.

## Push Öncesi Kontrol

Bu projede push öncesi otomatik güvenlik kontrolü vardır.

Hook:

```text
.githooks/pre-push
```

Çalıştırdığı komut:

```bash
npm run security:check
```

Eğer secret benzeri bir değer yakalanırsa push durdurulur.

## GitHub'a Push

Değişiklikleri görmek:

```bash
git status
```

Dosyaları stage etmek:

```bash
git add .
```

Commit oluşturmak:

```bash
git commit -m "Update README documentation"
```

Push yapmak:

```bash
git push
```

Push sırasında güvenlik kontrolü otomatik çalışır.

## Projenin Şu Anki Sınırları

- Testler public production siteye karşı tasarlandı.
- Captcha, OTP, ödeme, e-Devlet ve final işlem otomasyona dahil değildir.
- Site otomasyon trafiğini kapatırsa testler skip olabilir.
- Bu proje yük testi veya performans testi yapmaz.
- Footer'daki tüm linkleri test etmek hedeflenmez.
- Gerçek kullanıcı yolculuğunun yasal veya güvenlik gerektiren aşamaları manuel test kapsamındadır.

## Kısa Özet

Bu proje güvenli bir Playwright TypeScript public web flow test altyapısıdır.

Kullanılan ana teknolojiler:

- Node.js
- npm
- Playwright
- TypeScript
- Chromium
- Page Object Model
- Git
- GitHub
- GitHub Copilot
- GitHub Copilot Chat
- Playwright MCP
- VS Code
- Bash tabanlı secret scan
- Git pre-push hook

Ana güvenlik prensibi:

```text
Gerçek veri kullanma. Final işlem yapma. Güvenlik kontrollerini bypass etme.
```
