
//#region Main Method

let current_url = window.location.href;
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       let xmlDoc = this.responseXML; 
   // let xml_miss_tags = 
   // "<customers><customer><id gender='male'>1</id><first_name>Amit</first_name><last_name>Zamir</last_name></customer><customer><first_name>Ravid</first_name><last_name>Od</last_name></customer><customer><id gender='female'>3</id><last_name>Zam</last_name></customer><customer><id>4</id><first_name>Arti</first_name></customer></customers>";
    //let parser = new DOMParser();
    //let xmlDoc = parser.parseFromString(xml_miss_tags,"text/xml");  
    xmlDoc = RemoveWhiteSpaces(xmlDoc);
    let path_list = GetFullPathArray(xmlDoc);
    let path_att_list = GetFullPathAttributesArray(xmlDoc);
    let tbl_obj = {};

    let field_name = "";
    let field_att_name = "";
    
    if(IsNotUndefined(path_list)){
        //console.log(path_list);
        path_list.forEach(element => {
            //console.log(element);
            if(element.includes(':')){
                element = element.split(':')[0]; 
                let last_tag = element.split('>')[element.split('>').length - 1];
                let parent_tag  = element.substring(0,element.length - last_tag.length - 1);
                element = parent_tag;

            }else{
                
                field_name = xmlDoc.querySelector(element).tagName;
                tbl_obj[field_name] = GetFieldValues(element,xmlDoc);
                //console.log(field_name);
            }
            
            //console.log(field_name);
            
        });
    }    
    //console.log(tbl_obj);
    if(IsNotUndefined(path_att_list)){
        //console.log(path_att_list);
        path_att_list.forEach(element => {

            let tag_att = element.split("[")[1].split("]")[0];
            let tag_path = element.split("[")[0];
            //console.log(tag_path);
            let tag_name = xmlDoc.querySelector(tag_path).tagName;
            field_name = tag_name + '-' + tag_att;
            tbl_obj[field_name] = GetFieldAttributeValues(element,xmlDoc);
        });
    }


    let path_sub_array_list =  GetFullPathSubArray(xmlDoc);
    
    path_sub_array_list.forEach(element => {

        
        let tag_path = element.split("-Array")[0];
        //console.log(tag_path);
        let tag_name = xmlDoc.querySelector(tag_path).tagName;
        field_name = tag_name +  "-Array";
        tbl_obj[field_name] = Array.from(xmlDoc.querySelector(tag_path).children).map(x => x.innerHTML);
    });

    //console.log(tbl_obj);
    CleanObject(tbl_obj);
    console.log(tbl_obj);
     console.log("done!");
    }
};
xhttp.open("GET", current_url, true);
xhttp.send();

//#endregion

//#region  XML Extract Functions

// Gets the hirarchy of sepcified tag: 
function GetFullPathTag(tag){
    // Check if this tag is the first:
    let has_parent = IsNotUndefined(tag.parentElement);

    let path;
    let not_parent = tag.children.length == 0;
    if(tag.children.length == 0){
        
        path = tag.tagName;

        while(has_parent){
            path = tag.parentElement.tagName + ">" + path; 
            tag = tag.parentElement;
            has_parent = IsNotNull(tag.parentElement);
            
        }
        //console.log(path);
        return path;
 
    }   
    
}

function GetFullPathTagIncludeParents(tag){
    // Check if this tag is the first:
    let has_parent = IsNotNull(tag.parentElement);

    let path;

        
        path = tag.tagName;

        while(has_parent){
            path = tag.parentElement.tagName + ">" + path; 
            tag = tag.parentElement;
            has_parent = IsNotNull(tag.parentElement);
            
        }
        //console.log(path);
        return path;
 
    
}

