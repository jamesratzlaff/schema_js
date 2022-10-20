class Column extends Named{
    constructor(named,type_ctor){
        super(named)
        Object.defineProperty(this, 'valueOf',{
            writable:false,
            value:type_ctor,
        });
    }
}