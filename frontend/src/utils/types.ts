export interface Note{
  note:string,
  _id:string,
  [key:string]:string
}

export interface User{
  name:string,
  email:string,
  loggedIn:boolean,
  token:string
}

export interface NotesResponse{
  notes:Note[]
}