// Gets the hirarchy of sepcified tag with sub Array: 
function GetFullPathTagArray(tag){
   
    // Check if this tag is the first:
    let has_parent = IsNotNull(tag.parentElement);


    
    let path  = tag.tagName;
    let is_parent = tag.children.length > 0; 
    if(is_parent){
        //console.log(tag.getAttribute(0));
        if(IsNotNull(tag.getAttribute('xmlns:a'))){
            
            let parent_has_array = tag.getAttribute('xmlns:a').includes('Arrays');
            let has_twins = Array.from(tag.children).map(x => x.tagName).length - 
                Array.from(tag.children).map(x => x.tagName).filter((val,ind,arr) => arr.indexOf(val) === ind).length > 0; 
            if(parent_has_array || has_twins){
    
                while(has_parent){
                    path = tag.parentElement.tagName + ">" + path; 
                    tag = tag.parentElement;
                    has_parent = IsNotNull(tag.parentElement);
                    
                }
                path = path + '-Array';
            
            return path;
        }
        
 
    }      
}

}



// Get all unique hierarchies of all tags in a XML document 
function GetFullPathSubArray(xmlDoc){
    
    let tags = xmlDoc.getElementsByTagName('*');
    let arr_tags = Array.from(tags);

    let paths = [];
    let paths_with_attributes = [];
    for(i=0; i < arr_tags.length; i++){

        let path = GetFullPathTagArray(arr_tags[i]);
        if(IsNotNull(arr_tags[i].parentElement) && IsNotUndefined(path)){

            paths.push(path);
        }
        
        
    } // end for
   
    let unique_paths = paths.filter((val,ind,arr) => arr.indexOf(val) === ind);
    return unique_paths;
}


// Get all unique hierarchies of all tags in a XML document 
function GetFullPathArray(xmlDoc){
    
    let tags = xmlDoc.getElementsByTagName('*');
    let arr_tags = Array.from(tags);

    let paths = [];
    let paths_with_attributes = [];
    for(i=0; i < arr_tags.length; i++){

        let path = GetFullPathTag(arr_tags[i]);
        if(IsNotNull(arr_tags[i].parentElement) && IsNotUndefined(path)){
            let child_value = arr_tags[i].tagName;
            let child_index = Array.from(arr_tags[i].parentElement.children).indexOf(child_value);
            paths.push(path);
        }
        
        
    } // end for
   
    let unique_paths = paths.filter((val,ind,arr) => arr.indexOf(val) === ind);
    return unique_paths;
}


// Get all values of specified tag: 
function GetFieldValues(path,xmlDoc){
    
    let field_values = [];
    let field = path;
    let tags = xmlDoc.getElementsByTagName('*');

    let arr_tags = Array.from(tags);
    //console.log(path);
    let tag_name = xmlDoc.querySelector(path).tagName;
    let has_no_children = xmlDoc.querySelector(path).children.length == 0;

    let parent_tag_name = xmlDoc.querySelector(path).parentElement.tagName;
    
    for(i = 0; i <= arr_tags.length; i++){
        
        if(IsNotUndefined(arr_tags[i])){
            //console.log(arr_tags[i].tagName + "="  + parent_tag_name + "=" + has_no_children);
            if(arr_tags[i].tagName == parent_tag_name && has_no_children){
                
                let children = Array.from(arr_tags[i].children).map(x => x.tagName);
                if(children.indexOf(tag_name) >= 0){
                    field_values.push(tags[i].getElementsByTagName(tag_name)[0].innerHTML);
                    //console.log(tags[i].getElementsByTagName(tag_name)[0].tagName + "=" + field_values);
                }else{
                    
                    field_values.push(null);
                } 
            }
        }
        
    }
       
    return field_values;
}


