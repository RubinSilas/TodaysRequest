package com.example.demo.repo;



import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.demo.entity.BookingRequestBO;

public interface BookingRequestRepo extends MongoRepository<BookingRequestBO, Integer> {

	

	@Query(value= "{bookingID:?0}",delete=true)
	Long deleteByBookingID(Integer bookingID);
	
	

}
