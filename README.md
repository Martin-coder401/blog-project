# Martins  blog-project


This is a basic blog post app built with HTML, CSS, and JavaScript. You can view, add, edit, and delete blog posts. The app uses a tool called `json-server` to act like a fake backend (a pretend database).

---

## 🛠️ How to Set Up

### 1. Make sure Node.js is installed on your computer

You can check by running this command in your terminal:

```bash
node -v
If it shows a version number, you’re good! If not, install Node.js from https://nodejs.org.

2. Install Tools You Need
In your terminal:

bash
Copy
Edit
npm install -g json-server
npm install -g live-server
These will let you run the app and fake backend on your computer.

▶️ How to Run the App
Open two terminals in your project folder:
Terminal 1: Start the backend

bash
Copy
Edit
json-server db.json
This starts the fake API at:
👉 http://localhost:3000

Terminal 2: Start the frontend

bash
Copy
Edit
live-server
This opens your app in the browser at:
👉 http://127.0.0.1:8080

🧪 What You Can Do
✅ See all post titles
✅ Click a title to view its full content
✅ Add a new post
✅ Edit a post
✅ Delete a post

📁 Project Structure
pgsql
Copy
Edit
blog-post-manager/
├── index.html
├── css/
│   └── styles.css
├── src/
│   └── index.js
└── db.json
💡 Tips
You don’t need to refresh the browser — it updates automatically when you save.

Make sure both servers are running in separate terminals.

When editing, if your changes don’t save, check the terminal for errors.





