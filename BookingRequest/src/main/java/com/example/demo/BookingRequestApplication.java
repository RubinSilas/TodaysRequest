package com.example.demo;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.example.demo.entity.BookingRequestBO;
import com.example.demo.entity.DestinationBO;
import com.example.demo.entity.DropPointsBO;
import com.example.demo.entity.SourceBO;
import com.example.demo.entity.TimeSlotBO;
import com.example.demo.repo.BookingRequestRepo;
import com.example.demo.repo.DestinationRepo;
import com.example.demo.repo.SourceRepo;


@SpringBootApplication
public class BookingRequestApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookingRequestApplication.class, args);
	}
		
		@Bean
		public CommandLineRunner runner()
		{
			return new CommandLineRunner()
					{
						@Autowired
						BookingRequestRepo repo;
						
						@Autowired
						SourceRepo repo1;
						
						@Autowired
						DestinationRepo repo2;
						
						

						@Override
						public void run(String... args) throws Exception {
							// TODO Auto-generated method stub
							
							
							BookingRequestBO booking=new BookingRequestBO(1001001,101, "Ruby", "Alpha City", "Tambaram", "Medavakkam", LocalTime.of(8, 30),LocalTime.of(7,30), "booked");
							//repo.save(booking);
							
							SourceBO source1=new SourceBO(101,"Alpha City");
						//	repo1.save(source1);
							
							DropPointsBO point1=new DropPointsBO("Sholingnallur");
							DropPointsBO point2=new DropPointsBO("Medavakkam");
							List<DropPointsBO> list1=new ArrayList<>();
							list1.add(point1);
							list1.add(point2);
							
							TimeSlotBO slot1=new TimeSlotBO(LocalTime.of(21, 30));
							TimeSlotBO slot2=new TimeSlotBO(LocalTime.of(20, 30));
							TimeSlotBO slot3=new TimeSlotBO(LocalTime.of(00, 00));
							List<TimeSlotBO> list2=new ArrayList<>();
							list2.add(slot1);
							list2.add(slot2);
							list2.add(slot3);
							
							DestinationBO dest1=new DestinationBO(12122,"Tambaram",list1,list2);
						//	repo2.save(dest1); 
					
							
							
							
							
							
							
						}
						
					};
	}

}
