import { connectToMongoDB } from "@/database/dbConnect";
import Post from "@/database/models/post.model";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { BlobServiceClient } from "@azure/storage-blob";
import generateSASToken, { containerName } from "@/lib/generateSASToken";

export async function POST(req) {
    try {
        const formData = await req.formData()
        const userId = formData.get('userId');
        const content = formData.get('content');
        const status = formData.get('status');
        const files = formData.getAll('files');
        if (!userId) NextResponse.json({ status: 400, msg: "No user found" });
        const dbConnection = await connectToMongoDB();
        if (!dbConnection) {
            return NextResponse.json({ status: 500, msg: "Database is not connected" });
        }

        const attachmentsArr = [];
        if (files.length > 0) {
            await Promise.all(files.map(async (file) => {
 

                const accountName = process.env.AZURE_STORAGE_NAME;
                const sasToken = await generateSASToken();


                const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net?${sasToken}`);
                const containerClient = blobServiceClient.getContainerClient(containerName);


                const timestamp = new Date().getTime();
                const originalFileName = file.name; // Get original file name
                const fileExtension = originalFileName.split('.').pop(); // Get file extension
                const file_name = `${randomUUID()}_${timestamp}.${fileExtension}`;

                const blockBlobClient = containerClient.getBlockBlobClient(file_name);

                const imageBuffer = await file.arrayBuffer();
                const res = await blockBlobClient.uploadData(imageBuffer);
                const image_url = res._response.request.url;

                attachmentsArr.push(image_url);
            }));
        }


        const body = {
            createdBy: userId,
            content: content,
            attachments: [...attachmentsArr],
            status: status,
            reactions: [],
            shares: [],
            peopleTag: [],
            comments: [],
        }
        const createPostInDB = await Post.create(body)
        return NextResponse.json({ status: 201, msg: createPostInDB })
    } catch (error) {
        return NextResponse.json({ status: 500, msg: "Internal server error occurred" })
    }
}

export async function GET(req) {
    try {
        const getAllPosts = await Post.find()
        return NextResponse.json({status:200, posts: getAllPosts})
    } catch (error) {
        return NextResponse.json({status:500, msg:'Internal server error occured'})
    }

}