export class EditorPage {
    constructor(page){ 
        //техническое описание страницы
        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.descriptionPost = page.getByRole('textbox', { name: "What's this article about?" });
        this.textPost = page.getByRole('textbox', { name: 'Write your article' });
        this.tagsPost = page.getByRole('textbox', { name: 'Enter tags' });
        this.publishButton = page.getByRole('button', { name: 'Publish Article' });
        this.updateButton = page.getByRole('button', { name: 'Update Article' });
    }
    //Бизнесовые действия со страницей
    async createPost(post){
        const {title,description,text,tags} = post;
        await this.articleTitle.click();
        await this.articleTitle.fill(title);
        await this.descriptionPost.click();
        await this.descriptionPost.fill(description);
        await this.textPost.click();
        await this.textPost.fill(text);
        await this.tagsPost.click();
        await this.tagsPost.fill(tags);
        await this.publishButton.click();
    }
    async editPost (post){
       const {title,description,text,tags} = post;
        await this.articleTitle.click();
        await this.articleTitle.fill(title);
        await this.descriptionPost.click();
        await this.descriptionPost.fill(description);
        await this.textPost.click();
        await this.textPost.fill(text);
        await this.tagsPost.click();
        await this.tagsPost.fill(tags);
        await this.updateButton.click(); 
    }
}