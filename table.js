class Table extends NamedNode{
    constructor(named){
        super(named,undefined)
        Object.defineProperty(this,'columns',{
            writable:false,
            value:function(){return this.children}
        })
    }
}