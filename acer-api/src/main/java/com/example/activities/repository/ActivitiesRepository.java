package com.example.activities.repository;

import com.example.activities.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActivitiesRepository extends JpaRepository<Activity,Integer> {

    Optional<List<Activity>> findByUserName(String userName);

    Optional<Activity> findByIdAndUserName(int id, String userName);
}
