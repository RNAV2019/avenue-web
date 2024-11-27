# Avenue
> Organize your links in a chaotic, beautiful way.

[![Video Demo](https://img.shields.io/badge/Watch_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/JPuTYyU5e1E)
![Development Time](https://img.shields.io/badge/Development_Time-2_Weeks-blue?style=for-the-badge)

## 📖 Overview
Avenue is a modern take on the traditional "bio link" concept - a centralized hub for all your important links that can be shared through social media bios or anywhere else.

## 🚀 Run Locally

1. Clone the repository to your local machine:
```zsh
git clone https://github.com/RNAV2019/avenue-web.git
```

2. Navigate to the project directory:
```zsh
cd avenue
```

3. Install dependencies:
```zsh
bun install
```

4. Start the development server:
```zsh
bun dev
```

The application will be available at `http://localhost:3000`

## 🛠️ Technical Stack
- **Frontend & Backend**: NextJS with React
- **Styling**: TailwindCSS
- **Database**: PostgreSQL
- **Visualization**: Chart.js

## ✨ Key Features
- 🔗 Centralized link management
- 📱 Responsive mobile-first design
- 📊 Advanced click tracking & analytics
- 📱 QR code generation for easy sharing

### Design Decisions:
When brainstorming about this project, I was considering what design philosophy to follow to make Avenue stand out and be interesting. While looking at multiple design principles, I came across the idea of Neobrutalism. Neobrutalism consists of bold colours and harsh shadows to give a modern take on traditional brutalistic design. The key design features would be the shadows that are around most sections and input fields, creating a sharp contrast between the foreground and background. Additionally, I chose to use TailwindCSS for its robust design system. To theme the website, I chose to use `#f43f5e` (rose-500) and `#6366f1` (indigo-500) for the foreground and `#f59e0b` (amber-500) for the background. The rose and indigo work in tandem with each other throughout the pages of the website and can be seen to alternate between the sections.

Keeping with the neobrutalistic design choice, I used the fonts **Outfit** and **Rubik** from Google Fonts, which fit the theme perfectly. The outfit font was mostly used for the project name in the top left of the screen. In contrast, the rubik font was used for everything else text-related on the website, including the hero, card, and footer sections. Most of the typography on the page is white to contrast well with the background colours to be seen easier.

### Landing Page:

The landing page has a navbar consisting of the project title in the top left and accompanying login and register buttons in the top right corner of the page. Following down the page, there is a hero section with a big, eye-catching title and subtext to draw the users attention to the "Try it Now" button below, which directs the user to the register page. The login and register buttons also direct the user to the login and register pages respectfully. Below that is a grid with 3 rows to highlight key features and elements of this website. Some of the sections include a mockup/example of the feature and, when hovered on, indicate relevant points with arrows.

The sections are separated into the dashboard, pricing, and example avenue sections. Each of which alternates sides on the page when viewed on a desktop to give a "tiling effect" and has a brief description of the intended features on the adjacent side, such as the statistics or the ability to add your own links. Nearing the bottom of the page, there is a "How it Works section" containing an arrow diagram of 3 steps to use the website properly. These include registering your account, adding your links to your avenue, and sharing your avenue either using a QR code or by copying the link. At the bottom of the page, there is a footer with the project title in the bottom left and a link to my website.

### Dashboard Page:
The dashboard page is the most important page, as it allows you to visit your avenue by clicking the respective button. Moreover, there are buttons to copy the avenue link and customise the description and profile picture visible on the user's avenue, providing customisation options to the user. Below that are the statistics of the avenue, namely the total number of clicks the avenue has received, the total number of links on that avenue, and a graph (made with ChartJS) showcasing the aggregate clicks on each day illustrated on a line graph.

### Avenue Page:
Upon visiting an avenue, if the user is the owner of the avenue, they are able to create, edit, and delete links. The links are shown in a vertical list alongside the avenue description and profile picture above it. In the bottom right corner (for desktops), there is also a dynamically generated QR code that can be scanned to bring users to this avenue. If the user is not the owner, then they will not see or have access to creating, editing, or deleting any of the links.

### Information to mention:
The project stores data in a Postgres database, the schema of which is available in the github repository. There are 4 tables, which are users, avenues, statistics, and links. Authentication and JWT tokens are managed by a package called next-auth designed for NextJS. All pages are designed to be responsive, working on desktop, laptop, and mobile devices alike.
