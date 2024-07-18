import TopNavigation from "@cloudscape-design/components/top-navigation";

export default ({data,signOut}) => {

    const username = data?.signInDetails?.loginId

    function handleSignOut(e){
        if(e?.detail?.id == "signout"){
            signOut()
        }
    }
   
    return (
        <TopNavigation
            identity={{
                href: "#",
                title: "Online Document Manager",
            }}
            utilities={[
                {
                    type: "menu-dropdown",
                    text: username,
                    onItemClick:handleSignOut,
                    iconName: "user-profile",
                    items: [
                        {id: "profile", text: "Profile"},
                        { id: "signout", text: "Sign out"},
                    ]
                }
            ]}
            i18nStrings={{
                searchIconAriaLabel: "Search",
                searchDismissIconAriaLabel: "Close search",
                overflowMenuTriggerText: "More",
                overflowMenuTitleText: "All",
                overflowMenuBackIconAriaLabel: "Back",
                overflowMenuDismissIconAriaLabel: "Close menu"
            }}
        />
    );
}