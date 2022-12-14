class Column extends NamedNode{
     #fkVal=null;
    
    constructor(named,table,type_ctor){
        super(named,table)
        if(!Array.isArray(type_ctor)){
        Object.defineProperty(this, 'valueOf',{
            writable:false,
            value:type_ctor
        });
    } else {
        for(var i=0;i<type_ctor.length;i++){
            var key = type_ctor[i];
            this[key]=key;
        }
        Object.defineProperty(this, 'valueOf',{
            writable:false,
            value:function(v){
                if(this[v]){
                    return this[v];
                }
            }
        });
        }
        Object.defineProperty(this, 'table',{
            writable:false,
            value:function(){
                return this.parent;
            }
        });
        Object.defineProperty(this, 'foreignKey',{
            set:function(columnObj){
                if(typeof(columnObj) == "string"){
                    var parts=columnObj.split(".");
                    var tableName = parts[0];
                    var columnName=parts[1];
                    var tableObj = this.table().schema()[tableName];
                    var col = null;
                    if(tableObj!=null){
                        col=tableObj[columnName];
                        if(col){
                            columnObj=col;
                        }
                    }
                }
                this.fkVal=columnObj;
            },
            get:function(){
                if(this.fkVal==null){
                    return null;
                }
                if(typeof(this.fkVal) == "string"){
                    this.foreignKey=this.fkVal;
                }
                return this.fkVal;
            }    
        });
        this.asColumnValue=function(val){
            var value = this.valueOf(val);
            return new ColumnValue(this, value);
        }

    }
    
}