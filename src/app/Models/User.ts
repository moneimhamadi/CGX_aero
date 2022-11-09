export class User {
  id: string;
  nom: string;
  prenom: string;
  username: string;
  email: string;
  password: string;
  locked: boolean = false;
  enabled: boolean = false;
  roles: string[];
}
