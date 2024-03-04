import { Client, Databases , Storage , Query  , ID } from "appwrite";
import conf from "../conf/conf";


export class Service {
    client = new Client();
    account;
    databases;
    bucket;


    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabasId , conf.appwriteCollectionId , slug );
        } catch (error) {
            console.log("database appwrite :: getpost " , error);
            return false;
        }
    }

    async getPosts(queries =  [Query.equal("status", ["active"])]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabasId , conf.appwriteCollectionId , queries)
        } catch (error) {
            console.log("database appwrite :: listPosts " , error);
        }
    }

    async createPost({title ,slug , content ,featuredImage , status , userId }) {
        try {
           return await this.databases.createDocument(
            conf.appwriteDatabasId ,
             conf.appwriteCollectionId , 
             slug , 
            {
                title ,content,  featuredImage , status , userId
            })
        } catch (error) {
            console.log("database appwrite :: createPost " , error);
        }
    }
    //slug is the document unique id
    async updatePost(slug , {title , content , featuredImage , status , userId}) {
        try {
            return await this.databases.updateDocument(
             conf.appwriteDatabasId ,
             conf.appwriteCollectionId , 
             slug , 
            {
                title ,content,  featuredImage , status
            }
            )
        } catch (error) {
            console.log("database appwrite :: updatePost " , error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabasId ,
                conf.appwriteCollectionId , 
                slug 
               )
               return true; // delete doesnot return anything hence return false to notify frontend that deletion is completed
        } catch (error) {
            console.log("database appwrite :: deletePost " , error);
        }
    }

    async uploadFile(file) {
        try {
            return this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file 
                )
        } catch (error) {
            console.log("database appwrite :: uploadFile " , error);
        }
    }

    async deleteFile(fileId) {
     try {
        await  this.bucket.deleteFile(
            conf.appwriteBucketId,
                    fileId,
           )
     } catch (error) {
        console.log("database appwrite :: deleteFile " , error);
     }
    }

    //file preview methos is fast hence no need to go for async await
    getFilePreview(fileId)
    {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        ).href
    }

}

const appwriteService = new Service();
export default appwriteService