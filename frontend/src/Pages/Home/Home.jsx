import React from "react";
import TopBar from '../../components/TopBar';

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
        </>
    )
}