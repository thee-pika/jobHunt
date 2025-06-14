interface JobT {
  id: string;
  title: string;
  userId: string;
  location: string;
  type: string;
  salary: number;
  logo_url: string;
  createdAt: Date;
  company: string;
  skills: string;
  deadline: Date | null | string;
}

export default JobT;
