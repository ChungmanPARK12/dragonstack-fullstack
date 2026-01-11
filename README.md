## 🧱 Tech Stack & What I Learned

This project was built while following a full-stack DragonStack course,  
with a focus on understanding **end-to-end application flow** rather than isolated features.

### Frontend
- **React (Class Components)**
  - State management with `setState`
  - Controlled inputs and form handling
  - Conditional rendering (edit / view modes)
- **Redux**
  - Action / Reducer architecture
  - Async actions with `redux-thunk`
  - Global state synchronization after API mutations
- **React Router**
  - Route-based page structure
  - Authentication-aware routing
- **Parcel**
  - Lightweight bundler for development

### Backend
- **Node.js + Express**
  - RESTful API design
  - Modular routing structure
- **Session-based Authentication**
  - Cookie-based sessions
  - Server-side session validation
- **PostgreSQL**
  - Relational data modeling
  - Join tables (Account ↔ Dragon)
- **SQL**
  - CRUD operations
  - Foreign key–based relationships

### API Testing & Debugging
- **Postman**
  - Manual testing of REST APIs
  - Verifying request/response payloads
  - Debugging authentication and session-related issues
  - Validating backend behavior independently from the frontend

### Full-Stack Integration
- Frontend ↔ Backend data flow
- Handling async API calls and UI updates
- Debugging 500 errors across layers
- Keeping frontend state in sync after backend updates

---

## 🎯 Key Takeaways
- Gained hands-on experience debugging real full-stack issues  
- Learned how small mismatches (naming, payload shape, environment differences) can break an app  
- Improved confidence in tracing bugs across **React → Redux → API → Database**
