package com.clinic.controller;

import com.clinic.model.Doctor;
import com.clinic.model.User;
import com.clinic.repository.AppointmentRepository;
import com.clinic.repository.DoctorRepository;
import com.clinic.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;

    public AdminController(DoctorRepository doctorRepository, UserRepository userRepository, AppointmentRepository appointmentRepository) {
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<Doctor>> getDoctors() {
        return ResponseEntity.ok(doctorRepository.findAll());
    }

    @PostMapping("/doctors")
    public ResponseEntity<?> addDoctor(@RequestBody Doctor d) {
        return ResponseEntity.ok(doctorRepository.save(d));
    }

    @PutMapping("/doctors/{id}")
    public ResponseEntity<?> updateDoctor(@PathVariable Long id, @RequestBody Doctor d) {
        Doctor existing = doctorRepository.findById(id).orElseThrow();
        existing.setSpecialization(d.getSpecialization());
        existing.setExperienceYears(d.getExperienceYears());
        existing.setQualification(d.getQualification());
        existing.setAvailableDays(d.getAvailableDays());
        existing.setConsultationFee(d.getConsultationFee());
        doctorRepository.save(existing);
        return ResponseEntity.ok(existing);
    }

    @DeleteMapping("/doctors/{id}")
    public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
        doctorRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("deleted", true));
    }

    @GetMapping("/appointments")
    public ResponseEntity<?> allAppointments() {
        return ResponseEntity.ok(appointmentRepository.findAll());
    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<?> stats() {
        Map<String, Object> m = new HashMap<>();
        m.put("doctors", doctorRepository.count());
        m.put("patients", userRepository.count());
        m.put("appointments", appointmentRepository.count());
        return ResponseEntity.ok(m);
    }
}
