
var xmlGetAllRequests=new XMLHttpRequest();
var xmlGetAllSources=new XMLHttpRequest();
var xmlGetAllDestinations=new XMLHttpRequest();
var xmlGetFilteredRequests=new XMLHttpRequest();

var xhrCount= new XMLHttpRequest();
var filterApplied=false;
var skip=0;     
var limit=10; 
var count;

// To get Count of all the records with status booked

function getTotalCount(){
xhrCount.open("GET","http://localhost:8080/bookingRequest/bookings/count",true);
xhrCount.onreadystatechange=processResponseCount;
xhrCount.send(null);
}



function processResponseCount(){
if(xhrCount.readyState == 4 && xhrCount.status == 200){
count= JSON.parse(xhrCount.responseText);
}
}

getTotalCount();

///



  

// To set Date of Travel

getDate();

function getDate(){

		const date=new Date();
		const n=date.getDate(); const n1=date.getMonth()+1; const n2=date.getFullYear();
		document.getElementById("todayDate").innerHTML="Date of Travel: "+n+"/"+n1+"/"+n2;

}




///

window.onload=loadMethods;   // To load Contents when the page is opened

// To load Today's Requests while switching tabs

document.getElementById("pills-todaysrequest-tab").addEventListener('click',function()
{
	document.getElementById("Destination").selectedIndex=0;
    	document.getElementById("Source").selectedIndex=0;
    	document.getElementById("timeslot").selectedIndex=0;
    	document.getElementById("Droppoint").selectedIndex=0;
    	
    	var length1=document.getElementById('timeslot').options.length;
					for (var i = length1 - 1; i > 0; i--) {
					document.getElementById("timeslot").options[i] = null;
					}
					
					var length2=document.getElementById('Droppoint').options.length;
					for (var i = length2 - 1; i > 0; i--) {
					document.getElementById("Droppoint").options[i] = null;
					}
    	
    	$("#tableBody").empty();
    	skip=0;
    	filterApplied=false;
    //	scrolled=true;
	getTodaysBookings();
	var filter=document.getElementById("filterButton");
    	filter.setAttribute('src','images/Vector.svg');
	
});



///



function loadMethods()     // To load Today Bookings, source and Destination on Page Load
{
	
	
	getTodaysBookings();
	getSource();
	getDestination();
	
}


// TO remove the Filters when cancel button is clicked in the filters popup

var cancelbtn=document.getElementById("cancelButton");
    cancelbtn.addEventListener('click',function(){
    	document.getElementById("Destination").selectedIndex=0;
    	document.getElementById("Source").selectedIndex=0;
    	document.getElementById("timeslot").selectedIndex=0;
    	document.getElementById("Droppoint").selectedIndex=0;
    	
    	var length1=document.getElementById('timeslot').options.length;
					for (var i = length1 - 1; i > 0; i--) {
					document.getElementById("timeslot").options[i] = null;
					}
					
					var length2=document.getElementById('Droppoint').options.length;
					for (var i = length2 - 1; i > 0; i--) {
					document.getElementById("Droppoint").options[i] = null;
					}
    	
    	$("#tableBody").empty();
    	skip=0;filterApplied=false;
    	getTodaysBookings();
    	var filter=document.getElementById("filterButton");
    	filter.setAttribute('src','images/Vector.svg');
    	
    });
    
///

 
  


// Scroll Function 
document.getElementById("scrollTable").addEventListener('scroll',function() 
{
if ($("#scrollTable").scrollTop() + $("#scrollTable").height() > $(
"#tableBody").height()) {

skip = skip + limit;
if(filterApplied==false){
getTodaysBookings();
}else{
	//scrolled=true;
	
getfilter();
//scrolled=false;
filterApplied =true;


}
}

 });

/// 
 

// Load Today Bookings 

function getTodaysBookings(){
	
	xmlGetAllRequests.open("GET","http://localhost:8080/bookingRequest/bookings/todayBookings/"+skip+"/"+limit,true);
	xmlGetAllRequests.onreadystatechange=todayBookingResponse;
	xmlGetAllRequests.send(null);
		
}



