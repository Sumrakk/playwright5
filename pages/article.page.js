export class ArticlePage {
    constructor(page){ 
        //техническое описание страницы
        this.page = page;
        this.editButton = page.getByRole('button', { name: 'Edit Article' }).first();
        this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).first();;
        this.textboxComment = page.getByRole('textbox', { name: 'Write a comment...' });
        this.commentButton = page.getByRole('button', { name: 'Post Comment' });
        this.commentTxt = page.getByRole('main');
    }
    //Бизнесовые действия со страницей
    async createComment(comment = 'NICE!'){
        await this.textboxComment.click();
        await this.textboxComment.fill(comment);
        await this.commentButton.click();
    }
    async editPostBut (){
        await this.editButton.click();
    }
    async deletePost (){
        this.page.on('dialog', dialog => {
        console.log('Диалог:', dialog.message());
        dialog.accept();
        });
        await this.deleteButton.click();
    }
}