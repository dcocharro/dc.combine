//MaxMSP Javascript code to compute combinations in a binary format or from user defined list of items
//Developed by Diogo Cocharro, dcocharro[a]gml[dot]com
//Version: 0.9 Feb 2020
autowatch = 1;
// inlets and outlets
inlets = 2;
outlets = 2;
setinletassist(0,"(int) R, compute combinations; (list) Store list and trigger all possible combinations" );
setinletassist(1,"(int) N, set the number of possibilities; (list) store a user defined list of items and set N");
setoutletassist(0,"(list) combinatory results");
setoutletassist(1,"INFO");

//GLOBAL Variables (in capital letters)
var N=0; //How many different possibilities? OR, how many possible numbers for combination. In other words, how many bits places in our array?
var R=0; //How many cases are possible?

var ITEMLIST = new Array(); //To store a user defined list of items


//Allows access to the arguments typed into your object when it was instantiated.
//The filename is jsarguments[0], the first typed-in argument is jsarguments[1].
if (jsarguments.length>1)
	N = jsarguments[1]; 


//FUNCTIONS -------------------------------------------------------------------

function msg_int(v){ //this is the default function, which computes binary sequences from a int
	
	if (inlet == 0){ //which inlet? FROM INLET1
		//post("inlet1 received INT " + v + "\n");
		intcomb(v);
		
	} else { //from INLET2, sets the user defined N, that will define the bit length of generated binary sequences
		
		if (v > 1){
			N = Math.abs(v); // when inlet2 is a single integer, sets N, the number of possibilities (size of binary sequence)
			post("inlet2 received int,", N, "N possibilities","\n");
			
		}
	}
}

function intcomb(v){
	
	R = Math.abs(v);
	if (N > 1 && R <= N){ //IF THERE IS A USER DEFINED "N" FROM INLET2 and R is considered valid THEN COMPUTE THE COMBINATIONS of R from N
		var binarray = new Array(N); //create a array with the user defined lenght of (N)
		var nrcases = Math.pow(2,N); //Compute the total number of cases of combinations from "n" (N) possible numbers. 
		var sum = 0;
		
		for (i=1; i<nrcases; i++){
			binarray = dec2binary(i,N);
			sum = binarray.reduce(Sum, 0); //SUM array to verify how many activations
			//post ("SUM ", sum,"\n");
			
			if ( sum == R){
				outlet(0,binarray); //Output array IF the number of activations equals R
				
			} else if (R == 0) {
				outlet(0,binarray); //IF R equals 0 then, output all possible combinations
					
			}			
		}
		outlet(1, "n", N);
		outlet(1, "r", R);
		outlet(1, "combinations", nrCombinations(R,N));
		
	}
	else { //COMPUTE COMBINATIONS OF R WHILE N IS NOT DEFINED
		var binarray = new Array(R); //create a array with the length of R while "N" is not defined
		var nrcases = Math.pow(2,R); //Compute the total number of cases of combinations from (n) possible numbers. 
		
		for (i=1; i<nrcases; i++){
			binarray = dec2binary(i,R);
			outlet(0,binarray);
			
			//outlet(1,"activations", findActives(binarray));
			
			//https://javascript.info/array-methods
			//https://developer.mozilla.org/pt-PT/docs/Web/JavaScript/Reference/Global_Objects/Array/find
		}
		//outlet(1, "n", R); //exceptional case!!!
		outlet(1, "r", R);
		outlet(1, "combinations", nrcases-1); //EXCEPTION:only cases with activations are considered valid
	}
}


function findActives(val){ 
//Find the indexes of the activations in the binary array
	var idx = new Array();
	var vlen = val.length;
	for (var i = 0; i < vlen; i++ ){
		if (val[i] >= 1){
			idx.push(i);
		}
	}
	return idx;
}



//FUNCTIONS TO PROCESS USER DEFINED LISTS -------------------------------------------------------------------------

function list(){
	//STORE the received list
	
	if (inlet == 1){ //FROM INLET 2, just store list
		ITEMLIST = arrayfromargs(arguments); // https://docs.cycling74.com/max8/vignettes/jsglobal
		N = ITEMLIST.length;
		post("inlet2 received list", ITEMLIST, "\n");
		
 	}	
	else { //FROM INLET 1 store and trigger computation of all possible combinations
		ITEMLIST = arrayfromargs(arguments);
		
		if (ITEMLIST.length == 2 && ITEMLIST[0]<=ITEMLIST[1]){ //Is this a list of items OR a 2item list to compute combinations of numbers?
			N = Math.abs(ITEMLIST[1]);
			intcomb(ITEMLIST[0]);
			
		} else {
			post("inlet1 received list", ITEMLIST, "\n");
			listcomb(ITEMLIST.length); //when the list is received on the first inlet, perform all possible combinations on that list
		}
		
	}
}


