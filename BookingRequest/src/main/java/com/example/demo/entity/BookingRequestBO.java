package com.example.demo.entity;


import java.time.LocalTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="BookingRequest4")
public class BookingRequestBO {
	
	@Id
	int bookingID;
	int employeeID;
	String employeeName;
	String source;
	String destination;
	String dropPoint;
	LocalTime timeSlot;
	LocalTime bookingTime;
	String status;

}
