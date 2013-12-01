var List = (function() {

    function List(array) {
	if(!(this instanceof List))
	    return new List(array);
	if(array instanceof List)
	    return array;
	if(!array)
	    array = [];
	
	array.forEach((function(x) {this.push(x)}).bind(this));
    }

    List.prototype = new Array();
    List.prototype.constructor = List;

    List.prototype.clone = function() {
	return List(this.slice(0));
    }

    List.prototype.first = function() {
	var temp = this.clone();
	return temp.shift();
    }

    List.prototype.rest = function() {
	return List(this.slice(1));
    }


    // mutable concat, accepts only an array
    List.prototype.concat = function(arg) {
	arg.forEach((function(x) {this.push(x)}).bind(this));
	return this;
    }

    List.prototype.map = function(func) {
	function mapAux(func, array, result) {
	    if(array.length === 0)
		return result;
	    result = result.concat([func(array.first())]);
	    return mapAux(func, array.rest(), result);
	}
	return mapAux(func, this, new List());
    }

    List.prototype.reduce = function(func) {
	function reduceAux(func, array, result) {
	    if(array.length === 0)
		return result;
	    result = func(result, array.first());
	    return reduceAux(func, array.rest(), result);
	}
	return reduceAux(func, this.rest(), this.first());
    }

    List.prototype.index = function() {
	function checkNumber(list) {
	    var temp = list.map(function(x) {return ("number" === typeof x);});
	    return temp.reduce(function(x, y) {return (x && y);});
	}
	
	if(!checkNumber(this))
	    return "Not a 'number' List";
	
	function nvalAux(count, ind, result) {
	    if(count === 0)
		return result;
	    
	    result = result.concat([ind]);
	    return nvalAux(count-1, ind, result);
	}
	
	function nval(count, ind) {
	    return nvalAux(count, ind, new List());
	}
	
	function indexAux(ind, array, result) {
	    if(array.length === 0)
		return result;
	    result = result.concat(nval(array[0], ind));                                   
	    return indexAux(++ind, array.rest(), result);
	}
	
	return indexAux(0, this, new List());
    }

    List.prototype.filter = function(func) {
	var result = this.map(func).map(function(x) { return (x ? 1 : 0); });
	result = result.index();
	var context = this;
	return result.map(function(x) { return context[x]; });
    }


    List.prototype.equals = function(list) {
	//incase list is an Array type
	list = List(list);
	if(this.length !== list.length)
	    return false;
	
	//TODO: Use transpose someday
	function check(l1, l2) {
	    if(l1.length === 0)
		return true;
	    return ((l1.first() === l2.first()) ? check(l1.rest(), l2.rest()) : false);
	}
	return check(this, list);
    }


    List.prototype.rank = function(list) {
	
    }

    List.prototype.transpose = function(list) {
	
    }

    return List;

})();



