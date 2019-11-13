let xml_str = 
"	<s:Envelope xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'>	"	+
"	<s:Body>	"	+
"	<ServiceRequest xmlns='http://tempuri.org/'>	"	+
"	<rqst xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>	"	+
"	<Credentials xmlns=''>	"	+
"	<Password>trav2014</Password>	"	+
"	<UserName>travo_qa@blackbook.world</UserName>	"	+
"	</Credentials>	"	+
"	<Request i:type='HotelsServiceSearchRequest' xmlns=''>	"	+
"	<ClientIP i:nil='true'/>	"	+
"	<DesiredResultCurrency>USD</DesiredResultCurrency>	"	+
"	<Residency>US</Residency>	"	+
"	<TimeoutSeconds>0</TimeoutSeconds>	"	+
"	<CheckIn>2020-05-28T00:00:00Z</CheckIn>	"	+
"	<CheckOut>2020-05-29T00:00:00Z</CheckOut>	"	+
"	<ContractIds xmlns:a='http://schemas.microsoft.com/2003/10/Serialization/Arrays'/>	"	+
"	<DetailLevel>Meta</DetailLevel>	"	+
"	<ExcludeHotelDetails>false</ExcludeHotelDetails>	"	+
"	<GeoLocationInfo i:nil='true'/>	"	+
"	<HotelIds xmlns:a='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>	"	+
"	<a:int>4179205</a:int>	"	+
"	</HotelIds>	"	+
"	<HotelLocation i:nil='true'/>	"	+
"	<IncludeCityTax>false</IncludeCityTax>	"	+
"	<Nights>0</Nights>	"	+
"	<RadiusInMeters i:nil='true'/>	"	+
"	<Rooms>	"	+
"	<HotelRoomRequest>	"	+
"	<AdultsCount>1</AdultsCount>	"	+
"	<KidsAges xmlns:a='http://schemas.microsoft.com/2003/10/Serialization/Arrays'/>	"	+
"	</HotelRoomRequest>	"	+
"	</Rooms>	"	+
"	<SupplierIds xmlns:a='http://schemas.microsoft.com/2003/10/Serialization/Arrays'/>	"	+
"	<SupplierLocationIds xmlns:a='http://schemas.microsoft.com/2003/10/Serialization/Arrays'/>	"	+
"	</Request>	"	+
"	<RequestType xmlns=''>Search</RequestType>	"	+
"	<TypeOfService xmlns=''>Hotels</TypeOfService>	"	+
"	</rqst>	"	+
"	</ServiceRequest>	"	+
"	</s:Body>	"	+
"	</s:Envelope>	";

parser = new DOMParser();
xmlDoc = parser.parseFromString(xml_str,"text/xml");

// Initiating parameters:
let req_obj = {};
let password_str = '1234';
let username_str = 'my_user';
let desired_result_currency_str = 'Blah';
let residency_str = 'my_resident';
let timeout_seconds_num = 0;
let check_in = new Date();  
let check_out = new Date(); 
check_out = AddDays(check_out, 1);
let detail_level = 'my_detail_level';
let contract_ids = [2301,4564,9845,3456];
let exclude_hotel_details_str = 'true/false';
let lat_long = [40.7127753,-74.0059728];
let i = 0;

// Loading Object:
req_obj.Password = password_str;
req_obj.UserName = username_str
req_obj.DesiredResultCurrency = desired_result_currency_str; 
req_obj.Residency = residency_str;
req_obj.TimeoutSeconds = timeout_seconds_num;              
req_obj.CheckIn = FormatDate(check_in);
req_obj.CheckOut = FormatDate(check_out);
req_obj.DetailLevel = detail_level;
req_obj.ContractIds = contract_ids;
req_obj.ExcludeHotelDetails = exclude_hotel_details_str;
req_obj.LatLong = 
// Modifying XML:
xmlDoc.getElementsByTagName("Password")[0].childNodes[0].nodeValue = req_obj.Password;
xmlDoc.getElementsByTagName("UserName")[0].childNodes[0].nodeValue = req_obj.UserName;
xmlDoc.getElementsByTagName("DesiredResultCurrency")[0].childNodes[0].nodeValue = req_obj.DesiredResultCurrency;
xmlDoc.getElementsByTagName("Residency")[0].childNodes[0].nodeValue = req_obj.Residency;
xmlDoc.getElementsByTagName("TimeoutSeconds")[0].childNodes[0].nodeValue = req_obj.TimeoutSeconds;
xmlDoc.getElementsByTagName("CheckIn")[0].childNodes[0].nodeValue = req_obj.CheckIn;
xmlDoc.getElementsByTagName("CheckOut")[0].childNodes[0].nodeValue = req_obj.CheckOut;
SetContractId(contract_ids);
xmlDoc.getElementsByTagName("DetailLevel")[0].childNodes[0].nodeValue = req_obj.DetailLevel;
xmlDoc.getElementsByTagName("ExcludeHotelDetails")[0].childNodes[0].nodeValue = req_obj.ExcludeHotelDetails;



console.log(xmlDoc);

function FormatDate(new_date){
    let format_date = 
        new_date.getFullYear() + '-' + 
        new_date.getMonth().toString().padStart(2, '0') + '-' +
        new_date.getDay(2).toString().padStart(2, '0')  + 'T' +
        new_date.getHours(2).toString().padStart(2, '0') + ':' +
        new_date.getMinutes(2).toString().padStart(2, '0') + ':' +
        new_date.getSeconds(2).toString().padStart(2, '0') + 'Z';
    return format_date;
}

function AddDays(new_date, days_addition){
     
    return new Date(new_date.setDate(check_out.getDate() + days_addition));
}

function SetContractId(contract_ids){

    if(contract_ids.length > 0){
        // Delete old node:
        let old_node = xmlDoc.getElementsByTagName("ContractIds")[0];
        let parent_node = old_node.parentNode;
        parent_node.removeChild(old_node);
        // Create new node:
        let new_tag = xmlDoc.createElement("ContractIds");
        new_tag.setAttribute('xmlns:a','http://schemas.microsoft.com/2003/10/Serialization/Arrays');
        xmlDoc.getElementsByTagName("Request")[0].appendChild(new_tag);
        // Insert in the specified place:
        parent_node.insertBefore(new_tag, parent_node.children[6]);
        // Add contracts from array:
        contract_ids.forEach(element => {    
            let new_contract = xmlDoc.createElement("a:int");
            let contract_id = xmlDoc.getElementsByTagName("ContractIds");
            contract_id[0].appendChild(new_contract); 
            contract_id[0].getElementsByTagName("a:int")[i].textContent = element;
            i++;
        });
    }
}
