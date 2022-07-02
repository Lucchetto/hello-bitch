export class ArrayUtils {

    /**
     * Check if all items of array are the same
     * 
     * @param array the array to check
     * @param equalityEvaluator optional custom equality evaluation function, useful to compare objects and classes
     * @returns if all items are same
     */
     static allItemsSame<T>(array: T[], equalityEvaluator?: (a: T, b: T) => boolean): boolean {
        if (equalityEvaluator) {
            for (let i = 1; i < array.length; i++) {
                // Return false if an item non equal to the previous one is found
                if (!equalityEvaluator(array[i - 1], array[i])) {
                    return false
                }
            }
        } else {
            for (let i = 1; i < array.length; i++) {
                // Return false if an item non equal to the previous one is found
                if (array[i - 1] !== array[i]) {
                    return false
                }
            }
        }
        
        // Return true if this is not an array of undefined items
        return array[0] !== undefined
    }
}
