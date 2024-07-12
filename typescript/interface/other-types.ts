type Inputs = {
  first_name?: string,
  last_name?:string | null,
  email?:string,
  username?:string | null,
  phone?: string | null,
  password?: string | null,
  confirm_password?: string | null

  };

  type errorData={
    message: string,
    statusCode:number
  }
  type errorResponse={
    data: errorData[],
    
  }
  type errorType={
    response: errorResponse[]
  }