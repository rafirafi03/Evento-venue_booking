import bcrypt from 'bcrypt';

export const hashPass = async(password: string) : Promise<string> => {
    console.log(password,"passhash")
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds)
};

export const verifyPass = async (password: string, hash: string) : Promise<boolean> => {
    return await bcrypt.compare(password, hash)
}