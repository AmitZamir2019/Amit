//-----------------------------------------------------------------------------------------------

let current_url = window.location.href;
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let xmlDoc = this.responseXML;
        let obj = QueryXML(xmlDoc);
        
        console.log(obj);
    }
};
xhttp.open("GET", current_url, true);
xhttp.send();



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



function QueryXML(xmlDoc) {
    let id = 0;
    let tags = xmlDoc.getElementsByTagName('*');
    let root = {};
    root.id = id;
    root.class = tags[0].tagName;
    root.value = (typeof  tags[0].innerHTML == 'undefined') ? null : tags[0].innerHTML;
    
    if(tags[0].getAttributeNames().length > 0)
    {
        let att = tags[0].getAttributeNames();
        for(i=0;i<=att.length;i++){
            if(typeof att[i] !== 'undefined')
            root[att[i]] = tags[0].getAttribute(att[i],id);
        };
    }

    
    for(i=1;i<tags.length;i++)
    {   
        let current_tag = tags[i];
        let has_children = current_tag.childNodes.length > 0;
        
        if(has_children)
        {
            let obj = {};
            id++;
            obj = DefineObject(tags[i],id);
            

            let children = current_tag.childNodes.length;
            for(j=0;j<children;j++)
            {
                let child_obj = {};
                id++;
                child_obj = DefineObject(tags[i+j],id);
                obj[child_obj.class] = child_obj;

            }
            i += j;
            j=0;
            root[obj.class] = obj;

        }

    }
    
    return root;
    
}
