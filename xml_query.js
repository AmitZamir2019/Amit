//-----------------------------------------------------------------------------------------------------------------//
let obj;
let current_url = window.location.href;
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let xmlDoc = this.responseXML;
        obj = QueryXML(xmlDoc);
        
        console.log(obj);
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

function IsNotUndefined(object)
{
    let ans = typeof object === 'undefined';
    return !ans;
}

//-----------------------------------------------------------------------------------------------------------------//

function IsNotNull(object)
{
    let ans =  object === null;
    return !ans;
}

function QueryXML(xmlDoc) {
    
    let tags = xmlDoc.getElementsByTagName('*');
    let arr_tags = Array.from(tags);

        
    let first_obj = {}; // contains the first tag of the document.
    let parent_obj = {}; // contains a general tag with sub tags.
    let child_obj = {}; // contains a general tag with no sub tags.
    let store_obj = {}; // contains all tags of the document eventually.
    let id = 0;
    for(i=0; i < arr_tags.length; i++)
    {
        // Check if this tag is the first:
        let has_parent = IsNotNull(arr_tags[i].parentElement);
        
        if(has_parent){ // Not the first tag --> a general tag

            
            let parent_node = arr_tags[i].parentElement;
            let parent_node_name = parent_node.tagName;
            //console.log(parent_node);
            let brothers = Object.keys(parent_node);
            let is_unique = brothers.indexOf(arr_tags[i].tagName) < 0;
            
            

            if(is_unique && id > 0){ // It is the same record:
                
                store_obj[id][parent_node_name] = parent_obj;
                parent_obj = {};
                parent_obj['PARENT_TAG'] = arr_tags[i].tagName;

            }else{ // Starting a new record:

                id++;
                store_obj[id] = parent_obj;
                parent_obj = {};
                parent_obj['PARENT_TAG'] = arr_tags[i].tagName;
            }

            let is_parent = arr_tags[i].children.length > 0;
            if(is_parent){
                                
                for(element = 0; element <= arr_tags[i].children.length; element++)
                {
                    if( IsNotUndefined(parent_obj[arr_tags[i].children[element]]))
                    {
                        parent_obj[arr_tags[i].children[element]] = null;
                    }
                }

                let has_attributes = arr_tags[i].getAttributeNames().length > 0;
                if(has_attributes){
                    
                    // Adding all attributes into a general tag object:
                    arr_tags[i].getAttributeNames().forEach(element => {
                        if( IsNotUndefined(element))
                        {
                            parent_obj[element] = arr_tags[i].getAttribute(element);
    
                        }
                        
                    });
                }
            
            }else{
                child_obj = {};

                let has_attributes = arr_tags[i].getAttributeNames().length > 0;    
                // Checks if this general tag contains attributes:
                if(has_attributes){
                    
                    // Adding all attributes into a general tag object:
                    arr_tags[i].getAttributeNames().forEach(element => {
                        if( IsNotUndefined(element))
                        {
                        
                            child_obj[element] = arr_tags[i].getAttribute(element);
                        }
                    });
                }

                // Checks if a general tag has text content:
                let has_text = arr_tags[i].textContent  !==  null;
                let has_brothers = arr_tags[i].parent_obj.children;
                console.log(has_brothers);
                if(has_text){ // getting the general tag text content:

                    child_obj.value = arr_tags[i].textContent;

                }else{ // The general tag has no text content
                    child_obj.value = null;
                }
                parent_obj[arr_tags[i].tagName] = child_obj;
            }
                
        }
    } // end for
    let root_obj = {};
    root_obj[arr_tags[0].tagName] = store_obj;
    let obj = root_obj[arr_tags[0].tagName][1];
    
    
    let has_attributes = arr_tags[0].getAttributeNames().length > 0;    
    // Checks if this general tag contains attributes:
    if(has_attributes){

        
        // Adding all attributes into a general tag object:
        arr_tags[0].getAttributeNames().forEach(element => {
            if( IsNotUndefined(element))
            {

                first_obj[element] = arr_tags[0].getAttributeNames(element);
            }
        });
    }

    // Checks if a general tag has text content:
    let has_text = arr_tags[0].textContent  !==  null;
    if(has_text){ // getting the general tag text content:

        first_obj.value = arr_tags[0].textContent;

    }else{ // The general tag has no text content
        first_obj.value = null;
    }
    parent_obj[arr_tags[0].tagName] = child_obj;
   
   let sub_objects = root_obj[arr_tags[0].tagName];
   let new_obj = {};
   let new_id = 0;
    for(key in sub_objects)
    {
        if(Object.keys(sub_objects[key]).length == 0){
            delete sub_objects[key];
        
        }else{
            new_id++;
            new_obj[new_id] = sub_objects[key];

        }
    }
    
        
    root_obj[arr_tags[0].tagName] = new_obj;
    return root_obj;
}

//-----------------------------------------------------------------------------------------------------------------//
// need to add twin brother scenario 
