import { KeyInfo, Identity, ThreadID } from '@textile/hub'
import { Libp2pCryptoIdentity, Multiaddr } from '@textile/threads-core';
import { Database, Collection, JSONSchema } from "@textile/threads-database"
import { fromEvent, Observable } from 'rxjs';
import { DBInfo } from '@textile/threads-client';
import { serialize } from 'v8';
interface Message {
    _id: string
    author: string
    text: string
}
(global as any).WebSocket = require("isomorphic-ws");


const messageSchema: JSONSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    definitions: {
        ChatBasic: {
            title: 'ChatBasic',
            type: 'object',
            properties: {
                _id: {
                    type: 'string',
                },
                text: {
                    type: 'string',
                },
                author: {
                    type: 'string',
                },
            },
            required: ['text', 'author', '_id'],
        },
    },
}

export class ChatRoom {
    private threadId: ThreadID | undefined;
    private db: Database | null;
    private usermail: string;
    private transporter: any;
    private bucketaddress: string;
    room: Collection<Message> | null;

    constructor() {
        this.threadId = ThreadID.fromRandom();
        this.db = null;
        this.usermail = '';
        this.room = null;
        this.bucketaddress = "https://bafzbeiagzbglqm4ibz6hfd4v25kt2yjgjqhq3lq6fgpxmieiqibuhlnpum.textile.space/?page=omochat&invite=";
    }
    async initNew(email: string) {
        await this.initDB();
        const identity = await Libp2pCryptoIdentity.fromRandom();
        await this.startDB(identity);
        this.room = await this.createNewRoom("omoearthchat")
        this.usermail = email;
        if (!this.db) return;
        this.getObservable(this.db, "omoearthchat");
        // this.messageSubscription(this.db, "omoearthchat", () => { })
    }

    async initFromInvite(invite: string) {
        var json = JSON.parse(atob(invite));
        var dbInfo: DBInfo = {
            key: json.thread,
            addrs: json.addrs
        }
        this.threadId = json.thread;
        console.log(dbInfo);
        await this.initDB2();
        if (!this.db) return;
        const identity = await Libp2pCryptoIdentity.fromRandom();

        await this.db.startFromInfo(identity, dbInfo)
        this.room = await this.createNewRoom("omoearthchat")

        // this.threadId = this.db.threadID;
        this.usermail = json.email;
        // if (!this.db) return;
        // this.getObservable(this.db, "omoearthchat");
        // this.messageSubscription(this.db, "omoearthchat", () => { })

    }


    private async initDB(): Promise<void> {
        if (!this.threadId) return;
        var keyInfo: KeyInfo = {
            key: process.env.USER_API_KEY || '',
            secret: process.env.USER_API_SECRET || ''
        }
        this.db = await Database.withKeyInfo(keyInfo, this.threadId.toString());
    }
    private async initDB2(): Promise<void> {
        if (!this.threadId) return;
        var keyInfo: KeyInfo = {
            key: process.env.USER_API_KEY2 || '',
            secret: process.env.USER_API_SECRET2 || ''
        }
        console.log(keyInfo);
        this.db = await Database.withKeyInfo(keyInfo, this.threadId.toString());
    }

    private async startDB(identity: Identity) {
        if (!this.db) return;
        await this.db.start(identity, { threadID: this.threadId });
    }

    private async createNewRoom(roomName: string): Promise<Collection<Message> | null> {
        if (!this.db) return null;
        const chat = await this.db.newCollection<Message>(roomName, messageSchema)
        return chat
    }

    async messageSubscription(roomname: string, callback: any) {
        if (!this.db) return;
        const filter = `${roomname}.*.0` // filter to our chat room collection
        this.db.emitter.on(filter, (values: any, type: any) => {
            const message: Message = values.event.patch;
            console.log(message.text)
            callback(message);
        })
    }

    getObservable(db: Database, roomname: string): Observable<Message> {

        const filter = `${roomname}.*.0` // filter to our chat room collection
        return fromEvent(db.emitter, filter)
    }

    async sendMessage(text: string, author: string) {
        const message: Message = {
            _id: '',
            author: author,
            text: text,
        }
        if (!this.room)
            return;
        await this.room.insert(message)
    }

    async createInvite() {
        if (!this.db) return null;
        const info = await this.db.getDBInfo()
        if (!info) return;
        return info
    }

    async invite(email: string) {
        var invite = await this.createInvite();
        // var mailOptions = {
        //     from: 'team@omo.earth',
        //     to: email,
        //     subject: `${this.usermail} invites you to chat with him @omoearthackfs chatroom`,
        //     text: `Please follow this link <a href="${this.bucketaddress}${JSON.stringify(invite)}">chat now</a>`
        // };
        //     service: process.env.SMTPHOST,
        //     auth: {
        //         user: process.env.SMTPUSER,
        //         pass: process.env.SMTPPASSWORD

        if (!invite) throw "couldn't create invite";
        window['invite'] = invite;


        var thread = invite.key.toString();
        var addrs: any[] = [];
        invite.addrs.forEach(addr => {
            addrs.push(addr.toJSON())
        });

        const serialize = {
            thread,
            addrs,
            email
        };
        console.log(JSON.stringify(serialize));
        window['Email'].send({
            Host: process.env.SMTPHOST,
            Username: process.env.SMTPUSER,
            Password: process.env.SMTPPASSWORD,
            To: email,
            From: 'team@omo.earth',
            Subject: `${this.usermail} invites you to chat with him @omoearthackfs chatroom`,
            Body: `Please follow this link <a target="_blank" href="${this.bucketaddress}${btoa(JSON.stringify(serialize))}">chat now</a>`
        }).then(
            // message => alert(message)
        );

        // sendmail({
        //     from: 'team@omo.earth',
        //     to: email,
        //     subject: `${this.usermail} invites you to chat with him @omoearthackfs chatroom`,
        //     html: `Please follow this link <a href="${this.bucketaddress}${JSON.stringify(invite)}">chat now</a>`
        // }, function (err, reply) {
        //     console.log(err && err.stack);
        //     console.dir(reply);
        // });


        // smtpclient.send(
        //     {
        //         text: 'i hope this works',
        //         from:
        //         to: 'someone <someone@your-email.com>, another <another@your-email.com>',
        //         cc: 'else <else@your-email.com>',
        //         subject: 'testing emailjs',
        //     },
        //     (err, message) => {
        //         console.log(err || message);
        //     }
        // );

        // this.transporter.sendMail(mailOptions, function (error: any, info: any) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //     }
        // });
    }
}
