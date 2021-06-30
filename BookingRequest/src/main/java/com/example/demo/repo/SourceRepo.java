package com.example.demo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.entity.SourceBO;

public interface SourceRepo extends MongoRepository<SourceBO, Integer> {

}
