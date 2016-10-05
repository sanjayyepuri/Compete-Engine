export class Competitor {
    public firstname: string;
    public lastname: string;
    public writtenScore: number;
    public _id: any;

    constructor(firstname: string, lastname: string){
        this.firstname = firstname;
        this.lastname = lastname;
    }
}