function todayBookingResponse(){
	
	
	
	if(xmlGetAllRequests.readyState==4 && xmlGetAllRequests.status==200)
	
	{
		
		var responseRequest=JSON.parse(xmlGetAllRequests.responseText);
		
		
		for(var i=0;i<responseRequest.length;i++)
		{
			
			var trow=document.createElement('tr');
			trow.className="row-bg-style";
			
			var tdata=document.createElement('td');
			tdata.className="spacing";
			tdata.innerHTML=
			
			"<input class='form-check-input check' type='checkbox' value='' id='flex-check'>"+
                 " <label class='form-check-label' for='flexCheckChecked'></label>";
                 
            var tdata1=document.createElement('td');
			tdata1.className="spacing";  
			tdata1.innerHTML=responseRequest[i].employeeID; 
			
			var tdata2=document.createElement('td');
			tdata2.className="spacing";  
			tdata2.innerHTML=responseRequest[i].employeeName; 
			
			var tdata3=document.createElement('td');
			tdata3.className="spacing";  
			tdata3.innerHTML=responseRequest[i].source; 
			
			var tdata4=document.createElement('td');
			tdata4.className="spacing";  
			tdata4.innerHTML=responseRequest[i].destination; 
			
			var tdata5=document.createElement('td');
			tdata5.className="spacing";  
			tdata5.innerHTML=responseRequest[i].dropPoint; 
			
			var tdata6=document.createElement('td');
			tdata6.className="spacing";   
			
			var slot = responseRequest[i].bookingTime; 
			var slotSplitted = slot.split(":");
			slotHour = slotSplitted[0];
			
		if(slotHour<12)
		{
		if(slotHour==00)
		{
		tdata6.innerHTML = "12"+":"+slotSplitted[1]+" AM";
		}
		else
		{
		tdata6.innerHTML = slotHour+":"+slotSplitted[1]+" AM";
		}
		}
		else
		{
		slotHour = slotHour-12;
		if(slotHour < 10)
		{
		tdata6.innerHTML = "0"+slotHour+":"+slotSplitted[1]+" PM";
		}
		else{
		tdata6.innerHTML = slotHour+":"+slotSplitted[1]+" PM";
		}
		}

			
			
			var tdata7=document.createElement('td');
			tdata7.className="spacing";  
			
			var slot = responseRequest[i].timeSlot; 
			var slotSplitted = slot.split(":");
			slotHour = slotSplitted[0];
			
			
		if(slotHour<12)
		{
		if(slotHour==00)
		{
		tdata7.innerHTML = "12"+":"+slotSplitted[1]+" AM";
		}
		else
		{
		tdata7.innerHTML = slotHour+":"+slotSplitted[1]+" AM";
		}
		}
		else
		{
		slotHour = slotHour-12;
		if(slotHour < 10)
		{
		tdata7.innerHTML = "0"+slotHour+":"+slotSplitted[1]+" PM";
		}
		else{
		tdata7.innerHTML = slotHour+":"+slotSplitted[1]+" PM";
		}
		}

			
			
			
			trow.appendChild(tdata);
			trow.appendChild(tdata1);
			trow.appendChild(tdata2);
			trow.appendChild(tdata3);
			trow.appendChild(tdata4);
			trow.appendChild(tdata5);
			trow.appendChild(tdata6);
			trow.appendChild(tdata7);
			
			document.getElementById("tableBody").appendChild(trow);
			
			
			
		}
		
		var countSpan=document.getElementById("counter");
			countSpan.innerHTML=$('#tableBody tr').length+" out of "+count;
			
	}
}


///


// To load Source details for filters


function getSource()
{
	
	xmlGetAllSources.open("GET","http://localhost:8080/bookingRequest/sources",true);
	xmlGetAllSources.onreadystatechange=fetchSourceList;
	xmlGetAllSources.send(null);
		
	
}

function fetchSourceList()
{
	
	if(xmlGetAllSources.readyState==4 && xmlGetAllSources.status==200)
	{
		// to clear the list of sources
		var length=document.getElementById("Source").options.length;
		for (i = length - 1; i > 0; i--) {
					document.getElementById("Source").options[i] = null;
				}
		
		
		var listOfSources=JSON.parse(xmlGetAllSources.responseText);
		
		// to append the list of sources
		for(var i=0;i<listOfSources.length;i++)
		{
		
			var opt = document.createElement("option");
					opt.innerHTML = listOfSources[i].source;
					document.getElementById("Source").appendChild(opt);
		}
		
		
	}
	
}

///


// To load Destination Details for filters

function getDestination()
{
	xmlGetAllDestinations.open("GET","http://localhost:8080/bookingRequest/destinations",true);
	xmlGetAllDestinations.onreadystatechange=fetchDestinationList;
	xmlGetAllDestinations.send(null);
	
}

function fetchDestinationList()
{
	if(xmlGetAllDestinations.readyState==4 && xmlGetAllDestinations.status==200)
	{
		var length=document.getElementById("Destination").options.length;
		for (i = length - 1; i > 0; i--) {
					document.getElementById("Destination").options[i] = null;
				}
				
				var listOfDestinations=JSON.parse(xmlGetAllDestinations.responseText);
				
				for(var i=0;i<listOfDestinations.length;i++)
				{
					var opt=document.createElement("option");
					opt.innerHTML=listOfDestinations[i].destination;
					document.getElementById("Destination").appendChild(opt);
				}
	}
	
}



