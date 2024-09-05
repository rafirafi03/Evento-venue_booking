import { Router } from 'express';
import { RegisterUseCase } from '../../useCases';
import { CompanyController } from '../../adapters/controllers'; 
import { CompanyRepository }  from '../../repositories/implementation/companyRepository'

const router = Router();

const companyRepository = new CompanyRepository

const registerUseCase = new RegisterUseCase(companyRepository)

const companyController = new CompanyController(registerUseCase)

router.post("/register", (req,res,next) => {
    companyController.signup(req,res,next)
})

export default router