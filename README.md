# Customisable Menu

A responsive and customisable navigation menu built with React.  
Users can reorder the menu items according to their preferences, and the structure adapts dynamically to permissions and screen sizes.

## 🚀 Features

- **Responsive design**  
  - Horizontal menu on desktop.  
  - Vertical menu on mobile.  

- **Dynamic menu generation**  
  - Items loaded from a JSON object (`name`, `url`, `sectionId`).  
  - New sections are automatically added at the end.  

- **User management**  
  - Non-logged users → default order.  
  - Logged users → personalised order is restored.  
  - Unauthorized sections are hidden.  

- **Edit mode**  
  - Toggle edit mode with an icon.  
  - Menu items become draggable.  
  - New order is saved to the backend.  

## 📂 Project Structure (suggested)

src
 ├── components
 │   ├── EditButton.jsx
 │   ├── Footer.jsx
 │   ├── Header.jsx
 │   ├── LoginModal.jsx
 │   ├── Menu.jsx
 │   └── MenuItem.jsx
 ├── content
 │   ├── 404.jsx
 │   ├── About.jsx
 │   ├── Accessible.jsx
 │   ├── Admin.jsx
 │   ├── Exemple.jsx
 │   ├── Homepage.jsx
 │   └── Readme.jsx
 ├── style
 │   ├── checkbox.css
 │   ├── grid.css
 │   └── style.css
 ├── utils
 │   ├── access.jsx
 │   ├── api.jsx
 ├── App.jsx
 └── main.jsx


## 🛠️ Installation

- **Clone the repository**
git clone https://github.com/your-username/customisable_menu.git

cd customisable_menu

- **Install dependencies**
npm install

- **Start development server**
npm run dev


## 🧪 Usage

Edit src/data/menuItems.json to configure default menu items.
Use the edit button to reorder items when logged in.