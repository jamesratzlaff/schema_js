class Named {

    constructor(named){
        if(!named){
            throw("A name for this object must be given");
        }
        Object.defineProperty(this, 'named',{
            writable:false,
            value:named
          
        });
    }
    equals(other){
        if(other instanceof Named){
            return this.named==other.named;
        }
        return false;
    }
    
}