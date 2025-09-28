# IEEE WIE ISIMS Website  
Visit The website : https://wie-isims.ieee.tn
# NOTE: 
Add a .env file with your FACEBOOK_PAGE_ACCESS_TOKEN / FACEBOOK_PAGE_ID / FACEBOOK_PROFILE_LINK
# and  SupabaseClient.js :  

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "YOUR_SUPABASEURL"; // from API settings

const supabaseKey = "YOUR_ANON_API_KEY";  // from API settings

export const supabase = createClient(supabaseUrl, supabaseKey);

![GitHub repo size](https://img.shields.io/github/repo-size/FirasLahiani-153/Wie_WebSite)  
![GitHub contributors](https://img.shields.io/github/contributors/FirasLahiani-153/Wie_WebSite)  
![GitHub stars](https://img.shields.io/github/stars/FirasLahiani-153/Wie_WebSite?style=social)  
![GitHub forks](https://img.shields.io/github/forks/FirasLahiani-153/Wie_WebSite?style=social)  
![License](https://img.shields.io/github/license/FirasLahiani-153/Wie_WebSite)  

> Official website of the **IEEE Women in Engineering (WIE) ISIMS Affinity Group**, showcasing events, team members, and activities.  

---

## 📖 Table of Contents  

1. [About](#about)  
2. [Features](#features) 
3. [Tech Stack](#tech-stack)  
4. [Project Structure](#project-structure)  
5. [Setup & Installation](#setup--installation)  
6. [Usage](#usage)  
7. [Deployment](#deployment)  
8. [Integrations](#integrations)  
9. [License](#license)  
10. [Contact](#contact)  

---

## ✨ About  

The **IEEE WIE ISIMS Website** serves as a digital hub for our community.  
It highlights:  

- Upcoming and past **events**  
- **Team members** and their roles  
- Our **mission and goals**  
- A clean, responsive design accessible on desktop and mobile  

---

## 🌟 Features  

- 🎉 Event showcase (with images & descriptions)  
- 👩‍💻 Team presentation page  
- 📱 Mobile-first responsive design  
- ⚡ Fast builds with **Vite**  
- 🎨 Styled using **Tailwind CSS**  
- 🔧 Easy to update Events via Supabase event manager  

---



## 🛠 Tech Stack  

- **Framework**: React + Vite  
- **Styling**: Tailwind CSS  
- **Linting**: ESLint  
- **Build tool**: Vite  
- **Database / Event Manager**: Supabase  
- **Chatbot**: Chatling.ai  
- **Deployment**: Netlify / Vercel / GitHub Pages  

---

## 📂 Project Structure  

```
/
├── public/                  # Public assets (favicon, static images, etc.)
├── src/                     # Source code
│   ├── components/          # Reusable UI components
│   ├── pages/               # Website pages (Home, Events, About, etc.)
│   ├── assets/              # Images, logos, icons
│   └── App.jsx              # Main app file
├── wie_team_events_data.txt # Old data file (replaced by Supabase)
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── eslint.config.js         # ESLint rules
├── package.json             # Dependencies & scripts
└── .env                     # Environment variables (if needed)
```

---

## ⚙️ Setup & Installation  

Clone the repo:  

```bash
git clone https://github.com/FirasLahiani-153/Wie_WebSite.git
cd Wie_WebSite
```

Install dependencies:  

```bash
npm install
```

Create `.env` if needed and set variables.  

---

## 🚀 Usage  

Run locally with hot-reload:  

```bash
npm run dev
```

Build for production:  

```bash
npm run build
```

Preview production build:  

```bash
npm run preview
```

---

## 🌍 Deployment  

This site can be deployed to:  

- **Netlify** → just link repo & set `npm run build` / `dist`  
- **Vercel** → import repo and auto-deploy  
- **GitHub Pages** → build locally, push `dist` to `gh-pages` branch  

---

## 🔗 Integrations  

### 💬 Chatbot (Chatling.ai)  

We use [Chatling.ai](https://chatling.ai) to provide a chatbot on the website.  
- Embed script added in `public/index.html` to display the chatbot on all pages.  
- Visitors can interact with the chatbot for FAQs and guidance.  

### 📅 Event Manager (Supabase)  

We replaced the static events file with **Supabase** for dynamic event management.  
- Events are stored in a `events` table with fields: `id`, `title`, `description`, `date`, `image_url`.  
- Frontend fetches events from Supabase using `@supabase/supabase-js`.  
- Add/update events directly from Supabase dashboard (or extend with an admin panel).  

---


## 📜 License  

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.  

---

## 📬 Contact  

Maintainer: **Firas Lahiani**  
🔗 GitHub: [FirasLahiani-153](https://github.com/FirasLahiani-153)  
📧 Firas.lahiani153@gmail.com 
