//-----------------------------------------------------------------------------------------------------------------//

let current_url = window.location.href;
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let xmlDoc = this.responseXML;
        let obj = QueryXML(xmlDoc);
        
        //console.log(obj);
    }
};
xhttp.open("GET", current_url, true);
xhttp.send();

//-----------------------------------------------------------------------------------------------------------------//

function DefineObject(tag,id)
{
    let obj = {};
    obj.id = id;
    obj.class = tag.tagName;
    obj.value = (typeof  tag.innerHTML == 'undefined' || tag.childNodes.length > 0) ? null : tag.innerHTML;
    //console.log(tags[0].getAttributeNames());
    if(tag.getAttributeNames().length > 0)
    {
        let att = tag.getAttributeNames();
        for(i=0;i<=att.length;i++){
            if(typeof att[i] !== 'undefined')
            obj[att[i]] = tag.getAttribute(att[i]);

        };
    }
    return obj;
}

//-----------------------------------------------------------------------------------------------------------------//

function QueryXML(xmlDoc) {
    
    
    let tags = xmlDoc.getElementsByTagName('*');
    let arr_tags = Array.from(tags);
    
    let first_obj = {};
    // first tag name:

    // Creating the first parent object:
    let parent_obj = {};

    for(i=1;i<=arr_tags.length;i++)
    {
        // Check if this tag is the first:
        let has_parent = arr_tags[i].parentElement !== 'undefined';
        if(has_parent){ // Not the first tag --> a general tag

            // Creating a genetal tag object:
            let next_obj = {};
            let has_attributes = arr_tags[i].getAttributeNames().length > 0;
            
            // Checks if this general tag contains attributes:
            if(has_attributes){

                // Adding all attributes into a general tag object:
                arr_tags[i].getAttributeNames().forEach(element => {

                    next_obj[element] = arr_tags[i].getAttributeNames(element);

                });
            }

            // Check if this general tag has any sub tag:
            let is_parent = arr_tags[i].chldren !== 'undefined';
            if(is_parent){

                
                parent_obj[next_obj] = null;
                parent_obj = next_obj;

            }else{

                // Checks if a general tag has text content:
                let has_text = arr_tags[i].textContent  !==  null;
                if(has_text){ // getting the general tag text content:

                    next_obj[arr_tags[i].tagName] = first_tag[arr_tags[i]].textContent;


                }else{ // The general tag has no text content
                    let parent_obj = {};
                    first_tag[arr_tags[i].tagName] = null;
                }


            }

    
        }else{ // This tag is the first tag  object of the document:
            
            let first_obj = {};

            // Checks if the first tag contains attributes:
            let has_attributes = arr_tags[i].getAttributeNames().length > 0;
            if(has_attributes){

                // Add all attributes into the first tag object:
                arr_tags[i].getAttributeNames().forEach(element => {

                    first_obj[element] = arr_tags[i].getAttributeNames(element);

                });

            }

            // Check if the first tag has any sub tag:
            let is_parent = arr_tags[i].chldren.length > 0;
            if(is_parent){


                // Adding parent object into the first object:
                first_tag[parent_obj] = null;

            }else{

                // Checks if the first tag has text content:
                let has_text = arr_tags[i].textContent  !==  null;
                if(has_text){ // The first tag is the only tag and has text content

                    first_tag[arr_tags[i].tagName] = first_tag[arr_tags[i]].textContent;


                }else{ // The first tag is the only tag and has no text content
                    let parent_obj = {};
                    first_tag[arr_tags[i].tagName] = null;
                }
            }
            
            
        }
       
    }
    console.log(first_tag);
}
