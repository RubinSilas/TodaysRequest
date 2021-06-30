package com.example.demo.BusinessLayer;

import java.util.List;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.example.demo.DataAccesLayer.BookingRequestDL;
import com.example.demo.entity.BookingRequestBO;
import com.example.demo.entity.DestinationBO;
import com.example.demo.entity.SourceBO;

@Service(value="BookingServiceBL")
public class BookingRequestBL {
	
	private BookingRequestDL data;
	

	public BookingRequestBL(BookingRequestDL data) {
		super();
		this.data = data;
	}
	
	
	


	public BookingRequestBO addRequest(BookingRequestBO booking) 
	{
		return this.data.addRequest(booking) ;
	}




	public List<BookingRequestBO> findAllBooks() 
	{
		return this.data.findAllBooks();
	}


	public List<BookingRequestBO> filterRequests(Query dynamicQuery) {
		// TODO Auto-generated method stub
		return this.data.filterRequests(dynamicQuery);
	}


	public Long deleteRequest(Integer bookingID) {
		// TODO Auto-generated method stub
		return this.data.deleteRequest(bookingID);
	}


	public List<SourceBO> findAllSources() {
		// TODO Auto-generated method stub
		return this.data.findAllSources();
	}


	public SourceBO addSource(SourceBO source) {
		// TODO Auto-generated method stub
		return this.data.addSource(source);
	}


	public List<DestinationBO> findAllDestinations() {
		// TODO Auto-generated method stub
		return this.data.findAllDestinations();
	}


	public DestinationBO addDestination(DestinationBO dest) {
		// TODO Auto-generated method stub
		return this.data.addDestination(dest);
	}





	public Long getCount() {
		// TODO Auto-generated method stub
		return this.data.getCount();
	}





	public List<BookingRequestBO> findAllBooking(Query query) {
		// TODO Auto-generated method stub
		return this.data.findAllBooking(query);
	}

}
