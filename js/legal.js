/* CASECLUB — Rechtstexte für die SCHWEIZ (DE) + EN.
   CH-Rechtslage: kein Impressum-Zwang (anders als DE), aber UWG Art. 3 lit. s verlangt
   im Online-Handel klare Angabe von Identität und Kontaktadresse — die steht in AGB §1
   und in der Datenschutzerklärung §1. Kein gesetzliches Widerrufsrecht (wir geben
   freiwillig 30 Tage), nDSG (rev. 2023), MWST-frei unter CHF 100'000 Weltumsatz.

   >>> NUR DIESE VIER ZEILEN AUSFÜLLEN — sie werden in allen Texten eingesetzt: <<< */
const SELLER = {
  name  : "PLATZHALTER Muster-Handel",
  street: "PLATZHALTER Musterstrasse 1",
  city  : "PLATZHALTER 8000 Musterstadt",
  email : "leander.kyvelos@gmail.com"
};
/* PLATZHALTER-Erkennung: solange oben "PLATZHALTER" oder eckige Klammern stehen,
   warnt der Shop im Admin-Panel und in der Konsole. Beides verschwindet
   automatisch, sobald echte Daten drinstehen. */
const SELLER_IS_PLACEHOLDER = /PLATZHALTER|\[/.test(SELLER.name + SELLER.street + SELLER.city);
if(SELLER_IS_PLACEHOLDER) console.warn('[CaseClub] Rechtstexte enthalten Platzhalter-Anbieterdaten — vor dem Livegang in js/legal.js ersetzen.');
const SELLER_LINE = `${SELLER.name}, ${SELLER.street}, ${SELLER.city}, Schweiz`;
const LEGAL = {
agb: {
  title:{de:"Allgemeine Geschäftsbedingungen (AGB)", en:"Terms & Conditions"},
  body:{de:`
  <p><b>1. Anbieter</b><br>Anbieter und Vertragspartei ist ${SELLER_LINE}, E-Mail: ${SELLER.email}.</p>
  <p><b>2. Vertragsschluss</b><br>Die Darstellung der Produkte im Online-Shop stellt kein verbindliches Angebot dar, sondern eine Einladung zur Bestellung. Mit Klick auf „Bezahlen" gibst du ein verbindliches Angebot ab. Der Vertrag kommt durch Bestätigung per E-Mail zustande (Art. 184c OR: Identität, Adresse und Preise werden dir vor Abschluss bekannt gegeben — siehe Ziffer 1 und Checkout).</p>
  <p><b>3. Preise & Zahlung</b><br>Alle Preise in US-Dollar (USD) und inkl. aller Steuern. Der Anbieter ist von der Schweizer MWST befreit (Weltumsatz unter CHF 100'000), es wird keine MWST ausgewiesen. Zahlung per Karte, PayPal, Cash App Pay oder Apple Pay. Der Rechnungsbetrag wird mit Bestellung fällig.</p>
  <p><b>4. Lieferung</b><br>Die Ware wird direkt vom Herstellerlager versendet und verlässt dieses in der Regel innerhalb von 1–2 Werktagen nach Zahlungseingang. Die Lieferzeit beträgt üblicherweise 8–16 Tage, je nach Zoll und Region. Du erhältst einen Tracking-Link per E-Mail. Trifft die Sendung nicht innerhalb von 20 Tagen ein, erstatten wir den vollen Betrag auf Wunsch zurück. Teillieferungen sind zulässig, wenn dir dadurch keine Mehrkosten entstehen.</p>
  <p><b>5. Rückgabe</b><br>Ein gesetzliches Widerrufsrecht besteht in der Schweiz nicht. Wir gewähren dir aber freiwillig ein <b>30-tägiges Rückgaberecht</b> ab Erhalt der Ware — Details siehe <a href="#" onclick="openLegal('returns');return false">Rückgabebedingungen</a>.</p>
  <p><b>6. Gewährleistung</b><br>Es gilt die gesetzliche Gewährleistung nach OR (2 Jahre bei gebrauchsbedingten Mängeln). Bei Transportschäden: Foto an ${SELLER.email}, Ersatz wird versandt.</p>
  <p><b>7. Gutscheine & Aktionen</b><br>Rabattcodes (z. B. LAUNCH15) sind pro Bestellung einmal einlösbar und nicht kumulierbar, sofern nicht anders angegeben.</p>
  <p><b>8. Eigentumsvorbehalt</b><br>Die Ware bleibt bis zur vollständigen Bezahlung Eigentum des Anbieters.</p>
  <p><b>9. Haftung</b><br>Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper und Gesundheit. Im Übrigen haftet der Anbieter nur für die Verletzung wesentlicher Vertragspflichten.</p>
  <p><b>10. Anwendbares Recht & Gerichtsstand</b><br>Es gilt Schweizer Recht (OR/UWG). Gerichtsstand ist der Sitz des Anbieters, soweit gesetzlich zulässig. Zwingende Verbraucherschutzvorschriften des Wohnsitzlandes bleiben vorbehalten.</p>
  <p><em>Stand: August 2026 — Vorlage; bei grösserem Umsatz rechtlich prüfen lassen.</em></p>`,
  en:`
  <p><b>1. Provider</b><br>The provider and contracting party is ${SELLER.name}, ${SELLER.street}, ${SELLER.city}, Switzerland, email: ${SELLER.email}.</p>
  <p><b>2. Conclusion of contract</b><br>Product displays are an invitation to order. Clicking "Pay" submits a binding offer; the contract is concluded via email confirmation (Art. 184c Swiss CO: identity, address and prices are disclosed before purchase).</p>
  <p><b>3. Prices & payment</b><br>Prices in US dollars (USD), all taxes included. The provider is exempt from Swiss VAT (worldwide turnover below CHF 100,000). Card, PayPal, Cash App Pay or Apple Pay.</p>
  <p><b>4. Delivery</b><br>Goods ship directly from the manufacturer's warehouse, normally leaving within 1–2 working days of payment. Typical delivery is 8–16 days including customs, with tracking. If the parcel has not arrived within 20 days, we refund in full on request.</p>
  <p><b>5. Returns</b><br>Swiss law does not provide a statutory right of withdrawal. We voluntarily grant a <b>30-day return right</b> from receipt — see the <a href="#" onclick="openLegal('returns');return false">returns policy</a>.</p>
  <p><b>6. Warranty</b><br>Statutory warranty under the Swiss Code of Obligations. Transit damage: photo to ${SELLER.email} for a replacement.</p>
  <p><b>7. Promotions</b><br>Discount codes (e.g. LAUNCH15) are single-use per order and not stackable unless stated otherwise.</p>
  <p><b>8. Retention of title</b><br>Goods remain property of the provider until fully paid.</p>
  <p><b>9. Liability</b><br>Unlimited liability for intent and gross negligence; otherwise only for material breach.</p>
  <p><b>10. Governing law</b><br>Swiss law (CO/UWG). Mandatory consumer protection rules of your country of residence remain reserved.</p>`}
},
privacy: {
  title:{de:"Datenschutzerklärung", en:"Privacy Policy"},
  body:{de:`
  <p><b>1. Verantwortlicher</b><br>${SELLER_LINE}, ${SELLER.email}.</p>
  <p><b>2. Welche Daten wir verarbeiten</b><br>• <b>Bestelldaten</b> (Name, Lieferadresse, E-Mail) — zur Vertragserfüllung<br>• <b>Zahlungsdaten</b> — verarbeitet vom Zahlungsdienstleister; wir speichern keine Kartendaten<br>• <b>Cookies & lokale Speicherung</b> (Warenkorb, Sprachwahl, Cookie-Einwilligung) — technisch notwendig<br>• <b>Anonyme Nutzungsstatistiken</b> — nur mit Einwilligung, jederzeit widerrufbar</p>
  <p><b>3. Newsletter / Inner Circle</b><br>Die E-Mail-Adresse wird für Drop-Benachrichtigungen genutzt. Abmeldung jederzeit mit einem Klick, in jeder E-Mail.</p>
  <p><b>4. Rechtsgrundlage (rev. nDSG, seit 2023)</b><br>Wir verarbeiten Personendaten nur im Rahmen des persönlichen Überwältigungsschutzes und nach Treu und Glauben: für die Vertragserfüllung, aufgrund deiner Einwilligung oder überwiegender Interessen. Keine Datenverarbeitung zu Werbezwecken ohne Einwilligung.</p>
  <p><b>5. Weitergabe & Ausland</b><br>Kein Verkauf von Daten. Weitergabe nur an Dienstleister zur Auftragserfüllung (Versand, Zahlung). Dabei können Daten auch im Ausland (z. B. EU, USA) bearbeitet werden — gestützt auf angemessene Garantien (z. B. EU-US DPF) oder Ihre Einwilligung.</p>
  <p><b>6. Speicherdauer</b><br>Bestelldaten 10 Jahre (handels-/steuerrechtlich), Newsletter-Daten bis Abmeldung, Statistiken 14 Monate.</p>
  <p><b>7. Deine Rechte</b><br>Nach nDSG: Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf der Einwilligung, Einsprache bei der EDÖB. Anfrage an ${SELLER.email}.</p>
  <p><b>8. Kundinnen und Kunden aus der EU</b><br>Für Personen mit Wohnsitz in der EU wenden wir angemessene Garantien an; die DSGO-Grundsätze (Transparenz, Datenminimierung, Rechte) werden sinngemäss respektiert.</p>
  <p><em>Vorlage — vor Livegang an die tatsächlichen Dienste anpassen und prüfen lassen.</em></p>`,
  en:`
  <p><b>1. Controller</b><br>${SELLER.name}, ${SELLER.street}, ${SELLER.city}, Switzerland, ${SELLER.email}.</p>
  <p><b>2. Data we process</b><br>• <b>Order data</b> (name, shipping address, email) — contract performance<br>• <b>Payment data</b> — processed by the payment provider; we never store card data<br>• <b>Cookies & local storage</b> (cart, language, consent) — strictly necessary<br>• <b>Anonymous usage stats</b> — only with consent, revocable anytime</p>
  <p><b>3. Newsletter / Inner Circle</b><br>Email used for drop notifications. Unsubscribe anytime.</p>
  <p><b>4. Legal basis (revised Swiss FADP, 2023)</b><br>We process personal data in accordance with good faith, for contract performance, with your consent, or based on overriding interests. No advertising use without consent.</p>
  <p><b>5. Sharing & abroad</b><br>We never sell data. Sharing only with fulfillment/payment providers; data may be processed abroad (EU/US) under appropriate safeguards.</p>
  <p><b>6. Retention</b><br>Order data 10 years (commercial/tax law), newsletter data until unsubscribed, stats 14 months.</p>
  <p><b>7. Your rights</b><br>Under the FADP: access, rectification, erasure, restriction, portability, withdrawal of consent, objection to the FDPIC: ${SELLER.email}.</p>
  <p><em>Template — adapt and review before going live.</em></p>`}
},
returns: {
  title:{de:"Rückgabebedingungen (gutwillig)", en:"Returns Policy (voluntary)"},
  body:{de:`
  <p><b>Wichtig zu wissen</b><br>In der Schweiz besteht bei Online-Käufen <b>kein gesetzliches Widerrufsrecht</b> (anders als in der EU). Unsere Rückgabemöglichkeit ist eine <b>freiwillige Leistung</b> des Shops.</p>
  <p><b>30 Tage Rückgaberecht</b><br>Du kannst jede Bestellung innerhalb von 30 Tagen ab Erhalt der Ware zurückgeben — ohne Angabe von Gründen.</p>
  <p><b>Ablauf</b><br>1. E-Mail an ${SELLER.email} mit deiner Bestellnummer<br>2. Du erhältst die Rücksendeadresse<br>3. Nach Eingang und Prüfung: Erstattung auf dein ursprüngliches Zahlungsmittel (binnen 14 Tagen)</p>
  <p><b>Kosten</b><br>Die Rücksendekosten trägt die Kundin oder der Kunde — ausser bei einem Defekt oder einer Falschlieferung, dann übernehmen wir sie. Erstattet wird der Warenwert; bei vollständiger Rückgabe erstatten wir auch die ursprünglichen Versandkosten.</p>
  <p><b>Ausschlüsse</b><br>• Beschädigte oder stark getragene Waren (übliche Testnutzung ist ok)<br>• Personalisierte Hüllen (z. B. eigener Foto-Druck)</p>
  <p><b>Defekte / Transportschaden</b><br>Foto an ${SELLER.email} — kostenloser Ersatz, ohne Rücksendung.</p>`,
  en:`
  <p><b>Good to know</b><br>Swiss law provides <b>no statutory right of withdrawal</b> for online purchases (unlike the EU). Our return option is a <b>voluntary</b> shop service.</p>
  <p><b>30-day return right</b><br>Return any order within 30 days of receipt — no reasons required.</p>
  <p><b>Process</b><br>1. Email ${SELLER.email} with your order number<br>2. You receive the return address<br>3. Refund to your original payment method within 14 days of receipt</p>
  <p><b>Exclusions</b><br>• Damaged or heavily used items (normal trial use is fine)<br>• Personalized cases (e.g. custom photo prints)</p>
  <p><b>Defects / transit damage</b><br>Photo to ${SELLER.email} — free replacement.</p>`}
},
shipping: {
  title:{de:"Versandinformationen", en:"Shipping Information"},
  body:{de:`
  <p><b>Versandzeit</b><br>Deine Bestellung wird am Bestelltag an das Herstellerlager weitergegeben und verlässt dieses in 1–2 Werktagen. Übliche Lieferzeit 8–16 Tage inklusive Zoll, Sendungsverfolgung per E-Mail. Wir versenden nicht aus einem eigenen Lager in der Schweiz — das sagen wir offen, weil es die Lieferzeit erklärt.</p>
  <p><b>Lieferzeiten</b><br>• Standard: in der Regel 7–14 Werktage, je nach Region<br>• Spitzzeiten (Launches, Black Friday): +3–5 Tage</p>
  <p><b>Versandkosten</b><br>• Gratis Versand ab $30 Bestellwert<br>• Darunter: $4.90 pauschal</p>
  <p><b>Zoll & Einfuhrsteuern — wichtig bei Lieferung aus Übersee</b><br>Sendungen aus Übersee (z. B. China) werden in der Schweiz verzollt: Einfuhr-MWST wird erst erhoben, wenn der Steuerbetrag CHF 5 erreicht (bei 8,1 % entspricht das rund CHF 62 Warenwert, bei 2,6 % rund CHF 193); dazu kann eine Bearbeitungsgebühr des Transporteurs kommen. Massgebend sind die Ansätze zum Zeitpunkt der Einfuhr. Wo möglich bieten wir Versandwege mit übernommener Verzollung (Delivered Duty Paid) an — im Checkout ausgewiesen.</p>
  <p><b>Lieferung ins Ausland</b><br>Wir liefern derzeit ausschliesslich in die Schweiz und nach Liechtenstein. Bestellungen aus dem Ausland können wir noch nicht annehmen.</p>`,
  en:`
  <p><b>Dispatch</b><br>Orders ship within 48 hours with tracking (link sent by email).</p>
  <p><b>Delivery times</b><br>• Standard: typically 7–14 business days<br>• Peak times: +3–5 days</p>
  <p><b>Costs</b><br>• Free shipping over $30<br>• Below: $4.90 flat</p>
  <p><b>Customs & import taxes — important for overseas shipping</b><br>Shipments from overseas (e.g. China) are customs-cleared in Switzerland: import VAT plus handling fees may apply. Where possible we use shipping methods with customs handled (DDP) — shown at checkout.</p>
  <p><b>International delivery</b><br>We currently ship to Switzerland and Liechtenstein only.</p>`}
}
};
