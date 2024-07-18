import "@cloudscape-design/global-styles/index.css"
import AppBar from "../components/AppBar/AppBar.jsx";
import FilesAppLayout from "../components/FilesAppLayout/FilesAppLayout.jsx";

import {defaultBreadcrumbs} from "../components/breadcrumbs-items";
import TableListFiles from "../components/TableListFiles/TableListFiles.jsx";
import UploadFileCard from "../components/UploadFileCard/UploadFileCard.jsx";
import SpaceBetween from "@cloudscape-design/components/space-between";

export default function Main({signOut,data,level}) {

    return (
        <>
            <AppBar data={data} signOut={signOut} />
            <FilesAppLayout
               
                breadcrumbs={defaultBreadcrumbs}
                title={level == 'private' ? "My private files" : "All public files"}
            
            >
                <SpaceBetween size="2">
                    {/* <br /> */}
                    <UploadFileCard level={level}/>
                    <br />
                    <TableListFiles level={level}/>
                </SpaceBetween>
            </FilesAppLayout>

        </>
    );
}