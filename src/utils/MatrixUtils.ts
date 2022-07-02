export class MatrixUtils {
    
    /**
     * Extract diagonal from a square matrix
     * 
     * @param matrix from which to extract diagonal
     * @param reverse when true calculate top-right to bottom-left diagonal
     * @returns the diagonal as an array
     */
     static getDiagonal<T>(matrix: T[][], reverse?: boolean): T[] {
        const diagonal = Array(matrix.length)

        if (reverse) {
            for (let i = 0; i < matrix.length; i++) {
                diagonal[i] = matrix[i][matrix.length - 1 - i]
            }
        } else {
            for (let i = 0; i < matrix.length; i++) {
                diagonal[i] = matrix[i][i]
            }
        }
        return diagonal
    }
}