// Get all unique hierarchies and all attributes of all tags in a XML document 
function GetFullPathAttributesArray(xmlDoc) {
    
    let tags = xmlDoc.getElementsByTagName('*');
    let arr_tags = Array.from(tags);

    let paths_with_attributes = [];
    for(i=0; i < arr_tags.length; i++)
    {

        let has_attributes = arr_tags[i].getAttributeNames().length > 0;
        if(has_attributes){
            
            // Adding all attributes into a general tag object:
            arr_tags[i].getAttributeNames().forEach(element => {
                if(IsNotUndefined(element))
                {
                    let new_att = arr_tags[i].getAttribute(element);
                    let new_path = GetFullPathTagIncludeParents(arr_tags[i]);
                    paths_with_attributes.push(new_path + "[" + element +"]");
                    
                }
                
            });
        } 
        
    } // end for
   
     paths_with_attributes = paths_with_attributes.filter(x => IsNotUndefined(x)).filter((val,ind,arr) => arr.indexOf(val) === ind);

     return paths_with_attributes;
}

// Get all values of specified tag with specified attribute:
function GetFieldAttributeValues(path,xmlDoc){
    
    let field_values = [];
    let field = path.split("[")[0];
    let tags = xmlDoc.getElementsByTagName('*');
    let arr_tags = Array.from(tags);
    let tag_path = path.split("[")[0];
    let tag_att = path.split("[")[1].split("]")[0];
    let tag_name = xmlDoc.querySelector(field).tagName;
    let parent_tag_name;

    if(IsNotNull(xmlDoc.querySelector(field).parentElement)){
        parent_tag_name =  xmlDoc.querySelector(field).parentElement.tagName;

    }else{
        parent_tag_name =  xmlDoc.querySelector(field).tagName;

    }

   

    for(i = 1; i <= arr_tags.length; i++){
        
        // tag in not undefined:
        if(IsNotUndefined(arr_tags[i])){

            // specified parent tag:
            if(arr_tags[i].tagName == parent_tag_name){

                let children = Array.from(arr_tags[i].children).map(x => x.tagName); 
                let child_ind = children.indexOf(tag_name); 
                
                // specified child tag: 
                if(child_ind >= 0){
            
                    // check if this tag has the specified attiribute:
                    if(IsNotUndefined(arr_tags[i].children[child_ind].getAttribute(tag_att))){
                        
                        field_values.push(arr_tags[i].children[child_ind].getAttribute(tag_att));
                        
                    }else{ // tag dosn't have specified attribute:
        
                        field_values.push(null);
                        
                    }
                    
                }else{ // // tag dosn't exists: 

                    field_values.push(null);

                }
            

                
            }
        

        if(arr_tags[i].tagName == tag_name){

             // check if this tag has the specified attiribute:
            if(IsNotUndefined(arr_tags[i].getAttribute(tag_att))){
                  
                field_values.push(arr_tags[i].getAttribute(tag_att));
                        
                }else{ // tag dosn't have specified attribute:
        
                    field_values.push(null);

                }
        }
    }
    }   
    //console.log(field_values)
    return field_values;
}

//#endregion

//#region  general Functions

function IsNotUndefined(object){

    let ans = typeof object === 'undefined';
    return !ans;
}

function IsNotNull(object){

    let ans =  object === null;
    return !ans;
}

function CleanObject(obj){
    
    let keys = Object.keys(obj);
    keys.forEach((item) => {

        if(IsNotUndefined(obj[item][0]) && IsNotNull(obj[item][0])){
            //console.log(obj[item][0]);
            if(obj[item][0] == "" || 
            typeof obj[item][0] == 'undefined' || 
            (obj[item][0].includes('Arrays') && 
            item.includes('xmlns:a'))){

                delete obj[item];
            }
        }

    });
}

function RemoveWhiteSpaces(xmlDoc){
    var oSerializer = new XMLSerializer();
    var sXML = oSerializer.serializeToString(xmlDoc);
    console.log(sXML);
     sXML = sXML.replace(/^\s+|\s+$/gm,'');
     sXML = sXML.replace( /[\r\n]+/gm, "" );
     console.log(sXML);
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(sXML,"text/xml");
    return xmlDoc;
}

//#endregion
