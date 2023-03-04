import { getDescriptorsFromDB } from "./faceCheck.js";
import { uploadLabeledImages } from "./postFace.js";

const authClient = async (req, res) => {
    
    let label = "secure";
    
    try{
        const { name, CIN, tel, img, specialNeeds } = req.body;
    
        const result = await getDescriptorsFromDB(img);

        console.log(result.FaceMatch) 

        if (result._distance == 0){
            return res.json({ result })
        }else{
           if (!name && !CIN && !tel){
                return res.json({ result: false})
           }else{
                const result = await uploadLabeledImages({name, tel, CIN, img}, label)
                if (result) {
                    return res.json({ message: "Client Created Successfully", result: { name, tel, CIN, img}})
                }
           }
        }

    }catch(error){
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export default authClient;

  