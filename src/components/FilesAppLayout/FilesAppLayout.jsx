import { AppLayout, BreadcrumbGroup, ContentLayout, Header } from "@cloudscape-design/components";
import '../../screen/Main.css'

export default function FilesAppLayout(props) {

    return (
        <AppLayout

            toolsHide="true"
            navigationHide="true"
            breadcrumbs={<BreadcrumbGroup className="breadcrumbs-style" items={props.breadcrumbs} />}
            content={
                <ContentLayout
                    headerVariant="high-contrast"
                    header={

                        <Header variant="h1">
                            {props.title}
                        </Header>
                    }

                >
                    {props.children}

                </ContentLayout>
            } />

    );
}

