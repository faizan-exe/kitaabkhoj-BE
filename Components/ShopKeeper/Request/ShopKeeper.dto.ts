
export type ShopKeeperLogin = {
    id: number
    email: string;
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
  }
  
  
  export type ShopKeeperCreate = {
   
        id: number;
        name: string; 
        age: number; 
        email: string;
    
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
    
  }