package com.clinic.controller;

import com.clinic.model.Appointment;
import com.clinic.model.User;
import com.clinic.repository.AppointmentRepository;
import com.clinic.repository.DoctorRepository;
import com.clinic.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;

    public DoctorController(AppointmentRepository appointmentRepository, UserRepository userRepository, DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
    }

    @GetMapping("/appointments")
    public ResponseEntity<?> myAppointments(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        com.clinic.model.Doctor doc = doctorRepository.findByUserId(user.getId()).orElseThrow();
        Long doctorId = doc.getId();
        List<Appointment> list = appointmentRepository.findByDoctorId(doctorId);
        return ResponseEntity.ok(list);
    }

    @PutMapping("/appointments/confirm/{id}")
    public ResponseEntity<?> confirm(@PathVariable Long id) {
        Appointment ap = appointmentRepository.findById(id).orElseThrow();
        ap.setStatus(Appointment.Status.CONFIRMED);
        appointmentRepository.save(ap);
        return ResponseEntity.ok(ap);
    }

    @PutMapping("/appointments/complete/{id}")
    public ResponseEntity<?> complete(@PathVariable Long id) {
        Appointment ap = appointmentRepository.findById(id).orElseThrow();
        ap.setStatus(Appointment.Status.COMPLETED);
        appointmentRepository.save(ap);
        return ResponseEntity.ok(ap);
    }
}
