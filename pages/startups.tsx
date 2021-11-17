import styles from '../styles/Home.module.css'
import firebaseClient from "../util/firebaseClient";

export default function Startups() {
    /*
        - Query Firebase to get startups
        - Each startup is a button with a photo imbedded on them
        - When the button is clicked, the startup is passed as a parameter into the onclick event handler
        - The event handler blurs the background and shows the startup's information
    */
    //Gets startups that were added to the database
    const db = firebaseClient.firestore();
    const startups = db.collection('apps');
    const snapStartup = await startups.get()
    //For each startup, displays a unique button that provides more
    //  information about the startup when clicked on
    snapStartup.forEach(doc => {
      let btn = doc.createElement("button"); //doc or document?
      var sData = doc.data();
      var sName = sData.name;
      btn.innerHTML = sName;
      //When the button is clicked, blur the background and show the startup info
      btn.onClick = function(sData){
        //Function title: showStartupInfo
        // Show overlay
        var overlayBox = doc.createElement('div');
        overlayBox.className = 'styles.overlay';
        //doc.body.appendChild(overlayBox);
        // Design Startup box
        var popupBox = doc.createElement('Popup');
        popupBox.anchor = anchor.current;
        popupBox.popupClass = 'styles.popup-content';
        // Add startup info
        var startupName = sData.name;
        var sIndustry = sData.industry;
        var sContact = sData.email;
        var sWeb = sData.website;
        var sMis = sData.mission;
        var startupInfo = `\t\tIndustry: \tContact: \tWebsite:\n\t\t${sIndustry}\t${sContact}\t${sWeb}\n\n\n\nMission: \n${sMis}`;
        var popContent = doc.createTextNode(startupInfo);
        var nameTag = doc.createElement('span');
        nameTag.className = 'styles.dot';
        nameTagData = doc.createTextNode(startupName);
        //Put tags together
        nameTag.appendChild(nameTagData);
        popupBox.appendChild(nameTag);
        popupBox.appendChild(popContent);
        overlayBox.appendChild(popupBox);
        doc.body.appendChild(overlayBox);
      }
      doc.body.appendChild(btn); //doc or document?
    });
    return (
        <div className={styles.container}>
            <h1>TODO: For startups page</h1>
        </div>
    )
}
