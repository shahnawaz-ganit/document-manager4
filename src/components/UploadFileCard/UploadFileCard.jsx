import {useEffect, useState } from "react";

import "@cloudscape-design/global-styles/index.css"
import {
    Button,
    Container,
    ProgressBar,
    SpaceBetween
} from "@cloudscape-design/components"

import { uploadData } from 'aws-amplify/storage';


function UploadFileCard(props) {

    const [filename, setFilename] = useState();
    const [progress, setProgress] = useState();
    const [loading,setLoading] = useState(false)

    const onChange = async(e)=> {
        setLoading(false)
        props?.setUploaded(false)
        setProgress(0);
        const file = e.target.files[0];
        setFilename(file.name);

        try {

            const result = await uploadData({
                path: `media/${props?.username}/${file.name}`,
                data: file,
                options: {
                    onProgress: ({ transferredBytes, totalBytes }) => {
                        if (totalBytes) {
                            setProgress(Math.round(
                                (transferredBytes / totalBytes) * 100
                            ))

                        }

                    }
                }
            }).result;

            setTimeout(() => {                
                props?.setUploaded(true)
                setProgress(0)
            }, 1500);

            
            setFilename(undefined)
        } catch (error) {
            console.log("Error uploading file: ", error);
        }

    }

    function updateLabel() {
        if (props?.uploaded) {
            return 'File Uploaded'
        } else if (filename === undefined) {
            return 'Click in the button to upload a file'
        } else {
            return "Uploading file " + filename
        }
    }

    

    return (
        <Container className="container-style" >
            <SpaceBetween size="l">

                <ProgressBar
                status={props?.uploaded ? "success":"in-progress"}
                    value={progress}
                    label={updateLabel()}
                    style="color:black"
                />

                <div>
                    <input accept="*/*" id="icon-button-file" type="file" onChange={onChange}
                        style={{ display: "none" }} />

                    <Button onClick={()=>setLoading(true)}>
                        <label htmlFor="icon-button-file">
                            {loading ? "Loading...":"Upload new file"}
                        </label>
                    </Button>

                </div>

            </SpaceBetween>
        </Container>
    );

}

export default UploadFileCard;