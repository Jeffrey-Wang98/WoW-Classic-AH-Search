function PriceToStrings(num) {
    // takes the int value of the price and returns the gold, silver, and copper
    // values as a list of 3 strings [gold, silver, copper]
    let gold = Math.floor(num / 10000);
    let silver = Math.floor((num - gold * 10000) / 100);
    let copper = num - gold * 10000 - silver * 100;
    gold = (gold).toLocaleString('en-US', {useGrouping:true});
    silver = (silver).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    copper = (copper).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    return([gold, silver, copper]);
}

function PriceString( {price, colSpan} ) {
    const priceStrings = PriceToStrings(price);
    console.log(colSpan);
    return(
        <td colSpan={colSpan}>
            {priceStrings[0]}
            <img src='/images/Gold.webp' alt='gold icon'></img>
            <span> </span>
            {priceStrings[1]}
            <img src='/images/Silver.webp' alt='silver icon'></img>
            <span> </span>
            {priceStrings[2]}
            <img src='/images/Copper.webp' alt='copper icon'></img>
         </td>
    );
}

export default PriceString;