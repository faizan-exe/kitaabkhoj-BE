
export type CustomerLogin = {
    
  
    email: string;
   
    

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  }
  
  
  export type CustomerCreate = {
   
    id: number;
    name: string;
    email: string;
    phone: string;
    delivery_address: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    
  }