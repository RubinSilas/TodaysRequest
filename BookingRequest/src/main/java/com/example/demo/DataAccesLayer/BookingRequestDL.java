package com.example.demo.DataAccesLayer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.example.demo.entity.BookingRequestBO;
import com.example.demo.entity.DestinationBO;
import com.example.demo.entity.SourceBO;
import com.example.demo.repo.BookingRequestRepo;
import com.example.demo.repo.DestinationRepo;
import com.example.demo.repo.SourceRepo;

@Service(value="BookingServiceDL")
public class BookingRequestDL {
	
	
private BookingRequestRepo repo;
	
	private SourceRepo repo1;
	
	private DestinationRepo repo2;
	
	


	public BookingRequestDL(BookingRequestRepo repo, SourceRepo repo1, DestinationRepo repo2) {
		super();
		this.repo = repo;
		this.repo1 = repo1;
		this.repo2 = repo2;
	}

	@Autowired
    private   MongoTemplate template;


	


	public BookingRequestBO addRequest(BookingRequestBO booking) 
	{
		return this.repo.save(booking);
	}


	


	public List<BookingRequestBO> findAllBooks() 
	{
		return this.repo.findAll();
	}


	public List<BookingRequestBO> filterRequests(Query dynamicQuery) 
	{
		return this.template.find(dynamicQuery, BookingRequestBO.class,"BookingRequest4");
	}


	public Long deleteRequest(Integer bookingID) {
		// TODO Auto-generated method stub
		return this.repo.deleteByBookingID(bookingID);
	}


	public List<SourceBO> findAllSources() {
		// TODO Auto-generated method stub
		return this.repo1.findAll();
	}


	public SourceBO addSource(SourceBO source) {
		// TODO Auto-generated method stub
		return this.repo1.save(source);
	}


	public List<DestinationBO> findAllDestinations() {
		// TODO Auto-generated method stub
		return this.repo2.findAll();
	}


	public DestinationBO addDestination(DestinationBO dest) {
		// TODO Auto-generated method stub
		return this.repo2.save(dest);
	}


	public Long getCount() {
		// TODO Auto-generated method stub
		return this.repo.findAll().stream().filter(e->e.getStatus().equals("booked")).count();
	}





	public List<BookingRequestBO> findAllBooking(Query query) {
		// TODO Auto-generated method stub
		return this.template.find(query,BookingRequestBO.class,"BookingRequest4");
	}

}
