package com.clinic.controller;

import com.clinic.dto.AppointmentRequestDTO;
import com.clinic.model.Appointment;
import com.clinic.model.TimeSlot;
import com.clinic.model.User;
import com.clinic.repository.AppointmentRepository;
import com.clinic.repository.DoctorRepository;
import com.clinic.repository.TimeSlotRepository;
import com.clinic.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PatientController {

    private final DoctorRepository doctorRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;

    public PatientController(DoctorRepository doctorRepository, TimeSlotRepository timeSlotRepository, UserRepository userRepository, AppointmentRepository appointmentRepository) {
        this.doctorRepository = doctorRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping("/doctors")
    public ResponseEntity<?> listDoctors(@RequestParam(required = false) String specialization) {
        if (specialization == null) return ResponseEntity.ok(doctorRepository.findAll());
        return ResponseEntity.ok(doctorRepository.findBySpecializationContainingIgnoreCase(specialization));
    }

    @GetMapping("/doctors/{id}")
    public ResponseEntity<?> getDoctor(@PathVariable Long id) {
        return ResponseEntity.of(doctorRepository.findById(id));
    }

    @PostMapping("/appointments/book")
    public ResponseEntity<?> bookAppointment(@AuthenticationPrincipal UserDetails userDetails, @RequestBody AppointmentRequestDTO dto) {
        User patient = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        List<TimeSlot> slots = timeSlotRepository.findByDoctorIdAndSlotDateAndIsBookedFalse(dto.getDoctorId(), dto.getSlotDate());
        TimeSlot chosen = slots.stream().filter(s -> s.getSlotTime().equals(dto.getSlotTime())).findFirst().orElse(null);
        if (chosen == null) return ResponseEntity.badRequest().body("Slot not available");
        chosen.setIsBooked(true);
        timeSlotRepository.save(chosen);

        Appointment ap = new Appointment();
        ap.setPatient(patient);
        ap.setDoctor(chosen.getDoctor());
        ap.setSlot(chosen);
        ap.setReason(dto.getReason());
        appointmentRepository.save(ap);
        return ResponseEntity.ok(ap);
    }

    @GetMapping("/appointments/my")
    public ResponseEntity<?> myAppointments(@AuthenticationPrincipal UserDetails userDetails) {
        User patient = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(appointmentRepository.findByPatientId(patient.getId()));
    }

    @PutMapping("/appointments/cancel/{id}")
    public ResponseEntity<?> cancelAppointment(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long id) {
        Appointment ap = appointmentRepository.findById(id).orElseThrow();
        ap.setStatus(Appointment.Status.CANCELLED);
        if (ap.getSlot() != null) {
            TimeSlot s = ap.getSlot();
            s.setIsBooked(false);
            timeSlotRepository.save(s);
        }
        appointmentRepository.save(ap);
        return ResponseEntity.ok(ap);
    }
    
    @GetMapping("/debug-db")
    public ResponseEntity<?> debugDb() {
        long count = doctorRepository.count();
        return ResponseEntity.ok("Doctor count seen by this running app: " + count);
    }
    
    @PostMapping("/debug-insert-doctor")
    public ResponseEntity<?> debugInsertDoctor() {
        com.clinic.model.Doctor doc = new com.clinic.model.Doctor();
        doc.setSpecialization("TestSpecialization");
        doc.setExperienceYears(5);
        doc.setQualification("Test");
        doc.setAvailableDays("Mon");
        doc.setConsultationFee(50.0);
        doctorRepository.save(doc);
        return ResponseEntity.ok("Inserted. New count: " + doctorRepository.count());
    }
}
