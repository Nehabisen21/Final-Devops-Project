package com.example.userapp.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @GetMapping
    public List<Map<String, String>> getUsers() {
        return List.of(
            Map.of("id", "1", "name", "Neha"),
            Map.of("id", "2", "name", "DevOps Engineer")
        );
    }
}
