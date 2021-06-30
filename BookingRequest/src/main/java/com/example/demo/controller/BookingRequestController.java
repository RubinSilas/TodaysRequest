package com.example.demo.controller;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.BusinessLayer.BookingRequestBL;
import com.example.demo.entity.BookingRequestBO;
import com.example.demo.entity.DestinationBO;
import com.example.demo.entity.SourceBO;

@RestController
@RequestMapping(path="/bookingRequest")
@CrossOrigin(origins="*")
public class BookingRequestController {
	
	private BookingRequestBL busy;

	public BookingRequestController(BookingRequestBL busy) {
		super();
		this.busy = busy;
	}
	
	
	
	// for adding requests
	
	@PostMapping(path="/bookings")
	public BookingRequestBO addRequest(@RequestBody BookingRequestBO booking)
	{
		return this.busy.addRequest(booking);
	}
	
	// to get all bookings
	
	@GetMapping(path="/bookings/srch")
	public List<BookingRequestBO> getAllBooks()
	{
		return this.busy.findAllBooks();
	}
	
	
	
	//to get all bookings with status booked
	
	@GetMapping(path="/bookings/todayBookings/{skip}/{limit}")
	public List<BookingRequestBO> findAllBooking(@PathVariable("skip") long skip,@PathVariable("limit") int limit)
	{
		Query query = new Query();
		query.limit(limit).skip(skip);
		Criteria sourceCriteria = Criteria.where("status").is("booked");
		query.addCriteria(sourceCriteria);
		
		return this.busy.findAllBooking(query);
	}
	
	
	
	
	//to apply filters
	
	@GetMapping("/filter/{source}/{destination}/{dropPoint}/{timeSlot}/{skip}/{limit}")
	   public List<BookingRequestBO> getByFilterRequest(@PathVariable("source") String source,@PathVariable("destination") String destination,@PathVariable("dropPoint") String dropPoint,@PathVariable("timeSlot") String timeSlot,@PathVariable("skip") long skip,@PathVariable("limit") int limit){
	       Query dynamicQuery = new Query();
	       if (!(source.equals("0")))
	       {
	          Criteria sourceCriteria = Criteria.where("source").is(source);
	          dynamicQuery.addCriteria(sourceCriteria);
	       }
	       if (!(destination.equals("0")))
	       {
	          Criteria destinationCriteria =     Criteria.where("destination").is(destination);
	          dynamicQuery.addCriteria(destinationCriteria);
	       }
	       if (!(dropPoint.equals("0")))
	       {
	          Criteria dropPointCriteria =     Criteria.where("dropPoint").is(dropPoint);
	          dynamicQuery.addCriteria(dropPointCriteria);
	       }
	       
	     //  dynamicQuery.limit(limit).skip(skip);
	       
	       List<BookingRequestBO> result=this.busy.filterRequests(dynamicQuery);
	       
	       List<BookingRequestBO> result1=result.stream().skip(skip).limit(limit).collect(Collectors.toList());
	       
	      
	       
	       
	       if (!(timeSlot.equals("0")))
	       {
	    	   LocalTime lt=LocalTime.parse(timeSlot);
	           List<BookingRequestBO> timeFilter= result.stream().filter(e->e.getTimeSlot().equals(lt)).collect(Collectors.toList());
	           List<BookingRequestBO> timeFilter1=timeFilter.stream().skip(skip).limit(limit).collect(Collectors.toList());
	           return timeFilter1;
	    	   
	       }
	       

	      return result1;
	   }
	
	// to delete requests
	
	@DeleteMapping("/bookings/{bookingID}")
	public Long removeRequest(@PathVariable("bookingID")Integer bookingID)
	{
		return this.busy.deleteRequest(bookingID);
	}
	
	//to get all sources
	
	@GetMapping(path="/sources")
	public List<SourceBO> getAllSources()
	{
		return this.busy.findAllSources();
	}
	
	//to add new sources
	
	@PostMapping(path="/sources/addSources")
	public SourceBO addSource(@RequestBody SourceBO source)
	{
		return this.busy.addSource(source);
	}
	
	//to get all destinations
	
	@GetMapping(path="/destinations")
	public List<DestinationBO> getAllDestinations()
	{
		return this.busy.findAllDestinations();
	}
	
	//to add new destinations
	
		@PostMapping(path="/destinations/addDestinations")
		public DestinationBO addDestination(@RequestBody DestinationBO dest)
		{
			return this.busy.addDestination(dest);
		}
		
		// To get the data count
		@GetMapping(path="/bookings/count")
		public Long getCount(){
		return this.busy.getCount();
		}
	

}
