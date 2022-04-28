import {Request, response, Response, Router} from 'express';
import Faq from '../models/Faq';

class FaqRoutes{
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getFaqs(req: Request, res: Response) : Promise<void> {
        const allFaqs = await Faq.find().populate('persona');
        if (allFaqs.length == 0){
            res.status(404).send("There are no faqs created!")
        }
        else{
            res.status(200).send(allFaqs);
        }
    }

    public async getFaqByName(req: Request, res: Response) : Promise<void> {
        const faqFound = await Faq.findOne({titulopregunta: req.params.titulopregunta}).populate('persona');
        if(faqFound == null){
            res.status(404).send("The faq doesn't exist!");
        }
        else{
            res.status(200).send(faqFound);
        }
    }

    public async addFaq(req: Request, res: Response) : Promise<void> {
        console.log(req.body);
        const {titulopregunta, pregunta, respuesta, persona, fechapregunta} = req.body;
        const newFaq = new Faq({titulopregunta, pregunta, respuesta, persona, fechapregunta});
        await newFaq.save();
        res.status(200).send('Faq added!');
    }

    public async updateFaq(req: Request, res: Response) : Promise<void> {        
        console.log(req.body);
        const faqToUpdate = await Faq.findOneAndUpdate ({titulopregunta: req.params.titulopregunta}, req.body);
        if(faqToUpdate == null){
            res.status(404).send("The faq doesn't exist!");
        }
        else{
            res.status(200).send('Updated!');
        }
    }

    public async deleteFaq(req: Request, res: Response) : Promise<void> {
        const faqToDelete = await Faq.findOneAndDelete ({titulopregunta :req.params.titulopregunta}, req.body);
        if (faqToDelete == null){
            res.status(404).send("The faq doesn't exist!")
        }
        else{
            res.status(200).send('Deleted!');
        }
    } 
    routes(){
        this.router.get('/', this.getFaqs);
        this.router.get('/:titulopregunta', this.getFaqByName);
        this.router.post('/', this.addFaq);
        this.router.put('/:titulopregunta', this.updateFaq);
        this.router.delete('/:titulopregunta', this.deleteFaq);
    }
}

const faqroutes = new FaqRoutes();

export default faqroutes.router;