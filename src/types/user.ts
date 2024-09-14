export class User {
  constructor(
              public id: string, 
              public name: string, 
              public description: string, 
              public github_id: string, 
              public qiita_id: string, 
              public x_id: string
            ) {}

  public static newUser(
    id: string, 
    name: string, 
    description: string, 
    github_id: string, 
    qiita_id: string, 
    x_id: string
  ): User {
    return new User(id,
                    name,
                    description,
                    generateUrl(github_id, 'github'),
                    generateUrl(qiita_id, 'qiita'),
                    generateUrl(x_id, 'x')
                    );
  }
}

const generateUrl = (id: string, service: string) => {
  switch (service) {
    case 'github':
      return `https://github.com/${id}`;
    case 'qiita':
      return `https://qiita.com/${id}`;
    case 'x':
      return `https://x.com/${id}`;
    default:
      return '/';
  }
};