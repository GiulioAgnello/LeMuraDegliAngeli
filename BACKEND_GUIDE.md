# 📋 Le Mura degli Angeli — Backend API & Deploy Guide

## Stack consigliato
- **Frontend**: React + Vite → deploy su **Vercel** (gratuito)
- **Backend**: .NET 8 (già esistente) → deploy su **Railway** (gratuito fino 500h/mese)
- **Database**: **Supabase PostgreSQL** (gratuito, 500MB)
- **Notifiche WhatsApp**: **CallMeBot** (gratuito, no card richiesta)
- **Email**: **Resend** (gratuito, 3000 email/mese)

---

## 🗄️ Schema Database

```sql
-- Utenti (proprietario + ospiti)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'guest', -- 'owner' | 'guest'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Stanze / proprietà
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price_per_night DECIMAL(10,2),
  max_guests INTEGER DEFAULT 4,
  image_url VARCHAR(500),
  location VARCHAR(100), -- 'sternatia' | 'corigliano'
  is_active BOOLEAN DEFAULT true
);

-- Prenotazioni
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id),
  user_id UUID REFERENCES users(id) NULL, -- null se ospite senza account
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(50),
  guests_count INTEGER DEFAULT 1,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending|confirmed|cancelled|checkedin|checkedout
  total_price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Recensioni
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  guest_name VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messaggi di contatto
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔌 API Endpoints necessari

### Auth
```
POST   /api/Auth/login          → { email, password } → JWT token + role + name
POST   /api/Auth/register       → per creare ospiti temporanei
```

### Rooms
```
GET    /api/Rooms/              → lista stanze (pubblico)
GET    /api/Rooms/{id}
POST   /api/Rooms/              → [owner only]
PUT    /api/Rooms/{id}          → [owner only]
```

### Bookings
```
GET    /api/Bookings/           → tutte le prenotazioni [owner only]
GET    /api/Bookings/{id}       → singola prenotazione
POST   /api/Bookings/           → crea prenotazione (pubblico)
PATCH  /api/Bookings/{id}/status → { status } [owner only]
GET    /api/Bookings/room/{roomId}/booked-dates → date occupate (pubblico)
```

### Reviews
```
GET    /api/Reviews/            → tutte le recensioni [owner only]
GET    /api/Reviews/public      → recensioni pubbliche (pubblico)
POST   /api/Reviews/            → crea recensione [guest only, con token]
```

### Contact
```
POST   /api/Contact/            → messaggio di contatto (pubblico)
```

---

## 📱 WhatsApp Notifications (CallMeBot — GRATUITO)

### Setup (5 minuti)
1. Salva il numero **+34 644 35 58 27** nella rubrica come "CallMeBot"
2. Invia "I allow callmebot to send me messages" su WhatsApp a quel numero
3. Riceverai una risposta con il tuo **API key**

### Integrazione nel backend .NET
```csharp
// Aggiungi in appsettings.json
"WhatsApp": {
  "PhoneNumber": "39TUONUMERO",  // senza +
  "ApiKey": "IL_TUO_API_KEY"
}

// Service
public async Task SendWhatsAppNotification(string message)
{
  var phone = _config["WhatsApp:PhoneNumber"];
  var apiKey = _config["WhatsApp:ApiKey"];
  var encodedMsg = Uri.EscapeDataString(message);
  var url = $"https://api.callmebot.com/whatsapp.php?phone={phone}&text={encodedMsg}&apikey={apiKey}";
  await _httpClient.GetAsync(url);
}

// Chiama nel BookingsController quando arriva una prenotazione
await _whatsappService.SendWhatsAppNotification(
  $"🏨 Nuova prenotazione!\n" +
  $"👤 {booking.GuestName}\n" +
  $"📅 {booking.CheckIn:dd/MM/yyyy} → {booking.CheckOut:dd/MM/yyyy}\n" +
  $"🛏️ {room.Name}\n" +
  $"📧 {booking.GuestEmail}"
);
```

---

## 🚀 Deploy Step-by-Step

### 1. Frontend su Vercel

```bash
# Nel terminale, nella cartella del progetto
npm run build

# Oppure collega GitHub a Vercel:
# 1. Vai su vercel.com → New Project
# 2. Importa repo GitHub
# 3. Framework: Vite
# 4. Aggiungi env variable: VITE_API_URL = https://tuo-backend.railway.app
```

### 2. Backend .NET su Railway

```bash
# Crea account su railway.app
# New Project → Deploy from GitHub Repo
# Seleziona il repo del backend

# Aggiungi queste variabili d'ambiente:
ConnectionStrings__Default = "Host=xxx.supabase.co;Database=postgres;Username=postgres;Password=xxx"
JWT__Secret = "una-chiave-segreta-lunga-almeno-32-caratteri"
WhatsApp__PhoneNumber = "39TUONUMERO"
WhatsApp__ApiKey = "TUO_API_KEY"
ASPNETCORE_URLS = "http://+:8080"
```

### 3. Database su Supabase

```
1. Vai su supabase.com → New Project
2. Copia la Connection String (URI mode)
3. Vai su SQL Editor → esegui lo schema SQL qui sopra
4. Inserisci l'owner con password hashata BCrypt
```

### 4. Crea utente proprietario

```sql
-- Password: inserisci l'hash BCrypt di "tuapassword"
-- Genera hash su: bcrypt-generator.com
INSERT INTO users (email, name, role, password_hash) 
VALUES ('tua@email.it', 'Il tuo nome', 'owner', '$2a$12$...');
```

### 5. CORS nel backend

```csharp
// In Program.cs
builder.Services.AddCors(options => {
  options.AddPolicy("AllowFrontend", policy => {
    policy.WithOrigins(
      "https://tuo-sito.vercel.app",
      "http://localhost:5173"
    )
    .AllowAnyHeader()
    .AllowAnyMethod();
  });
});
app.UseCors("AllowFrontend");
```

---

## 🔑 Flusso Guest Login (ospiti temporanei)

1. Owner conferma prenotazione → crea account temporaneo ospite
2. Sistema invia email con credenziali all'ospite
3. Ospite fa login → accede al portale `/ospite`
4. Vede WiFi, info struttura, consigli locali, può lasciare recensione
5. Dopo check-out → account viene disattivato

### Creazione automatica account ospite:
```csharp
// Quando l'owner fa PATCH /api/Bookings/{id}/status con status="confirmed"
if (status == "confirmed") {
  var tempPassword = GenerateRandomPassword(); // es: "ABC123"
  await CreateGuestUser(booking.GuestEmail, booking.GuestName, booking.Id);
  await SendCredentialsEmail(booking.GuestEmail, tempPassword);
  await SendWhatsAppNotification($"Prenotazione confermata! 🎉");
}
```

---

## 📁 File .env (copia in .env del frontend)

```env
VITE_API_URL=http://localhost:5214
# In produzione:
# VITE_API_URL=https://tuo-backend.railway.app
```

---

## ✅ Checklist prima del go-live

- [ ] Backend .NET deployato su Railway
- [ ] Database Supabase creato con schema
- [ ] Utente owner creato nel DB
- [ ] CORS configurato per dominio Vercel
- [ ] JWT Secret impostato
- [ ] WhatsApp CallMeBot configurato
- [ ] Frontend deployato su Vercel con VITE_API_URL corretto
- [ ] Testare: prenotazione → notifica WhatsApp
- [ ] Testare: login owner → dashboard
- [ ] Testare: login ospite → portale
- [ ] Immagini reali caricate nella cartella /public
- [ ] Numero di telefono aggiornato nel Footer e Contacts
- [ ] P.IVA aggiornata nel Footer
