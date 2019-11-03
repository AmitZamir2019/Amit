function test(){
    return 1;
}
//-----------------------------------------------------------------------------------------------------------------//
//let current_url = window.location.href;
//let xhttp = new XMLHttpRequest();
//xhttp.onreadystatechange = function() {
  //  if (this.readyState == 4 && this.status == 200) {
    let xml_miss_tags = 
    "<customers><customer><id gender='male'>1</id><first_name>Amit</first_name><last_name>Zamir</last_name></customer><customer><first_name>Ravid</first_name><last_name>Od</last_name></customer><customer><id gender='female'>3</id><last_name>Zam</last_name></customer><customer><id>4</id><first_name>Arti</first_name></customer></customers>";
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml_miss_tags,"text/xml");  
    
    let path_list = GetFullPathArray(xmlDoc);
    let path_att_list = GetFullPathAttributesArray(xmlDoc);
    let tbl_obj = {};

    let field_name = "";
    let field_att_name = "";

    //console.log(GetFieldValues(path_list[1],xmlDoc));
    //console.log(GetFieldValues(path_list[2],xmlDoc));
    path_list.forEach(element => {
        field_name = xmlDoc.querySelector(element).tagName;
        tbl_obj[field_name] = GetFieldValues(element,xmlDoc);
    });
    
    path_att_list.forEach(element => {

        let tag_att = element.split("[")[1].split("]")[0];
        let tag_name = xmlDoc.querySelector(element).tagName;
        field_name = tag_name + '-' + tag_att;
        tbl_obj[field_name] = GetFieldAttributeValues(element,xmlDoc);
    });
     console.log(tbl_obj);
    //let field_attribute_values = GetFieldAttributeValues(path_att_list[0],xmlDoc);
    
    //console.log(field_attribute_values);
        // console.log(path_att_list);
        //console.log(field_values);
        //console.log(path_list);
    //}
//};
//xhttp.open("GET", current_url, true);
//xhttp.send();

//-----------------------------------------------------------------------------------------------------------------//

function GetFullPathTag(tag){
    // Check if this tag is the first:
    let has_parent = IsNotNull(tag.parentElement);
    let path = tag.tagName;
    let new_obj;
    // path[0] = tag.tagName;
    //console.log(IsNotUndefined(tag.childNodes[0].data));
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

        let path = GetFullPathTag(arr_tags[i]);
        if(IsNotUndefined(arr_tags[i].childNodes[0].data)){
            let child_value = arr_tags[i].tagName;
            let child_index = Array.from(arr_tags[i].parentElement.children).indexOf(child_value);
            paths.push(path);
        }
        
        
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
   
//     let unique_paths_with_attributes = paths_with_attributes.filter((val,ind,arr) => arr.indexOf(val) === ind); 
     return paths_with_attributes;
}



//-----------------------------------------------------------------------------------------------------------------//

function GetFieldValues(path,xmlDoc){

    let field_values = [];
    let field = path;
    let tags = xmlDoc.getElementsByTagName('*');
    let arr_tags = Array.from(tags);
    let tag_name = xmlDoc.querySelector(path).tagName;
    let parent_tag_name = xmlDoc.querySelector(path).parentElement.tagName;
    
    for(i = 1; i <= arr_tags.length; i++){
        
        if(IsNotUndefined(arr_tags[i])){

            if(arr_tags[i].tagName == parent_tag_name){

                let children = Array.from(arr_tags[i].children).map(x => x.tagName);
                
                if(children.indexOf(tag_name) >= 0){
                    field_values.push(tags[i].getElementsByTagName(tag_name)[0].innerHTML);
                }else{
                    field_values.push(null);
                } 
            }
        }
        
    }   
    return field_values;
}

//-----------------------------------------------------------------------------------------------------------------//


function GetFieldAttributeValues(path,xmlDoc){
    
    let field_values = [];
    let field = path;
    let tags = xmlDoc.getElementsByTagName('*');
    let arr_tags = Array.from(tags);
    let tag_path = path.split("[")[0];
    let tag_att = path.split("[")[1].split("]")[0];
    let tag_name = xmlDoc.querySelector(path).tagName;
    let parent_tag_name = xmlDoc.querySelector(path).parentElement.tagName;

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
        }
        
    }   
    return field_values;
}

//-----------------------------------------------------------------------------------------------------------------//


