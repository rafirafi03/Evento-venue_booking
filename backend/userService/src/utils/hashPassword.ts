import bcrypt from 'bcrypt';

export const hashPass = async(password: string) : Promise<string> => {

    try {
        console.log(password,"passhash")
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds)
        
    } catch (error) {
        console.log(error)
        throw new Error('error' + error)
    }
};

export const verifyPass = async (password: string, hash: string) : Promise<boolean> => {

    try {
        return await bcrypt.compare(password, hash)
    } catch (error) {
        console.log(error)
        throw new Error('error' + error)
    }
}