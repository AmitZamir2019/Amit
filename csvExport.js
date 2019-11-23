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
