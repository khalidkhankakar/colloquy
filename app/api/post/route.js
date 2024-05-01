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
console.log('========  ',userId, content, status, files);
        if (!userId) NextResponse.json({ status: 400, msg: "No user found" });
        const dbConnection = await connectToMongoDB();
        if (!dbConnection) {
            return NextResponse.json({ status: 500, msg: "Database is not connected" });
        }

        const attachmentsArr = [];
        if (files.length > 0) {
            await Promise.all(files.map(async (file) => {
                console.log("Uploading image to Azure Blob Storage...", file);

                const accountName = process.env.AZURE_STORAGE_NAME;
                const sasToken = await generateSASToken();
                console.log('Generated SAS Token:', sasToken);

                const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net?${sasToken}`);
                const containerClient = blobServiceClient.getContainerClient(containerName);

                const timestamp = new Date().getTime();
                const file_name = `${randomUUID()}_${timestamp}.png`;

                const blockBlobClient = containerClient.getBlockBlobClient(file_name);

                console.log("Buffering the image");
                const imageBuffer = await file.arrayBuffer();
                const res = await blockBlobClient.uploadData(imageBuffer);
                const image_url = res._response.request.url;

                console.log("File uploaded successfully!", image_url);
                attachmentsArr.push(image_url);
            }));
        }

        console.log('Attachments Array:', attachmentsArr);

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
        console.log("HERE2");
        return NextResponse.json({ status: 201, msg: createPostInDB })
    } catch (error) {
        return NextResponse.json({ status: 500, msg: "Internal server error occurred" })
    }
}

// export async function POST(req) {
//     try {
//         const formData = await req.formData();
// console.log(formData.getAll('files')[0].name, formData.get('userId'), formData.get('status'), formData.get('content'));
//         return NextResponse.json({ k: "khalid", files:formData.getAll('files')})
//     } catch (error) {
//         console.log(error);
//     }

// }