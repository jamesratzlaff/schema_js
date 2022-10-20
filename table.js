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
    }
}