# Employee Management CRUD System

A lightweight, full-stack User Management Application featuring a completely decoupled architecture where the frontend interface and backend database API communicate via asynchronous HTTP transactions.

---

## 📸 Project Previews

### Main Dashboard (User List View)
<img width="1920" height="1080" alt="Screenshot (104)" src="https://github.com/user-attachments/assets/6a68c09b-34f4-485c-b1ea-3c60ff083791" />

---
### Create User
<img width="1920" height="1080" alt="Screenshot (109)" src="https://github.com/user-attachments/assets/1de0463c-174e-49ac-825e-0653a8b087ea" />


### Edit User Details View
<img width="1920" height="1080" alt="Screenshot (105)" src="https://github.com/user-attachments/assets/919b4c03-0d58-4058-87d7-b78161ff6889" />

---
### Delete User 
<img width="1920" height="1080" alt="Screenshot (110)" src="https://github.com/user-attachments/assets/64788396-90df-4847-90a9-942c422e1b69" />

---

### XAMP and phpMyAdmin
<img width="1920" height="1080" alt="Screenshot (107)" src="https://github.com/user-attachments/assets/7987951f-7d73-46e7-a546-fb15ff876749" />

---

### Code Structure
<img width="1920" height="1080" alt="Screenshot (108)" src="https://github.com/user-attachments/assets/f4fd684f-0e57-4abb-8ffa-94b8d3688db8" />




## 🚀 Core Tech Stack

*   **Frontend:** React, React Router, Axios (for async REST API requests)[span_2]
*   **Backend:** Raw PHP (Custom entry-point routing and CORS middleware processing)
*   **Database:** MySQL handled securely via PDO (PHP Data Objects) Prepared Statements

---

## 📁 Project Structure

```text
EmployeeManagement/
├── react-crud-frontend/    # Frontend Client (React SPA Application)
│   ├── public/             # Public assets & index.html
│   └── src/                # Components (ListUser.js, EditUser.js, App.js)
│
├── react-crud-backend/     # Backend REST API (PHP Environment)
│   ├── DbConnect.php       # Unified PDO database connection configuration
│   └── index.php           # API Routing switchboard & CORS safety headers
│
└── screenshots/            # UI Display snapshots for GitHub repository
