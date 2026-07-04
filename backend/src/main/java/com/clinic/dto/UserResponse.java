package com.clinic.dto;

import com.clinic.model.User;

public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private User.Role role;

    public UserResponse(User u) {
        this.id = u.getId();
        this.name = u.getName();
        this.email = u.getEmail();
        this.phone = u.getPhone();
        this.role = u.getRole();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public User.Role getRole() {
        return role;
    }

    public void setRole(User.Role role) {
        this.role = role;
    }
}
