# Clinic Frontend

Run frontend:

```bash
cd frontend
npm install
npm run dev
```

Run backend:

```bash
cd backend
mvn spring-boot:run
```

Notes:
- Update `backend/src/main/resources/application.properties` with your MySQL username/password.
- Create the database using `db/schema.sql` or allow JPA to create tables (configured `spring.jpa.hibernate.ddl-auto=update`).
- Seed sample data with:

```bash
mysql -u YOUR_USER -p clinic_db < db/seed.sql
```

Replace `YOUR_USER` with your MySQL username.

