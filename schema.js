class Schema extends NamedNode{
    constructor(named){
        super(named,undefined)
        Object.defineProperty(this,'tables',{
            writable:false,
            value:function(){return this.children}
        })
        delete this.parent;
    }
    #getOrCreate=function(tableName){
        var result = this[tableName];
        if(!result){
            result = new Table(tableName,this);
        }
    }
    root=function(){
        return this;
    }
}