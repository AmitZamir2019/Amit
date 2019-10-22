/*
this page contains functions that imitates sql queries with two or one field in a table
*/

// similar to: select month, sum(price) from sales group by month;
function SumGroupBy(column_to_aggragate,column_to_group_by)
{
        let unique = column_to_group_by
        .filter((val,ind,arr)=>arr
            .indexOf(val)===ind);
    let sum = 0;
    let obj = {};
    unique.map(function(val,ind,arr){

        column_to_group_by.map(function(value,index,array){

            if(value == val)
            {
                console.log(sum);
                sum += column_to_aggragate[index];
            }
        
        });
        if(typeof val !== 'undefined')
        {
            obj[val] = sum;
            sum = 0;
        }
    });
    return obj;
    
}

//--------------------------------------------------------------------------------------------

function AvgGroupBy(column_to_aggragate,column_to_group_by)
{
        let unique = column_to_group_by
        .filter((val,ind,arr)=>arr
            .indexOf(val)===ind);
    let sum = 0;
    let obj = {};
    unique.map(function(val,ind,arr){
        let items = 0;
        column_to_group_by.map(function(value,index,array){

            if(value == val)
            {
                sum += column_to_aggragate[index];
                items++;
            }
        
        });
        
        if(typeof val !== 'undefined')
        {
            obj[val] = sum/items;
            sum = 0;
        }
    });
    return obj;
    
}

//--------------------------------------------------------------------------------------------



function MaxGroupBy(column_to_aggragate,column_to_group_by)
{
        let unique = column_to_group_by
        .filter((val,ind,arr)=>arr
            .indexOf(val)===ind);
    
    let max_arr = [];
    let obj = {};
    unique.map(function(val,ind,arr){
        
        column_to_group_by.map(function(value,index,array){

            if(value == val)
            {
                max_arr.push(column_to_aggragate[index]);
                
            }
        
        });
        
        if(typeof val !== 'undefined')
        {
            
            obj[val] = Math.max.apply(Math, max_arr);
            max_arr = [];
        }
    });
    return obj;
    
}
//--------------------------------------------------------------------------------------------



function MinGroupBy(column_to_aggragate,column_to_group_by)
{
        let unique = column_to_group_by
        .filter((val,ind,arr)=>arr
            .indexOf(val)===ind);
    
    let min_arr = [];
    let obj = {};
    unique.map(function(val,ind,arr){
        
        column_to_group_by.map(function(value,index,array){

            if(value == val)
            {
                min_arr.push(column_to_aggragate[index]);
                
            }
        
        });
        
        if(typeof val !== 'undefined')
        {
            
            obj[val] = Math.min.apply(Math, min_arr);
            min_arr = [];
        }
    });
    return obj;
    
}
//--------------------------------------------------------------------------------------------





function FirstGroupBy(column_to_aggragate,column_to_group_by)
{
        let unique = column_to_group_by
        .filter((val,ind,arr)=>arr
            .indexOf(val)===ind);
    
    let first_arr = [];
    let obj = {};
    unique.map(function(val,ind,arr){
        
        column_to_group_by.map(function(value,index,array){

            if(value == val)
            {
                first_arr.push(column_to_aggragate[index]);
                
            }
        
        });
        
        if(typeof val !== 'undefined')
        {
            
            obj[val] = first_arr[0];
            first_arr = [];
        }
    });
    return obj;
    
}
//--------------------------------------------------------------------------------------------



function LastGroupBy(column_to_aggragate,column_to_group_by)
{
    
        let unique = column_to_group_by
        .filter((val,ind,arr)=>arr
            .indexOf(val)===ind);
    
    let last_arr = [];
    let obj = {};
    unique.map(function(val,ind,arr){
        
        column_to_group_by.map(function(value,index,array){

            if(value == val)
            {
                last_arr.push(column_to_aggragate[index]);
                
            }
        
        });
        
        if(typeof val !== 'undefined')
        {
            
            obj[val] = last_arr[last_arr.length-1];
            last_arr = [];
        }
    });
    return obj;
    
}
//--------------------------------------------------------------------------------------------



function CountGroupBy(column_to_aggragate,column_to_group_by)
{
        let unique = column_to_group_by
        .filter((val,ind,arr)=>arr
            .indexOf(val)===ind);
    
    let obj = {};
    unique.map(function(val,ind,arr){
    i=0;        
        column_to_group_by.map(function(value,index,array){

            if(value == val)
            {
                
               i++;
                
            }
        
        });
        
        if(typeof val !== 'undefined')
        {
                    
            obj[val] = i;
            
        }
        i=0;
    });
    
    return obj;
    
}
//--------------------------------------------------------------------------------------------




