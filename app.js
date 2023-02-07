let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]
let cash =0, price =0, change= ""
function test(form){
    price = document.getElementById("price").value;
    cash = form.inputbox.value
    change = document.querySelector("#change")
    if ((cash-price) < 0 || (price-cash) < 0){
        change.innerHTML = JSON.stringify(cashRegister())
    }
    else {
        change.innerHTML = JSON.stringify(cashRegister()["change"])
    }
    event.preventDefault();
}

function cashRegister(){
    let status = {status: "0", change: []}, totalvalue = 0, change = cash - price, counter =8
    //This Array is for a loop to check through each type
    let moneytypes = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]
    let newArr = {}
    //This for loop works out how much money is in the cash register
    for (let i =0; i < cid.length; i++){
        totalvalue += cid[i][1]
    }
    //If there is not enough for change this should always be called
    if (change < 0){
        status["status"] = "INCORRECT_PAYMENT";
        return status;
    }
    if ((totalvalue - change) < 0 ){
        status["status"]= "INSUFFICIENT_FUNDS";
        return status;
    }
    //Checks if change due = cid
    if (totalvalue === change)
    {
        status["change"] = cid;
        status["status"] = "CLOSED";
        return status
    }
    //Turns values into cash format
    totalvalue = (new Intl.NumberFormat().format(totalvalue))
    change = (new Intl.NumberFormat().format(change))
    
    //Calculating change
    for (let i =0; i < moneytypes.length; i++){
        //Checks if we can give any 5 dollars && that we have 5 dollars in CID
        if ((change/moneytypes[i])>=1 && (cid[counter][1] >= moneytypes[i])){
            //This is for if the change is exactly 5 dollars
            if (change/moneytypes[i] == 1){
                change = 0
                newArr[cid[counter][0]] = moneytypes[i]
            }
            //This will make the change equal to the change after we take the amounts of 5 dollars away
            else {
                //Update the cid
                if (cid[counter][1] - moneytypes[i]*(Math.floor(change/moneytypes[i])) > 0){
                    newArr[cid[counter][0]] = moneytypes[i]*(Math.floor(change/moneytypes[i]))
                    change = change - (moneytypes[i]*(Math.floor(change/moneytypes[i])))
                }
                else {
                   newArr[cid[counter][0]] = (cid[counter][1]*(Math.floor(change/cid[counter][1])))
                   change = change - (cid[counter][1])
                }
                change = (new Intl.NumberFormat().format(change)) // Turn it into cash format
            }
        }  
        counter --;
    }
    //Tests for each case
     if (change != 0){
        status["status"] = "INSUFFICIENT_FUNDS";
        return status
    }
    if (change == 0){
        status["status"] = "OPEN";
        status["change"] = (Object.entries(newArr)).reverse();
        return status
    }
    event.preventDefault();

}

function checkstatus(){
    if (cashRegister()["status"]== "OPEN"){
        document.getElementById("square").style.backgroundColor = "green";
    }
    else{
        document.getElementById("square").style.backgroundColor = "red";
    }
    event.preventDefault();
}



