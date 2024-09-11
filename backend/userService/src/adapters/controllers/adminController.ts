import { Request, Response } from "express";
import { AdminLoginUseCase, GetUsersUseCase } from "../../useCases";
import { HttpStatusCode } from "../../constants";
import { BlockUserUseCase } from "../../useCases/blockUserUseCase";

export class AdminController {
    constructor(
        private _adminLoginUseCase : AdminLoginUseCase,
        private _getUsersUseCase : GetUsersUseCase,
        private _blockUserUseCase : BlockUserUseCase
    ) {}

    async adminLogin( req: Request, res: Response) : Promise<void> {
        const { email, password } = req.body;

        try {
            const response = await this._adminLoginUseCase.execute(email, password)

            res.status(HttpStatusCode.OK).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers(req: Request, res: Response) : Promise<any> {
        try {
            const users = await this._getUsersUseCase.execute()
            console.log(users,"getusrsssssssssssss")
            res.status(HttpStatusCode.OK).json({users})
        } catch (error) {
            console.log(error)
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'Internal error'})
        }
    }

    async blockUser(req: Request, res: Response) : Promise<void> {
        const {id} = req.body;

        console.log(id,"idddcontrollerrrrr")
        console.log(req.body,"reqbdyyycontrollerrrrr")

        try {

            const response = await this._blockUserUseCase.execute(id)

            console.log(response,"ressscontrollerrrrr")

            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'Internal server error'})
        }
    }
}