function AggragateGroupBy(column_to_aggragate,column_to_group_by,aggragation_type /* description */)
{
    switch(aggragation_type) {
    
        case 'count':
           return CountGroupBy(column_to_aggragate,column_to_group_by);
        case 'sum':
                return SumGroupBy(column_to_aggragate,column_to_group_by);
          break;
        case 'avg':
                return AvgGroupBy(column_to_aggragate,column_to_group_by);
          break;
        case 'max':
                return MaxGroupBy(column_to_aggragate,column_to_group_by);
        break;
        case 'min':
                return MinGroupBy(column_to_aggragate,column_to_group_by);
            break;
        case 'last':
                return LastGroupBy(column_to_aggragate,column_to_group_by);
            break;
        case 'first':
                return FirstGroupBy(column_to_aggragate,column_to_group_by);
            break;
          default:
            CountGroupBy(column_to_aggragate,column_to_group_by);
    }
}
//--------------------------------------------------------------------------------------------

function SingleCount(column_to_aggragate){
    return column_to_aggragate.length
}
//--------------------------------------------------------------------------------------------

function SingleMax(column_to_aggragate){ 
    return Math.max.apply(Math, column_to_aggragate);
}
//--------------------------------------------------------------------------------------------


function SingleMin(column_to_aggragate){ 
    return Math.min.apply(Math, column_to_aggragate);
}
//--------------------------------------------------------------------------------------------


function SingleFirst(column_to_aggragate){ 
    return column_to_aggragate[0];
}
//--------------------------------------------------------------------------------------------


function SingleLast(column_to_aggragate){ 
    
    return column_to_aggragate[column_to_aggragate.length-1];
}
//--------------------------------------------------------------------------------------------


function SingleDistinct(column_to_aggragate){ 
    
    let unique = column_to_aggragate
            .filter((val,ind,arr) =>
                arr.indexOf(val) === ind);
    
    return unique;
}
//--------------------------------------------------------------------------------------------



function SingleSum(column_to_aggragate){ 
    let sum = column_to_aggragate
            .reduce((acc,val) =>
                acc + val);
    
    return sum;
}
//--------------------------------------------------------------------------------------------



function SingleAvg(column_to_aggragate){ 
    
    let sum = column_to_aggragate
            .reduce(function(acc,val){
                return acc + val;
            });
                
    
    return sum/column_to_aggragate.length;
}
//--------------------------------------------------------------------------------------------


function SingleAggragate(column_to_aggragate,aggragation_type)
{
    switch(aggragation_type) {
    
        case 'count':
          return SingleCount(column_to_aggragate);
        case 'sum':
            return SingleSum(column_to_aggragate);
          break;
        case 'avg':
            return SingleAvg(column_to_aggragate);
          break;
        case 'max':
            return SingleMax(column_to_aggragate);
        break;
        case 'min':
            return SingleMin(column_to_aggragate);
            break;
        case 'last':
            return SingleLast(column_to_aggragate);
            break;
        case 'first':
            return SingleFirst(column_to_aggragate);
            break;
          default:
            return SingleGroupBy(column_to_aggragate);
    }
}
//--------------------------------------------------------------------------------------------}



// Test functions:
//---------------//

let column_to_group_by = ['a','a','a','a','b','b','b','c','c'];
let column_to_aggragate = [1,24,65,345,21,1,56,7,64];
let aggragation_type = 'sum';
let obj = AggragateGroupBy(column_to_aggragate,column_to_group_by,aggragation_type);
console.log(obj);


 obj = SumGroupBy(column_to_aggragate,column_to_group_by);
console.log(obj);
obj = AvgGroupBy(column_to_aggragate,column_to_group_by);
console.log(obj);column_to_aggragate
obj = MaxGroupBy(column_to_aggragate,column_to_group_by);
console.log(obj);
obj = MinGroupBy(column_to_aggragate,column_to_group_by);
console.log(obj);
obj = FirstGroupBy(column_to_aggragate,column_to_group_by);
console.log(obj);
obj =  LastGroupBy(column_to_aggragate,column_to_group_by)
console.log(obj);
obj = CountGroupBy(column_to_aggragate,column_to_group_by);
console.log(obj);
obj = FirstGroupBy(column_to_aggragate,column_to_group_by);
console.log(obj);
obj = FirstGroupBy(column_to_aggragate,column_to_group_by);
console.log(obj);

 console.log(SumGroupBy(column_to_aggragate,column_to_group_by));
