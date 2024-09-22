export class story {
  constructor(
              public id: number, 
              public user_id: number, 
              public story_date: Date, 
              public title: string, 
              public category_name: string, 
              public content: string, 
              public ai_content: string, 
            ) {}
}
