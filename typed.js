class Typed {

    constructor(type_ctor){
        Object.defineProperty(this, 'valueOf',{
            writable:false,
            value:valueOf,
        });
    }
    
}