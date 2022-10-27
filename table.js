class Table extends NamedNode{
    constructor(named,schema){
        super(named,schema)
        Object.defineProperty(this,'columns',{
            writable:false,
            value:function(){return this.children;}
        });
        Object.defineProperty(this,'schema',{
            writable:false,
            value:function(){return this.parent;}
        });
        this.rows=[];
    }
    store(sep, str){
        var parts = str.split(sep);
        var dex=0;
        var toStore={};
        for(var val of this.children.values()){
            var k=val.named;
            toStore[k]=val.asColumnValue(parts[dex]);
            dex+=1;
        }
        var self=this;
        toStore.asTuple=function(){
            var tuple={};
            for(var key of self.children.keys()){
                var val=toStore[key].asTuple();
                Object.assign(tuple,val);
            }
            return tuple;
        }
        this.rows.push(toStore);
    }
    asTuples(){
        return this.rows.map(row=>row.asTuple());
    }
}