function listcomb(v){ //this function expects a integer (R) to compute combinations from a list of items.
//Compute combinations from a user defined list of items

	if (inlet == 0){ //FROM INLET_1
		//post("inlet1 received LISTCOMB " + v + "\n");
		R = Math.abs(v);
		
		if (N > 1 && R <= N && ITEMLIST.length > 1){ //IF THERE IS A USER DEFINED "N" FROM INLET2 and ITEMLIST and R are valid THEN COMPUTE THE COMBINATIONS of R from N
			var binarray = new Array(N); //create a array with the user defined lenght of (N)
			var nrcases = Math.pow(2,N); //Compute the total number of cases of combinations from "n" (N) possible numbers. 
			var sum = 0;
			
			for (i=1; i<nrcases; i++){
				binarray = dec2binary(i,N); //generate binary sequences
				sum = binarray.reduce(Sum, 0); //SUM array to verify how many activations
				//post ("SUM ", sum,"\n");
				
				if ( sum == R){ //Output array IF the number of activations equals R
					outlet(0,findFetch(binarray)); //Fetch combination of items from the user defined list
					
				} else if (R == 0) { //IF R equals 0 then, output all possible combinations
					outlet(0,findFetch(binarray)); //Fetch combination of items from the user defined list
				}
			}
			outlet(1, "n", N);
			outlet(1, "r", R);
			outlet(1, "combinations", nrCombinations(R,N));
		}
		else { //COMPUTE COMBINATIONS OF R WHILE N IS NOT DEFINED
			var binarray = new Array(R); //create a array with the length of R while "N" is not defined
			var nrcases = Math.pow(2,R); //Compute the total number of cases of combinations from (n) possible numbers. 
			
			for (i=1; i<nrcases; i++){
				binarray = dec2binary(i,R);
				outlet(0,findFetch(binarray)); //Fetch combination of items from the user defined list
				//https://javascript.info/array-methods
				//https://developer.mozilla.org/pt-PT/docs/Web/JavaScript/Reference/Global_Objects/Array/find
			}
			outlet(1, "r", R);
			outlet(1, "combinations", nrcases-1); //EXCEPTION:only cases with activations are considered valid
		}
	} else { //LISTCOMB from INLET2
		if (v > 1){
			post("inlet2: listcomb", v, "received, but I'll be quiet.","\n");
		}
	}
}


function findFetch(val){ 
//Find the indexes of the binary activations and fetch the correspondant item from the user defined list
	var idx = new Array();
	var vlen = val.length;
	for (var i = 0; i < vlen; i++ ){
		if (val[i] >= 1){
			idx.push(ITEMLIST[i]);
		}
	}
	return idx;
}


function Sum(accum, num) {
	return accum + num;
	//https://medium.com/@chrisburgin95/rewriting-javascript-sum-an-array-dbf838996ed0
	//https://codeburst.io/javascript-arrays-finding-the-minimum-maximum-sum-average-values-f02f1b0ce332
}


function dec2binary(dec,len)
{
	//convert a decimal(dec) number to a binary sequence with length (len)
	var binarray = new Array(len);
	
	for (z=0; z<len; z++)
	{
		binarray[z] = (dec & Math.pow(2,z)) >> z;
	}
	return binarray;
}

	
function nrCombinations(r, n){
	// Compute the total number of combinations, where, order is NOT important, and repetitions are NOT allowed
	return (factorialize(n)/(factorialize(r)*factorialize(n-r)));
}
	



function msg_float(v)
{
	error("I received a float " + v + " but I don't have any use for it." + "\n");
	//N = v;
	bang();
}


function bang() //give info about the internal state
{
	outlet(1,"my total number of possible cases is ",N);
	post("N=", N, "\n");
	post("R=", R, "\n");
	post("LIST=", ITEMLIST, "\n");
	if (R == null && N == null && nrcases == null || typeof nrcases === 'undefined'){
		
	} else {
		post("TOTAL COMBINATIONS:", nrCombinations(R, N), "from", nrcases, "POSSIBILITIES", "\n");
	}
}


function anything()
{
	var a = arrayfromargs(messagename, arguments);
	post("any received message " + a + "\n");
	//N = a;
	bang();
	
	// VER https://docs.cycling74.com/max8/vignettes/jsglobal MESSAGENAME
}


function factorialize(num) { //https://www.freecodecamp.org/news/how-to-factorialize-a-number-in-javascript-9263c89a4b38/
  // If the number is less than 0, reject it.
  if (num < 0) 
        return -1;
    
  // If the number is 0, its factorial is 1.
  else if (num == 0) 
      return 1;
    
  // Otherwise, call the recursive procedure again
    else {
        return (num * factorialize(num - 1));
        /* 
        First Part of the recursion method
        You need to remember that you won’t have just one call, you’ll have several nested calls
        
        Each call: num === "?"        	         num * factorialize(num - 1)
        1st call – factorialize(5) will return    5  * factorialize(5 - 1) // factorialize(4)
        2nd call – factorialize(4) will return    4  * factorialize(4 - 1) // factorialize(3)
        3rd call – factorialize(3) will return    3  * factorialize(3 - 1) // factorialize(2)
        4th call – factorialize(2) will return    2  * factorialize(2 - 1) // factorialize(1)
        5th call – factorialize(1) will return    1  * factorialize(1 - 1) // factorialize(0)
        
        Second part of the recursion method
        The method hits the if condition, it returns 1 which num will multiply itself with
        The function will exit with the total value
        
        5th call will return (5 * (5 - 1))     // num = 5 * 4
        4th call will return (20 * (4 - 1))    // num = 20 * 3
        3rd call will return (60 * (3 - 1))    // num = 60 * 2
        2nd call will return (120 * (2 - 1))   // num = 120 * 1
        1st call will return (120)             // num = 120
        
        If we sum up all the calls in one line, we have
        (5 * (5 - 1) * (4 - 1) * (3 - 1) * (2 - 1)) = 5 * 4 * 3 * 2 * 1 = 120
        */
    }
}