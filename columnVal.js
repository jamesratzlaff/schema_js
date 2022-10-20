class ColumnValue{
    constructor(column, val){
        Object.defineProperty(this,'column',{
            value:column
        });
        Object.defineProperty(this,'value',{
            value:val
        });
    }
}