class Decimal extends Int {
    
    static toPrecisionF(val, precision, precisionf){
        var iPart=Int.toPrecision(val,precision);
        var dotIndex=(val).toString().lastIndexOf('.');
        var decimalPart="00";
        if(dotIndex>-1){
            decimalPart=(val).toString().substring(dotIndex+1);
        }
        var asDec = parseFloat("0."+decimalPart);
        return this.parseFloat((iPart+asDec).toFixed(precisionf));

    }
    constructor(val, precision, precisionf){
        super(val,precision,function(val){return Decimal.toPrecisionF(precision,precisionf)});
        Object.defineProperty(this,'precisionf',{
            writable:false,
            value:precisionf
        });
        Object.defineProperty(this,'tupleValue',{
            get:function(){
                return parseFloat(Decimal.toPrecisionF(this.originalValue,this.precision,this.precisionf));
            }
        });
    }
    static parse(str){
        let regx = /[^(]*[(]([^,]*),([^)]*)[)].*/g
        let resos = regx.exec(str);
        var precision = 12;
        var precisionf=2;
        if(resos!=null&&resos.length>0){
            var asNum = parseInt(resos[1].trim());
            if(Number.isInteger(asNum)){
                precision=asNum;
            }
            if(resos.length>1){
            var asNum2 = parseInt(resos[2].trim());
            if(Number.isInteger(asNum2)){
                precisionf=asNum2;
            }
        }
        }
        return function(i){return new Decimal(i,precision,precisionf)};
    }
}