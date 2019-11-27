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
        
        // Loop through all rows of CSV:
        rows.forEach((row_val,row_ind) => {
    
            // Skip the first line (contains the column names)
            if(row_ind > 0){
                let row_obj = {};
                for(cell of columns){
                    row_obj[cell] = '';
                }
                let i = 0; 
                // create an Array for every value inside the row
                let row = row_val.split(delimeter);
                Object.keys(row_obj).forEach(key =>{
                    row_obj[key] = row[i];
                    i++;
                })
                i=0;
                tbl_obj[row_ind] = row_obj
            }
                
        });
        return tbl_obj;
    }
    let obj = CsvToObject(',');
