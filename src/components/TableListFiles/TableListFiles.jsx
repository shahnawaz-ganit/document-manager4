import { useEffect, useState } from "react";
import { list, remove,getUrl } from 'aws-amplify/storage';

import "@cloudscape-design/global-styles/index.css"
import { Box, Button, SpaceBetween, Table } from "@cloudscape-design/components"
import Header from "@cloudscape-design/components/header";
import moment from "moment";

const columnDefinitions = [
    {
        id: 'key',
        cell: item => item.path.split("/")[2],
        header: 'Filename',
    },
    {
        id: 'size',
        header: 'Size',
        cell: item => (item.size / 1024 / 1024).toFixed(2) + " MB",
        minWidth: 10,
    },
    {
        id: 'lastModified',
        header: 'Last Modified',
        cell: item => moment(item.lastModified).format('MMMM Do YYYY, h:mm a'),
    },
];

function TableListFiles(props) {

    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading,setLoading] = useState(true)

    const load = async () => {
        props?.setUploaded(false)
        const result = await list({
            path: `media/${props?.username}`,
        });
        setItems(result?.items)

        if(result?.items.length > 0){
            
            setLoading(true)
        }else{
            setLoading(false)
        }

    };

    const downloadFile = async (filename)=> {

        const linkToStorageFile = await getUrl({
            path: filename,
            options: {
                validateObjectExistence: false,
                expiresIn: 900 ,
                useAccelerateEndpoint: true
            },
        });
        openInNewTab(linkToStorageFile.url);
    }

    const deleteFile = async (filename)=>  {

        try {
            const result = await remove({
                path: filename,
            });
            alert(`The file has been successfully deleted.`);
            load()

        } catch (error) {
            console.log('Error ', error);
        }
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <Table
            className="container-style"
            items={items}
            // resizableColumns
            columnDefinitions={columnDefinitions}
            onSelectionChange={({ detail }) =>
                setSelectedItems(detail.selectedItems)
            }
            header={
                <Header
                    actions={
                        <SpaceBetween size="xs" direction="horizontal">
                            <Button onClick={() => load()}>Refresh</Button>
                            <Button disabled={selectedItems.length == 0} onClick={() => downloadFile(selectedItems[0].path)}>Download</Button>
                            <Button disabled={selectedItems.length == 0} onClick={() => deleteFile(selectedItems[0].path)}>Delete</Button>
                        </SpaceBetween>
                    }
                >

                </Header>
            }
            selectionType="single"
            selectedItems={selectedItems}
            empty={
                <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
                    <SpaceBetween size="xxs">
                        {
                            loading ? "Loading...": <div>
                            <b>No files uploaded yet</b>
                            <Box variant="p" color="inherit">
                                You don't have any files uploaded yet.
                            </Box>
                        </div>
                        }
                       
                    </SpaceBetween>
                </Box>
            }
        />
    );

}

export default TableListFiles;
