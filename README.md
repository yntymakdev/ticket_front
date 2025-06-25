# 🎟️ Ticket Management System

Добро пожаловать в проект **Ticket** — современное веб-приложение для управления тикетами. Это мощный инструмент, позволяющий операторам и супервайзерам эффективно обрабатывать обращения клиентов, отслеживать статусы заявок и координировать рабочие процессы.

---

## 📸 Скриншоты

| Главная панель             | Создание тикета             | Просмотр тикета              |
|----------------------------|-----------------------------|------------------------------|
| ![Dashboard](./public/) | ![Create Ticket](./screenshots/create_ticket.png) | ![View Ticket](./screenshots/view_ticket.png) |

> Помести скриншоты в папку `screenshots/` в корне проекта.

---

## ⚙️ Технологии

- **Frontend**:  
  ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat-square)  
  ![Redux Toolkit](https://img.shields.io/badge/-Redux%20Toolkit-764ABC?logo=redux&logoColor=white&style=flat-square)  
  ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square)  
  ![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=white&style=flat-square)  
  ![SCSS Modules](https://img.shields.io/badge/-SCSS%20Modules-CD6799?logo=sass&logoColor=white&style=flat-square)

- **Backend** (если есть):  
  ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?logo=nestjs&logoColor=white&style=flat-square)  
  ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white&style=flat-square)  
  ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=flat-square)

- **DevOps**:  
  ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white&style=flat-square)

---

## 👤 Роли пользователей

- **Оператор**:
  - Создает тикеты.
  - Отвечает на тикеты.
  - Может видеть только свои тикеты.
  - Меняет статусы: `OPEN`, `IN_PROGRESS`, `CLOSED`.

- **Супервайзер**:
  - Видит все тикеты.
  - Может назначать тикеты другим операторам.
  - Не может создавать тикеты.

---

## 📂 Основные функции

- 🔍 Поиск тикетов по имени клиента.
- 📝 Создание, редактирование и просмотр тикетов.
- 🔄 Статусы тикетов: `OPEN`, `IN_PROGRESS`, `CLOSED`.
- 🧑‍🤝‍🧑 Разделение прав доступа между ролями.
- 🧠 Интуитивный интерфейс с современным дизайном.
- 🚀 Производительное API с использованием RTK Query.

---

## 🧪 Установка и запуск

```bash
# 1. Клонируй репозиторий
git clone https://github.com/yourusername/ticket.git

# 2. Перейди в директорию проекта
cd ticket

# 3. Установи зависимости
npm install

# 4. Запусти проект
npm run dev
