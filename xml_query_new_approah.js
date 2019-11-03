
//-----------------------------------------------------------------------------------------------------------------//
let obj;
let current_url = window.location.href;
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let xmlDoc = this.responseXML;
        let path_list = GetFullPathArray(xmlDoc);
        let path_att_list = GetFullPathAttributesArray(xmlDoc);
        GetField(path_list,xmlDoc);
        //console.log(path_att_list);
        //console.log(path_list);
    }
};
xhttp.open("GET", current_url, true);
xhttp.send();

//-----------------------------------------------------------------------------------------------------------------//

function GetFullPathTag(tag){
    // Check if this tag is the first:
    let has_parent = IsNotNull(tag.parentElement);
    let path = tag.tagName;
    let new_obj;
    // path[0] = tag.tagName;
    while(has_parent){
        path = tag.parentElement.tagName + ">" + path; 
        tag = tag.parentElement;
        has_parent = IsNotNull(tag.parentElement);
        
    }
    path[tag.tagName] = new_obj;
    return path;
}
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

function IsNotUndefined(object){

    let ans = typeof object === 'undefined';
    return !ans;
}

//-----------------------------------------------------------------------------------------------------------------//

function IsNotNull(object){

    let ans =  object === null;
    return !ans;
}

function GetFullPathArray(xmlDoc){
    
    let tags = xmlDoc.getElementsByTagName('*');
    let arr_tags = Array.from(tags);

    let paths = [];
    let paths_with_attributes = [];
    for(i=0; i < arr_tags.length; i++){

        paths.push(GetFullPathTag(arr_tags[i]));
        
    } // end for
   
    let unique_paths = paths.filter((val,ind,arr) => arr.indexOf(val) === ind);
    return unique_paths;
}

//-----------------------------------------------------------------------------------------------------------------//


function GetFullPathAttributesArray(xmlDoc) {
    
    let tags = xmlDoc.getElementsByTagName('*');
    let arr_tags = Array.from(tags);


    let paths = [];
    let paths_with_attributes = [];
    for(i=0; i < arr_tags.length; i++)
    {
        paths.push(GetFullPathTag(arr_tags[i]));
     
                let has_attributes = arr_tags[i].getAttributeNames().length > 0;
        if(has_attributes){
            
            // Adding all attributes into a general tag object:
            arr_tags[i].getAttributeNames().forEach(element => {
                if( IsNotUndefined(element))
                {
                    let new_att = arr_tags[i].getAttribute(element);
                    let new_path = GetFullPathTag(arr_tags[i]);
                    paths_with_attributes.push(new_path + "[" + element +"]");
                
                }
                
            });
        } 
        
    } // end for
   
     let unique_paths_with_attributes = paths_with_attributes.filter((val,ind,arr) => arr.indexOf(val) === ind); 
     return unique_paths_with_attributes;
}



//-----------------------------------------------------------------------------------------------------------------//

function GetField(path,xmlDoc){

    
    let tags = xmlDoc.querySelectorAll(path[6],path[7]);
    let arr_tags = Array.from(tags).map(x=>x.innerHTML);
    
    console.log(arr_tags);
    
}

//-----------------------------------------------------------------------------------------------------------------//
