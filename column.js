class Column extends NamedNode{
    constructor(named,table,type_ctor){
        super(named,table)
        Object.defineProperty(this, 'valueOf',{
            writable:false,
            value:type_ctor
        });
        Object.defineProperty(this, 'table',{
            writable:false,
            value:function(){
                return this.parent;
            }
        });

    }
    asColumnValue=function(val){
        return new ColumnValue(this, this.valueOf(val));
    }
}