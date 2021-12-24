package com.acer.activities.controller;

import com.acer.activities.entity.Activity;
import com.acer.activities.service.ActivitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class ActivitiesController {

    @Autowired
    private ActivitiesService activitiesService;

    @GetMapping("/users/{username}/todos")
    public List<Activity> getAllActivity(@PathVariable String username) {
        return activitiesService.findAll(username);
    }

    @GetMapping("/users/{username}/todos/{id}")
    public Activity getActivity(@PathVariable String username, @PathVariable int id) {
        var activity = activitiesService.findById(id, username);
        return activity.orElse(null);
    }

    @DeleteMapping("users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable String username, @PathVariable int id) {
        var activity = activitiesService.deleteById(id, username);
        if (activity.isPresent()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("users/{username}/todos/{id}")
    public ResponseEntity<Activity> updateActivity(@PathVariable String username, @PathVariable int id, @RequestBody Activity activity) {
        activity.setUserName(username);
        Activity activityUpdated = activitiesService.save(activity);
        return new ResponseEntity<>(activityUpdated, HttpStatus.OK);
    }

    @PostMapping("users/{username}/todos")
    public ResponseEntity<Void> addActivity(@PathVariable String username, @RequestBody Activity activity) {
        activity.setUserName(username);
        Activity activityCreated = activitiesService.save(activity);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(activityCreated.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
}
