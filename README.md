# Doctor Appointment App

📌 **Overview**   
A Full-stack **Doctor Appointment** platform with separate experiences for **patients** and **doctors**, plus a **server** that handles auth, scheduling, and data APIs.

- Patient app: search providers, view availability, book/cancel, manage appointments
- Doctor app: manage calendar, approve/deny requests, view patient details
- Server API: authentication, appointment lifecycle, notifications, data persistence

> Repo layout: `ClientSide/` (patient), `clientside-doctor/` (doctor), `server-side/` (API). :contentReference[oaicite:1]{index=1}

---

## ✨ Features

- **Self-service booking** with time-slot selection and conflict checks  
- **Role-based auth** for patients and doctors  
- **Appointment lifecycle** (request → confirm → complete → cancel/no-show)  
- **Profiles** (doctor specialties, locations; patient info)  
- **Notifications & reminders** (email/SMS/push ready)  
- **Search & filters** (by specialty, location, availability)  
- **Doctor dashboard** (upcoming schedule, requests, patient notes)

---

- **Clients:** JavaScript/TypeScript front-ends (SPA).  
- **Server:** Node.js API that exposes endpoints for auth, providers, time slots, and appointments.  
- **Store:** Pluggable DB (configure via environment variable).  
- **Auth:** Token-based (JWT/bearer) with role claims.  
Languages detected by GitHub: **JavaScript**, **TypeScript**, (plus a touch of HTML/CSS). :contentReference[oaicite:2]{index=2}

---

## 🚀 Quick Start (Monorepo)

> Requires **Node.js 18+** and **npm** (or **pnpm/yarn**).

1) **Clone**
```bash
git clone https://github.com/haigaz15/DR_APPOINTMENT_APP
cd DR_APPOINTMENT_APP
```
2)**Install (per package)**
```bash
# Patient client
cd ClientSide && npm install && cd ..

# Doctor client
cd clientside-doctor && npm install && cd ..

# Server
cd server-side && npm install && cd ..
```


3)** Start API**
```bash
cd server-side && npm run dev

# In a new terminal: patient client
cd ClientSide && npm run dev

# In a new terminal: doctor client
cd clientside-doctor && npm run dev
```



## 🧱 Architecture

