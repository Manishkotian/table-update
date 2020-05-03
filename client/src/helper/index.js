export const splitFileValues = async (fileValues, delimiter, noOfLines) => {
    return new Promise((resolve, reject) => {
        let result = []
        let lines = 1;
        fileValues.map(data => {
            const splitValue = data.split(delimiter)
            if(lines <= noOfLines && splitValue.length === 4) {
                result.push(splitValue)
                lines++;
            }
        })
        if(result.length) {
            resolve(result)
        } else {
            reject('No data found for applied filter')
        }
    })
}