document.getElementById("Destination").addEventListener('change',function()
{
	
				
				var selectedDestination = document.querySelector('#Destination').value;
				
				
				
				if(xmlGetAllDestinations.readyState==4 && xmlGetAllDestinations.status==200)
				
				{
					
					var length1=document.getElementById('timeslot').options.length;
					for (var i = length1 - 1; i > 0; i--) {
					document.getElementById("timeslot").options[i] = null;
					}
					
					var length2=document.getElementById('Droppoint').options.length;
					for (var i = length2 - 1; i > 0; i--) {
					document.getElementById("Droppoint").options[i] = null;
					}
					
					var listOfDestinations=JSON.parse(xmlGetAllDestinations.responseText);
					
					//alert(listOfDestinations[0].timeSlots[0].timeSlot)
					
				for(var i=0;i<listOfDestinations.length;i++)
				{
					if(listOfDestinations[i].destination==selectedDestination)
					{
						
						for(var j=0;j<listOfDestinations[i].timeSlots.length;j++)
						{
							//alert(listOfDestinations[i].timeSlots.length);
							var opt=document.createElement("option");
							//opt.innerHTML=listOfDestinations[i].timeSlots[j].timeSlot;
							
							var slot = listOfDestinations[i].timeSlots[j].timeSlot;
			var slotSplitted = slot.split(":");
			slotHour = slotSplitted[0];
			
		if(slotHour<12)
		{
		if(slotHour==00)
		{
		opt.innerHTML = "12"+":"+slotSplitted[1]+" AM";
		}
		else
		{
		opt.innerHTML = slotHour+":"+slotSplitted[1]+" AM";
		}
		}
		else
		{
		slotHour = slotHour-12;
		if(slotHour < 10)
		{
		opt.innerHTML = "0"+slotHour+":"+slotSplitted[1]+" PM";
		}
		else{
		opt.innerHTML = slotHour+":"+slotSplitted[1]+" PM";
		}
		}	
												
							//alert(listOfDestinations[i].timeSlots[1].timeSlot);
							document.getElementById("timeslot").appendChild(opt);
						}
						
						for(var j=0;j<listOfDestinations[i].dropPoints.length;j++)
						{
							//alert(listOfDestinations[i].timeSlots.length);
							var opt=document.createElement("option");
							opt.innerHTML=listOfDestinations[i].dropPoints[j].dropPoint;
							//alert(listOfDestinations[i].timeSlots[1].timeSlot);
							document.getElementById("Droppoint").appendChild(opt);
						}
					}
				}
				}
	
});

///


// To apply filters

document.getElementById("ApplyButton").addEventListener('click',function()
{
	$("#tableBody").empty();skip=0;filterApplied=true;
	getfilter();
	changeFilter();
	
});

function getfilter()
{
	
		
		//skip=0;
		//filterApplied=true;
		//$("#tableBody").empty();
		
	
	
	
	
	
	
	var dest=document.querySelector('#Destination').value;

	if(dest=="Select Destination")
	{
		dest=0;
	}
	
	var sour=document.querySelector('#Source').value;
	
	if(sour=="Select Source")
	{
		sour=0;
	}
	
	
	var drop=document.querySelector('#Droppoint').value;
	
	if(drop=="Select Drop Point")
	{
		drop=0;
	}
	
	var time=document.querySelector('#timeslot').value;
	
	if(time=="Select Time Slot")
	{
		time=0;
	}
	else
	{
//		var splittedTimeSlot = time.split(":");
//if(splittedTimeSlot[1].includes("PM")){
//	minutes = splittedTimeSlot[1].split(" ");
////alert(Number(splittedTimeSlot[1]));
//if(Number(splittedTimeSlot[0])+12==24){
//time= "12"+":"+Number(minutes[0])+":"+"00";
//}
//else{
//splittedTimeSlotHour = Number(splittedTimeSlot[0])+12;
//time= splittedTimeSlotHour +":"+Number(minutes[0])+":"+"00";
//}
//}
//else{
//	minutes = splittedTimeSlot[1].split(" ");
//	if(Number(splittedTimeSlot[0])==12)
//	{
//		time= "00"+":"+Number(minutes[0])+":"+"00";
//	}
//if(Number(splittedTimeSlot[0])<10){
//time= "0"+Number(splittedTimeSlot[0]) +":"+Number(minutes[0])+":"+"00";
//}
//else{
//time= Number(splittedTimeSlot[0]) +":"+Number(minutes[0])+":"+"00";
//}
//}

 const [time1, modifier] = time.split(' ');
   let [hours, minutes] = time1.split(':');
   if (hours === '12') {
      hours = '00';
   }
   if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
   }

time=hours+":"+minutes+":"+"00";


	}
	
	
	xmlGetFilteredRequests.open("GET","http://localhost:8080/bookingRequest/filter/"+sour+"/"+dest+"/"+drop+"/"+time+"/"+skip+"/"+limit,true);
	xmlGetFilteredRequests.onreadystatechange=getFilters
	xmlGetFilteredRequests.send();
}


