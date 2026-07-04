-- Seed data for Clinic Appointment Booking System
-- IMPORTANT: Replace `<BCrypt hash>` placeholders with real BCrypt-hashed passwords.
USE clinic_db;

-- Users: admin, doctor user, patient user
INSERT INTO users (name, email, password, phone, role)
VALUES
('Admin User','admin@clinic.com','$2b$10$J4RoyjlZcfsnuDhPpQe79.Uttn1S7hfu7x5EQtmkABCbnkb7albyO','+10000000000','ADMIN'),
('Dr. Alice','alice@clinic.com','$2b$10$5SE2fzaAkfFhlvdRb0E9gOcrJewdZXLNwmKipuUsv0TDs7jc9AuAy','+10000000001','DOCTOR'),
('Patient Bob','bob@clinic.com','$2b$10$qrkSWRvufLG6EawE8UMnNeO6SzLhv.T5NfmDEYCL7IdtHmMTtYCn2','+10000000002','PATIENT');

-- Automatically insert the doctor profile and seed slots using the seeded user emails.
SET @doctorUserId = (SELECT id FROM users WHERE email='alice@clinic.com');
INSERT INTO doctors (user_id, specialization, experience_years, qualification, available_days, consultation_fee)
VALUES (@doctorUserId, 'Cardiology', 8, 'MBBS, MD', 'Mon,Tue,Wed', 100.00);

SET @doctorId = LAST_INSERT_ID();
INSERT INTO time_slots (doctor_id, slot_date, slot_time, is_booked) VALUES
(@doctorId, '2026-06-01', '09:00:00', FALSE),
(@doctorId, '2026-06-01', '09:30:00', FALSE),
(@doctorId, '2026-06-01', '10:00:00', FALSE),
(@doctorId, '2026-06-02', '14:00:00', FALSE),
(@doctorId, '2026-06-02', '14:30:00', FALSE);

-- Optional appointment sample for the seeded patient
SET @patientUserId = (SELECT id FROM users WHERE email='bob@clinic.com');
SET @slotId = (SELECT id FROM time_slots WHERE doctor_id=@doctorId AND slot_time='09:00:00' LIMIT 1);
INSERT INTO appointments (patient_id, doctor_id, slot_id, status, reason)
VALUES (@patientUserId, @doctorId, @slotId, 'PENDING', 'General checkup');

-- Helpful: to generate BCrypt hashes quickly using Java snippet in the backend project, see README instructions.
