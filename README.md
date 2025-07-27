# LeafChat (Frontend)

<p align="center">
  <img src="public/images/leafchat_logo_resize.png" />
</p>

## Overview

LeafChat is full-stack messenger application designed to provide seamless communication, built as part of The Odin Project curriculum.

## [Live Demo](https://leafchat-frontend.onrender.com)

Deployed on [Render](https://render.com/).

### Built With

<a href="https://reactjs.org">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" height="40" alt="React">
</a>
<a href="https://vitejs.dev">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" height="40" alt="Vite" />
</a>
<a href="https://react-query.tanstack.com">
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" height="40" alt="React Query" />
</a>
<a href="https://reactrouter.com">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" height="40" alt="React Router" />
</a>
<a href="https://daisyui.com">
  <img src="https://img.shields.io/badge/-DaisyUI-5A0EF8?logo=daisyui&logoColor=white&style=for-the-badge" height="40" alt="DaisyUI" />
</a>
<a href="https://tailwindcss.com">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" height="40" alt="Tailwind CSS" />
</a>
<a href="https://socket.io">
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white" height="40" alt="Socket.IO"/>
</a>
<a href="https://react-hook-form.com" >
  <img src="https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" height="40" alt="React-Hook-Form" />
</a>
<a href="https://zod.dev/">
  <img src="https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white" height="40" 
   alt="Zod" />
</a>

## Features

- **Real-time Messaging**: Private and group chat rooms with instant updates via WebSockets.
- **Group Chats**: Users can create group chats, add multiple friends to the conversation and assign group admins.
- **User Profile**: Customizable profiles, including interesting usage statistics.
- **Contacts List**: Users can create private chat conversation from a global contacts list.
- **Authentication**: Custom user authentication with Email and password based on JWT.
- **Responsive UI**: Modern, mobile-friendly interface with dark mode support.
- Optimistic updates on group creating, profile updating, contact adding and so on.

## Getting started

### 1. Clone the Repository

#### HTTPS

```bash
$ git clone https://github.com/amit-amsl/messaging-app-frontend.git
```

#### SSH

```bash
$ git clone git@github.com:amit-amsl/messaging-app-frontend.git
```

### 2. Install dependencies

```bash
cd messaging-app-frontend
npm install
```

### 3. Setup environment variables

Create a .env file in the root directory of the project and add the following variables. Adjust the values according to your environment:

```bash
VITE_APP_API_URL=<URL_of_the_Server_running_the_backend> # (Example: http://localhost:3000/api)
VITE_APP_SOCKET_URL=<Simple_URL_of_the_Server_running_the_backend> # (Example: localhost:3000)
```

### 4. Start development server

```bash
npm run dev
```

The application will be available at http://localhost:5173 by default.
Have fun!

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Vite**: Next generation frontend tooling.
- **TypeScript**: Typed superset of JavaScript.
- **TailwindCSS**: Utility-first CSS framework.
- **DaisyUI**: A popular Tailwind CSS plugin that offers a range of pre-made, editable UI elements
- **Tanstack Query** (aka React-Query): Powerful library designed to simplify data fetching and state management in web applications.
- **Axios**: A popular library used for making HTTP requests.
- **Socket.IO-Client**: Library that enables low-latency, bidirectional and event-based communication between a client and a server.
- **React-Hook-Form**: Library for building and managing forms in React applications.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **Zustand**: Small, fast, and scalable state management library for React applications
- **Lucide React**: Icon library for React.
- **date-fns**: Utility library designed for manipulating and formatting dates.
- **React-Select**: Flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support.
- **@hookform/resolvers**: Provides integrations with various validation libraries like Yup, Zod, and Joi, allowing you to use them with React Hook Form for form validation

## Screenshots

### Desktop

![desktop-user-profile](public/images/desktop/leafchat_profile_desktop.png)

![desktop-user-profile-update](public/images/desktop/leafchat_profileUpdate_desktop.png)

![desktop-chats-list](public/images/desktop/leafchat_chats_desktop.png)

![desktop-chat-conversation](public/images/desktop/leafchat_ChatConvo_desktop.png)

![desktop-group-conversation/list](public/images/desktop/leafchat_groupConvo+groups_desktop.png)

![desktop-group-info](public/images/desktop/leafchat_groupInfo_desktop.png)

![desktop-group-update](public/images/desktop/leafchat_groupUpdate_desktop.png)

![desktop-group-create](public/images/desktop/leafchat_groupCreate_desktop.png)

### Mobile

<div style="display: flex; flex-wrap: wrap; gap: 4px; align-items: flex-start;">
  <img src="public/images/mobile/leafchat_profile_mobile.png" width="250" />
  <img src="public/images/mobile/leafchat_chats_mobile.png" width="250" />
  <img src="public/images/mobile/leafchat_ChatConvo_mobile.png" width="326" />
  <img src="public/images/mobile/leafchat_groups_mobile.png" width="250" />
  <img src="public/images/mobile/leafchat_groupConvo_mobile.png" width="250" />
  <img src="public/images/mobile/leafchat_groupCreate_mobile.png" width="250" />
</div>

## Contributing:

Feel free to fork the repository and submit pull requests. Any contributions, whether they’re bug fixes, new features, or performance improvements, are always welcome.

## Disclaimer:

This project is built for educational purposes only. Any resemblance to actual social media platforms, living or dead, is purely coincidental.
