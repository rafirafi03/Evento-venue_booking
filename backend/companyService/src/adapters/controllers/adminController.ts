import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants";
import { GetRequestsUseCase, GetCompaniesUseCase } from "../../useCases";
import { BlockCompanyUseCase } from "../../useCases/blockCompanyUseCase";
import { CompanyApprovalUseCase } from "../../useCases/companyApprovalUseCase";

export class AdminController {
    constructor(
        private _getRequests : GetRequestsUseCase, 
        private _getCompanies : GetCompaniesUseCase,
        private _blockCompany : BlockCompanyUseCase,
        private _companyApproval : CompanyApprovalUseCase
    ) {}

    async getRequests(req: Request, res: Response) : Promise<void> {
        try {
            const requests = await this._getRequests.execute()
            res.status(HttpStatusCode.OK).json({requests})
        } catch (error) {
            console.log(error);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'Internal error'})
        }
    }

    async getCompanies(req: Request, res: Response) : Promise<void> {
        try {
            console.log('hiiii iam in admincontroller')
            const companies = await this._getCompanies.execute()
            console.log(companies,"cmpniess admincntrllr")
            res.status(HttpStatusCode.OK).json({companies})
        } catch (error) {
            console.log(error);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'Internal error'})
        }
    }

    async blockCompany(req:Request, res: Response) : Promise<void> {
        try {
            const {id} = req.body;
            console.log(req.body,"reqbdyyyyyyyin admincntrllr of block company")

            const response = await this._blockCompany.execute(id)

            res.status(HttpStatusCode.OK).json(response)
        } catch (error) {
            console.log(error);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message: "Internal server error"})
            
        }
    }

    async companyApproval(req: Request, res: Response) : Promise<void> {
        try {
            const {approval,userId} = req.body

            console.log(req.body,"reqbdyyyyyyyyy")

            const response = await this._companyApproval.execute(approval,userId);

            res.status(HttpStatusCode.OK).json(response)

        } catch (error) {
            console.log(error);
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message: "Internal server error"})
            
        }
    }
}