# EcoShare

EcoShare on kiertotaloutta ja kestävää kehitystä edistävä verkkosovellus. Sovelluksen pääideana on tarjota alusta, jossa käyttäjät voivat antaa, myydä tai etsiä korjattavia ja käytettyjä tavaroita. Sovellus yhdistää tavalliset käyttäjät ja viralliset korjaajat (Master-käyttäjät), jotta rikkinäiset tavarat saavat uuden elämän roskakorin sijaan.

## 🔗 Linkit

* **Julkaistu sovellus (Front-end, Vercel):** [Laita Vercel-linkki tähän, esim. https://ecoshare.vercel.app]
* **Back-end API (Render):** [Laita Render-linkki tähän, esim. https://ecoshare-backend.onrender.com]
* **Rautalankamallit / UI-suunnitelma:** [Laita linkki Figmaan tai kuvaan tähän]

## 🔑 Testikäyttäjien tunnukset

Opettajat ja testaajat voivat käyttää seuraavia tunnuksia sovelluksen eri roolien testaamiseen:

**1. Ylläpitäjä (Admin) - Voi hallita käyttäjiä ja muokata/poistaa ilmoituksia:**
* Sähköposti/Tunnus: [Sinun admin-sähköpostisi]
* Salasana: [Sinun admin-salasanasi]

**2. Virallinen Korjaaja (Master) - Näkee piilotetut "Kaipaa korjausta" -ilmoitukset:**
* Sähköposti: [Luo tai laita tähän master-käyttäjän sähköposti]
* Salasana: [Master-käyttäjän salasana]

**3. Normaali käyttäjä:**
* Sähköposti: test@test.fi
* Salasana: 123456

## ✨ Toteutetut toiminnallisuudet

Sovelluksessa on toteutettu seuraavat ominaisuudet ja vaatimukset:
* **Käyttäjähallinta ja autentikaatio:** Rekisteröityminen, sisäänkirjautuminen (JWT/localStorage) ja uloskirjautuminen.
* **Käyttäjäroolit (UCD - User-Centered Design):** * *Normaali käyttäjä:* Voi luoda, muokata ja poistaa omia ilmoituksiaan sekä lisätä muiden tuotteita suosikkeihin.
  * *Virallinen korjaaja (Master):* Saa profiiliinsa luotettavuusmerkin ja on ainoa, joka näkee "Kaipaa korjausta" -statuksella olevat ilmoitukset (edistää kiertotalouden liiketoimintaa).
  * *Admin:* Pääsy hallintapaneeliin, jossa voi jakaa Master-oikeuksia, muokata ilmoitusten otsikoita ja poistaa asiatonta sisältöä.
* **Tiedostojen lataus:** Käyttäjät voivat ladata tuotekuvia ja profiilikuvia (Multer).
* **Suosikkijärjestelmä:** Käyttäjät voivat tallentaa kiinnostavia ilmoituksia omaan profiiliinsa.
* **Hakutoiminnot:** Reaaliaikainen tekstihaku ja kategorisointi.
* **Responsiivisuus:** Käyttöliittymä mukautuu täysin mobiililaitteille.

## 🗄️ Tietokannan rakenne

Sovellus käyttää relaatiotietokantaa (MySQL), joka on isännöity Clever Cloudissa.

**Päätaulut:**
1. `users`: Tallentaa käyttäjätiedot. Sisältää boolean-kentät `is_admin` ja `is_master` roolien hallintaa varten.
2. `products`: Tallentaa ilmoitukset. Sisältää vierasavaimen `user_id`, joka viittaa ilmoituksen jättäjään (ON DELETE CASCADE).
3. `favorites`: Välitaulu, joka yhdistää `users.id` ja `products.id` monesta-moneen -suhteella.

**Tietokantakaavio (ER-kaavio):**
![Tietokantakaavio](./tietokanta-kuva.png)
*(Huom: Tallenna tietokantakaavion kuva repositorioosi nimellä tietokanta-kuva.png)*

## 🔌 API-dokumentaatio (REST API)

| Metodi | Reitti | Kuvaus |
|---|---|---|
| POST | `/api/register` | Luo uuden käyttäjätilin |
| POST | `/api/login` | Kirjaa käyttäjän sisään ja palauttaa JWT-tokenin |
| POST | `/api/users/avatar/:id` | Päivittää käyttäjän profiilikuvan |
| GET | `/api/products` | Hakee kaikki julkiset ilmoitukset |
| GET | `/api/products/user/:id` | Hakee tietyn käyttäjän omat ilmoitukset |
| POST | `/api/products` | Luo uuden ilmoituksen (vaatii kirjautumisen) |
| PUT | `/api/products/:id` | Päivittää ilmoituksen tietoja |
| DELETE | `/api/products/:id` | Poistaa ilmoituksen |
| POST | `/api/favorites/toggle` | Lisää tai poistaa tuotteen suosikeista |
| GET | `/api/admin/users` | Hakee listan kaikista käyttäjistä (Vain Admin) |
| PUT | `/api/admin/users/:id/master`| Antaa tai poistaa Master-roolin (Vain Admin) |

## 🧪 Ohjelmistotestaus

Back-endin ohjelmistotestit on toteutettu Jest- ja Supertest-kirjastoilla. Testeissä tarkistetaan API:n perustoiminnallisuudet, kuten tuotteiden hakeminen ja virheellisten reittien käsittely.
* **Testitiedostojen sijainti:** [Laita linkki testikansioosi tähän, esim. `https://github.com/sinun-tunnus/ecoshare-backend/blob/main/api.test.js`]
* Testit voi ajaa lokaalisti komennolla: `npm run test`

## 🛠️ Käytetyt teknologiat ja referenssit

**Teknologiat:**
* Front-end: React, TypeScript, Vite, Tailwind CSS, React Router
* Back-end: Node.js, Express.js, Multer (kuvien käsittely), CORS
* Tietokanta: MySQL (Clever Cloud)
* Palvelimet/Hosting: Vercel (Front-end), Render (Back-end)

**Referenssit:**
* Kurssin opetusmateriaalit (Hybridisovellukset).
* Viralliset dokumentaatiot: React.dev, Expressjs.com, Tailwindcss.com.

## 🐛 Tiedossa olevat bugit ja ongelmat

* Ilmaisen pilvipalvelimen (Render) vuoksi back-end saattaa mennä ns. "nukkumaan" inaktiivisuuden jälkeen. Tämän vuoksi sovelluksen ensimmäinen lataus voi kestää 15-30 sekuntia.
* iOS-laitteilla kuvien lataaminen saattaa vaatia selaimen kameran/kuvagallerian käyttöoikeuksien manuaalisen hyväksymisen puhelimen asetuksista.

## 🖼️ Kuvakaappaukset käyttöliittymästä

![Etusivu ja tuotteet](./screenshot-home.png)
![Käyttäjän profiili ja Master-merkki](./screenshot-profile.png)
![Admin hallintapaneeli](./screenshot-admin.png)
*(Huom: Ota nämä kolme kuvakaappausta ja tallenna ne samaan kansioon README:n kanssa näillä nimillä)*