function getFilters()
{
	
	
	
	if(xmlGetFilteredRequests.readyState==4 && xmlGetFilteredRequests.status==200)
	{
		
			
		
			
		
		
		var filteredRequest=JSON.parse(xmlGetFilteredRequests.responseText);
	//	alert(filteredRequest.length);
		for(var i=0;i<filteredRequest.length;i++)
		{
			var trow=document.createElement('tr');
			trow.className="row-bg-style";
			
			var tdata=document.createElement('td');
			tdata.className="spacing";
			tdata.innerHTML=
			
			"<input class='form-check-input check' type='checkbox' value='' id='flex-check'>"+
                 " <label class='form-check-label' for='flexCheckChecked'></label>";
                 
            var tdata1=document.createElement('td');
			tdata1.className="spacing";  
			tdata1.innerHTML=filteredRequest[i].employeeID; 
			
			var tdata2=document.createElement('td');
			tdata2.className="spacing";  
			tdata2.innerHTML=filteredRequest[i].employeeName; 
			
			var tdata3=document.createElement('td');
			tdata3.className="spacing";  
			tdata3.innerHTML=filteredRequest[i].source; 
			
			var tdata4=document.createElement('td');
			tdata4.className="spacing";  
			tdata4.innerHTML=filteredRequest[i].destination; 
			
			var tdata5=document.createElement('td');
			tdata5.className="spacing";  
			tdata5.innerHTML=filteredRequest[i].dropPoint; 
			
			var tdata6=document.createElement('td');
			tdata6.className="spacing";   
			
			var slot = filteredRequest[i].bookingTime; 
			var slotSplitted = slot.split(":");
			slotHour = slotSplitted[0];
			
		if(slotHour<12)
		{
		if(slotHour==00)
		{
		tdata6.innerHTML = "12"+":"+slotSplitted[1]+" AM";
		}
		else
		{
		tdata6.innerHTML = slotHour+":"+slotSplitted[1]+" AM";
		}
		}
		else
		{
		slotHour = slotHour-12;
		if(slotHour < 10)
		{
		tdata6.innerHTML = "0"+slotHour+":"+slotSplitted[1]+" PM";
		}
		else{
		tdata6.innerHTML = slotHour+":"+slotSplitted[1]+" PM";
		}
		}

			
			
			var tdata7=document.createElement('td');
			tdata7.className="spacing";  
			
			var slot = filteredRequest[i].timeSlot; 
			var slotSplitted = slot.split(":");
			slotHour = slotSplitted[0];
			
			
		if(slotHour<12)
		{
		if(slotHour==00)
		{
		tdata7.innerHTML = "12"+":"+slotSplitted[1]+" AM";
		}
		else
		{
		tdata7.innerHTML = slotHour+":"+slotSplitted[1]+" AM";
		}
		}
		else
		{
		slotHour = slotHour-12;
		if(slotHour < 10)
		{
		tdata7.innerHTML = "0"+slotHour+":"+slotSplitted[1]+" PM";
		}
		else{
		tdata7.innerHTML = slotHour+":"+slotSplitted[1]+" PM";
		}
		}
 
			
			
			trow.appendChild(tdata);
			trow.appendChild(tdata1);
			trow.appendChild(tdata2);
			trow.appendChild(tdata3);
			trow.appendChild(tdata4);
			trow.appendChild(tdata5);
			trow.appendChild(tdata6);
			trow.appendChild(tdata7);
			
			document.getElementById("tableBody").appendChild(trow);
			
			
			
			
		}
		var countSpan=document.getElementById("counter");
			countSpan.innerHTML=$('#tableBody tr').length+" out of "+count;

	}
	
}

///

function changeFilter()
{

//alert("2");
var filter=document.getElementById("filterButton");
if(document.getElementById("Destination").selectedIndex!=0 || document.getElementById("Source").selectedIndex!=0)
{
	//alert("1");
	filter.setAttribute('src','images/VectorFil1.svg');
	
}
else
{
	filter.setAttribute('src','images/Vector.svg');
}


}



