# 🚀 GitHub Feltöltési Útmutató - Jacek Tirparking

## ✅ Amit Már Megcsináltam

1. ✅ Git repository inicializálva
2. ✅ `.gitignore` fájl létrehozva
3. ✅ Szép `README.md` létrehozva
4. ✅ Minden fájl hozzáadva (25 fájl)
5. ✅ Initial commit elkészítve
6. ✅ Git user beállítva (Jacek Tirparking)

---

## 📝 Következő Lépések (Ezt Neked Kell Megcsinálni)

### 1. GitHub Fiók Létrehozása (ha még nincs)

1. Menj a **https://github.com** oldalra
2. Kattints a **"Sign up"** gombra
3. Kövesd a regisztrációs lépéseket:
   - Email cím
   - Jelszó
   - Felhasználónév (pl. `jacek-tirparking`)
   - Ellenőrzés

### 2. Új Repository Létrehozása GitHub-on

1. **Jelentkezz be** a GitHub fiókodba
2. Kattints a **"+"** jelre a jobb felső sarokban
3. Válaszd a **"New repository"** opciót
4. Töltsd ki az adatokat:
   ```
   Repository name: jacek-parking
   Description: Modern kamionparkoló weboldal - Halmaj
   Visibility: Public (hogy bárki láthassa)
   
   ❌ NE pipáld be:
   - Initialize with README
   - Add .gitignore
   - Choose a license
   
   (Ezek már megvannak a projektben!)
   ```
5. Kattints a **"Create repository"** gombra

### 3. Repository Feltöltése

Miután létrehoztad a GitHub repository-t, látsz egy oldalt utasításokkal.

**Válaszd ezt az opciót:** "...or push an existing repository from the command line"

Futtasd ezeket a parancsokat a PowerShell-ben:

```powershell
cd c:\jacek-parking

# Add meg a GitHub repository URL-jét
# CSERÉLD KI a "yourusername" részt a saját GitHub felhasználónevedre!
git remote add origin https://github.com/yourusername/jacek-parking.git

# Nevezd át a branch-et main-re (ha még nem az)
git branch -M main

# Töltsd fel a fájlokat
git push -u origin main
```

**Példa** (ha a felhasználóneved `jacek-tirparking`):
```powershell
git remote add origin https://github.com/jacek-tirparking/jacek-parking.git
git branch -M main
git push -u origin main
```

### 4. GitHub Pages Aktiválása

1. Menj a repository oldalára GitHub-on
2. Kattints a **"Settings"** (Beállítások) fülre
3. Görgess le a bal oldali menüben a **"Pages"** opcióhoz
4. A **"Source"** résznél:
   - Branch: `main`
   - Folder: `/ (root)`
5. Kattints a **"Save"** gombra
6. Várj 1-2 percet

### 5. Weboldal Elérése

Az oldal elérhető lesz ezen a címen:
```
https://yourusername.github.io/jacek-parking/
```

**Példa** (ha a felhasználóneved `jacek-tirparking`):
```
https://jacek-tirparking.github.io/jacek-parking/
```

---

## 🎯 Gyors Parancsok (Másold Be Egyben)

**FONTOS:** Cseréld ki a `yourusername` részt a saját GitHub felhasználónevedre!

```powershell
cd c:\jacek-parking
git remote add origin https://github.com/yourusername/jacek-parking.git
git branch -M main
git push -u origin main
```

---

## 🔐 Authentikáció

Amikor először pusholsz, a GitHub kérni fogja a bejelentkezési adatokat:

### Opció 1: Personal Access Token (Ajánlott)

1. Menj a GitHub-ra: **Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Kattints a **"Generate new token (classic)"** gombra
3. Adj neki egy nevet (pl. "Jacek Parking Deploy")
4. Válaszd ki a **"repo"** scope-ot
5. Kattints a **"Generate token"** gombra
6. **MÁSOLD KI A TOKENT** (csak egyszer látod!)
7. Amikor a git kéri a jelszót, **illeszd be a tokent** jelszó helyett

### Opció 2: GitHub Desktop (Egyszerűbb)

1. Töltsd le: https://desktop.github.com/
2. Telepítsd és jelentkezz be
3. Add hozzá a `c:\jacek-parking` mappát
4. Kattints a **"Publish repository"** gombra

---

## 📊 Mit Fogsz Látni GitHub-on?

### Repository Tartalma:
```
jacek-parking/
├── 📄 README.md (szép leírás)
├── 📄 index.html
├── 📄 styles.css
├── 📄 main.js
├── 📄 translations.json
├── 📁 assets/images/
├── 📁 translations_src/
├── 📄 MOBILE_OPTIMIZATION.md
├── 📄 DEVICE_TESTING_REPORT.md
└── ... (összes fájl)
```

### GitHub Pages:
- ✅ Élő weboldal
- ✅ HTTPS automatikusan
- ✅ Gyors CDN
- ✅ Ingyenes hosting

---

## 🔄 Jövőbeli Frissítések

Ha később módosítasz valamit az oldalon:

```powershell
cd c:\jacek-parking

# Nézd meg a változásokat
git status

# Add hozzá a módosított fájlokat
git add .

# Commitold a változásokat
git commit -m "Leírás a változásokról"

# Töltsd fel GitHub-ra
git push
```

**Példa commit üzenetek:**
```bash
git commit -m "Új kép hozzáadva a hero szekcióhoz"
git commit -m "Árak frissítve"
git commit -m "Új szolgáltatás hozzáadva"
git commit -m "Hibajavítás: mobil menü"
```

---

## 🌐 Egyedi Domain Hozzáadása (Opcionális)

Ha van saját domainjed (pl. `www.jacektirparking.hu`):

1. GitHub repository **Settings → Pages**
2. **Custom domain** mezőbe írd be: `www.jacektirparking.hu`
3. A domain szolgáltatódnál (pl. Cloudflare, GoDaddy) add hozzá:
   ```
   CNAME record:
   www → yourusername.github.io
   ```

---

## 🎉 Kész!

Miután feltöltötted, az oldal elérhető lesz:

### 🔗 Élő Link:
```
https://yourusername.github.io/jacek-parking/
```

### 📱 Megosztható Link:
Ezt a linket küldheted el bárkinek, és azonnal láthatják az oldalt!

### 🚀 Előnyök:
- ✅ **Ingyenes** hosting
- ✅ **HTTPS** automatikusan
- ✅ **Gyors** (GitHub CDN)
- ✅ **Megbízható** (99.9% uptime)
- ✅ **Egyszerű** frissítés (git push)

---

## 📞 Segítség

Ha elakadtál valahol:

1. **GitHub dokumentáció**: https://docs.github.com/en/pages
2. **Git dokumentáció**: https://git-scm.com/doc
3. **GitHub Desktop**: https://desktop.github.com/ (grafikus felület)

---

## ✅ Checklist

Pipáld ki ahogy haladsz:

- [ ] GitHub fiók létrehozva
- [ ] Új repository létrehozva (`jacek-parking`)
- [ ] `git remote add origin` parancs futtatva
- [ ] `git push -u origin main` parancs futtatva
- [ ] GitHub Pages aktiválva (Settings → Pages)
- [ ] Weboldal elérhető (`https://yourusername.github.io/jacek-parking/`)
- [ ] Link megosztva ismerősökkel 🎉

---

**Készítette**: AI Assistant  
**Dátum**: 2025-01-08  
**Status**: ✅ Készen áll a feltöltésre!

**Sok sikert! 🚀**

