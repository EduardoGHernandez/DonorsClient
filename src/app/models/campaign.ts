export class Campaign{
  constructor(
    public _id: string,
    public name: string,
    public image: string,
    public age: string,
    public city:string,
    public state:string,
    public expire_date:string,
    public blood_type:string,
    public contact_name:string,
    public phone:string,
    public hospital:string,
    public bed:string,
    public room:string,
    public num_donators:string
  ){}
}
