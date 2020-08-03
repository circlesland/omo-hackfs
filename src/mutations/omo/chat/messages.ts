export class Messages
{
    static async sendMessage(chatroomId:string, text:string) {
        if (!window.o.odentity.current)
            throw new Error("No current odentity.");

        const currentIdentity = window.o.odentity.current._id;

        await window.o.graphQL.mutation(
            `addMessage(name: "${currentIdentity}",text: "${text}", date: "${Date.now()}", chatroomId: "${chatroomId}"){_id}`
        );
    }
}
