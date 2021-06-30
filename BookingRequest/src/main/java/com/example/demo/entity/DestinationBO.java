package com.example.demo.entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="Destinations1")
public class DestinationBO {
	
	@Id
	int destinationid;
	String destination;
	List<DropPointsBO> dropPoints;
	List<TimeSlotBO> timeSlots;

}
