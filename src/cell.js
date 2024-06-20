import "./page.css";
import globe from "./svg/Globe.svg"
import mail from "./svg/Mail.svg"
import phone from "./svg/Phone.svg"

export default function Cell({ components }) {
  return (
  
      <div id="cell" tabIndex="1" >
        <div id="top_">
          <div id="img_">UN</div>
          <div id="prof_desc">
      
           <div> {components.name+ " "}</div>
           <div id= "user_n"> {components.username}</div>
           
          </div>
        </div>
        <div id="list">
          <ul>
            <li><img className="svg" src = {mail}></img> email: {components.email}</li>
            <li><img className="svg" src = {globe}></img> website: {components.website}</li>
            <li><img className="svg" src = {phone}></img> phone: {components.phone}</li>
            <li><img className="svg" src = {phone}></img> street: {components.address.street}</li>
            <li><img className="svg" src = {phone}></img> suite: {components.address.suite}</li>
            <li><img className="svg" src = {phone}></img> city: {components.address.city}</li>
            <li><img className="svg" src = {phone}></img> zipcode: {components.address.zipcode}</li>
            <li><img className="svg" src = {phone}></img> name company: {components.company.name}</li>
            <li><img className="svg" src = {phone}></img> catchphraze: {components.company.catchPhrase}</li>
            <li><img className="svg" src = {phone}></img> bs: {components.company.bs}</li>
          </ul>
        </div>
      </div>
 
  );
}
