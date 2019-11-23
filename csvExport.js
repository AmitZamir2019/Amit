function CsvToObject(delimeter){
/*  
    Description:
        This function takes a CSV file inside HTML page,
        and convert it to JS Object
*/
    // locate the CSV inside the html page:
    let csv = document.body.children[0].innerText;
    // create Array that contains every line as an item:
    let rows = csv.split('\n');
    // create array that contains the column names:
    let columns = rows[0].split(delimeter);
    // create the table object:
    let tbl_obj = {};

    // set column names from Array as table object keys:
    columns.forEach(item => {

        // prevent rewriting existing keys:
        let has_key = Object.keys(tbl_obj).includes(item);
        if(has_key){

            // if column has similar name ==> add numerator:
            let num = 
                Object.keys(tbl_obj)
                    .filter( x => x.search(item) == 0).length
            item = item + '-' + num;
        }
        // evey key has its own Array:
        tbl_obj[item] = [];
    });
    
    // Loop through all rows of CSV:
    rows.forEach((row_val,row_ind) => {

        // Skip the first line (contains the column names)
        if(row_ind > 0){

            // create an Array for every value inside the row
            let row = row_val.split(delimeter);
            row.forEach((element,index) => {
              
                // Find the correct key inside the object for loading data:
                let key = Object.keys(tbl_obj)[index];
                // insert data to object:
                tbl_obj[key].push(element);  
          
            })
        }
            
    });
    return tbl_obj;
}

function GetSortedIndexes(arr){
    /*  
    Description:
        This function takes Array,
        Sorting it,
        Returning the indexex of old array.
    */
    let arr_sorted = arr.slice().sort();
    let indexes = arr_sorted.slice()
        .map(x => arr.indexOf(x));

    return indexes;
}


function SortObject(obj,key_for_sorting){
    /*  
    Description:
        This function takes Object,
        Sorting specified key of it,
        Loading new Object with the same data.
        Affects all keys to be sorted in that order.
    */
    
    let indexes = GetSortedIndexes(field_to_sort);
    let new_obj = {};
    let keys = []; 
    Object.keys(obj).forEach(element => {
        new_obj[element] = [];
    });
    // Loop througth keys of old object:
    Object.keys(obj).forEach(key => {
    
        // Loop througth array in specific key:
        indexes.forEach(index => {
            
            // Load new object:
            let data = obj[key][index];
            new_obj[key].push(data);                
        })
        
    })
    return new_obj
}

function tableFromObject(obj) {
/*  
    Description:
        This function takes an Object,
        and convert it to HTML table
*/

    let tbl = document.createElement('table');
    let tbdy = document.createElement('tbody');
    let columns = Object.keys(obj).length;
    let rows = obj[Object.keys(obj)[0]].length;
    let tr_head = document.createElement('tr');
    
    // Set table Head:
    Object.keys(obj).forEach(element =>{
        
        let th = document.createElement('th');
        let data = element;
        th.appendChild(document.createTextNode(data));
        tr_head.appendChild(th);
    
    })
    
    // Loop througth rows:
    for (let i = 0; i < rows; i++) {
      let tr = document.createElement('tr');

      // Loop througth columns:        
      for (let j = 0; j <= columns; j++) {

          let td = document.createElement('td');
          let key = Object.keys(obj)[j];
          let arr = obj[key];
          if(typeof arr !== 'undefined'){
            let data = arr[i];
            td.appendChild(document.createTextNode(data));
            let column_name = obj[Object.keys(obj)[j]];
            td.setAttribute('class', column_name);
            tr.appendChild(td)
          }
          
        
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tr_head);
    tbl.appendChild(tbdy);
    return tbl;
}

function DesignTable(tbl){
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    tbl.style.textAlign = "center"; 
    
}
