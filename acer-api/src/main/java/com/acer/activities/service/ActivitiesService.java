package com.acer.activities.service;

import com.acer.activities.entity.Activity;
import com.acer.activities.repository.ActivitiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivitiesService {

    @Autowired
    private ActivitiesRepository activitiesRepository;

    public List<Activity> findAll(String userName) {
        return activitiesRepository.findByUserName(userName).orElse(null);
    }

    public Activity save(Activity activity) {
        return activitiesRepository.save(activity);
    }

    public Optional<Activity> deleteById(int id, String userName) {
        var activity = this.findById(id, userName);
        activity.ifPresent(activitiesRepository::delete);
        return activity;
    }

    public Optional<Activity> findById(int id, String userName) {
        return activitiesRepository.findByIdAndUserName(id, userName);
    }

}
