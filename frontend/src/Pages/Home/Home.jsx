import React from "react";
import TopBar from '../../components/TopBar';
import SearchComponent from "../../components/SearchComponent";
export function Home(){
    const links =  [
        {
          "link": "/about",
          "label": "Features"
        },
        {
          "link": "/pricing",
          "label": "Pricing"
        },
        {
          "link": "/learn",
          "label": "Learn"
        },
        {
          "link": "/community",
          "label": "Community"
        }
      ]
    
    return(
        <>
        <TopBar links={links} />
        <SearchComponent/>
        </>
    )
}