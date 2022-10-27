class ColumnValue{
    constructor(column, val){
        Object.defineProperty(this,'column',{
            value:column
        });
        Object.defineProperty(this,'value',{
            value:val
        });
        Object.defineProperty(this,'asTuple',{
            value:function(obj){
                if(!obj){
                    obj={};
                }
                var name = this.column.named;
                var val = this.value;
                if(val.tupleValue){
                    val=val.tupleValue;
                }
                obj[name]=val;
                return obj;
            }
        });
    }
}