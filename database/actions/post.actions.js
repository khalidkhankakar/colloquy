'use server'
export const createPost = async (status, content, files) => {
    // try {
        console.log('this---- ',status, content, files);
    //   const dbConnection = await connectToMongoDB();
    //   if (!dbConnection) {
    //     return { status: 500, message: "Database is not connected" };
    //   }
  


      return { status: 201, message: "User is created successfully" };
  
    // } catch (error) {
    //   return { status: 500, message: "Interal server error occured" };
    // }
  };
  