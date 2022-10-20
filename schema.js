class Schema extends NamedNode{
    constructor(named){
        super(named,undefined)
        Object.defineProperty(this,'tables',{
            writable:false,
            value:function(){return this.children}
        })
        delete this.parent;
    }
}